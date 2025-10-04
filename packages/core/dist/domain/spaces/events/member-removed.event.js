"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRemovedEvent = void 0;
const DomainEvent_base_1 = require("../../shared/base/DomainEvent.base");
class MemberRemovedEvent extends DomainEvent_base_1.DomainEvent {
    constructor(aggregateId, profileId, memberCount) {
        super(aggregateId);
        this.profileId = profileId;
        this.memberCount = memberCount;
    }
    getEventName() {
        return 'MemberRemoved';
    }
}
exports.MemberRemovedEvent = MemberRemovedEvent;
//# sourceMappingURL=member-removed.event.js.map