import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { dbAdmin } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { z } from 'zod';

// Activity event schema
const activityEventSchema = z.object({
  type: z.enum([
    'space_visit',
    'tool_interaction', 
    'content_creation',
    'social_interaction',
    'profile_update',
    'login',
    'logout'
  ]),
  spaceId: z.string().optional(),
  spaceName: z.string().optional(),
  toolId: z.string().optional(),
  toolName: z.string().optional(),
  contentId: z.string().optional(),
  contentType: z.string().optional(),
  duration: z.number().optional(), // in minutes
  metadata: z.record(z.any()).optional(),
});

// Activity query schema
const activityQuerySchema = z.object({
  timeRange: z.enum(['day', 'week', 'month', 'year']).default('week'),
  type: z.string().optional(),
  spaceId: z.string().optional(),
  limit: z.number().min(1).max(100).default(50),
  offset: z.number().min(0).default(0),
});

/**
 * Log user activity event
 * POST /api/profile/activity
 */
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const token = authHeader.split('Bearer ')[1];
    
    // Handle development mode tokens
    if (token.startsWith('dev_token_')) {
      const body = await request.json();
      const activityData = activityEventSchema.parse(body);
      
      console.log('Development mode activity logged:', activityData);
      
      return NextResponse.json({
        success: true,
        message: 'Activity logged successfully (development mode)',
        activity: activityData,
      });
    }
    
    // Verify the token
    const auth = getAuth();
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(token);
    } catch (authError) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const userId = decodedToken.uid;

    // Parse and validate the activity data
    const body = await request.json();
    const activityData = activityEventSchema.parse(body);

    // Check privacy settings to see if activity logging is allowed
    const privacyDoc = await dbAdmin.collection('privacySettings').doc(userId).get();
    const privacySettings = privacyDoc.data();
    
    if (privacySettings?.allowAnalytics === false) {
      return NextResponse.json({
        success: true,
        message: 'Activity logging disabled by user privacy settings',
      });
    }

    // Create activity event document
    const activityEvent = {
      userId,
      ...activityData,
      timestamp: FieldValue.serverTimestamp(),
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      createdAt: FieldValue.serverTimestamp(),
    };

    // Log the activity event
    const activityRef = await dbAdmin.collection('activityEvents').add(activityEvent);

    // Update daily activity summary
    await updateDailyActivitySummary(userId, activityData);

    // Update user's last active timestamp
    await dbAdmin.collection('users').doc(userId).update({
      lastActiveAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      message: 'Activity logged successfully',
      activityId: activityRef.id,
    });

  } catch (error) {
    console.error('Activity logging error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid activity data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to log activity' },
      { status: 500 }
    );
  }
}

/**
 * Get user activity history
 * GET /api/profile/activity
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const token = authHeader.split('Bearer ')[1];
    
    // Handle development mode tokens
    if (token.startsWith('dev_token_')) {
      const mockActivity = [
        {
          id: 'dev_activity_1',
          type: 'space_visit',
          spaceId: 'dev_space_1',
          spaceName: 'Development Space',
          timestamp: new Date().toISOString(),
          duration: 15,
        },
        {
          id: 'dev_activity_2',
          type: 'tool_interaction',
          toolId: 'dev_tool_1',
          toolName: 'Development Tool',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          duration: 30,
        },
      ];

      return NextResponse.json({
        success: true,
        activities: mockActivity,
        totalCount: mockActivity.length,
        developmentMode: true,
      });
    }
    
    // Verify the token
    const auth = getAuth();
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(token);
    } catch (authError) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const userId = decodedToken.uid;

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const queryParams = activityQuerySchema.parse({
      timeRange: searchParams.get('timeRange') || 'week',
      type: searchParams.get('type') || undefined,
      spaceId: searchParams.get('spaceId') || undefined,
      limit: parseInt(searchParams.get('limit') || '50'),
      offset: parseInt(searchParams.get('offset') || '0'),
    });

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    
    switch (queryParams.timeRange) {
      case 'day':
        startDate.setDate(endDate.getDate() - 1);
        break;
      case 'week':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
    }

    // Build query
    let query = dbAdmin
      .collection('activityEvents')
      .where('userId', '==', userId)
      .where('date', '>=', startDate.toISOString().split('T')[0])
      .where('date', '<=', endDate.toISOString().split('T')[0]);

    // Add filters
    if (queryParams.type) {
      query = query.where('type', '==', queryParams.type);
    }
    
    if (queryParams.spaceId) {
      query = query.where('spaceId', '==', queryParams.spaceId);
    }

    // Execute query with pagination
    query = query
      .orderBy('timestamp', 'desc')
      .limit(queryParams.limit)
      .offset(queryParams.offset);

    const activitiesSnapshot = await query.get();
    
    const activities = activitiesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Get total count for pagination
    const countQuery = dbAdmin
      .collection('activityEvents')
      .where('userId', '==', userId)
      .where('date', '>=', startDate.toISOString().split('T')[0])
      .where('date', '<=', endDate.toISOString().split('T')[0]);
    
    const countSnapshot = await countQuery.count().get();
    const totalCount = countSnapshot.data().count;

    return NextResponse.json({
      success: true,
      activities,
      totalCount,
      pagination: {
        limit: queryParams.limit,
        offset: queryParams.offset,
        hasMore: queryParams.offset + queryParams.limit < totalCount,
      },
      filters: queryParams,
    });

  } catch (error) {
    console.error('Activity fetch error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch activity' },
      { status: 500 }
    );
  }
}

/**
 * Update daily activity summary
 */
async function updateDailyActivitySummary(userId: string, activityData: any) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const summaryRef = dbAdmin.collection('activitySummaries').doc(`${userId}_${today}`);
    
    const summaryDoc = await summaryRef.get();
    
    if (!summaryDoc.exists) {
      // Create new daily summary
      await summaryRef.set({
        userId,
        date: today,
        totalTimeSpent: activityData.duration || 0,
        sessionCount: 1,
        spacesVisited: activityData.spaceId ? [activityData.spaceId] : [],
        toolsUsed: activityData.toolId ? [activityData.toolId] : [],
        contentCreated: activityData.type === 'content_creation' ? 1 : 0,
        socialInteractions: activityData.type === 'social_interaction' ? 1 : 0,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
    } else {
      // Update existing summary
      const existingData = summaryDoc.data();
      const updates: any = {
        updatedAt: FieldValue.serverTimestamp(),
      };
      
      if (activityData.duration) {
        updates.totalTimeSpent = (existingData?.totalTimeSpent || 0) + activityData.duration;
      }
      
      if (activityData.spaceId && !existingData?.spacesVisited?.includes(activityData.spaceId)) {
        updates.spacesVisited = [...(existingData?.spacesVisited || []), activityData.spaceId];
      }
      
      if (activityData.toolId && !existingData?.toolsUsed?.includes(activityData.toolId)) {
        updates.toolsUsed = [...(existingData?.toolsUsed || []), activityData.toolId];
      }
      
      if (activityData.type === 'content_creation') {
        updates.contentCreated = (existingData?.contentCreated || 0) + 1;
      }
      
      if (activityData.type === 'social_interaction') {
        updates.socialInteractions = (existingData?.socialInteractions || 0) + 1;
      }
      
      await summaryRef.update(updates);
    }
  } catch (error) {
    console.error('Error updating daily activity summary:', error);
    // Don't throw - activity logging should still succeed even if summary update fails
  }
}