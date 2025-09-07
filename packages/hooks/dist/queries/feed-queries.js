"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFeedPosts = useFeedPosts;
exports.useLikePost = useLikePost;
exports.useBookmarkPost = useBookmarkPost;
exports.useSharePost = useSharePost;
exports.useDeletePost = useDeletePost;
exports.usePrefetchPost = usePrefetchPost;
const react_query_1 = require("@tanstack/react-query");
// API functions
const fetchFeedPosts = async ({ pageParam = 0, ...params }) => {
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
    if (!response.ok)
        throw new Error('Failed to fetch feed');
    return response.json();
};
const likePostApi = async (postId) => {
    const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
    });
    if (!response.ok)
        throw new Error('Failed to like post');
    return response.json();
};
const bookmarkPostApi = async (postId) => {
    const response = await fetch(`/api/posts/${postId}/bookmark`, {
        method: 'POST',
    });
    if (!response.ok)
        throw new Error('Failed to bookmark post');
    return response.json();
};
const sharePostApi = async (postId) => {
    const response = await fetch(`/api/posts/${postId}/share`, {
        method: 'POST',
    });
    if (!response.ok)
        throw new Error('Failed to share post');
    return response.json();
};
const deletePostApi = async (postId) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
    });
    if (!response.ok)
        throw new Error('Failed to delete post');
};
// Query Hooks
function useFeedPosts(params) {
    return (0, react_query_1.useInfiniteQuery)({
        queryKey: ['feed', params],
        queryFn: ({ pageParam }) => fetchFeedPosts({ ...params, pageParam }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => {
            // Assuming the API returns hasMore and nextPage
            return lastPage.hasMore ? pages.length : undefined;
        },
        staleTime: 1 * 60 * 1000, // 1 minute
        gcTime: 5 * 60 * 1000, // 5 minutes
    });
}
// Mutation Hooks
function useLikePost() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: likePostApi,
        // Optimistic update
        onMutate: async (postId) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['feed'] });
            // Snapshot the previous value
            const previousData = queryClient.getQueriesData({ queryKey: ['feed'] });
            // Optimistically update all feed queries
            queryClient.setQueriesData({ queryKey: ['feed'] }, (old) => {
                if (!old)
                    return old;
                return {
                    ...old,
                    pages: old.pages.map((page) => ({
                        ...page,
                        posts: page.posts.map((post) => post.id === postId
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
                            : post),
                    })),
                };
            });
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
function useBookmarkPost() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: bookmarkPostApi,
        onMutate: async (postId) => {
            await queryClient.cancelQueries({ queryKey: ['feed'] });
            const previousData = queryClient.getQueriesData({ queryKey: ['feed'] });
            queryClient.setQueriesData({ queryKey: ['feed'] }, (old) => {
                if (!old)
                    return old;
                return {
                    ...old,
                    pages: old.pages.map((page) => ({
                        ...page,
                        posts: page.posts.map((post) => post.id === postId
                            ? {
                                ...post,
                                engagement: {
                                    ...post.engagement,
                                    hasBookmarked: !post.engagement.hasBookmarked,
                                },
                            }
                            : post),
                    })),
                };
            });
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
function useSharePost() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: sharePostApi,
        onMutate: async (postId) => {
            await queryClient.cancelQueries({ queryKey: ['feed'] });
            const previousData = queryClient.getQueriesData({ queryKey: ['feed'] });
            queryClient.setQueriesData({ queryKey: ['feed'] }, (old) => {
                if (!old)
                    return old;
                return {
                    ...old,
                    pages: old.pages.map((page) => ({
                        ...page,
                        posts: page.posts.map((post) => post.id === postId
                            ? {
                                ...post,
                                engagement: {
                                    ...post.engagement,
                                    shares: post.engagement.shares + 1,
                                },
                            }
                            : post),
                    })),
                };
            });
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
function useDeletePost() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: deletePostApi,
        onSuccess: (_, postId) => {
            // Remove post from all feed queries
            queryClient.setQueriesData({ queryKey: ['feed'] }, (old) => {
                if (!old)
                    return old;
                return {
                    ...old,
                    pages: old.pages.map((page) => ({
                        ...page,
                        posts: page.posts.filter((post) => post.id !== postId),
                    })),
                };
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['feed'] });
        },
    });
}
// Prefetch function for hover interactions
function usePrefetchPost() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (postId) => {
        queryClient.prefetchQuery({
            queryKey: ['post', postId],
            queryFn: async () => {
                const response = await fetch(`/api/posts/${postId}`);
                if (!response.ok)
                    throw new Error('Failed to fetch post');
                return response.json();
            },
            staleTime: 10 * 60 * 1000, // 10 minutes
        });
    };
}
//# sourceMappingURL=feed-queries.js.map