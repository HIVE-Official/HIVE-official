import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
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
      let isNewUser = false;
      try {
        userRecord = await authService.getUserByEmail(magicLinkData.email);
      } catch {
        // User doesn't exist, create new user
        userRecord = await authService.createUser({
          email: magicLinkData.email,
          emailVerified: true,
        });
        isNewUser = true;
      }

      // If it's a new user, create their document in Firestore
      if (isNewUser) {
        const userRef = db.collection("users").doc(userRecord.uid);
        await userRef.set({
          id: userRecord.uid,
          uid: userRecord.uid,
          email: userRecord.email,
          fullName: "", // To be set during onboarding
          handle: "", // To be set during onboarding
          avatarUrl: "",
          interestTags: [],
          majorId: "",
          graduationYear: 0,
          schoolId: magicLinkData.schoolId || "", // Assuming schoolId is passed in magic link creation
          isFirstYear: false,
          isLeaderCandidate: false,
          onboardingCompleted: false,
          isVerified: true,
          status: "active",
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          // Add other default fields from the User model here
          isPublic: false,
          consentGiven: false, // Will be part of onboarding/terms
          showDormitory: true,
          showOrganizations: true,
          builderOptIn: false,
          isBuilder: false,
          builderAchievements: {
            toolsCreated: 0,
            totalEngagement: 0,
            invitesSent: 0,
          },
          builderAnalyticsEnabled: true,
          clubs: [],
          academicInterests: [],
          organizations: [],
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
      // Handle error silently for logging endpoint
      logger.error("Error verifying magic link:", error);
      throw new FirebaseHttpsError("internal", "Failed to verify magic link");
    }
  }
);
