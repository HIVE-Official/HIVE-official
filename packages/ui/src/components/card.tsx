import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

const cardVariants = cva(
  // Base styles following HIVE brand guidelines
  "bg-surface text-foreground transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
  {
    variants: {
      variant: {
        // Default elevated surface
        default: [
          "border border-border rounded-xl", // 12px radius per brand guidelines
          "shadow-sm hover:shadow-md",
          "hover:border-[#4A4A4A] hover:bg-surface-02/50"
        ],
        
        // Elevated with more prominent shadow
        elevated: [
          "border border-border rounded-xl",
          "shadow-md hover:shadow-lg hover:shadow-black/20",
          "hover:border-accent/20 hover:bg-surface-02"
        ],
        
        // Outline style - transparent background
        outline: [
          "border-2 border-border bg-transparent rounded-xl",
          "hover:bg-surface-01/50 hover:border-accent/30"
        ],
        
        // Ghost - minimal styling
        ghost: [
          "border-transparent bg-transparent rounded-xl",
          "hover:bg-surface-01/50"
        ],
        
        // Accent variant for special content
        accent: [
          "border border-accent/20 rounded-xl",
          "bg-surface shadow-lg shadow-accent/5",
          "hover:shadow-accent/10 hover:border-accent/30 hover:bg-surface-02"
        ],
        
        // Glassmorphism effect for modal-like surfaces
        glass: [
          "border border-white/10 rounded-xl",
          "bg-surface/75 backdrop-blur-[12px] backdrop-saturate-180",
          "shadow-lg hover:bg-surface/80"
        ],
        
        // Interactive card that responds to clicks
        interactive: [
          "border border-border rounded-xl cursor-pointer",
          "shadow-sm hover:shadow-md hover:border-accent/20",
          "hover:-translate-y-0.5 hover:bg-surface-02/50",
          "active:scale-[0.99] active:translate-y-0"
        ],
      },
      padding: {
        none: "",
        xs: "p-3", // 12px - using 8px grid
        sm: "p-4", // 16px
        default: "p-6", // 24px 
        lg: "p-8", // 32px
        xl: "p-12", // 48px
      },
      size: {
        sm: "max-w-sm",
        default: "max-w-none",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "w-full",
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      size: "default",
    },
  }
)

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>
>(({ className, variant, padding, size, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardVariants({ variant, padding, size, className }))}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 pb-4", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      // Using Space Grotesk for card titles per brand guidelines
      "font-display text-xl font-semibold leading-tight tracking-tight text-foreground",
      className
    )}
    {...props}
  >
    {children}
  </h3>
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      // Using Geist for body text per brand guidelines
      "font-sans text-sm text-muted leading-relaxed",
      className
    )}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
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

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardStatus,
  cardVariants 
} 