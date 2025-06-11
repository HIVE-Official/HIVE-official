import * as functions from "firebase-functions";
import { getFirestore } from "firebase-admin/firestore";
import * as crypto from "crypto";

// This would be a utility to send emails (e.g., using SendGrid, Mailgun)
// For now, we'll just log it.
async function sendEmail(email: string, subject: string, body: string) {
  console.log(`---- SENDING EMAIL ----`);
  console.log(`TO: ${email}`);
  console.log(`SUBJECT: ${subject}`);
  console.log(`BODY: ${body}`);
  console.log(`-----------------------`);
  return Promise.resolve();
}

// Generate a secure, URL-safe token
function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

export const sendMagicLink = functions.https.onCall(async (data, context) => {
  const email = data.email;

  if (!email || !email.endsWith(".edu")) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "A valid .edu email is required."
    );
  }

  const db = getFirestore();
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

  // Store the token with the email and expiry date
  const tokenRef = db.collection("magicLinks").doc(token);
  await tokenRef.set({
    email,
    expiresAt,
    used: false,
  });

  // Construct the magic link URL
  // The base URL should be configured in environment variables
  const magicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify?token=${token}`;

  // Send the email
  const emailSubject = "Your HIVE sign‑in link is here ✨";
  const emailBody = `
    Hey,
    Tap the button below to hop back into HIVE. This link works once and expires in 15 minutes.
    
    [Open HIVE](${magicLink})
    
    Having trouble? Copy and paste this link into your browser:
    ${magicLink}
    
    If you didn't request this, you can safely ignore the email.
    
    — The HIVE Team 🐝
  `;

  await sendEmail(email, emailSubject, emailBody);

  return { success: true, message: "Magic link sent successfully." };
}); 