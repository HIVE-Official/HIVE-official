import type { OnboardingState } from './onboarding/types';
export interface HiveOnboardingExperienceProps {
    initialStep?: number;
    defaultState?: Partial<OnboardingState>;
    onComplete?: (state: OnboardingState) => void;
}
export declare function HiveOnboardingExperience({ initialStep, defaultState, onComplete, }: HiveOnboardingExperienceProps): import("react/jsx-runtime").JSX.Element;
export default HiveOnboardingExperience;
//# sourceMappingURL=onboarding-experience.d.ts.map