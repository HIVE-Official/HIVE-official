import {createHttpsFunction, FunctionContext, getFirestore, FieldValue, functions} from "../types/firebase";

// Temporary guard function - replace with actual import
async function assertIsBuilder(uid: string, spaceId: string): Promise<void> {
  const db = getFirestore();
  const memberDoc = await db.collection("spaces").doc(spaceId).collection("members").doc(uid).get();
  const memberData = memberDoc.data();
  if (!memberDoc.exists || memberData?.role !== "builder") {
    throw new functions.https.HttpsError("permission-denied", "User is not a builder of this space.");
  }
}

interface EditPostData {
  spaceId: string;
  postId: string;
  content: string;
}

export const editPost = createHttpsFunction<EditPostData>(async (data: EditPostData, context: FunctionContext) => {
  const uid = context.auth?.uid;
  const {spaceId, postId, content} = data;

  if (!uid) {
    throw new functions.https.HttpsError("unauthenticated", "User must be authenticated.");
  }
  if (!spaceId || !postId || !content) {
    throw new functions.https.HttpsError("invalid-argument", "Missing required arguments.");
  }

  const db = getFirestore();
  const postRef = db.collection("spaces").doc(spaceId).collection("posts").doc(postId);
  const postDoc = await postRef.get();

  if (!postDoc.exists || postDoc.data()?.authorId !== uid) {
    throw new functions.https.HttpsError("permission-denied", "You do not have permission to edit this post.");
  }

  await postRef.update({
    content: content,
    updatedAt: FieldValue.serverTimestamp(),
  });

  return {success: true};
});

interface DeletePostData {
  spaceId: string;
  postId: string;
}

export const deletePost = createHttpsFunction<DeletePostData>(async (data: DeletePostData, context: FunctionContext) => {
  const uid = context.auth?.uid;
  const {spaceId, postId} = data;

  if (!uid) {
    throw new functions.https.HttpsError("unauthenticated", "User must be authenticated.");
  }
  if (!spaceId || !postId) {
    throw new functions.https.HttpsError("invalid-argument", "Missing required arguments.");
  }

  const db = getFirestore();
  const postRef = db.collection("spaces").doc(spaceId).collection("posts").doc(postId);
  const postDoc = await postRef.get();
  const postData = postDoc.data();

  if (!postDoc.exists) {
    throw new functions.https.HttpsError("not-found", "Post not found.");
  }

  // Check if user is the author
  const isAuthor = postData?.authorId === uid;

  // Check if user is a builder (if not the author)
  let isBuilder = false;
  if (!isAuthor) {
    try {
      await assertIsBuilder(uid, spaceId);
      isBuilder = true;
    } catch (error) {
      // User is not a builder, ignore the error
    }
  }

  if (!isAuthor && !isBuilder) {
    throw new functions.https.HttpsError("permission-denied", "You do not have permission to delete this post.");
  }

  await postRef.delete();

  return {success: true};
}); 