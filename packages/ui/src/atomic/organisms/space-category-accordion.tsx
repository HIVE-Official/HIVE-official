"use client"

import * as React from "react"
import { LucideIcon } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../atoms/accordion"
import { cn } from "../../lib/utils"

export interface SpaceCategoryAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Category identifier */
  value: string
  /** Category icon */
  icon: LucideIcon
  /** Category title */
  title: string
  /** Subtitle/description */
  subtitle?: string
  /** Space count */
  count: number
  /** Smart recommendations indicator */
  isRecommended?: boolean
}

/**
 * Space Category Accordion Item
 *
 * Built on shadcn Accordion primitive with HIVE visual language.
 * Uses design tokens from hive-theme.ts (monochrome + gold accent).
 *
 * Features:
 * - Accordion pattern for collapsible categories
 * - Monochrome design with gold accent for recommended
 * - Icon in circular container
 * - Count badge
 * - Proper semantic HTML
 */
const SpaceCategoryAccordion = React.forwardRef<HTMLDivElement, SpaceCategoryAccordionProps>(
  (
    {
      className,
      value,
      icon: Icon,
      title,
      subtitle,
      count,
      isRecommended = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <AccordionItem
        value={value}
        className={cn(
          "border rounded-lg overflow-hidden",
          "hover:border-[#FFD700]/20 transition-colors duration-fast",
          className
        )}
        {...props}
      >
        <AccordionTrigger
          className={cn(
            "px-6 py-6 hover:no-underline",
            "[&[data-state=open]]:border-b",
            "transition-all duration-smooth"
          )}
        >
          <div className="flex items-center gap-4 flex-1 text-left">
            {/* Icon Container - Monochrome circle */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 shrink-0 transition-colors duration-fast group-hover:bg-white/5">
              <Icon className="h-5 w-5 text-white/70" aria-hidden="true" />
            </div>

            {/* Title & Subtitle */}
            <div className="flex-1 space-y-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-semibold tracking-tight leading-tight">
                  {title}
                </h3>

                {/* Count Badge - Monochrome */}
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/10 px-2 text-xs font-semibold text-white">
                  {count}
                </span>

                {/* Recommended indicator - Gold accent (strategic use) */}
                {isRecommended && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFD700]/10 text-[#FFD700] text-xs font-medium">
                    ✨ For You
                  </span>
                )}
              </div>

              {subtitle && (
                <p className="text-sm text-white/70 leading-normal line-clamp-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="px-6 pb-6 pt-3">
          {children}
        </AccordionContent>
      </AccordionItem>
    )
  }
)

SpaceCategoryAccordion.displayName = "SpaceCategoryAccordion"

export { SpaceCategoryAccordion }
