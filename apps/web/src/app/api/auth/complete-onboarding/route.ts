import { NextRequest, NextResponse } from "next/server";
import { logger } from "@hive/core";
import { dbAdmin, authAdmin } from "../../../../lib/firebase-admin";

// Temporary inline type definition to avoid import issues
interface OnboardingData {
  displayName?: string;
  major?: string;
  majors?: string[];
  handle?: string;
  avatarUrl?: string;
  builderOptIn?: boolean;
  consentGiven?: boolean;
  academicLevel?: string;
  graduationYear?: number;
  interests?: string[];
  isStudentLeader?: boolean;
  spaceClaims?: Array<{
    spaceId: string;
    spaceName: string;
    spaceType: string;
    claimReason: string;
    status: string;
  }>;
}

// Check if we're in build time
const isBuildTime = process.env.NEXT_PHASE === "phase-production-build";

export async function POST(request: NextRequest) {
  // During build time, return a mock response
  if (isBuildTime) {
    return NextResponse.json(
      { 
        ok: true,
        message: "Build time - mock onboarding completion",
        userId: "build-time-user-id"
      },
      { status: 200 }
    );
  }

  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: "Authorization token required" },
        { status: 401 }
      );
    }

    const idToken = authHeader.split('Bearer ')[1];
    
    // Verify the ID token
    let decodedToken;
    try {
      decodedToken = await authAdmin.verifyIdToken(idToken);
    } catch (error) {
      logger.error("Invalid ID token:", error);
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const currentUser = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
    };

    const onboardingData = (await request.json()) as Partial<OnboardingData>;
    const {
      displayName,
      major,
      majors = [],
      handle,
      avatarUrl,
      builderOptIn,
      consentGiven,
      academicLevel,
      graduationYear,
      interests = [],
      isStudentLeader = false,
      spaceClaims = [],
    } = onboardingData;

    // Validate required fields
    if (
      !displayName ||
      (!major && majors.length === 0) ||
      !handle ||
      consentGiven === undefined
    ) {
      return NextResponse.json(
        {
          message:
            "Missing required fields: displayName, major/majors, handle, and consentGiven are required",
        },
        { status: 400 }
      );
    }

    // Validate handle format
    const handleRegex = /^[a-z0-9_]{3,20}$/;
    if (!handleRegex.test(handle)) {
      return NextResponse.json(
        {
          message:
            "Handle must be 3-20 characters, lowercase letters, numbers, and underscores only",
        },
        { status: 400 }
      );
    }

    // Development mode bypass
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      logger.info("🔥 Development mode: bypassing Firestore operations");

      logger.info("Development mode onboarding completed for user:", {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName,
        handle,
        major: major || majors[0],
        builderOptIn,
        consentGiven,
      });

      return NextResponse.json({
        ok: true,
        message: "Onboarding completed successfully",
        userId: currentUser.uid,
      });
    }

    // Production mode: Full Firestore implementation
    try {
      // Check handle availability
      const handleQuery = await dbAdmin
        .collection("users")
        .where("handle", "==", handle)
        .limit(1)
        .get();

      if (!handleQuery.empty) {
        return NextResponse.json(
          {
            message: "Handle is already taken. Please choose a different one.",
          },
          { status: 409 }
        );
      }

      // Prepare user document data
      const now = new Date();
      const finalMajors = majors.length > 0 ? majors : [major!];

      const userData = {
        // Identity
        uid: currentUser.uid,
        email: currentUser.email,
        displayName,
        handle,
        avatarUrl: avatarUrl || null,

        // Status
        emailVerified: currentUser.emailVerified,
        onboardingCompleted: true,
        verificationLevel: "verified" as const,

        // Academic Info
        academicLevel: academicLevel || "undergraduate",
        majors: finalMajors,
        major: finalMajors[0], // Compatibility field
        graduationYear: graduationYear || new Date().getFullYear() + 4,
        interests,

        // Leadership
        isStudentLeader,
        spaceClaims,

        // Metadata
        builderOptIn: builderOptIn || false,
        consentGiven,
        isComplete: true,
        createdAt: now,
        updatedAt: now,
        completedAt: now,
        lastActiveAt: now,
      };

      // Use Firestore transaction for data consistency
      await dbAdmin.runTransaction(async (transaction) => {
        const userRef = dbAdmin.collection("users").doc(currentUser.uid);

        // Double-check handle availability within transaction
        const handleCheckRef = dbAdmin.collection("users");
        const handleSnapshot = await transaction.get(
          handleCheckRef.where("handle", "==", handle).limit(1)
        );

        if (!handleSnapshot.empty) {
          throw new Error("Handle was taken during processing");
        }

        // Create or update user document
        transaction.set(userRef, userData, { merge: true });

        // If student leader has space claims, store them separately
        if (isStudentLeader && spaceClaims.length > 0) {
          for (const claim of spaceClaims) {
            const claimRef = dbAdmin
              .collection("verification")
              .doc();
            
            transaction.set(claimRef, {
              ...claim,
              userId: currentUser.uid,
              createdAt: now,
              updatedAt: now,
              status: "PENDING",
            });
          }
        }
      });

      return NextResponse.json({
        ok: true,
        message: "Onboarding completed successfully",
        userId: currentUser.uid,
      });
    } catch (error) {
      logger.error("Error completing onboarding:", error);
      return NextResponse.json(
        { message: "Failed to complete onboarding" },
        { status: 500 }
      );
    }
  } catch (error) {
    logger.error("Unexpected error during onboarding:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
