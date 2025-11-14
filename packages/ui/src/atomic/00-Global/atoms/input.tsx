import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../../lib/utils"

const inputVariants = cva(
  "flex w-full rounded-[32px] border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] px-5 py-2.5 text-sm text-[var(--hive-text-primary)] transition-[border,background,box-shadow] duration-200 ease-out placeholder:text-[var(--hive-text-muted)] focus-visible:outline-none focus-visible:border-[var(--hive-border-focus)] focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-0 focus-visible:shadow-[0_0_28px_rgba(255,255,255,0.15)] disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        default: "hover:border-[var(--hive-border-primary)]",
        subtle: "border-[var(--hive-border-subtle)] bg-[var(--hive-background-primary)]",
        destructive:
          "border-[var(--hive-status-error)] bg-[var(--hive-background-secondary)] focus-visible:ring-[color-mix(in_srgb,var(--hive-status-error) 90%,transparent)] focus-visible:shadow-[0_0_0_1px_var(--hive-status-error),0_0_32px_rgba(239,68,68,0.28)]",
        error:
          "border-[var(--hive-status-error)] bg-[var(--hive-background-secondary)] focus-visible:ring-[color-mix(in_srgb,var(--hive-status-error) 90%,transparent)] focus-visible:shadow-[0_0_0_1px_var(--hive-status-error),0_0_32px_rgba(239,68,68,0.28)]",
        success:
          "border-[var(--hive-status-success)] focus-visible:ring-[color-mix(in_srgb,var(--hive-status-success) 80%,transparent)] focus-visible:shadow-[0_0_0_1px_var(--hive-status-success),0_0_32px_rgba(16,185,129,0.24)]",
        brand:
          "border-[var(--hive-brand-primary)] focus-visible:ring-[color-mix(in_srgb,var(--hive-brand-primary) 85%,transparent)]",
        ghost:
          "border-transparent bg-transparent focus-visible:border-[var(--hive-border-default)] focus-visible:ring-[var(--hive-interactive-focus)]",
        warning:
          "border-[var(--hive-status-warning)] focus-visible:ring-[color-mix(in_srgb,var(--hive-status-warning) 85%,transparent)]",
      },
      size: {
        sm: "h-9 text-sm px-3",
        default: "h-11 text-sm",
        lg: "h-12 text-base px-5",
        xl: "h-12 text-base px-6",
      },
      width: {
        full: "w-full",
        auto: "w-auto",
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

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "width">,
    VariantProps<typeof inputVariants> {
  label?: React.ReactNode
  helperText?: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onClear?: () => void
  showClearButton?: boolean
  wrapperClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      width,
      type,
      disabled,
      label,
      helperText,
      description,
      error,
      leftIcon,
      rightIcon,
      onClear,
      showClearButton,
      value,
      id,
      wrapperClassName,
      ...props
    },
    ref
  ) => {
    const computedVariant = error ? "destructive" : variant
    const inputId = id ?? React.useId()
    const shouldWrap = Boolean(
      label ||
        helperText ||
        description ||
        error ||
        leftIcon ||
        rightIcon ||
        showClearButton
    )
    const hasValue =
      value !== undefined && `${value}`.length > 0

    const inputClassName = cn(
      inputVariants({ variant: computedVariant, size, width }),
      leftIcon && "pl-11",
      (rightIcon || (showClearButton && hasValue)) && "pr-11",
      disabled
        ? "bg-[var(--hive-background-tertiary)] text-[var(--hive-text-muted)]"
        : "",
      className
    )

    const controlledProps =
      value !== undefined ? { value } : {}

    const inputNode = (
      <input
        id={inputId}
        type={type}
        className={inputClassName}
        disabled={disabled}
        aria-invalid={
          Boolean(error) ||
          computedVariant === "destructive" ||
          computedVariant === "error" ||
          undefined
        }
        aria-disabled={disabled || undefined}
        aria-describedby={
          helperText || error ? `${inputId}-description` : undefined
        }
        ref={ref}
        {...props}
        {...controlledProps}
      />
    )

    const inputWithDecorations = leftIcon || rightIcon || (showClearButton && hasValue && !disabled)
      ? (
        <div className="relative">
          {leftIcon ? (
            <span
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--hive-text-secondary)]"
              aria-hidden
            >
              {leftIcon}
            </span>
          ) : null}
          {inputNode}
          {(rightIcon || (showClearButton && hasValue && !disabled)) ? (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[var(--hive-text-secondary)]">
              {showClearButton && hasValue && !disabled && onClear ? (
                <button
                  type="button"
                  onClick={onClear}
                  className="rounded-full p-1 transition-colors hover:text-[var(--hive-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-primary)]"
                  aria-label="Clear input"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              ) : null}
              {rightIcon ? <span aria-hidden>{rightIcon}</span> : null}
            </span>
          ) : null}
        </div>
      )
      : inputNode

    if (!shouldWrap) {
      return inputWithDecorations
    }

    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        {label ? (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium text-[var(--hive-text-primary)]",
              disabled && "opacity-70"
            )}
          >
            {label}
          </label>
        ) : null}

        {description ? (
          <p className="text-xs text-[var(--hive-text-secondary)]">
            {description}
          </p>
        ) : null}

        {inputWithDecorations}

        {helperText || error ? (
          <p
            id={`${inputId}-description`}
            className={cn(
              "text-xs",
              error
                ? "text-[var(--hive-status-error)]"
                : "text-[var(--hive-text-secondary)]"
            )}
          >
            {error || helperText}
          </p>
        ) : null}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
