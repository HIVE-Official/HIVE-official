import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "../lib/utils"

const buttonVariants = cva(
  // Base: Clean, tech social platform with minimal gold usage
  "inline-flex items-center justify-center whitespace-nowrap font-medium relative overflow-hidden transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 select-none group",
  {
    variants: {
      variant: {
        // PRIMARY: Clean black with gold outline on hover/click (main CTAs)
        primary: [
          "bg-background border border-border text-[var(--hive-text-inverse)]",
          "hover:bg-background/90 hover:border-accent",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
          "active:scale-[0.98] active:bg-background/80 active:border-accent",
          "shadow-sm hover:shadow-lg hover:shadow-background/50"
        ],
        
        // SECONDARY: Sophisticated border treatment with gold outline (secondary actions)
        secondary: [
          "bg-transparent border border-border text-[var(--hive-text-inverse)]",
          "hover:bg-surface hover:border-accent",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
          "active:scale-[0.98] active:border-accent"
        ],
        
        // ACCENT: Minimal gold fill (key moments only)
        accent: [
          "bg-accent text-background border border-accent",
          "hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
          "active:scale-[0.98]",
          "font-semibold"
        ],
        
        // GHOST: Invisible until hover with gold outline (navigation, tertiary)
        ghost: [
          "text-muted hover:text-[var(--hive-text-inverse)] hover:bg-surface",
          "hover:border hover:border-accent",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
          "active:scale-[0.98] active:border-accent"
        ],
        
        // DESTRUCTIVE: Monochrome approach with gold outline (no red violations)
        destructive: [
          "bg-surface/50 border border-border text-muted",
          "hover:bg-surface hover:border-accent hover:text-[var(--hive-text-inverse)]",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
          "active:scale-[0.98] active:border-accent"
        ],
        
        // OUTLINE: Border-only variant with gold outline (legacy support)
        outline: [
          "bg-transparent border border-border text-[var(--hive-text-inverse)]",
          "hover:bg-surface hover:border-accent",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
          "active:scale-[0.98] active:border-accent"
        ],
        
        // DEFAULT: Same as primary (legacy support)
        default: [
          "bg-background border border-border text-[var(--hive-text-inverse)]",
          "hover:bg-background/90 hover:border-accent",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
          "active:scale-[0.98] active:bg-background/80 active:border-accent",
          "shadow-sm hover:shadow-lg hover:shadow-background/50"
        ],
        
        // RITUAL: Full gold fill for special HIVE moments (legacy support)
        ritual: [
          "bg-accent text-background border border-accent",
          "hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.02]",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
          "active:scale-[0.98]",
          "font-semibold"
        ],
        
        // SURFACE: Surface-level variant (legacy support)
        surface: [
          "bg-surface border border-border text-[var(--hive-text-inverse)]",
          "hover:bg-surface/90 hover:border-accent",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
          "active:scale-[0.98] active:border-accent"
        ]
      },
      
      size: {
        sm: "h-8 px-3 text-sm rounded-md",
        md: "h-9 px-4 text-sm rounded-lg",
        lg: "h-10 px-6 text-base rounded-lg",
        xl: "h-12 px-8 text-lg rounded-xl",
        icon: "h-9 w-9 rounded-lg",
        "icon-sm": "h-8 w-8 rounded-md",
        "icon-lg": "h-10 w-10 rounded-lg"
      },
      
      fullWidth: {
        true: "w-full",
        false: ""
      }
    },
    
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false
    }
  }
)

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth, 
    asChild = false, 
    loading, 
    children, 
    disabled, 
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="opacity-80">Loading...</span>
          </div>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants } 