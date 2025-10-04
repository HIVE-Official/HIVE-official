"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Card } from "../atoms/card"
import { Badge } from "../atoms/badge"
import { Progress } from "../atoms/progress"
import {
  Trophy,
  Users,
  Zap,
  Heart,
  Target,
  Flame,
  Clock,
  TrendingUp,
} from "lucide-react"

export interface Ritual {
  id: string
  title: string
  description: string
  icon: string
  type: "onboarding" | "seasonal" | "challenge" | "emergency"

  /** User's progress */
  progress: {
    current: number
    total: number
    percentage: number
  }

  /** Campus-wide progress */
  campusProgress: {
    participants: number
    target: number
    percentage: number
  }

  /** Time remaining */
  timeRemaining: {
    days: number
    hours: number
    isUrgent: boolean // < 24 hours
  }

  /** Rewards */
  rewards: {
    badge?: string
    title?: string
    feature?: string
  }

  /** Status */
  status: "active" | "completed" | "failed" | "upcoming"

  /** Has user joined */
  hasJoined: boolean

  /** Is trending */
  isTrending?: boolean

  /** Current milestone */
  currentMilestone?: {
    name: string
    progress: number
  }
}

export interface RitualsCardStripProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Active rituals */
  rituals?: Ritual[]

  /** Ritual click handler */
  onRitualClick?: (ritualId: string) => void

  /** Join ritual handler */
  onJoinRitual?: (ritualId: string) => void

  /** Show empty state */
  showEmptyState?: boolean
}

const RitualsCardStrip = React.forwardRef<HTMLDivElement, RitualsCardStripProps>(
  (
    {
      className,
      rituals = [],
      onRitualClick,
      onJoinRitual,
      showEmptyState = false,
      ...props
    },
    ref
  ) => {
    if (rituals.length === 0 && !showEmptyState) {
      return null
    }

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {/* Header - Gold flame for rituals */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-[#FFD700]" />
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Campus Rituals</h3>
          </div>
          {rituals.length > 0 && (
            <Badge variant="freshman" className="text-xs border-black">
              {rituals.filter(r => r.hasJoined).length} active
            </Badge>
          )}
        </div>

        {/* Scrollable Cards */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {rituals.map((ritual) => (
            <RitualCard
              key={ritual.id}
              ritual={ritual}
              onClick={() => onRitualClick?.(ritual.id)}
              onJoin={() => onJoinRitual?.(ritual.id)}
            />
          ))}

          {showEmptyState && rituals.length === 0 && (
            <Card className="p-6 flex-shrink-0 w-64 flex flex-col items-center justify-center text-center border-2 border-gray-200">
              <div className="text-4xl mb-2">🎯</div>
              <p className="text-sm font-semibold text-foreground mb-1">No Active Rituals</p>
              <p className="text-xs text-muted-foreground">
                Check back soon for campus-wide challenges
              </p>
            </Card>
          )}
        </div>
      </div>
    )
  }
)

RitualsCardStrip.displayName = "RitualsCardStrip"

// Individual Ritual Card Component
interface RitualCardProps {
  ritual: Ritual
  onClick: () => void
  onJoin: () => void
}

const RitualCard: React.FC<RitualCardProps> = ({ ritual, onClick, onJoin }) => {
  // Monochrome type system - use typography and borders instead of color
  const typeIcons = {
    onboarding: <Target className="h-4 w-4" />,
    seasonal: <Trophy className="h-4 w-4" />,
    challenge: <Zap className="h-4 w-4" />,
    emergency: <Heart className="h-4 w-4" />,
  }

  // Progress hierarchy: Gold for complete, black for high progress, gray for low
  const progressBorderClass = ritual.progress.percentage === 100
    ? "border-[#FFD700]"
    : ritual.progress.percentage >= 50
    ? "border-black"
    : "border-gray-300"

  return (
    <Card
      className={cn(
        "relative flex-shrink-0 w-64 p-4 cursor-pointer transition-all border-2",
        "hover:border-black",
        ritual.hasJoined && "ring-2 ring-[#FFD700]",
        ritual.status === "completed" && "bg-gray-50 dark:bg-gray-950",
        // No shadows - borders only
      )}
      onClick={onClick}
    >
      {/* Progress Ring - Monochrome with gold for completion */}
      <div className="absolute -top-2 -right-2">
        <div className={cn(
          "relative h-12 w-12 rounded-full flex items-center justify-center",
          "bg-background border-4",
          progressBorderClass
        )}>
          <span className="text-xs font-bold">{ritual.icon}</span>
        </div>
      </div>

      {/* Type Badge - Monochrome with uppercase tracking */}
      <div className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold mb-3 uppercase tracking-wide",
        "bg-black text-white"
      )}>
        {typeIcons[ritual.type]}
        <span>{ritual.type}</span>
      </div>

      {/* Title */}
      <h4 className="text-sm font-bold text-foreground mb-1 line-clamp-2">
        {ritual.title}
      </h4>

      {/* Description */}
      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
        {ritual.description}
      </p>

      {/* Progress Bar - Monochrome with gold indicator */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Your Progress</span>
          <span className={cn(
            "text-xs font-bold",
            ritual.progress.percentage === 100 && "text-[#FFD700]"
          )}>
            {ritual.progress.current}/{ritual.progress.total}
          </span>
        </div>
        <Progress
          value={ritual.progress.percentage}
          className={cn(
            "h-2",
            ritual.progress.percentage === 100 && "[&>div]:bg-[#FFD700]"
          )}
        />
      </div>

      {/* Current Milestone - Monochrome card */}
      {ritual.currentMilestone && ritual.hasJoined && (
        <div className="mb-3 p-2 border-2 border-gray-200 rounded text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground font-semibold">Next:</span>
            <span className="font-bold text-foreground">{ritual.currentMilestone.name}</span>
          </div>
        </div>
      )}

      {/* Campus Progress - Monochrome */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
        <Users className="h-3 w-3" />
        <span className="font-medium">
          {ritual.campusProgress.participants.toLocaleString()} students joined
          {ritual.campusProgress.target && (
            <span className="ml-1 font-bold text-foreground">
              ({Math.round(ritual.campusProgress.percentage)}%)
            </span>
          )}
        </span>
      </div>

      {/* Time Remaining - Gold for urgency */}
      {ritual.status === "active" && (
        <div className={cn(
          "flex items-center gap-1 text-xs mb-3 font-semibold",
          ritual.timeRemaining.isUrgent ? "text-[#FFD700]" : "text-muted-foreground"
        )}>
          <Clock className="h-3 w-3" />
          <span>
            {ritual.timeRemaining.days > 0 && `${ritual.timeRemaining.days}d `}
            {ritual.timeRemaining.hours}h remaining
          </span>
        </div>
      )}

      {/* Trending Badge - Gold accent */}
      {ritual.isTrending && (
        <div className="flex items-center gap-1 text-xs mb-3">
          <TrendingUp className="h-3 w-3 text-[#FFD700]" />
          <span className="font-semibold text-foreground">Trending</span>
        </div>
      )}

      {/* Rewards Preview - Gold icon */}
      {ritual.rewards.badge && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Trophy className="h-3 w-3 text-[#FFD700]" />
          <span className="font-medium">Earn: {ritual.rewards.badge}</span>
        </div>
      )}

      {/* Join Button - Black CTA */}
      {!ritual.hasJoined && ritual.status === "active" && (
        <button
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation()
            onJoin()
          }}
          className="absolute bottom-4 right-4 px-3 py-1.5 bg-black text-white text-xs font-bold rounded-md hover:bg-gray-900 transition-colors border-2 border-black"
        >
          Join
        </button>
      )}

      {/* Completed Badge - Gold */}
      {ritual.status === "completed" && (
        <div className="absolute top-4 right-4">
          <Badge className="bg-[#FFD700] text-black border-none font-bold">
            ✓ Complete
          </Badge>
        </div>
      )}
    </Card>
  )
}

export { RitualsCardStrip }
