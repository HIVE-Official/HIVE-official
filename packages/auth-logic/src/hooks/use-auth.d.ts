export interface AuthUser {
    uid: string;
    email: string | null;
    fullName: string | null;
    onboardingCompleted: boolean;
    getIdToken: () => Promise<string>;
}
export interface UseAuthReturn {
    user: AuthUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}
export declare function useAuth(): UseAuthReturn;
//# sourceMappingURL=use-auth.d.ts.map