/**
 * Feed Analytics Event
 * Domain event for feed-related analytics
 */
import { FeedAnalyticsEvent, FeedEventType } from '../types';
export declare class FeedAnalyticsEventEntity implements FeedAnalyticsEvent {
    readonly eventId: string;
    readonly eventType: FeedEventType;
    readonly userId?: string;
    readonly userIdHash?: string;
    readonly sessionId: string;
    readonly timestamp: Date;
    readonly postId?: string;
    readonly spaceId: string;
    readonly anonymized?: boolean;
    readonly metadata?: Record<string, unknown>;
    constructor(data: FeedAnalyticsEvent);
    static create(eventType: FeedEventType, context: Partial<FeedAnalyticsEvent> & {
        spaceId: string;
    }): FeedAnalyticsEventEntity;
    isPostEvent(): boolean;
    isSpaceEvent(): boolean;
    isBuilderEvent(): boolean;
    anonymize(): FeedAnalyticsEventEntity;
    withMetadata(metadata: Record<string, unknown>): FeedAnalyticsEventEntity;
    toJSON(): FeedAnalyticsEvent;
}
//# sourceMappingURL=feed-analytics.event.d.ts.map