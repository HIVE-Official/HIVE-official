import type { OnboardingStep } from "@hive/core";

// Export the new onboarding components
export { DisplayNameStep } from "./steps/display-name";
export { SchoolStep } from "./steps/school";
export { InterestsStep } from "./steps/interests";
export { WelcomeStep } from "./steps/welcome";

// Export common types
export interface BaseStepProps {
  onNext: (nextStep?: number) => void;
}

export interface StepWithSubmitProps<T extends Record<string, unknown>>
  extends BaseStepProps {
  onSubmit?: (data: T) => Promise<void>;
}

export interface StepWithSkipProps extends BaseStepProps {
  onSkip?: () => void;
}

export type OnboardingStepProps = {
  step: OnboardingStep;
  onNext: (data: Record<string, unknown>) => Promise<void>;
  onPrev?: () => void;
  isLoading?: boolean;
};
