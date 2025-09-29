/**
 * Base Domain Event class following DDD principles
 * Domain Events capture something that happened in the domain
 */
export declare abstract class DomainEvent {
    readonly occurredAt: Date;
    readonly aggregateId: string;
    protected constructor(aggregateId: string);
    abstract getEventName(): string;
}
//# sourceMappingURL=DomainEvent.base.d.ts.map