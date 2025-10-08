import { DomainEvent } from '../../shared/base/DomainEvent.base';
export class ParticipantLeftEvent extends DomainEvent {
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
//# sourceMappingURL=participant-left.event.js.map