import { DomainEvent } from '../../shared/base/DomainEvent.base';
export class MemberRoleUpdatedEvent extends DomainEvent {
    constructor(aggregateId, profileId, oldRole, newRole) {
        super(aggregateId);
        this.profileId = profileId;
        this.oldRole = oldRole;
        this.newRole = newRole;
    }
    getEventName() {
        return 'MemberRoleUpdated';
    }
    toData() {
        return {
            eventType: this.getEventName(),
            aggregateId: this.aggregateId,
            occurredAt: this.occurredAt,
            profileId: this.profileId,
            oldRole: this.oldRole,
            newRole: this.newRole
        };
    }
}
//# sourceMappingURL=member-role-updated.event.js.map