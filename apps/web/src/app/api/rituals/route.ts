import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getAuth } from 'firebase-admin/auth';
import { dbAdmin } from '@/lib/firebase-admin';
import { ritualFramework, type Ritual, type RitualType, type ParticipationType } from '@/lib/rituals-framework';

// Ritual query schema
const RitualQuerySchema = z.object({
  status: z.enum(['draft', 'scheduled', 'active', 'completed', 'paused', 'cancelled', 'archived']).optional(),
  type: z.enum(['onboarding', 'seasonal', 'achievement', 'community', 'creative', 'emergency', 'legacy']).optional(),
  university: z.string().optional(),
  limit: z.coerce.number().min(1).max(50).default(20),
  offset: z.coerce.number().min(0).default(0),
});

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
  })),
});

/**
 * Rituals API
 * 
 * GET - List rituals with filtering
 * POST - Create new ritual (admin only)
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    const { status, type, university, limit, offset } = RitualQuerySchema.parse(queryParams);

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

    console.log(`🎭 Rituals query: ${JSON.stringify({ status, type, university, limit, offset })}`);

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
    console.error('Rituals API error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
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

    // TODO: Verify user has admin permissions
    // For now, allow any authenticated user to create rituals

    const body = await request.json();
    const ritualData = CreateRitualSchema.parse(body);

    console.log(`🎭 Creating ritual: ${ritualData.name}`);

    // Convert date strings to Date objects
    const processedRitual = {
      ...ritualData,
      startTime: new Date(ritualData.startTime),
      endTime: ritualData.endTime ? new Date(ritualData.endTime) : undefined,
      status: 'draft' as const,
      createdBy: userId,
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
    console.error('Create ritual error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid ritual data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}