import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { z } from 'zod';
import {
  decodePlacementCompositeId,
  getPlacementDocPath,
} from '../../../packages/core/src/domain/creation/placement';

const SubmissionSchema = z.object({
  placementCompositeId: z.string().optional(),
  deploymentId: z.string().optional(),
  actionName: z.string().min(1),
  elementId: z.string().optional(),
  payload: z.record(z.unknown()).optional(),
  responseData: z.record(z.unknown()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const handleToolSubmission = functions.https.onCall(async (data, context) => {
  const uid = context.auth?.uid;
  if (!uid) {
    throw new functions.https.HttpsError('unauthenticated', 'You must be logged in to submit tool data.');
  }

  const parsed = SubmissionSchema.safeParse(data);
  if (!parsed.success) {
    throw new functions.https.HttpsError('invalid-argument', parsed.error.message);
  }

  const {
    placementCompositeId,
    deploymentId,
    actionName,
    elementId,
    payload,
    responseData,
    metadata,
  } = parsed.data;

  if (!placementCompositeId && !deploymentId) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Must provide placementCompositeId or deploymentId.'
    );
  }

  const db = admin.firestore();

  let targetType: 'space' | 'profile';
  let targetId: string;
  let placementId: string;
  let placementPath: string | null = null;

  if (placementCompositeId) {
    const decoded = decodePlacementCompositeId(placementCompositeId);
    targetType = decoded.targetType;
    targetId = decoded.targetId;
    placementId = decoded.placementId;
    placementPath = getPlacementDocPath(targetType, targetId, placementId);
  } else {
    const deploymentDoc = await db.collection('deployedTools').doc(deploymentId!).get();
    if (!deploymentDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Deployment not found.');
    }

    const deploymentData = deploymentDoc.data() || {};
    if (!deploymentData.placementPath || !deploymentData.targetType || !deploymentData.placementId) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'Deployment is missing placement metadata.'
      );
    }

    placementPath = deploymentData.placementPath;
    targetType = deploymentData.targetType;
    targetId = deploymentData.targetId;
    placementId = deploymentData.placementId;
  }

  if (!placementPath) {
    placementPath = getPlacementDocPath(targetType, targetId, placementId);
  }

  const placementRef = db.doc(placementPath);
  const placementSnap = await placementRef.get();
  if (!placementSnap.exists) {
    throw new functions.https.HttpsError('not-found', 'Placement not found.');
  }

  const responsesRef = placementRef.collection('responses').doc(uid);
  const now = admin.firestore.FieldValue.serverTimestamp();

  const submissionRecord = {
    userId: uid,
    actionName,
    elementId: elementId || null,
    payload: payload || {},
    responseData: responseData || {},
    metadata: metadata || {},
    submittedAt: now,
    updatedAt: now,
  };

  await responsesRef.set(submissionRecord, { merge: true });

  await placementRef.set(
    {
      responseCount: admin.firestore.FieldValue.increment(1),
      lastResponseAt: now,
    },
    { merge: true }
  );

  return {
    placementId,
    targetType,
    targetId,
    actionName,
    submittedAt: new Date().toISOString(),
  };
});
