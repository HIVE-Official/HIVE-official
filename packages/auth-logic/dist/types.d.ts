export interface AuthUser {
    uid: string;
    email: string | null;
    fullName?: string | null;
    onboardingCompleted?: boolean;
    emailVerified: boolean;
    customClaims: Record<string, unknown>;
    getIdToken?: () => Promise<string>;
}
export interface DevModeConfig {
    enabled: boolean;
    mockUser: AuthUser;
    skipOnboarding: boolean;
    simulateErrors: {
        auth: boolean;
        onboarding: boolean;
        network: boolean;
    };
    delayMs: number;
}
export interface AuthContextType {
    user: AuthUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    signInWithCustomToken: (token: string) => Promise<void>;
    devMode?: DevModeConfig;
    setDevModeConfig?: (config: Partial<DevModeConfig>) => void;
}
export type UseAuthReturn = AuthContextType;
//# sourceMappingURL=types.d.ts.map