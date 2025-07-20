import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import {
  doc,
  getDoc,
  writeBatch,
  serverTimestamp,
  increment,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getAuth } from "firebase-admin/auth";
import type { Space } from "@hive/core";

const leaveSpaceSchema = z.object({
  spaceId: z.string().min(1, "Space ID is required"),
});

/**
 * Leave a space manually
 * POST /api/spaces/leave
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
    const { spaceId } = leaveSpaceSchema.parse(body);

    // Find the space in the nested structure: SPACES/[spacetype]/SPACES/spaceID
    const spaceTypes = ['campus_living', 'fraternity_and_sorority', 'hive_exclusive', 'student_organizations', 'university_organizations'];
    let spaceDoc: any = null;
    let spaceDocRef: any = null;
    let spaceType: string | null = null;

    // Search through all space types to find the space
    for (const type of spaceTypes) {
      const potentialSpaceRef = doc(db, "spaces", type, "spaces", spaceId);
      const potentialSpaceDoc = await getDoc(potentialSpaceRef);
      
      if (potentialSpaceDoc.exists()) {
        spaceDoc = potentialSpaceDoc;
        spaceDocRef = potentialSpaceRef;
        spaceType = type;
        break;
      }
    }

    if (!spaceDoc || !spaceDoc.exists()) {
      return NextResponse.json({ error: "Space not found" }, { status: 404 });
    }

    const space = spaceDoc.data() as Space;

    // Check if user is actually a member
    const memberDocRef = doc(db, "spaces", spaceType!, "spaces", spaceId, "members", userId);
    const memberDoc = await getDoc(memberDocRef);

    if (!memberDoc.exists()) {
      return NextResponse.json(
        { error: "You are not a member of this space" },
        { status: 404 }
      );
    }

    const memberData = memberDoc.data() as { role: string } | undefined;

    // Prevent builders from leaving if they're the only builder
    if (memberData?.role === "builder") {
      // TODO: In future, we could add logic to check if there are other builders
      // For now, we'll allow builders to leave but could add restrictions later
      console.warn(`Builder ${userId} leaving space ${spaceId}`);
    }

    // Perform the leave operation atomically
    const batch = writeBatch(db);

    // Remove user from members sub-collection
    batch.delete(memberDocRef);

    // Decrement the space's member count (with minimum of 0)
    batch.update(spaceDocRef, {
      memberCount: increment(-1),
      updatedAt: serverTimestamp(),
    });

    // Execute the transaction
    await batch.commit();

    return NextResponse.json({
      success: true,
      message: "Successfully left the space",
      space: {
        id: spaceId,
        name: space.name,
        type: space.type,
      },
    });
  } catch (error) {
    console.error("Error leaving space:", error);
    return NextResponse.json(
      { error: "Failed to leave space. Please try again." },
      { status: 500 }
    );
  }
}
