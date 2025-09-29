"use strict";
/**
 * Onboarding Saga
 * Orchestrates the complete user onboarding flow across domains
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingSaga = void 0;
const base_1 = require("../shared/base");
const value_objects_1 = require("../../domain/profile/value-objects");
const create_profile_command_1 = require("../profile/commands/create-profile.command");
class OnboardingSaga extends base_1.Saga {
    constructor(profileRepository, spaceRepository, ritualRepository, eventDispatcher) {
        super();
        this.profileRepository = profileRepository;
        this.spaceRepository = spaceRepository;
        this.ritualRepository = ritualRepository;
        this.eventDispatcher = eventDispatcher;
        this.joinedSpaceIds = [];
        this.joinedRitualIds = [];
    }
    async executeOnboarding(data) {
        // Step 1: Create Profile
        this.addStep(async () => this.createProfile(data), async () => this.rollbackProfile());
        // Step 2: Update Profile with Additional Info
        this.addStep(async () => this.updateProfileInfo(data), async () => this.rollbackProfileUpdate());
        // Step 3: Join Default Spaces
        this.addStep(async () => this.joinDefaultSpaces(data), async () => this.rollbackSpaceJoins());
        // Step 4: Join Onboarding Ritual
        this.addStep(async () => this.joinOnboardingRitual(data), async () => this.rollbackRitualJoin());
        // Step 5: Complete Onboarding
        this.addStep(async () => this.completeOnboarding(), async () => this.rollbackOnboardingCompletion());
        // Execute the saga
        const result = await this.execute();
        if (result.isFailure) {
            return value_objects_1.Result.fail(result.error);
        }
        // Calculate completion score
        const completionScore = this.calculateCompletionScore(data);
        // Generate next steps
        const nextSteps = this.generateNextSteps(data);
        return value_objects_1.Result.ok({
            profileId: this.profileId,
            joinedSpaces: this.joinedSpaceIds,
            joinedRituals: this.joinedRitualIds,
            completionScore,
            nextSteps
        });
    }
    // Step implementations
    async createProfile(data) {
        const handler = new create_profile_command_1.CreateProfileCommandHandler(this.profileRepository, this.eventDispatcher);
        const command = new create_profile_command_1.CreateProfileCommand(data.email, data.handle, data.firstName, data.lastName, 'student', data.userId, data.campusId);
        const result = await handler.execute(command);
        if (result.isFailure) {
            return value_objects_1.Result.fail(result.error);
        }
        this.profileId = result.getValue().profileId;
        return value_objects_1.Result.ok();
    }
    async updateProfileInfo(data) {
        if (!this.profileId) {
            return value_objects_1.Result.fail('Profile ID not set');
        }
        const profileResult = await this.profileRepository.findById({
            id: this.profileId,
            equals: () => false
        });
        if (profileResult.isFailure) {
            return value_objects_1.Result.fail('Profile not found');
        }
        const profile = profileResult.getValue();
        // Update personal info
        if (data.major || data.graduationYear) {
            profile.updatePersonalInfo({
                major: data.major,
                graduationYear: data.graduationYear
            });
        }
        // Add interests
        if (data.interests.length > 0) {
            profile.updateInterests(data.interests);
        }
        // Add profile photo
        if (data.profilePhoto) {
            profile.addPhoto(data.profilePhoto);
        }
        // Save profile
        const saveResult = await this.profileRepository.save(profile);
        if (saveResult.isFailure) {
            return value_objects_1.Result.fail(saveResult.error);
        }
        return value_objects_1.Result.ok();
    }
    async joinDefaultSpaces(data) {
        // Get recommended spaces based on interests and major
        const spacesResult = await this.spaceRepository.findRecommended(data.campusId, data.interests, data.major);
        if (spacesResult.isFailure) {
            return value_objects_1.Result.ok(); // Don't fail onboarding if no spaces found
        }
        const spaces = spacesResult.getValue();
        const defaultSpaceNames = ['Welcome Space', 'New Students', data.major ? `${data.major} Students` : null].filter(Boolean);
        // Join up to 3 spaces
        const spacesToJoin = spaces
            .filter(space => defaultSpaceNames.some(name => space.name.name.includes(name)) ||
            data.interests.some(interest => space.name.name.toLowerCase().includes(interest.toLowerCase())))
            .slice(0, 3);
        for (const space of spacesToJoin) {
            const joinResult = space.addMember({ id: this.profileId, equals: () => false });
            if (joinResult.isSuccess) {
                this.joinedSpaceIds.push(space.id.id);
                await this.spaceRepository.save(space);
            }
        }
        return value_objects_1.Result.ok();
    }
    async joinOnboardingRitual(data) {
        // Find active onboarding ritual
        const ritualResult = await this.ritualRepository.findActiveByType('onboarding', data.campusId);
        if (ritualResult.isFailure) {
            return value_objects_1.Result.ok(); // Don't fail if no ritual active
        }
        const ritual = ritualResult.getValue();
        // Join the ritual
        const joinResult = ritual.addParticipant({ id: this.profileId, equals: () => false });
        if (joinResult.isSuccess) {
            this.joinedRitualIds.push(ritual.id.id);
            await this.ritualRepository.save(ritual);
            // Record initial activity
            ritual.recordActivity({ id: this.profileId, equals: () => false }, { type: 'profile_created' }, { value: 10 }, { step: 'profile_creation' });
            await this.ritualRepository.save(ritual);
        }
        return value_objects_1.Result.ok();
    }
    async completeOnboarding() {
        const profileResult = await this.profileRepository.findById({
            id: this.profileId,
            equals: () => false
        });
        if (profileResult.isFailure) {
            return value_objects_1.Result.fail('Profile not found');
        }
        const profile = profileResult.getValue();
        // Mark onboarding as complete
        const completeResult = profile.completeOnboarding();
        if (completeResult.isFailure) {
            return value_objects_1.Result.fail(completeResult.error);
        }
        await this.profileRepository.save(profile);
        // Dispatch onboarding completed event
        await this.eventDispatcher.dispatch([{
                eventType: 'onboarding.completed',
                profileId: this.profileId,
                joinedSpaces: this.joinedSpaceIds,
                joinedRituals: this.joinedRitualIds,
                timestamp: new Date()
            }]);
        return value_objects_1.Result.ok();
    }
    // Rollback methods
    async rollbackProfile() {
        if (this.profileId) {
            // Soft delete the profile
            const profileResult = await this.profileRepository.findById({
                id: this.profileId,
                equals: () => false
            });
            if (profileResult.isSuccess) {
                const profile = profileResult.getValue();
                profile.isActive = false;
                await this.profileRepository.save(profile);
            }
        }
    }
    async rollbackProfileUpdate() {
        // Profile updates are non-critical, no rollback needed
    }
    async rollbackSpaceJoins() {
        for (const spaceId of this.joinedSpaceIds) {
            const spaceResult = await this.spaceRepository.findById({
                id: spaceId,
                equals: () => false
            });
            if (spaceResult.isSuccess) {
                const space = spaceResult.getValue();
                space.removeMember({ id: this.profileId, equals: () => false }, { id: this.profileId, equals: () => false });
                await this.spaceRepository.save(space);
            }
        }
    }
    async rollbackRitualJoin() {
        for (const ritualId of this.joinedRitualIds) {
            const ritualResult = await this.ritualRepository.findById({
                id: ritualId,
                equals: () => false
            });
            if (ritualResult.isSuccess) {
                const ritual = ritualResult.getValue();
                ritual.removeParticipant({ id: this.profileId, equals: () => false });
                await this.ritualRepository.save(ritual);
            }
        }
    }
    async rollbackOnboardingCompletion() {
        // This is the final step, no rollback needed
    }
    // Helper methods
    calculateCompletionScore(data) {
        let score = 25; // Base for creating profile
        if (data.major)
            score += 10;
        if (data.graduationYear)
            score += 10;
        if (data.interests.length > 0)
            score += 15;
        if (data.profilePhoto)
            score += 15;
        if (this.joinedSpaceIds.length > 0)
            score += 15;
        if (this.joinedRitualIds.length > 0)
            score += 10;
        return Math.min(100, score);
    }
    generateNextSteps(data) {
        const steps = [];
        if (!data.profilePhoto) {
            steps.push('Add a profile photo to help others recognize you');
        }
        if (this.joinedSpaceIds.length < 3) {
            steps.push('Join more spaces to connect with your community');
        }
        if (data.interests.length < 5) {
            steps.push('Add more interests for better recommendations');
        }
        steps.push('Start posting in your spaces');
        steps.push('Connect with classmates in your major');
        return steps;
    }
}
exports.OnboardingSaga = OnboardingSaga;
//# sourceMappingURL=onboarding.saga.js.map