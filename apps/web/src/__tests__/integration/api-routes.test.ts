import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { NextRequest } from 'next/server';

// Mock dependencies
vi.mock('@/lib/firebase-admin');
vi.mock('firebase-admin/auth');
vi.mock('@/lib/auth');

describe('API Routes Integration', () => {
  let mockDbAdmin: any;
  let mockAuth: any;
  let mockGetAuthTokenFromRequest: any;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock Firestore admin
    mockDbAdmin = {
      collection: vi.fn().mockReturnThis(),
      doc: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      orderBy: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      offset: vi.fn().mockReturnThis(),
      get: vi.fn(),
      add: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    // Mock Firebase Auth
    mockAuth = {
      verifyIdToken: vi.fn()
    };

    mockGetAuthTokenFromRequest = vi.fn();

    vi.doMock('@/lib/firebase-admin', () => ({
      dbAdmin: mockDbAdmin
    }));

    vi.doMock('firebase-admin/auth', () => ({
      getAuth: () => mockAuth
    }));

    vi.doMock('@/lib/auth', () => ({
      getAuthTokenFromRequest: mockGetAuthTokenFromRequest
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Spaces Search API', () => {
    it('should search spaces successfully', async () => {
      // Import the route handler
      const { POST } = await import('@/app/api/spaces/search/route');

      // Mock auth
      mockGetAuthTokenFromRequest.mockReturnValue('valid-token');
      mockAuth.verifyIdToken.mockResolvedValue({ uid: 'test-user-id' });

      // Mock Firestore response
      const mockSpaces = [
        {
          id: 'space-1',
          data: () => ({
            name: 'Test Space',
            description: 'A test space for unit testing',
            type: 'academic',
            memberCount: 50,
            isVerified: true,
            creatorId: 'creator-1',
          })
        }
      ];

      mockDbAdmin.get.mockResolvedValue({
        docs: mockSpaces
      });

      // Mock creator lookup
      mockDbAdmin.get.mockResolvedValueOnce({
        docs: mockSpaces
      }).mockResolvedValueOnce({
        exists: true,
        data: () => ({
          fullName: 'Test Creator',
          photoURL: 'https://example.com/avatar.jpg'
        })
      }).mockResolvedValueOnce({
        exists: false // membership check
      });

      const request = new NextRequest('http://localhost:3000/api/spaces/search', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer valid-token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'test',
          limit: 20,
          sortBy: 'relevance'
        })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.spaces).toHaveLength(1);
      expect(data.spaces[0].name).toBe('Test Space');
      expect(data.total).toBe(1);
    });

    it('should handle authentication errors', async () => {
      const { POST } = await import('@/app/api/spaces/search/route');

      mockGetAuthTokenFromRequest.mockReturnValue(null);

      const request = new NextRequest('http://localhost:3000/api/spaces/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'test' })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Authentication required');
    });

    it('should handle validation errors', async () => {
      const { POST } = await import('@/app/api/spaces/search/route');

      mockGetAuthTokenFromRequest.mockReturnValue('valid-token');
      mockAuth.verifyIdToken.mockResolvedValue({ uid: 'test-user-id' });

      const request = new NextRequest('http://localhost:3000/api/spaces/search', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer valid-token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: '', // Invalid empty query
        })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid search parameters');
    });

    it('should handle database errors gracefully', async () => {
      const { POST } = await import('@/app/api/spaces/search/route');

      mockGetAuthTokenFromRequest.mockReturnValue('valid-token');
      mockAuth.verifyIdToken.mockResolvedValue({ uid: 'test-user-id' });
      mockDbAdmin.get.mockRejectedValue(new Error('Database connection failed'));

      const request = new NextRequest('http://localhost:3000/api/spaces/search', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer valid-token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'test'
        })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to search spaces');
    });
  });

  describe('Tools Search API', () => {
    it('should search tools successfully', async () => {
      const { POST } = await import('@/app/api/tools/search/route');

      mockGetAuthTokenFromRequest.mockReturnValue('valid-token');
      mockAuth.verifyIdToken.mockResolvedValue({ uid: 'test-user-id' });

      const mockTools = [
        {
          id: 'tool-1',
          data: () => ({
            name: 'Test Tool',
            description: 'A test tool for unit testing',
            category: 'productivity',
            deploymentCount: 25,
            averageRating: 4.5,
            isVerified: true,
            creatorId: 'creator-1',
          })
        }
      ];

      mockDbAdmin.get.mockResolvedValue({
        docs: mockTools
      });

      const request = new NextRequest('http://localhost:3000/api/tools/search', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer valid-token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'test tool',
          category: 'productivity',
          sortBy: 'deployments'
        })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.tools).toHaveLength(1);
      expect(data.tools[0].name).toBe('Test Tool');
      expect(data.tools[0].deploymentCount).toBe(25);
    });

    it('should filter private tools correctly', async () => {
      const { POST } = await import('@/app/api/tools/search/route');

      mockGetAuthTokenFromRequest.mockReturnValue('valid-token');
      mockAuth.verifyIdToken.mockResolvedValue({ uid: 'test-user-id' });

      const mockTools = [
        {
          id: 'tool-1',
          data: () => ({
            name: 'Public Tool',
            description: 'A public test tool',
            isPrivate: false,
            creatorId: 'other-user',
          })
        },
        {
          id: 'tool-2',
          data: () => ({
            name: 'Private Tool',
            description: 'A private test tool',
            isPrivate: true,
            creatorId: 'other-user',
          })
        },
        {
          id: 'tool-3',
          data: () => ({
            name: 'My Private Tool',
            description: 'My private test tool',
            isPrivate: true,
            creatorId: 'test-user-id',
          })
        }
      ];

      mockDbAdmin.get.mockResolvedValue({
        docs: mockTools
      });

      const request = new NextRequest('http://localhost:3000/api/tools/search', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer valid-token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'tool',
          includePrivate: false
        })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      // Should only return public tool and user's own private tool
      expect(data.tools).toHaveLength(2);
      expect(data.tools.map((t: any) => t.name)).toContain('Public Tool');
      expect(data.tools.map((t: any) => t.name)).toContain('My Private Tool');
      expect(data.tools.map((t: any) => t.name)).not.toContain('Private Tool');
    });
  });

  describe('Feed Search API', () => {
    it('should search feed items successfully', async () => {
      const { POST } = await import('@/app/api/feed/search/route');

      mockGetAuthTokenFromRequest.mockReturnValue('valid-token');
      mockAuth.verifyIdToken.mockResolvedValue({ uid: 'test-user-id' });

      const mockPosts = [
        {
          id: 'post-1',
          data: () => ({
            title: 'Test Post',
            content: 'This is a test post for unit testing',
            authorId: 'author-1',
            spaceId: 'space-1',
            likeCount: 10,
            commentCount: 5,
            createdAt: { toDate: () => new Date() }
          })
        }
      ];

      // Mock user spaces
      mockDbAdmin.get.mockResolvedValueOnce({
        docs: [
          { ref: { parent: { parent: { id: 'space-1' } } } }
        ]
      });

      // Mock posts query
      mockDbAdmin.get.mockResolvedValueOnce({
        docs: mockPosts
      });

      const request = new NextRequest('http://localhost:3000/api/feed/search', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer valid-token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'test',
          type: 'post',
          sortBy: 'relevance'
        })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.items).toHaveLength(1);
      expect(data.items[0].type).toBe('post');
      expect(data.items[0].title).toBe('Test Post');
    });

    it('should handle time range filtering', async () => {
      const { POST } = await import('@/app/api/feed/search/route');

      mockGetAuthTokenFromRequest.mockReturnValue('valid-token');
      mockAuth.verifyIdToken.mockResolvedValue({ uid: 'test-user-id' });

      // Mock user spaces
      mockDbAdmin.get.mockResolvedValue({
        docs: []
      });

      const request = new NextRequest('http://localhost:3000/api/feed/search', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer valid-token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'test',
          timeRange: 'week'
        })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.items).toHaveLength(0);
      
      // Verify that Firestore query was called with time filter
      expect(mockDbAdmin.where).toHaveBeenCalledWith(
        'createdAt', 
        '>=', 
        expect.any(Date)
      );
    });
  });

  describe('Users Search API', () => {
    it('should search users successfully', async () => {
      const { POST } = await import('@/app/api/users/search/route');

      mockGetAuthTokenFromRequest.mockReturnValue('valid-token');
      mockAuth.verifyIdToken.mockResolvedValue({ uid: 'test-user-id' });

      const mockUsers = [
        {
          id: 'user-1',
          fullName: 'John Test',
          handle: 'johntest',
          userType: 'student',
          academic: { major: 'Computer Science' },
          privacy: { profileVisibility: 'public' }
        }
      ];

      mockDbAdmin.get.mockResolvedValue({
        docs: mockUsers.map(user => ({
          id: user.id,
          data: () => user
        }))
      });

      const request = new NextRequest('http://localhost:3000/api/users/search', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer valid-token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'john',
          userType: 'student',
          sortBy: 'relevance'
        })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.users).toHaveLength(1);
      expect(data.users[0].fullName).toBe('John Test');
      expect(data.users[0].handle).toBe('johntest');
    });

    it('should respect privacy settings', async () => {
      const { POST } = await import('@/app/api/users/search/route');

      mockGetAuthTokenFromRequest.mockReturnValue('valid-token');
      mockAuth.verifyIdToken.mockResolvedValue({ uid: 'test-user-id' });

      const mockUsers = [
        {
          id: 'user-1',
          fullName: 'Public User',
          privacy: { profileVisibility: 'public' }
        },
        {
          id: 'user-2',
          fullName: 'Private User',
          privacy: { profileVisibility: 'private' }
        }
      ];

      mockDbAdmin.get.mockResolvedValue({
        docs: mockUsers.map(user => ({
          id: user.id,
          data: () => user
        }))
      });

      const request = new NextRequest('http://localhost:3000/api/users/search', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer valid-token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'user',
          includePrivateProfiles: false
        })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.users).toHaveLength(1);
      expect(data.users[0].fullName).toBe('Public User');
    });

    it('should filter by space membership', async () => {
      const { POST } = await import('@/app/api/users/search/route');

      mockGetAuthTokenFromRequest.mockReturnValue('valid-token');
      mockAuth.verifyIdToken.mockResolvedValue({ uid: 'test-user-id' });

      // Mock space members
      const mockMembers = [
        { data: () => ({ userId: 'user-1' }) },
        { data: () => ({ userId: 'user-2' }) }
      ];

      mockDbAdmin.get.mockResolvedValueOnce({
        docs: mockMembers
      });

      // Mock user documents
      const mockUsers = [
        {
          id: 'user-1',
          fullName: 'Space Member 1'
        },
        {
          id: 'user-2',
          fullName: 'Space Member 2'
        }
      ];

      // Mock batch queries for user documents
      mockDbAdmin.get.mockResolvedValue({
        docs: mockUsers.map(user => ({
          id: user.id,
          data: () => user
        }))
      });

      const request = new NextRequest('http://localhost:3000/api/users/search', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer valid-token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'member',
          spaceId: 'space-1'
        })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.users).toHaveLength(2);
    });
  });

  describe('Space Tools API', () => {
    it('should get space tools successfully', async () => {
      const { GET } = await import('@/app/api/spaces/[spaceId]/tools/route');

      mockGetAuthTokenFromRequest.mockReturnValue('valid-token');
      mockAuth.verifyIdToken.mockResolvedValue({ uid: 'test-user-id' });

      // Mock member check
      mockDbAdmin.get.mockResolvedValueOnce({
        exists: true
      });

      // Mock deployments
      const mockDeployments = [
        {
          id: 'deployment-1',
          data: () => ({
            toolId: 'tool-1',
            status: 'active',
            userId: 'test-user-id',
            deployedAt: { toDate: () => new Date() }
          })
        }
      ];

      mockDbAdmin.get.mockResolvedValueOnce({
        docs: mockDeployments
      });

      // Mock tool details
      mockDbAdmin.get.mockResolvedValueOnce({
        exists: true,
        data: () => ({
          name: 'Test Tool',
          description: 'A test tool',
          category: 'productivity',
          averageRating: 4.5
        })
      });

      const request = new NextRequest('http://localhost:3000/api/spaces/space-1/tools');
      const response = await GET(request, { params: Promise.resolve({ spaceId: 'space-1' }) });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.tools).toHaveLength(1);
      expect(data.tools[0].name).toBe('Test Tool');
    });

    it('should deploy tool to space successfully', async () => {
      const { POST } = await import('@/app/api/spaces/[spaceId]/tools/route');

      mockGetAuthTokenFromRequest.mockReturnValue('valid-token');
      mockAuth.verifyIdToken.mockResolvedValue({ uid: 'test-user-id' });

      // Mock member check
      mockDbAdmin.get.mockResolvedValueOnce({
        exists: true
      });

      // Mock tool exists check
      mockDbAdmin.get.mockResolvedValueOnce({
        exists: true,
        data: () => ({
          name: 'Test Tool',
          version: '1.0.0',
          deploymentCount: 10
        })
      });

      // Mock existing deployment check (none found)
      mockDbAdmin.get.mockResolvedValueOnce({
        empty: true
      });

      // Mock deployment creation
      mockDbAdmin.add.mockResolvedValue({
        id: 'new-deployment-id'
      });

      const request = new NextRequest('http://localhost:3000/api/spaces/space-1/tools', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer valid-token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolId: 'tool-1',
          configuration: { setting1: 'value1' },
          isShared: true
        })
      });

      const response = await POST(request, { params: Promise.resolve({ spaceId: 'space-1' }) });
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.deployment.deploymentId).toBe('new-deployment-id');
      expect(data.deployment.toolId).toBe('tool-1');
    });

    it('should prevent duplicate tool deployments', async () => {
      const { POST } = await import('@/app/api/spaces/[spaceId]/tools/route');

      mockGetAuthTokenFromRequest.mockReturnValue('valid-token');
      mockAuth.verifyIdToken.mockResolvedValue({ uid: 'test-user-id' });

      // Mock member check
      mockDbAdmin.get.mockResolvedValueOnce({
        exists: true
      });

      // Mock tool exists check
      mockDbAdmin.get.mockResolvedValueOnce({
        exists: true,
        data: () => ({ name: 'Test Tool' })
      });

      // Mock existing deployment found
      mockDbAdmin.get.mockResolvedValueOnce({
        empty: false,
        docs: [{ id: 'existing-deployment' }]
      });

      const request = new NextRequest('http://localhost:3000/api/spaces/space-1/tools', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer valid-token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolId: 'tool-1'
        })
      });

      const response = await POST(request, { params: Promise.resolve({ spaceId: 'space-1' }) });
      const data = await response.json();

      expect(response.status).toBe(409);
      expect(data.error).toBe('Tool is already deployed in this space');
    });
  });

  describe('Cross-API Integration', () => {
    it('should handle concurrent API requests', async () => {
      const { POST: searchSpaces } = await import('@/app/api/spaces/search/route');
      const { POST: searchTools } = await import('@/app/api/tools/search/route');

      mockGetAuthTokenFromRequest.mockReturnValue('valid-token');
      mockAuth.verifyIdToken.mockResolvedValue({ uid: 'test-user-id' });
      mockDbAdmin.get.mockResolvedValue({ docs: [] });

      const spaceRequest = new NextRequest('http://localhost:3000/api/spaces/search', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer valid-token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: 'test' })
      });

      const toolRequest = new NextRequest('http://localhost:3000/api/tools/search', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer valid-token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: 'test' })
      });

      const [spaceResponse, toolResponse] = await Promise.all([
        searchSpaces(spaceRequest),
        searchTools(toolRequest)
      ]);

      expect(spaceResponse.status).toBe(200);
      expect(toolResponse.status).toBe(200);

      const spaceData = await spaceResponse.json();
      const toolData = await toolResponse.json();

      expect(spaceData.spaces).toBeDefined();
      expect(toolData.tools).toBeDefined();
    });

    it('should maintain consistent error handling across APIs', async () => {
      const apis = [
        () => import('@/app/api/spaces/search/route').then(m => m.POST),
        () => import('@/app/api/tools/search/route').then(m => m.POST),
        () => import('@/app/api/feed/search/route').then(m => m.POST),
        () => import('@/app/api/users/search/route').then(m => m.POST),
      ];

      for (const getApi of apis) {
        const apiHandler = await getApi();
        
        // Test without auth token
        const request = new NextRequest('http://localhost:3000/api/test', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: 'test' })
        });

        mockGetAuthTokenFromRequest.mockReturnValue(null);

        const response = await apiHandler(request);
        const data = await response.json();

        expect(response.status).toBe(401);
        expect(data.error).toBe('Authentication required');
      }
    });
  });
});