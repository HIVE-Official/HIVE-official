import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase-admin';
import { ritualFramework } from '@/lib/rituals-framework';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus } from "@/lib/api-response-types";
import { withAuth } from '@/lib/api-auth-middleware';

// Join ritual schema
const JoinRitualSchema = z.object({
  ritualId: z.string().min(1),
  entryPoint: z.string().optional().default('direct')
});

/**
 * Join Ritual API
 * 
 * POST - Join a ritual
 */
export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    const body = await request.json();
    const { ritualId, entryPoint } = JoinRitualSchema.parse(body);

    logger.info('🎭 User joining ritual', { 
      userId, 
      ritualId, 
      entryPoint, 
      endpoint: '/api/rituals/join' 
    });

    // For development mode, return success without actual joining
    if ((userId === 'test-user' || userId === 'dev_user_123') && process.env.NODE_ENV !== 'production') {
      logger.info('✅ Development mode: Mock ritual join successful', { 
        userId, 
        ritualId, 
        endpoint: '/api/rituals/join' 
      });

      return NextResponse.json({
        success: true,
        message: 'Successfully joined ritual (development mode)',
        participation: {
          id: `mock_participation_${Date.now()}`,
          ritualId,
          userId,
          status: 'joined',
          joinedAt: new Date().toISOString(),
          progressPercentage: 0,
          entryPoint
        }
      });
    }

    // Check if ritual exists and is active
    const ritualDoc = await dbAdmin.collection('rituals').doc(ritualId).get();
    if (!ritualDoc.exists) {
      return NextResponse.json(
        ApiResponseHelper.error("Ritual not found", "RITUAL_NOT_FOUND"),
        { status: HttpStatus.NOT_FOUND }
      );
    }

    const ritual = { id: ritualDoc.id, ...ritualDoc.data() };
    if (ritual.status !== 'active') {
      return NextResponse.json(
        ApiResponseHelper.error("Ritual is not currently active", "RITUAL_NOT_ACTIVE"),
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    // Check if user is already participating
    const existingParticipation = await dbAdmin.collection('ritual_participation')
      .where('ritualId', '==', ritualId)
      .where('userId', '==', userId)
      .limit(1)
      .get();

    if (!existingParticipation.empty) {
      return NextResponse.json(
        ApiResponseHelper.error("Already participating in this ritual", "ALREADY_PARTICIPATING"),
        { status: HttpStatus.CONFLICT }
      );
    }

    // Use ritual framework to join
    const success = await ritualFramework.joinRitual(ritualId, userId, entryPoint);
    
    if (!success) {
      return NextResponse.json(
        ApiResponseHelper.error("Failed to join ritual - requirements not met", "JOIN_FAILED"),
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    // Get the created participation record
    const participationSnapshot = await dbAdmin.collection('ritual_participation')
      .where('ritualId', '==', ritualId)
      .where('userId', '==', userId)
      .limit(1)
      .get();

    const participation = participationSnapshot.empty 
      ? null 
      : { id: participationSnapshot.docs[0].id, ...participationSnapshot.docs[0].data() };

    logger.info('✅ Successfully joined ritual', { 
      userId, 
      ritualId, 
      participationId: participation?.id,
      endpoint: '/api/rituals/join' 
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully joined ritual',
      participation: {
        ...participation,
        joinedAt: participation?.joinedAt?.toDate?.()?.toISOString() || participation?.joinedAt,
        lastActiveAt: participation?.lastActiveAt?.toDate?.()?.toISOString() || participation?.lastActiveAt,
        completedAt: participation?.completedAt?.toDate?.()?.toISOString() || participation?.completedAt,
      }
    });

  } catch (error: any) {
    logger.error('Join ritual error', { 
      error: error.message, 
      endpoint: '/api/rituals/join' 
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        ApiResponseHelper.error("Invalid request data", "INVALID_REQUEST", error.errors),
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(
      ApiResponseHelper.error("Internal server error", "INTERNAL_ERROR"),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, { 
  allowDevelopmentBypass: true, // Joining rituals is safe for development
  operation: 'join_ritual' 
});