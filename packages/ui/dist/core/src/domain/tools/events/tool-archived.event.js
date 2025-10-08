/**
 * ToolArchivedEvent
 * Fired when a tool is archived and removed from active use
 */
import { DomainEvent } from '../../shared/base/DomainEvent.base';
export class ToolArchivedEvent extends DomainEvent {
    constructor(aggregateId, toolName) {
        super(aggregateId);
        this.toolName = toolName;
    }
    getEventName() {
        return 'ToolArchived';
    }
    toData() {
        return {
            eventType: this.getEventName(),
            aggregateId: this.aggregateId,
            occurredAt: this.occurredAt,
            toolName: this.toolName
        };
    }
}
//# sourceMappingURL=tool-archived.event.js.map