import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const levelStyles: Record<HeadingLevel, string> = {
  1: "text-[var(--hive-font-size-display-lg)] leading-[var(--hive-line-height-tight)]",
  2: "text-[var(--hive-font-size-display-md)] leading-[var(--hive-line-height-tight)]",
  3: "text-[var(--hive-font-size-display-sm)] leading-[var(--hive-line-height-tight)]",
  4: "text-[var(--hive-font-size-heading-xl)] leading-[var(--hive-line-height-snug)]",
  5: "text-[var(--hive-font-size-heading-lg)] leading-[var(--hive-line-height-normal)]",
  6: "text-[var(--hive-font-size-heading-md)] leading-[var(--hive-line-height-normal)]",
};

const headingVariants = cva(
  "[font-family:var(--hive-font-family-sans,'Geist Sans',system-ui,sans-serif)] antialiased tracking-tight text-[var(--hive-text-primary)]",
  {
    variants: {
      tone: {
        primary: "text-[var(--hive-text-primary)]",
        secondary: "text-[var(--hive-text-secondary)]",
        muted: "text-[var(--hive-text-muted)]",
        inverse: "text-[var(--hive-text-inverse)]",
        accent: "text-[var(--hive-brand-primary)]",
      },
      align: {
        start: "text-left",
        center: "text-center",
        end: "text-right",
      },
      weight: {
        medium: "font-[var(--hive-font-weight-medium,500)]",
        semibold: "font-[var(--hive-font-weight-semibold,600)]",
        bold: "font-[var(--hive-font-weight-bold,700)]",
      },
      uppercase: {
        true: "uppercase tracking-[0.18em]",
      },
    },
    defaultVariants: {
      tone: "primary",
      align: "start",
      weight: "semibold",
    },
  }
);

type HeadingVariantProps = VariantProps<typeof headingVariants>;

export interface HeadingProps
  extends Omit<
    React.HTMLAttributes<HTMLHeadingElement>,
    "color" | "children"
  >,
    HeadingVariantProps {
  level?: HeadingLevel;
  children: React.ReactNode;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 2, children, tone, align, weight, uppercase, ...props }, ref) => {
    const Component = `h${level}` as keyof JSX.IntrinsicElements;
    const defaultWeight: HeadingVariantProps["weight"] =
      weight ?? (level <= 3 ? "semibold" : "medium");

    return (
      <Component
        ref={ref as never}
        className={cn(
          levelStyles[level],
          headingVariants({
            tone,
            align,
            weight: defaultWeight,
            uppercase,
          }),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Heading.displayName = "Heading";

export { headingVariants };
