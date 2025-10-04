"use client"

import * as React from "react"
import { MotionDiv } from "../../shells/motion-safe"
import { transitions } from "../../lib/animations"
import { Card, CardContent } from "../atoms/card"
import { Badge } from "../atoms/badge"
import { Button } from "../atoms/button"
import { cn } from "../../lib/utils"
import { LucideIcon, ChevronRight } from "lucide-react"

export interface CategoryOverviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Category icon from lucide-react */
  icon: LucideIcon
  /** Category name */
  title: string
  /** Subtitle/description */
  subtitle?: string
  /** Space count in category */
  count: number
  /** Click handler to expand category */
  onExplore?: () => void
  /** Featured/new badge */
  badge?: string
}

/**
 * Category Overview Card
 *
 * Large clickable card for homebase category navigation.
 * Shows icon, title, count, and explore action.
 *
 * Features:
 * - Large icon display
 * - Count badge
 * - Hover lift effect
 * - Click to explore category
 */
const CategoryOverviewCard = React.forwardRef<HTMLDivElement, CategoryOverviewCardProps>(
  (
    {
      className,
      icon: Icon,
      title,
      subtitle,
      count,
      onExplore,
      badge,
      ...props
    },
    ref
  ) => {
    return (
      <MotionDiv
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={transitions.fast}
      >
        <Card
          ref={ref}
          className={cn(
            "relative overflow-hidden cursor-pointer group",
            "border-2 hover:border-primary/50",
            "transition-all duration-300",
            className
          )}
          onClick={onExplore}
          {...props}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {/* Icon and Info */}
              <div className="flex items-center gap-4">
                {/* Icon Container */}
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-8 w-8" aria-hidden="true" />
                </div>

                {/* Title and Subtitle */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                      {title}
                    </h3>
                    {badge && (
                      <Badge variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    )}
                  </div>
                  {subtitle && (
                    <p className="text-sm text-muted-foreground">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Count and Arrow */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">
                    {count}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {count === 1 ? 'space' : 'spaces'}
                  </div>
                </div>

                <ChevronRight
                  className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                  aria-hidden="true"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </MotionDiv>
    )
  }
)

CategoryOverviewCard.displayName = "CategoryOverviewCard"

export { CategoryOverviewCard }
