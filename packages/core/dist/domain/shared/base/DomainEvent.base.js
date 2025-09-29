"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEvent = void 0;
/**
 * Base Domain Event class following DDD principles
 * Domain Events capture something that happened in the domain
 */
class DomainEvent {
    constructor(aggregateId) {
        this.occurredAt = new Date();
        this.aggregateId = aggregateId;
    }
}
exports.DomainEvent = DomainEvent;
//# sourceMappingURL=DomainEvent.base.js.map