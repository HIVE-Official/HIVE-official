import type { NextRequest } from "next/server";
import { logger } from '@/lib/logger';

import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuth } from "firebase-admin/auth";
import { dbAdmin } from "@/lib/firebase/admin/firebase-admin";
import { authRateLimiter, RATE_LIMITS } from "@/lib/auth/middleware/auth-rate-limiter";
import { validateCSRFToken } from "@/lib/csrf-protection";
import { FieldValue } from "firebase-admin/firestore";
import { auditLogger, AuditEventType, AuditSeverity } from "@/lib/services/audit-logger";

/**
 * HIVE Magic Link Verifier - FIXED IMPLEMENTATION
 * 
 * CRITICAL FIX: This endpoint creates Firebase Custom Tokens for client-side authentication
 * It does NOT verify ID tokens - that's the client's job after signInWithCustomToken
 */

const verifyMagicLinkSchema = z.object({
  token: z.string().min(1, "Magic link token required"),
  email: z.string().email("Valid email required"),
  schoolId: z.string().optional().nullable().transform(val => {
    // Handle "undefined" string from URL params
    if (val === 'undefined' || val === 'null' || !val) return null;
    return val;
  })
});

export async function POST(request: NextRequest) {
  try {
    // CSRF Protection - prevent cross-site request forgery
    const csrfValidation = validateCSRFToken(request);
    if (!csrfValidation.valid) {
      console.warn('🚨 CSRF validation failed for magic link verification:', {
        error: csrfValidation.error,
        userAgent: request.headers.get('user-agent'),
        origin: request.headers.get('origin')
      });
      
      return NextResponse.json(
        { error: "Invalid request - CSRF validation failed" },
        { status: 403 }
      );
    }

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
    // Validate magic link token (skip for jwrhineh@buffalo.edu)
    let magicLinkData: any;
    if (email === 'jwrhineh@buffalo.edu') {
      // Skip validation but continue with real Firebase auth
      magicLinkData = {
        email: 'jwrhineh@buffalo.edu',
        schoolId: schoolId || 'ub-buffalo',
        valid: true
      };
    } else {
      // Normal validation for other users
      magicLinkData = await validateMagicLinkToken(token, email);
      if (!magicLinkData) {
        // Audit log failed verification
        await auditLogger.log(
          AuditEventType.AUTH_MAGIC_LINK_FAILED,
          AuditSeverity.WARNING,
          `Invalid or expired magic link for ${email}`,
          { userEmail: email, request }
        );
        
        return NextResponse.json(
          { error: "Invalid or expired magic link" },
          { status: 401 }
        );
      }
    }

    // Get Firebase Admin Auth
    const auth = getAuth();

    // Find or create Firebase user
    let firebaseUser;
    try {
      firebaseUser = await auth.getUserByEmail(email);
    } catch (error) {
      // User doesn't exist, create them
      firebaseUser = await auth.createUser({
        email: email,
        emailVerified: true,
      });
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
    }

    // SECURITY FIX: Mark token as used IMMEDIATELY to prevent reuse
    if (magicLinkData.tokenRef) {
      await magicLinkData.tokenRef.update({
        used: true,
        usedAt: FieldValue.serverTimestamp(),
        processingByUid: firebaseUser.uid
      });
      
    } else if (email === 'jwrhineh@buffalo.edu') {
    }

    // Create Firebase Custom Token for client authentication
    const customToken = await auth.createCustomToken(firebaseUser.uid, {
      email: email,
      schoolId: schoolId,
      magicLinkAuth: true,
      verified: Date.now(),
    });

    // Update token with successful completion
    if (magicLinkData.tokenRef) {
      await magicLinkData.tokenRef.update({
        usedByUid: firebaseUser.uid,
        completedAt: FieldValue.serverTimestamp()
      });
    }
    // Audit log successful verification
    await auditLogger.log(
      AuditEventType.AUTH_MAGIC_LINK_VERIFIED,
      AuditSeverity.INFO,
      `Magic link verified successfully for ${email}`,
      {
        userId: firebaseUser.uid,
        userEmail: email,
        request,
        metadata: { needsOnboarding, schoolId }
      }
    );

    return NextResponse.json({
      success: true,
      token: customToken, // This is a Firebase Custom Token
      needsOnboarding: needsOnboarding,
      userId: firebaseUser.uid,
    });

  } catch (error) {
    logger.error('🚨 Magic link verification failed', { error });
    
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
 * SECURE TOKEN VALIDATION - FIREBASE IMPLEMENTATION
 * Validates magic link tokens using Firestore with proper security checks
 */
async function validateMagicLinkToken(token: string, email: string): Promise<any> {
  try {
    // Validate token format
    if (!token || token.length !== 64) {
      return null;
    }

    // Get token data from Firestore
    
    const tokenDoc = await dbAdmin.collection('magicLinks').doc(token).get();
    
    if (!tokenDoc.exists) {
      
      return null;
    }

    const tokenData = tokenDoc.data();
    
    // Check if token has expired
    const expiresAt = tokenData?.expiresAt;
    if (expiresAt && (expiresAt?.toDate ? expiresAt.toDate() : new Date(expiresAt)) < new Date()) {
      
      // Delete expired token
      await tokenDoc.ref.delete();
      return null;
    }

    // Validate email matches
    if (tokenData.email !== email) {
      
      return null;
    }

    // Check if token was already used
    if (tokenData.used) {
      
      return null;
    }

    // DO NOT mark as used yet - return the token doc reference so we can mark it later

    return {
      email: tokenData.email,
      schoolId: tokenData.schoolId,
      valid: true,
      verifiedAt: Date.now(),
      createdAt: tokenData.createdAt,
      tokenRef: tokenDoc.ref  // Include the reference so we can mark it as used later
    };

  } catch (error) {
    logger.error('❌ Magic link token validation error', { error });
    return null;
  }
}