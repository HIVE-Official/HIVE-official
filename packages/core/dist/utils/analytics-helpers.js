"use strict";
/**
 * Analytics Helper Functions
 * Convenience functions for backwards compatibility with existing hooks
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnalyticsEvent = createAnalyticsEvent;
exports.createFeedEvent = createFeedEvent;
exports.shouldTrackEvent = shouldTrackEvent;
exports.batchAnalyticsEvents = batchAnalyticsEvents;
exports.hashUserIdForFeed = hashUserIdForFeed;
const analytics_service_1 = require("../domain/analytics/services/analytics.service");
/**
 * Create a creation analytics event (convenience function)
 */
function createAnalyticsEvent(eventType, context) {
    return analytics_service_1.AnalyticsService.createAnalyticsEvent(eventType, context);
}
/**
 * Create a feed analytics event (convenience function)
 */
function createFeedEvent(eventType, context) {
    return analytics_service_1.AnalyticsService.createFeedEvent(eventType, context);
}
/**
 * Determine if event should be tracked (convenience function)
 */
function shouldTrackEvent(eventType, userPreferences) {
    return analytics_service_1.AnalyticsService.shouldTrackEvent(eventType, userPreferences);
}
/**
 * Batch analytics events (convenience function)
 */
function batchAnalyticsEvents(events, batchSize = 100) {
    return analytics_service_1.AnalyticsService.batchAnalyticsEvents(events, batchSize);
}
/**
 * Hash user ID for privacy (convenience function)
 */
function hashUserIdForFeed(userId) {
    return analytics_service_1.AnalyticsService.hashUserIdForFeed(userId);
}
//# sourceMappingURL=analytics-helpers.js.map