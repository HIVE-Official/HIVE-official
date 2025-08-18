import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuth } from "firebase-admin/auth";
import { dbAdmin } from "@/lib/firebase-admin";
import { sendMagicLinkEmail } from "@/lib/email";
import { logger } from "@/lib/logger";

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
    logger.error('School validation failed', { error, schoolId });
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

    // Validate email domain (only in production)
    if (process.env.NODE_ENV === 'production' && !validateEmailDomain(email, school.domain!)) {
      return NextResponse.json(
        { error: `Email must be from ${school.domain} domain` },
        { status: 400 }
      );
    }

    // DEVELOPMENT ONLY: Handle test users
    if (process.env.NODE_ENV === 'development') {
      const testEmails = ['student@test.edu', 'faculty@test.edu', 'admin@test.edu'];
      if (testEmails.includes(email)) {
        logger.info('🔧 Development test user detected', { email });
        
        // Create a simple development magic link
        const devToken = `dev_magic_${email.replace('@', '_').replace('.', '_')}_${Date.now()}`;
        const magicLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${devToken}&email=${encodeURIComponent(email)}&schoolId=${schoolId}`;
        
        // In development, just log the magic link instead of sending email
        
        
        return NextResponse.json({
          success: true,
          message: "Development magic link created (check console)",
          devLink: magicLink
        });
      }
    }

    // Create Firebase Custom Token for magic link
    const auth = getAuth();
    
    // Generate custom token with user email as the UID (temporarily)
    // We'll create the proper user later when they verify
    const customTokenUid = email.replace('@', '_at_').replace(/[^a-zA-Z0-9]/g, '_');
    const customToken = await auth.createCustomToken(customTokenUid, {
      email: email,
      schoolId: schoolId,
      magicLinkAuth: true,
      timestamp: Date.now()
    });

    // Create magic link URL
    const magicLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${customToken}&email=${encodeURIComponent(email)}&schoolId=${schoolId}`;

    // Send email with magic link
    await sendMagicLinkEmail({
      to: email,
      magicLink,
      schoolName: school.name!
    });

    logger.info('Magic link sent successfully', { 
      email: email.replace(/(.{2}).*@/, '$1***@'), // Mask email for privacy
      schoolId 
    });

    return NextResponse.json({
      success: true,
      message: "Magic link sent to your email address"
    });

  } catch (error) {
    logger.error('Magic link sending failed', { error });

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