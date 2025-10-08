"use strict";
/**
 * Profile Domain Event Handlers
 * Handle cross-aggregate communication when profile events occur
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleProfileOnboarded = exports.handleProfileCreated = void 0;
const factory_1 = require("../../infrastructure/repositories/factory");
const profile_id_value_1 = require("../../domain/profile/value-objects/profile-id.value");
const campus_id_value_1 = require("../../domain/profile/value-objects/campus-id.value");
const enhanced_feed_1 = require("../../domain/feed/enhanced-feed");
/**
 * When a profile is created:
 * 1. Create default feed for user
 * 2. Set up initial notifications preferences
 * 3. Track sign-up analytics
 */
const handleProfileCreated = async (event) => {
    console.log(`[ProfileEventHandler] Profile created: ${event.aggregateId}`);
    try {
        const feedRepo = (0, factory_1.getFeedRepository)();
        const profileId = profile_id_value_1.ProfileId.create(event.aggregateId).getValue();
        const campusId = campus_id_value_1.CampusId.createUBBuffalo().getValue();
        // Create default feed for the new user
        const feedResult = enhanced_feed_1.EnhancedFeed.create(profileId, campusId);
        if (feedResult.isSuccess) {
            await feedRepo.saveFeed(feedResult.getValue());
            console.log(`[ProfileEventHandler] Default feed created for profile ${event.aggregateId}`);
        }
        // TODO: Set up default notification preferences
        // TODO: Track sign-up analytics
    }
    catch (error) {
        console.error('[ProfileEventHandler] Failed to handle profile created:', error);
    }
};
exports.handleProfileCreated = handleProfileCreated;
/**
 * When a profile completes onboarding:
 * 1. Recommend spaces based on interests
 * 2. Suggest initial connections
 * 3. Send welcome notification with next steps
 */
const handleProfileOnboarded = async (event) => {
    console.log(`[ProfileEventHandler] Profile onboarded: ${event.aggregateId}`);
    try {
        // Get recommended spaces based on interests
        // TODO: Find spaces matching user interests
        // TODO: Suggest connections based on major/dorm
        // TODO: Send welcome notification with personalized next steps
        // TODO: Track onboarding completion analytics
    }
    catch (error) {
        console.error('[ProfileEventHandler] Failed to handle profile onboarded:', error);
    }
};
exports.handleProfileOnboarded = handleProfileOnboarded;
//# sourceMappingURL=profile-event.handlers.js.map