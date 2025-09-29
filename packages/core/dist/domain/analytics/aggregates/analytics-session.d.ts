/**
 * Analytics Session Aggregate
 * Domain aggregate for managing analytics sessions
 */
import { CreationAnalyticsEvent, FeedAnalyticsEvent, OnboardingAnalyticsEvent } from '../types';
import { PrivacyPreferences } from '../services/privacy.service';
export declare class AnalyticsSession {
    private readonly sessionId;
    private readonly userId?;
    private readonly startTime;
    private endTime?;
    private isActive;
    private batchingService?;
    private events;
    private privacyPreferences;
    constructor(userId?: string, privacyPreferences?: PrivacyPreferences);
    /**
     * Get session ID
     */
    getSessionId(): string;
    /**
     * Get session duration in milliseconds
     */
    getDuration(): number;
    /**
     * Check if session is active
     */
    getIsActive(): boolean;
    /**
     * Set up event batching
     */
    setupBatching(batchSize: number | undefined, flushInterval: number | undefined, onFlush: (events: (CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent)[]) => Promise<void>): void;
    /**
     * Add event to session
     */
    addEvent(event: CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent): void;
    /**
     * Update privacy preferences
     */
    updatePrivacyPreferences(preferences: Partial<PrivacyPreferences>): void;
    /**
     * Get all events in session
     */
    getEvents(): (CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent)[];
    /**
     * Get events by type
     */
    getEventsByType(eventType: string): (CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent)[];
    /**
     * Get session statistics
     */
    getStatistics(): {
        sessionId: string;
        userId?: string;
        startTime: Date;
        endTime?: Date;
        duration: number;
        eventCount: number;
        eventsByType: Record<string, number>;
        isActive: boolean;
    };
    /**
     * End the session
     */
    end(): Promise<void>;
    /**
     * Clean up expired events based on retention policy
     */
    cleanupExpiredEvents(retentionDays?: number): void;
    /**
     * Generate privacy report for session
     */
    generatePrivacyReport(): {
        sessionId: string;
        totalEvents: number;
        anonymizedEvents: number;
        eventsWithPII: number;
        expiredEvents: number;
        complianceIssues: string[];
    };
    /**
     * Export session data
     */
    export(): {
        sessionId: string;
        userId?: string;
        startTime: Date;
        endTime?: Date;
        isActive: boolean;
        events: (CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent)[];
        statistics: ReturnType<AnalyticsSession['getStatistics']>;
    };
    /**
     * Destroy the session and cleanup resources
     */
    destroy(): Promise<void>;
}
//# sourceMappingURL=analytics-session.d.ts.map