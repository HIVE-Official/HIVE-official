import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { sendSignInLinkToEmail, signInWithEmailLink } from "firebase/auth";
import { auth } from "@hive/core";
import { logger } from "@hive/core";
import { findAvailableHandle } from "@hive/core";

async function checkHandleAvailability(handle: string): Promise<boolean> {
  const handleDoc = await adminDb.collection("handles").doc(handle).get();
  return !handleDoc.exists;
}

export async function POST(request: NextRequest) {
  try {
    const { email, dev } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required", ok: false },
        { status: 400 }
      );
    }

    // Development mode bypass
    if (dev === "true" || process.env.NODE_ENV === "development") {
      logger.info(`Development mode verification for: ${email}`);

      try {
        let user;
        try {
          user = await adminAuth.getUserByEmail(email);
        } catch (error: any) {
          if (error.code === "auth/user-not-found") {
            // Create new user in development
            const displayName = email.split("@")[0];
            const handle = await findAvailableHandle(
              displayName,
              checkHandleAvailability
            );

            user = await adminAuth.createUser({
              email,
              emailVerified: true,
              displayName,
            });

            // Reserve the handle
            await adminDb.collection("handles").doc(handle).set({
              userId: user.uid,
              createdAt: new Date(),
            });

            // Create user document with onboarding state
            await adminDb
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

        const customToken = await adminAuth.createCustomToken(user.uid);
        const userRecord = await adminAuth.getUser(user.uid);

        return NextResponse.json({
          ok: true,
          idToken: customToken,
          user: {
            uid: userRecord.uid,
            email: userRecord.email,
            displayName: userRecord.displayName,
            isNewUser:
              !userRecord.metadata.creationTime ||
              Date.now() -
                new Date(userRecord.metadata.creationTime).getTime() <
                60000,
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
    } catch (error: any) {
      logger.error("Magic link verification error:", error);

      if (error.code === "auth/invalid-email") {
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
