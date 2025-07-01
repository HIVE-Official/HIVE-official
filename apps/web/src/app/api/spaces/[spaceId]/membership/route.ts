import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuth } from "firebase-admin/auth";
import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@hive/core";

const membershipQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(50),
  offset: z.coerce.number().min(0).default(0),
  role: z.enum(["creator", "admin", "member"]).optional(),
});

/**
 * Get space membership details including member list
 * Returns paginated member list with user details and membership info
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    const { spaceId } = await params;

    // Parse query parameters
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    const { limit, offset, role } = membershipQuerySchema.parse(queryParams);

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
    const requestingUserId = decodedToken.uid;

    // Check if space exists
    const spaceDoc = await dbAdmin.collection("spaces").doc(spaceId).get();
    if (!spaceDoc.exists) {
      return NextResponse.json({ error: "Space not found" }, { status: 404 });
    }

    const spaceData = spaceDoc.data();

    if (!spaceData) {
      return NextResponse.json(
        { error: "Space data not found" },
        { status: 404 }
      );
    }

    // Check if requesting user is a member of this space
    const requestingUserMemberDoc = await dbAdmin
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(requestingUserId)
      .get();

    if (!requestingUserMemberDoc.exists) {
      return NextResponse.json(
        { error: "Access denied: Not a member of this space" },
        { status: 403 }
      );
    }

    const requestingUserMembership = requestingUserMemberDoc.data();

    if (!requestingUserMembership) {
      return NextResponse.json(
        { error: "Membership data not found" },
        { status: 403 }
      );
    }

    // Build members query
    let membersQuery = dbAdmin
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .orderBy("joinedAt", "desc");

    // Add role filter if specified
    if (role) {
      membersQuery = membersQuery.where("role", "==", role);
    }

    // Get members with pagination
    const membersSnapshot = await membersQuery
      .limit(limit)
      .offset(offset)
      .get();

    // Get total count for pagination
    const totalMembersSnapshot = await dbAdmin
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .get();

    const totalCount = totalMembersSnapshot.size;

    // Fetch user details for each member
    const memberPromises = membersSnapshot.docs.map(async (memberDoc) => {
      const memberData = memberDoc.data();
      const userId = memberDoc.id;

      try {
        // Get user profile
        const userDoc = await dbAdmin.collection("users").doc(userId).get();
        const userData = userDoc.exists ? userDoc.data() : null;

        return {
          userId,
          membership: {
            role: memberData.role,
            joinedAt: memberData.joinedAt,
            joinMethod: memberData.joinMethod,
            joinReason: memberData.joinReason,
          },
          profile: userData
            ? {
                handle: userData.handle,
                displayName: userData.displayName,
                avatar: userData.avatar,
                major: userData.major,
                classYear: userData.classYear,
                bio: userData.bio,
              }
            : null,
        };
      } catch (error) {
        logger.error(`Error fetching user ${userId}:`, error);
        return {
          userId,
          membership: {
            role: memberData.role,
            joinedAt: memberData.joinedAt,
            joinMethod: memberData.joinMethod,
            joinReason: memberData.joinReason,
          },
          profile: null,
        };
      }
    });

    const members = await Promise.all(memberPromises);

    // Group members by role for better organization
    const membersByRole = members.reduce(
      (acc, member) => {
        const role = member.membership.role;
        if (!acc[role]) {
          acc[role] = [];
        }
        acc[role].push(member);
        return acc;
      },
      {} as Record<string, typeof members>
    );

    // Calculate role counts
    const roleCounts = Object.keys(membersByRole).reduce(
      (acc, role) => {
        acc[role] = membersByRole[role].length;
        return acc;
      },
      {} as Record<string, number>
    );

    return NextResponse.json({
      success: true,
      space: {
        id: spaceId,
        name: spaceData.name,
        description: spaceData.description,
        type: spaceData.type,
        subType: spaceData.subType,
        memberCount: spaceData.memberCount || 0,
      },
      requestingUser: {
        userId: requestingUserId,
        role: requestingUserMembership.role,
        joinedAt: requestingUserMembership.joinedAt,
      },
      members,
      membersByRole,
      pagination: {
        limit,
        offset,
        totalCount,
        hasMore: offset + limit < totalCount,
        nextOffset: offset + limit < totalCount ? offset + limit : null,
      },
      roleCounts: {
        ...roleCounts,
        total: totalCount,
      },
      filters: {
        role: role || null,
      },
    });
  } catch (error: unknown) {
    logger.error("Get space membership error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: error.errors },
        { status: 400 }
      );
    }

    if (
      error instanceof Error &&
      "code" in error &&
      (error as { code: string }).code === "auth/id-token-expired"
    ) {
      return NextResponse.json({ error: "Token expired" }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
