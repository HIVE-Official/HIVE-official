import { DomainEvent } from '../../shared/base/DomainEvent.base';
export class MemberJoinedEvent extends DomainEvent {
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
//# sourceMappingURL=member-joined.event.js.map