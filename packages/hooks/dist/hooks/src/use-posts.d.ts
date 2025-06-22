import { CreatePostRequest, FeedPost as Post, FeedPostType as PostType } from "@hive/core";
/**
 * Hook for creating posts with optimistic updates
 */
export declare const useCreatePost: () => {
    createPost: import("@tanstack/react-query").UseMutateFunction<{
        success: boolean;
        post: Post;
    }, Error, {
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
        previousPosts: unknown;
    }>;
    isCreating: boolean;
    error: string | undefined;
    optimisticPost: {
        type: "poll" | "pulse" | "prompt-post" | "event-card" | "join-form" | "media-post";
        status: "draft" | "published" | "flagged" | "archived";
        id: string;
        createdAt: Date;
        updatedAt: Date;
        viewCount: number;
        authorId: string;
        content: {
            text?: string | undefined;
            mentions?: {
                displayName: string;
                position: [number, number];
                userId: string;
                handle: string;
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
    } | null;
    reset: () => void;
};
/**
 * Hook for fetching posts (feed)
 */
export declare const usePosts: (params?: {
    spaceId?: string;
    limit?: number;
    type?: "public" | "space" | "personal";
}) => {
    posts: {
        type: "poll" | "pulse" | "prompt-post" | "event-card" | "join-form" | "media-post";
        status: "draft" | "published" | "flagged" | "archived";
        id: string;
        createdAt: Date;
        updatedAt: Date;
        viewCount: number;
        authorId: string;
        content: {
            text?: string | undefined;
            mentions?: {
                displayName: string;
                position: [number, number];
                userId: string;
                handle: string;
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
    }[];
    pagination: {
        limit: number;
        offset: number;
        hasMore: boolean;
    };
    isLoading: boolean;
    isError: boolean;
    error: string | undefined;
    refetch: (options?: import("@tanstack/react-query").RefetchOptions) => Promise<import("@tanstack/react-query").QueryObserverResult<{
        success: boolean;
        posts: Post[];
        pagination: {
            limit: number;
            offset: number;
            hasMore: boolean;
        };
    }, Error>>;
    hasMore: boolean;
};
/**
 * Hook for infinite scroll posts
 */
export declare const useInfinitePosts: (params?: {
    spaceId?: string;
    limit?: number;
    type?: "public" | "space" | "personal";
}) => {
    posts: {
        type: "poll" | "pulse" | "prompt-post" | "event-card" | "join-form" | "media-post";
        status: "draft" | "published" | "flagged" | "archived";
        id: string;
        createdAt: Date;
        updatedAt: Date;
        viewCount: number;
        authorId: string;
        content: {
            text?: string | undefined;
            mentions?: {
                displayName: string;
                position: [number, number];
                userId: string;
                handle: string;
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
    }[];
    isLoading: boolean;
    isLoadingMore: boolean;
    error: string | undefined;
    hasMore: boolean;
    loadMore: () => Promise<void>;
    reset: () => void;
};
/**
 * Hook for managing post drafts
 */
export declare const usePostDrafts: (authorId: string) => {
    drafts: {
        draftId: string;
        data: CreatePostRequest;
        savedAt: Date;
    }[];
    saveDraft: (draftData: CreatePostRequest) => string;
    loadDrafts: () => Promise<void>;
    deleteDraft: (draftId: string) => boolean;
};
/**
 * Hook for post editor state management
 */
export declare const usePostEditor: (type: PostType, options?: {
    spaceId?: string;
    initialContent?: Partial<CreatePostRequest>;
    autoSave?: boolean;
    autoSaveInterval?: number;
}) => {
    content: string;
    visibility: "public" | "space-only" | "followers-only";
    scheduledAt: Date | undefined;
    isDirty: boolean;
    lastSaved: Date | null;
    updateContent: (newContent: string) => void;
    updateVisibility: (newVisibility: "public" | "space-only" | "followers-only") => void;
    updateScheduledAt: (newScheduledAt?: Date) => void;
    submitPost: () => Promise<void>;
    autoSave: () => void;
    reset: () => void;
    isSubmitting: boolean;
    error: string | undefined;
    canSubmit: boolean;
};
/**
 * Hook for post interactions (reactions, comments, shares)
 */
export declare const usePostInteractions: (postId: string) => {
    reactToPost: import("@tanstack/react-query").UseMutateFunction<any, Error, {
        reaction: string;
    }, unknown>;
    sharePost: import("@tanstack/react-query").UseMutateFunction<any, Error, void, unknown>;
    isReacting: boolean;
    isSharing: boolean;
};
//# sourceMappingURL=use-posts.d.ts.map