"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "../atoms/button"
import { Badge } from "../atoms/badge"
import {
  CalendarDays,
  Layers,
  Users,
  LayoutGrid,
  Clock,
  TrendingUp,
  Heart,
  Sparkles,
} from "lucide-react"

export type FeedFilter = "all" | "events" | "spaces" | "friends" | "trending" | "rituals"
export type TimeFilter = "now" | "today" | "week" | null

export interface FeedFiltersProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Active feed filter */
  activeFilter?: FeedFilter

  /** Filter change handler */
  onFilterChange?: (filter: FeedFilter) => void

  /** Active time filter */
  activeTimeFilter?: TimeFilter

  /** Time filter change handler */
  onTimeFilterChange?: (filter: TimeFilter) => void

  /** Event count (for badge) */
  eventsCount?: number

  /** Urgent events count */
  urgentEventsCount?: number

  /** Active rituals count */
  ritualsCount?: number

  /** Trending content count */
  trendingCount?: number

  /** Show time filters */
  showTimeFilters?: boolean

  /** Enable behavioral psychology features */
  enablePsychology?: boolean

  /** Show live activity indicators */
  showLiveActivity?: boolean

  /** Compact mode */
  compact?: boolean
}

const FeedFilters = React.forwardRef<HTMLDivElement, FeedFiltersProps>(
  (
    {
      className,
      activeFilter = "all",
      onFilterChange,
      activeTimeFilter = null,
      onTimeFilterChange,
      eventsCount = 0,
      urgentEventsCount = 0,
      ritualsCount = 0,
      trendingCount = 0,
      showTimeFilters = false,
      enablePsychology = true,
      showLiveActivity = true,
      compact = false,
      ...props
    },
    ref
  ) => {
    const filters: Array<{
      id: FeedFilter
      label: string
      icon: React.ReactNode
      badge?: number
      isLive?: boolean
      urgencyLevel?: 'low' | 'medium' | 'high'
    }> = [
      {
        id: "all",
        label: "All",
        icon: <LayoutGrid className="h-4 w-4" />,
      },
      {
        id: "events",
        label: "Events",
        icon: <CalendarDays className="h-4 w-4" />,
        badge: urgentEventsCount || eventsCount,
        isLive: urgentEventsCount > 0,
        urgencyLevel: urgentEventsCount > 0 ? 'high' : 'medium',
      },
      {
        id: "spaces",
        label: "My Spaces",
        icon: <Layers className="h-4 w-4" />,
      },
      {
        id: "rituals",
        label: "Rituals",
        icon: <Heart className="h-4 w-4" />,
        badge: ritualsCount,
        isLive: ritualsCount > 0,
        urgencyLevel: 'medium',
      },
      {
        id: "trending",
        label: "Trending",
        icon: <TrendingUp className="h-4 w-4" />,
        badge: trendingCount,
        isLive: true,
        urgencyLevel: 'medium',
      },
      {
        id: "friends",
        label: "Friends",
        icon: <Users className="h-4 w-4" />,
      },
    ]

    const timeFilters: Array<{
      id: TimeFilter
      label: string
      icon: React.ReactNode
      description: string
    }> = [
      {
        id: "now",
        label: "Happening Now",
        icon: <TrendingUp className="h-3.5 w-3.5" />,
        description: "Next 2 hours",
      },
      {
        id: "today",
        label: "Today",
        icon: <Clock className="h-3.5 w-3.5" />,
        description: "Next 24 hours",
      },
      {
        id: "week",
        label: "This Week",
        icon: <CalendarDays className="h-3.5 w-3.5" />,
        description: "Next 7 days",
      },
    ]

    return (
      <div
        ref={ref}
        className={cn("space-y-3", className)}
        {...props}
      >
        {/* Main Filters */}
        <div
          className={cn(
            "flex gap-2",
            compact ? "flex-wrap" : "overflow-x-auto pb-2"
          )}
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id

            return (
              <div key={filter.id} className="relative">
                <Button
                  variant={isActive ? "default" : "outline"}
                  size={compact ? "sm" : "default"}
                  className={cn(
                    "shrink-0 transition-all duration-fast ease-smooth",
                    compact ? "h-8 px-3" : "h-10 px-4",
                    "gap-2",
                    // Behavioral psychology: urgency indicators
                    enablePsychology && filter.urgencyLevel === 'high' && "animate-pulse",
                    enablePsychology && filter.isLive && !isActive && "border-[#FFD700]/30",
                    isActive && filter.isLive && "border-[#FFD700]"
                  )}
                  onClick={() => onFilterChange?.(filter.id)}
                >
                  <div className={cn(
                    "transition-all duration-fast ease-smooth",
                    isActive && "scale-110",
                    filter.isLive && "text-[#FFD700]"
                  )}>
                    {filter.icon}
                  </div>
                  <span>{filter.label}</span>

                  {/* Badge with Psychology Features */}
                  {filter.badge && filter.badge > 0 && (
                    <Badge
                      variant={isActive ? "secondary" : "default"}
                      className={cn(
                        "h-5 px-1.5 text-[10px] ml-1 transition-all duration-fast ease-smooth",
                        isActive && "bg-[#FFD700] text-black",
                        // FOMO generation for high counts
                        enablePsychology && filter.badge > 10 && "animate-bounce scale-110",
                        filter.urgencyLevel === 'high' && "bg-red-500 text-white"
                      )}
                    >
                      {filter.badge > 99 ? '99+' : filter.badge}
                    </Badge>
                  )}
                </Button>

                {/* Live Activity Indicator */}
                {showLiveActivity && filter.isLive && (
                  <div className="absolute -top-1 -right-1">
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-ping" />
                    <div className="absolute inset-0 w-2 h-2 bg-[#FFD700] rounded-full" />
                  </div>
                )}

                {/* Urgency Pulse for High Priority */}
                {enablePsychology && filter.urgencyLevel === 'high' && (
                  <div className="absolute inset-0 rounded-md bg-red-500/10 animate-pulse pointer-events-none" />
                )}
              </div>
            )
          })}
        </div>

        {/* Time Filters (shown when filter is active or showTimeFilters is true) */}
        {(showTimeFilters || activeTimeFilter) && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {timeFilters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeTimeFilter === filter.id ? "default" : "ghost"}
                size="sm"
                className="h-8 px-3 gap-1.5 shrink-0"
                onClick={() => {
                  if (activeTimeFilter === filter.id) {
                    onTimeFilterChange?.(null)
                  } else {
                    onTimeFilterChange?.(filter.id)
                  }
                }}
              >
                {filter.icon}
                <div className="flex flex-col items-start">
                  <span className="text-xs leading-none">{filter.label}</span>
                  {activeTimeFilter === filter.id && (
                    <span className="text-[10px] text-muted-foreground leading-none mt-0.5">
                      {filter.description}
                    </span>
                  )}
                </div>
              </Button>
            ))}
            {activeTimeFilter && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs text-muted-foreground"
                onClick={() => onTimeFilterChange?.(null)}
              >
                Clear
              </Button>
            )}
          </div>
        )}

        {/* Filter Description with Social Proof */}
        {activeFilter !== "all" && !compact && (
          <div className="text-xs text-muted-foreground">
            {activeFilter === "events" && (
              <p>Showing events from your spaces and campus</p>
            )}
            {activeFilter === "spaces" && (
              <p>Content from spaces you've joined</p>
            )}
            {activeFilter === "friends" && (
              <p>Activity from people you follow</p>
            )}
            {activeFilter === "rituals" && (
              <p>Campus-wide challenges and campaigns</p>
            )}
            {activeFilter === "trending" && enablePsychology && (
              <div className="flex items-center gap-2">
                <p>Popular content right now</p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px]">Live activity</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Live Activity Summary - Social Proof */}
        {showLiveActivity && enablePsychology && !compact && (
          <div className="flex items-center justify-between text-xs text-white/60 pt-2 border-t border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span>247 students active now</span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-[#FFD700]" />
              <span>Peak activity 8-10pm</span>
            </div>
          </div>
        )}
      </div>
    )
  }
)

FeedFilters.displayName = "FeedFilters"

export { FeedFilters }
