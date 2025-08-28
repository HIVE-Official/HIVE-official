"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostAnalyticsTracker = exports.DraftManager = exports.PostCreationEngine = exports.PostValidator = exports.ContentProcessor = exports.CreatePostSchema = exports.MinimalPostSchema = exports.PostSchema = void 0;
const zod_1 = require("zod");
const logger_1 = require("../../utils/logger");
/**
 * Post Data Schema
 */
exports.PostSchema = zod_1.z.object({
    id: zod_1.z.string(),
    type: zod_1.z.enum([
        "prompt-post",
        "pulse",
        "event-card",
        "join-form",
        "poll",
        "media-post",
    ]),
    authorId: zod_1.z.string(),
    authorHandle: zod_1.z.string(),
    authorDisplayName: zod_1.z.string(),
    content: zod_1.z.object({
        text: zod_1.z.string().optional(),
        mentions: zod_1.z
            .array(zod_1.z.object({
            userId: zod_1.z.string(),
            handle: zod_1.z.string(),
            displayName: zod_1.z.string(),
            position: zod_1.z.tuple([zod_1.z.number(), zod_1.z.number()]),
        }))
            .optional(),
        hashtags: zod_1.z
            .array(zod_1.z.object({
            tag: zod_1.z.string(),
            position: zod_1.z.tuple([zod_1.z.number(), zod_1.z.number()]),
        }))
            .optional(),
        links: zod_1.z
            .array(zod_1.z.object({
            url: zod_1.z.string().url(),
            title: zod_1.z.string().optional(),
            description: zod_1.z.string().optional(),
            image: zod_1.z.string().url().optional(),
            position: zod_1.z.tuple([zod_1.z.number(), zod_1.z.number()]),
        }))
            .optional(),
        media: zod_1.z
            .array(zod_1.z.object({
            type: zod_1.z.enum(["image", "video", "audio"]),
            url: zod_1.z.string().url(),
            thumbnail: zod_1.z.string().url().optional(),
            alt: zod_1.z.string().optional(),
            dimensions: zod_1.z
                .object({
                width: zod_1.z.number(),
                height: zod_1.z.number(),
            })
                .optional(),
        }))
            .optional(),
    }),
    spaceId: zod_1.z.string().optional(),
    spaceName: zod_1.z.string().optional(),
    visibility: zod_1.z.enum(["public", "space-only", "followers-only"]),
    status: zod_1.z.enum(["draft", "published", "archived", "flagged"]),
    scheduledAt: zod_1.z.date().optional(),
    publishedAt: zod_1.z.date().optional(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    // Engagement metrics
    reactions: zod_1.z.record(zod_1.z.string(), zod_1.z.number()).default({}),
    reactionCount: zod_1.z.number().default(0),
    commentCount: zod_1.z.number().default(0),
    shareCount: zod_1.z.number().default(0),
    viewCount: zod_1.z.number().default(0),
    // Tool-specific data
    toolData: zod_1.z.record(zod_1.z.unknown()).optional(),
});
/**
 * Minimal Post Schema for offline caching and list views
 */
exports.MinimalPostSchema = exports.PostSchema.pick({
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
/**
 * Post Creation Request Schema
 */
exports.CreatePostSchema = zod_1.z.object({
    type: zod_1.z.enum([
        "prompt-post",
        "pulse",
        "event-card",
        "join-form",
        "poll",
        "media-post",
    ]),
    content: zod_1.z
        .object({
        text: zod_1.z.string().min(1).max(2000).optional(),
        media: zod_1.z
            .array(zod_1.z.object({
            type: zod_1.z.enum(["image", "video", "audio"]),
            url: zod_1.z.string().url(),
            thumbnail: zod_1.z.string().url().optional(),
            alt: zod_1.z.string().optional(),
            dimensions: zod_1.z
                .object({
                width: zod_1.z.number(),
                height: zod_1.z.number(),
            })
                .optional(),
        }))
            .max(10)
            .optional(),
    })
        .refine((data) => data.text || data.media, {
        message: "Post must have either text content or media",
    }),
    spaceId: zod_1.z.string().optional(),
    visibility: zod_1.z
        .enum(["public", "space-only", "followers-only"])
        .default("public"),
    scheduledAt: zod_1.z.date().optional(),
    toolData: zod_1.z.record(zod_1.z.unknown()).optional(),
});
/**
 * Content Processing Utils
 */
class ContentProcessor {
    /**
     * Extract mentions from text content
     */
    static extractMentions(text) {
        const mentionRegex = /@([a-zA-Z0-9_]+)/g;
        const mentions = [];
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
    static extractHashtags(text) {
        const hashtagRegex = /#([a-zA-Z0-9_]+)/g;
        const hashtags = [];
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
    static extractLinks(text) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const links = [];
        let match;
        while ((match = urlRegex.exec(text)) !== null) {
            try {
                new URL(match[1]); // Validate URL
                links.push({
                    url: match[1],
                    position: [match.index, match.index + match[0].length],
                });
            }
            catch {
                // Skip invalid URLs
            }
        }
        return links;
    }
    /**
     * Process raw text into rich content structure
     */
    static processContent(text) {
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
exports.ContentProcessor = ContentProcessor;
/**
 * Post Validation Rules
 */
class PostValidator {
    /**
     * Validate post content based on type
     */
    static validateByType(type, content) {
        const errors = [];
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
    static validateSpacePermissions(userId, spaceId, visibility) {
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
exports.PostValidator = PostValidator;
/**
 * Post Creation Engine
 */
class PostCreationEngine {
    /**
     * Create a new post with full validation and processing
     */
    static async createPost(authorId, authorHandle, authorDisplayName, request) {
        try {
            // Validate request
            const validation = exports.CreatePostSchema.safeParse(request);
            if (!validation.success) {
                return {
                    success: false,
                    errors: validation.error.errors.map((e) => e.message),
                };
            }
            const validatedRequest = validation.data;
            // Process content
            const processedContent = {
                text: validatedRequest.content.text,
                media: validatedRequest.content.media,
                ...ContentProcessor.processContent(validatedRequest.content.text || ""),
            };
            // Validate by post type
            const typeValidation = PostValidator.validateByType(validatedRequest.type, processedContent);
            if (!typeValidation.valid) {
                return {
                    success: false,
                    errors: typeValidation.errors,
                };
            }
            // Validate space permissions
            const spaceValidation = PostValidator.validateSpacePermissions(authorId, validatedRequest.spaceId, validatedRequest.visibility);
            if (!spaceValidation.canPost) {
                return {
                    success: false,
                    errors: [spaceValidation.reason || "Permission denied"],
                };
            }
            // Create post object
            const now = new Date();
            const post = {
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
            logger_1.logger.debug("Post created:", {
                id: post.id,
                authorId: post.authorId,
                content: post.content,
            });
            return {
                success: true,
                post,
            };
        }
        catch (error) {
            return {
                success: false,
                errors: [
                    `Failed to create post: ${error instanceof Error ? error.message : "Unknown error"}`,
                ],
            };
        }
    }
    /**
     * Update an existing post
     */
    static async updatePost(postId, authorId, updates) {
        try {
            // Validate update permissions (post author only)
            // This would typically check against stored post data
            const updatedFields = {
                updatedAt: new Date(),
            };
            // Process content updates if provided
            if (updates.content?.text !== undefined) {
                const processedContent = ContentProcessor.processContent(updates.content.text);
                updatedFields.content = {
                    text: updates.content.text,
                    media: updates.content.media,
                    ...processedContent,
                };
            }
            // Update other fields
            if (updates.visibility)
                updatedFields.visibility = updates.visibility;
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
        }
        catch (error) {
            return {
                success: false,
                errors: [
                    `Failed to update post: ${error instanceof Error ? error.message : "Unknown error"}`,
                ],
            };
        }
    }
    /**
     * Delete a post
     */
    static async deletePost(_postId, _userId) {
        try {
            // Validate delete permissions
            // This would check if user is post author or has admin permissions
            return { success: true };
        }
        catch (error) {
            return {
                success: false,
                errors: [
                    `Failed to delete post: ${error instanceof Error ? error.message : "Unknown error"}`,
                ],
            };
        }
    }
}
exports.PostCreationEngine = PostCreationEngine;
/**
 * Draft Management System
 */
class DraftManager {
    /**
     * Save draft post
     */
    static saveDraft(_authorId, _draftData) {
        const draftId = `draft_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const savedAt = new Date();
        // In real implementation, this would save to storage
        return { draftId, savedAt };
    }
    /**
     * Load user drafts
     */
    static async loadDrafts(_authorId) {
        // In real implementation, this would load from storage
        return [];
    }
    /**
     * Delete draft
     */
    static deleteDraft(_draftId, _authorId) {
        // In real implementation, this would delete from storage
        return true;
    }
}
exports.DraftManager = DraftManager;
class PostAnalyticsTracker {
    /**
     * Track post creation event
     */
    static trackPostCreated(post) {
        // Analytics tracking implementation
        logger_1.logger.debug("Post created:", {
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
    static trackPostEngagement(postId, userId, engagementType) {
        // Analytics tracking implementation
        logger_1.logger.debug("Post engagement:", {
            postId,
            userId,
            engagementType,
            timestamp: new Date().toISOString(),
        });
    }
}
exports.PostAnalyticsTracker = PostAnalyticsTracker;
//# sourceMappingURL=posting.js.map