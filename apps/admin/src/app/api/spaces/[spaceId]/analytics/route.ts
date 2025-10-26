// Bounded Context Owner: Governance Guild
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { NextResponse } from "next/server";
import { isAdmin } from "@admin/server/auth";
import { loadAdminSpaceContext } from "@admin/server/space-context";

const DAY_MS = 24 * 60 * 60 * 1000;

export async function GET(
  _request: Request,
  { params }: { params: { spaceId: string } }
) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { success: false, error: { code: "NOT_AUTHORIZED", message: "Admin session required." } },
      { status: 403 }
    );
  }

  const context = await loadAdminSpaceContext(params.spaceId);
  if (!context) {
    return NextResponse.json(
      { success: false, error: { code: "SPACE_NOT_FOUND", message: "Space not found." } },
      { status: 404 }
    );
  }

  const serialized = context.serialized;
  const now = Date.now();
  const posts7d = context.posts.filter(
    (post) => new Date(post.createdAt).getTime() >= now - 7 * DAY_MS
  );

  const uniqueAuthors = new Set(posts7d.map((post) => post.authorId));
  const reactions7d = posts7d.reduce((acc, post) => acc + (post.reactions ?? 0), 0);
  const comments7d = posts7d.reduce((acc, post) => acc + (post.commentCount ?? 0), 0);
  const campusShares7d = posts7d.filter((post) => post.shareToCampus).length;

  const memberCount =
    Array.isArray(serialized.members) && (serialized.members as any[]).length > 0
      ? (serialized.members as any[]).length
      : Number(serialized.memberCount ?? 0);

  const postsPerMember = memberCount > 0 ? posts7d.length / memberCount : 0;

  const eventAttendance = context.calendar.events.map((event) => {
    const attendeeTotal = event.goingCount + event.maybeCount;
    return {
      id: event.id,
      title: event.title,
      startAt: event.startAt,
      goingCount: event.goingCount,
      capacity: event.maxAttendees ?? null,
      fillRate:
        event.maxAttendees && event.maxAttendees > 0
          ? Math.min(1, event.goingCount / event.maxAttendees)
          : null,
      engagement: attendeeTotal
    };
  });

  const avgFillRate =
    eventAttendance.length === 0
      ? null
      : eventAttendance.reduce((acc, event) => acc + (event.fillRate ?? 0), 0) /
        eventAttendance.filter((event) => event.fillRate !== null).length || null;

  const payload = {
    spaceId: params.spaceId,
    generatedAt: new Date().toISOString(),
    keyMetrics: [
      {
        id: "posts_per_member_7d",
        label: "Posts per member (7d)",
        value: Number(postsPerMember.toFixed(2)),
        format: "ratio"
      },
      {
        id: "active_authors_7d",
        label: "Active student authors (7d)",
        value: uniqueAuthors.size,
        format: "count"
      },
      {
        id: "campus_shares_7d",
        label: "Posts surfaced to campus (7d)",
        value: campusShares7d,
        format: "count"
      }
    ],
    engagement: {
      reactions7d,
      comments7d,
      posts7d: posts7d.length
    },
    events: {
      upcoming: context.calendar.upcoming.length,
      averageFillRate: avgFillRate,
      attendance: eventAttendance.slice(0, 5)
    },
    notes:
      "Metrics track UB student momentum. Watch posts/member and active authors to judge whether helpers need to recruit more leaders before opening the funnel wider."
  };

  return NextResponse.json({ success: true, data: payload });
}
