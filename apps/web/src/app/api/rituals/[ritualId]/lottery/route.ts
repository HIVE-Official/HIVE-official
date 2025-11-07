import { NextResponse } from 'next/server';
import { z } from 'zod';
import { withAuth } from '@/lib/api-auth-middleware';
import { dbAdmin } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

const LotteryActionSchema = z.object({
  action: z.literal('enter'),
});

export const dynamic = 'force-dynamic';

export const POST = withAuth(async (request, auth, ctx) => {
  const ritualId = ctx.params?.ritualId;
  if (!ritualId) {
    return NextResponse.json({ error: 'Missing ritualId' }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const parsed = LotteryActionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  const userId = auth.userId;

  // Validate ritual & campus
  const ritualRef = dbAdmin.collection('rituals').doc(ritualId);
  const ritualDoc = await ritualRef.get();
  const v2Ref = dbAdmin.collection('rituals_v2').doc(ritualId);
  const v2Snap = await v2Ref.get();
  if (!ritualDoc.exists) {
    return NextResponse.json({ error: 'Ritual not found' }, { status: 404 });
  }
  const ritual = ritualDoc.data() as any;
  if (ritual.campusId !== CURRENT_CAMPUS_ID) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Enforce single entry per user
  const existing = await dbAdmin
    .collection('ritual_lottery_entries')
    .where('ritualId', '==', ritualId)
    .where('userId', '==', userId)
    .where('campusId', '==', CURRENT_CAMPUS_ID)
    .limit(1)
    .get();
  if (!existing.empty) {
    return NextResponse.json({ error: 'Already entered' }, { status: 409 });
  }

  const batch = dbAdmin.batch();

  // Record entry
  const entryRef = dbAdmin.collection('ritual_lottery_entries').doc();
  batch.set(entryRef, {
    id: entryRef.id,
    ritualId,
    campusId: CURRENT_CAMPUS_ID,
    userId,
    createdAt: new Date(),
  });

  // Increment submissions + applicants metrics
  batch.set(
    ritualRef,
    {
      metrics: {
        submissions: admin.firestore.FieldValue.increment(1),
      },
      updatedAt: new Date(),
    },
    { merge: true },
  );
  if (v2Snap.exists) {
    batch.update(v2Ref, {
      'metrics.submissions': admin.firestore.FieldValue.increment(1),
      'config.lottery.applicants': admin.firestore.FieldValue.increment(1),
      updatedAt: new Date(),
    });
  }

  await batch.commit();
  return NextResponse.json({ success: true });
});
