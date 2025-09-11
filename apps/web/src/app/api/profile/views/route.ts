import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus } from '@/lib/api-response-types';
import { withAuth } from '@/lib/api-auth-middleware';

// View tracking schema - minimal data for cost optimization
const trackViewSchema = z.object({
  viewedUserId: z.string().min(1, "Viewed user ID is required"),
  context: z.enum(['search', 'space', 'direct_link', 'recommendation', 'profile_card']),
  spaceId: z.string().optional(),
  anonymous: z.boolean().default(false) // Viewer is in ghost mode
});

// In-memory batch storage to reduce Firestore writes
// In production, this would be Redis or similar
const viewBatch = new Map<string, {
  viewerId: string;
  viewedUserId: string;
  context: string;
  spaceId?: string;
  timestamp: Date;
  anonymous: boolean;
}[]>();

const BATCH_INTERVAL = 30000; // 30 seconds - batch writes to save money
const MAX_BATCH_SIZE = 50; // Max views per batch

/**
 * Track profile view - batched writes for cost optimization
 * POST /api/profile/views
 */
export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    const body = await request.json();
    const viewData = trackViewSchema.parse(body);

    // Privacy check: Don't track self-views
    if (userId === viewData.viewedUserId) {
      return NextResponse.json({
        success: true,
        message: 'Self-view ignored'
      });
    }

    // Privacy check: Get viewer's privacy settings
    const viewerPrivacyDoc = await dbAdmin
      .collection('privacySettings')
      .doc(userId)
      .get();

    const viewerPrivacy = viewerPrivacyDoc.exists ? viewerPrivacyDoc.data() : null;
    const viewerInGhostMode = viewerPrivacy?.ghostMode?.enabled || viewData.anonymous;

    // Privacy check: Get viewed user's privacy settings
    const viewedUserPrivacyDoc = await dbAdmin
      .collection('privacySettings')
      .doc(viewData.viewedUserId)
      .get();

    const viewedUserPrivacy = viewedUserPrivacyDoc.exists ? viewedUserPrivacyDoc.data() : null;
    const allowsViewTracking = viewedUserPrivacy?.allowAnalytics !== false;

    // Respect privacy: Only track if viewed user allows it
    if (!allowsViewTracking) {
      return NextResponse.json({
        success: true,
        message: 'View not tracked due to privacy settings'
      });
    }

    // Add to batch for cost-efficient writing
    const batchKey = `${viewData.viewedUserId}-${Math.floor(Date.now() / BATCH_INTERVAL)}`;
    if (!viewBatch.has(batchKey)) {
      viewBatch.set(batchKey, []);
    }

    const batch = viewBatch.get(batchKey)!;
    
    // Deduplication: Prevent spam views from same user
    const existingView = batch.find(v => 
      v.viewerId === userId && 
      v.viewedUserId === viewData.viewedUserId &&
      Date.now() - v.timestamp.getTime() < 300000 // 5 minutes
    );

    if (existingView) {
      return NextResponse.json({
        success: true,
        message: 'Duplicate view ignored'
      });
    }

    // Add to batch
    batch.push({
      viewerId: viewerInGhostMode ? 'anonymous' : userId,
      viewedUserId: viewData.viewedUserId,
      context: viewData.context,
      spaceId: viewData.spaceId,
      timestamp: new Date(),
      anonymous: viewerInGhostMode
    });

    // If batch is full, flush immediately
    if (batch.length >= MAX_BATCH_SIZE) {
      await flushViewBatch(batchKey, batch);
      viewBatch.delete(batchKey);
    }

    return NextResponse.json({
      success: true,
      message: 'View tracked',
      batched: true
    });

  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid view data',
          details: error.errors
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    logger.error('Error tracking profile view', {
      error: error instanceof Error ? error.message : 'Unknown error',
      endpoint: '/api/profile/views'
    });

    return NextResponse.json(
      ApiResponseHelper.error('Failed to track view', 'INTERNAL_ERROR'),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, {
  operation: 'track_profile_view'
});

/**
 * Get profile view analytics - cost-optimized queries
 * GET /api/profile/views
 */
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || 'week';
    const includeViewers = searchParams.get('includeViewers') === 'true';

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    
    switch (timeRange) {
      case 'day':
        startDate.setDate(endDate.getDate() - 1);
        break;
      case 'week':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      default:
        startDate.setDate(endDate.getDate() - 7);
    }

    // Cost-optimized: Use daily aggregates instead of raw views
    const aggregatesSnapshot = await dbAdmin
      .collection('profile_view_stats')
      .where('viewedUserId', '==', userId)
      .where('date', '>=', startDate.toISOString().split('T')[0])
      .where('date', '<=', endDate.toISOString().split('T')[0])
      .orderBy('date', 'desc')
      .limit(31) // Max 1 month
      .get();

    const dailyStats = aggregatesSnapshot.docs.map(doc => doc.data());
    const totalViews = dailyStats.reduce((sum, day) => sum + (day.viewCount || 0), 0);
    const uniqueViewers = dailyStats.reduce((sum, day) => sum + (day.uniqueViewers || 0), 0);

    // Context breakdown
    const contextBreakdown = dailyStats.reduce((acc, day) => {
      Object.entries(day.contextBreakdown || {}).forEach(([context, count]) => {
        acc[context] = (acc[context] || 0) + (count as number);
      });
      return acc;
    }, {} as Record<string, number>);

    const analytics = {
      summary: {
        totalViews,
        uniqueViewers,
        averageViewsPerDay: dailyStats.length > 0 ? Math.round(totalViews / dailyStats.length) : 0,
        timeRange
      },
      trends: {
        daily: dailyStats.map(day => ({
          date: day.date,
          views: day.viewCount || 0,
          uniqueViewers: day.uniqueViewers || 0
        }))
      },
      contexts: contextBreakdown,
      recentViewers: [] // Only include if privacy allows and requested
    };

    // Privacy-respecting recent viewers (only if requested and privacy allows)
    if (includeViewers) {
      // Check user's privacy settings
      const userPrivacyDoc = await dbAdmin.collection('privacySettings').doc(userId).get();
      const userPrivacy = userPrivacyDoc.exists ? userPrivacyDoc.data() : null;
      
      if (userPrivacy?.showViewers !== false) {
        // Get recent non-anonymous views (limited for cost)
        const recentViewsSnapshot = await dbAdmin
          .collection('profile_views')
          .where('viewedUserId', '==', userId)
          .where('anonymous', '==', false)
          .where('timestamp', '>=', startDate)
          .orderBy('timestamp', 'desc')
          .limit(10) // Limit for cost control
          .get();

        analytics.recentViewers = recentViewsSnapshot.docs.map(doc => {
          const viewData = doc.data();
          return {
            viewerId: viewData.viewerId,
            timestamp: viewData.timestamp?.toDate ? timestamp.toDate() : new Date(timestamp).toISOString(),
            context: viewData.context
          };
        });
      }
    }

    return NextResponse.json({
      success: true,
      analytics
    });

  } catch (error: unknown) {
    logger.error('Error fetching view analytics', {
      error: error instanceof Error ? error.message : 'Unknown error',
      endpoint: '/api/profile/views'
    });

    return NextResponse.json(
      ApiResponseHelper.error('Failed to fetch view analytics', 'INTERNAL_ERROR'),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, {
  operation: 'get_view_analytics'
});

/**
 * Flush view batch to Firestore - cost-optimized batch writes
 */
async function flushViewBatch(batchKey: string, views: any[]) {
  try {
    const batch = dbAdmin.batch();
    const today = new Date().toISOString().split('T')[0];

    // Group views by viewed user for aggregation
    const userViews = views.reduce((acc, view) => {
      if (!acc[view.viewedUserId]) {
        acc[view.viewedUserId] = {
          total: 0,
          unique: new Set(),
          contexts: {} as Record<string, number>
        };
      }
      
      acc[view.viewedUserId].total++;
      if (view.viewerId !== 'anonymous') {
        acc[view.viewedUserId].unique.add(view.viewerId);
      }
      acc[view.viewedUserId].contexts[view.context] = 
        (acc[view.viewedUserId].contexts[view.context] || 0) + 1;
      
      return acc;
    }, {} as Record<string, any>);

    // Write aggregated daily stats (cost-efficient)
    Object.entries(userViews).forEach(([userId, stats]) => {
      const statsRef = dbAdmin
        .collection('profile_view_stats')
        .doc(`${userId}_${today}`);

      batch.set(statsRef, {
        viewedUserId: userId,
        date: today,
        viewCount: FieldValue.increment(stats.total),
        uniqueViewers: FieldValue.increment(stats.unique.size),
        contextBreakdown: Object.entries(stats.contexts).reduce((acc, [context, count]) => {
          acc[`contextBreakdown.${context}`] = FieldValue.increment(count);
          return acc;
        }, {} as Record<string, any>),
        updatedAt: FieldValue.serverTimestamp(),
        campusId: 'ub-buffalo'
      }, { merge: true });
    });

    // Write individual views for detailed analytics (only non-anonymous)
    const nonAnonymousViews = views.filter(v => v.viewerId !== 'anonymous');
    nonAnonymousViews.slice(0, 20).forEach(view => { // Limit for cost control
      const viewRef = dbAdmin.collection('profile_views').doc();
      batch.set(viewRef, {
        viewerId: view.viewerId,
        viewedUserId: view.viewedUserId,
        context: view.context,
        spaceId: view.spaceId || null,
        timestamp: FieldValue.serverTimestamp(),
        anonymous: false,
        campusId: 'ub-buffalo'
      });
    });

    // Update user profile view counters
    Object.keys(userViews).forEach(userId => {
      const userRef = dbAdmin.collection('users').doc(userId);
      batch.update(userRef, {
        profileViewCount: FieldValue.increment(userViews[userId].total),
        profileViewCountThisWeek: FieldValue.increment(userViews[userId].total),
        lastProfileView: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      });
    });

    await batch.commit();
    logger.info('Profile view batch flushed successfully', {
      batchKey,
      viewCount: views.length,
      userCount: Object.keys(userViews).length
    });

  } catch (error) {
    logger.error('Error flushing view batch', {
      error: error instanceof Error ? error.message : 'Unknown error',
      batchKey,
      viewCount: views.length
    });
  }
}

// Set up periodic batch flushing (in production, use a proper job queue)
setInterval(() => {
  const now = Date.now();
  const expiredBatches: string[] = [];
  
  for (const [batchKey, views] of viewBatch.entries()) {
    const batchTime = parseInt(batchKey.split('-').pop() || '0') * BATCH_INTERVAL;
    
    if (now - batchTime >= BATCH_INTERVAL && views.length > 0) {
      flushViewBatch(batchKey, views);
      expiredBatches.push(batchKey);
    }
  }
  
  expiredBatches.forEach(key => viewBatch.delete(key));
}, BATCH_INTERVAL);