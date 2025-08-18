import type { User } from "firebase/auth";

export interface SessionInfo {
  lastActivity: number;
  tokenExpiry: number;
  refreshThreshold: number; // Minutes before expiry to refresh
}

const SESSION_STORAGE_KEY = "hive_session_info";
const DEFAULT_REFRESH_THRESHOLD = 5; // Refresh 5 minutes before expiry

export class SessionManager {
  private static instance: SessionManager;
  private sessionInfo: SessionInfo | null = null;
  private refreshTimer: NodeJS.Timeout | null = null;

  private constructor() {
    this.loadSessionInfo();
  }

  public static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  public updateSession(user: User): void {
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

  public isSessionValid(): boolean {
    if (!this.sessionInfo) return false;
    
    const now = Date.now();
    return now < this.sessionInfo.tokenExpiry;
  }

  public shouldRefreshToken(): boolean {
    if (!this.sessionInfo) return false;
    
    const now = Date.now();
    const refreshTime = this.sessionInfo.tokenExpiry - (this.sessionInfo.refreshThreshold * 60 * 1000);
    
    return now >= refreshTime;
  }

  public updateActivity(): void {
    if (this.sessionInfo) {
      this.sessionInfo.lastActivity = Date.now();
      this.saveSessionInfo();
    }
  }

  public getTimeUntilExpiry(): number {
    if (!this.sessionInfo) return 0;
    
    const now = Date.now();
    return Math.max(0, this.sessionInfo.tokenExpiry - now);
  }

  public clearSession(): void {
    this.sessionInfo = null;
    this.clearSessionStorage();
    
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  private scheduleTokenRefresh(user: User): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    if (!this.sessionInfo) return;

    const now = Date.now();
    const refreshTime = this.sessionInfo.tokenExpiry - (this.sessionInfo.refreshThreshold * 60 * 1000);
    const timeUntilRefresh = Math.max(0, refreshTime - now);

    this.refreshTimer = setTimeout(async () => {
      try {
        await this.refreshUserToken(user);
      } catch (error) {
        console.error("Failed to refresh token:", error);
      }
    }, timeUntilRefresh);
  }

  private async refreshUserToken(user: User): Promise<void> {
    try {
      // Force refresh the token
      await user.getIdToken(true);
      this.updateSession(user);
      console.log("Token refreshed successfully");
    } catch (error) {
      console.error("Token refresh failed:", error);
      // Let the auth state change handler deal with the failed refresh
    }
  }

  private loadSessionInfo(): void {
    if (typeof window === "undefined") return;
    
    try {
      const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (stored) {
        this.sessionInfo = JSON.parse(stored);
      }
    } catch (error) {
      console.warn("Failed to load session info:", error);
      this.sessionInfo = null;
    }
  }

  private saveSessionInfo(): void {
    if (typeof window === "undefined" || !this.sessionInfo) return;
    
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(this.sessionInfo));
    } catch (error) {
      console.warn("Failed to save session info:", error);
    }
  }

  private clearSessionStorage(): void {
    if (typeof window === "undefined") return;
    
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (error) {
      console.warn("Failed to clear session storage:", error);
    }
  }
}

// Activity tracking for session management
export function trackUserActivity(): void {
  const sessionManager = SessionManager.getInstance();
  sessionManager.updateActivity();
}

// Hook for components to track activity
export function useActivityTracking(): (() => void) | void {
  if (typeof window === "undefined") return;

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