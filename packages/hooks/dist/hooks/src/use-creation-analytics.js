import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "./use-auth";
import { createAnalyticsEvent, shouldTrackEvent, batchAnalyticsEvents, logger, } from "@hive/core";
export const useCreationAnalytics = (options = {}) => {
    const authResult = useAuth();
    const user = authResult.user;
    const { toolId, spaceId, batchSize = 100, flushInterval = 30000, // 30 seconds
    enableDebugLogging = false, } = options;
    // Session management
    const [sessionId] = useState(() => crypto.randomUUID());
    const [sessionStartTime] = useState(() => Date.now());
    const [isSessionActive, setIsSessionActive] = useState(true);
    // Event batching
    const eventQueue = useRef([]);
    const flushTimer = useRef();
    const lastFlushTime = useRef(Date.now());
    // User preferences
    const [userPreferences, setUserPreferences] = useState({});
    // Context tracking
    const [currentContext, setCurrentContext] = useState({
        toolId,
        spaceId,
    });
    // Load user preferences
    useEffect(() => {
        const loadPreferences = async () => {
            if (!user)
                return;
            try {
                // In a real implementation, fetch from user profile or settings
                const prefs = localStorage.getItem(`analytics_prefs_${user.uid}`);
                if (prefs) {
                    const parsedPrefs = JSON.parse(prefs);
                    setUserPreferences(parsedPrefs);
                }
            }
            catch (error) {
                logger.error("Failed to load analytics preferences:", error);
            }
        };
        loadPreferences();
    }, [user]);
    // Flush events to analytics service
    const flushEvents = useCallback(async (force = false) => {
        if (eventQueue.current.length === 0)
            return;
        const now = Date.now();
        const timeSinceLastFlush = now - lastFlushTime.current;
        if (!force &&
            timeSinceLastFlush < flushInterval &&
            eventQueue.current.length < batchSize) {
            return;
        }
        const eventsToFlush = [...eventQueue.current];
        eventQueue.current = [];
        lastFlushTime.current = now;
        try {
            const batches = batchAnalyticsEvents(eventsToFlush, batchSize);
            for (const batch of batches) {
                // Send to analytics service
                const idToken = user ? await user.getIdToken() : "";
                logger.debug("Flushing creation analytics batch", {
                    batchSize: batch.length,
                    toolId: currentContext.toolId,
                    spaceId: currentContext.spaceId,
                });
                await fetch("/api/analytics/creation", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${idToken}`,
                    },
                    body: JSON.stringify({ events: batch }),
                });
                logger.info("Creation analytics batch flushed", {
                    batchSize: batch.length,
                    toolId: currentContext.toolId,
                    spaceId: currentContext.spaceId,
                });
            }
        }
        catch (error) {
            logger.error("Failed to flush analytics events:", error);
            // Re-queue events on failure
            eventQueue.current.unshift(...eventsToFlush);
        }
    }, [user, batchSize, flushInterval, enableDebugLogging]);
    // Auto-flush timer
    useEffect(() => {
        flushTimer.current = setInterval(() => {
            void flushEvents();
        }, flushInterval);
        return () => {
            if (flushTimer.current) {
                clearInterval(flushTimer.current);
            }
        };
    }, [flushEvents, flushInterval]);
    // Flush on unmount
    useEffect(() => {
        return () => {
            void flushEvents(true);
        };
    }, [flushEvents]);
    // Track event
    const trackEvent = useCallback((eventType, metadata, context) => {
        if (!shouldTrackEvent(eventType, userPreferences)) {
            logger.debug("Event tracking skipped", {
                eventType,
                reason: "userPreferences",
            });
            return;
        }
        const event = createAnalyticsEvent(eventType, {
            userId: user?.uid,
            sessionId,
            toolId: context?.toolId || currentContext.toolId,
            elementId: context?.elementId || currentContext.elementId,
            metadata: {
                ...metadata,
                // Add context metadata
                toolName: context?.toolName || currentContext.toolName,
                toolVersion: context?.toolVersion || currentContext.toolVersion,
                toolStatus: context?.toolStatus || currentContext.toolStatus,
                spaceId: context?.spaceId || currentContext.spaceId,
                isSpaceTool: context?.isSpaceTool || currentContext.isSpaceTool,
                elementType: context?.elementType || currentContext.elementType,
                // Session metadata
                sessionDuration: Date.now() - sessionStartTime,
                isSessionActive,
                // Privacy metadata
                anonymized: userPreferences.anonymizeData || false,
            },
        });
        // Apply privacy settings
        if (userPreferences.anonymizeData) {
            event.userIdHash = undefined;
            event.anonymized = true;
            logger.debug("Event anonymized per user preferences");
        }
        eventQueue.current.push(event);
        logger.debug("Creation event tracked", {
            eventType,
            sessionId,
            toolId: event.toolId,
            elementId: event.elementId,
        });
        // Flush if queue is full
        if (eventQueue.current.length >= batchSize) {
            logger.debug("Event queue full, flushing events", {
                queueSize: eventQueue.current.length,
                batchSize,
            });
            void flushEvents();
        }
    }, [
        user,
        sessionId,
        sessionStartTime,
        isSessionActive,
        currentContext,
        userPreferences,
        batchSize,
        flushEvents,
    ]);
    // Update context
    const updateContext = useCallback((context) => {
        setCurrentContext((prev) => ({ ...prev, ...context }));
    }, []);
    // Builder session tracking
    const startBuilderSession = useCallback((toolId, toolName) => {
        updateContext({ toolId, toolName });
        logger.debug("Starting builder session", { toolId, toolName });
        trackEvent("builder_session_start", {
            toolId,
            toolName,
            userAgent: navigator.userAgent,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
            },
        });
        setIsSessionActive(true);
    }, [trackEvent, updateContext]);
    const endBuilderSession = useCallback((exitReason = "abandon") => {
        const sessionDuration = (Date.now() - sessionStartTime) / 1000; // seconds
        logger.debug("Ending builder session", {
            exitReason,
            sessionDuration,
            toolId: currentContext.toolId,
        });
        trackEvent("builder_session_end", {
            exitReason,
            sessionDuration,
            toolId: currentContext.toolId,
            toolName: currentContext.toolName,
        });
        setIsSessionActive(false);
    }, [trackEvent, sessionStartTime, currentContext]);
    // Tool lifecycle events
    const trackToolCreated = useCallback((toolData) => {
        updateContext({
            toolId: toolData.toolId,
            toolName: toolData.toolName,
            toolStatus: "draft",
        });
        trackEvent("tool_created", {
            hasDescription: toolData.hasDescription,
            initialElementsCount: toolData.initialElementsCount,
            creationSource: toolData.creationSource,
            templateUsed: toolData.templateUsed,
        });
    }, [trackEvent, updateContext]);
    const trackToolUpdated = useCallback((updateData) => {
        trackEvent("tool_updated", updateData);
    }, [trackEvent]);
    const trackToolPublished = useCallback((toolData) => {
        updateContext({ toolStatus: "published" });
        trackEvent("tool_published", {
            elementsCount: toolData.elementsCount,
            finalVersion: toolData.finalVersion,
            buildDuration: (Date.now() - sessionStartTime) / 1000,
        });
    }, [trackEvent, updateContext, sessionStartTime]);
    // Element interaction events
    const trackElementAdded = useCallback((elementData) => {
        trackEvent("element_added", elementData, {
            elementId: elementData.elementId,
            elementType: elementData.elementType,
        });
    }, [trackEvent]);
    const trackElementConfigured = useCallback((configData) => {
        trackEvent("element_configured", configData, {
            elementId: configData.elementId,
            elementType: configData.elementType,
        });
    }, [trackEvent]);
    const trackElementRemoved = useCallback((elementData) => {
        trackEvent("element_removed", elementData, {
            elementId: elementData.elementId,
            elementType: elementData.elementType,
        });
    }, [trackEvent]);
    // Builder interaction events
    const trackCanvasModeChanged = useCallback((mode) => {
        trackEvent("canvas_mode_changed", {
            mode,
            previousMode: currentContext.toolStatus,
        });
    }, [trackEvent, currentContext]);
    const trackDeviceModeChanged = useCallback((deviceMode) => {
        trackEvent("device_mode_changed", { deviceMode });
    }, [trackEvent]);
    const trackElementLibrarySearched = useCallback((searchQuery, resultsCount) => {
        trackEvent("element_library_searched", { searchQuery, resultsCount });
    }, [trackEvent]);
    // Tool usage events (for end users)
    const trackToolInstanceOpened = useCallback((instanceData) => {
        trackEvent("tool_instance_opened", instanceData, {
            toolId: instanceData.toolId,
        });
    }, [trackEvent]);
    const trackToolInstanceSubmitted = useCallback((submissionData) => {
        trackEvent("tool_instance_submitted", submissionData, {
            toolId: submissionData.toolId,
        });
    }, [trackEvent]);
    // Privacy controls
    const updatePrivacyPreferences = useCallback((preferences) => {
        setUserPreferences((prev) => ({ ...prev, ...preferences }));
        // Save to localStorage
        if (user) {
            localStorage.setItem(`analytics_prefs_${user.uid}`, JSON.stringify({ ...userPreferences, ...preferences }));
        }
    }, [user, userPreferences]);
    return {
        // Session management
        sessionId,
        isSessionActive,
        startBuilderSession,
        endBuilderSession,
        // Context management
        updateContext,
        currentContext,
        // Event tracking
        trackEvent,
        trackToolCreated,
        trackToolUpdated,
        trackToolPublished,
        trackElementAdded,
        trackElementConfigured,
        trackElementRemoved,
        trackCanvasModeChanged,
        trackDeviceModeChanged,
        trackElementLibrarySearched,
        trackToolInstanceOpened,
        trackToolInstanceSubmitted,
        // Privacy controls
        userPreferences,
        updatePrivacyPreferences,
        // Utility
        flushEvents,
        queueSize: eventQueue.current.length,
    };
};
//# sourceMappingURL=use-creation-analytics.js.map