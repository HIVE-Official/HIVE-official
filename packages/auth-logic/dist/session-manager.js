import { logger } from './logger';
const SESSION_STORAGE_KEY = "hive_session_info";
const DEFAULT_REFRESH_THRESHOLD = 5; // Refresh 5 minutes before expiry
export class SessionManager {
    constructor() {
        this.sessionInfo = null;
        this.refreshTimer = null;
        this.loadSessionInfo();
    }
    static getInstance() {
        if (!SessionManager.instance) {
            SessionManager.instance = new SessionManager();
        }
        return SessionManager.instance;
    }
    updateSession(user) {
        const now = Date.now();
        // Firebase ID tokens are valid for 1 hour (3600 seconds)
        const tokenExpiry = now + (3600 * 1000);
        this.sessionInfo = {
            lastActivity: now,
            tokenExpiry,
            refreshThreshold: DEFAULT_REFRESH_THRESHOLD,
        };
        this.saveSessionInfo();
        this.scheduleTokenRefresh(user);
    }
    isSessionValid() {
        if (!this.sessionInfo)
            return false;
        const now = Date.now();
        return now < this.sessionInfo.tokenExpiry;
    }
    shouldRefreshToken() {
        if (!this.sessionInfo)
            return false;
        const now = Date.now();
        const refreshTime = this.sessionInfo.tokenExpiry - (this.sessionInfo.refreshThreshold * 60 * 1000);
        return now >= refreshTime;
    }
    updateActivity() {
        if (this.sessionInfo) {
            this.sessionInfo.lastActivity = Date.now();
            this.saveSessionInfo();
        }
    }
    getTimeUntilExpiry() {
        if (!this.sessionInfo)
            return 0;
        const now = Date.now();
        return Math.max(0, this.sessionInfo.tokenExpiry - now);
    }
    clearSession() {
        this.sessionInfo = null;
        this.clearSessionStorage();
        if (this.refreshTimer) {
            clearTimeout(this.refreshTimer);
            this.refreshTimer = null;
        }
    }
    scheduleTokenRefresh(user) {
        if (this.refreshTimer) {
            clearTimeout(this.refreshTimer);
        }
        if (!this.sessionInfo)
            return;
        const now = Date.now();
        const refreshTime = this.sessionInfo.tokenExpiry - (this.sessionInfo.refreshThreshold * 60 * 1000);
        const timeUntilRefresh = Math.max(0, refreshTime - now);
        this.refreshTimer = setTimeout(async () => {
            try {
                await this.refreshUserToken(user);
            }
            catch (_error) {
                logger.error('Failed to refresh token', { error: _error });
            }
        }, timeUntilRefresh);
    }
    async refreshUserToken(user) {
        try {
            // Force refresh the token
            await user.getIdToken(true);
            this.updateSession(user);
        }
        catch (_error) {
            logger.error('Token refresh failed', { error: _error });
            // Let the auth state change handler deal with the failed refresh
        }
    }
    loadSessionInfo() {
        if (typeof window === "undefined")
            return;
        try {
            const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
            if (stored) {
                this.sessionInfo = JSON.parse(stored);
            }
        }
        catch (_error) {
            this.sessionInfo = null;
        }
    }
    saveSessionInfo() {
        if (typeof window === "undefined" || !this.sessionInfo)
            return;
        try {
            sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(this.sessionInfo));
        }
        catch (_error) {
            // Error handled silently
        }
    }
    clearSessionStorage() {
        if (typeof window === "undefined")
            return;
        try {
            sessionStorage.removeItem(SESSION_STORAGE_KEY);
        }
        catch (_error) {
            // Error handled silently
        }
    }
}
// Activity tracking for session management
export function trackUserActivity() {
    const sessionManager = SessionManager.getInstance();
    sessionManager.updateActivity();
}
// Hook for components to track activity
export function useActivityTracking() {
    if (typeof window === "undefined")
        return;
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
    const handleActivity = () => {
        trackUserActivity();
    };
    events.forEach(event => {
        document.addEventListener(event, handleActivity, { passive: true });
    });
    // Cleanup function should be called when component unmounts
    return () => {
        events.forEach(event => {
            document.removeEventListener(event, handleActivity);
        });
    };
}
//# sourceMappingURL=session-manager.js.map