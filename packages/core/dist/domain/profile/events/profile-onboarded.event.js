"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileOnboardedEvent = void 0;
const DomainEvent_base_1 = require("../../shared/base/DomainEvent.base");
class ProfileOnboardedEvent extends DomainEvent_base_1.DomainEvent {
    constructor(aggregateId, campusId, interests) {
        super(aggregateId);
        this.campusId = campusId;
        this.interests = interests;
    }
    get eventType() {
        return this.getEventName();
    }
    getEventName() {
        return 'ProfileOnboarded';
    }
    toData() {
        return {
            eventType: this.getEventName(),
            aggregateId: this.aggregateId,
            occurredAt: this.occurredAt,
            campusId: this.campusId,
            interests: this.interests
        };
    }
}
exports.ProfileOnboardedEvent = ProfileOnboardedEvent;
//# sourceMappingURL=profile-onboarded.event.js.map