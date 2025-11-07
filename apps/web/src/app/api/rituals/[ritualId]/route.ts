import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  RitualEngineService,
  toDetailView,
} from '@hive/core';
import { withAuth } from '@/lib/api-auth-middleware';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';
import { logger } from '@/lib/logger';

const QuerySchema = z.object({
  format: z.enum(['detail', 'raw']).default('detail'),
});

export const dynamic = 'force-dynamic';

export const GET = withAuth(async (request, _authContext, context) => {
  const ritualIdentifier = context.params?.ritualId;
  if (!ritualIdentifier) {
    return NextResponse.json({ error: 'Ritual identifier is required' }, { status: 400 });
  }

  const parsed = QuerySchema.safeParse({
    format: request.nextUrl.searchParams.get('format') ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  const service = new RitualEngineService(undefined, { campusId: CURRENT_CAMPUS_ID });
  let ritualResult = await service.getRitual(ritualIdentifier);

  if (ritualResult.isFailure) {
    ritualResult = await service.getRitualBySlug(ritualIdentifier, CURRENT_CAMPUS_ID);
  }

  if (ritualResult.isFailure) {
    logger.warn('[RITUAL_DETAIL_API] Ritual not found', {
      ritualIdentifier,
      campusId: CURRENT_CAMPUS_ID,
    });
    return NextResponse.json({ error: 'Ritual not found' }, { status: 404 });
  }

  const ritual = ritualResult.getValue();

  if (parsed.data.format === 'raw') {
    return NextResponse.json({ data: ritual });
  }

  const detail = toDetailView(ritual);
  return NextResponse.json({ data: detail });
});
