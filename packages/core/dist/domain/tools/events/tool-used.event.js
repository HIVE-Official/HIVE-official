"use strict";
/**
 * ToolUsedEvent
 * Fired when a tool is used by a student
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolUsedEvent = void 0;
const DomainEvent_base_1 = require("../../shared/base/DomainEvent.base");
class ToolUsedEvent extends DomainEvent_base_1.DomainEvent {
    constructor(aggregateId, toolName, userId, totalUses) {
        super(aggregateId);
        this.toolName = toolName;
        this.userId = userId;
        this.totalUses = totalUses;
    }
    getEventName() {
        return 'ToolUsed';
    }
}
exports.ToolUsedEvent = ToolUsedEvent;
//# sourceMappingURL=tool-used.event.js.map