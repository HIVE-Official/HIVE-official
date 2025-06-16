import * as nodemailer from "nodemailer";
import {
  functions,
  firestore,
  logger,
  assertAuthenticated,
  getDocumentData,
  type FunctionContext,
} from "../types/firebase";

// Type for email verification data
interface EmailVerificationData {
  userId: string;
  email: string;
  code: string;
  status: "pending" | "sent" | "completed" | "error" | "expired";
  createdAt: FirebaseFirestore.Timestamp;
  expiresAt: FirebaseFirestore.Timestamp;
  sentAt?: FirebaseFirestore.Timestamp;
  completedAt?: FirebaseFirestore.Timestamp;
  error?: string;
}

// Type for email verification request data
interface VerificationRequestData {
  code: string;
}

const EMAIL_VERIFICATION_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HIVE Email Verification</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 20px;
      background-color: #f9f9f9;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
      padding: 30px 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 300;
    }
    .highlight {
      color: #ffd700;
      font-weight: 600;
    }
    .content {
      padding: 30px;
    }
    .verification-code {
      background-color: #f8f9fa;
      border: 2px dashed #6c757d;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      margin: 20px 0;
      font-size: 36px;
      font-weight: 600;
      color: #495057;
      letter-spacing: 8px;
      font-family: 'Courier New', monospace;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #6c757d;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Verify Your <span class="highlight">HIVE</span> Account</h1>
    </div>
    
    <div class="content">
      <p>Hello,</p>
      
      <p>Thank you for joining HIVE! To complete your registration and access all features, please verify your email address using the verification code below:</p>
      
      <div class="verification-code">{{code}}</div>
      
      <p>Enter this code in the verification page on the HIVE app to complete the verification process.</p>
      
      <p>This code will expire in 30 minutes for security reasons.</p>
      
      <p>If you did not request this verification, please ignore this email or contact our support team if you have concerns.</p>
    </div>
    
    <div class="footer">
      <p>&copy; 2023 HIVE. All rights reserved.</p>
      <p>This email was sent to {{email}} as part of the account verification process.</p>
    </div>
  </div>
</body>
</html>
`;

/**
 * Creates a transport for sending emails
 * In production, you would use a real email service (SendGrid, Mailgun, etc.)
 */
function createTransport(): nodemailer.Transporter {
  // For development, use a test email account or a service like Mailtrap
  // In production, replace this with your actual email service configuration
  return nodemailer.createTransport({
    host: (functions.config().email?.host as string) || "smtp.mailtrap.io",
    port: parseInt((functions.config().email?.port as string) || "2525"),
    auth: {
      user: (functions.config().email?.user as string) || "your-mailtrap-user",
      pass:
        (functions.config().email?.pass as string) || "your-mailtrap-password",
    },
  });
}

/**
 * Sends a verification email with the provided code
 */
async function sendVerificationEmail(
  email: string,
  code: string
): Promise<void> {
  const transport = createTransport();

  const mailOptions = {
    from: `"HIVE Support" <${(functions.config().email?.from as string) || "noreply@hiveapp.example.com"}>`,
    to: email,
    subject: "Verify Your HIVE Account",
    html: EMAIL_VERIFICATION_TEMPLATE.replace("{{code}}", code).replace(
      "{{email}}",
      email
    ),
  };

  await transport.sendMail(mailOptions);
}

/**
 * Cloud Function that sends verification emails when a new request is created
 */
export const processEmailVerification = firestore()
  .document("emailVerifications/{requestId}")
  .onCreate(async (snapshot) => {
    const requestData = getDocumentData<EmailVerificationData>(snapshot);

    if (!requestData) {
      logger.error("No request data found in verification document");
      return null;
    }

    // Skip if already processed
    if (requestData.status !== "pending") {
      return null;
    }

    try {
      // Send the verification email
      await sendVerificationEmail(requestData.email, requestData.code);

      // Update the request status
      await snapshot.ref.update({
        status: "sent",
        sentAt: firestore().FieldValue.serverTimestamp(),
      });

      return { success: true };
    } catch (error) {
      logger.error("Error sending verification email:", error as Error);

      // Update the request status to error
      await snapshot.ref.update({
        status: "error",
        error: (error as Error).message,
        updatedAt: firestore().FieldValue.serverTimestamp(),
      });

      return { success: false, error: (error as Error).message };
    }
  });

/**
 * Callable function for users to submit their email verification code.
 */
export const submitVerificationCode = functions.https.onCall(
  async (data: VerificationRequestData, context: FunctionContext) => {
    assertAuthenticated(context);
    const code = data.code;
    const userId = context.auth.uid;

    if (!code || typeof code !== "string" || code.length === 0) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The function must be called with a valid 'code' argument."
      );
    }

    logger.info(`Verification code submission attempt by user ${userId}`);

    try {
      const now = firestore().Timestamp.now();
      const db = firestore();

      // Find the pending verification request for this user with the matching code
      const verificationQuery = await db
        .collection("emailVerifications")
        .where("userId", "==", userId) // Ensure we check against the calling user
        .where("code", "==", code)
        .where("status", "==", "sent") // Only match codes that were successfully sent
        .where("expiresAt", ">", now) // Check expiration
        .limit(1)
        .get();

      if (verificationQuery.empty) {
        logger.warn(
          `No valid pending verification found for code ${code} by user ${userId}`
        );
        throw new functions.https.HttpsError(
          "not-found",
          "Invalid or expired verification code."
        );
      }

      const verificationDoc = verificationQuery.docs[0];
      const verificationRef = verificationDoc.ref;

      // Mark the verification request as completed
      await verificationRef.update({
        status: "completed",
        completedAt: now,
      });

      // Trigger the role claim update to grant 'Verified' status (level 1)
      // This uses the existing claimUpdates trigger mechanism
      await db.collection("claimUpdates").add({
        userId: userId,
        verificationLevel: 1, // Level 1 = Verified
        updatedAt: now,
        reason: "email_verification_completed",
      });

      logger.info(
        `User ${userId} successfully verified email with code ${code}`
      );
      return { success: true, message: "Email successfully verified." };
    } catch (error) {
      logger.error(`Error verifying email for user ${userId}:`, error as Error);
      if (error instanceof functions.https.HttpsError) {
        throw error; // Re-throw HttpsError
      }
      throw new functions.https.HttpsError(
        "internal",
        "An error occurred while verifying the email code."
      );
    }
  }
);

/**
 * Cleanup function that removes expired verification codes
 * Runs on a schedule (every day at midnight)
 */
export const cleanupExpiredVerifications = functions.pubsub
  .schedule("0 0 * * *")
  .onRun(async () => {
    try {
      const now = firestore().Timestamp.now();
      const db = firestore();

      const expiredDocs = await db
        .collection("emailVerifications")
        .where("expiresAt", "<", now)
        .where("status", "==", "pending")
        .get();

      const batch = db.batch();

      expiredDocs.forEach((doc) => {
        batch.update(doc.ref, {
          status: "expired",
          updatedAt: firestore().FieldValue.serverTimestamp(),
        });
      });

      if (expiredDocs.size > 0) {
        await batch.commit();
        logger.info(`Marked ${expiredDocs.size} expired verification requests`);
      }

      return null;
    } catch (error) {
      logger.error("Error cleaning up expired verifications:", error as Error);
      return null;
    }
  });
