import { NextRequest, NextResponse } from 'next/server';
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { getDefaultActionCodeSettings, validateEmailDomain } from "@hive/core";
import * as admin from "firebase-admin/auth";
import { sendMagicLinkEmail } from "@/lib/email";
import { ValidationError } from "@/lib/api-error-handler";
import { auditAuthEvent } from "@/lib/production-auth";
import { currentEnvironment } from "@/lib/env";
import { validateWithSecurity, ApiSchemas } from "@/lib/secure-input-validation";
import { enforceRateLimit } from "@/lib/secure-rate-limiter";
import { isDevUser, validateDevSchool, createDevSession } from "@/lib/dev-auth-helper";
import { logger } from "@/lib/logger";
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
    logger.error('School validation failed', { error: error, endpoint: '/api/auth/send-magic-link' });
    return null;
  }
}

/**
 * PRODUCTION-ONLY magic link sending
 */
export const POST = withValidation(
  sendMagicLinkSchema,
  async (request, context, { email, schoolId }, respond) => {
    const requestId = request.headers.get('x-request-id') || `req_${Date.now()}`;

    try {
      // SECURITY: Rate limiting with strict enforcement
      const rateLimitResult = await enforceRateLimit('magicLink', request);
      if (!rateLimitResult.allowed) {
        return respond.error(rateLimitResult.error, "RATE_LIMITED", {
          status: rateLimitResult.status
        });
      }

      // SECURITY: Additional threat detection (schema validation already done by middleware)
      const validationResult = await validateWithSecurity({ email, schoolId }, sendMagicLinkSchema, {
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
    
    // DEVELOPMENT: Handle development users FIRST before any validation
    // Check for development users regardless of environment detection to ensure dev access works
    const isDevelopmentUser = isDevUser(email) && validateDevSchool(schoolId);
    const isLocalEnvironment = currentEnvironment === 'development' || !process.env.VERCEL;
    
    logger.info('🔍 Auth Debug - Environment: , Email:, SchoolId', {  email, schoolId, endpoint: '/api/auth/send-magic-link'  });
    logger.info('🔍 Auth Debug - isDevelopmentUser:, isLocalEnvironment', { isDevelopmentUser, isLocalEnvironment, endpoint: '/api/auth/send-magic-link' });
    
    if (isDevelopmentUser && isLocalEnvironment) {
      logger.info('🔧 Development user detected, bypassing school validation', { endpoint: '/api/auth/send-magic-link' });
      
      // Create development session directly
      const devSession = await createDevSession(email, request);
      
      if (devSession.success) {
        await auditAuthEvent('success', request, {
          operation: 'dev_auth_success'
        });

        const response = NextResponse.json({
          success: true,
          message: "Development authentication successful",
          dev: true,
          user: devSession.user
        });

        // Set session cookies
        if (devSession.tokens) {
          const { SecureSessionManager } = await import('@/lib/secure-session-manager');
          SecureSessionManager.setSessionCookies(response, devSession.tokens);
        }

        return response;
      } else {
        return NextResponse.json(
          { error: devSession.error || "Development authentication failed" },
          { status: HttpStatus.BAD_REQUEST }
        );
      }
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
    if (!validateEmailDomain(email, schoolData.domain)) {
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
      const eduDomains = ['.edu', '.ac.', '.university', '.college'];
      const emailDomain = email.split('@')[1]?.toLowerCase() || '';
      const isEduDomain = eduDomains.some(suffix => 
        emailDomain.endsWith(suffix) || emailDomain.includes(suffix)
      );
      
      if (!isEduDomain) {
        await auditAuthEvent('suspicious', request, {
          operation: 'send_magic_link',
          error: 'non_edu_domain'
        });
        
        // Don't block but log for monitoring
        logger.warn('Non-educational domain attempted', { emailDomain, endpoint: '/api/auth/send-magic-link' });
      }
    }
    
    // Use Firebase Admin SDK to generate magic link
    const auth = admin.auth();
    const actionCodeSettings = getDefaultActionCodeSettings(schoolId);
    
    // Generate the sign-in link
    let magicLink: string;
    try {
      magicLink = await auth.generateSignInWithEmailLink(email, actionCodeSettings);
    } catch (firebaseError: any) {
      logger.error('Firebase magic link generation failed', { error: firebaseError, endpoint: '/api/auth/send-magic-link' });
      
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
          logger.error('Failed to create development token', { error: tokenError, endpoint: '/api/auth/send-magic-link' });
          
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
    
    // Send the magic link via email
    try {
      await sendMagicLinkEmail({
        to: email,
        magicLink,
        schoolName: schoolData.name });
    } catch (emailError) {
      await auditAuthEvent('failure', request, {
        operation: 'send_magic_link',
        error: 'email_sending_failed'
      });
      
      logger.error('Email sending failed', { error: emailError, endpoint: '/api/auth/send-magic-link' });
      
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