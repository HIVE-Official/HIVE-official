import * as functions from "firebase-functions";
import {getAuth} from "firebase-admin/auth";
import {getFirestore} from "firebase-admin/firestore";
import {initializeApp} from "firebase-admin/app";

initializeApp();

export const verifyMagicLink = functions.https.onCall(async (data, context) => {
  const {token} = data;
  if (!token || typeof token !== "string") {
    throw new functions.https.HttpsError("invalid-argument", "Invalid token provided.");
  }

  try {
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);
    const uid = decodedToken.uid;

    // Check if user has completed onboarding
    const db = getFirestore();
    const userDoc = await db.collection("users").doc(uid).get();
    const isOnboarded = userDoc.exists;

    // The custom token will be used on the client to sign in
    const customToken = await auth.createCustomToken(uid);

    return {
      success: true,
      customToken,
      isOnboarded,
      uid,
    };
  } catch (error) {
    console.error("Error verifying magic link:", error);
    throw new functions.https.HttpsError("unauthenticated", "The provided magic link is invalid or has expired.");
  }
});
