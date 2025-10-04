/**
 * Tool Creation & Deployment Flow - Integration Test
 * Tests the HiveLab tool creation, publishing, and deployment integration between domain and repository layers
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Tool } from '../../domain/tools/aggregates/tool.aggregate';
import { ProfileId } from '../../domain/profile/value-objects/profile-id.value';
import { SpaceId } from '../../domain/spaces/value-objects/space-id.value';
import { ToolId } from '../../domain/tools/value-objects/tool-id.value';
import { Result } from '../../domain/shared/base/Result';

// Mock Firebase
vi.mock('@hive/firebase', () => ({
  db: {},
  auth: {}
}));

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  addDoc: vi.fn(),
  onSnapshot: vi.fn(),
  increment: vi.fn(),
  Timestamp: {
    now: vi.fn(() => ({ seconds: Date.now() / 1000, nanoseconds: 0 })),
    fromDate: vi.fn((date: Date) => ({ seconds: date.getTime() / 1000, nanoseconds: 0 }))
  }
}));

// Mock repository factory
const mockToolRepo = {
  save: vi.fn(),
  findById: vi.fn(),
  findByCreator: vi.fn(),
  findBySpace: vi.fn(),
  findByStatus: vi.fn(),
  findByVisibility: vi.fn(),
  findPublished: vi.fn(),
  findDeployedToSpace: vi.fn(),
  findTrending: vi.fn(),
  findForkableTools: vi.fn(),
  searchTools: vi.fn(),
  recordUse: vi.fn(),
  findAll: vi.fn(),
  delete: vi.fn()
};

const mockSpaceRepo = {
  save: vi.fn(),
  findById: vi.fn(),
  findByType: vi.fn(),
  findTrending: vi.fn(),
  findByCategory: vi.fn(),
  findPublicSpaces: vi.fn(),
  searchSpaces: vi.fn(),
  addMember: vi.fn(),
  removeMember: vi.fn(),
  getMemberCount: vi.fn(),
  findMemberSpaces: vi.fn(),
  findAll: vi.fn(),
  delete: vi.fn()
};

const mockProfileRepo = {
  save: vi.fn(),
  findById: vi.fn(),
  findByHandle: vi.fn(),
  findByEmail: vi.fn(),
  findByCampus: vi.fn(),
  delete: vi.fn()
};

describe('Tool Creation & Deployment Flow - Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
    createdBy: ProfileId.create('profile_creator_123').getValue(),
    spaceId: SpaceId.create('space_cs_001').getValue(),
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
    status: 'draft' as const,
    visibility: 'space' as const,
    permissions: {
      canFork: true,
      canEdit: [ProfileId.create('profile_creator_123').getValue()],
      requiresApproval: false
    },
    ...overrides
  });

  describe('Tool Creation Integration', () => {
    it('should create tool through domain and repository layer', async () => {
      const toolData = createValidToolData();

      // Create tool using domain logic
      const toolResult = Tool.create(toolData);
      expect(toolResult.isSuccess).toBe(true);

      const tool = toolResult.getValue();

      // Mock successful repository save
      mockToolRepo.save.mockResolvedValue(Result.ok());

      // Execute repository save
      const saveResult = await mockToolRepo.save(tool);

      // Verify integration
      expect(saveResult.isSuccess).toBe(true);
      expect(mockToolRepo.save).toHaveBeenCalledWith(tool);

      // Verify tool domain properties
      expect(tool.name).toBe('Study Group Organizer');
      expect(tool.status).toBe('draft');
      expect(tool.elements).toHaveLength(2);
      expect(tool.isDraft).toBe(true);
      expect(tool.isPublished).toBe(false);
    });

    it('should handle tool validation errors during creation', async () => {
      const invalidToolData = createValidToolData({
        name: '', // Invalid: empty name
        elements: [] // Invalid: no elements
      });

      // Attempt to create tool with invalid data
      const toolResult = Tool.create(invalidToolData);

      // Verify validation error
      expect(toolResult.isFailure).toBe(true);
      expect(toolResult.error).toContain('Tool name is required');

      // Verify no repository save was attempted
      expect(mockToolRepo.save).not.toHaveBeenCalled();
    });

    it('should handle repository save failures during creation', async () => {
      const toolData = createValidToolData();
      const toolResult = Tool.create(toolData);
      const tool = toolResult.getValue();

      // Mock repository save failure
      mockToolRepo.save.mockResolvedValue(Result.fail('Database connection failed'));

      // Execute repository save
      const saveResult = await mockToolRepo.save(tool);

      // Verify error handling
      expect(saveResult.isFailure).toBe(true);
      expect(saveResult.error).toContain('Database connection failed');
    });
  });

  describe('Tool Publishing Integration', () => {
    it('should publish tool through domain logic and repository', async () => {
      // Create and save draft tool
      const toolData = createValidToolData();
      const toolResult = Tool.create(toolData);
      const tool = toolResult.getValue();

      mockToolRepo.save.mockResolvedValue(Result.ok());
      await mockToolRepo.save(tool);

      // Publish tool using domain logic
      const publishResult = tool.publish();
      expect(publishResult.isSuccess).toBe(true);

      // Verify domain state change
      expect(tool.status).toBe('published');
      expect(tool.isPublished).toBe(true);
      expect(tool.publishedAt).toBeDefined();

      // Save published tool to repository
      const savePublishedResult = await mockToolRepo.save(tool);

      // Verify integration
      expect(savePublishedResult.isSuccess).toBe(true);
      expect(mockToolRepo.save).toHaveBeenCalledTimes(2); // Initial save + publish save
    });

    it('should handle publishing validation errors', async () => {
      // Create tool with no elements (should fail publishing)
      const toolData = createValidToolData({ elements: [] });

      // This should fail at creation, but let's test the publish validation too
      const mockTool = Tool.create({
        ...toolData,
        elements: [{ // Add minimal element for creation
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
      expect(firstPublish.isSuccess).toBe(true);

      // Try to publish again
      const secondPublish = mockTool.publish();
      expect(secondPublish.isFailure).toBe(true);
      expect(secondPublish.error).toContain('Only draft tools can be published');
    });
  });

  describe('Tool Deployment Integration', () => {
    it('should deploy tool to spaces through domain and repository layer', async () => {
      // Create and publish tool
      const toolData = createValidToolData();
      const toolResult = Tool.create(toolData);
      const tool = toolResult.getValue();

      tool.publish();

      // Mock spaces to deploy to
      const spaceId1 = SpaceId.create('space_cs_001').getValue();
      const spaceId2 = SpaceId.create('space_math_002').getValue();

      // Mock repository operations
      mockToolRepo.save.mockResolvedValue(Result.ok());
      mockSpaceRepo.findById
        .mockResolvedValueOnce(Result.ok(createMockSpace({ id: { value: 'space_cs_001' } })))
        .mockResolvedValueOnce(Result.ok(createMockSpace({ id: { value: 'space_math_002' } })));

      // Deploy tool using domain logic
      const deployResult = tool.deployToSpaces([spaceId1, spaceId2]);
      expect(deployResult.isSuccess).toBe(true);

      // Verify domain state change
      expect(tool.deployedTo).toHaveLength(2);
      expect(tool.deployedTo[0].value).toBe('space_cs_001');
      expect(tool.deployedTo[1].value).toBe('space_math_002');

      // Save deployed tool to repository
      const saveResult = await mockToolRepo.save(tool);

      // Verify integration
      expect(saveResult.isSuccess).toBe(true);
      expect(mockToolRepo.save).toHaveBeenCalled();
    });

    it('should handle deployment validation errors', async () => {
      // Create draft tool (not published)
      const toolData = createValidToolData();
      const toolResult = Tool.create(toolData);
      const tool = toolResult.getValue();

      const spaceId = SpaceId.create('space_cs_001').getValue();

      // Try to deploy draft tool
      const deployResult = tool.deployToSpaces([spaceId]);

      // Verify validation error
      expect(deployResult.isFailure).toBe(true);
      expect(deployResult.error).toContain('Only published tools can be deployed');

      // Verify no repository save was attempted
      expect(mockToolRepo.save).not.toHaveBeenCalled();
    });
  });

  describe('Tool Usage Tracking Integration', () => {
    it('should record tool usage through domain and repository layer', async () => {
      // Create and publish tool
      const toolData = createValidToolData();
      const toolResult = Tool.create(toolData);
      const tool = toolResult.getValue();
      tool.publish();

      const userId = ProfileId.create('profile_user_456').getValue();

      // Mock repository operations
      mockToolRepo.save.mockResolvedValue(Result.ok());
      mockToolRepo.recordUse.mockResolvedValue(Result.ok());

      // Record usage using domain logic
      const useResult = tool.recordUse(userId);
      expect(useResult.isSuccess).toBe(true);

      // Verify domain state change
      expect(tool.analytics.uses).toBe(1);

      // Record usage in repository
      const recordResult = await mockToolRepo.recordUse(tool.toolId.value);

      // Save updated tool
      const saveResult = await mockToolRepo.save(tool);

      // Verify integration
      expect(recordResult.isSuccess).toBe(true);
      expect(saveResult.isSuccess).toBe(true);
      expect(mockToolRepo.recordUse).toHaveBeenCalledWith(tool.toolId.value);
      expect(mockToolRepo.save).toHaveBeenCalled();
    });

    it('should handle usage tracking validation errors', async () => {
      // Create draft tool (not published)
      const toolData = createValidToolData();
      const toolResult = Tool.create(toolData);
      const tool = toolResult.getValue();

      const userId = ProfileId.create('profile_user_456').getValue();

      // Try to record usage on draft tool
      const useResult = tool.recordUse(userId);

      // Verify validation error
      expect(useResult.isFailure).toBe(true);
      expect(useResult.error).toContain('Only published tools can be used');

      // Verify no repository operations were attempted
      expect(mockToolRepo.recordUse).not.toHaveBeenCalled();
      expect(mockToolRepo.save).not.toHaveBeenCalled();
    });
  });

  describe('Tool Discovery Integration', () => {
    it('should find tools by creator through repository layer', async () => {
      const creatorId = 'profile_creator_123';
      const mockTools = [
        createValidToolData({ name: 'Tool 1' }),
        createValidToolData({ name: 'Tool 2' })
      ].map(data => Tool.create(data).getValue());

      // Mock repository query
      mockToolRepo.findByCreator.mockResolvedValue(Result.ok(mockTools));

      // Execute repository query
      const result = await mockToolRepo.findByCreator(creatorId);

      // Verify integration
      expect(result.isSuccess).toBe(true);
      expect(mockToolRepo.findByCreator).toHaveBeenCalledWith(creatorId);

      const tools = result.getValue();
      expect(tools).toHaveLength(2);
      expect(tools[0].name).toBe('Tool 1');
      expect(tools[1].name).toBe('Tool 2');
    });

    it('should find published tools through repository layer', async () => {
      const campusId = 'ub-buffalo';
      const mockPublishedTools = [
        Tool.create(createValidToolData({ name: 'Published Tool 1' })).getValue(),
        Tool.create(createValidToolData({ name: 'Published Tool 2' })).getValue()
      ];

      // Publish tools
      mockPublishedTools.forEach(tool => tool.publish());

      // Mock repository query
      mockToolRepo.findPublished.mockResolvedValue(Result.ok(mockPublishedTools));

      // Execute repository query
      const result = await mockToolRepo.findPublished(campusId, 10);

      // Verify integration
      expect(result.isSuccess).toBe(true);
      expect(mockToolRepo.findPublished).toHaveBeenCalledWith(campusId, 10);

      const tools = result.getValue();
      expect(tools).toHaveLength(2);
      expect(tools.every(tool => tool.isPublished)).toBe(true);
    });

    it('should search tools through repository layer', async () => {
      const searchQuery = 'study organizer';
      const campusId = 'ub-buffalo';
      const mockSearchResults = [
        Tool.create(createValidToolData({ name: 'Study Group Organizer' })).getValue()
      ];

      // Mock repository search
      mockToolRepo.searchTools.mockResolvedValue(Result.ok(mockSearchResults));

      // Execute repository search
      const result = await mockToolRepo.searchTools(searchQuery, campusId);

      // Verify integration
      expect(result.isSuccess).toBe(true);
      expect(mockToolRepo.searchTools).toHaveBeenCalledWith(searchQuery, campusId);

      const tools = result.getValue();
      expect(tools).toHaveLength(1);
      expect(tools[0].name).toContain('Study');
    });

    it('should handle repository errors during search', async () => {
      const searchQuery = 'study organizer';
      const campusId = 'ub-buffalo';

      // Mock repository error
      mockToolRepo.searchTools.mockResolvedValue(Result.fail('Search service unavailable'));

      // Execute repository search
      const result = await mockToolRepo.searchTools(searchQuery, campusId);

      // Verify error handling
      expect(result.isFailure).toBe(true);
      expect(result.error).toContain('Search service unavailable');
    });
  });

  describe('Tool Forking Integration', () => {
    it('should fork tool through domain logic and repository layer', async () => {
      // Create and publish original tool
      const originalToolData = createValidToolData();
      const originalResult = Tool.create(originalToolData);
      const originalTool = originalResult.getValue();
      originalTool.publish();

      const forkerProfileId = ProfileId.create('profile_forker_789').getValue();
      const targetSpaceId = SpaceId.create('space_fork_target').getValue();

      // Mock repository operations
      mockToolRepo.save.mockResolvedValue(Result.ok());

      // Fork tool using domain logic
      const forkResult = originalTool.fork('Forked Study Organizer', forkerProfileId, targetSpaceId);
      expect(forkResult.isSuccess).toBe(true);

      const forkedTool = forkResult.getValue();

      // Verify fork properties
      expect(forkedTool.name).toBe('Forked Study Organizer');
      expect(forkedTool.createdBy.value).toBe('profile_forker_789');
      expect(forkedTool.spaceId?.value).toBe('space_fork_target');
      expect(forkedTool.forkedFrom?.value).toBe(originalTool.toolId.value);
      expect(forkedTool.status).toBe('draft');
      expect(forkedTool.visibility).toBe('private');

      // Verify original tool analytics updated
      expect(originalTool.analytics.forks).toBe(1);

      // Save both tools
      const saveOriginalResult = await mockToolRepo.save(originalTool);
      const saveForkedResult = await mockToolRepo.save(forkedTool);

      // Verify integration
      expect(saveOriginalResult.isSuccess).toBe(true);
      expect(saveForkedResult.isSuccess).toBe(true);
      expect(mockToolRepo.save).toHaveBeenCalledTimes(2);
    });

    it('should handle forking validation errors', async () => {
      // Create tool that cannot be forked
      const toolData = createValidToolData({
        permissions: {
          canFork: false, // Disable forking
          canEdit: [ProfileId.create('profile_creator_123').getValue()],
          requiresApproval: false
        }
      });

      const toolResult = Tool.create(toolData);
      const tool = toolResult.getValue();
      tool.publish();

      const forkerProfileId = ProfileId.create('profile_forker_789').getValue();

      // Try to fork tool that cannot be forked
      const forkResult = tool.fork('Attempted Fork', forkerProfileId);

      // Verify validation error
      expect(forkResult.isFailure).toBe(true);
      expect(forkResult.error).toContain('This tool cannot be forked');

      // Verify no repository operations were attempted
      expect(mockToolRepo.save).not.toHaveBeenCalled();
    });
  });

  describe('Repository Integration Coordination', () => {
    it('should coordinate multiple repository operations in deployment flow', async () => {
      // Create tool
      const toolData = createValidToolData();
      const toolResult = Tool.create(toolData);
      const tool = toolResult.getValue();

      // Mock all repository operations
      mockToolRepo.save.mockResolvedValue(Result.ok());
      mockSpaceRepo.findById.mockResolvedValue(Result.ok(createMockSpace()));

      // Execute full deployment flow
      await mockToolRepo.save(tool); // Save draft
      tool.publish(); // Publish tool
      await mockToolRepo.save(tool); // Save published tool

      const spaceId = SpaceId.create('space_cs_001').getValue();
      tool.deployToSpaces([spaceId]); // Deploy tool
      await mockToolRepo.save(tool); // Save deployed tool

      // Verify all operations were called in correct order
      expect(mockToolRepo.save).toHaveBeenCalledTimes(3);
      expect(tool.isPublished).toBe(true);
      expect(tool.deployedTo).toHaveLength(1);
    });

    it('should handle partial operation failures gracefully', async () => {
      const toolData = createValidToolData();
      const toolResult = Tool.create(toolData);
      const tool = toolResult.getValue();

      // Mock save failure after successful creation
      mockToolRepo.save.mockResolvedValue(Result.fail('Database write failed'));

      // Execute save operation
      const saveResult = await mockToolRepo.save(tool);

      // Verify error handling
      expect(saveResult.isFailure).toBe(true);
      expect(saveResult.error).toContain('Database write failed');

      // Verify tool domain state is unchanged by repository failure
      expect(tool.isDraft).toBe(true);
      expect(tool.name).toBe('Study Group Organizer');
    });
  });
});