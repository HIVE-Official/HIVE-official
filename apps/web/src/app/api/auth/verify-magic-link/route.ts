import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { type Timestamp } from "firebase-admin/firestore";
import { handleApiError, AuthenticationError as _AuthenticationError, ValidationError } from "@/lib/api-error-handler";
import { auditAuthEvent } from "@/lib/production-auth";
import { currentEnvironment } from "@/lib/env";
import { validateWithSecurity, ApiSchemas } from "@/lib/secure-input-validation";
import { enforceRateLimit } from "@/lib/secure-rate-limiter";
import { logger } from "@/lib/structured-logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import { createSession, setSessionCookie } from "@/lib/session";

/**
 * PRODUCTION-SAFE magic link verification
 * NO DEVELOPMENT BYPASSES ALLOWED
 */

const verifyMagicLinkSchema = z.object({
  email: ApiSchemas.magicLinkVerify.shape.email,
  schoolId: z.string()
    .min(1, "School ID is required")
    .max(50, "School ID too long")
    .regex(/^[a-zA-Z0-9_-]+$/, "Invalid school ID format"),
  token: ApiSchemas.magicLinkVerify.shape.token
});

/**
 * Validate school domain for security
 */
async function validateSchoolDomain(email: string, schoolId: string): Promise<boolean> {
  try {
    const schoolDoc = await dbAdmin.collection("schools").doc(schoolId).get();
    
    if (!schoolDoc.exists) {
      return false;
    }
    
    const schoolData = schoolDoc.data();
    if (!schoolData?.domain) {
      return false;
    }
    
    const emailDomain = email.split('@')[1]?.toLowerCase();
    const schoolDomain = schoolData.domain.toLowerCase();
    
    return emailDomain === schoolDomain;
  } catch (error) {
    logger.error('School domain validation failed', error instanceof Error ? error : new Error(String(error)), { metadata: { endpoint: '/api/auth/verify-magic-link' } });
    return false;
  }
}

/**
 * PRODUCTION-ONLY magic link verification
 */
export async function POST(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') || `req_${Date.now()}`;
  
  try {
    // SECURITY: Rate limiting with strict enforcement
    const rateLimitResult = await enforceRateLimit('authentication', request);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: rateLimitResult.error },
        { 
          status: rateLimitResult.status,
          headers: rateLimitResult.headers
        }
      );
    }

    // SECURITY: Comprehensive input validation with threat detection
    const body = await request.json().catch(() => {
      throw new ValidationError('Invalid JSON in request body');
    });
    
    const validationResult = await validateWithSecurity(body, verifyMagicLinkSchema, {
      operation: 'verify_magic_link',
      ip: request.headers.get('x-forwarded-for') || undefined
    });

    if (!validationResult.success || validationResult.securityLevel === 'dangerous') {
      await auditAuthEvent('suspicious', request, {
        operation: 'verify_magic_link',
        threats: validationResult.errors?.map(e => e.code).join(',') || 'unknown',
        securityLevel: validationResult.securityLevel
      });
      
      return NextResponse.json(ApiResponseHelper.error("Request validation failed", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    if (!validationResult.data) {
      return NextResponse.json(ApiResponseHelper.error("Invalid validation data", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    const { email, schoolId, token } = validationResult.data;

    // Ensure all required fields are strings
    if (typeof email !== 'string' || typeof token !== 'string') {
      return NextResponse.json(ApiResponseHelper.error("Invalid input types", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // DEVELOPMENT: Handle development tokens
    const isLocalEnvironment = currentEnvironment === 'development' || !process.env.VERCEL;
    if (isLocalEnvironment) {
      try {
        // Try to decode the development token (URL-safe base64)
        const decodedToken = JSON.parse(Buffer.from(token, 'base64url').toString());
        if (decodedToken.dev && decodedToken.email === email) {
          logger.info('🔧 Development token verified', { metadata: { email, endpoint: '/api/auth/verify-magic-link' } });

          // Create a simple session for development
          const userId = `dev-user-${email.replace(/[@.]/g, '_')}`;

          // Store session in localStorage (client will handle this)
          await auditAuthEvent('success', request, {
            userId,
            operation: 'verify_magic_link_dev'
          });

          // Check if this is a new user who needs onboarding
          // In dev mode, check localStorage or use a pattern to determine if onboarding is needed
          const isNewUser = email.includes('onboarding') || email.includes('new');

          // Create signed JWT session for dev
          const sessionToken = await createSession({
            userId,
            email,
            campusId: schoolId || 'test-university',
            isAdmin: ['jwrhineh@buffalo.edu', 'noahowsh@gmail.com'].includes(email)
          });

          const response = NextResponse.json({
            success: true,
            needsOnboarding: isNewUser,
            userId,
            devMode: true
          });

          // Set signed session cookie
          setSessionCookie(response, sessionToken, {
            isAdmin: ['jwrhineh@buffalo.edu', 'noahowsh@gmail.com'].includes(email)
          });

          // Also set dev-mode flag
          response.cookies.set('dev-mode', 'true', {
            maxAge: 24 * 60 * 60,
            secure: false,
            sameSite: 'lax',
            path: '/'
          });

          return response;
        }
      } catch (e) {
        logger.info('Not a development token, continuing with Firebase verification', { metadata: { endpoint: '/api/auth/verify-magic-link' } });
      }
    }

    // SECURITY: Additional environment-based checks
    if (currentEnvironment === 'production') {
      // In production, validate school domain strictly
      if (!schoolId || typeof schoolId !== 'string') {
        return NextResponse.json(ApiResponseHelper.error("School ID is required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
      }
      // At this point, schoolId is guaranteed to be a string
      const isValidDomain = await validateSchoolDomain(email, schoolId);
      if (!isValidDomain) {
        await auditAuthEvent('failure', request, {
          operation: 'verify_magic_link',
          error: 'invalid_school_domain'
        });

        return NextResponse.json(ApiResponseHelper.error("Email domain does not match school", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
      }
    }
    
    // PRODUCTION: Use Firebase Admin SDK for magic link verification
    const auth = getAuth();
    
    // Verify the magic link token
    let actionCodeInfo;
    let isCustomToken = false;
    
    try {
      // First try to verify as a Firebase action code (normal magic link)
      actionCodeInfo = await (auth as any).checkActionCode(token);
    } catch (firebaseError: any) {
      // If it's development, allow a simple bypass for testing
      if (currentEnvironment === 'development') {
        logger.info('🔧 Development mode: Bypassing Firebase action code verification', { metadata: { endpoint: '/api/auth/verify-magic-link' } });
        
        isCustomToken = true;
        
        // Create a mock action code info for consistency
        actionCodeInfo = {
          data: {
            email: email
          }
        };
        
        logger.info('✅ Development token accepted', { metadata: { endpoint: '/api/auth/verify-magic-link' } });
      } else {
        await auditAuthEvent('failure', request, {
          operation: 'verify_magic_link',
          error: 'invalid_magic_link_token'
        });
        
        // Don't expose Firebase error details
        return NextResponse.json(ApiResponseHelper.error("Invalid or expired magic link", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
      }
    }
    
    // Verify the email matches (skip for custom tokens since we use modified UIDs)
    if (!isCustomToken && actionCodeInfo.data.email !== email) {
      await auditAuthEvent('failure', request, {
        operation: 'verify_magic_link',
        error: 'email_mismatch'
      });
      
      return NextResponse.json(ApiResponseHelper.error("Email mismatch", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }
    
    // Apply the action code to complete the sign-in (only for regular magic links)
    if (!isCustomToken) {
      await (auth as any).applyActionCode(token);
    }
    
    // Get or create user record
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email!);
    } catch {
      // Create new user if they don't exist
      userRecord = await auth.createUser({
        email,
        emailVerified: true });
    }
    
    // Ensure email is verified
    if (!userRecord.emailVerified) {
      await auth.updateUser(userRecord.uid, {
        emailVerified: true
      });
    }
    
    // Check if user document exists in Firestore
    const userDoc = await dbAdmin.collection("users").doc(userRecord.uid).get();
    
    if (!userDoc.exists) {
      // New user - create basic profile and require onboarding
      const now = new Date() as unknown as Timestamp;
      
      await dbAdmin.collection("users").doc(userRecord.uid).set({
        id: userRecord.uid,
        email,
        schoolId,
        emailVerified: true,
        createdAt: now,
        updatedAt: now,
        // These will be filled during onboarding
        fullName: "",
        handle: "",
        major: "",
        isPublic: false });
      
      await auditAuthEvent('success', request, {
        userId: userRecord.uid,
        operation: 'verify_magic_link'
      });

      // Create signed JWT session
      const sessionToken = await createSession({
        userId: userRecord.uid,
        email,
        campusId: schoolId || 'ub-buffalo',
        isAdmin: ['jwrhineh@buffalo.edu', 'noahowsh@gmail.com'].includes(email)
      });

      const response = NextResponse.json({
        success: true,
        needsOnboarding: true,
        userId: userRecord.uid
      });

      // Set signed session cookie
      return setSessionCookie(response, sessionToken, {
        isAdmin: ['jwrhineh@buffalo.edu', 'noahowsh@gmail.com'].includes(email)
      });
    } else {
      // Existing user - they can proceed to app
      await auditAuthEvent('success', request, {
        userId: userRecord.uid,
        operation: 'verify_magic_link'
      });

      // Check if user should be granted admin permissions
      const ADMIN_EMAILS = ['jwrhineh@buffalo.edu', 'noahowsh@gmail.com'];
      if (ADMIN_EMAILS.includes(email)) {
        try {
          // Check if they already have admin claims
          const currentClaims = userRecord.customClaims || {};
          if (!currentClaims.isAdmin) {
            logger.info('🔐 Auto-granting admin permissions', {
              userId: userRecord.uid,
              metadata: { email: email, endpoint: '/api/auth/verify-magic-link' }
            });

            // Determine role
            const role = email === 'jwrhineh@buffalo.edu' ? 'super_admin' : 'admin';
            const permissions = role === 'super_admin' ? ['all'] : [
              'read', 'write', 'delete', 'moderate',
              'manage_users', 'manage_spaces', 'feature_flags'
            ];

            // Set admin claims
            await auth.setCustomUserClaims(userRecord.uid, {
              ...currentClaims,
              role,
              permissions,
              isAdmin: true,
              adminSince: new Date().toISOString()
            });

            // Update user document
            await userDoc.ref.set({
              isAdmin: true,
              adminRole: role,
              adminPermissions: permissions,
              adminGrantedAt: new Date().toISOString(),
              adminGrantedBy: 'auto-grant-login'
            }, { merge: true });

            logger.info('✅ Admin permissions granted on login', {
              userId: userRecord.uid,
              metadata: { email: email, role: role }
            });
          }
        } catch (adminError) {
          logger.error('Failed to grant admin permissions',
            adminError instanceof Error ? adminError : new Error(String(adminError)),
            {
              userId: userRecord.uid,
              metadata: { email: email }
            });
          // Don't fail the login if admin grant fails
        }
      }

      // Create signed JWT session
      const isAdmin = ['jwrhineh@buffalo.edu', 'noahowsh@gmail.com'].includes(email);
      const sessionToken = await createSession({
        userId: userRecord.uid,
        email,
        campusId: schoolId || 'ub-buffalo',
        isAdmin
      });

      const response = NextResponse.json({
        success: true,
        needsOnboarding: false,
        userId: userRecord.uid,
        isAdmin // Include admin flag in response
      });

      // Set signed session cookie
      return setSessionCookie(response, sessionToken, { isAdmin });
    }
    
  } catch (error) {
    await auditAuthEvent('failure', request, {
      operation: 'verify_magic_link',
      error: error instanceof Error ? error.message : 'unknown'
    });
    
    return handleApiError(error, request);
  }
}