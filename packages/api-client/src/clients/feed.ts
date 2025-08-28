import { logger, type Post as FeedPost, type CreatePostRequest } from "@hive/core";
import { ApiError } from "../errors";

export class FeedApiClient {
  constructor(private baseUrl: string) {}

  async getPosts(): Promise<FeedPost[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/feed`);

      if (!response.ok) {
        throw new ApiError("Failed to fetch feed posts", response.status);
      }

      const posts = await response.json();
      logger.debug("Fetched feed posts", { count: posts.length });
      return posts;
    } catch (error) {
      logger.error("Error fetching feed posts", { 
        error: error instanceof Error ? error : new Error(String(error))
      });
      throw error;
    }
  }

  async createPost(input: CreatePostRequest): Promise<FeedPost> {
    try {
      const response = await fetch(`${this.baseUrl}/api/feed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new ApiError("Failed to create post", response.status);
      }

      const post = await response.json();
      logger.debug("Created new post", { postId: post.id });
      return post;
    } catch (error) {
      logger.error("Error creating post", { 
        error: error instanceof Error ? error : new Error(String(error))
      });
      throw error;
    }
  }
}
