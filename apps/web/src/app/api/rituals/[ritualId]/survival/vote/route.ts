import { NextResponse } from 'next/server';
import { z } from 'zod';
import { withAuth } from '@/lib/api-auth-middleware';
import { dbAdmin } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

const VoteSchema = z.object({
  matchupId: z.string().min(1),
  competitorId: z.string().min(1), // 'a' | 'b' or concrete id
});

export const dynamic = 'force-dynamic';

export const POST = withAuth(async (request, _auth, ctx) => {
  const ritualId = ctx.params?.ritualId;
  if (!ritualId) return NextResponse.json({ error: 'Missing ritualId' }, { status: 400 });

  const body = await request.json().catch(() => null);
  const parsed = VoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }
  const { matchupId, competitorId } = parsed.data;

  // Validate ritual (prefer v2)
  const v2Ref = dbAdmin.collection('rituals_v2').doc(ritualId);
  const v2Snap = await v2Ref.get();
  const legacyRef = dbAdmin.collection('rituals').doc(ritualId);
  const ritualSnap = v2Snap.exists ? v2Snap : await legacyRef.get();
  if (!ritualSnap.exists) return NextResponse.json({ error: 'Ritual not found' }, { status: 404 });
  const ritual = ritualSnap.data() as any;
  if (ritual.campusId !== CURRENT_CAMPUS_ID) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const isActive = ritual.phase ? ritual.phase === 'active' : ritual.status === 'active';
  if (!isActive) return NextResponse.json({ error: 'Ritual is not active' }, { status: 400 });

  // Load matchup
  const matchupRef = dbAdmin.collection('survival_matchups').doc(matchupId);
  const matchupSnap = await matchupRef.get();
  if (!matchupSnap.exists) return NextResponse.json({ error: 'Matchup not found' }, { status: 404 });
  const matchup = matchupSnap.data() as any;
  if (matchup.ritualId !== ritualId || matchup.campusId !== CURRENT_CAMPUS_ID) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Determine vote field
  let update: Record<string, unknown> = {};
  const cid = competitorId.toLowerCase();
  const isA = cid === 'a' || competitorId === matchup?.competitor1?.id;
  const isB = cid === 'b' || competitorId === matchup?.competitor2?.id;
  if (isA === isB) {
    // ambiguous or invalid competitor
    return NextResponse.json({ error: 'Invalid competitor' }, { status: 400 });
  }
  update[isA ? 'votesA' : 'votesB'] = admin.firestore.FieldValue.increment(1);
  update['updatedAt'] = new Date();

  const batch = dbAdmin.batch();
  batch.set(matchupRef, update, { merge: true });

  // Metrics bump (legacy + v2)
  batch.set(legacyRef, { metrics: { submissions: admin.firestore.FieldValue.increment(1) }, updatedAt: new Date() } as any, { merge: true });
  if (v2Snap.exists) {
    batch.update(v2Ref, { 'metrics.submissions': admin.firestore.FieldValue.increment(1), updatedAt: new Date() });
  }

  await batch.commit();
  return NextResponse.json({ success: true });
});

