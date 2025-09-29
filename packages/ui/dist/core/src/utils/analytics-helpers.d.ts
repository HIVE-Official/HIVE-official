/**
 * Analytics Helper Functions
 * Convenience functions for backwards compatibility with existing hooks
 */
import type { CreationEventType, FeedEventType, OnboardingStepName, CreationAnalyticsEvent, FeedAnalyticsEvent } from '../domain/analytics/types';
/**
 * Create a creation analytics event (convenience function)
 */
export declare function createAnalyticsEvent(eventType: CreationEventType, context: Partial<CreationAnalyticsEvent>): CreationAnalyticsEvent;
/**
 * Create a feed analytics event (convenience function)
 */
export declare function createFeedEvent(eventType: FeedEventType, context: Partial<FeedAnalyticsEvent> & {
    spaceId: string;
}): FeedAnalyticsEvent;
/**
 * Determine if event should be tracked (convenience function)
 */
export declare function shouldTrackEvent(eventType: CreationEventType | FeedEventType | OnboardingStepName, userPreferences?: {
    analyticsOptOut?: boolean;
    anonymizeData?: boolean;
}): boolean;
/**
 * Batch analytics events (convenience function)
 */
export declare function batchAnalyticsEvents<T extends CreationAnalyticsEvent | FeedAnalyticsEvent>(events: T[], batchSize?: number): T[][];
/**
 * Hash user ID for privacy (convenience function)
 */
export declare function hashUserIdForFeed(userId: string): string;
//# sourceMappingURL=analytics-helpers.d.ts.map