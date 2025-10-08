"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RitualActivatedEvent = void 0;
const DomainEvent_base_1 = require("../../shared/base/DomainEvent.base");
class RitualActivatedEvent extends DomainEvent_base_1.DomainEvent {
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
exports.RitualActivatedEvent = RitualActivatedEvent;
//# sourceMappingURL=ritual-activated.event.js.map