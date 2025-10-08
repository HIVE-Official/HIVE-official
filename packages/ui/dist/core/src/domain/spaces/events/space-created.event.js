import { DomainEvent } from '../../shared/base/DomainEvent.base';
export class SpaceCreatedEvent extends DomainEvent {
    constructor(aggregateId, name, category, createdBy) {
        super(aggregateId);
        this.name = name;
        this.category = category;
        this.createdBy = createdBy;
    }
    getEventName() {
        return 'SpaceCreated';
    }
    toData() {
        return {
            eventType: this.getEventName(),
            aggregateId: this.aggregateId,
            occurredAt: this.occurredAt,
            name: this.name,
            category: this.category,
            createdBy: this.createdBy
        };
    }
}
//# sourceMappingURL=space-created.event.js.map