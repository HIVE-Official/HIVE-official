/**
 * Base analytics event interface
 */
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
  timestamp?: number;
}

/**
 * Onboarding-specific analytics events
 */
export interface OnboardingStartedEvent extends AnalyticsEvent {
  name: 'onboarding_started';
}

export interface OnboardingStepCompletedEvent extends AnalyticsEvent {
  name: 'onboarding_step_completed';
  properties: {
    stepName: string;
  };
}

export interface OnboardingAbandonedEvent extends AnalyticsEvent {
  name: 'onboarding_abandoned';
  properties: {
    stepName: string;
    lastActiveAt: number;
  };
}

export type OnboardingEvent = 
  | OnboardingStartedEvent 
  | OnboardingStepCompletedEvent 
  | OnboardingAbandonedEvent;

/**
 * Page view event interface
 */
export interface PageView {
  path: string;
  title?: string;
  referrer?: string;
  search?: string;
  timestamp?: number;
}

/**
 * User traits interface
 */
export interface UserTraits {
  email?: string;
  name?: string;
  role?: string;
  [key: string]: unknown;
}

/**
 * Analytics service interface
 */
export interface AnalyticsService {
  trackEvent(event: AnalyticsEvent): void;
  trackPageView(pageView: PageView): void;
  identifyUser(userId: string, traits?: UserTraits): void;
}
