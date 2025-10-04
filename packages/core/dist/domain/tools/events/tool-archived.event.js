"use strict";
/**
 * ToolArchivedEvent
 * Fired when a tool is archived and removed from active use
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolArchivedEvent = void 0;
const DomainEvent_base_1 = require("../../shared/base/DomainEvent.base");
class ToolArchivedEvent extends DomainEvent_base_1.DomainEvent {
    constructor(aggregateId, toolName) {
        super(aggregateId);
        this.toolName = toolName;
    }
    getEventName() {
        return 'ToolArchived';
    }
}
exports.ToolArchivedEvent = ToolArchivedEvent;
//# sourceMappingURL=tool-archived.event.js.map