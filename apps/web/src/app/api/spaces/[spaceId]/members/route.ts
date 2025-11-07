"use server";

import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import * as admin from "firebase-admin";
import { logger } from "@/lib/logger";
import {
  withAuthAndErrors,
  withAuthValidationAndErrors,
  getUserId,
  type AuthenticatedRequest,
} from "@/lib/middleware";
import {
  CURRENT_CAMPUS_ID,
  addSecureCampusMetadata,
} from "@/lib/secure-firebase-queries";
import { requireSpaceMembership } from "@/lib/space-security";
import { HttpStatus } from "@/lib/api-response-types";

const GetMembersQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(50),
  offset: z.coerce.number().min(0).default(0),
  role: z.enum(["owner", "admin", "moderator", "member", "guest"]).optional(),
  search: z.string().optional(),
  includeOffline: z.coerce.boolean().default(true),
});

const InviteMemberSchema = z.object({
  userId: z.string(),
  role: z.enum(["member", "moderator", "admin"]).default("member"),
});

const UpdateMemberSchema = z.object({
  userId: z.string(),
  role: z.enum(["member", "moderator", "admin"]).optional(),
  action: z.enum(["suspend", "unsuspend"]).optional(),
  reason: z.string().optional(),
});

const RemoveMemberQuerySchema = z.object({
  userId: z.string(),
  reason: z.string().optional(),
});

async function findActiveMember(spaceId: string, userId: string) {
  const membership = await requireSpaceMembership(spaceId, userId);
  if (membership.ok) {
    return {
      ok: true as const,
      membership,
    };
  }

  if (membership.error === "User is not a member of this space") {
    return {
      ok: false as const,
      status: HttpStatus.NOT_FOUND,
      message: "Member not found",
    };
  }

  return {
    ok: false as const,
    status: membership.status,
    message: membership.error,
  };
}

function ensureRoleChangeAllowed(
  requesterRole: string | undefined,
  targetRole: string | undefined,
  newRole?: string,
) {
  const canManageMembers = requesterRole === "owner" || requesterRole === "admin";
  if (!canManageMembers) {
    return { ok: false as const, message: "Insufficient permissions to manage members" };
  }

  if (targetRole === "owner" || newRole === "owner") {
    return { ok: false as const, message: "Cannot modify owner role" };
  }

  if ((targetRole === "admin" || newRole === "admin") && requesterRole !== "owner") {
    return { ok: false as const, message: "Only owners can manage admin roles" };
  }

  if (targetRole === "moderator" && requesterRole !== "owner") {
    return { ok: false as const, message: "Only owners can manage moderator roles" };
  }

  return { ok: true as const };
}

export const GET = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ spaceId: string }> },
  respond,
) => {
  const userId = getUserId(request);
  const { spaceId } = await params;

  const viewerMembership = await requireSpaceMembership(spaceId, userId);
  if (!viewerMembership.ok) {
    const code =
      viewerMembership.status === HttpStatus.NOT_FOUND ? "RESOURCE_NOT_FOUND" : "FORBIDDEN";
    return respond.error(viewerMembership.error, code, { status: viewerMembership.status });
  }

  const queryParams = GetMembersQuerySchema.parse(
    Object.fromEntries(request.nextUrl.searchParams.entries()),
  );

  const roleFilter = queryParams.role;
  let memberQuery = dbAdmin
    .collection("spaceMembers")
    .where("spaceId", "==", spaceId)
    .where("isActive", "==", true)
    .where("campusId", "==", CURRENT_CAMPUS_ID);

  if (roleFilter) {
    memberQuery = memberQuery.where("role", "==", roleFilter);
  }

  memberQuery = memberQuery
    .orderBy("joinedAt", "desc")
    .offset(queryParams.offset)
    .limit(queryParams.limit);

  const membersSnapshot = await memberQuery.get();
  const members: any[] = [];

  for (const doc of membersSnapshot.docs) {
    const memberData = doc.data();
    const memberId = memberData.userId || doc.id;

    const userDoc = await dbAdmin.collection("users").doc(memberId).get();
    const userData = userDoc.exists ? userDoc.data() : null;
    if (!userData) continue;

    const activitySnapshot = await dbAdmin
      .collection("activityEvents")
      .where("userId", "==", memberId)
      .where("spaceId", "==", spaceId)
      .where("type", "in", ["post_created", "comment_created"])
      .get();

    const postCount = activitySnapshot.docs.filter(
      (activity) => activity.data().type === "post_created",
    ).length;

    const memberRecord = {
      id: memberId,
      name: userData.fullName || userData.displayName || "Unknown User",
      username: userData.handle || userData.email?.split("@")[0] || "unknown",
      avatar: userData.photoURL,
      bio: userData.bio || userData.about,
      role: memberData.role || "member",
      status: memberData.isOnline ? "online" : "offline",
      joinedAt: memberData.joinedAt?.toDate
        ? memberData.joinedAt.toDate()
        : memberData.joinedAt
          ? new Date(memberData.joinedAt)
          : new Date(),
      lastActive: memberData.lastActive?.toDate
        ? memberData.lastActive.toDate()
        : memberData.lastActive
          ? new Date(memberData.lastActive)
          : new Date(),
      isVerified: Boolean(userData.isVerified),
      badges: userData.badges || [],
      stats: {
        postsCount: postCount,
        likesReceived: 0,
        eventsAttended: 0,
        contributionScore: postCount * 10,
      },
      interests: userData.interests || [],
      major: userData.major,
      graduationYear: userData.graduationYear,
      location: userData.location,
      socialLinks: userData.socialLinks || {},
      permissions: {
        canMessage: memberData.role !== "guest",
        canViewProfile: true,
        canInviteOthers: ["owner", "admin", "moderator"].includes(memberData.role),
      },
      spaceRole: memberData.role,
      isOnline: Boolean(memberData.isOnline),
    };

    if (queryParams.search) {
      const searchLower = queryParams.search.toLowerCase();
      const matchesSearch =
        (memberRecord.name?.toLowerCase() || "").includes(searchLower) ||
        (memberRecord.username?.toLowerCase() || "").includes(searchLower) ||
        (memberRecord.bio && memberRecord.bio.toLowerCase().includes(searchLower)) ||
        (memberRecord.interests || []).some((interest: string) =>
          interest.toLowerCase().includes(searchLower),
        );
      if (!matchesSearch) continue;
    }

    if (!queryParams.includeOffline && memberRecord.status === "offline") {
      continue;
    }

    members.push(memberRecord);
  }

  const roleOrder: Record<string, number> = { owner: 5, admin: 4, moderator: 3, member: 2, guest: 1 };
  members.sort((a, b) => {
    const roleDiff =
      (roleOrder[b.role as keyof typeof roleOrder] || 1) -
      (roleOrder[a.role as keyof typeof roleOrder] || 1);
    if (roleDiff !== 0) return roleDiff;
    if (a.status !== "offline" && b.status === "offline") return -1;
    if (a.status === "offline" && b.status !== "offline") return 1;
    return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
  });

  const totalMembersSnapshot = await dbAdmin
    .collection("spaceMembers")
    .where("spaceId", "==", spaceId)
    .where("isActive", "==", true)
    .where("campusId", "==", CURRENT_CAMPUS_ID)
    .get();

  const onlineMembers = members.filter((member) => member.status !== "offline").length;

  return respond.success({
    members,
    summary: {
      totalMembers: totalMembersSnapshot.size,
      onlineMembers,
      activeMembers: members.filter((member) => {
        const daysSinceActive =
          (Date.now() - new Date(member.lastActive).getTime()) / (1000 * 60 * 60 * 24);
        return daysSinceActive <= 7;
      }).length,
    },
    pagination: {
      limit: queryParams.limit,
      offset: queryParams.offset,
      hasMore: membersSnapshot.size === queryParams.limit,
      nextOffset: membersSnapshot.size === queryParams.limit
        ? queryParams.offset + queryParams.limit
        : null,
    },
  });
});

export const POST = withAuthValidationAndErrors(
  InviteMemberSchema,
  async (
    request: AuthenticatedRequest,
    { params }: { params: Promise<{ spaceId: string }> },
    body,
    respond,
  ) => {
    try {
      const inviterId = getUserId(request);
      const { spaceId } = await params;

      const inviterMembership = await requireSpaceMembership(spaceId, inviterId);
      if (!inviterMembership.ok) {
        const code =
          inviterMembership.status === HttpStatus.NOT_FOUND ? "RESOURCE_NOT_FOUND" : "FORBIDDEN";
        return respond.error(inviterMembership.error, code, { status: inviterMembership.status });
      }

      const inviterRole = inviterMembership.membership.role;
      if (!["owner", "admin", "moderator"].includes(inviterRole)) {
        return respond.error("Insufficient permissions to invite members", "FORBIDDEN", {
          status: HttpStatus.FORBIDDEN,
        });
      }

      const userDoc = await dbAdmin.collection("users").doc(body.userId).get();
      if (!userDoc.exists) {
        return respond.error("User not found", "RESOURCE_NOT_FOUND", {
          status: HttpStatus.NOT_FOUND,
        });
      }

      const existingSnapshot = await dbAdmin
        .collection("spaceMembers")
        .where("spaceId", "==", spaceId)
        .where("userId", "==", body.userId)
        .where("campusId", "==", CURRENT_CAMPUS_ID)
        .limit(1)
        .get();

      const now = admin.firestore.FieldValue.serverTimestamp();
      if (!existingSnapshot.empty) {
        const existingDoc = existingSnapshot.docs[0];
        const existingData = existingDoc.data();

        if (existingData.isActive) {
          return respond.error("User is already a member of this space", "CONFLICT", {
            status: HttpStatus.CONFLICT,
          });
        }

        await existingDoc.ref.update({
          role: body.role,
          isActive: true,
          invitedBy: inviterId,
          joinedAt: now,
          lastActive: now,
          reactivatedAt: now,
          reactivatedBy: inviterId,
          updatedAt: now,
          campusId: CURRENT_CAMPUS_ID,
        });
      } else {
        const memberRef = dbAdmin.collection("spaceMembers").doc();
        await memberRef.set(
          addSecureCampusMetadata({
            spaceId,
            userId: body.userId,
            role: body.role,
            joinedAt: now,
            lastActive: now,
            invitedBy: inviterId,
            isActive: true,
            isOnline: false,
          }),
        );
      }

      await dbAdmin
        .collection("spaces")
        .doc(spaceId)
        .update({
          "metrics.memberCount": admin.firestore.FieldValue.increment(1),
          "metrics.activeMembers": admin.firestore.FieldValue.increment(1),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

      return respond.success({
        success: true,
        message: "Member invited successfully",
        member: {
          id: body.userId,
          role: body.role,
        },
      });
    } catch (error) {
      logger.error(
        "Error inviting member at /api/spaces/[spaceId]/members",
        error instanceof Error ? error : new Error(String(error)),
      );
      return respond.error("Failed to invite member", "INTERNAL_ERROR", {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  },
);

export const PATCH = withAuthValidationAndErrors(
  UpdateMemberSchema,
  async (
    request: AuthenticatedRequest,
    { params }: { params: Promise<{ spaceId: string }> },
    body,
    respond,
  ) => {
    const requesterId = getUserId(request);
    const { spaceId } = await params;

    const requesterMembership = await requireSpaceMembership(spaceId, requesterId);
    if (!requesterMembership.ok) {
      const code =
        requesterMembership.status === HttpStatus.NOT_FOUND ? "RESOURCE_NOT_FOUND" : "FORBIDDEN";
      return respond.error(requesterMembership.error, code, { status: requesterMembership.status });
    }

    const targetMembership = await findActiveMember(spaceId, body.userId);
    if (!targetMembership.ok) {
      return respond.error(targetMembership.message, targetMembership.status === HttpStatus.NOT_FOUND ? "RESOURCE_NOT_FOUND" : "FORBIDDEN", {
        status: targetMembership.status,
      });
    }

    const roleCheck = ensureRoleChangeAllowed(
      requesterMembership.membership.membership.role,
      targetMembership.membership.membership.role,
      body.role,
    );
    if (!roleCheck.ok) {
      return respond.error(roleCheck.message, "FORBIDDEN", { status: HttpStatus.FORBIDDEN });
    }

    const updates: Record<string, unknown> = {
      updatedAt: new Date(),
      updatedBy: requesterId,
    };

    if (body.role) {
      updates.role = body.role;
      updates.roleChangedAt = new Date();
    }

    if (body.action === "suspend") {
      updates.isSuspended = true;
      updates.suspendedAt = new Date();
      updates.suspendedBy = requesterId;
      if (body.reason) updates.suspensionReason = body.reason;
    } else if (body.action === "unsuspend") {
      updates.isSuspended = false;
      updates.unsuspendedAt = new Date();
      updates.unsuspendedBy = requesterId;
    }

    await targetMembership.membership.membershipRef.update(updates);

    await dbAdmin
      .collection("spaces")
      .doc(spaceId)
      .collection("activity")
      .add({
        type: "member_role_changed",
        performedBy: requesterId,
        targetUserId: body.userId,
        details: {
          oldRole: targetMembership.membership.membership.role,
          newRole: body.role || targetMembership.membership.membership.role,
          action: body.action || "role_change",
          reason: body.reason,
        },
        timestamp: new Date(),
      });

    logger.info(
      `Member ${body.action || "role change"}: ${body.userId} in space ${spaceId} by ${requesterId}`,
    );

    return respond.success({
      message: `Member ${body.action || "updated"} successfully`,
      updates,
    });
  },
);

export const DELETE = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ spaceId: string }> },
  respond,
) => {
  const requesterId = getUserId(request);
  const { spaceId } = await params;

  const query = RemoveMemberQuerySchema.safeParse(
    Object.fromEntries(request.nextUrl.searchParams.entries()),
  );
  if (!query.success) {
    return respond.error("User ID is required", "INVALID_INPUT", {
      status: HttpStatus.BAD_REQUEST,
    });
  }

  const requesterMembership = await requireSpaceMembership(spaceId, requesterId);
  if (!requesterMembership.ok) {
    const code =
      requesterMembership.status === HttpStatus.NOT_FOUND ? "RESOURCE_NOT_FOUND" : "FORBIDDEN";
    return respond.error(requesterMembership.error, code, { status: requesterMembership.status });
  }

  const targetMembership = await findActiveMember(spaceId, query.data.userId);
  if (!targetMembership.ok) {
    return respond.error(targetMembership.message, targetMembership.status === HttpStatus.NOT_FOUND ? "RESOURCE_NOT_FOUND" : "FORBIDDEN", {
      status: targetMembership.status,
    });
  }

  const requesterRole = requesterMembership.membership.membership.role;
  const targetRole = targetMembership.membership.membership.role;

  if (targetRole === "owner") {
    return respond.error("Cannot remove space owner", "FORBIDDEN", {
      status: HttpStatus.FORBIDDEN,
    });
  }
  if (targetRole === "admin" && requesterRole !== "owner") {
    return respond.error("Only space owners can remove admins", "FORBIDDEN", {
      status: HttpStatus.FORBIDDEN,
    });
  }
  if (targetRole === "moderator" && !["owner", "admin"].includes(requesterRole)) {
    return respond.error("Only admins and owners can remove moderators", "FORBIDDEN", {
      status: HttpStatus.FORBIDDEN,
    });
  }

  const removalTimestamp = admin.firestore.FieldValue.serverTimestamp();

  await targetMembership.membership.membershipRef.update({
    isActive: false,
    removedAt: removalTimestamp,
    removedBy: requesterId,
    updatedAt: removalTimestamp,
  });

  await dbAdmin
    .collection("spaces")
    .doc(spaceId)
    .update({
      "metrics.memberCount": admin.firestore.FieldValue.increment(-1),
      "metrics.activeMembers": admin.firestore.FieldValue.increment(-1),
      updatedAt: removalTimestamp,
    });

  await dbAdmin
    .collection("spaces")
    .doc(spaceId)
    .collection("activity")
    .add({
      type: "member_removed",
      performedBy: requesterId,
      targetUserId: query.data.userId,
      details: {
        removedRole: targetRole,
        reason: query.data.reason,
      },
      timestamp: new Date(),
    });

  logger.info(`Member removed: ${query.data.userId} from space ${spaceId} by ${requesterId}`);

  return respond.success({ message: "Member removed successfully" });
});
