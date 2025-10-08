/**
 * Session utilities for safe localStorage access
 * Provides error handling and consistency across direct localStorage usage
 * 
 * DEPRECATED: Use UnifiedAuth context instead for new code
 * Updated to work with cookie-based authentication
 */

import { CookieUtils } from './cookie-utils';
import type { SessionData } from "@hive/core";

type ExtendedSessionData = SessionData & {
  needsOnboarding?: boolean;
  onboardingCompleted?: boolean;
  token?: string;
  developmentMode?: boolean;
  profileData?: {
    fullName: string;
    handle: string;
    major: string;
    avatarUrl: string;
    builderOptIn: boolean;
  };
};

export const SessionUtils = {
  /**
   * Safely get session data from localStorage
   */
  getSession(): ExtendedSessionData | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const sessionJson = window.localStorage.getItem('hive_session');
      if (!sessionJson) return null;
      
      return JSON.parse(sessionJson) as ExtendedSessionData;
    } catch (error) {
      console.error('Failed to parse session data:', error);
      // Clear corrupted session
      this.clearSession();
      return null;
    }
  },

  /**
   * Safely set session data to localStorage and cookies
   */
  setSession(sessionData: ExtendedSessionData): void {
    if (typeof window === 'undefined') return;
    
    try {
      window.localStorage.setItem('hive_session', JSON.stringify(sessionData));
      if (sessionData.developmentMode) {
        window.localStorage.setItem('dev_auth_mode', 'true');
        // Set session cookie for middleware compatibility
        const sessionToken = CookieUtils.generateDevSessionToken(sessionData.userId);
        CookieUtils.setSessionToken(sessionToken);
      }
    } catch (error) {
      console.error('Failed to save session data:', error);
    }
  },

  /**
   * Clear all session data including cookies
   */
  clearSession(): void {
    if (typeof window === 'undefined') return;
    
    window.localStorage.removeItem('hive_session');
    window.localStorage.removeItem('dev_auth_mode');
    window.localStorage.removeItem('auth_token');
    window.localStorage.removeItem('firebase_token');
    window.localStorage.removeItem('emailForSignIn');
    
    // Also clear session cookies
    CookieUtils.clearSessionToken();
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const session = this.getSession();
    if (!session) return false;

    // Check if session is expired (24 hours)
    const sessionAge = Date.now() - new Date(session.verifiedAt).getTime();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    // Skip expiration check for dev mode
    const isDev = window.localStorage.getItem('dev_auth_mode') === 'true';
    if (isDev) return true;
    
    if (sessionAge > maxAge) {
      this.clearSession();
      return false;
    }
    
    return true;
  },

  /**
   * Get user ID safely
   */
  getUserId(): string | null {
    const session = this.getSession();
    return session?.userId || null;
  },

  /**
   * Get authorization header value
   */
  getAuthHeader(): string {
    const session = this.getSession();
    if (!session) return 'anonymous';
    
    return session.token || `session_${session.userId}`;
  },

  /**
   * Check if user needs onboarding
   */
  needsOnboarding(): boolean {
    const session = this.getSession();
    if (!session) return false;
    
    return !session.onboardingCompleted;
  }
};
