/**
 * Analytics Domain Service
 * Core business logic for analytics event creation and processing
 */
import { CreationAnalyticsEventEntity } from '../events/creation-analytics.event';
import { FeedAnalyticsEventEntity } from '../events/feed-analytics.event';
import { OnboardingAnalyticsEventEntity } from '../events/onboarding-analytics.event';
export class AnalyticsService {
    /**
     * Create a creation analytics event
     */
    static createAnalyticsEvent(eventType, context) {
        const event = CreationAnalyticsEventEntity.create(eventType, context);
        return event.toJSON();
    }
    /**
     * Create a feed analytics event
     */
    static createFeedEvent(eventType, context) {
        const event = FeedAnalyticsEventEntity.create(eventType, context);
        return event.toJSON();
    }
    /**
     * Create an onboarding analytics event
     */
    static createOnboardingEvent(stepName, context) {
        const event = OnboardingAnalyticsEventEntity.create(stepName, context);
        return event.toJSON();
    }
    /**
     * Hash user ID for privacy
     */
    static hashUserIdForFeed(userId) {
        // Simple hash function - in production, use a proper crypto hash
        let hash = 0;
        for (let i = 0; i < userId.length; i++) {
            const char = userId.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return `hashed_${Math.abs(hash).toString(36)}`;
    }
    /**
     * Determine if event should be tracked based on user preferences
     */
    static shouldTrackEvent(eventType, userPreferences) {
        // User has opted out of analytics
        if (userPreferences?.analyticsOptOut) {
            return false;
        }
        // Always track essential events regardless of preferences
        const essentialEvents = ['builder_session_start', 'builder_session_end', 'tool_published'];
        if (essentialEvents.includes(eventType)) {
            return true;
        }
        return true;
    }
    /**
     * Batch analytics events for efficient processing
     */
    static batchAnalyticsEvents(events, batchSize = 100) {
        const batches = [];
        for (let i = 0; i < events.length; i += batchSize) {
            batches.push(events.slice(i, i + batchSize));
        }
        return batches;
    }
    /**
     * Validate analytics event
     */
    static validateEvent(event) {
        const errors = [];
        if (!event.eventId) {
            errors.push('Event ID is required');
        }
        if (!event.sessionId) {
            errors.push('Session ID is required');
        }
        if (!event.timestamp) {
            errors.push('Timestamp is required');
        }
        // Type-specific validation
        if ('eventType' in event && !event.eventType) {
            errors.push('Event type is required');
        }
        if ('spaceId' in event && !event.spaceId) {
            errors.push('Space ID is required for feed events');
        }
        if ('stepName' in event && !event.stepName) {
            errors.push('Step name is required for onboarding events');
        }
        return {
            isValid: errors.length === 0,
            errors,
        };
    }
    /**
     * Anonymize event data
     */
    static anonymizeEvent(event) {
        return {
            ...event,
            userId: undefined,
            userIdHash: undefined,
            anonymized: true,
            metadata: {
                ...event.metadata,
                userId: undefined,
                userIdHash: undefined,
            },
        };
    }
    /**
     * Filter events based on date range
     */
    static filterEventsByDateRange(events, startDate, endDate) {
        return events.filter(event => {
            const eventDate = new Date(event.timestamp);
            return eventDate >= startDate && eventDate <= endDate;
        });
    }
    /**
     * Group events by type
     */
    static groupEventsByType(events) {
        return events.reduce((groups, event) => {
            const type = 'eventType' in event ? event.eventType : 'stepName' in event ? event.stepName : 'unknown';
            if (!groups[type]) {
                groups[type] = [];
            }
            groups[type].push(event);
            return groups;
        }, {});
    }
}
//# sourceMappingURL=analytics.service.js.map