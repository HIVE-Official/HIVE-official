import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { assertIsBuilder } from '../lib/guards';

const db = admin.firestore();

export const editPost = functions.https.onCall(async (data, context) => {
  const uid = context.auth?.uid;
  const { spaceId, postId, content } = data;

  if (!uid) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated.');
  }
  if (!spaceId || !postId || !content) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required arguments.');
  }

  const postRef = db.collection('spaces').doc(spaceId).collection('posts').doc(postId);
  const postDoc = await postRef.get();

  if (!postDoc.exists || postDoc.data()?.authorId !== uid) {
    throw new functions.https.HttpsError('permission-denied', 'You do not have permission to edit this post.');
  }

  await postRef.update({
    content: content,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { success: true };
});

export const deletePost = functions.https.onCall(async (data, context) => {
    const uid = context.auth?.uid;
    const { spaceId, postId } = data;

    if (!uid) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated.');
    }
    if (!spaceId || !postId) {
        throw new functions.https.HttpsError('invalid-argument', 'Missing required arguments.');
    }

    const postRef = db.collection('spaces').doc(spaceId).collection('posts').doc(postId);
    const postDoc = await postRef.get();
    const postData = postDoc.data();

    if (!postDoc.exists) {
        throw new functions.https.HttpsError('not-found', 'Post not found.');
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
        throw new functions.https.HttpsError('permission-denied', 'You do not have permission to delete this post.');
    }

    await postRef.delete();

    return { success: true };
}); 