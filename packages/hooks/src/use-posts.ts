import { useState, useCallback, useMemo } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  CreatePostRequest,
  PostType,
  PostCreationEngine,
  Post,
  PostContent,
  logger,
} from "@hive/core";
// Temporarily disabled for Storybook: import { DraftManager } from "@hive/core";

/**
 * API client for posts
 */
const postsApi = {
  /**
   * Create a new post
   */
  async createPost(
    postData: CreatePostRequest
  ): Promise<{ success: boolean; post: Post }> {
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
  async fetchPosts(params?: {
    spaceId?: string;
    limit?: number;
    offset?: number;
    type?: "public" | "space" | "personal";
  }): Promise<{
    success: boolean;
    posts: Post[];
    pagination: { limit: number; offset: number; hasMore: boolean };
  }> {
    const searchParams = new URLSearchParams();
    if (params?.spaceId) searchParams.set("spaceId", params.spaceId);
    if (params?.limit) searchParams.set("limit", params.limit.toString());
    if (params?.offset) searchParams.set("offset", params.offset.toString());
    if (params?.type) searchParams.set("type", params.type);

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
  async updatePost(
    postId: string,
    updates: Partial<CreatePostRequest>
  ): Promise<{ success: boolean; post: Post }> {
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
  async deletePost(postId: string): Promise<{ success: boolean }> {
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

  const mutation = useMutation({
    mutationFn: postsApi.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return {
    createPost: mutation.mutate,
    isCreating: mutation.isPending,
    error: mutation.error?.message,
    reset: mutation.reset,
  };
};

/**
 * Hook for fetching posts (feed)
 */
export const usePosts = (params?: {
  spaceId?: string;
  limit?: number;
  type?: "public" | "space" | "personal";
}) => {
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
export const useInfinitePosts = (params?: {
  spaceId?: string;
  limit?: number;
  type?: "public" | "space" | "personal";
}) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["posts", params],
    queryFn: ({ pageParam = 0 }) =>
      postsApi.fetchPosts({
        ...params,
        offset: pageParam as number,
        limit: params?.limit || 20,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.pagination.hasMore) {
        return lastPage.pagination.offset + lastPage.pagination.limit;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page.posts) ?? [],
    [data]
  );

  return {
    posts,
    error: error as Error | null,
    fetchNextPage,
    hasNextPage,
    isLoading: status === "pending",
    isFetching,
    isFetchingNextPage,
    refetch,
  };
};

/**
 * Hook for managing post drafts
 */
export const usePostDrafts = (authorId: string) => {
  const [drafts, setDrafts] = useState<
    Array<{
      draftId: string;
      data: CreatePostRequest;
      savedAt: Date;
    }>
  >([]);

  const saveDraft = useCallback(
    (draftData: CreatePostRequest) => {
      const result = { draftId: `draft_${Date.now()}`, savedAt: new Date() }; // DraftManager.saveDraft(authorId, draftData);
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
    },
    [authorId]
  );

  const loadDrafts = useCallback(async () => {
    try {
      const userDrafts: any[] = []; // await DraftManager.loadDrafts(authorId);
      setDrafts(userDrafts);
    } catch (error) {
      logger.error("Failed to load drafts:", error);
      return [];
    }
  }, [authorId]);

  const deleteDraft = useCallback(
    (draftId: string) => {
      const success = true; // DraftManager.deleteDraft(draftId, authorId);
      if (success) {
        setDrafts((prev) => prev.filter((d) => d.draftId !== draftId));
      }
      return success;
    },
    [authorId]
  );

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
export const usePostEditor = (
  type: PostType,
  options?: {
    spaceId?: string;
    initialContent?: Partial<CreatePostRequest>;
    autoSave?: boolean;
    autoSaveInterval?: number;
  }
) => {
  const [content, setContent] = useState(
    options?.initialContent?.content?.text || ""
  );
  const [visibility, setVisibility] = useState(
    options?.initialContent?.visibility ||
      (options?.spaceId ? "space-only" : "public")
  );
  const [scheduledAt, setScheduledAt] = useState<Date | undefined>(
    options?.initialContent?.scheduledAt
  );
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const { createPost, isCreating, error: createError } = useCreatePost();
  const { saveDraft } = usePostDrafts("current-user"); // Would use actual user ID

  // Auto-save functionality
  const autoSave = useCallback(() => {
    if (options?.autoSave && isDirty && content.trim()) {
      const draftData: CreatePostRequest = {
        type,
        content: { text: content },
        spaceId: options.spaceId,
        visibility: visibility as "public" | "space-only" | "followers-only",
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
  const updateContent = useCallback((newContent: string) => {
    setContent(newContent);
    setIsDirty(true);
  }, []);

  const updateVisibility = useCallback(
    (newVisibility: "public" | "space-only" | "followers-only") => {
      setVisibility(newVisibility);
      setIsDirty(true);
    },
    []
  );

  const updateScheduledAt = useCallback((newScheduledAt?: Date) => {
    setScheduledAt(newScheduledAt);
    setIsDirty(true);
  }, []);

  // Submit post
  const submitPost = useCallback(async () => {
    if (!content.trim()) return;

    const postData: CreatePostRequest = {
      type,
      content: { text: content },
      spaceId: options?.spaceId,
      visibility: visibility as "public" | "space-only" | "followers-only",
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
export const usePostInteractions = (postId: string) => {
  const queryClient = useQueryClient();

  const reactToPost = useMutation({
    mutationFn: async ({ reaction }: { reaction: string }) => {
      const response = await fetch(`/api/posts/${postId}/react`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reaction }),
      });
      if (!response.ok) throw new Error("Failed to react to post");
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
      if (!response.ok) throw new Error("Failed to share post");
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
