"use client";

import type { ReactNode } from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../atoms/card";
import { cn } from "../../../lib/utils";

export interface StatCardProps {
  label: string;
  value: ReactNode;
  delta?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

/**
 * Elevated stat card with optional delta and icon slot.
 */
export function StatCard({
  label,
  value,
  delta,
  icon,
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "relative w-full overflow-hidden rounded-[22px] border border-white/8 bg-[#111112]/90 shadow-[0_25px_65px_rgba(0,0,0,0.55)] ring-1 ring-white/5 backdrop-blur-xl",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[1px] rounded-[inherit] bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.12),transparent_55%)] opacity-80"
      />

      <CardHeader className="relative z-10 space-y-3 p-5 md:p-6">
        <div className="flex items-center justify-between text-sm font-medium text-[var(--hive-text-tertiary)]">
          <CardTitle className="text-sm font-medium tracking-wide text-[var(--hive-text-secondary)]">
            {label}
          </CardTitle>
          {icon ? (
            <div className="text-[var(--hive-text-muted)]">{icon}</div>
          ) : null}
        </div>

        <div className="text-3xl font-semibold text-[var(--hive-text-primary)] md:text-4xl">
          {value}
        </div>

        {delta ? (
          <CardDescription className="text-sm text-[var(--hive-text-secondary)]">
            {delta}
          </CardDescription>
        ) : null}
      </CardHeader>
    </Card>
  );
}

