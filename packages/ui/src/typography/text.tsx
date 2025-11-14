import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textVariants = cva(
  "[font-family:var(--hive-font-family-sans,'Geist Sans',system-ui,sans-serif)] antialiased text-[var(--hive-text-primary)] transition-colors duration-150",
  {
    variants: {
      size: {
        xs: "text-[var(--hive-font-size-body-xs)] leading-[var(--hive-line-height-tight)]",
        sm: "text-[var(--hive-font-size-body-sm)] leading-[var(--hive-line-height-snug)]",
        md: "text-[var(--hive-font-size-body-md)] leading-[var(--hive-line-height-normal)]",
        lg: "text-[var(--hive-font-size-body-lg)] leading-[var(--hive-line-height-relaxed)]",
        xl: "text-[var(--hive-font-size-heading-md)] leading-[var(--hive-line-height-relaxed)]",
        "display-sm": "text-[var(--hive-font-size-display-sm)] leading-[var(--hive-line-height-tight)]",
        "display-md": "text-[var(--hive-font-size-display-md)] leading-[var(--hive-line-height-tight)]",
        "display-lg": "text-[var(--hive-font-size-display-lg)] leading-[var(--hive-line-height-tight)]",
      },
      tone: {
        primary: "text-[var(--hive-text-primary)]",
        secondary: "text-[var(--hive-text-secondary)]",
        muted: "text-[var(--hive-text-muted)]",
        tertiary: "text-[var(--hive-text-tertiary)]",
        inverse: "text-[var(--hive-text-inverse)]",
        accent: "text-[var(--hive-brand-primary)]",
        success: "text-[var(--hive-status-success)]",
        warning: "text-[var(--hive-status-warning)]",
        danger: "text-[var(--hive-status-error)]",
      },
      weight: {
        light: "font-[var(--hive-font-weight-light,300)]",
        regular: "font-[var(--hive-font-weight-normal,400)]",
        medium: "font-[var(--hive-font-weight-medium,500)]",
        semibold: "font-[var(--hive-font-weight-semibold,600)]",
        bold: "font-[var(--hive-font-weight-bold,700)]",
      },
      align: {
        start: "text-left",
        center: "text-center",
        end: "text-right",
        justify: "text-justify",
      },
      leading: {
        tight: "leading-[var(--hive-line-height-tight)]",
        snug: "leading-[var(--hive-line-height-snug)]",
        normal: "leading-[var(--hive-line-height-normal)]",
        relaxed: "leading-[var(--hive-line-height-relaxed)]",
        loose: "leading-[var(--hive-line-height-loose)]",
      },
      uppercase: {
        true: "uppercase tracking-[0.18em]",
      },
      tracking: {
        normal: "",
        wide: "tracking-[0.08em]",
        wider: "tracking-[0.16em]",
      },
      truncate: {
        true: "truncate",
      },
    },
    defaultVariants: {
      size: "md",
      tone: "primary",
      weight: "regular",
      align: "start",
      leading: "normal",
      tracking: "normal",
    },
  }
);

type TextVariantProps = VariantProps<typeof textVariants>;
type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>["ref"];

type PolymorphicTextProps<T extends React.ElementType> = {
  as?: T;
} & TextVariantProps &
  Omit<React.ComponentPropsWithoutRef<T>, keyof TextVariantProps | "as">;

export type TextProps<T extends React.ElementType = "p"> =
  PolymorphicTextProps<T>;

export const Text = React.forwardRef(
  <T extends React.ElementType = "p">(
    {
      as,
      className,
      size,
      tone,
      weight,
      align,
      leading,
      uppercase,
      tracking,
      truncate,
      ...props
    }: TextProps<T>,
    ref: PolymorphicRef<T>
  ) => {
    const Component = (as ?? "p") as React.ElementType;

    return (
      <Component
        ref={ref}
        className={cn(
          textVariants({
            size,
            tone,
            weight,
            align,
            leading,
            uppercase,
            tracking,
            truncate,
          }),
          className
        )}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

export { textVariants };
