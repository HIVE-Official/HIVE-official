import * as functions from "firebase-functions";
import * as crypto from "crypto";
import { FirebaseHttpsError, firestore } from "../types/firebase";

// This would be a utility to send emails (e.g., using SendGrid, Mailgun)
// For now, we'll just log it.
async function sendEmail(
  email: string,
  subject: string,
  body: string
): Promise<void> {
  console.log("---- SENDING EMAIL ----");
  console.log(`TO: ${email}`);
  console.log(`SUBJECT: ${subject}`);
  console.log(`BODY: ${body}`);
  console.log("-----------------------");
  return Promise.resolve();
}

// Generate a secure, URL-safe token
function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

interface MagicLinkData {
  email: string;
}

export const sendMagicLink = functions.https.onCall(
  async (request): Promise<{ success: boolean; message: string }> => {
    // Extract data from request
    const data = request.data as MagicLinkData;

    if (!data.email) {
      throw new FirebaseHttpsError("invalid-argument", "Email is required");
    }

    try {
      const db = firestore();
      const token = generateToken();
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

      // Store the magic link token in Firestore
      await db.collection("magic_links").add({
        email: data.email,
        token,
        expiresAt,
        used: false,
        createdAt: new Date(),
      });

      // Send email with magic link
      const magicLink = `https://yourdomain.com/auth/verify?token=${token}`;
      await sendEmail(
        data.email,
        "Your Magic Link",
        `Click here to log in: ${magicLink}`
      );

      return { success: true, message: "Magic link sent successfully" };
    } catch (error) {
      console.error("Error sending magic link:", error);
      throw new FirebaseHttpsError("internal", "Failed to send magic link");
    }
  }
);
