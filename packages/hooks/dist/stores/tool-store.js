"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useToolDrafts = exports.useFavoriteTools = exports.useRecentTools = exports.useToolStore = void 0;
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
exports.useToolStore = (0, zustand_1.create)()((0, middleware_1.devtools)((0, middleware_1.persist)((set, get) => ({
    // UI State
    activeTab: 'editor',
    setActiveTab: (tab) => set({ activeTab: tab }, false, 'setActiveTab'),
    showPreview: false,
    setShowPreview: (show) => set({ showPreview: show }, false, 'setShowPreview'),
    // Draft Management
    drafts: new Map(),
    saveDraft: (id, draft) => set((state) => {
        const drafts = new Map(state.drafts);
        drafts.set(id, draft);
        return { drafts };
    }, false, 'saveDraft'),
    getDraft: (id) => get().drafts.get(id),
    clearDraft: (id) => set((state) => {
        const drafts = new Map(state.drafts);
        drafts.delete(id);
        return { drafts };
    }, false, 'clearDraft'),
    // Execution State
    executingTools: new Set(),
    setToolExecuting: (toolId, executing) => set((state) => {
        const executingTools = new Set(state.executingTools);
        if (executing) {
            executingTools.add(toolId);
        }
        else {
            executingTools.delete(toolId);
        }
        return { executingTools };
    }, false, 'setToolExecuting'),
    isToolExecuting: (toolId) => get().executingTools.has(toolId),
    // Recent Tools
    recentTools: [],
    addRecentTool: (toolId) => set((state) => {
        const recentTools = [
            toolId,
            ...state.recentTools.filter((id) => id !== toolId)
        ].slice(0, 10);
        return { recentTools };
    }, false, 'addRecentTool'),
    clearRecentTools: () => set({ recentTools: [] }, false, 'clearRecentTools'),
    // Favorite Tools
    favoriteTools: new Set(),
    toggleFavoriteTool: (toolId) => set((state) => {
        const favoriteTools = new Set(state.favoriteTools);
        if (favoriteTools.has(toolId)) {
            favoriteTools.delete(toolId);
        }
        else {
            favoriteTools.add(toolId);
        }
        return { favoriteTools };
    }, false, 'toggleFavoriteTool'),
    isFavoriteTool: (toolId) => get().favoriteTools.has(toolId),
    // Tool Templates
    selectedTemplate: null,
    setSelectedTemplate: (templateId) => set({ selectedTemplate: templateId }, false, 'setSelectedTemplate'),
}), {
    name: 'ToolStore',
    partialize: (state) => ({
        recentTools: state.recentTools,
        favoriteTools: Array.from(state.favoriteTools),
    }),
    merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState,
        favoriteTools: new Set(persistedState?.favoriteTools || []),
    }),
})));
// Selectors
const useRecentTools = () => (0, exports.useToolStore)((state) => state.recentTools);
exports.useRecentTools = useRecentTools;
const useFavoriteTools = () => (0, exports.useToolStore)((state) => state.favoriteTools);
exports.useFavoriteTools = useFavoriteTools;
const useToolDrafts = () => (0, exports.useToolStore)((state) => state.drafts);
exports.useToolDrafts = useToolDrafts;
//# sourceMappingURL=tool-store.js.map