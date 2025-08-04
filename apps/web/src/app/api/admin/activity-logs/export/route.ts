import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/admin-middleware';
import { adminActivityLogger } from '@/lib/admin-activity-logger';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

/**
 * Admin Activity Logs Export API
 * GET - Export activity logs as CSV
 */

export async function GET(request: NextRequest) {
  return withAdminAuth(request, async (request, admin) => {
    try {
      const url = new URL(request.url);
      const filters = {
        adminId: url.searchParams.get('adminId') || undefined,
        action: url.searchParams.get('action') as any || undefined,
        resource: url.searchParams.get('resource') || undefined,
        dateFrom: url.searchParams.get('dateFrom') || undefined,
        dateTo: url.searchParams.get('dateTo') || undefined,
        success: url.searchParams.get('success') ? url.searchParams.get('success') === 'true' : undefined,
        limit: parseInt(url.searchParams.get('limit') || '10000'), // Higher limit for export
      };

      const csvData = await adminActivityLogger.exportLogs(filters);
      
      const fileName = `admin-activity-logs-${new Date().toISOString().split('T')[0]}.csv`;

      return new NextResponse(csvData, {
        status: HttpStatus.OK,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${fileName}"`,
          'Cache-Control': 'no-cache',
        } });
    } catch (error) {
      logger.error('Error exporting activity logs', { error: error, endpoint: '/api/admin/activity-logs/export' });
      return NextResponse.json(
        { success: false, error: 'Failed to export activity logs' },
        { status: HttpStatus.INTERNAL_SERVER_ERROR }
      );
    }
  });
}