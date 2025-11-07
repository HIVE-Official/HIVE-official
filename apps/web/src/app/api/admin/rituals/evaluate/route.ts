import { NextResponse } from 'next/server';
import { withAdminCampusIsolation } from '@/lib/middleware';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';
import { EventBus, RitualEngineService } from '@hive/core';
import { registerRitualEventHandlers } from '@/lib/rituals/event-handlers';

export const dynamic = 'force-dynamic';

function createService() {
  const bus = new EventBus();
  registerRitualEventHandlers(bus);
  return new RitualEngineService(undefined, { campusId: CURRENT_CAMPUS_ID }, bus);
}

// GET /api/admin/rituals/evaluate
// Evaluates scheduled ritual phase transitions for the current campus.
export const GET = withAdminCampusIsolation(async (request) => {
  const atParam = request.nextUrl.searchParams.get('at');
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
});

