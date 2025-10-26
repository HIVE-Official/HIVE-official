// Bounded Context Owner: Identity & Access Management Guild
"use client";
import type { PropsWithChildren } from "react";
import { cn } from "@hive/ui";

interface GradientBackdropProps extends PropsWithChildren {
  readonly className?: string;
}

export const GradientBackdrop = ({ children, className }: GradientBackdropProps): JSX.Element => (
  <div
    className={cn(
      "relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-background/95 to-background",
      className
    )}
  >
    <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(700px_400px_at_15%_0%,hsl(var(--primary)/0.18)_0,transparent_70%)]" />
    <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(600px_300px_at_85%_15%,hsl(var(--primary)/0.15)_0,transparent_70%)]" />
    {children}
  </div>
);
