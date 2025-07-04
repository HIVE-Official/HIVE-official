import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "../lib/utils"
import { hivePresets, hiveVariants } from "../lib/motion"
import { useAdaptiveMotion } from "../lib/adaptive-motion"

const cardVariants = cva(
  // Base styles following HIVE brand guidelines with gold accents
  "bg-surface text-foreground transition-all duration-base ease-smooth",
  {
    variants: {
      variant: {
        // DEFAULT: Subtle surface with gold hover accent
        default: [
          "border border-border rounded-xl", // 12px radius per brand guidelines
          "shadow-sm hover:shadow-md",
          "hover:border-accent/30 hover:bg-surface-02/50 hover:shadow-accent/5"
        ],
        
        // ACCENT: Gold border for featured content
        accent: [
          "border border-accent/30 rounded-xl",
          "bg-surface shadow-md shadow-accent/5",
          "hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 hover:bg-surface-02"
        ],
        
        // ELEVATED: Enhanced elevation with gold glow
        elevated: [
          "border border-border rounded-xl",
          "shadow-md hover:shadow-lg hover:shadow-accent/10",
          "hover:border-accent/20 hover:bg-surface-02 hover:-translate-y-0.5"
        ],
        
        // OUTLINE: Transparent with border
        outline: [
          "border-2 border-border bg-transparent rounded-xl",
          "hover:bg-surface-01/50 hover:border-accent/40"
        ],
        
        // GHOST: Minimal styling
        ghost: [
          "border-transparent bg-transparent rounded-xl",
          "hover:bg-surface-01/50 hover:border-accent/20"
        ],
        
        // GLASS: Glassmorphism effect with gold accents
        glass: [
          "border border-white/10 rounded-xl",
          "bg-surface/75 backdrop-blur-[12px] backdrop-saturate-180",
          "shadow-lg hover:bg-surface/80 hover:border-accent/20"
        ],
        
        // INTERACTIVE: For clickable cards
        interactive: [
          "border border-border rounded-xl cursor-pointer",
          "shadow-sm hover:shadow-lg hover:border-accent/30",
          "hover:-translate-y-1 hover:bg-surface-02/50 hover:shadow-accent/10",
          "active:scale-[0.99] active:translate-y-0"
        ],
        
        // FEATURED: Special cards with gold treatment
        featured: [
          "border-2 border-accent/40 rounded-xl",
          "bg-surface shadow-lg shadow-accent/10",
          "hover:border-accent/60 hover:shadow-xl hover:shadow-accent/15 hover:-translate-y-0.5",
          "ring-1 ring-accent/10"
        ],
        
        // SURFACE-01/02/03: Different elevation levels
        "surface-01": [
          "border border-border rounded-xl bg-surface-01",
          "shadow-sm hover:shadow-md hover:border-accent/20"
        ],
        "surface-02": [
          "border border-border rounded-xl bg-surface-02",
          "shadow-md hover:shadow-lg hover:border-accent/30"
        ],
        "surface-03": [
          "border border-border rounded-xl bg-surface-03",
          "shadow-lg hover:shadow-xl hover:border-accent/40"
        ],
      },
      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-12",
      },
      spacing: {
        none: "p-0",
        compact: "p-3",
        comfortable: "p-6",
        spacious: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  enableMotion?: boolean
  motionPreset?: 'entrance' | 'hover' | 'featured'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant, 
    size, 
    spacing, 
    enableMotion = true,
    motionPreset = 'hover',
    ...props 
  }, ref) => {
    const { variants } = useAdaptiveMotion('social');
    
    const getMotionProps = () => {
      if (!enableMotion) return {};
      
      switch (motionPreset) {
        case 'entrance':
          return {
            variants: hiveVariants.slideUp,
            initial: "hidden",
            animate: "visible",
          };
        case 'featured':
          return {
            ...hivePresets.cardHover,
            variants: variants.hover,
            initial: "rest",
            whileHover: "hover",
          };
        case 'hover':
        default:
          return variant === 'interactive' || variant === 'featured'
            ? hivePresets.cardHover
            : {
                whileHover: { 
                  scale: 1.01, 
                  y: -2,
                  transition: { duration: 0.18, ease: [0.33, 0.65, 0, 1] as any }
                }
              };
      }
    };
    
    // Exclude HTML event handlers that conflict with Framer Motion
    const { 
      onDrag, onDragStart, onDragEnd, onDragOver, onDragEnter, onDragLeave, onDrop,
      onAnimationStart, onAnimationEnd, onAnimationIteration,
      onTransitionStart, onTransitionEnd, onTransitionRun, onTransitionCancel,
      ...motionProps 
    } = props
    
    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ variant, size, spacing, className }))}
        {...getMotionProps()}
        {...motionProps}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-h3 font-display font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-body font-sans text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Status cards for different states
const CardStatus = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    status: "loading" | "error" | "empty" | "success"
    icon?: React.ReactNode
    title: string
    description?: string
    action?: React.ReactNode
  }
>(({ className, status, icon, title, description, action, ...props }, ref) => {
  const getStatusStyles = () => {
    switch (status) {
      case "loading":
        return "border-border animate-pulse"
      case "error":
        return "border-border" // No red - following brand guidelines
      case "empty":
        return "border-dashed border-border"
      case "success":
        return "border-accent/20 bg-surface" // Using gold accent for success
      default:
        return "border-border"
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl p-8 text-center",
        getStatusStyles(),
        className
      )}
      {...props}
    >
      {icon && <div className="mb-4 flex justify-center text-muted">{icon}</div>}
      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
        {title}
      </h3>
      {description && (
        <p className="font-sans text-sm text-muted leading-relaxed mb-4">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  )
})
CardStatus.displayName = "CardStatus"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardStatus, cardVariants } 