"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileOnboardedEvent = void 0;
const DomainEvent_base_1 = require("../../shared/base/DomainEvent.base");
class ProfileOnboardedEvent extends DomainEvent_base_1.DomainEvent {
    constructor(aggregateId) {
        super(aggregateId);
    }
    getEventName() {
        return 'ProfileOnboarded';
    }
}
exports.ProfileOnboardedEvent = ProfileOnboardedEvent;
//# sourceMappingURL=profile-onboarded.event.js.map