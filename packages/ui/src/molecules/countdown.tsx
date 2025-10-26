// Bounded Context Owner: Design System Guild
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../utils/cn";

export interface CountdownProps {
  readonly target: string | Date; // ISO string or Date
  readonly serverNow?: number; // ms since epoch (to correct client drift)
  readonly className?: string;
  readonly size?: "sm" | "md" | "lg";
  readonly label?: string;
}

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
}

const sizeClasses = {
  sm: {
    value: "text-h3 font-h3",
    label: "text-label font-label uppercase"
  },
  md: {
    value: "text-h1 font-h1",
    label: "text-label font-label uppercase"
  },
  lg: {
    value: "text-display font-display",
    label: "text-label font-label uppercase"
  }
} as const;

export const Countdown = ({ target, serverNow, className, size = "md", label }: CountdownProps): JSX.Element => {
  const targetTs = useMemo(() => (target instanceof Date ? target.getTime() : new Date(target).getTime()), [target]);
  const firstClientNow = useRef<number | null>(null);
  const [now, setNow] = useState<number>(() => (typeof serverNow === "number" ? serverNow : Date.now()));

  useEffect(() => {
    // Align ticking to the next exact second boundary for visual crispness
    if (firstClientNow.current === null) {
      firstClientNow.current = Date.now();
    }
    const getCorrectedNow = () => {
      if (typeof serverNow === "number" && firstClientNow.current !== null) {
        const delta = Date.now() - firstClientNow.current;
        return serverNow + delta;
      }
      return Date.now();
    };

    let timer: ReturnType<typeof setTimeout> | null = null;
    const tick = () => {
      setNow(getCorrectedNow());
      const nextIn = 1000 - (Date.now() % 1000);
      timer = setTimeout(tick, nextIn);
    };
    // initial alignment
    const initialDelay = 1000 - (Date.now() % 1000);
    timer = setTimeout(tick, initialDelay);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [serverNow]);

  const remaining = useMemo<Remaining>(() => {
    const totalMs = Math.max(0, targetTs - now);
    const seconds = Math.floor((totalMs / 1000) % 60);
    const minutes = Math.floor((totalMs / (1000 * 60)) % 60);
    const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
    const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
    return { days, hours, minutes, seconds, totalMs };
  }, [now, targetTs]);

  const styles = sizeClasses[size];

  return (
    <div className={cn("flex flex-col items-center gap-3", className)} aria-live="off" role="timer">
      {label ? <span className="text-label font-label uppercase text-muted-foreground">{label}</span> : null}
      <div className="flex items-stretch gap-2 sm:gap-3">
        <Segment value={remaining.days} suffix="Days" valueClass={styles.value} labelClass={styles.label} />
        <Separator />
        <Segment value={remaining.hours} suffix="Hours" valueClass={styles.value} labelClass={styles.label} />
        <Separator />
        <Segment value={remaining.minutes} suffix="Minutes" valueClass={styles.value} labelClass={styles.label} />
        <Separator />
        <Segment value={remaining.seconds} suffix="Seconds" valueClass={styles.value} labelClass={styles.label} />
      </div>
    </div>
  );
};

const Segment = ({ value, suffix, valueClass, labelClass }: { value: number; suffix: string; valueClass: string; labelClass: string }) => (
  <div className="flex min-w-[64px] flex-col items-center rounded-card border border-border/60 bg-background/80 px-3 py-2 text-foreground shadow-subtle">
    <div className={cn("text-numeric", valueClass)}>{value.toString().padStart(2, "0")}</div>
    <div className={cn("mt-1 text-muted-foreground", labelClass)}>{suffix}</div>
  </div>
);

const Separator = () => <div className="flex items-center text-foreground/50">:</div>;
