import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {z} from "zod";

const SayHelloSchema = z.object({
  message: z.string().min(1).max(140),
});

export const sayHello = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "The function must be called while authenticated.");
  }

  const validation = SayHelloSchema.safeParse(data);

  if (!validation.success) {
    throw new functions.https.HttpsError("invalid-argument", "The function must be called with a valid message.");
  }

  const {message} = validation.data;
  const uid = context.auth.uid;
  const db = admin.firestore();

  try {
    const userDoc = await db.collection("users").doc(uid).get();
    if (!userDoc.exists) {
      throw new functions.https.HttpsError("not-found", "User profile not found.");
    }

    const userData = userDoc.data();
    if (!userData) {
      throw new functions.https.HttpsError("internal", "User data is empty.");
    }

    const {major, residentialSpace} = userData; // Assuming these fields exist

    if (!major || !residentialSpace) {
      throw new functions.https.HttpsError("failed-precondition", "User must have a major and residential space set.");
    }

    // This is where we'd create the post in the corresponding spaces.
    // For now, we'll just log it.
    console.log(`User ${uid} said: "${message}" to spaces: ${major}, ${residentialSpace}`);

    return {success: true, message: "Message sent successfully."};
  } catch (error) {
    console.error("Error in sayHello function:", error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError("internal", "An unexpected error occurred.");
  }
});
