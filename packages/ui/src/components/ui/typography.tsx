'use client';

import * as React from "react";
import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// HIVE Typography System - Semantic Token Perfection
// Uses only semantic tokens - zero hardcoded values

const headingVariants = cva(
  "font-sans font-semibold tracking-tight text-[var(--hive-text-primary)]",
  {
    variants: {
      level: {
        1: "text-6xl leading-tight", // Hero headings
        2: "text-5xl leading-tight", // Page headings
        3: "text-4xl leading-snug",  // Section headings
        4: "text-3xl leading-snug",  // Subsection headings
        5: "text-2xl leading-normal", // Component headings
        6: "text-xl leading-normal",  // Small headings
      },
      color: {
        primary: "text-[var(--hive-text-primary)]",
        secondary: "text-[var(--hive-text-secondary)]",
        tertiary: "text-[var(--hive-text-tertiary)]",
        brand: "text-[var(--hive-brand-secondary)]",
        success: "text-[var(--hive-status-success)]",
        error: "text-[var(--hive-status-error)]",
        warning: "text-[var(--hive-status-warning)]",
        info: "text-[var(--hive-status-info)]",
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
      level: 2,
      color: "primary",
      weight: "semibold",
    },
  }
);

const textVariants = cva(
  "font-sans text-[var(--hive-text-primary)]",
  {
    variants: {
      size: {
        xs: "text-xs leading-relaxed",
        sm: "text-sm leading-relaxed", 
        base: "text-base leading-relaxed",
        lg: "text-lg leading-relaxed",
        xl: "text-xl leading-relaxed",
      },
      color: {
        primary: "text-[var(--hive-text-primary)]",
        secondary: "text-[var(--hive-text-secondary)]",
        tertiary: "text-[var(--hive-text-tertiary)]",
        disabled: "text-[var(--hive-text-disabled)]",
        brand: "text-[var(--hive-brand-secondary)]",
        success: "text-[var(--hive-status-success)]",
        error: "text-[var(--hive-status-error)]",
        warning: "text-[var(--hive-status-warning)]",
        info: "text-[var(--hive-status-info)]",
        inverse: "text-[var(--hive-text-inverse)]",
      },
      weight: {
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium", 
        semibold: "font-semibold",
        bold: "font-bold",
      },
      decoration: {
        none: "no-underline",
        underline: "underline",
        "line-through": "line-through",
      }
    },
    defaultVariants: {
      size: "base",
      color: "primary", 
      weight: "normal",
      decoration: "none",
    },
  }
);

const captionVariants = cva(
  "font-sans text-xs text-[var(--hive-text-tertiary)] leading-relaxed",
  {
    variants: {
      color: {
        tertiary: "text-[var(--hive-text-tertiary)]",
        disabled: "text-[var(--hive-text-disabled)]", 
        brand: "text-[var(--hive-brand-secondary)]",
        success: "text-[var(--hive-status-success)]",
        error: "text-[var(--hive-status-error)]",
        warning: "text-[var(--hive-status-warning)]",
        info: "text-[var(--hive-status-info)]",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
      }
    },
    defaultVariants: {
      color: "tertiary",
      weight: "normal",
    },
  }
);

const linkVariants = cva(
  "font-sans text-[var(--hive-brand-secondary)] underline-offset-4 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)] rounded-sm",
  {
    variants: {
      color: {
        brand: "text-[var(--hive-brand-secondary)] hover:text-[color-mix(in_srgb,var(--hive-brand-secondary)_80%,transparent)]",
        primary: "text-[var(--hive-text-primary)] hover:text-[var(--hive-brand-secondary)]",
        secondary: "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]",
        tertiary: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-secondary)]",
      },
      decoration: {
        always: "underline",
        hover: "no-underline hover:underline",
        none: "no-underline",
      }
    },
    defaultVariants: {
      color: "brand",
      decoration: "hover",
    },
  }
);

// Heading Component
export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 2, color, weight, as, ...props }, ref) => {
    const Component = as || (`h${level}` as keyof JSX.IntrinsicElements);
    
    return React.createElement(Component, {
      ref,
      className: cn(headingVariants({ level, color, weight }), className),
      ...props,
    })
  }
);
Heading.displayName = "Heading";

// Text Component
export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div" | "label"
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, size, color, weight, decoration, as = "p", ...props }, ref) => {
    return React.createElement(as, {
      ref,
      className: cn(textVariants({ size, color, weight, decoration }), className),
      ...props,
    })
  }
);
Text.displayName = "Text";

// Caption Component
export interface CaptionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof captionVariants> {
  as?: "p" | "span" | "div" | "figcaption"
}

export const Caption = React.forwardRef<HTMLElement, CaptionProps>(
  ({ className, color, weight, as = "p", ...props }, ref) => {
    return React.createElement(as, {
      ref,
      className: cn(captionVariants({ color, weight }), className),
      ...props,
    })
  }
);
Caption.displayName = "Caption";

// Link Component
export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'>,
    VariantProps<typeof linkVariants> {}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, color, decoration, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(linkVariants({ color, decoration }), className)}
        {...props}
      />
    )
  }
);
Link.displayName = "Link";

// Code Component
export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "inline" | "block"
}

export const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, variant = "inline", ...props }, ref) => {
    const baseClasses = "font-mono text-[var(--hive-text-primary)] bg-[color-mix(in_srgb,var(--hive-interactive-hover)_60%,transparent)] rounded-sm";
    
    if (variant === "block") {
      return (
        <pre
          ref={ref as React.Ref<HTMLPreElement>}
          className={cn(
            baseClasses,
            "block p-4 overflow-x-auto border border-[var(--hive-border-default)]",
            className
          )}
          {...props}
        />
      )
    }
    
    return (
      <code
        ref={ref as React.Ref<HTMLElement>}
        className={cn(baseClasses, "px-1.5 py-0.5", className)}
        {...props}
      />
    )
  }
);
Code.displayName = "Code";

// Blockquote Component
export interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {}

export const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ className, ...props }, ref) => {
    return (
      <blockquote
        ref={ref}
        className={cn(
          "border-l-4 border-[var(--hive-brand-secondary)] pl-6 italic text-[var(--hive-text-secondary)]",
          className
        )}
        {...props}
      />
    )
  }
);
Blockquote.displayName = "Blockquote";

// List Components
export interface ListProps extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  variant?: "unordered" | "ordered"
}

export const List = React.forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  ({ className, variant = "unordered", ...props }, ref) => {
    const Component = variant === "ordered" ? "ol" : "ul";
    
    return React.createElement(Component, {
      ref,
      className: cn(
        "space-y-2 text-[var(--hive-text-primary)]",
        variant === "unordered" && "list-disc list-inside",
        variant === "ordered" && "list-decimal list-inside",
        className
      ),
      ...props,
    })
  }
);
List.displayName = "List";

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {}

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn("text-[var(--hive-text-primary)]", className)}
        {...props}
      />
    )
  }
);
ListItem.displayName = "ListItem";

// Typography Presets for common patterns
export const TypographyPresets = {
  // Page Title
  PageTitle: (props: Omit<HeadingProps, 'level'>) => (
    <Heading level={1} weight="bold" {...props} />
  ),
  
  // Section Title  
  SectionTitle: (props: Omit<HeadingProps, 'level'>) => (
    <Heading level={2} weight="semibold" {...props} />
  ),
  
  // Card Title
  CardTitle: (props: Omit<HeadingProps, 'level'>) => (
    <Heading level={3} weight="medium" {...props} />
  ),
  
  // Body Text
  Body: (props: Omit<TextProps, 'size'>) => (
    <Text size="base" {...props} />
  ),
  
  // Small Text
  Small: (props: Omit<TextProps, 'size'>) => (
    <Text size="sm" color="secondary" {...props} />
  ),
  
  // Caption Text
  CaptionText: (props: Omit<CaptionProps, 'size'>) => (
    <Caption color="tertiary" {...props} />
  ),
  
  // Error Text
  ErrorText: (props: Omit<TextProps, 'color' | 'size'>) => (
    <Text size="sm" color="error" {...props} />
  ),
  
  // Success Text
  SuccessText: (props: Omit<TextProps, 'color' | 'size'>) => (
    <Text size="sm" color="success" {...props} />
  ),
  
  // Brand Text
  BrandText: (props: Omit<TextProps, 'color'>) => (
    <Text color="brand" weight="medium" {...props} />
  ),
};

// Export all variants for external use
export { headingVariants, textVariants, captionVariants, linkVariants };