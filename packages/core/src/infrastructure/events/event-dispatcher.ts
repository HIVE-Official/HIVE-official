/**
 * Event Dispatcher
 * Utility to dispatch domain events from aggregates after persistence
 */

import { AggregateRoot } from '../../domain/shared/base/AggregateRoot.base';
import { getEventBus } from './event-bus';

export class EventDispatcher {
  /**
   * Dispatch all pending events from an aggregate
   * Call this AFTER successfully persisting the aggregate
   */
  static async dispatchEventsForAggregate(aggregate: AggregateRoot<any>): Promise<void> {
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
  static async dispatchEventsForAggregates(aggregates: AggregateRoot<any>[]): Promise<void> {
    for (const aggregate of aggregates) {
      await this.dispatchEventsForAggregate(aggregate);
    }
  }

  /**
   * Mark event as dispatched without actually dispatching
   * (Useful for testing)
   */
  static markEventAsDispatched(aggregate: AggregateRoot<any>, eventIndex: number = 0): void {
    const events = aggregate.domainEvents;
    if (events[eventIndex]) {
      aggregate.markEventAsDispatched(events[eventIndex]);
    }
  }
}
