// Bounded Context Owner: Community Guild
import { NextResponse } from "next/server";
import { spaceService, serializeSpace } from "../../../../server/spaces/service";
import { Flags } from "../../../../server/flags";
import { buildRecommendedOrder } from "../../../../server/spaces/recommendations";

// Lightweight in-process campus-level cache for recommendation ranking inputs.
// Caches pre-serialized space summaries with activity metrics for a campus,
// then filters by viewer membership per request. TTL is tunable via Flags.
type CacheEntry = { at: number; items: any[] };
const CAMPUS_CACHE = new Map<string, CacheEntry>();

const DEFAULT_CAMPUS_ID = "ub-buffalo";
const DEFAULT_PROFILE_ID = "profile-jwrhineh";

const parseLimit = (value: string | null | undefined, fallback = 20) => {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return Math.min(50, Math.floor(n));
};

const decodeCursor = (cursor: string | null) => {
  if (!cursor) return 0;
  try {
    const raw = Buffer.from(cursor, "base64").toString("utf8");
    const n = Number(raw);
    return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
  } catch {
    return 0;
  }
};

const encodeCursor = (offset: number) => Buffer.from(String(offset)).toString("base64");

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL(request.url);
  const campusId = url.searchParams.get("campusId") ?? DEFAULT_CAMPUS_ID;
  const profileId = url.searchParams.get("profileId") ?? DEFAULT_PROFILE_ID;
  const limit = parseLimit(url.searchParams.get("limit"), 20);
  const startOffset = decodeCursor(url.searchParams.get("cursor"));
  const startedAt = Date.now();
  // Load catalog for viewer (to exclude already joined), and hydrate campus cache
  const catalog = await spaceService.getCatalogForProfile({ campusId, profileId });
  const ttlMs = Flags.recommendationCacheTtlMs();
  const now = Date.now();
  const cached = CAMPUS_CACHE.get(campusId);
  const fresh = cached && ttlMs > 0 && now - cached.at <= ttlMs;
  let source: "cache" | "recompute" = fresh ? "cache" : "recompute";

  let campusRanked: any[];
  if (fresh && cached) {
    campusRanked = cached.items;
  } else {
    const allSpaces = await spaceService.listByCampus(campusId);
    // Serialize with activity metrics for ranking; viewer-independent payload
    const cacheLocal = new Map<string, Promise<any>>();
    const serializeForCampus = (space: typeof allSpaces[number]) => {
      const key = space.id;
      const existing = cacheLocal.get(key);
      if (existing) return existing;
      const task = serializeSpace(space, "", {
        includeMeta: false,
        includePosts: false,
        includeTools: false,
        includeActivityMetrics: true
      }) as Promise<any>;
      cacheLocal.set(key, task);
      return task;
    };
    const summaries = await Promise.all(allSpaces.map(serializeForCampus));
    campusRanked = buildRecommendedOrder(summaries);
    if (ttlMs > 0) {
      CAMPUS_CACHE.set(campusId, { at: now, items: campusRanked });
    }
  }

  // Exclude viewer's joined spaces from campus-ranked list
  const joinedIds = new Set(catalog.joined.map((s) => s.id));
  const ranked = campusRanked.filter((s) => !joinedIds.has(s.id));

  const end = Math.min(startOffset + limit, ranked.length);
  const items = ranked.slice(startOffset, end);
  const nextCursor = end < ranked.length ? encodeCursor(end) : null;

  const endedAt = Date.now();
  const latencyMs = endedAt - startedAt;
  // Lightweight telemetry until a proper sink is wired
  // eslint-disable-next-line no-console
  console.warn({
    metric: "spaces.recommendations.rank.latency_ms",
    value: latencyMs,
    labels: { campusId, itemsTotal: campusRanked.length, blend: Flags.recommendationBlend() }
  });
  // cache metrics
  // eslint-disable-next-line no-console
  console.warn({
    metric: "spaces.recommendations.cache.hit",
    value: source === "cache" ? 1 : 0,
    labels: { campusId, ttlMs, ageMs: cached ? now - cached.at : null }
  });
  // eslint-disable-next-line no-console
  console.warn({
    metric: "spaces.recommendations.items.returned",
    value: items.length,
    labels: {
      campusId,
      limit,
      nextCursor: Boolean(nextCursor),
      blendEnabled: Flags.recommendationBlend(),
      repeatCap: Flags.recommendationRepeatCap()
    }
  });

  return NextResponse.json({
    success: true,
    data: {
      items,
      total: ranked.length,
      nextCursor
    }
  });
}
