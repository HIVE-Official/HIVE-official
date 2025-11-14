import { dbAdmin } from './firebase-admin';
import type { DocumentSnapshot, DocumentReference } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';

/**
 * Build a composite ID for placement document
 */
export function buildPlacementCompositeId(deploymentId: string, toolId: string): string {
  return `${deploymentId}_${toolId}`;
}

/**
 * Create a placement document in the target space or profile
 */
export async function createPlacementDocument(params: {
  deployedTo: 'space' | 'profile';
  targetId: string;
  spaceType?: string;
  toolId: string;
  deploymentId: string;
  surface?: string;
  permissions?: any;
  settings?: any;
}): Promise<DocumentReference> {
  const placementId = buildPlacementCompositeId(params.deploymentId, params.toolId);

  let placementRef: DocumentReference;

  if (params.deployedTo === 'space' && params.spaceType) {
    placementRef = dbAdmin
      .collection('spaces')
      .doc(params.spaceType)
      .collection('spaces')
      .doc(params.targetId)
      .collection('toolsPlaced')
      .doc(placementId);
  } else if (params.deployedTo === 'profile') {
    placementRef = dbAdmin
      .collection('users')
      .doc(params.targetId)
      .collection('toolsPlaced')
      .doc(placementId);
  } else {
    throw new Error('Invalid deployment target');
  }

  await placementRef.set({
    toolId: params.toolId,
    deploymentId: params.deploymentId,
    surface: params.surface || 'default',
    status: 'active',
    permissions: params.permissions || { canInteract: true },
    settings: params.settings || {},
    usageCount: 0,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return placementRef;
}

/**
 * Get placement context from a deployment document
 * This retrieves the toolsPlaced document from the space where the tool is deployed
 */
export async function getPlacementFromDeploymentDoc(
  deploymentDoc: DocumentSnapshot
): Promise<{ snapshot: DocumentSnapshot; ref: DocumentReference } | null> {
  try {
    const deploymentData = deploymentDoc.data();
    if (!deploymentData) return null;

    // If the tool is deployed to a space, get the placement document from the space
    if (deploymentData.deployedTo === 'space' && deploymentData.targetId && deploymentData.placementId) {
      const spaceType = deploymentData.spaceType || 'student_organizations';
      const placementRef = dbAdmin
        .collection('spaces')
        .doc(spaceType)
        .collection('spaces')
        .doc(deploymentData.targetId)
        .collection('toolsPlaced')
        .doc(deploymentData.placementId);

      const placementSnapshot = await placementRef.get();

      if (placementSnapshot.exists) {
        return {
          snapshot: placementSnapshot,
          ref: placementRef
        };
      }
    }

    // If deployed to profile, get from user's profile toolsPlaced
    if (deploymentData.deployedTo === 'profile' && deploymentData.targetId && deploymentData.placementId) {
      const placementRef = dbAdmin
        .collection('users')
        .doc(deploymentData.targetId)
        .collection('toolsPlaced')
        .doc(deploymentData.placementId);

      const placementSnapshot = await placementRef.get();

      if (placementSnapshot.exists) {
        return {
          snapshot: placementSnapshot,
          ref: placementRef
        };
      }
    }

    return null;
  } catch (error) {
    console.error('Error getting placement from deployment:', error);
    return null;
  }
}
