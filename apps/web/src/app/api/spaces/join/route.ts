import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { dbAdmin } from '@/lib/firebase-admin';
import type { Space, MemberRole } from "@hive/core";
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

// Server-side member type that allows FieldValue for timestamps
interface ServerMember {
  uid: string;
  role: MemberRole;
  joinedAt: FieldValue;
}

const joinSpaceSchema = z.object({
  spaceId: z.string().min(1, "Space ID is required") });

/**
 * Join a space manually
 * POST /api/spaces/join
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
      logger.error('Token verification failed', { error: authError, endpoint: '/api/spaces/join' });
      return NextResponse.json(ApiResponseHelper.error("Invalid or expired token", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const userId = decodedToken.uid;

    // Parse and validate request body
    const body = (await request.json()) as unknown;
    const { spaceId } = joinSpaceSchema.parse(body);

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
      return NextResponse.json(ApiResponseHelper.error("You are already a member of this space", "UNKNOWN_ERROR"), { status: 409 });
    }

    // Greek life restriction: Check if user is trying to join a Greek life space
    if (spaceType === 'greek_life') {
      // Check if user is already in any Greek life space
      const greekSpacesRef = dbAdmin.collection("spaces").doc("greek_life").collection("spaces");
      const greekSpacesSnapshot = await greekSpacesRef.get();
      
      let existingGreekMembership = null;
      
      // Check membership across all Greek life spaces
      for (const greekSpaceDoc of greekSpacesSnapshot.docs) {
        const greekSpaceId = greekSpaceDoc.id;
        if (greekSpaceId === spaceId) continue; // Skip the space they're trying to join
        
        const existingMemberDoc = await db
          .collection("spaces")
          .doc("greek_life")
          .collection("spaces")
          .doc(greekSpaceId)
          .collection("members")
          .doc(userId)
          .get();
          
        if (existingMemberDoc.exists) {
          const greekSpaceData = greekSpaceDoc.data();
          existingGreekMembership = {
            spaceId: greekSpaceId,
            spaceName: greekSpaceData.name,
            membershipData: existingMemberDoc.data()
          };
          break;
        }
      }
      
      if (existingGreekMembership) {
        return NextResponse.json(
          ApiResponseHelper.error(
            `You can only be a member of one Greek life organization. You are already a member of ${existingGreekMembership.spaceName}. To join this space, you must first leave your current organization.`,
            "BUSINESS_RULE_VIOLATION"
          ), 
          { status: HttpStatus.CONFLICT }
        );
      }
    }

    // Note: School validation removed since spaces don't have schoolId field in current data
    // School validation ready for implementation when school association is added

    // Perform the join operation atomically
    const batch = dbAdmin.batch();

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
      updatedAt: FieldValue.serverTimestamp() });

    // Record the movement for cooldown tracking
    const movementRecord = {
      userId,
      fromSpaceId: null,
      toSpaceId: spaceId,
      spaceType: spaceType!,
      movementType: 'join',
      timestamp: new Date().toISOString(),
      reason: 'User joined space manually'
    };

    const movementRef = dbAdmin.collection('spaceMovements').doc();
    batch.set(movementRef, movementRecord);

    // Execute the transaction
    await batch.commit();

    return NextResponse.json({
      success: true,
      message: "Successfully joined the space",
      space: {
        id: spaceId,
        name: space.name,
        type: space.type,
      } });
  } catch (error) {
    logger.error('Error joining space', { error: error, endpoint: '/api/spaces/join' });
    return NextResponse.json(ApiResponseHelper.error("Failed to join space. Please try again.", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}
