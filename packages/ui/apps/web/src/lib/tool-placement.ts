import { dbAdmin } from '@/lib/firebase-admin';
import {
  PlacedToolSchema,
  PlacementTargetType,
  encodePlacementCompositeId,
  decodePlacementCompositeId,
  tryDecodePlacementCompositeId,
  getPlacementCollectionPath,
  getPlacementDocPath,
} from '@hive/core';

export function buildPlacementCompositeId(
  targetType: PlacementTargetType,
  targetId: string,
  placementId: string
) {
  return encodePlacementCompositeId(targetType, targetId, placementId);
}

export function parsePlacementCompositeId(compositeId: string) {
  return decodePlacementCompositeId(compositeId);
}

export function safeParsePlacementCompositeId(compositeId: string) {
  return tryDecodePlacementCompositeId(compositeId);
}

export async function createPlacementDocument(
  targetType: PlacementTargetType,
  targetId: string,
  data: unknown
) {
  const parsed = PlacedToolSchema.parse(data);
  const collectionPath = getPlacementCollectionPath(targetType, targetId);
  const ref = dbAdmin.collection(collectionPath).doc();
  await ref.set(parsed);

  return {
    ref,
    id: ref.id,
    path: ref.path,
  };
}

export function getPlacementDocRef(
  targetType: PlacementTargetType,
  targetId: string,
  placementId: string
) {
  const path = getPlacementDocPath(targetType, targetId, placementId);
  return dbAdmin.doc(path);
}

export async function getPlacementFromDeploymentDoc(
  deploymentDoc: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
) {
  if (!deploymentDoc.exists) {
    return null;
  }

  const data = deploymentDoc.data() as any;
  if (!data?.placementPath || !data?.targetType || !data?.targetId) {
    return null;
  }

  const placementRef = dbAdmin.doc(data.placementPath);
  const snapshot = await placementRef.get();

  return {
    snapshot,
    ref: placementRef,
    targetType: data.targetType as PlacementTargetType,
    targetId: data.targetId as string,
    placementId: placementRef.id,
    path: data.placementPath as string,
  };
}

export async function listPlacementsByTool(toolId: string) {
  const snapshot = await dbAdmin
    .collectionGroup('placed_tools')
    .where('toolId', '==', toolId)
    .get();

  return snapshot.docs.map((doc) => ({
    ref: doc.ref,
    data: doc.data(),
    path: doc.ref.path,
  }));
}

export async function listPlacementsForUser(userId: string) {
  const profilePlacements = await dbAdmin
    .collection(`profiles/${userId}/placed_tools`)
    .get();

  return profilePlacements.docs.map((doc) => ({
    ref: doc.ref,
    data: doc.data(),
    path: doc.ref.path,
  }));
}
