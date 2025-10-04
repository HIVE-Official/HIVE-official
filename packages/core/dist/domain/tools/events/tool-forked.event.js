"use strict";
/**
 * ToolForkedEvent
 * Fired when a tool is forked by another user
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolForkedEvent = void 0;
const DomainEvent_base_1 = require("../../shared/base/DomainEvent.base");
class ToolForkedEvent extends DomainEvent_base_1.DomainEvent {
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
}
exports.ToolForkedEvent = ToolForkedEvent;
//# sourceMappingURL=tool-forked.event.js.map