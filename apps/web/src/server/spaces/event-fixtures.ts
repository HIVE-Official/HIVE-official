// Bounded Context Owner: Community Guild
import type { SpacePostSnapshot } from "@core";
import { seedSpacePostSnapshots } from "./post-fixtures";

export interface SpaceEventFixture {
  readonly id: string;
  readonly postId: string;
  readonly spaceId: string;
  readonly title: string;
  readonly description: string | null;
  readonly startAt: Date;
  readonly endAt: Date;
  readonly durationMinutes: number;
  readonly location: string;
  readonly maxAttendees: number | null;
  readonly enableWaitlist: boolean;
  readonly goingCount: number;
  readonly maybeCount: number;
  readonly waitlistCount: number;
  readonly checkInEnabled: boolean;
  readonly checkInWindowBefore: number | null;
  readonly checkInWindowAfter: number | null;
  readonly qrCodeEnabled: boolean;
  readonly checkedInCount: number;
  readonly coHostIds: readonly string[];
  readonly coHostNames: readonly string[];
  readonly userRsvp: "going" | "maybe" | "not_going" | "waitlist" | null;
  readonly tags: readonly string[];
  readonly coverImageUrl: string | null;
  readonly coverImageAlt: string | null;
  readonly isRssImported: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

const toFixture = (snapshot: SpacePostSnapshot): SpaceEventFixture | null => {
  const event = snapshot.event;
  if (!event) {
    return null;
  }

  const durationMinutes = Math.max(
    1,
    Math.round((event.endAt.getTime() - event.startAt.getTime()) / (60 * 1000))
  );

  return {
    id: snapshot.id,
    postId: snapshot.id,
    spaceId: snapshot.spaceId,
    title: event.title,
    description: event.description ?? snapshot.content,
    startAt: event.startAt,
    endAt: event.endAt,
    durationMinutes,
    location: event.location,
    maxAttendees: event.maxAttendees,
    enableWaitlist: event.enableWaitlist,
    goingCount: event.goingCount,
    maybeCount: event.maybeCount,
    waitlistCount: event.waitlistCount,
    checkInEnabled: event.checkInEnabled,
    checkInWindowBefore: event.checkInWindowBefore ?? null,
    checkInWindowAfter: event.checkInWindowAfter ?? null,
    qrCodeEnabled: event.qrCodeEnabled,
    checkedInCount: event.checkedInCount,
    coHostIds: event.coHostIds,
    coHostNames: event.coHostNames,
    userRsvp: event.userRsvp,
    tags: snapshot.tags,
    coverImageUrl: event.coverImageUrl,
    coverImageAlt: event.coverImageAlt,
    isRssImported: event.isRssImported,
    createdAt: snapshot.createdAt,
    updatedAt: snapshot.updatedAt
  };
};

export const seedSpaceEvents: readonly SpaceEventFixture[] = seedSpacePostSnapshots
  .map(toFixture)
  .filter((fixture): fixture is SpaceEventFixture => fixture !== null);
