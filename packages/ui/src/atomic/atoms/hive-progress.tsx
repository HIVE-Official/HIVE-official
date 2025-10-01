"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const hiveProgressVariants = cva(
  "relative overflow-hidden rounded-full bg-[var(--hive-background-secondary)]",
  {
    variants: {
      variant: {
        default: "bg-[var(--hive-background-secondary)]",
        primary: "bg-[var(--hive-brand-primary-bg)]",
        success: "bg-[var(--hive-status-success-bg)]",
        warning: "bg-[var(--hive-status-warning-bg)]",
        error: "bg-[var(--hive-status-error-bg)]",
      },
      size: {
        default: "h-2",
        sm: "h-1",
        lg: "h-3",
        xl: "h-4",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
        spin: "animate-spin",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
)

const hiveProgressBarVariants = cva(
  "h-full transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-[var(--hive-brand-primary)]",
        primary: "bg-[var(--hive-brand-primary)]",
        success: "bg-[var(--hive-status-success)]",
        warning: "bg-[var(--hive-status-warning)]",
        error: "bg-[var(--hive-status-error)]",
      },
      gradient: {
        none: "",
        subtle: "bg-gradient-to-r from-current to-current/80",
        vibrant: "bg-gradient-to-r from-current via-current/90 to-current",
        hive: "bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)]",
      },
    },
    defaultVariants: {
      variant: "default",
      gradient: "none",
    },
  }
)

export interface HiveProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hiveProgressVariants> {
  value?: number
  max?: number
  showLabel?: boolean
  showPercentage?: boolean
  label?: string
  gradient?: VariantProps<typeof hiveProgressBarVariants>["gradient"]
  indeterminate?: boolean
}

const HiveProgress = React.forwardRef<HTMLDivElement, HiveProgressProps>(
  ({
    className,
    variant,
    size,
    animation,
    value = 0,
    max = 100,
    showLabel = false,
    showPercentage = false,
    label,
    gradient,
    indeterminate = false,
    ...props
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    const displayValue = Math.round(percentage)

    return (
      <div className="w-full space-y-2">
        {(showLabel || showPercentage) && (
          <div className="flex items-center justify-between text-sm">
            {showLabel && label && (
              <span className="text-[var(--hive-text-primary)]">{label}</span>
            )}
            {showPercentage && (
              <span className="text-[var(--hive-text-secondary)]">
                {displayValue}%
              </span>
            )}
          </div>
        )}

        <div
          ref={ref}
          className={cn(
            hiveProgressVariants({ variant, size, animation }),
            className
          )}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
          {...props}
        >
          <div
            className={cn(
              hiveProgressBarVariants({ variant, gradient }),
              indeterminate && "animate-pulse bg-gradient-to-r from-transparent via-current to-transparent"
            )}
            style={{
              width: indeterminate ? "100%" : `${percentage}%`,
              transform: indeterminate ? "translateX(-100%)" : "none",
              animation: indeterminate ? "hive-progress-indeterminate 2s infinite linear" : undefined,
            }}
          />
        </div>
      </div>
    )
  }
)

HiveProgress.displayName = "HiveProgress"

// Add CSS animation for indeterminate progress
const progressStyles = `
@keyframes hive-progress-indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
`

// Inject styles (this is a simple approach - in a real app you'd use a proper CSS solution)
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = progressStyles
  document.head.appendChild(styleElement)
}

export { HiveProgress, hiveProgressVariants, hiveProgressBarVariants }