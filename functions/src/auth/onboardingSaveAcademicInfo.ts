import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { z } from "zod";
import { firestore } from "../../lib/firebase-admin";

const SaveAcademicInfoSchema = z.object({
  majorId: z.string().min(1, "Major is required"),
  graduationYear: z.number().int().min(new Date().getFullYear()),
  isFirstYear: z.boolean(),
});

export const onboardingSaveAcademicInfo = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "The function must be called while authenticated."
      );
    }

    const { uid } = context.auth;

    // Validate input
    const validation = SaveAcademicInfoSchema.safeParse(data);
    if (!validation.success) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The function must be called with valid academic information.",
        validation.error.issues
      );
    }

    const { majorId, graduationYear, isFirstYear } = validation.data;
    const userRef = firestore.collection("users").doc(uid);

    try {
      await userRef.update({
        majorId,
        graduationYear,
        isFirstYear,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return { success: true, message: "Academic information saved." };
    } catch (error) {
      functions.logger.error("Error saving academic information:", error);
      throw new functions.https.HttpsError(
        "internal",
        "An unexpected error occurred while saving academic information."
      );
    }
  }
);
