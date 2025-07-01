import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { logger, type Space, type MemberRole } from "@hive/core";

// Server-side member type that allows FieldValue for timestamps
interface ServerMember {
  uid: string;
  role: MemberRole;
  joinedAt: FieldValue;
}

const joinSpaceSchema = z.object({
  spaceId: z.string().min(1, "Space ID is required"),
});

/**
 * Join a space manually
 * POST /api/spaces/join
 */
export async function POST(request: NextRequest) {
  try {
    // Get the authorization header and verify the user
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    const idToken = authHeader.split("Bearer ")[1];
    const auth = getAuth();

    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(idToken);
    } catch (authError) {
      logger.error("Token verification failed:", authError);
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const userId = decodedToken.uid;

    // Parse and validate request body
    const body = (await request.json()) as unknown;
    const { spaceId } = joinSpaceSchema.parse(body);

    // Get Firestore instance
    const db = getFirestore();

    // Check if space exists and is joinable
    const spaceDocRef = db.collection("spaces").doc(spaceId);
    const spaceDoc = await spaceDocRef.get();

    if (!spaceDoc.exists) {
      return NextResponse.json({ error: "Space not found" }, { status: 404 });
    }

    const space = spaceDoc.data() as Space;

    // Check if space is in a joinable status
    if (space.status === "frozen") {
      return NextResponse.json(
        {
          error: "This space is currently frozen and not accepting new members",
        },
        { status: 403 }
      );
    }

    if (space.status === "dormant") {
      return NextResponse.json(
        { error: "This space is not yet active" },
        { status: 403 }
      );
    }

    // Check if user is already a member
    const memberDocRef = db
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(userId);
    const memberDoc = await memberDocRef.get();

    if (memberDoc.exists) {
      return NextResponse.json(
        { error: "You are already a member of this space" },
        { status: 409 }
      );
    }

    // Get user data to verify they're from the same school
    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data() as { schoolId: string } | undefined;

    // Verify user is from the same school as the space
    if (!userData || userData.schoolId !== space.schoolId) {
      return NextResponse.json(
        { error: "You can only join spaces from your school" },
        { status: 403 }
      );
    }

    // Perform the join operation atomically
    const batch = db.batch();

    // Add user to members sub-collection
    const newMember: ServerMember = {
      uid: userId,
      role: "member",
      joinedAt: FieldValue.serverTimestamp(),
    };

    batch.set(memberDocRef, newMember);

    // Increment the space's member count
    batch.update(spaceDocRef, {
      memberCount: FieldValue.increment(1),
      updatedAt: FieldValue.serverTimestamp(),
    });

    // Execute the transaction
    await batch.commit();

    return NextResponse.json({
      success: true,
      message: "Successfully joined the space",
      space: {
        id: spaceId,
        name: space.name,
        type: space.type,
      },
    });
  } catch (error) {
    logger.error("Error joining space:", error);
    return NextResponse.json(
      { error: "Failed to join space. Please try again." },
      { status: 500 }
    );
  }
}
