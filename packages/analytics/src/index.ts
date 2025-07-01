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

export * from './analytics-client'
export * from './analytics-types'
export * from './analytics-hooks'
export * from './error-reporting'

// Re-export any other analytics functionality
export * from './types'; 