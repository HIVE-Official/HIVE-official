"use strict";
/**
 * Complete Onboarding Command
 * Creates user profile and completes onboarding after magic link verification
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompleteOnboardingCommandHandler = exports.CompleteOnboardingCommand = void 0;
const base_1 = require("../../shared/base");
const Result_1 = require("../../../domain/shared/base/Result");
class CompleteOnboardingCommand extends base_1.Command {
    constructor(userId, campusId, email, handle, firstName, lastName, major, graduationYear, interests = [], profilePhoto) {
        super(userId, campusId);
        this.email = email;
        this.handle = handle;
        this.firstName = firstName;
        this.lastName = lastName;
        this.major = major;
        this.graduationYear = graduationYear;
        this.interests = interests;
        this.profilePhoto = profilePhoto;
    }
}
exports.CompleteOnboardingCommand = CompleteOnboardingCommand;
class CompleteOnboardingCommandHandler {
    constructor(profileRepository, spaceRepository, ritualRepository, eventDispatcher) {
        this.profileRepository = profileRepository;
        this.spaceRepository = spaceRepository;
        this.ritualRepository = ritualRepository;
        this.eventDispatcher = eventDispatcher;
    }
    async execute(command) {
        try {
            // Check if profile already exists
            const existingProfileResult = await this.profileRepository.findByEmail(command.email);
            if (existingProfileResult.isSuccess) {
                return Result_1.Result.fail('Profile already exists for this email');
            }
            // Check if handle is taken
            const existingHandleResult = await this.profileRepository.findByHandle(command.handle);
            if (existingHandleResult.isSuccess) {
                return Result_1.Result.fail('Handle is already taken');
            }
            // Create profile directly (simplified without saga)
            const profileId = command.userId;
            // For now, return simplified result
            // TODO: Implement proper profile creation with new DDD structure
            const onboardingData = {
                profileId,
                joinedSpaces: [],
                joinedRituals: [],
                completionScore: 100
            };
            // Dispatch onboarding completed event
            await this.eventDispatcher.dispatch([{
                    eventType: 'user.onboarding_completed',
                    userId: command.userId,
                    profileId: onboardingData.profileId,
                    campusId: command.campusId,
                    timestamp: new Date()
                }]);
            // Determine redirect based on completion
            const redirectUrl = onboardingData.completionScore >= 80
                ? '/feed'
                : '/onboarding/complete';
            return Result_1.Result.ok({
                profileId: onboardingData.profileId,
                handle: command.handle,
                joinedSpaces: onboardingData.joinedSpaces,
                joinedRituals: onboardingData.joinedRituals,
                onboardingComplete: true,
                redirectUrl
            });
        }
        catch (error) {
            return Result_1.Result.fail(`Onboarding failed: ${error}`);
        }
    }
}
exports.CompleteOnboardingCommandHandler = CompleteOnboardingCommandHandler;
//# sourceMappingURL=complete-onboarding.command.js.map