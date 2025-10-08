import { DomainEvent } from '../../shared/base/DomainEvent.base';
export class RitualActivatedEvent extends DomainEvent {
    constructor(aggregateId) {
        super(aggregateId);
    }
    getEventName() {
        return 'RitualActivated';
    }
    toData() {
        return {
            eventType: this.getEventName(),
            aggregateId: this.aggregateId,
            occurredAt: this.occurredAt
        };
    }
}
//# sourceMappingURL=ritual-activated.event.js.map