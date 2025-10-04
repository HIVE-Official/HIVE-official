"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Check, Lock, Circle } from "lucide-react"
import { Badge } from "../atoms/badge"

export interface Milestone {
  id: string
  name: string
  description?: string
  status: "completed" | "active" | "locked"
  progress?: number
  reward?: string
}

export interface RitualMilestoneTrackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Milestones to display */
  milestones: Milestone[]

  /** Orientation */
  orientation?: "vertical" | "horizontal"

  /** Compact mode */
  compact?: boolean

  /** Milestone click handler */
  onMilestoneClick?: (milestone: Milestone) => void
}

const RitualMilestoneTrack = React.forwardRef<HTMLDivElement, RitualMilestoneTrackProps>(
  (
    {
      className,
      milestones,
      orientation = "vertical",
      compact = false,
      onMilestoneClick,
      ...props
    },
    ref
  ) => {
    const isVertical = orientation === "vertical"

    return (
      <div
        ref={ref}
        className={cn(
          "relative",
          isVertical ? "space-y-6" : "flex gap-6 overflow-x-auto pb-4",
          className
        )}
        {...props}
      >
        {milestones.map((milestone, index) => {
          const isFirst = index === 0
          const isLast = index === milestones.length - 1
          const isCompleted = milestone.status === "completed"
          const isActive = milestone.status === "active"
          const isLocked = milestone.status === "locked"

          return (
            <div
              key={milestone.id}
              className={cn(
                "relative flex",
                isVertical ? "flex-row gap-4" : "flex-col items-center gap-2",
                isVertical ? "min-w-0" : "min-w-[200px]"
              )}
            >
              {/* Connector Line */}
              {!isLast && (
                <div
                  className={cn(
                    "absolute bg-white/8",
                    isVertical
                      ? "left-5 top-12 w-0.5 h-full"
                      : "top-5 left-12 w-full h-0.5",
                    isCompleted && "bg-[#FFD700]/30"
                  )}
                />
              )}

              {/* Icon */}
              <div
                className={cn(
                  "relative z-10 shrink-0 flex items-center justify-center rounded-full border-2 transition-all duration-smooth",
                  compact ? "h-10 w-10" : "h-12 w-12",
                  isCompleted &&
                    "bg-[#FFD700] border-[#FFD700] text-black shadow-[0_0_20px_rgba(255,215,0,0.3)]",
                  isActive &&
                    "bg-white/10 border-white text-white animate-pulse",
                  isLocked && "bg-[#0c0c0c] border-white/20 text-white/30",
                  onMilestoneClick && !isLocked && "cursor-pointer hover:scale-110"
                )}
                onClick={() => !isLocked && onMilestoneClick?.(milestone)}
              >
                {isCompleted && <Check className="h-5 w-5" />}
                {isActive && milestone.progress !== undefined ? (
                  <span className="text-xs font-bold">{milestone.progress}%</span>
                ) : isActive ? (
                  <Circle className="h-4 w-4 fill-current" />
                ) : null}
                {isLocked && <Lock className="h-4 w-4" />}
              </div>

              {/* Content */}
              <div
                className={cn(
                  "flex-1 min-w-0",
                  isVertical ? "" : "text-center",
                  compact && "space-y-1"
                )}
              >
                <div className="flex items-center gap-2">
                  <h4
                    className={cn(
                      "font-semibold",
                      compact ? "text-sm" : "text-base",
                      isCompleted && "text-white",
                      isActive && "text-white",
                      isLocked && "text-white/40"
                    )}
                  >
                    {milestone.name}
                  </h4>
                  {isCompleted && !compact && (
                    <Badge variant="outline" className="h-5 text-[9px] border-[#FFD700]/50 text-[#FFD700]">
                      Done
                    </Badge>
                  )}
                </div>

                {milestone.description && !compact && (
                  <p
                    className={cn(
                      "text-sm mt-1",
                      isCompleted && "text-white/70",
                      isActive && "text-white/70",
                      isLocked && "text-white/30"
                    )}
                  >
                    {milestone.description}
                  </p>
                )}

                {milestone.reward && (isCompleted || isActive) && !compact && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-[#FFD700]">
                    <span>🎁</span>
                    <span>{milestone.reward}</span>
                  </div>
                )}

                {/* Progress Bar for Active Milestone */}
                {isActive && milestone.progress !== undefined && !compact && (
                  <div className="mt-2 h-1.5 bg-white/8 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FFD700] transition-all duration-smooth"
                      style={{ width: `${milestone.progress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
)

RitualMilestoneTrack.displayName = "RitualMilestoneTrack"

export { RitualMilestoneTrack }
export type { Milestone }
