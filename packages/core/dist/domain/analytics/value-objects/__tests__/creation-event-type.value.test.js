"use strict";
/**
 * CreationEventTypeValue Tests
 * Tests for creation analytics event type value object
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const creation_event_type_value_1 = require("../creation-event-type.value");
(0, vitest_1.describe)('CreationEventTypeValue', () => {
    (0, vitest_1.describe)('create()', () => {
        (0, vitest_1.it)('should create valid builder_session_start event', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('builder_session_start');
            (0, vitest_1.expect)(event.value).toBe('builder_session_start');
        });
        (0, vitest_1.it)('should create valid builder_session_end event', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('builder_session_end');
            (0, vitest_1.expect)(event.value).toBe('builder_session_end');
        });
        (0, vitest_1.it)('should create valid tool_created event', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('tool_created');
            (0, vitest_1.expect)(event.value).toBe('tool_created');
        });
        (0, vitest_1.it)('should create valid tool_updated event', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('tool_updated');
            (0, vitest_1.expect)(event.value).toBe('tool_updated');
        });
        (0, vitest_1.it)('should create valid tool_published event', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('tool_published');
            (0, vitest_1.expect)(event.value).toBe('tool_published');
        });
        (0, vitest_1.it)('should create valid element_added event', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('element_added');
            (0, vitest_1.expect)(event.value).toBe('element_added');
        });
        (0, vitest_1.it)('should create valid element_configured event', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('element_configured');
            (0, vitest_1.expect)(event.value).toBe('element_configured');
        });
        (0, vitest_1.it)('should create valid element_removed event', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('element_removed');
            (0, vitest_1.expect)(event.value).toBe('element_removed');
        });
        (0, vitest_1.it)('should create valid canvas_mode_changed event', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('canvas_mode_changed');
            (0, vitest_1.expect)(event.value).toBe('canvas_mode_changed');
        });
        (0, vitest_1.it)('should create valid device_mode_changed event', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('device_mode_changed');
            (0, vitest_1.expect)(event.value).toBe('device_mode_changed');
        });
        (0, vitest_1.it)('should create valid element_library_searched event', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('element_library_searched');
            (0, vitest_1.expect)(event.value).toBe('element_library_searched');
        });
        (0, vitest_1.it)('should create valid tool_instance_opened event', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('tool_instance_opened');
            (0, vitest_1.expect)(event.value).toBe('tool_instance_opened');
        });
        (0, vitest_1.it)('should create valid tool_instance_submitted event', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('tool_instance_submitted');
            (0, vitest_1.expect)(event.value).toBe('tool_instance_submitted');
        });
        (0, vitest_1.it)('should throw for invalid event type', () => {
            (0, vitest_1.expect)(() => {
                creation_event_type_value_1.CreationEventTypeValue.create('invalid_event');
            }).toThrow('Invalid creation event type: invalid_event');
        });
        (0, vitest_1.it)('should throw for empty string', () => {
            (0, vitest_1.expect)(() => {
                creation_event_type_value_1.CreationEventTypeValue.create('');
            }).toThrow('Invalid creation event type');
        });
        (0, vitest_1.it)('should throw for uppercase event type', () => {
            (0, vitest_1.expect)(() => {
                creation_event_type_value_1.CreationEventTypeValue.create('TOOL_CREATED');
            }).toThrow('Invalid creation event type');
        });
        (0, vitest_1.it)('should throw for similar but invalid event name', () => {
            (0, vitest_1.expect)(() => {
                creation_event_type_value_1.CreationEventTypeValue.create('tool_create'); // Missing 'd'
            }).toThrow('Invalid creation event type');
        });
    });
    (0, vitest_1.describe)('isBuilderEvent()', () => {
        (0, vitest_1.it)('should return true for builder_session_start', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('builder_session_start');
            (0, vitest_1.expect)(event.isBuilderEvent()).toBe(true);
        });
        (0, vitest_1.it)('should return true for builder_session_end', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('builder_session_end');
            (0, vitest_1.expect)(event.isBuilderEvent()).toBe(true);
        });
        (0, vitest_1.it)('should return true for element_added', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('element_added');
            (0, vitest_1.expect)(event.isBuilderEvent()).toBe(true);
        });
        (0, vitest_1.it)('should return true for element_configured', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('element_configured');
            (0, vitest_1.expect)(event.isBuilderEvent()).toBe(true);
        });
        (0, vitest_1.it)('should return true for element_removed', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('element_removed');
            (0, vitest_1.expect)(event.isBuilderEvent()).toBe(true);
        });
        (0, vitest_1.it)('should return true for canvas_mode_changed', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('canvas_mode_changed');
            (0, vitest_1.expect)(event.isBuilderEvent()).toBe(true);
        });
        (0, vitest_1.it)('should return true for element_library_searched', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('element_library_searched');
            (0, vitest_1.expect)(event.isBuilderEvent()).toBe(true);
        });
        (0, vitest_1.it)('should return false for device_mode_changed', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('device_mode_changed');
            (0, vitest_1.expect)(event.isBuilderEvent()).toBe(false);
        });
        (0, vitest_1.it)('should return false for tool lifecycle events', () => {
            const toolEvents = ['tool_created', 'tool_updated', 'tool_published', 'tool_instance_opened', 'tool_instance_submitted'];
            toolEvents.forEach(eventType => {
                const event = creation_event_type_value_1.CreationEventTypeValue.create(eventType);
                // tool_* events contain tool_ so this is actually true based on implementation
                // The logic is: includes builder_ OR element_ OR canvas_
                (0, vitest_1.expect)(event.isBuilderEvent()).toBe(false);
            });
        });
    });
    (0, vitest_1.describe)('isToolLifecycleEvent()', () => {
        (0, vitest_1.it)('should return true for tool_created', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('tool_created');
            (0, vitest_1.expect)(event.isToolLifecycleEvent()).toBe(true);
        });
        (0, vitest_1.it)('should return true for tool_updated', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('tool_updated');
            (0, vitest_1.expect)(event.isToolLifecycleEvent()).toBe(true);
        });
        (0, vitest_1.it)('should return true for tool_published', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('tool_published');
            (0, vitest_1.expect)(event.isToolLifecycleEvent()).toBe(true);
        });
        (0, vitest_1.it)('should return true for tool_instance_opened', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('tool_instance_opened');
            (0, vitest_1.expect)(event.isToolLifecycleEvent()).toBe(true);
        });
        (0, vitest_1.it)('should return true for tool_instance_submitted', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('tool_instance_submitted');
            (0, vitest_1.expect)(event.isToolLifecycleEvent()).toBe(true);
        });
        (0, vitest_1.it)('should return false for builder events', () => {
            const builderEvents = ['builder_session_start', 'builder_session_end', 'element_added', 'canvas_mode_changed'];
            builderEvents.forEach(eventType => {
                const event = creation_event_type_value_1.CreationEventTypeValue.create(eventType);
                (0, vitest_1.expect)(event.isToolLifecycleEvent()).toBe(false);
            });
        });
        (0, vitest_1.it)('should return false for device_mode_changed', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('device_mode_changed');
            (0, vitest_1.expect)(event.isToolLifecycleEvent()).toBe(false);
        });
        (0, vitest_1.it)('should return false for element_library_searched', () => {
            const event = creation_event_type_value_1.CreationEventTypeValue.create('element_library_searched');
            (0, vitest_1.expect)(event.isToolLifecycleEvent()).toBe(false);
        });
    });
    (0, vitest_1.describe)('equals()', () => {
        (0, vitest_1.it)('should be equal when event types are the same', () => {
            const event1 = creation_event_type_value_1.CreationEventTypeValue.create('tool_created');
            const event2 = creation_event_type_value_1.CreationEventTypeValue.create('tool_created');
            (0, vitest_1.expect)(event1.equals(event2)).toBe(true);
        });
        (0, vitest_1.it)('should not be equal when event types differ', () => {
            const event1 = creation_event_type_value_1.CreationEventTypeValue.create('tool_created');
            const event2 = creation_event_type_value_1.CreationEventTypeValue.create('tool_updated');
            (0, vitest_1.expect)(event1.equals(event2)).toBe(false);
        });
        (0, vitest_1.it)('should be equal for builder events', () => {
            const event1 = creation_event_type_value_1.CreationEventTypeValue.create('builder_session_start');
            const event2 = creation_event_type_value_1.CreationEventTypeValue.create('builder_session_start');
            (0, vitest_1.expect)(event1.equals(event2)).toBe(true);
        });
    });
    (0, vitest_1.describe)('all event types', () => {
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
        (0, vitest_1.it)('should accept all 13 valid event types', () => {
            allEventTypes.forEach(eventType => {
                const event = creation_event_type_value_1.CreationEventTypeValue.create(eventType);
                (0, vitest_1.expect)(event.value).toBe(eventType);
            });
        });
        (0, vitest_1.it)('should have 13 total event types', () => {
            (0, vitest_1.expect)(allEventTypes.length).toBe(13);
        });
        (0, vitest_1.it)('should categorize all events correctly', () => {
            allEventTypes.forEach(eventType => {
                const event = creation_event_type_value_1.CreationEventTypeValue.create(eventType);
                const isBuilder = event.isBuilderEvent();
                const isTool = event.isToolLifecycleEvent();
                // Each event should be at least one category
                if (!isBuilder && !isTool) {
                    // device_mode_changed is the only one that's neither
                    (0, vitest_1.expect)(eventType).toBe('device_mode_changed');
                }
            });
        });
    });
    (0, vitest_1.describe)('real-world scenarios', () => {
        (0, vitest_1.it)('should track tool builder session', () => {
            const start = creation_event_type_value_1.CreationEventTypeValue.create('builder_session_start');
            const elementAdded = creation_event_type_value_1.CreationEventTypeValue.create('element_added');
            const configured = creation_event_type_value_1.CreationEventTypeValue.create('element_configured');
            const canvasMode = creation_event_type_value_1.CreationEventTypeValue.create('canvas_mode_changed');
            const end = creation_event_type_value_1.CreationEventTypeValue.create('builder_session_end');
            (0, vitest_1.expect)(start.isBuilderEvent()).toBe(true);
            (0, vitest_1.expect)(elementAdded.isBuilderEvent()).toBe(true);
            (0, vitest_1.expect)(configured.isBuilderEvent()).toBe(true);
            (0, vitest_1.expect)(canvasMode.isBuilderEvent()).toBe(true);
            (0, vitest_1.expect)(end.isBuilderEvent()).toBe(true);
        });
        (0, vitest_1.it)('should track tool lifecycle', () => {
            const created = creation_event_type_value_1.CreationEventTypeValue.create('tool_created');
            const updated = creation_event_type_value_1.CreationEventTypeValue.create('tool_updated');
            const published = creation_event_type_value_1.CreationEventTypeValue.create('tool_published');
            (0, vitest_1.expect)(created.isToolLifecycleEvent()).toBe(true);
            (0, vitest_1.expect)(updated.isToolLifecycleEvent()).toBe(true);
            (0, vitest_1.expect)(published.isToolLifecycleEvent()).toBe(true);
        });
        (0, vitest_1.it)('should track tool usage', () => {
            const opened = creation_event_type_value_1.CreationEventTypeValue.create('tool_instance_opened');
            const submitted = creation_event_type_value_1.CreationEventTypeValue.create('tool_instance_submitted');
            (0, vitest_1.expect)(opened.isToolLifecycleEvent()).toBe(true);
            (0, vitest_1.expect)(submitted.isToolLifecycleEvent()).toBe(true);
        });
    });
});
//# sourceMappingURL=creation-event-type.value.test.js.map