/**
 * HIVE Consolidated Authentication Utilities
 *
 * This is the single source of truth for authentication functions.
 * All auth-related imports should use this file.
 *
 * @author HIVE Platform Team
 * @version 2.0.0 - Consolidated from 14 auth files
 */

// Server-side auth utilities (from auth.ts)
import {
  verifyAuthToken,
  getAuthTokenFromRequest,
  requireAuth as requireAuthFn,
  isAdmin as isAdminFn,
  isBuilder as isBuilderFn,
  getCurrentUser,
  type AuthUser
} from '../auth'

// Client-side secure auth utilities (from secure-auth-utils.ts)
import {
  getSecureAuthHeaders,
  secureApiFetch,
  isAuthenticated as isAuthenticatedFn,
  clearAuthentication,
  handleAuthError,
  type SecureAuthHeaders
} from '../secure-auth-utils'

// Re-export the primary auth hook from auth-logic package
import { useAuth, type UseAuthReturn as AuthHook } from '@hive/auth-logic'

// Re-export individual functions for direct imports
export {
  verifyAuthToken,
  getAuthTokenFromRequest,
  requireAuthFn as requireAuth,
  isAdminFn as isAdmin,
  isBuilderFn as isBuilder,
  getCurrentUser,
  getSecureAuthHeaders,
  secureApiFetch,
  isAuthenticatedFn as isAuthenticated,
  clearAuthentication,
  handleAuthError,
  useAuth,
  type AuthUser,
  type SecureAuthHeaders,
  type AuthHook
}

/**
 * Legacy compatibility exports
 * These will be phased out in favor of the consolidated functions above
 */
export type { AuthUser as LegacyAuthUser }

/**
 * Consolidated auth utilities - preferred interface
 */
export const Auth = {
  // Server-side functions
  server: {
    verifyToken: verifyAuthToken,
    requireAuth: requireAuthFn,
    isAdmin: isAdminFn,
    isBuilder: isBuilderFn,
  },

  // Client-side functions
  client: {
    getHeaders: getSecureAuthHeaders,
    fetch: secureApiFetch,
    isAuthenticated: isAuthenticatedFn,
    logout: clearAuthentication,
    handleError: handleAuthError,
  },

  // React hook
  useAuth,
} as const

/**
 * Migration notes:
 *
 * OLD: import { someAuthFunction } from '../auth-utils'
 * NEW: import { Auth } from '../auth'
 * USAGE: Auth.client.someFunction() or Auth.server.someFunction()
 *
 * This provides a clear separation between client and server auth utilities
 * and makes it obvious which environment each function is intended for.
 */