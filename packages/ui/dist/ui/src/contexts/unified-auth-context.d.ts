/**
 * HIVE Unified Auth Context Provider
 * Provides consistent authentication state across all systems
 * Integrates with Firebase Auth, session management, and API endpoints
 */
import React from 'react';
export interface HiveUser {
    id: string;
    uid: string;
    email: string;
    fullName?: string;
    handle?: string;
    major?: string;
    avatarUrl?: string;
    schoolId?: string;
    builderOptIn?: boolean;
    onboardingCompleted: boolean;
    emailVerified?: boolean;
    createdAt?: string;
    updatedAt?: string;
    profileCompletion?: number;
    preferences?: {
        theme?: 'light' | 'dark';
        notifications?: boolean;
        privacy?: 'public' | 'private';
    };
    isDeveloper?: boolean;
    isAdmin?: boolean;
    developmentMode?: boolean;
}
export interface HiveSession {
    token: string | null;
    issuedAt?: string;
    expiresAt?: string;
    developmentMode?: boolean;
    lastActivity?: string;
}
export interface UnifiedAuthState {
    user: HiveUser | null;
    session: HiveSession | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
}
export interface UnifiedAuthContextType extends UnifiedAuthState {
    login: (email: string, password?: string) => Promise<void>;
    logout: () => Promise<void>;
    sendMagicLink: (email: string) => Promise<void>;
    verifyMagicLink: (token: string) => Promise<void>;
    refreshSession: () => Promise<void>;
    validateSession: () => Promise<boolean>;
    getAuthToken: () => Promise<string | null>;
    updateProfile: (updates: Partial<HiveUser>) => Promise<void>;
    completeOnboarding: (onboardingData: {
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
    }) => Promise<{
        user: any;
        builderRequestsCreated: number;
        success: boolean;
        message: string;
    }>;
    devLogin: (userId?: string) => Promise<void>;
    clearDevSession: () => void;
    requiresOnboarding: () => boolean;
    hasValidSession: () => boolean;
    canAccessFeature: (feature: string) => boolean;
    clearError: () => void;
    retryInitialization: () => Promise<void>;
}
declare const UnifiedAuthContext: React.Context<UnifiedAuthContextType>;
export declare const useUnifiedAuth: () => UnifiedAuthContextType;
export interface FirebaseAuthIntegration {
    listenToAuthChanges: (callback: (user: any) => void) => () => void;
    handleEmailLinkSignIn: (email?: string) => Promise<void>;
    getFirebaseToken: () => Promise<string | null>;
    signOut: () => Promise<void>;
    isEmailLinkSignIn: () => boolean;
}
export declare const UnifiedAuthProvider: React.FC<{
    children: React.ReactNode;
    firebaseIntegration?: FirebaseAuthIntegration;
}>, firebaseIntegration: any, updateAuthState: any, persistSession: any, clearPersistedSession: any;
export { UnifiedAuthContext };
//# sourceMappingURL=unified-auth-context.d.ts.map