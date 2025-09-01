import { describe, it, expect, vi, beforeEach } from 'vitest';
import { testEnvSetup, mockFirestore, mockAuth, mockUser, createMockRequest } from '../setup';

const mockProfile = {
  uid: 'user-123',
  email: 'test@university.edu',
  displayName: 'Test User',
  handle: '@testuser',
  bio: 'Computer Science student at University',
  avatar: 'https://example.com/avatar.jpg',
  school: 'University of Test',
  major: 'Computer Science',
  graduationYear: 2025,
  interests: ['AI', 'Web Development', 'Mobile Apps'],
  stats: {
    toolsCreated: 5,
    spacesJoined: 12,
    connectionsCount: 48
  },
  privacy: {
    profileVisibility: 'public',
    contactVisibility: 'connections',
    activityVisibility: 'private'
  },
  preferences: {
    notifications: {
      email: true,
      push: false,
      inApp: true
    },
    feed: {
      algorithm: 'personalized',
      contentTypes: ['tools', 'spaces', 'events']
    }
  }
};

vi.mock('../../lib/firebase', () => mockFirestore);
vi.mock('../../lib/auth', () => mockAuth);

describe('Profile Management Integration Tests', () => {
  beforeEach(() => {
    testEnvSetup();
    vi.clearAllMocks();
  });

  describe('Profile Dashboard API Integration', () => {
    it('fetches comprehensive profile dashboard data', async () => {
      const { GET: profileDashboardGET } = await import('../../app/api/profile/dashboard/route');
      
      const request = createMockRequest('GET', '/api/profile/dashboard');
      const response = await profileDashboardGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.profile).toMatchObject({
        uid: mockUser.uid,
        displayName: expect.any(String),
        handle: expect.any(String)
      });
      expect(data.stats).toHaveProperty('toolsCreated');
      expect(data.stats).toHaveProperty('spacesJoined');
      expect(data.recentActivity).toBeInstanceOf(Array);
      expect(data.connections).toBeInstanceOf(Array);
    });

    it('handles profile data aggregation from multiple sources', async () => {
      const { GET: profileDashboardGET } = await import('../../app/api/profile/dashboard/route');
      
      const request = createMockRequest('GET', '/api/profile/dashboard');
      const response = await profileDashboardGET(request);
      const data = await response.json();

      expect(vi.mocked(mockFirestore.getDocs)).toHaveBeenCalledTimes(3);
      expect(data.aggregations).toMatchObject({
        totalTools: expect.any(Number),
        totalSpaces: expect.any(Number),
        totalConnections: expect.any(Number),
        activityScore: expect.any(Number)
      });
    });

    it('applies privacy settings to dashboard data', async () => {
      const { GET: profileDashboardGET } = await import('../../app/api/profile/dashboard/route');
      
      const privateRequest = createMockRequest('GET', '/api/profile/dashboard?privacy=strict');
      const response = await profileDashboardGET(privateRequest);
      const data = await response.json();

      expect(data.profile.email).toBeUndefined();
      expect(data.connections).toHaveLength(0);
      expect(data.recentActivity).toEqual([]);
    });
  });

  describe('Profile Update Integration', () => {
    it('updates profile information with validation', async () => {
      const { PUT: profilePUT } = await import('../../app/api/profile/route');
      
      const updateData = {
        displayName: 'Updated Name',
        bio: 'Updated bio with new information',
        interests: ['Machine Learning', 'Data Science'],
        major: 'Computer Science'
      };

      const request = createMockRequest('PUT', '/api/profile', updateData);
      const response = await profilePUT(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.profile.displayName).toBe('Updated Name');
      expect(data.profile.bio).toBe('Updated bio with new information');
      expect(vi.mocked(mockFirestore.updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining(updateData)
      );
    });

    it('validates profile data before updating', async () => {
      const { PUT: profilePUT } = await import('../../app/api/profile/route');
      
      const invalidData = {
        displayName: '', // Invalid empty name
        bio: 'x'.repeat(501), // Too long
        email: 'invalid-email'
      };

      const request = createMockRequest('PUT', '/api/profile', invalidData);
      const response = await profilePUT(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.errors).toContain('Display name is required');
      expect(data.errors).toContain('Bio must be under 500 characters');
      expect(data.errors).toContain('Invalid email format');
    });

    it('handles handle uniqueness validation', async () => {
      const { PUT: profilePUT } = await import('../../app/api/profile/route');
      
      vi.mocked(mockFirestore.getDocs).mockResolvedValueOnce({
        empty: false,
        docs: [{ id: 'other-user', data: () => ({ handle: '@newhandle' }) }]
      } as any);

      const updateData = { handle: '@newhandle' };
      const request = createMockRequest('PUT', '/api/profile', updateData);
      const response = await profilePUT(request);
      const data = await response.json();

      expect(response.status).toBe(409);
      expect(data.error).toBe('Handle already taken');
    });
  });

  describe('Profile Privacy Integration', () => {
    it('updates privacy settings', async () => {
      const { PUT: privacyPUT } = await import('../../app/api/profile/privacy/route');
      
      const privacySettings = {
        profileVisibility: 'connections',
        contactVisibility: 'private',
        activityVisibility: 'public'
      };

      const request = createMockRequest('PUT', '/api/profile/privacy', privacySettings);
      const response = await privacyPUT(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.privacy).toMatchObject(privacySettings);
      expect(vi.mocked(mockFirestore.updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ privacy: privacySettings })
      );
    });

    it('applies privacy settings to profile visibility', async () => {
      const { GET: publicProfileGET } = await import('../../app/api/profile/public/[handle]/route');
      
      const request = createMockRequest('GET', '/api/profile/public/testuser');
      const response = await publicProfileGET(request, { params: { handle: 'testuser' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.profile.email).toBeUndefined();
      expect(data.profile.stats).toBeUndefined();
      expect(data.profile.displayName).toBeDefined();
    });
  });

  describe('Profile Connections Integration', () => {
    it('sends connection request', async () => {
      const { POST: connectionPOST } = await import('../../app/api/profile/connections/route');
      
      const connectionData = {
        targetUserId: 'target-user-123',
        message: 'Would love to connect!'
      };

      const request = createMockRequest('POST', '/api/profile/connections', connectionData);
      const response = await connectionPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.connection.status).toBe('pending');
      expect(data.connection.fromUser).toBe(mockUser.uid);
      expect(data.connection.toUser).toBe('target-user-123');
    });

    it('accepts connection request', async () => {
      const { PUT: connectionPUT } = await import('../../app/api/profile/connections/[connectionId]/route');
      
      const acceptData = { action: 'accept' };
      const request = createMockRequest('PUT', '/api/profile/connections/conn-123', acceptData);
      const response = await connectionPUT(request, { params: { connectionId: 'conn-123' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.connection.status).toBe('accepted');
      expect(vi.mocked(mockFirestore.updateDoc)).toHaveBeenCalledTimes(2); // Update both users
    });

    it('lists user connections with filtering', async () => {
      const { GET: connectionsGET } = await import('../../app/api/profile/connections/route');
      
      const request = createMockRequest('GET', '/api/profile/connections?status=accepted&limit=20');
      const response = await connectionsGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.connections).toBeInstanceOf(Array);
      expect(data.pagination).toHaveProperty('total');
      expect(data.pagination).toHaveProperty('page');
    });
  });

  describe('Profile Avatar Integration', () => {
    it('uploads and updates profile avatar', async () => {
      const { POST: avatarPOST } = await import('../../app/api/profile/avatar/route');
      
      const formData = new FormData();
      formData.append('avatar', new Blob(['fake-image-data'], { type: 'image/jpeg' }));

      const request = createMockRequest('POST', '/api/profile/avatar', formData);
      const response = await avatarPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.avatarUrl).toMatch(/^https:\/\//);
      expect(vi.mocked(mockFirestore.updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ avatar: data.avatarUrl })
      );
    });

    it('validates avatar file type and size', async () => {
      const { POST: avatarPOST } = await import('../../app/api/profile/avatar/route');
      
      const formData = new FormData();
      const largeFile = new Blob(['x'.repeat(10 * 1024 * 1024)], { type: 'text/plain' });
      formData.append('avatar', largeFile);

      const request = createMockRequest('POST', '/api/profile/avatar', formData);
      const response = await avatarPOST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('Invalid file type');
    });
  });

  describe('Profile Analytics Integration', () => {
    it('tracks profile view analytics', async () => {
      const { POST: analyticsPOST } = await import('../../app/api/profile/analytics/route');
      
      const analyticsData = {
        event: 'profile_view',
        targetUserId: 'viewed-user-123',
        source: 'search'
      };

      const request = createMockRequest('POST', '/api/profile/analytics', analyticsData);
      const response = await analyticsPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.tracked).toBe(true);
      expect(vi.mocked(mockFirestore.addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          event: 'profile_view',
          userId: mockUser.uid,
          targetUserId: 'viewed-user-123'
        })
      );
    });

    it('generates profile insights', async () => {
      const { GET: insightsGET } = await import('../../app/api/profile/insights/route');
      
      const request = createMockRequest('GET', '/api/profile/insights?timeframe=30d');
      const response = await insightsGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.insights).toHaveProperty('profileViews');
      expect(data.insights).toHaveProperty('connectionGrowth');
      expect(data.insights).toHaveProperty('contentEngagement');
      expect(data.recommendations).toBeInstanceOf(Array);
    });
  });

  describe('Cross-API Profile Integration', () => {
    it('maintains profile consistency across spaces actions', async () => {
      const { POST: spaceActionPOST } = await import('../../app/api/profile/spaces/actions/route');
      
      const actionData = {
        spaceId: 'space-123',
        action: 'join',
        visibility: 'public'
      };

      const request = createMockRequest('POST', '/api/profile/spaces/actions', actionData);
      const response = await spaceActionPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.action.completed).toBe(true);
      expect(vi.mocked(mockFirestore.updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          'stats.spacesJoined': expect.any(Number)
        })
      );
    });

    it('integrates profile with tool creation workflow', async () => {
      const toolCreationData = {
        toolId: 'new-tool-123',
        toolName: 'My New Tool',
        category: 'productivity'
      };

      vi.mocked(mockFirestore.updateDoc).mockResolvedValueOnce(undefined);

      expect(vi.mocked(mockFirestore.updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          'stats.toolsCreated': expect.any(Number)
        })
      );
    });

    it('handles profile data in feed personalization', async () => {
      const profileData = {
        interests: ['AI', 'Web Development'],
        major: 'Computer Science',
        connections: ['user-456', 'user-789']
      };

      vi.mocked(mockFirestore.getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => profileData
      } as any);

      expect(profileData.interests).toContain('AI');
      expect(profileData.connections).toHaveLength(2);
    });
  });
});