"use client";

import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};

export function useCountdown(target: number): CountdownParts {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const remaining = Math.max(0, target - now);
  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);
  return { days, hours, minutes, seconds, completed: remaining === 0 };
}

export function Countdown({
  target,
  className,
  label = ["Days", "Hours", "Minutes", "Seconds"],
}: {
  target: number; // UTC ms
  className?: string;
  label?: [string, string, string, string];
}) {
  const t = useCountdown(target);
  return (
    <div className={cn("grid grid-cols-4 gap-3 rounded-2xl border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] p-5", className)} aria-live="polite">
      {(
        [
          { l: label[0], v: t.days },
          { l: label[1], v: t.hours },
          { l: label[2], v: t.minutes },
          { l: label[3], v: t.seconds },
        ] as const
      ).map((p) => (
        <div key={p.l} className="flex flex-col items-center">
          <div className="text-3xl font-semibold tabular-nums text-[var(--hive-text-primary)]">{String(p.v).padStart(2, "0")}</div>
          <div className="mt-1 text-xs uppercase tracking-wider text-[var(--hive-text-tertiary)]">{p.l}</div>
        </div>
      ))}
    </div>
  );
}
