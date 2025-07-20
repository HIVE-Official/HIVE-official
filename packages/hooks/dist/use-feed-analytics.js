"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFeedAnalytics = void 0;
const react_1 = require("react");
const use_analytics_1 = require("./use-analytics");
const core_1 = require("@hive/core");
const useFeedAnalytics = ({ spaceId, userId, config = {}, }) => {
    const { track } = (0, use_analytics_1.useAnalytics)();
    const [isSessionActive, setIsSessionActive] = (0, react_1.useState)(false);
    // Session and heartbeat management
    const sessionIdRef = (0, react_1.useRef)();
    const heartbeatIntervalRef = (0, react_1.useRef)();
    const lastInteractionRef = (0, react_1.useRef)(new Date());
    const activeTimeRef = (0, react_1.useRef)(0);
    const lastHeartbeatRef = (0, react_1.useRef)(new Date());
    // Event batching
    const eventBatchRef = (0, react_1.useRef)([]);
    const batchTimeoutRef = (0, react_1.useRef)();
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
    const generateSessionId = (0, react_1.useCallback)(() => {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }, []);
    // Flush event batch
    const flushEvents = (0, react_1.useCallback)(() => {
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
                    userId: analyticsConfig.hashUserIds ? (0, core_1.hashUserIdForFeed)(userId) : userId,
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
    const addEventToBatch = (0, react_1.useCallback)((event) => {
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
    const trackInteraction = (0, react_1.useCallback)(() => {
        lastInteractionRef.current = new Date();
    }, []);
    // Heartbeat function
    const sendHeartbeat = (0, react_1.useCallback)(() => {
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
        lastHeartbeatRef.current = now;
        // Send heartbeat event
        const heartbeatEvent = (0, core_1.createFeedEvent)('space_heartbeat', {
            spaceId,
            userId: analyticsConfig.hashUserIds ? (0, core_1.hashUserIdForFeed)(userId) : userId,
            metadata: {
                sessionId: sessionIdRef.current,
                activeTime: activeTimeRef.current,
                tabVisible: isActive,
                scrollPosition: window.scrollY,
                lastInteraction: lastInteractionRef.current,
            },
        });
        addEventToBatch(heartbeatEvent);
    }, [isSessionActive, analyticsConfig.hashUserIds, userId, spaceId, addEventToBatch]);
    // Start session
    const startSession = (0, react_1.useCallback)(() => {
        if (isSessionActive)
            return;
        sessionIdRef.current = generateSessionId();
        setIsSessionActive(true);
        lastInteractionRef.current = new Date();
        lastHeartbeatRef.current = new Date();
        activeTimeRef.current = 0;
        // Start heartbeat
        heartbeatIntervalRef.current = setInterval(sendHeartbeat, 30000); // Every 30 seconds
        // Track session start with space heartbeat
        const sessionStartEvent = (0, core_1.createFeedEvent)('space_heartbeat', {
            spaceId,
            userId: analyticsConfig.hashUserIds ? (0, core_1.hashUserIdForFeed)(userId) : userId,
            metadata: {
                sessionId: sessionIdRef.current,
                activeTime: 0,
                tabVisible: true,
                scrollPosition: 0,
                lastInteraction: lastInteractionRef.current,
            },
        });
        addEventToBatch(sessionStartEvent);
    }, [isSessionActive, generateSessionId, sendHeartbeat, spaceId, userId, analyticsConfig.hashUserIds, addEventToBatch]);
    // End session
    const endSession = (0, react_1.useCallback)(() => {
        if (!isSessionActive || !sessionIdRef.current)
            return;
        // Clear heartbeat
        if (heartbeatIntervalRef.current) {
            clearInterval(heartbeatIntervalRef.current);
            heartbeatIntervalRef.current = undefined;
        }
        // Track session end with final heartbeat
        const sessionEndEvent = (0, core_1.createFeedEvent)('space_heartbeat', {
            spaceId,
            userId: analyticsConfig.hashUserIds ? (0, core_1.hashUserIdForFeed)(userId) : userId,
            metadata: {
                sessionId: sessionIdRef.current,
                activeTime: activeTimeRef.current,
                tabVisible: false,
                scrollPosition: window.scrollY,
                lastInteraction: lastInteractionRef.current,
            },
        });
        addEventToBatch(sessionEndEvent);
        // Flush remaining events
        flushEvents();
        setIsSessionActive(false);
        sessionIdRef.current = undefined;
    }, [isSessionActive, spaceId, userId, analyticsConfig.hashUserIds, addEventToBatch, flushEvents]);
    // Event tracking functions
    const trackPostCreated = (0, react_1.useCallback)((data) => {
        trackInteraction();
        const event = (0, core_1.createFeedEvent)('post_created', {
            postId: data.postId,
            spaceId,
            userId: analyticsConfig.hashUserIds ? (0, core_1.hashUserIdForFeed)(userId) : userId,
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
    }, [trackInteraction, spaceId, userId, analyticsConfig.hashUserIds, addEventToBatch]);
    const trackPostReacted = (0, react_1.useCallback)((data) => {
        trackInteraction();
        const event = (0, core_1.createFeedEvent)('post_reacted', {
            postId: data.postId,
            spaceId,
            userId: analyticsConfig.hashUserIds ? (0, core_1.hashUserIdForFeed)(userId) : userId,
            metadata: {
                reaction: data.reaction,
                action: data.action,
                postAge: data.postAge,
                authorId: data.authorId,
                isOwnPost: data.isOwnPost,
            },
        });
        addEventToBatch(event);
    }, [trackInteraction, spaceId, userId, analyticsConfig.hashUserIds, addEventToBatch]);
    const trackPostViewed = (0, react_1.useCallback)((data) => {
        trackInteraction();
        const event = (0, core_1.createFeedEvent)('post_viewed', {
            postId: data.postId,
            spaceId,
            userId: analyticsConfig.hashUserIds ? (0, core_1.hashUserIdForFeed)(userId) : userId,
            metadata: {
                viewDuration: data.viewDuration,
                scrolledToEnd: data.scrolledToEnd,
                authorId: data.authorId,
                postType: data.postType,
                postAge: data.postAge,
            },
        });
        addEventToBatch(event);
    }, [trackInteraction, spaceId, userId, analyticsConfig.hashUserIds, addEventToBatch]);
    const trackPostEdited = (0, react_1.useCallback)((data) => {
        trackInteraction();
        const event = (0, core_1.createFeedEvent)('post_edited', {
            postId: data.postId,
            spaceId,
            userId: analyticsConfig.hashUserIds ? (0, core_1.hashUserIdForFeed)(userId) : userId,
            metadata: {
                editTime: data.editTime,
                contentLengthBefore: data.contentLengthBefore,
                contentLengthAfter: data.contentLengthAfter,
                editReason: data.editReason,
            },
        });
        addEventToBatch(event);
    }, [trackInteraction, spaceId, userId, analyticsConfig.hashUserIds, addEventToBatch]);
    const trackPostDeleted = (0, react_1.useCallback)((data) => {
        trackInteraction();
        const event = (0, core_1.createFeedEvent)('post_deleted', {
            postId: data.postId,
            spaceId,
            userId: analyticsConfig.hashUserIds ? (0, core_1.hashUserIdForFeed)(userId) : userId,
            metadata: {
                deletedBy: data.deletedBy,
                postAge: data.postAge,
                hadReactions: data.hadReactions,
                reactionCount: data.reactionCount,
                deleteReason: data.deleteReason,
            },
        });
        addEventToBatch(event);
    }, [trackInteraction, spaceId, userId, analyticsConfig.hashUserIds, addEventToBatch]);
    const trackSpaceJoined = (0, react_1.useCallback)((data) => {
        trackInteraction();
        const event = (0, core_1.createFeedEvent)('space_joined', {
            spaceId,
            userId: analyticsConfig.hashUserIds ? (0, core_1.hashUserIdForFeed)(userId) : userId,
            metadata: {
                joinMethod: data.joinMethod,
                referrerSpaceId: data.referrerSpaceId,
                invitedBy: data.invitedBy,
            },
        });
        addEventToBatch(event);
    }, [trackInteraction, spaceId, userId, analyticsConfig.hashUserIds, addEventToBatch]);
    const trackSpaceLeft = (0, react_1.useCallback)((data) => {
        trackInteraction();
        const event = (0, core_1.createFeedEvent)('space_left', {
            spaceId,
            userId: analyticsConfig.hashUserIds ? (0, core_1.hashUserIdForFeed)(userId) : userId,
            metadata: {
                membershipDuration: data.membershipDuration,
                postsCreated: data.postsCreated,
                reactionsGiven: data.reactionsGiven,
                lastActiveAt: data.lastActiveAt,
                leaveReason: data.leaveReason,
            },
        });
        addEventToBatch(event);
    }, [trackInteraction, spaceId, userId, analyticsConfig.hashUserIds, addEventToBatch]);
    const trackBuilderAction = (0, react_1.useCallback)((data) => {
        trackInteraction();
        const event = (0, core_1.createFeedEvent)('builder_action', {
            spaceId,
            userId: analyticsConfig.hashUserIds ? (0, core_1.hashUserIdForFeed)(userId) : userId,
            metadata: {
                action: data.action,
                targetId: data.targetId,
                targetType: data.targetType,
                reason: data.reason,
            },
        });
        addEventToBatch(event);
    }, [trackInteraction, spaceId, userId, analyticsConfig.hashUserIds, addEventToBatch]);
    const trackFeedViewed = (0, react_1.useCallback)((data) => {
        trackInteraction();
        const event = (0, core_1.createFeedEvent)('space_feed_viewed', {
            spaceId,
            userId: analyticsConfig.hashUserIds ? (0, core_1.hashUserIdForFeed)(userId) : userId,
            metadata: {
                postsVisible: data.postsVisible,
                scrollDepth: data.scrollDepth,
                timeSpent: data.timeSpent,
                deviceType: data.deviceType,
            },
        });
        addEventToBatch(event);
    }, [trackInteraction, spaceId, userId, analyticsConfig.hashUserIds, addEventToBatch]);
    // Auto-start session on mount
    (0, react_1.useEffect)(() => {
        startSession();
        // Handle visibility change
        const handleVisibilityChange = () => {
            if (document.hidden) {
                endSession();
            }
            else {
                startSession();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        // Cleanup on unmount
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            endSession();
        };
    }, [startSession, endSession]);
    return {
        // Event tracking
        trackPostCreated,
        trackPostReacted,
        trackPostViewed,
        trackPostEdited,
        trackPostDeleted,
        trackSpaceJoined,
        trackSpaceLeft,
        trackBuilderAction,
        trackFeedViewed,
        // Session management
        startSession,
        endSession,
        isSessionActive,
    };
};
exports.useFeedAnalytics = useFeedAnalytics;
//# sourceMappingURL=use-feed-analytics.js.map