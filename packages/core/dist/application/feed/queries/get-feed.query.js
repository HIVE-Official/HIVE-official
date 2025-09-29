"use strict";
/**
 * Get Feed Query
 * Retrieves personalized feed for a user
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFeedQueryHandler = exports.GetFeedQuery = void 0;
const base_1 = require("../../shared/base");
const Result_1 = require("../../../domain/shared/base/Result");
const temporary_types_1 = require("../../shared/temporary-types");
class GetFeedQuery extends base_1.Query {
    constructor(filter = 'all', limit = 50, offset = 0, userId, campusId) {
        super(campusId, userId);
        this.filter = filter;
        this.limit = limit;
        this.offset = offset;
    }
}
exports.GetFeedQuery = GetFeedQuery;
class GetFeedQueryHandler {
    constructor(feedRepository, spaceRepository, profileRepository) {
        this.feedRepository = feedRepository;
        this.spaceRepository = spaceRepository;
        this.profileRepository = profileRepository;
    }
    async execute(query) {
        try {
            // Get user's profile for context
            const profileResult = await this.profileRepository.findById({
                id: query.userId,
                equals: () => false
            });
            if (profileResult.isFailure) {
                return Result_1.Result.fail('User profile not found');
            }
            const profile = profileResult.getValue();
            // Get user's feed or create new one
            let feedResult = await this.feedRepository.findByUserId({
                id: query.userId,
                equals: () => false
            });
            let feed;
            if (feedResult.isFailure) {
                // Create new feed
                const createResult = temporary_types_1.EnhancedFeed.createWithCampus({ id: query.userId, equals: () => false }, query.campusId);
                if (createResult.isFailure) {
                    return Result_1.Result.fail(createResult.error);
                }
                feed = createResult.getValue();
            }
            else {
                feed = feedResult.getValue();
            }
            // Apply filter
            const filter = temporary_types_1.FeedFilter.create(query.filter).getValue();
            feed.applyFilter(filter);
            // Get feed items
            const items = feed.getCampusItems()
                .slice(query.offset, query.offset + query.limit);
            // Transform to result format
            const feedItems = await Promise.all(items.map(async (item) => {
                // Get author info
                const authorResult = await this.profileRepository.findById(item.content.authorId);
                const author = authorResult.isSuccess ? authorResult.getValue() : null;
                // Get source info
                let sourceName = 'Unknown';
                if (item.source.isFromSpace()) {
                    const spaceResult = await this.spaceRepository.findById(item.source.spaceId);
                    if (spaceResult.isSuccess) {
                        sourceName = spaceResult.getValue().name.name;
                    }
                }
                return {
                    id: item.id.id,
                    type: item.contentType,
                    content: {
                        text: item.content.text,
                        mediaUrls: item.content.mediaUrls,
                        author: {
                            id: item.content.authorId.id,
                            name: author ? `${author.personalInfo.firstName} ${author.personalInfo.lastName}` : 'Unknown User',
                            handle: author?.handle || 'unknown',
                            avatar: undefined, // Would come from photos
                            isVerified: false // No verification field in DTO yet
                        }
                    },
                    source: {
                        type: item.source.type,
                        id: typeof item.source.spaceId === 'string' ? item.source.spaceId : item.source.spaceId?.id || '',
                        name: sourceName
                    },
                    engagement: {
                        reactions: item.interactions.filter((i) => i.type === 'react').length,
                        comments: item.interactions.filter((i) => i.type === 'comment').length,
                        reposts: item.interactions.filter((i) => i.type === 'repost').length,
                        requotes: item.interactions.filter((i) => i.type === 'requote').length
                    },
                    isPromoted: item.isPromoted,
                    promotionReason: item.promotionData?.promotionReason,
                    createdAt: item.createdAt,
                    relevanceScore: item.relevanceScore.value
                };
            }));
            // Get trending topics (would analyze content)
            const trendingTopics = this.extractTrendingTopics(items);
            return Result_1.Result.ok({
                items: feedItems,
                hasMore: feed.itemCount > query.offset + query.limit,
                nextOffset: query.offset + query.limit,
                trendingTopics
            });
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to get feed: ${error}`);
        }
    }
    extractTrendingTopics(items) {
        // Simple hashtag extraction
        const hashtags = new Map();
        items.forEach(item => {
            const matches = item.content.text.match(/#\w+/g) || [];
            matches.forEach((tag) => {
                const count = hashtags.get(tag) || 0;
                hashtags.set(tag, count + 1);
            });
        });
        // Sort by frequency and return top 5
        return Array.from(hashtags.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([tag]) => tag);
    }
}
exports.GetFeedQueryHandler = GetFeedQueryHandler;
//# sourceMappingURL=get-feed.query.js.map