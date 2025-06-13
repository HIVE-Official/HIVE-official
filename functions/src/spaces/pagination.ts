import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const getSpaceContent = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "You must be logged in to view space content.");
  }

  const {spaceId, contentType, lastVisible} = data;
  const {uid} = context.auth;

  const pageSize = 10;

  const spaceRef = db.doc(`spaces/${spaceId}`);
  const spaceDoc = await spaceRef.get();

  if (!spaceDoc.exists) {
    throw new functions.https.HttpsError("not-found", "The specified space does not exist.");
  }

  const space = spaceDoc.data();
  if (!space.isPublic) {
    const memberDoc = await spaceRef.collection("members").doc(uid).get();
    if (!memberDoc.exists) {
      throw new functions.https.HttpsError("permission-denied", "You do not have permission to view this content.");
    }
  }

  let query = db.collection(`spaces/${spaceId}/${contentType}`).limit(pageSize);

  if (lastVisible) {
    const lastDoc = await db.doc(`spaces/${spaceId}/${contentType}/${lastVisible}`).get();
    query = query.startAfter(lastDoc);
  }

  const snapshot = await query.get();
  const docs = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));

  return {docs};
});
