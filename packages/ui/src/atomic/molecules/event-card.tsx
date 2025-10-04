/**
 * Event Card Component
 *
 * Implements SPEC.md event cards (lines 454-507) with behavioral psychology:
 * - Visual distinction from posts (colored border)
 * - Social proof ("Jake, Sarah +45 going")
 * - Urgency indicators with countdown timers
 * - One-tap RSVP from feed
 * - FOMO generation ("🔥 Filling up fast")
 */

"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Card } from "../atoms/card"
import { Button } from "../atoms/button"
import { Badge } from "../atoms/badge"
import { Avatar } from "../atoms/avatar"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Heart,
  Share,
  Bookmark,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

export interface FeedEventData {
  id: string
  title: string
  description?: string

  // Timing
  startTime: string // ISO string
  endTime?: string
  timezone?: string

  // Location
  location?: {
    name: string
    address?: string
    building?: string
    room?: string
    isOnCampus: boolean
  }

  // Organization
  hostSpace: {
    id: string
    name: string
    category: 'university_org' | 'student_org' | 'residential' | 'greek_life'
  }

  // RSVP & Capacity
  rsvp: {
    going: number
    interested: number
    capacity?: number
    hasRSVPed: boolean
    rsvpType?: 'going' | 'interested' | null
  }

  // Social Proof
  attendees?: {
    preview: Array<{
      name: string
      avatar?: string
      isConnection?: boolean
    }>
    friendsGoing: string[] // Friend names
    connectionsCount: number
  }

  // Visual
  coverImage?: string

  // Urgency & Psychology
  urgencyLevel: 'low' | 'medium' | 'high'
  isFillingUp?: boolean // Triggers FOMO
  isTrending?: boolean
  requiresApproval?: boolean

  // Meta
  createdAt: string
  updatedAt: string
}

export interface EventCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Event data */
  event: FeedEventData

  /** RSVP handler */
  onRSVP?: (eventId: string, type: 'going' | 'interested') => void

  /** Share handler */
  onShare?: (eventId: string) => void

  /** Save handler */
  onSave?: (eventId: string) => void

  /** Space navigation handler */
  onSpaceClick?: (spaceId: string) => void

  /** Show compact version for feed */
  compact?: boolean

  /** Enable behavioral psychology features */
  enablePsychology?: boolean
}

const EventCard = React.forwardRef<HTMLDivElement, EventCardProps>(
  (
    {
      className,
      event,
      onRSVP,
      onShare,
      onSave,
      onSpaceClick,
      compact = false,
      enablePsychology = true,
      ...props
    },
    ref
  ) => {
    const [timeUntilEvent, setTimeUntilEvent] = React.useState('')
    const [isCountingDown, setIsCountingDown] = React.useState(false)

    // Calculate time until event for urgency
    React.useEffect(() => {
      const updateCountdown = () => {
        const now = new Date()
        const eventStart = new Date(event.startTime)
        const timeDiff = eventStart.getTime() - now.getTime()

        if (timeDiff < 0) {
          setTimeUntilEvent('Started')
          setIsCountingDown(false)
          return
        }

        const hours = Math.floor(timeDiff / (1000 * 60 * 60))
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))

        if (hours < 2) {
          setTimeUntilEvent(`${hours}h ${minutes}m`)
          setIsCountingDown(true)
        } else if (hours < 24) {
          setTimeUntilEvent(`${hours} hours`)
          setIsCountingDown(false)
        } else {
          const days = Math.floor(hours / 24)
          setTimeUntilEvent(`${days} days`)
          setIsCountingDown(false)
        }
      }

      updateCountdown()
      const interval = setInterval(updateCountdown, 60000) // Update every minute

      return () => clearInterval(interval)
    }, [event.startTime])

    // Calculate urgency color
    const urgencyColor = React.useMemo(() => {
      switch (event.urgencyLevel) {
        case 'high': return 'border-red-500 shadow-red-500/20'
        case 'medium': return 'border-orange-500 shadow-orange-500/20'
        default: return 'border-blue-500 shadow-blue-500/20'
      }
    }, [event.urgencyLevel])

    // Format event time for display
    const formatEventTime = (dateString: string) => {
      const date = new Date(dateString)
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      if (date.toDateString() === today.toDateString()) {
        return `Today ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
      } else if (date.toDateString() === tomorrow.toDateString()) {
        return `Tomorrow ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
      } else {
        return date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit'
        })
      }
    }

    // Calculate capacity percentage for FOMO
    const capacityPercentage = event.rsvp.capacity
      ? (event.rsvp.going / event.rsvp.capacity) * 100
      : 0

    return (
      <Card
        ref={ref}
        className={cn(
          "relative overflow-hidden border-l-4 transition-all duration-fast ease-smooth",
          "bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-sm",
          urgencyColor,
          compact ? "p-3" : "p-4",
          enablePsychology && isCountingDown && "animate-pulse",
          className
        )}
        {...props}
      >
        {/* Trending Badge */}
        {event.isTrending && (
          <div className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className="bg-[#FFD700] text-black text-xs font-semibold flex items-center gap-1"
            >
              <TrendingUp className="h-3 w-3" />
              Trending
            </Badge>
          </div>
        )}

        {/* FOMO Badge */}
        {enablePsychology && event.isFillingUp && capacityPercentage > 70 && (
          <div className="absolute top-3 left-3">
            <Badge
              variant="destructive"
              className="bg-red-500 text-white text-xs font-semibold animate-bounce"
            >
              🔥 Filling up fast
            </Badge>
          </div>
        )}

        {/* Cover Image (if provided) */}
        {event.coverImage && !compact && (
          <div className="relative w-full h-32 mb-3 rounded-lg overflow-hidden">
            <img
              src={event.coverImage}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        {/* Event Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className={cn(
              "font-semibold text-white line-clamp-2",
              compact ? "text-sm" : "text-lg"
            )}>
              {event.title}
            </h3>

            {/* Host Space */}
            <button
              onClick={() => onSpaceClick?.(event.hostSpace.id)}
              className="text-xs text-white/70 hover:text-[#FFD700] transition-colors mt-1"
            >
              Hosted by {event.hostSpace.name}
            </button>
          </div>

          {/* Urgency Indicator */}
          {enablePsychology && (
            <div className="flex items-center gap-1 ml-3">
              {isCountingDown ? (
                <AlertCircle className="h-4 w-4 text-red-500 animate-pulse" />
              ) : (
                <Clock className="h-4 w-4 text-white/60" />
              )}
              <span className={cn(
                "text-xs font-medium",
                isCountingDown ? "text-red-400" : "text-white/70"
              )}>
                {timeUntilEvent}
              </span>
            </div>
          )}
        </div>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          {/* Date & Time */}
          <div className="flex items-center gap-2 text-sm text-white/80">
            <Calendar className="h-4 w-4 text-white/60" />
            <span>{formatEventTime(event.startTime)}</span>
          </div>

          {/* Location */}
          {event.location && (
            <div className="flex items-center gap-2 text-sm text-white/80">
              <MapPin className="h-4 w-4 text-white/60" />
              <span>
                {event.location.building && event.location.room
                  ? `${event.location.building} ${event.location.room}`
                  : event.location.name
                }
              </span>
              {event.location.isOnCampus && (
                <Badge variant="outline" className="text-xs border-white/20 text-white/70">
                  On Campus
                </Badge>
              )}
            </div>
          )}

          {/* Capacity Warning */}
          {event.rsvp.capacity && capacityPercentage > 80 && enablePsychology && (
            <div className="flex items-center gap-2 text-sm text-orange-400">
              <AlertCircle className="h-4 w-4" />
              <span>{event.rsvp.capacity - event.rsvp.going} spots left</span>
            </div>
          )}
        </div>

        {/* Social Proof - Attendees Preview */}
        {event.attendees && event.attendees.preview.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex -space-x-2">
                {event.attendees.preview.slice(0, 3).map((attendee, idx) => (
                  <Avatar key={idx} className="h-6 w-6 border-2 border-black">
                    <img src={attendee.avatar || '/default-avatar.png'} alt={attendee.name} />
                  </Avatar>
                ))}
              </div>
              <div className="text-xs text-white/70">
                {event.attendees.friendsGoing.length > 0 ? (
                  <span className="text-[#FFD700] font-medium">
                    {event.attendees.friendsGoing.slice(0, 2).join(', ')}
                    {event.attendees.friendsGoing.length > 2 && ` +${event.attendees.friendsGoing.length - 2} friends`}
                    {' '}going
                  </span>
                ) : (
                  <span>
                    {event.rsvp.going} going{event.rsvp.interested > 0 && `, ${event.rsvp.interested} interested`}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Description (if not compact) */}
        {!compact && event.description && (
          <p className="text-sm text-white/70 mb-4 line-clamp-2">
            {event.description}
          </p>
        )}

        {/* RSVP Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex gap-2">
            {/* Going Button */}
            <Button
              variant={event.rsvp.rsvpType === 'going' ? 'default' : 'outline'}
              size="sm"
              className={cn(
                "flex-1 transition-all duration-fast ease-smooth",
                event.rsvp.rsvpType === 'going' && "bg-[#FFD700] text-black hover:bg-[#FFD700]/90"
              )}
              onClick={() => onRSVP?.(event.id, 'going')}
            >
              {event.rsvp.rsvpType === 'going' ? (
                <CheckCircle className="h-4 w-4 mr-1" />
              ) : (
                <Users className="h-4 w-4 mr-1" />
              )}
              Going
            </Button>

            {/* Interested Button */}
            <Button
              variant={event.rsvp.rsvpType === 'interested' ? 'default' : 'ghost'}
              size="sm"
              className="transition-all duration-fast ease-smooth"
              onClick={() => onRSVP?.(event.id, 'interested')}
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  event.rsvp.rsvpType === 'interested' && "fill-current text-red-500"
                )}
              />
            </Button>
          </div>

          {/* Secondary Actions */}
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onShare?.(event.id)}
            >
              <Share className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onSave?.(event.id)}
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    )
  }
)

EventCard.displayName = "EventCard"

export { EventCard }
export type { FeedEventData }