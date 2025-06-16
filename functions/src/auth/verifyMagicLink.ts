import * as functions from "firebase-functions";
import { FirebaseHttpsError, firestore, auth } from "../types/firebase";

interface VerifyMagicLinkData {
  token: string;
}

export const verifyMagicLink = functions.https.onCall(
  async (
    request
  ): Promise<{ success: boolean; message: string; customToken?: string }> => {
    // Extract data from request
    const data = request.data as VerifyMagicLinkData;
    const { token } = data;

    if (!token) {
      throw new FirebaseHttpsError("invalid-argument", "Token is required");
    }

    try {
      const db = firestore();
      const authService = auth();

      // Find the magic link token
      const magicLinksQuery = await db
        .collection("magic_links")
        .where("token", "==", token)
        .where("used", "==", false)
        .limit(1)
        .get();

      if (magicLinksQuery.empty) {
        throw new FirebaseHttpsError("not-found", "Invalid or expired token");
      }

      const magicLinkDoc = magicLinksQuery.docs[0];
      const magicLinkData = magicLinkDoc.data();

      // Check if token is expired
      const now = new Date();
      const expiresAt = magicLinkData.expiresAt.toDate();

      if (now > expiresAt) {
        throw new FirebaseHttpsError("permission-denied", "Token has expired");
      }

      // Mark token as used
      await magicLinkDoc.ref.update({ used: true });

      // Create or get user
      let userRecord;
      try {
        userRecord = await authService.getUserByEmail(magicLinkData.email);
      } catch (error) {
        // User doesn't exist, create new user
        userRecord = await authService.createUser({
          email: magicLinkData.email,
          emailVerified: true,
        });
      }

      // Create custom token
      const customToken = await authService.createCustomToken(userRecord.uid);

      return {
        success: true,
        message: "Magic link verified successfully",
        customToken,
      };
    } catch (error) {
      if (error instanceof FirebaseHttpsError) {
        throw error;
      }
      console.error("Error verifying magic link:", error);
      throw new FirebaseHttpsError("internal", "Failed to verify magic link");
    }
  }
);
