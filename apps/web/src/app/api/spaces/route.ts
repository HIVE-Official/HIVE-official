import * as admin from 'firebase-admin';
import { z } from "zod";
import type { Space, SpaceType } from "@hive/core";
import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@/lib/logger";
import { withAuthAndErrors, withAuthValidationAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware/index";
import { getSecureSpacesQuery, getSecureSpacesWithCursor, addSecureCampusMetadata, CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";

const createSpaceSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  category: z.enum(['student_org', 'residential', 'university_org', 'greek_life']),
  joinPolicy: z.enum(['open', 'approval', 'invite_only']).default('open'),
  tags: z.array(z.string()).default([]),
  agreedToGuidelines: z.boolean(),
  visibility: z.enum(['public', 'members_only']).optional(),
  settings: z.object({
    maxPinnedPosts: z.number().optional(),
    autoArchiveDays: z.number().optional()
  }).optional()
});

export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const { searchParams } = new URL(request.url);
  const filterType = searchParams.get("type") as SpaceType | "all" | null;
  const searchTerm = searchParams.get("q")?.toLowerCase() || null;
  const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
  const cursor = searchParams.get("cursor") || undefined;

  try {
    // In development, ensure sample spaces exist
    if (process.env.NODE_ENV === 'development') {
      await ensureSampleSpaces();
    }

    // SECURITY: Use secure cursor-based pagination with campus isolation
    const result = await getSecureSpacesWithCursor({
      filterType: filterType === "all" ? undefined : filterType || undefined,
      searchTerm: searchTerm || undefined,
      limit,
      cursor,
      orderBy: searchTerm ? 'name_lowercase' : 'createdAt',
      orderDirection: searchTerm ? 'asc' : 'desc'
    });

    return respond.success({
      spaces: result.spaces as Space[],
      pagination: {
        limit,
        hasMore: result.hasMore,
        nextCursor: result.nextCursor,
        // For backwards compatibility with offset-based clients
        count: result.spaces.length
      }
    });
  } catch (error) {
    logger.error('Error fetching spaces', { error: error instanceof Error ? error.message : String(error), filterType: filterType || undefined, searchTerm: searchTerm || undefined, limit, cursor });
    return respond.error("Failed to fetch spaces", "INTERNAL_ERROR", { status: 500 });
  }
});

type CreateSpaceData = z.infer<typeof createSpaceSchema>;

export const POST = withAuthValidationAndErrors(
  createSpaceSchema as any,
  async (request: AuthenticatedRequest, context, body: CreateSpaceData, respond) => {
  const { name, description, category, joinPolicy, tags, agreedToGuidelines, visibility, settings } = body;
  const userId = getUserId(request);
  const userEmail = request.user.email || '';

  // CHECK 1: Agreement to guidelines
  if (!agreedToGuidelines) {
    return respond.error("Must agree to community guidelines", "VALIDATION_ERROR", { status: 400 });
  }

  // CHECK 2: Get user data for permission checks
  const userDoc = await dbAdmin.collection('users').doc(userId).get();
  const userData = userDoc.data();

  if (!userData) {
    return respond.error("User not found", "NOT_FOUND", { status: 404 });
  }

  // CHECK 3: Account age (7 days minimum)
  const accountCreated = userData.createdAt?.toDate() || new Date();
  const accountAge = Math.floor((Date.now() - accountCreated.getTime()) / (1000 * 60 * 60 * 24));
  const isAdmin = userData.role === 'admin' || userData.isAdmin === true;

  if (accountAge < 7 && !isAdmin) {
    return respond.error(`Account must be at least 7 days old (current: ${accountAge} days)`, "PERMISSION_DENIED", { status: 403 });
  }

  // CHECK 4: Email verification
  const emailVerified = request.user.decodedToken.email_verified || false;
  if (!emailVerified && !isAdmin) {
    return respond.error("Email verification required", "PERMISSION_DENIED", { status: 403 });
  }

  // CHECK 5: Daily limit (3 spaces per day)
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const spacesCreatedTodaySnapshot = await dbAdmin
    .collection('spaces')
    .where('createdBy', '==', userId)
    .where('createdAt', '>=', todayStart)
    .get();

  if (spacesCreatedTodaySnapshot.size >= 3 && !isAdmin) {
    return respond.error("Daily limit reached (3 spaces per day)", "RATE_LIMIT", { status: 429 });
  }

  // CHECK 6: Category restrictions
  if (category === 'university_org' && !isAdmin) {
    return respond.error("University organizations require admin approval", "PERMISSION_DENIED", { status: 403 });
  }

  if (category === 'greek_life' && !userData.greekLifeVerified && !isAdmin) {
    return respond.error("Greek Life spaces require verification", "PERMISSION_DENIED", { status: 403 });
  }

  // CHECK 7: Ban status
  if (userData.spaceBanned === true || userData.banned === true) {
    return respond.error("Your space creation privileges have been revoked", "PERMISSION_DENIED", { status: 403 });
  }

  // CHECK 8: Name uniqueness
  const existingSpaceSnapshot = await dbAdmin
    .collection('spaces')
    .where('campusId', '==', 'ub-buffalo')
    .where('name_lowercase', '==', name.toLowerCase())
    .limit(1)
    .get();

  if (!existingSpaceSnapshot.empty) {
    return respond.error("A space with this name already exists", "CONFLICT", { status: 409 });
  }

  // Generate space ID and create space document - use secure metadata
  const spaceRef = dbAdmin.collection('spaces').doc();
  const spaceId = spaceRef.id;
  const now = admin.firestore.FieldValue.serverTimestamp();

  // Map category to old type for compatibility
  const typeMapping = {
    'student_org': 'student_organizations',
    'residential': 'residential_spaces',
    'university_org': 'university_organizations',
    'greek_life': 'greek_life_spaces'
  };

  // SECURITY: Use secure campus metadata function
  const spaceData = addSecureCampusMetadata({
    name,
    name_lowercase: name.toLowerCase(),
    description,
    category,
    type: typeMapping[category], // For backward compatibility
    joinPolicy,
    visibility: visibility || 'public',
    tags: tags || [],
    status: 'active',
    isActive: true,

    // Creator info
    createdBy: userId,
    leaders: [userId],
    moderators: [],

    // Settings
    settings: {
      maxPinnedPosts: settings?.maxPinnedPosts || 3,
      autoArchiveDays: settings?.autoArchiveDays || 7,
      allowGuestView: visibility === 'public',
      requireApproval: joinPolicy === 'approval',
      notifyOnJoin: true
    },

    // Metrics
    memberCount: 1,
    onlineCount: 0,
    activityLevel: 'quiet',
    lastActivity: admin.firestore.FieldValue.serverTimestamp(),

    // Behavioral scores (will be calculated daily)
    anxietyReliefScore: 0,
    socialProofScore: 0,
    insiderAccessScore: joinPolicy === 'invite_only' ? 0.5 : 0,
    joinToActiveRate: 0,

    // Promotion
    promotedPostsToday: 0,
    autoPromotionEnabled: false,

    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  });

  // Use batch write for atomicity
  const batch = dbAdmin.batch();

  // Create space in nested structure
  batch.set(spaceRef, spaceData);

  // Add creator as owner in flat spaceMembers collection with secure metadata
  const memberRef = dbAdmin.collection('spaceMembers').doc();
  batch.set(memberRef, addSecureCampusMetadata({
    spaceId,
    userId,
    role: 'owner',
    joinedAt: now,
    isActive: true,
    permissions: ['admin', 'moderate', 'post', 'invite'],
    joinMethod: 'created'
  }));

  // Add audit log for space creation
  const auditRef = dbAdmin.collection('audit_logs').doc();
  batch.set(auditRef, {
    type: 'space_created',
    userId,
    userEmail,
    spaceId,
    spaceName: name,
    category,
    joinPolicy,
    timestamp: now,
    metadata: {
      accountAge,
      emailVerified,
      spacesCreatedToday: spacesCreatedTodaySnapshot.size + 1
    }
  });

  // Commit all changes atomically
  await batch.commit();

  logger.info('✅ Created space by user', {
    category,
    userId,
    spaceId,
    spaceName: name,
    endpoint: '/api/spaces'
  });

  return respond.success({
    space: {
      id: spaceId,
      ...spaceData
    }
  }, { status: 201 });
  }
);

/**
 * Development helper to ensure sample spaces exist
 */
async function ensureSampleSpaces() {
  const sampleSpaces = [
    {
      id: 'ub-computer-science',
      name: 'UB Computer Science',
      description: 'Connect with CS majors, share projects, get study tips, and network with fellow programmers at UB. From algorithms to internships, we cover it all.',
      type: 'student_organizations' as SpaceType,
      isPrivate: false,
      tags: ['cs', 'programming', 'study-group']
    },
    {
      id: 'ub-engineering-hub',
      name: 'UB Engineering Hub',
      description: 'All engineering disciplines unite! Share resources, discuss projects, find lab partners, and get career advice from fellow UB engineers.',
      type: 'student_organizations' as SpaceType,
      isPrivate: false,
      tags: ['engineering', 'stem', 'projects']
    },
    {
      id: 'governors-residence-hall',
      name: 'Governors Residence Hall',
      description: 'For residents of Governors! Plan floor events, coordinate study sessions, share dining hall reviews, and stay connected with your neighbors.',
      type: 'residential_spaces' as SpaceType,
      isPrivate: false,
      tags: ['dorms', 'governors', 'residence-life']
    },
    {
      id: 'ub-pre-med-society',
      name: 'UB Pre-Med Society',
      description: 'Future doctors assemble! Study together for the MCAT, share volunteer opportunities, discuss med school applications, and support each other.',
      type: 'student_organizations' as SpaceType,
      isPrivate: false,
      tags: ['pre-med', 'mcat', 'healthcare']
    },
    {
      id: 'ub-business-network',
      name: 'UB Business Network',
      description: 'Business majors and entrepreneurs unite! Share internship opportunities, discuss case studies, network for future careers, and collaborate on ventures.',
      type: 'student_organizations' as SpaceType,
      isPrivate: false,
      tags: ['business', 'networking', 'internships']
    },
    {
      id: 'ub-gaming-community',
      name: 'UB Gaming Community',
      description: 'Gamers of UB unite! Organize tournaments, find teammates, discuss new releases, and plan LAN parties. All games and skill levels welcome.',
      type: 'student_organizations' as SpaceType,
      isPrivate: false,
      tags: ['gaming', 'esports', 'tournaments']
    }
  ];

  const batch = dbAdmin.batch();
  let spacesCreated = 0;

  for (const space of sampleSpaces) {
    const spaceRef = dbAdmin.collection('spaces').doc(space.id);
    const spaceDoc = await spaceRef.get();

    if (!spaceDoc.exists) {
      const spaceData = addSecureCampusMetadata({
        name: space.name,
        name_lowercase: space.name.toLowerCase(),
        description: space.description,
        type: space.spaceType,
        subType: null,
        status: 'active',
        isActive: true,
        isPrivate: space.isPrivate,
        tags: space.tags.map(tag => ({ sub_type: tag })),
        createdBy: 'system',
        metrics: {
          memberCount: Math.floor(Math.random() * 150) + 10, // 10-160 members
          postCount: Math.floor(Math.random() * 25) + 2, // 2-27 posts
          eventCount: Math.floor(Math.random() * 8) + 1, // 1-9 events
          toolCount: Math.floor(Math.random() * 3) + 1, // 1-4 tools
          activeMembers: Math.floor(Math.random() * 40) + 5 // 5-45 active
        },
        bannerUrl: null
      });

      batch.set(spaceRef, spaceData);
      spacesCreated++;
    }
  }

  if (spacesCreated > 0) {
    await batch.commit();
    logger.info(`✅ Created ${spacesCreated} sample spaces for development`);
  }
}
