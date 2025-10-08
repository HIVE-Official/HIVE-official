import { type AuthError } from "../error-handler";
export interface AuthUser {
    uid: string;
    id: string;
    email: string | null;
    fullName: string | null;
    handle: string | null;
    bio: string | null;
    major: string | null;
    graduationYear: number | null;
    avatarUrl: string | null;
    isBuilder: boolean;
    builderOptIn?: boolean;
    schoolId: string | null;
    onboardingCompleted: boolean;
    getIdToken: () => Promise<string>;
}
export interface UseAuthReturn {
    user: AuthUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: AuthError | null;
    clearError: () => void;
    refreshUser: () => Promise<void>;
    clearDevMode?: () => void;
    getAuthToken?: () => Promise<string>;
    logout?: () => Promise<void>;
    completeOnboarding?: (data: Record<string, unknown>) => Promise<{
        success: boolean;
    }>;
    canAccessFeature?: (feature: string) => boolean;
    hasValidSession?: () => boolean;
    session?: {
        user: AuthUser;
        expiresAt: number;
    } | null;
}
export declare function useAuth(): UseAuthReturn;
//# sourceMappingURL=use-auth.d.ts.map