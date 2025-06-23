import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// Heading variants following shadcn/ui patterns
const headingVariants = cva(
  "font-display tracking-tight scroll-m-20",
  {
    variants: {
      size: {
        "display": "text-display font-bold leading-none",
        "h1": "text-h1 font-bold leading-tight",
        "h2": "text-h2 font-semibold leading-tight",
        "h3": "text-h3 font-semibold leading-snug",
        "h4": "text-h4 font-medium leading-snug",
      },
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        accent: "text-accent-foreground",
        destructive: "text-destructive",
      }
    },
    defaultVariants: {
      size: "h2",
      variant: "default",
    },
  }
);

// Text variants following shadcn/ui patterns
const textVariants = cva(
  "font-sans",
  {
    variants: {
      size: {
        "lg": "text-lg leading-relaxed",
        "base": "text-base leading-relaxed",
        "sm": "text-sm leading-normal", 
        "xs": "text-xs leading-normal",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
      },
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        accent: "text-accent-foreground",
        destructive: "text-destructive",
      }
    },
    defaultVariants: {
      size: "base",
      weight: "normal", 
      variant: "default",
    },
  }
);

// Code variants for monospace text
const codeVariants = cva(
  "font-mono relative rounded bg-muted px-[0.3rem] py-[0.2rem] text-sm",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Heading component
export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  asChild?: boolean;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "h2";
    return (
      <Comp
        className={cn(headingVariants({ size, variant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

// Text component  
export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  asChild?: boolean;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, weight, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "p";
    return (
      <Comp
        className={cn(textVariants({ size, weight, variant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

// Code component
export interface CodeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof codeVariants> {
  asChild?: boolean;
}

const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "code";
    return (
      <Comp
        className={cn(codeVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Code.displayName = "Code";

// Legacy Typography component for backward compatibility
const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "font-display text-h1 font-bold",
      h2: "font-display text-h2 font-semibold", 
      h3: "font-display text-h3 font-semibold",
      h4: "font-display text-h4 font-medium",
      body: "font-sans text-body",
      "body-sm": "font-sans text-body-sm",
      caption: "font-sans text-caption text-muted",
      button: "font-sans text-button font-medium",
      code: "font-mono text-code",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
  as?: React.ElementType;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, asChild = false, as, ...props }, ref) => {
    const variantMapping = {
      h1: "h1", h2: "h2", h3: "h3", h4: "h4",
      body: "p", "body-sm": "p", caption: "span", 
      button: "span", code: "code",
    };
    
    const Comp = asChild ? Slot : (as || (variant ? variantMapping[variant] : "p"));
    return (
      <Comp
        className={cn(typographyVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Typography.displayName = "Typography";

export { 
  Heading, 
  Text, 
  Code,
  Typography, 
  headingVariants, 
  textVariants, 
  codeVariants,
  typographyVariants 
};
