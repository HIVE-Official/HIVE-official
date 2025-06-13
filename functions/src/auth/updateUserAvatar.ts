import * as functions from "firebase-functions";
import {getFirestore} from "firebase-admin/firestore";

export const updateUserAvatar = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "User must be authenticated.");
  }

  const {avatarUrl} = data;
  if (!avatarUrl || typeof avatarUrl !== "string") {
    throw new functions.https.HttpsError("invalid-argument", "Invalid avatar URL provided.");
  }

  const uid = context.auth.uid;
  const db = getFirestore();
  const userRef = db.collection("users").doc(uid);

  await userRef.update({avatarUrl});

  return {success: true, message: "Avatar updated successfully."};
});
