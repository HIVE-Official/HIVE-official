/**
 * Minimal auth hook for slice integration
 */
export interface AuthUser {
    uid: string;
    email: string;
    handle?: string;
    sessionToken?: string;
}
export declare function useAuthProvider(): {
    user: AuthUser;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string;
    login: (credentials: any) => Promise<void>;
    logout: () => Promise<void>;
    sendMagicLink: () => Promise<void>;
    verifyMagicLink: () => Promise<void>;
    refreshSession: () => Promise<void>;
    updateProfile: () => Promise<void>;
    devLogin: () => Promise<void>;
};
export declare const AuthContext: import("react").Context<{
    user: AuthUser;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string;
    login: (credentials: any) => Promise<void>;
    logout: () => Promise<void>;
    sendMagicLink: () => Promise<void>;
    verifyMagicLink: () => Promise<void>;
    refreshSession: () => Promise<void>;
    updateProfile: () => Promise<void>;
    devLogin: () => Promise<void>;
}>;
//# sourceMappingURL=use-auth.d.ts.map