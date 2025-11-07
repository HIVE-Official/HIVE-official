import { NextResponse } from 'next/server';
import { z } from 'zod';
import { withAdminCampusIsolation } from '@/lib/middleware';
import { dbAdmin } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

const AdminSurvivalSchema = z.discriminatedUnion('action', [
  z.object({
    action: z.literal('set_matchups'),
    matchups: z.array(
      z.object({
        id: z.string().optional(),
        competitor1: z.object({ id: z.string(), name: z.string() }),
        competitor2: z.object({ id: z.string(), name: z.string() }),
        status: z.enum(['upcoming', 'active', 'completed']).optional(),
      })
    ).min(1),
  }),
  z.object({
    action: z.literal('eliminate'),
    matchupId: z.string(),
    eliminated: z.string(), // 'a' | 'b' or competitor id
  }),
]);

export const dynamic = 'force-dynamic';

export const POST = withAdminCampusIsolation(async (request, _admin, ctx) => {
  const ritualId = ctx.params?.ritualId;
  if (!ritualId) return NextResponse.json({ error: 'Missing ritualId' }, { status: 400 });

  const body = await request.json().catch(() => null);
  const parsed = AdminSurvivalSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  const v2Ref = dbAdmin.collection('rituals_v2').doc(ritualId);
  const v2Snap = await v2Ref.get();
  if (!v2Snap.exists) return NextResponse.json({ error: 'Ritual not found' }, { status: 404 });
  const ritual = v2Snap.data() as any;
  if (ritual.campusId !== CURRENT_CAMPUS_ID) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  if (parsed.data.action === 'set_matchups') {
    const { matchups } = parsed.data;
    const batch = dbAdmin.batch();
    for (const m of matchups) {
      const id = m.id ?? `sm_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const ref = dbAdmin.collection('survival_matchups').doc(id);
      batch.set(ref, {
        id,
        ritualId,
        campusId: CURRENT_CAMPUS_ID,
        competitor1: m.competitor1,
        competitor2: m.competitor2,
        status: m.status ?? 'upcoming',
        votesA: 0,
        votesB: 0,
        updatedAt: new Date(),
      });
    }
    // Optionally snapshot into v2 config to show in UI quickly
    const current = matchups.map((m) => ({
      id: m.id ?? 'pending',
      competitor1: { id: m.competitor1.id, name: m.competitor1.name, votes: 0 },
      competitor2: { id: m.competitor2.id, name: m.competitor2.name, votes: 0 },
      status: m.status ?? 'upcoming',
    }));
    batch.update(v2Ref, { 'config.survival.currentMatchups': current, updatedAt: new Date() });
    await batch.commit();
    return NextResponse.json({ success: true });
  }

  if (parsed.data.action === 'eliminate') {
    const { matchupId, eliminated } = parsed.data;
    const matchupRef = dbAdmin.collection('survival_matchups').doc(matchupId);
    const matchupSnap = await matchupRef.get();
    if (!matchupSnap.exists) return NextResponse.json({ error: 'Matchup not found' }, { status: 404 });
    const matchup = matchupSnap.data() as any;
    if (matchup.ritualId !== ritualId || matchup.campusId !== CURRENT_CAMPUS_ID) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Normalize to 'a' | 'b'
    const elimLower = eliminated.toLowerCase();
    const isA = elimLower === 'a' || eliminated === matchup?.competitor1?.id;
    const isB = elimLower === 'b' || eliminated === matchup?.competitor2?.id;
    if (isA === isB) return NextResponse.json({ error: 'Invalid eliminated competitor' }, { status: 400 });

    const batch = dbAdmin.batch();
    batch.update(matchupRef, {
      eliminated: isA ? matchup.competitor1.id : matchup.competitor2.id,
      status: 'completed',
      updatedAt: new Date(),
    });
    // Update v2 counters if present in config
    batch.update(v2Ref, {
      'config.survival.eliminatedCount': admin.firestore.FieldValue.increment(1),
      'config.survival.survivorsCount': admin.firestore.FieldValue.increment(-1),
      updatedAt: new Date(),
    });
    await batch.commit();
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Unsupported action' }, { status: 400 });
});

