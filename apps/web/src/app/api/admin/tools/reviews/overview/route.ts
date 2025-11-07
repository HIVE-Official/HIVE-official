import { NextRequest, NextResponse } from 'next/server';
import { withSecureAuth } from '@/lib/api-auth-secure';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';

export const GET = withSecureAuth(async (request: NextRequest) => {
  try {
    const now = new Date();
    const [pendingSnap, changesSnap] = await Promise.all([
      dbAdmin.collection('publishRequests').where('campusId', '==', CURRENT_CAMPUS_ID).where('status', '==', 'pending').get(),
      dbAdmin.collection('publishRequests').where('campusId', '==', CURRENT_CAMPUS_ID).where('status', '==', 'changes_requested').get(),
    ]);
    // Average age for pending requests
    let avgAgeHours = 0;
    if (!pendingSnap.empty) {
      const ages = pendingSnap.docs.map(doc => {
        const data = doc.data() as any;
        const ts = data.requestedAt ? new Date(data.requestedAt) : null;
        const created = ts && !isNaN(ts.getTime()) ? ts : (data.requestedAt?.toDate?.() ?? null);
        const ageMs = created ? (now.getTime() - created.getTime()) : 0;
        return Math.max(0, ageMs);
      });
      const sum = ages.reduce((a, b) => a + b, 0);
      avgAgeHours = Math.round((sum / ages.length) / (1000 * 60 * 60));
    }
    // Top categories in pending requests (best-effort)
    const categoryCounts = new Map<string, number>();
    for (const doc of pendingSnap.docs) {
      const data = doc.data() as any;
      const cat = (data.category || 'uncategorized') as string;
      categoryCounts.set(cat, (categoryCounts.get(cat) || 0) + 1);
    const topCategories = Array.from(categoryCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5)
      .map(([category, count]) => ({ category, count }));
    const overview = {
      counts: {
        pending: pendingSnap.size,
        changesRequested: changesSnap.size,
      },
      avgPendingAgeHours: avgAgeHours,
      topCategories,
      generatedAt: now.toISOString(),
    };
    return NextResponse.json({ success: true, overview });
  } catch (error) {
    logger.error('Admin tools reviews overview error', { error: error instanceof Error ? error : new Error(String(error)) });
    return NextResponse.json({ success: false, error: 'Failed to load reviews overview' }, { status: 500 });
  }
}, { requireAdmin: true });
