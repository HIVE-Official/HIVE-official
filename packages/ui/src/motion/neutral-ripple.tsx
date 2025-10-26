"use client";
import * as React from "react";
import { useReducedMotion } from "./use-reduced-motion";
import { cn } from "@/utils/cn";

export interface NeutralRippleProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
}

export function NeutralRipple({ disabled, className, children, ...rest }: NeutralRippleProps) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (reduced || disabled) return;
    const root = ref.current;
    if (!root) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!(e.target instanceof Element)) return;
      const target = root;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 1.2;
      const ripple = document.createElement("span");
      ripple.className = "ripple-overlay";
      ripple.style.setProperty("--ripple-x", `${x}px`);
      ripple.style.setProperty("--ripple-y", `${y}px`);
      ripple.style.setProperty("--ripple-size", `${size}px`);
      target.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    };
    root.addEventListener("pointerdown", onPointerDown);
    return () => root.removeEventListener("pointerdown", onPointerDown);
  }, [reduced, disabled]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)} {...rest}>
      {children}
    </div>
  );
}

