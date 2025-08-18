import React from 'react';
export type OnboardingStep = 'welcome' | 'name' | 'handle' | 'photo' | 'academics' | 'builder' | 'legal' | 'complete';
export interface OnboardingState {
    step: OnboardingStep;
    currentStepIndex: number;
    loading: boolean;
    error: string | null;
    data: {
        name: string;
        handle: string;
        photoUrl?: string;
        university: string;
        major: string;
        graduationYear: string;
        interests: string[];
        builderExperience: 'none' | 'beginner' | 'intermediate' | 'advanced';
        builderGoals: string[];
        agreedToTerms: boolean;
        agreedToPrivacy: boolean;
        agreedToCommunity: boolean;
    };
}
export interface OnboardingContextType {
    state: OnboardingState;
    nextStep: () => void;
    prevStep: () => void;
    setStep: (step: OnboardingStep) => void;
    updateData: (updates: Partial<OnboardingState['data']>) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    canProceed: () => boolean;
    completeOnboarding: () => Promise<void>;
}
export declare function useOnboarding(): OnboardingContextType;
interface OnboardingProviderProps {
    children: React.ReactNode;
    onComplete?: (userData: OnboardingState['data']) => void;
    initialStep?: OnboardingStep;
    mockMode?: boolean;
}
export declare function OnboardingProvider({ children, onComplete, initialStep, mockMode }: OnboardingProviderProps): import("react/jsx-runtime").JSX.Element;
interface HiveOnboardingWizardEnhancedProps {
    className?: string;
    onComplete?: (userData: OnboardingState['data']) => void;
    initialStep?: OnboardingStep;
    mockMode?: boolean;
}
export declare function HiveOnboardingWizardEnhanced({ className, onComplete, initialStep, mockMode }: HiveOnboardingWizardEnhancedProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=hive-onboarding-wizard-enhanced.d.ts.map