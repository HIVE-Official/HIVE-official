/**
 * Analytics Domain Service
 * Core business logic for analytics event creation and processing
 */
import { CreationAnalyticsEvent, FeedAnalyticsEvent, OnboardingAnalyticsEvent, CreationEventType, FeedEventType, OnboardingStepName } from '../types';
export declare class AnalyticsService {
    /**
     * Create a creation analytics event
     */
    static createAnalyticsEvent(eventType: CreationEventType, context: Partial<CreationAnalyticsEvent>): CreationAnalyticsEvent;
    /**
     * Create a feed analytics event
     */
    static createFeedEvent(eventType: FeedEventType, context: Partial<FeedAnalyticsEvent> & {
        spaceId: string;
    }): FeedAnalyticsEvent;
    /**
     * Create an onboarding analytics event
     */
    static createOnboardingEvent(stepName: OnboardingStepName, context: Partial<OnboardingAnalyticsEvent> & {
        stepIndex: number;
        isCompleted: boolean;
    }): OnboardingAnalyticsEvent;
    /**
     * Hash user ID for privacy
     */
    static hashUserIdForFeed(userId: string): string;
    /**
     * Determine if event should be tracked based on user preferences
     */
    static shouldTrackEvent(eventType: CreationEventType | FeedEventType | OnboardingStepName, userPreferences?: {
        analyticsOptOut?: boolean;
        anonymizeData?: boolean;
    }): boolean;
    /**
     * Batch analytics events for efficient processing
     */
    static batchAnalyticsEvents<T extends CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent>(events: T[], batchSize?: number): T[][];
    /**
     * Validate analytics event
     */
    static validateEvent(event: CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent): {
        isValid: boolean;
        errors: string[];
    };
    /**
     * Anonymize event data
     */
    static anonymizeEvent<T extends CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent>(event: T): T;
    /**
     * Filter events based on date range
     */
    static filterEventsByDateRange<T extends CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent>(events: T[], startDate: Date, endDate: Date): T[];
    /**
     * Group events by type
     */
    static groupEventsByType<T extends CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent>(events: T[]): Record<string, T[]>;
}
//# sourceMappingURL=analytics.service.d.ts.map