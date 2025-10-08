"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { LucideIcon } from "lucide-react"
import { Separator } from "./separator"

export interface BulletinSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section title */
  title: string
  /** Optional subtitle/description */
  subtitle?: string
  /** Icon component from lucide-react */
  icon?: LucideIcon
  /** Action button in header */
  action?: React.ReactNode
  /** Count/badge text */
  count?: number
}

/**
 * Bulletin Section Header
 *
 * Custom primitive for category section headers with bulletin board aesthetic.
 * Creates visual separation between different space categories.
 *
 * Features:
 * - Clean separator line (like bulletin board sections)
 * - Optional icon for category identification
 * - Count indicator for items in section
 * - Action slot for "View All" or filter buttons
 */
const BulletinSection = React.forwardRef<HTMLDivElement, BulletinSectionProps>(
  (
    {
      className,
      title,
      subtitle,
      icon: Icon,
      action,
      count,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <section ref={ref} className={cn("space-y-6", className)} {...props}>
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
            )}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                {typeof count === "number" && (
                  <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-muted px-2 text-xs font-semibold text-muted-foreground">
                    {count}
                  </span>
                )}
              </div>
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Action slot */}
          {action && (
            <div className="flex-shrink-0">
              {action}
            </div>
          )}
        </div>

        {/* Separator */}
        <Separator className="bg-border" />

        {/* Content */}
        {children}
      </section>
    )
  }
)

BulletinSection.displayName = "BulletinSection"

export { BulletinSection }
