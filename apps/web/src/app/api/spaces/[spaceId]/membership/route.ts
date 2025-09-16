import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuth } from "firebase-admin/auth";
import { dbAdmin } from "@/lib/firebase/admin/firebase-admin";
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";

const membershipQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(50),
  offset: z.coerce.number().min(0).default(0),
  role: z.enum(["creator", "admin", "member"]).optional() });

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
      return NextResponse.json(ApiResponseHelper.error("Authorization header required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const token = authHeader.substring(7);
    const auth = getAuth();

    const decodedToken = await auth.verifyIdToken(token);
    const requestingUserId = decodedToken.uid;

    // Find the space in the nested structure: spaces/[spacetype]/spaces/spaceID
    const spaceTypes = ['campus_living', 'fraternity_and_sorority', 'hive_exclusive', 'student_organizations', 'university_organizations'];
    let spaceDoc: any = null;
    let spaceType: string | null = null;

    // Search through all space types to find the space
    for (const type of spaceTypes) {
      const potentialSpaceRef = dbAdmin.collection("spaces").doc(type).collection("spaces").doc(spaceId);
      const potentialDoc = await potentialSpaceRef.get();
      
      if (potentialDoc.exists) {
        spaceDoc = potentialDoc;
        spaceType = type;
        break;
      }
    }

    if (!spaceDoc || !spaceDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Space not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const spaceData = spaceDoc.data();

    if (!spaceData) {
      return NextResponse.json(ApiResponseHelper.error("Space data not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    // Check if requesting user is a member of this space
    const requestingUserMemberDoc = await dbAdmin
      .collection("spaces")
      .doc(spaceType!)
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(requestingUserId)
      .get();

    if (!requestingUserMemberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Access denied: Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const requestingUserMembership = requestingUserMemberDoc.data();

    if (!requestingUserMembership) {
      return NextResponse.json(ApiResponseHelper.error("Membership data not found", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Build members query
    let membersQuery = dbAdmin
      .collection("spaces")
      .doc(spaceType!)
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
      .doc(spaceType!)
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .get();

    const totalCount = totalMembersSnapshot.size;

    // Fetch user details for each member
    const memberPromises = membersSnapshot.docs.map(async (memberDoc: any) => {
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
        logger.error('Error fetching user', { userId, error: error, endpoint: '/api/spaces/[spaceId]/membership' });
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
      } });
  } catch (error: any) {
    logger.error('Get space membership error', { error: error, endpoint: '/api/spaces/[spaceId]/membership' });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: error.errors },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    if (error.code === "auth/id-token-expired") {
      return NextResponse.json(ApiResponseHelper.error("Token expired", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    return NextResponse.json(ApiResponseHelper.error("Internal server error", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}
