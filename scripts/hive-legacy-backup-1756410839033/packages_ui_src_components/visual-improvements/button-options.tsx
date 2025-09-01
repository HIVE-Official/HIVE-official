import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "../lib/utils"

// OPTION A: VERCEL-INSPIRED - Clean, technical, sophisticated
const vercelButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium relative overflow-hidden transition-all duration-150 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary: [
          "bg-white text-[var(--hive-text-primary)] border border-white/20",
          "hover:bg-white/90 hover:scale-[1.02]",
          "active:scale-[0.98]",
          "focus-visible:ring-1 focus-visible:ring-accent"
        ],
        secondary: [
          "bg-transparent border border-white/30 text-[var(--hive-text-inverse)]",
          "hover:bg-white/10 hover:border-white/50",
          "active:bg-white/5",
          "focus-visible:ring-1 focus-visible:ring-accent"
        ],
        accent: [
          "bg-accent text-[var(--hive-text-primary)] font-semibold",
          "hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20",
          "active:bg-accent/80",
          "focus-visible:ring-1 focus-visible:ring-accent/50"
        ],
        ghost: [
          "text-[var(--hive-text-inverse)]/80 hover:text-[var(--hive-text-inverse)] hover:bg-white/5",
          "active:bg-white/10",
          "focus-visible:ring-1 focus-visible:ring-accent"
        ]
      },
      size: {
        sm: "h-8 px-3 text-sm rounded-md",
        md: "h-9 px-4 text-sm rounded-lg",
        lg: "h-10 px-6 text-base rounded-lg",
        icon: "h-9 w-9 rounded-lg"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
)

// OPTION B: APPLE-INSPIRED - Refined, premium, tactile
const appleButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium relative transition-all duration-200 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary: [
          "bg-white text-[var(--hive-text-primary)] rounded-xl shadow-sm",
          "hover:shadow-md hover:bg-white/95 hover:scale-[1.02]",
          "active:scale-[0.98] active:shadow-sm",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        ],
        secondary: [
          "bg-white/10 backdrop-blur-sm border border-white/20 text-[var(--hive-text-inverse)] rounded-xl",
          "hover:bg-white/20 hover:border-white/30",
          "active:bg-white/5",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        ],
        accent: [
          "bg-gradient-to-b from-accent to-accent/90 text-[var(--hive-text-primary)] font-semibold rounded-xl shadow-lg shadow-accent/20",
          "hover:from-accent/95 hover:to-accent/85 hover:shadow-xl hover:shadow-accent/30",
          "active:from-accent/90 active:to-accent/80",
          "focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
        ],
        destructive: [
          "bg-surface border border-border text-foreground rounded-xl shadow-sm",
          "hover:bg-surface-01 hover:shadow-md",
          "active:bg-surface-02",
          "focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
        ]
      },
      size: {
        sm: "h-8 px-4 text-sm",
        md: "h-10 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
)

// OPTION C: CAMPUS-NATIVE - Energetic, authentic, approachable
const campusButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium relative transition-all duration-180 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 select-none group",
  {
    variants: {
      variant: {
        energy: [
          "bg-accent text-[var(--hive-text-primary)] font-bold border-2 border-accent rounded-lg",
          "hover:bg-accent/90 hover:scale-105 hover:shadow-lg hover:shadow-accent/30",
          "active:scale-95",
          "relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
          "before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
        ],
        chill: [
          "bg-surface border border-white/30 text-[var(--hive-text-inverse)] rounded-lg",
          "hover:bg-surface-01 hover:border-accent/50 hover:text-accent",
          "active:bg-surface-02",
          "focus-visible:ring-1 focus-visible:ring-accent"
        ],
        hype: [
          "bg-gradient-to-r from-accent via-accent to-accent/80 text-[var(--hive-text-primary)] font-black rounded-lg",
          "hover:from-accent/95 hover:via-accent/95 hover:to-accent/75 hover:scale-110",
          "active:scale-95",
          "animate-pulse hover:animate-none",
          "shadow-lg shadow-accent/40"
        ],
        subtle: [
          "text-[var(--hive-text-inverse)]/70 hover:text-accent hover:bg-accent/10 rounded-lg",
          "active:bg-accent/20",
          "transition-all duration-300"
        ]
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-7 text-base",
        xl: "h-14 px-9 text-lg",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "energy",
      size: "md"
    }
  }
)

// OPTION D: TECH-FORWARD - Minimal, precise, developer-focused
const techButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-mono text-sm relative transition-all duration-100 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        terminal: [
          "bg-black border border-accent/50 text-accent font-medium",
          "hover:border-accent hover:bg-accent/5 hover:shadow-[0_0_20px_rgba(255,215,0,0.1)]",
          "active:bg-accent/10",
          "focus-visible:ring-1 focus-visible:ring-accent"
        ],
        system: [
          "bg-surface-02 border border-white/20 text-[var(--hive-text-inverse)]/90",
          "hover:bg-surface-03 hover:border-white/40 hover:text-[var(--hive-text-inverse)]",
          "active:bg-surface-01",
          "focus-visible:ring-1 focus-visible:ring-accent"
        ],
        execute: [
          "bg-accent text-[var(--hive-text-primary)] font-bold",
          "hover:bg-accent/90 hover:shadow-md",
          "active:bg-accent/80",
          "focus-visible:ring-1 focus-visible:ring-accent/50"
        ],
        debug: [
          "bg-surface/50 border border-border text-muted-foreground",
          "hover:bg-surface hover:border-accent/30",
          "active:bg-surface-01",
          "focus-visible:ring-1 focus-visible:ring-accent/50"
        ]
      },
      size: {
        xs: "h-6 px-2 text-xs rounded",
        sm: "h-7 px-3 text-xs rounded",
        md: "h-8 px-4 text-sm rounded",
        lg: "h-9 px-5 text-sm rounded",
        icon: "h-8 w-8 rounded"
      }
    },
    defaultVariants: {
      variant: "terminal",
      size: "md"
    }
  }
)

// OPTION E: SOCIAL-FIRST - Friendly, engaging, conversational
const socialButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium relative transition-all duration-300 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 select-none group",
  {
    variants: {
      variant: {
        connect: [
          "bg-accent text-[var(--hive-text-primary)] font-semibold rounded-full",
          "hover:bg-accent/90 hover:scale-105 hover:shadow-xl hover:shadow-accent/20",
          "active:scale-95",
          "relative overflow-hidden",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0",
          "before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000"
        ],
        engage: [
          "bg-white/10 backdrop-blur-md border border-white/20 text-[var(--hive-text-inverse)] rounded-full",
          "hover:bg-white/20 hover:border-accent/50 hover:text-accent hover:scale-105",
          "active:scale-95",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        ],
        react: [
          "bg-transparent text-[var(--hive-text-inverse)]/80 rounded-full hover:bg-accent/20 hover:text-accent",
          "active:bg-accent/30 active:scale-90",
          "group-hover:animate-bounce"
        ],
        share: [
          "bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 text-accent rounded-full",
          "hover:from-accent/30 hover:to-accent/20 hover:border-accent/50 hover:scale-105",
          "active:scale-95",
          "hover:shadow-lg hover:shadow-accent/20"
        ]
      },
      size: {
        sm: "h-8 px-4 text-sm",
        md: "h-10 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "connect",
      size: "md"
    }
  }
)

// Base component interface
interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  loading?: boolean
  children: React.ReactNode
}

// Vercel Button
export interface VercelButtonProps extends BaseButtonProps, VariantProps<typeof vercelButtonVariants> {}
export const VercelButton = React.forwardRef<HTMLButtonElement, VercelButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(vercelButtonVariants({ variant, size }), className)}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        {children}
      </Comp>
    )
  }
)
VercelButton.displayName = "VercelButton"

// Apple Button
export interface AppleButtonProps extends BaseButtonProps, VariantProps<typeof appleButtonVariants> {}
export const AppleButton = React.forwardRef<HTMLButtonElement, AppleButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(appleButtonVariants({ variant, size }), className)}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        {children}
      </Comp>
    )
  }
)
AppleButton.displayName = "AppleButton"

// Campus Button
export interface CampusButtonProps extends BaseButtonProps, VariantProps<typeof campusButtonVariants> {}
export const CampusButton = React.forwardRef<HTMLButtonElement, CampusButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(campusButtonVariants({ variant, size }), className)}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        {children}
      </Comp>
    )
  }
)
CampusButton.displayName = "CampusButton"

// Tech Button
export interface TechButtonProps extends BaseButtonProps, VariantProps<typeof techButtonVariants> {}
export const TechButton = React.forwardRef<HTMLButtonElement, TechButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(techButtonVariants({ variant, size }), className)}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        {children}
      </Comp>
    )
  }
)
TechButton.displayName = "TechButton"

// Social Button
export interface SocialButtonProps extends BaseButtonProps, VariantProps<typeof socialButtonVariants> {}
export const SocialButton = React.forwardRef<HTMLButtonElement, SocialButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(socialButtonVariants({ variant, size }), className)}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        {children}
      </Comp>
    )
  }
)
SocialButton.displayName = "SocialButton"