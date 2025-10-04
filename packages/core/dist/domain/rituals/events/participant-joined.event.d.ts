import { DomainEvent } from '../../shared/base/DomainEvent.base';
export declare class ParticipantJoinedEvent extends DomainEvent {
    readonly profileId: string;
    readonly participantCount: number;
    constructor(aggregateId: string, profileId: string, participantCount: number);
    getEventName(): string;
    toData(): any;
}
//# sourceMappingURL=participant-joined.event.d.ts.map