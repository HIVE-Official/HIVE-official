import { NextResponse } from 'next/server';
import { z } from 'zod';
import { withAdminCampusIsolation } from '@/lib/middleware';
import { dbAdmin } from '@/lib/firebase-admin';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

const GenerateSchema = z.object({
  round: z.number().int().positive().default(1),
  pairs: z
    .array(
      z.object({
        a: z.string().min(1),
        b: z.string().min(1),
      }),
    )
    .min(1),
});

export const dynamic = 'force-dynamic';

export const POST = withAdminCampusIsolation(async (request, _token, ctx) => {
  const ritualId = ctx.params?.ritualId;
  if (!ritualId) return NextResponse.json({ error: 'Missing ritualId' }, { status: 400 });

  const body = await request.json().catch(() => null);
  const parsed = GenerateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 });

  const { pairs, round } = parsed.data;

  // Validate ritual exists and belongs to campus
  const ritualDoc = await dbAdmin.collection('rituals').doc(ritualId).get();
  if (!ritualDoc.exists) return NextResponse.json({ error: 'Ritual not found' }, { status: 404 });
  const ritual = ritualDoc.data() as any;
  if (ritual.campusId !== CURRENT_CAMPUS_ID) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const batch = dbAdmin.batch();
  const created: string[] = [];
  for (const p of pairs) {
    const ref = dbAdmin.collection('ritual_matchups').doc();
    batch.set(ref, {
      id: ref.id,
      ritualId,
      campusId: CURRENT_CAMPUS_ID,
      round,
      a: p.a,
      b: p.b,
      votesA: 0,
      votesB: 0,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    created.push(ref.id);
  }

  await batch.commit();

  return NextResponse.json({ success: true, created, round });
});

