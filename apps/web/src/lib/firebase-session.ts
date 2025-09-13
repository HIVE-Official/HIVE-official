/**
 * Firebase Session Management
 * Handles ID token storage, refresh, and validation
 */

import { auth } from "./firebase";
import { logger } from "./logger";

export interface SessionData {
  idToken: string;
  userId: string;
  email: string;
  expiresAt: number;
}

const SESSION_KEY = "hive-session";
const TOKEN_REFRESH_BUFFER = 5 * 60 * 1000; // Refresh 5 minutes before expiry

/**
 * Store session data in cookies and localStorage
 */
export function storeSession(sessionData: SessionData) {
  try {
    // Store in localStorage for client-side access
    if (typeof window !== "undefined") {
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
      
      // Also store individual items for backward compatibility
      localStorage.setItem("hive-id-token", sessionData.idToken);
      localStorage.setItem("hive-user-id", sessionData.userId);
      localStorage.setItem("hive-user-email", sessionData.email);
      
      // Set cookies for server-side access (httpOnly should be false for client access)
      document.cookie = `hive-id-token=${sessionData.idToken}; path=/; max-age=3600; SameSite=Strict`;
      document.cookie = `hive-user-id=${sessionData.userId}; path=/; max-age=86400; SameSite=Strict`;
    }
  } catch (error) {
    logger.error("Failed to store session", { error });
  }
}

/**
 * Clear session data from all storage
 */
export function clearSession() {
  try {
    if (typeof window !== "undefined") {
      // Clear localStorage
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem("hive-id-token");
      localStorage.removeItem("hive-user-id");
      localStorage.removeItem("hive-user-email");
      localStorage.removeItem("emailForSignIn");
      
      // Clear cookies
      document.cookie = "hive-id-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
      document.cookie = "hive-user-id=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
      document.cookie = "firebase-id-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
  } catch (error) {
    logger.error("Failed to clear session", { error });
  }
}

/**
 * Get current session data
 */
export function getSession(): SessionData | null {
  try {
    if (typeof window === "undefined") return null;
    
    const sessionStr = localStorage.getItem(SESSION_KEY);
    if (!sessionStr) return null;
    
    const session = JSON.parse(sessionStr) as SessionData;
    
    // Check if session is expired
    if (Date.now() > session.expiresAt) {
      clearSession();
      return null;
    }
    
    return session;
  } catch (error) {
    logger.error("Failed to get session", { error });
    return null;
  }
}

/**
 * Check if session needs refresh
 */
export function shouldRefreshToken(): boolean {
  const session = getSession();
  if (!session) return false;
  
  // Refresh if within buffer time of expiry
  return Date.now() > (session.expiresAt - TOKEN_REFRESH_BUFFER);
}

/**
 * Refresh the Firebase ID token
 */
export async function refreshToken(): Promise<boolean> {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      clearSession();
      return false;
    }
    
    // Force token refresh
    const idToken = await currentUser.getIdToken(true);
    
    // Parse token to get expiry (Firebase tokens expire after 1 hour)
    const tokenParts = idToken.split('.');
    const payload = JSON.parse(atob(tokenParts[1]));
    const expiresAt = payload.exp * 1000; // Convert to milliseconds
    
    // Store refreshed session
    storeSession({
      idToken,
      userId: currentUser.uid,
      email: currentUser.email || "",
      expiresAt
    });
    
    logger.info("Token refreshed successfully");
    return true;
  } catch (error) {
    logger.error("Failed to refresh token", { error });
    clearSession();
    return false;
  }
}

/**
 * Initialize token refresh interval
 */
export function initializeTokenRefresh() {
  if (typeof window === "undefined") return;
  
  // Check and refresh token every 5 minutes
  const interval = setInterval(async () => {
    if (shouldRefreshToken()) {
      await refreshToken();
    }
  }, 5 * 60 * 1000);
  
  // Clear interval on page unload
  window.addEventListener("beforeunload", () => {
    clearInterval(interval);
  });
  
  return () => clearInterval(interval);
}

/**
 * Verify ID token on server side
 */
export async function verifyIdToken(idToken: string): Promise<boolean> {
  try {
    const response = await fetch("/api/auth/verify-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken })
    });
    
    return response.ok;
  } catch (error) {
    logger.error("Failed to verify token", { error });
    return false;
  }
}