/**
 * Ritual Progress Card Component
 *
 * Implements campus-wide ritual tracking with behavioral psychology:
 * - Progress rings with Instagram story quality
 * - 70% completion target per SPEC
 * - Streak counters and milestone rewards
 * - Social proof and leaderboard integration
 * - Check-in buttons with haptic feedback simulation
 */

"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Card } from "../atoms/card"
import { Button } from "../atoms/button"
import { Badge } from "../atoms/badge"
import { Avatar } from "../atoms/avatar"
import {
  CheckCircle,
  Calendar,
  Users,
  Crown,
  Flame,
  Target,
  TrendingUp,
  Zap,
  Award,
  Clock,
} from "lucide-react"

export interface RitualData {
  id: string
  title: string
  description: string
  category: 'health' | 'academic' | 'social' | 'campus' | 'seasonal'

  // Progress & Completion
  progress: {
    current: number      // Current streak or completion count
    target: number       // Target for completion (70% per SPEC)
    percentage: number   // Current completion percentage
    isCompleted: boolean
    streakDays: number   // Current streak
    longestStreak: number
  }

  // Participation
  participation: {
    totalParticipants: number
    friendsParticipating: string[] // Friend names
    myCheckIns: number
    lastCheckIn?: string // ISO date
    hasCheckedInToday: boolean
  }

  // Timing
  duration: {
    startDate: string    // ISO date
    endDate: string      // ISO date
    daysRemaining: number
    isActive: boolean
  }

  // Rewards & Motivation
  rewards: {
    points: number       // Points earned
    badges: string[]     // Badge IDs earned
    nextMilestone?: {
      description: string
      pointsNeeded: number
      reward: string
    }
  }

  // Social Features
  leaderboard?: {
    myRank: number
    topParticipants: Array<{
      name: string
      avatar?: string
      score: number
      isMe?: boolean
    }>
  }

  // Psychology
  motivationalMessage?: string
  urgencyLevel: 'low' | 'medium' | 'high'
  isNewRitual?: boolean
}

export interface RitualProgressCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ritual data */
  ritual: RitualData

  /** Check-in handler */
  onCheckIn?: (ritualId: string) => void

  /** View details handler */
  onViewDetails?: (ritualId: string) => void

  /** View leaderboard handler */
  onViewLeaderboard?: (ritualId: string) => void

  /** Share handler */
  onShare?: (ritualId: string) => void

  /** Show compact version */
  compact?: boolean

  /** Enable behavioral psychology features */
  enablePsychology?: boolean
}

const RitualProgressCard = React.forwardRef<HTMLDivElement, RitualProgressCardProps>(
  (
    {
      className,
      ritual,
      onCheckIn,
      onViewDetails,
      onViewLeaderboard,
      onShare,
      compact = false,
      enablePsychology = true,
      ...props
    },
    ref
  ) => {
    const [isAnimating, setIsAnimating] = React.useState(false)

    // Handle check-in with animation
    const handleCheckIn = () => {
      if (!ritual.participation.hasCheckedInToday) {
        setIsAnimating(true)
        onCheckIn?.(ritual.id)
        setTimeout(() => setIsAnimating(false), 500)
      }
    }

    // Calculate ring colors based on category
    const getRingColor = () => {
      switch (ritual.category) {
        case 'health': return 'stroke-green-500'
        case 'academic': return 'stroke-blue-500'
        case 'social': return 'stroke-purple-500'
        case 'campus': return 'stroke-[#FFD700]'
        case 'seasonal': return 'stroke-orange-500'
        default: return 'stroke-gray-500'
      }
    }

    // Progress ring radius and circumference
    const radius = compact ? 35 : 45
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (ritual.progress.percentage / 100) * circumference

    // Category icon
    const getCategoryIcon = () => {
      switch (ritual.category) {
        case 'health': return <Zap className="h-4 w-4" />
        case 'academic': return <Target className="h-4 w-4" />
        case 'social': return <Users className="h-4 w-4" />
        case 'campus': return <Crown className="h-4 w-4" />
        case 'seasonal': return <Calendar className="h-4 w-4" />
        default: return <Award className="h-4 w-4" />
      }
    }

    return (
      <Card
        ref={ref}
        className={cn(
          "relative overflow-hidden transition-all duration-fast ease-smooth",
          "bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-sm",
          "border border-white/10 hover:border-white/20",
          compact ? "p-3" : "p-4",
          isAnimating && "scale-105 shadow-lg shadow-[#FFD700]/20",
          className
        )}
        {...props}
      >
        {/* New Ritual Badge */}
        {ritual.isNewRitual && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-[#FFD700] text-black text-xs font-semibold animate-pulse">
              New!
            </Badge>
          </div>
        )}

        <div className="flex items-start gap-4">
          {/* Progress Ring */}
          <div className="relative flex-shrink-0">
            <svg
              className="transform -rotate-90 transition-all duration-smooth ease-smooth"
              width={compact ? 80 : 100}
              height={compact ? 80 : 100}
            >
              {/* Background circle */}
              <circle
                cx={compact ? 40 : 50}
                cy={compact ? 40 : 50}
                r={radius}
                stroke="rgb(255 255 255 / 0.1)"
                strokeWidth="4"
                fill="transparent"
              />

              {/* Progress circle */}
              <circle
                cx={compact ? 40 : 50}
                cy={compact ? 40 : 50}
                r={radius}
                className={cn(getRingColor(), "transition-all duration-smooth ease-smooth")}
                strokeWidth="4"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{
                  filter: 'drop-shadow(0 0 6px currentColor)',
                }}
              />
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={cn(
                  "font-bold text-white",
                  compact ? "text-sm" : "text-lg"
                )}>
                  {ritual.progress.percentage}%
                </div>
                {!compact && (
                  <div className="text-xs text-white/60">
                    {ritual.progress.current}/{ritual.progress.target}
                  </div>
                )}
              </div>
            </div>

            {/* Streak indicator */}
            {ritual.progress.streakDays > 0 && (
              <div className="absolute -bottom-1 -right-1">
                <div className="bg-orange-500 rounded-full px-1.5 py-0.5 flex items-center gap-1">
                  <Flame className="h-3 w-3 text-white" />
                  <span className="text-xs font-bold text-white">
                    {ritual.progress.streakDays}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-white/60">
                    {getCategoryIcon()}
                  </div>
                  <h3 className={cn(
                    "font-semibold text-white line-clamp-1",
                    compact ? "text-sm" : "text-base"
                  )}>
                    {ritual.title}
                  </h3>
                </div>

                {!compact && (
                  <p className="text-xs text-white/70 line-clamp-2 mb-2">
                    {ritual.description}
                  </p>
                )}
              </div>

              {/* Category badge */}
              <Badge
                variant="outline"
                className="text-xs border-white/20 text-white/70 capitalize"
              >
                {ritual.category}
              </Badge>
            </div>

            {/* Progress Stats */}
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div>
                <span className="text-white/60">Participants:</span>
                <span className="ml-1 text-white font-medium">
                  {ritual.participation.totalParticipants}
                </span>
              </div>
              <div>
                <span className="text-white/60">Days left:</span>
                <span className="ml-1 text-white font-medium">
                  {ritual.duration.daysRemaining}
                </span>
              </div>
            </div>

            {/* Friends participating - Social Proof */}
            {ritual.participation.friendsParticipating.length > 0 && (
              <div className="mb-3">
                <div className="text-xs text-[#FFD700] font-medium">
                  {ritual.participation.friendsParticipating.slice(0, 2).join(', ')}
                  {ritual.participation.friendsParticipating.length > 2 &&
                    ` +${ritual.participation.friendsParticipating.length - 2} friends`
                  } participating
                </div>
              </div>
            )}

            {/* Motivational message */}
            {enablePsychology && ritual.motivationalMessage && (
              <div className="mb-3 p-2 bg-white/5 rounded text-xs text-white/80 italic">
                {ritual.motivationalMessage}
              </div>
            )}

            {/* Next milestone */}
            {ritual.rewards.nextMilestone && !ritual.progress.isCompleted && (
              <div className="mb-3 p-2 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded">
                <div className="text-xs text-[#FFD700] font-medium mb-1">
                  Next milestone: {ritual.rewards.nextMilestone.description}
                </div>
                <div className="text-xs text-white/70">
                  {ritual.rewards.nextMilestone.pointsNeeded} points to unlock {ritual.rewards.nextMilestone.reward}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-3">
          <div className="flex gap-2">
            {/* Check-in Button */}
            <Button
              variant={ritual.participation.hasCheckedInToday ? "default" : "outline"}
              size="sm"
              className={cn(
                "transition-all duration-fast ease-smooth",
                ritual.participation.hasCheckedInToday && "bg-green-600 hover:bg-green-600/90",
                !ritual.participation.hasCheckedInToday && "hover:scale-105 active:scale-95"
              )}
              onClick={handleCheckIn}
              disabled={ritual.participation.hasCheckedInToday}
            >
              {ritual.participation.hasCheckedInToday ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Checked In
                </>
              ) : (
                <>
                  <Target className="h-4 w-4 mr-1" />
                  Check In
                </>
              )}
            </Button>

            {/* Leaderboard button (if available) */}
            {ritual.leaderboard && (
              <Button
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white"
                onClick={() => onViewLeaderboard?.(ritual.id)}
              >
                <Crown className="h-4 w-4 mr-1" />
                #{ritual.leaderboard.myRank}
              </Button>
            )}
          </div>

          {/* Secondary actions */}
          <div className="flex gap-1">
            {!compact && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-white/60 hover:text-white"
                onClick={() => onViewDetails?.(ritual.id)}
              >
                <TrendingUp className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Completion celebration overlay */}
        {ritual.progress.isCompleted && enablePsychology && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/20 to-transparent pointer-events-none">
            <div className="absolute top-2 left-2">
              <Award className="h-6 w-6 text-[#FFD700] animate-pulse" />
            </div>
          </div>
        )}
      </Card>
    )
  }
)

RitualProgressCard.displayName = "RitualProgressCard"

export { RitualProgressCard }
export type { RitualData }