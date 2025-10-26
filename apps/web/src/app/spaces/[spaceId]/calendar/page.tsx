// Bounded Context Owner: Community Guild
import { notFound } from "next/navigation";
import { spaceService, serializeSpace, getSpaceCalendar } from "../../../../server/spaces/service";
import { type CalendarEvent } from "@hive/ui/server";
import { CalendarClient } from "./CalendarClient";

const viewerId = "profile-jwrhineh";

export default async function SpaceCalendarPage({ params }: { params: { spaceId: string } }) {
  const snapshot = await spaceService.getSpaceById(params.spaceId);
  if (!snapshot) {
    notFound();
  }

  const [serialized, calendar] = await Promise.all([
    serializeSpace(snapshot, viewerId, { includeMeta: true }),
    getSpaceCalendar(params.spaceId)
  ]);

  const viewerMembership = serialized.membership as { role?: string } | null;
  const isLeader = viewerMembership?.role === "leader" || viewerMembership?.role === "admin";
  const upcomingCount = calendar.upcoming.length;
  const uiEvents: CalendarEvent[] = calendar.events.map((event) => ({
    id: event.id,
    spaceId: event.spaceId,
    title: event.title,
    description: event.description,
    location: event.location,
    startTime: new Date(event.startAt),
    endTime: new Date(event.endAt),
    coverImageUrl: event.coverImageUrl ?? undefined,
    coverImageAlt: event.coverImageAlt ?? undefined,
    tags: event.tags ? Array.from(event.tags) : [],
    maxAttendees: event.maxAttendees ?? undefined,
    enableWaitlist: event.enableWaitlist,
    goingCount: event.goingCount,
    maybeCount: event.maybeCount,
    waitlistCount: event.waitlistCount,
    checkInEnabled: event.checkInEnabled,
    checkInWindowBefore: event.checkInWindowBefore ?? undefined,
    checkInWindowAfter: event.checkInWindowAfter ?? undefined,
    qrCodeEnabled: event.qrCodeEnabled ?? false,
    checkedInCount: event.checkedInCount,
    coHostIds: Array.from(event.coHostIds),
    coHostNames: Array.from(event.coHostNames),
    isRssImported: event.isRssImported,
    userRsvp: event.userRsvp ?? undefined,
    userCheckedIn: undefined,
    createdAt: new Date(event.createdAt),
    updatedAt: new Date(event.updatedAt)
  }));

  return (
    <CalendarClient
      events={uiEvents}
      defaultView={calendar.viewPreferences.desktopDefault}
      viewerIsLeader={isLeader}
      upcomingCount={upcomingCount}
      generatedAt={calendar.generatedAt}
    />
  );
}
