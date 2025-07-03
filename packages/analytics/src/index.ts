// Analytics utilities for the HIVE platform
// Export analytics functions here

// Export types
export type {
  AnalyticsEvent,
  LogMetadata,
  AnalyticsProvider,
  LogEvent,
} from './analytics-types';

// Export analytics service
export { AnalyticsService } from './tracking';

// Export the analytics client class
export { AnalyticsClient } from './analytics-client';

// Export hooks
export * from './analytics-hooks';

// Export singleton instance
export { analytics } from './instance';

// Export error handling
export * from './error-reporting'; 