/**
 * Backward-compatible auth hook
 * Provides the same interface as existing hooks while using UnifiedAuthContext
 */
import { useUnifiedAuth } from '../contexts/unified-auth-context';
export interface User {
    id: string;
    email: string;
    fullName?: string;
    handle?: string;
    major?: string;
    avatarUrl?: string;
    schoolId: string;
    builderOptIn?: boolean;
    onboardingCompleted: boolean;
}
export interface SessionData {
    userId: string;
    email: string;
    schoolId: string;
    needsOnboarding?: boolean;
    onboardingCompleted?: boolean;
    verifiedAt: string;
    profileData?: {
        fullName: string;
        handle: string;
        major: string;
        avatarUrl: string;
        builderOptIn: boolean;
    };
}
/**
 * useAuth - Backward compatible hook for existing components
 * Maps UnifiedAuth to the old useAuth interface
 */
export declare function useAuth(): {
    user: User;
    loading: boolean;
    error: string;
    signIn: (email: string, password?: string) => Promise<void>;
    signOut: () => Promise<void>;
    signUp: (email: string, password: string, displayName?: string) => Promise<void>;
    getAuthToken: () => Promise<string | null>;
};
/**
 * useSession - Backward compatible hook for session management
 * Maps UnifiedAuth to the old useSession interface
 */
export declare function useSession(): {
    isLoading: boolean;
    isAuthenticated: boolean;
    user: User;
    sessionData: SessionData;
    logout: () => Promise<void>;
};
/**
 * Direct export of UnifiedAuth for components that want the new interface
 */
export { useUnifiedAuth };
//# sourceMappingURL=use-auth-compat.d.ts.map