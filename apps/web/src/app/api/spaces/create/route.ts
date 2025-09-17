import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase/admin/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getAuthTokenFromRequest } from "@/lib/auth/auth";
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus } from "@/lib/api/response-types/api-response-types";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { COLLECTIONS, type SpaceDocument, type SpaceMember } from "@/lib/firebase/collections/firebase-collections";

// Validation schema for space creation
const CreateSpaceSchema = z.object({
  name: z.string()
    .min(3, "Space name must be at least 3 characters")
    .max(50, "Space name must be less than 50 characters")
    .regex(/^[a-zA-Z0-9\s\-_]+$/, "Space name can only contain letters, numbers, spaces, hyphens, and underscores"),
  
  description: z.string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  
  type: z.enum(['academic', 'residential', 'greek', 'interest', 'professional', 'special']),
  
  visibility: z.enum(['public', 'private', 'invite_only']).default('public'),
  
  joinProcess: z.enum(['instant', 'approval', 'invite_only']).default('instant'),
  
  tags: z.array(z.object({
    type: z.string(),
    sub_type: z.string()
  })).optional().default([]),
  
  rules: z.array(z.string()).optional().default([
    "Be respectful to all members",
    "No spam or self-promotion",
    "Stay on topic",
    "Follow campus guidelines"
  ]),
  
  avatar: z.string().url().optional(),
  bannerUrl: z.string().url().optional(),
  primaryColor: z.string().optional(),
  category: z.string().optional(),
  
  coordinationTypes: z.array(z.enum([
    'study_session',
    'food_run', 
    'ride_share',
    'meetup'
  ])).optional().default(['study_session', 'meetup']),
  
  foundingMembers: z.array(z.string().email()).optional().default([])
});

const db = dbAdmin;

// Check if space name already exists
async function checkSpaceNameExists(name: string, campusId: string): Promise<boolean> {
  const snapshot = await db
    .collection(COLLECTIONS.SPACES)
    .where('name', '==', name)
    .where('campusId', '==', campusId)
    .where('isDeleted', '==', false)
    .limit(1)
    .get();
  
  return !snapshot.empty;
}

// Generate unique space ID
function generateSpaceId(name: string): string {
  const timestamp = Date.now().toString(36);
  const sanitizedName = name.toLowerCase().replace(/\s+/g, '-').substring(0, 20);
  return `${sanitizedName}-${timestamp}`;
}

// Set default permissions based on role
function getDefaultPermissions(role: 'owner' | 'admin' | 'moderator' | 'member') {
  switch (role) {
    case 'owner':
      return {
        canPost: true,
        canModerate: true,
        canManageMembers: true,
        canManageTools: true,
        canViewAnalytics: true,
        canConfigureSpace: true
      };
    case 'admin':
      return {
        canPost: true,
        canModerate: true,
        canManageMembers: true,
        canManageTools: true,
        canViewAnalytics: true,
        canConfigureSpace: false
      };
    case 'moderator':
      return {
        canPost: true,
        canModerate: true,
        canManageMembers: false,
        canManageTools: false,
        canViewAnalytics: true,
        canConfigureSpace: false
      };
    default:
      return {
        canPost: true,
        canModerate: false,
        canManageMembers: false,
        canManageTools: false,
        canViewAnalytics: false,
        canConfigureSpace: false
      };
  }
}

// POST /api/spaces/create - Create a new space
export async function POST(request: NextRequest) {
  try {
    // Get and validate auth token
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        ApiResponseHelper.error("Authentication required", "UNAUTHORIZED"),
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    // Get user data to check if they're verified
    const userDoc = await db.collection(COLLECTIONS.USERS).doc(userId).get();
    if (!userDoc.exists) {
      return NextResponse.json(
        ApiResponseHelper.error("User profile not found", "NOT_FOUND"),
        { status: HttpStatus.NOT_FOUND }
      );
    }

    const userData = userDoc.data();
    if (!userData?.emailVerified) {
      return NextResponse.json(
        ApiResponseHelper.error("Email verification required to create spaces", "FORBIDDEN"),
        { status: HttpStatus.FORBIDDEN }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = CreateSpaceSchema.parse(body);

    // Default campus ID for vBETA
    const campusId = 'ub-buffalo';

    // Check if space name already exists
    const nameExists = await checkSpaceNameExists(validatedData.name, campusId);
    if (nameExists) {
      return NextResponse.json(
        ApiResponseHelper.error("A space with this name already exists", "CONFLICT"),
        { status: HttpStatus.CONFLICT }
      );
    }

    // Generate space ID
    const spaceId = generateSpaceId(validatedData.name);

    // Create space document
    const now = Timestamp.now();
    const spaceData: Omit<SpaceDocument, 'id'> = {
      name: validatedData.name,
      description: validatedData.description,
      type: validatedData.type,
      status: 'activated', // New spaces start as activated
      
      // Identity
      avatar: validatedData.avatar,
      bannerUrl: validatedData.bannerUrl,
      
      // Campus Context
      campusId,
      tags: validatedData.tags,
      
      // Membership
      memberCount: 1, // Creator is the first member
      visibility: validatedData.visibility,
      joinProcess: validatedData.joinProcess,
      
      // Leadership
      ownerId: userId,
      adminIds: [],
      moderatorIds: [],
      
      // Settings
      rules: validatedData.rules,
      enabledTools: [], // Will be populated when tools are enabled
      coordinationTypes: validatedData.coordinationTypes,
      
      // Customization
      primaryColor: validatedData.primaryColor,
      category: validatedData.category,
      
      // Metadata
      createdAt: now,
      updatedAt: now,
      lastActivityAt: now,
      isDeleted: false
    };

    // Start a batch write
    const batch = db.batch();

    // Create the space document
    const spaceRef = db.collection(COLLECTIONS.SPACES).doc(spaceId);
    batch.set(spaceRef, spaceData);

    // Add creator as owner member
    const memberData: Omit<SpaceMember, 'id'> = {
      spaceId,
      role: 'owner',
      status: 'active',
      permissions: getDefaultPermissions('owner'),
      joinedAt: now,
      lastActiveAt: now,
      contributionScore: 0,
      postsCount: 0
    };

    const memberRef = spaceRef.collection(COLLECTIONS.SPACE_MEMBERS).doc(userId);
    batch.set(memberRef, memberData);

    // Create initial welcome post
    const welcomePostData = {
      spaceId,
      authorId: userId,
      type: 'announcement',
      content: `Welcome to ${validatedData.name}! This space was created to ${validatedData.description}`,
      title: 'Welcome to our new space!',
      reactions: { heart: 0 },
      reactedUsers: { heart: [] },
      commentCount: 0,
      isPinned: true,
      pinnedAt: now,
      isEdited: false,
      isDeleted: false,
      createdAt: now,
      updatedAt: now
    };

    const postRef = spaceRef.collection(COLLECTIONS.SPACE_POSTS).doc();
    batch.set(postRef, welcomePostData);

    // Update user's space count (if tracking)
    const userRef = db.collection(COLLECTIONS.USERS).doc(userId);
    batch.update(userRef, {
      spacesCreated: FieldValue.increment(1),
      spacesJoined: FieldValue.arrayUnion(spaceId),
      updatedAt: now
    });

    // Commit the batch
    await batch.commit();

    // Return the created space
    const createdSpace = {
      id: spaceId,
      ...spaceData,
      isJoined: true,
      userRole: 'owner'
    };

    logger.info('Space created successfully', { 
      spaceId, 
      userId, 
      spaceName: validatedData.name 
    });

    return NextResponse.json(
      ApiResponseHelper.success(createdSpace, "Space created successfully"),
      { status: HttpStatus.CREATED }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        ApiResponseHelper.error(
          "Invalid space data",
          "VALIDATION_ERROR",
          error.errors
        ),
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    logger.error('Error creating space', { 
      error, 
      endpoint: '/api/spaces/create' 
    });

    return NextResponse.json(
      ApiResponseHelper.error("Failed to create space", "INTERNAL_ERROR"),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}