import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

// Import the actual API route handlers
import { GET as spacesGET, POST as spacesPOST } from '../../app/api/spaces/route';
import { GET as spaceGET, PUT as spacePUT, DELETE as spaceDELETE } from '../../app/api/spaces/[spaceId]/route';
import { GET as membersGET, POST as membersPOST } from '../../app/api/spaces/[spaceId]/members/route';
import { GET as postsGET, POST as postsPOST } from '../../app/api/spaces/[spaceId]/posts/route';
import { POST as joinPOST } from '../../app/api/spaces/join/route';
import { POST as leavePOST } from '../../app/api/spaces/leave/route';
import { POST as activatePOST } from '../../app/api/spaces/activate/route';

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

describe('Spaces Lifecycle Integration Tests', () => {
  const mockUser = {
    uid: 'user-123',
    email: 'student@university.edu',
    displayName: 'Test Student'
  };

  const mockSpace = {
    id: 'space-123',
    name: 'Computer Science Study Group',
    description: 'A space for CS students to collaborate and study together',
    type: 'academic',
    category: 'study_group',
    privacy: 'public',
    createdBy: 'user-123',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    memberCount: 1,
    isActive: true,
    settings: {
      allowInvites: true,
      moderationLevel: 'medium',
      joinApproval: false,
      allowPosts: true,
      allowTools: true
    },
    metadata: {
      school: 'University of Technology',
      tags: ['computer-science', 'study', 'collaboration'],
      featured: false
    }
  };

  const mockMember = {
    userId: 'user-123',
    spaceId: 'space-123',
    role: 'owner',
    status: 'active',
    joinedAt: '2024-01-15T10:00:00Z',
    permissions: ['read', 'write', 'moderate', 'admin']
  };

  const mockPost = {
    id: 'post-123',
    spaceId: 'space-123',
    authorId: 'user-123',
    authorName: 'Test Student',
    title: 'Welcome to the Study Group!',
    content: 'This is our space for CS collaboration',
    type: 'announcement',
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T11:00:00Z',
    isActive: true,
    engagement: {
      likes: 0,
      comments: 0,
      shares: 0
    }
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
      id: 'space-123',
      data: () => mockSpace
    } as any);
    
    vi.mocked(setDoc).mockResolvedValue(undefined);
    vi.mocked(updateDoc).mockResolvedValue(undefined);
    vi.mocked(deleteDoc).mockResolvedValue(undefined);
    vi.mocked(addDoc).mockResolvedValue({ id: 'new-doc-123' } as any);
    
    vi.mocked(getDocs).mockResolvedValue({
      docs: [
        { id: 'space-123', data: () => mockSpace },
        { id: 'member-123', data: () => mockMember }
      ],
      size: 2,
      empty: false
    } as any);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Complete Space Lifecycle', () => {
    it('completes full space lifecycle: create → join → post → manage → delete', async () => {
      // Step 1: Create a new space
      const createRequest = new NextRequest('http://localhost/api/spaces', {
        method: 'POST',
        body: JSON.stringify({
          name: 'New Study Group',
          description: 'A fresh space for collaboration',
          type: 'academic',
          category: 'study_group',
          privacy: 'public',
          settings: {
            allowInvites: true,
            joinApproval: false
          },
          metadata: {
            school: 'University of Technology',
            tags: ['study', 'collaboration']
          }
        })
      });

      const createResponse = await spacesPOST(createRequest);
      const createData = await createResponse.json();

      expect(createResponse.status).toBe(201);
      expect(createData.success).toBe(true);
      expect(createData.space.name).toBe('New Study Group');
      expect(createData.space.createdBy).toBe(mockUser.uid);

      // Verify space was saved to Firestore
      expect(vi.mocked(setDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          name: 'New Study Group',
          createdBy: mockUser.uid,
          isActive: true
        })
      );

      // Verify creator was added as owner member
      expect(vi.mocked(addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          userId: mockUser.uid,
          role: 'owner',
          status: 'active'
        })
      );

      // Step 2: Another user joins the space
      const joinRequest = new NextRequest('http://localhost/api/spaces/join', {
        method: 'POST',
        body: JSON.stringify({
          spaceId: 'space-123'
        })
      });

      // Mock as different user
      vi.mocked(getCurrentUser).mockResolvedValueOnce({
        uid: 'user-456',
        email: 'student2@university.edu',
        displayName: 'Another Student'
      });

      const joinResponse = await joinPOST(joinRequest);
      const joinData = await joinResponse.json();

      expect(joinResponse.status).toBe(200);
      expect(joinData.success).toBe(true);
      expect(joinData.membership.role).toBe('member');

      // Step 3: Get space members
      const membersRequest = new NextRequest('http://localhost/api/spaces/space-123/members');

      const membersResponse = await membersGET(membersRequest, { params: { spaceId: 'space-123' } });
      const membersData = await membersResponse.json();

      expect(membersResponse.status).toBe(200);
      expect(membersData.success).toBe(true);
      expect(membersData.members).toHaveLength(2);

      // Step 4: Create a post in the space
      const postRequest = new NextRequest('http://localhost/api/spaces/space-123/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: 'Study Session Tomorrow',
          content: 'Anyone want to join for algorithms review?',
          type: 'discussion'
        })
      });

      const postResponse = await postsPOST(postRequest, { params: { spaceId: 'space-123' } });
      const postData = await postResponse.json();

      expect(postResponse.status).toBe(201);
      expect(postData.success).toBe(true);
      expect(postData.post.title).toBe('Study Session Tomorrow');
      expect(postData.post.authorId).toBe(mockUser.uid);

      // Step 5: Update space settings
      const updateRequest = new NextRequest('http://localhost/api/spaces/space-123', {
        method: 'PUT',
        body: JSON.stringify({
          description: 'Updated description with more details',
          settings: {
            moderationLevel: 'high',
            joinApproval: true
          }
        })
      });

      const updateResponse = await spacePUT(updateRequest, { params: { spaceId: 'space-123' } });
      const updateData = await updateResponse.json();

      expect(updateResponse.status).toBe(200);
      expect(updateData.success).toBe(true);

      // Step 6: Leave the space
      const leaveRequest = new NextRequest('http://localhost/api/spaces/leave', {
        method: 'POST',
        body: JSON.stringify({
          spaceId: 'space-123'
        })
      });

      // Mock as the other user leaving
      vi.mocked(getCurrentUser).mockResolvedValueOnce({
        uid: 'user-456',
        email: 'student2@university.edu',
        displayName: 'Another Student'
      });

      const leaveResponse = await leavePOST(leaveRequest);
      const leaveData = await leaveResponse.json();

      expect(leaveResponse.status).toBe(200);
      expect(leaveData.success).toBe(true);

      // Step 7: Delete the space (owner only)
      const deleteRequest = new NextRequest('http://localhost/api/spaces/space-123?confirm=true', {
        method: 'DELETE'
      });

      const deleteResponse = await spaceDELETE(deleteRequest, { params: { spaceId: 'space-123' } });
      const deleteData = await deleteResponse.json();

      expect(deleteResponse.status).toBe(200);
      expect(deleteData.success).toBe(true);
      expect(deleteData.message).toBe('Space deleted successfully');
    });

    it('handles space activation workflow for new spaces', async () => {
      // Create a space that requires activation
      const newSpace = {
        ...mockSpace,
        id: 'new-space-456',
        isActive: false,
        activationRequired: true
      };

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => newSpace
      } as any);

      // Step 1: Attempt to activate space
      const activateRequest = new NextRequest('http://localhost/api/spaces/activate', {
        method: 'POST',
        body: JSON.stringify({
          spaceId: 'new-space-456',
          activationCriteria: {
            memberCount: 5,
            hasDescription: true,
            hasInitialContent: true
          }
        })
      });

      const activateResponse = await activatePOST(activateRequest);
      const activateData = await activateResponse.json();

      expect(activateResponse.status).toBe(200);
      expect(activateData.success).toBe(true);
      expect(activateData.space.isActive).toBe(true);

      // Verify activation was recorded
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          isActive: true,
          activatedAt: expect.any(String),
          activationCriteria: expect.any(Object)
        })
      );
    });

    it('enforces space privacy and access controls', async () => {
      // Create a private space
      const privateSpace = {
        ...mockSpace,
        privacy: 'private',
        settings: {
          ...mockSpace.settings,
          joinApproval: true
        }
      };

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => privateSpace
      } as any);

      // Step 1: Non-member tries to view private space
      vi.mocked(getCurrentUser).mockResolvedValueOnce({
        uid: 'user-789',
        email: 'outsider@university.edu',
        displayName: 'Outsider User'
      });

      // Mock no membership found
      vi.mocked(getDocs).mockResolvedValueOnce({
        empty: true,
        docs: []
      } as any);

      const viewRequest = new NextRequest('http://localhost/api/spaces/space-123');

      const viewResponse = await spaceGET(viewRequest, { params: { spaceId: 'space-123' } });
      const viewData = await viewResponse.json();

      expect(viewResponse.status).toBe(403);
      expect(viewData.error).toBe('Access denied to private space');

      // Step 2: Request to join private space (requires approval)
      const joinRequest = new NextRequest('http://localhost/api/spaces/join', {
        method: 'POST',
        body: JSON.stringify({
          spaceId: 'space-123',
          message: 'I would like to join this study group'
        })
      });

      const joinResponse = await joinPOST(joinRequest);
      const joinData = await joinResponse.json();

      expect(joinResponse.status).toBe(200);
      expect(joinData.success).toBe(true);
      expect(joinData.status).toBe('pending_approval');
    });

    it('handles concurrent space operations', async () => {
      // Simulate multiple users trying to join simultaneously
      const joinRequests = Array(5).fill(null).map((_, i) => {
        vi.mocked(getCurrentUser).mockResolvedValueOnce({
          uid: `user-${i}`,
          email: `student${i}@university.edu`,
          displayName: `Student ${i}`
        });

        return joinPOST(new NextRequest('http://localhost/api/spaces/join', {
          method: 'POST',
          body: JSON.stringify({ spaceId: 'space-123' })
        }));
      });

      const responses = await Promise.all(joinRequests);

      // All should succeed
      responses.forEach(response => {
        expect(response.status).toBe(200);
      });

      // Member count should be updated correctly
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          memberCount: expect.any(Number)
        })
      );
    });

    it('manages space content lifecycle', async () => {
      // Step 1: Create multiple posts
      const postTitles = ['Introduction', 'Study Materials', 'Q&A Session'];
      
      for (const title of postTitles) {
        const postRequest = new NextRequest('http://localhost/api/spaces/space-123/posts', {
          method: 'POST',
          body: JSON.stringify({
            title,
            content: `Content for ${title}`,
            type: 'discussion'
          })
        });

        const response = await postsPOST(postRequest, { params: { spaceId: 'space-123' } });
        expect(response.status).toBe(201);
      }

      // Step 2: Get all posts
      const getPostsRequest = new NextRequest('http://localhost/api/spaces/space-123/posts');

      vi.mocked(getDocs).mockResolvedValueOnce({
        docs: postTitles.map((title, i) => ({
          id: `post-${i}`,
          data: () => ({
            ...mockPost,
            id: `post-${i}`,
            title,
            content: `Content for ${title}`
          })
        })),
        size: postTitles.length
      } as any);

      const getPostsResponse = await postsGET(getPostsRequest, { params: { spaceId: 'space-123' } });
      const getPostsData = await getPostsResponse.json();

      expect(getPostsResponse.status).toBe(200);
      expect(getPostsData.posts).toHaveLength(3);
      expect(getPostsData.posts.map((p: any) => p.title)).toEqual(postTitles);
    });

    it('validates space membership permissions', async () => {
      // Test different permission levels
      const memberRoles = [
        { role: 'member', canModerate: false, canAdmin: false },
        { role: 'moderator', canModerate: true, canAdmin: false },
        { role: 'owner', canModerate: true, canAdmin: true }
      ];

      for (const { role, canModerate, canAdmin } of memberRoles) {
        // Mock membership with specific role
        vi.mocked(getDocs).mockResolvedValueOnce({
          docs: [{
            data: () => ({ ...mockMember, role })
          }],
          empty: false
        } as any);

        // Test moderation action
        const moderateRequest = new NextRequest('http://localhost/api/spaces/space-123', {
          method: 'PUT',
          body: JSON.stringify({
            moderationAction: 'pin_post',
            postId: 'post-123'
          })
        });

        const moderateResponse = await spacePUT(moderateRequest, { params: { spaceId: 'space-123' } });

        if (canModerate) {
          expect(moderateResponse.status).toBe(200);
        } else {
          expect(moderateResponse.status).toBe(403);
        }

        // Test admin action
        const adminRequest = new NextRequest('http://localhost/api/spaces/space-123', {
          method: 'PUT',
          body: JSON.stringify({
            settings: { moderationLevel: 'high' }
          })
        });

        const adminResponse = await spacePUT(adminRequest, { params: { spaceId: 'space-123' } });

        if (canAdmin) {
          expect(adminResponse.status).toBe(200);
        } else {
          expect(adminResponse.status).toBe(403);
        }
      }
    });
  });

  describe('Space Discovery and Browsing', () => {
    it('provides comprehensive space discovery', async () => {
      const mockSpaces = [
        { ...mockSpace, id: 'space-1', name: 'CS Study Group', type: 'academic' },
        { ...mockSpace, id: 'space-2', name: 'Math Tutoring', type: 'academic' },
        { ...mockSpace, id: 'space-3', name: 'Board Games Club', type: 'social' }
      ];

      vi.mocked(getDocs).mockResolvedValue({
        docs: mockSpaces.map(space => ({
          id: space.id,
          data: () => space
        })),
        size: mockSpaces.length
      } as any);

      // Step 1: Browse all spaces
      const browseRequest = new NextRequest('http://localhost/api/spaces');

      const browseResponse = await spacesGET(browseRequest);
      const browseData = await browseResponse.json();

      expect(browseResponse.status).toBe(200);
      expect(browseData.spaces).toHaveLength(3);

      // Step 2: Filter by type
      const academicRequest = new NextRequest('http://localhost/api/spaces?type=academic');

      vi.mocked(getDocs).mockResolvedValueOnce({
        docs: mockSpaces.filter(s => s.type === 'academic').map(space => ({
          id: space.id,
          data: () => space
        })),
        size: 2
      } as any);

      const academicResponse = await spacesGET(academicRequest);
      const academicData = await academicResponse.json();

      expect(academicResponse.status).toBe(200);
      expect(academicData.spaces).toHaveLength(2);
      expect(academicData.spaces.every((s: any) => s.type === 'academic')).toBe(true);

      // Step 3: Search by name
      const searchRequest = new NextRequest('http://localhost/api/spaces?search=study');

      const searchResponse = await spacesGET(searchRequest);
      const searchData = await searchResponse.json();

      expect(searchResponse.status).toBe(200);
      expect(searchData.spaces.some((s: any) => s.name.toLowerCase().includes('study'))).toBe(true);
    });

    it('handles pagination for large space lists', async () => {
      const limit = 10;
      const request = new NextRequest(`http://localhost/api/spaces?limit=${limit}&sortBy=memberCount&sortOrder=desc`);

      const response = await spacesGET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(vi.mocked(fbLimit)).toHaveBeenCalledWith(limit);
      expect(vi.mocked(orderBy)).toHaveBeenCalledWith('memberCount', 'desc');
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('handles space creation with duplicate names gracefully', async () => {
      const request = new NextRequest('http://localhost/api/spaces', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Computer Science Study Group', // Same as existing space
          description: 'Another CS group',
          type: 'academic',
          category: 'study_group'
        })
      });

      const response = await spacesPOST(request);
      const responseData = await response.json();

      // Should succeed - duplicate names are allowed with unique IDs
      expect(response.status).toBe(201);
      expect(responseData.success).toBe(true);
    });

    it('validates space data before creation', async () => {
      const invalidSpaceData = [
        { name: '', description: 'No name' }, // Empty name
        { name: 'Valid Name' }, // Missing description
        { name: 'Valid Name', description: 'Valid desc', type: 'invalid' }, // Invalid type
        { name: 'A', description: 'Too short name' }, // Name too short
        { name: 'x'.repeat(101), description: 'Name too long' } // Name too long
      ];

      for (const data of invalidSpaceData) {
        const request = new NextRequest('http://localhost/api/spaces', {
          method: 'POST',
          body: JSON.stringify(data)
        });

        const response = await spacesPOST(request);
        expect(response.status).toBe(400);
      }
    });

    it('handles database failures during space operations', async () => {
      vi.mocked(setDoc).mockRejectedValue(new Error('Database write failed'));

      const request = new NextRequest('http://localhost/api/spaces', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Test Space',
          description: 'Test description',
          type: 'academic',
          category: 'study_group'
        })
      });

      const response = await spacesPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to create space');
      expect(consoleSpy.error).toHaveBeenCalled();
    });

    it('prevents unauthorized space deletion', async () => {
      // Mock as non-owner user
      vi.mocked(getCurrentUser).mockResolvedValue({
        uid: 'user-456',
        email: 'student2@university.edu',
        displayName: 'Non Owner'
      });

      // Mock membership as regular member
      vi.mocked(getDocs).mockResolvedValue({
        docs: [{
          data: () => ({ ...mockMember, userId: 'user-456', role: 'member' })
        }],
        empty: false
      } as any);

      const request = new NextRequest('http://localhost/api/spaces/space-123?confirm=true', {
        method: 'DELETE'
      });

      const response = await spaceDELETE(request, { params: { spaceId: 'space-123' } });
      const responseData = await response.json();

      expect(response.status).toBe(403);
      expect(responseData.error).toBe('Only space owners can delete spaces');
    });

    it('handles malformed request bodies', async () => {
      const request = new NextRequest('http://localhost/api/spaces', {
        method: 'POST',
        body: 'invalid json'
      });

      const response = await spacesPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to create space');
    });

    it('manages space member limits', async () => {
      const spaceWithLimits = {
        ...mockSpace,
        settings: {
          ...mockSpace.settings,
          memberLimit: 3
        },
        memberCount: 3
      };

      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => spaceWithLimits
      } as any);

      const joinRequest = new NextRequest('http://localhost/api/spaces/join', {
        method: 'POST',
        body: JSON.stringify({ spaceId: 'space-123' })
      });

      // Mock as new user trying to join
      vi.mocked(getCurrentUser).mockResolvedValueOnce({
        uid: 'user-999',
        email: 'newuser@university.edu',
        displayName: 'New User'
      });

      const joinResponse = await joinPOST(joinRequest);
      const joinData = await joinResponse.json();

      expect(joinResponse.status).toBe(400);
      expect(joinData.error).toBe('Space has reached its member limit');
    });
  });

  describe('Space Analytics and Metrics', () => {
    it('tracks space engagement metrics', async () => {
      const request = new NextRequest('http://localhost/api/spaces/space-123?includeAnalytics=true');

      const response = await spaceGET(request, { params: { spaceId: 'space-123' } });
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.space.analytics).toEqual(
        expect.objectContaining({
          memberGrowth: expect.any(Array),
          contentActivity: expect.any(Object),
          engagementRate: expect.any(Number),
          peakActivityTimes: expect.any(Array)
        })
      );
    });

    it('calculates space health scores', async () => {
      const request = new NextRequest('http://localhost/api/spaces?includeHealth=true');

      const response = await spacesGET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.spaces[0].healthScore).toBeGreaterThanOrEqual(0);
      expect(responseData.spaces[0].healthScore).toBeLessThanOrEqual(100);
    });
  });
});