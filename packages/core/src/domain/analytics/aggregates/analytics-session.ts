/**
 * Analytics Session Aggregate
 * Domain aggregate for managing analytics sessions
 */

import { CreationAnalyticsEvent, FeedAnalyticsEvent, OnboardingAnalyticsEvent } from '../types';
import { EventBatchingService } from '../services/event-batching.service';
import { PrivacyService, PrivacyPreferences } from '../services/privacy.service';

export class AnalyticsSession {
  private readonly sessionId: string;
  private readonly userId?: string;
  private readonly startTime: Date;
  private endTime?: Date;
  private isActive: boolean = true;
  private batchingService?: EventBatchingService;
  private events: (CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent)[] = [];
  private privacyPreferences: PrivacyPreferences = {};

  constructor(
    userId?: string,
    privacyPreferences: PrivacyPreferences = {}
  ) {
    this.sessionId = crypto.randomUUID();
    this.userId = userId;
    this.startTime = new Date();
    this.privacyPreferences = privacyPreferences;
  }

  /**
   * Get session ID
   */
  public getSessionId(): string {
    return this.sessionId;
  }

  /**
   * Get session duration in milliseconds
   */
  public getDuration(): number {
    const endTime = this.endTime || new Date();
    return endTime.getTime() - this.startTime.getTime();
  }

  /**
   * Check if session is active
   */
  public getIsActive(): boolean {
    return this.isActive;
  }

  /**
   * Set up event batching
   */
  public setupBatching(
    batchSize: number = 100,
    flushInterval: number = 30000,
    onFlush: (events: (CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent)[]) => Promise<void>
  ): void {
    this.batchingService = new EventBatchingService(batchSize, flushInterval, onFlush);
  }

  /**
   * Add event to session
   */
  public addEvent(event: CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent): void {
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
  public updatePrivacyPreferences(preferences: Partial<PrivacyPreferences>): void {
    this.privacyPreferences = { ...this.privacyPreferences, ...preferences };
  }

  /**
   * Get all events in session
   */
  public getEvents(): (CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent)[] {
    return [...this.events];
  }

  /**
   * Get events by type
   */
  public getEventsByType(eventType: string): (CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent)[] {
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
  public getStatistics(): {
    sessionId: string;
    userId?: string;
    startTime: Date;
    endTime?: Date;
    duration: number;
    eventCount: number;
    eventsByType: Record<string, number>;
    isActive: boolean;
  } {
    const eventsByType: Record<string, number> = {};

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
  public async end(): Promise<void> {
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
  public cleanupExpiredEvents(retentionDays: number = 90): void {
    this.events = PrivacyService.removeExpiredEvents(this.events, retentionDays);
  }

  /**
   * Generate privacy report for session
   */
  public generatePrivacyReport(): {
    sessionId: string;
    totalEvents: number;
    anonymizedEvents: number;
    eventsWithPII: number;
    expiredEvents: number;
    complianceIssues: string[];
  } {
    const baseReport = PrivacyService.generatePrivacyReport(this.events);
    return {
      sessionId: this.sessionId,
      ...baseReport,
    };
  }

  /**
   * Export session data
   */
  public export(): {
    sessionId: string;
    userId?: string;
    startTime: Date;
    endTime?: Date;
    isActive: boolean;
    events: (CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent)[];
    statistics: ReturnType<AnalyticsSession['getStatistics']>;
  } {
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
  public async destroy(): Promise<void> {
    await this.end();

    if (this.batchingService) {
      await this.batchingService.destroy();
    }

    this.events = [];
  }
}