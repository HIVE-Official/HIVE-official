// Bounded Context Owner: Community Guild
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

let getSpaceCalendar: (spaceId: string) => Promise<import("../service").SpaceCalendarPayload>;

describe("getSpaceCalendar", () => {
  beforeAll(async () => {
    vi.stubEnv("USE_FIRESTORE_SPACES", "false");
    vi.stubEnv("ENABLE_DEV_SEEDS", "true");
    ({ getSpaceCalendar } = await import("../service"));
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-01T00:00:00.000Z"));
  });

  afterAll(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
  });

  it("returns sorted events with upcoming subset", async () => {
    const calendar = await getSpaceCalendar("space-robotics");

    expect(calendar.viewPreferences).toEqual({
      mobileDefault: "list",
      desktopDefault: "month"
    });

    expect(calendar.events.length).toBeGreaterThan(0);
    expect(typeof calendar.events[0].enableWaitlist).toBe("boolean");
    expect(calendar.events[0].goingCount).toBeGreaterThanOrEqual(0);
    const roboticsEvent = calendar.events.find((event) => event.postId === "post-robotics-event");
    expect(roboticsEvent).toBeDefined();
    expect(roboticsEvent?.location).toBe("Foundry Lab");
    expect(roboticsEvent?.tags).toContain("events");

    expect(calendar.events[0].startAt <= calendar.events[calendar.events.length - 1].startAt).toBe(
      true
    );

    // Upcoming should be a subset of events
    expect(calendar.upcoming.length).toBeLessThanOrEqual(calendar.events.length);

    const upcomingIds = new Set(calendar.upcoming.map((event) => event.id));
    calendar.upcoming.forEach((event) => {
      expect(upcomingIds.has(event.id)).toBe(true);
    });
  });
});
