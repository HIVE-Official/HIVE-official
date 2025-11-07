import { NextRequest, NextResponse } from 'next/server';
import { withSecureAuth } from '@/lib/api-auth-secure';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

export const GET = withSecureAuth(async (request: NextRequest) => {
  try {
    // Use Firestore count aggregations where possible; fall back to queries if unsupported
    const [
      toolsCountSnap,
      publishedToolsSnap,
      pendingReviewsSnap,
      installsCountSnap,
      deploymentsCountSnap,
    ] = await Promise.all([
      dbAdmin.collection('tools').where('campusId', '==', CURRENT_CAMPUS_ID).count().get().catch(() => null),
      dbAdmin.collection('tools').where('campusId', '==', CURRENT_CAMPUS_ID).where('status', '==', 'published').count().get().catch(() => null),
      dbAdmin.collection('publishRequests').where('campusId', '==', CURRENT_CAMPUS_ID).where('status', '==', 'pending').count().get().catch(() => null),
      dbAdmin.collection('toolInstallations').where('campusId', '==', CURRENT_CAMPUS_ID).count().get().catch(() => null),
      dbAdmin.collection('deployedTools').where('campusId', '==', CURRENT_CAMPUS_ID).count().get().catch(() => null),
    ]);

    // Error/event rates are optional; best-effort from analytics_events
    let errorEvents = 0;
    let eventsLookback = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    try {
      const errorsSnap = await dbAdmin
        .collection('analytics_events')
        .where('eventType', 'in', ['tool_error', 'tool_crash'])
        .where('timestamp', '>=', eventsLookback)
        .get();
      errorEvents = errorsSnap.size;
    } catch {}

    const overview = {
      totals: {
        tools: toolsCountSnap ? toolsCountSnap.data().count : 0,
        published: publishedToolsSnap ? publishedToolsSnap.data().count : 0,
        pendingReviews: pendingReviewsSnap ? pendingReviewsSnap.data().count : 0,
      },
      lifecycle: {
        totalInstalls: installsCountSnap ? installsCountSnap.data().count : 0,
        activeDeployments: deploymentsCountSnap ? deploymentsCountSnap.data().count : 0,
        recentErrors7d: errorEvents,
      },
      generatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, overview });
  } catch (error) {
    logger.error('Admin tools overview error', { error: error instanceof Error ? error : new Error(String(error)) });
    return NextResponse.json({ success: false, error: 'Failed to load tools overview' }, { status: 500 });
  }
}, { requireAdmin: true });

