import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import type { Space, MemberRole } from "@hive/core";

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
      console.error("Token verification failed:", authError);
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

    // Find the space in the nested structure: SPACES/[spacetype]/SPACES/spaceID
    const spaceTypes = ['campus_living', 'fraternity_and_sorority', 'hive_exclusive', 'student_organizations', 'university_organizations'];
    let spaceDoc: any = null;
    let spaceDocRef: any = null;
    let spaceType: string | null = null;

    // Search through all space types to find the space
    for (const type of spaceTypes) {
      const potentialSpaceRef = db.collection("spaces").doc(type).collection("spaces").doc(spaceId);
      const potentialSpaceDoc = await potentialSpaceRef.get();
      
      if (potentialSpaceDoc.exists) {
        spaceDoc = potentialSpaceDoc;
        spaceDocRef = potentialSpaceRef;
        spaceType = type;
        break;
      }
    }

    if (!spaceDoc || !spaceDoc.exists) {
      return NextResponse.json({ error: "Space not found" }, { status: 404 });
    }

    const space = spaceDoc.data() as Space;

    // Note: Space status validation removed since spaces don't have status field in current data

    // Check if user is already a member
    const memberDocRef = db
      .collection("spaces")
      .doc(spaceType!)
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

    // Note: School validation removed since spaces don't have schoolId field in current data
    // TODO: Add school validation once school association is properly implemented

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
    console.error("Error joining space:", error);
    return NextResponse.json(
      { error: "Failed to join space. Please try again." },
      { status: 500 }
    );
  }
}
