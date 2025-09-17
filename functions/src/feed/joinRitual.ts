import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { z } from "zod";

const JoinRitualSchema = z.object({
  ritualId: z.string().min(1),
});

/**
 * Allows an authenticated user to join a specific ritual.
 *
 * This function adds the user to the ritual's participant list and
 * increments the participant count.
 */
export const joinRitual = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be logged in to join a ritual."
    );
  }

  const validationResult = JoinRitualSchema.safeParse(data);
  if (!validationResult.success) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "A valid ritualId must be provided.",
      validationResult.error.flatten()
    );
  }

  const { ritualId } = validationResult.data;
  const { uid } = context.auth;
  const db = admin.firestore();

  // The ritual document is expected to be in the `topStripContent` collection
  const ritualRef = db.collection("topStripContent").doc(ritualId);
  const participantRef = ritualRef.collection("participants").doc(uid);

  try {
    await db.runTransaction(async (transaction) => {
      const ritualDoc = await transaction.get(ritualRef);
      const participantDoc = await transaction.get(participantRef);

      if (!ritualDoc.exists) {
        throw new functions.https.HttpsError(
          "not-found",
          "The specified ritual does not exist."
        );
      }

      if (participantDoc.exists) {
        // User has already joined, so we can just return successfully.
        functions.logger.log(
          `User ${uid} has already joined ritual ${ritualId}.`
        );
        return;
      }

      // Add the user to the participants subcollection.
      transaction.set(participantRef, {
        joinedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      // Increment the participantCount on the main ritual document.
      transaction.update(ritualRef, {
        "ritual.participantCount": admin.firestore.FieldValue.increment(1),
      });
    });

    functions.logger.log(`User ${uid} successfully joined ritual ${ritualId}.`);
    return { success: true, message: "Successfully joined ritual." };
  } catch (error) {
    functions.logger.error(
      `Error joining ritual ${ritualId} for user ${uid}:`,
      error
    );
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError(
      "internal",
      "An unexpected error occurred while trying to join the ritual."
    );
  }
});
