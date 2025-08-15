/**
 * Secure Authentication Utilities for HIVE
 * 
 * SECURITY: This file provides hardened authentication utilities
 * to replace all insecure dev token patterns across the application.
 * 
 * @author HIVE Security Team
 * @version 1.0.0 - Production Ready
 */

export interface SecureAuthHeaders extends Record<string, string> {
  'Content-Type': string;
  'Authorization': string;
  'X-Hive-Client': string;
}

/**
 * Get secure authentication headers for API requests
 * 
 * SECURITY FEATURES:
 * - No development token bypasses
 * - Token validation and length checks
 * - Client identification headers
 * - Automatic error handling for missing/invalid tokens
 * 
 * @throws {Error} When authentication token is missing or invalid
 * @returns {SecureAuthHeaders} Validated headers ready for API requests
 */
export function getSecureAuthHeaders(): SecureAuthHeaders {
  const token = localStorage.getItem('hive_session_token');
  
  // SECURITY: Validate token presence and format
  if (!token || typeof token !== 'string' || token.length < 32) {
    throw new Error('HIVE_AUTH_REQUIRED: Please log in to continue');
  }

  // SECURITY: Basic token format validation (should be JWT-like)
  if (!token.includes('.') || token.split('.').length !== 3) {
    localStorage.removeItem('hive_session_token'); // Clear invalid token
    throw new Error('HIVE_AUTH_INVALID: Session corrupted, please log in again');
  }

  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'X-Hive-Client': 'web-app-v1'
  };
}

/**
 * Secure fetch wrapper that automatically includes authentication
 * 
 * @param url - API endpoint URL
 * @param options - Fetch options (method, body, etc.)
 * @returns {Promise<Response>} Authenticated fetch response
 */
export async function secureApiFetch(
  url: string, 
  options: globalThis.RequestInit = {}
): Promise<Response> {
  try {
    const headers = getSecureAuthHeaders();
    
    return fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      }
    });
  } catch (error) {
    // SECURITY: Log auth failures for monitoring
    console.error('[HIVE_AUTH_ERROR]', { url, error: error.message });
    throw error;
  }
}

/**
 * Check if user has valid authentication
 * 
 * @returns {boolean} True if user is properly authenticated
 */
export function isAuthenticated(): boolean {
  try {
    getSecureAuthHeaders();
    return true;
  } catch {
    return false;
  }
}

/**
 * Clear user authentication (logout)
 */
export function clearAuthentication(): void {
  localStorage.removeItem('hive_session_token');
  localStorage.removeItem('hive_session');
  localStorage.removeItem('auth_token'); // Clear legacy tokens
}

/**
 * Handle authentication errors consistently
 * 
 * @param error - Error from API call
 * @param redirectToLogin - Whether to redirect to login page
 */
export function handleAuthError(error: Error, redirectToLogin: boolean = true): void {
  if (error.message.includes('HIVE_AUTH_')) {
    clearAuthentication();
    
    if (redirectToLogin && typeof window !== 'undefined') {
      window.location.href = '/auth/login?reason=session_expired';
    }
  }
}