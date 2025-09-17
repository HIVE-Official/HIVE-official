import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { z } from "zod";
import { firestore } from "../../lib/firebase-admin";

const SaveLeaderChoiceSchema = z.object({
  isLeaderCandidate: z.boolean(),
});

export const onboardingSaveLeaderChoice = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "The function must be called while authenticated."
      );
    }

    const { uid } = context.auth;

    // Validate input
    const validation = SaveLeaderChoiceSchema.safeParse(data);
    if (!validation.success) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The function must be called with a valid isLeaderCandidate boolean.",
        validation.error.issues
      );
    }

    const { isLeaderCandidate } = validation.data;
    const userRef = firestore.collection("users").doc(uid);

    try {
      await userRef.update({
        isLeaderCandidate,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return { success: true, message: "Leader choice saved." };
    } catch (error) {
      functions.logger.error("Error saving leader choice:", error);
      throw new functions.https.HttpsError(
        "internal",
        "An unexpected error occurred while saving leader choice."
      );
    }
  }
);
