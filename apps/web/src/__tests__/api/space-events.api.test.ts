/**
 * Space Events API Test Suite
 * Tests: GET/POST /api/spaces/[spaceId]/events
 *
 * Critical for:
 * - Event creation in spaces
 * - Event retrieval (upcoming/past filtering)
 * - RSVP tracking
 * - Event type filtering
 * - Date validation
 * - Member-only access
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET, POST } from '@/app/api/spaces/[spaceId]/events/route';
import { NextRequest } from 'next/server';

// Mock Firebase Admin
const mockGet = vi.fn();
const mockAdd = vi.fn();
const mockCollection = vi.fn();
const mockDoc = vi.fn();
const mockWhere = vi.fn();
const mockOrderBy = vi.fn();
const mockOffset = vi.fn();
const mockLimit = vi.fn();

vi.mock('@/lib/firebase-admin', () => ({
  dbAdmin: {
    collection: vi.fn(() => ({
      doc: mockDoc,
    })),
  },
}));

vi.mock('firebase-admin/auth', () => ({
  getAuth: vi.fn(() => ({
    verifyIdToken: vi.fn(async (token: string) => {
      if (token === 'valid_token') {
        return { uid: 'user123', email: 'john@buffalo.edu' };
      }
      throw new Error('Invalid token');
    }),
  })),
}));

vi.mock('@/lib/auth', () => ({
  getAuthTokenFromRequest: vi.fn((request: any) => {
    const auth = request.headers.get('authorization');
    if (!auth || !auth.startsWith('Bearer ')) {
      return null;
    }
    return auth.substring(7);
  }),
}));

vi.mock('@/lib/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Space Events API - GET /api/spaces/[spaceId]/events', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Authentication & Authorization', () => {
    it('should require authentication', async () => {
      const request = new NextRequest('http://localhost:3000/api/spaces/space123/events');
      const params = Promise.resolve({ spaceId: 'space123' });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toContain('Authentication required');
    });

    it('should require space membership', async () => {
      const mockMemberDoc = {
        exists: false,
      };

      mockDoc.mockReturnValue({
        collection: vi.fn(() => ({
          doc: vi.fn(() => ({
            get: vi.fn(async () => mockMemberDoc),
          })),
        })),
      });

      const request = new NextRequest('http://localhost:3000/api/spaces/space123/events', {
        headers: { authorization: 'Bearer valid_token' },
      });
      const params = Promise.resolve({ spaceId: 'space123' });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.error).toContain('Not a member');
    });
  });

  describe('Event Retrieval', () => {
    it('should fetch upcoming events by default', async () => {
      const mockMemberDoc = {
        exists: true,
      };

      const mockEvents = [
        {
          id: 'event1',
          data: () => ({
            title: 'Study Session',
            type: 'academic',
            startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
            organizerId: 'organizer123',
          }),
        },
      ];

      const mockOrganizerDoc = {
        exists: true,
        data: () => ({
          fullName: 'Jane Doe',
          handle: 'janedoe',
          photoURL: 'https://example.com/photo.jpg',
        }),
      };

      const whereSpy = vi.fn(() => ({
        offset: vi.fn(() => ({
          limit: vi.fn(() => ({
            get: vi.fn(async () => ({ docs: mockEvents, size: 1 })),
          })),
        })),
      }));

      mockDoc.mockImplementation((docId) => {
        if (docId === 'space123') {
          return {
            collection: vi.fn((collName) => {
              if (collName === 'members') {
                return {
                  doc: vi.fn(() => ({
                    get: vi.fn(async () => mockMemberDoc),
                  })),
                };
              }
              if (collName === 'events') {
                return {
                  orderBy: vi.fn(() => ({
                    where: whereSpy,
                  })),
                  doc: vi.fn(() => ({
                    collection: vi.fn(() => ({
                      where: vi.fn(() => ({
                        get: vi.fn(async () => ({ size: 0 })),
                      })),
                      doc: vi.fn(() => ({
                        get: vi.fn(async () => ({ exists: false })),
                      })),
                    })),
                  })),
                };
              }
              return {};
            }),
          };
        }
        if (docId === 'organizer123') {
          return {
            get: vi.fn(async () => mockOrganizerDoc),
          };
        }
        return {};
      });

      const request = new NextRequest('http://localhost:3000/api/spaces/space123/events', {
        headers: { authorization: 'Bearer valid_token' },
      });
      const params = Promise.resolve({ spaceId: 'space123' });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.events).toBeDefined();
      expect(whereSpy).toHaveBeenCalledWith('startDate', '>=', expect.any(Date));
    });

    it('should fetch past events when upcoming=false', async () => {
      const mockMemberDoc = {
        exists: true,
      };

      const whereSpy = vi.fn(() => ({
        offset: vi.fn(() => ({
          limit: vi.fn(() => ({
            get: vi.fn(async () => ({ docs: [], size: 0 })),
          })),
        })),
      }));

      mockDoc.mockReturnValue({
        collection: vi.fn((collName) => {
          if (collName === 'members') {
            return {
              doc: vi.fn(() => ({
                get: vi.fn(async () => mockMemberDoc),
              })),
            };
          }
          if (collName === 'events') {
            return {
              orderBy: vi.fn(() => ({
                where: whereSpy,
              })),
            };
          }
          return {};
        }),
      });

      const request = new NextRequest(
        'http://localhost:3000/api/spaces/space123/events?upcoming=false',
        {
          headers: { authorization: 'Bearer valid_token' },
        }
      );
      const params = Promise.resolve({ spaceId: 'space123' });

      await GET(request, { params });

      expect(whereSpy).toHaveBeenCalledWith('startDate', '<', expect.any(Date));
    });

    it('should filter by event type', async () => {
      const mockMemberDoc = {
        exists: true,
      };

      const whereSpy = vi.fn(() => ({
        offset: vi.fn(() => ({
          limit: vi.fn(() => ({
            get: vi.fn(async () => ({ docs: [], size: 0 })),
          })),
        })),
      }));

      mockDoc.mockReturnValue({
        collection: vi.fn((collName) => {
          if (collName === 'members') {
            return {
              doc: vi.fn(() => ({
                get: vi.fn(async () => mockMemberDoc),
              })),
            };
          }
          if (collName === 'events') {
            return {
              orderBy: vi.fn(() => ({
                where: whereSpy,
              })),
            };
          }
          return {};
        }),
      });

      const request = new NextRequest(
        'http://localhost:3000/api/spaces/space123/events?type=academic',
        {
          headers: { authorization: 'Bearer valid_token' },
        }
      );
      const params = Promise.resolve({ spaceId: 'space123' });

      await GET(request, { params });

      expect(whereSpy).toHaveBeenCalledWith('type', '==', 'academic');
    });

    it('should include RSVP count and user RSVP status', async () => {
      const mockMemberDoc = {
        exists: true,
      };

      const mockEvents = [
        {
          id: 'event1',
          data: () => ({
            title: 'Study Session',
            organizerId: 'organizer123',
            startDate: new Date(),
          }),
        },
      ];

      const mockRSVPs = {
        size: 5,
      };

      const mockUserRSVP = {
        exists: true,
        data: () => ({
          status: 'going',
        }),
      };

      mockDoc.mockImplementation((docId) => {
        if (docId === 'space123') {
          return {
            collection: vi.fn((collName) => {
              if (collName === 'members') {
                return {
                  doc: vi.fn(() => ({
                    get: vi.fn(async () => mockMemberDoc),
                  })),
                };
              }
              if (collName === 'events') {
                return {
                  orderBy: vi.fn(() => ({
                    where: vi.fn(() => ({
                      offset: vi.fn(() => ({
                        limit: vi.fn(() => ({
                          get: vi.fn(async () => ({ docs: mockEvents, size: 1 })),
                        })),
                      })),
                    })),
                  })),
                  doc: vi.fn(() => ({
                    collection: vi.fn(() => ({
                      where: vi.fn(() => ({
                        get: vi.fn(async () => mockRSVPs),
                      })),
                      doc: vi.fn(() => ({
                        get: vi.fn(async () => mockUserRSVP),
                      })),
                    })),
                  })),
                };
              }
              return {};
            }),
          };
        }
        if (docId === 'organizer123') {
          return {
            get: vi.fn(async () => ({
              exists: true,
              data: () => ({ fullName: 'Organizer', handle: 'organizer' }),
            })),
          };
        }
        return {};
      });

      const request = new NextRequest('http://localhost:3000/api/spaces/space123/events', {
        headers: { authorization: 'Bearer valid_token' },
      });
      const params = Promise.resolve({ spaceId: 'space123' });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(data.events[0].currentAttendees).toBe(5);
      expect(data.events[0].userRSVP).toBe('going');
    });
  });

  describe('Pagination', () => {
    it('should apply pagination offset and limit', async () => {
      const mockMemberDoc = {
        exists: true,
      };

      const offsetSpy = vi.fn(() => ({
        limit: vi.fn(() => ({
          get: vi.fn(async () => ({ docs: [], size: 0 })),
        })),
      }));

      const limitSpy = vi.fn(() => ({
        get: vi.fn(async () => ({ docs: [], size: 0 })),
      }));

      mockDoc.mockReturnValue({
        collection: vi.fn((collName) => {
          if (collName === 'members') {
            return {
              doc: vi.fn(() => ({
                get: vi.fn(async () => mockMemberDoc),
              })),
            };
          }
          if (collName === 'events') {
            return {
              orderBy: vi.fn(() => ({
                where: vi.fn(() => ({
                  offset: offsetSpy,
                })),
              })),
            };
          }
          return {};
        }),
      });

      const request = new NextRequest(
        'http://localhost:3000/api/spaces/space123/events?limit=10&offset=20',
        {
          headers: { authorization: 'Bearer valid_token' },
        }
      );
      const params = Promise.resolve({ spaceId: 'space123' });

      await GET(request, { params });

      expect(offsetSpy).toHaveBeenCalledWith(20);
    });
  });
});

describe('Space Events API - POST /api/spaces/[spaceId]/events', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Event Creation', () => {
    it('should create event with valid data', async () => {
      const mockMemberDoc = {
        exists: true,
      };

      const mockOrganizerDoc = {
        exists: true,
        data: () => ({
          fullName: 'John Doe',
          handle: 'johndoe',
          photoURL: 'https://example.com/photo.jpg',
        }),
      });

      const mockEventRef = {
        id: 'event123',
      };

      mockDoc.mockImplementation((docId) => {
        if (docId === 'space123') {
          return {
            collection: vi.fn((collName) => {
              if (collName === 'members') {
                return {
                  doc: vi.fn(() => ({
                    get: vi.fn(async () => mockMemberDoc),
                  })),
                };
              }
              if (collName === 'events') {
                return {
                  add: vi.fn(async () => mockEventRef),
                };
              }
              return {};
            }),
          };
        }
        if (docId === 'user123') {
          return {
            get: vi.fn(async () => mockOrganizerDoc),
          };
        }
        return {};
      });

      const eventData = {
        title: 'Study Session',
        description: 'Group study for midterms',
        type: 'academic',
        startDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() + 27 * 60 * 60 * 1000).toISOString(),
        location: 'Library Room 201',
      };

      const request = new NextRequest('http://localhost:3000/api/spaces/space123/events', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid_token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
      const params = Promise.resolve({ spaceId: 'space123' });

      const response = await POST(request, { params });
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.event).toBeDefined();
      expect(data.event.id).toBe('event123');
    });

    it('should validate end date is after start date', async () => {
      const mockMemberDoc = {
        exists: true,
      };

      mockDoc.mockReturnValue({
        collection: vi.fn(() => ({
          doc: vi.fn(() => ({
            get: vi.fn(async () => mockMemberDoc),
          })),
        })),
      });

      const invalidEventData = {
        title: 'Invalid Event',
        description: 'Test',
        type: 'social',
        startDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // Before start
      };

      const request = new NextRequest('http://localhost:3000/api/spaces/space123/events', {
        method: 'POST',
        headers: {
          authorization: 'Bearer valid_token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invalidEventData),
      });
      const params = Promise.resolve({ spaceId: 'space123' });

      const response = await POST(request, { params });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('End date must be after start date');
    });
  });
});
