import { getFunctions, httpsCallable } from "firebase/functions";
import { logger } from "@hive/core";
import { PostSchema } from "@hive/core";
import type { Post } from '@hive/core';
// Unused imports removed - will be used when feed API is implemented
// import {
//   FeedPost,
//   CreatePostRequest,
// } from "@hive/core";

const functions = getFunctions();

/**
 * Calls the `createPost` Cloud Function.
 * @param {string} spaceId The ID of the space to post in.
 * @param {string} content The text content of the post.
 */
// export const createPost = async (
//   spaceId: string,
//   content: string
// ): Promise<unknown> => {
//   const createPostCallable = httpsCallable(functions, "createPost");
//   return await createPostCallable({ spaceId, content });
// };

export const feedApi = {
  getFeed: async (): Promise<Post[]> => {
    const getFeed = httpsCallable(functions, "getFeed");
    const response = await getFeed();
    const parsed = PostSchema.array().safeParse(response.data);
    if (!parsed.success) {
      logger.error("Zod validation failed", parsed.error);
      throw new Error("Invalid response from getFeed");
    }
    return parsed.data;
  },

  // getTopStrip: async (): Promise<ActiveRitualTile[]> => {
  //   const getTopStrip = httpsCallable(functions, "getTopStrip");
  //   const response = await getTopStrip();
  //   // TODO: Add schema validation back once it's available
  //   return response.data as ActiveRitualTile[];
  // },
};

export async function fetchFeed() {
  try {
    const response = await fetch("/api/feed");
    if (!response.ok) {
      throw new Error("Failed to fetch feed");
    }
    return response.json();
  } catch (error) {
    logger.error("Error fetching feed:", error);
    throw error;
  }
}
