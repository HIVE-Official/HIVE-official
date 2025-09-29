/**
 * Analytics Domain Types
 * Core type definitions for analytics events and configuration
 */

// Base Analytics Event
export interface BaseAnalyticsEvent {
  eventId: string;
  userId?: string;
  userIdHash?: string;
  sessionId: string;
  timestamp: Date;
  anonymized?: boolean;
  metadata?: Record<string, unknown>;
}

// Creation Analytics Types
export type CreationEventType =
  | 'builder_session_start'
  | 'builder_session_end'
  | 'tool_created'
  | 'tool_updated'
  | 'tool_published'
  | 'element_added'
  | 'element_configured'
  | 'element_removed'
  | 'canvas_mode_changed'
  | 'device_mode_changed'
  | 'element_library_searched'
  | 'tool_instance_opened'
  | 'tool_instance_submitted';

export interface CreationAnalyticsEvent extends BaseAnalyticsEvent {
  eventType: CreationEventType;
  toolId?: string;
  elementId?: string;
  spaceId?: string;
}

// Feed Analytics Types
export type FeedEventType =
  | 'post_created'
  | 'post_reacted'
  | 'post_viewed'
  | 'post_edited'
  | 'post_deleted'
  | 'space_joined'
  | 'space_left'
  | 'builder_action'
  | 'space_heartbeat'
  | 'space_feed_viewed';

export interface FeedAnalyticsEvent extends BaseAnalyticsEvent {
  eventType: FeedEventType;
  postId?: string;
  spaceId: string;
}

export interface FeedAnalyticsConfig {
  batchSize: number;
  flushInterval: number;
  hashUserIds: boolean;
  retentionDays: number;
  sampleRate: number;
  dataset: string;
  feedEventsTable: string;
  spaceMetricsTable: string;
  userBehaviorTable: string;
}

// Onboarding Analytics Types
export type OnboardingStepName =
  | 'welcome'
  | 'name'
  | 'academics'
  | 'handle'
  | 'photo'
  | 'builder'
  | 'legal';

export interface OnboardingAnalyticsEvent extends BaseAnalyticsEvent {
  stepName: OnboardingStepName;
  stepIndex: number;
  isCompleted: boolean;
  timeSpent?: number;
  validationErrors?: string[];
}