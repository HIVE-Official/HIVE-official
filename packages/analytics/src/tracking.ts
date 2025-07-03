import type { AnalyticsEvent, AnalyticsProvider, LogEvent, LogMetadata } from './analytics-types';

/**
 * Analytics service stub - to be implemented with real analytics service
 * @throws {Error} When called in production environment
 */
export class AnalyticsService implements AnalyticsProvider {
  private validateEnvironment() {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Analytics service not implemented for production");
    }
  }

  /**
   * Track a custom event
   * @param event The event to track
   */
  trackEvent(event: AnalyticsEvent | LogEvent): void {
    this.validateEnvironment();
    const metadata: Record<string, unknown> = {
      ...event.metadata,
      type: event.type,
    };

    if ('level' in event && 'message' in event) {
      metadata.level = event.level;
      metadata.message = event.message;
    }
    console.warn("[Analytics Stub] Track Event:", metadata);
  }

  trackError(error: Error, metadata?: LogMetadata): void {
    this.validateEnvironment();
    console.error("[Analytics Stub] Track Error:", error, metadata);
  }

  /**
   * Track a page view
   * @param pageView The page view data to track
   */
  trackPageView(pageView: { page: string; timestamp?: string }): void {
    this.validateEnvironment();
    const metadata = {
      type: 'page_view',
      ...pageView
    };
    console.warn("[Analytics Stub] Page View:", metadata);
  }

  /**
   * Identify a user
   * @param userId The user ID to identify
   * @param traits Optional user traits
   */
  identifyUser(userId: string, traits?: Record<string, unknown>): void {
    this.validateEnvironment();
    console.warn("[Analytics Stub] Identify User:", { userId, traits });
  }
}

export const analytics = new AnalyticsService();
