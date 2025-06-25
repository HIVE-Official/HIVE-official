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

/**
 * GET /api/spaces/discovery
 * Discover spaces with personalization, filtering, and search
 */
export async function GET(request: NextRequest) {
  try {
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
      graduationYear: userProfile.graduationYear,
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

    // Return formatted result
    return NextResponse.json({
      success: true,
      ...discoveryResult,
    });
  } catch (error) {
    logger.error("Space discovery error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
