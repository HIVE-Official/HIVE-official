import { NextRequest, NextResponse } from "next/server";
import { db, auth as firebaseAdmin } from "@/lib/firebase-admin";
import { logger } from "@hive/core";

export async function POST(request: NextRequest) {
  try {
    const { uid, onboardingData } = await request.json();

    if (!uid || !onboardingData) {
      return NextResponse.json(
        { error: "Missing required fields", ok: false },
        { status: 400 }
      );
    }

    // Verify the user exists
    let userRecord;
    try {
      userRecord = await firebaseAdmin.getUser(uid);
    } catch (error) {
      logger.error("User not found:", error);
      return NextResponse.json(
        { error: "User not found", ok: false },
        { status: 404 }
      );
    }

    // Update user document with completed onboarding data
    const userData = {
      ...onboardingData,
      uid,
      email: userRecord.email,
      updatedAt: new Date(),
      onboarding: {
        ...onboardingData,
        isComplete: true,
        completedAt: new Date(),
      },
    };

    await db.collection("users").doc(uid).set(userData, { merge: true });

    logger.info(`Onboarding completed for user: ${uid}`);

    return NextResponse.json({
      ok: true,
      message: "Onboarding completed successfully",
    });
  } catch (error) {
    logger.error("Onboarding completion error:", error);
    return NextResponse.json(
      { error: "Failed to complete onboarding", ok: false },
      { status: 500 }
    );
  }
}