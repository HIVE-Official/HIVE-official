/**
 * Feed Domain Events
 * Events that occur within the Feed aggregate
 */
import { DomainEvent, DomainEventMetadata } from '../shared/domain-event';
import { FeedItemId, InteractionType } from './value-objects';
export declare class FeedItemViewed extends DomainEvent {
    readonly feedId: string;
    readonly itemId: FeedItemId;
    readonly userId: string;
    readonly viewDurationMs?: number | undefined;
    constructor(feedId: string, itemId: FeedItemId, userId: string, viewDurationMs?: number | undefined, metadata?: Partial<DomainEventMetadata>);
    get aggregateId(): string;
    get eventName(): string;
    get eventVersion(): number;
    protected getPayload(): Record<string, unknown>;
}
export declare class FeedItemInteracted extends DomainEvent {
    readonly feedId: string;
    readonly itemId: FeedItemId;
    readonly userId: string;
    readonly interactionType: InteractionType;
    readonly interactionMetadata?: Record<string, unknown> | undefined;
    constructor(feedId: string, itemId: FeedItemId, userId: string, interactionType: InteractionType, interactionMetadata?: Record<string, unknown> | undefined, metadata?: Partial<DomainEventMetadata>);
    get aggregateId(): string;
    get eventName(): string;
    get eventVersion(): number;
    protected getPayload(): Record<string, unknown>;
}
export declare class FeedItemBecameTrending extends DomainEvent {
    readonly feedId: string;
    readonly itemId: FeedItemId;
    readonly trendingScore: number;
    readonly reason: 'high_engagement' | 'velocity' | 'viral';
    constructor(feedId: string, itemId: FeedItemId, trendingScore: number, reason: 'high_engagement' | 'velocity' | 'viral', metadata?: Partial<DomainEventMetadata>);
    get aggregateId(): string;
    get eventName(): string;
    get eventVersion(): number;
    protected getPayload(): Record<string, unknown>;
}
export declare class FeedRefreshed extends DomainEvent {
    readonly feedId: string;
    readonly userId: string;
    readonly itemCount: number;
    readonly filterType: string;
    constructor(feedId: string, userId: string, itemCount: number, filterType: string, metadata?: Partial<DomainEventMetadata>);
    get aggregateId(): string;
    get eventName(): string;
    get eventVersion(): number;
    protected getPayload(): Record<string, unknown>;
}
export declare class FeedFilterChanged extends DomainEvent {
    readonly feedId: string;
    readonly userId: string;
    readonly oldFilter: string;
    readonly newFilter: string;
    constructor(feedId: string, userId: string, oldFilter: string, newFilter: string, metadata?: Partial<DomainEventMetadata>);
    get aggregateId(): string;
    get eventName(): string;
    get eventVersion(): number;
    protected getPayload(): Record<string, unknown>;
}
export declare class FeedEngagementThresholdReached extends DomainEvent {
    readonly feedId: string;
    readonly userId: string;
    readonly engagementRate: number;
    readonly threshold: number;
    readonly thresholdType: 'high' | 'low';
    constructor(feedId: string, userId: string, engagementRate: number, threshold: number, thresholdType: 'high' | 'low', metadata?: Partial<DomainEventMetadata>);
    get aggregateId(): string;
    get eventName(): string;
    get eventVersion(): number;
    protected getPayload(): Record<string, unknown>;
}
//# sourceMappingURL=events.d.ts.map