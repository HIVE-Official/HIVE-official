import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Onboarding Space Recommendations
 *
 * Space recommendations step
 */
declare const onboardingspacerecommendationsVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface OnboardingSpaceRecommendationsProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof onboardingspacerecommendationsVariants> {
    recommendations?: any;
    onJoin?: any;
    onSkip?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const OnboardingSpaceRecommendations: React.ForwardRefExoticComponent<OnboardingSpaceRecommendationsProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=onboarding-space-recommendations.d.ts.map