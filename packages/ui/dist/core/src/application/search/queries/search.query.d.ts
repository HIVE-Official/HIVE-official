/**
 * Search Query
 * Unified search across the platform
 */
export declare enum SearchType {
    ALL = "all",
    USERS = "users",
    SPACES = "spaces",
    POSTS = "posts",
    TOOLS = "tools",
    EVENTS = "events"
}
export interface SearchResultItem {
    id: string;
    type: SearchType;
    title: string;
    description?: string;
    imageUrl?: string;
    url: string;
    metadata?: {
        [key: string]: any;
    };
    relevanceScore?: number;
    createdAt?: Date;
}
export interface SearchQuery {
    query: string;
    type?: SearchType;
    campusId: string;
    filters?: {
        userId?: string;
        spaceIds?: string[];
        tags?: string[];
        dateRange?: {
            start: Date;
            end: Date;
        };
    };
    limit?: number;
    offset?: number;
}
export interface SearchQueryResult {
    items: SearchResultItem[];
    totalCount: number;
    facets?: {
        types: {
            [key: string]: number;
        };
        tags?: {
            [key: string]: number;
        };
    };
    suggestions?: string[];
    hasMore: boolean;
}
export declare class SearchQueryHandler {
    private readonly searchService?;
    constructor(searchService?: any);
    execute(query: SearchQuery): Promise<SearchQueryResult>;
    private parseSearchQuery;
    private rankResults;
    private generateSuggestions;
}
//# sourceMappingURL=search.query.d.ts.map