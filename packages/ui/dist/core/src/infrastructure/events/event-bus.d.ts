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
export declare class EventBus implements IEventBus {
    private handlers;
    private eventLog;
    private readonly logEnabled;
    constructor(options?: {
        enableLogging?: boolean;
    });
    /**
     * Publish a single domain event to all registered handlers
     */
    publish(event: DomainEvent): Promise<void>;
    /**
     * Publish multiple domain events in sequence
     */
    publishAll(events: DomainEvent[]): Promise<void>;
    /**
     * Subscribe to a specific event type
     */
    subscribe<T extends DomainEvent>(eventName: string, handler: EventHandler<T>): void;
    /**
     * Unsubscribe from a specific event type
     */
    unsubscribe<T extends DomainEvent>(eventName: string, handler: EventHandler<T>): void;
    /**
     * Clear all handlers and event log
     */
    clear(): void;
    /**
     * Get event log (useful for debugging/analytics)
     */
    getEventLog(): DomainEvent[];
    /**
     * Get all registered event types
     */
    getRegisteredEvents(): string[];
    /**
     * Get handler count for an event type
     */
    getHandlerCount(eventName: string): number;
}
export declare function getEventBus(options?: {
    enableLogging?: boolean;
}): EventBus;
export declare function resetEventBus(): void;
//# sourceMappingURL=event-bus.d.ts.map