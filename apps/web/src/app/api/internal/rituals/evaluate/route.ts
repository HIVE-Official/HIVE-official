import { NextResponse } from 'next/server';
import { EventBus, RitualEngineService } from '@hive/core';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';
import { registerRitualEventHandlers } from '@/lib/rituals/event-handlers';

export const dynamic = 'force-dynamic';

function createService() {
  const bus = new EventBus();
  registerRitualEventHandlers(bus);
  return new RitualEngineService(undefined, { campusId: CURRENT_CAMPUS_ID }, bus);
}

function authorize(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  // Allow if Vercel cron header present AND secret matches Authorization bearer
  const isCron = request.headers.get('x-vercel-cron') === '1';
  const auth = request.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : undefined;
  return Boolean(isCron && secret && token && token === secret);
}

export const GET = async (request: Request) => {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const atParam = new URL(request.url).searchParams.get('at');
  const reference = atParam ? new Date(atParam) : new Date();

  const service = createService();
  const result = await service.evaluateScheduledTransitions(CURRENT_CAMPUS_ID, reference);

  if (result.isFailure) {
    return NextResponse.json(
      { error: result.error ?? 'Failed to evaluate transitions' },
      { status: 500 },
    );
  }

  const transitions = result.getValue();
  return NextResponse.json({
    success: true,
    count: transitions.length,
    data: transitions,
    evaluatedAt: reference.toISOString(),
  });
};

