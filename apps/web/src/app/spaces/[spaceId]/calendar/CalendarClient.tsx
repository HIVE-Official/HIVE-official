"use client";
// Bounded Context Owner: Community Guild
import { useState } from "react";
import type React from "react";
import { Card, CardContent, CardHeader, CardTitle, Badge, SpaceCalendarView, type CalendarEvent } from "@hive/ui";

export function CalendarClient(props: {
  events: CalendarEvent[];
  defaultView: "list" | "month";
  viewerIsLeader: boolean;
  upcomingCount: number;
  generatedAt: string;
}): JSX.Element {
  const { events, defaultView, viewerIsLeader, upcomingCount, generatedAt } = props;
  const [uiEvents, setUiEvents] = useState<CalendarEvent[]>(events);

  const handleRsvp: NonNullable<React.ComponentProps<typeof SpaceCalendarView>["onRSVP"]> = (eventId, status) => {
    const nextStatus = (current: CalendarEvent["userRsvp"]) => (current === status ? "not_going" : status);

    setUiEvents((prev) => prev.map((e) => (e.id === eventId ? { ...e, userRsvp: nextStatus(e.userRsvp) } : e)));

    // Persist to API (best-effort; UI remains optimistic)
    fetch(`${window.location.pathname.replace(/\/calendar$/, '')}/events/${eventId}/rsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    }).then(async (res) => {
      if (!res.ok) return;
      const json: unknown = await res.json().catch(() => null);
      const pickEvent = (v: unknown): { goingCount?: number; maybeCount?: number; waitlistCount?: number; userRsvp?: CalendarEvent["userRsvp"] } | null => {
        if (typeof v !== "object" || v === null) return null;
        const data = (v as { data?: unknown }).data;
        if (typeof data !== "object" || data === null) return null;
        const ev = (data as { event?: unknown }).event;
        if (typeof ev !== "object" || ev === null) return null;
        const e = ev as Record<string, unknown>;
        return {
          goingCount: typeof e.goingCount === "number" ? e.goingCount : undefined,
          maybeCount: typeof e.maybeCount === "number" ? e.maybeCount : undefined,
          waitlistCount: typeof e.waitlistCount === "number" ? e.waitlistCount : undefined,
          userRsvp: typeof e.userRsvp === "string" ? (e.userRsvp as CalendarEvent["userRsvp"]) : undefined
        };
      };
      const eventDetails = pickEvent(json);
      if (!eventDetails) return;
      setUiEvents((prev) => prev.map((e) => (e.id === eventId ? {
        ...e,
        goingCount: eventDetails.goingCount ?? e.goingCount,
        maybeCount: eventDetails.maybeCount ?? e.maybeCount,
        waitlistCount: eventDetails.waitlistCount ?? e.waitlistCount,
        userRsvp: eventDetails.userRsvp ?? e.userRsvp
      } : e)));
    }).catch(() => void 0);
  };
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 space-y-4">
      <SpaceCalendarView
        events={uiEvents}
        defaultView={defaultView}
        viewerIsLeader={viewerIsLeader}
        onRSVP={handleRsvp}
      />

      <Card className="border-border/70 bg-card/90">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-body font-body font-semibold">
            Upcoming coverage
            <Badge variant="neutral">{upcomingCount} scheduled</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-muted-foreground">
          <p>
            UB students rely on this calendar to spot what is happening next. Keep at least two
            events in the next seven days so the stream stays useful, and sync details with the
            main Space posts to avoid contradictions.
          </p>
          <p className="text-caption">
            Generated at {new Date(generatedAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}.
            Mobile defaults to the list view; desktop defaults to month per the Spaces IA spec. RSVP toggles locally; persistence hooks can be enabled once the API route is live.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
