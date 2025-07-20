import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";

/**
 * Logout endpoint - revokes user session
 * POST /api/auth/logout
 */
export async function POST(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    const idToken = authHeader.split("Bearer ")[1];
    
    // Handle development mode tokens
    if (idToken.startsWith("dev_token_")) {
      console.log('Development mode logout - token invalidated locally');
      
      return NextResponse.json({
        success: true,
        message: "Logged out successfully (development mode)",
      });
    }

    const auth = getAuth();

    // Verify the ID token first to get the user ID
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(idToken);
    } catch (error) {
      // If token is already invalid, consider logout successful
      console.log("Token already invalid during logout:", error);
      return NextResponse.json({
        success: true,
        message: "Logged out successfully",
      });
    }

    const userId = decodedToken.uid;

    // Revoke all refresh tokens for this user
    // This will force all sessions to re-authenticate
    try {
      await auth.revokeRefreshTokens(userId);
      console.log(`Successfully revoked refresh tokens for user: ${userId}`);
    } catch (revokeError) {
      console.error("Error revoking refresh tokens:", revokeError);
      // Don't fail the logout if revocation fails
    }

    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
      revokedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Error during logout:", error);

    // Even if logout fails server-side, we should return success
    // since the client can clear their local token
    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
      note: "Client should clear local authentication state",
    });
  }
}