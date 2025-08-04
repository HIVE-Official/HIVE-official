// HIVE Search Engine - Comprehensive search and discovery system

export interface SearchQuery {
  query: string;
  filters: SearchFilters;
  pagination: {
    page: number;
    limit: number;
  };
  sortBy: 'relevance' | 'recent' | 'popular' | 'trending';
  searchType: 'all' | 'posts' | 'users' | 'spaces' | 'tools' | 'events';
}

export interface SearchFilters {
  timeRange?: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
  authors?: string[];
  spaces?: string[];
  tags?: string[];
  postTypes?: string[];
  userTypes?: string[];
  locations?: string[];
  verified?: boolean;
  hasAttachments?: boolean;
  minEngagement?: number;
}

export interface SearchResult {
  items: SearchItem[];
  total: number;
  page: number;
  hasMore: boolean;
  suggestions: string[];
  facets: SearchFacets;
  searchTime: number;
}

export interface SearchItem {
  id: string;
  type: 'post' | 'user' | 'space' | 'tool' | 'event';
  title: string;
  content: string;
  snippet: string;
  score: number;
  highlights: SearchHighlight[];
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt?: string;
}

export interface SearchHighlight {
  field: string;
  text: string;
  startIndex: number;
  endIndex: number;
}

export interface SearchFacets {
  types: { value: string; count: number }[];
  authors: { value: string; count: number }[];
  spaces: { value: string; count: number }[];
  tags: { value: string; count: number }[];
  timeRanges: { value: string; count: number }[];
}

export interface SearchSuggestion {
  query: string;
  type: 'query' | 'user' | 'space' | 'tag';
  score: number;
  metadata?: Record<string, any>;
}

class SearchIndex {
  private documents: Map<string, SearchDocument> = new Map();
  private invertedIndex: Map<string, Set<string>> = new Map();
  private userIndex: Map<string, UserDocument> = new Map();
  private spaceIndex: Map<string, SpaceDocument> = new Map();
  private toolIndex: Map<string, ToolDocument> = new Map();
  private eventIndex: Map<string, EventDocument> = new Map();

  addDocument(doc: SearchDocument) {
    this.documents.set(doc.id, doc);
    this.indexDocument(doc);
  }

  removeDocument(id: string) {
    const doc = this.documents.get(id);
    if (doc) {
      this.unindexDocument(doc);
      this.documents.delete(id);
    }
  }

  private indexDocument(doc: SearchDocument) {
    const tokens = this.tokenize(doc.content + ' ' + doc.title);
    
    for (const token of tokens) {
      if (!this.invertedIndex.has(token)) {
        this.invertedIndex.set(token, new Set());
      }
      this.invertedIndex.get(token)!.add(doc.id);
    }
  }

  private unindexDocument(doc: SearchDocument) {
    const tokens = this.tokenize(doc.content + ' ' + doc.title);
    
    for (const token of tokens) {
      const docSet = this.invertedIndex.get(token);
      if (docSet) {
        docSet.delete(doc.id);
        if (docSet.size === 0) {
          this.invertedIndex.delete(token);
        }
      }
    }
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s#@]/g, ' ')
      .split(/\s+/)
      .filter(token => token.length > 2)
      .map(token => this.stem(token));
  }

  private stem(word: string): string {
    // Simple stemming - in production would use a proper stemmer
    if (word.endsWith('ing')) return word.slice(0, -3);
    if (word.endsWith('ed')) return word.slice(0, -2);
    if (word.endsWith('s') && word.length > 3) return word.slice(0, -1);
    return word;
  }

  search(query: SearchQuery): SearchResult {
    const startTime = Date.now();
    const tokens = this.tokenize(query.query);
    
    // Get candidate documents
    const candidates = this.getCandidates(tokens, query.searchType);
    
    // Score and rank documents
    const scored = this.scoreDocuments(candidates, tokens, query);
    
    // Apply filters
    const filtered = this.applyFilters(scored, query.filters);
    
    // Sort results
    const sorted = this.sortResults(filtered, query.sortBy);
    
    // Paginate
    const paginated = this.paginate(sorted, query.pagination);
    
    // Generate suggestions and facets
    const suggestions = this.generateSuggestions(query.query, tokens);
    const facets = this.generateFacets(filtered);
    
    const searchTime = Date.now() - startTime;
    
    return {
      items: paginated.items,
      total: filtered.length,
      page: query.pagination.page,
      hasMore: paginated.hasMore,
      suggestions,
      facets,
      searchTime
    };
  }

  private getCandidates(tokens: string[], searchType: string): SearchDocument[] {
    if (tokens.length === 0) {
      return Array.from(this.documents.values()).filter(doc => 
        searchType === 'all' || doc.type === searchType
      );
    }

    const docScores = new Map<string, number>();
    
    for (const token of tokens) {
      const docIds = this.invertedIndex.get(token);
      if (docIds) {
        for (const docId of docIds) {
          const currentScore = docScores.get(docId) || 0;
          docScores.set(docId, currentScore + 1);
        }
      }
    }

    return Array.from(docScores.keys())
      .map(id => this.documents.get(id)!)
      .filter(doc => doc && (searchType === 'all' || doc.type === searchType));
  }

  private scoreDocuments(
    candidates: SearchDocument[], 
    tokens: string[], 
    query: SearchQuery
  ): ScoredDocument[] {
    return candidates.map(doc => {
      let score = 0;
      const highlights: SearchHighlight[] = [];

      // TF-IDF scoring
      for (const token of tokens) {
        const tf = this.getTermFrequency(token, doc);
        const idf = this.getInverseDocumentFrequency(token);
        score += tf * idf;

        // Generate highlights
        if (tf > 0) {
          const highlight = this.findHighlight(token, doc);
          if (highlight) highlights.push(highlight);
        }
      }

      // Boost score based on document type and metadata
      score *= this.getTypeBoost(doc.type);
      score *= this.getRecencyBoost(doc.createdAt);
      score *= this.getEngagementBoost(doc.metadata.engagement || 0);

      // Exact phrase matching
      if (query.query.includes('"')) {
        const phrases = query.query.match(/"([^"]+)"/g) || [];
        for (const phrase of phrases) {
          const cleanPhrase = phrase.replace(/"/g, '');
          if (doc.content.toLowerCase().includes(cleanPhrase.toLowerCase()) ||
              doc.title.toLowerCase().includes(cleanPhrase.toLowerCase())) {
            score *= 2;
          }
        }
      }

      return {
        document: doc,
        score,
        highlights,
        snippet: this.generateSnippet(doc, tokens)
      };
    });
  }

  private getTermFrequency(term: string, doc: SearchDocument): number {
    const tokens = this.tokenize(doc.content + ' ' + doc.title);
    return tokens.filter(token => token === term).length / tokens.length;
  }

  private getInverseDocumentFrequency(term: string): number {
    const docsWithTerm = this.invertedIndex.get(term)?.size || 0;
    return Math.log(this.documents.size / (docsWithTerm + 1));
  }

  private getTypeBoost(type: string): number {
    const boosts = {
      post: 1.0,
      user: 1.2,
      space: 1.1,
      tool: 1.3,
      event: 1.1
    };
    return boosts[type as keyof typeof boosts] || 1.0;
  }

  private getRecencyBoost(createdAt: string): number {
    const daysSinceCreation = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24);
    return Math.max(0.5, 1 - (daysSinceCreation / 365)); // Decay over a year
  }

  private getEngagementBoost(engagement: number): number {
    return 1 + Math.log(engagement + 1) / 10;
  }

  private findHighlight(term: string, doc: SearchDocument): SearchHighlight | null {
    const text = doc.content.toLowerCase();
    const index = text.indexOf(term);
    
    if (index !== -1) {
      return {
        field: 'content',
        text: doc.content.substring(Math.max(0, index - 20), index + term.length + 20),
        startIndex: index,
        endIndex: index + term.length
      };
    }
    
    return null;
  }

  private generateSnippet(doc: SearchDocument, tokens: string[]): string {
    const content = doc.content;
    const sentences = content.split(/[.!?]+/);
    
    // Find the sentence with the most query terms
    let bestSentence = sentences[0] || '';
    let maxMatches = 0;
    
    for (const sentence of sentences) {
      const sentenceTokens = this.tokenize(sentence);
      const matches = tokens.filter(token => sentenceTokens.includes(token)).length;
      
      if (matches > maxMatches) {
        maxMatches = matches;
        bestSentence = sentence;
      }
    }
    
    return bestSentence.trim().substring(0, 200) + (bestSentence.length > 200 ? '...' : '');
  }

  private applyFilters(scored: ScoredDocument[], filters: SearchFilters): ScoredDocument[] {
    return scored.filter(item => {
      const doc = item.document;
      
      // Time range filter
      if (filters.timeRange && filters.timeRange !== 'all') {
        const now = Date.now();
        const docTime = new Date(doc.createdAt).getTime();
        const timeRanges = {
          hour: 60 * 60 * 1000,
          day: 24 * 60 * 60 * 1000,
          week: 7 * 24 * 60 * 60 * 1000,
          month: 30 * 24 * 60 * 60 * 1000,
          year: 365 * 24 * 60 * 60 * 1000
        };
        
        if (now - docTime > timeRanges[filters.timeRange]) {
          return false;
        }
      }
      
      // Author filter
      if (filters.authors?.length && !filters.authors.includes(doc.metadata.authorId)) {
        return false;
      }
      
      // Space filter
      if (filters.spaces?.length && !filters.spaces.includes(doc.metadata.spaceId)) {
        return false;
      }
      
      // Tags filter
      if (filters.tags?.length) {
        const docTags = doc.metadata.tags || [];
        if (!filters.tags.some(tag => docTags.includes(tag))) {
          return false;
        }
      }
      
      // Post type filter
      if (filters.postTypes?.length && !filters.postTypes.includes(doc.metadata.postType)) {
        return false;
      }
      
      // Verified filter
      if (filters.verified !== undefined && doc.metadata.isVerified !== filters.verified) {
        return false;
      }
      
      // Engagement filter
      if (filters.minEngagement && (doc.metadata.engagement || 0) < filters.minEngagement) {
        return false;
      }
      
      return true;
    });
  }

  private sortResults(scored: ScoredDocument[], sortBy: string): ScoredDocument[] {
    switch (sortBy) {
      case 'recent':
        return scored.sort((a, b) => 
          new Date(b.document.createdAt).getTime() - new Date(a.document.createdAt).getTime()
        );
      case 'popular':
        return scored.sort((a, b) => 
          (b.document.metadata.engagement || 0) - (a.document.metadata.engagement || 0)
        );
      case 'trending':
        return scored.sort((a, b) => {
          const aTrending = this.calculateTrendingScore(a.document);
          const bTrending = this.calculateTrendingScore(b.document);
          return bTrending - aTrending;
        });
      case 'relevance':
      default:
        return scored.sort((a, b) => b.score - a.score);
    }
  }

  private calculateTrendingScore(doc: SearchDocument): number {
    const daysSinceCreation = (Date.now() - new Date(doc.createdAt).getTime()) / (1000 * 60 * 60 * 24);
    const engagement = doc.metadata.engagement || 0;
    return engagement / Math.max(1, daysSinceCreation);
  }

  private paginate(sorted: ScoredDocument[], pagination: { page: number; limit: number }) {
    const start = (pagination.page - 1) * pagination.limit;
    const end = start + pagination.limit;
    const items = sorted.slice(start, end);
    
    return {
      items: items.map(item => ({
        id: item.document.id,
        type: item.document.type,
        title: item.document.title,
        content: item.document.content,
        snippet: item.snippet,
        score: item.score,
        highlights: item.highlights,
        metadata: item.document.metadata,
        createdAt: item.document.createdAt,
        updatedAt: item.document.updatedAt
      })),
      hasMore: end < sorted.length
    };
  }

  private generateSuggestions(originalQuery: string, tokens: string[]): string[] {
    const suggestions: string[] = [];
    
    // Common query patterns
    const commonQueries = [
      'study group',
      'office hours',
      'homework help',
      'project partners',
      'events this week',
      'computer science',
      'math tutoring',
      'career advice'
    ];
    
    // Find similar queries
    for (const query of commonQueries) {
      const queryTokens = this.tokenize(query);
      const overlap = tokens.filter(token => queryTokens.includes(token)).length;
      if (overlap > 0 && !suggestions.includes(query)) {
        suggestions.push(query);
      }
    }
    
    // Typo corrections (simple implementation)
    if (originalQuery.length > 3) {
      const corrected = this.suggestSpellingCorrections(originalQuery);
      suggestions.push(...corrected);
    }
    
    return suggestions.slice(0, 5);
  }

  private suggestSpellingCorrections(query: string): string[] {
    // Simple spelling correction - in production would use proper algorithms
    const commonCorrections = {
      'studing': 'studying',
      'homwork': 'homework',
      'projecr': 'project',
      'compuer': 'computer',
      'scince': 'science',
      'matematics': 'mathematics'
    };
    
    return Object.entries(commonCorrections)
      .filter(([wrong]) => query.includes(wrong))
      .map(([wrong, correct]) => query.replace(wrong, correct));
  }

  private generateFacets(scored: ScoredDocument[]): SearchFacets {
    const typeCounts = new Map<string, number>();
    const authorCounts = new Map<string, number>();
    const spaceCounts = new Map<string, number>();
    const tagCounts = new Map<string, number>();
    const timeCounts = new Map<string, number>();
    
    for (const item of scored) {
      const doc = item.document;
      
      // Type facets
      typeCounts.set(doc.type, (typeCounts.get(doc.type) || 0) + 1);
      
      // Author facets
      if (doc.metadata.authorName) {
        authorCounts.set(doc.metadata.authorName, (authorCounts.get(doc.metadata.authorName) || 0) + 1);
      }
      
      // Space facets
      if (doc.metadata.spaceName) {
        spaceCounts.set(doc.metadata.spaceName, (spaceCounts.get(doc.metadata.spaceName) || 0) + 1);
      }
      
      // Tag facets
      if (doc.metadata.tags) {
        for (const tag of doc.metadata.tags) {
          tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        }
      }
      
      // Time facets
      const timeRange = this.getTimeRange(doc.createdAt);
      timeCounts.set(timeRange, (timeCounts.get(timeRange) || 0) + 1);
    }
    
    return {
      types: Array.from(typeCounts.entries()).map(([value, count]) => ({ value, count })),
      authors: Array.from(authorCounts.entries()).map(([value, count]) => ({ value, count })),
      spaces: Array.from(spaceCounts.entries()).map(([value, count]) => ({ value, count })),
      tags: Array.from(tagCounts.entries()).map(([value, count]) => ({ value, count })),
      timeRanges: Array.from(timeCounts.entries()).map(([value, count]) => ({ value, count }))
    };
  }

  private getTimeRange(createdAt: string): string {
    const now = Date.now();
    const docTime = new Date(createdAt).getTime();
    const diffHours = (now - docTime) / (1000 * 60 * 60);
    
    if (diffHours < 1) return 'Last hour';
    if (diffHours < 24) return 'Today';
    if (diffHours < 24 * 7) return 'This week';
    if (diffHours < 24 * 30) return 'This month';
    return 'Older';
  }
}

interface SearchDocument {
  id: string;
  type: 'post' | 'user' | 'space' | 'tool' | 'event';
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  metadata: {
    authorId?: string;
    authorName?: string;
    spaceId?: string;
    spaceName?: string;
    tags?: string[];
    postType?: string;
    isVerified?: boolean;
    engagement?: number;
    [key: string]: any;
  };
}

interface ScoredDocument {
  document: SearchDocument;
  score: number;
  highlights: SearchHighlight[];
  snippet: string;
}

interface UserDocument extends SearchDocument {
  type: 'user';
  metadata: {
    handle: string;
    bio: string;
    major: string;
    year: string;
    isVerified: boolean;
    followers: number;
    following: number;
    [key: string]: any;
  };
}

interface SpaceDocument extends SearchDocument {
  type: 'space';
  metadata: {
    description: string;
    category: string;
    memberCount: number;
    isPublic: boolean;
    tags: string[];
    [key: string]: any;
  };
}

interface ToolDocument extends SearchDocument {
  type: 'tool';
  metadata: {
    description: string;
    category: string;
    language: string;
    installs: number;
    rating: number;
    tags: string[];
    [key: string]: any;
  };
}

interface EventDocument extends SearchDocument {
  type: 'event';
  metadata: {
    description: string;
    startTime: string;
    endTime?: string;
    location: string;
    attendees: number;
    tags: string[];
    [key: string]: any;
  };
}

export class SearchEngine {
  private static instance: SearchEngine;
  private index: SearchIndex;

  private constructor() {
    this.index = new SearchIndex();
    this.initializeMockData();
  }

  static getInstance(): SearchEngine {
    if (!SearchEngine.instance) {
      SearchEngine.instance = new SearchEngine();
    }
    return SearchEngine.instance;
  }

  search(query: SearchQuery): SearchResult {
    return this.index.search(query);
  }

  indexDocument(doc: SearchDocument) {
    this.index.addDocument(doc);
  }

  removeDocument(id: string) {
    this.index.removeDocument(id);
  }

  getSuggestions(query: string, limit: number = 5): SearchSuggestion[] {
    // Simple suggestion implementation
    const suggestions: SearchSuggestion[] = [];
    
    if (query.length < 2) return suggestions;
    
    // Popular queries
    const popularQueries = [
      'study group computer science',
      'math tutoring sessions',
      'project partners needed',
      'events this weekend',
      'office hours schedule',
      'homework help calculus',
      'career fair preparation',
      'internship opportunities'
    ];
    
    for (const popular of popularQueries) {
      if (popular.toLowerCase().includes(query.toLowerCase())) {
        suggestions.push({
          query: popular,
          type: 'query',
          score: 1.0
        });
      }
    }
    
    return suggestions.slice(0, limit);
  }

  private initializeMockData() {
    // Mock posts
    this.index.addDocument({
      id: 'post1',
      type: 'post',
      title: 'Study Group for Data Structures',
      content: 'Looking for people to join our weekly study group for CS 201 - Data Structures. We meet every Tuesday at 7 PM in the library. Topics include trees, graphs, and algorithm analysis.',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      metadata: {
        authorId: 'user1',
        authorName: 'Alex Chen',
        spaceId: 'cs-space',
        spaceName: 'Computer Science',
        tags: ['study-group', 'data-structures', 'algorithms'],
        postType: 'text',
        engagement: 24
      }
    });

    this.index.addDocument({
      id: 'post2',
      type: 'post',
      title: 'Free Tutoring for Calculus',
      content: 'Offering free tutoring sessions for Calculus I and II. I got an A+ in both courses and love helping others understand the concepts. Available weekdays after 3 PM.',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      metadata: {
        authorId: 'user2',
        authorName: 'Sarah Kim',
        spaceId: 'math-space',
        spaceName: 'Mathematics',
        tags: ['tutoring', 'calculus', 'help'],
        postType: 'text',
        engagement: 18
      }
    });

    // Mock users
    this.index.addDocument({
      id: 'user1',
      type: 'user',
      title: 'Alex Chen',
      content: 'Computer Science major specializing in AI and machine learning. Love building tools that help students succeed.',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      metadata: {
        handle: 'alexchen',
        bio: 'CS major specializing in AI and machine learning',
        major: 'Computer Science',
        year: 'Junior',
        isVerified: true,
        followers: 156,
        following: 89
      }
    });

    // Mock spaces
    this.index.addDocument({
      id: 'cs-space',
      type: 'space',
      title: 'Computer Science',
      content: 'A community for CS students to share projects, ask questions, form study groups, and connect with peers.',
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      metadata: {
        description: 'A community for CS students',
        category: 'Academic',
        memberCount: 342,
        isPublic: true,
        tags: ['programming', 'algorithms', 'software-engineering']
      }
    });

    // Mock tools
    this.index.addDocument({
      id: 'tool1',
      type: 'tool',
      title: 'Study Schedule Optimizer',
      content: 'An intelligent tool that analyzes your calendar and course load to create optimal study schedules. Uses algorithms to maximize retention and minimize conflicts.',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      metadata: {
        description: 'Intelligent study schedule optimizer',
        category: 'Productivity',
        language: 'JavaScript',
        installs: 234,
        rating: 4.8,
        tags: ['study', 'calendar', 'optimization']
      }
    });

    // Mock events
    this.index.addDocument({
      id: 'event1',
      type: 'event',
      title: 'Tech Career Fair 2024',
      content: 'Annual technology career fair featuring companies like Google, Microsoft, Apple, and local startups. Bring your resume and dress professionally.',
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      metadata: {
        description: 'Annual technology career fair',
        startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Student Union Ballroom',
        attendees: 156,
        tags: ['career', 'technology', 'networking']
      }
    });
  }
}

export default SearchEngine;