import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Onboarding Email Verification
 *
 * Email verification step
 */
declare const onboardingemailverificationVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface OnboardingEmailVerificationProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof onboardingemailverificationVariants> {
    email?: any;
    onVerify?: any;
    onResend?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const OnboardingEmailVerification: React.ForwardRefExoticComponent<OnboardingEmailVerificationProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=onboarding-email-verification.d.ts.map