"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantLeftEvent = void 0;
const DomainEvent_base_1 = require("../../shared/base/DomainEvent.base");
class ParticipantLeftEvent extends DomainEvent_base_1.DomainEvent {
    constructor(aggregateId, profileId, participantCount) {
        super(aggregateId);
        this.profileId = profileId;
        this.participantCount = participantCount;
    }
    getEventName() {
        return 'ParticipantLeft';
    }
    toData() {
        return {
            eventType: this.getEventName(),
            aggregateId: this.aggregateId,
            occurredAt: this.occurredAt,
            profileId: this.profileId,
            participantCount: this.participantCount
        };
    }
}
exports.ParticipantLeftEvent = ParticipantLeftEvent;
//# sourceMappingURL=participant-left.event.js.map