"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

const SIZE_MAP: Record<string, number> = {
  xs: 16,
  sm: 24,
  default: 32,
  md: 36,
  lg: 48,
  xl: 64,
};

const COLOR_MAP = {
  white: "#FFFFFF",
  gold: "#FFD700",
  black: "#000000",
  currentColor: "currentColor",
} as const;

export interface HiveLogoProps extends React.SVGAttributes<SVGSVGElement> {
  /** Logo color variant */
  variant?: keyof typeof COLOR_MAP | "gradient";
  /** Standard size token or explicit pixel value */
  size?: number | keyof typeof SIZE_MAP;
  /** Render the HIVE wordmark alongside the hexagon */
  showText?: boolean;
  /** Additional styles for the outer wrapper when showText is true */
  wrapperClassName?: string;
  /** Additional styles for the wordmark when showText is true */
  wordmarkClassName?: string;
  /** Accessible label overrides */
  label?: string;
}

const HiveLogo = React.forwardRef<SVGSVGElement, HiveLogoProps>(
  (
    {
      className,
      variant = "gold",
      size = "default",
      showText = false,
      wrapperClassName,
      wordmarkClassName,
      label = "HIVE logo",
      ...props
    },
    ref
  ) => {
    const gradientId = React.useId();
    const resolvedSize = typeof size === "number" ? size : SIZE_MAP[size] ?? SIZE_MAP.default;
    const fillColor = variant === "gradient" ? `url(#${gradientId})` : COLOR_MAP[variant] ?? COLOR_MAP.gold;

    const mark = (
      <svg
        ref={ref}
        role="img"
        aria-label={label}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1500 1500"
        width={resolvedSize}
        height={resolvedSize}
        className={cn("transition-smooth ease-liquid", className)}
        {...props}
      >
        {variant === "gradient" && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE259" />
              <stop offset="50%" stopColor="#FFD000" />
              <stop offset="100%" stopColor="#FFA751" />
            </linearGradient>
          </defs>
        )}
        <path
          fill={fillColor}
          d="M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z"
        />
      </svg>
    );

    if (!showText) {
      return mark;
    }

    return (
      <span className={cn("inline-flex items-center gap-2", wrapperClassName)}>
        {mark}
        <span className={cn("text-base font-semibold tracking-wide uppercase text-white", wordmarkClassName)}>
          HIVE
        </span>
      </span>
    );
  }
);

HiveLogo.displayName = "HiveLogo";

export { HiveLogo };
