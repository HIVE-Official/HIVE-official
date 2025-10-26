// Bounded Context Owner: Community Guild
// Secure Engage RSS import into a Space as Event posts
// POST /api/spaces/{spaceId}/import/engage?secret=...&url=...&limit=50
// Env: RSS_IMPORT_SECRET (required in prod), ENGAGE_RSS_URL (optional default)

import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { parseEngageRssXml } from "../../../../../../server/integrations/engage/rss";
import { spacePostService, spaceService, getSpacePostById } from "../../../../../../server/spaces/service";
import { classifySpaceTypeFromHost, defaultJoinPolicyForType } from "../../../../../../server/integrations/engage/host-classifier";
import { getHostOverride } from "../../../../../../server/integrations/engage/host-overrides";
import { mapEngageCategories } from "../../../../../../server/integrations/engage/category-mapping";
import type { SpaceType, SpaceJoinPolicy } from "@core";

const DEFAULT_URL = process.env.ENGAGE_RSS_URL || "https://buffalo.campuslabs.com/engage/events.rss";
const IMPORT_SECRET = process.env.RSS_IMPORT_SECRET || process.env.ENGAGE_RSS_IMPORT_SECRET || "";

const toDeterministicId = (spaceId: string, sourceId: string): string => {
  // Stable 128-bit id from (spaceId, sourceId)
  const hash = createHash("sha256").update(`${spaceId}:${sourceId}`).digest("hex");
  return `engage-${hash.slice(0, 24)}`; // 96-bit prefix is sufficient and readable
};

async function handle(request: Request, context: { params: { spaceId: string } }) {
  const url = new URL(request.url);
  const providedSecret = url.searchParams.get("secret") || url.searchParams.get("token") || "";
  const feedUrl = (url.searchParams.get("url") || DEFAULT_URL).toString();
  const limit = Math.max(1, Math.min(200, parseInt(url.searchParams.get("limit") || "0", 10) || 0)) || 100;
  const mode = (url.searchParams.get("mode") || "aggregate").toLowerCase(); // "aggregate" | "by-host"
  const createSpaces = (url.searchParams.get("createSpaces") || "true").toLowerCase() !== "false";

  // Guard: require secret in non-dev environments and allow optional hard-disable in prod
  const isDev = process.env.NODE_ENV !== "production" || process.env.ENABLE_DEV_SEEDS === "true";
  if (!isDev) {
    if (process.env.ENGAGE_IMPORT_ENABLED === "false") {
      return NextResponse.json({ success: false, error: { code: "DISABLED", message: "Engage import disabled" } }, { status: 403 });
    }
    if (!IMPORT_SECRET || providedSecret !== IMPORT_SECRET) {
      return NextResponse.json({ success: false, error: { code: "FORBIDDEN", message: "Invalid or missing import secret" } }, { status: 403 });
    }
  }

  // Validate space exists
  let parentSpace: Awaited<ReturnType<typeof spaceService.getSpaceById>>;
  try {
    const space = await spaceService.getSpaceById(context.params.spaceId);
    if (!space) {
      return NextResponse.json({ success: false, error: { code: "SPACE_NOT_FOUND" } }, { status: 404 });
    }
    parentSpace = space;
  } catch (e) {
    return NextResponse.json({ success: false, error: { code: "SPACE_LOOKUP_FAILED", message: String((e as Error)?.message || e) } }, { status: 500 });
  }

  let xml: string;
  try {
    const resp = await fetch(feedUrl, { method: "GET" });
    if (!resp.ok) {
      return NextResponse.json({ success: false, error: { code: "FETCH_FAILED", status: resp.status } }, { status: 502 });
    }
    xml = await resp.text();
  } catch (e) {
    return NextResponse.json({ success: false, error: { code: "NETWORK_ERROR", message: String((e as Error)?.message || e) } }, { status: 500 });
  }

  const items = parseEngageRssXml(xml)
    .filter((it) => (it.status || "").toLowerCase() !== "cancelled")
    .slice(0, limit);

  const results: Array<{ id: string; ok: boolean; error?: string }> = [];
  let created = 0;

  const ensureSpaceForHost = async (hostName: string, categories: string[]): Promise<string | null> => {
    if (!hostName) return null;
    const campusId = parentSpace!.campusId;
    const override = getHostOverride(hostName);
    if (override?.skip) return null;
    const displayName = override?.normalizeTo?.trim() || hostName.trim();
    // Deterministic id from host
    const slug = displayName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
      .slice(0, 48);
    const spaceId = override?.spaceId || `org-${slug || createHash("sha1").update(displayName).digest("hex").slice(0, 8)}`;
    const existing = await spaceService.getSpaceById(spaceId);
    if (existing) {
      // Opportunistically add category tags for better discovery
      try {
        const existingTags = new Set((existing.tags ?? []).map((t) => t.trim()).filter(Boolean));
        const mapped = mapEngageCategories(categories);
        for (const t of mapped.canonical) existingTags.add(t);
        existingTags.add("engage");
        existingTags.add("auto-import");
        for (const t of override?.tags ?? []) existingTags.add(t);
        await spaceService.updateDetails(spaceId, { name: displayName, tags: Array.from(existingTags) });
      } catch (error) {
        console.warn("engage.host_tags.update_failed", { spaceId: existing.id, error });
      }
      return existing.id;
    }
    if (!createSpaces) return null;

    const type: SpaceType = override?.type || classifySpaceTypeFromHost(displayName, categories);
    const joinPolicy = defaultJoinPolicyForType(type) as SpaceJoinPolicy;

    // Leader assignment: use a system placeholder; can be claimed later.
    const leaderId = process.env.DEFAULT_SPACE_LEADER_ID || "system";
    const description = `Auto-created from Engage host: ${displayName}. Claim this space to manage events.`;
    const createResult = await spaceService.createSpace({
      spaceId,
      campusId,
      leaderId,
      name: displayName,
      description,
      type,
      visibility: "campus",
      tags: Array.from(new Set(["engage", "auto-import", ...mapEngageCategories(categories).canonical, ...((override?.tags ?? []) as string[])])),
      settings: { isInviteOnly: joinPolicy === "invite_only" }
    });
    if (!createResult.ok) return null;
    // Update join policy if needed (supports "request")
    await spaceService.updateSettings(spaceId, { joinPolicy });
    return spaceId;
  };

  for (const ev of items) {
    // Resolve all target spaces based on co-hosts when by-host mode is enabled
    const hostSpaceIds: string[] = [];
    if (mode === "by-host" && ev.hosts.length > 0) {
      for (const hostName of ev.hosts) {
        const sid = await ensureSpaceForHost(hostName, ev.categories);
        if (sid) hostSpaceIds.push(sid);
      }
    }
    const targetSpaceIds = hostSpaceIds.length > 0 ? Array.from(new Set(hostSpaceIds)) : [context.params.spaceId];

    for (const targetSpaceId of targetSpaceIds) {
      const postId = toDeterministicId(targetSpaceId, ev.id);
      const content = ev.textDescription || `Imported from UBLinked: ${ev.title}`;
      const tagsBase = new Set(["engage", "rss", "ub"]);
      const categoryTags = mapEngageCategories(ev.categories);
      for (const t of categoryTags.canonical) tagsBase.add(t);
      // Keep raw categories for transparency (slugged, prefixed) already included via mapEngageCategories when unmapped.
      if ((ev.status || "").toLowerCase() === "tentative") tagsBase.add("tentative");

      const attachments: Array<{ type: "image" | "file" | "link" | "video"; url: string; title?: string; description?: string }> = [];
      if (ev.imageUrl) {
        attachments.push({ type: "image", url: ev.imageUrl, title: ev.title });
      }
      if (ev.link) {
        attachments.push({ type: "link", url: ev.link, title: ev.title, description: ev.textDescription ?? undefined });
      }

      const startAt = ev.startAt || new Date();
      const endAt = ev.endAt && ev.endAt > startAt ? ev.endAt : new Date(startAt.getTime() + 60 * 60 * 1000);

      try {
        // Idempotency per space
        const existing = await getSpacePostById(targetSpaceId, postId);
        if (existing) {
          results.push({ id: postId, ok: true });
          continue;
        }
        const result = await spacePostService.create({
          postId,
          spaceId: targetSpaceId,
          authorId: "rss-bot",
          authorHandle: "rss@import",
          content,
          tags: Array.from(tagsBase),
          kind: "event",
          audience: "campus",
          origin: "tool_automation",
          shareToCampus: true,
          attachments,
          event: {
            title: ev.title,
            description: ev.textDescription,
            location: ev.location || "TBD",
            startAt,
            endAt,
            maxAttendees: null,
            enableWaitlist: false,
            goingCount: 0,
            maybeCount: 0,
            waitlistCount: 0,
            checkInEnabled: false,
            checkedInCount: 0,
            checkInWindowBefore: null,
            checkInWindowAfter: null,
            qrCodeEnabled: false,
            coHostIds: [],
            coHostNames: ev.hosts,
            isRssImported: true,
            userRsvp: null,
            userCheckedIn: false,
            coverImageUrl: ev.imageUrl,
            coverImageAlt: ev.title
          }
        });

        if (result.ok) {
          created += 1;
          results.push({ id: postId, ok: true });
        } else {
          results.push({ id: postId, ok: false, error: result.error });
        }
      } catch (e) {
        results.push({ id: postId, ok: false, error: String((e as Error)?.message || e) });
      }
    }
  }

  return NextResponse.json({ success: true, data: { feedUrl, created, attempted: items.length, results } }, { status: 200 });
}

export const POST = handle;
export const GET = handle;
