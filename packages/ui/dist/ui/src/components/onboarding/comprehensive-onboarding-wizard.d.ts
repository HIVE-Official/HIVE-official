import React from 'react';
export type OnboardingStep = 'welcome' | 'user-type' | 'profile' | 'academics' | 'interests' | 'spaces' | 'builder' | 'legal' | 'complete';
export interface OnboardingData {
    currentStep: OnboardingStep;
    completedSteps: OnboardingStep[];
    startedAt: Date;
    completedAt?: Date;
    onboardingDuration?: number;
    email: string;
    userType: 'STUDENT' | 'FACULTY' | 'STAFF';
    universityId: string;
    campusId?: string;
    name: string;
    handle: string;
    photoUrl?: string;
    bio?: string;
    major?: string;
    majorId?: string;
    department?: string;
    classYear?: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate' | 'phd';
    graduationYear?: string;
    academicLevel?: 'undergraduate' | 'graduate' | 'phd';
    interests: string[];
    selectedSpaces: string[];
    builderExperience: 'beginner' | 'intermediate' | 'advanced';
    agreedToTerms: boolean;
    agreedToPrivacy: boolean;
    agreedToCommunity: boolean;
}
interface OnboardingContextType {
    state: OnboardingData;
    updateData: (updates: Partial<OnboardingData>) => void;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: OnboardingStep) => void;
    isStepComplete: (step: OnboardingStep) => boolean;
    canProceed: () => boolean;
    setError: (error: string | null) => void;
    error: string | null;
}
export declare const useOnboarding: () => OnboardingContextType;
export interface ComprehensiveOnboardingWizardProps {
    userType?: 'STUDENT' | 'FACULTY' | 'STAFF';
    email?: string;
    initialData?: Partial<OnboardingData>;
    mockMode?: boolean;
    onComplete?: (data: OnboardingData) => void;
    onStepChange?: (step: OnboardingStep, progress: number) => void;
}
export declare const ComprehensiveOnboardingWizard: React.FC<ComprehensiveOnboardingWizardProps>;
export default ComprehensiveOnboardingWizard;
//# sourceMappingURL=comprehensive-onboarding-wizard.d.ts.map