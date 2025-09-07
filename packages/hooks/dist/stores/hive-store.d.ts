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
    activeSpace: Space | null;
    userSpaces: Space[];
    activeTools: Tool[];
    userTools: Tool[];
    feedItems: FeedItem[];
    feedFilter: 'all' | 'spaces' | 'following' | 'rituals';
    activeRituals: Ritual[];
    setActiveSpace: (space: Space | null) => void;
    setUserSpaces: (spaces: Space[]) => void;
    joinSpace: (space: Space) => void;
    leaveSpace: (spaceId: string) => void;
    setActiveTools: (tools: Tool[]) => void;
    deployTool: (tool: Tool, spaceId: string) => void;
    removeTool: (toolId: string) => void;
    setFeedItems: (items: FeedItem[]) => void;
    addFeedItem: (item: FeedItem) => void;
    setFeedFilter: (filter: HiveState['feedFilter']) => void;
    likeFeedItem: (itemId: string) => void;
    setActiveRituals: (rituals: Ritual[]) => void;
    joinRitual: (ritual: Ritual) => void;
    leaveRitual: (ritualId: string) => void;
    reset: () => void;
}
export declare const useHiveStore: import("zustand").UseBoundStore<Omit<Omit<import("zustand").StoreApi<HiveState>, "setState" | "devtools"> & {
    setState(partial: HiveState | Partial<HiveState> | ((state: HiveState) => HiveState | Partial<HiveState>), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: HiveState | ((state: HiveState) => HiveState), replace: true, action?: (string | {
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
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<HiveState, {
            feedFilter: "all" | "spaces" | "following" | "rituals";
            activeSpace: {
                id: string;
            } | null;
        }>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: HiveState) => void) => () => void;
        onFinishHydration: (fn: (state: HiveState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<HiveState, {
            feedFilter: "all" | "spaces" | "following" | "rituals";
            activeSpace: {
                id: string;
            } | null;
        }>>;
    };
}>;
export declare const useActiveSpace: () => Space | null;
export declare const useUserSpaces: () => Space[];
export declare const useFeedItems: () => FeedItem[];
export declare const useActiveTools: () => Tool[];
export declare const useActiveRituals: () => Ritual[];
export {};
//# sourceMappingURL=hive-store.d.ts.map