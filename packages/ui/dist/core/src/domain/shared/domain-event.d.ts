/**
 * Domain Event Base Infrastructure
 * Foundation for event-driven architecture in HIVE
 */
export interface DomainEventMetadata {
    correlationId?: string;
    causationId?: string;
    userId?: string;
    timestamp: Date;
}
export declare abstract class DomainEvent {
    readonly occurredOn: Date;
    readonly metadata: DomainEventMetadata;
    constructor(metadata?: Partial<DomainEventMetadata>);
    abstract get aggregateId(): string;
    abstract get eventName(): string;
    abstract get eventVersion(): number;
    toJSON(): Record<string, unknown>;
    protected abstract getPayload(): Record<string, unknown>;
}
export interface DomainEventHandler<T extends DomainEvent> {
    handle(event: T): Promise<void>;
}
export interface EventStore {
    save(event: DomainEvent): Promise<void>;
    getEvents(aggregateId: string): Promise<DomainEvent[]>;
}
export declare class EventBus {
    private handlers;
    subscribe<T extends DomainEvent>(eventName: string, handler: DomainEventHandler<T>): void;
    publish(event: DomainEvent): Promise<void>;
    publishMany(events: DomainEvent[]): Promise<void>;
}
export declare abstract class AggregateRoot {
    private _domainEvents;
    get domainEvents(): DomainEvent[];
    protected addDomainEvent(event: DomainEvent): void;
    clearEvents(): void;
}
//# sourceMappingURL=domain-event.d.ts.map