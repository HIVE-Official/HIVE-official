// Bounded Context Owner: Engagement Guild
import { NextResponse } from "next/server";
import { z } from "zod";
import { getFeedForProfile } from "../../../server/feed/service";

const QuerySchema = z.object({
  campusId: z.string().min(1),
  profileId: z.string().min(1),
  limit: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : undefined))
    .refine((v) => (v === undefined ? true : Number.isFinite(v) && v > 0 && v <= 50), "invalid limit")
}).and(
  z
    .object({ cursor: z.string().datetime().optional() })
    .transform((v) => ({ cursor: v.cursor }))
);

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  const parse = QuerySchema.safeParse({
    campusId: url.searchParams.get("campusId"),
    profileId: url.searchParams.get("profileId"),
    limit: url.searchParams.get("limit") ?? undefined
  });

  if (!parse.success) {
    return NextResponse.json({ error: parse.error.flatten() }, { status: 400 });
  }

  const { campusId, profileId, limit, cursor } = parse.data as { campusId: string; profileId: string; limit?: number; cursor?: string };
  const started = Date.now();
  const items = await getFeedForProfile({ campusId, profileId, limit, cursor });
  const nextCursor = items.length > 0 ? items[items.length - 1].createdAt : null;
  const durationMs = Date.now() - started;
  // basic telemetry to console
  // eslint-disable-next-line no-console
  console.info("telemetry.feed_response", { campusId, profileId, durationMs, count: items.length });
  return NextResponse.json({ items, nextCursor });
}
