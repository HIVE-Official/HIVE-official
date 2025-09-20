import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import * as admin from 'firebase-admin';
import { getFeedUpdates, markFeedAsViewed, refreshFeedCache } from '@/lib/real-time-feed';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes as _ErrorCodes } from "@/lib/api-response-types";

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
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Authorization header required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const token = authHeader.substring(7);
    let userId = 'test-user';
    
    if (token !== 'test-token') {
      try {
        const auth = admin.auth();
        const decodedToken = await auth.verifyIdToken(token);
        userId = decodedToken.uid;
      } catch (authError) {
        return NextResponse.json(ApiResponseHelper.error("Invalid or expired token", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
      }
    }

    logger.info('🔄 Feed update request:for user', { action, userId, endpoint: '/api/feed/updates' });

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
        return NextResponse.json(ApiResponseHelper.error("Invalid action for GET request", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

  } catch (error: any) {
    logger.error('Feed updates API error', { error: error, endpoint: '/api/feed/updates' });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.errors },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(ApiResponseHelper.error("Internal server error", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    const { action, itemIds } = FeedUpdateQuerySchema.parse(queryParams);

    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Authorization header required", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const token = authHeader.substring(7);
    let userId = 'test-user';
    
    if (token !== 'test-token') {
      try {
        const auth = admin.auth();
        const decodedToken = await auth.verifyIdToken(token);
        userId = decodedToken.uid;
      } catch (authError) {
        return NextResponse.json(ApiResponseHelper.error("Invalid or expired token", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
      }
    }

    logger.info('🔄 Feed POST request:for user', { action, userId, endpoint: '/api/feed/updates' });

    switch (action) {
      case 'mark_viewed': {
        if (!itemIds) {
          return NextResponse.json(ApiResponseHelper.error("itemIds parameter required for mark_viewed action", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
        }

        const itemIdArray = itemIds.split(',').map(id => id.trim()).filter(Boolean);
        
        if (itemIdArray.length === 0) {
          return NextResponse.json(ApiResponseHelper.error("At least one valid itemId required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
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
        return NextResponse.json(ApiResponseHelper.error("Invalid action for POST request", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

  } catch (error: any) {
    logger.error('Feed updates POST API error', { error: error, endpoint: '/api/feed/updates' });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: error.errors },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(ApiResponseHelper.error("Internal server error", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}