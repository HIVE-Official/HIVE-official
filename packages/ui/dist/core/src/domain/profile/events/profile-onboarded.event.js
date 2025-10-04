import { DomainEvent } from '../../shared/base/DomainEvent.base';
export class ProfileOnboardedEvent extends DomainEvent {
    constructor(aggregateId, campusId, interests) {
        super(aggregateId);
        this.campusId = campusId;
        this.interests = interests;
    }
    get eventType() {
        return this.getEventName();
    }
    getEventName() {
        return 'ProfileOnboarded';
    }
    toData() {
        return {
            eventType: this.getEventName(),
            aggregateId: this.aggregateId,
            occurredAt: this.occurredAt,
            campusId: this.campusId,
            interests: this.interests
        };
    }
}
//# sourceMappingURL=profile-onboarded.event.js.map