import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Onboarding Step Indicator
 *
 * Progress indicator for onboarding
 */
declare const onboardingstepindicatorVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface OnboardingStepIndicatorProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof onboardingstepindicatorVariants> {
    currentStep?: any;
    totalSteps?: any;
    completedSteps?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const OnboardingStepIndicator: React.ForwardRefExoticComponent<OnboardingStepIndicatorProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=onboarding-step-indicator.d.ts.map