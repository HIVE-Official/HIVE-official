import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { dbAdmin } from "@/lib/firebase-admin";

/**
 * Session validation endpoint - verifies token and returns user session info
 * GET /api/auth/session
 */
export async function GET(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { 
          valid: false,
          error: "Missing or invalid authorization header" 
        },
        { status: 401 }
      );
    }

    const idToken = authHeader.split("Bearer ")[1];
    
    // Handle development mode tokens
    if (idToken.startsWith("dev_token_")) {
      const userId = idToken.replace("dev_token_", "");
      console.log('Development mode session validation for user:', userId);
      
      return NextResponse.json({
        valid: true,
        user: {
          id: userId,
          email: `dev_user_${userId}@example.com`,
          emailVerified: true,
          developmentMode: true,
        },
        session: {
          issuedAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
          developmentMode: true,
        },
      });
    }

    const auth = getAuth();

    // Verify the ID token
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(idToken);
    } catch (error) {
      console.error("Invalid ID token:", error);
      return NextResponse.json(
        { 
          valid: false,
          error: "Invalid or expired token",
          code: "TOKEN_INVALID"
        },
        { status: 401 }
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
      console.error("Error fetching user profile:", firestoreError);
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
      },
    });

  } catch (error) {
    console.error("Error validating session:", error);
    return NextResponse.json(
      { 
        valid: false,
        error: "Failed to validate session",
        code: "VALIDATION_ERROR"
      },
      { status: 500 }
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
    console.error("Error refreshing session:", error);
    return NextResponse.json(
      { 
        valid: false,
        error: "Failed to refresh session",
        code: "REFRESH_ERROR"
      },
      { status: 500 }
    );
  }
}