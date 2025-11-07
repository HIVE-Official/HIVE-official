import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { assertIsBuilder } from '../lib/guards';
import {
  getPlacementCollectionPath,
  encodePlacementCompositeId,
} from '../../../packages/core/src/domain/creation/placement';

const db = admin.firestore();

/**
 * Feature a tool in a space.
 * - Requires caller to be a builder in the space
 * - Ensures the tool exists
 * - Ensures an active deployment exists for the tool/space (creates one if missing)
 * - Records featured metadata on the space document
 */
export const featureToolInSpace = functions.https.onCall(async (data, context) => {
  const { spaceId, toolId } = data as { spaceId?: string; toolId?: string };

  // Validate arguments
  if (!spaceId || typeof spaceId !== 'string') {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with a valid "spaceId" argument.',
    );
  }
  if (!toolId || typeof toolId !== 'string') {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with a valid "toolId" argument.',
    );
  }

  // Assert builder role
  const uid = context.auth?.uid;
  await assertIsBuilder(uid, spaceId);

  try {
    // Validate tool exists
    const toolRef = db.collection('tools').doc(toolId);
    const toolSnap = await toolRef.get();
    if (!toolSnap.exists) {
      throw new functions.https.HttpsError('not-found', 'Tool not found.');
    }
    const toolData = toolSnap.data() || {};

    const placementCollectionPath = getPlacementCollectionPath('space', spaceId);
    const placementSnapshot = await db
      .collection(placementCollectionPath)
      .where('toolId', '==', toolId)
      .where('status', '==', 'active')
      .limit(1)
      .get();

    let deploymentId: string;

    if (placementSnapshot.empty) {
      const placementRef = db.collection(placementCollectionPath).doc();
      await placementRef.set({
        toolId,
        targetType: 'space',
        targetId: spaceId,
        surface: 'tools',
        status: 'active',
        position: 0,
        config: {},
        permissions: { canInteract: true, canView: true, canEdit: false, allowedRoles: ['member', 'moderator', 'admin', 'builder'] },
        settings: { showInDirectory: true, allowSharing: true, collectAnalytics: true, notifyOnInteraction: false },
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        createdBy: uid,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        usageCount: 0,
        metadata: {
          toolName: toolData.name,
          featured: true,
        },
      });

      deploymentId = encodePlacementCompositeId('space', spaceId, placementRef.id);

      await db.collection('deployedTools').doc(deploymentId).set({
        toolId,
        deployedBy: uid,
        deployedTo: 'space',
        targetId: spaceId,
        surface: 'tools',
        permissions: { canInteract: true, canView: true, canEdit: false, allowedRoles: ['member', 'moderator', 'admin', 'builder'] },
        status: 'active',
        deployedAt: admin.firestore.FieldValue.serverTimestamp(),
        usageCount: 0,
        settings: { showInDirectory: true, allowSharing: true, collectAnalytics: true, notifyOnInteraction: false },
        placementPath: placementRef.path,
        placementId: placementRef.id,
        targetType: 'space',
        isFeatured: true,
        spaceId,
        profileId: null,
        creatorId: uid,
      });
    } else {
      const placementDoc = placementSnapshot.docs[0];
      deploymentId = encodePlacementCompositeId('space', spaceId, placementDoc.id);
      await placementDoc.ref.set({ isFeatured: true }, { merge: true });
      await db.collection('deployedTools').doc(deploymentId).set({ isFeatured: true }, { merge: true });
    }

    // Record feature metadata on the space document
    const spaceRef = db.collection('spaces').doc(spaceId);
    await spaceRef.set(
      {
        featuredTools: admin.firestore.FieldValue.arrayUnion({
          toolId,
          deploymentId,
          featuredAt: admin.firestore.FieldValue.serverTimestamp(),
          featuredBy: uid,
        }),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    functions.logger.info('Tool featured in space', { spaceId, toolId, deploymentId, userId: uid });
    return {
      success: true,
      message: 'Tool featured successfully.',
      deploymentId,
      toolId,
      spaceId,
    };
  } catch (error) {
    functions.logger.error('Error featuring tool in space', { spaceId, toolId, error });
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError('internal', 'Failed to feature tool in space.');
  }
});
