import type { CreatePostRequest, PostType, Post } from "@hive/core";
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
    }, unknown>;
    isCreating: boolean;
    error: string | undefined;
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
        type: "text" | "event" | "image" | "poll" | "toolshare";
        id: string;
        createdAt: Date;
        updatedAt: Date;
        spaceId: string;
        authorId: string;
        content: string;
        reactions: {
            heart: number;
        };
        reactedUsers: {
            heart: string[];
        };
        isPinned: boolean;
        isEdited: boolean;
        isDeleted: boolean;
        isFlagged: boolean;
        author?: {
            id: string;
            handle: string;
            fullName: string;
            photoURL?: string | undefined;
            role?: "admin" | "member" | "builder" | undefined;
        } | undefined;
        richContent?: {
            text: string;
            formatting?: {
                type: "bold" | "link" | "italic";
                start: number;
                end: number;
                url?: string | undefined;
            }[] | undefined;
            mentions?: {
                start: number;
                end: number;
                userId: string;
                handle: string;
            }[] | undefined;
        } | undefined;
        imageMetadata?: {
            size: number;
            url: string;
            width?: number | undefined;
            height?: number | undefined;
            alt?: string | undefined;
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
            description?: string | undefined;
            endTime?: Date | undefined;
            location?: string | undefined;
            attendees?: string[] | undefined;
        } | undefined;
        toolShareMetadata?: {
            toolId: string;
            toolName: string;
            shareType: "created" | "updated" | "featured";
            toolDescription?: string | undefined;
        } | undefined;
        pinnedAt?: Date | undefined;
        pinnedBy?: string | undefined;
        deletedAt?: Date | undefined;
        deletedBy?: string | undefined;
        flaggedAt?: Date | undefined;
        flaggedBy?: string | undefined;
        flagReason?: string | undefined;
        hardDeleteAt?: Date | undefined;
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
    posts: any[];
    error: Error | null;
    fetchNextPage: (options?: import("@tanstack/react-query").FetchNextPageOptions) => Promise<import("@tanstack/react-query").InfiniteQueryObserverResult<import("@tanstack/react-query").InfiniteData<unknown, unknown>, Error>>;
    hasNextPage: boolean;
    isLoading: boolean;
    isFetching: boolean;
    isFetchingNextPage: boolean;
    refetch: (options?: import("@tanstack/react-query").RefetchOptions) => Promise<import("@tanstack/react-query").QueryObserverResult<import("@tanstack/react-query").InfiniteData<unknown, unknown>, Error>>;
};
/**
 * Hook for managing post drafts
 */
type Draft = {
    draftId: string;
    data: CreatePostRequest;
    savedAt: Date;
};
export declare const usePostDrafts: (authorId: string) => {
    drafts: Draft[];
    saveDraft: (draftData: CreatePostRequest) => string;
    loadDrafts: () => Promise<never[] | undefined>;
    deleteDraft: (draftId: string) => true;
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
export {};
//# sourceMappingURL=use-posts.d.ts.map