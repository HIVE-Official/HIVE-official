/**
 * HIVE Platform-Wide Search Integration
 * 
 * Unified search across all platform slices with intelligent ranking,
 * real-time suggestions, and context-aware results
 */

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  url: string;
  score: number;
  metadata: {
    slice: 'feed' | 'spaces' | 'tools' | 'profile' | 'system';
    timestamp?: string;
    author?: {
      id: string;
      name: string;
      avatar?: string;
    };
    tags: string[];
    category: string;
    isVerified?: boolean;
    memberCount?: number;
    deploymentCount?: number;
  };
  preview?: {
    content: string;
    imageUrl?: string;
    highlights: string[];
  };
  actions: SearchAction[];
}

export type SearchResultType = 
  | 'space' | 'post' | 'tool' | 'user' | 'event' | 'comment' | 'deployment' | 'achievement';

export interface SearchAction {
  type: 'view' | 'join' | 'share' | 'like' | 'deploy' | 'follow';
  label: string;
  url?: string;
  handler?: () => void;
}

export interface SearchQuery {
  query: string;
  filters: SearchFilters;
  options: SearchOptions;
}

export interface SearchFilters {
  slices: string[];
  types: SearchResultType[];
  dateRange?: {
    start: string;
    end: string;
  };
  author?: string;
  spaces?: string[];
  tags?: string[];
  verified?: boolean;
  minScore?: number;
}

export interface SearchOptions {
  limit: number;
  offset: number;
  sortBy: 'relevance' | 'date' | 'popularity' | 'alphabetical';
  sortOrder: 'asc' | 'desc';
  includePreview: boolean;
  highlightMatches: boolean;
  personalizeResults: boolean;
}

export interface SearchSuggestion {
  text: string;
  type: 'query' | 'filter' | 'command';
  category: string;
  metadata?: any;
}

export interface SearchContext {
  userId: string;
  currentSlice: string;
  activeSpaceId?: string;
  recentSearches: string[];
  preferences: SearchPreferences;
}

export interface SearchPreferences {
  defaultSlices: string[];
  preferredResultTypes: SearchResultType[];
  maxResults: number;
  enableAutoComplete: boolean;
  enableRecentSearches: boolean;
  saveSearchHistory: boolean;
}

// ===== SEARCH ENGINE CLASS =====

export class HivePlatformSearchEngine {
  private searchContext: SearchContext | null = null;
  private searchHistory: Map<string, string[]> = new Map();
  private suggestionCache: Map<string, SearchSuggestion[]> = new Map();
  private resultCache: Map<string, SearchResult[]> = new Map();

  constructor() {
    this.initializeSearch();
  }

  /**
   * Set search context for personalized results
   */
  setContext(context: SearchContext): void {
    this.searchContext = context;
  }

  /**
   * Perform unified search across all platform slices
   */
  async search(query: SearchQuery): Promise<{
    results: SearchResult[];
    suggestions: SearchSuggestion[];
    totalCount: number;
    facets: SearchFacets;
    queryTime: number;
  }> {
    const startTime = Date.now();
    
    try {
      // Generate cache key
      const cacheKey = this.generateCacheKey(query);
      
      // Check cache first
      if (this.resultCache.has(cacheKey)) {
        const cachedResults = this.resultCache.get(cacheKey)!;
        return {
          results: cachedResults,
          suggestions: [],
          totalCount: cachedResults.length,
          facets: this.generateFacets(cachedResults),
          queryTime: Date.now() - startTime
        };
      }

      // Build search requests for each slice
      const searchPromises = query.filters.slices.map(slice => 
        this.searchSlice(slice, query)
      );

      // Execute searches in parallel
      const sliceResults = await Promise.all(searchPromises);
      
      // Combine and rank results
      const allResults = sliceResults.flat();
      const rankedResults = this.rankResults(allResults, query);
      
      // Apply pagination
      const paginatedResults = rankedResults.slice(
        query.options.offset,
        query.options.offset + query.options.limit
      );

      // Generate suggestions
      const suggestions = await this.getSuggestions(query.query);

      // Generate facets
      const facets = this.generateFacets(allResults);

      // Cache results
      this.cacheResults(cacheKey, paginatedResults);

      // Update search history
      this.updateSearchHistory(query.query);

      const result = {
        results: paginatedResults,
        suggestions,
        totalCount: allResults.length,
        facets,
        queryTime: Date.now() - startTime
      };

      return result;
    } catch (error) {
      console.error('Search error:', error);
      return {
        results: [],
        suggestions: [],
        totalCount: 0,
        facets: { slices: {}, types: {}, categories: {}, authors: {} },
        queryTime: Date.now() - startTime
      };
    }
  }

  /**
   * Get search suggestions as user types
   */
  async getSuggestions(partial: string): Promise<SearchSuggestion[]> {
    if (partial.length < 2) return [];

    const cacheKey = `suggestions_${partial.toLowerCase()}`;
    
    if (this.suggestionCache.has(cacheKey)) {
      return this.suggestionCache.get(cacheKey)!;
    }

    try {
      const suggestions: SearchSuggestion[] = [];

      // Query suggestions
      const queryMatches = await this.getQuerySuggestions(partial);
      suggestions.push(...queryMatches);

      // Filter suggestions
      const filterMatches = await this.getFilterSuggestions(partial);
      suggestions.push(...filterMatches);

      // Command suggestions
      const commandMatches = this.getCommandSuggestions(partial);
      suggestions.push(...commandMatches);

      // Recent searches
      if (this.searchContext?.preferences.enableRecentSearches) {
        const recentMatches = this.getRecentSearchSuggestions(partial);
        suggestions.push(...recentMatches);
      }

      // Sort by relevance
      const sortedSuggestions = suggestions
        .sort((a, b) => this.scoreSuggestion(b, partial) - this.scoreSuggestion(a, partial))
        .slice(0, 10);

      this.suggestionCache.set(cacheKey, sortedSuggestions);
      
      // Clear cache after 5 minutes
      setTimeout(() => {
        this.suggestionCache.delete(cacheKey);
      }, 5 * 60 * 1000);

      return sortedSuggestions;
    } catch (error) {
      console.error('Error getting suggestions:', error);
      return [];
    }
  }

  /**
   * Search within a specific slice
   */
  private async searchSlice(slice: string, query: SearchQuery): Promise<SearchResult[]> {
    switch (slice) {
      case 'spaces':
        return await this.searchSpaces(query);
      case 'tools':  
        return await this.searchTools(query);
      case 'feed':
        return await this.searchFeed(query);
      case 'profile':
        return await this.searchProfiles(query);
      default:
        return [];
    }
  }

  /**
   * Search spaces
   */
  private async searchSpaces(query: SearchQuery): Promise<SearchResult[]> {
    try {
      const response = await fetch('/api/spaces/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await this.getAuthToken()}`
        },
        body: JSON.stringify({
          query: query.query,
          filters: query.filters,
          limit: query.options.limit * 2, // Get more for better ranking
        })
      });

      if (!response.ok) {
        throw new Error('Failed to search spaces');
      }

      const data = await response.json();
      return (data.spaces || []).map((space: any) => this.mapSpaceToSearchResult(space, query.query));
    } catch (error) {
      console.error('Error searching spaces:', error);
      return [];
    }
  }

  /**
   * Search tools
   */
  private async searchTools(query: SearchQuery): Promise<SearchResult[]> {
    try {
      const response = await fetch('/api/tools/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await this.getAuthToken()}`
        },
        body: JSON.stringify({
          query: query.query,
          filters: query.filters,
          limit: query.options.limit * 2,
        })
      });

      if (!response.ok) {
        throw new Error('Failed to search tools');
      }

      const data = await response.json();
      return (data.tools || []).map((tool: any) => this.mapToolToSearchResult(tool, query.query));
    } catch (error) {
      console.error('Error searching tools:', error);
      return [];
    }
  }

  /**
   * Search feed/posts
   */
  private async searchFeed(query: SearchQuery): Promise<SearchResult[]> {
    try {
      const response = await fetch('/api/feed/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await this.getAuthToken()}`
        },
        body: JSON.stringify({
          query: query.query,
          filters: query.filters,
          limit: query.options.limit * 2,
        })
      });

      if (!response.ok) {
        throw new Error('Failed to search feed');
      }

      const data = await response.json();
      return (data.posts || []).map((post: any) => this.mapPostToSearchResult(post, query.query));
    } catch (error) {
      console.error('Error searching feed:', error);
      return [];
    }
  }

  /**
   * Search profiles/users
   */
  private async searchProfiles(query: SearchQuery): Promise<SearchResult[]> {
    try {
      const response = await fetch('/api/users/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await this.getAuthToken()}`
        },
        body: JSON.stringify({
          query: query.query,
          filters: query.filters,
          limit: query.options.limit * 2,
        })
      });

      if (!response.ok) {
        throw new Error('Failed to search profiles');
      }

      const data = await response.json();
      return (data.users || []).map((user: any) => this.mapUserToSearchResult(user, query.query));
    } catch (error) {
      console.error('Error searching profiles:', error);
      return [];
    }
  }

  // ===== RESULT MAPPING METHODS =====

  private mapSpaceToSearchResult(space: any, query: string): SearchResult {
    return {
      id: `space_${space.id}`,
      type: 'space',
      title: space.name,
      description: space.description || 'No description available',
      url: `/spaces/${space.id}`,
      score: this.calculateRelevanceScore(space, query, 'space'),
      metadata: {
        slice: 'spaces',
        timestamp: space.createdAt,
        author: space.creator ? {
          id: space.creator.id,
          name: space.creator.name,
          avatar: space.creator.avatar
        } : undefined,
        tags: space.tags || [],
        category: space.type || 'general',
        isVerified: space.isVerified || false,
        memberCount: space.memberCount || 0
      },
      preview: {
        content: space.description || '',
        highlights: this.extractHighlights(space, query)
      },
      actions: [
        { type: 'view', label: 'View Space', url: `/spaces/${space.id}` },
        { type: 'join', label: 'Join Space' },
        { type: 'share', label: 'Share' }
      ]
    };
  }

  private mapToolToSearchResult(tool: any, query: string): SearchResult {
    return {
      id: `tool_${tool.id}`,
      type: 'tool',
      title: tool.name,
      description: tool.description || 'No description available',
      url: `/tools/${tool.id}`,
      score: this.calculateRelevanceScore(tool, query, 'tool'),
      metadata: {
        slice: 'tools',
        timestamp: tool.createdAt,
        author: tool.creator ? {
          id: tool.creator.id,
          name: tool.creator.name,
          avatar: tool.creator.avatar
        } : undefined,
        tags: tool.tags || [],
        category: tool.category || 'utility',
        deploymentCount: tool.deploymentCount || 0
      },
      preview: {
        content: tool.description || '',
        imageUrl: tool.previewImage,
        highlights: this.extractHighlights(tool, query)
      },
      actions: [
        { type: 'view', label: 'View Tool', url: `/tools/${tool.id}` },
        { type: 'deploy', label: 'Deploy' },
        { type: 'share', label: 'Share' }
      ]
    };
  }

  private mapPostToSearchResult(post: any, query: string): SearchResult {
    return {
      id: `post_${post.id}`,
      type: 'post',
      title: post.title || `Post by ${post.author?.name || 'Unknown'}`,
      description: post.content?.substring(0, 200) || 'No content available',
      url: `/feed/posts/${post.id}`,
      score: this.calculateRelevanceScore(post, query, 'post'),
      metadata: {
        slice: 'feed',
        timestamp: post.createdAt,
        author: post.author ? {
          id: post.author.id,
          name: post.author.name,
          avatar: post.author.avatar
        } : undefined,
        tags: post.tags || [],
        category: post.type || 'discussion'
      },
      preview: {
        content: post.content || '',
        highlights: this.extractHighlights(post, query)
      },
      actions: [
        { type: 'view', label: 'View Post', url: `/feed/posts/${post.id}` },
        { type: 'like', label: 'Like' },
        { type: 'share', label: 'Share' }
      ]
    };
  }

  private mapUserToSearchResult(user: any, query: string): SearchResult {
    return {
      id: `user_${user.id}`,
      type: 'user',
      title: user.fullName || user.displayName || 'Unknown User',
      description: user.bio || 'No bio available',
      url: `/profile/${user.id}`,
      score: this.calculateRelevanceScore(user, query, 'user'),
      metadata: {
        slice: 'profile',
        timestamp: user.joinedAt,
        tags: user.interests || [],
        category: user.role || 'student',
        isVerified: user.isVerified || false
      },
      preview: {
        content: user.bio || '',
        imageUrl: user.avatar,
        highlights: this.extractHighlights(user, query)
      },
      actions: [
        { type: 'view', label: 'View Profile', url: `/profile/${user.id}` },
        { type: 'follow', label: 'Follow' },
        { type: 'share', label: 'Share' }
      ]
    };
  }

  // ===== RANKING AND SCORING =====

  private rankResults(results: SearchResult[], query: SearchQuery): SearchResult[] {
    const { sortBy, sortOrder } = query.options;
    
    return results.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'relevance':
          comparison = b.score - a.score;
          break;
        case 'date': {
          const aDate = new Date(a.metadata.timestamp || 0).getTime();
          const bDate = new Date(b.metadata.timestamp || 0).getTime();
          comparison = bDate - aDate;
          break;
        }
        case 'popularity': {
          const aPopularity = (a.metadata.memberCount || 0) + (a.metadata.deploymentCount || 0);
          const bPopularity = (b.metadata.memberCount || 0) + (b.metadata.deploymentCount || 0);
          comparison = bPopularity - aPopularity;
          break;
        }
        case 'alphabetical':
          comparison = a.title.localeCompare(b.title);
          break;
      }
      
      return sortOrder === 'desc' ? comparison : -comparison;
    });
  }

  private calculateRelevanceScore(item: any, query: string, type: string): number {
    let score = 0;
    const queryLower = query.toLowerCase();
    
    // Title/name match (highest weight)
    const title = (item.name || item.title || '').toLowerCase();
    if (title.includes(queryLower)) {
      score += title === queryLower ? 100 : 80;
    }
    
    // Description match
    const description = (item.description || '').toLowerCase();
    if (description.includes(queryLower)) {
      score += 60;
    }
    
    // Tag matches
    const tags = item.tags || [];
    tags.forEach((tag: string) => {
      if (tag.toLowerCase().includes(queryLower)) {
        score += 40;
      }
    });
    
    // Type-specific scoring
    switch (type) {
      case 'space':
        score += Math.min(20, (item.memberCount || 0) / 10);
        break;
      case 'tool':
        score += Math.min(20, (item.deploymentCount || 0) * 2);
        break;
      case 'post':
        score += Math.min(15, (item.engagement?.likes || 0));
        break;
      case 'user':
        if (item.isVerified) score += 10;
        break;
    }
    
    // Personalization boost
    if ((this.searchContext?.preferences as any)?.personalizeResults) {
      score += this.getPersonalizationScore(item, type);
    }
    
    // Recency boost
    if (item.createdAt) {
      const ageInDays = (Date.now() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24);
      score += Math.max(0, 20 - ageInDays);
    }
    
    return Math.min(100, Math.max(0, score));
  }

  private getPersonalizationScore(item: any, type: string): number {
    if (!this.searchContext) return 0;
    
    let personalScore = 0;
    
    // Boost results from current space
    if (this.searchContext.activeSpaceId && item.spaceId === this.searchContext.activeSpaceId) {
      personalScore += 15;
    }
    
    // Boost preferred result types
    if (this.searchContext.preferences.preferredResultTypes.includes(type as SearchResultType)) {
      personalScore += 10;
    }
    
    // Boost based on user's interaction history
    // This would require more data about user behavior
    
    return personalScore;
  }

  private extractHighlights(item: any, query: string): string[] {
    const highlights: string[] = [];
    const queryLower = query.toLowerCase();
    
    // Extract highlights from various fields
    const fields = [
      item.name || item.title,
      item.description,
      ...(item.tags || [])
    ].filter(Boolean);
    
    fields.forEach(field => {
      if (typeof field === 'string' && field.toLowerCase().includes(queryLower)) {
        const index = field.toLowerCase().indexOf(queryLower);
        const start = Math.max(0, index - 30);
        const end = Math.min(field.length, index + query.length + 30);
        const excerpt = field.substring(start, end);
        
        if (excerpt && !highlights.includes(excerpt)) {
          highlights.push(excerpt);
        }
      }
    });
    
    return highlights.slice(0, 3); // Limit to 3 highlights
  }

  // ===== SUGGESTION METHODS =====

  private async getQuerySuggestions(partial: string): Promise<SearchSuggestion[]> {
    const suggestions: SearchSuggestion[] = [];
    
    // Common search patterns
    const commonQueries = [
      'study groups', 'events', 'programming', 'math', 'physics', 'chemistry',
      'group projects', 'tutoring', 'research', 'internships', 'clubs'
    ];
    
    commonQueries.forEach(query => {
      if (query.toLowerCase().includes(partial.toLowerCase())) {
        suggestions.push({
          text: query,
          type: 'query',
          category: 'popular'
        });
      }
    });
    
    return suggestions;
  }

  private async getFilterSuggestions(partial: string): Promise<SearchSuggestion[]> {
    const suggestions: SearchSuggestion[] = [];
    
    // Filter suggestions based on available data
    const filters = [
      { text: 'in:spaces', category: 'filter' },
      { text: 'in:tools', category: 'filter' },
      { text: 'in:feed', category: 'filter' },
      { text: 'type:space', category: 'filter' },
      { text: 'type:tool', category: 'filter' },
      { text: 'type:post', category: 'filter' },
      { text: 'verified:true', category: 'filter' },
      { text: 'recent', category: 'filter' }
    ];
    
    filters.forEach(filter => {
      if (filter.text.includes(partial.toLowerCase())) {
        suggestions.push({
          text: filter.text,
          type: 'filter',
          category: filter.category
        });
      }
    });
    
    return suggestions;
  }

  private getCommandSuggestions(partial: string): SearchSuggestion[] {
    const suggestions: SearchSuggestion[] = [];
    
    if (partial.startsWith('/')) {
      const commands = [
        { text: '/spaces', category: 'navigation' },
        { text: '/tools', category: 'navigation' },
        { text: '/profile', category: 'navigation' },
        { text: '/create-space', category: 'action' },
        { text: '/create-tool', category: 'action' }
      ];
      
      commands.forEach(command => {
        if (command.text.includes(partial.toLowerCase())) {
          suggestions.push({
            text: command.text,
            type: 'command',
            category: command.category
          });
        }
      });
    }
    
    return suggestions;
  }

  private getRecentSearchSuggestions(partial: string): SearchSuggestion[] {
    const suggestions: SearchSuggestion[] = [];
    
    if (this.searchContext) {
      const recentSearches = this.searchHistory.get(this.searchContext.userId) || [];
      
      recentSearches.forEach(search => {
        if (search.toLowerCase().includes(partial.toLowerCase())) {
          suggestions.push({
            text: search,
            type: 'query',
            category: 'recent'
          });
        }
      });
    }
    
    return suggestions;
  }

  private scoreSuggestion(suggestion: SearchSuggestion, partial: string): number {
    let score = 0;
    
    // Exact match gets highest score
    if (suggestion.text.toLowerCase() === partial.toLowerCase()) {
      score += 100;
    } else if (suggestion.text.toLowerCase().startsWith(partial.toLowerCase())) {
      score += 80;
    } else if (suggestion.text.toLowerCase().includes(partial.toLowerCase())) {
      score += 60;
    }
    
    // Category bonuses
    switch (suggestion.category) {
      case 'recent': score += 20; break;
      case 'popular': score += 15; break;
      case 'navigation': score += 10; break;
      case 'action': score += 5; break;
    }
    
    return score;
  }

  // ===== UTILITY METHODS =====

  private generateCacheKey(query: SearchQuery): string {
    return `search_${JSON.stringify(query)}`;
  }

  private cacheResults(key: string, results: SearchResult[]): void {
    this.resultCache.set(key, results);
    
    // Clear cache after 10 minutes
    setTimeout(() => {
      this.resultCache.delete(key);
    }, 10 * 60 * 1000);
  }

  private updateSearchHistory(query: string): void {
    if (!this.searchContext?.preferences.saveSearchHistory || !this.searchContext.userId) {
      return;
    }
    
    const userId = this.searchContext.userId;
    const history = this.searchHistory.get(userId) || [];
    
    // Remove if already exists
    const filteredHistory = history.filter(h => h !== query);
    
    // Add to beginning
    filteredHistory.unshift(query);
    
    // Keep only last 20 searches
    const updatedHistory = filteredHistory.slice(0, 20);
    
    this.searchHistory.set(userId, updatedHistory);
  }

  private generateFacets(results: SearchResult[]): SearchFacets {
    const facets: SearchFacets = {
      slices: {},
      types: {},
      categories: {},
      authors: {}
    };
    
    results.forEach(result => {
      // Count by slice
      facets.slices[result.metadata.slice] = (facets.slices[result.metadata.slice] || 0) + 1;
      
      // Count by type
      facets.types[result.type] = (facets.types[result.type] || 0) + 1;
      
      // Count by category
      facets.categories[result.metadata.category] = (facets.categories[result.metadata.category] || 0) + 1;
      
      // Count by author
      if (result.metadata.author) {
        facets.authors[result.metadata.author.name] = (facets.authors[result.metadata.author.name] || 0) + 1;
      }
    });
    
    return facets;
  }

  private async getAuthToken(): Promise<string> {
    if (typeof window === 'undefined') return '';
    
    try {
      const sessionJson = localStorage.getItem('hive_session');
      if (sessionJson) {
        const session = JSON.parse(sessionJson);
        return process.env.NODE_ENV === 'development' 
          ? `dev_token_${session.uid}` 
          : session.token;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    
    return '';
  }

  private initializeSearch(): void {
    // Initialize search engine
    console.log('HIVE Platform Search Engine initialized');
  }
}

export interface SearchFacets {
  slices: Record<string, number>;
  types: Record<string, number>;
  categories: Record<string, number>;
  authors: Record<string, number>;
}

// ===== SINGLETON INSTANCE =====

let searchEngineInstance: HivePlatformSearchEngine | null = null;

export function getSearchEngine(): HivePlatformSearchEngine {
  if (!searchEngineInstance) {
    searchEngineInstance = new HivePlatformSearchEngine();
  }
  return searchEngineInstance;
}

// ===== CONVENIENCE FUNCTIONS =====

export async function searchPlatform(
  query: string,
  options: Partial<SearchOptions> = {},
  filters: Partial<SearchFilters> = {}
): Promise<SearchResult[]> {
  const engine = getSearchEngine();
  
  const searchQuery: SearchQuery = {
    query,
    filters: {
      slices: ['spaces', 'tools', 'feed', 'profile'],
      types: ['space', 'tool', 'post', 'user'],
      ...filters
    },
    options: {
      limit: 20,
      offset: 0,
      sortBy: 'relevance',
      sortOrder: 'desc',
      includePreview: true,
      highlightMatches: true,
      personalizeResults: true,
      ...options
    }
  };
  
  const result = await engine.search(searchQuery);
  return result.results;
}

export async function searchSpaces(query: string, limit = 10): Promise<SearchResult[]> {
  return await searchPlatform(query, { limit }, { slices: ['spaces'], types: ['space'] });
}

export async function searchTools(query: string, limit = 10): Promise<SearchResult[]> {
  return await searchPlatform(query, { limit }, { slices: ['tools'], types: ['tool'] });
}

export async function searchUsers(query: string, limit = 10): Promise<SearchResult[]> {
  return await searchPlatform(query, { limit }, { slices: ['profile'], types: ['user'] });
}

export async function getSearchSuggestions(partial: string): Promise<SearchSuggestion[]> {
  const engine = getSearchEngine();
  return await engine.getSuggestions(partial);
}