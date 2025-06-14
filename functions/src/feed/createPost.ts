import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { assertIsMember } from '../lib/guards'; // We will create this guard
import { type User } from '@hive/core/src/domain/firestore/user';

const db = admin.firestore();

export const createPost = functions.https.onCall(async (data, context) => {
  const uid = context.auth?.uid;
  const { spaceId, content } = data;

  if (!uid) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated.');
  }
  if (typeof spaceId !== 'string' || typeof content !== 'string' || content.trim() === '') {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid spaceId or content.');
  }

  // Use a guard to ensure the user is a member of the space
  await assertIsMember(uid, spaceId);

  try {
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
        throw new functions.https.HttpsError('not-found', 'User profile not found.');
    }

    const userData = userDoc.data() as User;

    const postRef = db.collection('spaces').doc(spaceId).collection('posts').doc();
    
    const newPost = {
      id: postRef.id,
      authorId: uid,
      author: {
        name: userData.fullName,
        avatarUrl: userData.avatarUrl || null,
      },
      spaceId: spaceId,
      content: content,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await postRef.set(newPost);

    functions.logger.info(`User ${uid} created post ${postRef.id} in space ${spaceId}`);
    return { success: true, postId: postRef.id };

  } catch (error) {
    functions.logger.error('Error creating post:', error);
    if (error instanceof functions.https.HttpsError) {
        throw error;
    }
    throw new functions.https.HttpsError('internal', 'An unexpected error occurred.');
  }
}); 