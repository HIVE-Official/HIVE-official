import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  EventBus,
  RitualEngineService,
  UpsertRitualInput,
} from "@hive/core";
import { withAdminCampusIsolation } from "@/lib/middleware";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";
import { registerRitualEventHandlers } from "@/lib/rituals/event-handlers";

const UpdatePayloadSchema = z
  .object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    slug: z.string().optional(),
    phase: z
      .union([
        z.literal("draft"),
        z.literal("announced"),
        z.literal("active"),
        z.literal("cooldown"),
        z.literal("ended"),
      ])
      .optional(),
    startsAt: z.string().optional(),
    endsAt: z.string().optional(),
    visibility: z
      .union([
        z.literal("public"),
        z.literal("invite_only"),
        z.literal("secret"),
      ])
      .optional(),
    presentation: z.record(z.any()).optional(),
    metrics: z.record(z.any()).optional(),
    config: z.record(z.any()).optional(),
  })
  .partial();

const createService = () => {
  const eventBus = new EventBus();
  registerRitualEventHandlers(eventBus);
  return new RitualEngineService(undefined, { campusId: CURRENT_CAMPUS_ID }, eventBus);
};

export const dynamic = "force-dynamic";

export const GET = withAdminCampusIsolation(
  async (_request, _token, context: { params: { ritualId: string } }) => {
    const service = createService();

    const result = await service.getRitual(context.params.ritualId);
    if (result.isFailure) {
      return NextResponse.json(
        { error: result.error ?? "Ritual not found" },
        { status: result.error?.includes("not found") ? 404 : 500 },
      );
    }

    return NextResponse.json({ data: result.getValue() });
  },
);

export const PATCH = withAdminCampusIsolation(
  async (
    request: NextRequest,
    _token,
    context: { params: { ritualId: string } },
  ) => {
    const body = await request.json();
    const parsed = UpdatePayloadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.message },
        { status: 400 },
      );
    }

    const service = createService();

    const updateResult = await service.updateRitual(
      context.params.ritualId,
      parsed.data as Partial<UpsertRitualInput>,
    );

    if (updateResult.isFailure) {
      return NextResponse.json(
        { error: updateResult.error ?? "Failed to update ritual" },
        { status: 400 },
      );
    }

    return NextResponse.json({ data: updateResult.getValue() });
  },
);

export const DELETE = withAdminCampusIsolation(
  async (_request, _token, context: { params: { ritualId: string } }) => {
    const service = createService();

    const result = await service.deleteRitual(context.params.ritualId);
    if (result.isFailure) {
      return NextResponse.json(
        { error: result.error ?? "Failed to delete ritual" },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true });
  },
);
