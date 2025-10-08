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
    toData() {
        return {
            eventType: this.getEventName(),
            aggregateId: this.aggregateId,
            occurredAt: this.occurredAt,
            profileId: this.profileId,
            role: this.role,
            memberCount: this.memberCount
        };
    }
}
exports.MemberJoinedEvent = MemberJoinedEvent;
//# sourceMappingURL=member-joined.event.js.map