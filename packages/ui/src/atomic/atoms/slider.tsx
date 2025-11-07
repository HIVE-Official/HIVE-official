"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const sliderVariants = cva(
  "relative flex w-full touch-none select-none items-center",
  {
    variants: {
      size: {
        sm: "h-4",
        default: "h-5",
        lg: "h-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const sliderTrackVariants = cva(
  "relative h-1.5 w-full grow overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--hive-background-tertiary) 62%,#ffd700 22%)] transition-colors duration-150",
  {
    variants: {
      variant: {
        default: "",
        subtle: "bg-[color-mix(in_srgb,var(--hive-background-secondary) 65%,transparent)]",
        destructive: "",
        success: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const sliderRangeVariants = cva(
  "absolute h-full bg-[#ffd700] transition-all duration-150",
  {
    variants: {
      variant: {
        default: "",
        destructive: "bg-[var(--hive-status-error)]",
        success: "bg-[var(--hive-status-success)]",
        subtle: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const sliderThumbVariants = cva(
  "block h-4 w-4 rounded-full border border-[color-mix(in_srgb,var(--hive-border-default) 64%,#ffd700 26%)] bg-[color-mix(in_srgb,#181818 82%,#ffd700 12%)] shadow-[0_4px_12px_rgba(0,0,0,0.45)] transition-[transform,box-shadow,background,border] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,215,0,0.4)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-primary)] hover:-translate-y-[1px] data-[state=active]:scale-105 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "data-[state=active]:shadow-[0_8px_24px_rgba(255,215,0,0.24)] data-[state=active]:border-[#ffd700] data-[state=active]:bg-[color-mix(in_srgb,#ffd700 35%,var(--hive-background-primary) 65%)]",
        destructive: "border-[var(--hive-status-error)] bg-[color-mix(in_srgb,var(--hive-status-error) 88%,rgba(0,0,0,0.12))] data-[state=active]:shadow-[0_8px_22px_rgba(212,60,60,0.18)] data-[state=active]:bg-[color-mix(in_srgb,var(--hive-status-error) 42%,var(--hive-background-primary) 58%)]",
        success: "border-[var(--hive-status-success)] bg-[color-mix(in_srgb,var(--hive-status-success) 88%,rgba(0,0,0,0.12))] data-[state=active]:shadow-[0_8px_22px_rgba(51,178,73,0.18)] data-[state=active]:bg-[color-mix(in_srgb,var(--hive-status-success) 40%,var(--hive-background-primary) 60%)]",
        subtle: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    VariantProps<typeof sliderVariants> {
  variant?: "default" | "destructive" | "success" | "subtle";
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, size, variant = "default", ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(sliderVariants({ size }), className)}
    {...props}
  >
    <SliderPrimitive.Track className={sliderTrackVariants({ variant })}>
      <SliderPrimitive.Range className={sliderRangeVariants({ variant })} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={sliderThumbVariants({ variant })} />
  </SliderPrimitive.Root>
));

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider, sliderVariants, sliderTrackVariants, sliderRangeVariants, sliderThumbVariants };
