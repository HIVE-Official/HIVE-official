"use strict";
/**
 * Search Query
 * Unified search across the platform
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchQueryHandler = exports.SearchType = void 0;
var SearchType;
(function (SearchType) {
    SearchType["ALL"] = "all";
    SearchType["USERS"] = "users";
    SearchType["SPACES"] = "spaces";
    SearchType["POSTS"] = "posts";
    SearchType["TOOLS"] = "tools";
    SearchType["EVENTS"] = "events";
})(SearchType || (exports.SearchType = SearchType = {}));
class SearchQueryHandler {
    constructor(searchService) {
        this.searchService = searchService;
    }
    async execute(query) {
        // Implementation would integrate with search service
        // For now, return a mock result to satisfy type checking
        return {
            items: [],
            totalCount: 0,
            facets: {
                types: {}
            },
            suggestions: [],
            hasMore: false
        };
    }
    // Helper method to parse search query
    parseSearchQuery(query) {
        const terms = [];
        const filters = {};
        // Simple parsing logic - would be more sophisticated in production
        const parts = query.split(' ');
        for (const part of parts) {
            if (part.includes(':')) {
                const [key, value] = part.split(':');
                filters[key] = value;
            }
            else {
                terms.push(part);
            }
        }
        return { terms, filters };
    }
    // Helper method to rank results
    rankResults(items, query) {
        const queryLower = query.toLowerCase();
        return items.map(item => {
            let score = 0;
            // Title match
            if (item.title.toLowerCase().includes(queryLower)) {
                score += 10;
            }
            // Description match
            if (item.description?.toLowerCase().includes(queryLower)) {
                score += 5;
            }
            // Exact match bonus
            if (item.title.toLowerCase() === queryLower) {
                score += 20;
            }
            return { ...item, relevanceScore: score };
        }).sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
    }
    // Helper method to generate search suggestions
    generateSuggestions(query, results) {
        const suggestions = new Set();
        // Add variations of the query
        if (query.length > 3) {
            suggestions.add(query + 's'); // Plural
            suggestions.add(query.slice(0, -1)); // Singular
        }
        // Add common terms from results
        results.slice(0, 5).forEach(item => {
            const words = item.title.split(' ');
            words.forEach(word => {
                if (word.length > 3 && word.toLowerCase() !== query.toLowerCase()) {
                    suggestions.add(word.toLowerCase());
                }
            });
        });
        return Array.from(suggestions).slice(0, 5);
    }
}
exports.SearchQueryHandler = SearchQueryHandler;
//# sourceMappingURL=search.query.js.map