/**
 * Base Domain Event class following DDD principles
 * Domain Events capture something that happened in the domain
 */
export class DomainEvent {
    constructor(aggregateId) {
        this.occurredAt = new Date();
        this.aggregateId = aggregateId;
    }
}
//# sourceMappingURL=DomainEvent.base.js.map