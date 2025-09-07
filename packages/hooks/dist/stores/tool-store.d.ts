interface ToolDraft {
    formData: Record<string, unknown>;
    inputFields: Array<{
        name: string;
        type: string;
        required: boolean;
    }>;
    outputFields: Array<{
        name: string;
        type: string;
    }>;
    permissions: string[];
}
interface ToolState {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    showPreview: boolean;
    setShowPreview: (show: boolean) => void;
    drafts: Map<string, ToolDraft>;
    saveDraft: (id: string, draft: ToolDraft) => void;
    getDraft: (id: string) => ToolDraft | undefined;
    clearDraft: (id: string) => void;
    executingTools: Set<string>;
    setToolExecuting: (toolId: string, executing: boolean) => void;
    isToolExecuting: (toolId: string) => boolean;
    recentTools: string[];
    addRecentTool: (toolId: string) => void;
    clearRecentTools: () => void;
    favoriteTools: Set<string>;
    toggleFavoriteTool: (toolId: string) => void;
    isFavoriteTool: (toolId: string) => boolean;
    selectedTemplate: string | null;
    setSelectedTemplate: (templateId: string | null) => void;
}
export declare const useToolStore: import("zustand").UseBoundStore<Omit<Omit<import("zustand").StoreApi<ToolState>, "setState" | "devtools"> & {
    setState(partial: ToolState | Partial<ToolState> | ((state: ToolState) => ToolState | Partial<ToolState>), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: ToolState | ((state: ToolState) => ToolState), replace: true, action?: (string | {
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
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<ToolState, {
            recentTools: string[];
            favoriteTools: string[];
        }>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: ToolState) => void) => () => void;
        onFinishHydration: (fn: (state: ToolState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<ToolState, {
            recentTools: string[];
            favoriteTools: string[];
        }>>;
    };
}>;
export declare const useRecentTools: () => string[];
export declare const useFavoriteTools: () => Set<string>;
export declare const useToolDrafts: () => Map<string, ToolDraft>;
export {};
//# sourceMappingURL=tool-store.d.ts.map