"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRoot = void 0;
const Entity_base_1 = require("./Entity.base");
/**
 * Base Aggregate Root class following DDD principles
 * Aggregate Roots are the entry point to an aggregate
 */
class AggregateRoot extends Entity_base_1.Entity {
    constructor() {
        super(...arguments);
        this._domainEvents = [];
    }
    get domainEvents() {
        return this._domainEvents;
    }
    addDomainEvent(domainEvent) {
        this._domainEvents.push(domainEvent);
    }
    clearEvents() {
        this._domainEvents = [];
    }
    markEventAsDispatched(event) {
        const index = this._domainEvents.findIndex(e => e === event);
        if (index > -1) {
            this._domainEvents.splice(index, 1);
        }
    }
}
exports.AggregateRoot = AggregateRoot;
//# sourceMappingURL=AggregateRoot.base.js.map