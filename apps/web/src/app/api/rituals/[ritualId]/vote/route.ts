import { NextResponse } from 'next/server';
import { z } from 'zod';
import { withAuth } from '@/lib/api-auth-middleware';
import { dbAdmin } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

const VoteSchema = z.object({
  matchupId: z.string().min(1),
  choice: z.enum(['a', 'b']),
});

export const dynamic = 'force-dynamic';

export const POST = withAuth(async (request, auth, ctx) => {
  const ritualId = ctx.params?.ritualId;
  if (!ritualId) {
    return NextResponse.json({ error: 'Missing ritualId' }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const parsed = VoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  const { matchupId, choice } = parsed.data;
  const userId = auth.userId;

  // Validate ritual (prefer v2, fallback to legacy)
  const v2Ref = dbAdmin.collection('rituals_v2').doc(ritualId);
  const v2Snap = await v2Ref.get();
  const legacyRef = dbAdmin.collection('rituals').doc(ritualId);
  const ritualDoc = v2Snap.exists ? v2Snap : await legacyRef.get();
  if (!ritualDoc.exists) {
    return NextResponse.json({ error: 'Ritual not found' }, { status: 404 });
  }
  const ritual = ritualDoc.data() as any;
  if (ritual.campusId !== CURRENT_CAMPUS_ID) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  // For v2 payloads, require phase === 'active'
  if ((ritual.status && ritual.status !== 'active') || (ritual.phase && ritual.phase !== 'active')) {
    return NextResponse.json({ error: 'Ritual is not active' }, { status: 400 });
  }

  // Enforce one vote per user per matchup
  const existing = await dbAdmin
    .collection('ritual_votes')
    .where('ritualId', '==', ritualId)
    .where('matchupId', '==', matchupId)
    .where('userId', '==', userId)
    .where('campusId', '==', CURRENT_CAMPUS_ID)
    .limit(1)
    .get();
  if (!existing.empty) {
    return NextResponse.json({ error: 'Already voted' }, { status: 409 });
  }

  const batch = dbAdmin.batch();

  const voteRef = dbAdmin.collection('ritual_votes').doc();
  batch.set(voteRef, {
    ritualId,
    matchupId,
    userId,
    choice,
    campusId: CURRENT_CAMPUS_ID,
    createdAt: new Date(),
  });

  // Update matchup counters
  const matchupRef = dbAdmin.collection('ritual_matchups').doc(matchupId);
  batch.set(
    matchupRef,
    {
      ritualId,
      campusId: CURRENT_CAMPUS_ID,
      votesA: choice === 'a' ? admin.firestore.FieldValue.increment(1) : admin.firestore.FieldValue.increment(0),
      votesB: choice === 'b' ? admin.firestore.FieldValue.increment(1) : admin.firestore.FieldValue.increment(0),
      updatedAt: new Date(),
    },
    { merge: true },
  );

  // Increment ritual submissions metric (legacy + v2)
  batch.update(legacyRef, {
    'metrics.submissions': admin.firestore.FieldValue.increment(1),
    updatedAt: new Date(),
  });
  if (v2Snap.exists) {
    batch.update(v2Ref, { 'metrics.submissions': admin.firestore.FieldValue.increment(1), updatedAt: new Date() });
  }

  await batch.commit();

  return NextResponse.json({ success: true });
});
