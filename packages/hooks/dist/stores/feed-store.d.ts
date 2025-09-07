interface FeedFilters {
    postTypes: string[];
    sortBy: 'recent' | 'popular' | 'trending';
    timeRange: 'today' | 'week' | 'month' | 'all';
    spaces: string[];
}
interface FeedState {
    filters: FeedFilters;
    setFilters: (filters: Partial<FeedFilters>) => void;
    resetFilters: () => void;
    expandedPosts: Set<string>;
    togglePostExpanded: (postId: string) => void;
    composerOpen: boolean;
    composerType: 'text' | 'tool' | 'event' | 'poll' | null;
    setComposerOpen: (open: boolean, type?: FeedState['composerType']) => void;
    drafts: Map<string, Record<string, unknown>>;
    saveDraft: (id: string, content: Record<string, unknown>) => void;
    getDraft: (id: string) => Record<string, unknown> | undefined;
    deleteDraft: (id: string) => void;
    hasNewPosts: boolean;
    newPostCount: number;
    setHasNewPosts: (has: boolean, count?: number) => void;
    viewMode: 'card' | 'compact' | 'detailed';
    setViewMode: (mode: FeedState['viewMode']) => void;
    recentSearches: string[];
    addRecentSearch: (query: string) => void;
    clearRecentSearches: () => void;
}
export declare const useFeedStore: import("zustand").UseBoundStore<Omit<Omit<import("zustand").StoreApi<FeedState>, "setState" | "devtools"> & {
    setState(partial: FeedState | Partial<FeedState> | ((state: FeedState) => FeedState | Partial<FeedState>), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: FeedState | ((state: FeedState) => FeedState), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<FeedState, {
            filters: FeedFilters;
            viewMode: "card" | "compact" | "detailed";
            recentSearches: string[];
        }>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: FeedState) => void) => () => void;
        onFinishHydration: (fn: (state: FeedState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<FeedState, {
            filters: FeedFilters;
            viewMode: "card" | "compact" | "detailed";
            recentSearches: string[];
        }>>;
    };
}>;
export declare const useFeedFilters: () => FeedFilters;
export declare const useFeedViewMode: () => "card" | "compact" | "detailed";
export declare const useRecentSearches: () => string[];
export declare const useExpandedPosts: () => Set<string>;
export {};
//# sourceMappingURL=feed-store.d.ts.map