import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "../lib/utils"
import { hivePresets, createHiveScale, createGoldAccent } from "../lib/motion"
import { useAdaptiveMotion } from "../lib/adaptive-motion"

const buttonVariants = cva(
  // Base styles following HIVE brand guidelines - GOLD LINES FIRST
  "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all duration-base ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        // PRIMARY: Gold border/line - the new HIVE standard (Vercel-inspired)
        default: [
          "border-2 border-accent bg-transparent text-accent",
          "hover:bg-accent/10 hover:border-accent/80 hover:text-accent hover:shadow-lg hover:shadow-accent/20",
          "focus-visible:bg-accent/10 focus-visible:border-accent",
          "active:scale-[0.98] active:bg-accent/15",
          "disabled:border-accent/30 disabled:text-accent/30"
        ],
        
        // OUTLINE: Subtle border variant
        outline: [
          "border border-border bg-transparent text-foreground",
          "hover:border-accent/50 hover:text-accent hover:bg-accent/5",
          "focus-visible:border-accent focus-visible:text-accent",
          "active:scale-[0.98]",
          "disabled:border-border/50 disabled:text-muted"
        ],
        
        // GHOST: Minimal, hover reveals gold
        ghost: [
          "bg-transparent text-foreground border-transparent",
          "hover:bg-accent/10 hover:text-accent",
          "focus-visible:bg-accent/10 focus-visible:text-accent",
          "active:scale-[0.98]",
          "disabled:text-muted"
        ],
        
        // ACCENT: Full gold treatment for special moments
        accent: [
          "border-2 border-accent bg-accent/10 text-accent font-semibold",
          "hover:bg-accent/20 hover:shadow-lg hover:shadow-accent/25 hover:scale-[1.02]",
          "focus-visible:ring-accent/50",
          "active:scale-[0.98] active:bg-accent/25",
          "disabled:bg-accent/5 disabled:border-accent/30 disabled:text-accent/30"
        ],
        
        // RITUAL: ONLY gold fill allowed (special HIVE moments)
        ritual: [
          "bg-accent text-background border-2 border-accent font-semibold",
          "hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.02]",
          "focus-visible:ring-background focus-visible:ring-offset-accent",
          "active:scale-[0.98] active:shadow-lg",
          "disabled:bg-accent/50 disabled:text-background/70"
        ],
        
        // SURFACE: Subtle surface interaction
        surface: [
          "bg-surface-01 text-foreground border border-border",
          "hover:bg-surface-02 hover:border-accent/30 hover:text-accent",
          "focus-visible:border-accent focus-visible:text-accent",
          "active:scale-[0.98]",
          "disabled:bg-surface-01/50 disabled:text-muted"
        ],
        
        // LINK: Text-only with gold accent
        link: [
          "text-foreground underline-offset-4 border-none bg-transparent p-0 h-auto",
          "hover:underline hover:text-accent",
          "focus-visible:ring-1 focus-visible:ring-accent",
          "disabled:text-muted disabled:no-underline"
        ],
        
        // NAVIGATION: Subtle for nav items
        nav: [
          "bg-transparent text-muted border-transparent",
          "hover:text-accent hover:bg-accent/5",
          "focus-visible:text-accent focus-visible:bg-accent/5",
          "active:scale-[0.98]",
          "disabled:text-muted/50"
        ],
        
        // DESTRUCTIVE: Red variant when needed
        destructive: [
          "border-2 border-red-500 bg-transparent text-red-500",
          "hover:bg-red-500/10 hover:border-red-400",
          "focus-visible:ring-red-500/50",
          "active:scale-[0.98]",
          "disabled:border-red-500/30 disabled:text-red-500/30"
        ],
      },
      size: {
        xs: "h-7 px-2.5 text-caption rounded-md font-medium",
        sm: "h-8 px-3 text-body-sm rounded-md font-medium", 
        default: "h-10 px-4 text-body rounded-lg font-medium",
        lg: "h-12 px-6 text-body rounded-lg font-medium",
        xl: "h-14 px-8 text-h4 rounded-xl font-semibold",
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
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
)

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  enableMotion?: boolean
  ritualAnimation?: boolean
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
    enableMotion = true,
    ritualAnimation = false,
    ...props 
  }, ref) => {
    const { variants } = useAdaptiveMotion('navigation');
    const Comp = asChild ? Slot : "button"
    
    // Choose animation preset based on variant
    const getMotionProps = () => {
      if (!enableMotion) return {};
      
      if (variant === 'ritual') {
        return {
          variants: variants.ritual,
          initial: "rest",
          whileHover: ritualAnimation ? "active" : "rest",
          whileTap: { scale: 0.97 },
          ...createGoldAccent('fast'),
        };
      }
      
      if (variant === 'accent' || variant === 'default') {
        return {
          ...hivePresets.button,
          ...createGoldAccent('fast'),
        };
      }
      
      return {
        ...createHiveScale(variant === 'ghost' ? 'micro' : 'small'),
        whileTap: { scale: 0.97 },
      };
    };
    
    const MotionComp = motion(Comp);
    
    return (
      <MotionComp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...getMotionProps()}
        {...props}
      >
        <span className="inline-flex items-center justify-center">
          {loading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {children}
        </span>
      </MotionComp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants } 