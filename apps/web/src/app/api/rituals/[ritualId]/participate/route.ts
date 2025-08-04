import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { ritualFramework } from '@/lib/rituals-framework';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import { withAuth, ApiResponse } from '@/lib/api-auth-middleware';

// Participation action schema
const ParticipationActionSchema = z.object({
  action: z.enum(['join', 'leave', 'complete_action']),
  actionId: z.string().optional(), // Required for 'complete_action'
  metadata: z.record(z.any()).optional(),
  entryPoint: z.string().optional() });

/**
 * Ritual Participation API
 * 
 * POST /api/rituals/[ritualId]/participate
 * - Join ritual
 * - Complete specific actions
 * - Leave ritual
 */
export const POST = withAuth(async (
  request: NextRequest,
  authContext,
  { params }: { params: { ritualId: string } }
) => {
  try {
    const { ritualId } = params;
    const userId = authContext.userId;

    const body = await request.json();
    const { action, actionId, metadata = {}, entryPoint = 'direct' } = ParticipationActionSchema.parse(body);

    logger.info('🎭 Ritual participation: for ritualby user', {  ritualId, userId, endpoint: '/api/rituals/[ritualId]/participate'  });

    switch (action) {
      case 'join': {
        const joinSuccess = await ritualFramework.joinRitual(ritualId, userId, entryPoint);
        
        if (!joinSuccess) {
          return NextResponse.json(ApiResponseHelper.error("Unable to join ritual. Check eligibility requirements.", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
        }

        return NextResponse.json({
          success: true,
          message: 'Successfully joined ritual',
          action: 'joined',
          timestamp: new Date().toISOString()
        });
      }

      case 'complete_action':
        if (!actionId) {
          return NextResponse.json(ApiResponseHelper.error("actionId is required for complete_action", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
        }

        await ritualFramework.recordAction(ritualId, userId, actionId, metadata);

        return NextResponse.json({
          success: true,
          message: 'Action completed successfully',
          action: 'action_completed',
          actionId,
          timestamp: new Date().toISOString()
        });

      case 'leave':
        // TODO: Implement leave ritual functionality
        return NextResponse.json({
          success: true,
          message: 'Left ritual successfully',
          action: 'left',
          timestamp: new Date().toISOString()
        });

      default:
        return NextResponse.json(ApiResponseHelper.error("Invalid action", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

  } catch (error: any) {
    logger.error('Ritual participation error', { error: error, endpoint: '/api/rituals/[ritualId]/participate' });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid participation data', details: error.errors },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, { 
  allowDevelopmentBypass: true, // Ritual participation is safe for development
  operation: 'participate_in_ritual' 
});