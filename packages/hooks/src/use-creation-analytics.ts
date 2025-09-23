import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@hive/auth-logic";
import type { CreationAnalyticsEvent, CreationEventType } from "@hive/core";
import {
  createAnalyticsEvent,
  shouldTrackEvent,
  batchAnalyticsEvents,
} from "@hive/core";

import type { UseAuthReturn } from "@hive/auth-logic";

interface UseCreationAnalyticsOptions {
  toolId?: string;
  spaceId?: string;
  batchSize?: number;
  flushInterval?: number; // milliseconds
  enableDebugLogging?: boolean;
}

interface CreationAnalyticsContext {
  toolId?: string;
  toolName?: string;
  toolVersion?: string;
  toolStatus?: "draft" | "preview" | "published";
  spaceId?: string;
  isSpaceTool?: boolean;
  elementId?: string;
  elementType?: string;
}

export const useCreationAnalytics = (
  options: UseCreationAnalyticsOptions = {}
) => {
  const authResult: UseAuthReturn = useAuth();
  const user = authResult.user;
  const {
    toolId,
    spaceId,
    batchSize = 100,
    flushInterval = 30000, // 30 seconds
    enableDebugLogging = false,
  } = options;

  // Session management
  const [sessionId] = useState(() => crypto.randomUUID());
  const [sessionStartTime] = useState(() => Date.now());
  const [isSessionActive, setIsSessionActive] = useState(true);

  // Event batching
  const eventQueue = useRef<CreationAnalyticsEvent[]>([]);
  const flushTimer = useRef<NodeJS.Timeout | undefined>();
  const lastFlushTime = useRef(Date.now());

  // User preferences
  const [userPreferences, setUserPreferences] = useState<{
    analyticsOptOut?: boolean;
    anonymizeData?: boolean;
  }>({});

  // Context tracking
  const [currentContext, setCurrentContext] =
    useState<CreationAnalyticsContext>({
      toolId,
      spaceId,
    });

  // Load user preferences
  useEffect(() => {
    const loadPreferences = (): void => {
      if (!user) return;

      try {
        // In a real implementation, fetch from user profile or settings
        const prefs = localStorage.getItem(`analytics_prefs_${user.uid}`);
        if (prefs) {
          const parsedPrefs = JSON.parse(prefs) as {
            analyticsOptOut?: boolean;
            anonymizeData?: boolean;
          };
          setUserPreferences(parsedPrefs);
        }
      } catch (error) {
        console.error("Failed to load analytics preferences:", error);
      }
    };

    loadPreferences();
  }, [user]);

  // Flush events to analytics service
  const flushEvents = useCallback(
    async (force = false): Promise<void> => {
      if (eventQueue.current.length === 0) return;

      const now = Date.now();
      const timeSinceLastFlush = now - lastFlushTime.current;

      if (
        !force &&
        timeSinceLastFlush < flushInterval &&
        eventQueue.current.length < batchSize
      ) {
        return;
      }

      const eventsToFlush = [...eventQueue.current];
      eventQueue.current = [];
      lastFlushTime.current = now;

      try {
        const batches = batchAnalyticsEvents(
          eventsToFlush,
          batchSize
        ) as CreationAnalyticsEvent[][];

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
      } catch (error) {
        console.error("Failed to flush analytics events:", error);
        // Re-queue events on failure
        eventQueue.current.unshift(...eventsToFlush);
      }
    },
    [user, batchSize, flushInterval, enableDebugLogging]
  );

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
  const trackEvent = useCallback(
    (
      eventType: CreationEventType,
      metadata?: Record<string, unknown>,
      context?: Partial<CreationAnalyticsContext>
    ): void => {
      if (!shouldTrackEvent(eventType, userPreferences)) {
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
      }) as CreationAnalyticsEvent;

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
    },
    [
      user,
      sessionId,
      sessionStartTime,
      isSessionActive,
      currentContext,
      userPreferences,
      batchSize,
      enableDebugLogging,
      flushEvents,
    ]
  );

  // Update context
  const updateContext = useCallback(
    (context: Partial<CreationAnalyticsContext>) => {
      setCurrentContext((prev) => ({ ...prev, ...context }));
    },
    []
  );

  // Builder session tracking
  const startBuilderSession = useCallback(
    (toolId: string, toolName?: string) => {
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
    },
    [trackEvent, updateContext]
  );

  const endBuilderSession = useCallback(
    (exitReason: "save" | "abandon" | "publish" | "share" = "abandon") => {
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
    },
    [trackEvent, sessionStartTime, flushEvents]
  );

  // Tool lifecycle events
  const trackToolCreated = useCallback(
    (toolData: {
      toolId: string;
      toolName: string;
      hasDescription: boolean;
      initialElementsCount: number;
      creationSource: "scratch" | "template" | "fork";
      templateUsed?: string;
    }) => {
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
    },
    [trackEvent, updateContext]
  );

  const trackToolUpdated = useCallback(
    (updateData: {
      versionChanged: boolean;
      newVersion: string;
      elementsCount: number;
      changeType: "major" | "minor" | "patch";
      fieldsChanged: string[];
      editDuration: number;
    }) => {
      trackEvent("tool_updated", updateData);
    },
    [trackEvent]
  );

  const trackToolPublished = useCallback(
    (toolData: {
      toolId: string;
      toolName: string;
      elementsCount: number;
      finalVersion: string;
    }) => {
      updateContext({ toolStatus: "published" });
      trackEvent("tool_published", {
        elementsCount: toolData.elementsCount,
        finalVersion: toolData.finalVersion,
        buildDuration: (Date.now() - sessionStartTime) / 1000,
      });
    },
    [trackEvent, updateContext, sessionStartTime]
  );

  // Element interaction events
  const trackElementAdded = useCallback(
    (elementData: {
      elementId: string;
      elementType: string;
      addMethod: "drag_drop" | "click" | "preset" | "duplicate";
      presetUsed?: string;
      position: { x: number; y: number };
      canvasElementsCount: number;
      librarySearchQuery?: string;
    }) => {
      trackEvent("element_added", elementData, {
        elementId: elementData.elementId,
        elementType: elementData.elementType,
      });
    },
    [trackEvent]
  );

  const trackElementConfigured = useCallback(
    (configData: {
      elementId: string;
      elementType: string;
      configMethod: "properties_panel" | "json_editor" | "inline_edit";
      propertiesChanged: string[];
      configComplexity: "basic" | "advanced";
      validationErrors?: string[];
      timeSpent: number;
    }) => {
      trackEvent("element_configured", configData, {
        elementId: configData.elementId,
        elementType: configData.elementType,
      });
    },
    [trackEvent]
  );

  const trackElementRemoved = useCallback(
    (elementData: {
      elementId: string;
      elementType: string;
      removalReason: "delete" | "replace" | "cleanup";
      timeOnCanvas: number;
    }) => {
      trackEvent("element_removed", elementData, {
        elementId: elementData.elementId,
        elementType: elementData.elementType,
      });
    },
    [trackEvent]
  );

  // Builder interaction events
  const trackCanvasModeChanged = useCallback(
    (mode: "design" | "preview" | "code") => {
      trackEvent("canvas_mode_changed", {
        mode,
        previousMode: currentContext.toolStatus,
      });
    },
    [trackEvent, currentContext]
  );

  const trackDeviceModeChanged = useCallback(
    (deviceMode: "desktop" | "tablet" | "mobile") => {
      trackEvent("device_mode_changed", { deviceMode });
    },
    [trackEvent]
  );

  const trackElementLibrarySearched = useCallback(
    (searchQuery: string, resultsCount: number) => {
      trackEvent("element_library_searched", { searchQuery, resultsCount });
    },
    [trackEvent]
  );

  // Tool usage events (for end users)
  const trackToolInstanceOpened = useCallback(
    (instanceData: {
      toolId: string;
      source: "direct" | "feed" | "share_link" | "embed";
      referrer?: string;
      isFirstTime: boolean;
      deviceType: "desktop" | "tablet" | "mobile";
    }) => {
      trackEvent("tool_instance_opened", instanceData, {
        toolId: instanceData.toolId,
      });
    },
    [trackEvent]
  );

  const trackToolInstanceSubmitted = useCallback(
    (submissionData: {
      toolId: string;
      completionTime: number;
      elementsInteracted: number;
      validationErrors: number;
      dataSize: number;
      isAnonymous: boolean;
      retryCount: number;
    }) => {
      trackEvent("tool_instance_submitted", submissionData, {
        toolId: submissionData.toolId,
      });
    },
    [trackEvent]
  );

  // Privacy controls
  const updatePrivacyPreferences = useCallback(
    (preferences: { analyticsOptOut?: boolean; anonymizeData?: boolean }) => {
      setUserPreferences((prev) => ({ ...prev, ...preferences }));

      // Save to localStorage
      if (user) {
        localStorage.setItem(
          `analytics_prefs_${user.uid}`,
          JSON.stringify({ ...userPreferences, ...preferences })
        );
      }
    },
    [user, userPreferences]
  );

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
