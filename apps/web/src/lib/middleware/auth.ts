import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import type { DecodedIdToken } from "firebase-admin/auth";
import { ApiResponseHelper, HttpStatus } from "@/lib/api-response-types";
import { logger } from "@/lib/structured-logger";

/**
 * Authenticated Request Handler Type
 * Handlers receive verified user info instead of raw request
 */
export interface AuthenticatedRequest extends NextRequest {
  user: {
    uid: string;
    email: string;
    decodedToken: DecodedIdToken;
  };
}

export interface RouteParams {
  params?: Record<string, string>;
}

export type AuthenticatedHandler<T extends RouteParams = {}> = (
  request: AuthenticatedRequest,
  context: T
) => Promise<Response>;

export type NextRouteHandler = (
  request: NextRequest,
  context: any
) => Promise<Response>;

/**
 * Auth Middleware - Eliminates duplicate auth validation across 20+ routes
 *
 * Before: Each route has 15+ lines of duplicate auth validation
 * After: Single withAuth() wrapper handles all authentication
 */
export function withAuth<T extends RouteParams>(
  handler: AuthenticatedHandler<T>
): NextRouteHandler {
  return async (request: NextRequest, context: T): Promise<Response> => {
    try {
      // Extract and validate authorization header
      const authHeader = request.headers.get("authorization");
      if (!authHeader?.startsWith("Bearer ")) {
        return NextResponse.json(
          ApiResponseHelper.error("Missing or invalid authorization header", "UNAUTHORIZED"),
          { status: HttpStatus.UNAUTHORIZED }
        );
      }

      const idToken = authHeader.substring(7);

      // In development mode, accept development tokens
      if (process.env.NODE_ENV === 'development' && idToken.startsWith('dev_token_')) {
        // Parse dev token to get user ID
        let userId = idToken.replace('dev_token_', '');

        // Handle session token format: debug-user_timestamp_hash -> debug-user
        if (userId.includes('_')) {
          userId = userId.split('_')[0];
        }

        // Create a mock decoded token for development
        const decodedToken = {
          uid: userId,
          email: 'student@test.edu', // Default dev email
          email_verified: true,
          iss: 'development',
          aud: 'development',
          auth_time: Math.floor(Date.now() / 1000),
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 3600,
          firebase: {
            sign_in_provider: 'development',
            identities: {}
          }
        } as DecodedIdToken;

        // Create authenticated request with dev user info
        const authenticatedRequest = request as AuthenticatedRequest;
        authenticatedRequest.user = {
          uid: userId,
          email: decodedToken.email || 'student@test.edu',
          decodedToken
        };

        // Call the actual handler with authenticated request
        return await handler(authenticatedRequest, context);
      }

      // Verify Firebase ID token
      const auth = getAuth();
      let decodedToken: DecodedIdToken;

      try {
        decodedToken = await auth.verifyIdToken(idToken);
      } catch (error) {
        logger.error('Invalid ID token', {
          error: error,
          endpoint: request.url
        });
        return NextResponse.json(
          ApiResponseHelper.error("Invalid or expired token", "UNAUTHORIZED"),
          { status: HttpStatus.UNAUTHORIZED }
        );
      }

      // Validate token contains required fields
      if (!decodedToken?.uid || !decodedToken?.email) {
        return NextResponse.json(
          ApiResponseHelper.error("Invalid token data", "UNAUTHORIZED"),
          { status: HttpStatus.UNAUTHORIZED }
        );
      }

      // Create authenticated request with user info
      const authenticatedRequest = request as AuthenticatedRequest;
      authenticatedRequest.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        decodedToken
      };

      // Call the actual handler with authenticated request
      return await handler(authenticatedRequest, context);

    } catch (error) {
      logger.error('Auth middleware error', {
        error: error,
        endpoint: request.url
      });

      return NextResponse.json(
        ApiResponseHelper.error("Authentication failed", "INTERNAL_ERROR"),
        { status: HttpStatus.INTERNAL_SERVER_ERROR }
      );
    }
  };
}

/**
 * Optional: Admin-only auth wrapper for admin routes
 * Extends withAuth to verify admin privileges
 */
export function withAdminAuth<T extends RouteParams>(
  handler: AuthenticatedHandler<T>
): NextRouteHandler {
  return withAuth(async (request: AuthenticatedRequest, context: T) => {
    try {
      // Check if user has admin claims
      const { customClaims } = request.user.decodedToken;
      const isAdmin = customClaims?.admin === true || customClaims?.role === 'admin';

      if (!isAdmin) {
        return NextResponse.json(
          ApiResponseHelper.error("Admin access required", "FORBIDDEN"),
          { status: HttpStatus.FORBIDDEN }
        );
      }

      return await handler(request, context);

    } catch (error) {
      logger.error('Admin auth middleware error', {
        error: error,
        endpoint: request.url
      });

      return NextResponse.json(
        ApiResponseHelper.error("Admin authorization failed", "INTERNAL_ERROR"),
        { status: HttpStatus.INTERNAL_SERVER_ERROR }
      );
    }
  });
}

/**
 * Utility function to get user ID from authenticated request
 * Helps migration from old pattern
 */
export function getUserId(request: AuthenticatedRequest): string {
  return request.user.uid;
}

/**
 * Utility function to get user email from authenticated request
 */
export function getUserEmail(request: AuthenticatedRequest): string {
  return request.user.email;
}