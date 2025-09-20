import type { User } from "firebase/auth";
export interface SessionInfo {
    lastActivity: number;
    tokenExpiry: number;
    refreshThreshold: number;
}
export declare class SessionManager {
    private static instance;
    private sessionInfo;
    private refreshTimer;
    private constructor();
    static getInstance(): SessionManager;
    updateSession(user: User): void;
    isSessionValid(): boolean;
    shouldRefreshToken(): boolean;
    updateActivity(): void;
    getTimeUntilExpiry(): number;
    clearSession(): void;
    private scheduleTokenRefresh;
    private refreshUserToken;
    private loadSessionInfo;
    private saveSessionInfo;
    private clearSessionStorage;
}
export declare function trackUserActivity(): void;
export declare function useActivityTracking(): (() => void) | void;
//# sourceMappingURL=session-manager.d.ts.map