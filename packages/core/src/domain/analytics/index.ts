/**
 * Analytics Domain Export
 * Domain layer for analytics events and processing
 */

// Value Objects
export * from './value-objects/creation-event-type.value';
export * from './value-objects/analytics-config.value';

// Events
export * from './events/creation-analytics.event';
export * from './events/feed-analytics.event';
export * from './events/onboarding-analytics.event';

// Domain Services
export * from './services/analytics.service';
export * from './services/event-batching.service';
export * from './services/privacy.service';

// Aggregates
export * from './aggregates/analytics-session';

// Types
export type {
  CreationAnalyticsEvent,
  FeedAnalyticsEvent,
  OnboardingAnalyticsEvent,
  CreationEventType,
  FeedAnalyticsConfig,
  OnboardingStepName,
} from './types';