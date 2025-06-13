import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {getAuth} from "firebase-admin/auth";
import {getFirestore, FieldValue} from "firebase-admin/firestore";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {UserProfileSchema, UserProfile} from "@hive/validation";

export const completeOnboarding = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "User must be authenticated.");
  }

  const parseResult = UserProfileSchema.pick({
    fullName: true,
    preferredName: true,
    major: true,
    gradYear: true,
    handle: true,
    isBuilder: true,
  }).safeParse(data);

  if (!parseResult.success) {
    throw new functions.https.HttpsError("invalid-argument", "Invalid data provided.", parseResult.error.flatten());
  }

  const {
    fullName,
    preferredName,
    major,
    gradYear,
    handle,
    isBuilder,
  } = parseResult.data;
  const uid = context.auth.uid;

  const db = getFirestore();
  const userRef = db.collection("users").doc(uid);
  const handleRef = db.collection("handles").doc(handle);

  // Use a transaction to ensure atomicity
  await db.runTransaction(async (transaction) => {
    const handleDoc = await transaction.get(handleRef);
    if (handleDoc.exists) {
      throw new functions.https.HttpsError("already-exists", "This handle is already taken.");
    }

    const newUserProfile: Omit<UserProfile, "avatarUrl" | "createdAt"> = {
      uid,
      email: context.auth.token.email!,
      handle,
      fullName,
      preferredName: preferredName || fullName,
      major,
      gradYear,
      isBuilder,
      status: "active",
      roles: ["student"],
      reputation: 0,
      lastSeen: FieldValue.serverTimestamp(),
    };

    transaction.set(userRef, {...newUserProfile, createdAt: FieldValue.serverTimestamp()});
    transaction.set(handleRef, {uid});
  });

  // Avatar upload is handled separately on the client,
  // which then calls another function to update the user profile.
  // This separation avoids having the client send a large file to the callable function.

  return {success: true, message: "Onboarding completed successfully."};
});
