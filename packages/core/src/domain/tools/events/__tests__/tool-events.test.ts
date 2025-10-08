import { describe, it, expect } from 'vitest';
import { ToolCreatedEvent } from '../tool-created.event';
import { ToolPublishedEvent } from '../tool-published.event';
import { ToolDeployedEvent } from '../tool-deployed.event';
import { ToolForkedEvent } from '../tool-forked.event';
import { ToolArchivedEvent } from '../tool-archived.event';
import { ToolUsedEvent } from '../tool-used.event';

describe('ToolCreatedEvent', () => {
  it('should create event with correct properties', () => {
    const event = new ToolCreatedEvent(
      'tool_123',
      'Campus Poll Builder',
      'creator_456',
      'space_789'
    );

    expect(event.aggregateId).toBe('tool_123');
    expect(event.toolName).toBe('Campus Poll Builder');
    expect(event.creatorId).toBe('creator_456');
    expect(event.spaceId).toBe('space_789');
    expect(event.occurredAt).toBeInstanceOf(Date);
  });

  it('should create event without spaceId', () => {
    const event = new ToolCreatedEvent(
      'tool_123',
      'Campus Poll Builder',
      'creator_456'
    );

    expect(event.aggregateId).toBe('tool_123');
    expect(event.toolName).toBe('Campus Poll Builder');
    expect(event.creatorId).toBe('creator_456');
    expect(event.spaceId).toBeUndefined();
  });

  it('should have correct event type', () => {
    const event = new ToolCreatedEvent('tool_1', 'Test Tool', 'creator_1');
    expect(event.getEventName()).toBe('ToolCreated');
  });

  it('should serialize to data correctly', () => {
    const event = new ToolCreatedEvent('tool_123', 'Campus Poll Builder', 'creator_456', 'space_789');
    const data = event.toData();

    expect(data).toEqual({
      eventType: 'ToolCreated',
      aggregateId: 'tool_123',
      occurredAt: event.occurredAt,
      toolName: 'Campus Poll Builder',
      creatorId: 'creator_456',
      spaceId: 'space_789'
    });
  });

  it('should serialize without spaceId', () => {
    const event = new ToolCreatedEvent('tool_123', 'Campus Poll Builder', 'creator_456');
    const data = event.toData();

    expect(data.spaceId).toBeUndefined();
  });
});

describe('ToolPublishedEvent', () => {
  it('should create event with correct properties', () => {
    const event = new ToolPublishedEvent(
      'tool_123',
      'Campus Poll Builder',
      'public'
    );

    expect(event.aggregateId).toBe('tool_123');
    expect(event.toolName).toBe('Campus Poll Builder');
    expect(event.visibility).toBe('public');
    expect(event.occurredAt).toBeInstanceOf(Date);
  });

  it('should support different visibility levels', () => {
    const publicEvent = new ToolPublishedEvent('tool_1', 'Public Tool', 'public');
    const privateEvent = new ToolPublishedEvent('tool_2', 'Private Tool', 'private');
    const spaceEvent = new ToolPublishedEvent('tool_3', 'Space Tool', 'space');

    expect(publicEvent.visibility).toBe('public');
    expect(privateEvent.visibility).toBe('private');
    expect(spaceEvent.visibility).toBe('space');
  });

  it('should have correct event type', () => {
    const event = new ToolPublishedEvent('tool_1', 'Test Tool', 'public');
    expect(event.getEventName()).toBe('ToolPublished');
  });

  it('should serialize to data correctly', () => {
    const event = new ToolPublishedEvent('tool_123', 'Campus Poll Builder', 'public');
    const data = event.toData();

    expect(data).toEqual({
      eventType: 'ToolPublished',
      aggregateId: 'tool_123',
      occurredAt: event.occurredAt,
      toolName: 'Campus Poll Builder',
      visibility: 'public'
    });
  });
});

describe('ToolDeployedEvent', () => {
  it('should create event with correct properties', () => {
    const spaceIds = ['space_1', 'space_2', 'space_3'];
    const event = new ToolDeployedEvent(
      'tool_123',
      'Campus Poll Builder',
      spaceIds,
      5
    );

    expect(event.aggregateId).toBe('tool_123');
    expect(event.toolName).toBe('Campus Poll Builder');
    expect(event.spaceIds).toEqual(spaceIds);
    expect(event.totalDeployments).toBe(5);
    expect(event.occurredAt).toBeInstanceOf(Date);
  });

  it('should handle single space deployment', () => {
    const event = new ToolDeployedEvent('tool_1', 'Test Tool', ['space_1'], 1);

    expect(event.spaceIds).toEqual(['space_1']);
    expect(event.totalDeployments).toBe(1);
  });

  it('should handle empty space array', () => {
    const event = new ToolDeployedEvent('tool_1', 'Test Tool', [], 0);

    expect(event.spaceIds).toEqual([]);
    expect(event.totalDeployments).toBe(0);
  });

  it('should have correct event type', () => {
    const event = new ToolDeployedEvent('tool_1', 'Test Tool', ['space_1'], 1);
    expect(event.getEventName()).toBe('ToolDeployed');
  });

  it('should serialize to data correctly', () => {
    const spaceIds = ['space_1', 'space_2'];
    const event = new ToolDeployedEvent('tool_123', 'Campus Poll Builder', spaceIds, 5);
    const data = event.toData();

    expect(data).toEqual({
      eventType: 'ToolDeployed',
      aggregateId: 'tool_123',
      occurredAt: event.occurredAt,
      toolName: 'Campus Poll Builder',
      spaceIds: spaceIds,
      totalDeployments: 5
    });
  });
});

describe('ToolForkedEvent', () => {
  it('should create event with correct properties', () => {
    const event = new ToolForkedEvent(
      'tool_456',
      'tool_123',
      'forker_789',
      3
    );

    expect(event.aggregateId).toBe('tool_456');
    expect(event.forkedToolId).toBe('tool_123');
    expect(event.forkedBy).toBe('forker_789');
    expect(event.totalForks).toBe(3);
    expect(event.occurredAt).toBeInstanceOf(Date);
  });

  it('should track first fork', () => {
    const event = new ToolForkedEvent('tool_new', 'tool_original', 'user_1', 1);

    expect(event.totalForks).toBe(1);
  });

  it('should track multiple forks', () => {
    const event = new ToolForkedEvent('tool_fork_10', 'tool_popular', 'user_10', 10);

    expect(event.totalForks).toBe(10);
  });

  it('should have correct event type', () => {
    const event = new ToolForkedEvent('tool_2', 'tool_1', 'user_1', 1);
    expect(event.getEventName()).toBe('ToolForked');
  });

  it('should serialize to data correctly', () => {
    const event = new ToolForkedEvent('tool_456', 'tool_123', 'forker_789', 3);
    const data = event.toData();

    expect(data).toEqual({
      eventType: 'ToolForked',
      aggregateId: 'tool_456',
      occurredAt: event.occurredAt,
      forkedToolId: 'tool_123',
      forkedBy: 'forker_789',
      totalForks: 3
    });
  });
});

describe('ToolArchivedEvent', () => {
  it('should create event with correct properties', () => {
    const event = new ToolArchivedEvent('tool_123', 'Deprecated Poll Tool');

    expect(event.aggregateId).toBe('tool_123');
    expect(event.toolName).toBe('Deprecated Poll Tool');
    expect(event.occurredAt).toBeInstanceOf(Date);
  });

  it('should have correct event type', () => {
    const event = new ToolArchivedEvent('tool_1', 'Old Tool');
    expect(event.getEventName()).toBe('ToolArchived');
  });

  it('should serialize to data correctly', () => {
    const event = new ToolArchivedEvent('tool_123', 'Deprecated Poll Tool');
    const data = event.toData();

    expect(data).toEqual({
      eventType: 'ToolArchived',
      aggregateId: 'tool_123',
      occurredAt: event.occurredAt,
      toolName: 'Deprecated Poll Tool'
    });
  });
});

describe('ToolUsedEvent', () => {
  it('should create event with correct properties', () => {
    const event = new ToolUsedEvent(
      'tool_123',
      'Campus Poll Builder',
      'user_456',
      42
    );

    expect(event.aggregateId).toBe('tool_123');
    expect(event.toolName).toBe('Campus Poll Builder');
    expect(event.userId).toBe('user_456');
    expect(event.totalUses).toBe(42);
    expect(event.occurredAt).toBeInstanceOf(Date);
  });

  it('should track first use', () => {
    const event = new ToolUsedEvent('tool_1', 'New Tool', 'user_1', 1);

    expect(event.totalUses).toBe(1);
  });

  it('should track high usage', () => {
    const event = new ToolUsedEvent('tool_popular', 'Popular Tool', 'user_500', 1000);

    expect(event.totalUses).toBe(1000);
  });

  it('should have correct event type', () => {
    const event = new ToolUsedEvent('tool_1', 'Test Tool', 'user_1', 1);
    expect(event.getEventName()).toBe('ToolUsed');
  });

  it('should serialize to data correctly', () => {
    const event = new ToolUsedEvent('tool_123', 'Campus Poll Builder', 'user_456', 42);
    const data = event.toData();

    expect(data).toEqual({
      eventType: 'ToolUsed',
      aggregateId: 'tool_123',
      occurredAt: event.occurredAt,
      toolName: 'Campus Poll Builder',
      userId: 'user_456',
      totalUses: 42
    });
  });
});
