"use client"

import * as React from "react"
import { Card } from "../atoms/card"
import { cn } from "../../lib/utils"

export interface Stat {
  label: string
  value: number | string
  href?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
}

export interface StatGridProps extends React.HTMLAttributes<HTMLDivElement> {
  stats: Stat[]
  /** Layout variant */
  variant?: "grid" | "inline"
  /** Number of columns (only applies to grid variant) */
  columns?: 2 | 3 | 4
}

const StatGrid = React.forwardRef<HTMLDivElement, StatGridProps>(
  ({ className, stats, variant = "grid", columns, ...props }, ref) => {
    if (variant === "inline") {
      return (
        <div
          ref={ref}
          className={cn("flex flex-wrap gap-6", className)}
          {...props}
        >
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {typeof stat.value === 'number' && stat.value > 999
                    ? `${(stat.value / 1000).toFixed(1)}k`
                    : stat.value}
                </span>
                {stat.trend && (
                  <span
                    className={cn(
                      "text-xs font-medium",
                      stat.trend.isPositive
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {stat.trend.isPositive ? "+" : "-"}
                    {stat.trend.value}%
                  </span>
                )}
              </div>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      )
    }

    // Determine grid columns
    const gridCols = columns
      ? `grid-cols-${columns}`
      : stats.length === 2
      ? "grid-cols-2"
      : stats.length === 3
      ? "grid-cols-3"
      : stats.length === 4
      ? "grid-cols-2 sm:grid-cols-4"
      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"

    return (
      <div
        ref={ref}
        className={cn("grid gap-4", gridCols, className)}
        {...props}
      >
        {stats.map((stat, index) => {
          const content = (
            <Card
              className={cn(
                "p-4 transition-smooth ease-liquid",
                stat.href && "cursor-pointer hover:bg-accent/50"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-foreground">
                      {typeof stat.value === 'number' && stat.value > 999
                        ? `${(stat.value / 1000).toFixed(1)}k`
                        : stat.value}
                    </p>
                    {stat.trend && (
                      <span
                        className={cn(
                          "text-xs font-medium flex items-center gap-1",
                          stat.trend.isPositive
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      >
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          strokeWidth="2"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {stat.trend.isPositive ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          )}
                        </svg>
                        {stat.trend.value}%
                      </span>
                    )}
                  </div>
                </div>
                {stat.icon && (
                  <div className="shrink-0 text-muted-foreground/50">
                    {stat.icon}
                  </div>
                )}
              </div>
            </Card>
          )

          if (stat.href) {
            return (
              <a key={index} href={stat.href}>
                {content}
              </a>
            )
          }

          return <div key={index}>{content}</div>
        })}
      </div>
    )
  }
)

StatGrid.displayName = "StatGrid"

export { StatGrid }
