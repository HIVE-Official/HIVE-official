import { Entity } from './Entity.base';
/**
 * Base Aggregate Root class following DDD principles
 * Aggregate Roots are the entry point to an aggregate
 */
export class AggregateRoot extends Entity {
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
//# sourceMappingURL=AggregateRoot.base.js.map