import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from "@/lib/logger";
import { withAuthAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware";

const ErrorReportSchema = z.object({
  errorId: z.string().min(1).max(100),
  message: z.string().min(1).max(1000),
  stack: z.string().optional(),
  componentStack: z.string().optional(),
  userAgent: z.string().optional(),
  url: z.string().optional(),
  timestamp: z.string(),
  context: z.string(),
  retryCount: z.number().default(0),
  buildVersion: z.string().optional(),
  environment: z.string().optional(),
  // HIVE-specific context
  spaceId: z.string().optional(),
  toolId: z.string().optional(),
  ritualId: z.string().optional(),
  campusId: z.string().optional(),
  sessionId: z.string().optional(),
  // Legacy support
  type: z.enum(['feed_error_boundary', 'ritual_error_boundary', 'general_error']).optional(),
  ritualName: z.string().optional(),
  metadata: z.record(z.any()).optional()
});

/**
 * POST /api/errors/report
 * Report client-side errors for monitoring and debugging
 */
export const POST = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const userId = getUserId(request);

  try {
    const body = await request.json();
    const errorReport = ErrorReportSchema.parse(body);

    // Rate limiting: Prevent spam error reports
    const now = Date.now();
    const oneMinuteAgo = now - 60000;

    // Check recent error reports from this user
    const recentErrorsQuery = await dbAdmin.collection('error_reports')
      .where('userId', '==', userId)
      .where('timestamp', '>=', new Date(oneMinuteAgo))
      .limit(5)
      .get();

    if (recentErrorsQuery.size >= 5) {
      logger.warn('Error report rate limit exceeded', { userId, recentCount: recentErrorsQuery.size });
      return respond.error('Too many error reports. Please try again later.', 'RATE_LIMIT_EXCEEDED', { status: 429 });
    }

    // Sanitize and validate error data
    const sanitizedReport = {
      errorId: errorReport.errorId.replace(/[^a-zA-Z0-9_-]/g, ''),
      message: errorReport.message.slice(0, 1000),
      stack: errorReport.stack?.slice(0, 5000),
      componentStack: errorReport.componentStack?.slice(0, 5000),
      userAgent: errorReport.userAgent?.slice(0, 500),
      url: errorReport.url?.slice(0, 500),
      context: errorReport.context,
      retryCount: errorReport.retryCount,
      buildVersion: errorReport.buildVersion,
      environment: errorReport.environment || process.env.NODE_ENV || 'unknown',
      // HIVE-specific context
      spaceId: errorReport.spaceId,
      toolId: errorReport.toolId,
      ritualId: errorReport.ritualId,
      campusId: errorReport.campusId,
      sessionId: errorReport.sessionId,
      // Legacy fields
      type: errorReport.type,
      ritualName: errorReport.ritualName?.slice(0, 100),
      timestamp: new Date(errorReport.timestamp),
      reportedAt: new Date(),
      userId,
      severity: determineSeverity(errorReport),
      resolved: false
    };

    // Store error report in Firestore
    await dbAdmin.collection('error_reports').add(sanitizedReport);

    // Log error for immediate monitoring
    logger.error('Client error reported', {
      errorId: sanitizedReport.errorId,
      type: sanitizedReport.type,
      message: sanitizedReport.message,
      userId,
      severity: sanitizedReport.severity,
      endpoint: '/api/errors/report'
    });

    // For critical errors, send immediate alerts (in production)
    if (sanitizedReport.severity === 'critical' && process.env.NODE_ENV === 'production') {
      await sendCriticalErrorAlert(sanitizedReport);
    }

    return respond.success({
      reported: true,
      errorId: sanitizedReport.errorId,
      severity: sanitizedReport.severity
    });

  } catch (error: any) {
    if (error instanceof z.ZodError) {
      logger.warn(
        `Invalid error report format from user ${userId}: ${error.errors.length} validation errors at /api/errors/report`
      );
      return respond.error('Invalid error report format', 'VALIDATION_ERROR', { status: 400 });
    }

    logger.error(
      `Failed to process error report from user ${userId} at /api/errors/report`,
      error instanceof Error ? error : new Error(String(error))
    );
    return respond.error('Failed to process error report', 'PROCESSING_ERROR', { status: 500 });
  }
});

/**
 * Determine error severity based on context and message
 */
function determineSeverity(errorReport: z.infer<typeof ErrorReportSchema>): 'low' | 'medium' | 'high' | 'critical' {
  const message = errorReport.message.toLowerCase();
  const context = errorReport.context?.toLowerCase() || '';

  // Critical errors that break core functionality
  if (
    context.includes('globalerror') ||
    context.includes('authentication') ||
    message.includes('firebase') ||
    message.includes('network error') ||
    message.includes('chunk') ||
    message.includes('failed to fetch') ||
    errorReport.retryCount >= 3
  ) {
    return 'critical';
  }

  // High priority errors that affect core HIVE features
  if (
    context.includes('feederror') ||
    context.includes('spaceserror') ||
    context.includes('profileerror') ||
    message.includes('render') ||
    message.includes('component') ||
    message.includes('undefined') ||
    message.includes('null') ||
    errorReport.type === 'feed_error_boundary' ||
    errorReport.type === 'ritual_error_boundary'
  ) {
    return 'high';
  }

  // Medium priority for tools and other features
  if (
    context.includes('toolserror') ||
    message.includes('react') ||
    message.includes('hook') ||
    message.includes('state') ||
    errorReport.retryCount >= 1
  ) {
    return 'medium';
  }

  // Low priority for minor issues
  return 'low';
}

/**
 * Send alert for critical errors (production only)
 */
async function sendCriticalErrorAlert(errorReport: any) {
  try {
    // In a real implementation, this would send to:
    // - Slack/Discord webhook
    // - Email notifications
    // - PagerDuty/incident management
    // - Error monitoring service (Sentry, etc.)

    logger.error('CRITICAL ERROR ALERT', {
      errorId: errorReport.errorId,
      message: errorReport.message,
      userId: errorReport.userId,
      type: errorReport.type,
      url: errorReport.url,
      timestamp: errorReport.timestamp
    });

    // Example webhook notification (uncomment in production)
    /*
    await fetch(process.env.SLACK_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `🚨 Critical Error in HIVE Platform`,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*Critical Error:* ${errorReport.message}\n*Type:* ${errorReport.type}\n*Error ID:* ${errorReport.errorId}\n*User:* ${errorReport.userId}`
            }
          }
        ]
      })
    });
    */

  } catch (alertError) {
    logger.error(
      'Failed to send critical error alert',
      alertError instanceof Error ? alertError : new Error(String(alertError))
    );
  }
}