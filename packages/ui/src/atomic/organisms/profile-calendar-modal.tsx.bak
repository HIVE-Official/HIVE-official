"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { X, ChevronLeft, ChevronRight, Plus, Download, Calendar as CalendarIcon } from "lucide-react"
import { Button } from "../atoms/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../atoms/dialog"
import { Badge } from "../atoms/badge"
import { Calendar } from "../atoms/calendar"

export interface CalendarEvent {
  id: string
  title: string
  type: "class" | "event" | "office-hours"
  startTime: string
  endTime: string
  date: Date
  location: string
  instructor?: string
  spaceName?: string
  rsvpStatus?: "going" | "interested" | null
}

export interface ProfileCalendarModalProps {
  /** Is modal open */
  isOpen: boolean

  /** Callback when modal closes */
  onClose: () => void

  /** Events to display */
  events: CalendarEvent[]

  /** Currently selected date */
  selectedDate?: Date

  /** Callback when date is selected */
  onDateSelect?: (date: Date) => void

  /** Callback when user wants to import classes */
  onImportClasses?: () => void

  /** Callback when user wants to add event */
  onAddEvent?: () => void

  /** Callback when event is clicked */
  onEventClick?: (eventId: string) => void

  /** Callback to export calendar */
  onExport?: () => void
}

/**
 * Profile Calendar Modal
 *
 * Full-screen calendar for viewing schedule with:
 * - Month view with date indicators
 * - Event list for selected date
 * - Class import CTA
 * - Export calendar functionality
 * - RSVP quick actions
 *
 * Design Pattern: Modal-first IA
 * - Opens from ProfileScheduleWidget
 * - Shows full calendar context
 * - Quick actions without leaving modal
 */
const ProfileCalendarModal = React.forwardRef<HTMLDivElement, ProfileCalendarModalProps>(
  ({
    isOpen,
    onClose,
    events,
    selectedDate: controlledDate,
    onDateSelect,
    onImportClasses,
    onAddEvent,
    onEventClick,
    onExport,
  }, ref) => {
    const [internalDate, setInternalDate] = React.useState<Date>(new Date())
    const isControlled = controlledDate !== undefined
    const selectedDate = isControlled ? controlledDate : internalDate

    const handleDateSelect = React.useCallback((date: Date | undefined) => {
      if (!date) return

      if (!isControlled) {
        setInternalDate(date)
      }

      onDateSelect?.(date)
    }, [isControlled, onDateSelect])

    // Get events for selected date
    const eventsForSelectedDate = React.useMemo(() => {
      return events.filter(event => {
        const eventDate = new Date(event.date)
        return (
          eventDate.getFullYear() === selectedDate.getFullYear() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getDate() === selectedDate.getDate()
        )
      }).sort((a, b) => {
        // Sort by start time
        return a.startTime.localeCompare(b.startTime)
      })
    }, [events, selectedDate])

    // Get dates with events for calendar highlighting
    const datesWithEvents = React.useMemo(() => {
      return new Set(
        events.map(event => {
          const date = new Date(event.date)
          return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        })
      )
    }, [events])

    const hasEventsOnDate = React.useCallback((date: Date) => {
      const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
      return datesWithEvents.has(key)
    }, [datesWithEvents])

    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent
          ref={ref}
          className="max-w-6xl h-[90vh] p-0 overflow-hidden"
        >
          <DialogHeader className="p-6 pb-4 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <CalendarIcon className="h-6 w-6" />
                My Calendar
              </DialogTitle>

              <div className="flex items-center gap-2">
                {onExport && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onExport}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                )}

                {onImportClasses && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onImportClasses}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Import Classes
                  </Button>
                )}

                {onAddEvent && (
                  <Button
                    size="sm"
                    onClick={onAddEvent}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Event
                  </Button>
                )}
              </div>
            </div>
          </DialogHeader>

          <div className="flex h-[calc(90vh-120px)]">
            {/* Left: Calendar */}
            <div className="flex-1 p-6 border-r overflow-auto">
              <div className="max-w-md mx-auto">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  className="rounded-lg border"
                  modifiers={{
                    hasEvents: (date) => hasEventsOnDate(date),
                  }}
                  modifiersClassNames={{
                    hasEvents: "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-primary",
                  }}
                />

                {/* Quick Stats */}
                <div className="mt-6 p-4 rounded-lg border bg-muted/50">
                  <h3 className="text-sm font-semibold mb-3">This Month</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {events.filter(e => e.type === 'class').length}
                      </div>
                      <div className="text-xs text-muted-foreground">Classes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {events.filter(e => e.type === 'event').length}
                      </div>
                      <div className="text-xs text-muted-foreground">Events</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {events.filter(e => e.type === 'office-hours').length}
                      </div>
                      <div className="text-xs text-muted-foreground">Office Hrs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Events List */}
            <div className="w-[400px] flex flex-col">
              <div className="p-6 border-b">
                <h3 className="font-semibold">
                  {selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {eventsForSelectedDate.length} event{eventsForSelectedDate.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="flex-1 overflow-auto p-6">
                {eventsForSelectedDate.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-3">
                      <CalendarIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">No events scheduled</p>
                    {onAddEvent && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={onAddEvent}
                        className="mt-4 gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add Event
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {eventsForSelectedDate.map((event) => (
                      <div
                        key={event.id}
                        onClick={() => onEventClick?.(event.id)}
                        className={cn(
                          "p-4 rounded-lg border bg-card transition-all cursor-pointer",
                          "hover:bg-accent/50 hover:shadow-md"
                        )}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm mb-1">{event.title}</h4>
                            <p className="text-xs text-muted-foreground">
                              {event.startTime} - {event.endTime}
                            </p>
                          </div>
                          <Badge
                            variant="freshman"
                            className={cn(
                              "text-xs ml-2",
                              event.type === "class" && "border-blue-500/50 text-blue-600",
                              event.type === "event" && "border-green-500/50 text-green-600",
                              event.type === "office-hours" && "border-purple-500/50 text-purple-600"
                            )}
                          >
                            {event.type === "class" ? "Class" : event.type === "event" ? "Event" : "Office Hrs"}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>📍 {event.location}</span>
                        </div>

                        {event.instructor && (
                          <div className="text-xs text-muted-foreground mt-1">
                            👨‍🏫 {event.instructor}
                          </div>
                        )}

                        {event.spaceName && (
                          <div className="text-xs text-muted-foreground mt-1">
                            🏢 {event.spaceName}
                          </div>
                        )}

                        {event.type === "event" && (
                          <div className="mt-3 pt-3 border-t">
                            {event.rsvpStatus === "going" ? (
                              <Badge variant="freshman" className="text-xs">
                                ✓ Going
                              </Badge>
                            ) : event.rsvpStatus === "interested" ? (
                              <Badge variant="sophomore" className="text-xs">
                                ⭐ Interested
                              </Badge>
                            ) : (
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1 h-7 text-xs">
                                  Interested
                                </Button>
                                <Button size="sm" className="flex-1 h-7 text-xs">
                                  Going
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
)

ProfileCalendarModal.displayName = "ProfileCalendarModal"

export { ProfileCalendarModal }
