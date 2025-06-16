import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const leaveSpace = functions.https.onCall(async (data, context) => {
  const userId = context.auth?.uid;
  if (!userId) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'You must be logged in to leave a space.',
    );
  }

  const { spaceId } = data;
  if (!spaceId || typeof spaceId !== 'string') {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with a valid "spaceId" argument.',
    );
  }

  const memberRef = db.collection('spaces').doc(spaceId).collection('members').doc(userId);
  const spaceRef = db.collection('spaces').doc(spaceId);

  try {
    await db.runTransaction(async (transaction) => {
      const memberDoc = await transaction.get(memberRef);

      if (!memberDoc.exists) {
        throw new functions.https.HttpsError(
          'not-found',
          'You are not a member of this space.',
        );
      }

      transaction.delete(memberRef);
      transaction.update(spaceRef, {
        memberCount: admin.firestore.FieldValue.increment(-1),
      });
    });

    functions.logger.info(`User ${userId} successfully left space ${spaceId}`);
    return { success: true, message: 'Successfully left the space.' };
  } catch (error) {
    functions.logger.error(`Error allowing user ${userId} to leave space ${spaceId}`, error);
    if (error instanceof functions.https.HttpsError) {
        throw error;
    }
    throw new functions.https.HttpsError(
      'internal',
      'An unexpected error occurred while trying to leave the space.',
    );
  }
}); 