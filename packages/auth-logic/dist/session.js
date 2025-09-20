import { z } from 'zod';
import { AuthErrorCode, createAuthError } from './errors';
// Session status types
export const SessionStatus = {
    AUTHENTICATED: 'authenticated',
    UNAUTHENTICATED: 'unauthenticated',
    LOADING: 'loading',
    ERROR: 'error'
};
// Session data schema
export const SessionSchema = z.object({
    user: z.object({
        uid: z.string(),
        email: z.string().email(),
        emailVerified: z.boolean(),
        lastLoginAt: z.string(),
        createdAt: z.string(),
    }),
    expires: z.string().datetime(),
    lastActive: z.string().datetime(),
    deviceId: z.string(),
});
const DEFAULT_CONFIG = {
    maxInactiveTime: 30 * 60 * 1000, // 30 minutes  renewThreshold: 5 * 60 * 1000, // 5 minutes maxConcurrentSessions: 3
};
export class SessionManager {
    constructor(config = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };
    }
    // Initialize session monitoring
    initializeSession(session) {
        this.resetInactivityTimer();
        this.scheduleRenewal(session);
    }
    // Reset inactivity timer on user activity
    resetInactivityTimer() {
        if (this.inactivityTimeout) {
            clearTimeout(this.inactivityTimeout);
        }
        this.inactivityTimeout = setTimeout(() => {
            this.handleInactiveSession();
        }, this.config.maxInactiveTime);
    }
    // Schedule session renewal
    scheduleRenewal(session) {
        const expiryTime = new Date(session.expires).getTime();
        const now = Date.now();
        const timeUntilRenewal = expiryTime - now - this.config.renewThreshold;
        if (timeUntilRenewal <= 0) {
            this.renewSession();
        }
        else {
            if (this.renewalTimeout) {
                clearTimeout(this.renewalTimeout);
            }
            this.renewalTimeout = setTimeout(() => {
                this.renewSession();
            }, timeUntilRenewal);
        }
    }
    // Handle inactive session
    handleInactiveSession() {
        // Clear any existing timers
        this.clearTimers();
        // Create an inactivity error
        const error = createAuthError(AuthErrorCode.SESSION_EXPIRED, {
            reason: 'inactivity',
            lastActive: new Date().toISOString()
        });
        // Emit session expired event
        this.emitSessionEvent('expired', error);
    }
    // Renew session
    async renewSession() {
        try {
            // Implement session renewal logic here
            // This should call your backend to get a new session token
            // Reset timers after successful renewal
            this.resetInactivityTimer();
        }
        catch (_error) {
            // Handle renewal failure
            const authError = createAuthError(AuthErrorCode.SESSION_EXPIRED, {
                reason: 'renewal_failed',
                error: _error instanceof Error ? _error.message : 'Unknown error'
            });
            this.emitSessionEvent('error', authError);
        }
    }
    // Validate session
    validateSession(session) {
        try {
            // Validate session data
            SessionSchema.parse(session);
            // Check if session is expired
            const expiryTime = new Date(session.expires).getTime();
            if (expiryTime <= Date.now()) {
                throw createAuthError(AuthErrorCode.SESSION_EXPIRED);
            }
            // Check last active time
            const lastActive = new Date(session.lastActive).getTime();
            const inactiveTime = Date.now() - lastActive;
            if (inactiveTime > this.config.maxInactiveTime) {
                throw createAuthError(AuthErrorCode.SESSION_EXPIRED, {
                    reason: 'inactivity',
                    lastActive: session.lastActive
                });
            }
            return true;
        }
        catch (_error) {
            if (_error instanceof z.ZodError) {
                throw createAuthError(AuthErrorCode.INVALID_SESSION, {
                    validationErrors: _error.errors
                });
            }
            throw _error;
        }
    }
    // Clean up timers
    clearTimers() {
        if (this.inactivityTimeout) {
            clearTimeout(this.inactivityTimeout);
        }
        if (this.renewalTimeout) {
            clearTimeout(this.renewalTimeout);
        }
    }
    // Event emission helper
    emitSessionEvent(type, data) {
        const event = new CustomEvent(`session:${type}`, {
            detail: data
        });
        window.dispatchEvent(event);
    }
}
// Create and export a singleton instance
export const sessionManager = new SessionManager();
// Hook for components to use session management
export const useSessionManager = () => {
    return {
        validateSession: (session) => sessionManager.validateSession(session),
        resetInactivityTimer: () => sessionManager.resetInactivityTimer(),
        initializeSession: (session) => sessionManager.initializeSession(session),
        clearTimers: () => sessionManager.clearTimers()
    };
};
//# sourceMappingURL=session.js.map