import { NextResponse } from 'next/server';
import { z } from 'zod';
import { withAuth } from '@/lib/api-auth-middleware';
import { dbAdmin } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

const UsageSchema = z.object({
  action: z.enum(['install', 'use', 'preview']),
  metadata: z.record(z.any()).optional(),
});

export const dynamic = 'force-dynamic';

export const POST = withAuth(async (request, auth, ctx) => {
  const ritualId = ctx.params?.ritualId;
  if (!ritualId) return NextResponse.json({ error: 'Missing ritualId' }, { status: 400 });

  const body = await request.json().catch(() => null);
  const parsed = UsageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  const { action, metadata } = parsed.data;
  const userId = auth.userId;

  // Validate ritual & campus (prefer v2, fallback to legacy)
  const v2Ref = dbAdmin.collection('rituals_v2').doc(ritualId);
  const v2Snap = await v2Ref.get();
  const legacyRef = dbAdmin.collection('rituals').doc(ritualId);
  const legacySnap = await legacyRef.get();
  const refToCheck = v2Snap.exists ? v2Ref : legacyRef;
  const snapshot = v2Snap.exists ? v2Snap : legacySnap;
  if (!snapshot.exists) return NextResponse.json({ error: 'Ritual not found' }, { status: 404 });
  const ritual = snapshot.data() as any;
  if (ritual.campusId !== CURRENT_CAMPUS_ID) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const batch = dbAdmin.batch();
  const usageRef = dbAdmin.collection('ritual_usage').doc();
  batch.set(usageRef, {
    ritualId,
    campusId: CURRENT_CAMPUS_ID,
    userId,
    action,
    metadata: metadata ?? {},
    createdAt: new Date(),
  });

  const ritualRef = legacyRef;
  if (action === 'install') {
    batch.update(ritualRef, {
      'metrics.conversions': admin.firestore.FieldValue.increment(1),
      updatedAt: new Date(),
    });
    if (v2Snap.exists) {
      batch.update(v2Ref, { 'metrics.conversions': admin.firestore.FieldValue.increment(1), updatedAt: new Date() });
    }
  } else {
    batch.update(ritualRef, {
      'metrics.submissions': admin.firestore.FieldValue.increment(1),
      updatedAt: new Date(),
    });
    if (v2Snap.exists) {
      batch.update(v2Ref, { 'metrics.submissions': admin.firestore.FieldValue.increment(1), updatedAt: new Date() });
    }
  }

  await batch.commit();
  return NextResponse.json({ success: true });
});
