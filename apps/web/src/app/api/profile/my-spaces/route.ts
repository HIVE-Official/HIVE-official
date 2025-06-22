import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { dbAdmin } from "@/lib/firebase-admin";
import type { Timestamp } from "firebase-admin/firestore";

interface SpaceData {
  name: string;
  description: string;
  type: string;
  subType?: string;
  status: string;
  memberCount?: number;
  schoolId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface MembershipData {
  role?: string;
  joinedAt?: Timestamp;
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
      return NextResponse.json(
        { error: "Authorization header required" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const auth = getAuth();

    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    // Get all space memberships for the user
    const allSpacesSnapshot = await dbAdmin
      .collectionGroup("members")
      .where("userId", "==", userId)
      .get();

    if (allSpacesSnapshot.empty) {
      return NextResponse.json({
        success: true,
        spaces: [],
        totalCount: 0,
      });
    }

    // Collect space IDs from memberships
    const spaceIds = allSpacesSnapshot.docs
      .map((doc) => {
        const spaceId = doc.ref.parent.parent?.id;
        return spaceId;
      })
      .filter((id): id is string => Boolean(id));

    // Batch fetch space details
    const spacePromises = spaceIds.map(async (spaceId) => {
      const spaceDoc = await dbAdmin.collection("spaces").doc(spaceId).get();
      if (!spaceDoc.exists) return null;

      const spaceData = spaceDoc.data() as SpaceData;

      // Get membership details for this space
      const membershipDoc = allSpacesSnapshot.docs.find(
        (doc) => doc.ref.parent.parent?.id === spaceId
      );
      const membershipData = membershipDoc?.data() as
        | MembershipData
        | undefined;

      return {
        id: spaceId,
        name: spaceData.name,
        description: spaceData.description,
        type: spaceData.type,
        subType: spaceData.subType,
        status: spaceData.status,
        memberCount: spaceData.memberCount || 0,
        schoolId: spaceData.schoolId,
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
      ),
    });
  } catch (error) {
    console.error("Get user spaces error:", error);

    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "auth/id-token-expired"
    ) {
      return NextResponse.json({ error: "Token expired" }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
