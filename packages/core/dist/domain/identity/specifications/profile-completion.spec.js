"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileReadyForOnboardingSpecification = exports.ProfileOnboardedSpecification = exports.ProfileCompletionSpecification = void 0;
const Specification_base_1 = require("../../shared/base/Specification.base");
class ProfileCompletionSpecification extends Specification_base_1.Specification {
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
exports.ProfileCompletionSpecification = ProfileCompletionSpecification;
class ProfileOnboardedSpecification extends Specification_base_1.Specification {
    isSatisfiedBy(profile) {
        return profile.isOnboarded;
    }
}
exports.ProfileOnboardedSpecification = ProfileOnboardedSpecification;
class ProfileReadyForOnboardingSpecification extends Specification_base_1.Specification {
    constructor() {
        super(...arguments);
        this.completionSpec = new ProfileCompletionSpecification();
        this.onboardedSpec = new ProfileOnboardedSpecification();
    }
    isSatisfiedBy(profile) {
        return this.completionSpec.isSatisfiedBy(profile) && !this.onboardedSpec.isSatisfiedBy(profile);
    }
}
exports.ProfileReadyForOnboardingSpecification = ProfileReadyForOnboardingSpecification;
//# sourceMappingURL=profile-completion.spec.js.map