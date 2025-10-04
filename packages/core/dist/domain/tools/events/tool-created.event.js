"use strict";
/**
 * ToolCreatedEvent
 * Fired when a new tool is created in HiveLab
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolCreatedEvent = void 0;
const DomainEvent_base_1 = require("../../shared/base/DomainEvent.base");
class ToolCreatedEvent extends DomainEvent_base_1.DomainEvent {
    constructor(aggregateId, toolName, creatorId, spaceId) {
        super(aggregateId);
        this.toolName = toolName;
        this.creatorId = creatorId;
        this.spaceId = spaceId;
    }
    getEventName() {
        return 'ToolCreated';
    }
}
exports.ToolCreatedEvent = ToolCreatedEvent;
//# sourceMappingURL=tool-created.event.js.map