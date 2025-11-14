import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../../lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-[var(--hive-text-primary)]",
        secondary: "text-[var(--hive-text-secondary)]",
        destructive: "text-[var(--hive-status-error)]",
        success: "text-[var(--hive-status-success)]",
        warning: "text-[var(--hive-status-warning)]",
      },
      size: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant, size, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(labelVariants({ variant, size }), className)}
      {...props}
    />
  )
)
Label.displayName = "Label"

export { Label, labelVariants }