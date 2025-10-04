"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileCreatedEvent = void 0;
const DomainEvent_base_1 = require("../../shared/base/DomainEvent.base");
class ProfileCreatedEvent extends DomainEvent_base_1.DomainEvent {
    constructor(aggregateId, email, handle) {
        super(aggregateId);
        this.email = email;
        this.handle = handle;
    }
    getEventName() {
        return 'ProfileCreated';
    }
}
exports.ProfileCreatedEvent = ProfileCreatedEvent;
//# sourceMappingURL=profile-created.event.js.map