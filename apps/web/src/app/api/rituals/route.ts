import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase-admin';
// Temporary ritual types for development
interface Ritual {
  id: string;
  name: string;
  title: string;
  description: string;
  type: RitualType;
  status: string;
  startTime: Date;
  endTime?: Date;
}

type RitualType = 'onboarding' | 'seasonal' | 'achievement' | 'community' | 'creative' | 'emergency' | 'legacy';
type ParticipationType = 'individual' | 'collective' | 'progressive' | 'competitive' | 'collaborative' | 'creative' | 'social';

// Mock ritual framework for development
const ritualFramework = {
  createRitual: async (ritual: any): Promise<string> => {
    return `ritual_${Date.now()}`;
  }
};
import { logger } from "@/lib/structured-logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import { withAuth, ApiResponse } from '@/lib/api-auth-middleware';

// Ritual query schema
const RitualQuerySchema = z.object({
  status: z.enum(['draft', 'scheduled', 'active', 'completed', 'paused', 'cancelled', 'archived']).optional(),
  type: z.enum(['onboarding', 'seasonal', 'achievement', 'community', 'creative', 'emergency', 'legacy']).optional(),
  university: z.string().optional(),
  limit: z.coerce.number().min(1).max(50).default(20),
  offset: z.coerce.number().min(0).default(0) });

// Create ritual schema
const CreateRitualSchema = z.object({
  name: z.string().min(1).max(100),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  tagline: z.string().min(1).max(150),
  type: z.enum(['onboarding', 'seasonal', 'achievement', 'community', 'creative', 'emergency', 'legacy']),
  category: z.string().min(1).max(50),
  tags: z.array(z.string()).max(10),
  startTime: z.string().datetime(),
  endTime: z.string().datetime().optional(),
  duration: z.number().min(1).max(10080).optional(), // Max 1 week in minutes
  timezone: z.string().default('America/New_York'),
  universities: z.array(z.string()).min(1),
  isGlobal: z.boolean().default(false),
  participationType: z.enum(['individual', 'collective', 'progressive', 'competitive', 'collaborative', 'creative', 'social']),
  maxParticipants: z.number().positive().optional(),
  minParticipants: z.number().positive().optional(),
  requiresInvitation: z.boolean().default(false),
  prerequisites: z.object({
    minSpaceMemberships: z.number().min(0).optional(),
    requiredFeatures: z.array(z.string()).optional(),
    completedRituals: z.array(z.string()).optional(),
    accountAge: z.number().min(0).optional(),
    academicStatus: z.array(z.string()).optional(),
  }).optional(),
  actions: z.array(z.object({
    id: z.string(),
    type: z.enum(['post', 'join_space', 'create_tool', 'interact', 'vote', 'share', 'comment', 'attend']),
    name: z.string(),
    description: z.string(),
    isRequired: z.boolean(),
    weight: z.number().min(0).max(100),
    maxOccurrences: z.number().positive().optional(),
    timeLimit: z.number().positive().optional(),
    validationRules: z.object({
      minLength: z.number().positive().optional(),
      requiresMedia: z.boolean().optional(),
      mustMentionUsers: z.boolean().optional(),
      bannedWords: z.array(z.string()).optional(),
    }).optional(),
  })),
  milestones: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    participantThreshold: z.number().min(1),
    progressThreshold: z.number().min(0).max(100),
    timeThreshold: z.string().datetime().optional(),
    unlocks: z.array(z.string()).optional(),
    celebration: z.object({
      message: z.string(),
      animation: z.string().optional(),
      badgeAwarded: z.string().optional(),
    }).optional(),
  })),
  rewards: z.array(z.object({
    id: z.string(),
    type: z.enum(['badge', 'feature', 'access', 'recognition', 'tool', 'customization']),
    name: z.string(),
    description: z.string(),
    requiresCompletion: z.boolean(),
    minimumParticipation: z.number().min(0).max(100),
    rarity: z.enum(['common', 'uncommon', 'rare', 'epic', 'legendary']),
    isTimeLimited: z.boolean(),
    expiresAt: z.string().datetime().optional(),
    unlockScope: z.enum(['user', 'space', 'campus', 'platform']),
  })),
  featureUnlocks: z.array(z.object({
    id: z.string(),
    featureId: z.string(),
    name: z.string(),
    description: z.string(),
    participationThreshold: z.number().min(0).max(100),
    scope: z.enum(['user', 'space', 'campus', 'platform']),
    isReversible: z.boolean(),
    unlockDelay: z.number().min(0).optional(),
    announceDelay: z.number().min(0).optional(),
  })) });

/**
 * Rituals API
 * 
 * GET - List rituals with filtering
 * POST - Create new ritual (admin only)
 */
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    const { status, type, university, limit, offset } = RitualQuerySchema.parse(queryParams);

    const userId = authContext.userId;

    logger.info('🎭 Rituals query', { queryParams: JSON.stringify({ status, type, university, limit, offset }), endpoint: '/api/rituals' });

    // For development mode, return mock ritual data
    if ((userId === 'test-user' || userId === 'dev_user_123') && process.env.NODE_ENV !== 'production') {
      const mockRituals = [
        {
          id: 'focus_ritual_1',
          name: 'Focus Flow',
          title: 'Daily Focus Session',
          description: 'A structured 25-minute focus session to help you maintain concentration and productivity throughout your day.',
          tagline: 'Stay focused, stay productive',
          type: 'community' as const,
          category: 'productivity',
          tags: ['focus', 'pomodoro', 'productivity', 'habits'],
          status: 'active' as const,
          startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // Started a week ago
          endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Ends in 30 days
          duration: 25, // 25 minutes
          timezone: 'America/New_York',
          universities: ['university_buffalo'],
          isGlobal: false,
          participationType: 'individual' as const,
          maxParticipants: 100,
          requiresInvitation: false,
          totalParticipants: 42,
          activeParticipants: 28,
          completionRate: 0.73,
          userParticipation: {
            id: 'user_participation_1',
            status: 'active',
            joinedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            sessionsCompleted: 12,
            currentStreak: 3,
            longestStreak: 7,
            lastSessionAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            progressPercentage: 85
          },
          milestones: [
            {
              id: 'milestone_1',
              name: 'First Focus',
              description: 'Complete your first focus session',
              progressThreshold: 1,
              isReached: true,
              reachedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              id: 'milestone_2',
              name: 'Focus Streak',
              description: 'Complete 5 consecutive days of focus sessions',
              progressThreshold: 5,
              isReached: true,
              reachedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              id: 'milestone_3',
              name: 'Focus Master',
              description: 'Complete 20 focus sessions',
              progressThreshold: 20,
              isReached: false,
              progress: 12
            }
          ],
          actions: [
            {
              id: 'focus_session',
              type: 'interact' as const,
              name: 'Complete Focus Session',
              description: 'Complete a 25-minute focused work session',
              isRequired: true,
              weight: 100,
              maxOccurrences: 3, // Up to 3 sessions per day
              timeLimit: 25 * 60 * 1000 // 25 minutes in milliseconds
            }
          ],
          rewards: [
            {
              id: 'focus_badge',
              type: 'badge' as const,
              name: 'Focus Champion',
              description: 'Awarded for consistent focus session completion',
              rarity: 'common' as const,
              isUnlocked: true
            },
            {
              id: 'productivity_feature',
              type: 'feature' as const,
              name: 'Advanced Timer',
              description: 'Unlock advanced pomodoro timer features',
              rarity: 'uncommon' as const,
              isUnlocked: false
            }
          ]
        },
        {
          id: 'study_ritual_2',
          name: 'Study Squad',
          title: 'Collaborative Study Sessions',
          description: 'Join your classmates for structured study sessions and knowledge sharing.',
          tagline: 'Study together, succeed together',
          type: 'community' as const,
          category: 'academic',
          tags: ['study', 'collaboration', 'academic', 'groups'],
          status: 'scheduled' as const,
          startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Starts tomorrow
          endTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // Ends in 2 weeks
          duration: 90, // 90 minutes
          timezone: 'America/New_York',
          universities: ['university_buffalo'],
          isGlobal: false,
          participationType: 'collaborative' as const,
          maxParticipants: 50,
          requiresInvitation: false,
          totalParticipants: 24,
          activeParticipants: 0, // Not started yet
          completionRate: 0,
          userParticipation: {
            id: 'user_participation_2',
            status: 'registered',
            joinedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            sessionsCompleted: 0,
            currentStreak: 0,
            longestStreak: 0,
            progressPercentage: 0
          },
          milestones: [
            {
              id: 'study_milestone_1',
              name: 'Study Squad Member',
              description: 'Join your first collaborative study session',
              progressThreshold: 1,
              isReached: false,
              progress: 0
            }
          ]
        }
      ];

      // Filter based on query parameters
      let filteredRituals = mockRituals;
      
      if (status) {
        filteredRituals = filteredRituals.filter(ritual => ritual.status === status);
      }
      
      if (type) {
        filteredRituals = filteredRituals.filter(ritual => ritual.type === type);
      }

      // For current ritual query (used by widget), return active ritual
      const currentRitual = filteredRituals.find(r => r.userParticipation?.status === 'active') || null;

      logger.info('✅ Development mode: Returning mock rituals data', { 
        ritualCount: filteredRituals.length,
        currentRitual: currentRitual?.name,
        endpoint: '/api/rituals' 
      });

      return NextResponse.json({
        success: true,
        rituals: filteredRituals,
        currentRitual,
        pagination: {
          limit,
          offset,
          total: filteredRituals.length,
          hasMore: false
        },
        filters: {
          status,
          type,
          university
        },
        // SECURITY: Development mode removed for production safety
      });
    }

    // Build query
    let query = dbAdmin.collection('rituals').orderBy('createdAt', 'desc');

    if (status) {
      query = query.where('status', '==', status);
    }

    if (type) {
      query = query.where('type', '==', type);
    }

    if (university) {
      query = query.where('universities', 'array-contains', university);
    }

    // Apply pagination
    query = query.limit(limit).offset(offset);

    const snapshot = await query.get();
    
    const rituals = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      startTime: doc.data().startTime?.toDate?.()?.toISOString() || doc.data().startTime,
      endTime: doc.data().endTime?.toDate?.()?.toISOString() || doc.data().endTime,
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt,
    }));

    // Get user's participation status for each ritual
    const ritualsWithParticipation = await Promise.all(
      rituals.map(async (ritual) => {
        const participationSnapshot = await dbAdmin.collection('ritual_participation')
          .where('ritualId', '==', ritual.id)
          .where('userId', '==', userId)
          .limit(1)
          .get();

        const participation = participationSnapshot.empty 
          ? null 
          : { id: participationSnapshot.docs[0].id, ...participationSnapshot.docs[0].data() };

        return {
          ...ritual,
          userParticipation: participation
        };
      })
    );

    return NextResponse.json({
      success: true,
      rituals: ritualsWithParticipation,
      pagination: {
        limit,
        offset,
        total: rituals.length,
        hasMore: rituals.length === limit
      },
      filters: {
        status,
        type,
        university
      }
    });

  } catch (error: any) {
    logger.error('Rituals API error', { error: error, endpoint: '/api/rituals' });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.errors },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(ApiResponseHelper.error("Internal server error", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { 
  allowDevelopmentBypass: true, // Ritual browsing is safe for development
  operation: 'get_rituals' 
});

export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;

    // TODO: Verify user has admin permissions
    // For now, allow any authenticated user to create rituals

    const body = await request.json();
    const ritualData = CreateRitualSchema.parse(body);

    logger.info('🎭 Creating ritual', { ritualDataName: ritualData.name, endpoint: '/api/rituals'  });

    // Convert date strings to Date objects
    const processedRitual = {
      ...ritualData,
      startTime: new Date(ritualData.startTime),
      endTime: ritualData.endTime ? new Date(ritualData.endTime) : undefined,
      status: 'draft' as const,
      createdBy: userId,
      timezone: 'America/New_York', // Default timezone
      category: ritualData.category || 'general',
      tags: ritualData.tags || [],
      universities: ritualData.universities || ['buffalo'],
      isGlobal: ritualData.isGlobal || false,
      requiresInvitation: ritualData.requiresInvitation || false,
      prerequisites: ritualData.prerequisites || {},
      featureUnlocks: ritualData.featureUnlocks || [],
      metrics: {
        participationRate: 0,
        completionRate: 0,
        engagementScore: 0,
        socialImpact: 0
      },
      actions: ritualData.actions.map(action => ({
        ...action,
        validationRules: action.validationRules || {}
      })),
      milestones: ritualData.milestones.map(milestone => ({
        ...milestone,
        timeThreshold: milestone.timeThreshold ? new Date(milestone.timeThreshold) : undefined,
        isReached: false,
      })),
      rewards: ritualData.rewards.map(reward => ({
        ...reward,
        expiresAt: reward.expiresAt ? new Date(reward.expiresAt) : undefined,
      })),
    };

    // Create ritual using framework
    const ritualId = await ritualFramework.createRitual(processedRitual);

    return NextResponse.json({
      success: true,
      ritualId,
      message: 'Ritual created successfully',
      ritual: {
        id: ritualId,
        ...processedRitual,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1
      }
    });

  } catch (error: any) {
    logger.error('Create ritual error', { error: error, endpoint: '/api/rituals' });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid ritual data', details: error.errors },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, { 
  allowDevelopmentBypass: false, // Ritual creation is sensitive - require real auth
  operation: 'create_ritual' 
});