import { NextResponse } from 'next/server';
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { sendFirebaseMagicLinkEmail, isFirebaseEmailAuthEnabled } from "@/lib/firebase-auth-email";
import { auditAuthEvent } from "@/lib/production-auth";
import { currentEnvironment } from "@/lib/env";
import { validateWithSecurity, ApiSchemas } from "@/lib/secure-input-validation";
import { enforceRateLimit } from "@/lib/secure-rate-limiter";
import { logger } from "@/lib/logger";
import { withValidation } from "@/lib/middleware";
import { ApiResponseHelper, HttpStatus } from '@/lib/api-response-types';
import { getDefaultActionCodeSettings } from "@hive/core";

/**
 * Resend magic link with enhanced rate limiting and recovery tracking
 */

const resendMagicLinkSchema = z.object({
  email: ApiSchemas.magicLinkRequest.shape.email,
  schoolId: z.string()
    .min(1, "School ID is required")
    .max(50, "School ID too long")
    .regex(/^[a-zA-Z0-9_-]+$/, "Invalid school ID format"),
  attemptNumber: z.number().int().min(1).max(5).optional()
});

// Track resend attempts in memory (should use Redis in production)
const resendAttempts = new Map<string, { count: number; lastAttempt: number }>();

/**
 * Clean up old attempts from memory
 */
function cleanupOldAttempts() {
  const now = Date.now();
  const ONE_HOUR = 60 * 60 * 1000;

  for (const [email, data] of resendAttempts.entries()) {
    if (now - data.lastAttempt > ONE_HOUR) {
      resendAttempts.delete(email);
    }
  }
}

export const POST = withValidation(
  resendMagicLinkSchema,
  async (request, context, body: z.infer<typeof resendMagicLinkSchema>, respond) => {
    const { email, schoolId, attemptNumber = 1 } = body;
    const requestId = request.headers.get('x-request-id') || `resend_${Date.now()}`;

    try {
      // Clean up old attempts periodically
      cleanupOldAttempts();

      // Enhanced rate limiting for resend attempts
      const emailKey = email.toLowerCase();
      const attempts = resendAttempts.get(emailKey) || { count: 0, lastAttempt: 0 };
      const now = Date.now();

      // Enforce progressive delays: 0s, 30s, 60s, 120s, 300s
      const delays = [0, 30000, 60000, 120000, 300000];
      const requiredDelay = delays[Math.min(attempts.count, delays.length - 1)];
      const timeSinceLastAttempt = now - attempts.lastAttempt;

      if (timeSinceLastAttempt < requiredDelay) {
        const remainingTime = Math.ceil((requiredDelay - timeSinceLastAttempt) / 1000);

        await auditAuthEvent('failure', request, {
          operation: 'resend_magic_link',
          error: 'rate_limited'
        });

        // Return rate limit response with custom headers
        const response = NextResponse.json(
          {
            success: false,
            error: `Please wait ${remainingTime} seconds before requesting another link`,
            code: "RATE_LIMITED",
            meta: {
              timestamp: new Date().toISOString()
            }
          },
          {
            status: 429,
            headers: {
              'X-RateLimit-Reset': String(attempts.lastAttempt + requiredDelay),
              'X-RateLimit-Remaining': String(Math.max(0, 5 - attempts.count)),
              'Retry-After': String(remainingTime)
            }
          }
        );
        return response;
      }

      // Check maximum attempts
      if (attempts.count >= 5) {
        await auditAuthEvent('forbidden', request, {
          operation: 'resend_magic_link',
          error: 'max_attempts_exceeded'
        });

        return respond.error(
          "Maximum resend attempts exceeded. Please try again in 1 hour or contact support.",
          "MAX_ATTEMPTS",
          { status: 429 }
        );
      }

      // Update attempt tracking
      resendAttempts.set(emailKey, {
        count: attempts.count + 1,
        lastAttempt: now
      });

      // SECURITY: Standard rate limiting check
      const rateLimitResult = await enforceRateLimit('magicLink', request);
      if (!rateLimitResult.allowed) {
        return respond.error(rateLimitResult.error || "Rate limit exceeded", "RATE_LIMITED", {
          status: rateLimitResult.status
        });
      }

      logger.info('🔄 Resending magic link', {
        email: email.replace(/(.{3}).*@/, '$1***@'),
        attemptNumber: attempts.count + 1,
        schoolId,
        endpoint: '/api/auth/resend-magic-link'
      });

      // Validate school exists
      const schoolDoc = await dbAdmin.collection("schools").doc(schoolId).get();
      if (!schoolDoc.exists) {
        return respond.error("School not found", "RESOURCE_NOT_FOUND", { status: 404 });
      }

      const schoolData = schoolDoc.data();
      if (!schoolData) {
        return respond.error("Invalid school data", "INTERNAL_ERROR", { status: 500 });
      }

      // Check if user exists and get their status
      let userExists = false;
      let userStatus = null;

      try {
        const auth = getAuth();
        const userRecord = await auth.getUserByEmail(email);
        userExists = true;

        // Check Firestore for user status
        const userDoc = await dbAdmin.collection("users").doc(userRecord.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          userStatus = {
            onboardingCompleted: userData?.onboardingCompleted || false,
            accountStatus: userData?.accountStatus || 'active',
            lastLoginAt: userData?.lastLoginAt
          };
        }
      } catch (error: any) {
        // User doesn't exist yet, which is fine
        if (error.code !== 'auth/user-not-found') {
          logger.error('Error checking user status', {
            error,
            endpoint: '/api/auth/resend-magic-link'
          });
        }
      }

      // Development mode handling
      const isLocalEnvironment = currentEnvironment === 'development' || !process.env.VERCEL;

      if (isLocalEnvironment) {
        logger.info('🔧 Development mode: Generating recovery magic link', {
          endpoint: '/api/auth/resend-magic-link'
        });

        const devToken = Buffer.from(JSON.stringify({
          email,
          schoolId,
          timestamp: Date.now(),
          isResend: true,
          attemptNumber: attempts.count + 1,
          dev: true
        })).toString('base64url');

        const magicLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/auth/verify?token=${devToken}&mode=dev&email=${encodeURIComponent(email)}&schoolId=${schoolId}&resend=true`;

        return NextResponse.json({
          success: true,
          message: "Magic link resent (development mode)",
          devMode: true,
          magicLink,
          email,
          attemptNumber: attempts.count + 1,
          userStatus,
          nextRetryDelay: delays[Math.min(attempts.count + 1, delays.length - 1)] / 1000
        });
      }

      // Production: Generate and send new magic link
      const auth = getAuth();
      const actionCodeSettings = getDefaultActionCodeSettings(schoolId);

      try {
        const magicLink = await auth.generateSignInWithEmailLink(email, actionCodeSettings);

        // Check if Firebase Email is configured
        const firebaseEmailEnabled = await isFirebaseEmailAuthEnabled();

        if (firebaseEmailEnabled) {
          await sendFirebaseMagicLinkEmail({
            email,
            schoolName: schoolData.name,
            redirectUrl: process.env.NEXT_PUBLIC_APP_URL
          });
        } else {
          logger.warn('Firebase Email Auth not configured, link generated but not sent', {
            endpoint: '/api/auth/resend-magic-link'
          });
        }

        logger.info('✅ Magic link resent successfully', {
          email: email.replace(/(.{3}).*@/, '$1***@'),
          attemptNumber: attempts.count + 1,
          schoolId,
          endpoint: '/api/auth/resend-magic-link'
        });

        await auditAuthEvent('success', request, {
          operation: 'resend_magic_link'
        });

        return respond.success({
          message: "Magic link has been resent to your email",
          attemptNumber: attempts.count + 1,
          userStatus,
          nextRetryDelay: delays[Math.min(attempts.count + 1, delays.length - 1)] / 1000
        });

      } catch (firebaseError: any) {
        logger.error(
      `Failed to resend magic link at /api/auth/resend-magic-link`,
      firebaseError
    );

        await auditAuthEvent('failure', request, {
          operation: 'resend_magic_link',
          error: firebaseError.message
        });

        return respond.error(
          "Unable to resend magic link. Please try again later.",
          "INTERNAL_ERROR",
          { status: 500 }
        );
      }

    } catch (error) {
      await auditAuthEvent('failure', request, {
        operation: 'resend_magic_link',
        error: error instanceof Error ? error.message : 'unknown'
      });

      throw error;
    }
  }
);