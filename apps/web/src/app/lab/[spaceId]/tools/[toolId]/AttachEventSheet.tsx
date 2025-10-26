"use client";
// Bounded Context Owner: HiveLab Guild
import { useCallback, useEffect, useMemo, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, Input, Button, Badge } from "@hive/ui";

interface Props {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly spaceId: string;
  readonly toolId: string;
  readonly elementId?: string; // defaults to quick_form for seeds
}

interface AttachableEvent {
  readonly id: string;
  readonly title: string;
  readonly startAt: string;
  readonly endAt: string;
  readonly location: string | null;
}

interface ResponseShape {
  success: boolean;
  data?: { events: AttachableEvent[]; window: { start: string; end: string }; nextCursor: string | null };
  error?: { code: string; message: string };
}

export function AttachEventSheet({ open, onOpenChange, spaceId, toolId, elementId = "quick_form" }: Props): JSX.Element {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [events, setEvents] = useState<AttachableEvent[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [windowInfo, setWindowInfo] = useState<{ start: string; end: string } | null>(null);
  const [hasMore, setHasMore] = useState(false);

  const endpoint = useMemo(() => {
    const usp = new URLSearchParams();
    usp.set("spaceId", spaceId);
    usp.set("profileId", "profile-jwrhineh"); // dev-only
    if (query.trim()) usp.set("query", query.trim());
    if (cursor) usp.set("cursor", cursor);
    usp.set("limit", "10");
    return `/api/tools/${encodeURIComponent(toolId)}/elements/${encodeURIComponent(elementId)}/attachable-events?${usp.toString()}`;
  }, [spaceId, toolId, elementId, query, cursor]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch(endpoint);
        const json: ResponseShape = await res.json();
        if (!json.success || !json.data) {
          throw new Error(json.error?.message ?? `Failed (${res.status})`);
        }
        if (cancelled) return;
        setEvents(json.data.events);
        setWindowInfo(json.data.window);
        setHasMore(Boolean(json.data.nextCursor));
      } catch (e: any) {
        if (!cancelled) setErr(e?.message ?? "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [endpoint, open]);

  const handleAttach = useCallback(
    async (eventId: string, eventTitle: string) => {
      try {
        const res = await fetch(
          `/api/tools/${encodeURIComponent(toolId)}/elements/${encodeURIComponent(elementId)}/attach?profileId=profile-jwrhineh`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ eventId })
          }
        );
        if (!res.ok) throw new Error(`Attach failed (${res.status})`);
        onOpenChange(false);
        alert(`Attached to ${eventTitle}`);
      } catch (error) {
        alert(error instanceof Error ? error.message : "Attach failed");
      }
    },
    [elementId, onOpenChange, toolId]
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[420px] sm:w-[560px]">
        <SheetHeader>
          <SheetTitle>Attach to Event</SheetTitle>
          <SheetDescription>Choose an upcoming event to attach this tool to.</SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search events by title or location"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="secondary" onClick={() => setCursor(null)}>Search</Button>
          </div>
          {windowInfo ? (
            <div className="text-xs text-muted-foreground">
              Window: {new Date(windowInfo.start).toLocaleString()} → {new Date(windowInfo.end).toLocaleString()}
            </div>
          ) : null}
          {err ? <div className="text-sm text-red-500">{err}</div> : null}
          <div className="grid gap-2">
            {loading ? (
              <div className="text-sm text-muted-foreground">Loading…</div>
            ) : events.length === 0 ? (
              <div className="text-sm text-muted-foreground">No upcoming events found.</div>
            ) : (
              events.map((ev) => (
                <div key={ev.id} className="flex items-center justify-between rounded-lg border border-border/40 p-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{ev.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(ev.startAt).toLocaleString()} • {ev.location ?? "TBA"}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Event</Badge>
                    <Button size="sm" onClick={() => { void handleAttach(ev.id, ev.title); }}>
                      Select
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex items-center justify-between">
            <div />
            <div className="flex gap-2">
              <Button variant="ghost" disabled={!hasMore || loading} onClick={() => setCursor(null)}>Reset</Button>
              <Button variant="secondary" disabled={!hasMore || loading} onClick={() => setCursor(events[events.length - 1]?.startAt ?? null)}>More</Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default AttachEventSheet;
