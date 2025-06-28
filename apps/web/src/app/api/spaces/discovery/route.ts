import { NextRequest, NextResponse } from "next/server";
import {
  SpaceDiscoveryEngine,
  SpaceSection,
  SpaceStatus,
  type SpaceDiscoveryData,
  type UserDiscoveryContext,
  type DiscoveryFilters,
  logger,
} from "@hive/core";
import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
} from "firebase/firestore";
import { dbAdmin } from '@/lib/firebase-admin';
import { generalApiRateLimit } from '@/lib/rate-limit';

/**
 * GET /api/spaces/discovery
 * Discover spaces with personalization, filtering, and search
 */
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitResult = await generalApiRateLimit.limit(ip);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    // Authenticate user
    const user = await requireAuth(request);

    // Get user profile for personalization
    // TODO: Implement proper user profile fetching
    const userProfile = {
      major: "Computer Science",
      dorm: "North Campus",
      graduationYear: 2025,
      interests: [],
      isBuilder: false,
      isGreekMember: false,
    };

    // Parse query parameters
    const { searchParams } = new URL(request.url);

    const section = searchParams.get("section") as SpaceSection | null;
    const search = searchParams.get("search") || undefined;
    const status = searchParams.getAll("status") as SpaceStatus[];
    const memberCountMin = searchParams.get("memberCountMin")
      ? parseInt(searchParams.get("memberCountMin")!)
      : undefined;
    const memberCountMax = searchParams.get("memberCountMax")
      ? parseInt(searchParams.get("memberCountMax")!)
      : undefined;
    const hasActivity = searchParams.get("hasActivity") === "true";
    const isJoinable = searchParams.get("isJoinable") === "true";
    const sortBy =
      (searchParams.get("sortBy") as DiscoveryFilters["sortBy"]) || "relevance";
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");
    const schoolId = searchParams.get('schoolId') || 'university-at-buffalo'; // Default to UB
    const majors = searchParams.get('majors')?.split(',') || [];

    // Build discovery filters
    const filters: DiscoveryFilters = {
      section: section || undefined,
      status: status.length > 0 ? status : undefined,
      search,
      memberCountMin,
      memberCountMax,
      hasActivity: hasActivity || undefined,
      isJoinable: isJoinable || undefined,
      sortBy,
      limit,
      offset,
    };

    // Get user's joined spaces for personalization
    const userSpacesQuery = query(
      collection(db, "space_members"),
      where("userId", "==", user.uid)
    );
    const userSpacesSnapshot = await getDocs(userSpacesQuery);
    const joinedSpaces = userSpacesSnapshot.docs.map(
      (doc) => doc.data().spaceId
    );

    // Build user context for personalization
    const userContext: UserDiscoveryContext = {
      userId: user.uid,
      major: userProfile.major,
      dorm: userProfile.dorm,
      graduationYear: String(userProfile.graduationYear),
      joinedSpaces,
      interests: userProfile.interests || [],
      isBuilder: userProfile.isBuilder || false,
      isGreekMember: userProfile.isGreekMember || false,
    };

    // Fetch spaces from Firestore
    const spacesQuery = collection(db, "spaces");
    const constraints = [];

    // Add visibility filter
    constraints.push(where("isVisible", "==", true));

    // Add section filter if specified
    if (section) {
      constraints.push(where("section", "==", section));
    }

    // Add basic ordering
    constraints.push(orderBy("lastActivity", "desc"));
    constraints.push(firestoreLimit(200)); // Reasonable upper limit

    const spacesSnapshot = await getDocs(query(spacesQuery, ...constraints));

    // Convert Firestore data to SpaceDiscoveryData
    const spaces: SpaceDiscoveryData[] = spacesSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        description: data.description,
        section: data.section,
        status: data.status,
        ownerType: data.ownerType,
        ownerId: data.ownerId,
        isVisible: data.isVisible,
        isJoinable: data.isJoinable,
        requiresApproval: data.requiresApproval,
        isAutoJoin: data.isAutoJoin,
        memberCount: data.memberCount || 0,
        postCount: data.postCount || 0,
        lastActivity: data.lastActivity?.toDate(),
        createdAt: data.createdAt?.toDate() || new Date(),
        openedAt: data.openedAt?.toDate(),
        crestUrl: data.crestUrl,
        organizationType: data.organizationType,
        contactEmail: data.contactEmail,
        discoveryScore: 0, // Will be calculated by engine
        trendingScore: data.trendingScore || 0,
        activityScore: data.activityScore || 0,
        unlockConditions: data.unlockConditions,
      };
    });

    // Use discovery engine for filtering, scoring, and ranking
    const discoveryResult = await SpaceDiscoveryEngine.discoverSpaces(
      spaces,
      userContext,
      filters
    );

    // Fetch spaces by type
    const spacesByTypeQuery = dbAdmin
      .collection('spaces')
      .where('schoolId', '==', schoolId)
      .where('status', '==', 'activated')
      .limit(limit);

    const spacesByTypeSnapshot = await spacesByTypeQuery.get();
    const allSpaces = spacesByTypeSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Space[];

    // Categorize spaces
    const categorizedSpaces: SpaceDiscoveryResponse = {
      academic: [],
      campusLiving: [],
      greekLife: [],
      studentOrganizations: [],
      universityOrganizations: []
    };

    allSpaces.forEach(space => {
      switch (space.type) {
        case 'major':
          categorizedSpaces.academic.push(space);
          break;
        case 'residential':
          categorizedSpaces.campusLiving.push(space);
          break;
        case 'interest': {
          // Check if it's Greek life based on tags
          const isGreek = space.tags?.some(tag => 
            tag.type === 'greek' || 
            tag.sub_type?.toLowerCase().includes('fraternity') ||
            tag.sub_type?.toLowerCase().includes('sorority')
          );
          if (isGreek) {
            categorizedSpaces.greekLife.push(space);
          } else {
            categorizedSpaces.studentOrganizations.push(space);
          }
          break;
        }
        case 'organization':
          categorizedSpaces.universityOrganizations.push(space);
          break;
        case 'creative':
          categorizedSpaces.studentOrganizations.push(space);
          break;
        default:
          categorizedSpaces.studentOrganizations.push(space);
      }
    });

    // Sort by member count (most popular first)
    Object.keys(categorizedSpaces).forEach(category => {
      categorizedSpaces[category as keyof SpaceDiscoveryResponse].sort(
        (a, b) => (b.memberCount || 0) - (a.memberCount || 0)
      );
    });

    // If user has majors, prioritize matching academic spaces
    if (majors.length > 0) {
      const majorSpaces = categorizedSpaces.academic.filter(space =>
        space.tags?.some(tag => majors.includes(tag.sub_type))
      );
      const otherAcademicSpaces = categorizedSpaces.academic.filter(space =>
        !space.tags?.some(tag => majors.includes(tag.sub_type))
      );
      categorizedSpaces.academic = [...majorSpaces, ...otherAcademicSpaces];
    }

    // Return formatted result
    return NextResponse.json({
      success: true,
      ...discoveryResult,
      spaces: categorizedSpaces,
      totalCount: allSpaces.length
    });
  } catch (error) {
    logger.error("Space discovery error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
