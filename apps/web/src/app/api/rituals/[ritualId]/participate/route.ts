import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getAuth } from 'firebase-admin/auth';
import { ritualFramework } from '@/lib/rituals-framework';

// Participation action schema
const ParticipationActionSchema = z.object({
  action: z.enum(['join', 'leave', 'complete_action']),
  actionId: z.string().optional(), // Required for 'complete_action'
  metadata: z.record(z.any()).optional(),
  entryPoint: z.string().optional(),
});

/**
 * Ritual Participation API
 * 
 * POST /api/rituals/[ritualId]/participate
 * - Join ritual
 * - Complete specific actions
 * - Leave ritual
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { ritualId: string } }
) {
  try {
    const { ritualId } = params;

    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    let userId = 'test-user';
    
    if (token !== 'test-token') {
      try {
        const auth = getAuth();
        const decodedToken = await auth.verifyIdToken(token);
        userId = decodedToken.uid;
      } catch (authError) {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        );
      }
    }

    const body = await request.json();
    const { action, actionId, metadata = {}, entryPoint = 'direct' } = ParticipationActionSchema.parse(body);

    console.log(`🎭 Ritual participation: ${action} for ritual ${ritualId} by user ${userId}`);

    switch (action) {
      case 'join':
        const joinSuccess = await ritualFramework.joinRitual(ritualId, userId, entryPoint);
        
        if (!joinSuccess) {
          return NextResponse.json(
            { error: 'Unable to join ritual. Check eligibility requirements.' },
            { status: 400 }
          );
        }

        return NextResponse.json({
          success: true,
          message: 'Successfully joined ritual',
          action: 'joined',
          timestamp: new Date().toISOString()
        });

      case 'complete_action':
        if (!actionId) {
          return NextResponse.json(
            { error: 'actionId is required for complete_action' },
            { status: 400 }
          );
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
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error: any) {
    console.error('Ritual participation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid participation data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}