"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const tool_created_event_1 = require("../tool-created.event");
const tool_published_event_1 = require("../tool-published.event");
const tool_deployed_event_1 = require("../tool-deployed.event");
const tool_forked_event_1 = require("../tool-forked.event");
const tool_archived_event_1 = require("../tool-archived.event");
const tool_used_event_1 = require("../tool-used.event");
(0, vitest_1.describe)('ToolCreatedEvent', () => {
    (0, vitest_1.it)('should create event with correct properties', () => {
        const event = new tool_created_event_1.ToolCreatedEvent('tool_123', 'Campus Poll Builder', 'creator_456', 'space_789');
        (0, vitest_1.expect)(event.aggregateId).toBe('tool_123');
        (0, vitest_1.expect)(event.toolName).toBe('Campus Poll Builder');
        (0, vitest_1.expect)(event.creatorId).toBe('creator_456');
        (0, vitest_1.expect)(event.spaceId).toBe('space_789');
        (0, vitest_1.expect)(event.occurredAt).toBeInstanceOf(Date);
    });
    (0, vitest_1.it)('should create event without spaceId', () => {
        const event = new tool_created_event_1.ToolCreatedEvent('tool_123', 'Campus Poll Builder', 'creator_456');
        (0, vitest_1.expect)(event.aggregateId).toBe('tool_123');
        (0, vitest_1.expect)(event.toolName).toBe('Campus Poll Builder');
        (0, vitest_1.expect)(event.creatorId).toBe('creator_456');
        (0, vitest_1.expect)(event.spaceId).toBeUndefined();
    });
    (0, vitest_1.it)('should have correct event type', () => {
        const event = new tool_created_event_1.ToolCreatedEvent('tool_1', 'Test Tool', 'creator_1');
        (0, vitest_1.expect)(event.getEventName()).toBe('ToolCreated');
    });
    (0, vitest_1.it)('should serialize to data correctly', () => {
        const event = new tool_created_event_1.ToolCreatedEvent('tool_123', 'Campus Poll Builder', 'creator_456', 'space_789');
        const data = event.toData();
        (0, vitest_1.expect)(data).toEqual({
            eventType: 'ToolCreated',
            aggregateId: 'tool_123',
            occurredAt: event.occurredAt,
            toolName: 'Campus Poll Builder',
            creatorId: 'creator_456',
            spaceId: 'space_789'
        });
    });
    (0, vitest_1.it)('should serialize without spaceId', () => {
        const event = new tool_created_event_1.ToolCreatedEvent('tool_123', 'Campus Poll Builder', 'creator_456');
        const data = event.toData();
        (0, vitest_1.expect)(data.spaceId).toBeUndefined();
    });
});
(0, vitest_1.describe)('ToolPublishedEvent', () => {
    (0, vitest_1.it)('should create event with correct properties', () => {
        const event = new tool_published_event_1.ToolPublishedEvent('tool_123', 'Campus Poll Builder', 'public');
        (0, vitest_1.expect)(event.aggregateId).toBe('tool_123');
        (0, vitest_1.expect)(event.toolName).toBe('Campus Poll Builder');
        (0, vitest_1.expect)(event.visibility).toBe('public');
        (0, vitest_1.expect)(event.occurredAt).toBeInstanceOf(Date);
    });
    (0, vitest_1.it)('should support different visibility levels', () => {
        const publicEvent = new tool_published_event_1.ToolPublishedEvent('tool_1', 'Public Tool', 'public');
        const privateEvent = new tool_published_event_1.ToolPublishedEvent('tool_2', 'Private Tool', 'private');
        const spaceEvent = new tool_published_event_1.ToolPublishedEvent('tool_3', 'Space Tool', 'space');
        (0, vitest_1.expect)(publicEvent.visibility).toBe('public');
        (0, vitest_1.expect)(privateEvent.visibility).toBe('private');
        (0, vitest_1.expect)(spaceEvent.visibility).toBe('space');
    });
    (0, vitest_1.it)('should have correct event type', () => {
        const event = new tool_published_event_1.ToolPublishedEvent('tool_1', 'Test Tool', 'public');
        (0, vitest_1.expect)(event.getEventName()).toBe('ToolPublished');
    });
    (0, vitest_1.it)('should serialize to data correctly', () => {
        const event = new tool_published_event_1.ToolPublishedEvent('tool_123', 'Campus Poll Builder', 'public');
        const data = event.toData();
        (0, vitest_1.expect)(data).toEqual({
            eventType: 'ToolPublished',
            aggregateId: 'tool_123',
            occurredAt: event.occurredAt,
            toolName: 'Campus Poll Builder',
            visibility: 'public'
        });
    });
});
(0, vitest_1.describe)('ToolDeployedEvent', () => {
    (0, vitest_1.it)('should create event with correct properties', () => {
        const spaceIds = ['space_1', 'space_2', 'space_3'];
        const event = new tool_deployed_event_1.ToolDeployedEvent('tool_123', 'Campus Poll Builder', spaceIds, 5);
        (0, vitest_1.expect)(event.aggregateId).toBe('tool_123');
        (0, vitest_1.expect)(event.toolName).toBe('Campus Poll Builder');
        (0, vitest_1.expect)(event.spaceIds).toEqual(spaceIds);
        (0, vitest_1.expect)(event.totalDeployments).toBe(5);
        (0, vitest_1.expect)(event.occurredAt).toBeInstanceOf(Date);
    });
    (0, vitest_1.it)('should handle single space deployment', () => {
        const event = new tool_deployed_event_1.ToolDeployedEvent('tool_1', 'Test Tool', ['space_1'], 1);
        (0, vitest_1.expect)(event.spaceIds).toEqual(['space_1']);
        (0, vitest_1.expect)(event.totalDeployments).toBe(1);
    });
    (0, vitest_1.it)('should handle empty space array', () => {
        const event = new tool_deployed_event_1.ToolDeployedEvent('tool_1', 'Test Tool', [], 0);
        (0, vitest_1.expect)(event.spaceIds).toEqual([]);
        (0, vitest_1.expect)(event.totalDeployments).toBe(0);
    });
    (0, vitest_1.it)('should have correct event type', () => {
        const event = new tool_deployed_event_1.ToolDeployedEvent('tool_1', 'Test Tool', ['space_1'], 1);
        (0, vitest_1.expect)(event.getEventName()).toBe('ToolDeployed');
    });
    (0, vitest_1.it)('should serialize to data correctly', () => {
        const spaceIds = ['space_1', 'space_2'];
        const event = new tool_deployed_event_1.ToolDeployedEvent('tool_123', 'Campus Poll Builder', spaceIds, 5);
        const data = event.toData();
        (0, vitest_1.expect)(data).toEqual({
            eventType: 'ToolDeployed',
            aggregateId: 'tool_123',
            occurredAt: event.occurredAt,
            toolName: 'Campus Poll Builder',
            spaceIds: spaceIds,
            totalDeployments: 5
        });
    });
});
(0, vitest_1.describe)('ToolForkedEvent', () => {
    (0, vitest_1.it)('should create event with correct properties', () => {
        const event = new tool_forked_event_1.ToolForkedEvent('tool_456', 'tool_123', 'forker_789', 3);
        (0, vitest_1.expect)(event.aggregateId).toBe('tool_456');
        (0, vitest_1.expect)(event.forkedToolId).toBe('tool_123');
        (0, vitest_1.expect)(event.forkedBy).toBe('forker_789');
        (0, vitest_1.expect)(event.totalForks).toBe(3);
        (0, vitest_1.expect)(event.occurredAt).toBeInstanceOf(Date);
    });
    (0, vitest_1.it)('should track first fork', () => {
        const event = new tool_forked_event_1.ToolForkedEvent('tool_new', 'tool_original', 'user_1', 1);
        (0, vitest_1.expect)(event.totalForks).toBe(1);
    });
    (0, vitest_1.it)('should track multiple forks', () => {
        const event = new tool_forked_event_1.ToolForkedEvent('tool_fork_10', 'tool_popular', 'user_10', 10);
        (0, vitest_1.expect)(event.totalForks).toBe(10);
    });
    (0, vitest_1.it)('should have correct event type', () => {
        const event = new tool_forked_event_1.ToolForkedEvent('tool_2', 'tool_1', 'user_1', 1);
        (0, vitest_1.expect)(event.getEventName()).toBe('ToolForked');
    });
    (0, vitest_1.it)('should serialize to data correctly', () => {
        const event = new tool_forked_event_1.ToolForkedEvent('tool_456', 'tool_123', 'forker_789', 3);
        const data = event.toData();
        (0, vitest_1.expect)(data).toEqual({
            eventType: 'ToolForked',
            aggregateId: 'tool_456',
            occurredAt: event.occurredAt,
            forkedToolId: 'tool_123',
            forkedBy: 'forker_789',
            totalForks: 3
        });
    });
});
(0, vitest_1.describe)('ToolArchivedEvent', () => {
    (0, vitest_1.it)('should create event with correct properties', () => {
        const event = new tool_archived_event_1.ToolArchivedEvent('tool_123', 'Deprecated Poll Tool');
        (0, vitest_1.expect)(event.aggregateId).toBe('tool_123');
        (0, vitest_1.expect)(event.toolName).toBe('Deprecated Poll Tool');
        (0, vitest_1.expect)(event.occurredAt).toBeInstanceOf(Date);
    });
    (0, vitest_1.it)('should have correct event type', () => {
        const event = new tool_archived_event_1.ToolArchivedEvent('tool_1', 'Old Tool');
        (0, vitest_1.expect)(event.getEventName()).toBe('ToolArchived');
    });
    (0, vitest_1.it)('should serialize to data correctly', () => {
        const event = new tool_archived_event_1.ToolArchivedEvent('tool_123', 'Deprecated Poll Tool');
        const data = event.toData();
        (0, vitest_1.expect)(data).toEqual({
            eventType: 'ToolArchived',
            aggregateId: 'tool_123',
            occurredAt: event.occurredAt,
            toolName: 'Deprecated Poll Tool'
        });
    });
});
(0, vitest_1.describe)('ToolUsedEvent', () => {
    (0, vitest_1.it)('should create event with correct properties', () => {
        const event = new tool_used_event_1.ToolUsedEvent('tool_123', 'Campus Poll Builder', 'user_456', 42);
        (0, vitest_1.expect)(event.aggregateId).toBe('tool_123');
        (0, vitest_1.expect)(event.toolName).toBe('Campus Poll Builder');
        (0, vitest_1.expect)(event.userId).toBe('user_456');
        (0, vitest_1.expect)(event.totalUses).toBe(42);
        (0, vitest_1.expect)(event.occurredAt).toBeInstanceOf(Date);
    });
    (0, vitest_1.it)('should track first use', () => {
        const event = new tool_used_event_1.ToolUsedEvent('tool_1', 'New Tool', 'user_1', 1);
        (0, vitest_1.expect)(event.totalUses).toBe(1);
    });
    (0, vitest_1.it)('should track high usage', () => {
        const event = new tool_used_event_1.ToolUsedEvent('tool_popular', 'Popular Tool', 'user_500', 1000);
        (0, vitest_1.expect)(event.totalUses).toBe(1000);
    });
    (0, vitest_1.it)('should have correct event type', () => {
        const event = new tool_used_event_1.ToolUsedEvent('tool_1', 'Test Tool', 'user_1', 1);
        (0, vitest_1.expect)(event.getEventName()).toBe('ToolUsed');
    });
    (0, vitest_1.it)('should serialize to data correctly', () => {
        const event = new tool_used_event_1.ToolUsedEvent('tool_123', 'Campus Poll Builder', 'user_456', 42);
        const data = event.toData();
        (0, vitest_1.expect)(data).toEqual({
            eventType: 'ToolUsed',
            aggregateId: 'tool_123',
            occurredAt: event.occurredAt,
            toolName: 'Campus Poll Builder',
            userId: 'user_456',
            totalUses: 42
        });
    });
});
//# sourceMappingURL=tool-events.test.js.map