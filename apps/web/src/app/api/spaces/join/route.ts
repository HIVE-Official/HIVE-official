import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { FieldValue } from "firebase-admin/firestore";
import { dbAdmin } from '@/lib/firebase-admin';
import { withAuth } from '@/lib/api-auth-middleware';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus } from "@/lib/api-response-types";

const joinSpaceSchema = z.object({
  spaceId: z.string().min(1, "Space ID is required")
});

/**
 * Join a space manually - Updated for flat collection structure
 * POST /api/spaces/join
 */
export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;

    // Parse and validate request body
    const body = (await request.json()) as unknown;
    const { spaceId } = joinSpaceSchema.parse(body);

    // Get space details from flat collection
    const spaceDoc = await dbAdmin.collection('spaces').doc(spaceId).get();

    if (!spaceDoc.exists) {
      return NextResponse.json(
        ApiResponseHelper.error("Space not found", "RESOURCE_NOT_FOUND"), 
        { status: HttpStatus.NOT_FOUND }
      );
    }

    const space = spaceDoc.data()!;

    // Check if space is private and requires invitation
    if (space.isPrivate) {
      return NextResponse.json(
        ApiResponseHelper.error("This space is private and requires an invitation", "FORBIDDEN"), 
        { status: HttpStatus.FORBIDDEN }
      );
    }

    // Check if user is already a member using flat spaceMembers collection
    const existingMembershipQuery = dbAdmin.collection('spaceMembers')
      .where('spaceId', '==', spaceId)
      .where('userId', '==', userId)
      .limit(1);
    
    const existingMembershipSnapshot = await existingMembershipQuery.get();

    if (!existingMembershipSnapshot.empty) {
      const existingMember = existingMembershipSnapshot.docs[0].data();
      if (existingMember.isActive) {
        return NextResponse.json(
          ApiResponseHelper.error("You are already a member of this space", "CONFLICT"), 
          { status: HttpStatus.CONFLICT }
        );
      }
      // If inactive membership exists, we'll reactivate it below
    }

    // Greek life restriction: Check if user is trying to join a Greek life space
    if (space.type === 'greek_life') {
      // Check if user is already in any Greek life space
      const existingGreekQuery = dbAdmin.collection('spaceMembers')
        .where('userId', '==', userId)
        .where('isActive', '==', true);
      
      const existingGreekSnapshot = await existingGreekQuery.get();
      
      for (const memberDoc of existingGreekSnapshot.docs) {
        const memberData = memberDoc.data();
        // Check if this membership is for a Greek life space
        const memberSpaceDoc = await dbAdmin.collection('spaces').doc(memberData.spaceId).get();
        if (memberSpaceDoc.exists && memberSpaceDoc.data()?.type === 'greek_life') {
          return NextResponse.json(
            ApiResponseHelper.error("You can only be a member of one Greek life organization at a time", "FORBIDDEN"), 
            { status: HttpStatus.FORBIDDEN }
          );
        }
      }
    }

    // Perform the join operation atomically using batch write
    const batch = dbAdmin.batch();
    const now = FieldValue.serverTimestamp();

    // If user had inactive membership, reactivate it
    if (!existingMembershipSnapshot.empty) {
      const existingMemberDoc = existingMembershipSnapshot.docs[0];
      batch.update(existingMemberDoc.ref, {
        isActive: true,
        joinedAt: now,
        permissions: ['post']
      });
    } else {
      // Create new membership in flat spaceMembers collection
      const memberRef = dbAdmin.collection('spaceMembers').doc();
      batch.set(memberRef, {
        spaceId,
        userId,
        role: 'member',
        joinedAt: now,
        isActive: true,
        permissions: ['post'],
        joinMethod: 'manual'
      });
    }

    // Update space member count
    batch.update(spaceDoc.ref, {
      'metrics.memberCount': FieldValue.increment(1),
      'metrics.activeMembers': FieldValue.increment(1),
      updatedAt: now
    });

    // Record join activity
    const activityRef = dbAdmin.collection('activityEvents').doc();
    batch.set(activityRef, {
      userId,
      type: 'space_join',
      spaceId,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      metadata: {
        spaceName: space.name,
        spaceType: space.type,
        joinMethod: 'manual'
      }
    });

    // Execute all operations atomically
    await batch.commit();

    logger.info('✅ User joined space successfully', { 
      userId, 
      spaceId, 
      spaceName: space.name,
      endpoint: '/api/spaces/join' 
    });

    return NextResponse.json({
      success: true,
      message: "Successfully joined the space",
      space: {
        id: spaceId,
        name: space.name,
        type: space.type,
        description: space.description
      }
    });

  } catch (error: any) {
    logger.error('Error joining space', { 
      error: error.message,
      stack: error.stack,
      endpoint: '/api/spaces/join' 
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        ApiResponseHelper.error('Invalid request data', 'VALIDATION_ERROR'),
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(
      ApiResponseHelper.error("Failed to join space. Please try again.", "INTERNAL_ERROR"),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, { 
  allowDevelopmentBypass: false, // Space joining requires real auth
  operation: 'join_space' 
});
