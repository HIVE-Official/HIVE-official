import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuth } from "firebase-admin/auth";
import { dbAdmin } from "@/lib/firebase-admin";
// import { logger } from "@/lib/logger";

/**
 * HIVE Magic Link Verifier - Clean Firebase Implementation
 * 
 * Verifies Firebase Custom Tokens and creates/updates user accounts
 * Returns Firebase ID token for client authentication
 */

const verifyMagicLinkSchema = z.object({
  token: z.string().min(1, "Token is required"),
  email: z.string().email("Invalid email format"),
  schoolId: z.string().min(1, "School ID is required")
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request
    const body = await request.json();
    const { token, email, schoolId } = verifyMagicLinkSchema.parse(body);

    // Handle development tokens
    if (process.env.NODE_ENV === 'development' && token.startsWith('dev_magic_')) {
      console.log('🔧 Development magic link verification', { email });
      
      // Create development user ID based on email
      const userUid = `dev_${email.replace('@', '_').replace(/[^a-zA-Z0-9]/g, '_')}`;
      
      // Check if user has completed onboarding (mock check)
      const userDoc = await dbAdmin.collection("users").doc(userUid).get();
      const needsOnboarding = !userDoc.exists || !userDoc.data()?.onboardingCompleted;

      if (needsOnboarding && !userDoc.exists) {
        // Create basic user document for new users
        await dbAdmin.collection("users").doc(userUid).set({
          id: userUid,
          email,
          schoolId,
          emailVerified: true,
          onboardingCompleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        console.log('🔧 Development: Created user document for', email);
      }

      // Create a simple JWT-like development token
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({
        iss: 'https://securetoken.google.com/dev-project',
        aud: 'dev-project',
        user_id: userUid,
        sub: userUid,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
        email: email,
        email_verified: true,
      }));
      const signature = btoa('dev-signature');
      const clientToken = `${header}.${payload}.${signature}`;

      return NextResponse.json({
        success: true,
        needsOnboarding,
        userId: userUid,
        token: clientToken,
        dev: true
      });
    }

    // Production flow requires Firebase Admin
    const auth = getAuth();

    // Production: Verify Firebase Custom Token
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(token);
    } catch (error) {
      console.error('Invalid magic link token', { error });
      return NextResponse.json(
        { error: "Invalid or expired magic link" },
        { status: 400 }
      );
    }

    // Validate token was created for magic link authentication
    if (!decodedToken.magicLinkAuth || decodedToken.email !== email) {
      return NextResponse.json(
        { error: "Invalid magic link token" },
        { status: 400 }
      );
    }

    // Get or create Firebase user
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
    } catch {
      // Create new Firebase user
      userRecord = await auth.createUser({
        email,
        emailVerified: true
      });
    }

    // Ensure email is verified
    if (!userRecord.emailVerified) {
      await auth.updateUser(userRecord.uid, {
        emailVerified: true
      });
    }

    // Check if user exists in Firestore
    const userDoc = await dbAdmin.collection("users").doc(userRecord.uid).get();
    
    if (!userDoc.exists) {
      // New user - create basic profile
      await dbAdmin.collection("users").doc(userRecord.uid).set({
        id: userRecord.uid,
        email,
        schoolId,
        emailVerified: true,
        onboardingCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        fullName: "",
        handle: "",
        major: "",
        isPublic: false
      });

      console.log('New user created', { userId: userRecord.uid, email: email.replace(/(.{2}).*@/, '$1***@') });

      // Create Firebase ID token for client
      const clientToken = await auth.createCustomToken(userRecord.uid);

      return NextResponse.json({
        success: true,
        needsOnboarding: true,
        userId: userRecord.uid,
        token: clientToken
      });
    } else {
      // Existing user
      const userData = userDoc.data()!;
      
      console.log('Existing user login', { userId: userRecord.uid, email: email.replace(/(.{2}).*@/, '$1***@') });

      // Create Firebase ID token for client
      const clientToken = await auth.createCustomToken(userRecord.uid);

      return NextResponse.json({
        success: true,
        needsOnboarding: !userData.onboardingCompleted,
        userId: userRecord.uid,
        token: clientToken
      });
    }

  } catch (error) {
    console.error('Magic link verification failed', { error });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to verify magic link" },
      { status: 500 }
    );
  }
}