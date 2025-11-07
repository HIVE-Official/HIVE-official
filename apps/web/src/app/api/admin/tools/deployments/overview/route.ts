import { NextRequest, NextResponse } from 'next/server';
import { withSecureAuth } from '@/lib/api-auth-secure';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

export const GET = withSecureAuth(async (request: NextRequest) => {
  try {
    // Counts by status via count() aggregations where possible
    const [activeSnap, pausedSnap, disabledSnap] = await Promise.all([
      dbAdmin.collection('deployedTools').where('campusId', '==', CURRENT_CAMPUS_ID).where('status', '==', 'active').count().get().catch(() => null),
      dbAdmin.collection('deployedTools').where('campusId', '==', CURRENT_CAMPUS_ID).where('status', '==', 'paused').count().get().catch(() => null),
      dbAdmin.collection('deployedTools').where('campusId', '==', CURRENT_CAMPUS_ID).where('status', '==', 'disabled').count().get().catch(() => null),
    ]);

    // By target type (profile/space) using counts
    const [profileSnap, spaceSnap] = await Promise.all([
      dbAdmin.collection('deployedTools').where('campusId', '==', CURRENT_CAMPUS_ID).where('deployedTo', '==', 'profile').count().get().catch(() => null),
      dbAdmin.collection('deployedTools').where('campusId', '==', CURRENT_CAMPUS_ID).where('deployedTo', '==', 'space').count().get().catch(() => null),
    ]);

    // Recent failures (7d) from analytics_events
    const sinceIso = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    let recentFailures7d = 0;
    try {
      const failuresSnap = await dbAdmin
        .collection('analytics_events')
        .where('eventType', 'in', ['deployment_failed', 'tool_deploy_error'])
        .where('timestamp', '>=', sinceIso)
        .get();
      recentFailures7d = failuresSnap.size;
    } catch {}

    // Top tools by deployments (fallback to limited scan)
    let topTools: Array<{ toolId: string; name?: string; deployments: number }> = [];
    try {
      const deploySnap = await dbAdmin.collection('deployedTools').where('campusId', '==', CURRENT_CAMPUS_ID).limit(500).get();
      const counts = new Map<string, number>();
      for (const doc of deploySnap.docs) {
        const d = doc.data() as any;
        const id = d.toolId as string | undefined;
        if (!id) continue;
        counts.set(id, (counts.get(id) || 0) + 1);
      }
      const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);
      for (const [toolId, deployments] of sorted) {
        let name: string | undefined = undefined;
        try {
          const toolDoc = await dbAdmin.collection('tools').doc(toolId).get();
          if (toolDoc.exists) name = (toolDoc.data() as any)?.name;
        } catch {}
        topTools.push({ toolId, name, deployments });
      }
    } catch {}

    const overview = {
      totals: {
        active: activeSnap ? activeSnap.data().count : 0,
        paused: pausedSnap ? pausedSnap.data().count : 0,
        disabled: disabledSnap ? disabledSnap.data().count : 0,
      },
      byTarget: {
        profile: profileSnap ? profileSnap.data().count : 0,
        space: spaceSnap ? spaceSnap.data().count : 0,
      },
      recentFailures7d,
      topTools,
      generatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, overview });
  } catch (error) {
    logger.error('Admin tools deployments overview error', { error: error instanceof Error ? error : new Error(String(error)) });
    return NextResponse.json({ success: false, error: 'Failed to load deployments overview' }, { status: 500 });
  }
}, { requireAdmin: true });

