import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { dbAdmin, authAdmin } from "@/lib/firebase-admin";

export const runtime = 'nodejs';

/**
 * DEVELOPMENT ONLY: Simplified onboarding completion for testing
 * This bypasses complex transaction management and Redis dependencies
 */

const completeOnboardingSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(100, "Full name too long"),
  userType: z.enum(["student", "alumni", "faculty"]),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  major: z.string().min(1, "Major is required"),
  academicLevel: z.string().optional(),
  graduationYear: z.number().int().min(1900).max(2040),
  handle: z
    .string()
    .min(3, "Handle must be at least 3 characters")
    .max(20, "Handle must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9._-]+$/,
      "Handle can only contain letters, numbers, periods, underscores, and hyphens"
    ),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  builderRequestSpaces: z.array(z.string()).default([]),
  consentGiven: z.boolean().refine((val) => val === true, "Consent must be given"),
});

export async function POST(request: NextRequest) {
  try {
    console.log('🔧 Development onboarding endpoint called');

    // Get the authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    const idToken = authHeader.substring(7);

    // Verify the ID token using our mock-capable authAdmin
    let decodedToken;
    try {
      decodedToken = await authAdmin.verifyIdToken(idToken);
      console.log('🔧 Development: Token verified', { uid: decodedToken.uid, email: decodedToken.email });
    } catch (error) {
      console.error('Token verification failed:', error);
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    if (!decodedToken?.uid || !decodedToken?.email) {
      return NextResponse.json(
        { error: "Invalid token data" },
        { status: 401 }
      );
    }

    const userId = decodedToken.uid;
    const userEmail = decodedToken.email;

    // Parse and validate the request body
    let body: unknown;
    try {
      body = await request.json();
    } catch (jsonError) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    let onboardingData;
    try {
      onboardingData = completeOnboardingSchema.parse(body);
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        return NextResponse.json(
          { error: "Invalid request data", details: validationError.errors },
          { status: 400 }
        );
      }
      throw validationError;
    }

    console.log('🔧 Development: Onboarding data validated', { 
      handle: onboardingData.handle, 
      userType: onboardingData.userType,
      major: onboardingData.major
    });

    // Simple handle validation
    const normalizedHandle = onboardingData.handle.toLowerCase();

    // Check if user already exists and has been onboarded
    try {
      const existingUserDoc = await dbAdmin.collection('users').doc(userId).get();
      if (existingUserDoc.exists) {
        const existingUserData = existingUserDoc.data();
        if (existingUserData?.handle) {
          return NextResponse.json(
            { error: "Onboarding already completed" },
            { status: 409 }
          );
        }
      }
    } catch (error) {
      console.log('🔧 Development: User check skipped (mock Firestore)');
    }

    // Development: Simple onboarding completion (mocked)
    const now = new Date();
    const updatedUserData = {
      id: userId,
      email: userEmail,
      fullName: onboardingData.fullName,
      userType: onboardingData.userType,
      firstName: onboardingData.firstName || onboardingData.fullName.split(' ')[0] || '',
      lastName: onboardingData.lastName || onboardingData.fullName.split(' ').slice(1).join(' ') || '',
      major: onboardingData.major,
      academicLevel: onboardingData.academicLevel || 'undergraduate',
      graduationYear: onboardingData.graduationYear,
      handle: normalizedHandle,
      avatarUrl: onboardingData.avatarUrl || '',
      builderRequestSpaces: onboardingData.builderRequestSpaces || [],
      consentGiven: onboardingData.consentGiven,
      consentGivenAt: now,
      onboardingCompleted: true,
      onboardingCompletedAt: now,
      createdAt: now,
      updatedAt: now,
      emailVerified: true,
      isPublic: true,
      campusId: 'ub-buffalo'
    };

    // Try to update user document (will be mocked in development)
    try {
      await dbAdmin.collection('users').doc(userId).set(updatedUserData);
      console.log('🔧 Development: User profile updated (mocked)');
    } catch (error) {
      console.log('🔧 Development: Firestore update mocked');
    }

    console.log('🔧 Development: Onboarding completed successfully', {
      userId,
      handle: normalizedHandle,
      userType: onboardingData.userType
    });

    return NextResponse.json({
      success: true,
      message: "Onboarding completed successfully",
      user: {
        id: userId,
        fullName: updatedUserData.fullName,
        userType: updatedUserData.userType,
        handle: normalizedHandle,
        major: updatedUserData.major,
        academicLevel: updatedUserData.academicLevel,
        graduationYear: updatedUserData.graduationYear,
        builderRequestSpaces: updatedUserData.builderRequestSpaces,
      },
      builderRequestsCreated: onboardingData.builderRequestSpaces?.length || 0,
      dev: true
    });

  } catch (error) {
    console.error('Development onboarding error:', error);

    return NextResponse.json(
      { error: "Failed to complete onboarding", dev: true },
      { status: 500 }
    );
  }
}