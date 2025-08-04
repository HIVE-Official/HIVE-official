import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createMocks } from 'node-mocks-http';
import { GET } from '../../../app/api/feed/route';
import { GET as GetAlgorithm } from '../../../app/api/feed/algorithm/route';
import { POST as PostContentValidation } from '../../../app/api/feed/content-validation/route';

// Mock Firebase Admin
vi.mock('@/lib/firebase-admin', () => ({
  adminAuth: {
    verifyIdToken: vi.fn().mockResolvedValue({
      uid: 'test-user',
      email: 'test@test.edu',
    }),
  },
  adminDb: {
    collection: vi.fn(() => ({
      where: vi.fn().mockReturnThis(),
      orderBy: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      get: vi.fn().mockResolvedValue({
        empty: false,
        docs: [
          {
            id: 'post-1',
            data: () => ({
              type: 'space_activity',
              title: 'New member joined CS Study Group',
              content: 'John Doe joined the Computer Science Study Group',
              timestamp: new Date('2025-01-15T10:00:00Z'),
              authorId: 'user-123',
              spaceId: 'cs-study',
              visibility: 'public',
            }),
          },
          {
            id: 'post-2',
            data: () => ({
              type: 'tool_created',
              title: 'Grade Calculator Tool',
              content: 'A new tool for calculating semester grades',
              timestamp: new Date('2025-01-15T09:30:00Z'),
              authorId: 'user-456',
              toolId: 'grade-calc',
              visibility: 'public',
            }),
          },
        ],
      }),
      doc: vi.fn(() => ({
        get: vi.fn().mockResolvedValue({
          exists: true,
          data: () => ({
            name: 'Test User',
            avatar: 'https://example.com/avatar.jpg',
          }),
        }),
      })),
    })),
    doc: vi.fn(() => ({
      get: vi.fn().mockResolvedValue({
        exists: true,
        data: () => ({
          name: 'Test User',
          email: 'test@test.edu',
          spaces: ['cs-study'],
          interests: ['computer-science', 'mathematics'],
        }),
      }),
    })),
  },
}));

// Mock auth middleware
vi.mock('@/lib/auth-middleware', () => ({
  withAuth: vi.fn((handler) => handler),
}));

// Mock rate limiting
vi.mock('@/lib/rate-limit', () => ({
  rateLimit: vi.fn().mockResolvedValue(undefined),
}));

// Mock content validation
vi.mock('@/lib/content-validation', () => ({
  validateContent: vi.fn().mockResolvedValue({
    isValid: true,
    confidence: 0.95,
    flags: [],
  }),
  moderateContent: vi.fn().mockResolvedValue({
    action: 'approve',
    reason: 'Content meets community guidelines',
  }),
}));

// Mock feed aggregation
vi.mock('@/lib/feed-aggregation', () => ({
  aggregateFeed: vi.fn().mockResolvedValue([
    {
      id: 'post-1',
      type: 'space_activity',
      title: 'New member joined CS Study Group',
      content: 'John Doe joined the Computer Science Study Group',
      timestamp: new Date('2025-01-15T10:00:00Z'),
      author: { name: 'John Doe', avatar: null },
      space: { name: 'CS Study Group', id: 'cs-study' },
      relevanceScore: 0.8,
    },
    {
      id: 'post-2',
      type: 'tool_created',
      title: 'Grade Calculator Tool',
      content: 'A new tool for calculating semester grades',
      timestamp: new Date('2025-01-15T09:30:00Z'),
      author: { name: 'Jane Smith', avatar: 'https://example.com/jane.jpg' },
      tool: { name: 'Grade Calculator', id: 'grade-calc' },
      relevanceScore: 0.9,
    },
  ]),
  personalizeFeeds: vi.fn().mockImplementation((posts, userId) => 
    posts.sort((a: any, b: any) => b.relevanceScore - a.relevanceScore)
  ),
}));

describe('/api/feed Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('GET /api/feed', () => {
    it('returns personalized feed for authenticated user', async () => {
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token',
        },
        query: {
          limit: '10',
          offset: '0',
        },
      });

      const response = await GET(req as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.feed).toHaveLength(2);
      expect(data.feed[0].title).toBe('Grade Calculator Tool');
      expect(data.feed[0].relevanceScore).toBe(0.9);
    });

    it('applies filters correctly', async () => {
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token',
        },
        query: {
          type: 'space_activity',
          limit: '10',
        },
      });

      const response = await GET(req as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.feed.every((post: any) => post.type === 'space_activity')).toBe(true);
    });

    it('handles pagination correctly', async () => {
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token',
        },
        query: {
          limit: '1',
          offset: '1',
        },
      });

      const response = await GET(req as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.pagination).toEqual({
        limit: 1,
        offset: 1,
        hasMore: true,
        total: 2,
      });
    });

    it('handles empty feed gracefully', async () => {
      const mockAggregateFeeds = vi.mocked(require('@/lib/feed-aggregation').aggregateFeed);
      mockAggregateFeeds.mockResolvedValueOnce([]);

      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token',
        },
      });

      const response = await GET(req as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.feed).toHaveLength(0);
      expect(data.message).toBe('No posts found in your feed');
    });

    it('requires authentication', async () => {
      const { req } = createMocks({
        method: 'GET',
      });

      const response = await GET(req as any);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Authentication required');
    });

    it('handles database errors gracefully', async () => {
      const mockAggregateFeeds = vi.mocked(require('@/lib/feed-aggregation').aggregateFeed);
      mockAggregateFeeds.mockRejectedValueOnce(new Error('Database connection failed'));

      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token',
        },
      });

      const response = await GET(req as any);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to load feed');
    });
  });

  describe('GET /api/feed/algorithm', () => {
    it('returns algorithm insights for user', async () => {
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token',
        },
      });

      const response = await GetAlgorithm(req as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.algorithm).toBeDefined();
      expect(data.algorithm.personalityWeights).toBeDefined();
      expect(data.algorithm.interestScores).toBeDefined();
    });

    it('includes personalization factors', async () => {
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token',
        },
      });

      const response = await GetAlgorithm(req as any);
      const data = await response.json();

      expect(data.personalization).toBeDefined();
      expect(data.personalization.spaces).toContain('cs-study');
      expect(data.personalization.interests).toContain('computer-science');
    });

    it('provides algorithm transparency', async () => {
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token',
        },
      });

      const response = await GetAlgorithm(req as any);
      const data = await response.json();

      expect(data.explanation).toBeDefined();
      expect(data.explanation.factors).toBeInstanceOf(Array);
      expect(data.explanation.reasoning).toBeDefined();
    });
  });

  describe('POST /api/feed/content-validation', () => {
    it('validates content successfully', async () => {
      const { req } = createMocks({
        method: 'POST',
        headers: {
          authorization: 'Bearer test-token',
          'content-type': 'application/json',
        },
        body: {
          content: 'This is a test post for the study group',
          type: 'space_post',
          spaceId: 'cs-study',
        },
      });

      const response = await PostContentValidation(req as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.validation.isValid).toBe(true);
      expect(data.validation.confidence).toBeGreaterThan(0.8);
    });

    it('detects inappropriate content', async () => {
      const mockValidateContent = vi.mocked(require('@/lib/content-validation').validateContent);
      mockValidateContent.mockResolvedValueOnce({
        isValid: false,
        confidence: 0.95,
        flags: ['inappropriate-language', 'potential-harassment'],
      });

      const { req } = createMocks({
        method: 'POST',
        headers: {
          authorization: 'Bearer test-token',
          'content-type': 'application/json',
        },
        body: {
          content: 'Inappropriate content here',
          type: 'space_post',
          spaceId: 'cs-study',
        },
      });

      const response = await PostContentValidation(req as any);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.validation.isValid).toBe(false);
      expect(data.validation.flags).toContain('inappropriate-language');
    });

    it('handles content moderation workflow', async () => {
      const mockModerateContent = vi.mocked(require('@/lib/content-validation').moderateContent);
      mockModerateContent.mockResolvedValueOnce({
        action: 'require_review',
        reason: 'Content flagged for manual review',
        reviewerId: 'moderator-123',
      });

      const { req } = createMocks({
        method: 'POST',
        headers: {
          authorization: 'Bearer test-token',
          'content-type': 'application/json',
        },
        body: {
          content: 'Borderline content that needs review',
          type: 'space_post',
          spaceId: 'cs-study',
        },
      });

      const response = await PostContentValidation(req as any);
      const data = await response.json();

      expect(response.status).toBe(202);
      expect(data.moderation.action).toBe('require_review');
      expect(data.moderation.reviewerId).toBeDefined();
    });

    it('validates request payload', async () => {
      const { req } = createMocks({
        method: 'POST',
        headers: {
          authorization: 'Bearer test-token',
          'content-type': 'application/json',
        },
        body: {
          content: '', // Empty content
          type: 'invalid_type',
        },
      });

      const response = await PostContentValidation(req as any);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid request payload');
      expect(data.details).toContain('Content cannot be empty');
    });
  });

  describe('Rate Limiting', () => {
    it('enforces rate limits on feed requests', async () => {
      const mockRateLimit = vi.mocked(require('@/lib/rate-limit').rateLimit);
      mockRateLimit.mockRejectedValueOnce(new Error('Rate limit exceeded'));

      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token',
        },
      });

      const response = await GET(req as any);
      const data = await response.json();

      expect(response.status).toBe(429);
      expect(data.error).toBe('Rate limit exceeded');
    });
  });

  describe('Feed Caching', () => {
    it('returns cached results when available', async () => {
      // First request
      const { req: req1 } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token',
        },
      });

      const response1 = await GET(req1 as any);
      const data1 = await response1.json();

      // Second request (should use cache)
      const { req: req2 } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token',
        },
      });

      const response2 = await GET(req2 as any);
      const data2 = await response2.json();

      expect(response1.status).toBe(200);
      expect(response2.status).toBe(200);
      expect(data1.feed).toEqual(data2.feed);
    });
  });

  describe('Real-time Feed Updates', () => {
    it('handles real-time post additions', async () => {
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token',
          'x-real-time': 'true',
        },
        query: {
          since: new Date('2025-01-15T10:30:00Z').toISOString(),
        },
      });

      const response = await GET(req as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.realTime).toBe(true);
      expect(data.updates).toBeDefined();
    });
  });

  describe('Performance and Optimization', () => {
    it('handles large feed queries efficiently', async () => {
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token',
        },
        query: {
          limit: '100',
        },
      });

      const startTime = Date.now();
      const response = await GET(req as any);
      const endTime = Date.now();

      expect(response.status).toBe(200);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });

    it('includes performance metrics in response', async () => {
      const { req } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer test-token',
          'x-include-metrics': 'true',
        },
      });

      const response = await GET(req as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.metrics).toBeDefined();
      expect(data.metrics.queryTime).toBeTypeOf('number');
      expect(data.metrics.cacheHit).toBeTypeOf('boolean');
    });
  });
});