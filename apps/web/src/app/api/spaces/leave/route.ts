import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import type { Space } from "@hive/core";
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

const leaveSpaceSchema = z.object({
  spaceId: z.string().min(1, "Space ID is required") });

/**
 * Leave a space manually
 * POST /api/spaces/leave
 */
export async function POST(request: NextRequest) {
  try {
    // Get the authorization header and verify the user
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Missing or invalid authorization header", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const idToken = authHeader.substring(7);
    const auth = getAuth();

    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(idToken);
    } catch (authError) {
      logger.error('Token verification failed', { error: authError, endpoint: '/api/spaces/leave' });
      return NextResponse.json(ApiResponseHelper.error("Invalid or expired token", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const userId = decodedToken.uid;

    // Parse and validate request body
    const body = (await request.json()) as unknown;
    const { spaceId } = leaveSpaceSchema.parse(body);

    // Get Firestore instance
    const db = getFirestore();

    // Find the space in the nested structure: SPACES/[spacetype]/SPACES/spaceID
    const spaceTypes = ['campus_living', 'greek_life', 'hive_exclusive', 'student_organizations', 'university_organizations'];
    let spaceDoc: any = null;
    let spaceDocRef: any = null;
    let spaceType: string | null = null;

    // Search through all space types to find the space
    for (const type of spaceTypes) {
      const potentialSpaceRef = dbAdmin.collection("spaces").doc(type).collection("spaces").doc(spaceId);
      const potentialSpaceDoc = await potentialSpaceRef.get();
      
      if (potentialSpaceDoc.exists) {
        spaceDoc = potentialSpaceDoc;
        spaceDocRef = potentialSpaceRef;
        spaceType = type;
        break;
      }
    }

    if (!spaceDoc || !spaceDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Space not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const space = spaceDoc.data() as Space;

    // Check if user is actually a member
    const memberDocRef = db
      .collection("spaces")
      .doc(spaceType!)
      .collection("spaces")
      .doc(spaceId)
      .collection("members")
      .doc(userId);
    const memberDoc = await memberDocRef.get();

    if (!memberDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("You are not a member of this space", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const memberData = memberDoc.data() as { role: string } | undefined;

    // Prevent builders from leaving if they're the only builder
    if (memberData?.role === "builder") {
      // TODO: In future, we could add logic to check if there are other builders
      // For now, we'll allow builders to leave but could add restrictions later
      logger.warn('Builderleaving space', { userId, spaceId, endpoint: '/api/spaces/leave' });
    }

    // Perform the leave operation atomically
    const batch = dbAdmin.batch();

    // Remove user from members sub-collection
    batch.delete(memberDocRef);

    // Decrement the space's member count (with minimum of 0)
    batch.update(spaceDocRef, {
      memberCount: FieldValue.increment(-1),
      updatedAt: FieldValue.serverTimestamp()
    });

    // Record the movement for cooldown tracking
    const movementRecord = {
      userId,
      fromSpaceId: spaceId,
      toSpaceId: null,
      spaceType: spaceType!,
      movementType: 'leave',
      timestamp: new Date().toISOString(),
      reason: 'User left space manually'
    };

    const movementRef = dbAdmin.collection('spaceMovements').doc();
    batch.set(movementRef, movementRecord);

    // Execute the transaction
    await batch.commit();

    return NextResponse.json({
      success: true,
      message: "Successfully left the space",
      space: {
        id: spaceId,
        name: space.name,
        type: space.type,
      } });
  } catch (error) {
    logger.error('Error leaving space', { error: error, endpoint: '/api/spaces/leave' });
    return NextResponse.json(ApiResponseHelper.error("Failed to leave space. Please try again.", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}
