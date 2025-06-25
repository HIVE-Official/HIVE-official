import { logger } from "@hive/core";
import type { AnalyticsEvent, PageView } from "./types";

/**
 * Analytics service stub - to be implemented with real analytics service
 * @throws {Error} When called in production environment
 */
export class AnalyticsService {
  private validateEnvironment() {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Analytics service not implemented for production");
    }
  }

  /**
   * Track a custom event
   * @param event The event to track
   */
  trackEvent(event: AnalyticsEvent): void {
    this.validateEnvironment();
    logger.info("[Analytics Stub] Track Event:", event);
  }

  /**
   * Track a page view
   * @param pageView The page view data to track
   */
  trackPageView(pageView: PageView): void {
    this.validateEnvironment();
    logger.info("[Analytics Stub] Page View:", pageView);
  }

  /**
   * Identify a user
   * @param userId The user ID to identify
   * @param traits Optional user traits
   */
  identifyUser(userId: string, traits?: Record<string, unknown>): void {
    this.validateEnvironment();
    logger.info("[Analytics Stub] Identify User:", { userId, traits });
  }
}

export const analytics = new AnalyticsService();
