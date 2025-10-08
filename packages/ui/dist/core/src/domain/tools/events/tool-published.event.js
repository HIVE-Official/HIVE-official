/**
 * ToolPublishedEvent
 * Fired when a tool is published and made available to others
 */
import { DomainEvent } from '../../shared/base/DomainEvent.base';
export class ToolPublishedEvent extends DomainEvent {
    constructor(aggregateId, toolName, visibility) {
        super(aggregateId);
        this.toolName = toolName;
        this.visibility = visibility;
    }
    getEventName() {
        return 'ToolPublished';
    }
    toData() {
        return {
            eventType: this.getEventName(),
            aggregateId: this.aggregateId,
            occurredAt: this.occurredAt,
            toolName: this.toolName,
            visibility: this.visibility
        };
    }
}
//# sourceMappingURL=tool-published.event.js.map