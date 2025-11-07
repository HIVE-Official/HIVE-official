import { NextResponse } from 'next/server';
import { withAdminCampusIsolation } from '@/lib/middleware';
import { dbAdmin } from '@/lib/firebase-admin';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';

type PhaseKey = 'draft' | 'announced' | 'active' | 'cooldown' | 'ended';

interface RitualStats {
  total: number;
  byPhase: Record<PhaseKey, number>;
  metrics: {
    participants: number;
    submissions: number;
    conversions: number;
  };
}

function emptyStats(): RitualStats {
  return {
    total: 0,
    byPhase: { draft: 0, announced: 0, active: 0, cooldown: 0, ended: 0 },
    metrics: { participants: 0, submissions: 0, conversions: 0 },
  };
}

function normalizePhase(value: unknown): PhaseKey {
  const raw = String(value || '').toLowerCase();
  if (['draft', 'announced', 'active', 'cooldown', 'ended'].includes(raw)) {
    return raw as PhaseKey;
  }
  // Legacy mapping: status in legacy docs → phases
  if (raw === 'scheduled') return 'announced';
  if (raw === 'paused') return 'cooldown';
  if (raw === 'completed') return 'ended';
  return 'draft';
}

export const GET = withAdminCampusIsolation(async () => {
  const campusId = CURRENT_CAMPUS_ID;
  const stats = emptyStats();

  try {
    // Prefer v2 collection, but include legacy `rituals` to cover older data
    const [v2Snap, legacySnap] = await Promise.all([
      dbAdmin.collection('rituals_v2').where('campusId', '==', campusId).get(),
      dbAdmin.collection('rituals').where('campusId', '==', campusId).get(),
    ]);

    const docs = [...v2Snap.docs, ...legacySnap.docs];
    stats.total = docs.length;

    for (const doc of docs) {
      const data = doc.data() as Record<string, any>;
      const phase = normalizePhase(data.phase ?? data.status);
      stats.byPhase[phase] += 1;

      // Aggregate simple metrics where present
      const metrics = (data.metrics || {}) as Record<string, any>;
      const p = Number(metrics.participants || 0);
      const s = Number(metrics.submissions || 0);
      const c = Number(metrics.conversions || 0);
      if (Number.isFinite(p)) stats.metrics.participants += p;
      if (Number.isFinite(s)) stats.metrics.submissions += s;
      if (Number.isFinite(c)) stats.metrics.conversions += c;
    }

    return NextResponse.json({ success: true, campusId, data: stats });
  } catch (error) {
    logger.error('[ADMIN_RITUALS_STATS] Failed to compute stats', {
      campusId,
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { success: false, error: 'Failed to load rituals stats' },
      { status: 500 },
    );
  }
});

