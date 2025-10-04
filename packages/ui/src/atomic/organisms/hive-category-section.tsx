"use client"

import * as React from "react"
import { MotionDiv, AnimatePresence } from "../../shells/motion-safe"
import { transitions } from "../../lib/animations"
import { cn } from "../../lib/utils"
import { ChevronDown, LucideIcon } from "lucide-react"

export interface HiveCategorySectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Category icon */
  icon: LucideIcon
  /** Category title */
  title: string
  /** Subtitle/description */
  subtitle?: string
  /** Space count in category */
  count: number
  /** Initially expanded */
  defaultExpanded?: boolean
  /** Accent color (default: #FFD700) */
  accentColor?: string
  /** Category-specific color override */
  categoryColor?: {
    /** Icon background */
    iconBg: string
    /** Icon foreground */
    iconFg: string
    /** Border accent */
    border: string
  }
}

/**
 * HIVE Category Section
 *
 * Collapsible category section for space discovery.
 * Each category has unique visual identity with custom colors.
 *
 * Features:
 * - Click header to expand/collapse
 * - Smooth height animations
 * - Custom color schemes per category
 * - Large count display
 * - Icon with colored background
 */
const HiveCategorySection = React.forwardRef<HTMLDivElement, HiveCategorySectionProps>(
  (
    {
      className,
      icon: Icon,
      title,
      subtitle,
      count,
      defaultExpanded = false,
      accentColor = "#FFD700",
      categoryColor,
      children,
      ...props
    },
    ref
  ) => {
    const [isExpanded, setIsExpanded] = React.useState(defaultExpanded)

    // Default to gold accent if no category color provided
    const colors = categoryColor || {
      iconBg: `${accentColor}15`,
      iconFg: accentColor,
      border: accentColor,
    }

    return (
      <section
        ref={ref}
        className={cn("space-y-0 rounded-lg border border-border overflow-hidden", className)}
        {...props}
      >
        {/* Header - Clickable to expand/collapse */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "w-full p-6 flex items-center justify-between gap-4",
            "transition-all duration-200",
            "hover:bg-muted/50",
            isExpanded && "bg-muted/30 border-b border-border"
          )}
        >
          <div className="flex items-center gap-4">
            {/* Icon Container */}
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200"
              style={{
                backgroundColor: colors.iconBg,
                color: colors.iconFg,
              }}
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
            </div>

            {/* Title & Subtitle */}
            <div className="text-left space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold tracking-tight">{title}</h2>

                {/* Count Badge */}
                <div
                  className="flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-bold"
                  style={{
                    backgroundColor: colors.iconBg,
                    color: colors.iconFg,
                  }}
                >
                  {count}
                </div>
              </div>

              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Expand/Collapse Indicator */}
          <div
            className={cn(
              "flex-shrink-0 transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
          >
            <ChevronDown className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          </div>
        </button>

        {/* Collapsible Content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <MotionDiv
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={transitions.slow}
              className="overflow-hidden"
            >
              <div className="p-6 pt-0">
                {children}
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>
      </section>
    )
  }
)

HiveCategorySection.displayName = "HiveCategorySection"

export { HiveCategorySection }
