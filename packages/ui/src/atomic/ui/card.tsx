import * as React from "react"
import { cn } from "../../lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'transparent' | 'interactive' | 'elevated'
  hoverable?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hoverable = false, ...props }, ref) => {
    const variantClasses = {
      default: "bg-white dark:bg-gray-800",
      destructive: "border-destructive/50 text-destructive dark:border-destructive",
      outline: "border border-input bg-background shadow-sm",
      secondary: "bg-secondary text-secondary-foreground shadow-sm",
      ghost: "shadow-none",
      transparent: "bg-transparent shadow-none border-0",
      interactive: "bg-white dark:bg-gray-800 hover:shadow-md transition-shadow cursor-pointer",
      elevated: "bg-white dark:bg-gray-800 shadow-lg",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border text-card-foreground shadow-sm",
          variantClasses[variant],
          hoverable && "hover:shadow-lg transition-shadow cursor-pointer",
          className
        )}
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
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
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
    className={cn("text-sm text-muted-foreground", className)}
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

// Card variants for different styles
const cardVariants = {
  default: "bg-white dark:bg-gray-800",
  destructive: "border-destructive/50 text-destructive dark:border-destructive",
  outline: "border border-input bg-background shadow-sm",
  secondary: "bg-secondary text-secondary-foreground shadow-sm",
  ghost: "shadow-none",
  transparent: "bg-transparent shadow-none border-0",
}

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  cardVariants 
}