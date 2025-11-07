import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "../../lib/utils"

export interface CheckIconProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of the check icon container */
  size?: "sm" | "md" | "lg" | "xl"
  /** Variant style for the check icon */
  variant?: "default" | "success" | "minimal"
  /** Whether to show the icon (for animation purposes) */
  checked?: boolean
  /** Custom icon to use instead of Check */
  icon?: React.ReactNode
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-10 h-10"
}

const iconSizeClasses = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
  xl: "w-6 h-6"
}

const variantClasses = {
  default: "bg-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)] text-black",
  success: "bg-[var(--hive-status-success)] border-[var(--hive-status-success)] text-white",
  minimal: "bg-transparent border-[var(--hive-border-primary)] text-[var(--hive-text-primary)]"
}

/**
 * CheckIcon Component
 *
 * A reusable check icon with gold background and black icon by default,
 * ensuring proper contrast for accessibility.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <CheckIcon checked={true} />
 *
 * // Different sizes
 * <CheckIcon size="lg" checked={isCompleted} />
 *
 * // Custom styling
 * <CheckIcon variant="success" checked={true} />
 * ```
 */
export const CheckIcon = React.forwardRef<HTMLDivElement, CheckIconProps>(
  ({
    className,
    size = "md",
    variant = "default",
    checked = false,
    icon,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border-2 flex items-center justify-center transition-all duration-200",
          sizeClasses[size],
          checked
            ? variantClasses[variant]
            : "border-[var(--hive-border-primary)] bg-transparent",
          className
        )}
        {...props}
      >
        {checked && (
          <div className="animate-in zoom-in-50 duration-200">
            {icon || <Check className={iconSizeClasses[size]} />}
          </div>
        )}
      </div>
    )
  }
)

CheckIcon.displayName = "CheckIcon"

export { CheckIcon as default }