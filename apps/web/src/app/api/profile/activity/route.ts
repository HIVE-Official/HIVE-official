import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { z } from 'zod';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus } from "@/lib/api/response-types/api-response-types";
import { withAuth } from '@/lib/api/middleware/api-auth-middleware';

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
  metadata: z.record(z.any()).optional() });

// Activity query schema
const activityQuerySchema = z.object({
  timeRange: z.enum(['day', 'week', 'month', 'year']).default('week'),
  type: z.string().optional(),
  spaceId: z.string().optional(),
  limit: z.number().min(1).max(100).default(50),
  offset: z.number().min(0).default(0) });

/**
 * Log user activity event
 * POST /api/profile/activity
 */
export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    
    // Handle development mode
    if (userId === 'test-user') {
      const body = await request.json();
      const activityData = activityEventSchema.parse(body);
      
      logger.info('Development mode activity logged', { data: activityData, endpoint: '/api/profile/activity' });
      
      return NextResponse.json({
        success: true,
        message: 'Activity logged successfully (development mode)',
        activity: activityData });
    }

    // Parse and validate the activity data
    const body = await request.json();
    const activityData = activityEventSchema.parse(body);

    // Check privacy settings to see if activity logging is allowed
    const privacyDoc = await dbAdmin.collection('privacySettings').doc(userId).get();
    const privacySettings = privacyDoc.data();
    
    if (privacySettings?.allowAnalytics === false) {
      return NextResponse.json({
        success: true,
        message: 'Activity logging disabled by user privacy settings' });
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
      lastActiveAt: FieldValue.serverTimestamp() });

    return NextResponse.json({
      success: true,
      message: 'Activity logged successfully',
      activityId: activityRef.id });

  } catch (error) {
    logger.error('Activity logging error', { error: error, endpoint: '/api/profile/activity' });
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid activity data', details: error.errors },
        { status: HttpStatus.BAD_REQUEST }
      );
    }
    
    return NextResponse.json(ApiResponseHelper.error("Failed to log activity", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { 
  allowDevelopmentBypass: true, // Activity logging is safe for development
  operation: 'log_user_activity' 
});

/**
 * Get user activity history
 * GET /api/profile/activity
 */
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    
    // Handle development mode
    if (userId === 'test-user') {
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
        // SECURITY: Development mode removed for production safety
      });
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const queryParams = activityQuerySchema.parse({
      timeRange: searchParams.get('timeRange') || 'week',
      type: searchParams.get('type') || undefined,
      spaceId: searchParams.get('spaceId') || undefined,
      limit: parseInt(searchParams.get('limit') || '50'),
      offset: parseInt(searchParams.get('offset') || '0') });

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
      filters: queryParams });

  } catch (error) {
    logger.error('Activity fetch error', { error: error, endpoint: '/api/profile/activity' });
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.errors },
        { status: HttpStatus.BAD_REQUEST }
      );
    }
    
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch activity", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { 
  allowDevelopmentBypass: true, // Activity history viewing is safe for development
  operation: 'get_user_activity' 
});

interface ActivityData {
  type: string;
  spaceId?: string;
  toolId?: string;
  duration?: number;
}

/**
 * Update daily activity summary
 */
async function updateDailyActivitySummary(userId: string, activityData: ActivityData) {
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
        updatedAt: FieldValue.serverTimestamp() });
    } else {
      // Update existing summary
      const existingData = summaryDoc.data();
      const updates: Record<string, unknown> = {
        updatedAt: FieldValue.serverTimestamp(),
      };
      
      if (activityData.duration) {
        updates.totalTimeSpent = ((existingData?.totalTimeSpent as number) || 0) + activityData.duration;
      }
      
      if (activityData.spaceId && !(existingData?.spacesVisited as string[] || []).includes(activityData.spaceId)) {
        updates.spacesVisited = [...((existingData?.spacesVisited as string[]) || []), activityData.spaceId];
      }
      
      if (activityData.toolId && !(existingData?.toolsUsed as string[] || []).includes(activityData.toolId)) {
        updates.toolsUsed = [...((existingData?.toolsUsed as string[]) || []), activityData.toolId];
      }
      
      if (activityData.type === 'content_creation') {
        updates.contentCreated = ((existingData?.contentCreated as number) || 0) + 1;
      }
      
      if (activityData.type === 'social_interaction') {
        updates.socialInteractions = ((existingData?.socialInteractions as number) || 0) + 1;
      }
      
      await summaryRef.update(updates);
    }
  } catch (error) {
    logger.error('Error updating daily activity summary', { error: error, endpoint: '/api/profile/activity' });
    // Don't throw - activity logging should still succeed even if summary update fails
  }
}