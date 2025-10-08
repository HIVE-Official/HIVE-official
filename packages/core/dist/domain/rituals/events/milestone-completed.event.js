"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MilestoneCompletedEvent = void 0;
const DomainEvent_base_1 = require("../../shared/base/DomainEvent.base");
class MilestoneCompletedEvent extends DomainEvent_base_1.DomainEvent {
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
exports.MilestoneCompletedEvent = MilestoneCompletedEvent;
//# sourceMappingURL=milestone-completed.event.js.map