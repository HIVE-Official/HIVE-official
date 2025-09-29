"use strict";
/**
 * Domain Event Base Infrastructure
 * Foundation for event-driven architecture in HIVE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRoot = exports.EventBus = exports.DomainEvent = void 0;
class DomainEvent {
    constructor(metadata) {
        this.occurredOn = new Date();
        this.metadata = {
            timestamp: this.occurredOn,
            ...metadata
        };
    }
    toJSON() {
        return {
            eventName: this.eventName,
            eventVersion: this.eventVersion,
            aggregateId: this.aggregateId,
            occurredOn: this.occurredOn.toISOString(),
            metadata: this.metadata,
            payload: this.getPayload()
        };
    }
}
exports.DomainEvent = DomainEvent;
class EventBus {
    constructor() {
        this.handlers = new Map();
    }
    subscribe(eventName, handler) {
        if (!this.handlers.has(eventName)) {
            this.handlers.set(eventName, []);
        }
        this.handlers.get(eventName).push(handler);
    }
    async publish(event) {
        const handlers = this.handlers.get(event.eventName) || [];
        await Promise.all(handlers.map(handler => handler.handle(event)));
    }
    async publishMany(events) {
        for (const event of events) {
            await this.publish(event);
        }
    }
}
exports.EventBus = EventBus;
// Aggregate root with event support
class AggregateRoot {
    constructor() {
        this._domainEvents = [];
    }
    get domainEvents() {
        return this._domainEvents;
    }
    addDomainEvent(event) {
        this._domainEvents.push(event);
    }
    clearEvents() {
        this._domainEvents = [];
    }
}
exports.AggregateRoot = AggregateRoot;
//# sourceMappingURL=domain-event.js.map