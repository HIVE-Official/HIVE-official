/**
 * Creation Analytics Event
 * Domain event for creation-related analytics
 */
import { CreationAnalyticsEvent, CreationEventType } from '../types';
export declare class CreationAnalyticsEventEntity implements CreationAnalyticsEvent {
    readonly eventId: string;
    readonly eventType: CreationEventType;
    readonly userId?: string;
    readonly userIdHash?: string;
    readonly sessionId: string;
    readonly timestamp: Date;
    readonly toolId?: string;
    readonly elementId?: string;
    readonly spaceId?: string;
    readonly anonymized?: boolean;
    readonly metadata?: Record<string, unknown>;
    constructor(data: CreationAnalyticsEvent);
    static create(eventType: CreationEventType, context: Partial<CreationAnalyticsEvent>): CreationAnalyticsEventEntity;
    isBuilderEvent(): boolean;
    isToolLifecycleEvent(): boolean;
    anonymize(): CreationAnalyticsEventEntity;
    withMetadata(metadata: Record<string, unknown>): CreationAnalyticsEventEntity;
    toJSON(): CreationAnalyticsEvent;
}
//# sourceMappingURL=creation-analytics.event.d.ts.map