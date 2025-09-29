/**
 * Privacy Service
 * Domain service for handling privacy-related operations in analytics
 */
import { CreationAnalyticsEvent, FeedAnalyticsEvent, OnboardingAnalyticsEvent } from '../types';
export interface PrivacyPreferences {
    analyticsOptOut?: boolean;
    anonymizeData?: boolean;
    retentionDays?: number;
}
export declare class PrivacyService {
    /**
     * Apply privacy settings to an event
     */
    static applyPrivacySettings<T extends CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent>(event: T, preferences: PrivacyPreferences): T | null;
    /**
     * Anonymize an event by removing personally identifiable information
     */
    static anonymizeEvent<T extends CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent>(event: T): T;
    /**
     * Hash user ID for privacy protection
     */
    static hashUserId(userId: string): string;
    /**
     * Check if event is within retention period
     */
    static isWithinRetentionPeriod(event: CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent, retentionDays?: number): boolean;
    /**
     * Filter events based on retention policy
     */
    static filterEventsByRetention<T extends CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent>(events: T[], retentionDays?: number): T[];
    /**
     * Remove expired events based on retention policy
     */
    static removeExpiredEvents<T extends CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent>(events: T[], retentionDays?: number): T[];
    /**
     * Validate privacy compliance of an event
     */
    static validatePrivacyCompliance(event: CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent): {
        isCompliant: boolean;
        issues: string[];
    };
    /**
     * Generate privacy report for events
     */
    static generatePrivacyReport<T extends CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent>(events: T[]): {
        totalEvents: number;
        anonymizedEvents: number;
        eventsWithPII: number;
        expiredEvents: number;
        complianceIssues: string[];
    };
}
//# sourceMappingURL=privacy.service.d.ts.map