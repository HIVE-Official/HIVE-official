"use strict";
/**
 * Tool Aggregate Tests
 * Comprehensive test coverage for Tool (HiveLab) business logic
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const tool_aggregate_1 = require("../aggregates/tool.aggregate");
const tool_id_value_1 = require("../value-objects/tool-id.value");
const profile_id_value_1 = require("../../profile/value-objects/profile-id.value");
const space_id_value_1 = require("../../spaces/value-objects/space-id.value");
/**
 * Test Data Factories
 */
const createValidToolId = () => {
    const result = tool_id_value_1.ToolId.create();
    if (result.isFailure)
        throw new Error('Failed to create ToolId');
    return result.getValue();
};
const createValidProfileId = (value = 'profile_123') => {
    const result = profile_id_value_1.ProfileId.create(value);
    if (result.isFailure)
        throw new Error(`Failed to create ProfileId: ${result.error}`);
    return result.getValue();
};
const createValidSpaceId = (value = 'space_123') => {
    const result = space_id_value_1.SpaceId.create(value);
    if (result.isFailure)
        throw new Error(`Failed to create SpaceId: ${result.error}`);
    return result.getValue();
};
const createValidElement = (overrides) => {
    return {
        id: 'element_1',
        type: 'button',
        config: { text: 'Click Me', color: 'primary' },
        position: { x: 0, y: 0 },
        connections: { inputs: [], outputs: [] },
        ...overrides
    };
};
const createValidPermissions = (overrides) => {
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
(0, vitest_1.describe)('Tool.create()', () => {
    (0, vitest_1.it)('should create a valid tool', () => {
        const result = tool_aggregate_1.Tool.create({
            name: 'Event Registration',
            description: 'Tool for registering to events',
            createdBy: createValidProfileId(),
            elements: [createValidElement()],
            version: '1.0.0',
            status: 'draft',
            visibility: 'private',
            permissions: createValidPermissions()
        });
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        const tool = result.getValue();
        (0, vitest_1.expect)(tool.name).toBe('Event Registration');
        (0, vitest_1.expect)(tool.status).toBe('draft');
        (0, vitest_1.expect)(tool.version).toBe('1.0.0');
        (0, vitest_1.expect)(tool.elements.length).toBe(1);
    });
    (0, vitest_1.it)('should fail when name is empty', () => {
        const result = tool_aggregate_1.Tool.create({
            name: '',
            description: 'Test tool',
            createdBy: createValidProfileId(),
            elements: [createValidElement()],
            version: '1.0.0',
            status: 'draft',
            visibility: 'private',
            permissions: createValidPermissions()
        });
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('name is required');
    });
    (0, vitest_1.it)('should fail when description is empty', () => {
        const result = tool_aggregate_1.Tool.create({
            name: 'Test Tool',
            description: '',
            createdBy: createValidProfileId(),
            elements: [createValidElement()],
            version: '1.0.0',
            status: 'draft',
            visibility: 'private',
            permissions: createValidPermissions()
        });
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('description is required');
    });
    (0, vitest_1.it)('should fail when elements array is empty', () => {
        const result = tool_aggregate_1.Tool.create({
            name: 'Test Tool',
            description: 'Test description',
            createdBy: createValidProfileId(),
            elements: [],
            version: '1.0.0',
            status: 'draft',
            visibility: 'private',
            permissions: createValidPermissions()
        });
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('at least one element');
    });
    (0, vitest_1.it)('should create tool with optional spaceId', () => {
        const spaceId = createValidSpaceId();
        const result = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        const tool = result.getValue();
        (0, vitest_1.expect)(tool.spaceId?.value).toBe('space_123');
    });
    (0, vitest_1.it)('should create tool with optional icon', () => {
        const result = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        const tool = result.getValue();
        (0, vitest_1.expect)(tool.icon).toBe('🛠️');
    });
    (0, vitest_1.it)('should emit ToolCreatedEvent', () => {
        const result = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        const tool = result.getValue();
        const events = tool.domainEvents;
        (0, vitest_1.expect)(events.length).toBeGreaterThan(0);
        (0, vitest_1.expect)(events[0].getEventName()).toBe('ToolCreated');
    });
});
(0, vitest_1.describe)('Tool.publish()', () => {
    (0, vitest_1.it)('should publish a draft tool', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(tool.status).toBe('published');
        (0, vitest_1.expect)(tool.publishedAt).toBeDefined();
    });
    (0, vitest_1.it)('should fail when publishing non-draft tool', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('Only draft tools can be published');
    });
    (0, vitest_1.it)('should fail when publishing tool with no elements', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        tool.props.elements = [];
        const result = tool.publish();
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('Cannot publish tool with no elements');
    });
    (0, vitest_1.it)('should emit ToolPublishedEvent', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(events.length).toBeGreaterThan(0);
        (0, vitest_1.expect)(events[events.length - 1].getEventName()).toBe('ToolPublished');
    });
});
(0, vitest_1.describe)('Tool.archive()', () => {
    (0, vitest_1.it)('should archive a published tool', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(tool.status).toBe('archived');
    });
    (0, vitest_1.it)('should archive a draft tool', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(tool.status).toBe('archived');
    });
    (0, vitest_1.it)('should fail when archiving already archived tool', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('already archived');
    });
    (0, vitest_1.it)('should emit ToolArchivedEvent', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(events.length).toBeGreaterThan(0);
        (0, vitest_1.expect)(events[events.length - 1].getEventName()).toBe('ToolArchived');
    });
});
(0, vitest_1.describe)('Tool.fork()', () => {
    (0, vitest_1.it)('should fork a published tool', () => {
        const originalTool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        const forkedTool = result.getValue();
        (0, vitest_1.expect)(forkedTool.name).toBe('Forked Tool');
        (0, vitest_1.expect)(forkedTool.status).toBe('draft');
        (0, vitest_1.expect)(forkedTool.forkedFrom?.value).toBe(originalTool.toolId.value);
        (0, vitest_1.expect)(forkedTool.createdBy.value).toBe('forker_1');
    });
    (0, vitest_1.it)('should fail when forking non-forkable tool', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('cannot be forked');
    });
    (0, vitest_1.it)('should fail when forking non-published tool', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('Only published tools can be forked');
    });
    (0, vitest_1.it)('should increment fork count on original tool', () => {
        const originalTool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(originalTool.analytics.forks).toBe(2);
    });
    (0, vitest_1.it)('should deep clone elements', () => {
        const element = createValidElement({ id: 'elem_1', config: { nested: { value: 42 } } });
        const originalTool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(originalTool.elements[0].config.nested.value).toBe(42);
    });
    (0, vitest_1.it)('should emit ToolForkedEvent', () => {
        const originalTool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(events.length).toBeGreaterThan(0);
        (0, vitest_1.expect)(events[events.length - 1].getEventName()).toBe('ToolForked');
    });
});
(0, vitest_1.describe)('Tool.deployToSpaces()', () => {
    (0, vitest_1.it)('should deploy published tool to spaces', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(tool.deployedTo.length).toBe(2);
    });
    (0, vitest_1.it)('should fail when deploying non-published tool', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('Only published tools can be deployed');
    });
    (0, vitest_1.it)('should avoid duplicate deployments', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(tool.deployedTo.length).toBe(1);
    });
    (0, vitest_1.it)('should emit ToolDeployedEvent', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(events.length).toBeGreaterThan(0);
        (0, vitest_1.expect)(events[events.length - 1].getEventName()).toBe('ToolDeployed');
    });
});
(0, vitest_1.describe)('Tool.undeployFromSpace()', () => {
    (0, vitest_1.it)('should undeploy tool from space', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(tool.deployedTo.length).toBe(1);
        const result = tool.undeployFromSpace(spaceId);
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(tool.deployedTo.length).toBe(0);
    });
    (0, vitest_1.it)('should fail when undeploying from non-deployed space', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('not deployed to this space');
    });
});
(0, vitest_1.describe)('Tool.recordUse()', () => {
    (0, vitest_1.it)('should record usage of published tool', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(tool.analytics.uses).toBe(1);
    });
    (0, vitest_1.it)('should fail when recording use of non-published tool', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('Only published tools can be used');
    });
    (0, vitest_1.it)('should emit ToolUsedEvent', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(events.length).toBeGreaterThan(0);
        (0, vitest_1.expect)(events[events.length - 1].getEventName()).toBe('ToolUsed');
    });
});
(0, vitest_1.describe)('Tool.updateElements()', () => {
    (0, vitest_1.it)('should update elements in draft tool', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(tool.elements.length).toBe(2);
    });
    (0, vitest_1.it)('should fail when updating elements in published tool', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('Cannot modify elements of published tool');
    });
    (0, vitest_1.it)('should fail when updating to empty elements array', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('at least one element');
    });
});
(0, vitest_1.describe)('Tool.updateVisibility()', () => {
    (0, vitest_1.it)('should update visibility', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(tool.visibility).toBe('campus');
    });
    (0, vitest_1.it)('should prevent public visibility while draft', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('published');
        (0, vitest_1.expect)(tool.visibility).toBe('private');
    });
});
(0, vitest_1.describe)('Tool.grantEditAccess()', () => {
    (0, vitest_1.it)('should grant edit access to user', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(tool.permissions.canEdit.length).toBe(1);
        (0, vitest_1.expect)(tool.canUserEdit(editorId)).toBe(true);
    });
    (0, vitest_1.it)('should fail when granting access to user who already has it', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('already has edit access');
    });
});
(0, vitest_1.describe)('Tool.revokeEditAccess()', () => {
    (0, vitest_1.it)('should revoke edit access from user', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(tool.canUserEdit(editorId)).toBe(false);
    });
    (0, vitest_1.it)('should fail when revoking creator access', () => {
        const creatorId = createValidProfileId('creator');
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('Cannot revoke creator access');
    });
    (0, vitest_1.it)('should fail when revoking access from user who does not have it', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('does not have edit access');
    });
});
(0, vitest_1.describe)('Tool.canUserEdit()', () => {
    (0, vitest_1.it)('should return true for creator', () => {
        const creatorId = createValidProfileId('creator');
        const tool = tool_aggregate_1.Tool.create({
            name: 'Test Tool',
            description: 'Test description',
            createdBy: creatorId,
            elements: [createValidElement()],
            version: '1.0.0',
            status: 'draft',
            visibility: 'private',
            permissions: createValidPermissions()
        }).getValue();
        (0, vitest_1.expect)(tool.canUserEdit(creatorId)).toBe(true);
    });
    (0, vitest_1.it)('should return true for granted editor', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(tool.canUserEdit(editorId)).toBe(true);
    });
    (0, vitest_1.it)('should return false for non-editor', () => {
        const tool = tool_aggregate_1.Tool.create({
            name: 'Test Tool',
            description: 'Test description',
            createdBy: createValidProfileId('creator'),
            elements: [createValidElement()],
            version: '1.0.0',
            status: 'draft',
            visibility: 'private',
            permissions: createValidPermissions()
        }).getValue();
        (0, vitest_1.expect)(tool.canUserEdit(createValidProfileId('random_user'))).toBe(false);
    });
});
(0, vitest_1.describe)('Tool.canUserUse()', () => {
    (0, vitest_1.it)('should return true for public published tool', () => {
        const tool = tool_aggregate_1.Tool.create({
            name: 'Test Tool',
            description: 'Test description',
            createdBy: createValidProfileId(),
            elements: [createValidElement()],
            version: '1.0.0',
            status: 'published',
            visibility: 'public',
            permissions: createValidPermissions()
        }).getValue();
        (0, vitest_1.expect)(tool.canUserUse(createValidProfileId('any_user'))).toBe(true);
    });
    (0, vitest_1.it)('should return true for campus published tool', () => {
        const tool = tool_aggregate_1.Tool.create({
            name: 'Test Tool',
            description: 'Test description',
            createdBy: createValidProfileId(),
            elements: [createValidElement()],
            version: '1.0.0',
            status: 'published',
            visibility: 'campus',
            permissions: createValidPermissions()
        }).getValue();
        (0, vitest_1.expect)(tool.canUserUse(createValidProfileId('campus_user'))).toBe(true);
    });
    (0, vitest_1.it)('should return false for non-published tool', () => {
        const tool = tool_aggregate_1.Tool.create({
            name: 'Test Tool',
            description: 'Test description',
            createdBy: createValidProfileId(),
            elements: [createValidElement()],
            version: '1.0.0',
            status: 'draft',
            visibility: 'public',
            permissions: createValidPermissions()
        }).getValue();
        (0, vitest_1.expect)(tool.canUserUse(createValidProfileId('any_user'))).toBe(false);
    });
    (0, vitest_1.it)('should return true for private tool if user can edit', () => {
        const creatorId = createValidProfileId('creator');
        const tool = tool_aggregate_1.Tool.create({
            name: 'Test Tool',
            description: 'Test description',
            createdBy: creatorId,
            elements: [createValidElement()],
            version: '1.0.0',
            status: 'published',
            visibility: 'private',
            permissions: createValidPermissions()
        }).getValue();
        (0, vitest_1.expect)(tool.canUserUse(creatorId)).toBe(true);
    });
});
(0, vitest_1.describe)('Tool.incrementVersion()', () => {
    (0, vitest_1.it)('should increment major version', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(tool.version).toBe('2.0.0');
    });
    (0, vitest_1.it)('should increment minor version', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(tool.version).toBe('1.3.0');
    });
    (0, vitest_1.it)('should increment patch version', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(tool.version).toBe('1.2.4');
    });
});
(0, vitest_1.describe)('Tool.updateRating()', () => {
    (0, vitest_1.it)('should update rating', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isSuccess).toBe(true);
        (0, vitest_1.expect)(tool.analytics.rating).toBe(4.5);
    });
    (0, vitest_1.it)('should fail when rating is below 0', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('between 0 and 5');
    });
    (0, vitest_1.it)('should fail when rating is above 5', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(result.isFailure).toBe(true);
        (0, vitest_1.expect)(result.error).toContain('between 0 and 5');
    });
});
(0, vitest_1.describe)('Tool.recordSubmission()', () => {
    (0, vitest_1.it)('should increment submission count', () => {
        const tool = tool_aggregate_1.Tool.create({
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
        (0, vitest_1.expect)(tool.analytics.submissions).toBe(2);
    });
});
(0, vitest_1.describe)('Tool Business Invariants', () => {
    (0, vitest_1.it)('should maintain status flags', () => {
        const draftTool = tool_aggregate_1.Tool.create({
            name: 'Test Tool',
            description: 'Test description',
            createdBy: createValidProfileId(),
            elements: [createValidElement()],
            version: '1.0.0',
            status: 'draft',
            visibility: 'private',
            permissions: createValidPermissions()
        }).getValue();
        (0, vitest_1.expect)(draftTool.isDraft).toBe(true);
        (0, vitest_1.expect)(draftTool.isPublished).toBe(false);
        (0, vitest_1.expect)(draftTool.isArchived).toBe(false);
        draftTool.publish();
        (0, vitest_1.expect)(draftTool.isDraft).toBe(false);
        (0, vitest_1.expect)(draftTool.isPublished).toBe(true);
        (0, vitest_1.expect)(draftTool.isArchived).toBe(false);
    });
    (0, vitest_1.it)('should initialize analytics to zero', () => {
        const tool = tool_aggregate_1.Tool.create({
            name: 'Test Tool',
            description: 'Test description',
            createdBy: createValidProfileId(),
            elements: [createValidElement()],
            version: '1.0.0',
            status: 'draft',
            visibility: 'private',
            permissions: createValidPermissions()
        }).getValue();
        (0, vitest_1.expect)(tool.analytics.uses).toBe(0);
        (0, vitest_1.expect)(tool.analytics.forks).toBe(0);
        (0, vitest_1.expect)(tool.analytics.rating).toBe(0);
        (0, vitest_1.expect)(tool.analytics.submissions).toBe(0);
    });
    (0, vitest_1.it)('should initialize with empty deployedTo array', () => {
        const tool = tool_aggregate_1.Tool.create({
            name: 'Test Tool',
            description: 'Test description',
            createdBy: createValidProfileId(),
            elements: [createValidElement()],
            version: '1.0.0',
            status: 'draft',
            visibility: 'private',
            permissions: createValidPermissions()
        }).getValue();
        (0, vitest_1.expect)(tool.deployedTo.length).toBe(0);
    });
    (0, vitest_1.it)('should enforce valid visibility levels', () => {
        const visibilities = ['private', 'space', 'campus', 'public'];
        visibilities.forEach(visibility => {
            const result = tool_aggregate_1.Tool.create({
                name: 'Test Tool',
                description: 'Test description',
                createdBy: createValidProfileId(),
                elements: [createValidElement()],
                version: '1.0.0',
                status: 'draft',
                visibility: visibility,
                permissions: createValidPermissions()
            });
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
        });
    });
});
//# sourceMappingURL=tool.aggregate.test.js.map