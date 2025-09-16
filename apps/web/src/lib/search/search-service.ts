import { db } from '@/lib/firebase/client/firebase-client';
import { logger } from '@/lib/logger';

import { 
  collection, 
  collectionGroup,
  query, 
  where, 
  orderBy, 
  limit as firebaseLimit,
  getDocs,
  startAt,
  endAt
} from 'firebase/firestore';

export type SearchResultType = 'user' | 'space' | 'post' | 'event' | 'tool';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  url: string;
  metadata?: Record<string, any>;
  score?: number;
  createdAt?: Date;
}

export interface SearchFilters {
  types?: SearchResultType[];
  spaceIds?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  tags?: string[];
  authorId?: string;
}

export interface SearchOptions {
  limit?: number;
  offset?: number;
  sortBy?: 'relevance' | 'date' | 'popularity';
  filters?: SearchFilters;
}

class SearchService {
  private searchCache: Map<string, { results: SearchResult[]; timestamp: number }> = new Map();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  /**
   * Main search function - searches across all content types
   */
  async search(
    searchQuery: string,
    options: SearchOptions = {}
  ): Promise<SearchResult[]> {
    const {
      limit = 20,
      offset = 0,
      sortBy = 'relevance',
      filters = {}
    } = options;

    // Check cache
    const cacheKey = this.getCacheKey(searchQuery, options);
    const cached = this.searchCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.results.slice(offset, offset + limit);
    }

    // Normalize search query
    const normalizedQuery = this.normalizeQuery(searchQuery);
    const searchTokens = this.tokenizeQuery(normalizedQuery);

    // Determine which types to search
    const typesToSearch = filters.types || ['user', 'space', 'post', 'event', 'tool'];
    
    // Perform parallel searches
    const searchPromises = typesToSearch.map(type => {
      switch (type) {
        case 'user':
          return this.searchUsers(normalizedQuery, searchTokens, limit);
        case 'space':
          return this.searchSpaces(normalizedQuery, searchTokens, limit);
        case 'post':
          return this.searchPosts(normalizedQuery, searchTokens, limit, filters);
        case 'event':
          return this.searchEvents(normalizedQuery, searchTokens, limit, filters);
        case 'tool':
          return this.searchTools(normalizedQuery, searchTokens, limit);
        default:
          return Promise.resolve([]);
      }
    });

    const results = await Promise.all(searchPromises);
    const allResults = results.flat();

    // Score and rank results
    const scoredResults = this.scoreResults(allResults, searchTokens);
    
    // Sort results
    const sortedResults = this.sortResults(scoredResults, sortBy);

    // Cache results
    this.searchCache.set(cacheKey, {
      results: sortedResults,
      timestamp: Date.now()
    });

    // Return paginated results
    return sortedResults.slice(offset, offset + limit);
  }

  /**
   * Search users by name, handle, or bio
   */
  private async searchUsers(
    searchQuery: string,
    tokens: string[],
    limit: number
  ): Promise<SearchResult[]> {
    try {
      const results: SearchResult[] = [];
      
      // Search by display name (using Firebase's limited text search)
      const usersRef = collection(db, 'users');
      
      // Firebase doesn't support full-text search, so we use a workaround
      // Search by name prefix
      const nameQuery = query(
        usersRef,
        orderBy('displayName'),
        startAt(tokens[0]),
        endAt(tokens[0] + '\uf8ff'),
        firebaseLimit(limit)
      );
      
      const nameSnapshot = await getDocs(nameQuery);
      
      nameSnapshot.forEach(doc => {
        const data = doc.data();
        results.push({
          id: doc.id,
          type: 'user',
          title: data.displayName || 'Unknown User',
          subtitle: `@${data.handle || doc.id}`,
          description: data.bio || '',
          imageUrl: data.photoURL,
          url: `/profile/${data.handle || doc.id}`,
          metadata: {
            role: data.role,
            major: data.major,
            year: data.year,
            spacesCount: data.spaces?.length || 0
          },
          createdAt: data.createdAt?.toDate()
        });
      });

      // Also search by handle
      const handleQuery = query(
        usersRef,
        orderBy('handle'),
        startAt(tokens[0]),
        endAt(tokens[0] + '\uf8ff'),
        firebaseLimit(limit)
      );
      
      const handleSnapshot = await getDocs(handleQuery);
      
      handleSnapshot.forEach(doc => {
        const data = doc.data();
        // Avoid duplicates
        if (!results.find(r => r.id === doc.id)) {
          results.push({
            id: doc.id,
            type: 'user',
            title: data.displayName || 'Unknown User',
            subtitle: `@${data.handle || doc.id}`,
            description: data.bio || '',
            imageUrl: data.photoURL,
            url: `/profile/${data.handle || doc.id}`,
            metadata: {
              role: data.role,
              major: data.major,
              year: data.year,
              spacesCount: data.spaces?.length || 0
            },
            createdAt: data.createdAt?.toDate()
          });
        }
      });

      return results;
    } catch (error) {
      logger.error('Error searching users:', { error: String(error) });
      return [];
    }
  }

  /**
   * Search spaces by name or description
   */
  private async searchSpaces(
    searchQuery: string,
    tokens: string[],
    limit: number
  ): Promise<SearchResult[]> {
    try {
      const results: SearchResult[] = [];
      const spacesRef = collection(db, 'spaces');
      
      // Search by name
      const nameQuery = query(
        spacesRef,
        orderBy('name'),
        startAt(tokens[0]),
        endAt(tokens[0] + '\uf8ff'),
        firebaseLimit(limit)
      );
      
      const snapshot = await getDocs(nameQuery);
      
      snapshot.forEach(doc => {
        const data = doc.data();
        results.push({
          id: doc.id,
          type: 'space',
          title: data.name,
          subtitle: data.type,
          description: data.description,
          imageUrl: data.coverImage || data.avatar,
          url: `/spaces/${doc.id}`,
          metadata: {
            memberCount: data.memberCount || 0,
            postCount: data.postCount || 0,
            isPublic: data.isPublic,
            category: data.category,
            tags: data.tags || []
          },
          createdAt: data.createdAt?.toDate()
        });
      });

      return results;
    } catch (error) {
      logger.error('Error searching spaces:', { error: String(error) });
      return [];
    }
  }

  /**
   * Search posts by content
   */
  private async searchPosts(
    searchQuery: string,
    tokens: string[],
    limit: number,
    filters: SearchFilters
  ): Promise<SearchResult[]> {
    try {
      const results: SearchResult[] = [];
      
      // Use collectionGroup to search across all space posts
      const postsRef = collectionGroup(db, 'posts');
      let postsQuery = query(postsRef, firebaseLimit(limit)) as any;
      
      // Apply filters if provided
      if (filters.dateFrom) {
        postsQuery = query(
          postsQuery,
          where('createdAt', '>=', filters.dateFrom)
        );
      }
      
      if (filters.dateTo) {
        postsQuery = query(
          postsQuery,
          where('createdAt', '<=', filters.dateTo)
        );
      }
      
      if (filters.authorId) {
        postsQuery = query(
          postsQuery,
          where('authorId', '==', filters.authorId)
        );
      }
      
      const snapshot = await getDocs(postsQuery);
      
      snapshot.forEach(doc => {
        const data = doc.data();
        // Basic text matching since Firebase doesn't support full-text search
        const content = data.content?.toLowerCase() || '';
        const matchesQuery = tokens.some(token => content.includes(token));
        
        if (matchesQuery) {
          const spaceId = doc.ref.parent.parent?.id;
          results.push({
            id: doc.id,
            type: 'post',
            title: this.extractTitle(data.content),
            subtitle: data.authorName || 'Anonymous',
            description: this.truncateText(data.content, 150),
            imageUrl: data.images?.[0],
            url: `/spaces/${spaceId}/posts/${doc.id}`,
            metadata: {
              spaceId,
              spaceName: data.spaceName,
              authorId: data.authorId,
              type: data.type,
              reactions: data.reactions,
              commentCount: data.commentCount || 0
            },
            createdAt: data.createdAt?.toDate()
          });
        }
      });

      return results;
    } catch (error) {
      logger.error('Error searching posts:', { error: String(error) });
      return [];
    }
  }

  /**
   * Search events
   */
  private async searchEvents(
    searchQuery: string,
    tokens: string[],
    limit: number,
    _filters: SearchFilters
  ): Promise<SearchResult[]> {
    try {
      const results: SearchResult[] = [];
      const eventsRef = collectionGroup(db, 'events');
      
      const eventsQuery = query(eventsRef, firebaseLimit(limit));
      const snapshot = await getDocs(eventsQuery);
      
      snapshot.forEach(doc => {
        const data = doc.data();
        const title = data.title?.toLowerCase() || '';
        const description = data.description?.toLowerCase() || '';
        
        const matchesQuery = tokens.some(token => 
          title.includes(token) || description.includes(token)
        );
        
        if (matchesQuery) {
          const spaceId = doc.ref.parent.parent?.id;
          results.push({
            id: doc.id,
            type: 'event',
            title: data.title,
            subtitle: data.spaceName || 'Event',
            description: data.description,
            imageUrl: data.coverImage,
            url: `/events/${doc.id}`,
            metadata: {
              spaceId,
              startDate: data.startDate?.toDate(),
              endDate: data.endDate?.toDate(),
              location: data.location,
              attendeeCount: data.attendeeCount || 0,
              isOnline: data.isOnline
            },
            createdAt: data.createdAt?.toDate()
          });
        }
      });

      return results;
    } catch (error) {
      logger.error('Error searching events:', { error: String(error) });
      return [];
    }
  }

  /**
   * Search tools
   */
  private async searchTools(
    searchQuery: string,
    tokens: string[],
    limit: number
  ): Promise<SearchResult[]> {
    try {
      const results: SearchResult[] = [];
      const toolsRef = collection(db, 'tools');
      
      const toolsQuery = query(toolsRef, firebaseLimit(limit));
      const snapshot = await getDocs(toolsQuery);
      
      snapshot.forEach(doc => {
        const data = doc.data();
        const name = data.name?.toLowerCase() || '';
        const description = data.description?.toLowerCase() || '';
        
        const matchesQuery = tokens.some(token => 
          name.includes(token) || description.includes(token)
        );
        
        if (matchesQuery) {
          results.push({
            id: doc.id,
            type: 'tool',
            title: data.name,
            subtitle: `by ${data.authorName || 'Unknown'}`,
            description: data.description,
            imageUrl: data.icon,
            url: `/tools/${doc.id}`,
            metadata: {
              category: data.category,
              downloads: data.downloads || 0,
              rating: data.rating || 0,
              tags: data.tags || [],
              isPublic: data.isPublic
            },
            createdAt: data.createdAt?.toDate()
          });
        }
      });

      return results;
    } catch (error) {
      logger.error('Error searching tools:', { error: String(error) });
      return [];
    }
  }

  /**
   * Score results based on relevance
   */
  private scoreResults(
    results: SearchResult[],
    tokens: string[]
  ): SearchResult[] {
    return results.map(result => {
      let score = 0;
      
      // Score based on title match
      const titleLower = result.title.toLowerCase();
      tokens.forEach(token => {
        if (titleLower.includes(token)) {
          score += titleLower.startsWith(token) ? 10 : 5;
        }
      });
      
      // Score based on subtitle match
      if (result.subtitle) {
        const subtitleLower = result.subtitle.toLowerCase();
        tokens.forEach(token => {
          if (subtitleLower.includes(token)) {
            score += 3;
          }
        });
      }
      
      // Score based on description match
      if (result.description) {
        const descLower = result.description.toLowerCase();
        tokens.forEach(token => {
          if (descLower.includes(token)) {
            score += 1;
          }
        });
      }
      
      // Boost score for exact matches
      if (titleLower === tokens.join(' ')) {
        score += 20;
      }
      
      // Boost for recent content
      if (result.createdAt) {
        const ageInDays = (Date.now() - result.createdAt.getTime()) / (1000 * 60 * 60 * 24);
        if (ageInDays < 1) score += 5;
        else if (ageInDays < 7) score += 3;
        else if (ageInDays < 30) score += 1;
      }
      
      return { ...result, score };
    });
  }

  /**
   * Sort results based on criteria
   */
  private sortResults(
    results: SearchResult[],
    sortBy: 'relevance' | 'date' | 'popularity'
  ): SearchResult[] {
    switch (sortBy) {
      case 'relevance':
        return results.sort((a, b) => (b.score || 0) - (a.score || 0));
      
      case 'date':
        return results.sort((a, b) => {
          const aDate = a.createdAt?.getTime() || 0;
          const bDate = b.createdAt?.getTime() || 0;
          return bDate - aDate;
        });
      
      case 'popularity':
        return results.sort((a, b) => {
          const aPopularity = this.getPopularityScore(a);
          const bPopularity = this.getPopularityScore(b);
          return bPopularity - aPopularity;
        });
      
      default:
        return results;
    }
  }

  /**
   * Get popularity score for sorting
   */
  private getPopularityScore(result: SearchResult): number {
    let score = 0;
    
    if (result.type === 'user') {
      score = result.metadata?.spacesCount || 0;
    } else if (result.type === 'space') {
      score = result.metadata?.memberCount || 0;
    } else if (result.type === 'post') {
      score = (result.metadata?.reactions?.heart || 0) + 
              (result.metadata?.commentCount || 0);
    } else if (result.type === 'event') {
      score = result.metadata?.attendeeCount || 0;
    } else if (result.type === 'tool') {
      score = result.metadata?.downloads || 0;
    }
    
    return score;
  }

  /**
   * Normalize search query
   */
  private normalizeQuery(query: string): string {
    return query
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ');
  }

  /**
   * Tokenize search query
   */
  private tokenizeQuery(query: string): string[] {
    return query
      .split(' ')
      .filter(token => token.length > 1);
  }

  /**
   * Generate cache key
   */
  private getCacheKey(query: string, options: SearchOptions): string {
    return `${query}:${JSON.stringify(options)}`;
  }

  /**
   * Extract title from content
   */
  private extractTitle(content: string): string {
    const lines = content.split('\n');
    const firstLine = lines[0] || content;
    return this.truncateText(firstLine, 50);
  }

  /**
   * Truncate text to specified length
   */
  private truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  /**
   * Clear search cache
   */
  clearCache(): void {
    this.searchCache.clear();
  }
}

// Export singleton instance
export const searchService = new SearchService();

// Export search functions
export const search = searchService.search.bind(searchService);
export const clearSearchCache = searchService.clearCache.bind(searchService);