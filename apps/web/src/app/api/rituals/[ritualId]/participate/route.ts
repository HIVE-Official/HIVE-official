import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase-admin';

import * as admin from 'firebase-admin';

// Enhanced ritual participation framework
const ritualFramework = {
  joinRitual: async (ritualId: string, userId: string, entryPoint: string): Promise<{ success: boolean; participationId?: string; error?: string }> => {
    try {
      // Check if ritual exists and is active
      const ritualDoc = await dbAdmin.collection('rituals').doc(ritualId).get();
      if (!ritualDoc.exists) {
        return { success: false, error: 'Ritual not found' };
      }

      const ritual = ritualDoc.data()!;
      if (ritual.status !== 'active' && ritual.status !== 'scheduled') {
        return { success: false, error: 'Ritual is not available for participation' };
      }

      // Check for existing participation
      const existingParticipationQuery = await dbAdmin.collection('ritual_participation')
        .where('ritualId', '==', ritualId)
        .where('userId', '==', userId)
        .where('campusId', '==', 'ub-buffalo') // Campus isolation
        .limit(1)
        .get();

      if (!existingParticipationQuery.empty) {
        const existing = existingParticipationQuery.docs[0].data();
        if (existing.status !== 'left') {
          return { success: true, participationId: existingParticipationQuery.docs[0].id };
        }
      }

      // Create new participation record
      const participationData = {
        ritualId,
        userId,
        status: 'joined',
        joinedAt: new Date(),
        progressPercentage: 0,
        actionsCompleted: [],
        milestonesReached: [],
        currentStreak: 0,
        longestStreak: 0,
        rewardsEarned: [],
        badgesAwarded: [],
        entryPoint,
        campusId: 'ub-buffalo', // Campus isolation
        metadata: {
          deviceType: 'web',
          userAgent: 'unknown'
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        lastActivityAt: new Date()
      };

      const participationRef = await dbAdmin.collection('ritual_participation').add(participationData);

      // Update ritual stats atomically
      await dbAdmin.collection('rituals').doc(ritualId).update({
        'stats.totalParticipants': admin.firestore.FieldValue.increment(1),
        'stats.activeParticipants': admin.firestore.FieldValue.increment(1),
        'stats.lastActivityAt': new Date(),
        updatedAt: new Date()
      });

      return { success: true, participationId: participationRef.id };
    } catch (err) {
      logger.error('Error joining ritual', { error: err instanceof Error ? err : new Error(String(err)), ritualId, userId });
      return { success: false, error: 'Failed to join ritual' };
    }
  },

  recordAction: async (ritualId: string, userId: string, actionId: string, metadata: any) => {
    try {
      // Get ritual data to validate action and calculate progress
      const ritualDoc = await dbAdmin.collection('rituals').doc(ritualId).get();
      if (!ritualDoc.exists) {
        throw new Error('Ritual not found');
      }

      const ritual = ritualDoc.data()!;
      const ritualAction = ritual.actions?.find((a: any) => a.id === actionId);

      if (!ritualAction) {
        throw new Error('Invalid action ID for this ritual');
      }

      // Get user's participation record
      const participationQuery = await dbAdmin.collection('ritual_participation')
        .where('ritualId', '==', ritualId)
        .where('userId', '==', userId)
        .where('campusId', '==', 'ub-buffalo') // Campus isolation
        .limit(1)
        .get();

      if (participationQuery.empty) {
        throw new Error('Must join ritual first');
      }

      const participationRef = participationQuery.docs[0].ref;
      const participationData = participationQuery.docs[0].data();

      // Check if action already completed (for non-repeatable actions)
      const completedActions = participationData.actionsCompleted || [];
      if (!ritualAction.maxOccurrences || ritualAction.maxOccurrences === 1) {
        if (completedActions.some((a: any) => a.actionId === actionId)) {
          throw new Error('Action already completed');
        }
      }

      // Record action completion with proper structure
      const actionCompletion = {
        actionId,
        completedAt: new Date(),
        weight: ritualAction.weight || 1,
        metadata: metadata || {}
      };

      // Also create separate action completion record for analytics
      await dbAdmin.collection('ritual_action_completions').add({
        ritualId,
        userId,
        actionId,
        completedAt: new Date(),
        weight: ritualAction.weight || 1,
        metadata: metadata || {},
        campusId: 'ub-buffalo'
      });

      const updatedActions = [...completedActions, actionCompletion];

      // Calculate new progress based on weighted actions
      const totalWeight = ritual.actions?.reduce((sum: number, action: any) => sum + (action.weight || 1), 0) || 1;
      const completedWeight = updatedActions.reduce((sum: number, action: any) => sum + action.weight, 0);
      const progressPercentage = Math.min(100, Math.round((completedWeight / totalWeight) * 100));

      // Update participation record
      const updateData: any = {
        actionsCompleted: updatedActions,
        progressPercentage,
        lastActivityAt: new Date(),
        updatedAt: new Date()
      };

      // Mark as completed if 100% progress
      if (progressPercentage === 100) {
        updateData.status = 'completed';
        updateData.completedAt = new Date();
      }

      await participationRef.update(updateData);

      // Update ritual stats if completed
      if (progressPercentage === 100) {
        await dbAdmin.collection('rituals').doc(ritualId).update({
          'stats.completedParticipants': admin.firestore.FieldValue.increment(1),
          'stats.lastActivityAt': new Date(),
          updatedAt: new Date()
        });
      }

      return {
        success: true,
        progress: {
          percentage: progressPercentage,
          actionsCompleted: updatedActions.length,
          totalActions: ritual.actions?.length || 0,
          isCompleted: progressPercentage === 100
        }
      };

    } catch (err) {
      logger.error('Error recording ritual action', { error: err instanceof Error ? err : new Error(String(err)), ritualId, userId, actionId });
      throw err;
    }
  },

  leaveRitual: async (ritualId: string, userId: string): Promise<boolean> => {
    try {
      // Find user's participation
      const participationQuery = await dbAdmin.collection('ritual_participation')
        .where('ritualId', '==', ritualId)
        .where('userId', '==', userId)
        .where('campusId', '==', 'ub-buffalo') // Campus isolation
        .limit(1)
        .get();

      if (participationQuery.empty) {
        return false; // Not participating
      }

      const participationRef = participationQuery.docs[0].ref;

      // Update participation status
      await participationRef.update({
        status: 'left',
        leftAt: new Date(),
        lastActivityAt: new Date(),
        updatedAt: new Date()
      });

      // Update ritual stats
      await dbAdmin.collection('rituals').doc(ritualId).update({
        'stats.activeParticipants': admin.firestore.FieldValue.increment(-1),
        'stats.lastActivityAt': new Date(),
        updatedAt: new Date()
      });

      return true;
    } catch (err) {
      logger.error('Error leaving ritual', { error: err instanceof Error ? err : new Error(String(err)), ritualId, userId });
      return false;
    }
  }
};
import { logger } from "@/lib/structured-logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import { withAuthAndErrors } from '@/lib/middleware/index';

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
export const POST = withAuthAndErrors(async (request, context, respond) => {
  try {
    const { params } = context;
    const { ritualId } = await params;
    const userId = context.userId;

    const body = await request.json();
    const { action, actionId, metadata = {}, entryPoint = 'direct' } = ParticipationActionSchema.parse(body);

    logger.info('🎭 Ritual participation: for ritualby user', {  ritualId, userId, endpoint: '/api/rituals/[ritualId]/participate'  });

    switch (action) {
      case 'join': {
        const joinResult = await ritualFramework.joinRitual(ritualId, userId, entryPoint);

        if (!joinResult.success) {
          return NextResponse.json(
            ApiResponseHelper.error(joinResult.error || "Unable to join ritual", "INVALID_INPUT"),
            { status: HttpStatus.BAD_REQUEST }
          );
        }

        return NextResponse.json({
          success: true,
          message: 'Successfully joined ritual',
          participation: {
            id: joinResult.participationId,
            ritualId,
            userId,
            status: 'joined',
            joinedAt: new Date().toISOString(),
            progressPercentage: 0
          },
          timestamp: new Date().toISOString()
        });
      }

      case 'complete_action': {
        if (!actionId) {
          return NextResponse.json(
            ApiResponseHelper.error("actionId is required for complete_action", "INVALID_INPUT"),
            { status: HttpStatus.BAD_REQUEST }
          );
        }

        try {
          const actionResult = await ritualFramework.recordAction(ritualId, userId, actionId, metadata);

          return NextResponse.json({
            success: true,
            message: 'Action completed successfully',
            action: 'action_completed',
            actionId,
            progress: actionResult.progress,
            timestamp: new Date().toISOString()
          });
        } catch (error: any) {
          return NextResponse.json(
            ApiResponseHelper.error(error.message || "Failed to complete action", "INVALID_INPUT"),
            { status: HttpStatus.BAD_REQUEST }
          );
        }
      }

      case 'leave': {
        const leaveSuccess = await ritualFramework.leaveRitual(ritualId, userId);

        if (!leaveSuccess) {
          return NextResponse.json(
            ApiResponseHelper.error("Not participating in this ritual or failed to leave", "INVALID_INPUT"),
            { status: HttpStatus.BAD_REQUEST }
          );
        }

        return NextResponse.json({
          success: true,
          message: 'Left ritual successfully',
          action: 'left',
          timestamp: new Date().toISOString()
        });
      }

      default:
        return NextResponse.json(
          ApiResponseHelper.error("Invalid action", "INVALID_INPUT"),
          { status: HttpStatus.BAD_REQUEST }
        );
    }

  } catch (error: any) {
    logger.error(
      `Ritual participation error at /api/rituals/[ritualId]/participate`,
      error instanceof Error ? error : new Error(String(error))
    );

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
});