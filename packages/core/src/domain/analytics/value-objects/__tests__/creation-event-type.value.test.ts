/**
 * CreationEventTypeValue Tests
 * Tests for creation analytics event type value object
 */

import { describe, it, expect } from 'vitest';
import { CreationEventTypeValue } from '../creation-event-type.value';

describe('CreationEventTypeValue', () => {
  describe('create()', () => {
    it('should create valid builder_session_start event', () => {
      const event = CreationEventTypeValue.create('builder_session_start');
      expect(event.value).toBe('builder_session_start');
    });

    it('should create valid builder_session_end event', () => {
      const event = CreationEventTypeValue.create('builder_session_end');
      expect(event.value).toBe('builder_session_end');
    });

    it('should create valid tool_created event', () => {
      const event = CreationEventTypeValue.create('tool_created');
      expect(event.value).toBe('tool_created');
    });

    it('should create valid tool_updated event', () => {
      const event = CreationEventTypeValue.create('tool_updated');
      expect(event.value).toBe('tool_updated');
    });

    it('should create valid tool_published event', () => {
      const event = CreationEventTypeValue.create('tool_published');
      expect(event.value).toBe('tool_published');
    });

    it('should create valid element_added event', () => {
      const event = CreationEventTypeValue.create('element_added');
      expect(event.value).toBe('element_added');
    });

    it('should create valid element_configured event', () => {
      const event = CreationEventTypeValue.create('element_configured');
      expect(event.value).toBe('element_configured');
    });

    it('should create valid element_removed event', () => {
      const event = CreationEventTypeValue.create('element_removed');
      expect(event.value).toBe('element_removed');
    });

    it('should create valid canvas_mode_changed event', () => {
      const event = CreationEventTypeValue.create('canvas_mode_changed');
      expect(event.value).toBe('canvas_mode_changed');
    });

    it('should create valid device_mode_changed event', () => {
      const event = CreationEventTypeValue.create('device_mode_changed');
      expect(event.value).toBe('device_mode_changed');
    });

    it('should create valid element_library_searched event', () => {
      const event = CreationEventTypeValue.create('element_library_searched');
      expect(event.value).toBe('element_library_searched');
    });

    it('should create valid tool_instance_opened event', () => {
      const event = CreationEventTypeValue.create('tool_instance_opened');
      expect(event.value).toBe('tool_instance_opened');
    });

    it('should create valid tool_instance_submitted event', () => {
      const event = CreationEventTypeValue.create('tool_instance_submitted');
      expect(event.value).toBe('tool_instance_submitted');
    });

    it('should throw for invalid event type', () => {
      expect(() => {
        CreationEventTypeValue.create('invalid_event');
      }).toThrow('Invalid creation event type: invalid_event');
    });

    it('should throw for empty string', () => {
      expect(() => {
        CreationEventTypeValue.create('');
      }).toThrow('Invalid creation event type');
    });

    it('should throw for uppercase event type', () => {
      expect(() => {
        CreationEventTypeValue.create('TOOL_CREATED');
      }).toThrow('Invalid creation event type');
    });

    it('should throw for similar but invalid event name', () => {
      expect(() => {
        CreationEventTypeValue.create('tool_create'); // Missing 'd'
      }).toThrow('Invalid creation event type');
    });
  });

  describe('isBuilderEvent()', () => {
    it('should return true for builder_session_start', () => {
      const event = CreationEventTypeValue.create('builder_session_start');
      expect(event.isBuilderEvent()).toBe(true);
    });

    it('should return true for builder_session_end', () => {
      const event = CreationEventTypeValue.create('builder_session_end');
      expect(event.isBuilderEvent()).toBe(true);
    });

    it('should return true for element_added', () => {
      const event = CreationEventTypeValue.create('element_added');
      expect(event.isBuilderEvent()).toBe(true);
    });

    it('should return true for element_configured', () => {
      const event = CreationEventTypeValue.create('element_configured');
      expect(event.isBuilderEvent()).toBe(true);
    });

    it('should return true for element_removed', () => {
      const event = CreationEventTypeValue.create('element_removed');
      expect(event.isBuilderEvent()).toBe(true);
    });

    it('should return true for canvas_mode_changed', () => {
      const event = CreationEventTypeValue.create('canvas_mode_changed');
      expect(event.isBuilderEvent()).toBe(true);
    });

    it('should return true for element_library_searched', () => {
      const event = CreationEventTypeValue.create('element_library_searched');
      expect(event.isBuilderEvent()).toBe(true);
    });

    it('should return false for device_mode_changed', () => {
      const event = CreationEventTypeValue.create('device_mode_changed');
      expect(event.isBuilderEvent()).toBe(false);
    });

    it('should return false for tool lifecycle events', () => {
      const toolEvents = ['tool_created', 'tool_updated', 'tool_published', 'tool_instance_opened', 'tool_instance_submitted'];

      toolEvents.forEach(eventType => {
        const event = CreationEventTypeValue.create(eventType);
        // tool_* events contain tool_ so this is actually true based on implementation
        // The logic is: includes builder_ OR element_ OR canvas_
        expect(event.isBuilderEvent()).toBe(false);
      });
    });
  });

  describe('isToolLifecycleEvent()', () => {
    it('should return true for tool_created', () => {
      const event = CreationEventTypeValue.create('tool_created');
      expect(event.isToolLifecycleEvent()).toBe(true);
    });

    it('should return true for tool_updated', () => {
      const event = CreationEventTypeValue.create('tool_updated');
      expect(event.isToolLifecycleEvent()).toBe(true);
    });

    it('should return true for tool_published', () => {
      const event = CreationEventTypeValue.create('tool_published');
      expect(event.isToolLifecycleEvent()).toBe(true);
    });

    it('should return true for tool_instance_opened', () => {
      const event = CreationEventTypeValue.create('tool_instance_opened');
      expect(event.isToolLifecycleEvent()).toBe(true);
    });

    it('should return true for tool_instance_submitted', () => {
      const event = CreationEventTypeValue.create('tool_instance_submitted');
      expect(event.isToolLifecycleEvent()).toBe(true);
    });

    it('should return false for builder events', () => {
      const builderEvents = ['builder_session_start', 'builder_session_end', 'element_added', 'canvas_mode_changed'];

      builderEvents.forEach(eventType => {
        const event = CreationEventTypeValue.create(eventType);
        expect(event.isToolLifecycleEvent()).toBe(false);
      });
    });

    it('should return false for device_mode_changed', () => {
      const event = CreationEventTypeValue.create('device_mode_changed');
      expect(event.isToolLifecycleEvent()).toBe(false);
    });

    it('should return false for element_library_searched', () => {
      const event = CreationEventTypeValue.create('element_library_searched');
      expect(event.isToolLifecycleEvent()).toBe(false);
    });
  });

  describe('equals()', () => {
    it('should be equal when event types are the same', () => {
      const event1 = CreationEventTypeValue.create('tool_created');
      const event2 = CreationEventTypeValue.create('tool_created');

      expect(event1.equals(event2)).toBe(true);
    });

    it('should not be equal when event types differ', () => {
      const event1 = CreationEventTypeValue.create('tool_created');
      const event2 = CreationEventTypeValue.create('tool_updated');

      expect(event1.equals(event2)).toBe(false);
    });

    it('should be equal for builder events', () => {
      const event1 = CreationEventTypeValue.create('builder_session_start');
      const event2 = CreationEventTypeValue.create('builder_session_start');

      expect(event1.equals(event2)).toBe(true);
    });
  });

  describe('all event types', () => {
    const allEventTypes = [
      'builder_session_start',
      'builder_session_end',
      'tool_created',
      'tool_updated',
      'tool_published',
      'element_added',
      'element_configured',
      'element_removed',
      'canvas_mode_changed',
      'device_mode_changed',
      'element_library_searched',
      'tool_instance_opened',
      'tool_instance_submitted'
    ];

    it('should accept all 13 valid event types', () => {
      allEventTypes.forEach(eventType => {
        const event = CreationEventTypeValue.create(eventType);
        expect(event.value).toBe(eventType);
      });
    });

    it('should have 13 total event types', () => {
      expect(allEventTypes.length).toBe(13);
    });

    it('should categorize all events correctly', () => {
      allEventTypes.forEach(eventType => {
        const event = CreationEventTypeValue.create(eventType);
        const isBuilder = event.isBuilderEvent();
        const isTool = event.isToolLifecycleEvent();

        // Each event should be at least one category
        if (!isBuilder && !isTool) {
          // device_mode_changed is the only one that's neither
          expect(eventType).toBe('device_mode_changed');
        }
      });
    });
  });

  describe('real-world scenarios', () => {
    it('should track tool builder session', () => {
      const start = CreationEventTypeValue.create('builder_session_start');
      const elementAdded = CreationEventTypeValue.create('element_added');
      const configured = CreationEventTypeValue.create('element_configured');
      const canvasMode = CreationEventTypeValue.create('canvas_mode_changed');
      const end = CreationEventTypeValue.create('builder_session_end');

      expect(start.isBuilderEvent()).toBe(true);
      expect(elementAdded.isBuilderEvent()).toBe(true);
      expect(configured.isBuilderEvent()).toBe(true);
      expect(canvasMode.isBuilderEvent()).toBe(true);
      expect(end.isBuilderEvent()).toBe(true);
    });

    it('should track tool lifecycle', () => {
      const created = CreationEventTypeValue.create('tool_created');
      const updated = CreationEventTypeValue.create('tool_updated');
      const published = CreationEventTypeValue.create('tool_published');

      expect(created.isToolLifecycleEvent()).toBe(true);
      expect(updated.isToolLifecycleEvent()).toBe(true);
      expect(published.isToolLifecycleEvent()).toBe(true);
    });

    it('should track tool usage', () => {
      const opened = CreationEventTypeValue.create('tool_instance_opened');
      const submitted = CreationEventTypeValue.create('tool_instance_submitted');

      expect(opened.isToolLifecycleEvent()).toBe(true);
      expect(submitted.isToolLifecycleEvent()).toBe(true);
    });
  });
});
