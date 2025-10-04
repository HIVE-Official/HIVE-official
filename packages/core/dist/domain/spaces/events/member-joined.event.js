"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberJoinedEvent = void 0;
const DomainEvent_base_1 = require("../../shared/base/DomainEvent.base");
class MemberJoinedEvent extends DomainEvent_base_1.DomainEvent {
    constructor(aggregateId, profileId, role, memberCount) {
        super(aggregateId);
        this.profileId = profileId;
        this.role = role;
        this.memberCount = memberCount;
    }
    getEventName() {
        return 'MemberJoined';
    }
}
exports.MemberJoinedEvent = MemberJoinedEvent;
//# sourceMappingURL=member-joined.event.js.map