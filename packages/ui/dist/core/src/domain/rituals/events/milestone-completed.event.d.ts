import { DomainEvent } from '../../shared/base/DomainEvent.base';
export declare class MilestoneCompletedEvent extends DomainEvent {
    readonly milestoneId: string;
    readonly milestoneName: string;
    readonly rewards: Array<{
        type: string;
        value: string | number;
        description: string;
    }>;
    constructor(aggregateId: string, milestoneId: string, milestoneName: string, rewards: Array<{
        type: string;
        value: string | number;
        description: string;
    }>);
    getEventName(): string;
    toData(): any;
}
//# sourceMappingURL=milestone-completed.event.d.ts.map