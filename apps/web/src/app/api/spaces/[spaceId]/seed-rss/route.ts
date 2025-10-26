// Bounded Context Owner: Community Guild
// Dev-only RSS seeding shim — creates event posts marked as isRssImported.
// Usage (DEV ONLY; requires ENABLE_DEV_SEEDS=true):
//   POST /api/spaces/{spaceId}/seed-rss?count=5
// Response: { success: true, data: { created: number } }

import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { spaceService, spacePostService } from "../../../../../server/spaces/service";

export async function POST(request: Request, context: { params: { spaceId: string } }) {
  if (process.env.ENABLE_DEV_SEEDS !== "true") {
    return NextResponse.json(
      { success: false, error: { code: "FORBIDDEN", message: "RSS seeding is dev-only. Set ENABLE_DEV_SEEDS=true." } },
      { status: 403 }
    );
  }

  const space = await spaceService.getSpaceById(context.params.spaceId);
  if (!space) {
    return NextResponse.json(
      { success: false, error: { code: "SPACE_NOT_FOUND", message: "Space not found" } },
      { status: 404 }
    );
  }

  const url = new URL(request.url);
  const count = Math.max(1, Math.min(25, Number(url.searchParams.get("count") ?? 5)));

  let created = 0;
  const now = Date.now();
  for (let i = 0; i < count; i++) {
    const start = new Date(now + (i + 1) * 60 * 60 * 1000); // stagger hourly
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const title = `Campus event #${i + 1}`;

    const result = await spacePostService.create({
      postId: randomUUID(),
      spaceId: space.id,
      authorId: "rss-bot",
      authorHandle: "rss@import",
      content: `${title} — auto-seeded from RSS demo.`,
      kind: "event",
      audience: "public",
      tags: ["rss", "demo"],
      event: {
        title,
        description: `Auto-imported RSS demo event for ${space.name}.`,
        location: "TBD",
        startAt: start,
        endAt: end,
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
        coHostNames: [],
        isRssImported: true,
        userRsvp: null,
        userCheckedIn: false,
        coverImageUrl: null,
        coverImageAlt: null
      }
    });

    if (result.ok) {
      created += 1;
    }
  }

  return NextResponse.json({ success: true, data: { created } }, { status: 201 });
}

