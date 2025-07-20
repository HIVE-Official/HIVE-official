"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWithinEditWindow = exports.canModeratePost = exports.createPostDefaults = exports.PostModerationSchema = exports.PostReactionSchema = exports.FeedQuerySchema = exports.EditPostSchema = exports.CreatePostSchema = exports.PostSchema = exports.PostReactedUsersSchema = exports.PostReactionsSchema = exports.PostAuthorSchema = exports.ToolShareMetadataSchema = exports.EventMetadataSchema = exports.PollMetadataSchema = exports.ImageMetadataSchema = exports.RichTextContentSchema = exports.PostType = void 0;
const zod_1 = require("zod");
/**
 * Post types supported in HIVE
 */
exports.PostType = zod_1.z.enum(['text', 'image', 'poll', 'event', 'toolshare']);
/**
 * Rich text content schema (lite version with basic formatting)
 */
exports.RichTextContentSchema = zod_1.z.object({
    text: zod_1.z.string().min(1).max(500), // 500 char limit as per requirements
    formatting: zod_1.z.array(zod_1.z.object({
        type: zod_1.z.enum(['bold', 'italic', 'link']),
        start: zod_1.z.number(),
        end: zod_1.z.number(),
        url: zod_1.z.string().url().optional(), // For links
    })).optional(),
    mentions: zod_1.z.array(zod_1.z.object({
        userId: zod_1.z.string(),
        handle: zod_1.z.string(),
        start: zod_1.z.number(),
        end: zod_1.z.number(),
    })).optional(),
});
/**
 * Post metadata schemas for different types
 */
exports.ImageMetadataSchema = zod_1.z.object({
    url: zod_1.z.string().url(),
    alt: zod_1.z.string().optional(),
    width: zod_1.z.number().optional(),
    height: zod_1.z.number().optional(),
    size: zod_1.z.number().max(5 * 1024 * 1024), // 5MB limit
});
exports.PollMetadataSchema = zod_1.z.object({
    question: zod_1.z.string().min(1).max(200),
    options: zod_1.z.array(zod_1.z.string().min(1).max(100)).min(2).max(6),
    votes: zod_1.z.record(zod_1.z.array(zod_1.z.string())).optional(), // optionIndex -> userIds
    allowMultiple: zod_1.z.boolean().default(false),
    expiresAt: zod_1.z.date().optional(),
});
exports.EventMetadataSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().max(500).optional(),
    startTime: zod_1.z.date(),
    endTime: zod_1.z.date().optional(),
    location: zod_1.z.string().max(200).optional(),
    attendees: zod_1.z.array(zod_1.z.string()).optional(), // userIds
});
exports.ToolShareMetadataSchema = zod_1.z.object({
    toolId: zod_1.z.string(),
    toolName: zod_1.z.string(),
    toolDescription: zod_1.z.string().optional(),
    shareType: zod_1.z.enum(['created', 'updated', 'featured']),
});
/**
 * Author information embedded in posts
 */
exports.PostAuthorSchema = zod_1.z.object({
    id: zod_1.z.string(),
    fullName: zod_1.z.string(),
    handle: zod_1.z.string(),
    photoURL: zod_1.z.string().url().optional(),
    role: zod_1.z.enum(['member', 'builder', 'admin']).optional(),
});
/**
 * Reaction system (heart only for vBETA)
 */
exports.PostReactionsSchema = zod_1.z.object({
    heart: zod_1.z.number().default(0),
});
exports.PostReactedUsersSchema = zod_1.z.object({
    heart: zod_1.z.array(zod_1.z.string()).default([]),
});
/**
 * Main Post schema
 */
exports.PostSchema = zod_1.z.object({
    id: zod_1.z.string(),
    spaceId: zod_1.z.string(),
    authorId: zod_1.z.string(),
    author: exports.PostAuthorSchema.optional(), // Populated when fetching
    // Content
    type: exports.PostType.default('text'),
    content: zod_1.z.string().min(1).max(500),
    richContent: exports.RichTextContentSchema.optional(),
    // Type-specific metadata
    imageMetadata: exports.ImageMetadataSchema.optional(),
    pollMetadata: exports.PollMetadataSchema.optional(),
    eventMetadata: exports.EventMetadataSchema.optional(),
    toolShareMetadata: exports.ToolShareMetadataSchema.optional(),
    // Engagement
    reactions: exports.PostReactionsSchema.default({ heart: 0 }),
    reactedUsers: exports.PostReactedUsersSchema.default({ heart: [] }),
    // Moderation & Status
    isPinned: zod_1.z.boolean().default(false),
    pinnedAt: zod_1.z.date().optional(),
    pinnedBy: zod_1.z.string().optional(),
    isEdited: zod_1.z.boolean().default(false),
    isDeleted: zod_1.z.boolean().default(false),
    deletedAt: zod_1.z.date().optional(),
    deletedBy: zod_1.z.string().optional(),
    isFlagged: zod_1.z.boolean().default(false),
    flaggedAt: zod_1.z.date().optional(),
    flaggedBy: zod_1.z.string().optional(),
    flagReason: zod_1.z.string().optional(),
    // Timestamps
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    hardDeleteAt: zod_1.z.date().optional(), // For 24h soft delete window
});
/**
 * Schema for creating new posts
 */
exports.CreatePostSchema = zod_1.z.object({
    type: exports.PostType.default('text'),
    content: zod_1.z.string().min(1).max(500),
    richContent: exports.RichTextContentSchema.optional(),
    // Type-specific metadata
    imageMetadata: exports.ImageMetadataSchema.optional(),
    pollMetadata: exports.PollMetadataSchema.optional(),
    eventMetadata: exports.EventMetadataSchema.optional(),
    toolShareMetadata: exports.ToolShareMetadataSchema.optional(),
}).refine((data) => {
    // Ensure metadata matches post type
    if (data.type === 'image' && !data.imageMetadata)
        return false;
    if (data.type === 'poll' && !data.pollMetadata)
        return false;
    if (data.type === 'event' && !data.eventMetadata)
        return false;
    if (data.type === 'toolshare' && !data.toolShareMetadata)
        return false;
    return true;
}, {
    message: "Post metadata must match post type"
});
/**
 * Schema for editing posts (limited fields)
 */
exports.EditPostSchema = zod_1.z.object({
    content: zod_1.z.string().min(1).max(500),
    richContent: exports.RichTextContentSchema.optional(),
});
/**
 * Feed query parameters
 */
exports.FeedQuerySchema = zod_1.z.object({
    limit: zod_1.z.number().min(1).max(50).default(20),
    lastPostId: zod_1.z.string().optional(),
    includeDeleted: zod_1.z.boolean().default(false), // For moderation views
});
/**
 * Post reaction schema
 */
exports.PostReactionSchema = zod_1.z.object({
    reaction: zod_1.z.enum(['heart']),
    action: zod_1.z.enum(['add', 'remove']),
});
/**
 * Post moderation actions
 */
exports.PostModerationSchema = zod_1.z.object({
    action: zod_1.z.enum(['pin', 'unpin', 'flag', 'unflag', 'delete']),
    reason: zod_1.z.string().optional(),
});
/**
 * Utility functions for post creation
 */
const createPostDefaults = (authorId, spaceId, data) => ({
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
exports.createPostDefaults = createPostDefaults;
/**
 * Helper to check if user can moderate post
 */
const canModeratePost = (userRole, isAuthor) => {
    return isAuthor || userRole === 'builder' || userRole === 'admin';
};
exports.canModeratePost = canModeratePost;
/**
 * Helper to check if post is within edit window
 */
const isWithinEditWindow = (createdAt, windowMinutes = 15) => {
    const now = new Date();
    const windowMs = windowMinutes * 60 * 1000;
    return (now.getTime() - createdAt.getTime()) <= windowMs;
};
exports.isWithinEditWindow = isWithinEditWindow;
//# sourceMappingURL=post.js.map