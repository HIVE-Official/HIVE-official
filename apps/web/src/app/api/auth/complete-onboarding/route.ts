import { NextRequest, NextResponse } from "next/server";
import { auth } from "@hive/auth-logic";
import { updateProfile } from "firebase/auth";
import { logger } from "@hive/core";
import { dbAdmin, authAdmin } from "@/lib/firebase-admin";
import type { OnboardingState } from "@hive/core";

export async function POST(request: NextRequest) {
  try {
    const onboardingData = (await request.json()) as Partial<OnboardingState>;
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

    if (!auth) {
      logger.error("Firebase auth not initialized");
      return NextResponse.json(
        { message: "Authentication service unavailable" },
        { status: 500 }
      );
    }

    // Get the current user
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    // Development mode bypass
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      logger.info("🔥 Development mode: bypassing Firestore operations");

      // Update Firebase Auth profile even in dev mode
      await updateProfile(currentUser, {
        displayName,
        photoURL: avatarUrl || null,
      });

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
              .doc("space-claims")
              .collection("pending")
              .doc();
            
            transaction.set(claimRef, {
              ...claim,
              userId: currentUser.uid,
              userEmail: currentUser.email,
              userDisplayName: displayName,
              submittedAt: now,
              status: "pending",
            });
          }
        }
      });

      // Update Firebase Auth profile
      await updateProfile(currentUser, {
        displayName,
        photoURL: avatarUrl || null,
      });

      // Update Firebase Auth custom claims
      try {
        await authAdmin.setCustomUserClaims(currentUser.uid, {
          onboardingCompleted: true,
          verificationLevel: "verified",
          isBuilder: builderOptIn || false,
          emailVerified: currentUser.emailVerified,
        });
      } catch (claimsError) {
        logger.warn(
          "Failed to set custom user claims, continuing anyway:",
          claimsError
        );
      }

      logger.info("User onboarding completed successfully:", {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName,
        handle,
        isStudentLeader,
        spaceClaims: spaceClaims.length,
      });

      return NextResponse.json({
        ok: true,
        message: "Onboarding completed successfully",
        userId: currentUser.uid,
        handle,
        isStudentLeader,
        verificationLevel: "verified",
      });
    } catch (error) {
      logger.error("Transaction failed:", error);

      if (error instanceof Error && error.message.includes("Handle was taken")) {
        return NextResponse.json(
          {
            message: "Handle was taken during processing. Please try again.",
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        {
          message: "Failed to complete onboarding",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    logger.error("Onboarding completion failed:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
