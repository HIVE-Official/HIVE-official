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
}
exports.ParticipantLeftEvent = ParticipantLeftEvent;
//# sourceMappingURL=participant-left.event.js.map