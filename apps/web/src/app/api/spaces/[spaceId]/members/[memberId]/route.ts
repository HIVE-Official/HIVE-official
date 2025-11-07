import { z } from "zod";
import * as admin from 'firebase-admin';
import { dbAdmin } from "@/lib/firebase-admin";
import { withAuthAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware";
import { HttpStatus } from "@/lib/api-response-types";
import { requireSpaceMembership } from "@/lib/space-security";
import { logger } from "@/lib/logger";

const UpdateMemberRoleSchema = z.object({
  role: z.enum(['owner', 'admin', 'moderator', 'member', 'guest'])
});

// PATCH /api/spaces/[spaceId]/members/[memberId] - Update a member's role (flat membership model)
export const PATCH = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ spaceId: string; memberId: string }> },
  respond
) => {
  const { spaceId, memberId } = await params;
  const requesterId = getUserId(request);

  // Validate payload
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return respond.error("Invalid request body", "INVALID_INPUT", { status: HttpStatus.BAD_REQUEST });
  }
  const parse = UpdateMemberRoleSchema.safeParse(body);
  if (!parse.success) {
    return respond.error("Invalid role", "VALIDATION_ERROR", { status: HttpStatus.BAD_REQUEST });
  }
  const { role: newRole } = parse.data;

  const requesterMembership = await requireSpaceMembership(spaceId, requesterId);
  if (!requesterMembership.ok) {
    const code =
      requesterMembership.status === HttpStatus.NOT_FOUND ? 'RESOURCE_NOT_FOUND' : 'FORBIDDEN';
    return respond.error(requesterMembership.error, code, { status: requesterMembership.status });
  }
  const requesterRole = requesterMembership.membership.role as string;

  const targetMembership = await requireSpaceMembership(spaceId, memberId);
  if (!targetMembership.ok) {
    const isNotMember = targetMembership.error === 'User is not a member of this space';
    const status = isNotMember ? HttpStatus.NOT_FOUND : targetMembership.status;
    const code = status === HttpStatus.NOT_FOUND ? 'RESOURCE_NOT_FOUND' : 'FORBIDDEN';
    return respond.error(isNotMember ? "Member not found" : targetMembership.error, code, { status });
  }
  const targetRole = targetMembership.membership.role as string;

  // Permission checks
  const canManageMembers = ['owner', 'admin'].includes(requesterRole);
  const canModerateAdmins = requesterRole === 'owner';
  if (!canManageMembers) {
    return respond.error("Insufficient permissions to update members", "FORBIDDEN", { status: HttpStatus.FORBIDDEN });
  }
  if (targetRole === 'owner') {
    return respond.error("Cannot change role of space owner", "FORBIDDEN", { status: HttpStatus.FORBIDDEN });
  }
  if (targetRole === 'admin' && !canModerateAdmins) {
    return respond.error("Only owners can change admin roles", "FORBIDDEN", { status: HttpStatus.FORBIDDEN });
  }

  // Apply update
  await targetMembership.membershipRef.update({
    role: newRole,
    roleChangedAt: admin.firestore.FieldValue.serverTimestamp(),
    roleChangedBy: requesterId
  });

  logger.info('Member role updated', { spaceId, memberId, newRole, by: requesterId });
  return respond.success({ message: 'Member updated', role: newRole });
});

// DELETE /api/spaces/[spaceId]/members/[memberId] - Remove a member (soft remove: mark inactive)
export const DELETE = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ spaceId: string; memberId: string }> },
  respond
) => {
  const { spaceId, memberId } = await params;
  const requesterId = getUserId(request);

  const requesterMembership = await requireSpaceMembership(spaceId, requesterId);
  if (!requesterMembership.ok) {
    const code =
      requesterMembership.status === HttpStatus.NOT_FOUND ? 'RESOURCE_NOT_FOUND' : 'FORBIDDEN';
    return respond.error(requesterMembership.error, code, { status: requesterMembership.status });
  }
  const requesterRole = requesterMembership.membership.role as string;

  const targetMembership = await requireSpaceMembership(spaceId, memberId);
  if (!targetMembership.ok) {
    const isNotMember = targetMembership.error === 'User is not a member of this space';
    const status = isNotMember ? HttpStatus.NOT_FOUND : targetMembership.status;
    const code = status === HttpStatus.NOT_FOUND ? 'RESOURCE_NOT_FOUND' : 'FORBIDDEN';
    return respond.error(isNotMember ? "Member not found" : targetMembership.error, code, { status });
  }
  const targetRole = targetMembership.membership.role as string;

  // Permission checks
  const canRemoveMembers = ['owner', 'admin', 'moderator'].includes(requesterRole);
  if (!canRemoveMembers) {
    return respond.error("Insufficient permissions to remove members", "FORBIDDEN", { status: HttpStatus.FORBIDDEN });
  }
  if (targetRole === 'owner') {
    return respond.error("Cannot remove space owner", "FORBIDDEN", { status: HttpStatus.FORBIDDEN });
  }
  if (targetRole === 'admin' && requesterRole !== 'owner') {
    return respond.error("Only owners can remove admins", "FORBIDDEN", { status: HttpStatus.FORBIDDEN });
  }
  if (targetRole === 'moderator' && !['owner', 'admin'].includes(requesterRole)) {
    return respond.error("Only admins and owners can remove moderators", "FORBIDDEN", { status: HttpStatus.FORBIDDEN });
  }

  // Soft-remove and update metrics atomically
  const batch = dbAdmin.batch();
  batch.update(targetMembership.membershipRef, {
    isActive: false,
    leftAt: admin.firestore.FieldValue.serverTimestamp(),
    removedBy: requesterId
  });
  batch.update(dbAdmin.collection('spaces').doc(spaceId), {
    'metrics.memberCount': admin.firestore.FieldValue.increment(-1),
    'metrics.activeMembers': admin.firestore.FieldValue.increment(-1),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  });
  await batch.commit();

  logger.info('Member removed from space', { spaceId, memberId, by: requesterId });
  return respond.success({ message: 'Member removed' });
});
