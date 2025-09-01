import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuth } from "firebase-admin/auth";
import { dbAdmin } from "@/lib/firebase-admin";
import { sendMagicLinkEmail } from "@/lib/email";
import { redisService } from "@/lib/redis-client";
import { authRateLimiter, RATE_LIMITS } from "@/lib/auth-rate-limiter";
// import { logger } from "@/lib/logger";

/**
 * HIVE Magic Link Sender - Clean Firebase Implementation
 * 
 * NO development bypasses in production
 * Uses Firebase Custom Tokens for magic link authentication
 */

const sendMagicLinkSchema = z.object({
  email: z.string().email("Invalid email format"),
  schoolId: z.string().min(1, "School ID is required")
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
    // Rate limiting - prevent magic link abuse
    const clientKey = authRateLimiter.getClientKey(request);
    const rateLimit = authRateLimiter.checkLimit(
      `magic-link:${clientKey}`,
      RATE_LIMITS.MAGIC_LINK.maxRequests,
      RATE_LIMITS.MAGIC_LINK.windowMs
    );

    if (!rateLimit.allowed) {
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
    const { email, schoolId } = sendMagicLinkSchema.parse(body);

    // Validate school
    const school = await validateSchool(schoolId);
    if (!school.valid) {
      return NextResponse.json(
        { error: "School not found or inactive" },
        { status: 404 }
      );
    }

    // Validate email domain
    if (!validateEmailDomain(email, school.domain!)) {
      return NextResponse.json(
        { error: `Email must be from ${school.domain} domain` },
        { status: 400 }
      );
    }


    // Generate secure magic link token
    const crypto = require('crypto');
    const magicLinkToken = crypto.randomBytes(32).toString('hex');
    
    // Create token data for validation
    const tokenData = {
      email: email,
      schoolId: schoolId,
      createdAt: Date.now(),
      used: false
    };

    // Store token in Redis with 15-minute expiration
    const tokenKey = `magic_link:${magicLinkToken}`;
    await redisService.set(tokenKey, JSON.stringify(tokenData), 900); // 15 minutes TTL

    console.log('🔐 Magic link token stored securely', { 
      email: email.replace(/(.{2}).*@/, '$1***@'),
      tokenKey: `magic_link:${magicLinkToken.substring(0, 8)}...`,
      ttl: 900 
    });

    // Create magic link URL
    const magicLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${magicLinkToken}&email=${encodeURIComponent(email)}&schoolId=${schoolId}`;

    // Send email with magic link
    await sendMagicLinkEmail({
      to: email,
      magicLink,
      schoolName: school.name!
    });

    console.log('Magic link sent successfully', { 
      email: email.replace(/(.{2}).*@/, '$1***@'), // Mask email for privacy
      schoolId 
    });

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