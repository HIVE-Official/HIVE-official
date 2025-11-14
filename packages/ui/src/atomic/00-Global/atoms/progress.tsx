'use client';

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../../lib/utils"

const progressVariants = cva(
  "relative h-4 w-full overflow-hidden rounded-full bg-[var(--hive-background-tertiary)]",
  {
    variants: {
      size: {
        default: "h-4",
        sm: "h-2",
        lg: "h-6",
        xl: "h-8",
        xs: "h-1.5",
      },
      variant: {
        default: "bg-[var(--hive-background-tertiary)]",
        secondary: "bg-[var(--hive-background-secondary)]",
        primary: "bg-[var(--hive-brand-primary-bg,#191c2d)]",
        success: "bg-[var(--hive-status-success)]/20",
        warning: "bg-[var(--hive-status-warning)]/20",
        error: "bg-[var(--hive-status-error)]/20",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 bg-[var(--hive-brand-primary)] transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-[var(--hive-brand-primary)]",
        secondary: "bg-[var(--hive-text-secondary)]",
        success: "bg-[var(--hive-status-success)]",
        warning: "bg-[var(--hive-status-warning)]",
        error: "bg-[var(--hive-status-error)]",
        gradient: "bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)]",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        indeterminate: "animate-bounce",
        bounce: "animate-bounce",
        spin: "animate-spin",
      },
      gradient: {
        none: "",
        subtle: "bg-gradient-to-r from-current to-current/80",
        vibrant: "bg-gradient-to-r from-current via-current/90 to-current",
        hive: "bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)]",
      }
    },
    defaultVariants: {
      variant: "default",
      animation: "none",
      gradient: "none",
    },
  }
)

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number
  max?: number
  indeterminate?: boolean
  showValue?: boolean
  formatValue?: (value: number, max: number) => string
  indicatorVariant?: VariantProps<typeof progressIndicatorVariants>["variant"]
  animation?: VariantProps<typeof progressIndicatorVariants>["animation"]
  label?: string
  showLabel?: boolean
  showPercentage?: boolean
  gradient?: VariantProps<typeof progressIndicatorVariants>["gradient"]
  indicatorClassName?: string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({
    className,
    value = 0,
    max = 100,
    size,
    variant,
    indeterminate = false,
    showValue = false,
    formatValue,
    indicatorVariant,
    animation,
    label,
    showLabel = false,
    showPercentage = false,
    gradient,
    indicatorClassName,
    ...props
  }, ref) => {
    const percentage = indeterminate ? 100 : Math.min(Math.max((value / max) * 100, 0), 100)

    const defaultFormatValue = React.useCallback(
      (val: number, maxVal: number) => `${Math.round((val / maxVal) * 100)}%`,
      []
    )

    const displayValue = formatValue
      ? formatValue(value, max)
      : defaultFormatValue(value, max)

    return (
      <div className="w-full space-y-2">
        {(showValue || showLabel || showPercentage) && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[var(--hive-text-primary)]">
              {label ?? "Progress"}
            </span>
            {showValue || showPercentage ? (
              <span className="text-sm text-[var(--hive-text-secondary)]">
                {indeterminate ? "Loading..." : displayValue}
              </span>
            ) : null}
          </div>
        )}
        <div
          ref={ref}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={indeterminate ? undefined : value}
          aria-label={indeterminate ? "Loading" : `Progress: ${displayValue}`}
          className={cn(progressVariants({ size, variant }), className)}
          {...props}
        >
          <div
            className={cn(
              progressIndicatorVariants({
                variant: indicatorVariant || "default",
                animation: indeterminate ? "indeterminate" : animation,
                gradient: gradient || "none",
              }),
              indicatorClassName
            )}
            style={{
              transform: indeterminate
                ? "translateX(-100%)"
                : `translateX(-${100 - percentage}%)`,
              transition: indeterminate
                ? "transform 1s ease-in-out infinite alternate"
                : "transform 300ms ease-in-out",
            }}
          />
        </div>
      </div>
    )
  }
)
Progress.displayName = "Progress"

// Circular Progress variant
export interface CircularProgressProps {
  value?: number
  max?: number
  size?: number
  strokeWidth?: number
  showPercentage?: boolean
  indeterminate?: boolean
  indicatorVariant?: "default" | "success" | "warning" | "error"
  className?: string
}

const CircularProgress = React.forwardRef<SVGSVGElement, CircularProgressProps & React.SVGProps<SVGSVGElement>>(
  ({
    value = 0,
    max = 100,
    size = 40,
    strokeWidth = 4,
    indeterminate = false,
    showPercentage = false,
    indicatorVariant = "default",
    className,
    ...props
  }, ref) => {
    const percentage = indeterminate ? 25 : Math.min(Math.max((value / max) * 100, 0), 100)
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg
          ref={ref}
          width={size}
          height={size}
          className={cn("transform -rotate-90", className)}
          {...props}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke="var(--hive-background-tertiary)"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke={
              indicatorVariant === "success" ? "var(--hive-status-success)" :
              indicatorVariant === "warning" ? "var(--hive-status-warning)" :
              indicatorVariant === "error" ? "var(--hive-status-error)" :
              "var(--hive-brand-primary)"
            }
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={cn(
              "transition-all duration-300 ease-in-out",
              indeterminate && "animate-spin"
            )}
            style={{
              animationDuration: indeterminate ? "2s" : undefined
            }}
          />
        </svg>
        {showPercentage && !indeterminate && (
          <span className="absolute text-xs font-medium text-[var(--hive-text-primary)]">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    )
  }
)
CircularProgress.displayName = "CircularProgress"

export {
  Progress,
  CircularProgress,
  progressVariants,
  progressIndicatorVariants,
}
