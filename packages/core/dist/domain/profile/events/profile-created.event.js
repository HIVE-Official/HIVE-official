"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileCreatedEvent = void 0;
const DomainEvent_base_1 = require("../../shared/base/DomainEvent.base");
class ProfileCreatedEvent extends DomainEvent_base_1.DomainEvent {
    constructor(aggregateId, handle, email, campusId) {
        super(aggregateId);
        this.handle = handle;
        this.email = email;
        this.campusId = campusId;
    }
    get eventType() {
        return this.getEventName();
    }
    getEventName() {
        return 'ProfileCreated';
    }
    toData() {
        return {
            eventType: this.getEventName(),
            aggregateId: this.aggregateId,
            occurredAt: this.occurredAt,
            handle: this.handle,
            email: this.email,
            campusId: this.campusId
        };
    }
}
exports.ProfileCreatedEvent = ProfileCreatedEvent;
//# sourceMappingURL=profile-created.event.js.map