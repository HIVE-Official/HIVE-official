import { Specification } from '../../shared/base/Specification.base';
import { Profile } from '../aggregates/profile.aggregate';

export class ProfileCompletionSpecification extends Specification<Profile> {
  isSatisfiedBy(profile: Profile): boolean {
    const personalInfo = profile.personalInfo;

    return !!(
      personalInfo.firstName &&
      personalInfo.lastName &&
      personalInfo.major &&
      personalInfo.graduationYear &&
      personalInfo.dorm &&
      profile.interests.length > 0
    );
  }
}

export class ProfileOnboardedSpecification extends Specification<Profile> {
  isSatisfiedBy(profile: Profile): boolean {
    return profile.isOnboarded;
  }
}

export class ProfileReadyForOnboardingSpecification extends Specification<Profile> {
  private completionSpec = new ProfileCompletionSpecification();
  private onboardedSpec = new ProfileOnboardedSpecification();

  isSatisfiedBy(profile: Profile): boolean {
    return this.completionSpec.isSatisfiedBy(profile) && !this.onboardedSpec.isSatisfiedBy(profile);
  }
}