/**
 * SSE Feed Updates Hook
 *
 * Implements real-time feed updates per SPEC.md:563-578
 * - Server-Sent Events for live content updates
 * - Exponential backoff reconnection strategy
 * - "X new posts" pill indicator
 * - Smooth scroll position maintenance
 */
export interface SSEFeedEvent {
    type: 'new-post' | 'update-post' | 'delete-post' | 'reaction' | 'comment';
    data: {
        id: string;
        content?: any;
        postId?: string;
        count?: number;
        timestamp: string;
    };
}
export interface SSEConnectionState {
    status: 'connecting' | 'connected' | 'disconnected' | 'error';
    lastConnected?: Date;
    reconnectAttempts: number;
    newPostsCount: number;
    isReconnecting: boolean;
}
export interface UseFeedSSEOptions {
    /** SSE endpoint URL */
    endpoint?: string;
    /** User authentication token */
    authToken?: string;
    /** Campus ID for filtering */
    campusId?: string;
    /** Enable automatic reconnection */
    autoReconnect?: boolean;
    /** Maximum reconnection attempts */
    maxReconnectAttempts?: number;
    /** Initial reconnection delay (ms) */
    initialReconnectDelay?: number;
    /** Maximum reconnection delay (ms) */
    maxReconnectDelay?: number;
    /** Enable debug logging */
    debug?: boolean;
}
export interface UseFeedSSEReturn {
    /** Current connection state */
    connectionState: SSEConnectionState;
    /** Latest events received */
    events: SSEFeedEvent[];
    /** Clear events array */
    clearEvents: () => void;
    /** Manually reconnect */
    reconnect: () => void;
    /** Manually disconnect */
    disconnect: () => void;
    /** Clear new posts indicator */
    clearNewPostsIndicator: () => void;
    /** Subscribe to specific event types */
    subscribe: (eventType: SSEFeedEvent['type'], callback: (event: SSEFeedEvent) => void) => () => void;
}
export declare function useFeedSSE(options?: UseFeedSSEOptions): UseFeedSSEReturn;
//# sourceMappingURL=use-feed-sse.d.ts.map