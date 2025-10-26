/**
 * EventsWidget - Consolidated Events Tool
 *
 * Combines "next event" preview + calendar access
 * Click-through to full events page via breadcrumb navigation
 */

import React from "react";
import { BaseWidget } from "./base-widget";
import { Button } from "@/atoms/button";
import { Badge } from "@/atoms/badge";
import { Calendar, MapPin, Users, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";
import type { CalendarEvent } from "../types";
import { NowChip } from "@/molecules/spaces/calendar-chips";
import { format, formatDistanceToNow, isToday, isTomorrow } from "date-fns";

export interface EventsWidgetProps {
  /** Next 2-3 upcoming events */
  upcomingEvents: CalendarEvent[];

  /** Current user's RSVP status for each event */
  userRsvps?: Record<string, "going" | "maybe">;

  /** Click event to navigate to detail */
  onEventClick?: (eventId: string) => void;

  /** Click header to navigate to full calendar */
  onViewAllEvents?: () => void;

  /** RSVP handler */
  onRsvp?: (eventId: string, status: "going" | "maybe") => void;

  /** Loading state */
  loading?: boolean;

  /** Custom class */
  className?: string;

  /** Visual variant: default (list) or poster (hero tile for live/spotlight) */
  variant?: "default" | "poster";
}

const EventsWidget = React.forwardRef<HTMLDivElement, EventsWidgetProps>(
  (
    {
      upcomingEvents,
      userRsvps = {},
      onEventClick,
      onViewAllEvents,
      onRsvp,
      loading,
      className,
      variant = "default",
    },
    ref
  ): JSX.Element => {
    const nextEvent = upcomingEvents[0];
    const otherEvents = upcomingEvents.slice(1, 3);

    const formatEventTime = (date: Date): string => {
      if (isToday(date)) {
        return `Today ${format(date, "h:mm a")}`;
      }
      if (isTomorrow(date)) {
        return `Tomorrow ${format(date, "h:mm a")}`;
      }
      return format(date, "EEE MMM d, h:mm a");
    };

    const getTimeUntil = (date: Date): string => {
      return formatDistanceToNow(date, { addSuffix: true });
    };

    const now = new Date();
    const isLive = (ev: CalendarEvent): boolean => ev.startTime <= now && ev.endTime >= now;

    return (
      <BaseWidget
        ref={ref}
        title="EVENTS"
        icon={<Calendar className="h-4 w-4" />}
        headerHint="Upcoming rituals"
        accent="primary"
        backgroundLabel="Events"
        loading={loading}
        action={{
          label: "Open",
          onClick: () => onViewAllEvents?.(),
        }}
        className={cn(className)}
        onClick={() => onViewAllEvents?.()}
      >
        {upcomingEvents.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
            <p className="text-body-sm text-muted-foreground">
              No upcoming events
            </p>
          </div>
        ) : (variant === "poster" && nextEvent && isLive(nextEvent) && !!nextEvent.coverImageUrl) ? (
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl border border-[hsl(var(--primary)/0.25)]",
              "bg-[hsl(var(--background)/0.65)]/80 transition-all duration-300",
              "hover:-translate-y-1 hover:border-[hsl(var(--primary)/0.4)] hover:bg-[hsl(var(--background)/0.72)]"
            )}
            role="button"
            tabIndex={0}
            aria-haspopup="dialog"
            aria-label={`Open ${nextEvent.title} details`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onEventClick?.(nextEvent.id);
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
              onEventClick?.(nextEvent.id);
            }}
          >
            {/* Cover */}
            <div className="relative aspect-[16/9]">
              {nextEvent.coverImageUrl ? (
                <img
                  src={nextEvent.coverImageUrl}
                  alt={nextEvent.coverImageAlt ?? nextEvent.title}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, 480px"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-[hsl(var(--primary)/0.12)]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                {isLive(nextEvent) && <NowChip />}
                <Badge variant="outline" className="bg-black/40 text-white border-white/30">
                  {formatEventTime(nextEvent.startTime)}
                </Badge>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="text-body font-semibold text-white drop-shadow-md line-clamp-2">
                  {nextEvent.title}
                </h4>
                <div className="mt-1 flex items-center gap-2 text-caption text-white/90">
                  <Users className="h-3 w-3" />
                  <span>{nextEvent.goingCount} going</span>
                  {nextEvent.maybeCount > 0 && <span>• {nextEvent.maybeCount} maybe</span>}
                </div>
              </div>
            </div>

            {/* CTA row */}
            <div className="flex items-center justify-between p-3">
              <div className="text-caption text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span className="line-clamp-1">{nextEvent.location ?? ""}</span>
              </div>
              {onRsvp && (
                <div onClick={(e) => e.stopPropagation()}>
                  <Button
                    size="sm"
                    variant={userRsvps[nextEvent.id] === "going" ? "default" : "outline"}
                    className="h-7 px-2 text-[11px]"
                    aria-pressed={userRsvps[nextEvent.id] === "going"}
                    aria-label={userRsvps[nextEvent.id] === "going" ? "Going. Press to change." : "RSVP going"}
                    onClick={() => onRsvp(nextEvent.id, "going")}
                  >
                    {(() => {
                      const atCapacity =
                        typeof nextEvent.maxAttendees === "number" &&
                        (nextEvent.goingCount ?? 0) >= (nextEvent.maxAttendees as number);
                      if (userRsvps[nextEvent.id] === "going") return "Going ✓";
                      return atCapacity ? "Waitlist" : "RSVP";
                    })()}
                  </Button>
                </div>
              )}
            </div>

            {/* View full calendar affordance */}
            <div className="flex items-center justify-center border-t border-border/50 py-2">
              <button
                onClick={(e) => { e.stopPropagation(); onViewAllEvents?.(); }}
                className="text-caption text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group"
                aria-label="View full calendar"
              >
                <span>View full calendar</span>
                <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Next Event (Prominent) */}
            {nextEvent && (
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-[hsl(var(--primary)/0.25)]",
                  "bg-[hsl(var(--background)/0.65)]/80 p-4 transition-all duration-300",
                  "hover:-translate-y-1 hover:border-[hsl(var(--primary)/0.4)] hover:bg-[hsl(var(--background)/0.72)]"
                )}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label={`Open ${nextEvent.title} details`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onEventClick?.(nextEvent.id);
                  }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onEventClick?.(nextEvent.id);
                }}
              >
                {/* Group label for Today/Tomorrow */}
                <p className="text-caption text-muted-foreground mb-1">
                  {isToday(nextEvent.startTime) ? "Today" : isTomorrow(nextEvent.startTime) ? "Tomorrow" : format(nextEvent.startTime, "EEE MMM d")}
                </p>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[hsl(var(--primary)/0.18)] blur-3xl opacity-80"
                />
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-body font-semibold text-foreground line-clamp-1">
                      {nextEvent.title}
                    </h4>
                    <p className="text-caption text-primary font-medium mt-0.5">
                      {formatEventTime(nextEvent.startTime)}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="shrink-0 text-[10px] px-1.5 py-0.5"
                  >
                    {getTimeUntil(nextEvent.startTime)}
                  </Badge>
                </div>

                {nextEvent.location && (
                  <div className="flex items-center gap-1.5 text-caption text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3" />
                    <span className="line-clamp-1">{nextEvent.location}</span>
                  </div>
                )}

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-caption text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{nextEvent.goingCount} going</span>
                    {nextEvent.maybeCount > 0 && (
                      <span className="text-muted-foreground/60">
                        • {nextEvent.maybeCount} maybe
                      </span>
                    )}
                  </div>

                  {onRsvp && (
                    <div
                      className="flex gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        size="sm"
                        variant={
                          userRsvps[nextEvent.id] === "going"
                            ? "default"
                            : "outline"
                        }
                        className="h-6 px-2 text-[11px]"
                        aria-pressed={userRsvps[nextEvent.id] === "going"}
                        aria-label={userRsvps[nextEvent.id] === "going" ? "Going. Press to change." : "RSVP going"}
                        onClick={() => onRsvp(nextEvent.id, "going")}
                      >
                        {(() => {
                          const atCapacity =
                            typeof nextEvent.maxAttendees === "number" &&
                            (nextEvent.goingCount ?? 0) >= (nextEvent.maxAttendees as number);
                          if (userRsvps[nextEvent.id] === "going") return "Going ✓";
                          return atCapacity ? "Waitlist" : "RSVP";
                        })()}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Other Upcoming Events (Compact) */}
            {otherEvents.length > 0 && (
              <div className="space-y-2 pt-1 border-t border-border/50">
                {otherEvents.map((event) => (
                  <div
                    key={event.id}
                    className={cn(
                      "group flex items-center gap-2 rounded-xl border border-transparent bg-[hsl(var(--background)/0.6)]/70 p-2",
                      "transition-all duration-300 hover:-translate-y-0.5 hover:border-[hsl(var(--primary)/0.3)] hover:bg-[hsl(var(--background)/0.75)]"
                    )}
                    role="button"
                    tabIndex={0}
                    aria-haspopup="dialog"
                    aria-label={`Open ${event.title} details`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onEventClick?.(event.id);
                      }
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick?.(event.id);
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-body-sm font-medium text-foreground line-clamp-1">
                        {event.title}
                      </p>
                      <p className="text-caption text-muted-foreground">
                        {formatEventTime(event.startTime)}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/40 shrink-0 transition-transform group-hover:translate-x-1" />
                  </div>
                ))}
              </div>
            )}

            {/* Click affordance */}
            <div className="flex items-center justify-center pt-2 border-t border-border/50">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewAllEvents?.();
                }}
                className="text-caption text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group"
              >
                <span>View full calendar</span>
                <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </BaseWidget>
    );
  }
);

EventsWidget.displayName = "EventsWidget";

export { EventsWidget };




