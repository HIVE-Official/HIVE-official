import * as functions from "firebase-functions";
import {getFirestore} from "firebase-admin/firestore";

export const muteUser = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "User must be authenticated.");
  }

  const {userIdToMute} = data;
  if (!userIdToMute || typeof userIdToMute !== "string") {
    throw new functions.https.HttpsError("invalid-argument", "A valid userIdToMute must be provided.");
  }

  const uid = context.auth.uid;

  if (uid === userIdToMute) {
    throw new functions.https.HttpsError("invalid-argument", "Users cannot mute themselves.");
  }

  const db = getFirestore();
  const muteLinkRef = db.collection("users").doc(uid).collection("mutes").doc(userIdToMute);

  await muteLinkRef.set({userId: userIdToMute, mutedAt: new Date()});

  return {status: "success"};
});

export const unmuteUser = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "User must be authenticated.");
  }

  const {userIdToUnmute} = data;
  if (!userIdToUnmute || typeof userIdToUnmute !== "string") {
    throw new functions.https.HttpsError("invalid-argument", "A valid userIdToUnmute must be provided.");
  }

  const uid = context.auth.uid;

  const db = getFirestore();
  const muteLinkRef = db.collection("users").doc(uid).collection("mutes").doc(userIdToUnmute);

  await muteLinkRef.delete();

  return {status: "success"};
});

