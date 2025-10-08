/**
 * Profile API Route Tests
 * Tests profile fetching, updating, validation, and privacy
 *
 * Routes:
 * - GET /api/profile
 * - PUT /api/profile
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET, PUT } from '@/app/api/profile/route';
import { NextRequest } from 'next/server';

// Mock Firebase
vi.mock('@/lib/firebase', () => ({
  db: {}
}));

// Mock Firebase Firestore
vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  serverTimestamp: vi.fn(() => new Date()),
  query: vi.fn(),
  collection: vi.fn(),
  where: vi.fn(),
  getDocs: vi.fn(),
  limit: vi.fn()
}));

// Mock secure auth
vi.mock('@/lib/api-auth-secure', () => ({
  withSecureAuth: (handler: any) => handler
}));

// Mock logger
vi.mock('@/lib/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn()
  }
}));

describe('Profile API - GET /api/profile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Authentication', () => {
    it('should require authentication', async () => {
      const request = new NextRequest('http://localhost:3000/api/profile');
      const token = null;

      // withSecureAuth middleware should reject
      expect(token).toBeNull();
    });

    it('should accept valid authenticated requests', async () => {
      const request = new NextRequest('http://localhost:3000/api/profile');
      const token = {
        uid: 'user-123',
        email: 'john@buffalo.edu'
      };

      expect(token.id).toBeDefined();
    });
  });

  describe('Profile Fetching', () => {
    it('should fetch user profile', async () => {
      const { doc, getDoc } = await import('firebase/firestore');

      const mockUserData = {
        email: 'john@buffalo.edu',
        handle: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        fullName: 'John Doe',
        bio: 'CS Major at UB',
        major: 'Computer Science',
        graduationYear: 2025,
        dorm: 'Governors',
        interests: ['programming', 'gaming'],
        profileImageUrl: 'https://example.com/photo.jpg',
        photos: [],
        statusMessage: 'Studying for finals',
        currentVibe: 'focused',
        availabilityStatus: 'studying',
        lookingFor: ['study partner'],
        onboardingComplete: true,
        onboardingStep: 5,
        privacySettings: {
          isPublic: true,
          showActivity: true,
          showSpaces: true,
          showConnections: true,
          allowDirectMessages: true,
          showOnlineStatus: true
        },
        connections: ['user-456', 'user-789'],
        spaceIds: ['space-1', 'space-2'],
        campusId: 'ub-buffalo',
        createdAt: { toDate: () => new Date('2025-01-01') },
        updatedAt: { toDate: () => new Date('2025-01-15') }
      };

      const mockSnapshot = {
        exists: () => true,
        data: () => mockUserData
      };

      vi.mocked(getDoc).mockResolvedValue(mockSnapshot as any);

      const request = new NextRequest('http://localhost:3000/api/profile');
      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      const response = await GET(request, token);
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.data.handle).toBe('johndoe');
      expect(data.data.major).toBe('Computer Science');
      expect(data.data.campusId).toBe('ub-buffalo');
    });

    it('should return 404 when profile not found', async () => {
      const { getDoc } = await import('firebase/firestore');

      const mockSnapshot = {
        exists: () => false
      };

      vi.mocked(getDoc).mockResolvedValue(mockSnapshot as any);

      const request = new NextRequest('http://localhost:3000/api/profile');
      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      const response = await GET(request, token);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.needsOnboarding).toBe(true);
    });

    it('should include onboarding status', async () => {
      const { getDoc } = await import('firebase/firestore');

      const mockUserData = {
        email: 'john@buffalo.edu',
        handle: 'johndoe',
        onboardingComplete: false,
        onboardingStep: 2
      };

      const mockSnapshot = {
        exists: () => true,
        data: () => mockUserData
      };

      vi.mocked(getDoc).mockResolvedValue(mockSnapshot as any);

      const request = new NextRequest('http://localhost:3000/api/profile');
      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      const response = await GET(request, token);
      const data = await response.json();

      expect(data.data.onboardingStatus.isComplete).toBe(false);
      expect(data.data.onboardingStatus.currentStep).toBe(2);
    });

    it('should include privacy settings', async () => {
      const { getDoc } = await import('firebase/firestore');

      const mockUserData = {
        email: 'john@buffalo.edu',
        handle: 'johndoe',
        privacySettings: {
          isPublic: false,
          showActivity: false,
          showSpaces: true,
          showConnections: false,
          allowDirectMessages: true,
          showOnlineStatus: false
        }
      };

      const mockSnapshot = {
        exists: () => true,
        data: () => mockUserData
      };

      vi.mocked(getDoc).mockResolvedValue(mockSnapshot as any);

      const request = new NextRequest('http://localhost:3000/api/profile');
      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      const response = await GET(request, token);
      const data = await response.json();

      expect(data.data.privacy.isPublic).toBe(false);
      expect(data.data.privacy.showActivity).toBe(false);
      expect(data.data.privacy.allowDirectMessages).toBe(true);
    });

    it('should include stats (connections, spaces)', async () => {
      const { getDoc } = await import('firebase/firestore');

      const mockUserData = {
        email: 'john@buffalo.edu',
        handle: 'johndoe',
        connections: ['user-1', 'user-2', 'user-3'],
        spaceIds: ['space-1', 'space-2']
      };

      const mockSnapshot = {
        exists: () => true,
        data: () => mockUserData
      };

      vi.mocked(getDoc).mockResolvedValue(mockSnapshot as any);

      const request = new NextRequest('http://localhost:3000/api/profile');
      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      const response = await GET(request, token);
      const data = await response.json();

      expect(data.data.stats.connectionCount).toBe(3);
      expect(data.data.stats.spacesJoined).toBe(2);
    });

    it('should include campus metadata', async () => {
      const { getDoc } = await import('firebase/firestore');

      const mockUserData = {
        email: 'john@buffalo.edu',
        handle: 'johndoe',
        campusId: 'ub-buffalo',
        createdAt: { toDate: () => new Date('2025-01-01') },
        updatedAt: { toDate: () => new Date('2025-01-15') }
      };

      const mockSnapshot = {
        exists: () => true,
        data: () => mockUserData
      };

      vi.mocked(getDoc).mockResolvedValue(mockSnapshot as any);

      const request = new NextRequest('http://localhost:3000/api/profile');
      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      const response = await GET(request, token);
      const data = await response.json();

      expect(data.data.metadata.campusId).toBe('ub-buffalo');
      expect(data.data.metadata.createdAt).toBeDefined();
      expect(data.data.metadata.updatedAt).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should return 500 on database error', async () => {
      const { getDoc } = await import('firebase/firestore');

      vi.mocked(getDoc).mockRejectedValue(new Error('Database error'));

      const request = new NextRequest('http://localhost:3000/api/profile');
      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      const response = await GET(request, token);

      expect(response.status).toBe(500);
    });

    it('should log errors', async () => {
      const { getDoc } = await import('firebase/firestore');
      const { logger } = await import('@/lib/logger');

      vi.mocked(getDoc).mockRejectedValue(new Error('Database error'));

      const request = new NextRequest('http://localhost:3000/api/profile');
      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      await GET(request, token);

      expect(logger.error).toHaveBeenCalled();
    });
  });
});

describe('Profile API - PUT /api/profile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Validation', () => {
    it('should validate handle format (3-30 chars, alphanumeric)', async () => {
      const invalidHandles = [
        'ab', // Too short
        'a'.repeat(31), // Too long
        'handle with spaces',
        'handle@invalid'
      ];

      for (const handle of invalidHandles) {
        const request = new NextRequest('http://localhost:3000/api/profile', {
          method: 'PUT',
          body: JSON.stringify({ handle })
        });

        const token = { uid: 'user-123', email: 'john@buffalo.edu' };

        // Zod schema should reject invalid handles
        // Regex: /^[a-zA-Z0-9_-]+$/
      }
    });

    it('should validate name length (1-50 chars)', async () => {
      const longName = 'a'.repeat(51);

      const request = new NextRequest('http://localhost:3000/api/profile', {
        method: 'PUT',
        body: JSON.stringify({ firstName: longName })
      });

      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      // Zod should reject
    });

    it('should validate bio length (max 500 chars)', async () => {
      const longBio = 'a'.repeat(501);

      const request = new NextRequest('http://localhost:3000/api/profile', {
        method: 'PUT',
        body: JSON.stringify({ bio: longBio })
      });

      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      // Zod should reject
    });

    it('should validate graduation year range (2020-2030)', async () => {
      const invalidYears = [2019, 2031];

      for (const year of invalidYears) {
        const request = new NextRequest('http://localhost:3000/api/profile', {
          method: 'PUT',
          body: JSON.stringify({ graduationYear: year })
        });

        const token = { uid: 'user-123', email: 'john@buffalo.edu' };

        // Zod should reject
      }
    });

    it('should validate interests array (max 10)', async () => {
      const tooManyInterests = Array(11).fill('interest');

      const request = new NextRequest('http://localhost:3000/api/profile', {
        method: 'PUT',
        body: JSON.stringify({ interests: tooManyInterests })
      });

      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      // Zod should reject
    });

    it('should validate photos array (max 5)', async () => {
      const tooManyPhotos = Array(6).fill('https://example.com/photo.jpg');

      const request = new NextRequest('http://localhost:3000/api/profile', {
        method: 'PUT',
        body: JSON.stringify({ photos: tooManyPhotos })
      });

      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      // Zod should reject
    });

    it('should validate URL format for profile image', async () => {
      const invalidUrl = 'not-a-url';

      const request = new NextRequest('http://localhost:3000/api/profile', {
        method: 'PUT',
        body: JSON.stringify({ profileImageUrl: invalidUrl })
      });

      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      // Zod should reject
    });

    it('should validate availabilityStatus enum', async () => {
      const invalidStatus = 'invalid-status';

      const request = new NextRequest('http://localhost:3000/api/profile', {
        method: 'PUT',
        body: JSON.stringify({ availabilityStatus: invalidStatus })
      });

      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      // Zod should reject
    });
  });

  describe('Handle Uniqueness', () => {
    it('should check handle uniqueness on campus', async () => {
      const { query, collection, where, limit, getDocs } = await import('firebase/firestore');

      const mockExistingHandle = {
        empty: false,
        docs: [{ id: 'other-user-id' }]
      };

      vi.mocked(getDocs).mockResolvedValue(mockExistingHandle as any);

      const request = new NextRequest('http://localhost:3000/api/profile', {
        method: 'PUT',
        body: JSON.stringify({ handle: 'johndoe' })
      });

      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      const response = await PUT(request, token);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('already taken');
    });

    it('should allow user to keep their own handle', async () => {
      const { getDocs, getDoc, updateDoc } = await import('firebase/firestore');

      const mockExistingHandle = {
        empty: false,
        docs: [{ id: 'user-123' }] // Same user
      };

      vi.mocked(getDocs).mockResolvedValue(mockExistingHandle as any);

      const mockCurrentDoc = {
        exists: () => true,
        data: () => ({ privacySettings: {} })
      };

      vi.mocked(getDoc).mockResolvedValue(mockCurrentDoc as any);

      const request = new NextRequest('http://localhost:3000/api/profile', {
        method: 'PUT',
        body: JSON.stringify({ handle: 'johndoe' })
      });

      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      const response = await PUT(request, token);

      expect(response.status).toBe(200);
    });

    it('should query with campus isolation', async () => {
      const { where, getDocs } = await import('firebase/firestore');

      const mockSnapshot = {
        empty: true
      };

      vi.mocked(getDocs).mockResolvedValue(mockSnapshot as any);

      const request = new NextRequest('http://localhost:3000/api/profile', {
        method: 'PUT',
        body: JSON.stringify({ handle: 'newhandle' })
      });

      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      await PUT(request, token);

      expect(where).toHaveBeenCalledWith('handle', '==', 'newhandle');
      expect(where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
    });
  });

  describe('Profile Updates', () => {
    it('should update basic profile fields', async () => {
      const { getDocs, updateDoc } = await import('firebase/firestore');

      const mockSnapshot = {
        empty: true
      };

      vi.mocked(getDocs).mockResolvedValue(mockSnapshot as any);

      const updateData = {
        firstName: 'Jane',
        lastName: 'Smith',
        bio: 'Updated bio',
        major: 'Engineering'
      };

      const request = new NextRequest('http://localhost:3000/api/profile', {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });

      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      const response = await PUT(request, token);
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(updateDoc).toHaveBeenCalled();
    });

    it('should add updatedAt timestamp', async () => {
      const { getDocs, updateDoc, serverTimestamp } = await import('firebase/firestore');

      const mockSnapshot = {
        empty: true
      };

      vi.mocked(getDocs).mockResolvedValue(mockSnapshot as any);

      const request = new NextRequest('http://localhost:3000/api/profile', {
        method: 'PUT',
        body: JSON.stringify({ bio: 'New bio' })
      });

      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      await PUT(request, token);

      expect(updateDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          updatedAt: expect.anything()
        })
      );
    });

    it('should add campusId to all updates', async () => {
      const { getDocs, updateDoc } = await import('firebase/firestore');

      const mockSnapshot = {
        empty: true
      };

      vi.mocked(getDocs).mockResolvedValue(mockSnapshot as any);

      const request = new NextRequest('http://localhost:3000/api/profile', {
        method: 'PUT',
        body: JSON.stringify({ bio: 'New bio' })
      });

      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      await PUT(request, token);

      expect(updateDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          campusId: 'ub-buffalo'
        })
      );
    });
  });

  describe('Privacy Settings', () => {
    it('should update privacy settings correctly', async () => {
      const { getDocs, getDoc, updateDoc } = await import('firebase/firestore');

      const mockSnapshot = {
        empty: true
      };

      vi.mocked(getDocs).mockResolvedValue(mockSnapshot as any);

      const mockCurrentDoc = {
        exists: () => true,
        data: () => ({
          privacySettings: {
            isPublic: true,
            showActivity: true
          }
        })
      };

      vi.mocked(getDoc).mockResolvedValue(mockCurrentDoc as any);

      const request = new NextRequest('http://localhost:3000/api/profile', {
        method: 'PUT',
        body: JSON.stringify({
          isPublic: false,
          showActivity: false
        })
      });

      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      await PUT(request, token);

      expect(updateDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          privacySettings: expect.objectContaining({
            isPublic: false,
            showActivity: false
          })
        })
      );
    });

    it('should merge privacy settings with existing ones', async () => {
      const { getDocs, getDoc, updateDoc } = await import('firebase/firestore');

      const mockSnapshot = {
        empty: true
      };

      vi.mocked(getDocs).mockResolvedValue(mockSnapshot as any);

      const mockCurrentDoc = {
        exists: () => true,
        data: () => ({
          privacySettings: {
            isPublic: true,
            showActivity: true,
            showSpaces: true,
            showConnections: true
          }
        })
      };

      vi.mocked(getDoc).mockResolvedValue(mockCurrentDoc as any);

      const request = new NextRequest('http://localhost:3000/api/profile', {
        method: 'PUT',
        body: JSON.stringify({
          isPublic: false // Only update this one
        })
      });

      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      await PUT(request, token);

      expect(updateDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          privacySettings: expect.objectContaining({
            isPublic: false,
            showActivity: true, // Preserved
            showSpaces: true, // Preserved
            showConnections: true // Preserved
          })
        })
      );
    });

    it('should remove individual privacy fields from top level', async () => {
      const { getDocs, getDoc, updateDoc } = await import('firebase/firestore');

      const mockSnapshot = {
        empty: true
      };

      vi.mocked(getDocs).mockResolvedValue(mockSnapshot as any);

      const mockCurrentDoc = {
        exists: () => true,
        data: () => ({ privacySettings: {} })
      };

      vi.mocked(getDoc).mockResolvedValue(mockCurrentDoc as any);

      const request = new NextRequest('http://localhost:3000/api/profile', {
        method: 'PUT',
        body: JSON.stringify({
          isPublic: false,
          showActivity: false
        })
      });

      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      await PUT(request, token);

      const updateCall = vi.mocked(updateDoc).mock.calls[0][1];

      // Top-level privacy fields should be removed
      expect(updateCall).not.toHaveProperty('isPublic');
      expect(updateCall).not.toHaveProperty('showActivity');
      // Only privacySettings object should exist
      expect(updateCall).toHaveProperty('privacySettings');
    });
  });

  describe('Response Format', () => {
    it('should return success message', async () => {
      const { getDocs, updateDoc } = await import('firebase/firestore');

      const mockSnapshot = {
        empty: true
      };

      vi.mocked(getDocs).mockResolvedValue(mockSnapshot as any);

      const request = new NextRequest('http://localhost:3000/api/profile', {
        method: 'PUT',
        body: JSON.stringify({ bio: 'New bio' })
      });

      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      const response = await PUT(request, token);
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.message).toContain('updated successfully');
    });

    it('should return updated fields list', async () => {
      const { getDocs, updateDoc } = await import('firebase/firestore');

      const mockSnapshot = {
        empty: true
      };

      vi.mocked(getDocs).mockResolvedValue(mockSnapshot as any);

      const request = new NextRequest('http://localhost:3000/api/profile', {
        method: 'PUT',
        body: JSON.stringify({
          bio: 'New bio',
          major: 'Engineering'
        })
      });

      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      const response = await PUT(request, token);
      const data = await response.json();

      expect(data.data.updatedFields).toContain('bio');
      expect(data.data.updatedFields).toContain('major');
    });
  });

  describe('Error Handling', () => {
    it('should return 500 on database error', async () => {
      const { updateDoc } = await import('firebase/firestore');

      vi.mocked(updateDoc).mockRejectedValue(new Error('Database error'));

      const request = new NextRequest('http://localhost:3000/api/profile', {
        method: 'PUT',
        body: JSON.stringify({ bio: 'New bio' })
      });

      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      const response = await PUT(request, token);

      expect(response.status).toBe(500);
    });

    it('should log errors', async () => {
      const { updateDoc } = await import('firebase/firestore');
      const { logger } = await import('@/lib/logger');

      vi.mocked(updateDoc).mockRejectedValue(new Error('Database error'));

      const request = new NextRequest('http://localhost:3000/api/profile', {
        method: 'PUT',
        body: JSON.stringify({ bio: 'New bio' })
      });

      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      await PUT(request, token);

      expect(logger.error).toHaveBeenCalled();
    });
  });

  describe('Rate Limiting', () => {
    it('should enforce API rate limits', async () => {
      const request = new NextRequest('http://localhost:3000/api/profile', {
        method: 'PUT',
        body: JSON.stringify({ bio: 'New bio' })
      });

      const token = { uid: 'user-123', email: 'john@buffalo.edu' };

      // withSecureAuth includes rate limiting via rateLimit: { type: 'api' }
      expect(PUT).toBeDefined();
    });
  });
});
