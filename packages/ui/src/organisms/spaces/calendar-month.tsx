"use client";
// Bounded Context Owner: Spaces Domain Guild
/**
 * CalendarMonth - Monthly calendar view for space events
 *
 * Shows events in a traditional calendar grid with:
 * - Current month navigation
 * - Day cells with event indicators
 * - Click to view event details
 * - Quick RSVP from hover
 */

import React, { useState } from "react";
import { Button } from "../../atoms/button";
import { Badge } from "../../atoms/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../atoms/card";
import { cn } from "../../utils/cn";
import type { CalendarEvent } from "./types";
import { ChevronLeft, ChevronRight, Calendar, Plus } from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
} from "date-fns";

export interface CalendarMonthProps {
  /** Events to display */
  events: CalendarEvent[];

  /** Current selected month */
  selectedMonth?: Date;

  /** Event click handler */
  onEventClick?: (event: CalendarEvent) => void;

  /** Day click handler */
  onDayClick?: (date: Date) => void;

  /** Create event handler (leaders only) */
  onCreateEvent?: () => void;

  /** Whether user can create events */
  canCreateEvents?: boolean;

  /** Additional CSS classes */
  className?: string;
}

export const CalendarMonth = React.forwardRef<
  HTMLDivElement,
  CalendarMonthProps
>(
  (
    {
      events,
      selectedMonth: initialMonth,
      onEventClick,
      onDayClick,
      onCreateEvent,
      canCreateEvents = false,
      className,
    },
    ref
  ) => {
    const [currentMonth, setCurrentMonth] = useState(
      initialMonth || new Date()
    );

    // Get calendar grid days
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
    const calendarDays = eachDayOfInterval({
      start: calendarStart,
      end: calendarEnd,
    });

    // Group events by date
    const eventsByDate = React.useMemo(() => {
      const map = new Map<string, CalendarEvent[]>();
      events.forEach((event) => {
        const dateKey = format(new Date(event.startTime), "yyyy-MM-dd");
        if (!map.has(dateKey)) {
          map.set(dateKey, []);
        }
        map.get(dateKey)!.push(event);
      });
      return map;
    }, [events]);

    const handlePreviousMonth = () => {
      setCurrentMonth((prev) => subMonths(prev, 1));
    };

    const handleNextMonth = () => {
      setCurrentMonth((prev) => addMonths(prev, 1));
    };

    return (
      <Card ref={ref} className={cn("bg-card border-border", className)}>
        <CardHeader className="space-y-3">
          {/* Header: Month nav + create */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <CardTitle className="text-h3 font-h3">
                {format(currentMonth, "MMMM yyyy")}
              </CardTitle>
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

          {/* Month navigation */}
          <div className="flex items-center justify-between">
            <Button
              onClick={handlePreviousMonth}
              variant="ghost"
              size="icon"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              onClick={() => setCurrentMonth(new Date())}
              variant="ghost"
              size="sm"
            >
              Today
            </Button>

            <Button
              onClick={handleNextMonth}
              variant="ghost"
              size="icon"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-caption font-caption font-semibold text-muted-foreground py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day) => {
              const dateKey = format(day, "yyyy-MM-dd");
              const dayEvents = eventsByDate.get(dateKey) || [];
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isCurrentDay = isToday(day);
              const isWeekend = [0,6].includes(day.getDay());

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => onDayClick?.(day)}
                  className={cn(
                    "relative aspect-square p-2 rounded-lg border",
                    "flex flex-col items-center justify-start gap-1",
                    "transition-all duration-200 ease-out",
                    "active:scale-95",
                    isCurrentMonth
                      ? cn("bg-card border-border/50 hover:bg-muted/30 hover:border-primary/30 hover:shadow-sm", isWeekend && "bg-secondary/20")
                      : "bg-muted/10 border-transparent text-muted-foreground/50",
                    isCurrentDay && "border-primary ring-2 ring-primary/20"
                  )}
                >
                  <span
                    className={cn(
                      "text-body-sm font-body-sm",
                      isCurrentDay && "font-semibold text-primary"
                    )}
                  >
                    {format(day, "d")}
                  </span>

                  {/* Event indicators */}
                  {dayEvents.length > 0 && (
                    <div className="flex gap-0.5 flex-wrap justify-center">
                      {dayEvents.slice(0, 3).map((event) => (
                        <button
                          key={event.id}
                          type="button"
                          aria-label={event.title}
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventClick?.(event);
                          }}
                          className="h-1.5 w-1.5 rounded-full focus-ring"
                          style={{ backgroundColor: `hsl(var(--source-space) / 0.8)` }}
                        />
                      ))}
                      {dayEvents.length > 3 && (
                        <button onClick={(e) => { e.stopPropagation(); onDayClick?.(day); }} className="absolute bottom-1 right-1 text-[10px] text-primary hover:underline">
                          +{dayEvents.length - 3}
                        </button>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Event count summary */}
          <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between text-caption font-caption text-muted-foreground">
            <span>
              {events.length} event{events.length !== 1 ? "s" : ""} this month
            </span>
            <Badge variant="outline" className="text-xs">
              {format(currentMonth, "MMM yyyy")}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }
);

CalendarMonth.displayName = "CalendarMonth";
