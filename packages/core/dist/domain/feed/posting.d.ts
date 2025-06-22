import { z } from "zod";
/**
 * Post Content Types
 * Following HD-004 decisions for content creation patterns
 */
export type PostType = "prompt-post" | "pulse" | "event-card" | "join-form" | "poll" | "media-post";
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
        position: [number, number];
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
        dimensions?: {
            width: number;
            height: number;
        };
    }[];
}
/**
 * Post Data Schema
 */
export declare const PostSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["prompt-post", "pulse", "event-card", "join-form", "poll", "media-post"]>;
    authorId: z.ZodString;
    authorHandle: z.ZodString;
    authorDisplayName: z.ZodString;
    content: z.ZodObject<{
        text: z.ZodOptional<z.ZodString>;
        mentions: z.ZodOptional<z.ZodArray<z.ZodObject<{
            userId: z.ZodString;
            handle: z.ZodString;
            displayName: z.ZodString;
            position: z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>;
        }, "strip", z.ZodTypeAny, {
            position: [number, number];
            userId: string;
            handle: string;
            displayName: string;
        }, {
            position: [number, number];
            userId: string;
            handle: string;
            displayName: string;
        }>, "many">>;
        hashtags: z.ZodOptional<z.ZodArray<z.ZodObject<{
            tag: z.ZodString;
            position: z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>;
        }, "strip", z.ZodTypeAny, {
            position: [number, number];
            tag: string;
        }, {
            position: [number, number];
            tag: string;
        }>, "many">>;
        links: z.ZodOptional<z.ZodArray<z.ZodObject<{
            url: z.ZodString;
            title: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            image: z.ZodOptional<z.ZodString>;
            position: z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            position: [number, number];
            description?: string | undefined;
            image?: string | undefined;
            title?: string | undefined;
        }, {
            url: string;
            position: [number, number];
            description?: string | undefined;
            image?: string | undefined;
            title?: string | undefined;
        }>, "many">>;
        media: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["image", "video", "audio"]>;
            url: z.ZodString;
            thumbnail: z.ZodOptional<z.ZodString>;
            alt: z.ZodOptional<z.ZodString>;
            dimensions: z.ZodOptional<z.ZodObject<{
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                width: number;
                height: number;
            }, {
                width: number;
                height: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "image" | "video" | "audio";
            url: string;
            alt?: string | undefined;
            thumbnail?: string | undefined;
            dimensions?: {
                width: number;
                height: number;
            } | undefined;
        }, {
            type: "image" | "video" | "audio";
            url: string;
            alt?: string | undefined;
            thumbnail?: string | undefined;
            dimensions?: {
                width: number;
                height: number;
            } | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        text?: string | undefined;
        mentions?: {
            position: [number, number];
            userId: string;
            handle: string;
            displayName: string;
        }[] | undefined;
        media?: {
            type: "image" | "video" | "audio";
            url: string;
            alt?: string | undefined;
            thumbnail?: string | undefined;
            dimensions?: {
                width: number;
                height: number;
            } | undefined;
        }[] | undefined;
        hashtags?: {
            position: [number, number];
            tag: string;
        }[] | undefined;
        links?: {
            url: string;
            position: [number, number];
            description?: string | undefined;
            image?: string | undefined;
            title?: string | undefined;
        }[] | undefined;
    }, {
        text?: string | undefined;
        mentions?: {
            position: [number, number];
            userId: string;
            handle: string;
            displayName: string;
        }[] | undefined;
        media?: {
            type: "image" | "video" | "audio";
            url: string;
            alt?: string | undefined;
            thumbnail?: string | undefined;
            dimensions?: {
                width: number;
                height: number;
            } | undefined;
        }[] | undefined;
        hashtags?: {
            position: [number, number];
            tag: string;
        }[] | undefined;
        links?: {
            url: string;
            position: [number, number];
            description?: string | undefined;
            image?: string | undefined;
            title?: string | undefined;
        }[] | undefined;
    }>;
    spaceId: z.ZodOptional<z.ZodString>;
    spaceName: z.ZodOptional<z.ZodString>;
    visibility: z.ZodEnum<["public", "space-only", "followers-only"]>;
    status: z.ZodEnum<["draft", "published", "archived", "flagged"]>;
    scheduledAt: z.ZodOptional<z.ZodDate>;
    publishedAt: z.ZodOptional<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    reactions: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    reactionCount: z.ZodDefault<z.ZodNumber>;
    commentCount: z.ZodDefault<z.ZodNumber>;
    shareCount: z.ZodDefault<z.ZodNumber>;
    viewCount: z.ZodDefault<z.ZodNumber>;
    toolData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "published" | "flagged" | "archived";
    type: "poll" | "pulse" | "prompt-post" | "event-card" | "join-form" | "media-post";
    id: string;
    createdAt: Date;
    updatedAt: Date;
    viewCount: number;
    authorId: string;
    content: {
        text?: string | undefined;
        mentions?: {
            position: [number, number];
            userId: string;
            handle: string;
            displayName: string;
        }[] | undefined;
        media?: {
            type: "image" | "video" | "audio";
            url: string;
            alt?: string | undefined;
            thumbnail?: string | undefined;
            dimensions?: {
                width: number;
                height: number;
            } | undefined;
        }[] | undefined;
        hashtags?: {
            position: [number, number];
            tag: string;
        }[] | undefined;
        links?: {
            url: string;
            position: [number, number];
            description?: string | undefined;
            image?: string | undefined;
            title?: string | undefined;
        }[] | undefined;
    };
    reactions: Record<string, number>;
    reactionCount: number;
    authorHandle: string;
    authorDisplayName: string;
    visibility: "public" | "space-only" | "followers-only";
    commentCount: number;
    shareCount: number;
    spaceId?: string | undefined;
    publishedAt?: Date | undefined;
    spaceName?: string | undefined;
    scheduledAt?: Date | undefined;
    toolData?: Record<string, unknown> | undefined;
}, {
    status: "draft" | "published" | "flagged" | "archived";
    type: "poll" | "pulse" | "prompt-post" | "event-card" | "join-form" | "media-post";
    id: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    content: {
        text?: string | undefined;
        mentions?: {
            position: [number, number];
            userId: string;
            handle: string;
            displayName: string;
        }[] | undefined;
        media?: {
            type: "image" | "video" | "audio";
            url: string;
            alt?: string | undefined;
            thumbnail?: string | undefined;
            dimensions?: {
                width: number;
                height: number;
            } | undefined;
        }[] | undefined;
        hashtags?: {
            position: [number, number];
            tag: string;
        }[] | undefined;
        links?: {
            url: string;
            position: [number, number];
            description?: string | undefined;
            image?: string | undefined;
            title?: string | undefined;
        }[] | undefined;
    };
    authorHandle: string;
    authorDisplayName: string;
    visibility: "public" | "space-only" | "followers-only";
    viewCount?: number | undefined;
    spaceId?: string | undefined;
    publishedAt?: Date | undefined;
    reactions?: Record<string, number> | undefined;
    reactionCount?: number | undefined;
    spaceName?: string | undefined;
    scheduledAt?: Date | undefined;
    commentCount?: number | undefined;
    shareCount?: number | undefined;
    toolData?: Record<string, unknown> | undefined;
}>;
export type Post = z.infer<typeof PostSchema>;
/**
 * Post Creation Request Schema
 */
export declare const CreatePostSchema: z.ZodObject<{
    type: z.ZodEnum<["prompt-post", "pulse", "event-card", "join-form", "poll", "media-post"]>;
    content: z.ZodEffects<z.ZodObject<{
        text: z.ZodOptional<z.ZodString>;
        media: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["image", "video", "audio"]>;
            url: z.ZodString;
            thumbnail: z.ZodOptional<z.ZodString>;
            alt: z.ZodOptional<z.ZodString>;
            dimensions: z.ZodOptional<z.ZodObject<{
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                width: number;
                height: number;
            }, {
                width: number;
                height: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "image" | "video" | "audio";
            url: string;
            alt?: string | undefined;
            thumbnail?: string | undefined;
            dimensions?: {
                width: number;
                height: number;
            } | undefined;
        }, {
            type: "image" | "video" | "audio";
            url: string;
            alt?: string | undefined;
            thumbnail?: string | undefined;
            dimensions?: {
                width: number;
                height: number;
            } | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        text?: string | undefined;
        media?: {
            type: "image" | "video" | "audio";
            url: string;
            alt?: string | undefined;
            thumbnail?: string | undefined;
            dimensions?: {
                width: number;
                height: number;
            } | undefined;
        }[] | undefined;
    }, {
        text?: string | undefined;
        media?: {
            type: "image" | "video" | "audio";
            url: string;
            alt?: string | undefined;
            thumbnail?: string | undefined;
            dimensions?: {
                width: number;
                height: number;
            } | undefined;
        }[] | undefined;
    }>, {
        text?: string | undefined;
        media?: {
            type: "image" | "video" | "audio";
            url: string;
            alt?: string | undefined;
            thumbnail?: string | undefined;
            dimensions?: {
                width: number;
                height: number;
            } | undefined;
        }[] | undefined;
    }, {
        text?: string | undefined;
        media?: {
            type: "image" | "video" | "audio";
            url: string;
            alt?: string | undefined;
            thumbnail?: string | undefined;
            dimensions?: {
                width: number;
                height: number;
            } | undefined;
        }[] | undefined;
    }>;
    spaceId: z.ZodOptional<z.ZodString>;
    visibility: z.ZodDefault<z.ZodEnum<["public", "space-only", "followers-only"]>>;
    scheduledAt: z.ZodOptional<z.ZodDate>;
    toolData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    type: "poll" | "pulse" | "prompt-post" | "event-card" | "join-form" | "media-post";
    content: {
        text?: string | undefined;
        media?: {
            type: "image" | "video" | "audio";
            url: string;
            alt?: string | undefined;
            thumbnail?: string | undefined;
            dimensions?: {
                width: number;
                height: number;
            } | undefined;
        }[] | undefined;
    };
    visibility: "public" | "space-only" | "followers-only";
    spaceId?: string | undefined;
    scheduledAt?: Date | undefined;
    toolData?: Record<string, unknown> | undefined;
}, {
    type: "poll" | "pulse" | "prompt-post" | "event-card" | "join-form" | "media-post";
    content: {
        text?: string | undefined;
        media?: {
            type: "image" | "video" | "audio";
            url: string;
            alt?: string | undefined;
            thumbnail?: string | undefined;
            dimensions?: {
                width: number;
                height: number;
            } | undefined;
        }[] | undefined;
    };
    spaceId?: string | undefined;
    visibility?: "public" | "space-only" | "followers-only" | undefined;
    scheduledAt?: Date | undefined;
    toolData?: Record<string, unknown> | undefined;
}>;
export type CreatePostRequest = z.infer<typeof CreatePostSchema>;
/**
 * Content Processing Utils
 */
export declare class ContentProcessor {
    /**
     * Extract mentions from text content
     */
    static extractMentions(text: string): {
        handle: string;
        position: [number, number];
    }[];
    /**
     * Extract hashtags from text content
     */
    static extractHashtags(text: string): {
        tag: string;
        position: [number, number];
    }[];
    /**
     * Extract and validate URLs from text content
     */
    static extractLinks(text: string): {
        url: string;
        position: [number, number];
    }[];
    /**
     * Process raw text into rich content structure
     */
    static processContent(text: string): Pick<PostContent, "mentions" | "hashtags" | "links">;
}
/**
 * Post Validation Rules
 */
export declare class PostValidator {
    /**
     * Validate post content based on type
     */
    static validateByType(type: PostType, content: PostContent): {
        valid: boolean;
        errors: string[];
    };
    /**
     * Validate space posting permissions
     */
    static validateSpacePermissions(userId: string, spaceId: string | undefined, visibility: PostVisibility): {
        canPost: boolean;
        reason?: string;
    };
}
/**
 * Post Creation Engine
 */
export declare class PostCreationEngine {
    /**
     * Create a new post with full validation and processing
     */
    static createPost(authorId: string, authorHandle: string, authorDisplayName: string, request: CreatePostRequest): Promise<{
        success: boolean;
        post?: Post;
        errors?: string[];
    }>;
    /**
     * Update an existing post
     */
    static updatePost(postId: string, authorId: string, updates: Partial<CreatePostRequest>): Promise<{
        success: boolean;
        post?: Partial<Post>;
        errors?: string[];
    }>;
    /**
     * Delete a post
     */
    static deletePost(postId: string, userId: string): Promise<{
        success: boolean;
        errors?: string[];
    }>;
}
/**
 * Draft Management System
 */
export declare class DraftManager {
    /**
     * Save draft post
     */
    static saveDraft(authorId: string, draftData: CreatePostRequest): {
        draftId: string;
        savedAt: Date;
    };
    /**
     * Load user drafts
     */
    static loadDrafts(authorId: string): Promise<Array<{
        draftId: string;
        data: CreatePostRequest;
        savedAt: Date;
    }>>;
    /**
     * Delete draft
     */
    static deleteDraft(draftId: string, authorId: string): boolean;
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
    timeToFirstView: number;
    timeToFirstReaction: number;
    engagementRate: number;
    peakViewTime: Date;
    totalReach: number;
}
export declare class PostAnalyticsTracker {
    /**
     * Track post creation event
     */
    static trackPostCreated(post: Post): void;
    /**
     * Track post engagement
     */
    static trackPostEngagement(postId: string, userId: string, engagementType: "view" | "reaction" | "comment" | "share"): void;
}
//# sourceMappingURL=posting.d.ts.map