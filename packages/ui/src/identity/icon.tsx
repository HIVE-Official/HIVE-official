import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const wrapperVariants = cva(
  "relative inline-flex shrink-0 select-none items-center justify-center align-middle transition-transform duration-200 ease-out",
  {
    variants: {
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        md: "h-9 w-9",
        lg: "h-10 w-10",
      },
      shape: {
        circle: "rounded-full",
        rounded: "rounded-lg",
      },
      surface: {
        none: "",
        soft: "shadow-[0_0_0_1px_transparent]",
        solid: "",
        glass: "backdrop-blur-md shadow-[0_0_0_1px_transparent]",
        outline: "shadow-[0_0_0_1px_transparent]",
      },
      interactive: {
        false: "",
        true: "cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hive-interactive-focus,#FACC15)] hover:-translate-y-0.5",
      },
      disabled: {
        true: "pointer-events-none opacity-40",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
      surface: "none",
      interactive: false,
    },
  }
);

const toneColor: Record<
  Tone,
  string
> = {
  primary: "var(--hive-text-primary)",
  secondary: "var(--hive-text-secondary)",
  muted: "var(--hive-text-muted)",
  inverse: "var(--hive-text-inverse)",
  accent: "var(--hive-brand-primary)",
  success: "var(--hive-status-success)",
  warning: "var(--hive-status-warning)",
  danger: "var(--hive-status-error)",
};

type Tone =
  | "primary"
  | "secondary"
  | "muted"
  | "inverse"
  | "accent"
  | "success"
  | "warning"
  | "danger";

type Surface = "none" | "soft" | "solid" | "glass" | "outline";

const iconSizeClass = {
  xs: "h-3.5 w-3.5",
  sm: "h-4 w-4",
  md: "h-4.5 w-4.5",
  lg: "h-5 w-5",
} as const;

export interface IconProps
  extends Omit<React.SVGProps<SVGSVGElement>, "ref" | "color">,
    VariantProps<typeof wrapperVariants> {
  as?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  tone?: Tone;
  surface?: Surface;
  iconClassName?: string;
  strokeWidth?: number;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      as: Component,
      className,
      iconClassName,
      tone = "primary",
      surface = "none",
      shape,
      size = "md",
      interactive,
      disabled,
      strokeWidth = 1.8,
      children,
      role,
      "aria-label": ariaLabel,
      style,
      ...props
    },
    ref
  ) => {
    const wrapperClass = cn(
      wrapperVariants({
        size,
        shape,
        surface,
        interactive: interactive ? true : false,
        disabled,
      }),
      className
    );

    const svgClasses = cn(
      "transition-colors duration-200",
      iconSizeClass[size],
      iconClassName
    );

    const toneValue = toneColor[tone] ?? toneColor.primary;

    const surfaceStyle: React.CSSProperties = {};

    switch (surface) {
      case "soft":
        surfaceStyle.background = `color-mix(in srgb, ${toneValue} 14%, transparent)`;
        surfaceStyle.boxShadow = `0 0 0 1px color-mix(in srgb, ${toneValue} 35%, transparent)`;
        break;
      case "solid":
        surfaceStyle.background = `color-mix(in srgb, ${toneValue} 82%, var(--hive-background-primary))`;
        surfaceStyle.color = "var(--hive-background-primary)";
        break;
      case "glass":
        surfaceStyle.background = `color-mix(in srgb, ${toneValue} 18%, rgba(12,12,14,0.35))`;
        surfaceStyle.boxShadow = `0 0 0 1px color-mix(in srgb, ${toneValue} 32%, transparent)`;
        break;
      case "outline":
        surfaceStyle.boxShadow = `0 0 0 1px color-mix(in srgb, ${toneValue} 65%, transparent)`;
        break;
      default:
        break;
    }

    const mergedStyle: React.CSSProperties = {
      color: toneValue,
      ...surfaceStyle,
      ...style,
    };

    const ariaHidden = ariaLabel ? undefined : true;
    const computedRole = role ?? (ariaLabel ? "img" : undefined);

    const content = Component ? (
      <Component
        ref={ref}
        className={svgClasses}
        role={computedRole}
        aria-hidden={ariaHidden}
        aria-label={ariaLabel}
        strokeWidth={strokeWidth}
        {...props}
      />
    ) : (
      <svg
        ref={ref}
        className={svgClasses}
        role={computedRole}
        aria-hidden={ariaHidden}
        aria-label={ariaLabel}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        {children ?? <circle cx="12" cy="12" r="8" />}
      </svg>
    );

    return (
      <span className={wrapperClass} style={mergedStyle}>
        {content}
      </span>
    );
  }
);
Icon.displayName = "Icon";

export { wrapperVariants as iconWrapperVariants };
