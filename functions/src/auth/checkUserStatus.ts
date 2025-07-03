import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/v1/https';
import * as admin from 'firebase-admin';

// This is a placeholder. The full implementation will be done in a later step.
// It checks if a user profile exists in Firestore.

export const checkUserStatus = functions.https.onCall(
  async (data: unknown, context: CallableContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'The function must be called while authenticated.'
      );
    }

    const uid = context.auth.uid;
    const userRef = admin.firestore().collection('users').doc(uid);

    try {
      const userDoc = await userRef.get();
      return { profileExists: userDoc.exists };
    } catch (error) {
      console.error('Error checking user status:', error);
      throw new functions.https.HttpsError(
        'internal',
        'An error occurred while checking user status.'
      );
    }
  }
); 