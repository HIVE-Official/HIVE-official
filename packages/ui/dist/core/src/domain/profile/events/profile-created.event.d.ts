import { DomainEvent } from '../../shared/base/DomainEvent.base';
export declare class ProfileCreatedEvent extends DomainEvent {
    readonly handle: string;
    readonly email: string;
    readonly campusId: string;
    constructor(aggregateId: string, handle: string, email: string, campusId: string);
    get eventType(): string;
    getEventName(): string;
    toData(): any;
}
//# sourceMappingURL=profile-created.event.d.ts.map