export interface AuthUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    emailVerified: boolean;
}
export interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    error: string | null;
    signOut: () => Promise<void>;
    refreshUser: () => Promise<void>;
}
export declare function useAuth(): AuthContextType;
export declare const AuthProvider: import("react").Provider<AuthContextType>;
export declare function createAuthValue(): AuthContextType;
//# sourceMappingURL=use-auth.d.ts.map