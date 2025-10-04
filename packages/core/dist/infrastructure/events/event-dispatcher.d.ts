/**
 * Event Dispatcher
 * Utility to dispatch domain events from aggregates after persistence
 */
import { AggregateRoot } from '../../domain/shared/base/AggregateRoot.base';
export declare class EventDispatcher {
    /**
     * Dispatch all pending events from an aggregate
     * Call this AFTER successfully persisting the aggregate
     */
    static dispatchEventsForAggregate(aggregate: AggregateRoot<any>): Promise<void>;
    /**
     * Dispatch events from multiple aggregates
     */
    static dispatchEventsForAggregates(aggregates: AggregateRoot<any>[]): Promise<void>;
    /**
     * Mark event as dispatched without actually dispatching
     * (Useful for testing)
     */
    static markEventAsDispatched(aggregate: AggregateRoot<any>, eventIndex?: number): void;
}
//# sourceMappingURL=event-dispatcher.d.ts.map