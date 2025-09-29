"use strict";
/**
 * Search Query
 * Unified search across profiles, spaces, and posts
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchQueryHandler = exports.SearchQuery = void 0;
const base_1 = require("../../shared/base");
const value_objects_1 = require("../../../domain/profile/value-objects");
class SearchQuery extends base_1.Query {
    constructor(searchTerm, searchType = 'all', limit = 20, userId, campusId) {
        super(campusId, userId);
        this.searchTerm = searchTerm;
        this.searchType = searchType;
        this.limit = limit;
    }
}
exports.SearchQuery = SearchQuery;
class SearchQueryHandler {
    constructor(profileRepository, spaceRepository) {
        this.profileRepository = profileRepository;
        this.spaceRepository = spaceRepository;
    }
    async execute(query) {
        try {
            const results = [];
            const suggestions = [];
            // Sanitize search term
            const searchTerm = query.searchTerm.trim().toLowerCase();
            if (searchTerm.length < 2) {
                return value_objects_1.Result.ok({
                    query: query.searchTerm,
                    results: [],
                    totalCount: 0,
                    searchType: query.searchType,
                    suggestions: []
                });
            }
            // Search profiles
            if (query.searchType === 'all' || query.searchType === 'profiles') {
                const profileResults = await this.searchProfiles(searchTerm, query.campusId, query.limit);
                results.push(...profileResults);
            }
            // Search spaces
            if (query.searchType === 'all' || query.searchType === 'spaces') {
                const spaceResults = await this.searchSpaces(searchTerm, query.campusId, query.limit);
                results.push(...spaceResults);
            }
            // Search posts (TODO: Implement when post repository is available)
            if (query.searchType === 'all' || query.searchType === 'posts') {
                const postResults = await this.searchPosts(searchTerm, query.campusId, query.limit);
                results.push(...postResults);
            }
            // Sort by relevance score
            results.sort((a, b) => b.relevanceScore - a.relevanceScore);
            // Limit total results
            const limitedResults = results.slice(0, query.limit);
            // Generate suggestions based on results
            const generatedSuggestions = this.generateSuggestions(searchTerm, limitedResults);
            suggestions.push(...generatedSuggestions);
            return value_objects_1.Result.ok({
                query: query.searchTerm,
                results: limitedResults,
                totalCount: results.length,
                searchType: query.searchType,
                suggestions
            });
        }
        catch (error) {
            return value_objects_1.Result.fail(`Search failed: ${error}`);
        }
    }
    async searchProfiles(searchTerm, campusId, limit) {
        const results = [];
        try {
            // Search by name
            const profilesByName = await this.profileRepository.searchByName(searchTerm, campusId);
            if (profilesByName.isSuccess) {
                const profiles = profilesByName.getValue();
                profiles.forEach(profile => {
                    const relevanceScore = this.calculateProfileRelevance(profile, searchTerm);
                    results.push({
                        id: profile.id.id,
                        type: 'profile',
                        title: profile.fullName,
                        subtitle: `@${profile.handle.username}`,
                        description: profile.bio,
                        imageUrl: profile.photos[0],
                        url: `/profile/${profile.handle.username}`,
                        metadata: {
                            isVerified: profile.isVerified,
                            isActive: profile.isActive,
                            lastActive: profile.lastSeen,
                            followerCount: profile.followerCount,
                            handle: profile.handle.username
                        },
                        relevanceScore
                    });
                });
            }
            // Search by handle
            if (searchTerm.startsWith('@')) {
                const handleSearch = searchTerm.substring(1);
                const profileByHandle = await this.profileRepository.findByHandle(handleSearch);
                if (profileByHandle.isSuccess) {
                    const profile = profileByHandle.getValue();
                    // Check if not already in results
                    if (!results.find(r => r.id === profile.id.id)) {
                        results.push({
                            id: profile.id.id,
                            type: 'profile',
                            title: profile.fullName,
                            subtitle: `@${profile.handle.username}`,
                            description: profile.bio,
                            imageUrl: profile.photos[0],
                            url: `/profile/${profile.handle.username}`,
                            metadata: {
                                isVerified: profile.isVerified,
                                isActive: profile.isActive,
                                lastActive: profile.lastSeen,
                                followerCount: profile.followerCount,
                                handle: profile.handle.username
                            },
                            relevanceScore: 10 // Exact handle match gets high score
                        });
                    }
                }
            }
        }
        catch (error) {
            console.error('Profile search error:', error);
        }
        return results.slice(0, limit);
    }
    async searchSpaces(searchTerm, campusId, limit) {
        const results = [];
        try {
            const spacesResult = await this.spaceRepository.searchSpaces(searchTerm, campusId);
            if (spacesResult.isSuccess) {
                const spaces = spacesResult.getValue();
                spaces.forEach(space => {
                    const relevanceScore = this.calculateSpaceRelevance(space, searchTerm);
                    results.push({
                        id: space.id.id,
                        type: 'space',
                        title: space.name.name,
                        subtitle: `${space.category.value} • ${space.memberCount} members`,
                        description: space.description.value,
                        imageUrl: undefined, // Spaces don't have images in current model
                        url: `/spaces/${space.id.id}`,
                        metadata: {
                            memberCount: space.memberCount,
                            isVerified: space.isVerified,
                            isActive: true,
                            category: space.category.value
                        },
                        relevanceScore
                    });
                });
            }
        }
        catch (error) {
            console.error('Space search error:', error);
        }
        return results.slice(0, limit);
    }
    async searchPosts(searchTerm, campusId, limit) {
        // TODO: Implement when post repository is available
        // For now, return empty array
        return [];
    }
    calculateProfileRelevance(profile, searchTerm) {
        let score = 0;
        const term = searchTerm.toLowerCase();
        // Exact handle match
        if (profile.handle.username.toLowerCase() === term) {
            score += 10;
        }
        // Handle contains term
        if (profile.handle.username.toLowerCase().includes(term)) {
            score += 5;
        }
        // Name contains term
        const fullName = profile.fullName.toLowerCase();
        if (fullName === term) {
            score += 8;
        }
        else if (fullName.includes(term)) {
            score += 4;
        }
        // Bio contains term
        if (profile.bio?.toLowerCase().includes(term)) {
            score += 2;
        }
        // Boost for verified profiles
        if (profile.isVerified) {
            score += 3;
        }
        // Boost for active profiles
        if (profile.isActive) {
            score += 1;
        }
        // Boost based on follower count
        if (profile.followerCount > 100) {
            score += 2;
        }
        else if (profile.followerCount > 50) {
            score += 1;
        }
        return score;
    }
    calculateSpaceRelevance(space, searchTerm) {
        let score = 0;
        const term = searchTerm.toLowerCase();
        // Exact name match
        const spaceName = space.name.name.toLowerCase();
        if (spaceName === term) {
            score += 10;
        }
        else if (spaceName.includes(term)) {
            score += 5;
        }
        // Description contains term
        if (space.description.value.toLowerCase().includes(term)) {
            score += 3;
        }
        // Category matches
        if (space.category.value.toLowerCase().includes(term)) {
            score += 2;
        }
        // Boost for verified spaces
        if (space.isVerified) {
            score += 3;
        }
        // Boost based on member count
        if (space.memberCount > 100) {
            score += 3;
        }
        else if (space.memberCount > 50) {
            score += 2;
        }
        else if (space.memberCount > 20) {
            score += 1;
        }
        // Boost for trending spaces
        if (space.trendingScore > 0.5) {
            score += 2;
        }
        return score;
    }
    generateSuggestions(searchTerm, results) {
        const suggestions = new Set();
        // Add related terms from results
        results.forEach(result => {
            // Extract keywords from titles and descriptions
            const words = result.title.split(' ');
            words.forEach(word => {
                if (word.toLowerCase() !== searchTerm && word.length > 3) {
                    suggestions.add(word);
                }
            });
        });
        // Add category suggestions
        const categories = results
            .filter(r => r.metadata.category)
            .map(r => r.metadata.category);
        categories.forEach(cat => suggestions.add(cat));
        // Convert to array and limit
        return Array.from(suggestions).slice(0, 5);
    }
}
exports.SearchQueryHandler = SearchQueryHandler;
//# sourceMappingURL=search.query.js.map