import { z } from "zod";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import * as admin from 'firebase-admin';
import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@/lib/logger";
import { withAuthValidationAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware";

const leaveSpaceSchema = z.object({
  spaceId: z.string().min(1, "Space ID is required")
});

/**
 * Leave a space manually - Updated for flat collection structure
 * POST /api/spaces/leave
 */
export const POST = withAuthValidationAndErrors(
  leaveSpaceSchema,
  async (request: AuthenticatedRequest, context, body: z.infer<typeof leaveSpaceSchema>, respond) => {
    const { spaceId } = body;
    const userId = getUserId(request);

    // Get space from flat collection
    const spaceDoc = await dbAdmin.collection('spaces').doc(spaceId).get();

    if (!spaceDoc.exists) {
      return respond.error("Space not found", "RESOURCE_NOT_FOUND", { status: 404 });
    }

    const space = spaceDoc.data()!;

    // Check if user is actually a member using flat spaceMembers collection
    const membershipQuery = dbAdmin.collection('spaceMembers')
      .where('spaceId', '==', spaceId)
      .where('userId', '==', userId)
      .where('isActive', '==', true)
      .limit(1);
    
    const membershipSnapshot = await membershipQuery.get();

    if (membershipSnapshot.empty) {
      return respond.error("You are not a member of this space", "RESOURCE_NOT_FOUND", { status: 404 });
    }

    const memberDoc = membershipSnapshot.docs[0];
    const memberData = memberDoc.data();

    // Prevent owners from leaving if they're the only owner
    if (memberData.role === "owner") {
      // Check if there are other owners
      const otherOwnersQuery = dbAdmin.collection('spaceMembers')
        .where('spaceId', '==', spaceId)
        .where('role', '==', 'owner')
        .where('isActive', '==', true)
        .limit(2);
      
      const otherOwnersSnapshot = await otherOwnersQuery.get();
      
      if (otherOwnersSnapshot.size <= 1) {
        return respond.error("Cannot leave space: You are the only owner. Transfer ownership or promote another member first.", "BUSINESS_RULE_VIOLATION", { status: 409 });
      }
    }

    // Perform the leave operation atomically
    const batch = dbAdmin.batch();
    const now = admin.firestore.FieldValue.serverTimestamp();

    // Mark membership as inactive instead of deleting
    batch.update(memberDoc.ref, {
      isActive: false,
      leftAt: now
    });

    // Decrement the space's member count
    batch.update(spaceDoc.ref, {
      'metrics.memberCount': admin.firestore.FieldValue.increment(-1),
      'metrics.activeMembers': admin.firestore.FieldValue.increment(-1),
      updatedAt: now
    });

    // Record leave activity
    const activityRef = dbAdmin.collection('activityEvents').doc();
    batch.set(activityRef, {
      userId,
      type: 'space_leave',
      spaceId,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      metadata: {
        spaceName: space.name,
        spaceType: space.type,
        previousRole: memberData.role
      }
    });

    // Execute all operations atomically
    await batch.commit();

    logger.info('✅ User left space successfully', {
      userId,
      spaceId,
      spaceName: space.name,
      previousRole: memberData.role,
      endpoint: '/api/spaces/leave'
    });

    return respond.success({
      space: {
        id: spaceId,
        name: space.name,
        type: space.type,
        description: space.description
      }
    }, {
      message: "Successfully left the space"
    });

  }
);
