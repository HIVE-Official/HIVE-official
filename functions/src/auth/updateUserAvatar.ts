import * as functions from "firebase-functions";
import { FirebaseHttpsError, firestore, FieldValue } from "../types/firebase";

interface UpdateAvatarData {
  avatarUrl: string;
}

export const updateUserAvatar = functions.https.onCall(
  async (request): Promise<{ success: boolean; message: string }> => {
    // Check authentication
    if (!request.auth) {
      throw new FirebaseHttpsError(
        "unauthenticated",
        "User must be authenticated"
      );
    }

    // Extract data from request
    const data = request.data as UpdateAvatarData;
    const { avatarUrl } = data;

    if (!avatarUrl) {
      throw new FirebaseHttpsError(
        "invalid-argument",
        "Avatar URL is required"
      );
    }

    const uid = request.auth.uid;

    try {
      const db = firestore();

      // Update user profile with new avatar
      await db.collection("user_profiles").doc(uid).update({
        avatarUrl,
        updatedAt: FieldValue.serverTimestamp(),
      });

      return { success: true, message: "Avatar updated successfully" };
    } catch (error) {
      console.error("Error updating avatar:", error);
      throw new FirebaseHttpsError("internal", "Failed to update avatar");
    }
  }
);
