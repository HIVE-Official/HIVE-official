import { z } from "zod";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import * as admin from 'firebase-admin';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from "@/lib/logger";
import { withAuthValidationAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware";
import { validateSpaceJoinability, addSecureCampusMetadata, CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";

const joinSpaceSchema = z.object({
  spaceId: z.string().min(1, "Space ID is required")
});

/**
 * Join a space manually - Updated for flat collection structure
 * POST /api/spaces/join
 */
export const POST = withAuthValidationAndErrors(
  joinSpaceSchema,
  async (request: AuthenticatedRequest, context, body: z.infer<typeof joinSpaceSchema>, respond) => {
    const { spaceId } = body;
    const userId = getUserId(request);

    // SECURITY: Use secure validation with campus isolation
    const joinValidation = await validateSpaceJoinability(userId, spaceId);

    if (!joinValidation.canJoin) {
      const status = joinValidation.error === 'Space not found' ? 404 : 403;
      return respond.error(joinValidation.error!, "FORBIDDEN", { status });
    }

    const space = joinValidation.space!;

    // Check for existing inactive membership to reactivate
    const existingMembershipQuery = dbAdmin.collection('spaceMembers')
      .where('spaceId', '==', spaceId)
      .where('userId', '==', userId)
      .limit(1);

    const existingMembershipSnapshot = await existingMembershipQuery.get();

    // Perform the join operation atomically using batch write
    const batch = dbAdmin.batch();
    const now = admin.firestore.FieldValue.serverTimestamp();

    // If user had inactive membership, reactivate it
    if (!existingMembershipSnapshot.empty) {
      const existingMemberDoc = existingMembershipSnapshot.docs[0];
      const memberData = existingMemberDoc.data();

      // Only reactivate if it's inactive
      if (!memberData.isActive) {
        batch.update(existingMemberDoc.ref, {
          isActive: true,
          joinedAt: now,
          permissions: ['post']
        });
      } else {
        return respond.error("You are already a member of this space", "CONFLICT", { status: 409 });
      }
    } else {
      // Create new membership with secure campus metadata
      const memberRef = dbAdmin.collection('spaceMembers').doc();
      batch.set(memberRef, addSecureCampusMetadata({
        spaceId,
        userId,
        role: 'member',
        joinedAt: now,
        isActive: true,
        permissions: ['post'],
        joinMethod: 'manual'
      }));
    }

    // Update space member count
    const spaceRef = dbAdmin.collection('spaces').doc(spaceId);
    batch.update(spaceRef, {
      'metrics.memberCount': admin.firestore.FieldValue.increment(1),
      'metrics.activeMembers': admin.firestore.FieldValue.increment(1),
      updatedAt: now
    });

    // Record join activity with campus metadata
    const activityRef = dbAdmin.collection('activityEvents').doc();
    batch.set(activityRef, addSecureCampusMetadata({
      userId,
      type: 'space_join',
      spaceId,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      metadata: {
        spaceName: space.name,
        spaceType: space.type,
        joinMethod: 'manual'
      }
    }));

    // Execute all operations atomically
    await batch.commit();

    logger.info('✅ User joined space successfully', {
      userId,
      spaceId,
      spaceName: space.name,
      endpoint: '/api/spaces/join'
    });

    return respond.success({
      space: {
        id: spaceId,
        name: space.name,
        type: space.type,
        description: space.description
      }
    }, {
      message: "Successfully joined the space"
    });
  }
);
