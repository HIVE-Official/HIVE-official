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

export class PrivacyService {
  /**
   * Apply privacy settings to an event
   */
  public static applyPrivacySettings<T extends CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent>(
    event: T,
    preferences: PrivacyPreferences
  ): T | null {
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
  public static anonymizeEvent<T extends CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent>(
    event: T
  ): T {
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
  public static hashUserId(userId: string): string {
    if (!userId) return '';

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
  public static isWithinRetentionPeriod(
    event: CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent,
    retentionDays: number = 90
  ): boolean {
    const eventDate = new Date(event.timestamp);
    const retentionDate = new Date();
    retentionDate.setDate(retentionDate.getDate() - retentionDays);

    return eventDate >= retentionDate;
  }

  /**
   * Filter events based on retention policy
   */
  public static filterEventsByRetention<T extends CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent>(
    events: T[],
    retentionDays: number = 90
  ): T[] {
    return events.filter(event => this.isWithinRetentionPeriod(event, retentionDays));
  }

  /**
   * Remove expired events based on retention policy
   */
  public static removeExpiredEvents<T extends CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent>(
    events: T[],
    retentionDays: number = 90
  ): T[] {
    return this.filterEventsByRetention(events, retentionDays);
  }

  /**
   * Validate privacy compliance of an event
   */
  public static validatePrivacyCompliance(
    event: CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent
  ): { isCompliant: boolean; issues: string[] } {
    const issues: string[] = [];

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
  public static generatePrivacyReport<T extends CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent>(
    events: T[]
  ): {
    totalEvents: number;
    anonymizedEvents: number;
    eventsWithPII: number;
    expiredEvents: number;
    complianceIssues: string[];
  } {
    const report = {
      totalEvents: events.length,
      anonymizedEvents: 0,
      eventsWithPII: 0,
      expiredEvents: 0,
      complianceIssues: [] as string[],
    };

    for (const event of events) {
      // Count anonymized events
      if (event.anonymized) {
        report.anonymizedEvents++;
      }

      // Count events with PII
      if (event.userId || (event.metadata && Object.keys(event.metadata).some(key =>
        ['email', 'fullName', 'address', 'phone'].includes(key)
      ))) {
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