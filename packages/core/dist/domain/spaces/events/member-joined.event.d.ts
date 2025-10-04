import { DomainEvent } from '../../shared/base/DomainEvent.base';
export declare class MemberJoinedEvent extends DomainEvent {
    readonly profileId: string;
    readonly role: 'admin' | 'moderator' | 'member';
    readonly memberCount: number;
    constructor(aggregateId: string, profileId: string, role: 'admin' | 'moderator' | 'member', memberCount: number);
    getEventName(): string;
}
//# sourceMappingURL=member-joined.event.d.ts.map