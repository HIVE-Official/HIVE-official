import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

const inputVariants = cva(
  // Base styles following HIVE brand guidelines with gold focus states
  "flex w-full rounded-md bg-background text-foreground font-sans transition-all duration-base ease-smooth file:border-0 file:bg-transparent file:font-medium placeholder:text-muted focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        // DEFAULT: Clean with gold focus
        default: [
          "border border-border",
          "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20",
          "hover:border-accent/40"
        ],
        
        // ACCENT: Gold border treatment
        accent: [
          "border border-accent/30",
          "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:shadow-lg focus-visible:shadow-accent/10"
        ],
        
        // OUTLINE: Enhanced border
        outline: [
          "border-2 border-border",
          "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20"
        ],
        
        // GHOST: Minimal styling
        ghost: [
          "border-transparent bg-transparent",
          "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20 focus-visible:bg-surface-01"
        ],
        
        // SURFACE: Elevated surface
        surface: [
          "border border-border bg-surface-01",
          "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20 focus-visible:bg-surface-02"
        ],
      },
      inputSize: {
        sm: "h-8 px-3 py-1 text-body-sm",
        default: "h-10 px-3 py-2 text-body",
        lg: "h-12 px-4 py-3 text-body",
        xl: "h-14 px-5 py-4 text-h4",
      },
      state: {
        default: "",
        error: "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
        success: "border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500/20",
        warning: "border-amber-500 focus-visible:border-amber-500 focus-visible:ring-amber-500/20",
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
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, state, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, inputSize, state, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
