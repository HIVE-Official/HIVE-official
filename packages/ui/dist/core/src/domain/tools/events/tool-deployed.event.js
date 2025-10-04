/**
 * ToolDeployedEvent
 * Fired when a tool is deployed to one or more spaces
 */
import { DomainEvent } from '../../shared/base/DomainEvent.base';
export class ToolDeployedEvent extends DomainEvent {
    constructor(aggregateId, toolName, spaceIds, totalDeployments) {
        super(aggregateId);
        this.toolName = toolName;
        this.spaceIds = spaceIds;
        this.totalDeployments = totalDeployments;
    }
    getEventName() {
        return 'ToolDeployed';
    }
    toData() {
        return {
            eventType: this.getEventName(),
            aggregateId: this.aggregateId,
            occurredAt: this.occurredAt,
            toolName: this.toolName,
            spaceIds: this.spaceIds,
            totalDeployments: this.totalDeployments
        };
    }
}
//# sourceMappingURL=tool-deployed.event.js.map