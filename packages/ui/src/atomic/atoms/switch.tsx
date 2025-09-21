import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const switchVariants = cva(
  "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "data-[state=checked]:bg-[var(--hive-brand-primary)] data-[state=unchecked]:bg-[var(--hive-background-tertiary)]",
        destructive:
          "data-[state=checked]:bg-[var(--hive-status-error)] data-[state=unchecked]:bg-[var(--hive-background-tertiary)]",
        success:
          "data-[state=checked]:bg-[var(--hive-status-success)] data-[state=unchecked]:bg-[var(--hive-background-tertiary)]",
        warning:
          "data-[state=checked]:bg-[var(--hive-status-warning)] data-[state=unchecked]:bg-[var(--hive-background-tertiary)]",
      },
      size: {
        default: "h-6 w-11",
        sm: "h-5 w-9",
        lg: "h-7 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
  {
    variants: {
      size: {
        default: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        sm: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        lg: "h-6 w-6 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof switchVariants> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: string
  description?: string
  error?: string
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({
    className,
    variant,
    size,
    checked,
    onCheckedChange,
    label,
    description,
    error,
    disabled,
    ...props
  }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState(false)
    const switchId = React.useId()

    const isControlled = checked !== undefined
    const isChecked = isControlled ? checked : internalChecked

    const handleClick = React.useCallback(() => {
      if (disabled) return

      const newChecked = !isChecked
      if (!isControlled) {
        setInternalChecked(newChecked)
      }
      onCheckedChange?.(newChecked)
    }, [disabled, isChecked, isControlled, onCheckedChange])

    const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault()
        handleClick()
      }
    }, [handleClick])

    return (
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-3">
          <button
            ref={ref}
            id={switchId}
            role="switch"
            type="button"
            aria-checked={isChecked}
            aria-describedby={description ? `${switchId}-description` : undefined}
            data-state={isChecked ? "checked" : "unchecked"}
            disabled={disabled}
            className={cn(switchVariants({ variant, size }), className)}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            {...props}
          >
            <span
              data-state={isChecked ? "checked" : "unchecked"}
              className={cn(
                switchThumbVariants({ size }),
                "bg-[var(--hive-background-primary)]"
              )}
            />
          </button>

          {label && (
            <label
              htmlFor={switchId}
              className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                "text-[var(--hive-text-primary)] cursor-pointer",
                disabled && "cursor-not-allowed opacity-70"
              )}
              onClick={!disabled ? handleClick : undefined}
            >
              {label}
            </label>
          )}
        </div>

        {(description || error) && (
          <p
            id={`${switchId}-description`}
            className={cn(
              "text-xs",
              error
                ? "text-[var(--hive-status-error)]"
                : "text-[var(--hive-text-secondary)]"
            )}
          >
            {error || description}
          </p>
        )}
      </div>
    )
  }
)
Switch.displayName = "Switch"

export { Switch, switchVariants, switchThumbVariants }