"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRoleUpdatedEvent = void 0;
const DomainEvent_base_1 = require("../../shared/base/DomainEvent.base");
class MemberRoleUpdatedEvent extends DomainEvent_base_1.DomainEvent {
    constructor(aggregateId, profileId, oldRole, newRole) {
        super(aggregateId);
        this.profileId = profileId;
        this.oldRole = oldRole;
        this.newRole = newRole;
    }
    getEventName() {
        return 'MemberRoleUpdated';
    }
}
exports.MemberRoleUpdatedEvent = MemberRoleUpdatedEvent;
//# sourceMappingURL=member-role-updated.event.js.map