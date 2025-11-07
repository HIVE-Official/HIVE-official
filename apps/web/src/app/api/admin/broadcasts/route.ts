import { NextResponse } from 'next/server';
import { z } from 'zod';
import { withAdminCampusIsolation } from '@/lib/middleware';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';

const CreateBroadcastSchema = z.object({
  title: z.string().min(3).max(120),
  message: z.string().min(3).max(1000),
  target: z.union([z.literal('campus'), z.literal('space')]).default('campus'),
  spaceId: z.string().optional(),
  scheduleAt: z.string().datetime().optional(), // ISO string
  priority: z.union([z.literal('normal'), z.literal('high')]).default('normal'),
});

const ListQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).default(20),
  status: z.union([z.literal('scheduled'), z.literal('sent')]).optional(),
});

export const GET = withAdminCampusIsolation(async (request) => {
  const qp = Object.fromEntries(request.nextUrl.searchParams.entries());
  const parsed = ListQuerySchema.safeParse(qp);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  const { limit, status } = parsed.data;

  try {
    let query = dbAdmin
      .collection('admin_broadcasts')
      .where('campusId', '==', CURRENT_CAMPUS_ID)
      .orderBy('scheduleAt', 'desc')
      .limit(limit);

    const snap = await query.get();
    const now = Date.now();
    const items = snap.docs
      .map((d) => ({ id: d.id, ...(d.data() as any) }))
      .filter((b) => {
        if (!status) return true;
        const scheduled = b.scheduleAt ? new Date(b.scheduleAt).getTime() : now;
        const sent = Boolean(b.sentAt);
        return status === 'scheduled' ? !sent && scheduled >= now - 60_000 : sent;
      });

    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    logger.error('[ADMIN_BROADCASTS_LIST] Failed', { error: String(error) });
    return NextResponse.json({ error: 'Failed to list broadcasts' }, { status: 500 });
  }
});

export const POST = withAdminCampusIsolation(async (request, token) => {
  try {
    const body = await request.json().catch(() => null);
    const parsed = CreateBroadcastSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.message }, { status: 400 });
    }
    const data = parsed.data;

    if (data.target === 'space' && !data.spaceId) {
      return NextResponse.json({ error: 'spaceId required for target=space' }, { status: 400 });
    }

    const ref = dbAdmin.collection('admin_broadcasts').doc();
    const payload = {
      id: ref.id,
      campusId: CURRENT_CAMPUS_ID,
      title: data.title,
      message: data.message,
      target: data.target,
      spaceId: data.spaceId || null,
      scheduleAt: data.scheduleAt || new Date().toISOString(),
      priority: data.priority,
      createdAt: new Date().toISOString(),
      createdBy: token.email || token.uid,
      sentAt: null as string | null,
      status: 'scheduled' as const,
    };

    await ref.set(payload);
    logger.info('[ADMIN_BROADCASTS_CREATE] Scheduled', { id: ref.id, campusId: CURRENT_CAMPUS_ID });

    return NextResponse.json({ success: true, data: payload }, { status: 201 });
  } catch (error) {
    logger.error('[ADMIN_BROADCASTS_CREATE] Failed', { error: String(error) });
    return NextResponse.json({ error: 'Failed to schedule broadcast' }, { status: 500 });
  }
});

