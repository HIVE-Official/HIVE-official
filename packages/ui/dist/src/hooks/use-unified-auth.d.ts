export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    emailVerified: boolean;
    campusId?: string;
    handle?: string;
    userType?: 'student' | 'faculty' | 'staff';
}
export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}
export interface UnifiedAuthContextType extends AuthState {
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updateProfile: (data: Partial<User>) => Promise<void>;
}
export declare function useUnifiedAuth(): UnifiedAuthContextType;
export declare const UnifiedAuthProvider: import("react").Provider<UnifiedAuthContextType>;
export declare function createUnifiedAuthValue(): UnifiedAuthContextType;
//# sourceMappingURL=use-unified-auth.d.ts.map