"use client";
import * as React from "react";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "./use-reduced-motion";

export type RevealDirection = "up" | "down" | "left" | "right" | "fade";

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: RevealDirection;
  delayMs?: number;
  threshold?: number; // 0..1
  once?: boolean;
  rootMargin?: string;
}

export function Reveal({
  direction = "up",
  delayMs = 0,
  threshold = 0.2,
  once = true,
  rootMargin = "0px 0px -10% 0px",
  className,
  children,
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = React.useState(false);

  React.useEffect(() => {
    if (reduced) { setRevealed(true); return; }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setRevealed(true); return; }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && e.intersectionRatio >= threshold) {
          setTimeout(() => setRevealed(true), delayMs);
          if (once) io.disconnect();
        } else if (!once) {
          setRevealed(false);
        }
      }
    }, { root: null, rootMargin, threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, threshold, rootMargin, delayMs, once]);

  return (
    <div
      ref={ref}
      data-revealed={revealed || undefined}
      className={cn("reveal", `reveal-${direction}`, className)}
      {...rest}
    >
      {children}
    </div>
  );
}

