// Bounded Context Owner: Identity & Access Management Guild
"use client";

import { useEffect, useRef } from "react";

type PointerSpotlightProps = {
  readonly disabled?: boolean;
};

export function PointerSpotlight({ disabled }: PointerSpotlightProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const spotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disabled) return;
    const move = (e: MouseEvent) => {
      const el = spotRef.current;
      if (!el) return;
      const x = e.clientX - 350; // center 700px wide element
      const y = e.clientY - 250; // center 500px tall element
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [disabled]);

  if (disabled) return null;

  return (
    <div ref={wrapperRef} className="absolute inset-0 pointer-events-none" aria-hidden>
      <div
        ref={spotRef}
        className="h-[500px] w-[700px] rounded-full bg-[radial-gradient(350px_250px_at_center,rgba(255,196,26,0.08),transparent_60%)] will-change-transform"
        style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
      />
    </div>
  );
}
