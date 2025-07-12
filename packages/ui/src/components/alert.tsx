import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"

import { cn } from "../lib/utils"

const alertVariants = cva(
  "relative w-full rounded-xl border px-4 py-3 text-sm transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]",
  {
    variants: {
      variant: {
        default: [
          "bg-background border-border text-white",
        ],
        
        destructive: [
          "bg-background border-border text-white",
          "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-muted before:rounded-l-xl"
        ],
        
        success: [
          "bg-accent/5 border-accent text-white",
          "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent before:rounded-l-xl"
        ],
        
        warning: [
          "bg-background border-border text-white",
          "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-muted before:rounded-l-xl"
        ],
        
        info: [
          "bg-surface border-border text-white",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight text-white", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm leading-relaxed text-muted", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

const AlertIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "destructive" | "success" | "warning" | "info"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const getIcon = () => {
    switch (variant) {
      case "destructive":
        return <AlertCircle className="h-4 w-4 text-muted" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-accent" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-muted" />
      case "info":
        return <Info className="h-4 w-4 text-muted" />
      default:
        return <Info className="h-4 w-4 text-muted" />
    }
  }

  return (
    <div
      ref={ref}
      className={cn("flex-shrink-0", className)}
      {...props}
    >
      {getIcon()}
    </div>
  )
})
AlertIcon.displayName = "AlertIcon"

export { Alert, AlertTitle, AlertDescription, AlertIcon, alertVariants }