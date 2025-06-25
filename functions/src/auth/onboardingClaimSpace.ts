import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { z } from "zod";
import { firestore } from "../../lib/firebase-admin";
import { CreateLeaderClaimSchema } from "@hive/core"; // Assuming this will be exported from core

const ClaimSpaceSchema = z.object({
  requestedSpaceName: z
    .string()
    .min(3, "Space name must be at least 3 characters"),
});

export const onboardingClaimSpace = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "The function must be called while authenticated."
      );
    }

    const { uid } = context.auth;

    // Validate input
    const validation = ClaimSpaceSchema.safeParse(data);
    if (!validation.success) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The function must be called with a valid requestedSpaceName.",
        validation.error.issues
      );
    }

    const { requestedSpaceName } = validation.data;
    const claimsRef = firestore.collection("leaderClaims");

    const newClaim: z.infer<typeof CreateLeaderClaimSchema> & {
      userId: string;
      createdAt: admin.firestore.FieldValue;
      updatedAt: admin.firestore.FieldValue;
    } = {
      userId: uid,
      requestedSpaceName,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    try {
      await claimsRef.add(newClaim);
      return { success: true, message: "Space claim submitted for review." };
    } catch (error) {
      console.error("Error submitting space claim:", error);
      throw new functions.https.HttpsError(
        "internal",
        "An unexpected error occurred while submitting the space claim."
      );
    }
  }
);
