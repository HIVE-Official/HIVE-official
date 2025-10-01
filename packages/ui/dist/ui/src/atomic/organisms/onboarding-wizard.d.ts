import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Onboarding Wizard
 *
 * Multi-step onboarding wizard
 */
declare const onboardingwizardVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface OnboardingWizardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof onboardingwizardVariants> {
    currentStep?: any;
    onNext?: any;
    onBack?: any;
    onSkip?: any;
    onComplete?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const OnboardingWizard: React.ForwardRefExoticComponent<OnboardingWizardProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=onboarding-wizard.d.ts.map