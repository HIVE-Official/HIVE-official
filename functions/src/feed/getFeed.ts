import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { PostSchema } from "@hive/core";
import { z } from "zod";

const GetFeedSchema = z.object({
  limit: z.number().int().min(1).max(50).optional().default(20),
  cursor: z.string().optional(),
  spaceId: z.string().optional(), // Allow filtering by space
});

/**
 * Fetches the main feed content with cursor-based pagination.
 */
export const getFeed = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be logged in to view the feed."
    );
  }

  const validationResult = GetFeedSchema.safeParse(data);
  if (!validationResult.success) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Invalid arguments provided.",
      validationResult.error.flatten()
    );
  }

  const { limit, cursor, spaceId } = validationResult.data;

  try {
    const db = admin.firestore();
    let query: admin.firestore.Query = db
      .collection("posts")
      .orderBy("publishedAt", "desc")
      .limit(limit);

    // If a spaceId is provided, filter posts for that space
    if (spaceId) {
      query = query.where("spaceId", "==", spaceId);
    } else {
      // For a general feed, you might filter for public posts
      // or posts from spaces the user follows. This is a simple version.
      query = query.where("visibility", "==", "public");
    }

    if (cursor) {
      const lastDoc = await db.collection("posts").doc(cursor).get();
      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    const snapshot = await query.get();

    if (snapshot.empty) {
      return { success: true, posts: [], nextCursor: null };
    }

    const posts = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const postData = doc.data();
        // Add the document ID to the post data
        postData.id = doc.id;
        const result = await PostSchema.safeParseAsync(postData);
        if (result.success) {
          return result.data;
        } else {
          functions.logger.error(
            `Post validation failed for doc ${doc.id}:`,
            result.error.flatten()
          );
          return null;
        }
      })
    );

    const filteredPosts = posts.filter((p) => p !== null);
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    const nextCursor = lastVisible ? lastVisible.id : null;

    return { success: true, posts: filteredPosts, nextCursor };
  } catch (error) {
    functions.logger.error("Error fetching main feed:", error);
    throw new functions.https.HttpsError(
      "internal",
      "An unexpected error occurred while fetching the feed."
    );
  }
});
