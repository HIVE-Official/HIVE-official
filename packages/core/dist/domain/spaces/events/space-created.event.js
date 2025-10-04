"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceCreatedEvent = void 0;
const DomainEvent_base_1 = require("../../shared/base/DomainEvent.base");
class SpaceCreatedEvent extends DomainEvent_base_1.DomainEvent {
    constructor(aggregateId, name, category, createdBy) {
        super(aggregateId);
        this.name = name;
        this.category = category;
        this.createdBy = createdBy;
    }
    getEventName() {
        return 'SpaceCreated';
    }
}
exports.SpaceCreatedEvent = SpaceCreatedEvent;
//# sourceMappingURL=space-created.event.js.map