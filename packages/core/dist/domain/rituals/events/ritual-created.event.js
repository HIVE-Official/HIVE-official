"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RitualCreatedEvent = void 0;
const DomainEvent_base_1 = require("../../shared/base/DomainEvent.base");
class RitualCreatedEvent extends DomainEvent_base_1.DomainEvent {
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
exports.RitualCreatedEvent = RitualCreatedEvent;
//# sourceMappingURL=ritual-created.event.js.map