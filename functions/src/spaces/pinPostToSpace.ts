import {
  createHttpsFunction,
  FunctionContext,
  getFirestore,
  FieldValue,
  functions,
  logger,
} from "../types/firebase";

interface PinPostData {
  spaceId: string;
  postId: string;
  pinned?: boolean;
}

export const pinPostToSpace = createHttpsFunction<PinPostData>(
  async (data: PinPostData, context: FunctionContext) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }

    const { spaceId, postId, pinned = true } = data;

    if (!spaceId || !postId) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "spaceId and postId are required."
      );
    }

    try {
      const db = getFirestore();

      // Update post pinned status in space
      const postRef = db
        .collection("spaces")
        .doc(spaceId)
        .collection("posts")
        .doc(postId);

      await postRef.update({
        pinned,
        pinnedAt: pinned ? FieldValue.serverTimestamp() : FieldValue.delete(),
        lastModified: FieldValue.serverTimestamp(),
      });

      logger.info(
        `Post ${postId} pinned status updated to ${pinned} in space ${spaceId}`
      );
      return {
        success: true,
        message: pinned
          ? "Post pinned successfully"
          : "Post unpinned successfully",
      };
    } catch (error) {
      logger.error("Error pinning post to space:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to update post pinned status."
      );
    }
  }
);
