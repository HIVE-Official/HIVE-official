import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes as _ErrorCodes } from "@/lib/api-response-types";

/**
 * Session validation endpoint - verifies token and returns user session info
 * GET /api/auth/session
 */
export async function GET(request: NextRequest) {
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

    // Verify the ID token
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(idToken);
    } catch (error) {
      logger.error(
      `Invalid ID token at /api/auth/session`,
      error instanceof Error ? error : new Error(String(error))
    );
      return NextResponse.json(
        { 
          valid: false,
          error: "Invalid or expired token",
          code: "TOKEN_INVALID"
        },
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    const userId = decodedToken.uid;
    const userEmail = decodedToken.email;

    // Get user profile from Firestore
    let userProfile = null;
    try {
      const userDoc = await dbAdmin.collection("users").doc(userId).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        userProfile = {
          id: userId,
          email: userEmail,
          fullName: userData?.fullName || "",
          handle: userData?.handle || "",
          major: userData?.major || "",
          avatarUrl: userData?.avatarUrl || "",
          schoolId: userData?.schoolId || "",
          emailVerified: userData?.emailVerified || false,
          builderOptIn: userData?.builderOptIn || false,
          onboardingCompleted: !!userData?.onboardingCompletedAt,
          createdAt: userData?.createdAt,
          updatedAt: userData?.updatedAt,
        };
      }
    } catch (firestoreError) {
      logger.error(
      `Error fetching user profile at /api/auth/session`,
      firestoreError instanceof Error ? firestoreError : new Error(String(firestoreError))
    );
      // Continue without profile data
    }

    // Return session information
    return NextResponse.json({
      valid: true,
      user: userProfile || {
        id: userId,
        email: userEmail,
        emailVerified: decodedToken.email_verified || false,
        onboardingCompleted: false,
      },
      session: {
        issuedAt: new Date(decodedToken.iat * 1000).toISOString(),
        expiresAt: new Date(decodedToken.exp * 1000).toISOString(),
        authTime: new Date(decodedToken.auth_time * 1000).toISOString(),
        issuer: decodedToken.iss,
        audience: decodedToken.aud,
      },
      token: {
        algorithm: decodedToken.alg || "RS256",
        type: "JWT",
        firebase: true,
      } });

  } catch (error) {
    logger.error(
      `Error validating session at /api/auth/session`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(
      { 
        valid: false,
        error: "Failed to validate session",
        code: "VALIDATION_ERROR"
      },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

/**
 * Refresh session endpoint - validates current token and returns new session info
 * POST /api/auth/session
 */
export async function POST(request: NextRequest) {
  try {
    // For Firebase, token refresh is handled client-side
    // This endpoint just validates the current token
    return GET(request);
  } catch (error) {
    logger.error(
      `Error refreshing session at /api/auth/session`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(
      { 
        valid: false,
        error: "Failed to refresh session",
        code: "REFRESH_ERROR"
      },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}