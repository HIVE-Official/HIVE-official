import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ToolDraft {
  formData: Record<string, unknown>;
  inputFields: Array<{ name: string; type: string; required: boolean }>;
  outputFields: Array<{ name: string; type: string }>;
  permissions: string[];
}

interface ToolState {
  // UI State
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  showPreview: boolean;
  setShowPreview: (show: boolean) => void;
  
  // Draft Management
  drafts: Map<string, ToolDraft>;
  saveDraft: (id: string, draft: ToolDraft) => void;
  getDraft: (id: string) => ToolDraft | undefined;
  clearDraft: (id: string) => void;
  
  // Execution State
  executingTools: Set<string>;
  setToolExecuting: (toolId: string, executing: boolean) => void;
  isToolExecuting: (toolId: string) => boolean;
  
  // Recent Tools
  recentTools: string[];
  addRecentTool: (toolId: string) => void;
  clearRecentTools: () => void;
  
  // Favorite Tools
  favoriteTools: Set<string>;
  toggleFavoriteTool: (toolId: string) => void;
  isFavoriteTool: (toolId: string) => boolean;
  
  // Tool Templates
  selectedTemplate: string | null;
  setSelectedTemplate: (templateId: string | null) => void;
}

export const useToolStore = create<ToolState>()(
  devtools(
    persist(
      (set, get) => ({
        // UI State
        activeTab: 'editor',
        setActiveTab: (tab) => set({ activeTab: tab }, false, 'setActiveTab'),
        
        showPreview: false,
        setShowPreview: (show) => set({ showPreview: show }, false, 'setShowPreview'),
        
        // Draft Management
        drafts: new Map(),
        saveDraft: (id, draft) =>
          set(
            (state) => {
              const drafts = new Map(state.drafts);
              drafts.set(id, draft);
              return { drafts };
            },
            false,
            'saveDraft'
          ),
        getDraft: (id) => get().drafts.get(id),
        clearDraft: (id) =>
          set(
            (state) => {
              const drafts = new Map(state.drafts);
              drafts.delete(id);
              return { drafts };
            },
            false,
            'clearDraft'
          ),
        
        // Execution State
        executingTools: new Set(),
        setToolExecuting: (toolId, executing) =>
          set(
            (state) => {
              const executingTools = new Set(state.executingTools);
              if (executing) {
                executingTools.add(toolId);
              } else {
                executingTools.delete(toolId);
              }
              return { executingTools };
            },
            false,
            'setToolExecuting'
          ),
        isToolExecuting: (toolId) => get().executingTools.has(toolId),
        
        // Recent Tools
        recentTools: [],
        addRecentTool: (toolId) =>
          set(
            (state) => {
              const recentTools = [
                toolId,
                ...state.recentTools.filter((id) => id !== toolId)
              ].slice(0, 10);
              return { recentTools };
            },
            false,
            'addRecentTool'
          ),
        clearRecentTools: () =>
          set({ recentTools: [] }, false, 'clearRecentTools'),
        
        // Favorite Tools
        favoriteTools: new Set(),
        toggleFavoriteTool: (toolId) =>
          set(
            (state) => {
              const favoriteTools = new Set(state.favoriteTools);
              if (favoriteTools.has(toolId)) {
                favoriteTools.delete(toolId);
              } else {
                favoriteTools.add(toolId);
              }
              return { favoriteTools };
            },
            false,
            'toggleFavoriteTool'
          ),
        isFavoriteTool: (toolId) => get().favoriteTools.has(toolId),
        
        // Tool Templates
        selectedTemplate: null,
        setSelectedTemplate: (templateId) =>
          set({ selectedTemplate: templateId }, false, 'setSelectedTemplate'),
      }),
      {
        name: 'ToolStore',
        partialize: (state) => ({
          recentTools: state.recentTools,
          favoriteTools: Array.from(state.favoriteTools),
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        merge: (persistedState: any, currentState) => ({
          ...currentState,
          ...persistedState,
          favoriteTools: new Set(persistedState.favoriteTools || []),
        }),
      }
    )
  )
);

// Selectors
export const useRecentTools = () => useToolStore((state) => state.recentTools);
export const useFavoriteTools = () => useToolStore((state) => state.favoriteTools);
export const useToolDrafts = () => useToolStore((state) => state.drafts);