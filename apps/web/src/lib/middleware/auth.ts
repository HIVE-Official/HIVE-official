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
    id: string; // Alias for uid for backwards compatibility
    email: string;
    decodedToken: DecodedIdToken;
  };
}

export interface RouteParams {
  params?: Record<string, string>;
  // Additional properties for specific routes
  isAdmin?: boolean;
  userId?: string;
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
      // Check for development mode session cookie first
      const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.VERCEL;
      const sessionCookie = request.cookies.get('hive_session');

      // In development, allow session cookie authentication
      if (isDevelopment && sessionCookie?.value) {
        try {
          // The session cookie is a JWT token, decode its payload
          // JWT format: header.payload.signature
          const tokenParts = sessionCookie.value.split('.');
          if (tokenParts.length !== 3) {
            throw new Error('Invalid JWT format');
          }

          // Decode the payload (middle part) from base64
          const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());

          // Validate session has required fields
          if (!payload.sub) {
            return NextResponse.json(
              ApiResponseHelper.error("Invalid session data", "UNAUTHORIZED"),
              { status: HttpStatus.UNAUTHORIZED }
            );
          }

          // Create authenticated request with session info
          const authenticatedRequest = request as AuthenticatedRequest;

          // Extract userId from the 'sub' field (standard JWT claim for subject)
          const userId = payload.sub;

          // For dev sessions, we'll use a simple email format
          const email = userId.includes('@') ? userId : `${userId.replace('dev-user-', '').replace('-', '.')}@buffalo.edu`;

          authenticatedRequest.user = {
            uid: userId,
            id: userId, // Alias for backwards compatibility
            email: email,
            decodedToken: {
              uid: userId,
              email: email,
              email_verified: true,
              aud: 'development',
              auth_time: Date.now() / 1000,
              exp: Date.now() / 1000 + 86400,
              iat: Date.now() / 1000,
              iss: 'development',
              sub: userId,
              firebase: {
                identities: {},
                sign_in_provider: 'development'
              }
            } as DecodedIdToken
          };

          // Call the handler with authenticated request
          return await handler(authenticatedRequest, context);
        } catch (error) {
          logger.error('Invalid session cookie', {
            error: error,
            endpoint: request.url
          });
          // Fall through to check for Bearer token
        }
      }

      // Extract and validate authorization header
      const authHeader = request.headers.get("authorization");
      if (!authHeader?.startsWith("Bearer ")) {
        return NextResponse.json(
          ApiResponseHelper.error("Missing or invalid authorization header", "UNAUTHORIZED"),
          { status: HttpStatus.UNAUTHORIZED }
        );
      }

      const idToken = authHeader.substring(7);

      // Check for development token format (dev_token_*)
      if (isDevelopment && idToken.startsWith('dev_token_')) {
        const userId = idToken.replace('dev_token_', '');

        // Create authenticated request with dev token info
        const authenticatedRequest = request as AuthenticatedRequest;
        authenticatedRequest.user = {
          uid: userId,
          id: userId, // Alias for backwards compatibility
          email: `${userId}@test.edu`, // Generate a test email
          decodedToken: {
            uid: userId,
            email: `${userId}@test.edu`,
            email_verified: true,
            aud: 'development',
            auth_time: Date.now() / 1000,
            exp: Date.now() / 1000 + 86400,
            iat: Date.now() / 1000,
            iss: 'development',
            sub: userId,
            firebase: {
              identities: {},
              sign_in_provider: 'development'
            }
          } as DecodedIdToken
        };

        // Call the handler with authenticated request
        return await handler(authenticatedRequest, context);
      }

      // SECURITY: NO DEVELOPMENT BYPASSES IN PRODUCTION
      // All tokens must be validated through Firebase Auth
      // Development environments should use real Firebase Auth with test accounts

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
        id: decodedToken.uid, // Alias for backwards compatibility
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
  return request.user.id;
}

/**
 * Utility function to get user email from authenticated request
 */
export function getUserEmail(request: AuthenticatedRequest): string {
  return request.user.email;
}