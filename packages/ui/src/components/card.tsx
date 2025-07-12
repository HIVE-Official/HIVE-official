import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

const cardVariants = cva(
  // Base: Clean, tech social platform cards with minimal gold usage
  "bg-background text-white transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]",
  {
    variants: {
      variant: {
        // DEFAULT: Clean card with subtle border
        default: [
          "border border-border rounded-xl",
          "hover:border-accent/50 hover:shadow-lg hover:shadow-background/50"
        ],
        
        // ELEVATED: More prominent with gold border on hover
        elevated: [
          "border border-border rounded-xl shadow-lg shadow-background/20",
          "hover:border-accent hover:shadow-xl hover:shadow-background/30",
          "bg-gradient-to-b from-surface/20 to-transparent"
        ],
        
        // ACCENT: Gold accent for key cards
        accent: [
          "border border-accent rounded-xl",
          "bg-gradient-to-br from-accent/5 via-transparent to-transparent",
          "hover:border-accent hover:shadow-lg hover:shadow-accent/10"
        ],
        
        // INTERACTIVE: Clear interactive affordance with gold outline
        interactive: [
          "border border-border rounded-xl cursor-pointer",
          "hover:border-accent hover:bg-surface/20 hover:scale-[1.02]",
          "active:scale-[0.98] transition-transform"
        ],
        
        // MINIMAL: Ultra-clean for secondary content
        minimal: [
          "border border-border/50 rounded-lg",
          "hover:border-accent/50 hover:bg-surface/20"
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

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant, 
    padding, 
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding }), className)}
        {...props}
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
    className={cn("flex flex-col space-y-1.5", className)}
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
    className={cn("text-lg font-semibold leading-none tracking-tight text-white", className)}
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
    className={cn("text-sm text-muted leading-relaxed", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
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
        return "border-border bg-surface/50"
      case "empty":
        return "border-dashed border-border"
      case "success":
        return "border-accent bg-accent/5"
      default:
        return "border-border"
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl p-8 text-center bg-background",
        getStatusStyles(),
        className
      )}
      {...props}
    >
      {icon && <div className="mb-4 flex justify-center text-muted">{icon}</div>}
      <h3 className="text-lg font-semibold text-white mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-muted leading-relaxed mb-4">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  )
})
CardStatus.displayName = "CardStatus"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardStatus, cardVariants } 