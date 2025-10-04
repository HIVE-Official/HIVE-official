"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../atoms/card"
import { Button } from "../atoms/button"
import { Badge } from "../atoms/badge"
import { cn } from "../../lib/utils"
import { Clock, MapPin, ChevronRight, Calendar as CalendarIcon, Plus, Upload } from "lucide-react"

export interface ScheduleEvent {
  id: string
  title: string
  type: "class" | "event" | "office-hours"
  startTime: string // "9:00 AM"
  endTime: string // "10:50 AM"
  location: string
  spaceId?: string
  spaceName?: string
  instructor?: string
  color?: "blue" | "green" | "purple" | "orange" | "red" | "yellow"
  rsvpStatus?: "going" | "interested" | null
}

export interface ProfileScheduleWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Today's events */
  events: ScheduleEvent[]

  /** Show only upcoming events (filter past events) */
  showOnlyUpcoming?: boolean

  /** Event click handler */
  onEventClick?: (eventId: string) => void

  /** RSVP handler */
  onRsvp?: (eventId: string) => void

  /** View full calendar handler */
  onViewFullCalendar?: () => void

  /** Import classes handler */
  onImportClasses?: () => void

  /** Currently selected date (defaults to today) */
  date?: Date
}

/**
 * Profile Schedule Widget
 *
 * Prominent display of today's classes and events on profile.
 * Key feature: Students can import their class schedule.
 *
 * Design Strategy:
 * - Shows today's schedule at a glance
 * - Upcoming events highlighted
 * - Quick RSVP for events
 * - Import schedule CTA if empty
 * - Timeline view with current time indicator
 *
 * Differentiation:
 * - Class import integration (from university registrar)
 * - Combined classes + social events
 * - "Happening now" indicator
 * - Quick actions (RSVP, navigate)
 */
const ProfileScheduleWidget = React.forwardRef<HTMLDivElement, ProfileScheduleWidgetProps>(
  ({
    className,
    events,
    showOnlyUpcoming = false,
    onEventClick,
    onRsvp,
    onViewFullCalendar,
    onImportClasses,
    date = new Date(),
    ...props
  }, ref) => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()

    // Filter upcoming events if requested
    const displayEvents = React.useMemo(() => {
      if (!showOnlyUpcoming) return events

      return events.filter(event => {
        const [hourStr, minuteStr] = event.startTime.split(':')
        const hour = parseInt(hourStr)
        const minute = parseInt(minuteStr.split(' ')[0])
        const isPM = event.startTime.includes('PM')

        const eventHour = isPM && hour !== 12 ? hour + 12 : hour
        const eventTime = eventHour * 60 + minute
        const currentTime = currentHour * 60 + currentMinute

        return eventTime >= currentTime
      })
    }, [events, showOnlyUpcoming, currentHour, currentMinute])

    // Check if an event is happening now
    const isHappeningNow = (event: ScheduleEvent) => {
      const parseTime = (timeStr: string) => {
        const [hourStr, minuteStr] = timeStr.split(':')
        const hour = parseInt(hourStr)
        const minute = parseInt(minuteStr.split(' ')[0])
        const isPM = timeStr.includes('PM')
        return (isPM && hour !== 12 ? hour + 12 : hour) * 60 + minute
      }

      const startTime = parseTime(event.startTime)
      const endTime = parseTime(event.endTime)
      const currentTime = currentHour * 60 + currentMinute

      return currentTime >= startTime && currentTime <= endTime
    }

    if (displayEvents.length === 0) {
      return (
        <Card ref={ref} className={cn("", className)} {...props}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
              {onViewFullCalendar && (
                <Button variant="ghost" size="sm" onClick={onViewFullCalendar}>
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Full Calendar
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">
                No events today
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Import your class schedule to see it here
              </p>
              {onImportClasses && (
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" size="sm" onClick={onImportClasses}>
                    <Upload className="h-4 w-4 mr-2" />
                    Import Classes
                  </Button>
                  {onViewFullCalendar && (
                    <Button variant="outline" size="sm" onClick={onViewFullCalendar}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Event
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card ref={ref} className={cn("", className)} {...props}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Today's Schedule
              <Badge variant="secondary" className="ml-2">
                {displayEvents.length} {displayEvents.length === 1 ? 'event' : 'events'}
              </Badge>
            </CardTitle>
            {onViewFullCalendar && (
              <Button variant="ghost" size="sm" onClick={onViewFullCalendar}>
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {displayEvents.map((event, index) => {
              const isNow = isHappeningNow(event)

              return (
                <div
                  key={event.id}
                  className={cn(
                    "p-3 rounded-lg border transition-all cursor-pointer",
                    isNow && "border-primary bg-primary/5",
                    !isNow && "hover:bg-accent/50"
                  )}
                  onClick={() => onEventClick?.(event.id)}
                >
                  {/* Event Header */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-foreground line-clamp-1">
                          {event.title}
                        </h4>
                        {isNow && (
                          <Badge variant="default" className="h-5 text-[9px] bg-primary">
                            Happening now
                          </Badge>
                        )}
                      </div>
                      {event.instructor && (
                        <p className="text-xs text-muted-foreground">
                          {event.instructor}
                        </p>
                      )}
                      {event.spaceName && !event.instructor && (
                        <p className="text-xs text-muted-foreground">
                          {event.spaceName}
                        </p>
                      )}
                    </div>

                    {/* Event Type Badge */}
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[9px] h-5 shrink-0",
                        event.type === "class" && "border-blue-500/50 text-blue-600",
                        event.type === "event" && "border-green-500/50 text-green-600",
                        event.type === "office-hours" && "border-purple-500/50 text-purple-600"
                      )}
                    >
                      {event.type === "class" ? "Class" : event.type === "event" ? "Event" : "Office Hours"}
                    </Badge>
                  </div>

                  {/* Time & Location */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{event.startTime} - {event.endTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions for Events (not classes) */}
                  {event.type === "event" && onRsvp && (
                    <div className="flex gap-2 mt-2 pt-2 border-t">
                      {event.rsvpStatus === "going" ? (
                        <Badge variant="default" className="text-[9px] h-5 bg-[#FFD700] text-black">
                          You're going ✓
                        </Badge>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            onRsvp(event.id)
                          }}
                          className="h-7 text-xs"
                        >
                          RSVP
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Import Classes CTA (if there are events but might want more) */}
          {onImportClasses && displayEvents.length < 3 && (
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" size="sm" className="w-full" onClick={onImportClasses}>
                <Upload className="h-4 w-4 mr-2" />
                Import Your Class Schedule
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)

ProfileScheduleWidget.displayName = "ProfileScheduleWidget"

export { ProfileScheduleWidget }
