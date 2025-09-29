"use strict";
/**
 * Profile Onboarding Service
 * Orchestrates the complete user onboarding flow
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileOnboardingService = void 0;
const base_service_1 = require("./base.service");
const Result_1 = require("../domain/shared/base/Result");
const enhanced_profile_1 = require("../domain/profile/aggregates/enhanced-profile");
const ub_email_value_1 = require("../domain/identity/value-objects/ub-email.value");
const profile_handle_value_1 = require("../domain/profile/value-objects/profile-handle.value");
const profile_id_value_1 = require("../domain/profile/value-objects/profile-id.value");
const personal_info_value_1 = require("../domain/identity/value-objects/personal-info.value");
const factory_1 = require("../infrastructure/repositories/factory");
class ProfileOnboardingService extends base_service_1.BaseApplicationService {
    constructor(context) {
        super(context);
        this.profileRepo = (0, factory_1.getProfileRepository)();
        this.spaceRepo = (0, factory_1.getSpaceRepository)();
        this.feedRepo = (0, factory_1.getFeedRepository)();
    }
    /**
     * Complete profile onboarding flow
     */
    async completeOnboarding(data) {
        return this.execute(async () => {
            // Step 1: Validate email domain
            const emailValidation = await this.validateEmailDomain(data.email);
            if (emailValidation.isFailure) {
                return Result_1.Result.fail(emailValidation.error);
            }
            // Step 2: Check handle availability
            const handleAvailable = await this.checkHandleAvailability(data.handle);
            if (handleAvailable.isFailure) {
                return Result_1.Result.fail(handleAvailable.error);
            }
            // Step 3: Create profile
            const profileResult = await this.createProfile(data);
            if (profileResult.isFailure) {
                return Result_1.Result.fail(profileResult.error);
            }
            const profile = profileResult.getValue();
            // Step 4: Initialize user feed
            const profileId = profile_id_value_1.ProfileId.create(profile.id).getValue();
            await this.initializeFeed(profileId);
            // Step 5: Get space suggestions based on interests and major
            const suggestedSpaces = await this.getSuggestedSpaces(data.major, data.interests || []);
            // Step 6: Auto-join default spaces for new users
            await this.joinDefaultSpaces(profile);
            // Step 7: Generate next steps for user
            const nextSteps = this.generateNextSteps(profile, suggestedSpaces.getValue());
            const result = {
                data: {
                    profile,
                    suggestedSpaces: suggestedSpaces.getValue().slice(0, 5).map(space => ({
                        id: space.id.id,
                        name: space.name.name,
                        memberCount: space.getMemberCount()
                    })),
                    nextSteps
                },
                warnings: this.generateOnboardingWarnings(data)
            };
            return Result_1.Result.ok(result);
        }, 'ProfileOnboarding.completeOnboarding');
    }
    /**
     * Update onboarding progress
     */
    async updateOnboardingProgress(profileId, step, completed) {
        return this.execute(async () => {
            const profileIdVO = profile_id_value_1.ProfileId.create(profileId).getValue();
            const profileResult = await this.profileRepo.findById(profileIdVO);
            if (profileResult.isFailure) {
                return Result_1.Result.fail('Profile not found');
            }
            const profile = profileResult.getValue();
            // Track onboarding progress (would be stored in metadata)
            console.log(`Onboarding progress for ${profileId}: ${step} = ${completed}`);
            // Check if onboarding is complete
            if (this.isOnboardingComplete(profile)) {
                const personalInfoResult = personal_info_value_1.PersonalInfo.create({
                    firstName: profile.personalInfo.firstName || '',
                    lastName: profile.personalInfo.lastName || '',
                    bio: profile.personalInfo.bio || '',
                    major: profile.personalInfo.major || '',
                    graduationYear: profile.personalInfo.graduationYear || null,
                    dorm: profile.personalInfo.dorm || ''
                });
                if (personalInfoResult.isSuccess) {
                    const completeResult = profile.completeOnboarding(profile.personalInfo, profile.interests);
                    if (completeResult.isSuccess) {
                        await this.profileRepo.save(profile);
                    }
                }
            }
            return Result_1.Result.ok();
        }, 'ProfileOnboarding.updateOnboardingProgress');
    }
    /**
     * Get onboarding status
     */
    async getOnboardingStatus(profileId) {
        return this.execute(async () => {
            const profileIdVO = profile_id_value_1.ProfileId.create(profileId).getValue();
            const profileResult = await this.profileRepo.findById(profileIdVO);
            if (profileResult.isFailure) {
                return Result_1.Result.fail('Profile not found');
            }
            const profile = profileResult.getValue();
            const profileData = profile.toData();
            const requiredSteps = [
                'email_verified',
                'handle_set',
                'basic_info',
                'interests_selected',
                'profile_photo',
                'first_space_joined'
            ];
            const completedSteps = [];
            if (profileData.email)
                completedSteps.push('email_verified');
            if (profileData.handle)
                completedSteps.push('handle_set');
            if (profileData.personalInfo.firstName)
                completedSteps.push('basic_info');
            if (profileData.interests.length > 0)
                completedSteps.push('interests_selected');
            if (profileData.photos.length > 0)
                completedSteps.push('profile_photo');
            // Would check space membership for 'first_space_joined'
            const remainingSteps = requiredSteps.filter(step => !completedSteps.includes(step));
            const percentComplete = Math.round((completedSteps.length / requiredSteps.length) * 100);
            return Result_1.Result.ok({
                isComplete: profileData.isOnboarded,
                completedSteps,
                remainingSteps,
                percentComplete
            });
        }, 'ProfileOnboarding.getOnboardingStatus');
    }
    // Private helper methods
    async validateEmailDomain(email) {
        const emailResult = ub_email_value_1.UBEmail.create(email);
        if (emailResult.isFailure) {
            return Result_1.Result.fail('Invalid email format or domain');
        }
        return Result_1.Result.ok();
    }
    async checkHandleAvailability(handle) {
        const handleResult = profile_handle_value_1.ProfileHandle.create(handle);
        if (handleResult.isFailure) {
            return Result_1.Result.fail(handleResult.error);
        }
        const existingProfile = await this.profileRepo.findByHandle(handleResult.getValue().value);
        if (existingProfile.isSuccess) {
            return Result_1.Result.fail('Handle is already taken');
        }
        return Result_1.Result.ok();
    }
    async createProfile(data) {
        // Create value objects
        const emailResult = ub_email_value_1.UBEmail.create(data.email);
        const handleResult = profile_handle_value_1.ProfileHandle.create(data.handle);
        if (emailResult.isFailure) {
            return Result_1.Result.fail(emailResult.error);
        }
        if (handleResult.isFailure) {
            return Result_1.Result.fail(handleResult.error);
        }
        // Generate profile ID
        const profileId = profile_id_value_1.ProfileId.create(`profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`).getValue();
        // Create profile
        const profileResult = enhanced_profile_1.EnhancedProfile.create({
            profileId: profileId,
            email: emailResult.getValue(),
            handle: handleResult.getValue(),
            personalInfo: {
                firstName: data.firstName,
                lastName: data.lastName,
                bio: data.bio,
                major: data.major,
                graduationYear: data.graduationYear,
                dorm: data.dorm
            }
        });
        if (profileResult.isFailure) {
            return Result_1.Result.fail(profileResult.error);
        }
        const profile = profileResult.getValue();
        // Add interests
        if (data.interests) {
            for (const interest of data.interests) {
                profile.addInterest(interest);
            }
        }
        // Add profile image
        if (data.profileImageUrl) {
            await profile.addPhoto(data.profileImageUrl);
        }
        // Save profile
        const saveResult = await this.profileRepo.save(profile);
        if (saveResult.isFailure) {
            return Result_1.Result.fail(saveResult.error);
        }
        return Result_1.Result.ok(profile);
    }
    async initializeFeed(profileId) {
        const feed = await this.feedRepo.findByUserId(profileId);
        if (feed.isFailure) {
            console.error('Failed to initialize feed:', feed.error);
        }
    }
    async getSuggestedSpaces(major, interests = []) {
        const suggestions = [];
        // Get spaces by major
        if (major) {
            const majorSpaces = await this.spaceRepo.findByType('study-group', this.context.campusId);
            if (majorSpaces.isSuccess) {
                suggestions.push(...majorSpaces.getValue());
            }
        }
        // Get trending spaces
        const trendingSpaces = await this.spaceRepo.findTrending(this.context.campusId, 10);
        if (trendingSpaces.isSuccess) {
            suggestions.push(...trendingSpaces.getValue());
        }
        // Deduplicate
        const uniqueSpaces = Array.from(new Map(suggestions.map(space => [space.spaceId.value, space])).values());
        return Result_1.Result.ok(uniqueSpaces);
    }
    async joinDefaultSpaces(profile) {
        // Auto-join campus-wide default spaces
        const defaultSpaceNames = ['Welcome Space', 'New Students', 'Campus Updates'];
        for (const spaceName of defaultSpaceNames) {
            try {
                // This would be implemented when space joining is added
                console.log(`Auto-joining ${spaceName} for user ${profile.profileId.value}`);
            }
            catch (error) {
                console.error(`Failed to auto-join ${spaceName}:`, error);
            }
        }
    }
    generateNextSteps(profile, suggestedSpaces) {
        const steps = [];
        const profileData = profile.toDTO();
        if (!profileData.personalInfo.profilePhoto) {
            steps.push({
                action: 'add_profile_photo',
                description: 'Add a profile photo to help others recognize you',
                priority: 1
            });
        }
        if (profileData.interests.length < 3) {
            steps.push({
                action: 'add_interests',
                description: 'Add more interests to get better space recommendations',
                priority: 2
            });
        }
        if (suggestedSpaces.length > 0) {
            steps.push({
                action: 'join_spaces',
                description: `Join spaces like "${suggestedSpaces[0].name.name}" to connect with others`,
                priority: 3
            });
        }
        steps.push({
            action: 'explore_feed',
            description: 'Check out your personalized feed to see what\'s happening on campus',
            priority: 4
        });
        steps.push({
            action: 'connect_with_others',
            description: 'Find and connect with classmates in your major',
            priority: 5
        });
        return steps.sort((a, b) => a.priority - b.priority);
    }
    generateOnboardingWarnings(data) {
        const warnings = [];
        if (!data.bio) {
            warnings.push('Adding a bio helps others learn more about you');
        }
        if (!data.major) {
            warnings.push('Adding your major helps you find relevant study groups');
        }
        if (!data.interests || data.interests.length === 0) {
            warnings.push('Adding interests improves your feed and space recommendations');
        }
        return warnings;
    }
    isOnboardingComplete(profile) {
        const data = profile.toDTO();
        return !!(data.handle &&
            data.personalInfo.firstName &&
            data.personalInfo.lastName &&
            data.interests.length > 0);
    }
}
exports.ProfileOnboardingService = ProfileOnboardingService;
//# sourceMappingURL=profile-onboarding.service.js.map