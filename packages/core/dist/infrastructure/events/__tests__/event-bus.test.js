"use strict";
/**
 * Event Bus Tests
 * Tests for pub/sub pattern and domain event handling
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const event_bus_1 = require("../event-bus");
const DomainEvent_base_1 = require("../../../domain/shared/base/DomainEvent.base");
// Mock domain event class
class TestEvent extends DomainEvent_base_1.DomainEvent {
    constructor(aggregateId, testData) {
        super(aggregateId);
        this.testData = testData;
    }
    getEventName() {
        return 'TestEvent';
    }
}
class AnotherEvent extends DomainEvent_base_1.DomainEvent {
    constructor(aggregateId) {
        super(aggregateId);
    }
    getEventName() {
        return 'AnotherEvent';
    }
}
(0, vitest_1.describe)('EventBus', () => {
    let eventBus;
    (0, vitest_1.beforeEach)(() => {
        eventBus = new event_bus_1.EventBus();
    });
    (0, vitest_1.afterEach)(() => {
        eventBus.clear();
    });
    (0, vitest_1.describe)('subscribe/unsubscribe', () => {
        (0, vitest_1.it)('should register a handler for an event', () => {
            const handler = vitest_1.vi.fn();
            eventBus.subscribe('TestEvent', handler);
            (0, vitest_1.expect)(eventBus.getHandlerCount('TestEvent')).toBe(1);
        });
        (0, vitest_1.it)('should register multiple handlers for same event', () => {
            const handler1 = vitest_1.vi.fn();
            const handler2 = vitest_1.vi.fn();
            eventBus.subscribe('TestEvent', handler1);
            eventBus.subscribe('TestEvent', handler2);
            (0, vitest_1.expect)(eventBus.getHandlerCount('TestEvent')).toBe(2);
        });
        (0, vitest_1.it)('should unsubscribe a handler', () => {
            const handler = vitest_1.vi.fn();
            eventBus.subscribe('TestEvent', handler);
            (0, vitest_1.expect)(eventBus.getHandlerCount('TestEvent')).toBe(1);
            eventBus.unsubscribe('TestEvent', handler);
            (0, vitest_1.expect)(eventBus.getHandlerCount('TestEvent')).toBe(0);
        });
        (0, vitest_1.it)('should handle unsubscribing non-existent handler', () => {
            const handler = vitest_1.vi.fn();
            // Should not throw
            eventBus.unsubscribe('NonExistentEvent', handler);
            (0, vitest_1.expect)(eventBus.getHandlerCount('NonExistentEvent')).toBe(0);
        });
    });
    (0, vitest_1.describe)('publish', () => {
        (0, vitest_1.it)('should call handler when event is published', async () => {
            const handler = vitest_1.vi.fn();
            const event = new TestEvent('test_123', 'test data');
            eventBus.subscribe('TestEvent', handler);
            await eventBus.publish(event);
            (0, vitest_1.expect)(handler).toHaveBeenCalledWith(event);
            (0, vitest_1.expect)(handler).toHaveBeenCalledTimes(1);
        });
        (0, vitest_1.it)('should call multiple handlers for same event', async () => {
            const handler1 = vitest_1.vi.fn();
            const handler2 = vitest_1.vi.fn();
            const event = new TestEvent('test_123', 'test data');
            eventBus.subscribe('TestEvent', handler1);
            eventBus.subscribe('TestEvent', handler2);
            await eventBus.publish(event);
            (0, vitest_1.expect)(handler1).toHaveBeenCalledWith(event);
            (0, vitest_1.expect)(handler2).toHaveBeenCalledWith(event);
        });
        (0, vitest_1.it)('should not call handlers for different events', async () => {
            const testHandler = vitest_1.vi.fn();
            const anotherHandler = vitest_1.vi.fn();
            const event = new TestEvent('test_123', 'test data');
            eventBus.subscribe('TestEvent', testHandler);
            eventBus.subscribe('AnotherEvent', anotherHandler);
            await eventBus.publish(event);
            (0, vitest_1.expect)(testHandler).toHaveBeenCalledWith(event);
            (0, vitest_1.expect)(anotherHandler).not.toHaveBeenCalled();
        });
        (0, vitest_1.it)('should handle event with no registered handlers', async () => {
            const event = new TestEvent('test_123', 'test data');
            // Should not throw
            await (0, vitest_1.expect)(eventBus.publish(event)).resolves.toBeUndefined();
        });
        (0, vitest_1.it)('should handle async handlers', async () => {
            const asyncHandler = vitest_1.vi.fn(async (event) => {
                await new Promise(resolve => setTimeout(resolve, 10));
                // Process event data without returning
                void event.testData;
            });
            const event = new TestEvent('test_123', 'async data');
            eventBus.subscribe('TestEvent', asyncHandler);
            await eventBus.publish(event);
            (0, vitest_1.expect)(asyncHandler).toHaveBeenCalledWith(event);
        });
        (0, vitest_1.it)('should continue publishing if one handler fails', async () => {
            const errorHandler = vitest_1.vi.fn(() => {
                throw new Error('Handler error');
            });
            const successHandler = vitest_1.vi.fn();
            const event = new TestEvent('test_123', 'test data');
            const consoleErrorSpy = vitest_1.vi.spyOn(console, 'error').mockImplementation(() => { });
            eventBus.subscribe('TestEvent', errorHandler);
            eventBus.subscribe('TestEvent', successHandler);
            await eventBus.publish(event);
            (0, vitest_1.expect)(errorHandler).toHaveBeenCalled();
            (0, vitest_1.expect)(successHandler).toHaveBeenCalled();
            (0, vitest_1.expect)(consoleErrorSpy).toHaveBeenCalled();
            consoleErrorSpy.mockRestore();
        });
    });
    (0, vitest_1.describe)('publishAll', () => {
        (0, vitest_1.it)('should publish multiple events in sequence', async () => {
            const handler = vitest_1.vi.fn();
            const events = [
                new TestEvent('test_1', 'data 1'),
                new TestEvent('test_2', 'data 2'),
                new TestEvent('test_3', 'data 3')
            ];
            eventBus.subscribe('TestEvent', handler);
            await eventBus.publishAll(events);
            (0, vitest_1.expect)(handler).toHaveBeenCalledTimes(3);
            (0, vitest_1.expect)(handler).toHaveBeenNthCalledWith(1, events[0]);
            (0, vitest_1.expect)(handler).toHaveBeenNthCalledWith(2, events[1]);
            (0, vitest_1.expect)(handler).toHaveBeenNthCalledWith(3, events[2]);
        });
        (0, vitest_1.it)('should handle empty event array', async () => {
            await (0, vitest_1.expect)(eventBus.publishAll([])).resolves.toBeUndefined();
        });
        (0, vitest_1.it)('should publish events of different types', async () => {
            const testHandler = vitest_1.vi.fn();
            const anotherHandler = vitest_1.vi.fn();
            const events = [
                new TestEvent('test_1', 'data'),
                new AnotherEvent('another_1')
            ];
            eventBus.subscribe('TestEvent', testHandler);
            eventBus.subscribe('AnotherEvent', anotherHandler);
            await eventBus.publishAll(events);
            (0, vitest_1.expect)(testHandler).toHaveBeenCalledTimes(1);
            (0, vitest_1.expect)(anotherHandler).toHaveBeenCalledTimes(1);
        });
    });
    (0, vitest_1.describe)('clear', () => {
        (0, vitest_1.it)('should remove all handlers', () => {
            const handler1 = vitest_1.vi.fn();
            const handler2 = vitest_1.vi.fn();
            eventBus.subscribe('TestEvent', handler1);
            eventBus.subscribe('AnotherEvent', handler2);
            (0, vitest_1.expect)(eventBus.getHandlerCount('TestEvent')).toBe(1);
            (0, vitest_1.expect)(eventBus.getHandlerCount('AnotherEvent')).toBe(1);
            eventBus.clear();
            (0, vitest_1.expect)(eventBus.getHandlerCount('TestEvent')).toBe(0);
            (0, vitest_1.expect)(eventBus.getHandlerCount('AnotherEvent')).toBe(0);
        });
        (0, vitest_1.it)('should clear event log', () => {
            const loggedBus = new event_bus_1.EventBus({ enableLogging: true });
            const event = new TestEvent('test_123', 'data');
            loggedBus.publish(event);
            (0, vitest_1.expect)(loggedBus.getEventLog().length).toBeGreaterThan(0);
            loggedBus.clear();
            (0, vitest_1.expect)(loggedBus.getEventLog()).toEqual([]);
        });
    });
    (0, vitest_1.describe)('logging', () => {
        (0, vitest_1.it)('should log events when logging enabled', async () => {
            const loggedBus = new event_bus_1.EventBus({ enableLogging: true });
            const event = new TestEvent('test_123', 'data');
            const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            await loggedBus.publish(event);
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalled();
            (0, vitest_1.expect)(loggedBus.getEventLog()).toHaveLength(1);
            (0, vitest_1.expect)(loggedBus.getEventLog()[0]).toBe(event);
            consoleLogSpy.mockRestore();
        });
        (0, vitest_1.it)('should not log events when logging disabled', async () => {
            const event = new TestEvent('test_123', 'data');
            const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            await eventBus.publish(event);
            (0, vitest_1.expect)(consoleLogSpy).not.toHaveBeenCalled();
            (0, vitest_1.expect)(eventBus.getEventLog()).toEqual([]);
            consoleLogSpy.mockRestore();
        });
    });
    (0, vitest_1.describe)('utility methods', () => {
        (0, vitest_1.it)('should return registered event names', () => {
            const handler1 = vitest_1.vi.fn();
            const handler2 = vitest_1.vi.fn();
            eventBus.subscribe('TestEvent', handler1);
            eventBus.subscribe('AnotherEvent', handler2);
            const registeredEvents = eventBus.getRegisteredEvents();
            (0, vitest_1.expect)(registeredEvents).toContain('TestEvent');
            (0, vitest_1.expect)(registeredEvents).toContain('AnotherEvent');
            (0, vitest_1.expect)(registeredEvents).toHaveLength(2);
        });
        (0, vitest_1.it)('should return handler count for event', () => {
            const handler1 = vitest_1.vi.fn();
            const handler2 = vitest_1.vi.fn();
            const handler3 = vitest_1.vi.fn();
            eventBus.subscribe('TestEvent', handler1);
            eventBus.subscribe('TestEvent', handler2);
            eventBus.subscribe('AnotherEvent', handler3);
            (0, vitest_1.expect)(eventBus.getHandlerCount('TestEvent')).toBe(2);
            (0, vitest_1.expect)(eventBus.getHandlerCount('AnotherEvent')).toBe(1);
            (0, vitest_1.expect)(eventBus.getHandlerCount('NonExistent')).toBe(0);
        });
        (0, vitest_1.it)('should return event log copy', () => {
            const loggedBus = new event_bus_1.EventBus({ enableLogging: true });
            const event = new TestEvent('test_123', 'data');
            loggedBus.publish(event);
            const log = loggedBus.getEventLog();
            // Modifying returned log should not affect internal log
            log.push(new TestEvent('test_456', 'new'));
            (0, vitest_1.expect)(loggedBus.getEventLog()).toHaveLength(1);
        });
    });
    (0, vitest_1.describe)('singleton pattern', () => {
        (0, vitest_1.afterEach)(() => {
            (0, event_bus_1.resetEventBus)();
        });
        (0, vitest_1.it)('should return same instance', () => {
            const bus1 = (0, event_bus_1.getEventBus)();
            const bus2 = (0, event_bus_1.getEventBus)();
            (0, vitest_1.expect)(bus1).toBe(bus2);
        });
        (0, vitest_1.it)('should share handlers across instances', () => {
            const bus1 = (0, event_bus_1.getEventBus)();
            const handler = vitest_1.vi.fn();
            bus1.subscribe('TestEvent', handler);
            const bus2 = (0, event_bus_1.getEventBus)();
            (0, vitest_1.expect)(bus2.getHandlerCount('TestEvent')).toBe(1);
        });
        (0, vitest_1.it)('should reset singleton', () => {
            const bus1 = (0, event_bus_1.getEventBus)();
            const handler = vitest_1.vi.fn();
            bus1.subscribe('TestEvent', handler);
            (0, event_bus_1.resetEventBus)();
            const bus2 = (0, event_bus_1.getEventBus)();
            (0, vitest_1.expect)(bus2.getHandlerCount('TestEvent')).toBe(0);
            (0, vitest_1.expect)(bus1).not.toBe(bus2);
        });
    });
});
//# sourceMappingURL=event-bus.test.js.map