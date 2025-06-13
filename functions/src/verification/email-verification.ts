import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
import * as logger from "firebase-functions/logger";

// Email templates
const EMAIL_VERIFICATION_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Verify Your HIVE Account</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      max-width: 150px;
      margin-bottom: 20px;
    }
    .verification-code {
      background-color: #f7f7f7;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 5px;
      text-align: center;
      padding: 15px;
      margin: 20px 0;
      border-radius: 5px;
      color: #000;
    }
    .footer {
      font-size: 12px;
      color: #999;
      margin-top: 40px;
      text-align: center;
    }
    .highlight {
      color: #e5a038;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Verify Your <span class="highlight">HIVE</span> Account</h1>
  </div>
  
  <p>Hello,</p>
  
  <p>Thank you for joining HIVE! To complete your registration and access all features, please verify your email address using the verification code below:</p>
  
  <div class="verification-code">{{code}}</div>
  
  <p>Enter this code in the verification page on the HIVE app to complete the verification process.</p>
  
  <p>This code will expire in 30 minutes for security reasons.</p>
  
  <p>If you did not request this verification, please ignore this email or contact our support team if you have concerns.</p>
  
  <div class="footer">
    <p>&copy; 2023 HIVE. All rights reserved.</p>
    <p>This email was sent to {{email}} as part of the account verification process.</p>
  </div>
</body>
</html>
`;

/**
 * Creates a transport for sending emails
 * In production, you would use a real email service (SendGrid, Mailgun, etc.)
 */
function createTransport() {
  // For development, use a test email account or a service like Mailtrap
  // In production, replace this with your actual email service configuration
  return nodemailer.createTransport({
    host: functions.config().email?.host || "smtp.mailtrap.io",
    port: parseInt(functions.config().email?.port || "2525"),
    auth: {
      user: functions.config().email?.user || "your-mailtrap-user",
      pass: functions.config().email?.pass || "your-mailtrap-password",
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
    from: `"HIVE Support" <${functions.config().email?.from || "noreply@hiveapp.example.com"}>`,
    to: email,
    subject: "Verify Your HIVE Account",
    html: EMAIL_VERIFICATION_TEMPLATE
      .replace("{{code}}", code)
      .replace("{{email}}", email),
  };

  await transport.sendMail(mailOptions);
}

/**
 * Cloud Function that sends verification emails when a new request is created
 */
export const processEmailVerification = functions.firestore
  .document("emailVerifications/{requestId}")
  .onCreate(async (snapshot, context) => {
    const requestData = snapshot.data();

    // Skip if already processed
    if (requestData.status !== "pending") {
      return null;
    }

    try {
      // Send the verification email
      await sendVerificationEmail(
        requestData.email,
        requestData.code
      );

      // Update the request status
      await snapshot.ref.update({
        status: "sent",
        sentAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return {success: true};
    } catch (error) {
      console.error("Error sending verification email:", error);

      // Update the request status to error
      await snapshot.ref.update({
        status: "error",
        error: error.message,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return {success: false, error: error.message};
    }
  });

/**
 * Callable function for users to submit their email verification code.
 */
export const submitVerificationCode = functions.https.onCall(async (data, context) => {
  // Ensure the user is authenticated.
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "The function must be called while authenticated.");
  }

  const code = data.code;
  const userId = context.auth.uid;

  if (!code || typeof code !== "string" || code.length === 0) {
    throw new functions.https.HttpsError("invalid-argument", "The function must be called with a valid \"code\" argument.");
  }

  logger.info(`Verification code submission attempt by user ${userId}`);

  try {
    const now = admin.firestore.Timestamp.now();
    const db = admin.firestore();

    // Find the pending verification request for this user with the matching code
    const verificationQuery = await db.collection("emailVerifications")
      .where("userId", "==", userId) // Ensure we check against the calling user
      .where("code", "==", code)
      .where("status", "==", "sent") // Only match codes that were successfully sent
      .where("expiresAt", ">", now) // Check expiration
      .limit(1)
      .get();

    if (verificationQuery.empty) {
      logger.warn(`No valid pending verification found for code ${code} by user ${userId}`);
      throw new functions.https.HttpsError("not-found", "Invalid or expired verification code.");
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

    logger.info(`User ${userId} successfully verified email with code ${code}`);
    return {success: true, message: "Email successfully verified."};
  } catch (error) {
    logger.error(`Error verifying email for user ${userId}:`, error);
    if (error instanceof functions.https.HttpsError) {
      throw error; // Re-throw HttpsError
    }
    throw new functions.https.HttpsError("internal", "An error occurred while verifying the email code.");
  }
});

/**
 * Cleanup function that removes expired verification codes
 * Runs on a schedule (every day at midnight)
 */
export const cleanupExpiredVerifications = functions.pubsub
  .schedule("0 0 * * *")
  .onRun(async (context) => {
    const now = admin.firestore.Timestamp.now();

    const expiredDocs = await admin.firestore()
      .collection("emailVerifications")
      .where("expiresAt", "<", now)
      .where("status", "==", "pending")
      .get();

    const batch = admin.firestore().batch();

    expiredDocs.forEach((doc) => {
      batch.update(doc.ref, {
        status: "expired",
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    if (expiredDocs.size > 0) {
      await batch.commit();
      console.log(`Marked ${expiredDocs.size} expired verification requests`);
    }

    return null;
  });
