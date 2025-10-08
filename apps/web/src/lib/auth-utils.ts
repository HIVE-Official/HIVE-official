/**
 * Centralized authentication utilities for HIVE application
 * Handles token management and API authentication consistently
 */

import { config } from './config';
import { logger } from './structured-logger';
import type { SessionData } from "@hive/core";

type StoredSession = Pick<SessionData, "userId" | "email"> & {
  token: string;
  expiresAt: number;
};

interface AuthHeaders {
  Authorization?: string;
  'Content-Type'?: string;
}

class AuthManager {
  private readonly storageKey = config.auth.tokenStorageKey;
  private readonly testToken = 'test-token';

  /**
   * Get current session data from storage
   */
  private getStoredSession(): StoredSession | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const sessionJson = window.localStorage.getItem(this.storageKey);
      if (!sessionJson) return null;

      const rawSession = JSON.parse(sessionJson) as StoredSession & { uid?: string; id?: string };

      const session: StoredSession = {
        userId: rawSession.userId || rawSession.id || rawSession.uid || '',
        token: rawSession.token,
        email: rawSession.email,
        expiresAt: rawSession.expiresAt,
      };
      
      // Check if token is expired
      if (session.expiresAt && Date.now() > session.expiresAt) {
        this.clearSession();
        logger.warn('Session expired, clearing stored data');
        return null;
      }
      
      return session;
    } catch (error) {
      logger.error('Failed to parse stored session', { action: 'auth_parse_error' }, error as Error);
      this.clearSession(); // Clear corrupted data
      return null;
    }
  }

  /**
   * Clear session data from storage
   */
  private clearSession(): void {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(this.storageKey);
  }

  /**
   * Get authentication headers for API requests
   */
  getAuthHeaders(includeContentType = false): AuthHeaders {
    const headers: AuthHeaders = {};
    
    if (includeContentType) {
      headers['Content-Type'] = 'application/json';
    }

    // In development, always use test token if no real session
    if (config.auth.enableTestMode) {
      const session = this.getStoredSession();
      headers.Authorization = `Bearer ${session?.token || this.testToken}`;
      
      if (!session?.token) {
        logger.debug('Using test token for development', { action: 'auth_test_token' });
      }
    } else {
      // Production: require valid session
      const session = this.getStoredSession();
      if (session?.token) {
        headers.Authorization = `Bearer ${session.token}`;
      } else {
        logger.warn('No valid session found in production', { action: 'auth_no_session' });
        throw new Error('Authentication required');
      }
    }

    return headers;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (config.auth.enableTestMode) {
      return true; // Always authenticated in development
    }
    
    const session = this.getStoredSession();
    return session !== null && !!session.token;
  }

  /**
   * Get current user ID
   */
  getCurrentUserId(): string | null {
    const session = this.getStoredSession();
    return session?.userId || null;
  }

  /**
   * Store session data
   */
  setSession(sessionData: (Pick<StoredSession, "token" | "email"> & { userId?: string; uid?: string; expiresAt?: number }) ): void {
    if (typeof window === 'undefined') return;

    const expiresAt = sessionData.expiresAt || 
      (Date.now() + (config.auth.tokenExpiryHours * 60 * 60 * 1000));

    const userId = sessionData.userId || sessionData.uid || '';

    const session: StoredSession = {
      userId,
      token: sessionData.token,
      email: sessionData.email,
      expiresAt,
    };

    try {
      window.localStorage.setItem(this.storageKey, JSON.stringify(session));
      logger.info('Session stored successfully', { 
        userId: session.userId,
        action: 'auth_session_stored' 
      });
    } catch (error) {
      logger.error('Failed to store session', { action: 'auth_store_error' }, error as Error);
    }
  }

  /**
   * Clear current session (logout)
   */
  logout(): void {
    const userId = this.getCurrentUserId();
    this.clearSession();
    
    logger.info('User logged out', { 
      userId: userId || 'unknown',
      action: 'auth_logout' 
    });
  }

  /**
   * Refresh token if needed
   */
  async refreshTokenIfNeeded(): Promise<boolean> {
    const session = this.getStoredSession();
    if (!session) return false;
    
    // Check if token expires within next hour
    const oneHour = 60 * 60 * 1000;
    if (session.expiresAt - Date.now() < oneHour) {
      try {
        // TODO: Implement token refresh logic
        // const newToken = await refreshToken(session.token);
        // this.setSession({ ...session, token: newToken });
        
        logger.info('Token refresh needed', { 
          userId: session.id,
          action: 'auth_refresh_needed' 
        });
        
        return true;
      } catch (error) {
        logger.error('Token refresh failed', { 
          userId: session.id,
          action: 'auth_refresh_failed' 
        }, error as Error);
        
        this.logout();
        return false;
      }
    }
    
    return true;
  }
}

// Export singleton instance
export const authManager = new AuthManager();

// Convenience functions
export const getAuthHeaders = (includeContentType = false) => 
  authManager.getAuthHeaders(includeContentType);

export const isAuthenticated = () => authManager.isAuthenticated();

export const getCurrentUserId = () => authManager.getCurrentUserId();

export const logout = () => authManager.logout();

/**
 * Higher-order function for API calls with automatic auth headers
 */
export async function authenticatedFetch(
  url: string, 
  options: globalThis.RequestInit = {}
): Promise<Response> {
  const authHeaders = getAuthHeaders(true);
  
  const requestOptions: globalThis.RequestInit = {
    ...options,
    headers: {
      ...authHeaders,
      ...options.headers,
    },
  };

  logger.info(`API Call: ${options.method || 'GET'} ${url}`, {
    userId: getCurrentUserId() || 'anonymous',
    endpoint: url,
    method: options.method || 'GET'
  });

  try {
    const response = await fetch(url, requestOptions);
    
    if (response.status === 401) {
      logger.warn('Unauthorized API request', { 
        action: 'api_unauthorized',
        metadata: { url, status: response.status }
      });
      
      // Handle token expiry
      if (!config.auth.enableTestMode) {
        logout();
        window.location.href = '/auth/login';
      }
    }
    
    return response;
  } catch (error) {
    logger.error('API request failed', {
      action: 'api_request_failed',
      metadata: { url, method: options.method || 'GET' }
    }, error as Error);
    
    throw error;
  }
}
