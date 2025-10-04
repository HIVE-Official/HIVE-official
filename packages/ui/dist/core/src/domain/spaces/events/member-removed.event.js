import { DomainEvent } from '../../shared/base/DomainEvent.base';
export class MemberRemovedEvent extends DomainEvent {
    constructor(aggregateId, profileId, memberCount) {
        super(aggregateId);
        this.profileId = profileId;
        this.memberCount = memberCount;
    }
    getEventName() {
        return 'MemberRemoved';
    }
    toData() {
        return {
            eventType: this.getEventName(),
            aggregateId: this.aggregateId,
            occurredAt: this.occurredAt,
            profileId: this.profileId,
            memberCount: this.memberCount
        };
    }
}
//# sourceMappingURL=member-removed.event.js.map