import { type Timestamp } from 'firebase/firestore';
import { z } from 'zod';
/**
 * Post types supported in HIVE
 */
export declare const PostType: z.ZodEnum<["text", "image", "poll", "event", "toolshare"]>;
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
        imageUrl?: string;
        imageAlt?: string;
        pollOptions?: string[];
        pollEndsAt?: Timestamp;
        eventTitle?: string;
        eventDate?: Timestamp;
        eventLocation?: string;
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
    role: 'member' | 'builder' | 'admin';
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
export declare const RichTextContentSchema: z.ZodObject<{
    text: z.ZodString;
    formatting: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["bold", "italic", "link"]>;
        start: z.ZodNumber;
        end: z.ZodNumber;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "bold" | "link" | "italic";
        end: number;
        start: number;
        url?: string | undefined;
    }, {
        type: "bold" | "link" | "italic";
        end: number;
        start: number;
        url?: string | undefined;
    }>, "many">>;
    mentions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        userId: z.ZodString;
        handle: z.ZodString;
        start: z.ZodNumber;
        end: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        handle: string;
        end: number;
        start: number;
        userId: string;
    }, {
        handle: string;
        end: number;
        start: number;
        userId: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    text: string;
    formatting?: {
        type: "bold" | "link" | "italic";
        end: number;
        start: number;
        url?: string | undefined;
    }[] | undefined;
    mentions?: {
        handle: string;
        end: number;
        start: number;
        userId: string;
    }[] | undefined;
}, {
    text: string;
    formatting?: {
        type: "bold" | "link" | "italic";
        end: number;
        start: number;
        url?: string | undefined;
    }[] | undefined;
    mentions?: {
        handle: string;
        end: number;
        start: number;
        userId: string;
    }[] | undefined;
}>;
/**
 * Post metadata schemas for different types
 */
export declare const ImageMetadataSchema: z.ZodObject<{
    url: z.ZodString;
    alt: z.ZodOptional<z.ZodString>;
    width: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
    size: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    size: number;
    url: string;
    alt?: string | undefined;
    height?: number | undefined;
    width?: number | undefined;
}, {
    size: number;
    url: string;
    alt?: string | undefined;
    height?: number | undefined;
    width?: number | undefined;
}>;
export declare const PollMetadataSchema: z.ZodObject<{
    question: z.ZodString;
    options: z.ZodArray<z.ZodString, "many">;
    votes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>>;
    allowMultiple: z.ZodDefault<z.ZodBoolean>;
    expiresAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    options: string[];
    question: string;
    allowMultiple: boolean;
    expiresAt?: Date | undefined;
    votes?: Record<string, string[]> | undefined;
}, {
    options: string[];
    question: string;
    allowMultiple?: boolean | undefined;
    expiresAt?: Date | undefined;
    votes?: Record<string, string[]> | undefined;
}>;
export declare const EventMetadataSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    startTime: z.ZodDate;
    endTime: z.ZodOptional<z.ZodDate>;
    location: z.ZodOptional<z.ZodString>;
    attendees: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    title: string;
    startTime: Date;
    location?: string | undefined;
    description?: string | undefined;
    endTime?: Date | undefined;
    attendees?: string[] | undefined;
}, {
    title: string;
    startTime: Date;
    location?: string | undefined;
    description?: string | undefined;
    endTime?: Date | undefined;
    attendees?: string[] | undefined;
}>;
export declare const ToolShareMetadataSchema: z.ZodObject<{
    toolId: z.ZodString;
    toolName: z.ZodString;
    toolDescription: z.ZodOptional<z.ZodString>;
    shareType: z.ZodEnum<["created", "updated", "featured"]>;
}, "strip", z.ZodTypeAny, {
    toolName: string;
    toolId: string;
    shareType: "created" | "featured" | "updated";
    toolDescription?: string | undefined;
}, {
    toolName: string;
    toolId: string;
    shareType: "created" | "featured" | "updated";
    toolDescription?: string | undefined;
}>;
/**
 * Author information embedded in posts
 */
export declare const PostAuthorSchema: z.ZodObject<{
    id: z.ZodString;
    fullName: z.ZodString;
    handle: z.ZodString;
    photoURL: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<["member", "builder", "admin"]>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    handle: string;
    fullName: string;
    role?: "builder" | "member" | "admin" | undefined;
    photoURL?: string | undefined;
}, {
    id: string;
    handle: string;
    fullName: string;
    role?: "builder" | "member" | "admin" | undefined;
    photoURL?: string | undefined;
}>;
/**
 * Reaction system (heart only for vBETA)
 */
export declare const PostReactionsSchema: z.ZodObject<{
    heart: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    heart: number;
}, {
    heart?: number | undefined;
}>;
export declare const PostReactedUsersSchema: z.ZodObject<{
    heart: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    heart: string[];
}, {
    heart?: string[] | undefined;
}>;
/**
 * Main Post schema
 */
export declare const PostSchema: z.ZodObject<{
    id: z.ZodString;
    spaceId: z.ZodString;
    authorId: z.ZodString;
    author: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        fullName: z.ZodString;
        handle: z.ZodString;
        photoURL: z.ZodOptional<z.ZodString>;
        role: z.ZodOptional<z.ZodEnum<["member", "builder", "admin"]>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        handle: string;
        fullName: string;
        role?: "builder" | "member" | "admin" | undefined;
        photoURL?: string | undefined;
    }, {
        id: string;
        handle: string;
        fullName: string;
        role?: "builder" | "member" | "admin" | undefined;
        photoURL?: string | undefined;
    }>>;
    type: z.ZodDefault<z.ZodEnum<["text", "image", "poll", "event", "toolshare"]>>;
    content: z.ZodString;
    richContent: z.ZodOptional<z.ZodObject<{
        text: z.ZodString;
        formatting: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["bold", "italic", "link"]>;
            start: z.ZodNumber;
            end: z.ZodNumber;
            url: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "bold" | "link" | "italic";
            end: number;
            start: number;
            url?: string | undefined;
        }, {
            type: "bold" | "link" | "italic";
            end: number;
            start: number;
            url?: string | undefined;
        }>, "many">>;
        mentions: z.ZodOptional<z.ZodArray<z.ZodObject<{
            userId: z.ZodString;
            handle: z.ZodString;
            start: z.ZodNumber;
            end: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            handle: string;
            end: number;
            start: number;
            userId: string;
        }, {
            handle: string;
            end: number;
            start: number;
            userId: string;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        formatting?: {
            type: "bold" | "link" | "italic";
            end: number;
            start: number;
            url?: string | undefined;
        }[] | undefined;
        mentions?: {
            handle: string;
            end: number;
            start: number;
            userId: string;
        }[] | undefined;
    }, {
        text: string;
        formatting?: {
            type: "bold" | "link" | "italic";
            end: number;
            start: number;
            url?: string | undefined;
        }[] | undefined;
        mentions?: {
            handle: string;
            end: number;
            start: number;
            userId: string;
        }[] | undefined;
    }>>;
    imageMetadata: z.ZodOptional<z.ZodObject<{
        url: z.ZodString;
        alt: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
        size: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        size: number;
        url: string;
        alt?: string | undefined;
        height?: number | undefined;
        width?: number | undefined;
    }, {
        size: number;
        url: string;
        alt?: string | undefined;
        height?: number | undefined;
        width?: number | undefined;
    }>>;
    pollMetadata: z.ZodOptional<z.ZodObject<{
        question: z.ZodString;
        options: z.ZodArray<z.ZodString, "many">;
        votes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>>;
        allowMultiple: z.ZodDefault<z.ZodBoolean>;
        expiresAt: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        options: string[];
        question: string;
        allowMultiple: boolean;
        expiresAt?: Date | undefined;
        votes?: Record<string, string[]> | undefined;
    }, {
        options: string[];
        question: string;
        allowMultiple?: boolean | undefined;
        expiresAt?: Date | undefined;
        votes?: Record<string, string[]> | undefined;
    }>>;
    eventMetadata: z.ZodOptional<z.ZodObject<{
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        startTime: z.ZodDate;
        endTime: z.ZodOptional<z.ZodDate>;
        location: z.ZodOptional<z.ZodString>;
        attendees: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        startTime: Date;
        location?: string | undefined;
        description?: string | undefined;
        endTime?: Date | undefined;
        attendees?: string[] | undefined;
    }, {
        title: string;
        startTime: Date;
        location?: string | undefined;
        description?: string | undefined;
        endTime?: Date | undefined;
        attendees?: string[] | undefined;
    }>>;
    toolShareMetadata: z.ZodOptional<z.ZodObject<{
        toolId: z.ZodString;
        toolName: z.ZodString;
        toolDescription: z.ZodOptional<z.ZodString>;
        shareType: z.ZodEnum<["created", "updated", "featured"]>;
    }, "strip", z.ZodTypeAny, {
        toolName: string;
        toolId: string;
        shareType: "created" | "featured" | "updated";
        toolDescription?: string | undefined;
    }, {
        toolName: string;
        toolId: string;
        shareType: "created" | "featured" | "updated";
        toolDescription?: string | undefined;
    }>>;
    reactions: z.ZodDefault<z.ZodObject<{
        heart: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        heart: number;
    }, {
        heart?: number | undefined;
    }>>;
    reactedUsers: z.ZodDefault<z.ZodObject<{
        heart: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        heart: string[];
    }, {
        heart?: string[] | undefined;
    }>>;
    isPinned: z.ZodDefault<z.ZodBoolean>;
    pinnedAt: z.ZodOptional<z.ZodDate>;
    pinnedBy: z.ZodOptional<z.ZodString>;
    isEdited: z.ZodDefault<z.ZodBoolean>;
    isDeleted: z.ZodDefault<z.ZodBoolean>;
    deletedAt: z.ZodOptional<z.ZodDate>;
    deletedBy: z.ZodOptional<z.ZodString>;
    isFlagged: z.ZodDefault<z.ZodBoolean>;
    flaggedAt: z.ZodOptional<z.ZodDate>;
    flaggedBy: z.ZodOptional<z.ZodString>;
    flagReason: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    hardDeleteAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id: string;
    content: string;
    type: "text" | "image" | "event" | "poll" | "toolshare";
    spaceId: string;
    reactions: {
        heart: number;
    };
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    reactedUsers: {
        heart: string[];
    };
    isPinned: boolean;
    isEdited: boolean;
    isDeleted: boolean;
    isFlagged: boolean;
    pinnedAt?: Date | undefined;
    author?: {
        id: string;
        handle: string;
        fullName: string;
        role?: "builder" | "member" | "admin" | undefined;
        photoURL?: string | undefined;
    } | undefined;
    richContent?: {
        text: string;
        formatting?: {
            type: "bold" | "link" | "italic";
            end: number;
            start: number;
            url?: string | undefined;
        }[] | undefined;
        mentions?: {
            handle: string;
            end: number;
            start: number;
            userId: string;
        }[] | undefined;
    } | undefined;
    imageMetadata?: {
        size: number;
        url: string;
        alt?: string | undefined;
        height?: number | undefined;
        width?: number | undefined;
    } | undefined;
    pollMetadata?: {
        options: string[];
        question: string;
        allowMultiple: boolean;
        expiresAt?: Date | undefined;
        votes?: Record<string, string[]> | undefined;
    } | undefined;
    eventMetadata?: {
        title: string;
        startTime: Date;
        location?: string | undefined;
        description?: string | undefined;
        endTime?: Date | undefined;
        attendees?: string[] | undefined;
    } | undefined;
    toolShareMetadata?: {
        toolName: string;
        toolId: string;
        shareType: "created" | "featured" | "updated";
        toolDescription?: string | undefined;
    } | undefined;
    pinnedBy?: string | undefined;
    deletedAt?: Date | undefined;
    deletedBy?: string | undefined;
    flaggedAt?: Date | undefined;
    flaggedBy?: string | undefined;
    flagReason?: string | undefined;
    hardDeleteAt?: Date | undefined;
}, {
    id: string;
    content: string;
    spaceId: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    type?: "text" | "image" | "event" | "poll" | "toolshare" | undefined;
    reactions?: {
        heart?: number | undefined;
    } | undefined;
    pinnedAt?: Date | undefined;
    author?: {
        id: string;
        handle: string;
        fullName: string;
        role?: "builder" | "member" | "admin" | undefined;
        photoURL?: string | undefined;
    } | undefined;
    richContent?: {
        text: string;
        formatting?: {
            type: "bold" | "link" | "italic";
            end: number;
            start: number;
            url?: string | undefined;
        }[] | undefined;
        mentions?: {
            handle: string;
            end: number;
            start: number;
            userId: string;
        }[] | undefined;
    } | undefined;
    imageMetadata?: {
        size: number;
        url: string;
        alt?: string | undefined;
        height?: number | undefined;
        width?: number | undefined;
    } | undefined;
    pollMetadata?: {
        options: string[];
        question: string;
        allowMultiple?: boolean | undefined;
        expiresAt?: Date | undefined;
        votes?: Record<string, string[]> | undefined;
    } | undefined;
    eventMetadata?: {
        title: string;
        startTime: Date;
        location?: string | undefined;
        description?: string | undefined;
        endTime?: Date | undefined;
        attendees?: string[] | undefined;
    } | undefined;
    toolShareMetadata?: {
        toolName: string;
        toolId: string;
        shareType: "created" | "featured" | "updated";
        toolDescription?: string | undefined;
    } | undefined;
    reactedUsers?: {
        heart?: string[] | undefined;
    } | undefined;
    isPinned?: boolean | undefined;
    pinnedBy?: string | undefined;
    isEdited?: boolean | undefined;
    isDeleted?: boolean | undefined;
    deletedAt?: Date | undefined;
    deletedBy?: string | undefined;
    isFlagged?: boolean | undefined;
    flaggedAt?: Date | undefined;
    flaggedBy?: string | undefined;
    flagReason?: string | undefined;
    hardDeleteAt?: Date | undefined;
}>;
export type Post = z.infer<typeof PostSchema>;
/**
 * Schema for creating new posts
 */
export declare const CreatePostSchema: z.ZodEffects<z.ZodObject<{
    type: z.ZodDefault<z.ZodEnum<["text", "image", "poll", "event", "toolshare"]>>;
    content: z.ZodString;
    richContent: z.ZodOptional<z.ZodObject<{
        text: z.ZodString;
        formatting: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["bold", "italic", "link"]>;
            start: z.ZodNumber;
            end: z.ZodNumber;
            url: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "bold" | "link" | "italic";
            end: number;
            start: number;
            url?: string | undefined;
        }, {
            type: "bold" | "link" | "italic";
            end: number;
            start: number;
            url?: string | undefined;
        }>, "many">>;
        mentions: z.ZodOptional<z.ZodArray<z.ZodObject<{
            userId: z.ZodString;
            handle: z.ZodString;
            start: z.ZodNumber;
            end: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            handle: string;
            end: number;
            start: number;
            userId: string;
        }, {
            handle: string;
            end: number;
            start: number;
            userId: string;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        formatting?: {
            type: "bold" | "link" | "italic";
            end: number;
            start: number;
            url?: string | undefined;
        }[] | undefined;
        mentions?: {
            handle: string;
            end: number;
            start: number;
            userId: string;
        }[] | undefined;
    }, {
        text: string;
        formatting?: {
            type: "bold" | "link" | "italic";
            end: number;
            start: number;
            url?: string | undefined;
        }[] | undefined;
        mentions?: {
            handle: string;
            end: number;
            start: number;
            userId: string;
        }[] | undefined;
    }>>;
    imageMetadata: z.ZodOptional<z.ZodObject<{
        url: z.ZodString;
        alt: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
        size: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        size: number;
        url: string;
        alt?: string | undefined;
        height?: number | undefined;
        width?: number | undefined;
    }, {
        size: number;
        url: string;
        alt?: string | undefined;
        height?: number | undefined;
        width?: number | undefined;
    }>>;
    pollMetadata: z.ZodOptional<z.ZodObject<{
        question: z.ZodString;
        options: z.ZodArray<z.ZodString, "many">;
        votes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>>;
        allowMultiple: z.ZodDefault<z.ZodBoolean>;
        expiresAt: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        options: string[];
        question: string;
        allowMultiple: boolean;
        expiresAt?: Date | undefined;
        votes?: Record<string, string[]> | undefined;
    }, {
        options: string[];
        question: string;
        allowMultiple?: boolean | undefined;
        expiresAt?: Date | undefined;
        votes?: Record<string, string[]> | undefined;
    }>>;
    eventMetadata: z.ZodOptional<z.ZodObject<{
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        startTime: z.ZodDate;
        endTime: z.ZodOptional<z.ZodDate>;
        location: z.ZodOptional<z.ZodString>;
        attendees: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        startTime: Date;
        location?: string | undefined;
        description?: string | undefined;
        endTime?: Date | undefined;
        attendees?: string[] | undefined;
    }, {
        title: string;
        startTime: Date;
        location?: string | undefined;
        description?: string | undefined;
        endTime?: Date | undefined;
        attendees?: string[] | undefined;
    }>>;
    toolShareMetadata: z.ZodOptional<z.ZodObject<{
        toolId: z.ZodString;
        toolName: z.ZodString;
        toolDescription: z.ZodOptional<z.ZodString>;
        shareType: z.ZodEnum<["created", "updated", "featured"]>;
    }, "strip", z.ZodTypeAny, {
        toolName: string;
        toolId: string;
        shareType: "created" | "featured" | "updated";
        toolDescription?: string | undefined;
    }, {
        toolName: string;
        toolId: string;
        shareType: "created" | "featured" | "updated";
        toolDescription?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    content: string;
    type: "text" | "image" | "event" | "poll" | "toolshare";
    richContent?: {
        text: string;
        formatting?: {
            type: "bold" | "link" | "italic";
            end: number;
            start: number;
            url?: string | undefined;
        }[] | undefined;
        mentions?: {
            handle: string;
            end: number;
            start: number;
            userId: string;
        }[] | undefined;
    } | undefined;
    imageMetadata?: {
        size: number;
        url: string;
        alt?: string | undefined;
        height?: number | undefined;
        width?: number | undefined;
    } | undefined;
    pollMetadata?: {
        options: string[];
        question: string;
        allowMultiple: boolean;
        expiresAt?: Date | undefined;
        votes?: Record<string, string[]> | undefined;
    } | undefined;
    eventMetadata?: {
        title: string;
        startTime: Date;
        location?: string | undefined;
        description?: string | undefined;
        endTime?: Date | undefined;
        attendees?: string[] | undefined;
    } | undefined;
    toolShareMetadata?: {
        toolName: string;
        toolId: string;
        shareType: "created" | "featured" | "updated";
        toolDescription?: string | undefined;
    } | undefined;
}, {
    content: string;
    type?: "text" | "image" | "event" | "poll" | "toolshare" | undefined;
    richContent?: {
        text: string;
        formatting?: {
            type: "bold" | "link" | "italic";
            end: number;
            start: number;
            url?: string | undefined;
        }[] | undefined;
        mentions?: {
            handle: string;
            end: number;
            start: number;
            userId: string;
        }[] | undefined;
    } | undefined;
    imageMetadata?: {
        size: number;
        url: string;
        alt?: string | undefined;
        height?: number | undefined;
        width?: number | undefined;
    } | undefined;
    pollMetadata?: {
        options: string[];
        question: string;
        allowMultiple?: boolean | undefined;
        expiresAt?: Date | undefined;
        votes?: Record<string, string[]> | undefined;
    } | undefined;
    eventMetadata?: {
        title: string;
        startTime: Date;
        location?: string | undefined;
        description?: string | undefined;
        endTime?: Date | undefined;
        attendees?: string[] | undefined;
    } | undefined;
    toolShareMetadata?: {
        toolName: string;
        toolId: string;
        shareType: "created" | "featured" | "updated";
        toolDescription?: string | undefined;
    } | undefined;
}>, {
    content: string;
    type: "text" | "image" | "event" | "poll" | "toolshare";
    richContent?: {
        text: string;
        formatting?: {
            type: "bold" | "link" | "italic";
            end: number;
            start: number;
            url?: string | undefined;
        }[] | undefined;
        mentions?: {
            handle: string;
            end: number;
            start: number;
            userId: string;
        }[] | undefined;
    } | undefined;
    imageMetadata?: {
        size: number;
        url: string;
        alt?: string | undefined;
        height?: number | undefined;
        width?: number | undefined;
    } | undefined;
    pollMetadata?: {
        options: string[];
        question: string;
        allowMultiple: boolean;
        expiresAt?: Date | undefined;
        votes?: Record<string, string[]> | undefined;
    } | undefined;
    eventMetadata?: {
        title: string;
        startTime: Date;
        location?: string | undefined;
        description?: string | undefined;
        endTime?: Date | undefined;
        attendees?: string[] | undefined;
    } | undefined;
    toolShareMetadata?: {
        toolName: string;
        toolId: string;
        shareType: "created" | "featured" | "updated";
        toolDescription?: string | undefined;
    } | undefined;
}, {
    content: string;
    type?: "text" | "image" | "event" | "poll" | "toolshare" | undefined;
    richContent?: {
        text: string;
        formatting?: {
            type: "bold" | "link" | "italic";
            end: number;
            start: number;
            url?: string | undefined;
        }[] | undefined;
        mentions?: {
            handle: string;
            end: number;
            start: number;
            userId: string;
        }[] | undefined;
    } | undefined;
    imageMetadata?: {
        size: number;
        url: string;
        alt?: string | undefined;
        height?: number | undefined;
        width?: number | undefined;
    } | undefined;
    pollMetadata?: {
        options: string[];
        question: string;
        allowMultiple?: boolean | undefined;
        expiresAt?: Date | undefined;
        votes?: Record<string, string[]> | undefined;
    } | undefined;
    eventMetadata?: {
        title: string;
        startTime: Date;
        location?: string | undefined;
        description?: string | undefined;
        endTime?: Date | undefined;
        attendees?: string[] | undefined;
    } | undefined;
    toolShareMetadata?: {
        toolName: string;
        toolId: string;
        shareType: "created" | "featured" | "updated";
        toolDescription?: string | undefined;
    } | undefined;
}>;
export type CreatePost = z.infer<typeof CreatePostSchema>;
/**
 * Schema for editing posts (limited fields)
 */
export declare const EditPostSchema: z.ZodObject<{
    content: z.ZodString;
    richContent: z.ZodOptional<z.ZodObject<{
        text: z.ZodString;
        formatting: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["bold", "italic", "link"]>;
            start: z.ZodNumber;
            end: z.ZodNumber;
            url: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "bold" | "link" | "italic";
            end: number;
            start: number;
            url?: string | undefined;
        }, {
            type: "bold" | "link" | "italic";
            end: number;
            start: number;
            url?: string | undefined;
        }>, "many">>;
        mentions: z.ZodOptional<z.ZodArray<z.ZodObject<{
            userId: z.ZodString;
            handle: z.ZodString;
            start: z.ZodNumber;
            end: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            handle: string;
            end: number;
            start: number;
            userId: string;
        }, {
            handle: string;
            end: number;
            start: number;
            userId: string;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        formatting?: {
            type: "bold" | "link" | "italic";
            end: number;
            start: number;
            url?: string | undefined;
        }[] | undefined;
        mentions?: {
            handle: string;
            end: number;
            start: number;
            userId: string;
        }[] | undefined;
    }, {
        text: string;
        formatting?: {
            type: "bold" | "link" | "italic";
            end: number;
            start: number;
            url?: string | undefined;
        }[] | undefined;
        mentions?: {
            handle: string;
            end: number;
            start: number;
            userId: string;
        }[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    content: string;
    richContent?: {
        text: string;
        formatting?: {
            type: "bold" | "link" | "italic";
            end: number;
            start: number;
            url?: string | undefined;
        }[] | undefined;
        mentions?: {
            handle: string;
            end: number;
            start: number;
            userId: string;
        }[] | undefined;
    } | undefined;
}, {
    content: string;
    richContent?: {
        text: string;
        formatting?: {
            type: "bold" | "link" | "italic";
            end: number;
            start: number;
            url?: string | undefined;
        }[] | undefined;
        mentions?: {
            handle: string;
            end: number;
            start: number;
            userId: string;
        }[] | undefined;
    } | undefined;
}>;
export type EditPost = z.infer<typeof EditPostSchema>;
/**
 * Feed query parameters
 */
export declare const FeedQuerySchema: z.ZodObject<{
    limit: z.ZodDefault<z.ZodNumber>;
    lastPostId: z.ZodOptional<z.ZodString>;
    includeDeleted: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    includeDeleted: boolean;
    lastPostId?: string | undefined;
}, {
    limit?: number | undefined;
    lastPostId?: string | undefined;
    includeDeleted?: boolean | undefined;
}>;
export type FeedQuery = z.infer<typeof FeedQuerySchema>;
/**
 * Post reaction schema
 */
export declare const PostReactionSchema: z.ZodObject<{
    reaction: z.ZodEnum<["heart"]>;
    action: z.ZodEnum<["add", "remove"]>;
}, "strip", z.ZodTypeAny, {
    action: "add" | "remove";
    reaction: "heart";
}, {
    action: "add" | "remove";
    reaction: "heart";
}>;
export type PostReaction = z.infer<typeof PostReactionSchema>;
/**
 * Post moderation actions
 */
export declare const PostModerationSchema: z.ZodObject<{
    action: z.ZodEnum<["pin", "unpin", "flag", "unflag", "delete"]>;
    reason: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    action: "delete" | "pin" | "unpin" | "flag" | "unflag";
    reason?: string | undefined;
}, {
    action: "delete" | "pin" | "unpin" | "flag" | "unflag";
    reason?: string | undefined;
}>;
export type PostModeration = z.infer<typeof PostModerationSchema>;
/**
 * Utility functions for post creation
 */
export declare const createPostDefaults: (authorId: string, spaceId: string, data: CreatePost) => Omit<Post, "id" | "createdAt" | "updatedAt">;
/**
 * Helper to check if user can moderate post
 */
export declare const canModeratePost: (userRole: "member" | "builder" | "admin", isAuthor: boolean) => boolean;
/**
 * Helper to check if post is within edit window
 */
export declare const isWithinEditWindow: (createdAt: Date, windowMinutes?: number) => boolean;
//# sourceMappingURL=post.d.ts.map