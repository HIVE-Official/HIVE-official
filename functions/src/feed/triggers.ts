import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

/**
 * A Firestore trigger that fires when a new post is created.
 *
 * This function's primary job is to increment a global counter for unseen
 * posts, which clients can listen to in real-time to show a
 * "new posts" indicator.
 */
export const onNewPost = functions.firestore
  .document("posts/{postId}")
  .onCreate(async (snap, context) => {
    const post = snap.data();

    // Avoid incrementing for private posts or non-published statuses
    if (post.visibility !== "public" || post.status !== "published") {
      functions.logger.log(
        `Post ${context.params.postId} is not a public, published post. Skipping count increment.`
      );
      return null;
    }

    const metadataRef = admin.firestore().doc("feed/metadata");

    try {
      // Use a transaction to safely increment the counter.
      await admin.firestore().runTransaction(async (transaction) => {
        const metadataDoc = await transaction.get(metadataRef);

        if (!metadataDoc.exists) {
          // If the metadata document doesn't exist, create it.
          transaction.set(metadataRef, { unseenPostCount: 1 });
        } else {
          // Otherwise, increment the counter.
          const newCount = (metadataDoc.data()?.unseenPostCount || 0) + 1;
          transaction.update(metadataRef, { unseenPostCount: newCount });
        }
      });

      functions.logger.log(
        `Successfully incremented unseen post count for post ${context.params.postId}.`
      );
    } catch (error) {
      functions.logger.error("Failed to increment unseen post count:", error);
    }

    return null;
  });
