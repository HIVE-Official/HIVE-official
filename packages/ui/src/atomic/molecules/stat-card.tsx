"use client"

import * as React from "react"
import { Card, CardContent, CardHeader } from "../atoms/card"
import { Badge } from "../atoms/badge"
import { Progress } from "../atoms/progress"
import { cn } from "../../lib/utils"

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  label: string
  value: string | number
  description?: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  badge?: string
  badgeVariant?: "default" | "secondary" | "destructive" | "outline"
  progress?: number
  progressColor?: string
  size?: "sm" | "default"
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      className,
      icon,
      label,
      value,
      description,
      trend,
      trendValue,
      badge,
      badgeVariant = "secondary",
      progress,
      progressColor,
      size = "default",
      ...props
    },
    ref
  ) => {
    const isSmall = size === "sm"

    return (
      <Card
        ref={ref}
        className={cn(
          "transition-all duration-smooth ease-liquid hover:shadow-md hover:border-primary/50",
          className
        )}
        {...props}
      >
        <CardHeader className={cn(
          "flex flex-row items-start justify-between space-y-0",
          isSmall ? "pb-1" : "pb-2"
        )}>
          <div className="flex items-start gap-2">
            {icon && (
              <div className={cn(
                "flex items-center justify-center rounded-lg bg-primary/10 text-primary transition-smooth ease-liquid",
                isSmall ? "h-6 w-6" : "h-8 w-8"
              )}>
                {icon}
              </div>
            )}
            <div className="flex flex-col gap-0.5">
              <p className={cn(
                "font-medium text-muted-foreground",
                isSmall ? "text-xs" : "text-sm"
              )}>{label}</p>
              {badge && (
                <Badge
                  variant={badgeVariant}
                  className="w-fit transition-smooth ease-liquid text-xs"
                >
                  {badge}
                </Badge>
              )}
            </div>
          </div>
          {trend && (
            <div
              className={cn(
                "flex items-center gap-1 font-medium transition-smooth ease-liquid",
                isSmall ? "text-[10px]" : "text-xs",
                trend === "up" && "text-green-500",
                trend === "down" && "text-destructive",
                trend === "neutral" && "text-muted-foreground"
              )}
            >
              {trend === "up" && (
                <svg className={cn(isSmall ? "h-2.5 w-2.5" : "h-3 w-3")} fill="none" strokeWidth="2.5" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
              )}
              {trend === "down" && (
                <svg className={cn(isSmall ? "h-2.5 w-2.5" : "h-3 w-3")} fill="none" strokeWidth="2.5" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              )}
              {trendValue}
            </div>
          )}
        </CardHeader>
        <CardContent className={cn(isSmall ? "space-y-1" : "space-y-2")}>
          <div className={cn(
            "font-bold text-foreground",
            isSmall ? "text-lg" : "text-2xl"
          )}>{value}</div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          {progress !== undefined && (
            <Progress
              value={progress}
              className={cn(isSmall ? "h-1.5" : "h-2", progressColor)}
            />
          )}
        </CardContent>
      </Card>
    )
  }
)

StatCard.displayName = "StatCard"

export { StatCard }
