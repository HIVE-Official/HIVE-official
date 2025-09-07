export interface OnboardingData {
    fullName: string;
    userType?: 'student' | 'alumni' | 'faculty';
    firstName?: string;
    lastName?: string;
    facultyEmail?: string;
    majors: string[];
    academicLevel?: string;
    graduationYear: number;
    handle: string;
    profilePhoto?: string;
    builderRequestSpaces?: string[];
    hasConsented: boolean;
    acceptedTerms: boolean;
    acceptedPrivacy: boolean;
    interests?: string[];
}
export interface HandleAvailabilityResult {
    available: boolean;
    suggestions?: string[];
}
export declare function useHandleAvailability(handle: string): import("@tanstack/react-query").UseQueryResult<HandleAvailabilityResult, Error>;
export declare function useSubmitOnboarding(): import("@tanstack/react-query").UseMutationResult<{
    success: boolean;
    userId?: string;
}, Error, Partial<OnboardingData>, unknown>;
export declare function useUploadProfilePhoto(): import("@tanstack/react-query").UseMutationResult<{
    url: string;
}, Error, File, unknown>;
declare module './query-client' {
    interface QueryKeys {
        handleAvailability: (handle: string) => readonly ['hive', 'onboarding', 'handle-availability', string];
    }
}
export declare const onboardingQueryKeys: {
    handleAvailability: (handle: string) => readonly ["hive", "onboarding", "handle-availability", string];
};
//# sourceMappingURL=onboarding-queries.d.ts.map