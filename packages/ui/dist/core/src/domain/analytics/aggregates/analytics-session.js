/**
 * Analytics Session Aggregate
 * Domain aggregate for managing analytics sessions
 */
import { EventBatchingService } from '../services/event-batching.service';
import { PrivacyService } from '../services/privacy.service';
export class AnalyticsSession {
    constructor(userId, privacyPreferences = {}) {
        this.isActive = true;
        this.events = [];
        this.privacyPreferences = {};
        this.sessionId = crypto.randomUUID();
        this.userId = userId;
        this.startTime = new Date();
        this.privacyPreferences = privacyPreferences;
    }
    /**
     * Get session ID
     */
    getSessionId() {
        return this.sessionId;
    }
    /**
     * Get session duration in milliseconds
     */
    getDuration() {
        const endTime = this.endTime || new Date();
        return endTime.getTime() - this.startTime.getTime();
    }
    /**
     * Check if session is active
     */
    getIsActive() {
        return this.isActive;
    }
    /**
     * Set up event batching
     */
    setupBatching(batchSize = 100, flushInterval = 30000, onFlush) {
        this.batchingService = new EventBatchingService(batchSize, flushInterval, onFlush);
    }
    /**
     * Add event to session
     */
    addEvent(event) {
        if (!this.isActive) {
            throw new Error('Cannot add events to inactive session');
        }
        // Apply privacy settings
        const processedEvent = PrivacyService.applyPrivacySettings(event, this.privacyPreferences);
        if (!processedEvent) {
            // Event was filtered out due to privacy settings
            return;
        }
        // Ensure event has session ID
        const eventWithSession = {
            ...processedEvent,
            sessionId: this.sessionId,
        };
        this.events.push(eventWithSession);
        // Add to batching service if configured
        if (this.batchingService) {
            this.batchingService.addEvent(eventWithSession);
        }
    }
    /**
     * Update privacy preferences
     */
    updatePrivacyPreferences(preferences) {
        this.privacyPreferences = { ...this.privacyPreferences, ...preferences };
    }
    /**
     * Get all events in session
     */
    getEvents() {
        return [...this.events];
    }
    /**
     * Get events by type
     */
    getEventsByType(eventType) {
        return this.events.filter(event => {
            if ('eventType' in event) {
                return event.eventType === eventType;
            }
            if ('stepName' in event) {
                return event.stepName === eventType;
            }
            return false;
        });
    }
    /**
     * Get session statistics
     */
    getStatistics() {
        const eventsByType = {};
        for (const event of this.events) {
            const type = 'eventType' in event ? event.eventType : 'stepName' in event ? event.stepName : 'unknown';
            eventsByType[type] = (eventsByType[type] || 0) + 1;
        }
        return {
            sessionId: this.sessionId,
            userId: this.userId,
            startTime: this.startTime,
            endTime: this.endTime,
            duration: this.getDuration(),
            eventCount: this.events.length,
            eventsByType,
            isActive: this.isActive,
        };
    }
    /**
     * End the session
     */
    async end() {
        if (!this.isActive) {
            return;
        }
        this.isActive = false;
        this.endTime = new Date();
        // Flush any remaining events
        if (this.batchingService) {
            await this.batchingService.flush();
        }
    }
    /**
     * Clean up expired events based on retention policy
     */
    cleanupExpiredEvents(retentionDays = 90) {
        this.events = PrivacyService.removeExpiredEvents(this.events, retentionDays);
    }
    /**
     * Generate privacy report for session
     */
    generatePrivacyReport() {
        const baseReport = PrivacyService.generatePrivacyReport(this.events);
        return {
            sessionId: this.sessionId,
            ...baseReport,
        };
    }
    /**
     * Export session data
     */
    export() {
        return {
            sessionId: this.sessionId,
            userId: this.userId,
            startTime: this.startTime,
            endTime: this.endTime,
            isActive: this.isActive,
            events: this.getEvents(),
            statistics: this.getStatistics(),
        };
    }
    /**
     * Destroy the session and cleanup resources
     */
    async destroy() {
        await this.end();
        if (this.batchingService) {
            await this.batchingService.destroy();
        }
        this.events = [];
    }
}
//# sourceMappingURL=analytics-session.js.map