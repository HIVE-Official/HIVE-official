"use strict";
/**
 * Privacy Service
 * Domain service for handling privacy-related operations in analytics
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivacyService = void 0;
class PrivacyService {
    /**
     * Apply privacy settings to an event
     */
    static applyPrivacySettings(event, preferences) {
        // User has opted out of analytics
        if (preferences.analyticsOptOut) {
            return null;
        }
        // Anonymize data if requested
        if (preferences.anonymizeData) {
            return this.anonymizeEvent(event);
        }
        return event;
    }
    /**
     * Anonymize an event by removing personally identifiable information
     */
    static anonymizeEvent(event) {
        return {
            ...event,
            userId: undefined,
            userIdHash: this.hashUserId(event.userId || ''),
            anonymized: true,
            metadata: {
                ...event.metadata,
                // Remove any PII from metadata
                userId: undefined,
                email: undefined,
                fullName: undefined,
                ipAddress: undefined,
            },
        };
    }
    /**
     * Hash user ID for privacy protection
     */
    static hashUserId(userId) {
        if (!userId)
            return '';
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
     * Check if event is within retention period
     */
    static isWithinRetentionPeriod(event, retentionDays = 90) {
        const eventDate = new Date(event.timestamp);
        const retentionDate = new Date();
        retentionDate.setDate(retentionDate.getDate() - retentionDays);
        return eventDate >= retentionDate;
    }
    /**
     * Filter events based on retention policy
     */
    static filterEventsByRetention(events, retentionDays = 90) {
        return events.filter(event => this.isWithinRetentionPeriod(event, retentionDays));
    }
    /**
     * Remove expired events based on retention policy
     */
    static removeExpiredEvents(events, retentionDays = 90) {
        return this.filterEventsByRetention(events, retentionDays);
    }
    /**
     * Validate privacy compliance of an event
     */
    static validatePrivacyCompliance(event) {
        const issues = [];
        // Check if event has PII when it should be anonymized
        if (event.anonymized === false && (event.userId || event.userIdHash)) {
            issues.push('Event contains user identifiers but is not marked as anonymized');
        }
        // Check metadata for potential PII
        if (event.metadata) {
            const piiFields = ['email', 'fullName', 'address', 'phone', 'ssn', 'ipAddress'];
            for (const field of piiFields) {
                if (event.metadata[field]) {
                    issues.push(`Event metadata contains potential PII field: ${field}`);
                }
            }
        }
        // Check if event is within retention period
        const isWithinRetention = this.isWithinRetentionPeriod(event);
        if (!isWithinRetention) {
            issues.push('Event is outside of retention period');
        }
        return {
            isCompliant: issues.length === 0,
            issues,
        };
    }
    /**
     * Generate privacy report for events
     */
    static generatePrivacyReport(events) {
        const report = {
            totalEvents: events.length,
            anonymizedEvents: 0,
            eventsWithPII: 0,
            expiredEvents: 0,
            complianceIssues: [],
        };
        for (const event of events) {
            // Count anonymized events
            if (event.anonymized) {
                report.anonymizedEvents++;
            }
            // Count events with PII
            if (event.userId || (event.metadata && Object.keys(event.metadata).some(key => ['email', 'fullName', 'address', 'phone'].includes(key)))) {
                report.eventsWithPII++;
            }
            // Count expired events
            if (!this.isWithinRetentionPeriod(event)) {
                report.expiredEvents++;
            }
            // Check compliance
            const compliance = this.validatePrivacyCompliance(event);
            if (!compliance.isCompliant) {
                report.complianceIssues.push(...compliance.issues);
            }
        }
        return report;
    }
}
exports.PrivacyService = PrivacyService;
//# sourceMappingURL=privacy.service.js.map