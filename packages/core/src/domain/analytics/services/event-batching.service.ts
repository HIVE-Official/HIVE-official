/**
 * Event Batching Service
 * Domain service for batching and processing analytics events
 */

import { CreationAnalyticsEvent, FeedAnalyticsEvent, OnboardingAnalyticsEvent } from '../types';

export class EventBatchingService {
  private events: (CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent)[] = [];
  private batchTimeout: NodeJS.Timeout | undefined;

  constructor(
    private readonly batchSize: number = 100,
    private readonly flushInterval: number = 30000,
    private readonly onFlush: (events: (CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent)[]) => Promise<void>
  ) {}

  /**
   * Add event to batch
   */
  public addEvent(event: CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent): void {
    this.events.push(event);

    // Flush if batch is full
    if (this.events.length >= this.batchSize) {
      this.flush();
    }

    // Set flush timeout if not already set
    if (!this.batchTimeout) {
      this.batchTimeout = setTimeout(() => {
        this.flush();
      }, this.flushInterval);
    }
  }

  /**
   * Flush all pending events
   */
  public async flush(): Promise<void> {
    if (this.events.length === 0) return;

    const eventsToFlush = [...this.events];
    this.events = [];

    // Clear timeout
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
      this.batchTimeout = undefined;
    }

    try {
      await this.onFlush(eventsToFlush);
    } catch (error) {
      console.error('Failed to flush analytics events:', error);
      // Re-add events to queue for retry
      this.events.unshift(...eventsToFlush);
      throw error;
    }
  }

  /**
   * Get current batch size
   */
  public getBatchSize(): number {
    return this.events.length;
  }

  /**
   * Clear all pending events
   */
  public clear(): void {
    this.events = [];
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
      this.batchTimeout = undefined;
    }
  }

  /**
   * Destroy the service and flush remaining events
   */
  public async destroy(): Promise<void> {
    await this.flush();
    this.clear();
  }
}