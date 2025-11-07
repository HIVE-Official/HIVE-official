import { NextRequest, NextResponse } from 'next/server';
import { withSecureAuth } from '@/lib/api-auth-secure';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';

export const GET = withSecureAuth(async (request: NextRequest) => {
  try {
    const sinceIso = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
    let passed = 0, failed = 0, budgetsFailed: Array<{ toolId: string; count: number }> = [];

    // Use analytics_events as the source for quality gates
    try {
      const [passedSnap, failedSnap] = await Promise.all([
        dbAdmin.collection('analytics_events')
          .where('eventType', '==', 'quality_passed')
          .where('timestamp', '>=', sinceIso)
          .get(),
        dbAdmin.collection('analytics_events')
          .where('eventType', '==', 'quality_failed')
          .where('timestamp', '>=', sinceIso)
          .get(),
      ]);
      passed = passedSnap.size;
      failed = failedSnap.size;

      const counts = new Map<string, number>();
      failedSnap.docs.forEach(doc => {
        const data = doc.data() as any;
        const toolId = (data.toolId || data.metadata?.toolId || 'unknown') as string;
        counts.set(toolId, (counts.get(toolId) || 0) + 1);
      });
      budgetsFailed = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5)
        .map(([toolId, count]) => ({ toolId, count }));
    } catch {}

    const overview = {
      checks: { passed, failed },
      topFailingTools: budgetsFailed,
      lookbackDays: 14,
      generatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, overview });
  } catch (error) {
    logger.error('Admin tools quality overview error', { error: error instanceof Error ? error : new Error(String(error)) });
    return NextResponse.json({ success: false, error: 'Failed to load quality overview' }, { status: 500 });
  }
}, { requireAdmin: true });

