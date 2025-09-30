import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/admin-middleware';
import { adminActivityLogger } from '@/lib/admin-activity-logger';
import { logger } from "@/lib/logger";
import { ApiResponseHelper as _ApiResponseHelper, HttpStatus, ErrorCodes as _ErrorCodes } from "@/lib/api-response-types";

/**
 * Admin Activity Logs API
 * GET - Fetch activity logs with filtering
 * DELETE - Cleanup old logs
 */

export async function GET(request: NextRequest) {
  return withAdminAuth(request, async (request, _admin) => {
    try {
      const url = new URL(request.url);
      const filters = {
        adminId: url.searchParams.get('adminId') || undefined,
        action: url.searchParams.get('action') as any || undefined,
        resource: url.searchParams.get('resource') || undefined,
        dateFrom: url.searchParams.get('dateFrom') || undefined,
        dateTo: url.searchParams.get('dateTo') || undefined,
        success: url.searchParams.get('success') ? url.searchParams.get('success') === 'true' : undefined,
        limit: parseInt(url.searchParams.get('limit') || '100'),
        offset: parseInt(url.searchParams.get('offset') || '0'),
      };

      const [logs, stats] = await Promise.all([
        adminActivityLogger.getActivityLogs(filters),
        adminActivityLogger.getActivityStats(filters.dateFrom, filters.dateTo),
      ]);

      return NextResponse.json({
        success: true,
        logs,
        stats,
        filters });
    } catch (error) {
      logger.error('Error fetching activity logs', { error: error instanceof Error ? error : new Error(String(error))});
      return NextResponse.json(
        { success: false, error: 'Failed to fetch activity logs' },
        { status: HttpStatus.INTERNAL_SERVER_ERROR }
      );
    }
  });
}

export async function DELETE(request: NextRequest) {
  return withAdminAuth(request, async (request, _admin) => {
    try {
      const body = await request.json();
      const { daysOld = 90 } = body;

      const deletedCount = await adminActivityLogger.cleanupOldLogs(daysOld);

      return NextResponse.json({
        success: true,
        deletedCount });
    } catch (error) {
      logger.error('Error cleaning up activity logs', { error: error instanceof Error ? error : new Error(String(error))});
      return NextResponse.json(
        { success: false, error: 'Failed to cleanup activity logs' },
        { status: HttpStatus.INTERNAL_SERVER_ERROR }
      );
    }
  });
}