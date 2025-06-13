import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const joinSpace = functions.https.onCall(async (data, context) => {
  const {spaceId} = data;
  const uid = context.auth?.uid;

  if (!uid) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be logged in to join a space."
    );
  }

  if (!spaceId) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with a 'spaceId'."
    );
  }

  const spaceRef = db.collection("spaces").doc(spaceId);
  const memberRef = spaceRef.collection("members").doc(uid);

  return db.runTransaction(async (transaction) => {
    const memberDoc = await transaction.get(memberRef);
    if (memberDoc.exists) {
      throw new functions.https.HttpsError(
        "already-exists",
        "You are already a member of this space."
      );
    }

    const spaceDoc = await transaction.get(spaceRef);
    if (!spaceDoc.exists) {
      throw new functions.https.HttpsError(
        "not-found",
        "This space does not exist."
      );
    }

    transaction.set(memberRef, {
      role: "member",
      joinedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    transaction.update(spaceRef, {
      memberCount: admin.firestore.FieldValue.increment(1),
    });

    return {success: true};
  });
});

export const leaveSpace = functions.https.onCall(async (data, context) => {
  const {spaceId} = data;
  const uid = context.auth?.uid;

  if (!uid) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be logged in to leave a space."
    );
  }

  if (!spaceId) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with a 'spaceId'."
    );
  }

  const spaceRef = db.collection("spaces").doc(spaceId);
  const memberRef = spaceRef.collection("members").doc(uid);

  return db.runTransaction(async (transaction) => {
    const memberDoc = await transaction.get(memberRef);
    if (!memberDoc.exists) {
      throw new functions.https.HttpsError(
        "not-found",
        "You are not a member of this space."
      );
    }

    transaction.delete(memberRef);
    transaction.update(spaceRef, {
      memberCount: admin.firestore.FieldValue.increment(-1),
    });

    return {success: true};
  });
});
