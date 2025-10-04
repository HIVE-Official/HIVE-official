import { Mapper } from '../../shared/Mapper.base';
import { Profile } from '../../../domain/profile/aggregates/profile.aggregate';
import { ProfileDTO } from '../dtos/profile.dto';
import { UBEmail } from '../../../domain/profile/value-objects/ub-email.value';
import { ProfileHandle } from '../../../domain/profile/value-objects/profile-handle.value';
import { PersonalInfo } from '../../../domain/profile/value-objects/personal-info.value';
import { Result } from '../../../domain/shared/base/Result';
import { ProfileId } from '../../shared/temporary-types';

export class ProfileMapper extends Mapper<Profile, ProfileDTO> {
  toDTO(profile: Profile): ProfileDTO {
    return {
      id: profile.id,
      email: profile.email.value,
      handle: profile.handle.value,
      personalInfo: {
        firstName: profile.personalInfo.firstName,
        lastName: profile.personalInfo.lastName,
        bio: profile.personalInfo.bio || '',
        major: profile.personalInfo.major || '',
        graduationYear: profile.personalInfo.graduationYear ?? null,
        dorm: profile.personalInfo.dorm || ''
      },
      interests: profile.interests,
      connections: profile.connections,
      isOnboarded: profile.isOnboarded,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt
    };
  }

  toDomain(dto: ProfileDTO): Profile {
    // Create value objects
    const emailResult = UBEmail.create(dto.email);
    if (emailResult.isFailure) {
      throw new Error(`Invalid email: ${emailResult.error}`);
    }

    const handleResult = ProfileHandle.create(dto.handle);
    if (handleResult.isFailure) {
      throw new Error(`Invalid handle: ${handleResult.error}`);
    }

    const profileIdResult = ProfileId.create(dto.id);
    if (profileIdResult.isFailure) {
      throw new Error(`Invalid profile ID: ${profileIdResult.error}`);
    }

    // Create profile with new signature
    const profileResult = Profile.create({
      profileId: profileIdResult.getValue(),
      email: emailResult.getValue(),
      handle: handleResult.getValue(),
      personalInfo: {
        firstName: dto.personalInfo.firstName,
        lastName: dto.personalInfo.lastName,
        bio: dto.personalInfo.bio,
        major: dto.personalInfo.major,
        graduationYear: dto.personalInfo.graduationYear || undefined,
        dorm: dto.personalInfo.dorm
      }
    });

    if (profileResult.isFailure) {
      throw new Error(`Failed to create profile: ${profileResult.error}`);
    }

    const profile = profileResult.getValue();

    // Update profile with additional data
    // Note: updateInterests is not available on Profile aggregate
    // Interests are set during profile creation and onboarding

    dto.connections.forEach(connectionId => {
      profile.addConnection(connectionId);
    });

    if (dto.isOnboarded) {
      // Note: completeOnboarding expects AcademicInfo, not PersonalInfo
      // For now, skip this step - onboarding should be completed through proper service layer
      // profile.completeOnboarding(...);
    }

    return profile;
  }
}