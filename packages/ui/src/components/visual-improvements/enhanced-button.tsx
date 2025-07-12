import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "../../lib/utils"

const enhancedButtonVariants = cva(
  // Base with REAL presence
  "inline-flex items-center justify-center whitespace-nowrap font-medium relative overflow-hidden transition-all duration-200 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 select-none group",
  {
    variants: {
      variant: {
        // HIVE SIGNATURE: Thick gold borders + hover fill
        signature: [
          "border-3 border-accent bg-transparent text-accent font-semibold",
          "relative before:absolute before:inset-0 before:bg-accent before:translate-y-full",
          "before:transition-transform before:duration-300 before:ease-out",
          "hover:before:translate-y-0 hover:text-black hover:border-accent",
          "hover:shadow-lg hover:shadow-accent/30",
          "active:scale-95 active:before:bg-accent/90",
          "focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
        ],
        
        // NEON GLOW: Cyberpunk energy
        neon: [
          "bg-black border-2 border-accent text-accent font-bold",
          "shadow-[0_0_20px_rgba(255,215,0,0.3)]",
          "relative before:absolute before:inset-0 before:bg-accent/10",
          "before:blur-sm before:transition-all before:duration-300",
          "hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] hover:before:bg-accent/20",
          "hover:text-white hover:border-accent hover:scale-105",
          "active:scale-95"
        ],
        
        // ENERGY PULSE: Living button
        pulse: [
          "bg-gradient-to-r from-surface via-surface-02 to-surface border-2 border-accent/30 text-accent",
          "relative before:absolute before:inset-0 before:bg-gradient-to-r",
          "before:from-transparent before:via-accent/10 before:to-transparent before:scale-x-0",
          "before:transition-transform before:duration-500 before:ease-out",
          "hover:before:scale-x-100 hover:border-accent/60 hover:shadow-lg",
          "animate-pulse-subtle hover:animate-none",
          "active:scale-95"
        ],
        
        // CHUNKY: Bold, thick, impossible to miss
        chunky: [
          "bg-accent text-black font-black border-4 border-accent",
          "transform hover:translate-y-[-2px] hover:shadow-[0_6px_0_rgba(255,215,0,0.8)]",
          "active:translate-y-0 active:shadow-[0_2px_0_rgba(255,215,0,0.8)]",
          "transition-all duration-150 ease-out",
          "text-lg tracking-wide"
        ],
        
        // MAGNETIC: Pulls attention
        magnetic: [
          "bg-surface border-2 border-accent/40 text-accent relative",
          "before:absolute before:inset-[-2px] before:bg-gradient-to-r",
          "before:from-accent/0 before:via-accent/30 before:to-accent/0",
          "before:blur-sm before:transition-all before:duration-300 before:-z-10",
          "hover:before:from-accent/30 hover:before:via-accent/60 hover:before:to-accent/30",
          "hover:border-accent hover:shadow-lg hover:scale-105",
          "active:scale-95"
        ],
        
        // CAMPUS STICKER: Like laptop stickers
        sticker: [
          "bg-accent text-black font-bold border-3 border-black/20",
          "transform rotate-[-1deg] hover:rotate-0",
          "shadow-md hover:shadow-lg",
          "relative after:absolute after:top-1 after:right-1 after:w-2 after:h-2",
          "after:bg-white/30 after:rounded-full after:blur-sm", // Shine effect
          "transition-all duration-300 ease-out",
          "hover:scale-110 active:scale-95"
        ]
      },
      
      size: {
        sm: "h-8 px-3 text-sm rounded-md",
        md: "h-10 px-4 py-2 rounded-lg", 
        lg: "h-12 px-6 py-3 text-lg rounded-xl",
        xl: "h-14 px-8 py-4 text-xl rounded-2xl",
        icon: "h-10 w-10 rounded-lg",
        "icon-sm": "h-8 w-8 rounded-md",
        "icon-lg": "h-12 w-12 rounded-xl"
      },
      
      intensity: {
        subtle: "opacity-80 hover:opacity-100",
        normal: "",
        high: "saturate-150 contrast-110",
        extreme: "saturate-200 contrast-125 brightness-110"
      }
    },
    
    defaultVariants: {
      variant: "signature",
      size: "md", 
      intensity: "normal"
    }
  }
)

export interface EnhancedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof enhancedButtonVariants> {
  asChild?: boolean
  loading?: boolean
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, variant, size, intensity, asChild = false, loading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(enhancedButtonVariants({ variant, size, intensity }), className)}
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
EnhancedButton.displayName = "EnhancedButton"

export { EnhancedButton, enhancedButtonVariants }