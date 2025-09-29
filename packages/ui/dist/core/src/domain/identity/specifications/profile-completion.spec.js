import { Specification } from '../../shared/base/Specification.base';
export class ProfileCompletionSpecification extends Specification {
    isSatisfiedBy(profile) {
        const personalInfo = profile.personalInfo;
        return !!(personalInfo.firstName &&
            personalInfo.lastName &&
            personalInfo.major &&
            personalInfo.graduationYear &&
            personalInfo.dorm &&
            profile.interests.length > 0);
    }
}
export class ProfileOnboardedSpecification extends Specification {
    isSatisfiedBy(profile) {
        return profile.isOnboarded;
    }
}
export class ProfileReadyForOnboardingSpecification extends Specification {
    constructor() {
        super(...arguments);
        this.completionSpec = new ProfileCompletionSpecification();
        this.onboardedSpec = new ProfileOnboardedSpecification();
    }
    isSatisfiedBy(profile) {
        return this.completionSpec.isSatisfiedBy(profile) && !this.onboardedSpec.isSatisfiedBy(profile);
    }
}
//# sourceMappingURL=profile-completion.spec.js.map