/**
 * Profile Onboarding Service
 * Orchestrates the complete user onboarding flow
 */

import { BaseApplicationService, ApplicationServiceContext, ServiceResult } from './base.service';
import { Result } from '../domain/shared/base/Result';
import { EnhancedProfile } from '../domain/profile/aggregates/enhanced-profile';
import { UBEmail } from '../domain/identity/value-objects/ub-email.value';
import { ProfileHandle } from '../domain/profile/value-objects/profile-handle.value';
import { ProfileId } from '../domain/profile/value-objects/profile-id.value';
import { CampusId } from '../domain/profile/value-objects/campus-id.value';
import { UserType } from '../domain/profile/value-objects/user-type.value';
import { PersonalInfo } from '../domain/identity/value-objects/personal-info.value';
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
  profile: EnhancedProfile;
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

      // Step 7: Generate next steps for user
      const nextSteps = this.generateNextSteps(profile, suggestedSpaces.getValue());

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
        warnings: this.generateOnboardingWarnings(data)
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

      // Check if onboarding is complete
      if (this.isOnboardingComplete(profile)) {
        const personalInfoResult = PersonalInfo.create({
          firstName: profile.personalInfo.firstName || '',
          lastName: profile.personalInfo.lastName || '',
          bio: profile.personalInfo.bio || '',
          major: profile.personalInfo.major || '',
          graduationYear: profile.personalInfo.graduationYear || null,
          dorm: profile.personalInfo.dorm || ''
        });

        if (personalInfoResult.isSuccess) {
          const completeResult = profile.completeOnboarding(
            profile.personalInfo,
            profile.interests
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
   * Get onboarding status
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
      const profileData = profile.toData();

      const requiredSteps = [
        'email_verified',
        'handle_set',
        'basic_info',
        'interests_selected',
        'profile_photo',
        'first_space_joined'
      ];

      const completedSteps: string[] = [];
      if (profileData.email) completedSteps.push('email_verified');
      if (profileData.handle) completedSteps.push('handle_set');
      if (profileData.personalInfo.firstName) completedSteps.push('basic_info');
      if (profileData.interests.length > 0) completedSteps.push('interests_selected');
      if (profileData.photos.length > 0) completedSteps.push('profile_photo');
      // Would check space membership for 'first_space_joined'

      const remainingSteps = requiredSteps.filter(step => !completedSteps.includes(step));
      const percentComplete = Math.round((completedSteps.length / requiredSteps.length) * 100);

      return Result.ok({
        isComplete: profileData.isOnboarded,
        completedSteps,
        remainingSteps,
        percentComplete
      });
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

  private async createProfile(data: OnboardingData): Promise<Result<EnhancedProfile>> {
    // Create value objects
    const emailResult = UBEmail.create(data.email);
    const handleResult = ProfileHandle.create(data.handle);

    if (emailResult.isFailure) {
      return Result.fail<EnhancedProfile>(emailResult.error!);
    }

    if (handleResult.isFailure) {
      return Result.fail<EnhancedProfile>(handleResult.error!);
    }

    // Generate profile ID
    const profileId = ProfileId.create(
      `profile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    ).getValue();

    // Create profile
    const profileResult = EnhancedProfile.create({
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
      return Result.fail<EnhancedProfile>(profileResult.error!);
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
      return Result.fail<EnhancedProfile>(saveResult.error!);
    }

    return Result.ok<EnhancedProfile>(profile);
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
    const suggestions: any[] = [];

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
      new Map(suggestions.map(space => [space.spaceId.value, space])).values()
    );

    return Result.ok(uniqueSpaces);
  }

  private async joinDefaultSpaces(profile: EnhancedProfile): Promise<void> {
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

  private generateNextSteps(profile: EnhancedProfile, suggestedSpaces: any[]): Array<{
    action: string;
    description: string;
    priority: number;
  }> {
    const steps: Array<{
      action: string;
      description: string;
      priority: number;
    }> = [];
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

  private generateOnboardingWarnings(data: OnboardingData): string[] {
    const warnings: string[] = [];

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

  private isOnboardingComplete(profile: EnhancedProfile): boolean {
    const data = profile.toDTO();
    return !!(
      data.handle &&
      data.personalInfo.firstName &&
      data.personalInfo.lastName &&
      data.interests.length > 0
    );
  }
}
