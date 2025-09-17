import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/api/middleware/api-auth-middleware';
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { logger } from '@/lib/logger';
import { FieldValue } from 'firebase-admin/firestore';
import { captureError } from '@/lib/error-monitoring';

interface ErrorReport {
  message: string;
  stack?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  context: {
    userId?: string;
    sessionId?: string;
    route?: string;
    userAgent?: string;
    url?: string;
    timestamp?: Date;
    additionalData?: Record<string, any>;
  };
  count: number;
  firstOccurred: Date;
  lastOccurred: Date;
  resolved: boolean;
  tags: string[];
}

interface AnalyticsPayload {
  errors: ErrorReport[];
  sessionId: string;
  timestamp: string;
}

/**
 * Receive and process error analytics from client
 */
export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const payload: AnalyticsPayload = await request.json();
    const { errors, sessionId, timestamp } = payload;
    const userId = authContext.userId;

    if (!Array.isArray(errors) || errors.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or empty errors array' },
        { status: 400 }
      );
    }

    // Process each error report
    const processedErrors = [];
    const batch = dbAdmin.batch();

    for (const errorReport of errors) {
      try {
        // Validate error report structure
        if (!errorReport.message || !errorReport.severity || !errorReport.category) {
          logger.warn('Invalid error report structure', { errorReport });
          continue;
        }

        // Enrich with server context
        const enrichedError = {
          ...errorReport,
          context: {
            ...errorReport.context,
            userId,
            serverTimestamp: new Date().toISOString(),
            ipAddress: request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown',
            userAgent: request.headers.get('user-agent') || 'unknown'
          },
          receivedAt: FieldValue.serverTimestamp(),
          sessionId
        };

        // Check for existing similar errors to avoid duplicates
        const existingErrorQuery = await dbAdmin
          .collection('errorAnalytics')
          .where('message', '==', errorReport.message)
          .where('context.userId', '==', userId)
          .where('category', '==', errorReport.category)
          .where('createdAt', '>', new Date(Date.now() - 24 * 60 * 60 * 1000)) // Last 24 hours
          .limit(1)
          .get();

        if (!existingErrorQuery.empty) {
          // Update existing error count
          const existingDoc = existingErrorQuery.docs[0];
          const existingData = existingDoc.data();
          
          batch.update(existingDoc.ref, {
            count: (existingData.count || 1) + errorReport.count,
            lastOccurred: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp()
          });
          
          logger.info('Updated existing error report', {
            errorId: existingDoc.id,
            newCount: (existingData.count || 1) + errorReport.count
          });
        } else {
          // Create new error document
          const errorDoc = dbAdmin.collection('errorAnalytics').doc();
          batch.set(errorDoc, {
            id: errorDoc.id,
            ...enrichedError,
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp()
          });

          // For critical errors, also send to error monitoring system
          if (errorReport.severity === 'critical') {
            try {
              await captureError(
                new Error(errorReport.message),
                {
                  userId,
                  tags: { 
                    source: 'client-analytics',
                    category: errorReport.category,
                    severity: errorReport.severity
                  },
                  extra: {
                    sessionId,
                    originalContext: errorReport.context,
                    stack: errorReport.stack
                  },
                  level: 'error'
                }
              );
            } catch (sentryError) {
              logger.warn('Failed to send critical error to Sentry', { sentryError });
            }
          }

          logger.info('Created new error report', {
            errorId: errorDoc.id,
            severity: errorReport.severity,
            category: errorReport.category
          });
        }

        processedErrors.push({
          originalMessage: errorReport.message,
          severity: errorReport.severity,
          category: errorReport.category,
          processed: true
        });

      } catch (processingError) {
        logger.error('Failed to process individual error report', {
          error: processingError,
          errorReport
        });
        
        processedErrors.push({
          originalMessage: errorReport.message || 'unknown',
          severity: errorReport.severity || 'unknown',
          category: errorReport.category || 'unknown',
          processed: false,
          error: processingError instanceof Error ? processingError.message : 'Processing failed'
        });
      }
    }

    // Commit all batch operations
    await batch.commit();

    // Update session analytics
    await updateSessionAnalytics(userId, sessionId, {
      errorsReported: errors.length,
      errorCategories: [...new Set(errors.map(e => e.category))],
      severities: [...new Set(errors.map(e => e.severity))],
      reportedAt: new Date()
    });

    logger.info('Error analytics batch processed', {
      userId,
      sessionId,
      totalErrors: errors.length,
      processedErrors: processedErrors.filter(e => e.processed).length,
      failedErrors: processedErrors.filter(e => !e.processed).length
    });

    return NextResponse.json({
      success: true,
      processedCount: processedErrors.filter(e => e.processed).length,
      failedCount: processedErrors.filter(e => !e.processed).length,
      sessionId,
      details: processedErrors
    });

  } catch (error) {
    logger.error('Error analytics processing failed', { error });
    
    // Don't let analytics failures break the client
    return NextResponse.json(
      { 
        success: false, 
        error: 'Analytics processing failed',
        message: 'Errors logged locally but analytics may be incomplete'
      },
      { status: 500 }
    );
  }
}, {
  allowDevelopmentBypass: false,
  operation: 'submit_error_analytics'
});

/**
 * Get error analytics and insights
 */
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || '24h'; // 1h, 24h, 7d, 30d
    const category = searchParams.get('category');
    const severity = searchParams.get('severity');
    const limit = parseInt(searchParams.get('limit') || '50');
    const userId = authContext.userId;

    // Calculate time range
    const now = new Date();
    let startTime: Date;
    
    switch (timeRange) {
      case '1h':
        startTime = new Date(now.getTime() - 60 * 60 * 1000);
        break;
      case '24h':
        startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startTime = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }

    // Build query
    let query = dbAdmin
      .collection('errorAnalytics')
      .where('context.userId', '==', userId)
      .where('createdAt', '>=', startTime)
      .orderBy('createdAt', 'desc');

    if (category) {
      query = query.where('category', '==', category);
    }

    if (severity) {
      query = query.where('severity', '==', severity);
    }

    query = query.limit(limit);

    const snapshot = await query.get();
    const errors = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Calculate analytics insights
    const insights = {
      totalErrors: errors.length,
      errorsByCategory: {},
      errorsBySeverity: {},
      topErrors: {},
      recentTrends: [],
      timeRange,
      generatedAt: new Date().toISOString()
    };

    // Group by category
    errors.forEach(error => {
      const cat = error.category || 'unknown';
      insights.errorsByCategory[cat] = (insights.errorsByCategory[cat] || 0) + (error.count || 1);
    });

    // Group by severity
    errors.forEach(error => {
      const sev = error.severity || 'unknown';
      insights.errorsBySeverity[sev] = (insights.errorsBySeverity[sev] || 0) + (error.count || 1);
    });

    // Top error messages
    const errorCounts = {};
    errors.forEach(error => {
      const msg = error.message || 'unknown';
      errorCounts[msg] = (errorCounts[msg] || 0) + (error.count || 1);
    });

    insights.topErrors = Object.entries(errorCounts)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 10)
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

    return NextResponse.json({
      errors: errors.slice(0, 20), // Return latest 20 for display
      insights,
      pagination: {
        total: errors.length,
        limit,
        hasMore: snapshot.size === limit
      }
    });

  } catch (error) {
    logger.error('Failed to retrieve error analytics', { error });
    return NextResponse.json(
      { error: 'Failed to retrieve analytics' },
      { status: 500 }
    );
  }
}, {
  allowDevelopmentBypass: false,
  operation: 'get_error_analytics'
});

// Helper function to update session analytics
async function updateSessionAnalytics(
  userId: string, 
  sessionId: string, 
  errorData: {
    errorsReported: number;
    errorCategories: string[];
    severities: string[];
    reportedAt: Date;
  }
): Promise<void> {
  try {
    const sessionRef = dbAdmin.collection('sessionAnalytics').doc(`${userId}_${sessionId}`);
    
    await dbAdmin.runTransaction(async (transaction: any) => {
      const sessionDoc = await transaction.get(sessionRef);
      
      if (sessionDoc.exists) {
        const existingData = sessionDoc.data()!;
        transaction.update(sessionRef, {
          totalErrors: (existingData.totalErrors || 0) + errorData.errorsReported,
          errorCategories: [...new Set([...(existingData.errorCategories || []), ...errorData.errorCategories])],
          severities: [...new Set([...(existingData.severities || []), ...errorData.severities])],
          lastErrorReported: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp()
        });
      } else {
        transaction.set(sessionRef, {
          userId,
          sessionId,
          totalErrors: errorData.errorsReported,
          errorCategories: errorData.errorCategories,
          severities: errorData.severities,
          firstErrorReported: FieldValue.serverTimestamp(),
          lastErrorReported: FieldValue.serverTimestamp(),
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp()
        });
      }
    });
  } catch (error) {
    logger.error('Failed to update session analytics', { error, userId, sessionId });
  }
}