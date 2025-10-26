"use client";
import * as React from "react";
import { useReducedMotion } from "./use-reduced-motion";

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

export interface CountUpProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  durationMs?: number;
  from?: number;
  formatter?: (n: number) => string;
}

export function CountUp({ value, durationMs = 1200, from = 0, formatter, ...rest }: CountUpProps) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = React.useState(from);
  const startRef = React.useRef<number | null>(null);
  const fromRef = React.useRef(from);
  const valueRef = React.useRef(value);

  React.useEffect(() => { valueRef.current = value; }, [value]);

  React.useEffect(() => {
    if (reduced) { setDisplay(value); return; }
    startRef.current = null;
    let raf = 0;
    const step = (ts: number) => {
      if (startRef.current == null) startRef.current = ts;
      const p = Math.min(1, (ts - startRef.current) / durationMs);
      const eased = easeOutCubic(p);
      const next = fromRef.current + (valueRef.current - fromRef.current) * eased;
      setDisplay(next);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, durationMs, reduced]);

  const text = formatter ? formatter(display) : Math.round(display).toLocaleString();
  return <span {...rest}>{text}</span>;
}

