import { DomainEvent } from '../../shared/base/DomainEvent.base';
export declare class ProfileCreatedEvent extends DomainEvent {
    readonly email: string;
    readonly handle: string;
    constructor(aggregateId: string, email: string, handle: string);
    getEventName(): string;
}
//# sourceMappingURL=profile-created.event.d.ts.map