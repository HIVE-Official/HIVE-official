import { DomainEvent } from '../../shared/base/DomainEvent.base';
export declare class MemberRoleUpdatedEvent extends DomainEvent {
    readonly profileId: string;
    readonly oldRole: 'admin' | 'moderator' | 'member';
    readonly newRole: 'admin' | 'moderator' | 'member';
    constructor(aggregateId: string, profileId: string, oldRole: 'admin' | 'moderator' | 'member', newRole: 'admin' | 'moderator' | 'member');
    getEventName(): string;
    toData(): any;
}
//# sourceMappingURL=member-role-updated.event.d.ts.map