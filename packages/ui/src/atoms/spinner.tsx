// Bounded Context Owner: Design System Guild
import type { HTMLAttributes } from "react";
import { cn } from "../utils/cn";

export interface SpinnerProps extends HTMLAttributes<SVGElement> {
  size?: number;
  variant?: "default" | "brand" | "muted";
}

export function Spinner({ size = 16, variant = "brand", className, ...rest }: SpinnerProps) {
  const s = typeof size === "number" ? size : 16;
  const colorClass =
    variant === "brand"
      ? "text-primary"
      : variant === "muted"
        ? "text-foreground/55"
        : "text-foreground/70";
  return (
    <svg
      className={cn("animate-spin motion-reduce:animate-none", colorClass, className)}
      viewBox="0 0 24 24"
      width={s}
      height={s}
      role="progressbar"
      aria-hidden="true"
      {...rest}
    >
      <circle className="opacity-15" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
      <path className="opacity-90" d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}
