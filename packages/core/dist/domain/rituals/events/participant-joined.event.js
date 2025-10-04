"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantJoinedEvent = void 0;
const DomainEvent_base_1 = require("../../shared/base/DomainEvent.base");
class ParticipantJoinedEvent extends DomainEvent_base_1.DomainEvent {
    constructor(aggregateId, profileId, participantCount) {
        super(aggregateId);
        this.profileId = profileId;
        this.participantCount = participantCount;
    }
    getEventName() {
        return 'ParticipantJoined';
    }
}
exports.ParticipantJoinedEvent = ParticipantJoinedEvent;
//# sourceMappingURL=participant-joined.event.js.map