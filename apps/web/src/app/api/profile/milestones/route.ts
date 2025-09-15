import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin as db, authAdmin as auth } from '@/lib/firebase/admin/firebase-admin';
import * as admin from 'firebase-admin';
import { z } from 'zod';
import { withAuth } from '@/lib/api/middleware/api-auth-middleware';

// Milestone schema
const milestoneSchema = z.object({
  type: z.enum(['academic', 'social', 'builder', 'platform', 'campus']),
  title: z.string(),
  description: z.string(),
  iconUrl: z.string().optional(),
  rarity: z.enum(['common', 'rare', 'epic', 'legendary']),
  progress: z.number().min(0).max(100),
  target: z.number(),
  unit: z.string(),
  isVisible: z.boolean().default(true)
});

// GET /api/profile/milestones - Get user's milestones and achievements
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    
    const searchParams = request.nextUrl.searchParams;
    const filter = searchParams.get('filter'); // 'all', 'completed', 'in-progress'
    const type = searchParams.get('type'); // 'academic', 'social', etc.
    
    // Build query
    let query = db.collection('userMilestones')
      .where('userId', '==', userId);
    
    if (filter === 'completed') {
      query = query.where('isCompleted', '==', true);
    } else if (filter === 'in-progress') {
      query = query.where('isCompleted', '==', false);
    }
    
    if (type) {
      query = query.where('type', '==', type);
    }
    
    // Get milestones
    const milestonesSnapshot = await query.orderBy('createdAt', 'desc').get();
    
    const milestones = milestonesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      earnedAt: doc.data().earnedAt?.toDate?.() || null,
      createdAt: doc.data().createdAt?.toDate?.() || null
    }));
    
    // Calculate statistics
    const stats = {
      total: milestones.length,
      completed: milestones.filter(m => m.isCompleted).length,
      inProgress: milestones.filter(m => !m.isCompleted).length,
      byType: {
        academic: milestones.filter(m => m.type === 'academic').length,
        social: milestones.filter(m => m.type === 'social').length,
        builder: milestones.filter(m => m.type === 'builder').length,
        platform: milestones.filter(m => m.type === 'platform').length,
        campus: milestones.filter(m => m.type === 'campus').length
      },
      byRarity: {
        common: milestones.filter(m => m.rarity === 'common').length,
        rare: milestones.filter(m => m.rarity === 'rare').length,
        epic: milestones.filter(m => m.rarity === 'epic').length,
        legendary: milestones.filter(m => m.rarity === 'legendary').length
      }
    };
    
    return NextResponse.json({
      milestones,
      stats,
      nextMilestone: findNextMilestone(milestones)
    });
    
  } catch (error) {
    console.error('Error fetching milestones:', error);
    return NextResponse.json(
      { error: 'Failed to fetch milestones' },
      { status: 500 }
    );
  }
}, { allowDevelopmentBypass: true });

// POST /api/profile/milestones - Create or update a milestone
export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    const body = await request.json();
    
    // Validate milestone data
    const milestoneData = milestoneSchema.parse(body);
    
    // Check for existing similar milestone
    const existingQuery = await db.collection('userMilestones')
      .where('userId', '==', userId)
      .where('title', '==', milestoneData.title)
      .get();
    
    if (!existingQuery.empty) {
      // Update existing milestone
      const existingId = existingQuery.docs[0].id;
      const updates = {
        ...milestoneData,
        updatedAt: admin.firestore.Timestamp.now(),
        isCompleted: milestoneData.progress >= milestoneData.target,
        earnedAt: milestoneData.progress >= milestoneData.target 
          ? admin.firestore.Timestamp.now() 
          : null
      };
      
      await db.collection('userMilestones').doc(existingId).update(updates);
      
      return NextResponse.json({
        success: true,
        milestoneId: existingId,
        isCompleted: updates.isCompleted
      });
    }
    
    // Create new milestone
    const newMilestone = {
      userId,
      ...milestoneData,
      isCompleted: milestoneData.progress >= milestoneData.target,
      earnedAt: milestoneData.progress >= milestoneData.target 
        ? admin.firestore.Timestamp.now() 
        : null,
      createdAt: admin.firestore.Timestamp.now()
    };
    
    const docRef = await db.collection('userMilestones').add(newMilestone);
    
    // If milestone was completed, track it
    if (newMilestone.isCompleted) {
      await trackMilestoneCompletion(userId, milestoneData);
    }
    
    return NextResponse.json({
      success: true,
      milestoneId: docRef.id,
      isCompleted: newMilestone.isCompleted
    });
    
  } catch (error) {
    console.error('Error creating milestone:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid milestone data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create milestone' },
      { status: 500 }
    );
  }
}, { allowDevelopmentBypass: true });

// PUT /api/profile/milestones/:id - Update milestone progress
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;
    
    const body = await request.json();
    const { progress } = body;
    
    if (typeof progress !== 'number' || progress < 0 || progress > 100) {
      return NextResponse.json(
        { error: 'Invalid progress value' },
        { status: 400 }
      );
    }
    
    // Get the milestone
    const milestoneDoc = await db.collection('userMilestones').doc((await params).id).get();
    
    if (!milestoneDoc.exists) {
      return NextResponse.json(
        { error: 'Milestone not found' },
        { status: 404 }
      );
    }
    
    const milestoneData = milestoneDoc.data();
    
    // Verify ownership
    if (milestoneData?.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    // Update progress
    const wasCompleted = milestoneData.isCompleted;
    const isNowCompleted = progress >= milestoneData.target;
    
    const updates = {
      progress,
      isCompleted: isNowCompleted,
      updatedAt: admin.firestore.Timestamp.now(),
      ...(isNowCompleted && !wasCompleted ? {
        earnedAt: admin.firestore.Timestamp.now()
      } : {})
    };
    
    await db.collection('userMilestones').doc((await params).id).update(updates);
    
    // Track completion if newly completed
    if (isNowCompleted && !wasCompleted) {
      await trackMilestoneCompletion(userId, milestoneData);
    }
    
    return NextResponse.json({
      success: true,
      isCompleted: isNowCompleted,
      progress
    });
    
  } catch (error) {
    console.error('Error updating milestone:', error);
    return NextResponse.json(
      { error: 'Failed to update milestone' },
      { status: 500 }
    );
  }
}

// Helper functions
function findNextMilestone(milestones: any[]) {
  const inProgress = milestones
    .filter(m => !m.isCompleted && m.progress > 0)
    .sort((a, b) => (b.progress / b.target) - (a.progress / a.target));
  
  if (inProgress.length > 0) {
    const next = inProgress[0];
    return {
      ...next,
      percentComplete: Math.round((next.progress / next.target) * 100),
      remaining: next.target - next.progress
    };
  }
  
  return null;
}

async function trackMilestoneCompletion(userId: string, milestone: any) {
  try {
    // Track in activity records
    await db.collection('activityRecords').add({
      userId,
      type: 'achievement',
      action: 'milestone_completed',
      metadata: {
        milestoneTitle: milestone.title,
        milestoneType: milestone.type,
        milestoneRarity: milestone.rarity
      },
      isPrivate: false,
      visibleTo: 'all',
      timestamp: admin.firestore.Timestamp.now()
    });
    
    // Update user stats
    await db.collection('users').doc(userId).update({
      'stats.achievementsEarned': admin.firestore.FieldValue.increment(1),
      [`stats.achievements.${milestone.type}`]: admin.firestore.FieldValue.increment(1)
    });
    
    // Send notification (would integrate with notification system)
    console.log(`Milestone completed: ${milestone.title} for user ${userId}`);
    
  } catch (error) {
    console.error('Error tracking milestone completion:', error);
  }
}

// Initialize default milestones for new users
async function initializeDefaultMilestones(userId: string) {
  const defaultMilestones = [
    {
      type: 'platform',
      title: 'First Steps',
      description: 'Complete your profile setup',
      rarity: 'common',
      progress: 0,
      target: 100,
      unit: '%'
    },
    {
      type: 'social',
      title: 'Community Member',
      description: 'Join your first space',
      rarity: 'common',
      progress: 0,
      target: 1,
      unit: 'space'
    },
    {
      type: 'social',
      title: 'Making Connections',
      description: 'Connect with 5 classmates',
      rarity: 'rare',
      progress: 0,
      target: 5,
      unit: 'connections'
    },
    {
      type: 'academic',
      title: 'Study Partner',
      description: 'Join or create a study group',
      rarity: 'common',
      progress: 0,
      target: 1,
      unit: 'group'
    },
    {
      type: 'campus',
      title: 'Campus Explorer',
      description: 'Discover 10 different spaces',
      rarity: 'rare',
      progress: 0,
      target: 10,
      unit: 'spaces'
    }
  ];
  
  for (const milestone of defaultMilestones) {
    await db.collection('userMilestones').add({
      userId,
      ...milestone,
      isCompleted: false,
      isVisible: true,
      createdAt: admin.firestore.Timestamp.now()
    });
  }
}