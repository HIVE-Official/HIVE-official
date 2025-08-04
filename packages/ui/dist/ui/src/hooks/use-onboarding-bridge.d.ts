/**
 * Onboarding Bridge Hook
 * Bridges onboarding completion to UnifiedAuth and Profile hydration
 */
export interface OnboardingData {
    fullName: string;
    userType: 'student' | 'alumni' | 'faculty';
    firstName?: string;
    lastName?: string;
    major: string;
    academicLevel?: string;
    graduationYear: number;
    handle: string;
    avatarUrl?: string;
    builderRequestSpaces?: string[];
    consentGiven: boolean;
}
export interface OnboardingResult {
    success: boolean;
    user?: any;
    builderRequestsCreated?: number;
    error?: string;
}
/**
 * Hook for managing onboarding completion and profile hydration
 */
export declare function useOnboardingBridge(): {
    completeOnboarding: (onboardingData: OnboardingData) => Promise<OnboardingResult>;
    needsOnboarding: () => boolean;
    getOnboardingProgress: () => {
        completedSteps: number;
        totalSteps: number;
        percentage: number;
        isComplete: boolean;
    };
    createPostOnboardingSpaces: (onboardingData: OnboardingData) => Promise<{
        cohortSpaces: any[];
        joinedSpaces: any[];
        totalSpaces: number;
        error?: undefined;
    } | {
        cohortSpaces: any[];
        joinedSpaces: any[];
        totalSpaces: number;
        error: string;
    }>;
    isAuthenticated: boolean;
    user: import("..").HiveUser;
    isLoading: boolean;
    error: string;
    canAccessFeature: (feature: string) => boolean;
    hasValidSession: () => boolean;
};
//# sourceMappingURL=use-onboarding-bridge.d.ts.map