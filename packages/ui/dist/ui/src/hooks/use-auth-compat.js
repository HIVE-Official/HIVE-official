/**
 * Backward-compatible auth hook
 * Provides the same interface as existing hooks while using UnifiedAuthContext
 */
import { useUnifiedAuth } from '../contexts/unified-auth-context';
// Helper function for converting HiveUser to legacy User interface
const convertToLegacyUser = (hiveUser) => {
    if (!hiveUser)
        return null;
    return {
        id: hiveUser.id,
        email: hiveUser.email,
        fullName: hiveUser.fullName,
        handle: hiveUser.handle,
        major: hiveUser.major,
        avatarUrl: hiveUser.avatarUrl,
        schoolId: hiveUser.schoolId || '',
        builderOptIn: hiveUser.builderOptIn,
        onboardingCompleted: hiveUser.onboardingCompleted,
    };
};
/**
 * useAuth - Backward compatible hook for existing components
 * Maps UnifiedAuth to the old useAuth interface
 */
export function useAuth() {
    const unifiedAuth = useUnifiedAuth();
    return {
        user: convertToLegacyUser(unifiedAuth.user),
        loading: unifiedAuth.isLoading,
        error: unifiedAuth.error,
        signIn: unifiedAuth.signInWithMagicLink,
        signOut: unifiedAuth.logout,
        signUp: async (email, _password, _displayName) => {
            // For now, signUp isn't implemented - would need magic link flow
            throw new Error('SignUp not implemented - use magic link authentication');
        },
        getAuthToken: unifiedAuth.getAuthToken,
    };
}
/**
 * useSession - Backward compatible hook for session management
 * Maps UnifiedAuth to the old useSession interface
 */
export function useSession() {
    const unifiedAuth = useUnifiedAuth();
    const convertToSessionData = (hiveUser) => {
        if (!hiveUser)
            return null;
        return {
            userId: hiveUser.id,
            email: hiveUser.email,
            schoolId: hiveUser.schoolId || '',
            onboardingCompleted: hiveUser.onboardingCompleted,
            needsOnboarding: !hiveUser.onboardingCompleted,
            verifiedAt: new Date().toISOString(),
            profileData: hiveUser.fullName ? {
                fullName: hiveUser.fullName,
                handle: hiveUser.handle || '',
                major: hiveUser.major || '',
                avatarUrl: hiveUser.avatarUrl || '',
                builderOptIn: hiveUser.builderOptIn || false,
            } : undefined,
        };
    };
    return {
        isLoading: unifiedAuth.isLoading,
        isAuthenticated: unifiedAuth.isAuthenticated,
        user: convertToLegacyUser(unifiedAuth.user),
        sessionData: convertToSessionData(unifiedAuth.user),
        logout: unifiedAuth.logout,
    };
}
/**
 * Direct export of UnifiedAuth for components that want the new interface
 */
export { useUnifiedAuth };
//# sourceMappingURL=use-auth-compat.js.map