// Analytics utilities for the HIVE platform
// Export analytics functions here

// Export analytics types
export type {
  AnalyticsEvent,
  OnboardingEvent,
  OnboardingStartedEvent,
  OnboardingStepCompletedEvent,
  OnboardingAbandonedEvent,
} from './types';

// Export analytics service
export { AnalyticsService } from './tracking'; 