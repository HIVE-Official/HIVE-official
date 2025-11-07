import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  EventBus,
  RitualArchetype,
  parseRitualUnion,
  RitualComposerSchema,
  RitualEngineService,
  UpsertRitualInput,
} from "@hive/core";
import { withAdminCampusIsolation } from "@/lib/middleware";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";
import { registerRitualEventHandlers } from "@/lib/rituals/event-handlers";

const ComposerPayloadSchema = RitualComposerSchema.extend({
  id: z.string().optional(),
  phase: z
    .union([
      z.literal("draft"),
      z.literal("announced"),
      z.literal("active"),
      z.literal("cooldown"),
      z.literal("ended"),
    ])
    .optional(),
  metrics: z.record(z.any()).optional(),
});

const QuerySchema = z.object({
  phase: z
    .array(
      z.union([
        z.literal("draft"),
        z.literal("announced"),
        z.literal("active"),
        z.literal("cooldown"),
        z.literal("ended"),
      ]),
    )
    .optional(),
});

const createService = () => {
  const eventBus = new EventBus();
  registerRitualEventHandlers(eventBus);
  return new RitualEngineService(undefined, { campusId: CURRENT_CAMPUS_ID }, eventBus);
};

export const dynamic = "force-dynamic";

export const GET = withAdminCampusIsolation(async (request) => {
  const phases = request.nextUrl.searchParams.getAll("phase");
  const parsedQuery = QuerySchema.safeParse({
    phase: phases.length > 0 ? phases : undefined,
  });

  if (!parsedQuery.success) {
    return NextResponse.json(
      { error: parsedQuery.error.message },
      { status: 400 },
    );
  }

  const service = createService();
  const result = await service.listRituals(
    CURRENT_CAMPUS_ID,
    parsedQuery.data.phase,
  );

  if (result.isFailure) {
    return NextResponse.json(
      { error: result.error ?? "Failed to load rituals" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    data: result.getValue(),
  });
});

export const POST = withAdminCampusIsolation(async (request) => {
  const raw = await request.json();
  const composerParse = ComposerPayloadSchema.safeParse(raw);

  if (!composerParse.success) {
    return NextResponse.json(
      { error: composerParse.error.message },
      { status: 400 },
    );
  }

  const nowIso = new Date().toISOString();
  const payload = composerParse.data;

  const candidate = {
    ...payload,
    id: payload.id ?? `rit_temp_${Date.now()}`,
    createdAt: raw.createdAt ?? nowIso,
    updatedAt: raw.updatedAt ?? nowIso,
    campusId: CURRENT_CAMPUS_ID,
    phase: payload.phase ?? "draft",
    metrics: payload.metrics,
  };

  const validated = parseRitualUnion(candidate);
  if (!validated.success) {
    return NextResponse.json(
      { error: validated.error.message },
      { status: 400 },
    );
  }

  const service = createService();

  const createInput: UpsertRitualInput = {
    ...validated.data,
    id: payload.id,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };

  const result = await service.createRitual(createInput);
  if (result.isFailure) {
    return NextResponse.json(
      { error: result.error ?? "Failed to create ritual" },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      data: result.getValue(),
    },
    { status: 201 },
  );
});
