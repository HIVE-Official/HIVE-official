/**
 * HIVE Pure Firebase Auth Context
 * EMERGENCY REWRITE - Clean Firebase Authentication Only
 * Eliminates session auth chaos and implements proper Firebase flow
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
    avatarUrl?: string;
    schoolId?: string;
    onboardingCompleted: boolean;
    createdAt?: string;
    updatedAt?: string;
}
export interface FirebaseAuthState {
    user: HiveUser | null;
    firebaseUser: FirebaseUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
}
export interface FirebaseAuthContextType extends FirebaseAuthState {
    signInWithMagicLink: (customToken: string) => Promise<void>;
    signOut: () => Promise<void>;
    refreshUserData: () => Promise<void>;
    getAuthToken: () => Promise<string | null>;
    completeOnboarding: (data: OnboardingData) => Promise<OnboardingResult>;
    requiresOnboarding: () => boolean;
}
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
    user?: HiveUser;
    builderRequestsCreated?: number;
    error?: string;
}
export declare function FirebaseAuthProvider({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useFirebaseAuth(): FirebaseAuthContextType;
export declare const useUnifiedAuth: typeof useFirebaseAuth;
//# sourceMappingURL=pure-firebase-auth.d.ts.map