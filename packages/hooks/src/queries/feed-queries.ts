import { useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

// Types
interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

interface Post {
  id: string;
  content: string;
  type: 'text' | 'tool' | 'event' | 'collaboration' | 'achievement' | 'question';
  author: {
    id: string;
    name: string;
    handle: string;
    avatarUrl?: string;
    isVerified?: boolean;
    badges?: string[];
  };
  createdAt: string;
  visibility: 'public' | 'spaces' | 'connections';
  spaceId?: string;
  spaceName?: string;
  attachments?: string[];
  mentions?: string[];
  tags?: string[];
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
    hasLiked: boolean;
    hasBookmarked: boolean;
  };
  comments: Comment[];
}

interface FeedFilters {
  postTypes: string[];
  sortBy: 'recent' | 'popular' | 'trending';
  timeRange: 'today' | 'week' | 'month' | 'all';
  spaces: string[];
}

interface FeedParams {
  feedType: 'home' | 'space' | 'profile';
  spaceId?: string;
  userId?: string;
  searchQuery?: string;
  filters: FeedFilters;
}

// API functions
const fetchFeedPosts = async ({ pageParam = 0, ...params }: FeedParams & { pageParam?: number }) => {
  const queryParams = new URLSearchParams({
    page: pageParam.toString(),
    limit: '20',
    feedType: params.feedType,
    ...(params.spaceId && { spaceId: params.spaceId }),
    ...(params.userId && { userId: params.userId }),
    ...(params.searchQuery && { search: params.searchQuery }),
    sortBy: params.filters.sortBy,
    timeRange: params.filters.timeRange,
    ...(params.filters.postTypes.length > 0 && { types: params.filters.postTypes.join(',') }),
    ...(params.filters.spaces.length > 0 && { spaces: params.filters.spaces.join(',') }),
  });

  const response = await fetch(`/api/feed?${queryParams}`);
  if (!response.ok) throw new Error('Failed to fetch feed');
  return response.json();
};

const likePostApi = async (postId: string): Promise<{ liked: boolean; likeCount: number }> => {
  const response = await fetch(`/api/posts/${postId}/like`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Failed to like post');
  return response.json();
};

const bookmarkPostApi = async (postId: string): Promise<{ isBookmarked: boolean }> => {
  const response = await fetch(`/api/posts/${postId}/bookmark`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Failed to bookmark post');
  return response.json();
};

const sharePostApi = async (postId: string): Promise<{ shared: boolean; shareCount: number }> => {
  const response = await fetch(`/api/posts/${postId}/share`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Failed to share post');
  return response.json();
};

const deletePostApi = async (postId: string): Promise<void> => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete post');
};

// Query Hooks
export function useFeedPosts(params: FeedParams) {
  return useInfiniteQuery({
    queryKey: ['feed', params],
    queryFn: ({ pageParam }) => fetchFeedPosts({ ...params, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: { hasMore: boolean }, pages) => {
      // Assuming the API returns hasMore and nextPage
      return lastPage.hasMore ? pages.length : undefined;
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Mutation Hooks
export function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePostApi,
    
    // Optimistic update
    onMutate: async (postId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['feed'] });

      // Snapshot the previous value
      const previousData = queryClient.getQueriesData({ queryKey: ['feed'] });

      // Optimistically update all feed queries
      queryClient.setQueriesData(
        { queryKey: ['feed'] },
        (old: { pages: { posts: Post[]; hasMore: boolean }[] } | undefined) => {
          if (!old) return old;
          
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              posts: page.posts.map((post: Post) =>
                post.id === postId
                  ? {
                      ...post,
                      engagement: {
                        ...post.engagement,
                        hasLiked: !post.engagement.hasLiked,
                        likes: post.engagement.hasLiked
                          ? post.engagement.likes - 1
                          : post.engagement.likes + 1,
                      },
                    }
                  : post
              ),
            })),
          };
        }
      );

      return { previousData };
    },

    // Rollback on error
    onError: (err, postId, context) => {
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },

    // Always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
}

export function useBookmarkPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookmarkPostApi,
    
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['feed'] });

      const previousData = queryClient.getQueriesData({ queryKey: ['feed'] });

      queryClient.setQueriesData(
        { queryKey: ['feed'] },
        (old: { pages: { posts: Post[]; hasMore: boolean }[] } | undefined) => {
          if (!old) return old;
          
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              posts: page.posts.map((post: Post) =>
                post.id === postId
                  ? {
                      ...post,
                      engagement: {
                        ...post.engagement,
                        hasBookmarked: !post.engagement.hasBookmarked,
                      },
                    }
                  : post
              ),
            })),
          };
        }
      );

      return { previousData };
    },

    onError: (err, postId, context) => {
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
}

export function useSharePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sharePostApi,
    
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['feed'] });

      const previousData = queryClient.getQueriesData({ queryKey: ['feed'] });

      queryClient.setQueriesData(
        { queryKey: ['feed'] },
        (old: { pages: { posts: Post[]; hasMore: boolean }[] } | undefined) => {
          if (!old) return old;
          
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              posts: page.posts.map((post: Post) =>
                post.id === postId
                  ? {
                      ...post,
                      engagement: {
                        ...post.engagement,
                        shares: post.engagement.shares + 1,
                      },
                    }
                  : post
              ),
            })),
          };
        }
      );

      return { previousData };
    },

    onError: (err, postId, context) => {
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePostApi,
    
    onSuccess: (_, postId) => {
      // Remove post from all feed queries
      queryClient.setQueriesData(
        { queryKey: ['feed'] },
        (old: { pages: { posts: Post[]; hasMore: boolean }[] } | undefined) => {
          if (!old) return old;
          
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              posts: page.posts.filter((post: Post) => post.id !== postId),
            })),
          };
        }
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
}

// Prefetch function for hover interactions
export function usePrefetchPost() {
  const queryClient = useQueryClient();

  return (postId: string) => {
    queryClient.prefetchQuery({
      queryKey: ['post', postId],
      queryFn: async () => {
        const response = await fetch(`/api/posts/${postId}`);
        if (!response.ok) throw new Error('Failed to fetch post');
        return response.json();
      },
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  };
}