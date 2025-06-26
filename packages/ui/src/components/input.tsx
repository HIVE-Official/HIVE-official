import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

const inputVariants = cva(
  "flex w-full rounded-lg border bg-background font-sans text-body text-foreground ring-offset-background file:border-0 file:bg-transparent file:font-sans file:text-body-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-fast ease-smooth",
  {
    variants: {
      variant: {
        default: "border-border hover:border-accent/50 focus-visible:border-accent/50",
        filled: "border-border bg-surface-01 hover:border-accent/50 focus-visible:bg-background focus-visible:border-accent/50",
        outline: "border-2 border-border hover:border-accent focus-visible:border-accent",
        ghost: "border-transparent bg-surface-01/50 hover:bg-surface-01 focus-visible:bg-background focus-visible:border-border",
      },
      inputSize: {
        sm: "h-8 px-3 py-1 text-body-sm",
        default: "h-10 px-3 py-2 text-body",
        lg: "h-12 px-4 py-3 text-body",
      },
      state: {
        default: "",
        // Note: HIVE uses motion feedback instead of color states
        // Validation feedback should be communicated through accompanying text and motion
        focus: "ring-2 ring-accent ring-offset-2",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default", 
      state: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  // Helper prop for validation state communication (use with external feedback text)
  hasError?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, state, type, hasError, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariants({ variant, inputSize, state, className }),
          // Subtle indication for validation state via border opacity
          hasError && "border-opacity-60 focus-visible:ring-accent/60"
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
