"use strict";
/**
 * ToolPublishedEvent
 * Fired when a tool is published and made available to others
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolPublishedEvent = void 0;
const DomainEvent_base_1 = require("../../shared/base/DomainEvent.base");
class ToolPublishedEvent extends DomainEvent_base_1.DomainEvent {
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
exports.ToolPublishedEvent = ToolPublishedEvent;
//# sourceMappingURL=tool-published.event.js.map