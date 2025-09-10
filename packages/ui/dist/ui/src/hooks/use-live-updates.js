'use client';
import { useState, useEffect, useRef } from 'react';
// Generic real-time hook for any Firebase collection
export function useFirebaseRealtime(collectionName, filters, orderByField, limitCount, dependencies = []) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const unsubscribeRef = useRef(null);
    useEffect(() => {
        // Clean up previous listener
        if (unsubscribeRef.current) {
            unsubscribeRef.current();
        }
        setLoading(true);
        setError(null);
        try {
            // This is a placeholder - in real implementation would use actual Firebase instance
            // For now, simulate real-time updates with periodic checks
            const interval = setInterval(() => {
                // Trigger re-fetch from parent component
                setData(current => [...current]); // This will cause re-render to fetch fresh data
            }, 5000); // Check every 5 seconds
            setLoading(false);
            // Store cleanup function
            unsubscribeRef.current = () => {
                clearInterval(interval);
            };
        }
        catch (err) {
            setError(err);
            setLoading(false);
        }
        // Return cleanup function
        return () => {
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
            }
        };
    }, dependencies);
    return { data, loading, error };
}
// Specific hooks for common use cases
export function useRealtimePosts(spaceId) {
    return useFirebaseRealtime('posts', [{ field: 'spaceId', operator: '==', value: spaceId }], 'createdAt', 50, [spaceId]);
}
export function useRealtimeMembers(spaceId) {
    return useFirebaseRealtime('members', [{ field: 'spaceId', operator: '==', value: spaceId }], 'joinedAt', 100, [spaceId]);
}
export function useRealtimeEvents(spaceId) {
    return useFirebaseRealtime('events', [{ field: 'spaceId', operator: '==', value: spaceId }], 'startTime', 20, [spaceId]);
}
// Live typing indicators
export function useTypingIndicators(spaceId, userId) {
    const [typingUsers, setTypingUsers] = useState([]);
    const typingTimeoutRef = useRef(null);
    const startTyping = () => {
        // In real implementation, would send typing indicator to Firebase
        console.log('User started typing in space:', spaceId);
    };
    const stopTyping = () => {
        // In real implementation, would remove typing indicator from Firebase
        console.log('User stopped typing in space:', spaceId);
    };
    const handleTyping = () => {
        startTyping();
        // Auto-stop after 3 seconds of inactivity
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            stopTyping();
        }, 3000);
    };
    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            stopTyping();
        };
    }, []);
    return {
        typingUsers,
        handleTyping,
        stopTyping
    };
}
// Live presence indicators
export function usePresence(spaceId, userId) {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [lastSeen, setLastSeen] = useState({});
    useEffect(() => {
        // Simulate presence updates
        const interval = setInterval(() => {
            // In real implementation, would listen to Firebase presence
            setLastSeen(current => ({
                ...current,
                [userId]: new Date()
            }));
        }, 30000); // Update every 30 seconds
        return () => clearInterval(interval);
    }, [userId]);
    const updatePresence = () => {
        // In real implementation, would update Firebase presence
        setLastSeen(current => ({
            ...current,
            [userId]: new Date()
        }));
    };
    return {
        onlineUsers,
        lastSeen,
        updatePresence
    };
}
// Optimistic updates for better UX
export function useOptimisticUpdates(initialData) {
    const [data, setData] = useState(initialData);
    const [pendingUpdates, setPendingUpdates] = useState(new Set());
    const addOptimisticItem = (item, operation) => {
        // Add immediately to UI
        setData(current => [item, ...current]);
        setPendingUpdates(current => new Set([...current, item.id]));
        // Perform actual operation
        operation()
            .then(() => {
            // Remove from pending on success
            setPendingUpdates(current => {
                const newSet = new Set(current);
                newSet.delete(item.id);
                return newSet;
            });
        })
            .catch(() => {
            // Remove from UI on failure
            setData(current => current.filter(i => i.id !== item.id));
            setPendingUpdates(current => {
                const newSet = new Set(current);
                newSet.delete(item.id);
                return newSet;
            });
        });
    };
    const removeOptimisticItem = (id, operation) => {
        // Remove immediately from UI
        const originalData = [...data];
        setData(current => current.filter(item => item.id !== id));
        setPendingUpdates(current => new Set([...current, id]));
        // Perform actual operation
        operation()
            .then(() => {
            // Confirm removal
            setPendingUpdates(current => {
                const newSet = new Set(current);
                newSet.delete(id);
                return newSet;
            });
        })
            .catch(() => {
            // Restore on failure
            setData(originalData);
            setPendingUpdates(current => {
                const newSet = new Set(current);
                newSet.delete(id);
                return newSet;
            });
        });
    };
    return {
        data,
        pendingUpdates,
        addOptimisticItem,
        removeOptimisticItem,
        setData
    };
}
// Auto-refresh hook for keeping data fresh
export function useAutoRefresh(refreshFunction, intervalMs = 30000, enabled = true) {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [lastRefresh, setLastRefresh] = useState(null);
    const intervalRef = useRef(null);
    useEffect(() => {
        if (!enabled) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            return;
        }
        const performRefresh = async () => {
            if (isRefreshing)
                return;
            setIsRefreshing(true);
            try {
                await refreshFunction();
                setLastRefresh(new Date());
            }
            catch (error) {
                console.error('Auto-refresh failed:', error);
            }
            finally {
                setIsRefreshing(false);
            }
        };
        // Initial refresh
        performRefresh();
        // Set up interval
        intervalRef.current = setInterval(performRefresh, intervalMs);
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [refreshFunction, intervalMs, enabled, isRefreshing]);
    const manualRefresh = async () => {
        if (isRefreshing)
            return;
        setIsRefreshing(true);
        try {
            await refreshFunction();
            setLastRefresh(new Date());
        }
        catch (error) {
            console.error('Manual refresh failed:', error);
        }
        finally {
            setIsRefreshing(false);
        }
    };
    return {
        isRefreshing,
        lastRefresh,
        manualRefresh
    };
}
// Live activity feed
export function useLiveActivityFeed(userId) {
    const [activities, setActivities] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    useEffect(() => {
        // Simulate live activity updates
        const interval = setInterval(() => {
            const activities = [
                { id: '1', type: 'post', message: 'New post in CS Study Group', timestamp: new Date() },
                { id: '2', type: 'comment', message: 'Someone commented on your post', timestamp: new Date() },
                { id: '3', type: 'event', message: 'Event reminder: Team meeting in 1 hour', timestamp: new Date() }
            ];
            setActivities(activities);
            setUnreadCount(activities.length);
        }, 10000); // Update every 10 seconds
        return () => clearInterval(interval);
    }, [userId]);
    const markAsRead = () => {
        setUnreadCount(0);
    };
    return {
        activities,
        unreadCount,
        markAsRead
    };
}
//# sourceMappingURL=use-live-updates.js.map