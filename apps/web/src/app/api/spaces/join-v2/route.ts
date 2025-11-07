import { z } from "zod";
import * as admin from 'firebase-admin';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from "@/lib/logger";
import { withAuthValidationAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware";
import { validateSpaceJoinability, addSecureCampusMetadata, CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";
import { HttpStatus } from "@/lib/api-response-types";

/**
 * Space Join API v2
 * - Idempotent join
 * - Reactivates inactive membership
 * - Records join method and optional metadata
 */
const joinV2Schema = z.object({
  spaceId: z.string().min(1, "Space ID is required"),
  joinMethod: z.enum(['manual', 'invite', 'approval', 'auto']).optional(),
  inviteCode: z.string().optional(),
  metadata: z.record(z.any()).optional()
});

export const POST = withAuthValidationAndErrors(
  joinV2Schema,
  async (request: AuthenticatedRequest, _context, body: z.infer<typeof joinV2Schema>, respond) => {
    const { spaceId, inviteCode, metadata } = body;
    const joinMethod = body.joinMethod ?? 'manual';
    const userId = getUserId(request);

    // SECURITY: Validate ability to join with campus isolation
    const joinValidation = await validateSpaceJoinability(userId, spaceId);
    if (!joinValidation.canJoin) {
      const status = joinValidation.error === 'Space not found' ? HttpStatus.NOT_FOUND : HttpStatus.FORBIDDEN;
      const code = status === HttpStatus.NOT_FOUND ? "RESOURCE_NOT_FOUND" : "FORBIDDEN";
      return respond.error(joinValidation.error!, code, { status });
    }

    const space = joinValidation.space!;

    // Check for existing membership (active or inactive)
    const existingMembershipQuery = dbAdmin.collection('spaceMembers')
      .where('spaceId', '==', spaceId)
      .where('userId', '==', userId)
      .where('campusId', '==', CURRENT_CAMPUS_ID)
      .limit(1);

    const existingMembershipSnapshot = await existingMembershipQuery.get();

    const batch = dbAdmin.batch();
    const now = admin.firestore.FieldValue.serverTimestamp();

    if (!existingMembershipSnapshot.empty) {
      const existingMemberDoc = existingMembershipSnapshot.docs[0];
      const memberData = existingMemberDoc.data();
      if (memberData.isActive) {
        return respond.error("You are already a member of this space", "CONFLICT", {
          status: HttpStatus.CONFLICT,
        });
      }
      batch.update(existingMemberDoc.ref, {
        isActive: true,
        joinedAt: now,
        joinMethod,
        joinMetadata: { inviteCode: inviteCode || null, ...(metadata || {}) },
        permissions: memberData.permissions || ['post']
      });
    } else {
      const memberRef = dbAdmin.collection('spaceMembers').doc();
      batch.set(memberRef, addSecureCampusMetadata({
        spaceId,
        userId,
        role: 'member',
        joinedAt: now,
        isActive: true,
        permissions: ['post'],
        joinMethod,
        joinMetadata: { inviteCode: inviteCode || null, ...(metadata || {}) }
      }));
    }

    // Update space metrics
    const spaceRef = dbAdmin.collection('spaces').doc(spaceId);
    batch.update(spaceRef, {
      'metrics.memberCount': admin.firestore.FieldValue.increment(1),
      'metrics.activeMembers': admin.firestore.FieldValue.increment(1),
      updatedAt: now
    });

    await batch.commit();

    logger.info('✅ User joined space (v2)', { userId, spaceId, joinMethod, endpoint: '/api/spaces/join-v2' });

    return respond.success({
      space: { id: spaceId, name: space.name, type: space.type, description: space.description },
      membership: { userId, role: 'member', isActive: true, joinMethod }
    }, { message: 'Successfully joined the space' });
  }
);
