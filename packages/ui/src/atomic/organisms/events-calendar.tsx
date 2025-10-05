"use client"

import * as React from "react"
import { Calendar } from "../atoms/calendar"
import { Badge } from "../atoms/badge"
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from "../atoms/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "../atoms/card"
import { Button } from "../atoms/button"
import { ScrollArea } from "../atoms/scroll-area"
import { cn } from "../../lib/utils"
import { Clock, MapPin, Users, ChevronRight } from "lucide-react"
import type { EventCampusContext } from "../molecules/event-card"

/**
 * Calendar event with campus context
 */
export interface CalendarEvent {
  id: string
  title: string
  dateTime: {
    start: Date
    end?: Date
    display: string // "7pm - 9pm"
  }
  location: {
    name: string
    type: "on-campus" | "off-campus" | "virtual"
  }
  space: {
    name: string
    id: string
  }
  attendees: {
    count: number
  }
  rsvp: {
    status: "going" | "interested" | "not-going" | null
  }
  category?: "social" | "academic" | "sports" | "greek" | "wellness"

  /** Campus context (HIVE-native) */
  campusContext?: EventCampusContext
}

export interface EventsCalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Events to display on calendar */
  events: CalendarEvent[]

  /** Currently selected date */
  selectedDate?: Date

  /** Date selection handler */
  onSelectDate?: (date: Date | undefined) => void

  /** Event click handler */
  onEventClick?: (eventId: string) => void

  /** RSVP handler */
  onRsvp?: (eventId: string, status: "going" | "interested") => void

  /** Show only user's events */
  showOnlyUserEvents?: boolean
}

/**
 * Events Calendar
 *
 * Campus-native calendar view with event preview and friend activity signals.
 * Built on shadcn Calendar with HIVE design system.
 *
 * Design Strategy:
 * - Calendar grid shows event indicators (dots for events, gold for user's RSVPs)
 * - Selected date shows event list in sidebar
 * - Campus context shown in event previews (friends going, cohort breakdown)
 * - Monochrome + gold aesthetic
 *
 * Differentiation from Generic Calendar:
 * - Shows "3 friends going" indicators on calendar dates
 * - Event previews include campus cohort context
 * - "You're going" events highlighted in gold
 * - Academic calendar integration (exam weeks, breaks)
 */
const EventsCalendar = React.forwardRef<HTMLDivElement, EventsCalendarProps>(
  (
    {
      className,
      events,
      selectedDate: controlledDate,
      onSelectDate,
      onEventClick,
      onRsvp,
      showOnlyUserEvents = false,
      ...props
    },
    ref
  ) => {
    const [internalDate, setInternalDate] = React.useState<Date | undefined>(new Date())
    const selectedDate = controlledDate ?? internalDate
    const handleSelectDate = onSelectDate ?? setInternalDate

    // Filter events by selected date
    const eventsOnSelectedDate = React.useMemo(() => {
      if (!selectedDate) return []

      return events.filter((event) => {
        const eventDate = new Date(event.dateTime.start)
        return (
          eventDate.getFullYear() === selectedDate.getFullYear() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getDate() === selectedDate.getDate()
        )
      })
    }, [events, selectedDate])

    // Get events by date for calendar indicators
    const eventsByDate = React.useMemo(() => {
      const map = new Map<string, CalendarEvent[]>()

      events.forEach((event) => {
        const dateKey = event.dateTime.start.toDateString()
        if (!map.has(dateKey)) {
          map.set(dateKey, [])
        }
        map.get(dateKey)!.push(event)
      })

      return map
    }, [events])

    // Custom day renderer to show event indicators
    const renderDay = React.useCallback(
      (day: Date) => {
        const dateKey = day.toDateString()
        const dayEvents = eventsByDate.get(dateKey) || []
        const userEvents = dayEvents.filter((e) => e.rsvp.status === "going")
        const friendsGoing = dayEvents.filter(
          (e) => e.campusContext?.friendsGoing && e.campusContext.friendsGoing.length > 0
        )

        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <span>{day.getDate()}</span>

            {/* Event indicators */}
            {dayEvents.length > 0 && (
              <div className="absolute bottom-1 flex gap-0.5">
                {/* User's events (gold) */}
                {userEvents.length > 0 && (
                  <div className="h-1 w-1 rounded-full bg-[#FFD700]" />
                )}

                {/* Friends going (primary) */}
                {friendsGoing.length > 0 && userEvents.length === 0 && (
                  <div className="h-1 w-1 rounded-full bg-primary" />
                )}

                {/* Other events (muted) */}
                {dayEvents.length > 0 && userEvents.length === 0 && friendsGoing.length === 0 && (
                  <div className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                )}
              </div>
            )}
          </div>
        )
      },
      [eventsByDate]
    )

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col lg:flex-row gap-6",
          className
        )}
        {...props}
      >
        {/* Calendar Grid */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Campus Events</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleSelectDate}
              className="rounded-md"
              components={{
                DayButton: ({ day, ...props }) => (
                  <button {...props as any}>
                    {renderDay(day.date)}
                  </button>
                ),
              }}
            />

            {/* Legend */}
            <div className="mt-4 pt-4 border-t space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-[#FFD700]" />
                <span>You're going</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Friends going</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                <span>Other events</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Event List for Selected Date */}
        <Card className="lg:w-96">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {selectedDate?.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </CardTitle>
            {eventsOnSelectedDate.length > 0 && (
              <p className="text-sm text-muted-foreground">
                {eventsOnSelectedDate.length} {eventsOnSelectedDate.length === 1 ? "event" : "events"}
              </p>
            )}
          </CardHeader>
          <CardContent>
            {eventsOnSelectedDate.length === 0 ? (
              <div className="text-center py-8 text-sm text-muted-foreground">
                No events on this day
              </div>
            ) : (
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {eventsOnSelectedDate.map((event) => (
                    <CalendarEventPreview
                      key={event.id}
                      event={event}
                      onClick={() => onEventClick?.(event.id)}
                      onRsvp={onRsvp}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }
)

EventsCalendar.displayName = "EventsCalendar"

/**
 * Calendar Event Preview Card
 *
 * Compact event card for calendar sidebar with campus context
 */
interface CalendarEventPreviewProps {
  event: CalendarEvent
  onClick?: () => void
  onRsvp?: (eventId: string, status: "going" | "interested") => void
}

function CalendarEventPreview({ event, onClick, onRsvp }: CalendarEventPreviewProps) {
  return (
    <div
      className={cn(
        "p-3 rounded-md border transition-all duration-fast hover:border-primary hover:shadow-hive-sm cursor-pointer",
        event.rsvp.status === "going" && "border-[#FFD700] bg-[#FFD700]/5"
      )}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground line-clamp-1">
            {event.title}
          </h4>
          <p className="text-xs text-muted-foreground">
            {event.space.name}
          </p>
        </div>

        {event.category && (
          <Badge variant="freshman" className="text-[9px] h-5 shrink-0">
            {event.category}
          </Badge>
        )}
      </div>

      {/* Time & Location */}
      <div className="space-y-1 mb-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{event.dateTime.display}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span className="truncate">{event.location.name}</span>
        </div>
      </div>

      {/* Campus Context: Friends Going */}
      {event.campusContext?.friendsGoing && event.campusContext.friendsGoing.length > 0 && (
        <div className="flex items-center gap-2 py-1.5 px-2 bg-primary/5 border border-primary/20 rounded text-xs mb-2">
          <AvatarGroup size="sm" max={2}>
            {event.campusContext.friendsGoing.map(f => (
              <Avatar key={f.id}>
                <AvatarImage src={f.avatar} alt={f.name} />
                <AvatarFallback>{f.name[0]}</AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
          <span className="font-medium text-foreground">
            {event.campusContext.friendsGoing.length === 1
              ? event.campusContext.friendsGoing[0].name
              : `${event.campusContext.friendsGoing[0].name} +${event.campusContext.friendsGoing.length - 1}`}
          </span>
          <span className="text-muted-foreground">going</span>
        </div>
      )}

      {/* Attendees */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users className="h-3 w-3" />
          <span>{event.attendees.count} going</span>
        </div>

        {/* RSVP Status */}
        {event.rsvp.status === "going" && (
          <Badge variant="freshman" className="h-5 text-[9px] bg-[#FFD700] text-black border-none">
            You're going ✓
          </Badge>
        )}
        {event.rsvp.status === "interested" && (
          <Badge variant="sophomore" className="h-5 text-[9px]">
            Interested
          </Badge>
        )}
      </div>
    </div>
  )
}

export { EventsCalendar }
