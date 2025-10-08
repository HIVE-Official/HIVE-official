import { DomainEvent } from '../../shared/base/DomainEvent.base';
export declare class MemberRemovedEvent extends DomainEvent {
    readonly profileId: string;
    readonly memberCount: number;
    constructor(aggregateId: string, profileId: string, memberCount: number);
    getEventName(): string;
    toData(): any;
}
//# sourceMappingURL=member-removed.event.d.ts.map