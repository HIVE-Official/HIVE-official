"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useExpandedPosts = exports.useRecentSearches = exports.useFeedViewMode = exports.useFeedFilters = exports.useFeedStore = void 0;
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
const defaultFilters = {
    postTypes: [],
    sortBy: 'recent',
    timeRange: 'all',
    spaces: [],
};
exports.useFeedStore = (0, zustand_1.create)()((0, middleware_1.devtools)((0, middleware_1.persist)((set, get) => ({
    // Filters
    filters: defaultFilters,
    setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters },
    }), false, 'setFilters'),
    resetFilters: () => set({ filters: defaultFilters }, false, 'resetFilters'),
    // UI State
    expandedPosts: new Set(),
    togglePostExpanded: (postId) => set((state) => {
        const expanded = new Set(state.expandedPosts);
        if (expanded.has(postId)) {
            expanded.delete(postId);
        }
        else {
            expanded.add(postId);
        }
        return { expandedPosts: expanded };
    }, false, 'togglePostExpanded'),
    // Composer State
    composerOpen: false,
    composerType: null,
    setComposerOpen: (open, type = null) => set({ composerOpen: open, composerType: type }, false, 'setComposerOpen'),
    // Draft Management
    drafts: new Map(),
    saveDraft: (id, content) => set((state) => {
        const drafts = new Map(state.drafts);
        drafts.set(id, content);
        return { drafts };
    }, false, 'saveDraft'),
    getDraft: (id) => get().drafts.get(id),
    deleteDraft: (id) => set((state) => {
        const drafts = new Map(state.drafts);
        drafts.delete(id);
        return { drafts };
    }, false, 'deleteDraft'),
    // Notification State
    hasNewPosts: false,
    newPostCount: 0,
    setHasNewPosts: (has, count = 0) => set({ hasNewPosts: has, newPostCount: count }, false, 'setHasNewPosts'),
    // View Preferences
    viewMode: 'card',
    setViewMode: (mode) => set({ viewMode: mode }, false, 'setViewMode'),
    // Search History
    recentSearches: [],
    addRecentSearch: (query) => set((state) => {
        const searches = [query, ...state.recentSearches.filter(s => s !== query)].slice(0, 10);
        return { recentSearches: searches };
    }, false, 'addRecentSearch'),
    clearRecentSearches: () => set({ recentSearches: [] }, false, 'clearRecentSearches'),
}), {
    name: 'FeedStore',
    partialize: (state) => ({
        filters: state.filters,
        viewMode: state.viewMode,
        recentSearches: state.recentSearches,
    }),
})));
// Selectors
const useFeedFilters = () => (0, exports.useFeedStore)((state) => state.filters);
exports.useFeedFilters = useFeedFilters;
const useFeedViewMode = () => (0, exports.useFeedStore)((state) => state.viewMode);
exports.useFeedViewMode = useFeedViewMode;
const useRecentSearches = () => (0, exports.useFeedStore)((state) => state.recentSearches);
exports.useRecentSearches = useRecentSearches;
const useExpandedPosts = () => (0, exports.useFeedStore)((state) => state.expandedPosts);
exports.useExpandedPosts = useExpandedPosts;
//# sourceMappingURL=feed-store.js.map