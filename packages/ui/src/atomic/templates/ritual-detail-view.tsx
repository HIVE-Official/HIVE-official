"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "../atoms/button"
import { Badge } from "../atoms/badge"
import { Card } from "../atoms/card"
import { RitualProgressRing } from "../molecules/ritual-progress-ring"
import { RitualMilestoneTrack, type Milestone } from "../organisms/ritual-milestone-track"
import { RitualLeaderboard } from "../organisms/ritual-leaderboard"
import { Calendar, Users, Trophy, Clock, ArrowLeft } from "lucide-react"

export interface RitualDetailViewProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ritual data */
  ritual: {
    id: string
    title: string
    description: string
    icon: string
    type: "onboarding" | "seasonal" | "challenge" | "emergency"
    category: "social" | "academic" | "wellness" | "community"
    startDate: string
    endDate: string
    progress: {
      personal: number
      campus: number
      participants: number
      target: number
    }
    milestones: Milestone[]
    rewards: {
      badge?: string
      title?: string
      feature?: string
    }
    hasJoined: boolean
    timeRemaining?: {
      days: number
      hours: number
      isUrgent: boolean
    }
  }

  /** Join handler */
  onJoin?: () => void | Promise<void>

  /** Leave handler */
  onLeave?: () => void | Promise<void>

  /** Milestone click handler */
  onMilestoneClick?: (milestone: Milestone) => void

  /** Back navigation handler */
  onBack?: () => void

  /** Share handler */
  onShare?: () => void

  /** Show leaderboard */
  showLeaderboard?: boolean
}

const RitualDetailView = React.forwardRef<HTMLDivElement, RitualDetailViewProps>(
  (
    {
      className,
      ritual,
      onJoin,
      onLeave,
      onMilestoneClick,
      onBack,
      onShare,
      showLeaderboard = true,
      ...props
    },
    ref
  ) => {
    const [isJoining, setIsJoining] = React.useState(false)

    const handleJoinLeave = async () => {
      setIsJoining(true)
      try {
        if (ritual.hasJoined) {
          await onLeave?.()
        } else {
          await onJoin?.()
        }
      } finally {
        setIsJoining(false)
      }
    }

    return (
      <div
        ref={ref}
        className={cn("min-h-screen bg-[#000000] pb-20", className)}
        {...props}
      >
        {/* Header */}
        <div className="sticky top-0 z-50 border-b border-white/8 bg-[#0c0c0c]/95 backdrop-blur">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-white/70 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            <div className="flex-1" />
            {onShare && (
              <Button
                variant="outline"
                size="sm"
                onClick={onShare}
                className="border-white/20 text-white"
              >
                Share
              </Button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">{ritual.icon}</div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{ritual.title}</h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">{ritual.description}</p>

            {/* Type & Category Badges */}
            <div className="flex items-center justify-center gap-2">
              <Badge variant="outline" className="border-white/20 text-white">
                {ritual.type}
              </Badge>
              <Badge variant="outline" className="border-white/20 text-white">
                {ritual.category}
              </Badge>
            </div>
          </div>

          {/* Join/Leave CTA */}
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleJoinLeave}
              disabled={isJoining}
              className={cn(
                "min-w-[200px] text-base font-semibold",
                ritual.hasJoined
                  ? "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                  : "bg-[#FFD700] text-black hover:bg-[#FFD700]/90 border border-[#FFD700]"
              )}
            >
              {isJoining
                ? "..."
                : ritual.hasJoined
                ? "Leave Ritual"
                : "Join Ritual"}
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-[#0c0c0c] border border-white/8 p-4 text-center">
              <Users className="h-5 w-5 text-white/50 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {ritual.progress.participants.toLocaleString()}
              </div>
              <div className="text-xs text-white/50">Participants</div>
            </Card>

            <Card className="bg-[#0c0c0c] border border-white/8 p-4 text-center">
              <Trophy className="h-5 w-5 text-[#FFD700] mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{ritual.progress.campus}%</div>
              <div className="text-xs text-white/50">Campus Progress</div>
            </Card>

            <Card className="bg-[#0c0c0c] border border-white/8 p-4 text-center">
              <Calendar className="h-5 w-5 text-white/50 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{ritual.endDate}</div>
              <div className="text-xs text-white/50">Ends</div>
            </Card>

            <Card className="bg-[#0c0c0c] border border-white/8 p-4 text-center">
              <Clock className="h-5 w-5 text-white/50 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {ritual.timeRemaining ? `${ritual.timeRemaining.days}d ${ritual.timeRemaining.hours}h` : "—"}
              </div>
              <div className="text-xs text-white/50">Remaining</div>
            </Card>
          </div>

          {/* Progress Ring */}
          {ritual.hasJoined && (
            <div className="flex justify-center">
              <RitualProgressRing
                personal={ritual.progress.personal}
                campus={ritual.progress.campus}
                size="lg"
              />
            </div>
          )}

          {/* Milestones */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Milestones</h2>
            <RitualMilestoneTrack
              milestones={ritual.milestones}
              onMilestoneClick={onMilestoneClick}
            />
          </div>

          {/* Rewards */}
          {(ritual.rewards.badge || ritual.rewards.title || ritual.rewards.feature) && (
            <Card className="bg-[#0c0c0c] border border-[#FFD700]/30 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🎁</span>
                Rewards
              </h3>
              <div className="space-y-3">
                {ritual.rewards.badge && (
                  <div className="flex items-center gap-3">
                    <Badge className="bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30">
                      Badge
                    </Badge>
                    <span className="text-white">{ritual.rewards.badge}</span>
                  </div>
                )}
                {ritual.rewards.title && (
                  <div className="flex items-center gap-3">
                    <Badge className="bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30">
                      Title
                    </Badge>
                    <span className="text-white">{ritual.rewards.title}</span>
                  </div>
                )}
                {ritual.rewards.feature && (
                  <div className="flex items-center gap-3">
                    <Badge className="bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30">
                      Feature
                    </Badge>
                    <span className="text-white">{ritual.rewards.feature}</span>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Leaderboard */}
          {showLeaderboard && ritual.hasJoined && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Leaderboard</h2>
              <RitualLeaderboard
                entries={[
                  { rank: 1, name: "Sarah Chen", handle: "sarachen", progress: 100, avatar: undefined },
                  { rank: 2, name: "Mike Johnson", handle: "mikej", progress: 95, avatar: undefined },
                  { rank: 3, name: "Emma Davis", handle: "emmad", progress: 87, avatar: undefined },
                ]}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
)

RitualDetailView.displayName = "RitualDetailView"

export { RitualDetailView }
