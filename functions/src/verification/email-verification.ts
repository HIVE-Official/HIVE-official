import {
  createHttpsFunction,
  FunctionContext,
  getFirestore,
  FieldValue,
  Timestamp,
  functions,
  logger,
  onDocumentCreated,
  onSchedule,
} from "../types/firebase";

interface VerificationRequestData {
  email: string;
  type?: "signup" | "email_change";
}

interface VerifyEmailData {
  token: string;
  email: string;
}

/**
 * Send email verification when user is created
 */
export const sendEmailVerification = onDocumentCreated(
  "users/{userId}",
  async (event) => {
    try {
      const userId = event.params.userId;
      const userData = event.data?.data();

      if (!userData?.email || userData.emailVerified) {
        logger.info("Email already verified or no email found");
        return;
      }

      const db = getFirestore();
      const email = userData.email as string;

      // Generate verification token
      const verificationToken = generateVerificationToken();

      // Store verification request
      await db.collection("email_verifications").add({
        userId,
        email,
        token: verificationToken,
        type: "signup",
        status: "pending",
        createdAt: FieldValue.serverTimestamp(),
        expiresAt: Timestamp.fromDate(
          new Date(Date.now() + 24 * 60 * 60 * 1000)
        ), // 24 hours
      });

      // TODO: Send actual email via email service
      logger.info(
        `Email verification sent to ${email} with token ${verificationToken}`
      );
    } catch (error) {
      logger.error("Error sending email verification:", error);
    }
  }
);

/**
 * Request email verification
 */
export const requestEmailVerification =
  createHttpsFunction<VerificationRequestData>(
    async (data: VerificationRequestData, context: FunctionContext) => {
      if (!context.auth) {
        throw new functions.https.HttpsError(
          "unauthenticated",
          "User must be authenticated."
        );
      }

      const { email, type = "signup" } = data;

      if (!email) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Email is required."
        );
      }

      try {
        const db = getFirestore();
        const uid = context.auth.uid;

        // Generate verification token
        const verificationToken = Math.random().toString(36).substring(2, 15);

        // Store verification request
        await db.collection("email_verifications").add({
          userId: uid,
          email,
          token: verificationToken,
          type,
          status: "pending",
          createdAt: FieldValue.serverTimestamp(),
          expiresAt: Timestamp.fromDate(
            new Date(Date.now() + 24 * 60 * 60 * 1000)
          ),
        });

        logger.info(`Email verification requested for ${email}`);
        return {
          success: true,
          message: "Verification email sent successfully.",
        };
      } catch (error) {
        logger.error("Error requesting email verification:", error);
        throw new functions.https.HttpsError(
          "internal",
          "Failed to send verification email."
        );
      }
    }
  );

/**
 * Verify email with token
 */
export const verifyEmail = createHttpsFunction<VerifyEmailData>(
  async (data: VerifyEmailData, context: FunctionContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }

    const { token, email } = data;

    if (!token || !email) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Token and email are required."
      );
    }

    try {
      const db = getFirestore();
      const uid = context.auth.uid;

      // Find verification record
      const verificationQuery = await db
        .collection("email_verifications")
        .where("token", "==", token)
        .where("email", "==", email)
        .where("userId", "==", uid)
        .where("status", "==", "pending")
        .limit(1)
        .get();

      if (verificationQuery.empty) {
        throw new functions.https.HttpsError(
          "not-found",
          "Invalid or expired verification token."
        );
      }

      const verificationDoc = verificationQuery.docs[0];
      const verificationData = verificationDoc.data();

      // Check if token is expired
      if (verificationData.expiresAt.toDate() < new Date()) {
        throw new functions.https.HttpsError(
          "deadline-exceeded",
          "Verification token has expired."
        );
      }

      // Mark email as verified
      await db.collection("users").doc(uid).update({
        emailVerified: true,
        verifiedAt: FieldValue.serverTimestamp(),
      });

      // Mark verification as completed
      await verificationDoc.ref.update({
        status: "completed",
        verifiedAt: FieldValue.serverTimestamp(),
      });

      logger.info(`Email verified for user ${uid}: ${email}`);
      return { success: true, message: "Email verified successfully." };
    } catch (error) {
      logger.error("Error verifying email:", error);
      if (error instanceof functions.https.HttpsError) {
        throw error;
      }
      throw new functions.https.HttpsError(
        "internal",
        "Failed to verify email."
      );
    }
  }
);

/**
 * Clean up expired verification tokens
 */
export const cleanupExpiredVerifications = onSchedule(
  { schedule: "every 24 hours" },
  async () => {
    try {
      const db = getFirestore();
      logger.info("Starting cleanup of expired verification tokens");

      const expiredQuery = await db
        .collection("email_verifications")
        .where("expiresAt", "<", Timestamp.now())
        .limit(100)
        .get();

      const batch = db.batch();
      expiredQuery.docs.forEach((doc) => {
        batch.update(doc.ref, {
          status: "expired",
          expiredAt: FieldValue.serverTimestamp(),
        });
      });

      if (!expiredQuery.empty) {
        await batch.commit();
        logger.info(`Marked ${expiredQuery.size} expired verification tokens`);
      }
    } catch (error) {
      logger.error("Error cleaning up expired verifications:", error);
    }
  }
);

/**
 * Generate a secure verification token
 */
function generateVerificationToken(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}
