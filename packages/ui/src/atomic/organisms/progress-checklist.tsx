"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../atoms/card"
import { Progress } from "../atoms/progress"
import { Button } from "../atoms/button"
import { Badge } from "../atoms/badge"
import { cn } from "../../lib/utils"

export interface ProgressChecklistItem {
  id: string
  label: string
  description?: string
  completed: boolean
  weight: number // Percentage contribution (sum should be 100)
  actionLabel?: string
  onAction?: () => void
}

export interface ProgressChecklistProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Title for the checklist (e.g., "Profile Completion", "Onboarding Progress") */
  title?: string
  /** Description text */
  description?: string
  /** Array of completion items */
  items: ProgressChecklistItem[]
  /** Current completion percentage (calculated automatically if not provided) */
  percentage?: number
  /** Target percentage for "success" state (default: 100) */
  targetPercentage?: number
  /** Text to show when target is reached */
  targetReachedLabel?: string
  /** Text to show when target is not reached */
  targetNotReachedLabel?: string
  /** Variant */
  variant?: "default" | "compact"
  /** Show incomplete items only */
  showIncompleteOnly?: boolean
}

const ProgressChecklist = React.forwardRef<HTMLDivElement, ProgressChecklistProps>(
  ({
    className,
    title = "Progress",
    description,
    items,
    percentage: overridePercentage,
    targetPercentage = 100,
    targetReachedLabel = "✓ Target Reached",
    targetNotReachedLabel,
    variant = "default",
    showIncompleteOnly = false,
    ...props
  }, ref) => {
    // Calculate percentage from items if not provided
    const calculatedPercentage = React.useMemo(() => {
      const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)
      const completedWeight = items
        .filter((item) => item.completed)
        .reduce((sum, item) => sum + item.weight, 0)

      return Math.round((completedWeight / totalWeight) * 100)
    }, [items])

    const percentage = overridePercentage ?? calculatedPercentage
    const isTargetReached = percentage >= targetPercentage

    const displayItems = showIncompleteOnly
      ? items.filter((item) => !item.completed)
      : items

    // Generate default description based on state
    const defaultDescription = isTargetReached
      ? targetReachedLabel
      : targetNotReachedLabel || `${targetPercentage - percentage}% remaining to reach ${targetPercentage}% target`

    const finalDescription = description ?? defaultDescription

    if (variant === "compact") {
      return (
        <div ref={ref} className={cn("space-y-3", className)} {...props}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {title}
            </span>
            <span className="text-sm font-bold text-foreground">{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-2" />
          {!isTargetReached && (
            <p className="text-xs text-muted-foreground">
              {targetPercentage - percentage}% to complete • Target: {targetPercentage}%
            </p>
          )}
        </div>
      )
    }

    return (
      <Card ref={ref} className={cn("", className)} {...props}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2">
                {title}
                {isTargetReached && (
                  <Badge variant="default" className="ml-2">
                    {targetReachedLabel}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                {finalDescription}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-foreground">{percentage}%</div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Progress bar */}
          <Progress value={percentage} className="h-3" />

          {/* Completion checklist */}
          {displayItems.length > 0 && (
            <div className="space-y-3 pt-2">
              {displayItems.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg border border-border transition-smooth ease-liquid",
                    item.completed
                      ? "bg-primary/5 border-primary/20"
                      : "bg-muted/30 hover:bg-muted/50"
                  )}
                >
                  {/* Checkbox icon */}
                  <div
                    className={cn(
                      "shrink-0 h-5 w-5 rounded-full flex items-center justify-center mt-0.5",
                      item.completed
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted border-2 border-border"
                    )}
                  >
                    {item.completed && (
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        strokeWidth="3"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Item content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p
                        className={cn(
                          "text-sm font-medium",
                          item.completed
                            ? "text-primary line-through"
                            : "text-foreground"
                        )}
                      >
                        {item.label}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        +{item.weight}%
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Action button */}
                  {!item.completed && item.onAction && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={item.onAction}
                      className="shrink-0"
                    >
                      {item.actionLabel || "Complete"}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Empty state for showIncompleteOnly when all complete */}
          {showIncompleteOnly && displayItems.length === 0 && (
            <div className="text-center py-8">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <svg
                  className="h-8 w-8 text-primary"
                  fill="none"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-foreground mb-1">
                All items completed!
              </p>
              <p className="text-xs text-muted-foreground">
                Great work on completing everything
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)

ProgressChecklist.displayName = "ProgressChecklist"

export { ProgressChecklist }
