/**
 * ToolForkedEvent
 * Fired when a tool is forked by another user
 */
import { DomainEvent } from '../../shared/base/DomainEvent.base';
export class ToolForkedEvent extends DomainEvent {
    constructor(aggregateId, // Original tool ID
    forkedToolId, forkedBy, totalForks) {
        super(aggregateId);
        this.forkedToolId = forkedToolId;
        this.forkedBy = forkedBy;
        this.totalForks = totalForks;
    }
    getEventName() {
        return 'ToolForked';
    }
    toData() {
        return {
            eventType: this.getEventName(),
            aggregateId: this.aggregateId,
            occurredAt: this.occurredAt,
            forkedToolId: this.forkedToolId,
            forkedBy: this.forkedBy,
            totalForks: this.totalForks
        };
    }
}
//# sourceMappingURL=tool-forked.event.js.map