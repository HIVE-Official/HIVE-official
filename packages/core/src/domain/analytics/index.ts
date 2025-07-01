// Core analytics types and schemas
export * from './events';

// Creation Engine analytics
export * from './creation';

// Onboarding Analytics
export * from './onboarding';

// Re-export commonly used types
export type { AnalyticsEvent, AnalyticsEventType } from './events';

// Re-export all analytics types from split files (excluding EventContext to avoid conflict)
export type { BaseAnalyticsEvent, TouchPoint } from './base-types';
export * from './event-types';
export * from './service-types';
export * from './report-types'; 