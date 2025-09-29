"use strict";
/**
 * Space Discovery Service
 * Orchestrates space discovery, joining, and management flows
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceDiscoveryService = void 0;
const base_service_1 = require("./base.service");
const Result_1 = require("../domain/shared/base/Result");
const enhanced_space_1 = require("../domain/spaces/aggregates/enhanced-space");
const space_id_value_1 = require("../domain/spaces/value-objects/space-id.value");
const space_name_value_1 = require("../domain/spaces/value-objects/space-name.value");
const space_description_value_1 = require("../domain/spaces/value-objects/space-description.value");
const space_category_value_1 = require("../domain/spaces/value-objects/space-category.value");
const campus_id_value_1 = require("../domain/profile/value-objects/campus-id.value");
const profile_id_value_1 = require("../domain/profile/value-objects/profile-id.value");
class SpaceDiscoveryService extends base_service_1.BaseApplicationService {
    constructor(context, spaceRepo, profileRepo, feedRepo) {
        super(context);
        // Mock repositories for now - would be injected in production
        this.spaceRepo = spaceRepo || {};
        this.profileRepo = profileRepo || {};
        this.feedRepo = feedRepo || {};
    }
    /**
     * Discover spaces based on user preferences and filters
     */
    async discoverSpaces(filters = {}) {
        return this.execute(async () => {
            let spaces = [];
            // Apply different discovery strategies based on filters
            if (filters.searchQuery) {
                const searchResult = await this.spaceRepo.searchEnhancedSpaces(filters.searchQuery, this.context.campusId);
                if (searchResult.isSuccess) {
                    spaces = searchResult.getValue();
                }
            }
            else if (filters.sortBy === 'trending') {
                const trendingResult = await this.spaceRepo.findTrending(this.context.campusId, filters.limit || 20);
                if (trendingResult.isSuccess) {
                    spaces = trendingResult.getValue();
                }
            }
            else if (filters.spaceType) {
                const typeResult = await this.spaceRepo.findByType(filters.spaceType, this.context.campusId);
                if (typeResult.isSuccess) {
                    spaces = typeResult.getValue();
                }
            }
            else {
                // Default: get public spaces
                const publicResult = await this.spaceRepo.findPublicEnhancedSpaces(this.context.campusId, filters.limit || 20);
                if (publicResult.isSuccess) {
                    spaces = publicResult.getValue();
                }
            }
            // Filter out private spaces unless explicitly requested
            if (!filters.includePrivate) {
                spaces = spaces.filter(space => space.toData().visibility === 'public');
            }
            // Sort spaces based on criteria
            spaces = this.sortEnhancedSpaces(spaces, filters.sortBy || 'trending');
            const result = {
                data: spaces,
                metadata: {
                    totalCount: spaces.length,
                    hasMore: spaces.length === (filters.limit || 20)
                }
            };
            return Result_1.Result.ok(result);
        }, 'EnhancedSpaceDiscovery.discoverSpaces');
    }
    /**
     * Get personalized space recommendations for a user
     */
    async getRecommendedSpaces(userId) {
        return this.execute(async () => {
            const userContext = this.validateUserContext();
            if (userContext.isFailure) {
                return Result_1.Result.fail(userContext.error);
            }
            // Get user profile to understand interests
            const profileId = profile_id_value_1.ProfileId.create(userId).getValue();
            const profileResult = await this.profileRepo.findById(profileId);
            if (profileResult.isFailure) {
                return Result_1.Result.fail('User profile not found');
            }
            const profile = profileResult.getValue();
            const profileData = profile; // ProfileDTO doesn't need toData
            // Get spaces user is already in
            const userEnhancedSpacesResult = await this.spaceRepo.findByMember(profileId.id);
            const userSpaceIds = userEnhancedSpacesResult.isSuccess
                ? userEnhancedSpacesResult.getValue().map((s) => typeof s.id === 'string' ? s.id : s.id)
                : [];
            // Build recommendation based on multiple factors
            const recommendations = [];
            // 1. EnhancedSpaces related to user's major
            if (profileData.personalInfo.major) {
                const majorEnhancedSpaces = await this.spaceRepo.findByType('study-group', this.context.campusId);
                if (majorEnhancedSpaces.isSuccess) {
                    recommendations.push(...majorEnhancedSpaces.getValue().filter(s => !userSpaceIds.includes(s.id)));
                }
            }
            // 2. EnhancedSpaces matching user interests
            for (const interest of profileData.interests.slice(0, 3)) {
                const searchResult = await this.spaceRepo.searchEnhancedSpaces(interest, this.context.campusId);
                if (searchResult.isSuccess) {
                    recommendations.push(...searchResult.getValue().filter((s) => !userSpaceIds.includes(s.id)));
                }
            }
            // 3. Trending spaces user hasn't joined
            const trendingResult = await this.spaceRepo.findTrending(this.context.campusId, 10);
            if (trendingResult.isSuccess) {
                recommendations.push(...trendingResult.getValue().filter(s => !userSpaceIds.includes(s.id)));
            }
            // Deduplicate and limit
            const uniqueEnhancedSpaces = Array.from(new Map(recommendations.map(space => [typeof space.id === 'string' ? space.id : space.id, space])).values()).slice(0, 10);
            const result = {
                data: uniqueEnhancedSpaces,
                metadata: {
                    totalCount: uniqueEnhancedSpaces.length
                }
            };
            return Result_1.Result.ok(result);
        }, 'EnhancedSpaceDiscovery.getRecommendedSpaces');
    }
    /**
     * Create a new space
     */
    async createEnhancedSpace(creatorId, data) {
        return this.execute(async () => {
            // Validate creator exists
            const creatorProfileId = profile_id_value_1.ProfileId.create(creatorId).getValue();
            const creatorResult = await this.profileRepo.findById(creatorProfileId);
            if (creatorResult.isFailure) {
                return Result_1.Result.fail('Creator profile not found');
            }
            // Create space value objects
            const spaceNameResult = space_name_value_1.SpaceName.create(data.name);
            if (spaceNameResult.isFailure) {
                return Result_1.Result.fail(spaceNameResult.error);
            }
            const spaceDescriptionResult = space_description_value_1.SpaceDescription.create(data.description);
            if (spaceDescriptionResult.isFailure) {
                return Result_1.Result.fail(spaceDescriptionResult.error);
            }
            const spaceCategoryResult = space_category_value_1.SpaceCategory.create(data.spaceType);
            if (spaceCategoryResult.isFailure) {
                return Result_1.Result.fail(spaceCategoryResult.error);
            }
            const campusIdResult = campus_id_value_1.CampusId.create(this.context.campusId);
            if (campusIdResult.isFailure) {
                return Result_1.Result.fail(campusIdResult.error);
            }
            // Check if space name already exists
            const existingEnhancedSpace = await this.spaceRepo.findByName(spaceNameResult.getValue().value, this.context.campusId);
            if (existingEnhancedSpace.isSuccess) {
                return Result_1.Result.fail('A space with this name already exists');
            }
            // Generate space ID
            const spaceId = space_id_value_1.SpaceId.create(`space_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`).getValue();
            // Create space
            const spaceResult = enhanced_space_1.EnhancedSpace.create({
                spaceId: spaceId,
                name: spaceNameResult.getValue(),
                description: spaceDescriptionResult.getValue(),
                category: spaceCategoryResult.getValue(),
                campusId: campusIdResult.getValue(),
                createdBy: creatorProfileId,
                visibility: data.visibility,
                settings: {
                    allowInvites: data.settings?.allowInvites ?? true,
                    requireApproval: data.settings?.requireApproval ?? false,
                    allowRSS: data.settings?.allowRSS ?? false
                },
                rssUrl: data.rssUrl
            });
            if (spaceResult.isFailure) {
                return Result_1.Result.fail(spaceResult.error);
            }
            const space = spaceResult.getValue();
            // Creator automatically becomes admin
            space.addMember(creatorProfileId);
            // Save space
            const saveResult = await this.spaceRepo.save(space);
            if (saveResult.isFailure) {
                return Result_1.Result.fail(saveResult.error);
            }
            // If RSS URL provided, schedule initial fetch
            if (data.rssUrl) {
                await this.scheduleRSSFetch(space);
            }
            return Result_1.Result.ok(space);
        }, 'EnhancedSpaceDiscovery.createEnhancedSpace');
    }
    /**
     * Join a space
     */
    async joinEnhancedSpace(userId, spaceId) {
        return this.execute(async () => {
            // Get user profile
            const userProfileId = profile_id_value_1.ProfileId.create(userId).getValue();
            const profileResult = await this.profileRepo.findById(userProfileId);
            if (profileResult.isFailure) {
                return Result_1.Result.fail('User profile not found');
            }
            // Get space
            const spaceIdVO = space_id_value_1.SpaceId.create(spaceId).getValue();
            const spaceResult = await this.spaceRepo.findById(spaceIdVO);
            if (spaceResult.isFailure) {
                return Result_1.Result.fail('EnhancedSpace not found');
            }
            const space = spaceResult.getValue();
            const spaceData = space.toData();
            // Check if already member
            if (space.isMember(userProfileId)) {
                return Result_1.Result.fail('Already a member of this space');
            }
            // Check if space requires approval
            if (spaceData.settings.requireApproval && spaceData.visibility === 'private') {
                return Result_1.Result.fail('This space requires approval to join');
            }
            // Add member to space
            const addMemberResult = space.addMember(userProfileId);
            if (addMemberResult.isFailure) {
                return Result_1.Result.fail(addMemberResult.error);
            }
            // Save updated space
            await this.spaceRepo.save(space);
            // Generate welcome message and suggested actions
            const welcomeMessage = this.generateWelcomeMessage(space);
            const suggestedActions = this.generateSuggestedActions(space);
            const result = {
                data: {
                    space,
                    role: 'member',
                    welcomeMessage,
                    suggestedActions
                }
            };
            return Result_1.Result.ok(result);
        }, 'EnhancedSpaceDiscovery.joinEnhancedSpace');
    }
    /**
     * Leave a space
     */
    async leaveSpace(userId, spaceId) {
        return this.execute(async () => {
            const userProfileId = profile_id_value_1.ProfileId.create(userId).getValue();
            const spaceIdVO = space_id_value_1.SpaceId.create(spaceId).getValue();
            const spaceResult = await this.spaceRepo.findById(spaceIdVO);
            if (spaceResult.isFailure) {
                return Result_1.Result.fail('EnhancedSpace not found');
            }
            const space = spaceResult.getValue();
            // Check if member
            if (!space.isMember(userProfileId)) {
                return Result_1.Result.fail('Not a member of this space');
            }
            // Check if last admin
            const member = space.toData().members.find((m) => m.profileId.id === userId);
            if (member?.role === 'admin' && space.adminCount === 1) {
                return Result_1.Result.fail('Cannot leave space as the only admin. Transfer ownership first.');
            }
            // Remove member
            const removeResult = space.removeMember(userProfileId);
            if (removeResult.isFailure) {
                return Result_1.Result.fail(removeResult.error);
            }
            // Save updated space
            await this.spaceRepo.save(space);
            return Result_1.Result.ok();
        }, 'EnhancedSpaceDiscovery.leaveSpace');
    }
    /**
     * Get space activity summary
     */
    async getSpaceActivity(spaceId) {
        return this.execute(async () => {
            const spaceIdVO = space_id_value_1.SpaceId.create(spaceId).getValue();
            const spaceResult = await this.spaceRepo.findById(spaceIdVO);
            if (spaceResult.isFailure) {
                return Result_1.Result.fail('EnhancedSpace not found');
            }
            const space = spaceResult.getValue();
            const spaceData = space.toData();
            // Get recent posts
            const recentPosts = spaceData.posts
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                .slice(0, 5)
                .map((post) => ({
                id: post.id.id,
                content: post.toData().content,
                authorName: 'Anonymous', // Would fetch actual name
                timestamp: post.createdAt
            }));
            // Count today's posts
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const todaysPosts = spaceData.posts.filter((post) => post.createdAt >= today).length;
            // Get trending topics (simplified)
            const trendingTopics = this.extractTrendingTopics(spaceData.posts);
            const activity = {
                data: {
                    spaceId: spaceId,
                    recentPosts,
                    activeMembers: spaceData.members.length,
                    todaysPosts,
                    trendingTopics
                }
            };
            return Result_1.Result.ok(activity);
        }, 'EnhancedSpaceDiscovery.getSpaceActivity');
    }
    // Private helper methods
    sortEnhancedSpaces(spaces, sortBy) {
        switch (sortBy) {
            case 'members':
                return spaces.sort((a, b) => b.getMemberCount() - a.getMemberCount());
            case 'activity':
                return spaces.sort((a, b) => b.toData().lastActivityAt.getTime() - a.toData().lastActivityAt.getTime());
            case 'new':
                return spaces.sort((a, b) => b.toData().createdAt.getTime() - a.toData().createdAt.getTime());
            case 'trending':
            default:
                // Simple trending: combination of members and recent activity
                return spaces.sort((a, b) => {
                    const aScore = a.getMemberCount() + (Date.now() - a.toData().lastActivityAt.getTime()) / 1000000;
                    const bScore = b.getMemberCount() + (Date.now() - b.toData().lastActivityAt.getTime()) / 1000000;
                    return bScore - aScore;
                });
        }
    }
    generateWelcomeMessage(space) {
        const spaceData = space.toData();
        const name = typeof spaceData.name === 'string' ? spaceData.name : spaceData.name.value;
        return `Welcome to ${name}! ${spaceData.description}`;
    }
    generateSuggestedActions(space) {
        const spaceData = space.toData();
        const actions = [];
        if (spaceData.posts.length > 0) {
            actions.push({
                action: 'read_recent_posts',
                description: 'Catch up on recent discussions'
            });
        }
        actions.push({
            action: 'introduce_yourself',
            description: 'Post an introduction to let others know you\'re here'
        });
        if (spaceData.spaceType === 'study-group') {
            actions.push({
                action: 'share_resources',
                description: 'Share helpful study materials or notes'
            });
        }
        actions.push({
            action: 'invite_friends',
            description: 'Invite classmates who might be interested'
        });
        return actions;
    }
    extractTrendingTopics(posts) {
        // Simple word frequency analysis (would be more sophisticated in production)
        const wordFrequency = new Map();
        posts.forEach((post) => {
            const words = post.toData().content.toLowerCase().split(/\s+/);
            words.forEach((word) => {
                if (word.length > 4) { // Only consider words longer than 4 chars
                    wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
                }
            });
        });
        return Array.from(wordFrequency.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([word]) => word);
    }
    async scheduleRSSFetch(space) {
        // This would trigger an RSS fetch job in production
        console.log(`Scheduling RSS fetch for space ${typeof space.id === 'string' ? space.id : space.id}`);
    }
}
exports.SpaceDiscoveryService = SpaceDiscoveryService;
//# sourceMappingURL=space-discovery.service.js.map