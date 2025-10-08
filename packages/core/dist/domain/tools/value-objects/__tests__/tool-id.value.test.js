"use strict";
/**
 * ToolId Value Object Tests
 * Tests for unique tool identifier validation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const tool_id_value_1 = require("../tool-id.value");
(0, vitest_1.describe)('ToolId', () => {
    (0, vitest_1.describe)('create()', () => {
        (0, vitest_1.it)('should create a valid ToolId when no argument provided', () => {
            const result = tool_id_value_1.ToolId.create();
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const toolId = result.getValue();
            (0, vitest_1.expect)(toolId.value).toBeDefined();
            (0, vitest_1.expect)(toolId.value.length).toBeGreaterThan(0);
            (0, vitest_1.expect)(toolId.id).toBe(toolId.value);
        });
        (0, vitest_1.it)('should create a valid ToolId with provided id', () => {
            const result = tool_id_value_1.ToolId.create('tool_123');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            const toolId = result.getValue();
            (0, vitest_1.expect)(toolId.value).toBe('tool_123');
            (0, vitest_1.expect)(toolId.id).toBe('tool_123');
        });
        (0, vitest_1.it)('should create different ids when called multiple times without argument', () => {
            const id1 = tool_id_value_1.ToolId.create().getValue();
            const id2 = tool_id_value_1.ToolId.create().getValue();
            (0, vitest_1.expect)(id1.value).not.toBe(id2.value);
        });
        (0, vitest_1.it)('should fail when provided id is empty string', () => {
            const result = tool_id_value_1.ToolId.create('');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('ToolId cannot be empty');
        });
        (0, vitest_1.it)('should fail when provided id is whitespace only', () => {
            const result = tool_id_value_1.ToolId.create('   ');
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('ToolId cannot be empty');
        });
        (0, vitest_1.it)('should accept alphanumeric with underscores and hyphens', () => {
            const result = tool_id_value_1.ToolId.create('tool_abc-123_xyz');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe('tool_abc-123_xyz');
        });
        (0, vitest_1.it)('should accept UUID format', () => {
            const uuid = '550e8400-e29b-41d4-a716-446655440000';
            const result = tool_id_value_1.ToolId.create(uuid);
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(result.getValue().value).toBe(uuid);
        });
    });
    (0, vitest_1.describe)('equality', () => {
        (0, vitest_1.it)('should be equal when values are the same', () => {
            const id1 = tool_id_value_1.ToolId.create('tool_123').getValue();
            const id2 = tool_id_value_1.ToolId.create('tool_123').getValue();
            (0, vitest_1.expect)(id1.equals(id2)).toBe(true);
        });
        (0, vitest_1.it)('should not be equal when values differ', () => {
            const id1 = tool_id_value_1.ToolId.create('tool_123').getValue();
            const id2 = tool_id_value_1.ToolId.create('tool_456').getValue();
            (0, vitest_1.expect)(id1.equals(id2)).toBe(false);
        });
        (0, vitest_1.it)('should not be equal when auto-generated', () => {
            const id1 = tool_id_value_1.ToolId.create().getValue();
            const id2 = tool_id_value_1.ToolId.create().getValue();
            (0, vitest_1.expect)(id1.equals(id2)).toBe(false);
        });
    });
    (0, vitest_1.describe)('toString()', () => {
        (0, vitest_1.it)('should return the id value as string', () => {
            const toolId = tool_id_value_1.ToolId.create('tool_test').getValue();
            (0, vitest_1.expect)(toolId.toString()).toBe('tool_test');
        });
    });
    (0, vitest_1.describe)('real-world usage', () => {
        (0, vitest_1.it)('should create ids for various HiveLab tools', () => {
            const tools = [
                'tool_poll_creator',
                'tool_event_rsvp',
                'tool_textbook_exchange',
                'tool_ride_share_board'
            ];
            tools.forEach(toolId => {
                const result = tool_id_value_1.ToolId.create(toolId);
                (0, vitest_1.expect)(result.isSuccess).toBe(true);
            });
        });
        (0, vitest_1.it)('should handle forked tool ids', () => {
            const result = tool_id_value_1.ToolId.create('tool_poll_creator_fork_1');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should handle versioned tool ids', () => {
            const result = tool_id_value_1.ToolId.create('tool_event_rsvp_v2');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
        (0, vitest_1.it)('should handle user-created tool ids', () => {
            const result = tool_id_value_1.ToolId.create('tool_custom_attendance_tracker');
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
    });
});
//# sourceMappingURL=tool-id.value.test.js.map