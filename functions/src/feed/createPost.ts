import {
  createHttpsFunction,
  FunctionContext,
  getFirestore,
  FieldValue,
  functions,
  logger,
} from "../types/firebase";

// Temporary User interface - replace with @hive/core import once workspace is fixed
interface User {
  uid: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
}

// Temporary guard function - replace with actual import
async function assertIsMember(uid: string, spaceId: string): Promise<void> {
  const db = getFirestore();
  const memberDoc = await db
    .collection("spaces")
    .doc(spaceId)
    .collection("members")
    .doc(uid)
    .get();
  if (!memberDoc.exists) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "User is not a member of this space."
    );
  }
}

interface CreatePostData {
  spaceId: string;
  content: string;
}

export const createPost = createHttpsFunction<CreatePostData>(
  async (data: CreatePostData, context: FunctionContext) => {
    const uid = context.auth?.uid;
    const { spaceId, content } = data;

    if (!uid) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }
    if (
      typeof spaceId !== "string" ||
      typeof content !== "string" ||
      content.trim() === ""
    ) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Invalid spaceId or content."
      );
    }

    // Use a guard to ensure the user is a member of the space
    await assertIsMember(uid, spaceId);

    try {
      const db = getFirestore();
      const userRef = db.collection("users").doc(uid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new functions.https.HttpsError(
          "not-found",
          "User profile not found."
        );
      }

      const userData = userDoc.data() as User;

      const postRef = db
        .collection("spaces")
        .doc(spaceId)
        .collection("posts")
        .doc();

      const newPost = {
        id: postRef.id,
        authorId: uid,
        author: {
          name: userData.fullName,
          avatarUrl: userData.avatarUrl || null,
        },
        spaceId: spaceId,
        content: content,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      };

      await postRef.set(newPost);

      logger.info(`User ${uid} created post ${postRef.id} in space ${spaceId}`);
      return { success: true, postId: postRef.id };
    } catch (error) {
      logger.error("Error creating post:", error);
      if (error instanceof functions.https.HttpsError) {
        throw error;
      }
      throw new functions.https.HttpsError(
        "internal",
        "An unexpected error occurred."
      );
    }
  }
);
