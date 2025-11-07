"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RitualPhaseChangedEvent = void 0;
const domain_event_1 = require("../../shared/domain-event");
class RitualPhaseChangedEvent extends domain_event_1.DomainEvent {
    constructor(payload) {
        super();
        this.payload = payload;
    }
    get aggregateId() {
        return this.payload.ritualId;
    }
    get eventName() {
        return 'RitualPhaseChanged';
    }
    get eventVersion() {
        return 1;
    }
    get data() {
        return this.payload;
    }
    getPayload() {
        return { ...this.payload };
    }
}
exports.RitualPhaseChangedEvent = RitualPhaseChangedEvent;
//# sourceMappingURL=ritual-phase-changed.event.js.map