import { getFunctions, httpsCallable } from "firebase/functions";
import { logger } from "@hive/core";
import {
  PostSchema,
  ActiveRitualTileSchema,
} from "@hive/core";
import type {
  FeedPost,
  CreatePostInput,
  Post,
  ActiveRitualTile,
} from "@hive/core";

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

  getTopStrip: async (): Promise<ActiveRitualTile[]> => {
    const getTopStrip = httpsCallable(functions, "getTopStrip");
    const response = await getTopStrip();
    const parsed = ActiveRitualTileSchema.array().safeParse(response.data);
    if (!parsed.success) {
      logger.error("Zod validation failed for TopStrip", parsed.error);
      throw new Error("Invalid response from getTopStrip");
    }
    return parsed.data;
  },
};

export class FeedApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getPosts(): Promise<FeedPost[]> {
    const response = await fetch(`${this.baseUrl}/api/feed`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const posts = await response.json();
    return posts;
  }

  async createPost(input: CreatePostInput): Promise<FeedPost> {
    const response = await fetch(`${this.baseUrl}/api/feed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const post = await response.json();
    return post;
  }
}
