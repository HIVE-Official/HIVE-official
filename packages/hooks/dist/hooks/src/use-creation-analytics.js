"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCreationAnalytics = void 0;
const react_1 = require("react");
const auth_logic_1 = require("@hive/auth-logic");
const core_1 = require("@hive/core");
const useCreationAnalytics = (options = {}) => {
    const authResult = (0, auth_logic_1.useAuth)();
    const user = authResult.user;
    const { toolId, spaceId, batchSize = 100, flushInterval = 30000, // 30 seconds
    enableDebugLogging = false, } = options;
    // Session management
    const [sessionId] = (0, react_1.useState)(() => crypto.randomUUID());
    const [sessionStartTime] = (0, react_1.useState)(() => Date.now());
    const [isSessionActive, setIsSessionActive] = (0, react_1.useState)(true);
    // Event batching
    const eventQueue = (0, react_1.useRef)([]);
    const flushTimer = (0, react_1.useRef)();
    const lastFlushTime = (0, react_1.useRef)(Date.now());
    // User preferences
    const [userPreferences, setUserPreferences] = (0, react_1.useState)({});
    // Context tracking
    const [currentContext, setCurrentContext] = (0, react_1.useState)({
        toolId,
        spaceId,
    });
    // Load user preferences
    (0, react_1.useEffect)(() => {
        const loadPreferences = () => {
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
                console.error("Failed to load analytics preferences:", error);
            }
        };
        loadPreferences();
    }, [user]);
    // Flush events to analytics service
    const flushEvents = (0, react_1.useCallback)(async (force = false) => {
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
            const batches = (0, core_1.batchAnalyticsEvents)(eventsToFlush, batchSize);
            for (const batch of batches) {
                // Send to analytics service
                const idToken = user ? await user.getIdToken() : "";
                await fetch("/api/analytics/creation", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${idToken}`,
                    },
                    body: JSON.stringify({ events: batch }),
                });
                if (enableDebugLogging) {
                    console.log(`Flushed ${batch.length} creation analytics events`);
                }
            }
        }
        catch (error) {
            console.error("Failed to flush analytics events:", error);
            // Re-queue events on failure
            eventQueue.current.unshift(...eventsToFlush);
        }
    }, [user, batchSize, flushInterval, enableDebugLogging]);
    // Auto-flush timer
    (0, react_1.useEffect)(() => {
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
    (0, react_1.useEffect)(() => {
        return () => {
            void flushEvents(true);
        };
    }, [flushEvents]);
    // Track event
    const trackEvent = (0, react_1.useCallback)((eventType, metadata, context) => {
        if (!(0, core_1.shouldTrackEvent)(eventType, userPreferences)) {
            return;
        }
        const event = (0, core_1.createAnalyticsEvent)(eventType, {
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
        }
        eventQueue.current.push(event);
        if (enableDebugLogging) {
            console.log("Tracked creation event:", eventType, metadata);
        }
        // Flush if queue is full
        if (eventQueue.current.length >= batchSize) {
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
        enableDebugLogging,
        flushEvents,
    ]);
    // Update context
    const updateContext = (0, react_1.useCallback)((context) => {
        setCurrentContext((prev) => ({ ...prev, ...context }));
    }, []);
    // Builder session tracking
    const startBuilderSession = (0, react_1.useCallback)((toolId, toolName) => {
        updateContext({ toolId, toolName });
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
    const endBuilderSession = (0, react_1.useCallback)((exitReason = "abandon") => {
        const sessionDuration = (Date.now() - sessionStartTime) / 1000; // seconds
        trackEvent("builder_session_end", {
            sessionDuration,
            exitReason,
            elementsAdded: 0, // Would be tracked separately
            elementsRemoved: 0,
            elementsConfigured: 0,
        });
        setIsSessionActive(false);
        void flushEvents(true); // Force flush on session end
    }, [trackEvent, sessionStartTime, flushEvents]);
    // Tool lifecycle events
    const trackToolCreated = (0, react_1.useCallback)((toolData) => {
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
    const trackToolUpdated = (0, react_1.useCallback)((updateData) => {
        trackEvent("tool_updated", updateData);
    }, [trackEvent]);
    const trackToolPublished = (0, react_1.useCallback)((toolData) => {
        updateContext({ toolStatus: "published" });
        trackEvent("tool_published", {
            elementsCount: toolData.elementsCount,
            finalVersion: toolData.finalVersion,
            buildDuration: (Date.now() - sessionStartTime) / 1000,
        });
    }, [trackEvent, updateContext, sessionStartTime]);
    // Element interaction events
    const trackElementAdded = (0, react_1.useCallback)((elementData) => {
        trackEvent("element_added", elementData, {
            elementId: elementData.elementId,
            elementType: elementData.elementType,
        });
    }, [trackEvent]);
    const trackElementConfigured = (0, react_1.useCallback)((configData) => {
        trackEvent("element_configured", configData, {
            elementId: configData.elementId,
            elementType: configData.elementType,
        });
    }, [trackEvent]);
    const trackElementRemoved = (0, react_1.useCallback)((elementData) => {
        trackEvent("element_removed", elementData, {
            elementId: elementData.elementId,
            elementType: elementData.elementType,
        });
    }, [trackEvent]);
    // Builder interaction events
    const trackCanvasModeChanged = (0, react_1.useCallback)((mode) => {
        trackEvent("canvas_mode_changed", {
            mode,
            previousMode: currentContext.toolStatus,
        });
    }, [trackEvent, currentContext]);
    const trackDeviceModeChanged = (0, react_1.useCallback)((deviceMode) => {
        trackEvent("device_mode_changed", { deviceMode });
    }, [trackEvent]);
    const trackElementLibrarySearched = (0, react_1.useCallback)((searchQuery, resultsCount) => {
        trackEvent("element_library_searched", { searchQuery, resultsCount });
    }, [trackEvent]);
    // Tool usage events (for end users)
    const trackToolInstanceOpened = (0, react_1.useCallback)((instanceData) => {
        trackEvent("tool_instance_opened", instanceData, {
            toolId: instanceData.toolId,
        });
    }, [trackEvent]);
    const trackToolInstanceSubmitted = (0, react_1.useCallback)((submissionData) => {
        trackEvent("tool_instance_submitted", submissionData, {
            toolId: submissionData.toolId,
        });
    }, [trackEvent]);
    // Privacy controls
    const updatePrivacyPreferences = (0, react_1.useCallback)((preferences) => {
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
exports.useCreationAnalytics = useCreationAnalytics;
//# sourceMappingURL=use-creation-analytics.js.map