import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from "@/lib/structured-logger";
import { ApiResponseHelper, HttpStatus } from "@/lib/api-response-types";
import { withAuthAndErrors } from '@/lib/middleware/index';

/**
 * Get Ritual Detail API
 * 
 * GET - Get detailed ritual information including user participation
 */
export const GET = withAuthAndErrors(async (request, context, respond) => {
  try {
    const userId = context.userId;
    const { params } = context;
    const ritualId = params?.ritualId as string;

    if (!ritualId) {
      return NextResponse.json(
        ApiResponseHelper.error("Ritual ID is required", "MISSING_RITUAL_ID"),
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    logger.info('🎭 Fetching ritual detail', { 
      userId, 
      ritualId, 
      endpoint: `/api/rituals/${ritualId}` 
    });

    // For development mode, return mock data
    if ((userId === 'test-user' || userId === 'dev_user_123') && process.env.NODE_ENV !== 'production') {
      // Mock ritual data based on ID
      const mockRituals: Record<string, any> = {
        'welcome-week-2024': {
          id: 'welcome-week-2024',
          name: 'welcome-week-2024',
          title: 'Welcome Week: Find Your Hive',
          description: 'Connect with your campus community through shared experiences. Join spaces, meet people, and discover what makes your university unique.',
          tagline: 'Your campus journey begins here',
          type: 'onboarding',
          status: 'active',
          startTime: new Date().toISOString(),
          endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          duration: 10080,
          participationType: 'individual',
          universities: ['buffalo'],
          isGlobal: false,
          metrics: {
            participationRate: 67,
            completionRate: 34,
            engagementScore: 82,
            socialImpact: 76
          },
          actions: [
            {
              id: 'join-first-space',
              type: 'join_space',
              name: 'Join Your First Space',
              description: 'Find and join a space that matches your interests or academic needs',
              isRequired: true,
              weight: 30,
              maxOccurrences: 1
            },
            {
              id: 'create-profile',
              type: 'interact',
              name: 'Complete Your Profile',
              description: 'Add your photo, bio, and interests to help others connect with you',
              isRequired: true,
              weight: 25,
              maxOccurrences: 1
            },
            {
              id: 'make-first-post',
              type: 'post',
              name: 'Share Your First Post',
              description: 'Introduce yourself to the campus community',
              isRequired: false,
              weight: 20,
              maxOccurrences: 1
            },
            {
              id: 'connect-with-peers',
              type: 'interact',
              name: 'Connect with 3 Peers',
              description: 'Like, comment, or message other students to start building connections',
              isRequired: false,
              weight: 25,
              maxOccurrences: 3
            }
          ],
          milestones: [
            {
              id: 'first-steps',
              name: 'First Steps',
              description: 'Complete your profile and join your first space',
              participantThreshold: 1,
              progressThreshold: 55,
              isReached: true,
              reachedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              id: 'community-member',
              name: 'Community Member',
              description: 'Make meaningful connections with your peers',
              participantThreshold: 1,
              progressThreshold: 80,
              isReached: false
            },
            {
              id: 'hive-ambassador',
              name: 'HIVE Ambassador',
              description: 'Complete all welcome week activities',
              participantThreshold: 1,
              progressThreshold: 100,
              isReached: false
            }
          ],
          rewards: [
            {
              id: 'welcome-badge',
              type: 'badge',
              name: 'Welcome Week Champion',
              description: 'Completed the welcome week ritual',
              rarity: 'common',
              isTimeLimited: false
            },
            {
              id: 'early-access',
              type: 'feature',
              name: 'Early Access Features',
              description: 'Get early access to new HIVE features',
              rarity: 'rare',
              isTimeLimited: true,
              expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            }
          ],
          userParticipation: {
            id: 'part-1',
            status: 'active',
            joinedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            progressPercentage: 55,
            actionsCompleted: ['join-first-space', 'create-profile'],
            rewardsEarned: [],
            badgesAwarded: []
          }
        },
        'midterm-motivation': {
          id: 'midterm-motivation',
          name: 'midterm-motivation',
          title: 'Midterm Motivation Challenge',
          description: 'Campus-wide study support ritual. Share study strategies, form study groups, and motivate each other through midterm season.',
          tagline: 'Stronger together during midterms',
          type: 'seasonal',
          status: 'active',
          startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          endTime: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
          duration: 20160,
          participationType: 'collaborative',
          universities: ['buffalo'],
          isGlobal: false,
          metrics: {
            participationRate: 43,
            completionRate: 12,
            engagementScore: 91,
            socialImpact: 88
          },
          actions: [
            {
              id: 'share-study-tip',
              type: 'post',
              name: 'Share a Study Strategy',
              description: 'Post a study tip, technique, or resource that has helped you',
              isRequired: true,
              weight: 25,
              maxOccurrences: 3
            },
            {
              id: 'join-study-group',
              type: 'join_space',
              name: 'Join a Study Group',
              description: 'Find or create a study group for your courses',
              isRequired: true,
              weight: 30,
              maxOccurrences: 1
            },
            {
              id: 'encourage-peer',
              type: 'interact',
              name: 'Encourage a Peer',
              description: 'Leave supportive comments on others\' posts or offer study help',
              isRequired: false,
              weight: 20,
              maxOccurrences: 5
            },
            {
              id: 'attend-study-session',
              type: 'attend',
              name: 'Attend Group Study Session',
              description: 'Participate in a scheduled group study session',
              isRequired: false,
              weight: 25,
              maxOccurrences: 1
            }
          ],
          milestones: [
            {
              id: 'study-buddy',
              name: 'Study Buddy',
              description: 'Share your first study tip and join a group',
              participantThreshold: 1,
              progressThreshold: 55,
              isReached: true,
              reachedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              id: 'motivation-master',
              name: 'Motivation Master',
              description: 'Help motivate others and build study connections',
              participantThreshold: 1,
              progressThreshold: 80,
              isReached: false
            }
          ],
          rewards: [
            {
              id: 'midterm-warrior',
              type: 'badge',
              name: 'Midterm Warrior',
              description: 'Survived midterm season with community support',
              rarity: 'uncommon',
              isTimeLimited: false
            }
          ],
          userParticipation: {
            id: 'part-2',
            status: 'active',
            joinedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            progressPercentage: 78,
            actionsCompleted: ['share-study-tip', 'join-study-group', 'encourage-peer'],
            rewardsEarned: ['study-buddy'],
            badgesAwarded: []
          }
        }
      };

      const ritual = mockRituals[ritualId];
      
      if (!ritual) {
        return NextResponse.json(
          ApiResponseHelper.error("Ritual not found", "RITUAL_NOT_FOUND"),
          { status: HttpStatus.NOT_FOUND }
        );
      }

      logger.info('✅ Development mode: Returning mock ritual detail', { 
        ritualId, 
        ritualTitle: ritual.title,
        endpoint: `/api/rituals/${ritualId}` 
      });

      return NextResponse.json({
        success: true,
        ritual,
        // SECURITY: Development mode removed for production safety
      });
    }

    // Production implementation
    const ritualDoc = await dbAdmin.collection('rituals').doc(ritualId).get();
    
    if (!ritualDoc.exists) {
      return NextResponse.json(
        ApiResponseHelper.error("Ritual not found", "RITUAL_NOT_FOUND"),
        { status: HttpStatus.NOT_FOUND }
      );
    }

    const ritualData = ritualDoc.data();
    const ritual = {
      id: ritualDoc.id,
      ...ritualData,
      startTime: ritualData?.startTime?.toDate?.()?.toISOString() || ritualData?.startTime,
      endTime: ritualData?.endTime?.toDate?.()?.toISOString() || ritualData?.endTime,
      createdAt: ritualData?.createdAt?.toDate?.()?.toISOString() || ritualData?.createdAt,
      updatedAt: ritualData?.updatedAt?.toDate?.()?.toISOString() || ritualData?.updatedAt,
    };

    // Get user's participation status
    const participationSnapshot = await dbAdmin.collection('ritual_participation')
      .where('ritualId', '==', ritualId)
      .where('userId', '==', userId)
      .limit(1)
      .get();

    const userParticipation = participationSnapshot.empty 
      ? null 
      : {
          id: participationSnapshot.docs[0].id,
          ...participationSnapshot.docs[0].data(),
          joinedAt: participationSnapshot.docs[0].data().joinedAt?.toDate?.()?.toISOString() || participationSnapshot.docs[0].data().joinedAt,
          completedAt: participationSnapshot.docs[0].data().completedAt?.toDate?.()?.toISOString() || participationSnapshot.docs[0].data().completedAt,
          lastActiveAt: participationSnapshot.docs[0].data().lastActiveAt?.toDate?.()?.toISOString() || participationSnapshot.docs[0].data().lastActiveAt,
        };

    logger.info('✅ Successfully fetched ritual detail', { 
      ritualId, 
      hasParticipation: !!userParticipation,
      endpoint: `/api/rituals/${ritualId}` 
    });

    return NextResponse.json({
      success: true,
      ritual: {
        ...ritual,
        userParticipation
      }
    });

  } catch (error: any) {
    logger.error('Get ritual detail error', {
      error: error instanceof Error ? error.message : String(error),
      ritualId: params?.ritualId,
      endpoint: `/api/rituals/${params?.ritualId}`
    });

    return NextResponse.json(
      ApiResponseHelper.error("Internal server error", "INTERNAL_ERROR"),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
});