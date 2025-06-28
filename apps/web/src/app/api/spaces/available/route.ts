import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { logger } from "@hive/core";

export async function GET(request: NextRequest) {
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
        { error: "Only student leaders can view claimable spaces" },
        { status: 403 }
      );
    }

    const schoolId = userData.schoolId;
    if (!schoolId) {
      return NextResponse.json(
        { error: "School ID not found" },
        { status: 400 }
      );
    }

    // Get all space types
    const spaceTypes = [
      "academic",
      "social",
      "professional",
      "sports",
      "cultural",
      "service",
    ];
    const availableSpaces: Record<string, any[]> = {};

    for (const spaceType of spaceTypes) {
      const spacesSnapshot = await adminDb
        .collection("spaces")
        .doc(spaceType)
        .collection("spaces")
        .where("schoolId", "==", schoolId)
        .where("claimedBy", "==", null) // Only unclaimed spaces
        .get();

      availableSpaces[spaceType] = spacesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        spaceType,
      }));
    }

    logger.info(`Available spaces fetched for user ${uid}`, {
      schoolId,
      spaceTypeCounts: Object.entries(availableSpaces).map(
        ([type, spaces]) => ({
          type,
          count: spaces.length,
        })
      ),
    });

    return NextResponse.json({
      success: true,
      availableSpaces,
      schoolId,
    });
  } catch (error) {
    logger.error("Available spaces fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
