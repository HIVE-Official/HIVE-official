import { DomainEvent } from '../../shared/base/DomainEvent.base';
export declare class ParticipantLeftEvent extends DomainEvent {
    readonly profileId: string;
    readonly participantCount: number;
    constructor(aggregateId: string, profileId: string, participantCount: number);
    getEventName(): string;
}
//# sourceMappingURL=participant-left.event.d.ts.map