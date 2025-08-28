import type { AuthEvent, OnboardingEvent, UserEngagementEvent, SystemMetric, AnalyticsConfig, AnalyticsEvent, LogMetadata } from './analytics-types';
declare class AnalyticsClient {
    private config;
    private eventQueue;
    private isInitialized;
    constructor();
    /**
     * Initialize analytics with user context
     */
    init(config?: Partial<AnalyticsConfig>): void;
    /**
     * Track authentication events
     */
    trackAuth(event: Omit<AuthEvent, 'timestamp' | 'sessionId' | 'userAgent'>): void;
    /**
     * Track onboarding flow events
     */
    trackOnboarding(event: Omit<OnboardingEvent, 'timestamp' | 'sessionId'>): void;
    /**
     * Track user engagement events
     */
    trackEngagement(event: Omit<UserEngagementEvent, 'timestamp' | 'sessionId'>): void;
    /**
     * Track system metrics
     */
    trackMetric(metric: Omit<SystemMetric, 'timestamp' | 'sessionId' | 'userId'>): void;
    /**
     * Track errors with metadata
     */
    trackError(error: Error, metadata?: LogMetadata): void;
    /**
     * Set user ID after authentication
     */
    setUserId(userId: string): void;
    /**
     * Update analytics configuration
     */
    updateConfig(config: Partial<AnalyticsConfig>): void;
    /**
     * Helper: Track page view
     */
    trackPageView(page: string, metadata?: Record<string, unknown>): void;
    /**
     * Helper: Track button click
     */
    trackClick(component: string, action: string, metadata?: Record<string, unknown>): void;
    /**
     * Helper: Track form submission
     */
    trackFormSubmit(component: string, data?: Record<string, unknown>): void;
    /**
     * Track generic analytics events (used by logger)
     */
    trackEvent(event: AnalyticsEvent): void;
    private generateSessionId;
    private sendEvent;
    private sendEventToAPI;
    private flushEventQueue;
    private setupErrorTracking;
    private setupPerformanceTracking;
}
export declare const analytics: AnalyticsClient;
export { AnalyticsClient };
//# sourceMappingURL=analytics-client.d.ts.map