import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { z } from "zod";
import { firestore } from "../../lib/firebase-admin";

const SaveInterestsSchema = z.object({
  interestTags: z.array(z.string()).max(6, "You can select up to 6 interests."),
});

export const onboardingSaveInterests = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "The function must be called while authenticated."
      );
    }

    const { uid } = context.auth;

    // Validate input
    const validation = SaveInterestsSchema.safeParse(data);
    if (!validation.success) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The function must be called with a valid array of interest tags.",
        validation.error.issues
      );
    }

    const { interestTags } = validation.data;
    const userRef = firestore.collection("users").doc(uid);

    try {
      await userRef.update({
        interestTags,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return { success: true, message: "Interests saved." };
    } catch (error) {
      console.error("Error saving interests:", error);
      throw new functions.https.HttpsError(
        "internal",
        "An unexpected error occurred while saving interests."
      );
    }
  }
);
