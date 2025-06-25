import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { firestore } from "../../lib/firebase-admin";

export const onboardingComplete = functions.https.onCall(
  async (_data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "The function must be called while authenticated."
      );
    }

    const { uid } = context.auth;
    const userRef = firestore.collection("users").doc(uid);

    try {
      await userRef.update({
        onboardingCompleted: true,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return { success: true, message: "Onboarding completed successfully." };
    } catch (error) {
      console.error("Error completing onboarding:", error);
      throw new functions.https.HttpsError(
        "internal",
        "An unexpected error occurred while completing onboarding."
      );
    }
  }
);
