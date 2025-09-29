/**
 * Onboarding Saga
 * Orchestrates the complete user onboarding flow across domains
 */
import { Saga } from '../shared/base';
import { Result } from '../../domain/profile/value-objects';
import { IProfileRepository, ISpaceRepository, IRitualRepository } from '../../repositories/interfaces';
export interface OnboardingData {
    email: string;
    handle: string;
    firstName: string;
    lastName: string;
    major?: string;
    graduationYear?: number;
    interests: string[];
    profilePhoto?: string;
    campusId: string;
    userId: string;
}
export interface OnboardingResult {
    profileId: string;
    joinedSpaces: string[];
    joinedRituals: string[];
    completionScore: number;
    nextSteps: string[];
}
export declare class OnboardingSaga extends Saga {
    private readonly profileRepository;
    private readonly spaceRepository;
    private readonly ritualRepository;
    private readonly eventDispatcher;
    private profileId?;
    private joinedSpaceIds;
    private joinedRitualIds;
    constructor(profileRepository: IProfileRepository, spaceRepository: ISpaceRepository, ritualRepository: IRitualRepository, eventDispatcher: any);
    executeOnboarding(data: OnboardingData): Promise<Result<OnboardingResult>>;
    private createProfile;
    private updateProfileInfo;
    private joinDefaultSpaces;
    private joinOnboardingRitual;
    private completeOnboarding;
    private rollbackProfile;
    private rollbackProfileUpdate;
    private rollbackSpaceJoins;
    private rollbackRitualJoin;
    private rollbackOnboardingCompletion;
    private calculateCompletionScore;
    private generateNextSteps;
}
//# sourceMappingURL=onboarding.saga.d.ts.map