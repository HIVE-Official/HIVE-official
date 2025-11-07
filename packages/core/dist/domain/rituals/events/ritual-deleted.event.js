"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RitualDeletedEvent = void 0;
const domain_event_1 = require("../../shared/domain-event");
class RitualDeletedEvent extends domain_event_1.DomainEvent {
    constructor(payload) {
        super();
        this.payload = payload;
    }
    get aggregateId() {
        return this.payload.ritualId;
    }
    get eventName() {
        return 'RitualDeleted';
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
exports.RitualDeletedEvent = RitualDeletedEvent;
//# sourceMappingURL=ritual-deleted.event.js.map