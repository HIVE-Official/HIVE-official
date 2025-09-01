/**
 * Firebase Context Provider
 * Manages authentication and provides global access to Firebase services
 */
import { ReactNode } from 'react';
import { type UserProfileDocument } from '../lib/firebase/profile-service';
import { useProfileData } from '../hooks/use-profile-firebase';
interface FirebaseUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    emailVerified: boolean;
}
interface AuthState {
    user: FirebaseUser | null;
    profile: UserProfileDocument | null;
    loading: boolean;
    error: string | null;
}
interface FirebaseContextValue {
    auth: AuthState;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
    signInWithMagicLink: (email: string) => Promise<void>;
    signOut: () => Promise<void>;
    profileData: ReturnType<typeof useProfileData> | null;
    isUBStudent: boolean;
    campusId: 'ub-buffalo';
    isOnline: boolean;
    isConnected: boolean;
}
interface FirebaseProviderProps {
    children: ReactNode;
    enableMockAuth?: boolean;
}
export declare function FirebaseProvider({ children, enableMockAuth }: FirebaseProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useFirebase(): FirebaseContextValue;
export declare function useAuthGuard(redirectTo?: string): {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: FirebaseUser | null;
    profile: UserProfileDocument | null;
};
export declare function useUBStudentGuard(): {
    isUBStudent: boolean;
    isLoading: boolean;
    hasAccess: boolean;
};
export declare function useConnectionStatus(): {
    isOnline: boolean;
    isConnected: boolean;
    canSync: boolean;
    status: string;
};
export declare function useProfileCompletion(): {
    completionPercentage: number;
    isComplete: boolean;
    missingFields: string[];
    canUseAdvancedFeatures: boolean;
};
export type { FirebaseUser, AuthState, FirebaseContextValue };
//# sourceMappingURL=firebase-context.d.ts.map