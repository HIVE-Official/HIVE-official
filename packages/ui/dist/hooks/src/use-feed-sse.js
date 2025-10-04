/**
 * SSE Feed Updates Hook
 *
 * Implements real-time feed updates per SPEC.md:563-578
 * - Server-Sent Events for live content updates
 * - Exponential backoff reconnection strategy
 * - "X new posts" pill indicator
 * - Smooth scroll position maintenance
 */
"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
export function useFeedSSE(options = {}) {
    const { endpoint = '/api/feed/stream', authToken, campusId = 'ub-buffalo', autoReconnect = true, maxReconnectAttempts = 10, initialReconnectDelay = 1000, maxReconnectDelay = 30000, debug = false } = options;
    const [connectionState, setConnectionState] = useState({
        status: 'disconnected',
        reconnectAttempts: 0,
        newPostsCount: 0,
        isReconnecting: false
    });
    const [events, setEvents] = useState([]);
    const eventSourceRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);
    const subscribersRef = useRef(new Map());
    const log = useCallback((message, ...args) => {
        if (debug) {
            console.log(`[FeedSSE] ${message}`, ...args);
        }
    }, [debug]);
    const calculateReconnectDelay = useCallback((attempt) => {
        const delay = Math.min(initialReconnectDelay * Math.pow(2, attempt), maxReconnectDelay);
        // Add jitter to prevent thundering herd
        return delay + Math.random() * 1000;
    }, [initialReconnectDelay, maxReconnectDelay]);
    const notifySubscribers = useCallback((event) => {
        const subscribers = subscribersRef.current.get(event.type);
        if (subscribers) {
            subscribers.forEach(callback => {
                try {
                    callback(event);
                }
                catch (error) {
                    console.error('[FeedSSE] Subscriber callback error:', error);
                }
            });
        }
    }, []);
    const addEvent = useCallback((event) => {
        setEvents(prev => {
            // Keep only last 100 events to prevent memory leaks
            const newEvents = [event, ...prev].slice(0, 100);
            return newEvents;
        });
        // Update new posts count for UI indicator
        if (event.type === 'new-post') {
            setConnectionState(prev => ({
                ...prev,
                newPostsCount: prev.newPostsCount + 1
            }));
        }
        // Notify subscribers
        notifySubscribers(event);
    }, [notifySubscribers]);
    const disconnect = useCallback(() => {
        log('Disconnecting SSE');
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = null;
        }
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
        }
        setConnectionState(prev => ({
            ...prev,
            status: 'disconnected',
            isReconnecting: false
        }));
    }, [log]);
    const connect = useCallback(() => {
        // Don't connect if already connecting or connected
        if (eventSourceRef.current) {
            return;
        }
        log('Connecting to SSE endpoint:', endpoint);
        setConnectionState(prev => ({
            ...prev,
            status: 'connecting'
        }));
        try {
            const url = new URL(endpoint, window.location.origin);
            if (authToken) {
                url.searchParams.set('token', authToken);
            }
            if (campusId) {
                url.searchParams.set('campusId', campusId);
            }
            const eventSource = new EventSource(url.toString());
            eventSourceRef.current = eventSource;
            eventSource.onopen = () => {
                log('SSE connection opened');
                setConnectionState(prev => ({
                    ...prev,
                    status: 'connected',
                    lastConnected: new Date(),
                    reconnectAttempts: 0,
                    isReconnecting: false
                }));
            };
            eventSource.onerror = (error) => {
                log('SSE connection error:', error);
                setConnectionState(prev => ({
                    ...prev,
                    status: 'error'
                }));
                // Clean up current connection
                eventSource.close();
                eventSourceRef.current = null;
                // Auto-reconnect if enabled and under attempt limit
                if (autoReconnect && connectionState.reconnectAttempts < maxReconnectAttempts) {
                    const delay = calculateReconnectDelay(connectionState.reconnectAttempts);
                    log(`Reconnecting in ${delay}ms (attempt ${connectionState.reconnectAttempts + 1}/${maxReconnectAttempts})`);
                    setConnectionState(prev => ({
                        ...prev,
                        reconnectAttempts: prev.reconnectAttempts + 1,
                        isReconnecting: true
                    }));
                    reconnectTimeoutRef.current = setTimeout(() => {
                        connect();
                    }, delay);
                }
            };
            // Handle specific event types
            eventSource.addEventListener('new-post', (event) => {
                try {
                    const data = JSON.parse(event.data);
                    addEvent({
                        type: 'new-post',
                        data: {
                            id: data.id,
                            content: data,
                            timestamp: new Date().toISOString()
                        }
                    });
                    log('New post received:', data.id);
                }
                catch (error) {
                    console.error('[FeedSSE] Failed to parse new-post event:', error);
                }
            });
            eventSource.addEventListener('update-post', (event) => {
                try {
                    const data = JSON.parse(event.data);
                    addEvent({
                        type: 'update-post',
                        data: {
                            id: data.id,
                            content: data,
                            timestamp: new Date().toISOString()
                        }
                    });
                    log('Post updated:', data.id);
                }
                catch (error) {
                    console.error('[FeedSSE] Failed to parse update-post event:', error);
                }
            });
            eventSource.addEventListener('delete-post', (event) => {
                try {
                    const data = JSON.parse(event.data);
                    addEvent({
                        type: 'delete-post',
                        data: {
                            id: data.id,
                            timestamp: new Date().toISOString()
                        }
                    });
                    log('Post deleted:', data.id);
                }
                catch (error) {
                    console.error('[FeedSSE] Failed to parse delete-post event:', error);
                }
            });
            eventSource.addEventListener('reaction', (event) => {
                try {
                    const data = JSON.parse(event.data);
                    addEvent({
                        type: 'reaction',
                        data: {
                            id: data.id,
                            postId: data.postId,
                            count: data.count,
                            timestamp: new Date().toISOString()
                        }
                    });
                    log('Reaction updated:', data.postId, data.count);
                }
                catch (error) {
                    console.error('[FeedSSE] Failed to parse reaction event:', error);
                }
            });
            eventSource.addEventListener('comment', (event) => {
                try {
                    const data = JSON.parse(event.data);
                    addEvent({
                        type: 'comment',
                        data: {
                            id: data.id,
                            postId: data.postId,
                            content: data,
                            timestamp: new Date().toISOString()
                        }
                    });
                    log('Comment added:', data.postId);
                }
                catch (error) {
                    console.error('[FeedSSE] Failed to parse comment event:', error);
                }
            });
        }
        catch (error) {
            console.error('[FeedSSE] Failed to create EventSource:', error);
            setConnectionState(prev => ({
                ...prev,
                status: 'error'
            }));
        }
    }, [endpoint, authToken, campusId, autoReconnect, maxReconnectAttempts, calculateReconnectDelay, connectionState.reconnectAttempts, addEvent, log]);
    const reconnect = useCallback(() => {
        log('Manual reconnect requested');
        disconnect();
        setTimeout(connect, 100); // Brief delay to ensure cleanup
    }, [disconnect, connect, log]);
    const clearEvents = useCallback(() => {
        setEvents([]);
    }, []);
    const clearNewPostsIndicator = useCallback(() => {
        setConnectionState(prev => ({
            ...prev,
            newPostsCount: 0
        }));
    }, []);
    const subscribe = useCallback((eventType, callback) => {
        const subscribers = subscribersRef.current.get(eventType) || new Set();
        subscribers.add(callback);
        subscribersRef.current.set(eventType, subscribers);
        // Return unsubscribe function
        return () => {
            const currentSubscribers = subscribersRef.current.get(eventType);
            if (currentSubscribers) {
                currentSubscribers.delete(callback);
                if (currentSubscribers.size === 0) {
                    subscribersRef.current.delete(eventType);
                }
            }
        };
    }, []);
    // Auto-connect on mount
    useEffect(() => {
        connect();
        return disconnect;
    }, [connect, disconnect]);
    // Cleanup on unmount
    useEffect(() => {
        return () => {
            disconnect();
        };
    }, [disconnect]);
    return {
        connectionState,
        events,
        clearEvents,
        reconnect,
        disconnect,
        clearNewPostsIndicator,
        subscribe
    };
}
//# sourceMappingURL=use-feed-sse.js.map