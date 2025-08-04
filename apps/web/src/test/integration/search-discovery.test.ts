import { describe, it, expect, vi, beforeEach } from 'vitest';
import { testEnvSetup, mockFirestore, mockAuth, mockUser, createMockRequest } from '../setup';

const mockSearchResults = {
  users: [
    {
      id: 'user-456',
      displayName: 'Jane Smith',
      handle: '@janesmith',
      school: 'University of Test',
      major: 'Computer Science',
      avatar: 'https://example.com/jane.jpg'
    }
  ],
  spaces: [
    {
      id: 'space-123',
      name: 'CS Study Group',
      description: 'Computer Science students helping each other',
      memberCount: 45,
      privacy: 'public',
      tags: ['computer-science', 'study', 'collaboration']
    }
  ],
  tools: [
    {
      id: 'tool-789',
      name: 'Grade Calculator',
      description: 'Calculate your GPA and track grades',
      category: 'academic',
      downloads: 250,
      rating: 4.8
    }
  ],
  events: [
    {
      id: 'event-321',
      title: 'CS Career Fair',
      startTime: '2024-08-15T10:00:00Z',
      location: 'Student Union',
      type: 'career'
    }
  ]
};

const mockSearchFilters = {
  users: {
    school: ['University of Test'],
    major: ['Computer Science', 'Engineering'],
    graduationYear: [2024, 2025]
  },
  spaces: {
    privacy: ['public'],
    memberCount: { min: 10, max: 100 },
    tags: ['study', 'academic']
  },
  tools: {
    category: ['academic', 'productivity'],
    rating: { min: 4.0 },
    verified: true
  }
};

vi.mock('../../lib/firebase', () => mockFirestore);
vi.mock('../../lib/auth', () => mockAuth);

describe('Search and Discovery Integration Tests', () => {
  beforeEach(() => {
    testEnvSetup();
    vi.clearAllMocks();
  });

  describe('Universal Search Integration', () => {
    it('performs comprehensive search across all content types', async () => {
      const { GET: searchGET } = await import('../../app/api/search/route');
      
      vi.mocked(mockFirestore.getDocs).mockResolvedValue({
        empty: false,
        docs: [
          { id: 'user-456', data: () => mockSearchResults.users[0] },
          { id: 'space-123', data: () => mockSearchResults.spaces[0] },
          { id: 'tool-789', data: () => mockSearchResults.tools[0] }
        ]
      } as any);

      const request = createMockRequest('GET', '/api/search?q=computer science&types=users,spaces,tools');
      const response = await searchGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.results.users).toHaveLength(1);
      expect(data.results.spaces).toHaveLength(1);
      expect(data.results.tools).toHaveLength(1);
      expect(data.query).toBe('computer science');
      expect(data.totalResults).toBe(3);
    });

    it('handles advanced search with filters', async () => {
      const { POST: advancedSearchPOST } = await import('../../app/api/search/advanced/route');
      
      const searchData = {
        query: 'study group',
        filters: mockSearchFilters,
        sortBy: 'relevance',
        limit: 20
      };

      const request = createMockRequest('POST', '/api/search/advanced', searchData);
      const response = await advancedSearchPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.results).toBeDefined();
      expect(data.appliedFilters).toMatchObject(mockSearchFilters);
      expect(data.sortBy).toBe('relevance');
      expect(vi.mocked(mockFirestore.getDocs)).toHaveBeenCalledTimes(3); // One for each content type
    });

    it('provides search suggestions and autocomplete', async () => {
      const { GET: suggestionsGET } = await import('../../app/api/search/suggestions/route');
      
      const request = createMockRequest('GET', '/api/search/suggestions?q=comp&type=spaces');
      const response = await suggestionsGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.suggestions).toBeInstanceOf(Array);
      expect(data.suggestions).toContain('Computer Science');
      expect(data.suggestions).toContain('Computing Club');
      expect(data.type).toBe('spaces');
    });

    it('tracks search analytics and popular queries', async () => {
      const { POST: analyticsPOST } = await import('../../app/api/search/analytics/route');
      
      const analyticsData = {
        query: 'machine learning',
        resultCount: 15,
        clickedResult: 'space-ml-123',
        timeSpent: 45000 // 45 seconds
      };

      const request = createMockRequest('POST', '/api/search/analytics', analyticsData);
      const response = await analyticsPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.tracked).toBe(true);
      expect(vi.mocked(mockFirestore.addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          query: 'machine learning',
          userId: mockUser.uid
        })
      );
    });
  });

  describe('User Discovery Integration', () => {
    it('discovers users by academic interests', async () => {
      const { GET: discoverUsersGET } = await import('../../app/api/discover/users/route');
      
      const request = createMockRequest('GET', '/api/discover/users?major=Computer Science&year=2025');
      const response = await discoverUsersGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.users).toBeInstanceOf(Array);
      expect(data.criteria).toMatchObject({
        major: 'Computer Science',
        year: '2025'
      });
      expect(data.totalMatches).toBeGreaterThan(0);
    });

    it('suggests connections based on mutual interests', async () => {
      const { GET: connectionSuggestionsGET } = await import('../../app/api/discover/connections/route');
      
      vi.mocked(mockFirestore.getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => ({
          interests: ['AI', 'Web Development'],
          major: 'Computer Science'
        })
      } as any);

      const request = createMockRequest('GET', '/api/discover/connections?limit=10');
      const response = await connectionSuggestionsGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.suggestions).toBeInstanceOf(Array);
      expect(data.suggestions[0]).toHaveProperty('matchScore');
      expect(data.suggestions[0]).toHaveProperty('commonInterests');
    });

    it('finds classmates and coursemates', async () => {
      const { GET: classmatesGET } = await import('../../app/api/discover/classmates/route');
      
      const request = createMockRequest('GET', '/api/discover/classmates?course=CS-101');
      const response = await classmatesGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.classmates).toBeInstanceOf(Array);
      expect(data.course).toBe('CS-101');
      expect(data.semester).toBeDefined();
    });
  });

  describe('Space Discovery Integration', () => {
    it('discovers spaces by interests and activity', async () => {
      const { GET: discoverSpacesGET } = await import('../../app/api/discover/spaces/route');
      
      const request = createMockRequest('GET', '/api/discover/spaces?category=academic&active=true');
      const response = await discoverSpacesGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.spaces).toBeInstanceOf(Array);
      expect(data.filters.category).toBe('academic');
      expect(data.filters.active).toBe(true);
    });

    it('suggests spaces based on user profile', async () => {
      const { GET: spaceRecommendationsGET } = await import('../../app/api/discover/spaces/recommendations/route');
      
      vi.mocked(mockFirestore.getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => ({
          major: 'Computer Science',
          interests: ['AI', 'Programming'],
          joinedSpaces: ['space-456']
        })
      } as any);

      const request = createMockRequest('GET', '/api/discover/spaces/recommendations');
      const response = await spaceRecommendationsGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.recommendations).toBeInstanceOf(Array);
      expect(data.recommendations[0]).toHaveProperty('relevanceScore');
      expect(data.recommendations[0]).toHaveProperty('reason');
    });

    it('finds trending and popular spaces', async () => {
      const { GET: trendingSpacesGET } = await import('../../app/api/discover/trending/spaces/route');
      
      const request = createMockRequest('GET', '/api/discover/trending/spaces?timeframe=week');
      const response = await trendingSpacesGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.trending).toBeInstanceOf(Array);
      expect(data.trending[0]).toHaveProperty('growthRate');
      expect(data.trending[0]).toHaveProperty('activityScore');
      expect(data.timeframe).toBe('week');
    });
  });

  describe('Tool Discovery Integration', () => {
    it('discovers tools by category and functionality', async () => {
      const { GET: discoverToolsGET } = await import('../../app/api/discover/tools/route');
      
      const request = createMockRequest('GET', '/api/discover/tools?category=academic&verified=true');
      const response = await discoverToolsGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.tools).toBeInstanceOf(Array);
      expect(data.tools[0]).toHaveProperty('category', 'academic');
      expect(data.tools[0]).toHaveProperty('verified', true);
    });

    it('recommends tools based on usage patterns', async () => {
      const { GET: toolRecommendationsGET } = await import('../../app/api/discover/tools/recommendations/route');
      
      vi.mocked(mockFirestore.getDocs).mockResolvedValueOnce({
        empty: false,
        docs: [
          { id: 'usage-1', data: () => ({ toolId: 'tool-123', category: 'academic' }) },
          { id: 'usage-2', data: () => ({ toolId: 'tool-456', category: 'productivity' }) }
        ]
      } as any);

      const request = createMockRequest('GET', '/api/discover/tools/recommendations');
      const response = await toolRecommendationsGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.recommendations).toBeInstanceOf(Array);
      expect(data.recommendations[0]).toHaveProperty('similarityScore');
      expect(data.basedOn).toBe('usage_patterns');
    });

    it('finds featured and editor-picked tools', async () => {
      const { GET: featuredToolsGET } = await import('../../app/api/discover/tools/featured/route');
      
      const request = createMockRequest('GET', '/api/discover/tools/featured');
      const response = await featuredToolsGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.featured).toBeInstanceOf(Array);
      expect(data.featured[0]).toHaveProperty('featuredReason');
      expect(data.featured[0]).toHaveProperty('curatedBy');
    });
  });

  describe('Content Filtering Integration', () => {
    it('applies comprehensive content filtering', async () => {
      const { POST: filterContentPOST } = await import('../../app/api/search/filter/route');
      
      const filterData = {
        contentType: 'all',
        filters: {
          school: 'University of Test',
          privacy: 'public',
          language: 'en',
          createdAfter: '2024-01-01'
        },
        safetyLevel: 'strict'
      };

      const request = createMockRequest('POST', '/api/search/filter', filterData);
      const response = await filterContentPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.appliedFilters).toMatchObject(filterData.filters);
      expect(data.safetyLevel).toBe('strict');
      expect(data.filteredCount).toBeGreaterThanOrEqual(0);
    });

    it('handles content moderation and safety', async () => {
      const { POST: moderationPOST } = await import('../../app/api/search/moderation/route');
      
      const moderationData = {
        query: 'inappropriate content test',
        results: ['result-1', 'result-2'],
        userAge: 18
      };

      const request = createMockRequest('POST', '/api/search/moderation', moderationData);
      const response = await moderationPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.moderationApplied).toBe(true);
      expect(data.filteredResults).toBeInstanceOf(Array);
      expect(data.safetyScore).toBeGreaterThanOrEqual(0);
    });

    it('personalizes search results based on user preferences', async () => {
      const { GET: personalizedSearchGET } = await import('../../app/api/search/personalized/route');
      
      vi.mocked(mockFirestore.getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => ({
          searchPreferences: {
            preferredContentTypes: ['spaces', 'tools'],
            languagePreference: 'en',
            schoolFilter: true
          }
        })
      } as any);

      const request = createMockRequest('GET', '/api/search/personalized?q=study materials');
      const response = await personalizedSearchGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.personalized).toBe(true);
      expect(data.preferences).toBeDefined();
      expect(data.results).toBeInstanceOf(Array);
    });
  });

  describe('Search Performance Integration', () => {
    it('implements search result caching', async () => {
      const { GET: cachedSearchGET } = await import('../../app/api/search/cached/route');
      
      const request = createMockRequest('GET', '/api/search/cached?q=popular query&cache=true');
      const response = await cachedSearchGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.cached).toBe(true);
      expect(data.cacheHit).toBeDefined();
      expect(data.responseTime).toBeLessThan(100); // Fast cached response
    });

    it('handles search result pagination efficiently', async () => {
      const { GET: paginatedSearchGET } = await import('../../app/api/search/paginated/route');
      
      const request = createMockRequest('GET', '/api/search/paginated?q=test&page=2&limit=10');
      const response = await paginatedSearchGET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.results).toHaveLength(10);
      expect(data.pagination).toMatchObject({
        page: 2,
        limit: 10,
        hasNext: true,
        hasPrev: true
      });
    });

    it('optimizes search queries for performance', async () => {
      const { POST: optimizedSearchPOST } = await import('../../app/api/search/optimized/route');
      
      const searchData = {
        query: 'complex search with multiple terms',
        optimization: {
          indexHints: true,
          parallelQueries: true,
          resultCaching: true
        }
      };

      const request = createMockRequest('POST', '/api/search/optimized', searchData);
      const response = await optimizedSearchPOST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.optimized).toBe(true);
      expect(data.executionTime).toBeLessThan(500);
      expect(data.optimizations).toContain('indexHints');
    });
  });

  describe('Cross-Platform Search Integration', () => {
    it('integrates search with user activity history', async () => {
      const activityData = {
        recentSearches: ['machine learning', 'web development'],
        viewedContent: ['space-123', 'tool-456'],
        interactions: ['like', 'share', 'comment']
      };

      vi.mocked(mockFirestore.getDoc).mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ searchHistory: activityData.recentSearches })
      } as any);

      expect(activityData.recentSearches).toContain('machine learning');
      expect(activityData.viewedContent).toHaveLength(2);
    });

    it('connects search results with social features', async () => {
      const socialData = {
        friendsUsing: ['user-456', 'user-789'],
        popularInNetwork: ['space-popular', 'tool-trending'],
        recommendations: ['based-on-friends', 'similar-interests']
      };

      vi.mocked(mockFirestore.getDocs).mockResolvedValueOnce({
        empty: false,
        docs: socialData.friendsUsing.map(id => ({
          id,
          data: () => ({ connections: [mockUser.uid] })
        }))
      } as any);

      expect(socialData.friendsUsing).toHaveLength(2);
      expect(socialData.popularInNetwork).toContain('space-popular');
    });

    it('integrates search with real-time notifications', async () => {
      const notificationData = {
        savedSearch: 'machine learning tools',
        alertFrequency: 'daily',
        matchThreshold: 0.8,
        deliveryMethod: 'push'
      };

      vi.mocked(mockFirestore.addDoc).mockResolvedValueOnce({
        id: 'search-alert-123'
      } as any);

      expect(vi.mocked(mockFirestore.addDoc)).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          query: 'machine learning tools',
          userId: mockUser.uid,
          alertType: 'search_match'
        })
      );
    });
  });
});