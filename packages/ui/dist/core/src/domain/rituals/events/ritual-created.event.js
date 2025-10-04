import { DomainEvent } from '../../shared/base/DomainEvent.base';
export class RitualCreatedEvent extends DomainEvent {
    constructor(aggregateId, name, type, createdBy) {
        super(aggregateId);
        this.name = name;
        this.type = type;
        this.createdBy = createdBy;
    }
    getEventName() {
        return 'RitualCreated';
    }
    toData() {
        return {
            eventType: this.getEventName(),
            aggregateId: this.aggregateId,
            occurredAt: this.occurredAt,
            name: this.name,
            type: this.type,
            createdBy: this.createdBy
        };
    }
}
//# sourceMappingURL=ritual-created.event.js.map