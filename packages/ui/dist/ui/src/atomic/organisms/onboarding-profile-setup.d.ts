import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Onboarding Profile Setup
 *
 * Profile setup step
 */
declare const onboardingprofilesetupVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface OnboardingProfileSetupProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof onboardingprofilesetupVariants> {
    onSave?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const OnboardingProfileSetup: React.ForwardRefExoticComponent<OnboardingProfileSetupProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=onboarding-profile-setup.d.ts.map