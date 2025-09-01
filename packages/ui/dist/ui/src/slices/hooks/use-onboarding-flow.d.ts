/**
 * Minimal onboarding flow hook for slice integration
 */
export interface OnboardingData {
    firstName: string;
    lastName: string;
    email: string;
    handle: string;
    schoolId: string;
    major: string;
    graduationYear: number;
    year: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate' | 'other';
    userType: 'student' | 'faculty' | 'staff' | 'alumni';
    currentStep: string;
    completedSteps: string[];
    startedAt: Date;
}
export declare function useOnboardingFlow(): {
    data: OnboardingData;
    isLoading: boolean;
    error: string | null;
    updateData: (updates: Partial<OnboardingData>) => void;
    submitOnboarding: () => Promise<void>;
    progress: {
        percentComplete: number;
        totalSteps: number;
        completedSteps: number;
    };
    currentStep: {
        id: string;
        title: string;
    };
    nextStep: () => Promise<void>;
    previousStep: () => void;
    validateCurrentStep: () => {
        isValid: boolean;
        errors: {};
        warnings: {};
    };
};
//# sourceMappingURL=use-onboarding-flow.d.ts.map