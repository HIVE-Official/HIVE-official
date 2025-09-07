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
export declare function useFeedPosts(params: FeedParams): import("@tanstack/react-query").UseInfiniteQueryResult<import("@tanstack/react-query").InfiniteData<{
    hasMore: boolean;
}, unknown>, Error>;
export declare function useLikePost(): import("@tanstack/react-query").UseMutationResult<{
    liked: boolean;
    likeCount: number;
}, Error, string, {
    previousData: [readonly unknown[], unknown][];
}>;
export declare function useBookmarkPost(): import("@tanstack/react-query").UseMutationResult<{
    isBookmarked: boolean;
}, Error, string, {
    previousData: [readonly unknown[], unknown][];
}>;
export declare function useSharePost(): import("@tanstack/react-query").UseMutationResult<{
    shared: boolean;
    shareCount: number;
}, Error, string, {
    previousData: [readonly unknown[], unknown][];
}>;
export declare function useDeletePost(): import("@tanstack/react-query").UseMutationResult<void, Error, string, unknown>;
export declare function usePrefetchPost(): (postId: string) => void;
export {};
//# sourceMappingURL=feed-queries.d.ts.map