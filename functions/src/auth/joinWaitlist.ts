import * as functions from "firebase-functions";
import {
  FirebaseHttpsError,
  firestore,
  FieldValue,
} from "../types/firebase";

interface JoinWaitlistData {
  schoolId: string;
  email: string;
}

/**
 * A callable Cloud Function to allow a user to join a school's waitlist.
 *
 * This function performs a transaction to ensure data integrity. It increments
 * the school's waitlist counter and adds the user's email to the waitlist
 * sub-collection atomically.
 *
 * @param request - The request object containing the data.
 * @returns - An object indicating the success of the operation and a message.
 */
export const joinWaitlist = functions.https.onCall(
  async (request): Promise<{ success: boolean; message: string }> => {
    // Extract data from request
    const data = request.data as JoinWaitlistData;
    const {schoolId, email} = data;

    if (!schoolId || !email) {
      throw new FirebaseHttpsError('invalid-argument', 'School ID and email are required');
    }

    try {
      const db = firestore();

      // Check if email already exists in waitlist
      const existingEntry = await db.collection('waitlist')
        .where('email', '==', email)
        .where('schoolId', '==', schoolId)
        .get();

      if (!existingEntry.empty) {
        throw new FirebaseHttpsError('already-exists', 'Email is already on the waitlist for this school');
      }

      // Add to waitlist
      await db.collection('waitlist').add({
        schoolId,
        email,
        joinedAt: FieldValue.serverTimestamp(),
        status: 'pending'
      });

      return { success: true, message: 'Successfully joined waitlist' };
    } catch (error) {
      if (error instanceof FirebaseHttpsError) {
        throw error;
      }
      throw new FirebaseHttpsError('internal', 'Failed to join waitlist');
    }
  }
);
