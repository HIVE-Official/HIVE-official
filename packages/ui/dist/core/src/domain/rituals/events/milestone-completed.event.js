import { DomainEvent } from '../../shared/base/DomainEvent.base';
export class MilestoneCompletedEvent extends DomainEvent {
    constructor(aggregateId, milestoneId, milestoneName, rewards) {
        super(aggregateId);
        this.milestoneId = milestoneId;
        this.milestoneName = milestoneName;
        this.rewards = rewards;
    }
    getEventName() {
        return 'MilestoneCompleted';
    }
    toData() {
        return {
            eventType: this.getEventName(),
            aggregateId: this.aggregateId,
            occurredAt: this.occurredAt,
            milestoneId: this.milestoneId,
            milestoneName: this.milestoneName,
            rewards: this.rewards
        };
    }
}
//# sourceMappingURL=milestone-completed.event.js.map