/**
 * Search Query
 * Unified search across profiles, spaces, and posts
 */
import { Query, IQueryHandler } from '../../shared/base';
import { Result } from '../../../domain/profile/value-objects';
import { IProfileRepository, ISpaceRepository } from '../../../infrastructure/repositories/interfaces';
export type SearchType = 'all' | 'profiles' | 'spaces' | 'posts';
export declare class SearchQuery extends Query {
    readonly searchTerm: string;
    readonly searchType: SearchType;
    readonly limit: number;
    constructor(searchTerm: string, searchType: SearchType | undefined, limit: number | undefined, userId: string, campusId: string);
}
export interface SearchResultItem {
    id: string;
    type: 'profile' | 'space' | 'post';
    title: string;
    subtitle: string;
    description?: string;
    imageUrl?: string;
    url: string;
    metadata: {
        memberCount?: number;
        followerCount?: number;
        isVerified?: boolean;
        isActive?: boolean;
        lastActive?: Date;
        category?: string;
        handle?: string;
    };
    relevanceScore: number;
}
export interface SearchResult {
    query: string;
    results: SearchResultItem[];
    totalCount: number;
    searchType: SearchType;
    suggestions: string[];
}
export declare class SearchQueryHandler implements IQueryHandler<SearchQuery, SearchResult> {
    private readonly profileRepository;
    private readonly spaceRepository;
    constructor(profileRepository: IProfileRepository, spaceRepository: ISpaceRepository);
    execute(query: SearchQuery): Promise<Result<SearchResult>>;
    private searchProfiles;
    private searchSpaces;
    private searchPosts;
    private calculateProfileRelevance;
    private calculateSpaceRelevance;
    private generateSuggestions;
}
//# sourceMappingURL=search.query.d.ts.map