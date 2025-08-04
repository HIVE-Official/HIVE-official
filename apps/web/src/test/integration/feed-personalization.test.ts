import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

// Import the actual API route handlers
import { GET as feedGET, POST as feedPOST } from '../../app/api/feed/route';
import { GET as algorithmGET, POST as algorithmPOST } from '../../app/api/feed/algorithm/route';
import { GET as aggregationGET } from '../../app/api/feed/aggregation/route';
import { POST as contentValidationPOST } from '../../app/api/feed/content-validation/route';
import { GET as updatesGET } from '../../app/api/feed/updates/route';

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
    now: vi.fn(() => ({ toDate: () => new Date() })),
    fromDate: vi.fn((date) => ({ toDate: () => date }))
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

describe('Feed Personalization Integration Tests', () => {
  const mockUser = {
    uid: 'user-123',
    email: 'student@university.edu',
    displayName: 'Test Student'
  };

  const mockUserProfile = {
    userId: 'user-123',
    interests: ['computer-science', 'web-development', 'algorithms'],
    major: 'Computer Science',
    year: 2025,
    preferences: {
      contentTypes: ['discussions', 'announcements', 'tool_shares'],
      spaceTypes: ['academic', 'professional'],
      difficulty: 'intermediate',
      languages: ['javascript', 'python']
    },
    engagement: {
      totalInteractions: 156,
      averageSessionTime: 1200000,
      mostActiveHours: [9, 14, 19],
      topSpaces: ['space-123', 'space-456']
    }
  };

  const mockFeedItems = [
    {
      id: 'item-1',
      type: 'post',
      contentType: 'discussion',
      title: 'Algorithm Study Group Meeting',
      content: 'Join us for dynamic programming review',
      authorId: 'user-456',
      authorName: 'Alice Smith',
      spaceId: 'space-123',
      spaceName: 'CS Study Group',
      createdAt: '2024-01-15T10:00:00Z',
      engagement: { likes: 12, comments: 5, shares: 2 },
      tags: ['algorithms', 'study-group', 'dynamic-programming'],
      relevanceScore: 0.85,
      metadata: {
        difficulty: 'intermediate',
        estimatedReadTime: 180,
        category: 'academic'
      }
    },
    {
      id: 'item-2',
      type: 'tool_share',
      contentType: 'tool',
      title: 'Grade Calculator Tool',
      content: 'Calculate your GPA easily',
      authorId: 'user-789',
      authorName: 'Bob Johnson',
      spaceId: 'space-456',
      spaceName: 'Academic Tools',
      createdAt: '2024-01-15T09:30:00Z',
      engagement: { installs: 25, ratings: 4.7, views: 89 },
      tags: ['productivity', 'grades', 'calculator'],
      relevanceScore: 0.72,
      metadata: {
        toolType: 'educational',
        framework: 'react',
        difficulty: 'beginner'
      }
    },
    {
      id: 'item-3',
      type: 'announcement',
      contentType: 'announcement',
      title: 'New Lab Equipment Available',
      content: 'The robotics lab has new Arduino kits',
      authorId: 'faculty-123',
      authorName: 'Dr. Wilson',
      spaceId: 'space-789',
      spaceName: 'Robotics Lab',
      createdAt: '2024-01-15T08:45:00Z',
      engagement: { views: 234, bookmarks: 18 },
      tags: ['robotics', 'equipment', 'lab'],
      relevanceScore: 0.63,
      metadata: {
        priority: 'high',
        category: 'facility',
        expires: '2024-02-15T00:00:00Z'
      }
    }
  ];

  const mockAlgorithmConfig = {
    userId: 'user-123',
    version: '2.1.0',
    weights: {
      recency: 0.25,
      relevance: 0.35,
      engagement: 0.20,
      social: 0.15,
      diversity: 0.05
    },
    filters: {
      contentTypes: ['discussions', 'announcements', 'tool_shares'],
      minimumRelevanceScore: 0.3,
      excludeSpaces: [],
      includeOnlyFollowed: false
    },
    personalization: {
      interestBoost: 1.5,
      spaceAffinityBoost: 1.3,
      collaboratorBoost: 1.2,
      similarUserBoost: 1.1
    },
    updatedAt: '2024-01-15T12:00:00Z'
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
    vi.mocked(Timestamp.fromDate).mockImplementation((date) => ({ toDate: () => date } as any));

    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      id: 'user-123',
      data: () => mockUserProfile
    } as any);
    
    vi.mocked(setDoc).mockResolvedValue(undefined);
    vi.mocked(updateDoc).mockResolvedValue(undefined);
    vi.mocked(deleteDoc).mockResolvedValue(undefined);
    vi.mocked(addDoc).mockResolvedValue({ id: 'new-doc-123' } as any);
    
    vi.mocked(getDocs).mockResolvedValue({
      docs: mockFeedItems.map((item, i) => ({
        id: item.id,
        data: () => item
      })),
      size: mockFeedItems.length,
      empty: false
    } as any);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Personalized Feed Generation', () => {
    it('generates personalized feed based on user interests and behavior', async () => {
      const request = new NextRequest('http://localhost/api/feed?limit=10&personalized=true');

      const response = await feedGET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.items).toHaveLength(3);
      expect(responseData.items[0].relevanceScore).toBeGreaterThanOrEqual(0.8);
      
      // Items should be sorted by relevance score (highest first)
      expect(responseData.items[0].relevanceScore).toBeGreaterThanOrEqual(
        responseData.items[1].relevanceScore
      );

      // Should include personalization metadata
      expect(responseData.personalization).toEqual(
        expect.objectContaining({
          algorithm: 'hybrid_collaborative',
          version: expect.any(String),
          appliedFilters: expect.any(Array),
          processingTime: expect.any(Number)
        })
      );
    });

    it('applies content type filtering based on user preferences', async () => {
      const request = new NextRequest('http://localhost/api/feed?contentTypes=discussions,announcements');

      const response = await feedGET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.items.every((item: any) => 
        ['discussion', 'announcement'].includes(item.contentType)
      )).toBe(true);

      // Should exclude tool_shares
      expect(responseData.items.some((item: any) => 
        item.contentType === 'tool'
      )).toBe(false);
    });

    it('boosts content from user\'s top spaces', async () => {
      const request = new NextRequest('http://localhost/api/feed?spaceBoost=true');

      const response = await feedGET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      
      // Items from top spaces should have higher relevance scores
      const topSpaceItems = responseData.items.filter((item: any) => 
        mockUserProfile.engagement.topSpaces.includes(item.spaceId)
      );
      
      const otherItems = responseData.items.filter((item: any) => 
        !mockUserProfile.engagement.topSpaces.includes(item.spaceId)
      );

      if (topSpaceItems.length > 0 && otherItems.length > 0) {
        expect(topSpaceItems[0].relevanceScore).toBeGreaterThan(
          otherItems[0].relevanceScore * 0.9 // Allow some variance
        );
      }
    });

    it('provides diverse content to prevent filter bubbles', async () => {
      const request = new NextRequest('http://localhost/api/feed?diversity=high&limit=20');

      // Mock diverse content
      const diverseItems = [
        ...mockFeedItems,
        {
          id: 'item-4',
          type: 'post',
          contentType: 'discussion',
          title: 'Art History Discussion',
          spaceId: 'space-art',
          spaceName: 'Art History',
          tags: ['art', 'history', 'culture'],
          relevanceScore: 0.35, // Lower relevance but different topic
          metadata: { category: 'humanities' }
        }
      ];

      vi.mocked(getDocs).mockResolvedValueOnce({
        docs: diverseItems.map((item, i) => ({
          id: item.id,
          data: () => item
        })),
        size: diverseItems.length
      } as any);

      const response = await feedGET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      
      // Should include content outside user's main interests
      const categories = responseData.items.map((item: any) => item.metadata?.category);
      const uniqueCategories = [...new Set(categories)];
      expect(uniqueCategories.length).toBeGreaterThan(1);
    });

    it('handles real-time feed updates', async () => {
      const request = new NextRequest('http://localhost/api/feed/updates?since=2024-01-15T12:00:00Z');

      // Mock recent updates
      const recentItems = [
        {
          id: 'item-new-1',
          type: 'post',
          title: 'Breaking: New Course Schedule Released',
          createdAt: '2024-01-15T12:30:00Z',
          updateType: 'new_content',
          priority: 'high'
        }
      ];

      vi.mocked(getDocs).mockResolvedValueOnce({
        docs: recentItems.map(item => ({
          id: item.id,
          data: () => item
        })),
        size: recentItems.length
      } as any);

      const response = await updatesGET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.updates).toHaveLength(1);
      expect(responseData.updates[0].updateType).toBe('new_content');
      expect(responseData.hasUpdates).toBe(true);
    });

    it('implements temporal filtering for fresh content', async () => {
      const request = new NextRequest('http://localhost/api/feed?freshness=24h&maxAge=168h');

      const response = await feedGET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      
      // All items should be within the specified time range
      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      responseData.items.forEach((item: any) => {
        const itemDate = new Date(item.createdAt);
        expect(itemDate.getTime()).toBeGreaterThan(oneWeekAgo.getTime());
      });
    });
  });

  describe('Feed Algorithm Management', () => {
    it('retrieves current algorithm configuration', async () => {
      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockAlgorithmConfig
      } as any);

      const request = new NextRequest('http://localhost/api/feed/algorithm');

      const response = await algorithmGET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.algorithm.version).toBe('2.1.0');
      expect(responseData.algorithm.weights.relevance).toBe(0.35);
      expect(responseData.algorithm.personalization.interestBoost).toBe(1.5);
    });

    it('updates algorithm weights and configuration', async () => {
      const newWeights = {
        recency: 0.30,
        relevance: 0.40,
        engagement: 0.15,
        social: 0.10,
        diversity: 0.05
      };

      const request = new NextRequest('http://localhost/api/feed/algorithm', {
        method: 'POST',
        body: JSON.stringify({
          weights: newWeights,
          filters: {
            minimumRelevanceScore: 0.4,
            contentTypes: ['discussions', 'tools']
          }
        })
      });

      const response = await algorithmPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.algorithm.weights.recency).toBe(0.30);

      // Verify weights sum to 1.0
      const weightSum = Object.values(responseData.algorithm.weights).reduce((a: number, b: number) => a + b, 0);
      expect(Math.abs(weightSum - 1.0)).toBeLessThan(0.001);

      // Verify configuration was saved
      expect(vi.mocked(setDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          userId: mockUser.uid,
          weights: newWeights,
          updatedAt: expect.any(String)
        })
      );
    });

    it('validates algorithm configuration changes', async () => {
      const invalidWeights = {
        recency: 0.50,
        relevance: 0.60, // Sum > 1.0
        engagement: 0.20
      };

      const request = new NextRequest('http://localhost/api/feed/algorithm', {
        method: 'POST',
        body: JSON.stringify({ weights: invalidWeights })
      });

      const response = await algorithmPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.error).toContain('weights must sum to 1.0');
    });

    it('provides algorithm performance analytics', async () => {
      const request = new NextRequest('http://localhost/api/feed/algorithm?analytics=true');

      vi.mocked(getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => ({
          ...mockAlgorithmConfig,
          performance: {
            clickThroughRate: 0.12,
            engagementRate: 0.08,
            timeSpent: 156000,
            diversityScore: 0.73,
            userSatisfaction: 4.2
          }
        })
      } as any);

      const response = await algorithmGET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.algorithm.performance).toBeDefined();
      expect(responseData.algorithm.performance.clickThroughRate).toBe(0.12);
      expect(responseData.algorithm.performance.diversityScore).toBe(0.73);
    });
  });

  describe('Content Aggregation and Processing', () => {
    it('aggregates content from multiple sources', async () => {
      const request = new NextRequest('http://localhost/api/feed/aggregation?sources=spaces,tools,announcements');

      const aggregatedContent = {
        spaces: mockFeedItems.filter(item => item.type === 'post'),
        tools: mockFeedItems.filter(item => item.type === 'tool_share'),
        announcements: mockFeedItems.filter(item => item.type === 'announcement'),
        metadata: {
          totalItems: mockFeedItems.length,
          processingTime: 145,
          lastUpdate: '2024-01-15T12:00:00Z'
        }
      };

      vi.mocked(getDocs)
        .mockResolvedValueOnce({ // Spaces content
          docs: mockFeedItems.filter(item => item.type === 'post').map(item => ({
            id: item.id,
            data: () => item
          })),
          size: 1
        } as any)
        .mockResolvedValueOnce({ // Tools content
          docs: mockFeedItems.filter(item => item.type === 'tool_share').map(item => ({
            id: item.id,
            data: () => item
          })),
          size: 1
        } as any)
        .mockResolvedValueOnce({ // Announcements content
          docs: mockFeedItems.filter(item => item.type === 'announcement').map(item => ({
            id: item.id,
            data: () => item
          })),
          size: 1
        } as any);

      const response = await aggregationGET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.aggregation.spaces).toHaveLength(1);
      expect(responseData.aggregation.tools).toHaveLength(1);
      expect(responseData.aggregation.announcements).toHaveLength(1);
      expect(responseData.aggregation.metadata.totalItems).toBe(3);
    });

    it('validates content before inclusion in feed', async () => {
      const contentToValidate = {
        title: 'Study Group Meeting',
        content: 'Join us for algorithms review session',
        type: 'discussion',
        spaceId: 'space-123',
        tags: ['algorithms', 'study-group']
      };

      const request = new NextRequest('http://localhost/api/feed/content-validation', {
        method: 'POST',
        body: JSON.stringify({
          content: contentToValidate,
          rules: ['spam_detection', 'quality_check', 'relevance_filter']
        })
      });

      const response = await contentValidationPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.validation.isValid).toBe(true);
      expect(responseData.validation.score).toBeGreaterThan(0.5);
      expect(responseData.validation.checks.spam_detection).toBe('passed');
      expect(responseData.validation.checks.quality_check).toBe('passed');
    });

    it('rejects low-quality or spam content', async () => {
      const spamContent = {
        title: 'BUY CHEAP TEXTBOOKS NOW!!!',
        content: 'Click here for amazing deals! Visit spam-site.com',
        type: 'discussion',
        spaceId: 'space-123'
      };

      const request = new NextRequest('http://localhost/api/feed/content-validation', {
        method: 'POST',
        body: JSON.stringify({
          content: spamContent,
          rules: ['spam_detection', 'quality_check']
        })
      });

      const response = await contentValidationPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.validation.isValid).toBe(false);
      expect(responseData.validation.checks.spam_detection).toBe('failed');
      expect(responseData.validation.reasons).toContain('promotional_content');
    });

    it('calculates content relevance scores accurately', async () => {
      const testContent = {
        title: 'Advanced Algorithms Workshop',
        content: 'Deep dive into dynamic programming and graph algorithms',
        tags: ['algorithms', 'computer-science', 'workshop'],
        spaceId: 'space-123',
        authorId: 'user-456'
      };

      const request = new NextRequest('http://localhost/api/feed/content-validation', {
        method: 'POST',
        body: JSON.stringify({
          content: testContent,
          calculateRelevance: true,
          userContext: {
            interests: mockUserProfile.interests,
            major: mockUserProfile.major,
            topSpaces: mockUserProfile.engagement.topSpaces
          }
        })
      });

      const response = await contentValidationPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.validation.relevanceScore).toBeGreaterThan(0.7);
      expect(responseData.validation.relevanceFactors).toEqual(
        expect.objectContaining({
          interestMatch: expect.any(Number),
          spaceAffinity: expect.any(Number),
          topicRelevance: expect.any(Number)
        })
      );
    });
  });

  describe('Feed Customization and Preferences', () => {
    it('allows users to customize feed preferences', async () => {
      const newPreferences = {
        contentTypes: ['discussions', 'tools'],
        difficulty: 'advanced',
        languages: ['python', 'rust'],
        notification: {
          newContent: true,
          mentions: true,
          spaceUpdates: false
        }
      };

      const request = new NextRequest('http://localhost/api/feed', {
        method: 'POST',
        body: JSON.stringify({
          action: 'update_preferences',
          preferences: newPreferences
        })
      });

      const response = await feedPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.preferences.difficulty).toBe('advanced');

      // Verify preferences were saved
      expect(vi.mocked(updateDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          'preferences.contentTypes': ['discussions', 'tools'],
          'preferences.difficulty': 'advanced',
          'preferences.languages': ['python', 'rust']
        })
      );
    });

    it('provides feed insights and recommendations', async () => {
      const request = new NextRequest('http://localhost/api/feed?insights=true');

      const response = await feedGET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.insights).toEqual(
        expect.objectContaining({
          engagementTrends: expect.any(Object),
          topInterests: expect.any(Array),
          recommendedSpaces: expect.any(Array),
          contentGaps: expect.any(Array),
          optimalPostTimes: expect.any(Array)
        })
      );
    });

    it('handles user feedback for feed improvement', async () => {
      const feedback = {
        itemId: 'item-1',
        feedback: 'not_interested',
        reason: 'topic_mismatch',
        context: {
          position: 1,
          sessionId: 'session-123'
        }
      };

      const request = new NextRequest('http://localhost/api/feed', {
        method: 'POST',
        body: JSON.stringify({
          action: 'feedback',
          ...feedback
        })
      });

      const response = await feedPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);

      // Verify feedback was recorded
      expect(vi.mocked(addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          userId: mockUser.uid,
          itemId: 'item-1',
          feedback: 'not_interested',
          reason: 'topic_mismatch',
          timestamp: expect.any(String)
        })
      );
    });
  });

  describe('Performance and Caching', () => {
    it('implements efficient feed caching', async () => {
      const request = new NextRequest('http://localhost/api/feed?limit=20');

      // First request
      const response1 = await feedGET(request);
      expect(response1.status).toBe(200);

      // Second request should use cache
      const response2 = await feedGET(request);
      expect(response2.status).toBe(200);
      expect(response2.headers.get('X-Cache-Status')).toBe('hit');
    });

    it('handles feed generation performance optimization', async () => {
      const startTime = Date.now();
      
      const request = new NextRequest('http://localhost/api/feed?limit=50&personalized=true');

      const response = await feedGET(request);
      const responseData = await response.json();
      
      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(response.status).toBe(200);
      expect(duration).toBeLessThan(2000); // Should complete within 2 seconds
      expect(responseData.performance).toEqual(
        expect.objectContaining({
          processingTime: expect.any(Number),
          itemsEvaluated: expect.any(Number),
          cacheHitRate: expect.any(Number)
        })
      );
    });

    it('provides pagination for large feed sets', async () => {
      const request = new NextRequest('http://localhost/api/feed?limit=10&cursor=item-cursor-123');

      const response = await feedGET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.pagination).toEqual(
        expect.objectContaining({
          hasMore: expect.any(Boolean),
          nextCursor: expect.any(String),
          totalCount: expect.any(Number)
        })
      );
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('handles empty feed gracefully', async () => {
      vi.mocked(getDocs).mockResolvedValue({
        docs: [],
        size: 0,
        empty: true
      } as any);

      const request = new NextRequest('http://localhost/api/feed');

      const response = await feedGET(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.items).toHaveLength(0);
      expect(responseData.message).toBe('No content available');
    });

    it('handles database failures during feed generation', async () => {
      vi.mocked(getDocs).mockRejectedValue(new Error('Database connection failed'));

      const request = new NextRequest('http://localhost/api/feed');

      const response = await feedGET(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to generate feed');
      expect(consoleSpy.error).toHaveBeenCalled();
    });

    it('validates feed parameters', async () => {
      const invalidRequests = [
        new NextRequest('http://localhost/api/feed?limit=1000'), // Too high
        new NextRequest('http://localhost/api/feed?limit=-5'),   // Negative
        new NextRequest('http://localhost/api/feed?contentTypes=invalid'), // Invalid type
      ];

      for (const request of invalidRequests) {
        const response = await feedGET(request);
        expect(response.status).toBe(400);
      }
    });

    it('handles malformed algorithm updates', async () => {
      const request = new NextRequest('http://localhost/api/feed/algorithm', {
        method: 'POST',
        body: 'invalid json'
      });

      const response = await algorithmPOST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Failed to update algorithm');
    });

    it('manages concurrent feed requests efficiently', async () => {
      const requests = Array(10).fill(null).map(() =>
        feedGET(new NextRequest('http://localhost/api/feed?limit=10'))
      );

      const responses = await Promise.all(requests);

      // All requests should succeed
      responses.forEach(response => {
        expect(response.status).toBe(200);
      });

      // Should not overwhelm the database
      expect(vi.mocked(getDocs)).toHaveBeenCalledTimes(10);
    });
  });
});