import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { assertIsBuilder } from '../lib/guards';

const db = admin.firestore();

export const pinPostToSpace = functions.https.onCall(async (data, context) => {
  const { spaceId, postId } = data;

  if (!spaceId || typeof spaceId !== 'string') {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with a valid "spaceId" argument.',
    );
  }

  // postId can be a string or null/undefined to unpin.
  if (typeof postId !== 'string' && postId != null) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'The "postId" must be a string or null.',
      );
  }

  const uid = context.auth?.uid;
  await assertIsBuilder(uid, spaceId);

  const spaceRef = db.collection('spaces').doc(spaceId);

  try {
    if (postId) {
      // Pin the post
      await spaceRef.update({ pinnedPostId: postId });
      functions.logger.info(`Builder ${uid} pinned post ${postId} in space ${spaceId}`);
      return { success: true, message: 'Post pinned successfully.' };
    } else {
      // Unpin the post by deleting the field
      await spaceRef.update({ pinnedPostId: admin.firestore.FieldValue.delete() });
      functions.logger.info(`Builder ${uid} unpinned post in space ${spaceId}`);
      return { success: true, message: 'Post unpinned successfully.' };
    }
  } catch (error) {
    functions.logger.error(`Error pinning post for space ${spaceId}`, error);
    throw new functions.https.HttpsError(
      'internal',
      'An unexpected error occurred while pinning the post.',
    );
  }
}); 