import { type SessionUser } from "./user-types";
import type { AuthenticationState, UserPermissions } from "./authentication-types";
import type { SessionContext, SessionMetadata } from "./session-context-types";
export interface UserSession {
    id: string;
    userId: string;
    user: SessionUser;
    authentication: AuthenticationState;
    permissions: UserPermissions;
    context: SessionContext;
    metadata: SessionMetadata;
}
export interface SessionManager {
    createSession(userId: string, context: Partial<SessionContext>): Promise<UserSession>;
    getSession(sessionId: string): Promise<UserSession | null>;
    updateSession(sessionId: string, updates: Partial<UserSession>): Promise<UserSession>;
    refreshSession(sessionId: string): Promise<UserSession>;
    destroySession(sessionId: string): Promise<void>;
    validateSession(sessionId: string): Promise<boolean>;
    extendSession(sessionId: string, duration: number): Promise<UserSession>;
    getActiveSessions(userId: string): Promise<UserSession[]>;
    revokeAllSessions(userId: string): Promise<void>;
}
export declare function validateUserSession(session: unknown): UserSession;
export declare function isValidUserSession(session: unknown): session is UserSession;
export declare function createGuestSession(): Partial<UserSession>;
//# sourceMappingURL=session-manager-types.d.ts.map