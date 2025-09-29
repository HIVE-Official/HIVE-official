import { DomainEvent } from '../../shared/base/DomainEvent.base';
export class ProfileOnboardedEvent extends DomainEvent {
    constructor(aggregateId) {
        super(aggregateId);
    }
    getEventName() {
        return 'ProfileOnboarded';
    }
}
//# sourceMappingURL=profile-onboarded.event.js.map