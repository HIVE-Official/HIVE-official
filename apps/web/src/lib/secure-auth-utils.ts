/**
 * Secure Authentication Utilities
 * 
 * This module provides secure authentication utilities for the HIVE platform.
 * It handles token management, secure headers generation, and authentication
 * error handling with proper security measures.
 * 
 * Security features:
 * - Secure token storage and retrieval
 * - CSRF protection
 * - Rate limiting awareness
 * - Proper error handling without information leakage
 */

import { auth } from './firebase-client';
import { signOut } from 'firebase/auth';

// Token storage keys
const TOKEN_KEY = 'hive_auth_token';
const REFRESH_TOKEN_KEY = 'hive_refresh_token';
const TOKEN_EXPIRY_KEY = 'hive_token_expiry';

/**
 * Get secure authentication headers for API requests
 * 
 * This function generates secure headers including:
 * - Authorization bearer token
 * - CSRF token (if available)
 * - Content-Type for JSON
 * - Custom headers for the HIVE platform
 * 
 * @returns Headers object for authenticated API requests
 * @throws Error if no valid authentication token is available
 */
export function getSecureAuthHeaders(): HeadersInit {
  // Get the current user's ID token
  const user = auth.currentUser;
  
  if (!user) {
    throw new AuthenticationError('No authenticated user found');
  }

  // Get stored token or use Firebase token
  const token = getStoredToken() || user.refreshToken;
  
  if (!token) {
    throw new AuthenticationError('No valid authentication token available');
  }

  // Build secure headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'X-Client-Version': '1.0.0',
    'X-Platform': 'web',
  };

  // Add CSRF token if available (for state-changing operations)
  const csrfToken = getCSRFToken();
  if (csrfToken) {
    headers['X-CSRF-Token'] = csrfToken;
  }

  return headers;
}

/**
 * Get secure authentication headers with custom user token
 * Used when we have a fresh token from Firebase
 */
export async function getSecureAuthHeadersAsync(): Promise<HeadersInit> {
  const user = auth.currentUser;
  
  if (!user) {
    throw new AuthenticationError('No authenticated user found');
  }

  try {
    // Get fresh ID token from Firebase
    const token = await user.getIdToken(true);
    
    // Store the token for future use
    storeToken(token);
    
    // Build secure headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'X-Client-Version': '1.0.0',
      'X-Platform': 'web',
    };

    // Add CSRF token if available
    const csrfToken = getCSRFToken();
    if (csrfToken) {
      headers['X-CSRF-Token'] = csrfToken;
    }

    return headers;
  } catch (error) {
    console.error('Failed to get ID token:', error);
    throw new AuthenticationError('Failed to retrieve authentication token');
  }
}

/**
 * Handle authentication errors appropriately
 * 
 * This function processes auth errors and takes appropriate action:
 * - Token expired: Attempt to refresh
 * - Invalid token: Clear storage and redirect to login
 * - Network errors: Show user-friendly message
 * - Rate limiting: Show appropriate warning
 * 
 * @param error - The error to handle
 * @param options - Additional options for error handling
 */
export function handleAuthError(
  error: Error,
  options: {
    silent?: boolean;
    redirect?: boolean;
    retry?: () => Promise<void>;
  } = {}
): void {
  const { silent = false, redirect = true } = options;

  // Log error for debugging (in development only)
  if (process.env.NODE_ENV === 'development') {
    console.error('Authentication error:', error);
  }

  // Determine error type and handle accordingly
  if (error.message.includes('expired') || error.message.includes('401')) {
    // Token expired - attempt to refresh
    handleTokenExpired(redirect);
  } else if (error.message.includes('403') || error.message.includes('forbidden')) {
    // Forbidden - user doesn't have access
    if (!silent) {
      showErrorNotification('You do not have permission to perform this action');
    }
  } else if (error.message.includes('429')) {
    // Rate limited
    if (!silent) {
      showErrorNotification('Too many requests. Please try again later.');
    }
  } else if (error.message.includes('network') || error.message.includes('fetch')) {
    // Network error
    if (!silent) {
      showErrorNotification('Network error. Please check your connection.');
    }
  } else {
    // Generic auth error
    if (!silent) {
      showErrorNotification('Authentication error. Please try logging in again.');
    }
    
    if (redirect) {
      clearAuthStorage();
      redirectToLogin();
    }
  }
}

/**
 * Store authentication token securely
 */
function storeToken(token: string): void {
  try {
    // Store in sessionStorage for current session
    sessionStorage.setItem(TOKEN_KEY, token);
    
    // Calculate and store expiry (tokens typically expire in 1 hour)
    const expiry = Date.now() + (60 * 60 * 1000); // 1 hour from now
    sessionStorage.setItem(TOKEN_EXPIRY_KEY, expiry.toString());
  } catch (error) {
    console.error('Failed to store token:', error);
  }
}

/**
 * Get stored authentication token
 */
function getStoredToken(): string | null {
  try {
    const token = sessionStorage.getItem(TOKEN_KEY);
    const expiry = sessionStorage.getItem(TOKEN_EXPIRY_KEY);
    
    // Check if token exists and hasn't expired
    if (token && expiry) {
      const expiryTime = parseInt(expiry, 10);
      if (Date.now() < expiryTime) {
        return token;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Failed to retrieve token:', error);
    return null;
  }
}

/**
 * Get CSRF token if available
 */
function getCSRFToken(): string | null {
  // Try to get CSRF token from meta tag (common pattern)
  const metaTag = document.querySelector('meta[name="csrf-token"]');
  if (metaTag) {
    return metaTag.getAttribute('content');
  }
  
  // Try to get from cookie
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrf_token='));
  
  if (cookie) {
    return cookie.split('=')[1];
  }
  
  return null;
}

/**
 * Handle token expiration
 */
async function handleTokenExpired(redirect: boolean): Promise<void> {
  try {
    const user = auth.currentUser;
    if (user) {
      // Try to get a fresh token
      const newToken = await user.getIdToken(true);
      storeToken(newToken);
      
      // Optionally trigger a retry of the failed request
      return;
    }
  } catch (error) {
    console.error('Failed to refresh token:', error);
  }
  
  // If refresh fails, clear storage and redirect
  if (redirect) {
    clearAuthStorage();
    redirectToLogin();
  }
}

/**
 * Clear all authentication storage
 */
export function clearAuthStorage(): void {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_EXPIRY_KEY);
    
    // Also clear any other auth-related storage
    localStorage.removeItem('hive_user_id');
    localStorage.removeItem('hive_user_email');
  } catch (error) {
    console.error('Failed to clear auth storage:', error);
  }
}

/**
 * Redirect to login page
 */
function redirectToLogin(): void {
  if (typeof window !== 'undefined') {
    // Store current path for redirect after login
    const currentPath = window.location.pathname;
    if (currentPath !== '/auth/login') {
      sessionStorage.setItem('redirect_after_login', currentPath);
    }
    
    // Redirect to login
    window.location.href = '/auth/login';
  }
}

/**
 * Show error notification to user
 */
function showErrorNotification(message: string): void {
  // This is a placeholder - in production, use your notification system
  if (typeof window !== 'undefined') {
    // Try to use a toast notification if available
    const event = new CustomEvent('show-notification', {
      detail: { message, type: 'error' }
    });
    window.dispatchEvent(event);
    
    // Fallback to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Notification:', message);
    }
  }
}

/**
 * Sign out the current user
 */
export async function secureSignOut(): Promise<void> {
  try {
    // Clear all auth storage
    clearAuthStorage();
    
    // Sign out from Firebase
    await signOut(auth);
    
    // Redirect to home or login page
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  } catch (error) {
    console.error('Error during sign out:', error);
    // Even if Firebase sign out fails, clear local storage
    clearAuthStorage();
    
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }
}

/**
 * Custom authentication error class
 */
class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return auth.currentUser !== null || getStoredToken() !== null;
}

/**
 * Get current user ID safely
 */
export function getCurrentUserId(): string | null {
  return auth.currentUser?.uid || null;
}