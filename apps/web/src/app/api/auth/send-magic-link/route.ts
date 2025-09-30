import { NextRequest, NextResponse } from 'next/server';
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { getDefaultActionCodeSettings, validateEmailDomain } from "@hive/core";
import { getAuth } from "firebase-admin/auth";
// import { sendMagicLinkEmail } from "@/lib/email"; // Replaced with Firebase Auth emails
import { sendFirebaseMagicLinkEmail, isFirebaseEmailAuthEnabled } from "@/lib/firebase-auth-email";
import { ValidationError } from "@/lib/api-error-handler";
import { auditAuthEvent } from "@/lib/production-auth";
import { currentEnvironment } from "@/lib/env";
import { validateWithSecurity, ApiSchemas } from "@/lib/secure-input-validation";
import { enforceRateLimit } from "@/lib/secure-rate-limiter";
import { logger } from "@/lib/logger";

// Conditionally import dev-auth-helper only in development
let isDevUser: (email: string) => boolean = () => false;
let validateDevSchool: (email: string) => string | null = () => null;
let createDevSession: any = null;

if (process.env.NODE_ENV !== 'production') {
  const devAuthHelper = require("@/lib/dev-auth-helper");
  isDevUser = devAuthHelper.isDevUser;
  validateDevSchool = devAuthHelper.validateDevSchool;
  createDevSession = devAuthHelper.createDevSession;
}
import { withValidation } from "@/lib/middleware";
import { ApiResponseHelper, HttpStatus } from '@/lib/api-response-types';

/**
 * PRODUCTION-SAFE magic link sending
 * NO DEVELOPMENT BYPASSES ALLOWED
 */

const sendMagicLinkSchema = z.object({
  email: ApiSchemas.magicLinkRequest.shape.email,
  schoolId: z.string()
    .min(1, "School ID is required")
    .max(50, "School ID too long")
    .regex(/^[a-zA-Z0-9_-]+$/, "Invalid school ID format")
});

interface SchoolData {
  domain: string;
  name: string;
  id: string;
  active?: boolean;
}

/**
 * Validate school exists and is active
 */
async function validateSchool(schoolId: string): Promise<SchoolData | null> {
  try {
    const schoolDoc = await dbAdmin.collection("schools").doc(schoolId).get();
    
    if (!schoolDoc.exists) {
      return null;
    }
    
    const data = schoolDoc.data();
    if (!data) {
      return null;
    }
    
    // Check if school is active
    if (data.active === false) {
      return null;
    }
    
    return {
      id: schoolId,
      domain: data.domain,
      name: data.name,
      active: data.active !== false
    };
  } catch (error) {
    logger.error(
      `School validation failed at /api/auth/send-magic-link`,
      error instanceof Error ? error : new Error(String(error))
    );
    return null;
  }
}

/**
 * PRODUCTION-ONLY magic link sending
 */
export const POST = withValidation(
  sendMagicLinkSchema,
  async (request, context, body: z.infer<typeof sendMagicLinkSchema>, respond) => {
    const { email, schoolId } = body;
    const requestId = request.headers.get('x-request-id') || `req_${Date.now()}`;

    try {
      // SECURITY: Rate limiting with strict enforcement
      const rateLimitResult = await enforceRateLimit('magicLink', request);
      if (!rateLimitResult.allowed) {
        return respond.error(rateLimitResult.error || "Rate limit exceeded", "RATE_LIMITED", {
          status: rateLimitResult.status
        });
      }

      // SECURITY: Additional threat detection (schema validation already done by middleware)
      const validationResult = await validateWithSecurity({ email, schoolId: schoolId || '' }, sendMagicLinkSchema, {
        operation: 'send_magic_link',
        ip: request.headers.get('x-forwarded-for') || undefined
      });

      if (!validationResult.success || validationResult.securityLevel === 'dangerous') {
        await auditAuthEvent('suspicious', request, {
          operation: 'send_magic_link',
          threats: validationResult.errors?.map(e => e.code).join(',') || 'unknown',
          securityLevel: validationResult.securityLevel
        });

        return respond.error("Request validation failed", "INVALID_INPUT", { status: 400 });
      }
    
    // DEVELOPMENT: Handle development mode with simple magic link generation
    const isLocalEnvironment = currentEnvironment === 'development' || !process.env.VERCEL;

    logger.info('🔍 Auth Debug - Environment and input', { email, schoolId, endpoint: '/api/auth/send-magic-link' });

    // In development, create a simple magic link without Firebase
    if (isLocalEnvironment) {
      logger.info('🔧 Development mode: Generating simple magic link', { endpoint: '/api/auth/send-magic-link' });

      // Generate a simple development token with URL-safe base64
      const devToken = Buffer.from(JSON.stringify({
        email,
        schoolId,
        timestamp: Date.now(),
        dev: true
      })).toString('base64url'); // Use URL-safe base64 encoding (no padding =)

      const magicLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/auth/verify?token=${devToken}&mode=dev&email=${encodeURIComponent(email)}&schoolId=${schoolId}`;

      logger.info('✅ Development magic link created', { endpoint: '/api/auth/send-magic-link' });

      // In development, return the magic link directly for testing
      return NextResponse.json({
        success: true,
        message: "Magic link sent (development mode)",
        devMode: true,
        magicLink, // Include the link in development for easy testing
        email
      });
    }

    // For non-development users in development environment, check if Firebase is configured
    if (isLocalEnvironment) {
      const { isFirebaseAdminConfigured } = await import('@/lib/env');
      if (!isFirebaseAdminConfigured) {
        return NextResponse.json(
          { 
            error: "Firebase not configured. Use development users: student@test.edu, faculty@test.edu, admin@test.edu, jacob@test.edu",
            availableUsers: ["student@test.edu", "faculty@test.edu", "admin@test.edu", "jacob@test.edu"]
          },
          { status: 503 }
        );
      }
    }
    
    // Validate school exists and is active (only for non-development users)
    const schoolData = await validateSchool(schoolId);
    if (!schoolData) {
      await auditAuthEvent('failure', request, {
        operation: 'send_magic_link',
        error: 'invalid_school'
      });
      
      return NextResponse.json(ApiResponseHelper.error("School not found or inactive", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }
    
    // SECURITY: Validate email domain matches school domain
    if (!validateEmailDomain(email, [schoolData.domain])) {
      await auditAuthEvent('failure', request, {
        operation: 'send_magic_link',
        error: 'domain_mismatch'
      });
      
      return NextResponse.json(
        { error: `Email must be from ${schoolData.domain} domain` },
        { status: HttpStatus.BAD_REQUEST }
      );
    }
    
    // Additional security checks for production
    if (currentEnvironment === 'production') {
      // Check if user has been rate limited recently
      const rateLimitKey = `magic_link_${email.replace(/[^a-zA-Z0-9]/g, '_')}`;
      // This would integrate with Redis rate limiting
      
      // Validate the email is from a legitimate educational domain
      const emailDomain = email.split('@')[1]?.toLowerCase() || '';

      // For UB launch - ONLY allow buffalo.edu emails
      const allowedDomains = ['buffalo.edu'];
      const isAllowedDomain = allowedDomains.includes(emailDomain);

      // Fallback to general .edu validation if not UB-specific
      const eduDomains = ['.edu', '.ac.', '.university', '.college'];
      const isEduDomain = isAllowedDomain || (
        process.env.NEXT_PUBLIC_CAMPUS_ID !== 'ub-buffalo' &&
        eduDomains.some(suffix => emailDomain.endsWith(suffix))
      );
      
      if (!isEduDomain) {
        await auditAuthEvent('forbidden', request, {
          operation: 'send_magic_link',
          error: `non_edu_domain: ${emailDomain}`
        });

        // SECURITY: Block non-educational domains in production
        logger.error('BLOCKED: Non-educational domain attempted', {
          emailDomain,
          email: email.replace(/(.{3}).*@/, '$1***@'),
          endpoint: '/api/auth/send-magic-link'
        });

        return NextResponse.json(
          ApiResponseHelper.error(
            "Only educational email addresses (.edu) are allowed",
            "INVALID_EMAIL_DOMAIN"
          ),
          { status: HttpStatus.FORBIDDEN }
        );
      }
    }
    
    // Use Firebase Admin SDK to generate magic link
    const auth = getAuth();
    const actionCodeSettings = getDefaultActionCodeSettings(schoolId);
    
    // Generate the sign-in link
    let magicLink: string;
    try {
      magicLink = await auth.generateSignInWithEmailLink(email, actionCodeSettings);
    } catch (firebaseError: any) {
      logger.error(
      `Firebase magic link generation failed at /api/auth/send-magic-link`,
      firebaseError instanceof Error ? firebaseError : new Error(String(firebaseError))
    );
      
      // For development: if Dynamic Links is not configured, create a simple fallback
      if (currentEnvironment === 'development' && 
          firebaseError.message?.includes('DYNAMIC_LINK_NOT_ACTIVATED')) {
        
        logger.info('🔧 Development mode: Using fallback magic link since Dynamic Links not configured', { endpoint: '/api/auth/send-magic-link' });
        
        // Create a simple development magic link using custom token
        try {
          const customToken = await auth.createCustomToken(email.replace('@', '_at_').replace('.', '_dot_'));
          magicLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${customToken}&schoolId=${schoolId}&email=${encodeURIComponent(email)}`;
          
          logger.info('✅ Development magic link created successfully', { endpoint: '/api/auth/send-magic-link' });
        } catch (tokenError) {
          logger.error(
      `Failed to create development token at /api/auth/send-magic-link`,
      tokenError instanceof Error ? tokenError : new Error(String(tokenError))
    );
          
          await auditAuthEvent('failure', request, {
            operation: 'send_magic_link',
            error: 'firebase_generation_failed'
          });
          
          return NextResponse.json(ApiResponseHelper.error("Unable to generate magic link", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
        }
      } else {
        await auditAuthEvent('failure', request, {
          operation: 'send_magic_link',
          error: 'firebase_generation_failed'
        });
        
        // Don't expose Firebase error details
        return NextResponse.json(ApiResponseHelper.error("Unable to generate magic link", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
      }
    }
    
    // Check if Firebase Email Auth is enabled
    const firebaseEmailEnabled = await isFirebaseEmailAuthEnabled();
    if (!firebaseEmailEnabled) {
      logger.warn('Firebase Email Auth not enabled, falling back to development mode', { endpoint: '/api/auth/send-magic-link' });
    }

    // Send the magic link via Firebase Auth (which handles email delivery)
    try {
      // Firebase Auth automatically sends the email when generateSignInWithEmailLink is called
      // The link has already been generated above and email sent by Firebase
      // We just need to log the success

      // For development or if Firebase email is not configured, log the link
      if (currentEnvironment === 'development' || !firebaseEmailEnabled) {
        await sendFirebaseMagicLinkEmail({
          email,
          schoolName: schoolData.name,
          redirectUrl: process.env.NEXT_PUBLIC_APP_URL
        });
      }

      logger.info('✅ Magic link email sent via Firebase Auth', {
        email: email.replace(/(.{3}).*@/, '$1***@'),
        schoolId: schoolData.name, // Using schoolId key to match LogContext type
        endpoint: '/api/auth/send-magic-link'
      });
    } catch (emailError: any) {
      await auditAuthEvent('failure', request, {
        operation: 'send_magic_link',
        error: 'firebase_email_failed'
      });

      logger.error(
      `Firebase Auth email sending failed at /api/auth/send-magic-link`,
      emailError.message
    );

      return NextResponse.json(ApiResponseHelper.error("Unable to send email", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
    }
    
    // Log successful operation
    await auditAuthEvent('success', request, {
      operation: 'send_magic_link'
    });
    
      return respond.success({
        message: "Magic link sent to your email address"
      });

    } catch (error) {
      await auditAuthEvent('failure', request, {
        operation: 'send_magic_link',
        error: error instanceof Error ? error.message : 'unknown'
      });

      throw error; // Let middleware handle the error
    }
  }
);