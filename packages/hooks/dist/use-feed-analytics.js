import { useEffect, useRef, useCallback, useState } from 'react';
import { useAnalytics } from './use-analytics';
import { createFeedEvent, hashUserIdForFeed } from '@hive/core';
export const useFeedAnalytics = ({ spaceId, userId, config = {}, }) => {
    const { track } = useAnalytics();
    const [isSessionActive, setIsSessionActive] = useState(false);
    // Session and heartbeat management
    const sessionIdRef = useRef();
    const heartbeatIntervalRef = useRef();
    const lastInteractionRef = useRef(new Date());
    const activeTimeRef = useRef(0);
    const lastHeartbeatRef = useRef(new Date());
    // Event batching
    const eventBatchRef = useRef([]);
    const batchTimeoutRef = useRef();
    // Configuration with defaults
    const analyticsConfig = {
        batchSize: 100,
        flushInterval: 30000, // 30 seconds
        hashUserIds: true,
        retentionDays: 90,
        sampleRate: 1,
        dataset: 'hive_analytics',
        feedEventsTable: 'feed_events',
        spaceMetricsTable: 'space_metrics',
        userBehaviorTable: 'user_behavior',
        ...config,
    };
    // Generate session ID
    const generateSessionId = useCallback(() => {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }, []);
    // Flush event batch
    const flushEvents = useCallback(async () => {
        if (eventBatchRef.current.length === 0)
            return;
        const events = [...eventBatchRef.current];
        eventBatchRef.current = [];
        try {
            // Send to analytics pipeline (same as Team 1)
            track({
                name: 'feed_analytics_batch',
                properties: {
                    events,
                    spaceId,
                    userId: analyticsConfig.hashUserIds ? hashUserIdForFeed(userId) : userId,
                    batchSize: events.length,
                    timestamp: new Date(),
                }
            });
        }
        catch (error) {
            console.error('Failed to flush analytics events:', error);
            // Re-add events to batch for retry
            eventBatchRef.current.unshift(...events);
        }
    }, [track, spaceId, userId, analyticsConfig.hashUserIds]);
    // Add event to batch
    const addEventToBatch = useCallback((event) => {
        // Apply sampling
        if (Math.random() > analyticsConfig.sampleRate)
            return;
        eventBatchRef.current.push(event);
        // Flush if batch is full
        if (eventBatchRef.current.length >= analyticsConfig.batchSize) {
            flushEvents();
        }
        // Set flush timeout if not already set
        if (!batchTimeoutRef.current) {
            batchTimeoutRef.current = setTimeout(() => {
                flushEvents();
                batchTimeoutRef.current = undefined;
            }, analyticsConfig.flushInterval);
        }
    }, [analyticsConfig.batchSize, analyticsConfig.sampleRate, analyticsConfig.flushInterval, flushEvents]);
    // Track user interaction
    const trackInteraction = useCallback(() => {
        lastInteractionRef.current = new Date();
    }, []);
    // Heartbeat function
    const sendHeartbeat = useCallback(() => {
        if (!isSessionActive || !sessionIdRef.current)
            return;
        const now = new Date();
        const timeSinceLastHeartbeat = now.getTime() - lastHeartbeatRef.current.getTime();
        const timeSinceLastInteraction = now.getTime() - lastInteractionRef.current.getTime();
        // Only count as active time if user interacted recently (within 30 seconds)
        const isActive = timeSinceLastInteraction < 30000;
        if (isActive) {
            activeTimeRef.current += Math.min(timeSinceLastHeartbeat, 30000);
        }
        const event = createFeedEvent('space_heartbeat', {
            spaceId,
            userId,
            metadata: {
                sessionId: sessionIdRef.current,
                activeTime: isActive ? Math.min(timeSinceLastHeartbeat, 30000) : 0,
                tabVisible: !document.hidden,
                scrollPosition: window.scrollY,
                lastInteraction: lastInteractionRef.current,
            },
        });
        addEventToBatch(event);
        lastHeartbeatRef.current = now;
    }, [isSessionActive, spaceId, userId, addEventToBatch]);
    // Start session
    const startSession = useCallback(() => {
        if (isSessionActive)
            return;
        sessionIdRef.current = generateSessionId();
        setIsSessionActive(true);
        lastInteractionRef.current = new Date();
        lastHeartbeatRef.current = new Date();
        activeTimeRef.current = 0;
        // Start heartbeat interval (every 30 seconds)
        heartbeatIntervalRef.current = setInterval(sendHeartbeat, 30000);
        // Track interaction events
        document.addEventListener('click', trackInteraction);
        document.addEventListener('keydown', trackInteraction);
        document.addEventListener('scroll', trackInteraction);
        document.addEventListener('mousemove', trackInteraction);
    }, [isSessionActive, generateSessionId, sendHeartbeat, trackInteraction]);
    // End session
    const endSession = useCallback(() => {
        if (!isSessionActive)
            return;
        // Send final heartbeat
        sendHeartbeat();
        // Clear interval and event listeners
        if (heartbeatIntervalRef.current) {
            clearInterval(heartbeatIntervalRef.current);
            heartbeatIntervalRef.current = undefined;
        }
        document.removeEventListener('click', trackInteraction);
        document.removeEventListener('keydown', trackInteraction);
        document.removeEventListener('scroll', trackInteraction);
        document.removeEventListener('mousemove', trackInteraction);
        // Flush remaining events
        flushEvents();
        setIsSessionActive(false);
        sessionIdRef.current = undefined;
    }, [isSessionActive, sendHeartbeat, trackInteraction, flushEvents]);
    // Event tracking functions
    const trackPostCreated = useCallback((data) => {
        const event = createFeedEvent('post_created', {
            spaceId,
            postId: data.postId,
            userId,
            metadata: {
                postType: data.postType,
                contentLength: data.contentLength,
                hasMentions: data.hasMentions,
                hasRichFormatting: data.hasRichFormatting,
                draftTime: data.draftTime,
                composerSource: 'inline',
            },
        });
        addEventToBatch(event);
        trackInteraction();
    }, [spaceId, userId, addEventToBatch, trackInteraction]);
    const trackPostReacted = useCallback((data) => {
        const event = createFeedEvent('post_reacted', {
            spaceId,
            postId: data.postId,
            userId,
            metadata: {
                reaction: data.reaction,
                action: data.action,
                postAge: data.postAge,
                authorId: data.authorId,
                isOwnPost: data.isOwnPost,
            },
        });
        addEventToBatch(event);
        trackInteraction();
    }, [spaceId, userId, addEventToBatch, trackInteraction]);
    const trackPostViewed = useCallback((data) => {
        const event = createFeedEvent('post_viewed', {
            spaceId,
            postId: data.postId,
            userId,
            metadata: {
                viewDuration: data.viewDuration,
                scrolledToEnd: data.scrolledToEnd,
                authorId: data.authorId,
                postType: data.postType,
                postAge: data.postAge,
            },
        });
        addEventToBatch(event);
    }, [spaceId, userId, addEventToBatch]);
    const trackPostEdited = useCallback((data) => {
        const event = createFeedEvent('post_edited', {
            spaceId,
            postId: data.postId,
            userId,
            metadata: {
                editTime: data.editTime,
                contentLengthBefore: data.contentLengthBefore,
                contentLengthAfter: data.contentLengthAfter,
                editReason: data.editReason,
            },
        });
        addEventToBatch(event);
        trackInteraction();
    }, [spaceId, userId, addEventToBatch, trackInteraction]);
    const trackPostDeleted = useCallback((data) => {
        const event = createFeedEvent('post_deleted', {
            spaceId,
            postId: data.postId,
            userId,
            metadata: {
                deletedBy: data.deletedBy,
                postAge: data.postAge,
                hadReactions: data.hadReactions,
                reactionCount: data.reactionCount,
                deleteReason: data.deleteReason,
            },
        });
        addEventToBatch(event);
        trackInteraction();
    }, [spaceId, userId, addEventToBatch, trackInteraction]);
    const trackSpaceJoined = useCallback((data) => {
        const event = createFeedEvent('space_joined', {
            spaceId,
            userId,
            metadata: {
                joinMethod: data.joinMethod,
                referrerSpaceId: data.referrerSpaceId,
                invitedBy: data.invitedBy,
            },
        });
        addEventToBatch(event);
        trackInteraction();
    }, [spaceId, userId, addEventToBatch, trackInteraction]);
    const trackSpaceLeft = useCallback((data) => {
        const event = createFeedEvent('space_left', {
            spaceId,
            userId,
            metadata: {
                membershipDuration: data.membershipDuration,
                postsCreated: data.postsCreated,
                reactionsGiven: data.reactionsGiven,
                lastActiveAt: data.lastActiveAt,
                leaveReason: data.leaveReason,
            },
        });
        addEventToBatch(event);
        trackInteraction();
    }, [spaceId, userId, addEventToBatch, trackInteraction]);
    const trackBuilderAction = useCallback((data) => {
        const event = createFeedEvent('builder_action', {
            spaceId,
            userId,
            metadata: {
                action: data.action,
                targetId: data.targetId,
                targetType: data.targetType,
                reason: data.reason,
            },
        });
        addEventToBatch(event);
        trackInteraction();
    }, [spaceId, userId, addEventToBatch, trackInteraction]);
    const trackFeedViewed = useCallback((data) => {
        const event = createFeedEvent('space_feed_viewed', {
            spaceId,
            userId,
            metadata: {
                postsVisible: data.postsVisible,
                scrollDepth: data.scrollDepth,
                timeSpent: data.timeSpent,
                deviceType: data.deviceType,
            },
        });
        addEventToBatch(event);
    }, [spaceId, userId, addEventToBatch]);
    // Cleanup on unmount
    useEffect(() => {
        return () => {
            endSession();
            if (batchTimeoutRef.current) {
                clearTimeout(batchTimeoutRef.current);
            }
        };
    }, [endSession]);
    // Handle page visibility changes
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                // Page is hidden, reduce heartbeat frequency or pause
                if (heartbeatIntervalRef.current) {
                    clearInterval(heartbeatIntervalRef.current);
                    heartbeatIntervalRef.current = setInterval(sendHeartbeat, 60000); // 1 minute when hidden
                }
            }
            else {
                // Page is visible, resume normal heartbeat
                if (heartbeatIntervalRef.current) {
                    clearInterval(heartbeatIntervalRef.current);
                    heartbeatIntervalRef.current = setInterval(sendHeartbeat, 30000); // 30 seconds when visible
                }
                trackInteraction();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [sendHeartbeat, trackInteraction]);
    return {
        trackPostCreated,
        trackPostReacted,
        trackPostViewed,
        trackPostEdited,
        trackPostDeleted,
        trackSpaceJoined,
        trackSpaceLeft,
        trackBuilderAction,
        trackFeedViewed,
        startSession,
        endSession,
        isSessionActive,
    };
};
//# sourceMappingURL=use-feed-analytics.js.map