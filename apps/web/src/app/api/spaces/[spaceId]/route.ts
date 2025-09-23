import { z } from "zod";
import { type Space } from "@hive/core";
import { dbAdmin } from "@/lib/firebase-admin";
import { findSpaceOptimized } from "@/lib/space-query-optimizer";
import { logger } from "@/lib/structured-logger";
import { withAuthAndErrors, withAuthValidationAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware";

const UpdateSpaceSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  bannerUrl: z.string().url().optional(),
  tags: z.array(z.object({
    type: z.string(),
    sub_type: z.string()
  })).optional(),
  settings: z.object({
    allowMemberPosts: z.boolean().optional(),
    requireApproval: z.boolean().optional(),
    allowGuestView: z.boolean().optional(),
    maxMembers: z.number().min(1).max(10000).optional()
  }).optional()
});

export const GET = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ spaceId: string }> },
  respond
) => {
  const { spaceId } = await params;

  if (!spaceId) {
    return respond.error("Space ID is required", "INVALID_INPUT", { status: 400 });
  }

  // Get space from flat collection structure
  const spaceDoc = await dbAdmin.collection('spaces').doc(spaceId).get();

  if (!spaceDoc.exists) {
    return respond.error("Space not found", "RESOURCE_NOT_FOUND", { status: 404 });
  }

  const space = { id: spaceDoc.id, ...spaceDoc.data() } as Space;

  logger.info(`Space fetched: ${spaceId}`, { spaceId, endpoint: "/api/spaces/[spaceId]" });

  return respond.success(space);
});

// PATCH /api/spaces/[spaceId] - Update space settings
type UpdateSpaceData = z.infer<typeof UpdateSpaceSchema>;

export const PATCH = withAuthValidationAndErrors(
  UpdateSpaceSchema,
  async (
    request: AuthenticatedRequest,
    { params }: { params: Promise<{ spaceId: string }> },
    updates: UpdateSpaceData,
    respond
  ) => {
    const { spaceId } = await params;
    const userId = getUserId(request);

    if (!spaceId) {
      return respond.error("Space ID is required", "INVALID_INPUT", { status: 400 });
    }

    const updateKeys = Object.keys(updates);
    if (updateKeys.length === 0) {
      return respond.error("No updates provided", "INVALID_INPUT", { status: 400 });
    }

    // Get space from flat collection structure
    const spaceRef = dbAdmin.collection('spaces').doc(spaceId);
    const spaceDoc = await spaceRef.get();

    if (!spaceDoc.exists) {
      return respond.error("Space not found", "RESOURCE_NOT_FOUND", { status: 404 });
    }

    // Check if requesting user has permission to update space using flat spaceMembers collection
    const memberQuery = dbAdmin.collection('spaceMembers')
      .where('spaceId', '==', spaceId)
      .where('userId', '==', userId)
      .where('isActive', '==', true)
      .limit(1);

    const memberSnapshot = await memberQuery.get();

    if (memberSnapshot.empty) {
      return respond.error("Not a member of this space", "FORBIDDEN", { status: 403 });
    }

    const memberData = memberSnapshot.docs[0].data();
    const memberRole = memberData.role;
    const canUpdateSpace = ['owner', 'admin'].includes(memberRole);

    if (!canUpdateSpace) {
      return respond.error("Insufficient permissions to update space", "FORBIDDEN", { status: 403 });
    }

    // Prepare update data
    const updateData = {
      ...updates,
      updatedAt: new Date(),
      updatedBy: userId
    } as Record<string, any>;

    // Update space document
    await spaceRef.update(updateData);

    // Log the action
    await spaceRef.collection("activity").add({
      type: 'space_updated',
      performedBy: userId,
      details: {
        updates: updateKeys,
        description: updates.description ? 'Updated space description' : undefined,
        name: updates.name ? 'Updated space name' : undefined
      },
      timestamp: new Date()
    });

    logger.info(`Space updated: ${spaceId} by ${userId}`, { updates: updateKeys });

    return respond.success({
      message: "Space updated successfully",
      updates
    });
  }
);
