/**
 * Event Bus Infrastructure
 * Implements pub/sub pattern for domain events
 * Enables loose coupling between aggregates via event-driven communication
 */

import { DomainEvent } from '../../domain/shared/base/DomainEvent.base';

export type EventHandler<T extends DomainEvent = DomainEvent> = (event: T) => void | Promise<void>;

export interface IEventBus {
  publish(event: DomainEvent): Promise<void>;
  publishAll(events: DomainEvent[]): Promise<void>;
  subscribe<T extends DomainEvent>(eventName: string, handler: EventHandler<T>): void;
  unsubscribe<T extends DomainEvent>(eventName: string, handler: EventHandler<T>): void;
  clear(): void;
}

export class EventBus implements IEventBus {
  private handlers: Map<string, Set<EventHandler>> = new Map();
  private eventLog: DomainEvent[] = [];
  private readonly logEnabled: boolean;

  constructor(options: { enableLogging?: boolean } = {}) {
    this.logEnabled = options.enableLogging ?? false;
  }

  /**
   * Publish a single domain event to all registered handlers
   */
  async publish(event: DomainEvent): Promise<void> {
    const eventName = event.getEventName();

    // Log event if enabled
    if (this.logEnabled) {
      this.eventLog.push(event);
      console.log(`[EventBus] Publishing: ${eventName}`, {
        aggregateId: event.aggregateId,
        occurredAt: event.occurredAt
      });
    }

    // Get all handlers for this event type
    const handlers = this.handlers.get(eventName);

    if (!handlers || handlers.size === 0) {
      if (this.logEnabled) {
        console.log(`[EventBus] No handlers registered for: ${eventName}`);
      }
      return;
    }

    // Execute all handlers (in parallel for performance)
    const handlerPromises = Array.from(handlers).map(async (handler) => {
      try {
        await handler(event);
        if (this.logEnabled) {
          console.log(`[EventBus] Handler executed successfully for: ${eventName}`);
        }
      } catch (error) {
        console.error(`[EventBus] Handler failed for ${eventName}:`, error);
        // Don't throw - one handler failure shouldn't stop others
      }
    });

    await Promise.all(handlerPromises);
  }

  /**
   * Publish multiple domain events in sequence
   */
  async publishAll(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      await this.publish(event);
    }
  }

  /**
   * Subscribe to a specific event type
   */
  subscribe<T extends DomainEvent>(eventName: string, handler: EventHandler<T>): void {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, new Set());
    }

    this.handlers.get(eventName)!.add(handler as EventHandler);

    if (this.logEnabled) {
      console.log(`[EventBus] Handler registered for: ${eventName}`);
    }
  }

  /**
   * Unsubscribe from a specific event type
   */
  unsubscribe<T extends DomainEvent>(eventName: string, handler: EventHandler<T>): void {
    const handlers = this.handlers.get(eventName);
    if (handlers) {
      handlers.delete(handler as EventHandler);

      if (this.logEnabled) {
        console.log(`[EventBus] Handler unregistered for: ${eventName}`);
      }
    }
  }

  /**
   * Clear all handlers and event log
   */
  clear(): void {
    this.handlers.clear();
    this.eventLog = [];

    if (this.logEnabled) {
      console.log('[EventBus] All handlers cleared');
    }
  }

  /**
   * Get event log (useful for debugging/analytics)
   */
  getEventLog(): DomainEvent[] {
    return [...this.eventLog];
  }

  /**
   * Get all registered event types
   */
  getRegisteredEvents(): string[] {
    return Array.from(this.handlers.keys());
  }

  /**
   * Get handler count for an event type
   */
  getHandlerCount(eventName: string): number {
    return this.handlers.get(eventName)?.size ?? 0;
  }
}

/**
 * Singleton instance for application-wide event bus
 */
let eventBusInstance: EventBus | null = null;

export function getEventBus(options: { enableLogging?: boolean } = {}): EventBus {
  if (!eventBusInstance) {
    eventBusInstance = new EventBus(options);
  }
  return eventBusInstance;
}

export function resetEventBus(): void {
  if (eventBusInstance) {
    eventBusInstance.clear();
  }
  eventBusInstance = null;
}
