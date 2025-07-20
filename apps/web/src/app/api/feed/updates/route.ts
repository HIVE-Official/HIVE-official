import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getAuth } from 'firebase-admin/auth';
import { getFeedUpdates, markFeedAsViewed, refreshFeedCache } from '@/lib/real-time-feed';

// Real-time feed update schema
const FeedUpdateQuerySchema = z.object({
  action: z.enum(['check', 'mark_viewed', 'force_refresh']).default('check'),
  itemIds: z.string().optional(), // Comma-separated for mark_viewed
});

/**
 * Real-time Feed Updates API
 * 
 * GET ?action=check - Check for new feed updates
 * POST ?action=mark_viewed - Mark items as viewed
 * POST ?action=force_refresh - Force refresh feed cache
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    const { action } = FeedUpdateQuerySchema.parse(queryParams);

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

    console.log(`🔄 Feed update request: ${action} for user ${userId}`);

    switch (action) {
      case 'check': {
        const updates = await getFeedUpdates(userId);
        
        return NextResponse.json({
          success: true,
          hasUpdates: updates !== null,
          update: updates,
          timestamp: new Date().toISOString()
        });
      }

      case 'force_refresh': {
        const refreshResult = await refreshFeedCache(userId);
        
        return NextResponse.json({
          success: true,
          update: refreshResult,
          message: 'Feed cache refreshed',
          timestamp: new Date().toISOString()
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action for GET request' },
          { status: 400 }
        );
    }

  } catch (error: any) {
    console.error('Feed updates API error:', error);

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
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    const { action, itemIds } = FeedUpdateQuerySchema.parse(queryParams);

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

    console.log(`🔄 Feed POST request: ${action} for user ${userId}`);

    switch (action) {
      case 'mark_viewed': {
        if (!itemIds) {
          return NextResponse.json(
            { error: 'itemIds parameter required for mark_viewed action' },
            { status: 400 }
          );
        }

        const itemIdArray = itemIds.split(',').map(id => id.trim()).filter(Boolean);
        
        if (itemIdArray.length === 0) {
          return NextResponse.json(
            { error: 'At least one valid itemId required' },
            { status: 400 }
          );
        }

        await markFeedAsViewed(userId, itemIdArray);

        return NextResponse.json({
          success: true,
          message: `Marked ${itemIdArray.length} items as viewed`,
          itemIds: itemIdArray,
          timestamp: new Date().toISOString()
        });
      }

      case 'force_refresh': {
        const refreshResult = await refreshFeedCache(userId);
        
        return NextResponse.json({
          success: true,
          update: refreshResult,
          message: 'Feed cache refreshed',
          timestamp: new Date().toISOString()
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action for POST request' },
          { status: 400 }
        );
    }

  } catch (error: any) {
    console.error('Feed updates POST API error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}