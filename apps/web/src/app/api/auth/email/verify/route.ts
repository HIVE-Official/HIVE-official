import { NextRequest, NextResponse } from "next/server";
import { db, auth as firebaseAdmin } from "@/lib/firebase-admin";
import { sendSignInLinkToEmail, signInWithEmailLink as _signInWithEmailLink } from "firebase/auth";
import { auth, logger, findAvailableHandle } from "@hive/core";
import { authRateLimit } from "@/lib/rate-limit";
import { validateAndSanitize, apiSchemas, generateRateLimitKey, securityErrors } from "@/lib/security/input-validation";

async function checkHandleAvailability(handle: string): Promise<boolean> {
  const handleDoc = await db.collection("handles").doc(handle).get();
  return !handleDoc.exists;
}

export async function POST(request: NextRequest) {
  try {
    // 🔒 SECURITY: Rate limiting
    const rateLimitKey = generateRateLimitKey(request, 'auth-verify')
    const rateLimitResult = await authRateLimit.limit(rateLimitKey)
    
    if (!rateLimitResult.success) {
      logger.warn(`Auth rate limit exceeded for key: ${rateLimitKey}`)
      return NextResponse.json(securityErrors.rateLimitExceeded, { status: 429 })
    }

    // 🔒 SECURITY: Input validation and sanitization
    const body = await request.json()
    const validatedData = validateAndSanitize(apiSchemas.emailVerification, body)
    const { email, schoolId } = validatedData
    const dev = body.dev // Extract dev parameter for development mode

    logger.info(`Auth verification attempt for email: ${email.substring(0, 3)}***`)
    
    // 🔒 SECURITY: Additional email validation for security
    if (email.includes('..') || email.startsWith('.') || email.endsWith('.')) {
      return NextResponse.json(securityErrors.invalidInput, { status: 400 })
    }

    // Development mode bypass
    if (dev === "true" || process.env.NODE_ENV === "development") {
      logger.info(`Development mode verification for: ${email}`);

      try {
        let user;
        try {
          user = await firebaseAdmin.getUserByEmail(email);
        } catch (error: unknown) {
          if (error && typeof error === 'object' && 'code' in error && error.code === "auth/user-not-found") {
            // Create new user in development
            const displayName = email.split("@")[0];
            const handle = await findAvailableHandle(
              displayName,
              checkHandleAvailability
            );

            user = await firebaseAdmin.createUser({
              email,
              emailVerified: true,
              displayName,
            });

            // Reserve the handle
            await db.collection("handles").doc(handle).set({
              userId: user.uid,
              createdAt: new Date(),
            });

            // Create user document with onboarding state
            await db
              .collection("users")
              .doc(user.uid)
              .set({
                uid: user.uid,
                email,
                displayName,
                handle,
                createdAt: new Date(),
                isNewUser: true,
                verificationLevel: "verified",
                onboarding: {
                  email,
                  displayName,
                  handle,
                  isComplete: false,
                  verificationLevel: "verified",
                  isStudentLeader: false,
                  builderOptIn: false,
                  consentGiven: false,
                },
              });

            logger.info(`Created new user in development: ${user.uid}`);
          } else {
            throw error;
          }
        }

        const customToken = await firebaseAdmin.createCustomToken(user.uid);
        const userRecord = await firebaseAdmin.getUser(user.uid);

        // Check onboarding status from Firestore to determine if user is new
        const userDoc = await db.collection("users").doc(user.uid).get();
        const userData = userDoc.data();
        let isOnboardingComplete = userData?.onboarding?.isComplete || false;
        
        // In development mode, always treat test users as new users for testing
        if (dev === "true" && (email.includes("test@") || email.includes("tst@"))) {
          logger.info(`🔥 Development mode: treating ${email} as new user for testing`);
          isOnboardingComplete = false;
          
          // Reset the user's onboarding state in Firestore
          if (userDoc.exists) {
            await db.collection("users").doc(user.uid).update({
              "onboarding.isComplete": false,
              "onboarding.completedAt": null,
              updatedAt: new Date(),
            });
          }
        }

        return NextResponse.json({
          ok: true,
          idToken: customToken,
          user: {
            uid: userRecord.uid,
            email: userRecord.email,
            displayName: userRecord.displayName,
            isNewUser: !isOnboardingComplete, // User is "new" if onboarding is not complete
          },
        });
      } catch (error) {
        logger.error("Development verification error:", error);
        return NextResponse.json(
          { error: "Development verification failed", ok: false },
          { status: 500 }
        );
      }
    }

    // Production magic link verification
    try {
      const actionCodeSettings = {
        url: `${
          process.env.NEXT_PUBLIC_APP_URL
        }/auth/verify?email=${encodeURIComponent(email)}`,
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);

      return NextResponse.json({
        ok: true,
        message: "Verification email sent",
      });
    } catch (error: unknown) {
      logger.error("Magic link verification error:", error);

      if (error && typeof error === 'object' && 'code' in error && error.code === "auth/invalid-email") {
        return NextResponse.json(
          { error: "Invalid email address", ok: false },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: "Failed to send verification email", ok: false },
        { status: 500 }
      );
    }
  } catch (error) {
    logger.error("Verification endpoint error:", error);
    return NextResponse.json(
      { error: "Internal server error", ok: false },
      { status: 500 }
    );
  }
} 