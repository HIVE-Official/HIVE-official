import React from 'react';
interface OnboardingLayoutProps {
    currentStep: number;
    totalSteps: number;
    stepLabels: string[];
    children: React.ReactNode;
    onNext?: () => void;
    onPrev?: () => void;
    nextLabel?: string;
    prevLabel?: string;
    nextDisabled?: boolean;
    showProgress?: boolean;
    title?: string;
    subtitle?: string;
    hideNavigation?: boolean;
}
export declare const OnboardingLayout: React.FC<OnboardingLayoutProps>;
export {};
//# sourceMappingURL=onboarding-layout.d.ts.map