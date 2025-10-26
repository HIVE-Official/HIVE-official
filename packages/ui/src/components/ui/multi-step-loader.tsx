"use client";

import * as React from "react";
import { cn } from "@/utils/cn";
import "./multi-step-loader.css";

export type MultiStepLoaderProps = {
  steps?: readonly string[];
  current?: number; // 1-based index for aria; defaults to 1
  size?: "sm" | "md" | "lg";
  className?: string;
  "aria-label"?: string;
};

const sizeVars: Record<NonNullable<MultiStepLoaderProps["size"]>, string> = {
  sm: "8px",
  md: "10px",
  lg: "12px",
};

export function MultiStepLoader({
  steps = ["Preparing", "Syncing", "Finishing"],
  current = 1,
  size = "md",
  className,
  "aria-label": ariaLabel = "Loading",
}: MultiStepLoaderProps): JSX.Element {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const isReduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  React.useEffect(() => {
    if (isReduced) {
      setActiveIndex(steps.length - 1);
      return;
    }
    let i = 0;
    setActiveIndex(0);
    const tick = () => {
      i = Math.min(i + 1, steps.length - 1);
      setActiveIndex(i);
      if (i < steps.length - 1) {
        timeout = window.setTimeout(tick, 320);
      }
    };
    let timeout = window.setTimeout(tick, 40);
    return () => window.clearTimeout(timeout);
  }, [steps.length, isReduced]);

  const valueNow = Math.max(1, Math.min(current, steps.length));

  return (
    <div
      className={cn("msl-root flex w-full flex-col gap-3", className)}
      style={{
        // size token mapping
        // @ts-expect-error custom var OK
        "--msl-size": sizeVars[size],
      }}
      role="group"
      aria-label={ariaLabel}
    >
      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-valuenow={valueNow}
        aria-label={`${ariaLabel} — ${steps[valueNow - 1]}`}
        className="flex w-full flex-col gap-2"
      >
        {steps.map((label, idx) => (
          <div key={idx} className="msl-track">
            <div className={cn("msl-fill", idx > activeIndex && "hidden")}></div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-caption text-muted-foreground">
        <span aria-live="polite">{steps[Math.min(activeIndex, steps.length - 1)]}</span>
        <span>
          {valueNow} / {steps.length}
        </span>
      </div>
    </div>
  );
}

export default MultiStepLoader;

