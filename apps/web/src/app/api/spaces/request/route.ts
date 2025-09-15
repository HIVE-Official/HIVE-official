import { NextRequest, NextResponse } from "next/server";
import { dbAdmin } from "@/lib/firebase/admin/firebase-admin";
import { logger } from "@hive/core";

interface SpaceClaimData {
  spaceId: string;
  spaceName: string;
  spaceType: string;
  claimReason: string;
  userRole: 'student' | 'faculty';
}

export async function POST(request: NextRequest) {
  try {
    const data: SpaceClaimData = await request.json();

    // Validate required fields
    if (!data.spaceId || !data.spaceName || !data.spaceType || !data.claimReason || !data.userRole) {
      return NextResponse.json(
        { error: "All fields are required", success: false },
        { status: 400 }
      );
    }

    // For development mode, use mock user data
    // In production, you'd get this from the authenticated user
    const userId = "dev-user"; // Replace with actual user ID from auth
    const userEmail = "test@buffalo.edu"; // Replace with actual user email from auth

    // Verify the space exists and has no current moderators
    const spaceRef = dbAdmin
      .collection("spaces")
      .doc(data.spaceType)
      .collection("spaces")
      .doc(data.spaceId);
    
    const spaceDoc = await spaceRef.get();
    if (!spaceDoc.exists) {
      return NextResponse.json(
        { error: "Space not found", success: false },
        { status: 404 }
      );
    }

    // Check if space already has moderators
    const moderatorsSnapshot = await spaceRef.collection("moderators").get();
    if (!moderatorsSnapshot.empty) {
      return NextResponse.json(
        { error: "Space already has a leader", success: false },
        { status: 400 }
      );
    }

    // Generate a unique claim request ID
    const claimId = `${data.spaceId}-claim-${Date.now()}`;

    // Create the space claim request document
    const spaceClaimRequest = {
      claimId,
      spaceId: data.spaceId,
      spaceName: data.spaceName,
      spaceType: data.spaceType,
      claimReason: data.claimReason,
      userRole: data.userRole,
      requestedBy: userId,
      requestedByEmail: userEmail,
      status: "pending",
      submittedAt: new Date(),
      reviewedAt: null,
      reviewedBy: null,
      reviewNotes: null,
    };

    // Save to Firestore
    await dbAdmin.collection("spaceClaimRequests").doc(claimId).set(spaceClaimRequest);

    logger.info("Space claim request submitted", {
      claimId,
      spaceId: data.spaceId,
      spaceName: data.spaceName,
      spaceType: data.spaceType,
      userRole: data.userRole,
      requestedBy: userId
    });

    return NextResponse.json({
      success: true,
      claimId,
      spaceId: data.spaceId,
      message: "Space claim request submitted successfully. You will be notified when it's reviewed."
    });

  } catch (error) {
    logger.error("Failed to submit space request", {
      error: error instanceof Error ? error.message : String(error)
    });

    return NextResponse.json(
      { error: "Failed to submit space request", success: false },
      { status: 500 }
    );
  }
}