"use strict";
/**
 * Update Privacy Command
 * Updates user's privacy settings
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePrivacyCommandHandler = exports.UpdatePrivacyCommand = void 0;
const base_1 = require("../../shared/base");
const value_objects_1 = require("../../../domain/profile/value-objects");
const feature_flags_1 = require("../../../infrastructure/feature-flags");
class UpdatePrivacyCommand extends base_1.Command {
    constructor(profileId, visibility, searchable, ghostMode, widgetPrivacy, userId, campusId) {
        super(userId, campusId);
        this.profileId = profileId;
        this.visibility = visibility;
        this.searchable = searchable;
        this.ghostMode = ghostMode;
        this.widgetPrivacy = widgetPrivacy;
    }
}
exports.UpdatePrivacyCommand = UpdatePrivacyCommand;
class UpdatePrivacyCommandHandler {
    constructor(profileRepository, eventDispatcher) {
        this.profileRepository = profileRepository;
        this.eventDispatcher = eventDispatcher;
    }
    async execute(command) {
        if (!(0, feature_flags_1.isFeatureEnabled)('PROFILE_PRIVACY_CONTROLS')) {
            return value_objects_1.Result.fail('Privacy controls are not enabled');
        }
        try {
            // Get profile
            const profileResult = await this.profileRepository.findById({
                id: command.profileId,
                equals: () => false
            });
            if (profileResult.isFailure) {
                return value_objects_1.Result.fail('Profile not found');
            }
            const profile = profileResult.getValue();
            // Verify ownership
            if (profile.id.id !== command.profileId) {
                return value_objects_1.Result.fail('Unauthorized to update this profile');
            }
            // Update privacy settings
            const updateResult = profile.updatePrivacy({
                visibility: command.visibility,
                searchable: command.searchable,
                ghostMode: command.ghostMode
            });
            if (updateResult.isFailure) {
                return value_objects_1.Result.fail(updateResult.error);
            }
            // Update widget privacy if provided
            if (command.widgetPrivacy && (0, feature_flags_1.isFeatureEnabled)('PROFILE_WIDGET_PRIVACY')) {
                for (const [widget, level] of Object.entries(command.widgetPrivacy)) {
                    profile.privacy.updateWidgetPrivacy(widget, level);
                }
            }
            // Save profile
            const saveResult = await this.profileRepository.save(profile);
            if (saveResult.isFailure) {
                return value_objects_1.Result.fail(saveResult.error);
            }
            // Dispatch events
            if ((0, feature_flags_1.isFeatureEnabled)('PROFILE_DOMAIN_EVENTS')) {
                const events = profile.getUncommittedEvents();
                await this.eventDispatcher.dispatch(events);
                profile.markEventsAsCommitted();
            }
            return value_objects_1.Result.ok({
                success: true,
                newVisibility: profile.privacy.profileVisibility,
                isGhostMode: profile.privacy.isInGhostMode
            });
        }
        catch (error) {
            return value_objects_1.Result.fail(`Failed to update privacy: ${error}`);
        }
    }
}
exports.UpdatePrivacyCommandHandler = UpdatePrivacyCommandHandler;
//# sourceMappingURL=update-privacy.command.js.map