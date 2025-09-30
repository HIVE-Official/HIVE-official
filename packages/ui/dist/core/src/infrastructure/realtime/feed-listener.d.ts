/**
 * Real-time Feed Listener
 * Subscribes to feed updates using Firestore listeners
 */
export interface FeedUpdate {
    id: string;
    type: 'post' | 'event' | 'ritual_update' | 'requote';
    content: {
        text: string;
        mediaUrls: string[];
        authorId: string;
        authorName: string;
        authorHandle: string;
        authorAvatar?: string;
    };
    spaceId?: string;
    spaceName?: string;
    engagement: {
        reactions: number;
        comments: number;
        reposts: number;
        requotes: number;
    };
    isPromoted: boolean;
    createdAt: Date;
    relevanceScore: number;
}
export interface FeedListenerOptions {
    campusId: string;
    userId?: string;
    filter?: 'all' | 'my_spaces' | 'trending' | 'events' | 'rituals';
    limitCount?: number;
    onUpdate: (updates: FeedUpdate[]) => void;
    onError?: (error: Error) => void;
}
export declare class FeedListener {
    private listeners;
    private feedCache;
    /**
     * Subscribe to real-time feed updates
     */
    subscribe(options: FeedListenerOptions): string;
    /**
     * Subscribe to space-specific feed
     */
    subscribeToSpace(spaceId: string, options: Omit<FeedListenerOptions, 'filter'>): string;
    /**
     * Subscribe to promoted posts (campus-wide)
     */
    subscribeToPromoted(campusId: string, options: Omit<FeedListenerOptions, 'filter'>): string;
    /**
     * Subscribe to user's personal feed (based on followed spaces)
     */
    subscribeToUserFeed(userId: string, campusId: string, options: Omit<FeedListenerOptions, 'userId'>): string;
    /**
     * Unsubscribe from feed updates
     */
    unsubscribe(listenerId: string): void;
    /**
     * Unsubscribe from all feed listeners
     */
    unsubscribeAll(): void;
    /**
     * Get cached feed for a listener
     */
    getCachedFeed(listenerId: string): FeedUpdate[];
    private buildFeedQuery;
    private mapToFeedUpdate;
    private fetchAndMapPromotedPost;
    private updateCache;
}
export declare const feedListener: FeedListener;
//# sourceMappingURL=feed-listener.d.ts.map