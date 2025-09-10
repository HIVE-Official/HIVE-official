import { NextRequest, NextResponse } from 'next/server';
import { RitualParticipationTracker } from '@/lib/rituals/ritual-participation';
import { logger } from '@/lib/structured-logger';
import { withAuth } from '@/lib/api-auth-middleware';

export const POST = withAuth(async (
  request: NextRequest,
  authContext,
  { params }: { params: Promise<{ ritualId: string }> }
) => {
  try {
    const { ritualId } = await params;
    const userId = authContext.userId;

    logger.info('User joining ritual', { ritualId, userId });

    // Join the ritual
    const participantId = await RitualParticipationTracker.joinRitual(ritualId, userId);

    return NextResponse.json({
      success: true,
      participantId,
      message: 'Successfully joined ritual'
    });

  } catch (error) {
    logger.error('Failed to join ritual', { error });
    return NextResponse.json(
      { success: false, error: 'Failed to join ritual' },
      { status: 500 }
    );
  }
}, {
  allowDevelopmentBypass: true,
  operation: 'join_ritual'
});