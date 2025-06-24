import { z } from "zod";

/**
 * Post Content Types
 * Following HD-004 decisions for content creation patterns
 */
export type PostType =
  | "prompt-post" // Simple text post (inline composer)
  | "pulse" // Quick status update (modal)
  | "event-card" // Event announcement (modal)
  | "join-form" // Space invitation (modal)
  | "poll" // Poll/voting (modal)
  | "media-post"; // Image/video post (modal)

/**
 * Post Visibility & Targeting
 */
export type PostVisibility = "public" | "space-only" | "followers-only";
export type PostStatus = "draft" | "published" | "archived" | "flagged";

/**
 * Rich Content Structure
 */
export interface PostContent {
  text?: string;
  mentions?: {
    userId: string;
    handle: string;
    displayName: string;
    position: [number, number]; // [start, end] in text
  }[];
  hashtags?: {
    tag: string;
    position: [number, number];
  }[];
  links?: {
    url: string;
    title?: string;
    description?: string;
    image?: string;
    position: [number, number];
  }[];
  media?: {
    type: "image" | "video" | "audio";
    url: string;
    thumbnail?: string;
    alt?: string;
    dimensions?: { width: number; height: number };
  }[];
}

/**
 * Post Data Schema
 */
export const PostSchema = z.object({
  id: z.string(),
  type: z.enum([
    "prompt-post",
    "pulse",
    "event-card",
    "join-form",
    "poll",
    "media-post",
  ]),
  authorId: z.string(),
  authorHandle: z.string(),
  authorDisplayName: z.string(),
  content: z.object({
    text: z.string().optional(),
    mentions: z
      .array(
        z.object({
          userId: z.string(),
          handle: z.string(),
          displayName: z.string(),
          position: z.tuple([z.number(), z.number()]),
        })
      )
      .optional(),
    hashtags: z
      .array(
        z.object({
          tag: z.string(),
          position: z.tuple([z.number(), z.number()]),
        })
      )
      .optional(),
    links: z
      .array(
        z.object({
          url: z.string().url(),
          title: z.string().optional(),
          description: z.string().optional(),
          image: z.string().url().optional(),
          position: z.tuple([z.number(), z.number()]),
        })
      )
      .optional(),
    media: z
      .array(
        z.object({
          type: z.enum(["image", "video", "audio"]),
          url: z.string().url(),
          thumbnail: z.string().url().optional(),
          alt: z.string().optional(),
          dimensions: z
            .object({
              width: z.number(),
              height: z.number(),
            })
            .optional(),
        })
      )
      .optional(),
  }),
  spaceId: z.string().optional(),
  spaceName: z.string().optional(),
  visibility: z.enum(["public", "space-only", "followers-only"]),
  status: z.enum(["draft", "published", "archived", "flagged"]),
  scheduledAt: z.date().optional(),
  publishedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  // Engagement metrics
  reactions: z.record(z.string(), z.number()).default({}),
  reactionCount: z.number().default(0),
  commentCount: z.number().default(0),
  shareCount: z.number().default(0),
  viewCount: z.number().default(0),
  // Tool-specific data
  toolData: z.record(z.unknown()).optional(),
});

export type Post = z.infer<typeof PostSchema>;

/**
 * Minimal Post Schema for offline caching and list views
 */
export const MinimalPostSchema = PostSchema.pick({
  id: true,
  type: true,
  authorId: true,
  authorHandle: true,
  authorDisplayName: true,
  content: true, // Content is essential for display
  spaceId: true,
  visibility: true,
  publishedAt: true,
  reactionCount: true,
  commentCount: true,
});

export type MinimalPost = z.infer<typeof MinimalPostSchema>;

/**
 * Post Creation Request Schema
 */
export const CreatePostSchema = z.object({
  type: z.enum([
    "prompt-post",
    "pulse",
    "event-card",
    "join-form",
    "poll",
    "media-post",
  ]),
  content: z
    .object({
      text: z.string().min(1).max(2000).optional(),
      media: z
        .array(
          z.object({
            type: z.enum(["image", "video", "audio"]),
            url: z.string().url(),
            thumbnail: z.string().url().optional(),
            alt: z.string().optional(),
            dimensions: z
              .object({
                width: z.number(),
                height: z.number(),
              })
              .optional(),
          })
        )
        .max(10)
        .optional(),
    })
    .refine((data) => data.text || data.media, {
      message: "Post must have either text content or media",
    }),
  spaceId: z.string().optional(),
  visibility: z
    .enum(["public", "space-only", "followers-only"])
    .default("public"),
  scheduledAt: z.date().optional(),
  toolData: z.record(z.unknown()).optional(),
});

export type CreatePostRequest = z.infer<typeof CreatePostSchema>;

/**
 * Content Processing Utils
 */
export class ContentProcessor {
  /**
   * Extract mentions from text content
   */
  static extractMentions(
    text: string
  ): { handle: string; position: [number, number] }[] {
    const mentionRegex = /@([a-zA-Z0-9_]+)/g;
    const mentions: { handle: string; position: [number, number] }[] = [];
    let match;

    while ((match = mentionRegex.exec(text)) !== null) {
      mentions.push({
        handle: match[1],
        position: [match.index, match.index + match[0].length],
      });
    }

    return mentions;
  }

  /**
   * Extract hashtags from text content
   */
  static extractHashtags(
    text: string
  ): { tag: string; position: [number, number] }[] {
    const hashtagRegex = /#([a-zA-Z0-9_]+)/g;
    const hashtags: { tag: string; position: [number, number] }[] = [];
    let match;

    while ((match = hashtagRegex.exec(text)) !== null) {
      hashtags.push({
        tag: match[1],
        position: [match.index, match.index + match[0].length],
      });
    }

    return hashtags;
  }

  /**
   * Extract and validate URLs from text content
   */
  static extractLinks(
    text: string
  ): { url: string; position: [number, number] }[] {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const links: { url: string; position: [number, number] }[] = [];
    let match;

    while ((match = urlRegex.exec(text)) !== null) {
      try {
        new URL(match[1]); // Validate URL
        links.push({
          url: match[1],
          position: [match.index, match.index + match[0].length],
        });
      } catch {
        // Skip invalid URLs
      }
    }

    return links;
  }

  /**
   * Process raw text into rich content structure
   */
  static processContent(
    text: string
  ): Pick<PostContent, "mentions" | "hashtags" | "links"> {
    return {
      mentions: this.extractMentions(text).map((m) => ({
        ...m,
        userId: "", // Will be resolved by mention resolution service
        displayName: "", // Will be resolved by mention resolution service
      })),
      hashtags: this.extractHashtags(text),
      links: this.extractLinks(text),
    };
  }
}

/**
 * Post Validation Rules
 */
export class PostValidator {
  /**
   * Validate post content based on type
   */
  static validateByType(
    type: PostType,
    content: PostContent
  ): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    switch (type) {
      case "prompt-post":
        if (!content.text || content.text.trim().length === 0) {
          errors.push("PromptPost requires text content");
        }
        if (content.text && content.text.length > 500) {
          errors.push("PromptPost text cannot exceed 500 characters");
        }
        break;

      case "pulse":
        if (!content.text || content.text.trim().length === 0) {
          errors.push("Pulse requires text content");
        }
        if (content.text && content.text.length > 280) {
          errors.push("Pulse text cannot exceed 280 characters");
        }
        break;

      case "event-card":
        if (!content.text || content.text.trim().length === 0) {
          errors.push("EventCard requires text content");
        }
        // EventCard should have structured data in toolData
        break;

      case "join-form":
        if (!content.text || content.text.trim().length === 0) {
          errors.push("JoinForm requires description text");
        }
        break;

      case "poll":
        if (!content.text || content.text.trim().length === 0) {
          errors.push("Poll requires question text");
        }
        // Poll options should be in toolData
        break;

      case "media-post":
        if (!content.media || content.media.length === 0) {
          errors.push("MediaPost requires at least one media item");
        }
        if (content.media && content.media.length > 10) {
          errors.push("MediaPost cannot have more than 10 media items");
        }
        break;
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate space posting permissions
   */
  static validateSpacePermissions(
    userId: string,
    spaceId: string | undefined,
    visibility: PostVisibility
  ): { canPost: boolean; reason?: string } {
    // Basic validation - will be enhanced with actual permission checking
    if (visibility === "space-only" && !spaceId) {
      return {
        canPost: false,
        reason: "Space-only posts require a target space",
      };
    }

    return { canPost: true };
  }
}

/**
 * Post Creation Engine
 */
export class PostCreationEngine {
  /**
   * Create a new post with full validation and processing
   */
  static async createPost(
    authorId: string,
    authorHandle: string,
    authorDisplayName: string,
    request: CreatePostRequest
  ): Promise<{ success: boolean; post?: Post; errors?: string[] }> {
    try {
      // Validate request
      const validation = CreatePostSchema.safeParse(request);
      if (!validation.success) {
        return {
          success: false,
          errors: validation.error.errors.map((e) => e.message),
        };
      }

      const validatedRequest = validation.data;

      // Process content
      const processedContent: PostContent = {
        text: validatedRequest.content.text,
        media: validatedRequest.content.media as PostContent["media"],
        ...ContentProcessor.processContent(validatedRequest.content.text || ""),
      };

      // Validate by post type
      const typeValidation = PostValidator.validateByType(
        validatedRequest.type,
        processedContent
      );
      if (!typeValidation.valid) {
        return {
          success: false,
          errors: typeValidation.errors,
        };
      }

      // Validate space permissions
      const spaceValidation = PostValidator.validateSpacePermissions(
        authorId,
        validatedRequest.spaceId,
        validatedRequest.visibility
      );
      if (!spaceValidation.canPost) {
        return {
          success: false,
          errors: [spaceValidation.reason || "Permission denied"],
        };
      }

      // Create post object
      const now = new Date();
      const post: Post = {
        id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: validatedRequest.type,
        authorId,
        authorHandle,
        authorDisplayName,
        content: processedContent,
        spaceId: validatedRequest.spaceId,
        spaceName: undefined, // Will be resolved by space service
        visibility: validatedRequest.visibility,
        status: validatedRequest.scheduledAt ? "draft" : "published",
        scheduledAt: validatedRequest.scheduledAt,
        publishedAt: validatedRequest.scheduledAt ? undefined : now,
        createdAt: now,
        updatedAt: now,
        reactions: {},
        reactionCount: 0,
        commentCount: 0,
        shareCount: 0,
        viewCount: 0,
        toolData: validatedRequest.toolData,
      };

      return {
        success: true,
        post,
      };
    } catch (error) {
      return {
        success: false,
        errors: [
          "Failed to create post: " +
            (error instanceof Error ? error.message : "Unknown error"),
        ],
      };
    }
  }

  /**
   * Update an existing post
   */
  static async updatePost(
    postId: string,
    authorId: string,
    updates: Partial<CreatePostRequest>
  ): Promise<{ success: boolean; post?: Partial<Post>; errors?: string[] }> {
    try {
      // Validate update permissions (post author only)
      // This would typically check against stored post data

      const updatedFields: Partial<Post> = {
        updatedAt: new Date(),
      };

      // Process content updates if provided
      if (updates.content?.text !== undefined) {
        const processedContent = ContentProcessor.processContent(
          updates.content.text
        );
        updatedFields.content = {
          text: updates.content.text,
          media: updates.content.media,
          ...processedContent,
        };
      }

      // Update other fields
      if (updates.visibility) updatedFields.visibility = updates.visibility;
      if (updates.spaceId !== undefined)
        updatedFields.spaceId = updates.spaceId;
      if (updates.scheduledAt !== undefined)
        updatedFields.scheduledAt = updates.scheduledAt;
      if (updates.toolData !== undefined)
        updatedFields.toolData = updates.toolData;

      return {
        success: true,
        post: updatedFields,
      };
    } catch (error) {
      return {
        success: false,
        errors: [
          "Failed to update post: " +
            (error instanceof Error ? error.message : "Unknown error"),
        ],
      };
    }
  }

  /**
   * Delete a post
   */
  static async deletePost(
    postId: string,
    userId: string
  ): Promise<{ success: boolean; errors?: string[] }> {
    try {
      // Validate delete permissions
      // This would check if user is post author or has admin permissions

      return { success: true };
    } catch (error) {
      return {
        success: false,
        errors: [
          "Failed to delete post: " +
            (error instanceof Error ? error.message : "Unknown error"),
        ],
      };
    }
  }
}

/**
 * Draft Management System
 */
export class DraftManager {
  /**
   * Save draft post
   */
  static saveDraft(
    authorId: string,
    draftData: CreatePostRequest
  ): { draftId: string; savedAt: Date } {
    const draftId = `draft_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const savedAt = new Date();

    // In real implementation, this would save to storage

    return { draftId, savedAt };
  }

  /**
   * Load user drafts
   */
  static async loadDrafts(authorId: string): Promise<
    Array<{
      draftId: string;
      data: CreatePostRequest;
      savedAt: Date;
    }>
  > {
    // In real implementation, this would load from storage
    return [];
  }

  /**
   * Delete draft
   */
  static deleteDraft(draftId: string, authorId: string): boolean {
    // In real implementation, this would delete from storage
    return true;
  }
}

/**
 * Post Analytics Tracking
 */
export interface PostAnalytics {
  postId: string;
  authorId: string;
  spaceId?: string;
  type: PostType;
  createdAt: Date;
  timeToFirstView: number; // milliseconds
  timeToFirstReaction: number; // milliseconds
  engagementRate: number; // reactions / views
  peakViewTime: Date; // when post received most views
  totalReach: number; // unique users who saw the post
}

export class PostAnalyticsTracker {
  /**
   * Track post creation event
   */
  static trackPostCreated(post: Post): void {
    // Analytics tracking implementation
    console.log("Post created:", {
      postId: post.id,
      type: post.type,
      spaceId: post.spaceId,
      hasMedia: !!post.content.media?.length,
      textLength: post.content.text?.length || 0,
    });
  }

  /**
   * Track post engagement
   */
  static trackPostEngagement(
    postId: string,
    userId: string,
    engagementType: "view" | "reaction" | "comment" | "share"
  ): void {
    // Analytics tracking implementation
    console.log("Post engagement:", {
      postId,
      userId,
      engagementType,
      timestamp: new Date(),
    });
  }
}
