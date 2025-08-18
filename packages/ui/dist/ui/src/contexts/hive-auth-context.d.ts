/**
 * HIVE Firebase Auth Context - Clean, Production-Ready Implementation
 *
 * Replaces the broken UnifiedAuth system with a single, reliable auth provider
 * Built on Firebase Auth with proper error handling and state management
 */
import React from 'react';
import { User as FirebaseUser } from 'firebase/auth';
export interface HiveUser {
    id: string;
    uid: string;
    email: string;
    emailVerified: boolean;
    fullName?: string;
    handle?: string;
    major?: string;
    academicLevel?: string;
    graduationYear?: number;
    avatarUrl?: string;
    schoolId?: string;
    userType?: 'student' | 'alumni' | 'faculty';
    onboardingCompleted: boolean;
    builderOptIn?: boolean;
    isAdmin?: boolean;
    createdAt?: string;
    updatedAt?: string;
}
export interface HiveAuthState {
    user: HiveUser | null;
    firebaseUser: FirebaseUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
}
export interface HiveAuthContextType extends HiveAuthState {
    sendMagicLink: (email: string, schoolId: string) => Promise<void>;
    completeOnboarding: (onboardingData: any) => Promise<any>;
    refreshUserData: () => Promise<void>;
    logout: () => Promise<void>;
    requiresOnboarding: () => boolean;
    getAuthToken: () => Promise<string | null>;
    clearError: () => void;
    devLogin?: (userType?: 'student' | 'faculty' | 'admin') => Promise<void>;
}
declare const HiveAuthContext: React.Context<HiveAuthContextType>;
export declare const useHiveAuth: () => HiveAuthContextType;
interface HiveAuthProviderProps {
    children: React.ReactNode;
}
export declare const HiveAuthProvider: React.FC<HiveAuthProviderProps>;
export { HiveAuthContext };
//# sourceMappingURL=hive-auth-context.d.ts.map