/**
 * Tool Aggregate Tests
 * Comprehensive test coverage for Tool (HiveLab) business logic
 */

import { describe, it, expect } from 'vitest';
import { Tool, ToolStatus, ToolVisibility, ElementInstance, ToolPermissions, ToolAnalytics } from '../aggregates/tool.aggregate';
import { ToolId } from '../value-objects/tool-id.value';
import { ProfileId } from '../../profile/value-objects/profile-id.value';
import { SpaceId } from '../../spaces/value-objects/space-id.value';

/**
 * Test Data Factories
 */

const createValidToolId = (): ToolId => {
  const result = ToolId.create();
  if (result.isFailure) throw new Error('Failed to create ToolId');
  return result.getValue();
};

const createValidProfileId = (value = 'profile_123'): ProfileId => {
  const result = ProfileId.create(value);
  if (result.isFailure) throw new Error(`Failed to create ProfileId: ${result.error}`);
  return result.getValue();
};

const createValidSpaceId = (value = 'space_123'): SpaceId => {
  const result = SpaceId.create(value);
  if (result.isFailure) throw new Error(`Failed to create SpaceId: ${result.error}`);
  return result.getValue();
};

const createValidElement = (overrides?: Partial<ElementInstance>): ElementInstance => {
  return {
    id: 'element_1',
    type: 'button',
    config: { text: 'Click Me', color: 'primary' },
    position: { x: 0, y: 0 },
    connections: { inputs: [], outputs: [] },
    ...overrides
  };
};

const createValidPermissions = (overrides?: Partial<ToolPermissions>): ToolPermissions => {
  return {
    canFork: true,
    canEdit: [],
    requiresApproval: false,
    ...overrides
  };
};

/**
 * Tests
 */

describe('Tool.create()', () => {
  it('should create a valid tool', () => {
    const result = Tool.create({
      name: 'Event Registration',
      description: 'Tool for registering to events',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    });

    expect(result.isSuccess).toBe(true);
    const tool = result.getValue();
    expect(tool.name).toBe('Event Registration');
    expect(tool.status).toBe('draft');
    expect(tool.version).toBe('1.0.0');
    expect(tool.elements.length).toBe(1);
  });

  it('should fail when name is empty', () => {
    const result = Tool.create({
      name: '',
      description: 'Test tool',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    });

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('name is required');
  });

  it('should fail when description is empty', () => {
    const result = Tool.create({
      name: 'Test Tool',
      description: '',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    });

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('description is required');
  });

  it('should fail when elements array is empty', () => {
    const result = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [],
      version: '1.0.0',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    });

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('at least one element');
  });

  it('should create tool with optional spaceId', () => {
    const spaceId = createValidSpaceId();
    const result = Tool.create({
      name: 'Space Tool',
      description: 'Tool for a specific space',
      createdBy: createValidProfileId(),
      spaceId: spaceId,
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'space',
      permissions: createValidPermissions()
    });

    expect(result.isSuccess).toBe(true);
    const tool = result.getValue();
    expect(tool.spaceId?.value).toBe('space_123');
  });

  it('should create tool with optional icon', () => {
    const result = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      icon: '🛠️',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    });

    expect(result.isSuccess).toBe(true);
    const tool = result.getValue();
    expect(tool.icon).toBe('🛠️');
  });

  it('should emit ToolCreatedEvent', () => {
    const result = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId('creator_123'),
      spaceId: createValidSpaceId('space_456'),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    });

    expect(result.isSuccess).toBe(true);
    const tool = result.getValue();
    const events = tool.domainEvents;
    expect(events.length).toBeGreaterThan(0);
    expect(events[0].getEventName()).toBe('ToolCreated');
  });
});

describe('Tool.publish()', () => {
  it('should publish a draft tool', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    const result = tool.publish();

    expect(result.isSuccess).toBe(true);
    expect(tool.status).toBe('published');
    expect(tool.publishedAt).toBeDefined();
  });

  it('should fail when publishing non-draft tool', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'published',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    const result = tool.publish();

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('Only draft tools can be published');
  });

  it('should fail when publishing tool with no elements', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    // Remove elements
    tool.updateElements([createValidElement()]);
    (tool as any).props.elements = [];

    const result = tool.publish();

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('Cannot publish tool with no elements');
  });

  it('should emit ToolPublishedEvent', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'campus',
      permissions: createValidPermissions()
    }).getValue();

    tool.clearEvents();
    tool.publish();

    const events = tool.domainEvents;
    expect(events.length).toBeGreaterThan(0);
    expect(events[events.length - 1].getEventName()).toBe('ToolPublished');
  });
});

describe('Tool.archive()', () => {
  it('should archive a published tool', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'published',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    const result = tool.archive();

    expect(result.isSuccess).toBe(true);
    expect(tool.status).toBe('archived');
  });

  it('should archive a draft tool', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    const result = tool.archive();

    expect(result.isSuccess).toBe(true);
    expect(tool.status).toBe('archived');
  });

  it('should fail when archiving already archived tool', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'archived',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    const result = tool.archive();

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('already archived');
  });

  it('should emit ToolArchivedEvent', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'published',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    tool.clearEvents();
    tool.archive();

    const events = tool.domainEvents;
    expect(events.length).toBeGreaterThan(0);
    expect(events[events.length - 1].getEventName()).toBe('ToolArchived');
  });
});

describe('Tool.fork()', () => {
  it('should fork a published tool', () => {
    const originalTool = Tool.create({
      name: 'Original Tool',
      description: 'Original description',
      createdBy: createValidProfileId('creator_1'),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'published',
      visibility: 'public',
      permissions: createValidPermissions({ canFork: true })
    }).getValue();

    const forkerProfileId = createValidProfileId('forker_1');
    const result = originalTool.fork('Forked Tool', forkerProfileId);

    expect(result.isSuccess).toBe(true);
    const forkedTool = result.getValue();
    expect(forkedTool.name).toBe('Forked Tool');
    expect(forkedTool.status).toBe('draft');
    expect(forkedTool.forkedFrom?.value).toBe(originalTool.toolId.value);
    expect(forkedTool.createdBy.value).toBe('forker_1');
  });

  it('should fail when forking non-forkable tool', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'published',
      visibility: 'public',
      permissions: createValidPermissions({ canFork: false })
    }).getValue();

    const result = tool.fork('Forked Tool', createValidProfileId('forker'));

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('cannot be forked');
  });

  it('should fail when forking non-published tool', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'public',
      permissions: createValidPermissions({ canFork: true })
    }).getValue();

    const result = tool.fork('Forked Tool', createValidProfileId('forker'));

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('Only published tools can be forked');
  });

  it('should increment fork count on original tool', () => {
    const originalTool = Tool.create({
      name: 'Original Tool',
      description: 'Original description',
      createdBy: createValidProfileId('creator_1'),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'published',
      visibility: 'public',
      permissions: createValidPermissions({ canFork: true })
    }).getValue();

    originalTool.fork('Fork 1', createValidProfileId('f1'));
    originalTool.fork('Fork 2', createValidProfileId('f2'));

    expect(originalTool.analytics.forks).toBe(2);
  });

  it('should deep clone elements', () => {
    const element = createValidElement({ id: 'elem_1', config: { nested: { value: 42 } } });
    const originalTool = Tool.create({
      name: 'Original Tool',
      description: 'Original description',
      createdBy: createValidProfileId(),
      elements: [element],
      version: '1.0.0',
      status: 'published',
      visibility: 'public',
      permissions: createValidPermissions({ canFork: true })
    }).getValue();

    const forkedTool = originalTool.fork('Forked Tool', createValidProfileId('forker')).getValue();

    // Modify forked tool elements
    forkedTool.elements[0].config.nested.value = 99;

    // Original should be unchanged
    expect(originalTool.elements[0].config.nested.value).toBe(42);
  });

  it('should emit ToolForkedEvent', () => {
    const originalTool = Tool.create({
      name: 'Original Tool',
      description: 'Original description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'published',
      visibility: 'public',
      permissions: createValidPermissions({ canFork: true })
    }).getValue();

    originalTool.clearEvents();
    originalTool.fork('Forked Tool', createValidProfileId('forker'));

    const events = originalTool.domainEvents;
    expect(events.length).toBeGreaterThan(0);
    expect(events[events.length - 1].getEventName()).toBe('ToolForked');
  });
});

describe('Tool.deployToSpaces()', () => {
  it('should deploy published tool to spaces', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'published',
      visibility: 'campus',
      permissions: createValidPermissions()
    }).getValue();

    const spaceIds = [createValidSpaceId('s1'), createValidSpaceId('s2')];
    const result = tool.deployToSpaces(spaceIds);

    expect(result.isSuccess).toBe(true);
    expect(tool.deployedTo.length).toBe(2);
  });

  it('should fail when deploying non-published tool', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'campus',
      permissions: createValidPermissions()
    }).getValue();

    const result = tool.deployToSpaces([createValidSpaceId()]);

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('Only published tools can be deployed');
  });

  it('should avoid duplicate deployments', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'published',
      visibility: 'campus',
      permissions: createValidPermissions()
    }).getValue();

    const spaceId = createValidSpaceId('s1');
    tool.deployToSpaces([spaceId]);
    tool.deployToSpaces([spaceId]); // Deploy to same space again

    expect(tool.deployedTo.length).toBe(1);
  });

  it('should emit ToolDeployedEvent', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'published',
      visibility: 'campus',
      permissions: createValidPermissions()
    }).getValue();

    tool.clearEvents();
    tool.deployToSpaces([createValidSpaceId()]);

    const events = tool.domainEvents;
    expect(events.length).toBeGreaterThan(0);
    expect(events[events.length - 1].getEventName()).toBe('ToolDeployed');
  });
});

describe('Tool.undeployFromSpace()', () => {
  it('should undeploy tool from space', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'published',
      visibility: 'campus',
      permissions: createValidPermissions()
    }).getValue();

    const spaceId = createValidSpaceId('s1');
    tool.deployToSpaces([spaceId]);

    expect(tool.deployedTo.length).toBe(1);

    const result = tool.undeployFromSpace(spaceId);

    expect(result.isSuccess).toBe(true);
    expect(tool.deployedTo.length).toBe(0);
  });

  it('should fail when undeploying from non-deployed space', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'published',
      visibility: 'campus',
      permissions: createValidPermissions()
    }).getValue();

    const result = tool.undeployFromSpace(createValidSpaceId());

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('not deployed to this space');
  });
});

describe('Tool.recordUse()', () => {
  it('should record usage of published tool', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'published',
      visibility: 'public',
      permissions: createValidPermissions()
    }).getValue();

    const result = tool.recordUse(createValidProfileId('user_1'));

    expect(result.isSuccess).toBe(true);
    expect(tool.analytics.uses).toBe(1);
  });

  it('should fail when recording use of non-published tool', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'public',
      permissions: createValidPermissions()
    }).getValue();

    const result = tool.recordUse(createValidProfileId());

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('Only published tools can be used');
  });

  it('should emit ToolUsedEvent', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'published',
      visibility: 'public',
      permissions: createValidPermissions()
    }).getValue();

    tool.clearEvents();
    tool.recordUse(createValidProfileId());

    const events = tool.domainEvents;
    expect(events.length).toBeGreaterThan(0);
    expect(events[events.length - 1].getEventName()).toBe('ToolUsed');
  });
});

describe('Tool.updateElements()', () => {
  it('should update elements in draft tool', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    const newElements = [
      createValidElement({ id: 'elem_1' }),
      createValidElement({ id: 'elem_2' })
    ];

    const result = tool.updateElements(newElements);

    expect(result.isSuccess).toBe(true);
    expect(tool.elements.length).toBe(2);
  });

  it('should fail when updating elements in published tool', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'published',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    const result = tool.updateElements([createValidElement()]);

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('Cannot modify elements of published tool');
  });

  it('should fail when updating to empty elements array', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    const result = tool.updateElements([]);

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('at least one element');
  });
});

describe('Tool.updateVisibility()', () => {
  it('should update visibility', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    tool.publish();
    const result = tool.updateVisibility('campus');

    expect(result.isSuccess).toBe(true);
    expect(tool.visibility).toBe('campus');
  });

  it('should prevent public visibility while draft', () => {
    const tool = Tool.create({
      name: 'Draft Tool',
      description: 'Draft description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    const result = tool.updateVisibility('public');

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('published');
    expect(tool.visibility).toBe('private');
  });
});

describe('Tool.grantEditAccess()', () => {
  it('should grant edit access to user', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    const editorId = createValidProfileId('editor_1');
    const result = tool.grantEditAccess(editorId);

    expect(result.isSuccess).toBe(true);
    expect(tool.permissions.canEdit.length).toBe(1);
    expect(tool.canUserEdit(editorId)).toBe(true);
  });

  it('should fail when granting access to user who already has it', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    const editorId = createValidProfileId('editor_1');
    tool.grantEditAccess(editorId);
    const result = tool.grantEditAccess(editorId);

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('already has edit access');
  });
});

describe('Tool.revokeEditAccess()', () => {
  it('should revoke edit access from user', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId('creator'),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    const editorId = createValidProfileId('editor_1');
    tool.grantEditAccess(editorId);

    const result = tool.revokeEditAccess(editorId);

    expect(result.isSuccess).toBe(true);
    expect(tool.canUserEdit(editorId)).toBe(false);
  });

  it('should fail when revoking creator access', () => {
    const creatorId = createValidProfileId('creator');
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: creatorId,
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    const result = tool.revokeEditAccess(creatorId);

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('Cannot revoke creator access');
  });

  it('should fail when revoking access from user who does not have it', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    const result = tool.revokeEditAccess(createValidProfileId('non_editor'));

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('does not have edit access');
  });
});

describe('Tool.canUserEdit()', () => {
  it('should return true for creator', () => {
    const creatorId = createValidProfileId('creator');
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: creatorId,
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    expect(tool.canUserEdit(creatorId)).toBe(true);
  });

  it('should return true for granted editor', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId('creator'),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    const editorId = createValidProfileId('editor');
    tool.grantEditAccess(editorId);

    expect(tool.canUserEdit(editorId)).toBe(true);
  });

  it('should return false for non-editor', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId('creator'),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    expect(tool.canUserEdit(createValidProfileId('random_user'))).toBe(false);
  });
});

describe('Tool.canUserUse()', () => {
  it('should return true for public published tool', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'published',
      visibility: 'public',
      permissions: createValidPermissions()
    }).getValue();

    expect(tool.canUserUse(createValidProfileId('any_user'))).toBe(true);
  });

  it('should return true for campus published tool', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'published',
      visibility: 'campus',
      permissions: createValidPermissions()
    }).getValue();

    expect(tool.canUserUse(createValidProfileId('campus_user'))).toBe(true);
  });

  it('should return false for non-published tool', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'public',
      permissions: createValidPermissions()
    }).getValue();

    expect(tool.canUserUse(createValidProfileId('any_user'))).toBe(false);
  });

  it('should return true for private tool if user can edit', () => {
    const creatorId = createValidProfileId('creator');
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: creatorId,
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'published',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    expect(tool.canUserUse(creatorId)).toBe(true);
  });
});

describe('Tool.incrementVersion()', () => {
  it('should increment major version', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.2.3',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    tool.incrementVersion('major');

    expect(tool.version).toBe('2.0.0');
  });

  it('should increment minor version', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.2.3',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    tool.incrementVersion('minor');

    expect(tool.version).toBe('1.3.0');
  });

  it('should increment patch version', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.2.3',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    tool.incrementVersion('patch');

    expect(tool.version).toBe('1.2.4');
  });
});

describe('Tool.updateRating()', () => {
  it('should update rating', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'published',
      visibility: 'public',
      permissions: createValidPermissions()
    }).getValue();

    const result = tool.updateRating(4.5);

    expect(result.isSuccess).toBe(true);
    expect(tool.analytics.rating).toBe(4.5);
  });

  it('should fail when rating is below 0', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'published',
      visibility: 'public',
      permissions: createValidPermissions()
    }).getValue();

    const result = tool.updateRating(-1);

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('between 0 and 5');
  });

  it('should fail when rating is above 5', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'published',
      visibility: 'public',
      permissions: createValidPermissions()
    }).getValue();

    const result = tool.updateRating(6);

    expect(result.isFailure).toBe(true);
    expect(result.error).toContain('between 0 and 5');
  });
});

describe('Tool.recordSubmission()', () => {
  it('should increment submission count', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'published',
      visibility: 'public',
      permissions: createValidPermissions()
    }).getValue();

    tool.recordSubmission();
    tool.recordSubmission();

    expect(tool.analytics.submissions).toBe(2);
  });
});

describe('Tool Business Invariants', () => {
  it('should maintain status flags', () => {
    const draftTool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    expect(draftTool.isDraft).toBe(true);
    expect(draftTool.isPublished).toBe(false);
    expect(draftTool.isArchived).toBe(false);

    draftTool.publish();

    expect(draftTool.isDraft).toBe(false);
    expect(draftTool.isPublished).toBe(true);
    expect(draftTool.isArchived).toBe(false);
  });

  it('should initialize analytics to zero', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    expect(tool.analytics.uses).toBe(0);
    expect(tool.analytics.forks).toBe(0);
    expect(tool.analytics.rating).toBe(0);
    expect(tool.analytics.submissions).toBe(0);
  });

  it('should initialize with empty deployedTo array', () => {
    const tool = Tool.create({
      name: 'Test Tool',
      description: 'Test description',
      createdBy: createValidProfileId(),
      elements: [createValidElement()],
      version: '1.0.0',
      status: 'draft',
      visibility: 'private',
      permissions: createValidPermissions()
    }).getValue();

    expect(tool.deployedTo.length).toBe(0);
  });

  it('should enforce valid visibility levels', () => {
    const visibilities: ToolVisibility[] = ['private', 'space', 'campus', 'public'];

    visibilities.forEach(visibility => {
      const result = Tool.create({
        name: 'Test Tool',
        description: 'Test description',
        createdBy: createValidProfileId(),
        elements: [createValidElement()],
        version: '1.0.0',
        status: 'draft',
        visibility: visibility,
        permissions: createValidPermissions()
      });

      expect(result.isSuccess).toBe(true);
    });
  });
});
