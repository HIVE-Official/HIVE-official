/// <reference lib="dom" />
import * as React from "react"
import type { ComponentPropsWithRef, ElementType, ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

const typographyVariants = cva(
  "text-foreground",
  {
    variants: {
      variant: {
        // Display & Headings - Space Grotesk Variable
        "display": "font-display text-display font-semibold leading-tight tracking-tight",
        "h1": "font-display text-h1 font-semibold leading-tight tracking-tight",
        "h2": "font-display text-h2 font-semibold leading-tight tracking-tight", 
        "h3": "font-display text-h3 font-semibold leading-tight tracking-tight",
        "h4": "font-display text-h4 font-semibold leading-tight tracking-tight",
        
        // Body text - Geist
        "body": "font-sans text-body leading-relaxed",
        "body-sm": "font-sans text-body-sm leading-relaxed",
        "caption": "font-sans text-caption leading-normal text-muted-foreground",
        
        // UI text - Geist
        "button": "font-sans text-button font-medium leading-none",
        "label": "font-sans text-caption font-medium leading-none",
        "nav": "font-sans text-body-sm font-medium leading-none",
        
        // Code - Geist Mono
        "code": "font-mono text-code leading-relaxed bg-muted px-1.5 py-0.5 rounded-md",
        "code-block": "font-mono text-code leading-relaxed",
        
        // Special variants
        "muted": "font-sans text-body-sm text-muted-foreground leading-relaxed",
        "subtle": "font-sans text-caption text-muted-foreground leading-normal",
        "small": "font-sans text-caption leading-normal",
        
        // Marketing/Hero variants
        "hero": "font-display text-display font-semibold leading-none tracking-tight",
        "lead": "font-sans text-body text-muted-foreground leading-relaxed",
      },
      align: {
        left: "text-left",
        center: "text-center", 
        right: "text-right",
        justify: "text-justify",
      },
      weight: {
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      }
    },
    defaultVariants: {
      variant: "body",
      align: "left",
    },
  }
)

export type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>["variant"]>
export type TypographyAlign = NonNullable<VariantProps<typeof typographyVariants>["align"]>
export type TypographyWeight = NonNullable<VariantProps<typeof typographyVariants>["weight"]>

export interface TypographyProps
  extends ComponentPropsWithRef<"div">,
    VariantProps<typeof typographyVariants> {
  as?: ElementType;
  children?: ReactNode;
}

const Typography = React.forwardRef<unknown, TypographyProps>(
  ({ className, variant, align, weight, as, children, ...props }, ref) => {
    // Smart element mapping based on variant
    const getElement = (): ElementType => {
      if (as) return as
      
      switch (variant) {
        case "display":
        case "hero":
        case "h1": return "h1"
        case "h2": return "h2" 
        case "h3": return "h3"
        case "h4": return "h4"
        case "caption":
        case "label":
        case "small":
        case "subtle": return "span"
        case "code": return "code"
        case "code-block": return "pre"
        default: return "p"
      }
    }
    
    const Element = getElement()
    
    return (
      <Element
        className={cn(typographyVariants({ variant, align, weight, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Element>
    )
  }
)
Typography.displayName = "Typography"

// Convenience components for common use cases
const Heading = React.forwardRef<unknown, Omit<TypographyProps, "variant"> & { level: 1 | 2 | 3 | 4 }>(
  ({ level, ...props }, ref) => {
    const variant = `h${level}` as "h1" | "h2" | "h3" | "h4"
    return <Typography {...props} variant={variant} ref={ref} />
  }
)
Heading.displayName = "Heading"

const Text = React.forwardRef<unknown, Omit<TypographyProps, "variant">>(
  (props, ref) => <Typography {...props} variant="body" ref={ref} />
)
Text.displayName = "Text"

const Caption = React.forwardRef<unknown, Omit<TypographyProps, "variant">>(
  (props, ref) => <Typography {...props} variant="caption" as="span" ref={ref} />
)
Caption.displayName = "Caption"

const Code = React.forwardRef<unknown, Omit<TypographyProps, "variant"> & { block?: boolean }>(
  ({ block, ...props }, ref) => (
    <Typography {...props} variant={block ? "code-block" : "code"} ref={ref} />
  )
)
Code.displayName = "Code"

export { Typography, Heading, Text, Caption, Code, typographyVariants } 