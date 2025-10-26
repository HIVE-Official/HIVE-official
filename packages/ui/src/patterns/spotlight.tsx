"use client";
import * as React from "react";
import { cn } from "@/utils/cn";

export interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "radial" | "vertical" | "horizontal" | "cursor";
  intensity?: "low" | "medium" | "high";
  cursorSize?: number;
}

const INTENSITY_ALPHA: Record<NonNullable<SpotlightProps["intensity"]>, number> = {
  low: 0.06,
  medium: 0.08,
  high: 0.12
};

type CSSVars = React.CSSProperties & { [key: string]: string | number | undefined };

export function Spotlight({
  variant = "radial",
  intensity = "medium",
  cursorSize = 140,
  className,
  children,
  ...rest
}: SpotlightProps) {
  const alpha = INTENSITY_ALPHA[intensity] ?? 0.08;
  const [cursorPos, setCursorPos] = React.useState<{ x: number; y: number } | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const handlePointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (variant !== "cursor") return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setCursorPos({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    },
    [variant]
  );

  const handlePointerLeave = React.useCallback(() => {
    if (variant !== "cursor") return;
    setCursorPos(null);
  }, [variant]);

  const styleVars: CSSVars = {};
  if (variant === "cursor") {
    styleVars["--spotlight-x"] = cursorPos ? `${cursorPos.x}px` : "50%";
    styleVars["--spotlight-y"] = cursorPos ? `${cursorPos.y}px` : "50%";
    styleVars["--spotlight-size"] = `${cursorSize}px`;
    styleVars["--spotlight-alpha"] = alpha;
    styleVars["--spotlight-opacity"] = cursorPos ? 0.65 : 0;
  }

  return (
    <div
      ref={containerRef}
      className={cn("spotlight-wrapper relative isolate overflow-hidden", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={styleVars}
      {...rest}
    >
      {variant === "radial" && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-10"
          style={{
            backgroundImage: `radial-gradient(60% 50% at 50% 30%, rgba(255,255,255,${alpha}), transparent 70%)`
          }}
        />
      )}
      {variant === "vertical" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(255,255,255,${alpha}), transparent 60%)`
          }}
        />
      )}
      {variant === "horizontal" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(255,255,255,${alpha}), transparent 60%)`
          }}
        />
      )}
      {variant === "cursor" && (
        <div aria-hidden className="pointer-events-none absolute inset-0 spotlight-cursor-overlay" />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
