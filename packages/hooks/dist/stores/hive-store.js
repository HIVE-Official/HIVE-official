"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useActiveRituals = exports.useActiveTools = exports.useFeedItems = exports.useUserSpaces = exports.useActiveSpace = exports.useHiveStore = void 0;
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
const initialState = {
    activeSpace: null,
    userSpaces: [],
    activeTools: [],
    userTools: [],
    feedItems: [],
    feedFilter: 'all',
    activeRituals: [],
};
exports.useHiveStore = (0, zustand_1.create)()((0, middleware_1.devtools)((0, middleware_1.persist)((set) => ({
    ...initialState,
    // Space actions
    setActiveSpace: (activeSpace) => set({ activeSpace }, false, 'setActiveSpace'),
    setUserSpaces: (userSpaces) => set({ userSpaces }, false, 'setUserSpaces'),
    joinSpace: (space) => set((state) => ({
        userSpaces: [...state.userSpaces, { ...space, isMember: true }],
    }), false, 'joinSpace'),
    leaveSpace: (spaceId) => set((state) => ({
        userSpaces: state.userSpaces.filter((s) => s.id !== spaceId),
        activeSpace: state.activeSpace?.id === spaceId ? null : state.activeSpace,
    }), false, 'leaveSpace'),
    // Tool actions
    setActiveTools: (activeTools) => set({ activeTools }, false, 'setActiveTools'),
    deployTool: (tool, spaceId) => set((state) => ({
        activeTools: [
            ...state.activeTools,
            { ...tool, spaceId, deployments: tool.deployments + 1 },
        ],
    }), false, 'deployTool'),
    removeTool: (toolId) => set((state) => ({
        activeTools: state.activeTools.filter((t) => t.id !== toolId),
    }), false, 'removeTool'),
    // Feed actions
    setFeedItems: (feedItems) => set({ feedItems }, false, 'setFeedItems'),
    addFeedItem: (item) => set((state) => ({
        feedItems: [item, ...state.feedItems],
    }), false, 'addFeedItem'),
    setFeedFilter: (feedFilter) => set({ feedFilter }, false, 'setFeedFilter'),
    likeFeedItem: (itemId) => set((state) => ({
        feedItems: state.feedItems.map((item) => item.id === itemId
            ? {
                ...item,
                likes: item.isLiked ? item.likes - 1 : item.likes + 1,
                isLiked: !item.isLiked,
            }
            : item),
    }), false, 'likeFeedItem'),
    // Ritual actions
    setActiveRituals: (activeRituals) => set({ activeRituals }, false, 'setActiveRituals'),
    joinRitual: (ritual) => set((state) => ({
        activeRituals: [...state.activeRituals, ritual],
    }), false, 'joinRitual'),
    leaveRitual: (ritualId) => set((state) => ({
        activeRituals: state.activeRituals.filter((r) => r.id !== ritualId),
    }), false, 'leaveRitual'),
    // Utility
    reset: () => set(initialState, false, 'reset'),
}), {
    name: 'hive-store',
    partialize: (state) => ({
        // Persist only non-sensitive data
        feedFilter: state.feedFilter,
        activeSpace: state.activeSpace ? { id: state.activeSpace.id } : null,
    }),
}), {
    name: 'HiveStore',
}));
// Selectors
const useActiveSpace = () => (0, exports.useHiveStore)((state) => state.activeSpace);
exports.useActiveSpace = useActiveSpace;
const useUserSpaces = () => (0, exports.useHiveStore)((state) => state.userSpaces);
exports.useUserSpaces = useUserSpaces;
const useFeedItems = () => (0, exports.useHiveStore)((state) => state.feedItems);
exports.useFeedItems = useFeedItems;
const useActiveTools = () => (0, exports.useHiveStore)((state) => state.activeTools);
exports.useActiveTools = useActiveTools;
const useActiveRituals = () => (0, exports.useHiveStore)((state) => state.activeRituals);
exports.useActiveRituals = useActiveRituals;
//# sourceMappingURL=hive-store.js.map