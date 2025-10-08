import { DomainEvent } from '../../shared/base/DomainEvent.base';
export class ProfileCreatedEvent extends DomainEvent {
    constructor(aggregateId, handle, email, campusId) {
        super(aggregateId);
        this.handle = handle;
        this.email = email;
        this.campusId = campusId;
    }
    get eventType() {
        return this.getEventName();
    }
    getEventName() {
        return 'ProfileCreated';
    }
    toData() {
        return {
            eventType: this.getEventName(),
            aggregateId: this.aggregateId,
            occurredAt: this.occurredAt,
            handle: this.handle,
            email: this.email,
            campusId: this.campusId
        };
    }
}
//# sourceMappingURL=profile-created.event.js.map