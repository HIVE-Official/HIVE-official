interface UserProfile {
    id: string;
    email: string;
    displayName: string;
    photoURL: string | null;
    school: string | null;
    graduationYear: number | null;
    major: string | null;
    interests: string[];
    onboardingCompleted: boolean;
    createdAt: string;
    updatedAt: string;
}
export declare function useSendMagicLink(): import("@tanstack/react-query").UseMutationResult<any, any, {
    email: string;
    schoolId?: string;
    redirectUrl?: string;
}, unknown>;
export declare function useVerifyMagicLink(): import("@tanstack/react-query").UseMutationResult<{
    user: any;
}, any, {
    token: string;
}, unknown>;
export declare function useSignUp(): import("@tanstack/react-query").UseMutationResult<any, any, {
    email: string;
    password: string;
    displayName: string;
}, unknown>;
export declare function useSignIn(): import("@tanstack/react-query").UseMutationResult<any, any, {
    email: string;
    password: string;
}, unknown>;
export declare function useSignOut(): import("@tanstack/react-query").UseMutationResult<void, any, void, unknown>;
export declare function useResetPassword(): import("@tanstack/react-query").UseMutationResult<void, any, {
    email: string;
}, unknown>;
export declare function useUpdateAuthProfile(): import("@tanstack/react-query").UseMutationResult<Partial<UserProfile>, Error, Partial<UserProfile>, {
    previousUser: UserProfile | undefined;
}>;
export declare function useCompleteOnboarding(): import("@tanstack/react-query").UseMutationResult<any, any, {
    school: string;
    graduationYear: number;
    major: string;
    interests: string[];
}, unknown>;
export declare function useValidateSession(): import("@tanstack/react-query").UseQueryResult<{
    user: any;
    token: any;
    expiresAt: any;
} | null, Error>;
export declare function useDeleteAccount(): import("@tanstack/react-query").UseMutationResult<void, any, void, unknown>;
export {};
//# sourceMappingURL=auth-queries.d.ts.map