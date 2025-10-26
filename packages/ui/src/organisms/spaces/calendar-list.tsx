// Bounded Context Owner: Spaces Domain Guild
/**
 * CalendarList - List view of upcoming events
 *
 * Shows events in chronological order with:
 * - Grouping by date (Today, Tomorrow, This Week, etc.)
 * - Quick RSVP actions
 * - Event status indicators
 * - Filter by RSVP status
 */

import React from "react";
import { Button } from "../../atoms/button";
import { Badge } from "../../atoms/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../atoms/card";
import { cn } from "../../utils/cn";
import type { CalendarEvent, RSVPStatus } from "./types";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Check,
  X,
  HelpCircle,
  Plus,
  // Filter,
} from "lucide-react";
import {
  format,
  isToday,
  isTomorrow,
  isThisWeek,
  isPast,
  differenceInDays,
} from "date-fns";

export interface CalendarListProps {
  /** Events to display */
  events: CalendarEvent[];

  /** Event click handler */
  onEventClick?: (event: CalendarEvent) => void;

  /** RSVP click handler */
  onRSVP?: (eventId: string, status: RSVPStatus) => void;

  /** Create event handler (leaders only) */
  onCreateEvent?: () => void;

  /** Whether user can create events */
  canCreateEvents?: boolean;

  /** Filter by RSVP status */
  filterStatus?: "all" | "going" | "maybe" | "not_going" | "no_response";

  /** Max items per group before "Show more" appears */
  maxPerGroup?: number;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Group events by relative time
 */
function groupEventsByTime(
  events: CalendarEvent[]
): Map<string, CalendarEvent[]> {
  const groups = new Map<string, CalendarEvent[]>();

  events.forEach((event) => {
    const eventDate = new Date(event.startTime);
    let groupKey: string;

    if (isPast(eventDate)) {
      groupKey = "Past Events";
    } else if (isToday(eventDate)) {
      groupKey = "Today";
    } else if (isTomorrow(eventDate)) {
      groupKey = "Tomorrow";
    } else if (isThisWeek(eventDate)) {
      groupKey = "This Week";
    } else {
      const daysAway = differenceInDays(eventDate, new Date());
      if (daysAway <= 7) {
        groupKey = "This Week";
      } else if (daysAway <= 30) {
        groupKey = "This Month";
      } else {
        groupKey = format(eventDate, "MMMM yyyy");
      }
    }

    if (!groups.has(groupKey)) {
      groups.set(groupKey, []);
    }
    groups.get(groupKey)!.push(event);
  });

  return groups;
}

export const CalendarList = React.forwardRef<HTMLDivElement, CalendarListProps>(
  (
    {
      events,
      onEventClick,
      onRSVP,
      onCreateEvent,
      canCreateEvents = false,
      filterStatus = "all",
      className,
      maxPerGroup = 5,
    },
    ref
  ) => {
    // Filter events if needed
    const filteredEvents = React.useMemo(() => {
      if (filterStatus === "all") return events;
      return events.filter((event) => event.userRsvp === filterStatus);
    }, [events, filterStatus]);

    // Group by time
    const groupedEvents = React.useMemo(
      () => groupEventsByTime(filteredEvents),
      [filteredEvents]
    );

    const [expandedGroups, setExpandedGroups] = React.useState<Set<string>>(new Set());
    const toggleGroup = (key: string) => {
      setExpandedGroups((prev) => {
        const next = new Set(prev);
        if (next.has(key)) next.delete(key); else next.add(key);
        return next;
      });
    };

    return (
      <Card ref={ref} className={cn("w-full bg-card border-border", className)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <CardTitle className="text-h3 font-h3">Events</CardTitle>
            </div>
            {canCreateEvents && (
              <Button
                onClick={onCreateEvent}
                variant="default"
                size="sm"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Event
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Event groups */}
          {Array.from(groupedEvents.entries()).map(
            ([groupName, groupEvents]) => (
              <div key={groupName} className="space-y-3">
                <h3 className="text-body-sm font-body-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {groupName}
                </h3>

                <div className="space-y-3">
                  {(expandedGroups.has(groupName) ? groupEvents : groupEvents.slice(0, maxPerGroup)).map((event) => {
                    const eventDate = new Date(event.startTime);
                    const isEventPast = isPast(eventDate);
                    const proposalStatus = (event as any).proposalStatus as ("pending"|"approved"|"declined"|undefined);

                    return (
                      <button
                        key={event.id}
                        onClick={() => onEventClick?.(event)}
                        className={cn(
                          "w-full text-left p-4 rounded-lg border transition-colors",
                          "hover:bg-muted/30",
                          isEventPast
                            ? "bg-muted/10 border-border/30 opacity-60"
                            : "bg-card border-border"
                        )}
                      >
                        <div className="space-y-3">
                          {/* Title and RSVP status */}
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="text-body font-body font-semibold line-clamp-2 flex-1">
                              {event.title}
                            </h4>
                            {event.userRsvp && (
                              <Badge
                                variant={
                                  event.userRsvp === "going"
                                    ? "success"
                                    : event.userRsvp === "maybe"
                                    ? "warning"
                                    : "outline"
                                }
                                className="flex-shrink-0 gap-1"
                              >
                                {event.userRsvp === "going" && (
                                  <Check className="h-3 w-3" />
                                )}
                                {event.userRsvp === "maybe" && (
                                  <HelpCircle className="h-3 w-3" />
                                )}
                                {event.userRsvp === "not_going" && (
                                  <X className="h-3 w-3" />
                                )}
                                {event.userRsvp === "going" && "Going"}
                                {event.userRsvp === "maybe" && "Maybe"}
                                {event.userRsvp === "not_going" && "Not Going"}
                              </Badge>
                            )}
                            {proposalStatus && (
                              <Badge variant="outline" className={cn("flex-shrink-0",
                                proposalStatus === 'pending' && 'text-warning border-warning/40',
                                proposalStatus === 'approved' && 'text-success border-success/40',
                                proposalStatus === 'declined' && 'text-destructive border-destructive/40'
                              )}>
                                {proposalStatus === 'pending' && 'Proposed'}
                                {proposalStatus === 'approved' && 'Approved'}
                                {proposalStatus === 'declined' && 'Declined'}
                              </Badge>
                            )}
                          </div>

                          {/* Event metadata */}
                          <div className="space-y-2 text-body-sm font-body-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 flex-shrink-0" />
                              <span>
                                {format(eventDate, "EEE, MMM d • h:mm a")}
                              </span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 flex-shrink-0" />
                                <span className="line-clamp-1">
                                  {event.location}
                                </span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 flex-shrink-0" />
                              <span>
                                {event.goingCount} going
                                {event.maybeCount > 0 &&
                                  `, ${event.maybeCount} maybe`}
                              </span>
                            </div>
                          </div>

                          {/* Quick RSVP actions (if not past) */}
                          {!isEventPast && onRSVP && (
                            <div className="flex items-center gap-2 pt-2 border-t border-border/30">
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onRSVP(event.id, "going");
                                }}
                                variant={
                                  event.userRsvp === "going"
                                    ? "default"
                                    : "ghost"
                                }
                                size="sm"
                                className="gap-2"
                              >
                                <Check className="h-4 w-4" />
                                Going
                              </Button>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onRSVP(event.id, "maybe");
                                }}
                                variant={
                                  event.userRsvp === "maybe"
                                    ? "secondary"
                                    : "ghost"
                                }
                                size="sm"
                                className="gap-2"
                              >
                                <HelpCircle className="h-4 w-4" />
                                Maybe
                              </Button>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onRSVP(event.id, "not_going");
                                }}
                                variant="ghost"
                                size="sm"
                                className="gap-2"
                              >
                                <X className="h-4 w-4" />
                                Can't Go
                              </Button>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                  {groupEvents.length > maxPerGroup && !expandedGroups.has(groupName) && (
                    <button onClick={() => toggleGroup(groupName)} className="text-caption text-primary hover:underline">Show more</button>
                  )}
                  {expandedGroups.has(groupName) && groupEvents.length > maxPerGroup && (
                    <button onClick={() => toggleGroup(groupName)} className="text-caption text-primary hover:underline">Show less</button>
                  )}
                </div>
              </div>
            )
          )}

          {/* Empty state */}
          {filteredEvents.length === 0 && (
            <div className="py-12 text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-body font-body text-muted-foreground mb-2">
                No events found
              </p>
              <p className="text-body-sm font-body-sm text-muted-foreground">
                {filterStatus !== "all"
                  ? "Try changing your filter"
                  : "Events will appear here once created"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);

CalendarList.displayName = "CalendarList";
