import { z } from "zod";
import * as admin from "firebase-admin/firestore";
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from "@/lib/logger";
import { withAuthValidationAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware";

const joinSpaceSchema = z.object({
  spaceId: z.string().min(1, "Space ID is required")
});

/**
 * Join a space manually - Updated for flat collection structure
 * POST /api/spaces/join
 */
export const POST = withAuthValidationAndErrors(
  joinSpaceSchema,
  async (request: AuthenticatedRequest, context, { spaceId }, respond) => {
    const userId = getUserId(request);

    // Get space details from flat collection
    const spaceDoc = await dbAdmin.collection('spaces').doc(spaceId).get();

    if (!spaceDoc.exists) {
      return respond.error("Space not found", "RESOURCE_NOT_FOUND", { status: 404 });
    }

    const space = spaceDoc.data()!;

    // Check if space is private and requires invitation
    if (space.isPrivate) {
      return respond.error("This space is private and requires an invitation", "FORBIDDEN", { status: 403 });
    }

    // Check if user is already a member using flat spaceMembers collection
    const existingMembershipQuery = dbAdmin.collection('spaceMembers')
      .where('spaceId', '==', spaceId)
      .where('userId', '==', userId)
      .limit(1);
    
    const existingMembershipSnapshot = await existingMembershipQuery.get();

    if (!existingMembershipSnapshot.empty) {
      const existingMember = existingMembershipSnapshot.docs[0].data();
      if (existingMember.isActive) {
        return respond.error("You are already a member of this space", "CONFLICT", { status: 409 });
      }
      // If inactive membership exists, we'll reactivate it below
    }

    // Greek life restriction: Check if user is trying to join a Greek life space
    if (space.type === 'greek_life') {
      // Check if user is already in any Greek life space
      const existingGreekQuery = dbAdmin.collection('spaceMembers')
        .where('userId', '==', userId)
        .where('isActive', '==', true);
      
      const existingGreekSnapshot = await existingGreekQuery.get();
      
      for (const memberDoc of existingGreekSnapshot.docs) {
        const memberData = memberDoc.data();
        // Check if this membership is for a Greek life space
        const memberSpaceDoc = await dbAdmin.collection('spaces').doc(memberData.spaceId).get();
        if (memberSpaceDoc.exists && memberSpaceDoc.data()?.type === 'greek_life') {
          return respond.error("You can only be a member of one Greek life organization at a time", "FORBIDDEN", { status: 403 });
        }
      }
    }

    // Perform the join operation atomically using batch write
    const batch = dbAdmin.batch();
    const now = admin.firestore.FieldValue.serverTimestamp();

    // If user had inactive membership, reactivate it
    if (!existingMembershipSnapshot.empty) {
      const existingMemberDoc = existingMembershipSnapshot.docs[0];
      batch.update(existingMemberDoc.ref, {
        isActive: true,
        joinedAt: now,
        permissions: ['post']
      });
    } else {
      // Create new membership in flat spaceMembers collection
      const memberRef = dbAdmin.collection('spaceMembers').doc();
      batch.set(memberRef, {
        spaceId,
        userId,
        role: 'member',
        joinedAt: now,
        isActive: true,
        permissions: ['post'],
        joinMethod: 'manual'
      });
    }

    // Update space member count
    batch.update(spaceDoc.ref, {
      'metrics.memberCount': admin.firestore.FieldValue.increment(1),
      'metrics.activeMembers': admin.firestore.FieldValue.increment(1),
      updatedAt: now
    });

    // Record join activity
    const activityRef = dbAdmin.collection('activityEvents').doc();
    batch.set(activityRef, {
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
    });

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
