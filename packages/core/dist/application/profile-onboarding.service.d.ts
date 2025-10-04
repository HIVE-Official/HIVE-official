/**
 * Profile Onboarding Service
 * Orchestrates the complete user onboarding flow
 */
import { BaseApplicationService, ApplicationServiceContext, ServiceResult } from './base.service';
import { Result } from '../domain/shared/base/Result';
import { Profile } from '../domain/profile/aggregates/profile.aggregate';
export interface OnboardingData {
    email: string;
    handle: string;
    firstName: string;
    lastName: string;
    bio?: string;
    major?: string;
    graduationYear?: number;
    dorm?: string;
    interests?: string[];
    profileImageUrl?: string;
}
export interface OnboardingResult {
    profile: Profile;
    suggestedSpaces: Array<{
        id: string;
        name: string;
        memberCount: number;
    }>;
    nextSteps: Array<{
        action: string;
        description: string;
        priority: number;
    }>;
}
export declare class ProfileOnboardingService extends BaseApplicationService {
    private profileRepo;
    private spaceRepo;
    private feedRepo;
    constructor(context?: Partial<ApplicationServiceContext>);
    /**
     * Complete profile onboarding flow
     */
    completeOnboarding(data: OnboardingData): Promise<Result<ServiceResult<OnboardingResult>>>;
    /**
     * Update onboarding progress
     */
    updateOnboardingProgress(profileId: string, step: string, completed: boolean): Promise<Result<void>>;
    /**
     * Get onboarding status (delegates to domain logic)
     */
    getOnboardingStatus(profileId: string): Promise<Result<{
        isComplete: boolean;
        completedSteps: string[];
        remainingSteps: string[];
        percentComplete: number;
    }>>;
    private validateEmailDomain;
    private checkHandleAvailability;
    private createProfile;
    private initializeFeed;
    private getSuggestedSpaces;
    private joinDefaultSpaces;
}
//# sourceMappingURL=profile-onboarding.service.d.ts.map