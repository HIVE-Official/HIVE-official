import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "../../lib/utils"

// REFINED BUTTON: Vercel-inspired precision with HIVE energy
const refinedButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium relative overflow-hidden transition-all duration-200 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 select-none group",
  {
    variants: {
      variant: {
        // TECH PRIMARY: Clean, confident, with subtle gold accent
        primary: [
          "bg-black border border-white/10 text-white",
          "hover:bg-black/90 hover:border-accent/30",
          "focus-visible:ring-1 focus-visible:ring-accent",
          "active:scale-[0.98] active:bg-black/80",
          "shadow-sm hover:shadow-lg hover:shadow-black/50"
        ],
        
        // TECH SECONDARY: Sophisticated border treatment
        secondary: [
          "bg-transparent border border-white/20 text-white",
          "hover:bg-white/5 hover:border-accent/50",
          "focus-visible:ring-1 focus-visible:ring-accent",
          "active:scale-[0.98]"
        ],
        
        // CAMPUS ACCENT: Gold highlight for key actions
        accent: [
          "bg-accent text-black border border-accent",
          "hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20",
          "focus-visible:ring-1 focus-visible:ring-accent/50 focus-visible:ring-offset-1",
          "active:scale-[0.98]",
          "font-semibold"
        ],
        
        // GHOST: Minimal, clean hover states
        ghost: [
          "text-white/80 hover:text-white hover:bg-white/5",
          "focus-visible:ring-1 focus-visible:ring-accent",
          "active:scale-[0.98]"
        ],
        
        // TECH DESTRUCTIVE: Clean but clear
        destructive: [
          "bg-surface/50 border border-border text-muted-foreground",
          "hover:bg-surface hover:border-accent/30",
          "focus-visible:ring-1 focus-visible:ring-accent/50",
          "active:scale-[0.98]"
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
      }
    },
    
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
)

export interface RefinedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof refinedButtonVariants> {
  asChild?: boolean
  loading?: boolean
}

const RefinedButton = React.forwardRef<HTMLButtonElement, RefinedButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(refinedButtonVariants({ variant, size }), className)}
        ref={ref}
        disabled={loading}
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
RefinedButton.displayName = "RefinedButton"

// REFINED CARD: Apple-inspired elevation with tech precision
const refinedCardVariants = cva(
  "relative bg-black border transition-all duration-200 ease-out",
  {
    variants: {
      variant: {
        // TECH DEFAULT: Clean, precise, functional
        default: [
          "border-white/10 rounded-xl",
          "hover:border-white/20 hover:shadow-lg hover:shadow-black/50"
        ],
        
        // ELEVATED: More prominent, key content
        elevated: [
          "border-white/15 rounded-xl shadow-lg shadow-black/20",
          "hover:border-accent/30 hover:shadow-xl hover:shadow-black/30",
          "bg-gradient-to-b from-white/[0.02] to-transparent"
        ],
        
        // CAMPUS FEATURE: Gold accent for important cards
        feature: [
          "border-accent/20 rounded-xl",
          "bg-gradient-to-br from-accent/[0.02] via-transparent to-transparent",
          "hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10"
        ],
        
        // MINIMAL: Ultra-clean for secondary content
        minimal: [
          "border-white/5 rounded-lg",
          "hover:border-white/10 hover:bg-white/[0.02]"
        ],
        
        // INTERACTIVE: Clear interactive affordance
        interactive: [
          "border-white/10 rounded-xl cursor-pointer",
          "hover:border-accent/30 hover:bg-white/[0.02] hover:scale-[1.02]",
          "active:scale-[0.98] transition-transform"
        ]
      },
      
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8"
      }
    },
    
    defaultVariants: {
      variant: "default",
      padding: "md"
    }
  }
)

export interface RefinedCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof refinedCardVariants> {}

const RefinedCard = React.forwardRef<HTMLDivElement, RefinedCardProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(refinedCardVariants({ variant, padding }), className)}
        {...props}
      />
    )
  }
)
RefinedCard.displayName = "RefinedCard"

// REFINED TYPOGRAPHY: Technical precision with personality
const refinedTypographyVariants = cva(
  "transition-all duration-200 ease-out",
  {
    variants: {
      variant: {
        // TECH HERO: Bold but controlled
        hero: [
          "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
          "bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent",
          "leading-tight"
        ],
        
        // CAMPUS TITLE: Energy with sophistication
        title: [
          "text-2xl md:text-3xl font-semibold tracking-tight",
          "text-white",
          "hover:text-accent transition-colors duration-300"
        ],
        
        // TECH SUBTITLE: Clean hierarchy
        subtitle: [
          "text-lg md:text-xl font-medium",
          "text-white/70"
        ],
        
        // BODY: Readable, clean
        body: [
          "text-base leading-relaxed",
          "text-white/80"
        ],
        
        // CAPTION: Supporting text
        caption: [
          "text-sm",
          "text-white/60"
        ],
        
        // ACCENT: Gold highlights for key info
        accent: [
          "text-accent font-medium",
          "hover:text-accent/80 transition-colors"
        ],
        
        // CODE: Technical text
        code: [
          "font-mono text-sm",
          "text-accent/90 bg-accent/5 px-1.5 py-0.5 rounded"
        ]
      },
      
      align: {
        left: "text-left",
        center: "text-center", 
        right: "text-right"
      }
    },
    
    defaultVariants: {
      variant: "body",
      align: "left"
    }
  }
)

export interface RefinedTypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof refinedTypographyVariants> {
  as?: React.ElementType
  children: React.ReactNode
}

const RefinedTypography = React.forwardRef<HTMLElement, RefinedTypographyProps>(
  ({ className, variant, align, as: Component = "p", children, ...props }, ref) => {
    return React.createElement(
      Component,
      {
        className: cn(refinedTypographyVariants({ variant, align }), className),
        ref,
        ...props
      },
      children
    )
  }
)
RefinedTypography.displayName = "RefinedTypography"

// REFINED INPUT: Clean, functional, accessible
const refinedInputVariants = cva(
  "flex w-full rounded-lg border bg-transparent transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: [
          "border-white/20 text-white px-3 py-2",
          "focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent/20",
          "hover:border-white/30"
        ],
        
        filled: [
          "border-white/10 bg-white/5 text-white px-3 py-2",
          "focus-visible:border-accent focus-visible:bg-white/10",
          "hover:bg-white/10"
        ]
      },
      
      size: {
        sm: "h-8 px-2 text-sm",
        md: "h-9 px-3 text-sm",
        lg: "h-10 px-4 text-base"
      }
    },
    
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

export interface RefinedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof refinedInputVariants> {}

const RefinedInput = React.forwardRef<HTMLInputElement, RefinedInputProps>(
  ({ className, variant, size, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(refinedInputVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
RefinedInput.displayName = "RefinedInput"

// REFINED BADGE: Clean status indicators
const refinedBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-white/10 text-white/80 hover:bg-white/20",
        accent: "bg-accent/20 text-accent border border-accent/30",
        success: "bg-surface/50 text-foreground border border-border",
        warning: "bg-surface/50 text-foreground border border-border",
        destructive: "bg-surface/50 text-muted-foreground border border-border",
        outline: "border border-white/20 text-white/80 hover:bg-white/5"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export interface RefinedBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof refinedBadgeVariants> {}

function RefinedBadge({ className, variant, ...props }: RefinedBadgeProps) {
  return (
    <div className={cn(refinedBadgeVariants({ variant }), className)} {...props} />
  )
}

export {
  RefinedButton,
  RefinedCard, 
  RefinedTypography,
  RefinedInput,
  RefinedBadge,
  refinedButtonVariants,
  refinedCardVariants,
  refinedTypographyVariants,
  refinedInputVariants,
  refinedBadgeVariants
}