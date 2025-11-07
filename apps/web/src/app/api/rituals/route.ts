import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  RitualArchetype,
  RitualEngineService,
  toFeedBanner,
  toDetailView,
} from '@hive/core';
import { withAuth } from '@/lib/api-auth-middleware';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

const QuerySchema = z.object({
  phase: z
    .array(
      z.union([
        z.literal('draft'),
        z.literal('announced'),
        z.literal('active'),
        z.literal('cooldown'),
        z.literal('ended'),
      ]),
    )
    .optional(),
  archetype: z.nativeEnum(RitualArchetype).optional(),
  format: z.enum(['raw', 'banner', 'detail']).default('banner'),
  activeOnly: z.coerce.boolean().optional(),
});

export const dynamic = 'force-dynamic';

export const GET = withAuth(async (request, authContext) => {
  void authContext; // Future: audit/logging

  const parsed = QuerySchema.safeParse({
    phase: request.nextUrl.searchParams.getAll('phase'),
    archetype: request.nextUrl.searchParams.get('archetype') ?? undefined,
    format: request.nextUrl.searchParams.get('format') ?? undefined,
    activeOnly:
      request.nextUrl.searchParams.get('activeOnly') ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.message },
      { status: 400 },
    );
  }

  const { phase, archetype, format, activeOnly } = parsed.data;
  const service = new RitualEngineService(undefined, {
    campusId: CURRENT_CAMPUS_ID,
  });

  let result;
  if (archetype) {
    result = activeOnly
      ? await service.listActiveRitualsByArchetype(
          CURRENT_CAMPUS_ID,
          archetype,
        )
      : await service.listRitualsByArchetype(
          CURRENT_CAMPUS_ID,
          archetype,
        );
  } else if (activeOnly) {
    result = await service.listActiveRituals(CURRENT_CAMPUS_ID);
  } else {
    result = await service.listRituals(CURRENT_CAMPUS_ID, phase);
  }

  if (result.isFailure) {
    return NextResponse.json(
      { error: result.error ?? 'Failed to load rituals' },
      { status: 500 },
    );
  }

  const data = result.getValue();
  const payload =
    format === 'banner'
      ? data.map(toFeedBanner)
      : format === 'detail'
        ? data.map(toDetailView)
        : data;

  return NextResponse.json({ data: payload });
});

export const POST = withAuth(async () => {
  return NextResponse.json(
    { error: 'Use admin endpoints to create rituals' },
    { status: 405 },
  );
});
