"use client";
// Bounded Context Owner: Spaces Domain Guild
// Composite view that switches between List and Month calendars while preserving
// the @hive/ui calendar contracts.

import React, { useMemo, useState } from "react";
import { Button } from "../../atoms/button";
import { Card } from "../../atoms/card";
import { cn } from "@/utils/cn";
import { CalendarList } from "./calendar-list";
import { CalendarMonth } from "./calendar-month";
import type { CalendarEvent } from "./types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/molecules/tabs";
import { GridCalendarEngine } from "./engine/grid-engine";
import { Popover, PopoverContent, PopoverTrigger } from "@/molecules/popover";
import { Button as UIButton } from "@/atoms/button";
import { startOfDay, endOfDay } from "date-fns";

export interface SpaceCalendarViewProps {
  readonly events: readonly CalendarEvent[];
  readonly defaultView?: "list" | "month" | "day" | "week";
  readonly defaultScope?: "spaces" | "my";
  readonly viewerIsLeader?: boolean;
  readonly onEventClick?: (event: CalendarEvent) => void;
  readonly onRSVP?: (eventId: string, status: CalendarEvent["userRsvp"]) => void;
  readonly onCreateEvent?: () => void;
  readonly showOpenFullCalendarLink?: boolean;
  readonly onOpenFullCalendar?: () => void;
  readonly showSourcesToggle?: boolean;
  readonly showSubscribe?: boolean;
  readonly icsFeedUrl?: string; // tokenized URL (webcal/http)
  readonly lockScopeToSpace?: boolean; // hide My Schedule
  readonly compact?: boolean; // smaller paddings and grid
  readonly splitLayout?: boolean; // calendar left, events right
}

export const SpaceCalendarView: React.FC<SpaceCalendarViewProps> = ({
  events,
  defaultView = "list",
  defaultScope = "spaces",
  viewerIsLeader = false,
  onEventClick,
  onRSVP,
  onCreateEvent,
  showOpenFullCalendarLink = false,
  onOpenFullCalendar,
  showSourcesToggle = false,
  showSubscribe = false,
  icsFeedUrl,
  lockScopeToSpace = false,
  compact = false,
  splitLayout = false
}) => {
  const [view, setView] = useState<"list" | "month" | "week" | "day">(defaultView as any);
  const [scope, setScope] = useState<"spaces" | "my">(defaultScope);
  const [sources, setSources] = useState<{ campus: boolean; space: boolean; my: boolean; tools: boolean }>({ campus: true, space: true, my: true, tools: true });
  const [engineDate, setEngineDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const calendarEvents = useMemo(
    () => events.map((event) => ({
      ...event,
      startTime: new Date(event.startTime),
      endTime: new Date(event.endTime),
      createdAt: new Date(event.createdAt),
      updatedAt: new Date(event.updatedAt)
    })),
    [events]
  );

  const filteredEvents = useMemo(() => {
    let list = calendarEvents;
    // Scope filter
    if (!lockScopeToSpace && scope === "my") {
      list = list.filter((e) => e.userRsvp === "going" || e.userRsvp === "maybe");
    }
    // Sources filter (lean demo): treat tool items as those with a 'tool'/'deadline' tag
    if (!sources.tools) {
      list = list.filter((e: any) => !e.tags || !e.tags.some?.((t: string) => /tool|deadline/i.test(t)));
    }
    // View range filter for day/week
    if (view === 'day' || view === 'week') {
      const start = view === 'day' ? startOfDay(engineDate) : startOfDay(new Date(engineDate.getFullYear(), engineDate.getMonth(), engineDate.getDate() - engineDate.getDay()));
      const end = view === 'day' ? endOfDay(engineDate) : new Date(start.getTime() + 7 * 86400000);
      list = list.filter((e) => new Date(e.startTime) < end && new Date(e.endTime) > start);
    }
    return list;
  }, [calendarEvents, scope, sources, view, engineDate, lockScopeToSpace]);

  const rightPaneEvents = useMemo(() => {
    if (!splitLayout) return [] as CalendarEvent[];
    const base = selectedDate ? { start: startOfDay(selectedDate), end: endOfDay(selectedDate) } : { start: new Date(), end: new Date(Date.now() + 7*86400000) };
    return calendarEvents.filter((e) => new Date(e.startTime) < base.end && new Date(e.endTime) > base.start);
  }, [splitLayout, selectedDate, calendarEvents]);

  const handleCreateEvent = viewerIsLeader ? onCreateEvent : undefined;

  return (
    <Card className={cn("w-full space-y-4 border-border/70 bg-card/90 p-4 transition duration-smooth ease-standard", compact && "p-3 space-y-3") }>
      {/* Scope tabs: Spaces | My Schedule */}
      {!lockScopeToSpace && (
        <Tabs value={scope} onValueChange={(v) => setScope(v as any)}>
          <TabsList className="mb-2">
            <TabsTrigger value="spaces">Spaces</TabsTrigger>
            <TabsTrigger value="my">My Schedule</TabsTrigger>
          </TabsList>
          <TabsContent value="spaces" className="mt-0" />
          <TabsContent value="my" className="mt-0" />
        </Tabs>
      )}

      {/* View switcher + IA (sources + full calendar link) */}
      <div className="flex items-center justify-between">
        {showSourcesToggle ? (
          <div data-experimental className="hidden md:flex flex-wrap items-center gap-2 text-caption">
            <button className={"rounded-full border px-2.5 py-1 " + (sources.campus ? "border-primary/50" : "border-border/50 hover:bg-muted/40")}
              onClick={() => setSources((s) => ({ ...s, campus: !s.campus }))}>Campus</button>
            <button className={"rounded-full border px-2.5 py-1 " + (sources.space ? "border-primary/50" : "border-border/50 hover:bg-muted/40")}
              onClick={() => setSources((s) => ({ ...s, space: !s.space }))}>Robotics Guild</button>
            <button className={"rounded-full border px-2.5 py-1 " + (sources.my ? "border-primary/50" : "border-border/50 hover:bg-muted/40")}
              onClick={() => setSources((s) => ({ ...s, my: !s.my }))}>My</button>
            <button className={"rounded-full border px-2.5 py-1 " + (sources.tools ? "border-primary/50" : "border-border/50 hover:bg-muted/40")}
              onClick={() => setSources((s) => ({ ...s, tools: !s.tools }))}>Tools</button>
          </div>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-3">
          {showSubscribe && icsFeedUrl && (
            <Popover>
              <PopoverTrigger asChild>
                <UIButton variant="ghost" size="sm" className="text-caption text-primary hover:underline">Subscribe</UIButton>
              </PopoverTrigger>
              <PopoverContent align="end" sideOffset={8} className="min-w-[260px]">
                <div className="space-y-2">
                  <p className="text-caption text-muted-foreground">Keep this calendar in sync:</p>
                  <button
                    className="w-full rounded-md border border-border/50 px-2 py-1 text-left hover:bg-muted/40"
                    onClick={() => {
                      try {
                        navigator.clipboard.writeText(icsFeedUrl);
                      } catch (error) {
                        console.warn("space.calendar.copy_ics_failed", error);
                      }
                    }}
                  >
                    Copy ICS URL
                  </button>
                  <a
                    className="block w-full rounded-md border border-border/50 px-2 py-1 hover:bg-muted/40"
                    href={icsFeedUrl.startsWith('webcal://') ? icsFeedUrl : icsFeedUrl.replace(/^https?:\/\//, 'webcal://')}
                  >
                    Open in Apple Calendar
                  </a>
                  <a
                    className="block w-full rounded-md border border-border/50 px-2 py-1 hover:bg-muted/40"
                    href="https://calendar.google.com/calendar/u/0/r/settings/addbyurl"
                    target="_blank" rel="noopener noreferrer"
                  >
                    Google Calendar (Add by URL)
                  </a>
                </div>
              </PopoverContent>
            </Popover>
          )}
          {showOpenFullCalendarLink && (
            <button type="button" onClick={onOpenFullCalendar} className="text-caption text-primary hover:underline">
              Open full calendar
            </button>
          )}
          <div className="inline-flex rounded-md border border-border/60 bg-muted/30 p-1 shadow-sm">
            <Button type="button" variant={view == "list" ? "default" : "ghost"} size="sm" onClick={() => setView("list")}>
              List
            </Button>
            <Button type="button" variant={view == "day" ? "default" : "ghost"} size="sm" onClick={() => setView("day")}>
              Day
            </Button>
            <Button type="button" variant={view == "week" ? "default" : "ghost"} size="sm" onClick={() => setView("week")}>
              Week
            </Button>
            <Button type="button" variant={view == "month" ? "default" : "ghost"} size="sm" onClick={() => setView("month")}>
              Month
            </Button>
          </div>
        </div>
      </div>

      {splitLayout ? (
        <div className={cn("grid w-full min-w-0 gap-3", compact ? "lg:grid-cols-[300px,1fr]" : "lg:grid-cols-[360px,1fr]") }>
          <div className="min-w-0">
            {view === 'month' ? (
              <div className="anim-slide-fade">
                <CalendarMonth
                events={filteredEvents}
                canCreateEvents={viewerIsLeader}
                onCreateEvent={handleCreateEvent}
                onEventClick={onEventClick}
                onDayClick={(date) => { setEngineDate(date); setSelectedDate(date); setView('day'); }}
                />
              </div>
            ) : view === 'list' ? (
              <div className="anim-slide-fade">
                <CalendarList
                events={filteredEvents}
                canCreateEvents={viewerIsLeader}
                onCreateEvent={handleCreateEvent}
                onEventClick={onEventClick}
                onRSVP={onRSVP}
                />
              </div>
            ) : (
              <div className="anim-slide-fade">
                <GridCalendarEngine
                view={view as any}
                events={filteredEvents}
                currentDate={engineDate}
                onSelectSlot={({ start }) => { if (viewerIsLeader) onCreateEvent?.(); setSelectedDate(start); }}
                onSelectEvent={(evt) => { onEventClick?.(evt); setSelectedDate(new Date(evt.startTime)); }}
                />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <div className="anim-fade-in">
              <CalendarList
              events={rightPaneEvents}
              canCreateEvents={false}
              onEventClick={onEventClick}
              onRSVP={onRSVP}
              maxPerGroup={5}
              className={cn(compact && "text-sm")}
              />
            </div>
          </div>
        </div>
      ) : (
        view === "list" ? (
          <div className="anim-slide-fade">
            <CalendarList
            events={filteredEvents}
            canCreateEvents={viewerIsLeader}
            onCreateEvent={handleCreateEvent}
            onEventClick={onEventClick}
            onRSVP={onRSVP}
            />
          </div>
        ) : view === "month" ? (
          <div className="anim-slide-fade">
            <CalendarMonth
            events={filteredEvents}
            canCreateEvents={viewerIsLeader}
            onCreateEvent={handleCreateEvent}
            onEventClick={onEventClick}
            onDayClick={(date) => { setEngineDate(date); setSelectedDate(date); setView('day'); }}
            />
          </div>
        ) : (
          <div className="anim-slide-fade">
            <GridCalendarEngine
            view={view as any}
            events={filteredEvents}
            currentDate={engineDate}
            onSelectSlot={({ start }) => { if (viewerIsLeader) onCreateEvent?.(); setSelectedDate(start); }}
            onSelectEvent={(evt) => { onEventClick?.(evt); setSelectedDate(new Date(evt.startTime)); }}
            />
          </div>
        )
      )}
    </Card>
  );
};
