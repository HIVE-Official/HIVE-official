import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-sans text-sm font-medium ring-offset-background transition-all duration-fast ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary actions - white and black fills only (HIVE brand rule)
        "primary-white": "bg-foreground text-background hover:bg-foreground/90 hover:scale-small active:scale-[0.98]",
        "primary-black": "bg-background text-foreground border border-border hover:bg-background/90 hover:scale-small active:scale-[0.98]",
        
        // Ritual moments - ONLY allowed gold fills (special occasions only)
        ritual: "bg-accent text-background hover:bg-accent/90 hover:scale-small active:scale-[0.98] shadow-sm shadow-accent/20 font-semibold",
        
        // Standard actions - outlines and subtle variants
        outline: "border border-border bg-transparent hover:bg-accent/10 hover:border-accent/50 hover:text-foreground",
        secondary: "bg-surface-01 text-foreground hover:bg-surface-02 hover:scale-small",
        ghost: "hover:bg-accent/10 hover:text-foreground",
        
        // Navigation and links - minimal styling
        nav: "hover:bg-accent/10 hover:text-accent",
        link: "text-foreground underline-offset-4 hover:underline hover:text-accent",
      },
      size: {
        xs: "h-7 rounded px-2 text-xs",
        sm: "h-9 rounded-md px-3",
        default: "h-10 px-4 py-2",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary-white",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  fullWidth?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, fullWidth, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          fullWidth && "w-full",
          loading && "opacity-50 cursor-not-allowed",
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }