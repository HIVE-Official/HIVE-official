import { db, auth as firebaseAdmin } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { logger } from "@hive/core";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.split("Bearer ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decodedToken = await firebaseAdmin.verifyIdToken(token);
    const uid = decodedToken.uid;

    const userDoc = await db.collection("users").doc(uid).get();
    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { spaceId, spaceType, claimType } = await request.json();

    if (!spaceId || !spaceType || !claimType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get space reference
    const spaceRef = db
      .collection("spaces")
      .doc(spaceType)
      .collection("spaces")
      .doc(spaceId);

    const spaceDoc = await spaceRef.get();
    if (!spaceDoc.exists) {
      return NextResponse.json({ error: "Space not found" }, { status: 404 });
    }

    const spaceData = spaceDoc.data();
    if (spaceData?.claimedBy) {
      return NextResponse.json(
        { error: "Space already claimed" },
        { status: 400 }
      );
    }

    // Update space with claim
    await db
      .collection("spaces")
      .doc(spaceType)
      .collection("spaces")
      .doc(spaceId)
      .update({
        claimedBy: uid,
        claimType,
        claimedAt: new Date(),
      });

    // Update user's onboarding data
    await db
      .collection("users")
      .doc(uid)
      .update({
        "onboarding.spaceClaims": FieldValue.arrayUnion({
          spaceId,
          spaceType,
          claimType,
          claimedAt: new Date(),
        }),
      });

    return NextResponse.json({
      success: true,
      message: "Space claimed successfully",
    });
  } catch (error) {
    logger.error("Error submitting space claim:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
