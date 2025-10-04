/**
 * Rituals API Test Suite
 * Tests: GET/POST /api/rituals
 *
 * Critical for:
 * - Ritual browsing and filtering
 * - User participation tracking
 * - Ritual creation (admin-only)
 * - Milestone tracking
 * - Campus-wide behavioral campaigns
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET, POST } from '@/app/api/rituals/route';
import type { NextRequest } from 'next/server';

// Mock Firebase Admin
const mockGet = vi.fn();
const mockAdd = vi.fn();
const mockUpdate = vi.fn();
const mockCollection = vi.fn();
const mockDoc = vi.fn();
const mockWhere = vi.fn();
const mockOrderBy = vi.fn();
const mockLimit = vi.fn();
const mockOffset = vi.fn();

vi.mock('@/lib/firebase-admin', () => ({
  dbAdmin: {
    collection: vi.fn(() => ({
      doc: mockDoc,
      where: mockWhere,
      orderBy: mockOrderBy,
      add: mockAdd,
    })),
  },
}));

vi.mock('@/lib/api-auth-middleware', () => ({
  withAuth: (handler: any) => handler,
}));

vi.mock('@/lib/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

// Create mock request helper
function createMockRequest(
  url: string = 'http://localhost:3000/api/rituals',
  method: string = 'GET',
  body?: any
): NextRequest {
  return new NextRequest(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: body ? { 'Content-Type': 'application/json' } : {},
  });
}

describe('Rituals API - GET /api/rituals', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Development Mode Mock Data', () => {
    it('should return mock rituals in development mode', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const request = createMockRequest();
      const authContext = { userId: 'test-user' };

      const response = await GET(request, authContext);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.rituals).toBeDefined();
      expect(Array.isArray(data.rituals)).toBe(true);
      expect(data.rituals.length).toBeGreaterThan(0);
      expect(data.currentRitual).toBeDefined();

      process.env.NODE_ENV = originalEnv;
    });

    it('should include user participation data in mock response', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const request = createMockRequest();
      const authContext = { userId: 'test-user' };

      const response = await GET(request, authContext);
      const data = await response.json();

      const activeRitual = data.rituals.find(
        (r: any) => r.userParticipation?.status === 'active'
      );

      expect(activeRitual).toBeDefined();
      expect(activeRitual.userParticipation.sessionsCompleted).toBeDefined();
      expect(activeRitual.userParticipation.currentStreak).toBeDefined();
      expect(activeRitual.userParticipation.progressPercentage).toBeDefined();

      process.env.NODE_ENV = originalEnv;
    });

    it('should filter by status in development mode', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const request = createMockRequest(
        'http://localhost:3000/api/rituals?status=active'
      );
      const authContext = { userId: 'test-user' };

      const response = await GET(request, authContext);
      const data = await response.json();

      expect(data.rituals.every((r: any) => r.status === 'active')).toBe(true);

      process.env.NODE_ENV = originalEnv;
    });

    it('should filter by type in development mode', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const request = createMockRequest(
        'http://localhost:3000/api/rituals?type=community'
      );
      const authContext = { userId: 'test-user' };

      const response = await GET(request, authContext);
      const data = await response.json();

      expect(data.rituals.every((r: any) => r.type === 'community')).toBe(true);

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('Production Ritual Retrieval', () => {
    it('should fetch rituals from Firestore in production', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const mockRituals = [
        {
          id: 'ritual1',
          data: () => ({
            name: 'Focus Flow',
            type: 'community',
            status: 'active',
            startTime: { toDate: () => new Date() },
            createdAt: { toDate: () => new Date() },
          }),
        },
      ];

      const mockParticipation = {
        empty: true,
      };

      mockOrderBy.mockReturnValue({
        limit: vi.fn(() => ({
          offset: vi.fn(() => ({
            get: vi.fn(async () => ({
              docs: mockRituals,
            })),
          })),
        })),
      });

      mockCollection.mockReturnValue({
        where: vi.fn(() => ({
          limit: vi.fn(() => ({
            get: vi.fn(async () => mockParticipation),
          })),
        })),
      });

      const request = createMockRequest();
      const authContext = { userId: 'user123' };

      const response = await GET(request, authContext);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.rituals).toBeDefined();

      process.env.NODE_ENV = originalEnv;
    });

    it('should filter by status', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const whereSpy = vi.fn(() => ({
        limit: vi.fn(() => ({
          offset: vi.fn(() => ({
            get: vi.fn(async () => ({ docs: [] })),
          })),
        })),
      }));

      mockOrderBy.mockReturnValue({
        where: whereSpy,
        limit: vi.fn(() => ({
          offset: vi.fn(() => ({
            get: vi.fn(async () => ({ docs: [] })),
          })),
        })),
      });

      const request = createMockRequest(
        'http://localhost:3000/api/rituals?status=active'
      );
      const authContext = { userId: 'user123' };

      await GET(request, authContext);

      expect(whereSpy).toHaveBeenCalledWith('status', '==', 'active');

      process.env.NODE_ENV = originalEnv;
    });

    it('should filter by type', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const whereSpy = vi.fn(() => ({
        limit: vi.fn(() => ({
          offset: vi.fn(() => ({
            get: vi.fn(async () => ({ docs: [] })),
          })),
        })),
      }));

      mockOrderBy.mockReturnValue({
        where: whereSpy,
        limit: vi.fn(() => ({
          offset: vi.fn(() => ({
            get: vi.fn(async () => ({ docs: [] })),
          })),
        })),
      });

      const request = createMockRequest(
        'http://localhost:3000/api/rituals?type=community'
      );
      const authContext = { userId: 'user123' };

      await GET(request, authContext);

      expect(whereSpy).toHaveBeenCalledWith('type', '==', 'community');

      process.env.NODE_ENV = originalEnv;
    });

    it('should filter by university', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const whereSpy = vi.fn(() => ({
        limit: vi.fn(() => ({
          offset: vi.fn(() => ({
            get: vi.fn(async () => ({ docs: [] })),
          })),
        })),
      }));

      mockOrderBy.mockReturnValue({
        where: whereSpy,
        limit: vi.fn(() => ({
          offset: vi.fn(() => ({
            get: vi.fn(async () => ({ docs: [] })),
          })),
        })),
      });

      const request = createMockRequest(
        'http://localhost:3000/api/rituals?university=ub-buffalo'
      );
      const authContext = { userId: 'user123' };

      await GET(request, authContext);

      expect(whereSpy).toHaveBeenCalledWith(
        'universities',
        'array-contains',
        'ub-buffalo'
      );

      process.env.NODE_ENV = originalEnv;
    });

    it('should apply pagination limits', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const limitSpy = vi.fn(() => ({
        offset: vi.fn(() => ({
          get: vi.fn(async () => ({ docs: [] })),
        })),
      }));

      const offsetSpy = vi.fn(() => ({
        get: vi.fn(async () => ({ docs: [] })),
      }));

      mockOrderBy.mockReturnValue({
        limit: limitSpy,
      });

      const request = createMockRequest(
        'http://localhost:3000/api/rituals?limit=10&offset=20'
      );
      const authContext = { userId: 'user123' };

      await GET(request, authContext);

      expect(limitSpy).toHaveBeenCalledWith(10);

      process.env.NODE_ENV = originalEnv;
    });

    it('should enforce max limit of 50', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const limitSpy = vi.fn(() => ({
        offset: vi.fn(() => ({
          get: vi.fn(async () => ({ docs: [] })),
        })),
      }));

      mockOrderBy.mockReturnValue({
        limit: limitSpy,
      });

      const request = createMockRequest(
        'http://localhost:3000/api/rituals?limit=100'
      );
      const authContext = { userId: 'user123' };

      await GET(request, authContext);

      expect(limitSpy).toHaveBeenCalledWith(50); // Should cap at 50

      process.env.NODE_ENV = originalEnv;
    });

    it('should include user participation status', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const mockRituals = [
        {
          id: 'ritual1',
          data: () => ({
            name: 'Test Ritual',
            type: 'community',
            status: 'active',
          }),
        },
      ];

      const mockParticipation = {
        empty: false,
        docs: [
          {
            id: 'participation1',
            data: () => ({
              status: 'active',
              progressPercentage: 75,
            }),
          },
        ],
      };

      mockOrderBy.mockReturnValue({
        limit: vi.fn(() => ({
          offset: vi.fn(() => ({
            get: vi.fn(async () => ({
              docs: mockRituals,
            })),
          })),
        })),
      });

      mockCollection.mockReturnValue({
        where: vi.fn(() => ({
          where: vi.fn(() => ({
            limit: vi.fn(() => ({
              get: vi.fn(async () => mockParticipation),
            })),
          })),
        })),
      });

      const request = createMockRequest();
      const authContext = { userId: 'user123' };

      const response = await GET(request, authContext);
      const data = await response.json();

      expect(data.rituals[0].userParticipation).toBeDefined();
      expect(data.rituals[0].userParticipation.status).toBe('active');

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('Query Validation', () => {
    it('should validate status enum values', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/rituals?status=invalid_status'
      );
      const authContext = { userId: 'user123' };

      const response = await GET(request, authContext);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('Invalid query parameters');
    });

    it('should validate type enum values', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/rituals?type=invalid_type'
      );
      const authContext = { userId: 'user123' };

      const response = await GET(request, authContext);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('Invalid query parameters');
    });

    it('should validate limit is a number', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/rituals?limit=not_a_number'
      );
      const authContext = { userId: 'user123' };

      const response = await GET(request, authContext);
      const data = await response.json();

      expect(response.status).toBe(400);
    });

    it('should enforce minimum limit of 1', async () => {
      const request = createMockRequest(
        'http://localhost:3000/api/rituals?limit=0'
      );
      const authContext = { userId: 'user123' };

      const response = await GET(request, authContext);
      const data = await response.json();

      expect(response.status).toBe(400);
    });
  });

  describe('Error Handling', () => {
    it('should handle database errors gracefully', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      mockOrderBy.mockReturnValue({
        limit: vi.fn(() => ({
          offset: vi.fn(() => ({
            get: vi.fn(async () => {
              throw new Error('Firestore connection failed');
            }),
          })),
        })),
      });

      const request = createMockRequest();
      const authContext = { userId: 'user123' };

      const response = await GET(request, authContext);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toContain('Internal server error');

      process.env.NODE_ENV = originalEnv;
    });
  });
});

describe('Rituals API - POST /api/rituals', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Ritual Creation', () => {
    it('should create ritual with valid data', async () => {
      const mockRitualRef = {
        id: 'ritual123',
      };

      const mockBatch = {
        set: vi.fn(),
        commit: vi.fn(async () => {}),
      };

      mockAdd.mockResolvedValue(mockRitualRef);
      mockCollection.mockReturnValue({
        add: mockAdd,
        doc: vi.fn(() => ({
          collection: vi.fn(() => ({
            doc: vi.fn(() => ({})),
          })),
        })),
      });

      vi.mocked(mockCollection).mockImplementation((name) => {
        if (name === 'rituals') {
          return {
            add: mockAdd,
            doc: vi.fn(() => ({
              collection: vi.fn(() => ({
                doc: vi.fn(() => ({})),
              })),
            })),
          } as any;
        }
        return {} as any;
      });

      const ritualData = {
        name: 'Test Ritual',
        title: 'Daily Focus Session',
        description: 'A test ritual for focus',
        tagline: 'Stay focused',
        type: 'community',
        category: 'productivity',
        tags: ['focus', 'productivity'],
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        duration: 25,
        timezone: 'America/New_York',
        universities: ['buffalo'],
        isGlobal: false,
        participationType: 'individual',
        requiresInvitation: false,
        actions: [
          {
            id: 'action1',
            type: 'interact',
            name: 'Complete Session',
            description: 'Complete a focus session',
            isRequired: true,
            weight: 100,
          },
        ],
        milestones: [
          {
            id: 'milestone1',
            name: 'First Session',
            description: 'Complete first session',
            participantThreshold: 1,
            progressThreshold: 1,
          },
        ],
        rewards: [
          {
            id: 'reward1',
            type: 'badge',
            name: 'Focus Badge',
            description: 'Awarded for completing sessions',
            requiresCompletion: false,
            minimumParticipation: 50,
            rarity: 'common',
            isTimeLimited: false,
            unlockScope: 'user',
          },
        ],
        featureUnlocks: [],
      };

      const request = createMockRequest(
        'http://localhost:3000/api/rituals',
        'POST',
        ritualData
      );
      const authContext = { userId: 'admin123' };

      const response = await POST(request, authContext);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.ritualId).toBe('ritual123');
    });

    it('should validate required fields', async () => {
      const invalidData = {
        name: '', // Empty name should fail
        title: 'Test',
      };

      const request = createMockRequest(
        'http://localhost:3000/api/rituals',
        'POST',
        invalidData
      );
      const authContext = { userId: 'admin123' };

      const response = await POST(request, authContext);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('Invalid ritual data');
    });

    it('should validate type enum', async () => {
      const invalidData = {
        name: 'Test Ritual',
        title: 'Test',
        description: 'Test description',
        tagline: 'Test',
        type: 'invalid_type', // Invalid type
        category: 'test',
        tags: [],
        startTime: new Date().toISOString(),
        universities: ['buffalo'],
        participationType: 'individual',
        actions: [],
        milestones: [],
        rewards: [],
        featureUnlocks: [],
      };

      const request = createMockRequest(
        'http://localhost:3000/api/rituals',
        'POST',
        invalidData
      );
      const authContext = { userId: 'admin123' };

      const response = await POST(request, authContext);
      const data = await response.json();

      expect(response.status).toBe(400);
    });

    it('should initialize ritual with draft status', async () => {
      const mockRitualRef = {
        id: 'ritual123',
      };

      let capturedRitualData: any;
      mockAdd.mockImplementation(async (data) => {
        capturedRitualData = data;
        return mockRitualRef;
      });

      mockCollection.mockReturnValue({
        add: mockAdd,
        doc: vi.fn(() => ({
          collection: vi.fn(() => ({
            doc: vi.fn(() => ({})),
          })),
        })),
      } as any);

      const ritualData = {
        name: 'Test Ritual',
        title: 'Test',
        description: 'Test description',
        tagline: 'Test tagline',
        type: 'community',
        category: 'test',
        tags: [],
        startTime: new Date().toISOString(),
        universities: ['buffalo'],
        participationType: 'individual',
        actions: [],
        milestones: [],
        rewards: [],
        featureUnlocks: [],
      };

      const request = createMockRequest(
        'http://localhost:3000/api/rituals',
        'POST',
        ritualData
      );
      const authContext = { userId: 'admin123' };

      await POST(request, authContext);

      expect(capturedRitualData).toBeDefined();
      expect(capturedRitualData.status).toBe('draft');
      expect(capturedRitualData.createdBy).toBe('admin123');
    });
  });

  describe('Error Handling', () => {
    it('should handle Firestore errors gracefully', async () => {
      mockAdd.mockRejectedValue(new Error('Firestore write failed'));

      mockCollection.mockReturnValue({
        add: mockAdd,
      } as any);

      const ritualData = {
        name: 'Test Ritual',
        title: 'Test',
        description: 'Test description',
        tagline: 'Test',
        type: 'community',
        category: 'test',
        tags: [],
        startTime: new Date().toISOString(),
        universities: ['buffalo'],
        participationType: 'individual',
        actions: [],
        milestones: [],
        rewards: [],
        featureUnlocks: [],
      };

      const request = createMockRequest(
        'http://localhost:3000/api/rituals',
        'POST',
        ritualData
      );
      const authContext = { userId: 'admin123' };

      const response = await POST(request, authContext);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toContain('Internal server error');
    });
  });
});
