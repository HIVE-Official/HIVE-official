"use strict";
/**
 * Feed Generation Service
 * Orchestrates personalized feed generation with SPEC.md algorithm
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedGenerationService = void 0;
const base_service_1 = require("./base.service");
const Result_1 = require("../domain/shared/base/Result");
const profile_id_value_1 = require("../domain/profile/value-objects/profile-id.value");
const factory_1 = require("../infrastructure/repositories/factory");
class FeedGenerationService extends base_service_1.BaseApplicationService {
    constructor(context) {
        super(context);
        this.feedRepo = (0, factory_1.getFeedRepository)();
        this.profileRepo = (0, factory_1.getProfileRepository)();
        this.spaceRepo = (0, factory_1.getSpaceRepository)();
        this.ritualRepo = (0, factory_1.getRitualRepository)();
    }
    /**
     * Generate personalized feed for a user
     * Implements SPEC.md algorithm with weighted factors
     */
    async generateFeed(userId, options = {}) {
        return this.execute(async () => {
            // Get user profile and context
            const userProfileId = profile_id_value_1.ProfileId.create(userId).getValue();
            const profileResult = await this.profileRepo.findById(userProfileId.id);
            if (profileResult.isFailure) {
                return Result_1.Result.fail('User profile not found');
            }
            const profile = profileResult.getValue();
            const profileData = profile; // ProfileDTO doesn't need toData()
            // Get user's feed configuration
            const feedResult = await this.feedRepo.findByUserId(userProfileId);
            if (feedResult.isFailure) {
                return Result_1.Result.fail(feedResult.error);
            }
            const feed = feedResult.getValue();
            // Get user's spaces and connections
            const userSpacesResult = await this.spaceRepo.findByMember(userProfileId.id);
            const userSpaces = userSpacesResult.isSuccess
                ? userSpacesResult.getValue().map((s) => s.id)
                : [];
            const userConnectionIds = profileData.connections;
            // Apply feed preferences from options
            if (options.includeSpacePosts !== undefined) {
                feed.updatePreferences({
                    showSpacePosts: options.includeSpacePosts
                });
            }
            // Get feed content with algorithm
            const contentResult = await this.feedRepo.getFeedContent(userProfileId.id, userSpaces, userConnectionIds, options.limit || 20);
            if (contentResult.isFailure) {
                return Result_1.Result.fail(contentResult.error);
            }
            let items = contentResult.getValue();
            // Apply additional filtering based on options (use domain logic)
            items = feed.applyContentFilters(items, {
                includeSpacePosts: options.includeSpacePosts,
                includeRSSPosts: options.includeRSSPosts,
                includeConnectionActivity: options.includeConnectionActivity,
                includeEvents: options.includeEvents,
                includeRituals: options.includeRituals
            });
            // Sort based on preference
            if (options.sortBy === 'recent') {
                items = items.sort((a, b) => b.toData().createdAt.getTime() - a.toData().createdAt.getTime());
            }
            else if (options.sortBy === 'engagement') {
                items = items.sort((a, b) => b.toData().engagementCount - a.toData().engagementCount);
            }
            // Default is 'algorithm' which is already applied
            // Generate insights (use domain logic)
            const insights = feed.generateInsights(items);
            // Apply pagination
            const offset = options.offset || 0;
            const paginatedItems = items.slice(offset, offset + (options.limit || 20));
            const result = {
                data: {
                    items: paginatedItems,
                    insights,
                    nextOffset: offset + paginatedItems.length,
                    hasMore: offset + paginatedItems.length < items.length
                },
                metadata: {
                    totalCount: items.length,
                    pageSize: options.limit || 20,
                    pageNumber: Math.floor(offset / (options.limit || 20)) + 1
                }
            };
            // Update feed last accessed
            await this.feedRepo.saveFeed(feed);
            return Result_1.Result.ok(result);
        }, 'FeedGeneration.generateFeed');
    }
    /**
     * Get trending content across campus
     */
    async getTrendingFeed(limit = 20) {
        return this.execute(async () => {
            const trendingResult = await this.feedRepo.getTrendingContent(this.context.campusId, limit);
            if (trendingResult.isFailure) {
                return Result_1.Result.fail(trendingResult.error);
            }
            const result = {
                data: trendingResult.getValue(),
                metadata: {
                    totalCount: trendingResult.getValue().length
                }
            };
            return Result_1.Result.ok(result);
        }, 'FeedGeneration.getTrendingFeed');
    }
    /**
     * Get event-focused feed content
     */
    async getEventsFeed(limit = 20) {
        return this.execute(async () => {
            const eventsResult = await this.feedRepo.getEventContent(this.context.campusId, limit);
            if (eventsResult.isFailure) {
                return Result_1.Result.fail(eventsResult.error);
            }
            const result = {
                data: eventsResult.getValue(),
                metadata: {
                    totalCount: eventsResult.getValue().length
                }
            };
            return Result_1.Result.ok(result);
        }, 'FeedGeneration.getEventsFeed');
    }
    /**
     * Get ritual-focused feed content
     */
    async getRitualsFeed(limit = 20) {
        return this.execute(async () => {
            const ritualsResult = await this.feedRepo.getRitualContent(this.context.campusId, limit);
            if (ritualsResult.isFailure) {
                return Result_1.Result.fail(ritualsResult.error);
            }
            const result = {
                data: ritualsResult.getValue(),
                metadata: {
                    totalCount: ritualsResult.getValue().length
                }
            };
            return Result_1.Result.ok(result);
        }, 'FeedGeneration.getRitualsFeed');
    }
    /**
     * Record user interaction with feed item
     */
    async recordInteraction(userId, itemId, interactionType) {
        return this.execute(async () => {
            const userProfileId = profile_id_value_1.ProfileId.create(userId).getValue();
            // Record the interaction
            const recordResult = await this.feedRepo.recordInteraction(userProfileId.id, itemId, interactionType, {
                timestamp: Date.now(),
                context: this.context
            });
            if (recordResult.isFailure) {
                return Result_1.Result.fail(recordResult.error);
            }
            // Update algorithm weights based on interaction (use domain logic)
            if (interactionType === 'like' || interactionType === 'comment') {
                const userProfileId = profile_id_value_1.ProfileId.create(userId).getValue();
                const feedResult = await this.feedRepo.findByUserId(userProfileId);
                if (feedResult.isSuccess) {
                    const feed = feedResult.getValue();
                    feed.adjustWeightsFromFeedback('positive', 'engagement');
                    await this.feedRepo.saveFeed(feed);
                }
            }
            else if (interactionType === 'hide') {
                const userProfileId = profile_id_value_1.ProfileId.create(userId).getValue();
                const feedResult = await this.feedRepo.findByUserId(userProfileId);
                if (feedResult.isSuccess) {
                    const feed = feedResult.getValue();
                    feed.adjustWeightsFromFeedback('negative', 'hide');
                    await this.feedRepo.saveFeed(feed);
                }
            }
            return Result_1.Result.ok();
        }, 'FeedGeneration.recordInteraction');
    }
    /**
     * Update user's feed preferences
     */
    async updateFeedPreferences(userId, preferences) {
        return this.execute(async () => {
            const userProfileId = profile_id_value_1.ProfileId.create(userId).getValue();
            // Get user's feed
            const feedResult = await this.feedRepo.findByUserId(userProfileId);
            if (feedResult.isFailure) {
                return Result_1.Result.fail(feedResult.error);
            }
            const feed = feedResult.getValue();
            // Update preferences
            feed.updatePreferences(preferences);
            // Save updated feed
            const saveResult = await this.feedRepo.saveFeed(feed);
            if (saveResult.isFailure) {
                return Result_1.Result.fail(saveResult.error);
            }
            return Result_1.Result.ok();
        }, 'FeedGeneration.updateFeedPreferences');
    }
    /**
     * Subscribe to real-time feed updates
     */
    subscribeToFeedUpdates(userId, callback) {
        const userProfileId = profile_id_value_1.ProfileId.create(userId).getValue();
        return this.feedRepo.subscribeToFeed(userProfileId.id, callback);
    }
}
exports.FeedGenerationService = FeedGenerationService;
//# sourceMappingURL=feed-generation.service.js.map