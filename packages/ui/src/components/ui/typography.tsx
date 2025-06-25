import { cn } from "../../lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

const headingVariants = cva("font-display tracking-tight text-foreground", {
  variants: {
    size: {
      display: "text-[64px] leading-[72px] font-semibold",
      h1: "text-[48px] leading-[56px] font-semibold",
      h2: "text-[32px] leading-[40px] font-semibold",
      h3: "text-[24px] leading-[32px] font-semibold",
      h4: "text-[20px] leading-[28px] font-semibold",
    },
  },
  defaultVariants: {
    size: "h1",
  },
});

const textVariants = cva("font-sans text-foreground", {
  variants: {
    size: {
      body: "text-[16px] leading-[24px]",
      "body-sm": "text-[14px] leading-[20px]",
      caption: "text-[12px] leading-[18px]",
      button: "text-[14px] leading-[20px] font-medium",
      code: "font-mono text-[14px] leading-[20px]",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    size: "body",
    weight: "normal",
  },
});

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, as = "h1", ...props }, ref) => {
    const Component = as;
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ size, className }))}
        {...props}
      />
    );
  }
);

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, weight, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(textVariants({ size, weight, className }))}
        {...props}
      />
    );
  }
);

Heading.displayName = "Heading";
Text.displayName = "Text";
