import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const leaveSpace = functions.https.onCall(async (data, context) => {
  const userId = context.auth?.uid;
  if (!userId) {
    throw new functions.https.HttpsError('unauthenticated', 'You must be logged in to leave a space.');
  }

  const { spaceId } = data as { spaceId?: string };
  if (!spaceId || typeof spaceId !== 'string') {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a valid "spaceId" argument.');
  }

  const spaceRef = db.collection('spaces').doc(spaceId);

  try {
    await db.runTransaction(async (tx) => {
      // Prefer flat membership doc
      const flatQuery = await tx.get(
        db
          .collection('spaceMembers')
          .where('spaceId', '==', spaceId)
          .where('userId', '==', userId)
          .where('isActive', '==', true)
          .limit(1)
      );

      let performed = false;
      if (!flatQuery.empty) {
        const ref = flatQuery.docs[0].ref;
        tx.update(ref, {
          isActive: false,
          leftAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        performed = true;
      }

      // Legacy nested: delete if exists
      const nestedRef = db.collection('spaces').doc(spaceId).collection('members').doc(userId);
      const nestedDoc = await tx.get(nestedRef);
      if (nestedDoc.exists) {
        tx.delete(nestedRef);
        performed = true;
      }

      if (!performed) {
        throw new functions.https.HttpsError('not-found', 'You are not a member of this space.');
      }

      // Update metrics on the space doc
      tx.update(spaceRef, {
        'metrics.memberCount': admin.firestore.FieldValue.increment(-1),
        'metrics.activeMembers': admin.firestore.FieldValue.increment(-1),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    functions.logger.info('User left space', { userId, spaceId });
    return { success: true, message: 'Successfully left the space.' };
  } catch (error) {
    functions.logger.error('Error processing leaveSpace', { userId, spaceId, error });
    if (error instanceof functions.https.HttpsError) throw error;
    throw new functions.https.HttpsError('internal', 'An unexpected error occurred while trying to leave the space.');
  }
});
