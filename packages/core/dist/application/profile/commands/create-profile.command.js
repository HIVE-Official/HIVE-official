"use strict";
/**
 * Create Profile Command
 * Creates a new user profile with onboarding
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProfileCommandHandler = exports.CreateProfileCommand = void 0;
const base_1 = require("../../shared/base");
const value_objects_1 = require("../../../domain/profile/value-objects");
const profile_factory_1 = require("../../../domain/profile/profile-factory");
const enhanced_profile_1 = require("../../../domain/profile/aggregates/enhanced-profile");
const feature_flags_1 = require("../../../infrastructure/feature-flags");
class CreateProfileCommand extends base_1.Command {
    constructor(email, handle, firstName, lastName, userType, userId, campusId) {
        super(userId, campusId);
        this.email = email;
        this.handle = handle;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userType = userType;
    }
}
exports.CreateProfileCommand = CreateProfileCommand;
class CreateProfileCommandHandler {
    constructor(profileRepository, eventDispatcher) {
        this.profileRepository = profileRepository;
        this.eventDispatcher = eventDispatcher;
    }
    async execute(command) {
        try {
            // Check if handle is available
            const existingHandle = await this.profileRepository.findByHandle({
                username: command.handle,
                equals: () => false
            });
            if (existingHandle.isSuccess) {
                return value_objects_1.Result.fail('Handle is already taken');
            }
            // Check if email already has profile
            const existingEmail = await this.profileRepository.findByEmail({
                email: command.email,
                equals: () => false
            });
            if (existingEmail.isSuccess) {
                return value_objects_1.Result.fail('Email already has a profile');
            }
            // Create profile using factory (handles feature flags)
            const profileResult = (0, feature_flags_1.isFeatureEnabled)('PROFILE_CAMPUS_ISOLATION')
                ? enhanced_profile_1.EnhancedProfile.create({
                    email: command.email,
                    handle: command.handle,
                    firstName: command.firstName,
                    lastName: command.lastName,
                    campusId: command.campusId,
                    userType: command.userType === 'faculty' ? 'faculty' : 'student'
                })
                : profile_factory_1.ProfileFactory.create({
                    email: command.email,
                    handle: command.handle,
                    firstName: command.firstName,
                    lastName: command.lastName,
                    campusId: command.campusId
                });
            if (profileResult.isFailure) {
                return value_objects_1.Result.fail(profileResult.error);
            }
            const profile = profileResult.getValue();
            // Save to repository
            const saveResult = await this.profileRepository.save(profile);
            if (saveResult.isFailure) {
                return value_objects_1.Result.fail(saveResult.error);
            }
            // Dispatch domain events
            if ((0, feature_flags_1.isFeatureEnabled)('PROFILE_DOMAIN_EVENTS') && 'getUncommittedEvents' in profile) {
                const events = profile.getUncommittedEvents();
                await this.eventDispatcher.dispatch(events);
                profile.markEventsAsCommitted();
            }
            // Generate next steps for onboarding
            const nextSteps = this.generateNextSteps(profile);
            return value_objects_1.Result.ok({
                profileId: profile.id.id,
                handle: profile.handle.username,
                isOnboarded: profile.isOnboarded,
                nextSteps
            });
        }
        catch (error) {
            return value_objects_1.Result.fail(`Failed to create profile: ${error}`);
        }
    }
    generateNextSteps(profile) {
        const steps = [];
        if (!profile.isOnboarded) {
            steps.push('Complete your profile information');
            steps.push('Upload a profile photo');
            steps.push('Select your interests');
            steps.push('Join your first space');
        }
        return steps;
    }
}
exports.CreateProfileCommandHandler = CreateProfileCommandHandler;
//# sourceMappingURL=create-profile.command.js.map