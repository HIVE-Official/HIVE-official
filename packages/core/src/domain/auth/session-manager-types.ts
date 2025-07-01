import type { SessionUser } from "./user-types";
import { createDefaultUserPreferences } from "./user-types";
import type { AuthenticationState, UserPermissions } from "./authentication-types";
import type { SessionContext, SessionMetadata } from "./session-context-types";

// Core Session Types  
export interface UserSession {
  id: string;
  userId: string;
  user: SessionUser;
  authentication: AuthenticationState;
  permissions: UserPermissions;
  context: SessionContext;
  metadata: SessionMetadata;
}

// Session Management Interface
export interface SessionManager {
  createSession(
    userId: string,
    context: Partial<SessionContext>
  ): Promise<UserSession>;
  getSession(sessionId: string): Promise<UserSession | null>;
  updateSession(
    sessionId: string,
    updates: Partial<UserSession>
  ): Promise<UserSession>;
  refreshSession(sessionId: string): Promise<UserSession>;
  destroySession(sessionId: string): Promise<void>;
  validateSession(sessionId: string): Promise<boolean>;
  extendSession(sessionId: string, duration: number): Promise<UserSession>;
  getActiveSessions(userId: string): Promise<UserSession[]>;
  revokeAllSessions(userId: string): Promise<void>;
}

// Session Validation Functions
export function validateUserSession(session: unknown): UserSession {
  // Implementation would go here  
  return session as UserSession;
}

export function isValidUserSession(session: unknown): session is UserSession {
  // Implementation would go here
  return typeof session === 'object' && session !== null;
}

export function createGuestSession(): Partial<UserSession> {
  return {
    id: `guest-${Date.now()}`,
    userId: "",
    user: {
      id: "",
      email: "",
      emailVerified: false,
      profile: {
        interests: [],
        visibility: "private",
        onboardingCompleted: false,
      },
      preferences: createDefaultUserPreferences(),
    },
    authentication: {
      isAuthenticated: false,
      method: "magic-link",
      provider: "email", 
      tokenType: "access",
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      lastLoginAt: new Date(),
      loginCount: 0,
      mfaEnabled: false,
      mfaVerified: false,
    },
  };
} 