import { useState, useCallback, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DraftManager, } from "@hive/core";
/**
 * API client for posts
 */
const postsApi = {
    /**
     * Create a new post
     */
    async createPost(postData) {
        const response = await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to create post");
        }
        return response.json();
    },
    /**
     * Fetch posts for feed
     */
    async fetchPosts(params) {
        const searchParams = new URLSearchParams();
        if (params?.spaceId)
            searchParams.set("spaceId", params.spaceId);
        if (params?.limit)
            searchParams.set("limit", params.limit.toString());
        if (params?.offset)
            searchParams.set("offset", params.offset.toString());
        if (params?.type)
            searchParams.set("type", params.type);
        const response = await fetch(`/api/posts?${searchParams}`);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to fetch posts");
        }
        return response.json();
    },
    /**
     * Update a post
     */
    async updatePost(postId, updates) {
        const response = await fetch(`/api/posts/${postId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updates),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to update post");
        }
        return response.json();
    },
    /**
     * Delete a post
     */
    async deletePost(postId) {
        const response = await fetch(`/api/posts/${postId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to delete post");
        }
        return response.json();
    },
};
/**
 * Hook for creating posts with optimistic updates
 */
export const useCreatePost = () => {
    const queryClient = useQueryClient();
    const [optimisticPost, setOptimisticPost] = useState(null);
    const mutation = useMutation({
        mutationFn: postsApi.createPost,
        onMutate: async (postData) => {
            // Create optimistic post for immediate UI feedback
            const tempPost = {
                id: `temp_${Date.now()}`,
                type: postData.type,
                authorId: "current-user", // Would be from auth context
                authorHandle: "current-handle",
                authorDisplayName: "Current User",
                content: postData.content,
                spaceId: postData.spaceId,
                spaceName: undefined,
                visibility: postData.visibility,
                status: "published",
                scheduledAt: postData.scheduledAt,
                publishedAt: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
                reactions: {},
                reactionCount: 0,
                commentCount: 0,
                shareCount: 0,
                viewCount: 0,
                toolData: postData.toolData,
            };
            setOptimisticPost(tempPost);
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: ["posts"] });
            // Snapshot previous value
            const previousPosts = queryClient.getQueryData(["posts"]);
            // Optimistically update
            queryClient.setQueryData(["posts"], (old) => {
                if (!old)
                    return { posts: [tempPost] };
                return {
                    ...old,
                    posts: [tempPost, ...old.posts],
                };
            });
            return { previousPosts };
        },
        onError: (err, postData, context) => {
            // Rollback optimistic update
            setOptimisticPost(null);
            if (context?.previousPosts) {
                queryClient.setQueryData(["posts"], context.previousPosts);
            }
        },
        onSuccess: (data) => {
            // Remove optimistic post and update with real data
            setOptimisticPost(null);
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });
    return {
        createPost: mutation.mutate,
        isCreating: mutation.isPending,
        error: mutation.error?.message,
        optimisticPost,
        reset: mutation.reset,
    };
};
/**
 * Hook for fetching posts (feed)
 */
export const usePosts = (params) => {
    const query = useQuery({
        queryKey: ["posts", params],
        queryFn: () => postsApi.fetchPosts(params),
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30, // 30 minutes
    });
    const posts = useMemo(() => {
        return query.data?.posts || [];
    }, [query.data?.posts]);
    const pagination = useMemo(() => {
        return query.data?.pagination || { limit: 20, offset: 0, hasMore: false };
    }, [query.data?.pagination]);
    return {
        posts,
        pagination,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error?.message,
        refetch: query.refetch,
        hasMore: pagination.hasMore,
    };
};
/**
 * Hook for infinite scroll posts
 */
export const useInfinitePosts = (params) => {
    const [allPosts, setAllPosts] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const limit = params?.limit || 20;
    const { posts, isLoading, error, refetch } = usePosts({
        ...params,
        limit,
        // offset handled manually for infinite scroll
    });
    const loadMore = useCallback(async () => {
        if (isLoadingMore || !hasMore)
            return;
        setIsLoadingMore(true);
        try {
            const response = await postsApi.fetchPosts({
                ...params,
                limit,
                offset: offset + limit,
            });
            if (response.success) {
                setAllPosts((prev) => [...prev, ...response.posts]);
                setOffset((prev) => prev + limit);
                setHasMore(response.pagination.hasMore);
            }
        }
        catch (err) {
            console.error("Failed to load more posts:", err);
        }
        finally {
            setIsLoadingMore(false);
        }
    }, [params, limit, offset, hasMore, isLoadingMore]);
    // Reset when params change
    const reset = useCallback(() => {
        setAllPosts([]);
        setOffset(0);
        setHasMore(true);
        refetch();
    }, [refetch]);
    // Update allPosts when initial posts load
    useMemo(() => {
        if (posts.length > 0 && offset === 0) {
            setAllPosts(posts);
        }
    }, [posts, offset]);
    return {
        posts: allPosts,
        isLoading,
        isLoadingMore,
        error,
        hasMore,
        loadMore,
        reset,
    };
};
/**
 * Hook for managing post drafts
 */
export const usePostDrafts = (authorId) => {
    const [drafts, setDrafts] = useState([]);
    const saveDraft = useCallback((draftData) => {
        const result = DraftManager.saveDraft(authorId, draftData);
        const newDraft = {
            draftId: result.draftId,
            data: draftData,
            savedAt: result.savedAt,
        };
        setDrafts((prev) => [
            newDraft,
            ...prev.filter((d) => d.draftId !== result.draftId),
        ]);
        return result.draftId;
    }, [authorId]);
    const loadDrafts = useCallback(async () => {
        try {
            const userDrafts = await DraftManager.loadDrafts(authorId);
            setDrafts(userDrafts);
        }
        catch (error) {
            console.error("Failed to load drafts:", error);
        }
    }, [authorId]);
    const deleteDraft = useCallback((draftId) => {
        const success = DraftManager.deleteDraft(draftId, authorId);
        if (success) {
            setDrafts((prev) => prev.filter((d) => d.draftId !== draftId));
        }
        return success;
    }, [authorId]);
    return {
        drafts,
        saveDraft,
        loadDrafts,
        deleteDraft,
    };
};
/**
 * Hook for post editor state management
 */
export const usePostEditor = (type, options) => {
    const [content, setContent] = useState(options?.initialContent?.content?.text || "");
    const [visibility, setVisibility] = useState(options?.initialContent?.visibility ||
        (options?.spaceId ? "space-only" : "public"));
    const [scheduledAt, setScheduledAt] = useState(options?.initialContent?.scheduledAt);
    const [isDirty, setIsDirty] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    const { createPost, isCreating, error: createError } = useCreatePost();
    const { saveDraft } = usePostDrafts("current-user"); // Would use actual user ID
    // Auto-save functionality
    const autoSave = useCallback(() => {
        if (options?.autoSave && isDirty && content.trim()) {
            const draftData = {
                type,
                content: { text: content },
                spaceId: options.spaceId,
                visibility: visibility,
                scheduledAt,
            };
            saveDraft(draftData);
            setLastSaved(new Date());
            setIsDirty(false);
        }
    }, [
        options?.autoSave,
        options?.spaceId,
        isDirty,
        content,
        type,
        visibility,
        scheduledAt,
        saveDraft,
    ]);
    // Track changes
    const updateContent = useCallback((newContent) => {
        setContent(newContent);
        setIsDirty(true);
    }, []);
    const updateVisibility = useCallback((newVisibility) => {
        setVisibility(newVisibility);
        setIsDirty(true);
    }, []);
    const updateScheduledAt = useCallback((newScheduledAt) => {
        setScheduledAt(newScheduledAt);
        setIsDirty(true);
    }, []);
    // Submit post
    const submitPost = useCallback(async () => {
        if (!content.trim())
            return;
        const postData = {
            type,
            content: { text: content },
            spaceId: options?.spaceId,
            visibility: visibility,
            scheduledAt,
        };
        createPost(postData);
    }, [content, type, options?.spaceId, visibility, scheduledAt, createPost]);
    // Reset editor
    const reset = useCallback(() => {
        setContent("");
        setVisibility(options?.spaceId ? "space-only" : "public");
        setScheduledAt(undefined);
        setIsDirty(false);
        setLastSaved(null);
    }, [options?.spaceId]);
    return {
        // Content state
        content,
        visibility,
        scheduledAt,
        isDirty,
        lastSaved,
        // Actions
        updateContent,
        updateVisibility,
        updateScheduledAt,
        submitPost,
        autoSave,
        reset,
        // Status
        isSubmitting: isCreating,
        error: createError,
        canSubmit: content.trim().length > 0 && !isCreating,
    };
};
/**
 * Hook for post interactions (reactions, comments, shares)
 */
export const usePostInteractions = (postId) => {
    const queryClient = useQueryClient();
    const reactToPost = useMutation({
        mutationFn: async ({ reaction }) => {
            const response = await fetch(`/api/posts/${postId}/react`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reaction }),
            });
            if (!response.ok)
                throw new Error("Failed to react to post");
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });
    const sharePost = useMutation({
        mutationFn: async () => {
            const response = await fetch(`/api/posts/${postId}/share`, {
                method: "POST",
            });
            if (!response.ok)
                throw new Error("Failed to share post");
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });
    return {
        reactToPost: reactToPost.mutate,
        sharePost: sharePost.mutate,
        isReacting: reactToPost.isPending,
        isSharing: sharePost.isPending,
    };
};
//# sourceMappingURL=use-posts.js.map