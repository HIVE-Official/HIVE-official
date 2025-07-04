import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "../lib/utils"
import { MotionDiv } from "./motion-wrapper"

const spinnerVariants = cva(
  "animate-spin",
  {
    variants: {
      variant: {
        default: "text-accent",
        muted: "text-muted",
        foreground: "text-foreground",
        surface: "text-muted-foreground",
      },
      size: {
        xs: "h-3 w-3",
        sm: "h-4 w-4", 
        default: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  /** Optional loading message */
  message?: string
  /** Show the spinner centered in a container */
  centered?: boolean
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, variant, size, message, centered, ...props }, ref) => {
    const spinner = (
      <MotionDiv
        ref={ref}
        className={cn(
          "flex items-center",
          centered && "justify-center min-h-[200px]",
          !centered && "justify-start",
          className
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.18, ease: [0.33, 0.65, 0, 1] }}
        {...props}
      >
        <MotionDiv
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 1, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: [0.33, 0.65, 0, 1] }
          }}
        >
          <Loader2 className={cn(spinnerVariants({ variant, size }))} />
        </MotionDiv>
        {message && (
          <span className="ml-3 text-body font-sans text-muted">
            {message}
          </span>
        )}
      </MotionDiv>
    )

    if (centered) {
      return (
        <div className="flex items-center justify-center w-full h-full">
          {spinner}
        </div>
      )
    }

    return spinner
  }
)
LoadingSpinner.displayName = "LoadingSpinner"

// Convenience components for common use cases
const PageLoader = React.forwardRef<HTMLDivElement, Omit<LoadingSpinnerProps, "centered" | "size">>(
  (props, ref) => (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <LoadingSpinner {...props} size="xl" centered ref={ref} />
    </div>
  )
)
PageLoader.displayName = "PageLoader"

const InlineLoader = React.forwardRef<HTMLDivElement, Omit<LoadingSpinnerProps, "centered">>(
  (props, ref) => <LoadingSpinner {...props} size="sm" ref={ref} />
)
InlineLoader.displayName = "InlineLoader"

const CardLoader = React.forwardRef<HTMLDivElement, Omit<LoadingSpinnerProps, "size">>(
  (props, ref) => (
    <div className="bg-surface-01 border border-border rounded-lg p-8">
      <LoadingSpinner {...props} size="lg" centered ref={ref} />
    </div>
  )
)
CardLoader.displayName = "CardLoader"

export { LoadingSpinner, PageLoader, InlineLoader, CardLoader, spinnerVariants } 