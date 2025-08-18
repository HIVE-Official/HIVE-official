import {
  functions,
  firestore,
  assertAuthenticated,
  getDocumentData,
  type FunctionContext,
  type SpaceDocument,
} from "../types/firebase";

interface GetSpaceContentData {
  spaceId: string;
  contentType: string;
  lastVisible?: string;
}

export const getSpaceContent = functions.https.onCall(
  async (data: GetSpaceContentData, context: FunctionContext) => {
    assertAuthenticated(context);
    const { spaceId, contentType, lastVisible } = data;
    const uid = context.auth.uid;

    const pageSize = 10;
    const db = firestore();

    const spaceRef = db.doc(`spaces/${spaceId}`);
    const spaceDoc = await spaceRef.get();

    if (!spaceDoc.exists) {
      throw new functions.https.HttpsError(
        "not-found",
        "The specified space does not exist."
      );
    }

    const space = getDocumentData<SpaceDocument>(spaceDoc);
    if (!space) {
      throw new functions.https.HttpsError(
        "not-found",
        "Space data not found."
      );
    }

    // Check permissions for private spaces
    const isPublic = (space as Record<string, unknown>).isPublic as boolean;
    if (!isPublic) {
      const memberDoc = await spaceRef.collection("members").doc(uid).get();
      if (!memberDoc.exists) {
        throw new functions.https.HttpsError(
          "permission-denied",
          "You do not have permission to view this content."
        );
      }
    }

    let query = db
      .collection(`spaces/${spaceId}/${contentType}`)
      .limit(pageSize);

    if (lastVisible) {
      const lastDoc = await db
        .doc(`spaces/${spaceId}/${contentType}/${lastVisible}`)
        .get();
      query = query.startAfter(lastDoc);
    }

    const snapshot = await query.get();
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return { docs };
  }
);
