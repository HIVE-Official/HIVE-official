/**
 * Event Batching Service
 * Domain service for batching and processing analytics events
 */
import { CreationAnalyticsEvent, FeedAnalyticsEvent, OnboardingAnalyticsEvent } from '../types';
export declare class EventBatchingService {
    private readonly batchSize;
    private readonly flushInterval;
    private readonly onFlush;
    private events;
    private batchTimeout;
    constructor(batchSize: number, flushInterval: number, onFlush: (events: (CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent)[]) => Promise<void>);
    /**
     * Add event to batch
     */
    addEvent(event: CreationAnalyticsEvent | FeedAnalyticsEvent | OnboardingAnalyticsEvent): void;
    /**
     * Flush all pending events
     */
    flush(): Promise<void>;
    /**
     * Get current batch size
     */
    getBatchSize(): number;
    /**
     * Clear all pending events
     */
    clear(): void;
    /**
     * Destroy the service and flush remaining events
     */
    destroy(): Promise<void>;
}
//# sourceMappingURL=event-batching.service.d.ts.map