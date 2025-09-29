/**
 * Analytics Helper Functions
 * Convenience functions for backwards compatibility with existing hooks
 */

import { AnalyticsService } from '../domain/analytics/services/analytics.service';
import type { CreationEventType, FeedEventType, OnboardingStepName, CreationAnalyticsEvent, FeedAnalyticsEvent } from '../domain/analytics/types';

/**
 * Create a creation analytics event (convenience function)
 */
export function createAnalyticsEvent(
  eventType: CreationEventType,
  context: Partial<CreationAnalyticsEvent>
): CreationAnalyticsEvent {
  return AnalyticsService.createAnalyticsEvent(eventType, context);
}

/**
 * Create a feed analytics event (convenience function)
 */
export function createFeedEvent(
  eventType: FeedEventType,
  context: Partial<FeedAnalyticsEvent> & { spaceId: string }
): FeedAnalyticsEvent {
  return AnalyticsService.createFeedEvent(eventType, context);
}

/**
 * Determine if event should be tracked (convenience function)
 */
export function shouldTrackEvent(
  eventType: CreationEventType | FeedEventType | OnboardingStepName,
  userPreferences?: { analyticsOptOut?: boolean; anonymizeData?: boolean }
): boolean {
  return AnalyticsService.shouldTrackEvent(eventType, userPreferences);
}

/**
 * Batch analytics events (convenience function)
 */
export function batchAnalyticsEvents<T extends CreationAnalyticsEvent | FeedAnalyticsEvent>(
  events: T[],
  batchSize: number = 100
): T[][] {
  return AnalyticsService.batchAnalyticsEvents(events, batchSize);
}

/**
 * Hash user ID for privacy (convenience function)
 */
export function hashUserIdForFeed(userId: string): string {
  return AnalyticsService.hashUserIdForFeed(userId);
}