import {
  createHttpsFunction,
  FunctionContext,
  getFirestore,
  functions,
  logger,
} from "../types/firebase";

interface GetSpaceContentData {
  spaceId: string;
  limit?: number;
  startAfter?: string;
  contentType?: "posts" | "tools" | "events";
}

export const getSpaceContent = createHttpsFunction<GetSpaceContentData>(
  async (data: GetSpaceContentData, context: FunctionContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }

    const { spaceId, limit = 20, startAfter, contentType = "posts" } = data;

    if (!spaceId) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "spaceId is required."
      );
    }

    try {
      const db = getFirestore();

      // Build query
      let query = db
        .collection("spaces")
        .doc(spaceId)
        .collection(contentType)
        .orderBy("createdAt", "desc")
        .limit(limit);

      // Add pagination if startAfter is provided
      if (startAfter) {
        const startAfterDoc = await db
          .collection("spaces")
          .doc(spaceId)
          .collection(contentType)
          .doc(startAfter)
          .get();
        if (startAfterDoc.exists) {
          query = query.startAfter(startAfterDoc);
        }
      }

      const snapshot = await query.get();

      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      logger.info(
        `Retrieved ${docs.length} ${contentType} from space ${spaceId}`
      );
      return { docs };
    } catch (error) {
      logger.error("Error getting space content:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to get space content."
      );
    }
  }
);
