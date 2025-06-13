import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

/**
 * A callable Cloud Function to allow a user to join a school's waitlist.
 *
 * This function performs a transaction to ensure data integrity. It increments
 * the school's waitlist counter and adds the user's email to the waitlist
 * sub-collection atomically.
 *
 * @param data - The data passed to the function, expecting `schoolId` and `email`.
 * @param context - The context of the function call.
 */
export const joinWaitlist = functions.https.onCall(async (data, context) => {
  const {schoolId, email} = data;

  // 1. Input Validation
  if (!schoolId || typeof schoolId !== "string") {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with a valid \"schoolId\" string."
    );
  }

  if (!email || typeof email !== "string" || !email.includes("@")) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with a valid \"email\" string."
    );
  }

  const schoolRef = db.collection("schools").doc(schoolId);
  const waitlistRef = schoolRef.collection("waitlist_entries").doc(email);

  try {
    // 2. Perform Transaction
    await db.runTransaction(async (transaction) => {
      const schoolDoc = await transaction.get(schoolRef);

      if (!schoolDoc.exists) {
        throw new functions.https.HttpsError("not-found", "School not found.");
      }

      const schoolData = schoolDoc.data();
      if (schoolData?.status !== "waitlist") {
        throw new functions.https.HttpsError("failed-precondition", "This school is not on the waitlist.");
      }

      const waitlistDoc = await transaction.get(waitlistRef);
      if (waitlistDoc.exists) {
        // User is already on the waitlist, return success without doing anything.
        console.log(`User ${email} is already on the waitlist for ${schoolId}.`);
        return;
      }

      // Increment waitlist count and add user to sub-collection
      transaction.update(schoolRef, {
        waitlistCount: admin.firestore.FieldValue.increment(1),
      });

      transaction.set(waitlistRef, {
        email: email,
        joinedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    console.log(`Successfully added ${email} to the waitlist for ${schoolId}.`);
    return {success: true, message: "Successfully joined the waitlist!"};
  } catch (error) {
    console.error("Error joining waitlist:", error);
    if (error instanceof functions.https.HttpsError) {
      throw error; // Re-throw HttpsError
    }
    // For other errors, throw a generic internal error
    throw new functions.https.HttpsError(
      "internal",
      "An unexpected error occurred while trying to join the waitlist."
    );
  }
});
