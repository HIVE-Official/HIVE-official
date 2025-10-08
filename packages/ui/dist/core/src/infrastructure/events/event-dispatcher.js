/**
 * Event Dispatcher
 * Utility to dispatch domain events from aggregates after persistence
 */
import { getEventBus } from './event-bus';
export class EventDispatcher {
    /**
     * Dispatch all pending events from an aggregate
     * Call this AFTER successfully persisting the aggregate
     */
    static async dispatchEventsForAggregate(aggregate) {
        const events = aggregate.domainEvents;
        if (events.length === 0) {
            return;
        }
        const eventBus = getEventBus();
        // Publish all events
        await eventBus.publishAll(events);
        // Clear events from aggregate after successful dispatch
        aggregate.clearEvents();
    }
    /**
     * Dispatch events from multiple aggregates
     */
    static async dispatchEventsForAggregates(aggregates) {
        for (const aggregate of aggregates) {
            await this.dispatchEventsForAggregate(aggregate);
        }
    }
    /**
     * Mark event as dispatched without actually dispatching
     * (Useful for testing)
     */
    static markEventAsDispatched(aggregate, eventIndex = 0) {
        const events = aggregate.domainEvents;
        if (events[eventIndex]) {
            aggregate.markEventAsDispatched(events[eventIndex]);
        }
    }
}
//# sourceMappingURL=event-dispatcher.js.map