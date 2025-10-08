/**
 * Post Comments API Test Suite
 * Tests: GET/POST /api/spaces/[spaceId]/posts/[postId]/comments
 *
 * Critical for:
 * - Threaded comment retrieval
 * - Nested reply support
 * - Comment creation with membership check
 * - Comment count updates on posts
 * - Author info enrichment
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET, POST } from '@/app/api/spaces/[spaceId]/posts/[postId]/comments/route';
import { NextRequest } from 'next/server';

// Mock Firebase Admin
const mockGet = vi.fn();
const mockAdd = vi.fn();
const mockUpdate = vi.fn();
const mockCollection = vi.fn();
const mockDoc = vi.fn();
const mockOrderBy = vi.fn();

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

vi.mock('firebase-admin', () => ({
  firestore: {
    FieldValue: {
      increment: vi.fn((value) => ({ _increment: value })),
    },
  },
}));

vi.mock('@/lib/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Post Comments API - GET /api/spaces/[spaceId]/posts/[postId]/comments', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Authentication & Authorization', () => {
    it('should require authentication', async () => {
      const request = new NextRequest(
        'http://localhost:3000/api/spaces/space123/posts/post123/comments'
      );
      const params = Promise.resolve({ spaceId: 'space123', postId: 'post123' });

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

      const request = new NextRequest(
        'http://localhost:3000/api/spaces/space123/posts/post123/comments',
        {
          headers: { authorization: 'Bearer valid_token' },
        }
      );
      const params = Promise.resolve({ spaceId: 'space123', postId: 'post123' });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.error).toContain('Not a member');
    });

    it('should verify post exists', async () => {
      const mockMemberDoc = {
        exists: true,
      };

      const mockPostDoc = {
        exists: false,
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
              if (collName === 'posts') {
                return {
                  doc: vi.fn(() => ({
                    get: vi.fn(async () => mockPostDoc),
                  })),
                };
              }
              return {};
            }),
          };
        }
        return {};
      });

      const request = new NextRequest(
        'http://localhost:3000/api/spaces/space123/posts/nonexistent/comments',
        {
          headers: { authorization: 'Bearer valid_token' },
        }
      );
      const params = Promise.resolve({ spaceId: 'space123', postId: 'nonexistent' });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toContain('Post not found');
    });
  });

  describe('Comment Retrieval', () => {
    it('should fetch comments with author info', async () => {
      const mockMemberDoc = {
        exists: true,
      };

      const mockPostDoc = {
        exists: true,
      };

      const mockComments = [
        {
          id: 'comment1',
          data: () => ({
            content: 'Great post!',
            authorId: 'author1',
            createdAt: new Date(),
            isDeleted: false,
          }),
        },
      ];

      const mockAuthorDoc = {
        exists: true,
        data: () => ({
          fullName: 'Jane Doe',
          handle: 'janedoe',
          photoURL: 'https://example.com/photo.jpg',
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
              if (collName === 'posts') {
                return {
                  doc: vi.fn(() => ({
                    get: vi.fn(async () => mockPostDoc),
                    collection: vi.fn(() => ({
                      orderBy: vi.fn(() => ({
                        get: vi.fn(async () => ({
                          docs: mockComments,
                        })),
                      })),
                    })),
                  })),
                };
              }
              return {};
            }),
          };
        }
        if (docId === 'author1') {
          return {
            get: vi.fn(async () => mockAuthorDoc),
          };
        }
        return {};
      });

      const request = new NextRequest(
        'http://localhost:3000/api/spaces/space123/posts/post123/comments',
        {
          headers: { authorization: 'Bearer valid_token' },
        }
      );
      const params = Promise.resolve({ spaceId: 'space123', postId: 'post123' });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.comments).toBeDefined();
      expect(data.comments.length).toBe(1);
      expect(data.comments[0].author.handle).toBe('janedoe');
    });

    it('should nest replies under parent comments', async () => {
      const mockMemberDoc = {
        exists: true,
      };

      const mockPostDoc = {
        exists: true,
      };

      const mockComments = [
        {
          id: 'comment1',
          data: () => ({
            content: 'Parent comment',
            authorId: 'author1',
            createdAt: new Date(),
            parentCommentId: null,
          }),
        },
        {
          id: 'comment2',
          data: () => ({
            content: 'Reply to comment1',
            authorId: 'author2',
            createdAt: new Date(),
            parentCommentId: 'comment1',
          }),
        },
      ];

      const mockAuthorDoc = {
        exists: true,
        data: () => ({
          fullName: 'Test User',
          handle: 'testuser',
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
              if (collName === 'posts') {
                return {
                  doc: vi.fn(() => ({
                    get: vi.fn(async () => mockPostDoc),
                    collection: vi.fn(() => ({
                      orderBy: vi.fn(() => ({
                        get: vi.fn(async () => ({
                          docs: mockComments,
                        })),
                      })),
                    })),
                  })),
                };
              }
              return {};
            }),
          };
        }
        return {
          get: vi.fn(async () => mockAuthorDoc),
        };
      });

      const request = new NextRequest(
        'http://localhost:3000/api/spaces/space123/posts/post123/comments',
        {
          headers: { authorization: 'Bearer valid_token' },
        }
      );
      const params = Promise.resolve({ spaceId: 'space123', postId: 'post123' });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(data.comments.length).toBe(1); // Only parent comments at top level
      expect(data.comments[0].replies).toBeDefined();
      expect(data.comments[0].replies.length).toBe(1);
    });
  });
});

describe('Post Comments API - POST /api/spaces/[spaceId]/posts/[postId]/comments', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Comment Creation', () => {
    it('should create comment with valid data', async () => {
      const mockMemberDoc = {
        exists: true,
      };

      const mockPostDoc = {
        exists: true,
      };

      const mockUserDoc = {
        exists: true,
        data: () => ({
          fullName: 'John Doe',
          handle: 'johndoe',
          photoURL: 'https://example.com/photo.jpg',
        }),
      };

      const mockCommentRef = {
        id: 'comment123',
      };

      const mockPostRef = {
        update: vi.fn(async () => {}),
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
              if (collName === 'posts') {
                return {
                  doc: vi.fn(() => ({
                    get: vi.fn(async () => mockPostDoc),
                    collection: vi.fn(() => ({
                      add: vi.fn(async () => mockCommentRef),
                    })),
                    update: mockPostRef.update,
                  })),
                };
              }
              return {};
            }),
          };
        }
        if (docId === 'user123') {
          return {
            get: vi.fn(async () => mockUserDoc),
          };
        }
        return {};
      });

      const request = new NextRequest(
        'http://localhost:3000/api/spaces/space123/posts/post123/comments',
        {
          method: 'POST',
          headers: {
            authorization: 'Bearer valid_token',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: 'This is a test comment',
          }),
        }
      );
      const params = Promise.resolve({ spaceId: 'space123', postId: 'post123' });

      const response = await POST(request, { params });
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.id).toBe('comment123');
      expect(data.content).toBe('This is a test comment');
      expect(data.author.handle).toBe('johndoe');
    });

    it('should validate content length (max 1000 chars)', async () => {
      const mockMemberDoc = {
        exists: true,
      };

      const mockPostDoc = {
        exists: true,
      };

      mockDoc.mockReturnValue({
        collection: vi.fn((collName) => {
          if (collName === 'members') {
            return {
              doc: vi.fn(() => ({
                get: vi.fn(async () => mockMemberDoc),
              })),
            };
          }
          if (collName === 'posts') {
            return {
              doc: vi.fn(() => ({
                get: vi.fn(async () => mockPostDoc),
              })),
            };
          }
          return {};
        }),
      });

      const longContent = 'a'.repeat(1001);
      const request = new NextRequest(
        'http://localhost:3000/api/spaces/space123/posts/post123/comments',
        {
          method: 'POST',
          headers: {
            authorization: 'Bearer valid_token',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: longContent,
          }),
        }
      );
      const params = Promise.resolve({ spaceId: 'space123', postId: 'post123' });

      const response = await POST(request, { params });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('Invalid comment data');
    });

    it('should update post comment count', async () => {
      const mockMemberDoc = {
        exists: true,
      };

      const mockPostDoc = {
        exists: true,
      };

      const mockUserDoc = {
        exists: true,
        data: () => ({
          fullName: 'John Doe',
          handle: 'johndoe',
        }),
      };

      const mockCommentRef = {
        id: 'comment123',
      };

      const updateSpy = vi.fn(async () => {});

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
              if (collName === 'posts') {
                return {
                  doc: vi.fn(() => ({
                    get: vi.fn(async () => mockPostDoc),
                    collection: vi.fn(() => ({
                      add: vi.fn(async () => mockCommentRef),
                    })),
                    update: updateSpy,
                  })),
                };
              }
              return {};
            }),
          };
        }
        if (docId === 'user123') {
          return {
            get: vi.fn(async () => mockUserDoc),
          };
        }
        return {};
      });

      const request = new NextRequest(
        'http://localhost:3000/api/spaces/space123/posts/post123/comments',
        {
          method: 'POST',
          headers: {
            authorization: 'Bearer valid_token',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: 'Test comment',
          }),
        }
      );
      const params = Promise.resolve({ spaceId: 'space123', postId: 'post123' });

      await POST(request, { params });

      expect(updateSpy).toHaveBeenCalled();
      const updateCall = updateSpy.mock.calls[0][0];
      expect(updateCall.commentCount).toBeDefined();
      expect(updateCall.lastActivity).toBeDefined();
    });

    it('should support nested replies', async () => {
      const mockMemberDoc = {
        exists: true,
      };

      const mockPostDoc = {
        exists: true,
      };

      const mockParentCommentDoc = {
        exists: true,
      };

      const mockUserDoc = {
        exists: true,
        data: () => ({
          fullName: 'John Doe',
          handle: 'johndoe',
        }),
      };

      const mockCommentRef = {
        id: 'reply123',
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
              if (collName === 'posts') {
                return {
                  doc: vi.fn(() => ({
                    get: vi.fn(async () => mockPostDoc),
                    collection: vi.fn(() => ({
                      doc: vi.fn(() => ({
                        get: vi.fn(async () => mockParentCommentDoc),
                      })),
                      add: vi.fn(async () => mockCommentRef),
                    })),
                    update: vi.fn(async () => {}),
                  })),
                };
              }
              return {};
            }),
          };
        }
        if (docId === 'user123') {
          return {
            get: vi.fn(async () => mockUserDoc),
          };
        }
        return {};
      });

      const request = new NextRequest(
        'http://localhost:3000/api/spaces/space123/posts/post123/comments',
        {
          method: 'POST',
          headers: {
            authorization: 'Bearer valid_token',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: 'Reply to parent comment',
            parentCommentId: 'parent123',
          }),
        }
      );
      const params = Promise.resolve({ spaceId: 'space123', postId: 'post123' });

      const response = await POST(request, { params });
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.parentCommentId).toBe('parent123');
    });

    it('should return 404 if parent comment does not exist', async () => {
      const mockMemberDoc = {
        exists: true,
      };

      const mockPostDoc = {
        exists: true,
      };

      const mockParentCommentDoc = {
        exists: false,
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
              if (collName === 'posts') {
                return {
                  doc: vi.fn(() => ({
                    get: vi.fn(async () => mockPostDoc),
                    collection: vi.fn(() => ({
                      doc: vi.fn(() => ({
                        get: vi.fn(async () => mockParentCommentDoc),
                      })),
                    })),
                  })),
                };
              }
              return {};
            }),
          };
        }
        return {};
      });

      const request = new NextRequest(
        'http://localhost:3000/api/spaces/space123/posts/post123/comments',
        {
          method: 'POST',
          headers: {
            authorization: 'Bearer valid_token',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: 'Reply to nonexistent comment',
            parentCommentId: 'nonexistent',
          }),
        }
      );
      const params = Promise.resolve({ spaceId: 'space123', postId: 'post123' });

      const response = await POST(request, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toContain('Parent comment not found');
    });
  });
});
