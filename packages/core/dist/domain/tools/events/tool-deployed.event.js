"use strict";
/**
 * ToolDeployedEvent
 * Fired when a tool is deployed to one or more spaces
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolDeployedEvent = void 0;
const DomainEvent_base_1 = require("../../shared/base/DomainEvent.base");
class ToolDeployedEvent extends DomainEvent_base_1.DomainEvent {
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
exports.ToolDeployedEvent = ToolDeployedEvent;
//# sourceMappingURL=tool-deployed.event.js.map