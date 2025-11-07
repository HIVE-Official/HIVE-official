import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { ritualFramework } from '@/lib/rituals-framework';
import { logger } from "@/lib/structured-logger";
import { ApiResponseHelper, HttpStatus } from "@/lib/api-response-types";
import { withAuth } from '@/lib/api-auth-middleware';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

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

    // Check if ritual exists and is active (prefer v2, fallback to legacy)
    const v2Ref = dbAdmin.collection('rituals_v2').doc(ritualId);
    const v2Snap = await v2Ref.get();
    const legacyRef = dbAdmin.collection('rituals').doc(ritualId);
    const ritualDoc = v2Snap.exists ? v2Snap : await legacyRef.get();
    if (!ritualDoc.exists) {
      return NextResponse.json(
        ApiResponseHelper.error("Ritual not found", "RITUAL_NOT_FOUND"),
        { status: HttpStatus.NOT_FOUND }
      );
    }

    const ritual = { id: ritualDoc.id, ...ritualDoc.data() } as any;
    if (ritual.campusId !== CURRENT_CAMPUS_ID) {
      return NextResponse.json(
        ApiResponseHelper.error("Access denied for this campus", "FORBIDDEN"),
        { status: HttpStatus.FORBIDDEN }
      );
    }
    const isActive = ritual.phase ? ritual.phase === 'active' : ritual.status === 'active';
    if (!isActive) {
      return NextResponse.json(
        ApiResponseHelper.error("Ritual is not currently active", "RITUAL_NOT_ACTIVE"),
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    // Check if user is already participating
    const existingParticipation = await dbAdmin.collection('ritual_participation')
      .where('ritualId', '==', ritualId)
      .where('userId', '==', userId)
      .where('campusId', '==', CURRENT_CAMPUS_ID)
      .limit(1)
      .get();

    if (!existingParticipation.empty) {
      return NextResponse.json(
        ApiResponseHelper.error("Already participating in this ritual", "ALREADY_PARTICIPATING"),
        { status: HttpStatus.CONFLICT }
      );
    }

    // Use ritual framework to join
    const ua = request.headers.get('user-agent') || '';
    const isMobile = /mobile|iphone|android|ipad/i.test(ua);
    const deviceType = isMobile ? 'mobile' : 'desktop';
    const success = await ritualFramework.joinRitual(ritualId, userId, entryPoint, deviceType);
    
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
      .where('campusId', '==', CURRENT_CAMPUS_ID)
      .limit(1)
      .get();

    const participation = participationSnapshot.empty 
      ? null 
      : { 
          id: participationSnapshot.docs[0].id, 
          ...participationSnapshot.docs[0].data() 
        } as { 
          id: string; 
          joinedAt?: any; 
          lastActiveAt?: any; 
          completedAt?: any; 
          [key: string]: any; 
        };

    logger.info('✅ Successfully joined ritual', { 
      userId, 
      ritualId, 
      participationId: participation?.id,
      endpoint: '/api/rituals/join' 
    });

    // Mirror v2 metrics if present
    if (v2Snap.exists) {
      try {
        await v2Ref.update({ 'metrics.participants': admin.firestore.FieldValue.increment(1), updatedAt: new Date() });
      } catch {}
    }

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
    logger.error(
      `Join ritual error at /api/rituals/join`,
      error.message
    );

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
  allowDevelopmentBypass: false, // Joining rituals requires authentication
  operation: 'join_ritual' 
});
