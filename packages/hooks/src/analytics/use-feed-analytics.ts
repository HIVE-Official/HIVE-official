import { useCallback } from "react";
import { logger } from "@hive/core";
import { useAnalytics } from "./use-analytics";

export function useFeedAnalytics() {
  const { trackEvent } = useAnalytics();

  const trackPostView = useCallback(
    (postId: string) => {
      try {
        logger.debug("Post view tracked", { postId });
        trackEvent({
          name: "post_view",
          properties: { postId },
        });
      } catch (error) {
        logger.error("Error tracking post view:", error);
      }
    },
    [trackEvent]
  );

  const trackPostCreate = useCallback(
    (postId: string) => {
      try {
        logger.debug("Post creation tracked", { postId });
        trackEvent({
          name: "post_create",
          properties: { postId },
        });
      } catch (error) {
        logger.error("Error tracking post creation:", error);
      }
    },
    [trackEvent]
  );

  const trackPostInteraction = useCallback(
    (postId: string, type: string) => {
      try {
        logger.debug("Post interaction tracked", { postId, type });
        trackEvent({
          name: "post_interaction",
          properties: { postId, type },
        });
      } catch (error) {
        logger.error("Error tracking post interaction:", error);
      }
    },
    [trackEvent]
  );

  return {
    trackPostView,
    trackPostCreate,
    trackPostInteraction,
  };
}
