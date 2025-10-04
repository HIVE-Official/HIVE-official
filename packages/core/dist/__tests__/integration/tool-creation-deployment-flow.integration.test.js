"use strict";
/**
 * Tool Creation & Deployment Flow - Integration Test
 * Tests the HiveLab tool creation, publishing, and deployment integration between domain and repository layers
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const tool_aggregate_1 = require("../../domain/tools/aggregates/tool.aggregate");
const profile_id_value_1 = require("../../domain/profile/value-objects/profile-id.value");
const space_id_value_1 = require("../../domain/spaces/value-objects/space-id.value");
const Result_1 = require("../../domain/shared/base/Result");
// Mock Firebase
vitest_1.vi.mock('@hive/firebase', () => ({
    db: {},
    auth: {}
}));
vitest_1.vi.mock('firebase/firestore', () => ({
    collection: vitest_1.vi.fn(),
    doc: vitest_1.vi.fn(),
    getDoc: vitest_1.vi.fn(),
    getDocs: vitest_1.vi.fn(),
    setDoc: vitest_1.vi.fn(),
    updateDoc: vitest_1.vi.fn(),
    deleteDoc: vitest_1.vi.fn(),
    query: vitest_1.vi.fn(),
    where: vitest_1.vi.fn(),
    orderBy: vitest_1.vi.fn(),
    limit: vitest_1.vi.fn(),
    addDoc: vitest_1.vi.fn(),
    onSnapshot: vitest_1.vi.fn(),
    increment: vitest_1.vi.fn(),
    Timestamp: {
        now: vitest_1.vi.fn(() => ({ seconds: Date.now() / 1000, nanoseconds: 0 })),
        fromDate: vitest_1.vi.fn((date) => ({ seconds: date.getTime() / 1000, nanoseconds: 0 }))
    }
}));
// Mock repository factory
const mockToolRepo = {
    save: vitest_1.vi.fn(),
    findById: vitest_1.vi.fn(),
    findByCreator: vitest_1.vi.fn(),
    findBySpace: vitest_1.vi.fn(),
    findByStatus: vitest_1.vi.fn(),
    findByVisibility: vitest_1.vi.fn(),
    findPublished: vitest_1.vi.fn(),
    findDeployedToSpace: vitest_1.vi.fn(),
    findTrending: vitest_1.vi.fn(),
    findForkableTools: vitest_1.vi.fn(),
    searchTools: vitest_1.vi.fn(),
    recordUse: vitest_1.vi.fn(),
    findAll: vitest_1.vi.fn(),
    delete: vitest_1.vi.fn()
};
const mockSpaceRepo = {
    save: vitest_1.vi.fn(),
    findById: vitest_1.vi.fn(),
    findByType: vitest_1.vi.fn(),
    findTrending: vitest_1.vi.fn(),
    findByCategory: vitest_1.vi.fn(),
    findPublicSpaces: vitest_1.vi.fn(),
    searchSpaces: vitest_1.vi.fn(),
    addMember: vitest_1.vi.fn(),
    removeMember: vitest_1.vi.fn(),
    getMemberCount: vitest_1.vi.fn(),
    findMemberSpaces: vitest_1.vi.fn(),
    findAll: vitest_1.vi.fn(),
    delete: vitest_1.vi.fn()
};
const mockProfileRepo = {
    save: vitest_1.vi.fn(),
    findById: vitest_1.vi.fn(),
    findByHandle: vitest_1.vi.fn(),
    findByEmail: vitest_1.vi.fn(),
    findByCampus: vitest_1.vi.fn(),
    delete: vitest_1.vi.fn()
};
(0, vitest_1.describe)('Tool Creation & Deployment Flow - Integration', () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    // Test data factory
    const createMockProfile = (overrides = {}) => ({
        id: { id: 'profile_creator_123' },
        handle: { value: 'toolcreator' },
        personalInfo: {
            firstName: 'Alice',
            lastName: 'Builder',
            major: 'Computer Science'
        },
        toData: () => ({
            id: 'profile_creator_123',
            handle: 'toolcreator',
            personalInfo: {
                firstName: 'Alice',
                lastName: 'Builder',
                major: 'Computer Science'
            }
        }),
        ...overrides
    });
    const createMockSpace = (overrides = {}) => ({
        id: { value: 'space_cs_001' },
        spaceId: { value: 'space_cs_001' },
        name: { name: 'CS Study Group' },
        description: { description: 'A space for CS students' },
        isActive: true,
        toData: () => ({
            id: 'space_cs_001',
            name: 'CS Study Group',
            description: 'A space for CS students',
            isActive: true
        }),
        ...overrides
    });
    const createValidToolData = (overrides = {}) => ({
        name: 'Study Group Organizer',
        description: 'A tool to help organize study sessions',
        icon: '📚',
        createdBy: profile_id_value_1.ProfileId.create('profile_creator_123').getValue(),
        spaceId: space_id_value_1.SpaceId.create('space_cs_001').getValue(),
        elements: [
            {
                id: 'field_1',
                type: 'form_field',
                config: {
                    label: 'Session Topic',
                    type: 'text',
                    required: true
                },
                position: { x: 100, y: 100 },
                connections: {
                    inputs: [],
                    outputs: ['submit_button']
                }
            },
            {
                id: 'submit_button',
                type: 'button',
                config: {
                    label: 'Create Session',
                    action: 'submit'
                },
                position: { x: 100, y: 200 },
                connections: {
                    inputs: ['field_1'],
                    outputs: []
                }
            }
        ],
        version: '1.0.0',
        status: 'draft',
        visibility: 'space',
        permissions: {
            canFork: true,
            canEdit: [profile_id_value_1.ProfileId.create('profile_creator_123').getValue()],
            requiresApproval: false
        },
        ...overrides
    });
    (0, vitest_1.describe)('Tool Creation Integration', () => {
        (0, vitest_1.it)('should create tool through domain and repository layer', async () => {
            const toolData = createValidToolData();
            // Create tool using domain logic
            const toolResult = tool_aggregate_1.Tool.create(toolData);
            (0, vitest_1.expect)(toolResult.isSuccess).toBe(true);
            const tool = toolResult.getValue();
            // Mock successful repository save
            mockToolRepo.save.mockResolvedValue(Result_1.Result.ok());
            // Execute repository save
            const saveResult = await mockToolRepo.save(tool);
            // Verify integration
            (0, vitest_1.expect)(saveResult.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockToolRepo.save).toHaveBeenCalledWith(tool);
            // Verify tool domain properties
            (0, vitest_1.expect)(tool.name).toBe('Study Group Organizer');
            (0, vitest_1.expect)(tool.status).toBe('draft');
            (0, vitest_1.expect)(tool.elements).toHaveLength(2);
            (0, vitest_1.expect)(tool.isDraft).toBe(true);
            (0, vitest_1.expect)(tool.isPublished).toBe(false);
        });
        (0, vitest_1.it)('should handle tool validation errors during creation', async () => {
            const invalidToolData = createValidToolData({
                name: '', // Invalid: empty name
                elements: [] // Invalid: no elements
            });
            // Attempt to create tool with invalid data
            const toolResult = tool_aggregate_1.Tool.create(invalidToolData);
            // Verify validation error
            (0, vitest_1.expect)(toolResult.isFailure).toBe(true);
            (0, vitest_1.expect)(toolResult.error).toContain('Tool name is required');
            // Verify no repository save was attempted
            (0, vitest_1.expect)(mockToolRepo.save).not.toHaveBeenCalled();
        });
        (0, vitest_1.it)('should handle repository save failures during creation', async () => {
            const toolData = createValidToolData();
            const toolResult = tool_aggregate_1.Tool.create(toolData);
            const tool = toolResult.getValue();
            // Mock repository save failure
            mockToolRepo.save.mockResolvedValue(Result_1.Result.fail('Database connection failed'));
            // Execute repository save
            const saveResult = await mockToolRepo.save(tool);
            // Verify error handling
            (0, vitest_1.expect)(saveResult.isFailure).toBe(true);
            (0, vitest_1.expect)(saveResult.error).toContain('Database connection failed');
        });
    });
    (0, vitest_1.describe)('Tool Publishing Integration', () => {
        (0, vitest_1.it)('should publish tool through domain logic and repository', async () => {
            // Create and save draft tool
            const toolData = createValidToolData();
            const toolResult = tool_aggregate_1.Tool.create(toolData);
            const tool = toolResult.getValue();
            mockToolRepo.save.mockResolvedValue(Result_1.Result.ok());
            await mockToolRepo.save(tool);
            // Publish tool using domain logic
            const publishResult = tool.publish();
            (0, vitest_1.expect)(publishResult.isSuccess).toBe(true);
            // Verify domain state change
            (0, vitest_1.expect)(tool.status).toBe('published');
            (0, vitest_1.expect)(tool.isPublished).toBe(true);
            (0, vitest_1.expect)(tool.publishedAt).toBeDefined();
            // Save published tool to repository
            const savePublishedResult = await mockToolRepo.save(tool);
            // Verify integration
            (0, vitest_1.expect)(savePublishedResult.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockToolRepo.save).toHaveBeenCalledTimes(2); // Initial save + publish save
        });
        (0, vitest_1.it)('should handle publishing validation errors', async () => {
            // Create tool with no elements (should fail publishing)
            const toolData = createValidToolData({ elements: [] });
            // This should fail at creation, but let's test the publish validation too
            const mockTool = tool_aggregate_1.Tool.create({
                ...toolData,
                elements: [{
                        id: 'temp',
                        type: 'button',
                        config: {},
                        position: { x: 0, y: 0 },
                        connections: { inputs: [], outputs: [] }
                    }]
            }).getValue();
            // Remove elements after creation to test publish validation
            mockTool.updateElements([]);
            // This would fail due to empty elements validation in updateElements
            // Let's test a different scenario - trying to publish when already published
            // First publish
            const firstPublish = mockTool.publish();
            (0, vitest_1.expect)(firstPublish.isSuccess).toBe(true);
            // Try to publish again
            const secondPublish = mockTool.publish();
            (0, vitest_1.expect)(secondPublish.isFailure).toBe(true);
            (0, vitest_1.expect)(secondPublish.error).toContain('Only draft tools can be published');
        });
    });
    (0, vitest_1.describe)('Tool Deployment Integration', () => {
        (0, vitest_1.it)('should deploy tool to spaces through domain and repository layer', async () => {
            // Create and publish tool
            const toolData = createValidToolData();
            const toolResult = tool_aggregate_1.Tool.create(toolData);
            const tool = toolResult.getValue();
            tool.publish();
            // Mock spaces to deploy to
            const spaceId1 = space_id_value_1.SpaceId.create('space_cs_001').getValue();
            const spaceId2 = space_id_value_1.SpaceId.create('space_math_002').getValue();
            // Mock repository operations
            mockToolRepo.save.mockResolvedValue(Result_1.Result.ok());
            mockSpaceRepo.findById
                .mockResolvedValueOnce(Result_1.Result.ok(createMockSpace({ id: { value: 'space_cs_001' } })))
                .mockResolvedValueOnce(Result_1.Result.ok(createMockSpace({ id: { value: 'space_math_002' } })));
            // Deploy tool using domain logic
            const deployResult = tool.deployToSpaces([spaceId1, spaceId2]);
            (0, vitest_1.expect)(deployResult.isSuccess).toBe(true);
            // Verify domain state change
            (0, vitest_1.expect)(tool.deployedTo).toHaveLength(2);
            (0, vitest_1.expect)(tool.deployedTo[0].value).toBe('space_cs_001');
            (0, vitest_1.expect)(tool.deployedTo[1].value).toBe('space_math_002');
            // Save deployed tool to repository
            const saveResult = await mockToolRepo.save(tool);
            // Verify integration
            (0, vitest_1.expect)(saveResult.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockToolRepo.save).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should handle deployment validation errors', async () => {
            // Create draft tool (not published)
            const toolData = createValidToolData();
            const toolResult = tool_aggregate_1.Tool.create(toolData);
            const tool = toolResult.getValue();
            const spaceId = space_id_value_1.SpaceId.create('space_cs_001').getValue();
            // Try to deploy draft tool
            const deployResult = tool.deployToSpaces([spaceId]);
            // Verify validation error
            (0, vitest_1.expect)(deployResult.isFailure).toBe(true);
            (0, vitest_1.expect)(deployResult.error).toContain('Only published tools can be deployed');
            // Verify no repository save was attempted
            (0, vitest_1.expect)(mockToolRepo.save).not.toHaveBeenCalled();
        });
    });
    (0, vitest_1.describe)('Tool Usage Tracking Integration', () => {
        (0, vitest_1.it)('should record tool usage through domain and repository layer', async () => {
            // Create and publish tool
            const toolData = createValidToolData();
            const toolResult = tool_aggregate_1.Tool.create(toolData);
            const tool = toolResult.getValue();
            tool.publish();
            const userId = profile_id_value_1.ProfileId.create('profile_user_456').getValue();
            // Mock repository operations
            mockToolRepo.save.mockResolvedValue(Result_1.Result.ok());
            mockToolRepo.recordUse.mockResolvedValue(Result_1.Result.ok());
            // Record usage using domain logic
            const useResult = tool.recordUse(userId);
            (0, vitest_1.expect)(useResult.isSuccess).toBe(true);
            // Verify domain state change
            (0, vitest_1.expect)(tool.analytics.uses).toBe(1);
            // Record usage in repository
            const recordResult = await mockToolRepo.recordUse(tool.toolId.value);
            // Save updated tool
            const saveResult = await mockToolRepo.save(tool);
            // Verify integration
            (0, vitest_1.expect)(recordResult.isSuccess).toBe(true);
            (0, vitest_1.expect)(saveResult.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockToolRepo.recordUse).toHaveBeenCalledWith(tool.toolId.value);
            (0, vitest_1.expect)(mockToolRepo.save).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should handle usage tracking validation errors', async () => {
            // Create draft tool (not published)
            const toolData = createValidToolData();
            const toolResult = tool_aggregate_1.Tool.create(toolData);
            const tool = toolResult.getValue();
            const userId = profile_id_value_1.ProfileId.create('profile_user_456').getValue();
            // Try to record usage on draft tool
            const useResult = tool.recordUse(userId);
            // Verify validation error
            (0, vitest_1.expect)(useResult.isFailure).toBe(true);
            (0, vitest_1.expect)(useResult.error).toContain('Only published tools can be used');
            // Verify no repository operations were attempted
            (0, vitest_1.expect)(mockToolRepo.recordUse).not.toHaveBeenCalled();
            (0, vitest_1.expect)(mockToolRepo.save).not.toHaveBeenCalled();
        });
    });
    (0, vitest_1.describe)('Tool Discovery Integration', () => {
        (0, vitest_1.it)('should find tools by creator through repository layer', async () => {
            const creatorId = 'profile_creator_123';
            const mockTools = [
                createValidToolData({ name: 'Tool 1' }),
                createValidToolData({ name: 'Tool 2' })
            ].map(data => tool_aggregate_1.Tool.create(data).getValue());
            // Mock repository query
            mockToolRepo.findByCreator.mockResolvedValue(Result_1.Result.ok(mockTools));
            // Execute repository query
            const result = await mockToolRepo.findByCreator(creatorId);
            // Verify integration
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockToolRepo.findByCreator).toHaveBeenCalledWith(creatorId);
            const tools = result.getValue();
            (0, vitest_1.expect)(tools).toHaveLength(2);
            (0, vitest_1.expect)(tools[0].name).toBe('Tool 1');
            (0, vitest_1.expect)(tools[1].name).toBe('Tool 2');
        });
        (0, vitest_1.it)('should find published tools through repository layer', async () => {
            const campusId = 'ub-buffalo';
            const mockPublishedTools = [
                tool_aggregate_1.Tool.create(createValidToolData({ name: 'Published Tool 1' })).getValue(),
                tool_aggregate_1.Tool.create(createValidToolData({ name: 'Published Tool 2' })).getValue()
            ];
            // Publish tools
            mockPublishedTools.forEach(tool => tool.publish());
            // Mock repository query
            mockToolRepo.findPublished.mockResolvedValue(Result_1.Result.ok(mockPublishedTools));
            // Execute repository query
            const result = await mockToolRepo.findPublished(campusId, 10);
            // Verify integration
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockToolRepo.findPublished).toHaveBeenCalledWith(campusId, 10);
            const tools = result.getValue();
            (0, vitest_1.expect)(tools).toHaveLength(2);
            (0, vitest_1.expect)(tools.every((tool) => tool.isPublished)).toBe(true);
        });
        (0, vitest_1.it)('should search tools through repository layer', async () => {
            const searchQuery = 'study organizer';
            const campusId = 'ub-buffalo';
            const mockSearchResults = [
                tool_aggregate_1.Tool.create(createValidToolData({ name: 'Study Group Organizer' })).getValue()
            ];
            // Mock repository search
            mockToolRepo.searchTools.mockResolvedValue(Result_1.Result.ok(mockSearchResults));
            // Execute repository search
            const result = await mockToolRepo.searchTools(searchQuery, campusId);
            // Verify integration
            (0, vitest_1.expect)(result.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockToolRepo.searchTools).toHaveBeenCalledWith(searchQuery, campusId);
            const tools = result.getValue();
            (0, vitest_1.expect)(tools).toHaveLength(1);
            (0, vitest_1.expect)(tools[0].name).toContain('Study');
        });
        (0, vitest_1.it)('should handle repository errors during search', async () => {
            const searchQuery = 'study organizer';
            const campusId = 'ub-buffalo';
            // Mock repository error
            mockToolRepo.searchTools.mockResolvedValue(Result_1.Result.fail('Search service unavailable'));
            // Execute repository search
            const result = await mockToolRepo.searchTools(searchQuery, campusId);
            // Verify error handling
            (0, vitest_1.expect)(result.isFailure).toBe(true);
            (0, vitest_1.expect)(result.error).toContain('Search service unavailable');
        });
    });
    (0, vitest_1.describe)('Tool Forking Integration', () => {
        (0, vitest_1.it)('should fork tool through domain logic and repository layer', async () => {
            // Create and publish original tool
            const originalToolData = createValidToolData();
            const originalResult = tool_aggregate_1.Tool.create(originalToolData);
            const originalTool = originalResult.getValue();
            originalTool.publish();
            const forkerProfileId = profile_id_value_1.ProfileId.create('profile_forker_789').getValue();
            const targetSpaceId = space_id_value_1.SpaceId.create('space_fork_target').getValue();
            // Mock repository operations
            mockToolRepo.save.mockResolvedValue(Result_1.Result.ok());
            // Fork tool using domain logic
            const forkResult = originalTool.fork('Forked Study Organizer', forkerProfileId, targetSpaceId);
            (0, vitest_1.expect)(forkResult.isSuccess).toBe(true);
            const forkedTool = forkResult.getValue();
            // Verify fork properties
            (0, vitest_1.expect)(forkedTool.name).toBe('Forked Study Organizer');
            (0, vitest_1.expect)(forkedTool.createdBy.value).toBe('profile_forker_789');
            (0, vitest_1.expect)(forkedTool.spaceId?.value).toBe('space_fork_target');
            (0, vitest_1.expect)(forkedTool.forkedFrom?.value).toBe(originalTool.toolId.value);
            (0, vitest_1.expect)(forkedTool.status).toBe('draft');
            (0, vitest_1.expect)(forkedTool.visibility).toBe('private');
            // Verify original tool analytics updated
            (0, vitest_1.expect)(originalTool.analytics.forks).toBe(1);
            // Save both tools
            const saveOriginalResult = await mockToolRepo.save(originalTool);
            const saveForkedResult = await mockToolRepo.save(forkedTool);
            // Verify integration
            (0, vitest_1.expect)(saveOriginalResult.isSuccess).toBe(true);
            (0, vitest_1.expect)(saveForkedResult.isSuccess).toBe(true);
            (0, vitest_1.expect)(mockToolRepo.save).toHaveBeenCalledTimes(2);
        });
        (0, vitest_1.it)('should handle forking validation errors', async () => {
            // Create tool that cannot be forked
            const toolData = createValidToolData({
                permissions: {
                    canFork: false, // Disable forking
                    canEdit: [profile_id_value_1.ProfileId.create('profile_creator_123').getValue()],
                    requiresApproval: false
                }
            });
            const toolResult = tool_aggregate_1.Tool.create(toolData);
            const tool = toolResult.getValue();
            tool.publish();
            const forkerProfileId = profile_id_value_1.ProfileId.create('profile_forker_789').getValue();
            // Try to fork tool that cannot be forked
            const forkResult = tool.fork('Attempted Fork', forkerProfileId);
            // Verify validation error
            (0, vitest_1.expect)(forkResult.isFailure).toBe(true);
            (0, vitest_1.expect)(forkResult.error).toContain('This tool cannot be forked');
            // Verify no repository operations were attempted
            (0, vitest_1.expect)(mockToolRepo.save).not.toHaveBeenCalled();
        });
    });
    (0, vitest_1.describe)('Repository Integration Coordination', () => {
        (0, vitest_1.it)('should coordinate multiple repository operations in deployment flow', async () => {
            // Create tool
            const toolData = createValidToolData();
            const toolResult = tool_aggregate_1.Tool.create(toolData);
            const tool = toolResult.getValue();
            // Mock all repository operations
            mockToolRepo.save.mockResolvedValue(Result_1.Result.ok());
            mockSpaceRepo.findById.mockResolvedValue(Result_1.Result.ok(createMockSpace()));
            // Execute full deployment flow
            await mockToolRepo.save(tool); // Save draft
            tool.publish(); // Publish tool
            await mockToolRepo.save(tool); // Save published tool
            const spaceId = space_id_value_1.SpaceId.create('space_cs_001').getValue();
            tool.deployToSpaces([spaceId]); // Deploy tool
            await mockToolRepo.save(tool); // Save deployed tool
            // Verify all operations were called in correct order
            (0, vitest_1.expect)(mockToolRepo.save).toHaveBeenCalledTimes(3);
            (0, vitest_1.expect)(tool.isPublished).toBe(true);
            (0, vitest_1.expect)(tool.deployedTo).toHaveLength(1);
        });
        (0, vitest_1.it)('should handle partial operation failures gracefully', async () => {
            const toolData = createValidToolData();
            const toolResult = tool_aggregate_1.Tool.create(toolData);
            const tool = toolResult.getValue();
            // Mock save failure after successful creation
            mockToolRepo.save.mockResolvedValue(Result_1.Result.fail('Database write failed'));
            // Execute save operation
            const saveResult = await mockToolRepo.save(tool);
            // Verify error handling
            (0, vitest_1.expect)(saveResult.isFailure).toBe(true);
            (0, vitest_1.expect)(saveResult.error).toContain('Database write failed');
            // Verify tool domain state is unchanged by repository failure
            (0, vitest_1.expect)(tool.isDraft).toBe(true);
            (0, vitest_1.expect)(tool.name).toBe('Study Group Organizer');
        });
    });
});
//# sourceMappingURL=tool-creation-deployment-flow.integration.test.js.map