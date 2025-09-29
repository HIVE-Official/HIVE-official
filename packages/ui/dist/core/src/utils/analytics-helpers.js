/**
 * Analytics Helper Functions
 * Convenience functions for backwards compatibility with existing hooks
 */
import { AnalyticsService } from '../domain/analytics/services/analytics.service';
/**
 * Create a creation analytics event (convenience function)
 */
export function createAnalyticsEvent(eventType, context) {
    return AnalyticsService.createAnalyticsEvent(eventType, context);
}
/**
 * Create a feed analytics event (convenience function)
 */
export function createFeedEvent(eventType, context) {
    return AnalyticsService.createFeedEvent(eventType, context);
}
/**
 * Determine if event should be tracked (convenience function)
 */
export function shouldTrackEvent(eventType, userPreferences) {
    return AnalyticsService.shouldTrackEvent(eventType, userPreferences);
}
/**
 * Batch analytics events (convenience function)
 */
export function batchAnalyticsEvents(events, batchSize = 100) {
    return AnalyticsService.batchAnalyticsEvents(events, batchSize);
}
/**
 * Hash user ID for privacy (convenience function)
 */
export function hashUserIdForFeed(userId) {
    return AnalyticsService.hashUserIdForFeed(userId);
}
//# sourceMappingURL=analytics-helpers.js.map