import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const hiveButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--hive-brand-primary)] text-[var(--hive-brand-primary-text)] hover:bg-[var(--hive-brand-primary)]/90",
        destructive:
          "bg-[var(--hive-status-error)] text-[var(--hive-status-error-text)] hover:bg-[var(--hive-status-error)]/90",
        outline:
          "border border-[var(--hive-border-strong)] bg-transparent text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-secondary)] hover:text-[var(--hive-text-primary)]",
        secondary:
          "bg-[var(--hive-background-tertiary)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)]/80",
        ghost:
          "text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-secondary)] hover:text-[var(--hive-text-primary)]",
        link:
          "text-[var(--hive-brand-primary)] underline-offset-4 hover:underline",
        brand:
          "bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] text-[var(--hive-brand-primary-text)] hover:from-[var(--hive-brand-primary)]/90 hover:to-[var(--hive-brand-secondary)]/90 shadow-lg hover:shadow-xl transition-shadow",
        success:
          "bg-[var(--hive-status-success)] text-[var(--hive-status-success-text)] hover:bg-[var(--hive-status-success)]/90",
        warning:
          "bg-[var(--hive-status-warning)] text-[var(--hive-status-warning-text)] hover:bg-[var(--hive-status-warning)]/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface HiveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof hiveButtonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const HiveButton = React.forwardRef<HTMLButtonElement, HiveButtonProps>(
  ({
    className,
    variant,
    size,
    asChild = false,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading

    return (
      <button
        className={cn(hiveButtonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    )
  }
)
HiveButton.displayName = "HiveButton"

export { HiveButton, hiveButtonVariants }