import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "../lib/utils"

const buttonVariants = cva(
  // Base styles following HIVE brand guidelines
  "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        // BRAND COMPLIANT: Outline is the default (transparent with border)
        outline: [
          "border border-border bg-transparent text-foreground",
          "hover:bg-surface-03 hover:border-[#4A4A4A] hover:text-foreground",
          "focus-visible:border-accent focus-visible:text-accent",
          "active:scale-[0.98]",
          "disabled:border-disabled disabled:text-disabled"
        ],
        
        // BRAND COMPLIANT: White fill for primary actions (use sparingly)
        "primary-white": [
          "bg-foreground text-background border border-foreground",
          "hover:bg-foreground/90 hover:shadow-sm",
          "focus-visible:ring-accent",
          "active:scale-[0.98]",
          "disabled:bg-disabled disabled:text-muted disabled:border-disabled"
        ],
        
        // BRAND COMPLIANT: Black fill for secondary emphasis
        "primary-black": [
          "bg-background text-foreground border border-border",
          "hover:bg-surface-03 hover:border-[#4A4A4A]",
          "focus-visible:border-accent focus-visible:text-accent",
          "active:scale-[0.98]",
          "disabled:bg-disabled disabled:text-disabled disabled:border-disabled"
        ],
        
        // BRAND COMPLIANT: ONLY allowed gold fill - for ritual moments
        ritual: [
          "bg-accent text-background border border-accent font-semibold",
          "hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20",
          "focus-visible:ring-background focus-visible:ring-offset-accent",
          "active:scale-[0.98] active:shadow-md",
          "disabled:bg-disabled disabled:text-muted disabled:border-disabled"
        ],
        
        // Ghost variant - no border, subtle hover
        ghost: [
          "bg-transparent text-foreground border-transparent",
          "hover:bg-surface-03 hover:text-foreground",
          "focus-visible:bg-surface-03 focus-visible:text-accent",
          "active:scale-[0.98]",
          "disabled:text-disabled"
        ],
        
        // Secondary with surface background
        secondary: [
          "bg-surface text-foreground border border-transparent",
          "hover:bg-surface-02 hover:border-border",
          "focus-visible:border-accent focus-visible:text-accent",
          "active:scale-[0.98]",
          "disabled:bg-disabled disabled:text-disabled"
        ],
        
        // Link style
        link: [
          "text-foreground underline-offset-4 border-none bg-transparent p-0 h-auto",
          "hover:underline hover:text-accent",
          "focus-visible:ring-1 focus-visible:ring-accent",
          "disabled:text-disabled disabled:no-underline"
        ],
        
        // Navigation style
        nav: [
          "bg-transparent text-muted border-transparent",
          "hover:text-foreground hover:bg-surface-03",
          "focus-visible:text-accent focus-visible:bg-surface-03",
          "active:scale-[0.98]",
          "disabled:text-disabled"
        ],
      },
      size: {
        xs: "h-7 px-2.5 text-xs rounded-md font-medium",
        sm: "h-8 px-3 text-sm rounded-md font-medium", 
        default: "h-10 px-4 text-sm rounded-lg font-medium",
        lg: "h-12 px-6 text-base rounded-lg font-medium",
        xl: "h-14 px-8 text-lg rounded-xl font-semibold",
        icon: "h-10 w-10 rounded-lg",
        "icon-sm": "h-8 w-8 rounded-md",
        "icon-lg": "h-12 w-12 rounded-xl",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants } 