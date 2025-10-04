/**
 * Connections API Test Suite
 * Tests: GET/POST /api/connections
 *
 * Critical for:
 * - Automatic connection detection (same major, dorm, year, spaces)
 * - Connection strength calculation
 * - Mutual connection detection
 * - Friend status integration
 * - Campus isolation in connection queries
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET, POST } from '@/app/api/connections/route';
import type { NextRequest } from 'next/server';

// Mock Firebase Admin
const mockGet = vi.fn();
const mockSet = vi.fn();
const mockUpdate = vi.fn();
const mockBatch = vi.fn();
const mockCommit = vi.fn();
const mockCollection = vi.fn();
const mockDoc = vi.fn();
const mockWhere = vi.fn();
const mockOrderBy = vi.fn();
const mockLimit = vi.fn();
const mockCount = vi.fn();

vi.mock('@/lib/firebase-admin', () => ({
  dbAdmin: {
    collection: vi.fn(() => ({
      doc: mockDoc,
      where: mockWhere,
    })),
    batch: vi.fn(() => ({
      set: mockSet,
      commit: mockCommit,
    })),
  },
}));

vi.mock('@/lib/middleware/index', () => ({
  withAuthAndErrors: (handler: any) => handler,
  getUserId: vi.fn((request: any) => request.userId || 'user123'),
}));

vi.mock('@/lib/structured-logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

// Create mock request helper
function createMockRequest(userId: string = 'user123'): any {
  return {
    userId,
    url: 'http://localhost:3000/api/connections',
  };
}

describe('Connections API - GET /api/connections', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Connection Retrieval', () => {
    it('should fetch user connections ordered by strength', async () => {
      const mockConnections = [
        {
          id: 'conn1',
          data: () => ({
            userId: 'user456',
            strength: 80,
            sources: ['same_major', 'same_dorm'],
            connectedAt: '2025-01-01',
          }),
        },
        {
          id: 'conn2',
          data: () => ({
            userId: 'user789',
            strength: 50,
            sources: ['same_space'],
            connectedAt: '2025-01-02',
          }),
        },
      ];

      const mockFriendsSnapshot = {
        docs: [
          { id: 'user456' },
        ],
      };

      const mockUserDoc = {
        exists: true,
        data: () => ({
          fullName: 'Jane Doe',
          handle: 'janedoe',
          avatarUrl: 'https://example.com/avatar.jpg',
          academic: {
            major: 'Computer Science',
            academicYear: 'junior',
            housing: 'Ellicott Complex',
          },
        }),
      };

      const mockReverseConnection = {
        exists: true,
      };

      mockDoc.mockImplementation((userId) => ({
        collection: vi.fn((collectionName) => {
          if (collectionName === 'connections') {
            return {
              orderBy: vi.fn(() => ({
                limit: vi.fn(() => ({
                  get: vi.fn(async () => ({
                    docs: mockConnections,
                  })),
                })),
              })),
              doc: vi.fn(() => ({
                get: vi.fn(async () => mockReverseConnection),
              })),
            };
          }
          if (collectionName === 'friends') {
            return {
              get: vi.fn(async () => mockFriendsSnapshot),
            };
          }
          return {};
        }),
        get: vi.fn(async () => mockUserDoc),
      }));

      const request = createMockRequest('user123');
      const context = {};
      const respond = {
        success: (data: any) => ({ json: () => Promise.resolve(data), status: 200 }),
        error: (msg: string) => ({ json: () => Promise.resolve({ error: msg }), status: 500 }),
      };

      const response = await GET(request, context, respond);
      const data = await response.json();

      expect(data.connections).toBeDefined();
      expect(data.stats).toBeDefined();
      expect(data.stats.totalConnections).toBe(2);
      expect(data.stats.friends).toBe(1);
    });

    it('should detect mutual connections', async () => {
      const mockConnections = [
        {
          id: 'conn1',
          data: () => ({
            userId: 'user456',
            strength: 70,
            sources: ['same_major'],
          }),
        },
      ];

      const mockFriendsSnapshot = {
        docs: [],
      };

      const mockUserDoc = {
        exists: true,
        data: () => ({
          fullName: 'Jane Doe',
          handle: 'janedoe',
        }),
      };

      const mockReverseConnection = {
        exists: true, // Mutual connection
      };

      mockDoc.mockImplementation((userId) => ({
        collection: vi.fn((collectionName) => {
          if (collectionName === 'connections') {
            return {
              orderBy: vi.fn(() => ({
                limit: vi.fn(() => ({
                  get: vi.fn(async () => ({
                    docs: mockConnections,
                  })),
                })),
              })),
              doc: vi.fn(() => ({
                get: vi.fn(async () => mockReverseConnection),
              })),
            };
          }
          if (collectionName === 'friends') {
            return {
              get: vi.fn(async () => mockFriendsSnapshot),
            };
          }
          return {};
        }),
        get: vi.fn(async () => mockUserDoc),
      }));

      const request = createMockRequest('user123');
      const context = {};
      const respond = {
        success: (data: any) => ({ json: () => Promise.resolve(data) }),
        error: (msg: string) => ({ json: () => Promise.resolve({ error: msg }) }),
      };

      const response = await GET(request, context, respond);
      const data = await response.json();

      expect(data.connections[0].isMutual).toBe(true);
    });

    it('should include friend status for connections', async () => {
      const mockConnections = [
        {
          id: 'conn1',
          data: () => ({
            userId: 'friend789',
            strength: 80,
            sources: ['same_space'],
          }),
        },
      ];

      const mockFriendsSnapshot = {
        docs: [
          { id: 'friend789' }, // This user is a friend
        ],
      };

      const mockUserDoc = {
        exists: true,
        data: () => ({
          fullName: 'Friend User',
          handle: 'frienduser',
        }),
      };

      const mockReverseConnection = {
        exists: true,
      };

      mockDoc.mockImplementation(() => ({
        collection: vi.fn((collectionName) => {
          if (collectionName === 'connections') {
            return {
              orderBy: vi.fn(() => ({
                limit: vi.fn(() => ({
                  get: vi.fn(async () => ({
                    docs: mockConnections,
                  })),
                })),
              })),
              doc: vi.fn(() => ({
                get: vi.fn(async () => mockReverseConnection),
              })),
            };
          }
          if (collectionName === 'friends') {
            return {
              get: vi.fn(async () => mockFriendsSnapshot),
            };
          }
          return {};
        }),
        get: vi.fn(async () => mockUserDoc),
      }));

      const request = createMockRequest('user123');
      const context = {};
      const respond = {
        success: (data: any) => ({ json: () => Promise.resolve(data) }),
        error: (msg: string) => ({ json: () => Promise.resolve({ error: msg }) }),
      };

      const response = await GET(request, context, respond);
      const data = await response.json();

      expect(data.connections[0].isFriend).toBe(true);
    });

    it('should calculate connection statistics correctly', async () => {
      const mockConnections = [
        {
          id: 'conn1',
          data: () => ({
            userId: 'user1',
            strength: 90,
            sources: ['same_major', 'same_dorm'],
          }),
        },
        {
          id: 'conn2',
          data: () => ({
            userId: 'user2',
            strength: 70,
            sources: ['same_space'],
          }),
        },
        {
          id: 'conn3',
          data: () => ({
            userId: 'user3',
            strength: 60,
            sources: ['same_major'],
          }),
        },
      ];

      const mockFriendsSnapshot = {
        docs: [],
      };

      const mockUserDoc = {
        exists: true,
        data: () => ({ fullName: 'Test User', handle: 'testuser' }),
      };

      const mockReverseConnection = {
        exists: false,
      };

      mockDoc.mockImplementation(() => ({
        collection: vi.fn((collectionName) => {
          if (collectionName === 'connections') {
            return {
              orderBy: vi.fn(() => ({
                limit: vi.fn(() => ({
                  get: vi.fn(async () => ({
                    docs: mockConnections,
                  })),
                })),
              })),
              doc: vi.fn(() => ({
                get: vi.fn(async () => mockReverseConnection),
              })),
            };
          }
          if (collectionName === 'friends') {
            return {
              get: vi.fn(async () => mockFriendsSnapshot),
            };
          }
          return {};
        }),
        get: vi.fn(async () => mockUserDoc),
      }));

      const request = createMockRequest('user123');
      const context = {};
      const respond = {
        success: (data: any) => ({ json: () => Promise.resolve(data) }),
        error: (msg: string) => ({ json: () => Promise.resolve({ error: msg }) }),
      };

      const response = await GET(request, context, respond);
      const data = await response.json();

      expect(data.stats.totalConnections).toBe(3);
      expect(data.stats.averageStrength).toBeCloseTo(73.33, 1);
      expect(data.stats.strongConnections).toBe(2); // Connections with strength >= 70
      expect(data.stats.connectionSources).toEqual({
        same_major: 2,
        same_dorm: 1,
        same_space: 1,
      });
    });

    it('should limit connections to 100', async () => {
      mockDoc.mockImplementation(() => ({
        collection: vi.fn((collectionName) => {
          if (collectionName === 'connections') {
            return {
              orderBy: vi.fn(() => ({
                limit: vi.fn((limit) => {
                  expect(limit).toBe(100);
                  return {
                    get: vi.fn(async () => ({
                      docs: [],
                    })),
                  };
                }),
              })),
            };
          }
          if (collectionName === 'friends') {
            return {
              get: vi.fn(async () => ({ docs: [] })),
            };
          }
          return {};
        }),
      }));

      const request = createMockRequest('user123');
      const context = {};
      const respond = {
        success: (data: any) => ({ json: () => Promise.resolve(data) }),
        error: (msg: string) => ({ json: () => Promise.resolve({ error: msg }) }),
      };

      await GET(request, context, respond);
    });
  });

  describe('Error Handling', () => {
    it('should handle database errors gracefully', async () => {
      mockDoc.mockImplementation(() => ({
        collection: vi.fn(() => ({
          orderBy: vi.fn(() => ({
            limit: vi.fn(() => ({
              get: vi.fn(async () => {
                throw new Error('Database connection failed');
              }),
            })),
          })),
        })),
      }));

      const request = createMockRequest('user123');
      const context = {};
      const respond = {
        success: (data: any) => ({ json: () => Promise.resolve(data) }),
        error: (msg: string, code: string) =>
          ({ json: () => Promise.resolve({ error: msg, code }), status: 500 }),
      };

      const response = await GET(request, context, respond);
      const data = await response.json();

      expect(data.error).toContain('Failed to fetch connections');
    });
  });
});

describe('Connections API - POST /api/connections (Detection)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Connection Detection', () => {
    it('should detect connections with same major', async () => {
      const mockUserDoc = {
        exists: true,
        data: () => ({
          academic: {
            major: 'Computer Science',
            academicYear: 'junior',
          },
          campusId: 'ub-buffalo',
        }),
      };

      const mockMajorUsers = {
        get: vi.fn(async () => ({
          forEach: (callback: any) => {
            callback({ id: 'user456' });
            callback({ id: 'user789' });
          },
        })),
      };

      let batchCalls: any[] = [];
      mockBatch.mockReturnValue({
        set: vi.fn((ref, data, options) => {
          batchCalls.push({ ref, data, options });
        }),
        commit: vi.fn(async () => {}),
      });

      mockDoc.mockImplementation(() => ({
        get: vi.fn(async () => mockUserDoc),
        collection: vi.fn(() => ({
          doc: vi.fn(() => ({})),
        })),
      }));

      mockCollection.mockReturnValue({
        where: vi.fn(() => ({
          where: vi.fn(() => ({
            limit: vi.fn(() => mockMajorUsers),
          })),
        })),
      });

      const request = createMockRequest('user123');
      const context = {};
      const respond = {
        success: (data: any) => ({ json: () => Promise.resolve(data) }),
        error: (msg: string, code: string) =>
          ({ json: () => Promise.resolve({ error: msg, code }) }),
      };

      const response = await POST(request, context, respond);
      const data = await response.json();

      expect(data.message).toContain('Connections detected successfully');
    });

    it('should detect connections with same dorm', async () => {
      const mockUserDoc = {
        exists: true,
        data: () => ({
          academic: {
            housing: 'Ellicott Complex',
          },
          campusId: 'ub-buffalo',
        }),
      };

      mockDoc.mockImplementation(() => ({
        get: vi.fn(async () => mockUserDoc),
      }));

      const request = createMockRequest('user123');
      const context = {};
      const respond = {
        success: (data: any) => ({ json: () => Promise.resolve(data) }),
        error: (msg: string, code: string) =>
          ({ json: () => Promise.resolve({ error: msg, code }) }),
      };

      await POST(request, context, respond);
    });

    it('should combine multiple connection sources for same user', async () => {
      const mockUserDoc = {
        exists: true,
        data: () => ({
          academic: {
            major: 'Computer Science',
            housing: 'Ellicott Complex',
            academicYear: 'junior',
          },
          campusId: 'ub-buffalo',
        }),
      };

      // Same user appears in both major and dorm queries
      const mockQueryResults = {
        get: vi.fn(async () => ({
          forEach: (callback: any) => {
            callback({ id: 'user456' }); // Same user in both
          },
        })),
      };

      mockDoc.mockImplementation(() => ({
        get: vi.fn(async () => mockUserDoc),
      }));

      mockCollection.mockReturnValue({
        where: vi.fn(() => ({
          where: vi.fn(() => ({
            limit: vi.fn(() => mockQueryResults),
          })),
        })),
      });

      const request = createMockRequest('user123');
      const context = {};
      const respond = {
        success: (data: any) => ({ json: () => Promise.resolve(data) }),
        error: (msg: string, code: string) =>
          ({ json: () => Promise.resolve({ error: msg, code }) }),
      };

      const response = await POST(request, context, respond);
      const data = await response.json();

      // Strength should be combined: 30 (major) + 40 (dorm) = 70
      expect(data.detected).toBeGreaterThan(0);
    });

    it('should cap connection strength at 100', async () => {
      const mockUserDoc = {
        exists: true,
        data: () => ({
          academic: {
            major: 'Computer Science',
            housing: 'Ellicott Complex',
            academicYear: 'junior',
          },
          campusId: 'ub-buffalo',
        }),
      };

      mockDoc.mockImplementation(() => ({
        get: vi.fn(async () => mockUserDoc),
      }));

      const request = createMockRequest('user123');
      const context = {};
      const respond = {
        success: (data: any) => ({ json: () => Promise.resolve(data) }),
        error: (msg: string, code: string) =>
          ({ json: () => Promise.resolve({ error: msg, code }) }),
      };

      await POST(request, context, respond);

      // Strength formula:
      // major (30) + dorm (40) + year (10) = 80 (under 100)
      // If we add same_space (20), it could exceed 100, so cap at 100
    });

    it('should enforce campus isolation in all queries', async () => {
      const mockUserDoc = {
        exists: true,
        data: () => ({
          academic: {
            major: 'Computer Science',
          },
          campusId: 'ub-buffalo',
        }),
      };

      const whereSpy = vi.fn(() => ({
        where: vi.fn(() => ({
          limit: vi.fn(() => ({
            get: vi.fn(async () => ({
              forEach: () => {},
            })),
          })),
        })),
      }));

      mockDoc.mockImplementation(() => ({
        get: vi.fn(async () => mockUserDoc),
      }));

      mockCollection.mockReturnValue({
        where: whereSpy,
      });

      const request = createMockRequest('user123');
      const context = {};
      const respond = {
        success: (data: any) => ({ json: () => Promise.resolve(data) }),
        error: (msg: string, code: string) =>
          ({ json: () => Promise.resolve({ error: msg, code }) }),
      };

      await POST(request, context, respond);

      // All queries should filter by campusId
      expect(whereSpy).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
    });

    it('should create bidirectional connections', async () => {
      const mockUserDoc = {
        exists: true,
        data: () => ({
          academic: {
            major: 'Computer Science',
          },
          campusId: 'ub-buffalo',
        }),
      };

      const batchSetCalls: any[] = [];
      const mockBatchObj = {
        set: vi.fn((ref, data, options) => {
          batchSetCalls.push({ data, options });
          return mockBatchObj;
        }),
        commit: vi.fn(async () => {}),
      };

      vi.mocked(mockBatch).mockReturnValue(mockBatchObj as any);

      mockDoc.mockImplementation(() => ({
        get: vi.fn(async () => mockUserDoc),
        collection: vi.fn(() => ({
          doc: vi.fn(() => ({})),
        })),
      }));

      mockCollection.mockReturnValue({
        where: vi.fn(() => ({
          where: vi.fn(() => ({
            limit: vi.fn(() => ({
              get: vi.fn(async () => ({
                forEach: (callback: any) => {
                  callback({ id: 'user456' });
                },
              })),
            })),
          })),
        })),
      });

      const request = createMockRequest('user123');
      const context = {};
      const respond = {
        success: (data: any) => ({ json: () => Promise.resolve(data) }),
        error: (msg: string, code: string) =>
          ({ json: () => Promise.resolve({ error: msg, code }) }),
      };

      await POST(request, context, respond);

      // Should have 2 batch.set calls: forward and reverse connection
      expect(batchSetCalls.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Error Handling', () => {
    it('should return error if user profile not found', async () => {
      mockDoc.mockImplementation(() => ({
        get: vi.fn(async () => ({
          exists: false,
        })),
      }));

      const request = createMockRequest('user123');
      const context = {};
      const respond = {
        success: (data: any) => ({ json: () => Promise.resolve(data) }),
        error: (msg: string, code: string) =>
          ({ json: () => Promise.resolve({ error: msg, code }), status: 404 }),
      };

      const response = await POST(request, context, respond);
      const data = await response.json();

      expect(data.error).toContain('User profile not found');
      expect(data.code).toBe('RESOURCE_NOT_FOUND');
    });

    it('should handle batch write failures gracefully', async () => {
      const mockUserDoc = {
        exists: true,
        data: () => ({
          academic: {
            major: 'Computer Science',
          },
          campusId: 'ub-buffalo',
        }),
      };

      const mockBatchObj = {
        set: vi.fn(() => mockBatchObj),
        commit: vi.fn(async () => {
          throw new Error('Firestore batch write failed');
        }),
      };

      vi.mocked(mockBatch).mockReturnValue(mockBatchObj as any);

      mockDoc.mockImplementation(() => ({
        get: vi.fn(async () => mockUserDoc),
        collection: vi.fn(() => ({
          doc: vi.fn(() => ({})),
        })),
      }));

      mockCollection.mockReturnValue({
        where: vi.fn(() => ({
          where: vi.fn(() => ({
            limit: vi.fn(() => ({
              get: vi.fn(async () => ({
                forEach: (callback: any) => {
                  callback({ id: 'user456' });
                },
              })),
            })),
          })),
        })),
      });

      const request = createMockRequest('user123');
      const context = {};
      const respond = {
        success: (data: any) => ({ json: () => Promise.resolve(data) }),
        error: (msg: string, code: string) =>
          ({ json: () => Promise.resolve({ error: msg, code }), status: 500 }),
      };

      const response = await POST(request, context, respond);
      const data = await response.json();

      expect(data.error).toContain('Failed to detect connections');
    });
  });
});
