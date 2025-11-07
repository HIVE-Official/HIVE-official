"use server";

import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import {
  withAuthAndErrors,
  getUserId,
  type AuthenticatedRequest,
} from "@/lib/middleware";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";
import { logger } from "@/lib/logger";
import { requireSpaceMembership } from "@/lib/space-security";
import { HttpStatus } from "@/lib/api-response-types";

const MembershipQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(50),
  offset: z.coerce.number().min(0).default(0),
  role: z.enum(["owner", "admin", "moderator", "member", "guest"]).optional(),
});

export const GET = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ spaceId: string }> },
  respond,
) => {
  try {
    const { spaceId } = await params;
    const userId = getUserId(request);
    const queryParams = MembershipQuerySchema.parse(
      Object.fromEntries(request.nextUrl.searchParams.entries()),
    );

    const membership = await requireSpaceMembership(spaceId, userId);
    if (!membership.ok) {
      const code =
        membership.status === HttpStatus.NOT_FOUND ? "RESOURCE_NOT_FOUND" : "FORBIDDEN";
      return respond.error(membership.error, code, { status: membership.status });
    }

    let membersQuery = dbAdmin
      .collection("spaceMembers")
      .where("spaceId", "==", spaceId)
      .where("isActive", "==", true)
      .where("campusId", "==", CURRENT_CAMPUS_ID);

    if (queryParams.role) {
      membersQuery = membersQuery.where("role", "==", queryParams.role);
    }

    membersQuery = membersQuery
      .orderBy("joinedAt", "desc")
      .offset(queryParams.offset)
      .limit(queryParams.limit);

    const membersSnapshot = await membersQuery.get();

    const totalSnapshot = await dbAdmin
      .collection("spaceMembers")
      .where("spaceId", "==", spaceId)
      .where("isActive", "==", true)
      .where("campusId", "==", CURRENT_CAMPUS_ID)
      .get();

    const memberPromises = membersSnapshot.docs.map(async (memberDoc) => {
      const memberData = memberDoc.data();
      const memberId = memberData.userId || memberDoc.id;

      try {
        const userDoc = await dbAdmin.collection("users").doc(memberId).get();
        const userData = userDoc.exists ? userDoc.data() : null;

        return {
          userId: memberId,
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
        logger.error("Error fetching user profile", {
          memberId,
          error: error instanceof Error ? error : new Error(String(error)),
        });
        return {
          userId: memberId,
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

    const membersByRole = members.reduce((acc, member) => {
      const memberRole = member.membership.role;
      if (!acc[memberRole]) {
        acc[memberRole] = [];
      }
      acc[memberRole].push(member);
      return acc;
    }, {} as Record<string, typeof members>);

    const roleCounts = Object.entries(membersByRole).reduce(
      (acc, [role, entries]) => ({
        ...acc,
        [role]: entries.length,
      }),
      {} as Record<string, number>,
    );

    return respond.success({
      space: {
        id: spaceId,
        name: membership.space.name,
        description: membership.space.description,
        type: membership.space.type,
        memberCount: membership.space.memberCount || 0,
      },
      requestingUser: {
        userId,
        role: membership.membership.role,
        joinedAt: membership.membership.joinedAt,
      },
      members,
      membersByRole,
      pagination: {
        limit: queryParams.limit,
        offset: queryParams.offset,
        totalCount: totalSnapshot.size,
        hasMore: queryParams.offset + queryParams.limit < totalSnapshot.size,
        nextOffset:
          queryParams.offset + queryParams.limit < totalSnapshot.size
            ? queryParams.offset + queryParams.limit
            : null,
      },
      roleCounts: {
        ...roleCounts,
        total: totalSnapshot.size,
      },
      filters: {
        role: queryParams.role ?? null,
      },
    });
  } catch (error) {
    logger.error(
      "Get space membership error at /api/spaces/[spaceId]/membership",
      error instanceof Error ? error : new Error(String(error)),
    );
    return respond.error("Internal server error", "INTERNAL_ERROR", {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
});
