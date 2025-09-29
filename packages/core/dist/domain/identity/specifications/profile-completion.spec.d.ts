import { Specification } from '../../shared/base/Specification.base';
import { Profile } from '../aggregates/profile.aggregate';
export declare class ProfileCompletionSpecification extends Specification<Profile> {
    isSatisfiedBy(profile: Profile): boolean;
}
export declare class ProfileOnboardedSpecification extends Specification<Profile> {
    isSatisfiedBy(profile: Profile): boolean;
}
export declare class ProfileReadyForOnboardingSpecification extends Specification<Profile> {
    private completionSpec;
    private onboardedSpec;
    isSatisfiedBy(profile: Profile): boolean;
}
//# sourceMappingURL=profile-completion.spec.d.ts.map