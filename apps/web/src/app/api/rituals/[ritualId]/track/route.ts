import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { RitualParticipationTracker } from '@/lib/rituals/ritual-participation';
import { logger } from '@/lib/utils/structured-logger';
import { withAuth } from '@/lib/api/middleware/api-auth-middleware';

const TrackActionSchema = z.object({
  actionType: z.string(),
  actionData: z.any().optional()
});

export const POST = withAuth(async (
  request: NextRequest,
  authContext,
  { params }: { params: Promise<{ ritualId: string }> }
) => {
  try {
    const { ritualId } = await params;
    const userId = authContext.userId;
    const body = await request.json();
    
    const { actionType, actionData } = TrackActionSchema.parse(body);

    logger.info('Tracking ritual action', { ritualId, userId, actionType });

    // Track the action
    await RitualParticipationTracker.trackAction(
      ritualId,
      userId,
      actionType,
      actionData
    );

    return NextResponse.json({
      success: true,
      message: 'Action tracked successfully'
    });

  } catch (error) {
    logger.error('Failed to track ritual action', { error });
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to track action' },
      { status: 500 }
    );
  }
}, {
  allowDevelopmentBypass: true,
  operation: 'track_ritual_action'
});