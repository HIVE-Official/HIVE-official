// Temporary stub for auth utilities
// TODO: Implement proper server-side auth

import { authAdmin } from "./firebase-admin";

export interface AuthUser {
  uid: string;
  email: string;
  emailVerified: boolean;
  customClaims?: Record<string, any>;
}

/**
 * Verifies the Firebase ID token from the request headers
 * @param request - The incoming request object
 * @returns Promise<AuthUser | null>
 */
export async function verifyAuthToken(
  request: Request
): Promise<AuthUser | null> {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await authAdmin.verifyIdToken(token);

    return {
      uid: decodedToken.uid,
      email: decodedToken.email || "",
      emailVerified: decodedToken.email_verified || false,
      customClaims: decodedToken.custom_claims,
    };
  } catch (error) {
    console.error("Auth token verification failed:", error);
    return null;
  }
}

/**
 * Gets the auth token from the request headers
 * @param request - The incoming request object
 * @returns string | null
 */
export function getAuthTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.split("Bearer ")[1];
}

/**
 * Middleware helper to require authentication
 * @param request - The incoming request object
 * @returns Promise<AuthUser> - Throws if not authenticated
 */
export async function requireAuth(request: Request): Promise<AuthUser> {
  const user = await verifyAuthToken(request);

  if (!user) {
    throw new Error("Authentication required");
  }

  return user;
}

/**
 * Check if user has admin role
 * @param user - The authenticated user
 * @returns boolean
 */
export function isAdmin(user: AuthUser): boolean {
  return user.customClaims?.role === "admin" || false;
}

/**
 * Check if user has builder role in any space
 * @param user - The authenticated user
 * @returns boolean
 */
export function isBuilder(user: AuthUser): boolean {
  return user.customClaims?.roles?.includes("builder") || false;
}

/**
 * Get current user (placeholder)
 * @returns Promise<AuthUser | null>
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  return null;
} 