export declare function useFirebaseRealtime<T>(collectionName: string, filters?: Array<{
    field: string;
    operator: any;
    value: any;
}>, orderByField?: string, limitCount?: number, dependencies?: any[]): {
    data: T[];
    loading: boolean;
    error: Error | null;
};
export declare function useRealtimePosts(spaceId: string): {
    data: unknown[];
    loading: boolean;
    error: Error | null;
};
export declare function useRealtimeMembers(spaceId: string): {
    data: unknown[];
    loading: boolean;
    error: Error | null;
};
export declare function useRealtimeEvents(spaceId: string): {
    data: unknown[];
    loading: boolean;
    error: Error | null;
};
export declare function useTypingIndicators(spaceId: string, userId: string): {
    typingUsers: string[];
    handleTyping: () => void;
    stopTyping: () => void;
};
export declare function usePresence(spaceId: string, userId: string): {
    onlineUsers: string[];
    lastSeen: Record<string, Date>;
    updatePresence: () => void;
};
export declare function useOptimisticUpdates<T>(initialData: T[]): {
    data: T[];
    pendingUpdates: Set<string>;
    addOptimisticItem: (item: T & {
        id: string;
    }, operation: () => Promise<void>) => void;
    removeOptimisticItem: (id: string, operation: () => Promise<void>) => void;
    setData: import("react").Dispatch<import("react").SetStateAction<T[]>>;
};
export declare function useAutoRefresh(refreshFunction: () => Promise<void>, intervalMs?: number, enabled?: boolean): {
    isRefreshing: boolean;
    lastRefresh: Date | null;
    manualRefresh: () => Promise<void>;
};
export declare function useLiveActivityFeed(userId: string): {
    activities: any[];
    unreadCount: number;
    markAsRead: () => void;
};
//# sourceMappingURL=use-live-updates.d.ts.map