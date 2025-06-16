import * as functions from "firebase-functions";
import { FirebaseHttpsError, firestore, FieldValue } from "../types/firebase";

interface OnboardingData {
  fullName: string;
  preferredName?: string;
  major: string;
  gradYear: number;
  handle: string;
  isBuilder: boolean;
}

export const completeOnboarding = functions.https.onCall(
  async (request): Promise<{ success: boolean; message: string }> => {
    // Extract data from request
    const data = request.data as OnboardingData;

    // Check authentication
    if (!request.auth) {
      throw new FirebaseHttpsError(
        "unauthenticated",
        "User must be authenticated"
      );
    }

    try {
      // Validate required fields
      if (!data.fullName || !data.major || !data.gradYear || !data.handle) {
        throw new FirebaseHttpsError(
          "invalid-argument",
          "Missing required fields"
        );
      }

      const db = firestore();
      const userId = request.auth.uid;

      // Check if handle is unique
      const handleQuery = await db
        .collection("user_profiles")
        .where("handle", "==", data.handle)
        .get();

      if (!handleQuery.empty && handleQuery.docs[0].id !== userId) {
        throw new FirebaseHttpsError(
          "already-exists",
          "Handle is already taken"
        );
      }

      // Update user profile
      await db
        .collection("user_profiles")
        .doc(userId)
        .update({
          fullName: data.fullName,
          preferredName: data.preferredName || null,
          major: data.major,
          gradYear: data.gradYear,
          handle: data.handle,
          isBuilder: data.isBuilder,
          onboardingCompleted: true,
          updatedAt: FieldValue.serverTimestamp(),
        });

      return { success: true, message: "Onboarding completed successfully" };
    } catch (error) {
      if (error instanceof FirebaseHttpsError) {
        throw error;
      }
      throw new FirebaseHttpsError("internal", "Failed to complete onboarding");
    }
  }
);
