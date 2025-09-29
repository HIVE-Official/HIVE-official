import { DomainEvent } from '../../shared/base/DomainEvent.base';
export class ProfileCreatedEvent extends DomainEvent {
    constructor(aggregateId, email, handle) {
        super(aggregateId);
        this.email = email;
        this.handle = handle;
    }
    getEventName() {
        return 'ProfileCreated';
    }
}
//# sourceMappingURL=profile-created.event.js.map