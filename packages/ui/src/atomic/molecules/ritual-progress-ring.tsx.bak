"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

export interface RitualProgressRingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Personal progress percentage (0-100) */
  personal: number

  /** Campus-wide progress percentage (0-100) */
  campus: number

  /** Target value (for display) */
  target?: number

  /** Size variant */
  size?: "sm" | "md" | "lg"

  /** Show labels */
  showLabels?: boolean
}

const RitualProgressRing = React.forwardRef<HTMLDivElement, RitualProgressRingProps>(
  (
    {
      className,
      personal,
      campus,
      target = 100,
      size = "md",
      showLabels = true,
      ...props
    },
    ref
  ) => {
    const sizeConfig = {
      sm: { ring: 80, stroke: 6, fontSize: "text-lg" },
      md: { ring: 120, stroke: 8, fontSize: "text-2xl" },
      lg: { ring: 160, stroke: 10, fontSize: "text-3xl" },
    }

    const config = sizeConfig[size]
    const radius = (config.ring - config.stroke) / 2
    const circumference = 2 * Math.PI * radius
    const center = config.ring / 2

    // Calculate dash offsets for progress
    const personalOffset = circumference - (personal / 100) * circumference
    const campusOffset = circumference - (campus / 100) * circumference

    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center gap-4", className)}
        {...props}
      >
        {/* Ring Container */}
        <div className="relative" style={{ width: config.ring, height: config.ring }}>
          {/* SVG Rings */}
          <svg
            width={config.ring}
            height={config.ring}
            className="transform -rotate-90"
          >
            {/* Background Ring */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={config.stroke}
            />

            {/* Campus Progress Ring (outer) */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth={config.stroke}
              strokeDasharray={circumference}
              strokeDashoffset={campusOffset}
              strokeLinecap="round"
              className="transition-all duration-smooth ease-liquid"
            />

            {/* Personal Progress Ring (inner, gold) */}
            <circle
              cx={center}
              cy={center}
              r={radius - config.stroke - 2}
              fill="none"
              stroke="#FFD700"
              strokeWidth={config.stroke - 2}
              strokeDasharray={circumference}
              strokeDashoffset={personalOffset}
              strokeLinecap="round"
              className="transition-all duration-smooth ease-liquid"
              style={{
                filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.4))",
              }}
            />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={cn("font-bold text-white", config.fontSize)}>
              {personal}%
            </div>
            <div className="text-xs text-white/50 font-medium">personal</div>
          </div>
        </div>

        {/* Labels */}
        {showLabels && (
          <div className="flex gap-6 text-sm">
            {/* Personal Progress */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FFD700]" />
              <div className="flex flex-col">
                <span className="text-xs text-white/50">Your Progress</span>
                <span className="font-semibold text-white">{personal}%</span>
              </div>
            </div>

            {/* Campus Progress */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white/30" />
              <div className="flex flex-col">
                <span className="text-xs text-white/50">Campus</span>
                <span className="font-semibold text-white">{campus}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
)

RitualProgressRing.displayName = "RitualProgressRing"

export { RitualProgressRing }
