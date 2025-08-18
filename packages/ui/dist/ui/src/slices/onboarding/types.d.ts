/**
 * Onboarding Types & Interfaces
 *
 * TypeScript definitions for onboarding flows, user data,
 * and step management in the HIVE onboarding process.
 */
export interface OnboardingStep {
    id: string;
    title: string;
    description: string;
    component: string;
    isRequired: boolean;
    isCompleted: boolean;
    order: number;
}
export interface OnboardingData {
    firstName: string;
    lastName: string;
    email: string;
    handle: string;
    profilePhoto?: string;
    schoolId: string;
    schoolName: string;
    graduationYear: number;
    major: string;
    year: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate' | 'other';
    userType: 'student' | 'faculty' | 'staff' | 'alumni';
    isBuilder: boolean;
    interests: string[];
    hasAcceptedTerms: boolean;
    hasAcceptedPrivacy: boolean;
    hasAcceptedCommunityGuidelines: boolean;
    notificationPreferences: {
        email: boolean;
        push: boolean;
        sms: boolean;
    };
    currentStep: string;
    completedSteps: string[];
    startedAt: Date;
    completedAt?: Date;
}
export interface SchoolOption {
    id: string;
    name: string;
    domain: string;
    city: string;
    state: string;
    isActive: boolean;
    studentCount?: number;
    logoUrl?: string;
}
export interface WaitlistEntry {
    email: string;
    schoolId?: string;
    interests?: string[];
    referralSource?: string;
    submittedAt: Date;
    status: 'pending' | 'invited' | 'joined';
}
export interface OnboardingProgress {
    totalSteps: number;
    completedSteps: number;
    currentStepIndex: number;
    percentComplete: number;
    estimatedTimeRemaining: number;
}
export interface OnboardingValidation {
    isValid: boolean;
    errors: Record<string, string[]>;
    warnings: Record<string, string[]>;
}
export interface UseOnboardingFlowReturn {
    data: OnboardingData;
    progress: OnboardingProgress;
    currentStep: OnboardingStep;
    isLoading: boolean;
    error: string | null;
    updateData: (updates: Partial<OnboardingData>) => void;
    nextStep: () => Promise<void>;
    previousStep: () => void;
    goToStep: (stepId: string) => void;
    submitOnboarding: () => Promise<void>;
    validateCurrentStep: () => OnboardingValidation;
}
//# sourceMappingURL=types.d.ts.map