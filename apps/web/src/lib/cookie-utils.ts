/**
 * Cookie utilities for managing session tokens
 * Provides consistent cookie management for authentication
 */

interface CookieOptions {
  maxAge?: number; // in seconds
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  path?: string;
}

export const CookieUtils = {
  /**
   * Set a cookie with proper options
   */
  setCookie(name: string, value: string, options: CookieOptions = {}): void {
    if (typeof document === 'undefined') return;
    
    const {
      maxAge = 24 * 60 * 60, // 24 hours default
      secure = window.location.protocol === 'https:',
      sameSite = 'lax',
      path = '/'
    } = options;
    
    let cookieString = `${name}=${encodeURIComponent(value)}`;
    cookieString += `; Max-Age=${maxAge}`;
    cookieString += `; Path=${path}`;
    cookieString += `; SameSite=${sameSite}`;
    
    if (secure) {
      cookieString += '; Secure';
    }
    
    document.cookie = cookieString;
  },

  /**
   * Get cookie value by name
   */
  getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift();
      return cookieValue ? decodeURIComponent(cookieValue) : null;
    }
    
    return null;
  },

  /**
   * Delete a cookie
   */
  deleteCookie(name: string, path: string = '/'): void {
    if (typeof document === 'undefined') return;
    
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
  },

  /**
   * Set session token for authentication
   */
  setSessionToken(token: string): void {
    this.setCookie('session-token', token, {
      maxAge: 24 * 60 * 60, // 24 hours
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
  },

  /**
   * Get session token
   */
  getSessionToken(): string | null {
    return this.getCookie('session-token');
  },

  /**
   * Clear session token
   */
  clearSessionToken(): void {
    this.deleteCookie('session-token');
  },

  /**
   * Generate a secure session token for development
   */
  generateDevSessionToken(userId: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2);
    return `dev_session_${userId}_${timestamp}_${random}`;
  }
};