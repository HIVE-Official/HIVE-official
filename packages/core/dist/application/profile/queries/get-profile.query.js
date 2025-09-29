"use strict";
/**
 * Get Profile Query
 * Retrieves a profile with privacy checks
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProfileQueryHandler = exports.GetProfileQuery = void 0;
const base_1 = require("../../shared/base");
const value_objects_1 = require("../../../domain/profile/value-objects");
const enhanced_profile_1 = require("../../../domain/profile/aggregates/enhanced-profile");
const feature_flags_1 = require("../../../infrastructure/feature-flags");
class GetProfileQuery extends base_1.Query {
    constructor(handle, viewerId, campusId) {
        super(campusId, viewerId);
        this.handle = handle;
        this.viewerId = viewerId;
    }
}
exports.GetProfileQuery = GetProfileQuery;
class GetProfileQueryHandler {
    constructor(profileRepository, connectionRepository) {
        this.profileRepository = profileRepository;
        this.connectionRepository = connectionRepository;
    }
    async execute(query) {
        try {
            // Get profile by handle
            const profileResult = await this.profileRepository.findByHandle({
                username: query.handle,
                equals: () => false
            });
            if (profileResult.isFailure) {
                return value_objects_1.Result.fail('Profile not found');
            }
            const profile = profileResult.getValue();
            const isOwnProfile = query.viewerId === profile.id.id;
            // Check viewing permissions
            let canView = true;
            const visibleWidgets = [];
            if ((0, feature_flags_1.isFeatureEnabled)('PROFILE_PRIVACY_CONTROLS') && profile instanceof enhanced_profile_1.EnhancedProfile) {
                const viewer = query.viewerId ? {
                    profileId: { id: query.viewerId, equals: () => false },
                    campusId: { id: query.campusId, equals: () => false }
                } : null;
                canView = profile.canView(viewer);
                // Determine visible widgets
                if (canView) {
                    const widgets = ['bio', 'interests', 'photos', 'activity', 'spaces', 'connections'];
                    for (const widget of widgets) {
                        const viewerType = this.determineViewerType(isOwnProfile, query.campusId === profile.campusId.id, false // Would check connection status
                        );
                        if (profile.privacy.canViewWidget(widget, viewerType)) {
                            visibleWidgets.push(widget);
                        }
                    }
                }
            }
            else {
                // Legacy profile - all widgets visible if can view
                if (canView) {
                    visibleWidgets.push('bio', 'interests', 'photos', 'activity', 'spaces', 'connections');
                }
            }
            // Get connection status if social graph is enabled
            let connectionStatus = 'none';
            if ((0, feature_flags_1.isFeatureEnabled)('PROFILE_SOCIAL_GRAPH') && query.viewerId && !isOwnProfile) {
                connectionStatus = await this.getConnectionStatus(query.viewerId, profile.id.id);
            }
            // Build result based on visibility
            const result = {
                id: profile.id.id,
                handle: profile.handle.username,
                fullName: canView ? profile.fullName : 'Private Profile',
                bio: canView && visibleWidgets.includes('bio') ? profile.bio : undefined,
                avatar: undefined, // Would come from photos
                isVerified: profile instanceof enhanced_profile_1.EnhancedProfile ? profile.isVerified : false,
                followerCount: profile instanceof enhanced_profile_1.EnhancedProfile ? profile.followerCount : 0,
                followingCount: profile instanceof enhanced_profile_1.EnhancedProfile ? profile.followingCount : 0,
                isOwnProfile,
                canView,
                visibleWidgets,
                connectionStatus
            };
            // Add badges if verified
            if (profile instanceof enhanced_profile_1.EnhancedProfile && profile.badges.length > 0) {
                result.badges = profile.badges;
            }
            // Track profile view if enabled
            if ((0, feature_flags_1.isFeatureEnabled)('PROFILE_VIEW_TRACKING') && !isOwnProfile && canView) {
                profile.recordActivity('view');
                await this.profileRepository.save(profile);
            }
            return value_objects_1.Result.ok(result);
        }
        catch (error) {
            return value_objects_1.Result.fail(`Failed to get profile: ${error}`);
        }
    }
    determineViewerType(isOwnProfile, sameCampus, isConnection) {
        if (isOwnProfile)
            return 'self';
        if (isConnection)
            return 'connection';
        if (sameCampus)
            return 'campus';
        return 'public';
    }
    async getConnectionStatus(viewerId, profileId) {
        // Would query connection repository
        // For now, return default
        return 'none';
    }
}
exports.GetProfileQueryHandler = GetProfileQueryHandler;
//# sourceMappingURL=get-profile.query.js.map