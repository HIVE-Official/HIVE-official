import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const claimSpace = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'You must be logged in to claim a space.');
  }

  const { spaceId } = data;
  const { uid } = context.auth;

  const userDoc = await db.doc(`users/${uid}`).get();
  const user = userDoc.data();

  if (!user || user.role !== 'builder') {
    throw new functions.https.HttpsError('permission-denied', 'You must be a builder to claim a space.');
  }

  const spaceRef = db.doc(`spaces/${spaceId}`);
  const spaceDoc = await spaceRef.get();

  if (!spaceDoc.exists) {
    throw new functions.https.HttpsError('not-found', 'The specified space does not exist.');
  }

  const space = spaceDoc.data();

  if (space && space.claimedBy) {
    throw new functions.https.HttpsError('failed-precondition', 'This space has already been claimed.');
  }

  await spaceRef.update({
    claimedBy: uid,
    claimedAt: new Date(),
  });

  return { success: true };
}); 