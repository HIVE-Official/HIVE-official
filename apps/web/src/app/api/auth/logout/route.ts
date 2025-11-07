import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes as _ErrorCodes } from "@/lib/api-response-types";
import { clearSessionCookie } from '@/lib/session';

/**
 * Logout endpoint - revokes user session
 * POST /api/auth/logout
 */
export async function POST(request: NextRequest) {
  try {
    // Always clear the session cookie for logout
    const baseResponse = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

    // Best-effort: revoke refresh tokens when a valid Bearer token is provided
    const authHeader = request.headers.get('authorization');
    const idToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

    if (idToken) {
      const auth = getAuth();
      try {
        const decodedToken = await auth.verifyIdToken(idToken);
        const userId = decodedToken.uid;
        try {
          await auth.revokeRefreshTokens(userId);
          logger.info('Successfully revoked refresh tokens for user', { userId, endpoint: '/api/auth/logout' });
        } catch (revokeError) {
          logger.error(
            `Error revoking refresh tokens at /api/auth/logout`,
            revokeError instanceof Error ? revokeError : new Error(String(revokeError))
          );
        }
      } catch (error) {
        logger.info('Token invalid or missing during logout; proceeding with cookie clear', {
          data: { error: error instanceof Error ? error.message : String(error) },
          endpoint: '/api/auth/logout'
        });
      }
    }

    return clearSessionCookie(baseResponse);

  } catch (error) {
    logger.error(
      `Error during logout at /api/auth/logout`,
      error instanceof Error ? error : new Error(String(error))
    );

    // Return success and clear cookie even on error
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });
    return clearSessionCookie(response);
  }
}
