import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface FeedFilters {
  postTypes: string[];
  sortBy: 'recent' | 'popular' | 'trending';
  timeRange: 'today' | 'week' | 'month' | 'all';
  spaces: string[];
}

interface FeedState {
  // Filters
  filters: FeedFilters;
  setFilters: (filters: Partial<FeedFilters>) => void;
  resetFilters: () => void;

  // UI State
  expandedPosts: Set<string>;
  togglePostExpanded: (postId: string) => void;
  
  // Composer State
  composerOpen: boolean;
  composerType: 'text' | 'tool' | 'event' | 'poll' | null;
  setComposerOpen: (open: boolean, type?: FeedState['composerType']) => void;

  // Draft Management
  drafts: Map<string, Record<string, unknown>>;
  saveDraft: (id: string, content: Record<string, unknown>) => void;
  getDraft: (id: string) => Record<string, unknown> | undefined;
  deleteDraft: (id: string) => void;

  // Notification State
  hasNewPosts: boolean;
  newPostCount: number;
  setHasNewPosts: (has: boolean, count?: number) => void;
  
  // View Preferences
  viewMode: 'card' | 'compact' | 'detailed';
  setViewMode: (mode: FeedState['viewMode']) => void;
  
  // Search History
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

const defaultFilters: FeedFilters = {
  postTypes: [],
  sortBy: 'recent',
  timeRange: 'all',
  spaces: [],
};

export const useFeedStore = create<FeedState>()(
  devtools(
    persist(
      (set, get) => ({
        // Filters
        filters: defaultFilters,
        setFilters: (newFilters) =>
          set(
            (state) => ({
              filters: { ...state.filters, ...newFilters },
            }),
            false,
            'setFilters'
          ),
        resetFilters: () =>
          set({ filters: defaultFilters }, false, 'resetFilters'),

        // UI State
        expandedPosts: new Set(),
        togglePostExpanded: (postId) =>
          set(
            (state) => {
              const expanded = new Set(state.expandedPosts);
              if (expanded.has(postId)) {
                expanded.delete(postId);
              } else {
                expanded.add(postId);
              }
              return { expandedPosts: expanded };
            },
            false,
            'togglePostExpanded'
          ),

        // Composer State
        composerOpen: false,
        composerType: null,
        setComposerOpen: (open, type = null) =>
          set(
            { composerOpen: open, composerType: type },
            false,
            'setComposerOpen'
          ),

        // Draft Management
        drafts: new Map(),
        saveDraft: (id, content) =>
          set(
            (state) => {
              const drafts = new Map(state.drafts);
              drafts.set(id, content);
              return { drafts };
            },
            false,
            'saveDraft'
          ),
        getDraft: (id) => get().drafts.get(id),
        deleteDraft: (id) =>
          set(
            (state) => {
              const drafts = new Map(state.drafts);
              drafts.delete(id);
              return { drafts };
            },
            false,
            'deleteDraft'
          ),

        // Notification State
        hasNewPosts: false,
        newPostCount: 0,
        setHasNewPosts: (has, count = 0) =>
          set(
            { hasNewPosts: has, newPostCount: count },
            false,
            'setHasNewPosts'
          ),

        // View Preferences
        viewMode: 'card',
        setViewMode: (mode) =>
          set({ viewMode: mode }, false, 'setViewMode'),

        // Search History
        recentSearches: [],
        addRecentSearch: (query) =>
          set(
            (state) => {
              const searches = [query, ...state.recentSearches.filter(s => s !== query)].slice(0, 10);
              return { recentSearches: searches };
            },
            false,
            'addRecentSearch'
          ),
        clearRecentSearches: () =>
          set({ recentSearches: [] }, false, 'clearRecentSearches'),
      }),
      {
        name: 'FeedStore',
        partialize: (state) => ({
          filters: state.filters,
          viewMode: state.viewMode,
          recentSearches: state.recentSearches,
        }),
      }
    )
  )
);

// Selectors
export const useFeedFilters = () => useFeedStore((state) => state.filters);
export const useFeedViewMode = () => useFeedStore((state) => state.viewMode);
export const useRecentSearches = () => useFeedStore((state) => state.recentSearches);
export const useExpandedPosts = () => useFeedStore((state) => state.expandedPosts);