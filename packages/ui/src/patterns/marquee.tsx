"use client";
import * as React from "react";
import { cn } from "@/utils/cn";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
  gap?: number; // px gap between items
}

export function Marquee({ speed = "normal", pauseOnHover = true, gap = 24, className, children, ...rest }: MarqueeProps) {
  const cls = cn("marquee", speed === "slow" && "marquee-slow", speed === "fast" && "marquee-fast", className);
  const trackStyle: React.CSSProperties = { columnGap: `${gap}px` } as any;
  return (
    <div className={cls} {...rest}>
      <div className={cn("marquee-track", pauseOnHover && "hover:[animation-play-state:paused]") as any} style={trackStyle}>
        <div className="flex" style={trackStyle} aria-hidden>{children}</div>
        <div className="flex" style={trackStyle} aria-hidden>{children}</div>
      </div>
    </div>
  );
}

