import { type Timestamp } from 'firebase/firestore';
import { z } from 'zod';

/**
 * Post types supported in HIVE
 */
export const PostType = z.enum(['text', 'image', 'poll', 'event', 'toolshare']);
export type PostType = z.infer<typeof PostType>;

/**
 * Post visibility levels
 */
export type PostVisibility = 'public' | 'members_only';

/**
 * Post status for moderation
 */
export type PostStatus = 'active' | 'hidden' | 'deleted' | 'flagged';

/**
 * Attachment data for different post types
 */
export interface PostAttachment {
  type: PostType;
  data: {
    // For image posts
    imageUrl?: string;
    imageAlt?: string;
    // For polls
    pollOptions?: string[];
    pollEndsAt?: Timestamp;
    // For events
    eventTitle?: string;
    eventDate?: Timestamp;
    eventLocation?: string;
    // For tool shares
    toolId?: string;
    toolVersion?: string;
  };
}

/**
 * Denormalized author information for efficient display
 */
export interface PostAuthor {
  name: string;
  handle: string;
  avatarUrl?: string;
  role: 'member' | 'builder' | 'admin'; // Their role in this space
}

/**
 * Post engagement metrics
 */
export interface PostMetrics {
  replyCount: number;
  likeCount: number;
  shareCount: number;
  viewCount: number;
}

/**
 * Rich text content schema (lite version with basic formatting)
 */
export const RichTextContentSchema = z.object({
  text: z.string().min(1).max(500), // 500 char limit as per requirements
  formatting: z.array(z.object({
    type: z.enum(['bold', 'italic', 'link']),
    start: z.number(),
    end: z.number(),
    url: z.string().url().optional(), // For links
  })).optional(),
  mentions: z.array(z.object({
    userId: z.string(),
    handle: z.string(),
    start: z.number(),
    end: z.number(),
  })).optional(),
});

/**
 * Post metadata schemas for different types
 */
export const ImageMetadataSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  size: z.number().max(5 * 1024 * 1024), // 5MB limit
});

export const PollMetadataSchema = z.object({
  question: z.string().min(1).max(200),
  options: z.array(z.string().min(1).max(100)).min(2).max(6),
  votes: z.record(z.array(z.string())).optional(), // optionIndex -> userIds
  allowMultiple: z.boolean().default(false),
  expiresAt: z.date().optional(),
});

export const EventMetadataSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  startTime: z.date(),
  endTime: z.date().optional(),
  location: z.string().max(200).optional(),
  attendees: z.array(z.string()).optional(), // userIds
});

export const ToolShareMetadataSchema = z.object({
  toolId: z.string(),
  toolName: z.string(),
  toolDescription: z.string().optional(),
  shareType: z.enum(['created', 'updated', 'featured']),
});

/**
 * Author information embedded in posts
 */
export const PostAuthorSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  handle: z.string(),
  photoURL: z.string().url().optional(),
  role: z.enum(['member', 'builder', 'admin']).optional(),
});

/**
 * Reaction system (heart only for vBETA)
 */
export const PostReactionsSchema = z.object({
  heart: z.number().default(0),
});

export const PostReactedUsersSchema = z.object({
  heart: z.array(z.string()).default([]),
});

/**
 * Main Post schema
 */
export const PostSchema = z.object({
  id: z.string(),
  spaceId: z.string(),
  authorId: z.string(),
  author: PostAuthorSchema.optional(), // Populated when fetching
  
  // Content
  type: PostType.default('text'),
  content: z.string().min(1).max(500),
  richContent: RichTextContentSchema.optional(),
  
  // Type-specific metadata
  imageMetadata: ImageMetadataSchema.optional(),
  pollMetadata: PollMetadataSchema.optional(),
  eventMetadata: EventMetadataSchema.optional(),
  toolShareMetadata: ToolShareMetadataSchema.optional(),
  
  // Engagement
  reactions: PostReactionsSchema.default({ heart: 0 }),
  reactedUsers: PostReactedUsersSchema.default({ heart: [] }),
  
  // Moderation & Status
  isPinned: z.boolean().default(false),
  pinnedAt: z.date().optional(),
  pinnedBy: z.string().optional(),
  
  isEdited: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
  deletedAt: z.date().optional(),
  deletedBy: z.string().optional(),
  
  isFlagged: z.boolean().default(false),
  flaggedAt: z.date().optional(),
  flaggedBy: z.string().optional(),
  flagReason: z.string().optional(),
  
  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
  hardDeleteAt: z.date().optional(), // For 24h soft delete window
});

export type Post = z.infer<typeof PostSchema>;

/**
 * Schema for creating new posts
 */
export const CreatePostSchema = z.object({
  type: PostType.default('text'),
  content: z.string().min(1).max(500),
  richContent: RichTextContentSchema.optional(),
  
  // Type-specific metadata
  imageMetadata: ImageMetadataSchema.optional(),
  pollMetadata: PollMetadataSchema.optional(),
  eventMetadata: EventMetadataSchema.optional(),
  toolShareMetadata: ToolShareMetadataSchema.optional(),
}).refine((data) => {
  // Ensure metadata matches post type
  if (data.type === 'image' && !data.imageMetadata) return false
  if (data.type === 'poll' && !data.pollMetadata) return false
  if (data.type === 'event' && !data.eventMetadata) return false
  if (data.type === 'toolshare' && !data.toolShareMetadata) return false
  return true
}, {
  message: "Post metadata must match post type"
});

export type CreatePost = z.infer<typeof CreatePostSchema>;

/**
 * Schema for editing posts (limited fields)
 */
export const EditPostSchema = z.object({
  content: z.string().min(1).max(500),
  richContent: RichTextContentSchema.optional(),
});

export type EditPost = z.infer<typeof EditPostSchema>;

/**
 * Feed query parameters
 */
export const FeedQuerySchema = z.object({
  limit: z.number().min(1).max(50).default(20),
  lastPostId: z.string().optional(),
  includeDeleted: z.boolean().default(false), // For moderation views
});

export type FeedQuery = z.infer<typeof FeedQuerySchema>;

/**
 * Post reaction schema
 */
export const PostReactionSchema = z.object({
  reaction: z.enum(['heart']),
  action: z.enum(['add', 'remove']),
});

export type PostReaction = z.infer<typeof PostReactionSchema>;

/**
 * Post moderation actions
 */
export const PostModerationSchema = z.object({
  action: z.enum(['pin', 'unpin', 'flag', 'unflag', 'delete']),
  reason: z.string().optional(),
});

export type PostModeration = z.infer<typeof PostModerationSchema>;

/**
 * Utility functions for post creation
 */
export const createPostDefaults = (
  authorId: string,
  spaceId: string,
  data: CreatePost
): Omit<Post, 'id' | 'createdAt' | 'updatedAt'> => ({
  spaceId,
  authorId,
  type: data.type,
  content: data.content,
  richContent: data.richContent,
  imageMetadata: data.imageMetadata,
  pollMetadata: data.pollMetadata,
  eventMetadata: data.eventMetadata,
  toolShareMetadata: data.toolShareMetadata,
  reactions: { heart: 0 },
  reactedUsers: { heart: [] },
  isPinned: false,
  isEdited: false,
  isDeleted: false,
  isFlagged: false,
});

/**
 * Helper to check if user can moderate post
 */
export const canModeratePost = (
  userRole: 'member' | 'builder' | 'admin',
  isAuthor: boolean
): boolean => {
  return isAuthor || userRole === 'builder' || userRole === 'admin'
};

/**
 * Helper to check if post is within edit window
 */
export const isWithinEditWindow = (createdAt: Date, windowMinutes: number = 15): boolean => {
  const now = new Date()
  const windowMs = windowMinutes * 60 * 1000
  return (now.getTime() - createdAt.getTime()) <= windowMs
}; 