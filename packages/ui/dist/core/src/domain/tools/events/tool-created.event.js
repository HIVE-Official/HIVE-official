/**
 * ToolCreatedEvent
 * Fired when a new tool is created in HiveLab
 */
import { DomainEvent } from '../../shared/base/DomainEvent.base';
export class ToolCreatedEvent extends DomainEvent {
    constructor(aggregateId, toolName, creatorId, spaceId) {
        super(aggregateId);
        this.toolName = toolName;
        this.creatorId = creatorId;
        this.spaceId = spaceId;
    }
    getEventName() {
        return 'ToolCreated';
    }
    toData() {
        return {
            eventType: this.getEventName(),
            aggregateId: this.aggregateId,
            occurredAt: this.occurredAt,
            toolName: this.toolName,
            creatorId: this.creatorId,
            spaceId: this.spaceId
        };
    }
}
//# sourceMappingURL=tool-created.event.js.map