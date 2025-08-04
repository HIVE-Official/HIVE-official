import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

interface SpaceData {
  name: string;
  description: string;
  type: string;
  subType?: string;
  status: string;
  memberCount?: number;
  schoolId: string;
  createdAt: any;
  updatedAt: any;
}

interface MembershipData {
  role?: string;
  joinedAt?: any;
  joinMethod?: string;
  joinReason?: string;
}

/**
 * Get user's spaces with membership details
 * Returns all spaces the user is a member of, sorted by recent activity
 */
export async function GET(request: NextRequest) {
  try {
    // Verify the requesting user is authenticated
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Authorization header required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const token = authHeader.substring(7);
    const auth = getAuth();

    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    // Get all space memberships for the user using collectionGroup
    const allSpacesSnapshot = await dbAdmin
      .collectionGroup("members")
      .where("uid", "==", userId)
      .get();

    if (allSpacesSnapshot.empty) {
      return NextResponse.json({
        success: true,
        spaces: [],
        totalCount: 0 });
    }

    // Collect space information from nested structure
    const spacePromises = allSpacesSnapshot.docs.map(async (memberDoc) => {
      // Get space ID and space type from document path
      // Path: spaces/[spacetype]/spaces/[spaceId]/members/[userId]
      const pathParts = memberDoc.ref.path.split('/');
      if (pathParts.length !== 6) return null;
      
      const spaceType = pathParts[1]; // spaces/[spacetype]/...
      const spaceId = pathParts[3];   // .../spaces/[spaceId]/...
      
      // Fetch space document from nested structure
      const spaceDoc = await dbAdmin
        .collection("spaces")
        .doc(spaceType)
        .collection("spaces")
        .doc(spaceId)
        .get();
        
      if (!spaceDoc.exists) return null;

      const spaceData = spaceDoc.data() as SpaceData;

      // Get membership details from current document
      const membershipData = memberDoc.data() as MembershipData;

      return {
        id: spaceId,
        name: spaceData.name,
        description: spaceData.description,
        type: spaceData.type,
        subType: spaceData.subType,
        status: spaceData.status,
        memberCount: spaceData.memberCount || 0,
        spaceType: spaceType,
        createdAt: spaceData.createdAt,
        updatedAt: spaceData.updatedAt,
        // Membership details
        membership: {
          role: membershipData?.role || "member",
          joinedAt: membershipData?.joinedAt,
          joinMethod: membershipData?.joinMethod,
          joinReason: membershipData?.joinReason,
        },
      };
    });

    const spacesData = await Promise.all(spacePromises);
    const validSpaces = spacesData.filter(
      (space): space is NonNullable<typeof space> => space !== null
    );

    // Sort spaces by recent activity (most recent first)
    validSpaces.sort((a, b) => {
      const aTime = a.membership.joinedAt?.toMillis?.() || 0;
      const bTime = b.membership.joinedAt?.toMillis?.() || 0;
      return bTime - aTime;
    });

    // Group spaces by type for better organization
    const spacesByType = validSpaces.reduce(
      (acc, space) => {
        const type = space.type;
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(space);
        return acc;
      },
      {} as Record<string, typeof validSpaces>
    );

    return NextResponse.json({
      success: true,
      spaces: validSpaces,
      spacesByType: spacesByType,
      totalCount: validSpaces.length,
      typeCounts: Object.keys(spacesByType).reduce(
        (acc, type) => {
          acc[type] = spacesByType[type].length;
          return acc;
        },
        {} as Record<string, number>
      ) });
  } catch (error) {
    logger.error('Get user spaces error', { error: error, endpoint: '/api/profile/my-spaces' });

    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "auth/id-token-expired"
    ) {
      return NextResponse.json(ApiResponseHelper.error("Token expired", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    return NextResponse.json(ApiResponseHelper.error("Internal server error", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}
