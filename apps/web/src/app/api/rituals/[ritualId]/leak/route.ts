import { NextResponse } from 'next/server';
import { z } from 'zod';
import { withAuth } from '@/lib/api-auth-middleware';
import { dbAdmin } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

const LeakSchema = z.discriminatedUnion('action', [
  z.object({ action: z.literal('reveal'), clueId: z.string().min(1) }),
  z.object({ action: z.literal('submit'), content: z.string().min(3), clueId: z.string().optional() }),
]);

export const dynamic = 'force-dynamic';

export const POST = withAuth(async (request, auth, ctx) => {
  const ritualId = ctx.params?.ritualId;
  if (!ritualId) return NextResponse.json({ error: 'Missing ritualId' }, { status: 400 });

  const body = await request.json().catch(() => null);
  const parsed = LeakSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 });

  const userId = auth.userId;

  // Validate ritual & campus (prefer v2, fallback to legacy)
  const v2Ref = dbAdmin.collection('rituals_v2').doc(ritualId);
  const v2Snap = await v2Ref.get();
  const legacyRef = dbAdmin.collection('rituals').doc(ritualId);
  const legacySnap = await legacyRef.get();
  const snapshot = v2Snap.exists ? v2Snap : legacySnap;
  if (!snapshot.exists) return NextResponse.json({ error: 'Ritual not found' }, { status: 404 });
  const ritual = snapshot.data() as any;
  if (ritual.campusId !== CURRENT_CAMPUS_ID) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  if (parsed.data.action === 'reveal') {
    const { clueId } = parsed.data;
    const batch = dbAdmin.batch();

    // Track usage for reveal
    const usageRef = dbAdmin.collection('ritual_usage').doc();
    batch.set(usageRef, {
      ritualId,
      campusId: CURRENT_CAMPUS_ID,
      userId,
      action: 'leak_reveal',
      metadata: { clueId },
      createdAt: new Date(),
    });
    // Increment submissions metric
    batch.update(legacyRef, {
      'metrics.submissions': admin.firestore.FieldValue.increment(1),
      updatedAt: new Date(),
    });
    if (v2Snap.exists) {
      batch.update(v2Ref, { 'metrics.submissions': admin.firestore.FieldValue.increment(1), updatedAt: new Date() });
    }

    await batch.commit();
    return NextResponse.json({ success: true });
  }

  // Anonymous submission (accountability + feedback)
  const { content, clueId } = parsed.data;
  const batch = dbAdmin.batch();

  const feedbackRef = dbAdmin.collection('ritual_feedback').doc();
  batch.set(feedbackRef, {
    id: feedbackRef.id,
    ritualId,
    campusId: CURRENT_CAMPUS_ID,
    userId,
    type: 'leak_submission',
    content,
    clueId: clueId ?? null,
    anonymous: true,
    createdAt: new Date(),
  });

  const accountabilityRef = dbAdmin.collection('anonymous_content_accountability').doc();
  batch.set(accountabilityRef, {
    id: accountabilityRef.id,
    ritualId,
    campusId: CURRENT_CAMPUS_ID,
    userId,
    contentRef: feedbackRef.path,
    createdAt: new Date(),
  });

  batch.update(legacyRef, {
    'metrics.submissions': admin.firestore.FieldValue.increment(1),
    updatedAt: new Date(),
  });
  if (v2Snap.exists) {
    batch.update(v2Ref, { 'metrics.submissions': admin.firestore.FieldValue.increment(1), updatedAt: new Date() });
  }

  await batch.commit();
  return NextResponse.json({ success: true, feedbackId: feedbackRef.id });
});
