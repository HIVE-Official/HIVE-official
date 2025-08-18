import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { FieldValue } from "firebase-admin/firestore";
import { dbAdmin } from "@/lib/firebase-admin";
import { withAuth } from "@/lib/api-auth-middleware";
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus } from "@/lib/api-response-types";

const leaveSpaceSchema = z.object({
  spaceId: z.string().min(1, "Space ID is required")
});

/**
 * Leave a space manually - Updated for flat collection structure
 * POST /api/spaces/leave
 */
export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;

    // Parse and validate request body
    const body = (await request.json()) as unknown;
    const { spaceId } = leaveSpaceSchema.parse(body);

    // Get space from flat collection
    const spaceDoc = await dbAdmin.collection('spaces').doc(spaceId).get();

    if (!spaceDoc.exists) {
      return NextResponse.json(
        ApiResponseHelper.error("Space not found", "RESOURCE_NOT_FOUND"),
        { status: HttpStatus.NOT_FOUND }
      );
    }

    const space = spaceDoc.data()!;

    // Check if user is actually a member using flat spaceMembers collection
    const membershipQuery = dbAdmin.collection('spaceMembers')
      .where('spaceId', '==', spaceId)
      .where('userId', '==', userId)
      .where('isActive', '==', true)
      .limit(1);
    
    const membershipSnapshot = await membershipQuery.get();

    if (membershipSnapshot.empty) {
      return NextResponse.json(
        ApiResponseHelper.error("You are not a member of this space", "RESOURCE_NOT_FOUND"),
        { status: HttpStatus.NOT_FOUND }
      );
    }

    const memberDoc = membershipSnapshot.docs[0];
    const memberData = memberDoc.data();

    // Prevent owners from leaving if they're the only owner
    if (memberData.role === "owner") {
      // Check if there are other owners
      const otherOwnersQuery = dbAdmin.collection('spaceMembers')
        .where('spaceId', '==', spaceId)
        .where('role', '==', 'owner')
        .where('isActive', '==', true)
        .limit(2);
      
      const otherOwnersSnapshot = await otherOwnersQuery.get();
      
      if (otherOwnersSnapshot.size <= 1) {
        return NextResponse.json(
          ApiResponseHelper.error("Cannot leave space: You are the only owner. Transfer ownership or promote another member first.", "BUSINESS_RULE_VIOLATION"),
          { status: HttpStatus.CONFLICT }
        );
      }
    }

    // Perform the leave operation atomically
    const batch = dbAdmin.batch();
    const now = FieldValue.serverTimestamp();

    // Mark membership as inactive instead of deleting
    batch.update(memberDoc.ref, {
      isActive: false,
      leftAt: now
    });

    // Decrement the space's member count
    batch.update(spaceDoc.ref, {
      'metrics.memberCount': FieldValue.increment(-1),
      'metrics.activeMembers': FieldValue.increment(-1),
      updatedAt: now
    });

    // Record leave activity
    const activityRef = dbAdmin.collection('activityEvents').doc();
    batch.set(activityRef, {
      userId,
      type: 'space_leave',
      spaceId,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      metadata: {
        spaceName: space.name,
        spaceType: space.type,
        previousRole: memberData.role
      }
    });

    // Execute all operations atomically
    await batch.commit();

    logger.info('✅ User left space successfully', {
      userId,
      spaceId,
      spaceName: space.name,
      previousRole: memberData.role,
      endpoint: '/api/spaces/leave'
    });

    return NextResponse.json({
      success: true,
      message: "Successfully left the space",
      space: {
        id: spaceId,
        name: space.name,
        type: space.type,
        description: space.description
      }
    });

  } catch (error: any) {
    logger.error('Error leaving space', {
      error: error.message,
      stack: error.stack,
      endpoint: '/api/spaces/leave'
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        ApiResponseHelper.error('Invalid request data', 'VALIDATION_ERROR'),
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(
      ApiResponseHelper.error("Failed to leave space. Please try again.", "INTERNAL_ERROR"),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, {
  allowDevelopmentBypass: false,
  operation: 'leave_space'
});
