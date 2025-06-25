import { useCallback } from "react";
import { logger } from "@hive/core";
import type { AnalyticsEvent } from "@hive/core";

export function useAnalytics() {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    try {
      // TODO: Implement real analytics tracking
      logger.debug("Analytics event tracked", {
        name: event.name,
        properties: event.properties,
      });
    } catch (error) {
      logger.error("Error tracking analytics event:", error);
    }
  }, []);

  const trackPageView = useCallback((pageName: string) => {
    try {
      // TODO: Implement real page view tracking
      logger.debug("Page view tracked", { pageName });
    } catch (error) {
      logger.error("Error tracking page view:", error);
    }
  }, []);

  return {
    trackEvent,
    trackPageView,
  };
}
