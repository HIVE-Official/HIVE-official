/**
 * Base analytics event interface
 */
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
  timestamp?: number;
}

/**
 * Page view event interface
 */
export interface PageView {
  path: string;
  title?: string;
  referrer?: string;
  search?: string;
  timestamp?: number;
}

/**
 * User traits interface
 */
export interface UserTraits {
  email?: string;
  name?: string;
  role?: string;
  [key: string]: unknown;
}

/**
 * Analytics service interface
 */
export interface AnalyticsService {
  trackEvent(event: AnalyticsEvent): void;
  trackPageView(pageView: PageView): void;
  identifyUser(userId: string, traits?: UserTraits): void;
}
