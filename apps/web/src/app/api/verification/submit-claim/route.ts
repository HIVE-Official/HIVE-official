import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { z } from "zod";
import { logger } from "@hive/core";

const spaceClaimSchema = z.object({
  spaceId: z.string().min(1),
  spaceName: z.string().min(1),
  spaceType: z.enum([
    "academic",
    "social",
    "professional",
    "sports",
    "cultural",
    "service",
  ]),
  claimReason: z
    .string()
    .min(10, "Please provide a detailed reason for claiming this space"),
});

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const uid = decodedToken.uid;

    // Get user data to verify they're a student leader
    const userDoc = await adminDb.collection("users").doc(uid).get();
    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data();
    if (!userData?.isStudentLeader) {
      return NextResponse.json(
        { error: "Only student leaders can claim spaces" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = spaceClaimSchema.parse(body);

    // Check if space exists in the correct structure
    const spaceRef = adminDb
      .collection("spaces")
      .doc(validatedData.spaceType)
      .collection("spaces")
      .doc(validatedData.spaceId);

    const spaceDoc = await spaceRef.get();
    if (!spaceDoc.exists) {
      return NextResponse.json({ error: "Space not found" }, { status: 404 });
    }

    const spaceData = spaceDoc.data();
    if (spaceData?.claimedBy) {
      return NextResponse.json(
        { error: "Space is already claimed" },
        { status: 409 }
      );
    }

    // Create space claim record
    const claimId = `${uid}_${validatedData.spaceId}`;
    const spaceClaim = {
      id: claimId,
      userId: uid,
      userEmail: userData.email,
      userDisplayName: userData.displayName,
      userSchoolId: userData.schoolId,
      spaceId: validatedData.spaceId,
      spaceName: validatedData.spaceName,
      spaceType: validatedData.spaceType,
      claimReason: validatedData.claimReason,
      status: "pending",
      submittedAt: new Date(),
      reviewedAt: null,
      reviewedBy: null,
    };

    // Save to verification queue
    await adminDb
      .collection("verification")
      .doc("space-claims")
      .collection("pending")
      .doc(claimId)
      .set(spaceClaim);

    // Update user's onboarding state
    await adminDb
      .collection("users")
      .doc(uid)
      .update({
        "onboarding.spaceClaims": adminDb.FieldValue.arrayUnion({
          spaceId: validatedData.spaceId,
          spaceName: validatedData.spaceName,
          spaceType: validatedData.spaceType,
          claimReason: validatedData.claimReason,
          status: "pending",
          submittedAt: new Date(),
        }),
      });

    logger.info(`Space claim submitted: ${claimId}`, {
      userId: uid,
      spaceId: validatedData.spaceId,
      spaceType: validatedData.spaceType,
    });

    return NextResponse.json({
      success: true,
      claimId,
      message:
        "Space claim submitted for review. You will be notified once approved.",
    });
  } catch (error) {
    logger.error("Space claim submission error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
