"use strict";
/**
 * Tool Event Handler Tests
 * Tests for tool domain event handlers
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const tool_event_handlers_1 = require("../tool-event.handlers");
const tool_created_event_1 = require("../../../domain/tools/events/tool-created.event");
const tool_published_event_1 = require("../../../domain/tools/events/tool-published.event");
const tool_used_event_1 = require("../../../domain/tools/events/tool-used.event");
const tool_forked_event_1 = require("../../../domain/tools/events/tool-forked.event");
(0, vitest_1.describe)('Tool Event Handlers', () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.describe)('handleToolCreated', () => {
        (0, vitest_1.it)('should handle tool created event', async () => {
            // Arrange
            const event = new tool_created_event_1.ToolCreatedEvent('tool_123', 'Campus Poll Builder', 'creator_456', 'space_789');
            const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            // Act
            await (0, tool_event_handlers_1.handleToolCreated)(event);
            // Assert
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalledWith('[ToolEventHandler] Tool created: Campus Poll Builder by creator_456');
            consoleLogSpy.mockRestore();
        });
        (0, vitest_1.it)('should handle tool created without space', async () => {
            const event = new tool_created_event_1.ToolCreatedEvent('tool_789', 'Generic Calculator', 'creator_101');
            const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            await (0, tool_event_handlers_1.handleToolCreated)(event);
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalled();
            (0, vitest_1.expect)(event.spaceId).toBeUndefined();
            consoleLogSpy.mockRestore();
        });
        (0, vitest_1.it)('should complete without throwing errors', async () => {
            const event = new tool_created_event_1.ToolCreatedEvent('tool_new', 'Event Scheduler', 'creator_999', 'space_111');
            await (0, vitest_1.expect)((0, tool_event_handlers_1.handleToolCreated)(event)).resolves.toBeUndefined();
        });
    });
    (0, vitest_1.describe)('handleToolPublished', () => {
        (0, vitest_1.it)('should handle tool published event', async () => {
            // Arrange
            const event = new tool_published_event_1.ToolPublishedEvent('tool_123', 'Campus Poll Builder', 'public');
            const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            // Act
            await (0, tool_event_handlers_1.handleToolPublished)(event);
            // Assert
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalledWith('[ToolEventHandler] Tool published: Campus Poll Builder (tool_123) with visibility public');
            consoleLogSpy.mockRestore();
        });
        (0, vitest_1.it)('should handle different visibility levels', async () => {
            const visibilities = ['public', 'private', 'space'];
            for (const visibility of visibilities) {
                const event = new tool_published_event_1.ToolPublishedEvent(`tool_${visibility}`, `Test ${visibility} Tool`, visibility);
                const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
                await (0, tool_event_handlers_1.handleToolPublished)(event);
                (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalled();
                consoleLogSpy.mockRestore();
            }
        });
        (0, vitest_1.it)('should complete without throwing errors', async () => {
            const event = new tool_published_event_1.ToolPublishedEvent('tool_456', 'Study Timer', 'public');
            await (0, vitest_1.expect)((0, tool_event_handlers_1.handleToolPublished)(event)).resolves.toBeUndefined();
        });
    });
    (0, vitest_1.describe)('handleToolUsed', () => {
        (0, vitest_1.it)('should handle tool used event', async () => {
            // Arrange
            const event = new tool_used_event_1.ToolUsedEvent('tool_123', 'Campus Poll Builder', 'user_456', 42);
            const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            // Act
            await (0, tool_event_handlers_1.handleToolUsed)(event);
            // Assert
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalledWith('[ToolEventHandler] Tool used: Campus Poll Builder by user_456 (total: 42)');
            consoleLogSpy.mockRestore();
        });
        (0, vitest_1.it)('should track usage count', async () => {
            const event = new tool_used_event_1.ToolUsedEvent('tool_popular', 'Hot Tool', 'user_999', 1000);
            await (0, tool_event_handlers_1.handleToolUsed)(event);
            (0, vitest_1.expect)(event.totalUses).toBe(1000);
        });
        (0, vitest_1.it)('should handle first use', async () => {
            const event = new tool_used_event_1.ToolUsedEvent('tool_new', 'Brand New Tool', 'user_first', 1);
            const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            await (0, tool_event_handlers_1.handleToolUsed)(event);
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalled();
            (0, vitest_1.expect)(event.totalUses).toBe(1);
            consoleLogSpy.mockRestore();
        });
        (0, vitest_1.it)('should complete without throwing errors', async () => {
            const event = new tool_used_event_1.ToolUsedEvent('tool_789', 'Study Helper', 'user_111', 25);
            await (0, vitest_1.expect)((0, tool_event_handlers_1.handleToolUsed)(event)).resolves.toBeUndefined();
        });
    });
    (0, vitest_1.describe)('handleToolForked', () => {
        (0, vitest_1.it)('should handle tool forked event', async () => {
            // Arrange
            const event = new tool_forked_event_1.ToolForkedEvent('tool_fork_456', 'tool_original_123', 'forker_789', 3);
            const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            // Act
            await (0, tool_event_handlers_1.handleToolForked)(event);
            // Assert
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalledWith('[ToolEventHandler] Tool forked: tool_fork_456 by forker_789');
            consoleLogSpy.mockRestore();
        });
        (0, vitest_1.it)('should track fork count', async () => {
            const event = new tool_forked_event_1.ToolForkedEvent('tool_fork_new', 'tool_popular', 'user_forker', 10);
            await (0, tool_event_handlers_1.handleToolForked)(event);
            (0, vitest_1.expect)(event.totalForks).toBe(10);
        });
        (0, vitest_1.it)('should handle first fork', async () => {
            const event = new tool_forked_event_1.ToolForkedEvent('tool_fork_1', 'tool_original', 'user_first_fork', 1);
            const consoleLogSpy = vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
            await (0, tool_event_handlers_1.handleToolForked)(event);
            (0, vitest_1.expect)(consoleLogSpy).toHaveBeenCalled();
            (0, vitest_1.expect)(event.totalForks).toBe(1);
            consoleLogSpy.mockRestore();
        });
        (0, vitest_1.it)('should track forked tool relationship', async () => {
            const event = new tool_forked_event_1.ToolForkedEvent('tool_fork_999', 'tool_awesome', 'user_fan', 5);
            await (0, tool_event_handlers_1.handleToolForked)(event);
            (0, vitest_1.expect)(event.forkedToolId).toBe('tool_awesome');
            (0, vitest_1.expect)(event.forkedBy).toBe('user_fan');
        });
        (0, vitest_1.it)('should complete without throwing errors', async () => {
            const event = new tool_forked_event_1.ToolForkedEvent('tool_fork_final', 'tool_base', 'user_dev', 7);
            await (0, vitest_1.expect)((0, tool_event_handlers_1.handleToolForked)(event)).resolves.toBeUndefined();
        });
    });
});
//# sourceMappingURL=tool-event.handlers.test.js.map