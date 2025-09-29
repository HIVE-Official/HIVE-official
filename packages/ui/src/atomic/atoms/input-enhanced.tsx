'use client';

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const inputEnhancedVariants = cva(
  "flex w-full rounded-md border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--hive-text-placeholder)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-[var(--hive-border-default)]",
        destructive: "border-[var(--hive-status-error)] focus-visible:ring-[var(--hive-status-error)]",
        success: "border-[var(--hive-status-success)] focus-visible:ring-[var(--hive-status-success)]",
        warning: "border-[var(--hive-status-warning)] focus-visible:ring-[var(--hive-status-warning)]",
      },
      size: {
        default: "h-10 px-3 py-2 text-sm",
        sm: "h-8 px-2 py-1 text-xs",
        lg: "h-12 px-4 py-3 text-base",
      },
      width: {
        auto: "w-auto",
        full: "w-full",
        fit: "w-fit",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      width: "full",
    },
  }
)

export interface InputEnhancedProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "width">,
    VariantProps<typeof inputEnhancedVariants> {
  label?: string
  description?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onClear?: () => void
  showClearButton?: boolean
}

const InputEnhanced = React.forwardRef<HTMLInputElement, InputEnhancedProps>(
  ({
    className,
    variant,
    size,
    width,
    type,
    label,
    description,
    error,
    helperText,
    leftIcon,
    rightIcon,
    onClear,
    showClearButton,
    value,
    disabled,
    id,
    ...props
  }, ref) => {
    const inputId = id || React.useId()
    const hasValue = Boolean(value && String(value).length > 0)

    return (
      <div className="flex flex-col space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium leading-none text-[var(--hive-text-primary)]",
              disabled && "opacity-70"
            )}
          >
            {label}
          </label>
        )}

        {description && (
          <p className="text-xs text-[var(--hive-text-secondary)]">
            {description}
          </p>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--hive-text-secondary)]">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            value={value}
            disabled={disabled}
            className={cn(
              inputEnhancedVariants({ variant, size, width }),
              leftIcon && "pl-10",
              (rightIcon || (showClearButton && hasValue)) && "pr-10",
              className
            )}
            {...props}
          />

          {(rightIcon || (showClearButton && hasValue && !disabled)) && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              {showClearButton && hasValue && !disabled && onClear && (
                <button
                  type="button"
                  onClick={onClear}
                  className="text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] focus:outline-none"
                  aria-label="Clear input"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
              {rightIcon && (
                <span className="text-[var(--hive-text-secondary)]">
                  {rightIcon}
                </span>
              )}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <p
            className={cn(
              "text-xs",
              error
                ? "text-[var(--hive-status-error)]"
                : "text-[var(--hive-text-secondary)]"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

InputEnhanced.displayName = "InputEnhanced"

export { InputEnhanced, inputEnhancedVariants }