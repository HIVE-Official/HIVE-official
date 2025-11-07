"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RitualCreatedEvent = void 0;
const domain_event_1 = require("../../shared/domain-event");
class RitualCreatedEvent extends domain_event_1.DomainEvent {
    constructor(ritual) {
        super();
        this.payload = ritual;
    }
    get aggregateId() {
        return this.payload.id;
    }
    get eventName() {
        return 'RitualCreated';
    }
    get eventVersion() {
        return 1;
    }
    getPayload() {
        return {
            campusId: this.payload.campusId,
            archetype: this.payload.archetype,
            phase: this.payload.phase,
            startsAt: this.payload.startsAt,
            endsAt: this.payload.endsAt,
        };
    }
}
exports.RitualCreatedEvent = RitualCreatedEvent;
//# sourceMappingURL=ritual-created.event.js.map