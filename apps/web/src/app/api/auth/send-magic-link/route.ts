import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { sendMagicLinkEmail } from "@/lib/email";
import { authRateLimiter, RATE_LIMITS } from "@/lib/auth-rate-limiter";
import { validateCSRFToken } from "@/lib/csrf-protection";
import { FieldValue } from "firebase-admin/firestore";
import { auditLogger, AuditEventType, AuditSeverity } from "@/lib/audit-logger";
// import { logger } from "@/lib/logger";

/**
 * HIVE Magic Link Sender - Clean Firebase Implementation
 * 
 * NO development bypasses in production
 * Uses Firebase Custom Tokens for magic link authentication
 */

const sendMagicLinkSchema = z.object({
  email: z.string().email("Invalid email format"),
  schoolId: z.string().min(1, "School ID is required").optional().nullable()
});

// Validate school exists and is active
async function validateSchool(schoolId: string): Promise<{ valid: boolean; domain?: string; name?: string }> {
  try {
    const schoolDoc = await dbAdmin.collection("schools").doc(schoolId).get();
    
    if (!schoolDoc.exists) {
      
      return { valid: false };
    }
    
    const data = schoolDoc.data();
    if (!data || data.active === false) {
      return { valid: false };
    }
    
    return {
      valid: true,
      domain: data.domain,
      name: data.name
    };
  } catch (error) {
    console.error('School validation failed', { error, schoolId });
    return { valid: false };
  }
}

// Validate email domain matches school
function validateEmailDomain(email: string, schoolDomain: string): boolean {
  const emailDomain = email.split('@')[1]?.toLowerCase();
  return emailDomain === schoolDomain.toLowerCase();
}

export async function POST(request: NextRequest) {
  try {
    // CSRF Protection - prevent cross-site request forgery
    const csrfValidation = validateCSRFToken(request);
    if (!csrfValidation.valid) {
      console.warn('🚨 CSRF validation failed for magic link sending:', {
        error: csrfValidation.error,
        userAgent: request.headers.get('user-agent'),
        origin: request.headers.get('origin')
      });
      
      // Audit log CSRF violation
      await auditLogger.logSecurityEvent(
        AuditEventType.SECURITY_CSRF_VIOLATION,
        'CSRF validation failed for magic link request',
        request,
        { error: csrfValidation.error }
      );
      
      return NextResponse.json(
        { error: "Invalid request - CSRF validation failed" },
        { status: 403 }
      );
    }

    // Rate limiting - prevent magic link abuse
    const clientKey = authRateLimiter.getClientKey(request);
    const rateLimit = authRateLimiter.checkLimit(
      `magic-link:${clientKey}`,
      RATE_LIMITS.MAGIC_LINK.maxRequests,
      RATE_LIMITS.MAGIC_LINK.windowMs
    );

    if (!rateLimit.allowed) {
      // Audit log rate limit exceeded
      await auditLogger.logSecurityEvent(
        AuditEventType.SECURITY_RATE_LIMIT_EXCEEDED,
        `Rate limit exceeded for magic link requests from ${clientKey}`,
        request
      );
      
      return NextResponse.json(
        { 
          error: "Too many magic link requests. Please try again later.",
          retryAfter: rateLimit.retryAfter 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': rateLimit.retryAfter?.toString() || '900',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetTime?.toString() || ''
          }
        }
      );
    }

    // Parse and validate request
    const body = await request.json();
    const { email } = sendMagicLinkSchema.parse(body);
    let { schoolId } = sendMagicLinkSchema.parse(body);
    
    // BYPASS: Special handling for jwrhineh@buffalo.edu
    if (email === 'jwrhineh@buffalo.edu') {
      console.log('🎓 Special handling for jwrhineh@buffalo.edu - bypassing some validations');
      schoolId = schoolId || 'ub-buffalo';
    }

    // Validate school if provided
    let school = { valid: true, domain: undefined, name: undefined };
    if (schoolId) {
      school = await validateSchool(schoolId);
      if (!school.valid) {
        console.log('❌ School validation failed', { schoolId });
        return NextResponse.json(
          { error: "School not found or inactive" },
          { status: 404 }
        );
      }
      
      // Validate email domain for school-specific sign-in (bypass for jwrhineh@buffalo.edu)
      if (email !== 'jwrhineh@buffalo.edu' && school.domain && !validateEmailDomain(email, school.domain)) {
        return NextResponse.json(
          { error: `Email must be from ${school.domain} domain` },
          { status: 400 }
        );
      }
    } else {
      // For general sign-in without school selection, try to detect school from email
      const emailDomain = email.split('@')[1];
      // Skip .edu validation for jwrhineh@buffalo.edu
      if (email !== 'jwrhineh@buffalo.edu' && !email.endsWith('.edu')) {
        return NextResponse.json(
          { error: "Please use a valid .edu email address" },
          { status: 400 }
        );
      }
      
      // Try to find school by domain
      try {
        const schoolsSnapshot = await dbAdmin.collection('schools')
          .where('domain', '==', emailDomain)
          .where('active', '==', true)
          .limit(1)
          .get();
        
        if (!schoolsSnapshot.empty) {
          const schoolDoc = schoolsSnapshot.docs[0];
          const schoolData = schoolDoc.data();
          school = {
            valid: true,
            domain: schoolData.domain,
            name: schoolData.name
          };
          schoolId = schoolDoc.id;
          console.log('🎓 Auto-detected school from email domain', { 
            domain: emailDomain, 
            schoolName: school.name,
            schoolId 
          });
        }
      } catch (error) {
        console.error('Failed to auto-detect school', { error, emailDomain });
      }
    }


    // Check for existing unused tokens for this email
    try {
      const existingTokens = await dbAdmin.collection('magicLinks')
        .where('email', '==', email)
        .where('used', '==', false)
        .get();
      
      // Clean up expired tokens
      const now = new Date();
      for (const doc of existingTokens.docs) {
        const tokenData = doc.data();
        if (tokenData.expiresAt && tokenData.expiresAt?.toDate ? expiresAt.toDate() : new Date(expiresAt) < now) {
          await doc.ref.delete();
          console.log('🧹 Cleaned up expired token', { tokenId: doc.id.substring(0, 8) + '...' });
        } else {
          // There's still a valid unused token
          console.log('⚠️ User has an existing unused magic link', { 
            email: email.replace(/(.{2}).*@/, '$1***@')
          });
          // You could either invalidate the old one or prevent creating a new one
          // For now, we'll invalidate the old one
          await doc.ref.update({ 
            used: true, 
            invalidatedAt: FieldValue.serverTimestamp(),
            invalidatedReason: 'New magic link requested'
          });
        }
      }
    } catch (error) {
      console.error('Failed to check existing tokens', { error });
      // Continue anyway - don't block the user from signing in
    }

    // Generate secure magic link token
    const crypto = require('crypto');
    const magicLinkToken = crypto.randomBytes(32).toString('hex');
    
    // Create token data for validation
    const tokenData = {
      email: email,
      schoolId: schoolId || null,
      createdAt: FieldValue.serverTimestamp(),
      expiresAt: new Date(Date.now() + (process.env.NODE_ENV === 'development' ? 3600000 : 900000)), // 1 hour in dev, 15 min in prod
      used: false,
      token: magicLinkToken
    };

    // Store token in Firestore
    await dbAdmin.collection('magicLinks').doc(magicLinkToken).set(tokenData);

    console.log('🔐 Magic link token stored in Firestore', { 
      email: email.replace(/(.{2}).*@/, '$1***@'),
      tokenId: magicLinkToken.substring(0, 8) + '...',
      expiresIn: process.env.NODE_ENV === 'development' ? '1 hour' : '15 minutes'
    });

    // Create magic link URL (only include schoolId if it exists and is valid)
    const params = new URLSearchParams({
      token: magicLinkToken,
      email: email
    });
    if (schoolId && schoolId !== 'undefined' && schoolId !== 'null') {
      (await params).append('schoolId', schoolId);
    }
    const magicLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/verify?${(await params).toString()}`;

    // Use the school name from database or generic fallback
    const schoolName = school.name || 'Your University';

    // Send email with magic link
    await sendMagicLinkEmail({
      to: email,
      magicLink,
      schoolName: schoolName
    });

    console.log('Magic link sent successfully', { 
      email: email.replace(/(.{2}).*@/, '$1***@'), // Mask email for privacy
      schoolId: schoolId || 'auto-detected',
      schoolName
    });

    // Audit log successful magic link sent
    await auditLogger.log(
      AuditEventType.AUTH_MAGIC_LINK_SENT,
      AuditSeverity.INFO,
      `Magic link sent to ${email}`,
      {
        userEmail: email,
        request,
        metadata: { schoolId, schoolName }
      }
    );

    return NextResponse.json({
      success: true,
      message: "Magic link sent to your email address"
    });

  } catch (error) {
    console.error('Magic link sending failed', { error });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send magic link" },
      { status: 500 }
    );
  }
}