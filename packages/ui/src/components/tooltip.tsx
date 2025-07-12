import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

const tooltipContentVariants = cva(
  "z-50 overflow-hidden rounded-lg px-3 py-1.5 text-sm text-white shadow-lg transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] animate-in fade-in-0 zoom-in-95",
  {
    variants: {
      variant: {
        default: [
          "bg-background border border-border",
          "data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade",
          "data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade", 
          "data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade",
          "data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade"
        ],
        
        accent: [
          "bg-accent text-background border border-accent",
          "data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade",
          "data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade",
          "data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade", 
          "data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade"
        ],
        
        minimal: [
          "bg-surface border border-border/50",
          "data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade",
          "data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade",
          "data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade",
          "data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade"
        ],
        
        destructive: [
          "bg-surface border border-border text-muted",
          "data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade",
          "data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade",
          "data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade",
          "data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade"
        ]
      },
      
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-sm max-w-xs"
      }
    },
    
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & 
  VariantProps<typeof tooltipContentVariants>
>(({ className, variant, size, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(tooltipContentVariants({ variant, size }), className)}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { 
  Tooltip, 
  TooltipTrigger, 
  TooltipContent, 
  TooltipProvider, 
  tooltipContentVariants 
}