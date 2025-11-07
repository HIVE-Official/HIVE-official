import { NextRequest, NextResponse } from 'next/server';
import { withSecureAuth } from '@/lib/api-auth-secure';
import { adminNotifications } from '@/lib/admin-notifications';
import { logger } from "@/lib/logger";
import { ApiResponseHelper as _ApiResponseHelper, HttpStatus, ErrorCodes as _ErrorCodes } from "@/lib/api-response-types";

/**
 * Admin Notifications API
 * GET - Fetch notifications
 * POST - Mark notifications as read
 */

export const GET = withSecureAuth(async (request: NextRequest, token) => {
  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const unreadOnly = url.searchParams.get('unread_only') === 'true';

    const notifications = adminNotifications.getNotifications(limit, unreadOnly);
    const stats = adminNotifications.getStatistics();

    return NextResponse.json({
      success: true,
      notifications,
      unreadCount: stats.unread,
      totalCount: stats.total,
      statistics: stats
    });
  } catch (error) {
    logger.error('Error fetching admin notifications', { error: error instanceof Error ? error : new Error(String(error))});
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notifications' },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, { requireAdmin: true });

export const POST = withSecureAuth(async (request: NextRequest, token) => {
  try {
    const body = await request.json();
    const { action, notificationId } = body;

    let result;
    
    switch (action) {
      case 'mark_read':
        if (!notificationId) {
          return NextResponse.json(
            { success: false, error: 'notificationId is required' },
            { status: HttpStatus.BAD_REQUEST }
          );
        }
        result = await adminNotifications.markAsRead(notificationId, token?.uid || 'unknown');
        break;

      case 'mark_all_read':
        result = await adminNotifications.markAllAsRead(token?.uid || 'unknown');
        break;

      case 'cleanup': {
        const daysOld = body.daysOld || 30;
        result = await adminNotifications.cleanupOldNotifications(daysOld);
        break;
      }

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: HttpStatus.BAD_REQUEST }
        );
    }

    return NextResponse.json({
      success: true,
      result
    });
  } catch (error) {
    logger.error('Error processing notification action', { error: error instanceof Error ? error : new Error(String(error))});
    return NextResponse.json(
      { success: false, error: 'Failed to process notification action' },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, { requireAdmin: true });
