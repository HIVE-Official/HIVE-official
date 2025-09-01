import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuth } from "firebase-admin/auth";
import { dbAdmin } from "@/lib/firebase-admin";
import { redisService } from "@/lib/redis-client";
import { authRateLimiter, RATE_LIMITS } from "@/lib/auth-rate-limiter";

/**
 * HIVE Magic Link Verifier - FIXED IMPLEMENTATION
 * 
 * CRITICAL FIX: This endpoint creates Firebase Custom Tokens for client-side authentication
 * It does NOT verify ID tokens - that's the client's job after signInWithCustomToken
 */

const verifyMagicLinkSchema = z.object({
  token: z.string().min(1, "Magic link token required"),
  email: z.string().email("Valid email required"),
  schoolId: z.string().min(1, "School ID required")
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - prevent verification brute force
    const clientKey = authRateLimiter.getClientKey(request);
    const rateLimit = authRateLimiter.checkLimit(
      `verify-magic-link:${clientKey}`,
      RATE_LIMITS.MAGIC_LINK_VERIFY.maxRequests,
      RATE_LIMITS.MAGIC_LINK_VERIFY.windowMs
    );

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: "Too many verification attempts. Please try again later.",
          retryAfter: rateLimit.retryAfter 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': rateLimit.retryAfter?.toString() || '300',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetTime?.toString() || ''
          }
        }
      );
    }

    const body = await request.json();
    const { token, email, schoolId } = verifyMagicLinkSchema.parse(body);

    console.log('🔗 Magic link verification started', { email, schoolId });

    // Validate magic link token
    const magicLinkData = await validateMagicLinkToken(token, email);
    if (!magicLinkData) {
      return NextResponse.json(
        { error: "Invalid or expired magic link" },
        { status: 401 }
      );
    }

    // Get Firebase Admin Auth
    const auth = getAuth();

    // Find or create Firebase user
    let firebaseUser;
    try {
      firebaseUser = await auth.getUserByEmail(email);
      console.log('📧 Found existing Firebase user', { uid: firebaseUser.uid });
    } catch (error) {
      // User doesn't exist, create them
      firebaseUser = await auth.createUser({
        email: email,
        emailVerified: true,
      });
      console.log('🆕 Created new Firebase user', { uid: firebaseUser.uid });
    }

    // Check if user has HIVE profile
    const userDoc = await dbAdmin.collection("users").doc(firebaseUser.uid).get();
    const needsOnboarding = !userDoc.exists || !userDoc.data()?.onboardingCompleted;

    if (!userDoc.exists) {
      // Create basic HIVE user document
      await dbAdmin.collection("users").doc(firebaseUser.uid).set({
        id: firebaseUser.uid,
        email: email,
        schoolId: schoolId,
        emailVerified: true,
        onboardingCompleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      console.log('👤 Created HIVE user profile', { uid: firebaseUser.uid });
    }

    // Create Firebase Custom Token for client authentication
    const customToken = await auth.createCustomToken(firebaseUser.uid, {
      email: email,
      schoolId: schoolId,
      magicLinkAuth: true,
      verified: Date.now(),
    });

    console.log('✅ Magic link verification successful', { 
      uid: firebaseUser.uid, 
      needsOnboarding 
    });

    return NextResponse.json({
      success: true,
      token: customToken, // This is a Firebase Custom Token
      needsOnboarding: needsOnboarding,
      userId: firebaseUser.uid,
    });

  } catch (error) {
    console.error('🚨 Magic link verification failed', { error });
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request format", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Magic link verification failed" },
      { status: 500 }
    );
  }
}


/**
 * SECURE TOKEN VALIDATION - PRODUCTION IMPLEMENTATION
 * Validates magic link tokens using Redis storage with proper security checks
 */
async function validateMagicLinkToken(token: string, email: string): Promise<any> {
  try {
    // Validate token format
    if (!token || token.length !== 64) {
      console.log('❌ Invalid token format', { tokenLength: token?.length });
      return null;
    }

    // Get token data from Redis
    const tokenKey = `magic_link:${token}`;
    const tokenDataStr = await redisService.get(tokenKey);
    
    if (!tokenDataStr) {
      console.log('❌ Magic link token not found or expired', { tokenKey: `${token.substring(0, 8)}...` });
      return null;
    }

    // Parse token data
    let tokenData;
    try {
      tokenData = JSON.parse(tokenDataStr);
    } catch (error) {
      console.error('❌ Invalid token data format', { error });
      return null;
    }

    // Validate email matches
    if (tokenData.email !== email) {
      console.log('❌ Token email mismatch', { 
        tokenEmail: tokenData.email?.replace(/(.{2}).*@/, '$1***@'),
        requestEmail: email?.replace(/(.{2}).*@/, '$1***@')
      });
      return null;
    }

    // Check if token was already used
    if (tokenData.used) {
      console.log('❌ Magic link token already used', { email: email.replace(/(.{2}).*@/, '$1***@') });
      return null;
    }

    // Check token age (additional safety check beyond Redis TTL)
    const tokenAge = Date.now() - tokenData.createdAt;
    if (tokenAge > 900000) { // 15 minutes
      console.log('❌ Magic link token too old', { 
        ageMinutes: Math.round(tokenAge / 60000),
        email: email.replace(/(.{2}).*@/, '$1***@')
      });
      return null;
    }

    // Mark token as used to prevent reuse
    tokenData.used = true;
    tokenData.usedAt = Date.now();
    await redisService.set(tokenKey, JSON.stringify(tokenData), 300); // Keep for 5 more minutes for logging

    console.log('✅ Magic link token validated successfully', { 
      email: email.replace(/(.{2}).*@/, '$1***@'),
      schoolId: tokenData.schoolId,
      tokenAge: Math.round(tokenAge / 1000) + 's'
    });

    return {
      email: tokenData.email,
      schoolId: tokenData.schoolId,
      valid: true,
      verifiedAt: Date.now(),
      createdAt: tokenData.createdAt
    };

  } catch (error) {
    console.error('❌ Magic link token validation error', { error });
    return null;
  }
}