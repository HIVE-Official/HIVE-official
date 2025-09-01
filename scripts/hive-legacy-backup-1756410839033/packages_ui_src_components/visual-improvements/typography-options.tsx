import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"

// OPTION A: MINIMAL TYPOGRAPHY - Clean, readable, professional
const minimalTypographyVariants = cva(
  "transition-colors duration-200 ease-out",
  {
    variants: {
      variant: {
        hero: [
          "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
          "text-[var(--hive-text-inverse)] leading-tight"
        ],
        title: [
          "text-2xl md:text-3xl font-semibold tracking-tight",
          "text-[var(--hive-text-inverse)]"
        ],
        subtitle: [
          "text-lg md:text-xl font-medium",
          "text-[var(--hive-text-inverse)]/80"
        ],
        body: [
          "text-base leading-relaxed",
          "text-[var(--hive-text-inverse)]/90"
        ],
        caption: [
          "text-sm",
          "text-[var(--hive-text-inverse)]/60"
        ],
        accent: [
          "text-accent font-medium",
          "hover:text-accent/80"
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

// OPTION B: DISPLAY TYPOGRAPHY - Bold, impactful, brand-focused
const displayTypographyVariants = cva(
  "font-display transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        hero: [
          "text-5xl md:text-7xl lg:text-8xl font-black tracking-tight",
          "bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent",
          "leading-none hover:scale-105 transition-transform duration-500"
        ],
        impact: [
          "text-3xl md:text-4xl lg:text-5xl font-black tracking-tight",
          "text-accent hover:text-accent/90",
          "hover:scale-110 transition-transform duration-300"
        ],
        headline: [
          "text-2xl md:text-3xl font-bold tracking-tight",
          "text-[var(--hive-text-inverse)] hover:text-accent transition-colors duration-300"
        ],
        subhead: [
          "text-xl md:text-2xl font-semibold",
          "text-[var(--hive-text-inverse)]/90 hover:text-[var(--hive-text-inverse)] transition-colors"
        ],
        emphasis: [
          "text-lg font-bold tracking-wide",
          "text-accent uppercase",
          "hover:tracking-wider transition-all duration-300"
        ],
        brand: [
          "text-6xl md:text-8xl font-black tracking-tighter",
          "bg-gradient-to-br from-accent via-white to-accent bg-clip-text text-transparent",
          "animate-pulse hover:animate-none"
        ]
      },
      align: {
        left: "text-left",
        center: "text-center", 
        right: "text-right"
      }
    },
    defaultVariants: {
      variant: "headline",
      align: "left"
    }
  }
)

// OPTION C: CAMPUS TYPOGRAPHY - Authentic, energetic, student-focused  
const campusTypographyVariants = cva(
  "transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        energy: [
          "text-2xl md:text-3xl font-bold text-accent tracking-wide",
          "animate-pulse hover:animate-none hover:scale-110",
          "text-shadow-lg hover:text-shadow-xl transition-all duration-300"
        ],
        handwritten: [
          "text-xl md:text-2xl text-[var(--hive-text-inverse)] font-handwriting",
          "transform rotate-[-0.5deg] hover:rotate-0",
          "relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5",
          "after:bg-accent after:scale-x-0 hover:after:scale-x-100",
          "after:transition-transform after:duration-300"
        ],
        sticker: [
          "text-lg md:text-xl font-black text-[var(--hive-text-primary)] bg-accent",
          "px-3 py-1 transform rotate-[-1deg] inline-block",
          "hover:rotate-0 hover:scale-110 transition-all duration-300",
          "shadow-md hover:shadow-lg rounded-sm"
        ],
        bulletin: [
          "text-lg font-semibold text-[var(--hive-text-inverse)]",
          "relative pl-6",
          "before:absolute before:left-0 before:top-1 before:w-3 before:h-3",
          "before:bg-accent before:rounded-full",
          "hover:before:animate-ping"
        ],
        chalk: [
          "text-xl md:text-2xl font-semibold text-foreground",
          "relative before:absolute before:inset-0",
          "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
          "before:translate-x-[-100%] hover:before:translate-x-[100%]",
          "before:transition-transform before:duration-700"
        ],
        campus: [
          "text-lg md:text-xl font-bold text-accent",
          "hover:text-accent/90 hover:scale-105",
          "relative after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-1",
          "after:bg-accent/30 after:scale-x-0 hover:after:scale-x-100",
          "after:transition-transform after:duration-300"
        ]
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right"
      }
    },
    defaultVariants: {
      variant: "campus",
      align: "left"
    }
  }
)

// OPTION D: TECH TYPOGRAPHY - Monospace, precise, developer-focused
const techTypographyVariants = cva(
  "font-mono transition-all duration-150 ease-out",
  {
    variants: {
      variant: {
        terminal: [
          "text-accent font-medium",
          "before:content-['$_'] before:text-accent/70",
          "hover:text-accent/90"
        ],
        code: [
          "text-sm text-accent bg-accent/10 px-2 py-1 rounded",
          "border border-accent/20 hover:border-accent/40",
          "hover:bg-accent/20 transition-colors"
        ],
        command: [
          "text-[var(--hive-text-inverse)]/90 font-medium",
          "hover:text-accent transition-colors",
          "cursor-pointer"
        ],
        output: [
          "text-[var(--hive-text-inverse)]/70 text-sm",
          "leading-relaxed font-light"
        ],
        error: [
          "text-muted-foreground font-medium",
          "before:content-['ERROR:_'] before:text-muted-foreground",
          "hover:text-foreground"
        ],
        success: [
          "text-accent font-medium", 
          "before:content-['✓_'] before:text-accent",
          "hover:text-accent/90"
        ],
        debug: [
          "text-muted-foreground font-medium",
          "before:content-['DEBUG:_'] before:text-muted-foreground",
          "hover:text-foreground"
        ]
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right"
      }
    },
    defaultVariants: {
      variant: "command",
      align: "left"
    }
  }
)

// OPTION E: SOCIAL TYPOGRAPHY - Friendly, conversational, emoji-friendly
const socialTypographyVariants = cva(
  "transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        friendly: [
          "text-lg md:text-xl text-[var(--hive-text-inverse)] font-medium",
          "hover:text-accent hover:scale-105",
          "transition-all duration-300"
        ],
        chat: [
          "text-base text-[var(--hive-text-inverse)]/90 leading-relaxed",
          "hover:text-[var(--hive-text-inverse)] transition-colors"
        ],
        reaction: [
          "text-2xl md:text-3xl",
          "hover:scale-125 hover:rotate-12",
          "transition-transform duration-300 cursor-pointer"
        ],
        username: [
          "font-semibold text-accent",
          "hover:text-accent/80 transition-colors",
          "cursor-pointer"
        ],
        timestamp: [
          "text-xs text-[var(--hive-text-inverse)]/50",
          "hover:text-[var(--hive-text-inverse)]/70 transition-colors"
        ],
        hashtag: [
          "text-accent font-medium",
          "hover:text-accent/80 hover:underline",
          "transition-all duration-200 cursor-pointer"
        ],
        mention: [
          "text-accent font-medium",
          "hover:text-accent/80 hover:bg-accent/10",
          "transition-all duration-200 cursor-pointer px-1 rounded"
        ],
        emoji: [
          "text-2xl hover:scale-110",
          "transition-transform duration-200 cursor-pointer",
          "hover:animate-bounce"
        ]
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right"
      }
    },
    defaultVariants: {
      variant: "chat",
      align: "left"
    }
  }
)

// Base interface
interface BaseTypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  children: React.ReactNode
}

// Minimal Typography
export interface MinimalTypographyProps extends BaseTypographyProps, VariantProps<typeof minimalTypographyVariants> {}
export const MinimalTypography = React.forwardRef<HTMLElement, MinimalTypographyProps>(
  ({ className, variant, align, as: Component = "p", children, ...props }, ref) => {
    return React.createElement(
      Component,
      {
        className: cn(minimalTypographyVariants({ variant, align }), className),
        ref,
        ...props
      },
      children
    )
  }
)
MinimalTypography.displayName = "MinimalTypography"

// Display Typography
export interface DisplayTypographyProps extends BaseTypographyProps, VariantProps<typeof displayTypographyVariants> {}
export const DisplayTypography = React.forwardRef<HTMLElement, DisplayTypographyProps>(
  ({ className, variant, align, as: Component = "h1", children, ...props }, ref) => {
    return React.createElement(
      Component,
      {
        className: cn(displayTypographyVariants({ variant, align }), className),
        ref,
        ...props
      },
      children
    )
  }
)
DisplayTypography.displayName = "DisplayTypography"

// Campus Typography
export interface CampusTypographyProps extends BaseTypographyProps, VariantProps<typeof campusTypographyVariants> {}
export const CampusTypography = React.forwardRef<HTMLElement, CampusTypographyProps>(
  ({ className, variant, align, as: Component = "span", children, ...props }, ref) => {
    return React.createElement(
      Component,
      {
        className: cn(campusTypographyVariants({ variant, align }), className),
        ref,
        ...props
      },
      children
    )
  }
)
CampusTypography.displayName = "CampusTypography"

// Tech Typography
export interface TechTypographyProps extends BaseTypographyProps, VariantProps<typeof techTypographyVariants> {}
export const TechTypography = React.forwardRef<HTMLElement, TechTypographyProps>(
  ({ className, variant, align, as: Component = "code", children, ...props }, ref) => {
    return React.createElement(
      Component,
      {
        className: cn(techTypographyVariants({ variant, align }), className),
        ref,
        ...props
      },
      children
    )
  }
)
TechTypography.displayName = "TechTypography"

// Social Typography  
export interface SocialTypographyProps extends BaseTypographyProps, VariantProps<typeof socialTypographyVariants> {}
export const SocialTypography = React.forwardRef<HTMLElement, SocialTypographyProps>(
  ({ className, variant, align, as: Component = "span", children, ...props }, ref) => {
    return React.createElement(
      Component,
      {
        className: cn(socialTypographyVariants({ variant, align }), className),
        ref,
        ...props
      },
      children
    )
  }
)
SocialTypography.displayName = "SocialTypography"

// Convenient preset components for each style
export const MinimalHero = ({ children, ...props }: Omit<MinimalTypographyProps, 'variant'>) => (
  <MinimalTypography variant="hero" as="h1" {...props}>{children}</MinimalTypography>
)

export const DisplayImpact = ({ children, ...props }: Omit<DisplayTypographyProps, 'variant'>) => (
  <DisplayTypography variant="impact" as="h1" {...props}>{children}</DisplayTypography>
)

export const CampusEnergy = ({ children, ...props }: Omit<CampusTypographyProps, 'variant'>) => (
  <CampusTypography variant="energy" as="h2" {...props}>{children}</CampusTypography>
)

export const TechTerminal = ({ children, ...props }: Omit<TechTypographyProps, 'variant'>) => (
  <TechTypography variant="terminal" as="code" {...props}>{children}</TechTypography>
)

export const SocialFriendly = ({ children, ...props }: Omit<SocialTypographyProps, 'variant'>) => (
  <SocialTypography variant="friendly" as="span" {...props}>{children}</SocialTypography>
)