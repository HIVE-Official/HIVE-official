import { DomainEvent } from '../../shared/base/DomainEvent.base';
export declare class ProfileOnboardedEvent extends DomainEvent {
    readonly campusId: string;
    readonly interests: string[];
    constructor(aggregateId: string, campusId: string, interests: string[]);
    get eventType(): string;
    getEventName(): string;
    toData(): any;
}
//# sourceMappingURL=profile-onboarded.event.d.ts.map