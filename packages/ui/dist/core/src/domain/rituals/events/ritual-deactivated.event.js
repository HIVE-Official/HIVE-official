import { DomainEvent } from '../../shared/base/DomainEvent.base';
export class RitualDeactivatedEvent extends DomainEvent {
    constructor(aggregateId) {
        super(aggregateId);
    }
    getEventName() {
        return 'RitualDeactivated';
    }
    toData() {
        return {
            eventType: this.getEventName(),
            aggregateId: this.aggregateId,
            occurredAt: this.occurredAt
        };
    }
}
//# sourceMappingURL=ritual-deactivated.event.js.map