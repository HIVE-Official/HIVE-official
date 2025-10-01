import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Onboarding Connection Suggestions
 *
 * Connection suggestions step
 */
declare const onboardingconnectionsuggestionsVariants: (props?: {
    variant?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
export interface OnboardingConnectionSuggestionsProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof onboardingconnectionsuggestionsVariants> {
    suggestions?: any;
    onConnect?: any;
    onSkip?: any;
    isLoading?: boolean;
    error?: string;
}
export declare const OnboardingConnectionSuggestions: React.ForwardRefExoticComponent<OnboardingConnectionSuggestionsProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=onboarding-connection-suggestions.d.ts.map