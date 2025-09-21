import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-hover)]",
        primary: "bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-hover)]",
        destructive: "bg-[var(--hive-status-error)] text-white hover:bg-[var(--hive-status-error)]/90",
        outline: "border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-interactive-hover)] hover:text-[var(--hive-text-primary)]",
        secondary: "bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]",
        ghost: "hover:bg-[var(--hive-interactive-hover)] hover:text-[var(--hive-text-primary)]",
        link: "text-[var(--hive-brand-primary)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }