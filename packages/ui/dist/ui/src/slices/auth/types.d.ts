/**
 * Auth Types & Interfaces
 *
 * TypeScript definitions for authentication flows, user sessions,
 * and auth state management in HIVE.
 */
export interface AuthUser {
    uid: string;
    email: string;
    emailVerified: boolean;
    displayName?: string;
    photoURL?: string;
    handle?: string;
    schoolId?: string;
    userType?: 'student' | 'faculty' | 'staff' | 'alumni';
    isOnboarded: boolean;
    isBuilder: boolean;
    createdAt: Date;
    lastLoginAt: Date;
    roles: string[];
    permissions: string[];
}
export interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isInitializing: boolean;
    error: string | null;
    sessionToken?: string;
    expiresAt?: Date;
    refreshToken?: string;
}
export interface SessionData {
    uid: string;
    email: string;
    handle?: string;
    schoolId?: string;
    isOnboarded: boolean;
    sessionToken: string;
    expiresAt: Date;
    refreshToken?: string;
    ipAddress?: string;
    userAgent?: string;
    device?: string;
    location?: string;
    lastActivity: Date;
}
export interface LoginCredentials {
    email: string;
    password?: string;
    rememberMe?: boolean;
}
export interface MagicLinkRequest {
    email: string;
    redirectUrl?: string;
    schoolDomain?: string;
}
export interface MagicLinkVerification {
    token: string;
    email: string;
    otp?: string;
}
export interface AuthError {
    code: string;
    message: string;
    details?: Record<string, any>;
    timestamp: Date;
}
export interface DevLoginData {
    email: string;
    uid?: string;
    handle?: string;
    schoolId?: string;
    userType?: 'student' | 'faculty' | 'staff' | 'alumni';
    isOnboarded?: boolean;
}
export interface UseAuthReturn {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    sendMagicLink: (request: MagicLinkRequest) => Promise<void>;
    verifyMagicLink: (verification: MagicLinkVerification) => Promise<void>;
    refreshSession: () => Promise<void>;
    updateProfile: (updates: Partial<AuthUser>) => Promise<void>;
    devLogin: (data: DevLoginData) => Promise<void>;
}
export interface UseSessionReturn {
    session: SessionData | null;
    isValidSession: boolean;
    isExpired: boolean;
    timeUntilExpiry: number;
    refreshSession: () => Promise<void>;
    clearSession: () => void;
    updateLastActivity: () => void;
}
export interface UseMagicLinkReturn {
    isLoading: boolean;
    error: string | null;
    emailSent: boolean;
    isVerifying: boolean;
    sendMagicLink: (request: MagicLinkRequest) => Promise<void>;
    verifyMagicLink: (verification: MagicLinkVerification) => Promise<void>;
    resendMagicLink: () => Promise<void>;
    reset: () => void;
}
export interface AuthProviderProps {
    children: React.ReactNode;
    fallback?: React.ComponentType;
    enableDevMode?: boolean;
    sessionTimeout?: number;
}
export interface SessionProviderProps {
    children: React.ReactNode;
    refreshInterval?: number;
    onSessionExpired?: () => void;
    onSessionRefreshed?: (session: SessionData) => void;
}
export interface AuthGuardProps {
    children: React.ReactNode;
    fallback?: React.ComponentType;
    requireOnboarding?: boolean;
    requiredRoles?: string[];
    redirectTo?: string;
}
export interface SessionGuardProps {
    children: React.ReactNode;
    fallback?: React.ComponentType;
    maxInactivity?: number;
    warningThreshold?: number;
}
//# sourceMappingURL=types.d.ts.map