import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { z } from "zod";
import { firestore } from "../../lib/firebase-admin";

const SaveDisplayNameSchema = z.object({
  fullName: z.string().min(1, "Display name cannot be empty"),
  handle: z.string().min(3, "Handle must be at least 3 characters"),
});

export const onboardingSaveDisplayName = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "The function must be called while authenticated."
      );
    }

    const { uid } = context.auth;

    // Validate input
    const validation = SaveDisplayNameSchema.safeParse(data);
    if (!validation.success) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The function must be called with a valid displayName and handle.",
        validation.error.issues
      );
    }

    const { fullName, handle } = validation.data;
    const userRef = firestore.collection("users").doc(uid);
    const handleRef = firestore.collection("handles").doc(handle);

    try {
      // Use a transaction to ensure atomicity
      await firestore.runTransaction(async (transaction) => {
        const handleDoc = await transaction.get(handleRef);
        if (handleDoc.exists) {
          throw new functions.https.HttpsError(
            "already-exists",
            "This handle is already taken."
          );
        }

        // Update user document
        transaction.update(userRef, {
          fullName,
          handle,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        // Reserve the handle
        transaction.set(handleRef, {
          userId: uid,
          reservedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      });

      return { success: true, message: "Display name and handle saved." };
    } catch (error) {
      console.error("Error saving display name:", error);
      if (error instanceof functions.https.HttpsError) {
        throw error;
      }
      throw new functions.https.HttpsError(
        "internal",
        "An unexpected error occurred."
      );
    }
  }
);
