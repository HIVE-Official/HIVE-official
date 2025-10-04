"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RitualDeactivatedEvent = void 0;
const DomainEvent_base_1 = require("../../shared/base/DomainEvent.base");
class RitualDeactivatedEvent extends DomainEvent_base_1.DomainEvent {
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
exports.RitualDeactivatedEvent = RitualDeactivatedEvent;
//# sourceMappingURL=ritual-deactivated.event.js.map