import { db, auth as firebaseAdmin } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { logger } from "@hive/core";

export async function GET(request: NextRequest) {
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

    const userData = userDoc.data();
    const schoolId = userData?.schoolId;

    if (!schoolId) {
      return NextResponse.json(
        { error: "User's school not found" },
        { status: 404 }
      );
    }

    // Get all spaces for the user's school that they haven't joined
    const spacesSnapshot = await db
      .collection("spaces")
      .where("schoolId", "==", schoolId)
      .where("status", "==", "active")
      .get();

    const spaces = spacesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ spaces });
  } catch (error) {
    logger.error("Error fetching available spaces:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
