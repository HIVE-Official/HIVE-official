import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

/**
 * Logout endpoint - revokes user session
 * POST /api/auth/logout
 */
export async function POST(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Missing or invalid authorization header", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const idToken = authHeader.substring(7);
    
    // SECURITY: Development token bypass removed for production safety
    // All tokens must be validated through Firebase Auth

    const auth = getAuth();

    // Verify the ID token first to get the user ID
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(idToken);
    } catch (error) {
      // If token is already invalid, consider logout successful
      logger.info('Token already invalid during logout', { data: error, endpoint: '/api/auth/logout' });
      return NextResponse.json({
        success: true,
        message: "Logged out successfully" });
    }

    const userId = decodedToken.uid;

    // Revoke all refresh tokens for this user
    // This will force all sessions to re-authenticate
    try {
      await auth.revokeRefreshTokens(userId);
      logger.info('Successfully revoked refresh tokens for user', { userId, endpoint: '/api/auth/logout' });
    } catch (revokeError) {
      logger.error('Error revoking refresh tokens', { error: revokeError, endpoint: '/api/auth/logout' });
      // Don't fail the logout if revocation fails
    }

    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
      revokedAt: new Date().toISOString() });

  } catch (error) {
    logger.error('Error during logout', { error: error, endpoint: '/api/auth/logout' });

    // Even if logout fails server-side, we should return success
    // since the client can clear their local token
    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
      note: "Client should clear local authentication state" });
  }
}