import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Domain types
interface Space {
  id: string;
  name: string;
  handle: string;
  description: string;
  category: string;
  memberCount: number;
  isPublic: boolean;
  isMember: boolean;
  role?: 'member' | 'moderator' | 'admin' | 'owner';
  campusId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  type: string;
  spaceId?: string;
  creatorId: string;
  isPublic: boolean;
  deployments: number;
  config: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

interface FeedItem {
  id: string;
  type: 'post' | 'event' | 'announcement' | 'ritual';
  authorId: string;
  spaceId?: string;
  content: string;
  media?: string[];
  likes: number;
  comments: number;
  isLiked: boolean;
  createdAt: Date;
}

interface Ritual {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  spaceId: string;
  participants: string[];
  nextOccurrence: Date;
  isActive: boolean;
}

interface HiveState {
  // Spaces
  activeSpace: Space | null;
  userSpaces: Space[];
  
  // Tools
  activeTools: Tool[];
  userTools: Tool[];
  
  // Feed
  feedItems: FeedItem[];
  feedFilter: 'all' | 'spaces' | 'following' | 'rituals';
  
  // Rituals
  activeRituals: Ritual[];
  
  // Actions - Spaces
  setActiveSpace: (space: Space | null) => void;
  setUserSpaces: (spaces: Space[]) => void;
  joinSpace: (space: Space) => void;
  leaveSpace: (spaceId: string) => void;
  
  // Actions - Tools
  setActiveTools: (tools: Tool[]) => void;
  deployTool: (tool: Tool, spaceId: string) => void;
  removeTool: (toolId: string) => void;
  
  // Actions - Feed
  setFeedItems: (items: FeedItem[]) => void;
  addFeedItem: (item: FeedItem) => void;
  setFeedFilter: (filter: HiveState['feedFilter']) => void;
  likeFeedItem: (itemId: string) => void;
  
  // Actions - Rituals
  setActiveRituals: (rituals: Ritual[]) => void;
  joinRitual: (ritual: Ritual) => void;
  leaveRitual: (ritualId: string) => void;
  
  // Utility
  reset: () => void;
}

const initialState = {
  activeSpace: null,
  userSpaces: [],
  activeTools: [],
  userTools: [],
  feedItems: [],
  feedFilter: 'all' as const,
  activeRituals: [],
};

export const useHiveStore = create<HiveState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        // Space actions
        setActiveSpace: (activeSpace: Space | null) =>
          set({ activeSpace }, false, 'setActiveSpace'),

        setUserSpaces: (userSpaces: Space[]) =>
          set({ userSpaces }, false, 'setUserSpaces'),

        joinSpace: (space: Space) =>
          set(
            (state) => ({
              userSpaces: [...state.userSpaces, { ...space, isMember: true }],
            }),
            false,
            'joinSpace'
          ),

        leaveSpace: (spaceId: string) =>
          set(
            (state) => ({
              userSpaces: state.userSpaces.filter((s) => s.id !== spaceId),
              activeSpace: state.activeSpace?.id === spaceId ? null : state.activeSpace,
            }),
            false,
            'leaveSpace'
          ),

        // Tool actions
        setActiveTools: (activeTools: Tool[]) =>
          set({ activeTools }, false, 'setActiveTools'),

        deployTool: (tool: Tool, spaceId: string) =>
          set(
            (state) => ({
              activeTools: [
                ...state.activeTools,
                { ...tool, spaceId, deployments: tool.deployments + 1 },
              ],
            }),
            false,
            'deployTool'
          ),

        removeTool: (toolId: string) =>
          set(
            (state) => ({
              activeTools: state.activeTools.filter((t) => t.id !== toolId),
            }),
            false,
            'removeTool'
          ),

        // Feed actions
        setFeedItems: (feedItems: FeedItem[]) =>
          set({ feedItems }, false, 'setFeedItems'),

        addFeedItem: (item: FeedItem) =>
          set(
            (state) => ({
              feedItems: [item, ...state.feedItems],
            }),
            false,
            'addFeedItem'
          ),

        setFeedFilter: (feedFilter: HiveState['feedFilter']) =>
          set({ feedFilter }, false, 'setFeedFilter'),

        likeFeedItem: (itemId: string) =>
          set(
            (state) => ({
              feedItems: state.feedItems.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      likes: item.isLiked ? item.likes - 1 : item.likes + 1,
                      isLiked: !item.isLiked,
                    }
                  : item
              ),
            }),
            false,
            'likeFeedItem'
          ),

        // Ritual actions
        setActiveRituals: (activeRituals: Ritual[]) =>
          set({ activeRituals }, false, 'setActiveRituals'),

        joinRitual: (ritual: Ritual) =>
          set(
            (state) => ({
              activeRituals: [...state.activeRituals, ritual],
            }),
            false,
            'joinRitual'
          ),

        leaveRitual: (ritualId: string) =>
          set(
            (state) => ({
              activeRituals: state.activeRituals.filter((r) => r.id !== ritualId),
            }),
            false,
            'leaveRitual'
          ),

        // Utility
        reset: () => set(initialState, false, 'reset'),
      }),
      {
        name: 'hive-store',
        partialize: (state) => ({
          // Persist only non-sensitive data
          feedFilter: state.feedFilter,
          activeSpace: state.activeSpace ? { id: state.activeSpace.id } : null,
        }),
      }
    ),
    {
      name: 'HiveStore',
    }
  )
);

// Selectors
export const useActiveSpace = () => useHiveStore((state) => state.activeSpace);
export const useUserSpaces = () => useHiveStore((state) => state.userSpaces);
export const useFeedItems = () => useHiveStore((state) => state.feedItems);
export const useActiveTools = () => useHiveStore((state) => state.activeTools);
export const useActiveRituals = () => useHiveStore((state) => state.activeRituals);