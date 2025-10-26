// Bounded Context Owner: Identity & Access Management Guild
"use client";

import type { PropsWithChildren } from "react";
import { cn } from "@hive/ui";

type BackdropStackProps = PropsWithChildren<{
  readonly className?: string;
}>;

export function BackdropStack({ children, className }: BackdropStackProps): JSX.Element {
  return (
    <div className={cn("pointer-events-none absolute inset-0 -z-10", className)} aria-hidden>
      {children}
    </div>
  );
}
