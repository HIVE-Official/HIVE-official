import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { type Member } from '@hive/core/src/domain/firestore/member';

const db = admin.firestore();

export const requestBuilderRole = functions.https.onCall(async (data, context) => {
  const userId = context.auth?.uid;
  if (!userId) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'You must be logged in to request a builder role.',
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

  try {
    await db.runTransaction(async (transaction) => {
      const memberDoc = await transaction.get(memberRef);

      if (!memberDoc.exists) {
        throw new functions.https.HttpsError(
          'not-found',
          'You must be a member of this space to request a builder role.',
        );
      }

      const memberData = memberDoc.data() as Member;
      if (memberData.role !== 'member') {
        throw new functions.https.HttpsError(
          'failed-precondition',
          `Your current role (${memberData.role}) does not permit this action.`,
        );
      }

      transaction.update(memberRef, { role: 'requested_builder' });
    });

    functions.logger.info(`User ${userId} successfully requested builder role for space ${spaceId}`);
    return { success: true, message: 'Your request has been submitted for review.' };
  } catch (error) {
    functions.logger.error(`Error processing builder role request for user ${userId} in space ${spaceId}`, error);
    if (error instanceof functions.https.HttpsError) {
        throw error;
    }
    throw new functions.https.HttpsError(
      'internal',
      'An unexpected error occurred while submitting your request.',
    );
  }
}); 