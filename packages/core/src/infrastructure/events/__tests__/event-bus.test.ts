/**
 * Event Bus Tests
 * Tests for pub/sub pattern and domain event handling
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { EventBus, getEventBus, resetEventBus } from '../event-bus';
import { DomainEvent } from '../../../domain/shared/base/DomainEvent.base';

// Mock domain event class
class TestEvent extends DomainEvent {
  constructor(aggregateId: string, public readonly testData: string) {
    super(aggregateId);
  }

  getEventName(): string {
    return 'TestEvent';
  }
}

class AnotherEvent extends DomainEvent {
  constructor(aggregateId: string) {
    super(aggregateId);
  }

  getEventName(): string {
    return 'AnotherEvent';
  }
}

describe('EventBus', () => {
  let eventBus: EventBus;

  beforeEach(() => {
    eventBus = new EventBus();
  });

  afterEach(() => {
    eventBus.clear();
  });

  describe('subscribe/unsubscribe', () => {
    it('should register a handler for an event', () => {
      const handler = vi.fn();

      eventBus.subscribe('TestEvent', handler);

      expect(eventBus.getHandlerCount('TestEvent')).toBe(1);
    });

    it('should register multiple handlers for same event', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      eventBus.subscribe('TestEvent', handler1);
      eventBus.subscribe('TestEvent', handler2);

      expect(eventBus.getHandlerCount('TestEvent')).toBe(2);
    });

    it('should unsubscribe a handler', () => {
      const handler = vi.fn();

      eventBus.subscribe('TestEvent', handler);
      expect(eventBus.getHandlerCount('TestEvent')).toBe(1);

      eventBus.unsubscribe('TestEvent', handler);
      expect(eventBus.getHandlerCount('TestEvent')).toBe(0);
    });

    it('should handle unsubscribing non-existent handler', () => {
      const handler = vi.fn();

      // Should not throw
      eventBus.unsubscribe('NonExistentEvent', handler);
      expect(eventBus.getHandlerCount('NonExistentEvent')).toBe(0);
    });
  });

  describe('publish', () => {
    it('should call handler when event is published', async () => {
      const handler = vi.fn();
      const event = new TestEvent('test_123', 'test data');

      eventBus.subscribe('TestEvent', handler);
      await eventBus.publish(event);

      expect(handler).toHaveBeenCalledWith(event);
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should call multiple handlers for same event', async () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();
      const event = new TestEvent('test_123', 'test data');

      eventBus.subscribe('TestEvent', handler1);
      eventBus.subscribe('TestEvent', handler2);
      await eventBus.publish(event);

      expect(handler1).toHaveBeenCalledWith(event);
      expect(handler2).toHaveBeenCalledWith(event);
    });

    it('should not call handlers for different events', async () => {
      const testHandler = vi.fn();
      const anotherHandler = vi.fn();
      const event = new TestEvent('test_123', 'test data');

      eventBus.subscribe('TestEvent', testHandler);
      eventBus.subscribe('AnotherEvent', anotherHandler);
      await eventBus.publish(event);

      expect(testHandler).toHaveBeenCalledWith(event);
      expect(anotherHandler).not.toHaveBeenCalled();
    });

    it('should handle event with no registered handlers', async () => {
      const event = new TestEvent('test_123', 'test data');

      // Should not throw
      await expect(eventBus.publish(event)).resolves.toBeUndefined();
    });

    it('should handle async handlers', async () => {
      const asyncHandler = vi.fn(async (event: TestEvent) => {
        await new Promise(resolve => setTimeout(resolve, 10));
        return event.testData;
      });
      const event = new TestEvent('test_123', 'async data');

      eventBus.subscribe('TestEvent', asyncHandler);
      await eventBus.publish(event);

      expect(asyncHandler).toHaveBeenCalledWith(event);
    });

    it('should continue publishing if one handler fails', async () => {
      const errorHandler = vi.fn(() => {
        throw new Error('Handler error');
      });
      const successHandler = vi.fn();
      const event = new TestEvent('test_123', 'test data');

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      eventBus.subscribe('TestEvent', errorHandler);
      eventBus.subscribe('TestEvent', successHandler);
      await eventBus.publish(event);

      expect(errorHandler).toHaveBeenCalled();
      expect(successHandler).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });
  });

  describe('publishAll', () => {
    it('should publish multiple events in sequence', async () => {
      const handler = vi.fn();
      const events = [
        new TestEvent('test_1', 'data 1'),
        new TestEvent('test_2', 'data 2'),
        new TestEvent('test_3', 'data 3')
      ];

      eventBus.subscribe('TestEvent', handler);
      await eventBus.publishAll(events);

      expect(handler).toHaveBeenCalledTimes(3);
      expect(handler).toHaveBeenNthCalledWith(1, events[0]);
      expect(handler).toHaveBeenNthCalledWith(2, events[1]);
      expect(handler).toHaveBeenNthCalledWith(3, events[2]);
    });

    it('should handle empty event array', async () => {
      await expect(eventBus.publishAll([])).resolves.toBeUndefined();
    });

    it('should publish events of different types', async () => {
      const testHandler = vi.fn();
      const anotherHandler = vi.fn();
      const events = [
        new TestEvent('test_1', 'data'),
        new AnotherEvent('another_1')
      ];

      eventBus.subscribe('TestEvent', testHandler);
      eventBus.subscribe('AnotherEvent', anotherHandler);
      await eventBus.publishAll(events);

      expect(testHandler).toHaveBeenCalledTimes(1);
      expect(anotherHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('clear', () => {
    it('should remove all handlers', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      eventBus.subscribe('TestEvent', handler1);
      eventBus.subscribe('AnotherEvent', handler2);

      expect(eventBus.getHandlerCount('TestEvent')).toBe(1);
      expect(eventBus.getHandlerCount('AnotherEvent')).toBe(1);

      eventBus.clear();

      expect(eventBus.getHandlerCount('TestEvent')).toBe(0);
      expect(eventBus.getHandlerCount('AnotherEvent')).toBe(0);
    });

    it('should clear event log', () => {
      const loggedBus = new EventBus({ enableLogging: true });
      const event = new TestEvent('test_123', 'data');

      loggedBus.publish(event);
      expect(loggedBus.getEventLog().length).toBeGreaterThan(0);

      loggedBus.clear();
      expect(loggedBus.getEventLog()).toEqual([]);
    });
  });

  describe('logging', () => {
    it('should log events when logging enabled', async () => {
      const loggedBus = new EventBus({ enableLogging: true });
      const event = new TestEvent('test_123', 'data');
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      await loggedBus.publish(event);

      expect(consoleLogSpy).toHaveBeenCalled();
      expect(loggedBus.getEventLog()).toHaveLength(1);
      expect(loggedBus.getEventLog()[0]).toBe(event);

      consoleLogSpy.mockRestore();
    });

    it('should not log events when logging disabled', async () => {
      const event = new TestEvent('test_123', 'data');
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      await eventBus.publish(event);

      expect(consoleLogSpy).not.toHaveBeenCalled();
      expect(eventBus.getEventLog()).toEqual([]);

      consoleLogSpy.mockRestore();
    });
  });

  describe('utility methods', () => {
    it('should return registered event names', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      eventBus.subscribe('TestEvent', handler1);
      eventBus.subscribe('AnotherEvent', handler2);

      const registeredEvents = eventBus.getRegisteredEvents();
      expect(registeredEvents).toContain('TestEvent');
      expect(registeredEvents).toContain('AnotherEvent');
      expect(registeredEvents).toHaveLength(2);
    });

    it('should return handler count for event', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();
      const handler3 = vi.fn();

      eventBus.subscribe('TestEvent', handler1);
      eventBus.subscribe('TestEvent', handler2);
      eventBus.subscribe('AnotherEvent', handler3);

      expect(eventBus.getHandlerCount('TestEvent')).toBe(2);
      expect(eventBus.getHandlerCount('AnotherEvent')).toBe(1);
      expect(eventBus.getHandlerCount('NonExistent')).toBe(0);
    });

    it('should return event log copy', () => {
      const loggedBus = new EventBus({ enableLogging: true });
      const event = new TestEvent('test_123', 'data');

      loggedBus.publish(event);
      const log = loggedBus.getEventLog();

      // Modifying returned log should not affect internal log
      log.push(new TestEvent('test_456', 'new'));
      expect(loggedBus.getEventLog()).toHaveLength(1);
    });
  });

  describe('singleton pattern', () => {
    afterEach(() => {
      resetEventBus();
    });

    it('should return same instance', () => {
      const bus1 = getEventBus();
      const bus2 = getEventBus();

      expect(bus1).toBe(bus2);
    });

    it('should share handlers across instances', () => {
      const bus1 = getEventBus();
      const handler = vi.fn();

      bus1.subscribe('TestEvent', handler);

      const bus2 = getEventBus();
      expect(bus2.getHandlerCount('TestEvent')).toBe(1);
    });

    it('should reset singleton', () => {
      const bus1 = getEventBus();
      const handler = vi.fn();
      bus1.subscribe('TestEvent', handler);

      resetEventBus();

      const bus2 = getEventBus();
      expect(bus2.getHandlerCount('TestEvent')).toBe(0);
      expect(bus1).not.toBe(bus2);
    });
  });
});
