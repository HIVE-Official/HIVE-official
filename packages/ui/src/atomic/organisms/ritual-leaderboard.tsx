"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Card } from "../atoms/card"
import { Avatar } from "../atoms/avatar"
import { Badge } from "../atoms/badge"
import { Trophy, Medal, Award } from "lucide-react"

export interface LeaderboardEntry {
  /** User rank */
  rank: number
  /** User name */
  name: string
  /** User handle */
  handle: string
  /** User avatar URL */
  avatar?: string
  /** Progress percentage */
  progress: number
  /** Is this the current user? */
  isCurrentUser?: boolean
}

export interface RitualLeaderboardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Leaderboard entries */
  entries: LeaderboardEntry[]
  /** Show only top N entries */
  limit?: number
  /** Highlight current user */
  highlightCurrentUser?: boolean
}

const RitualLeaderboard = React.forwardRef<HTMLDivElement, RitualLeaderboardProps>(
  ({ className, entries, limit, highlightCurrentUser = true, ...props }, ref) => {
    const displayEntries = limit ? entries.slice(0, limit) : entries

    const getRankIcon = (rank: number) => {
      if (rank === 1) return <Trophy className="h-5 w-5 text-[#FFD700]" />
      if (rank === 2) return <Medal className="h-5 w-5 text-[#C0C0C0]" />
      if (rank === 3) return <Award className="h-5 w-5 text-[#CD7F32]" />
      return null
    }

    const getRankColor = (rank: number) => {
      if (rank === 1) return "text-[#FFD700]"
      if (rank === 2) return "text-[#C0C0C0]"
      if (rank === 3) return "text-[#CD7F32]"
      return "text-white/50"
    }

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {displayEntries.map((entry) => {
          const isTop3 = entry.rank <= 3
          const isCurrentUser = highlightCurrentUser && entry.isCurrentUser

          return (
            <Card
              key={entry.rank}
              className={cn(
                "p-4 transition-all duration-200",
                "bg-[#0c0c0c] border border-white/8",
                "hover:border-white/20",
                isCurrentUser && "border-[#FFD700]/30 bg-[#FFD700]/5"
              )}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="flex items-center justify-center w-12 h-12 flex-shrink-0">
                  {isTop3 ? (
                    getRankIcon(entry.rank)
                  ) : (
                    <span className={cn("text-2xl font-bold", getRankColor(entry.rank))}>
                      {entry.rank}
                    </span>
                  )}
                </div>

                {/* Avatar */}
                <Avatar className="h-10 w-10 border border-white/20">
                  {entry.avatar ? (
                    <img src={entry.avatar} alt={entry.name} />
                  ) : (
                    <div className="bg-white/10 w-full h-full flex items-center justify-center text-white">
                      {entry.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </Avatar>

                {/* User info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white truncate">
                      {entry.name}
                    </h4>
                    {isCurrentUser && (
                      <Badge
                        variant="outline"
                        className="border-[#FFD700]/30 text-[#FFD700] text-xs"
                      >
                        You
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-white/50">@{entry.handle}</p>
                </div>

                {/* Progress */}
                <div className="text-right flex-shrink-0">
                  <div
                    className={cn(
                      "text-xl font-bold",
                      entry.progress === 100 ? "text-[#FFD700]" : "text-white"
                    )}
                  >
                    {entry.progress}%
                  </div>
                  {entry.progress === 100 && (
                    <div className="text-xs text-[#FFD700]">Complete</div>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 h-1.5 bg-white/8 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    entry.progress === 100 ? "bg-[#FFD700]" : "bg-white/30"
                  )}
                  style={{ width: `${entry.progress}%` }}
                />
              </div>
            </Card>
          )
        })}

        {limit && entries.length > limit && (
          <div className="text-center py-2">
            <p className="text-sm text-white/50">
              +{entries.length - limit} more participants
            </p>
          </div>
        )}
      </div>
    )
  }
)

RitualLeaderboard.displayName = "RitualLeaderboard"

export { RitualLeaderboard }
