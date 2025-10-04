/**
 * Profile Onboarding Service
 * Orchestrates the complete user onboarding flow
 */

import { BaseApplicationService, ApplicationServiceContext, ServiceResult } from './base.service';
import { Result } from '../domain/shared/base/Result';
import { Profile } from '../domain/profile/aggregates/profile.aggregate';
import { UBEmail } from '../domain/profile/value-objects/ub-email.value';
import { ProfileHandle } from '../domain/profile/value-objects/profile-handle.value';
import { ProfileId } from '../domain/profile/value-objects/profile-id.value';
import { CampusId } from '../domain/profile/value-objects/campus-id.value';
import { UserType } from '../domain/profile/value-objects/user-type.value';
import { PersonalInfo } from '../domain/profile/value-objects/personal-info.value';
import {
  getProfileRepository,
  getSpaceRepository,
  getFeedRepository
} from '../infrastructure/repositories/factory';
import {
  IProfileRepository,
  ISpaceRepository,
  IFeedRepository
} from '../infrastructure/repositories/interfaces';

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
  suggestedSpaces: Array<{ id: string; name: string; memberCount: number }>;
  nextSteps: Array<{ action: string; description: string; priority: number }>;
}

export class ProfileOnboardingService extends BaseApplicationService {
  private profileRepo: IProfileRepository;
  private spaceRepo: ISpaceRepository;
  private feedRepo: IFeedRepository;

  constructor(context?: Partial<ApplicationServiceContext>) {
    super(context);
    this.profileRepo = getProfileRepository();
    this.spaceRepo = getSpaceRepository();
    this.feedRepo = getFeedRepository();
  }

  /**
   * Complete profile onboarding flow
   */
  async completeOnboarding(data: OnboardingData): Promise<Result<ServiceResult<OnboardingResult>>> {
    return this.execute(async () => {
      // Step 1: Validate email domain
      const emailValidation = await this.validateEmailDomain(data.email);
      if (emailValidation.isFailure) {
        return Result.fail<ServiceResult<OnboardingResult>>(emailValidation.error!);
      }

      // Step 2: Check handle availability
      const handleAvailable = await this.checkHandleAvailability(data.handle);
      if (handleAvailable.isFailure) {
        return Result.fail<ServiceResult<OnboardingResult>>(handleAvailable.error!);
      }

      // Step 3: Create profile
      const profileResult = await this.createProfile(data);
      if (profileResult.isFailure) {
        return Result.fail<ServiceResult<OnboardingResult>>(profileResult.error!);
      }

      const profile = profileResult.getValue();

      // Step 4: Initialize user feed
      const profileId = ProfileId.create(profile.id).getValue();
      await this.initializeFeed(profileId);

      // Step 5: Get space suggestions based on interests and major
      const suggestedSpaces = await this.getSuggestedSpaces(
        data.major,
        data.interests || []
      );

      // Step 6: Auto-join default spaces for new users
      await this.joinDefaultSpaces(profile);

      // Step 7: Generate next steps for user (using domain logic)
      const spacesForNextSteps = suggestedSpaces.getValue().slice(0, 5).map(space => ({
        id: space.id.id,
        name: space.name.name
      }));
      const domainNextSteps = profile.getOnboardingNextSteps(spacesForNextSteps);

      // Map domain next steps to expected format
      const nextSteps = domainNextSteps.map((step: any, index: number) => ({
        action: step.title || step.action,
        description: step.description,
        priority: index + 1
      }));

      const result: ServiceResult<OnboardingResult> = {
        data: {
          profile,
          suggestedSpaces: suggestedSpaces.getValue().slice(0, 5).map(space => ({
            id: space.id.id,
            name: space.name.name,
            memberCount: space.getMemberCount()
          })),
          nextSteps
        },
        warnings: profile.getOnboardingWarnings()
      };

      return Result.ok<ServiceResult<OnboardingResult>>(result);
    }, 'ProfileOnboarding.completeOnboarding');
  }

  /**
   * Update onboarding progress
   */
  async updateOnboardingProgress(
    profileId: string,
    step: string,
    completed: boolean
  ): Promise<Result<void>> {
    return this.execute(async () => {
      const profileIdVO = ProfileId.create(profileId).getValue();
      const profileResult = await this.profileRepo.findById(profileIdVO);

      if (profileResult.isFailure) {
        return Result.fail<void>('Profile not found');
      }

      const profile = profileResult.getValue();

      // Track onboarding progress (would be stored in metadata)
      console.log(`Onboarding progress for ${profileId}: ${step} = ${completed}`);

      // Check if onboarding is complete (using domain logic)
      const onboardingStatus = profile.getOnboardingStatus();
      if (onboardingStatus.isComplete && !profile.isOnboarded) {
        // Note: completeOnboarding expects AcademicInfo, need to access academicInfo properly
        if (profile.academicInfo) {
          const completeResult = profile.completeOnboarding(
            profile.academicInfo,
            profile.interests,
            [] // selectedSpaces - empty for now
          );
          if (completeResult.isSuccess) {
            await this.profileRepo.save(profile);
          }
        }
      }

      return Result.ok<void>();
    }, 'ProfileOnboarding.updateOnboardingProgress');
  }

  /**
   * Get onboarding status (delegates to domain logic)
   */
  async getOnboardingStatus(profileId: string): Promise<Result<{
    isComplete: boolean;
    completedSteps: string[];
    remainingSteps: string[];
    percentComplete: number;
  }>> {
    return this.execute(async () => {
      const profileIdVO = ProfileId.create(profileId).getValue();
      const profileResult = await this.profileRepo.findById(profileIdVO);

      if (profileResult.isFailure) {
        return Result.fail('Profile not found');
      }

      const profile = profileResult.getValue();

      // Use domain logic
      const domainStatus = profile.getOnboardingStatus();

      // Map to service response format
      const status = {
        isComplete: domainStatus.isComplete,
        completedSteps: domainStatus.completedSteps,
        remainingSteps: domainStatus.remainingSteps,
        percentComplete: domainStatus.completionPercentage
      };

      return Result.ok(status);
    }, 'ProfileOnboarding.getOnboardingStatus');
  }

  // Private helper methods

  private async validateEmailDomain(email: string): Promise<Result<void>> {
    const emailResult = UBEmail.create(email);
    if (emailResult.isFailure) {
      return Result.fail<void>('Invalid email format or domain');
    }
    return Result.ok<void>();
  }

  private async checkHandleAvailability(handle: string): Promise<Result<void>> {
    const handleResult = ProfileHandle.create(handle);
    if (handleResult.isFailure) {
      return Result.fail<void>(handleResult.error!);
    }

    const existingProfile = await this.profileRepo.findByHandle(handleResult.getValue().value);
    if (existingProfile.isSuccess) {
      return Result.fail<void>('Handle is already taken');
    }

    return Result.ok<void>();
  }

  private async createProfile(data: OnboardingData): Promise<Result<Profile>> {
    // Create value objects
    const emailResult = UBEmail.create(data.email);
    const handleResult = ProfileHandle.create(data.handle);

    if (emailResult.isFailure) {
      return Result.fail<Profile>(emailResult.error!);
    }

    if (handleResult.isFailure) {
      return Result.fail<Profile>(handleResult.error!);
    }

    // Generate profile ID
    const profileId = ProfileId.create(
      `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    ).getValue();

    // Create profile
    const profileResult = Profile.create({
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
      return Result.fail<Profile>(profileResult.error!);
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
      return Result.fail<Profile>(saveResult.error!);
    }

    return Result.ok<Profile>(profile);
  }

  private async initializeFeed(profileId: ProfileId): Promise<void> {
    const feed = await this.feedRepo.findByUserId(profileId);
    if (feed.isFailure) {
      console.error('Failed to initialize feed:', feed.error);
    }
  }

  private async getSuggestedSpaces(
    major?: string,
    interests: string[] = []
  ): Promise<Result<any[]>> {
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
    const uniqueSpaces = Array.from(
      new Map(suggestions.map(space => [(space as any).id?.id || (space as any).spaceId?.value, space])).values()
    );

    return Result.ok(uniqueSpaces);
  }

  private async joinDefaultSpaces(profile: Profile): Promise<void> {
    // Auto-join campus-wide default spaces
    const defaultSpaceNames = ['Welcome Space', 'New Students', 'Campus Updates'];

    for (const spaceName of defaultSpaceNames) {
      try {
        // This would be implemented when space joining is added
        console.log(`Auto-joining ${spaceName} for user ${profile.profileId.value}`);
      } catch (error) {
        console.error(`Failed to auto-join ${spaceName}:`, error);
      }
    }
  }

  // Business logic methods removed - now in Profile aggregate:
  // - generateNextSteps() -> Profile.getOnboardingNextSteps()
  // - generateOnboardingWarnings() -> Profile.getOnboardingWarnings()
  // - isOnboardingComplete() -> Profile.getOnboardingStatus()
}