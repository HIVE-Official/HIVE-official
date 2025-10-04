/**
 * ToolUsedEvent
 * Fired when a tool is used by a student
 */
import { DomainEvent } from '../../shared/base/DomainEvent.base';
export class ToolUsedEvent extends DomainEvent {
    constructor(aggregateId, toolName, userId, totalUses) {
        super(aggregateId);
        this.toolName = toolName;
        this.userId = userId;
        this.totalUses = totalUses;
    }
    getEventName() {
        return 'ToolUsed';
    }
    toData() {
        return {
            eventType: this.getEventName(),
            aggregateId: this.aggregateId,
            occurredAt: this.occurredAt,
            toolName: this.toolName,
            userId: this.userId,
            totalUses: this.totalUses
        };
    }
}
//# sourceMappingURL=tool-used.event.js.map