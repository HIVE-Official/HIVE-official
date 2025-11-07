"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

export interface PercentSegment {
  id: string;
  label: string;
  value: number; // absolute value; percentages computed relative to total
  color?: string; // CSS color var or class override
}

export interface PercentBarProps extends React.HTMLAttributes<HTMLDivElement> {
  segments?: PercentSegment[];
  /** Optional single-value mode (0-100). When provided, segments may be omitted. */
  value?: number;
  total?: number;
  showLabels?: boolean;
  rounded?: boolean;
  ariaLabel?: string;
}

/** Horizontal segmented distribution bar with optional tooltips */
export function PercentBar({
  segments = [],
  value,
  total,
  showLabels = false,
  rounded = true,
  ariaLabel = "Distribution",
  className,
  ...props
}: PercentBarProps) {
  const isSingleValue = typeof value === "number" && segments.length === 0;
  const effectiveSegments: PercentSegment[] = isSingleValue
    ? [{ id: "value", label: "", value: Math.max(0, Math.min(100, value!)) }]
    : segments;

  const sum = (total ?? effectiveSegments.reduce((acc, s) => acc + (s.value || 0), 0)) || 1;
  const pct = (v: number) => Math.max(0, Math.min(100, (v / sum) * 100));

  return (
    <div className={cn("space-y-2", className)} {...props}>
      <div
        role="group"
        aria-label={ariaLabel}
        className={cn(
          "flex w-full overflow-hidden border bg-[color-mix(in_srgb,var(--hive-background-overlay,#0C0D11)_25%,transparent)]",
          "border-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39)_65%,transparent)]",
          rounded ? "rounded-full" : "rounded-md"
        )}
      >
        <TooltipProvider>
          {effectiveSegments.map((s, i) => (
            <Tooltip key={s.id || i}>
              <TooltipTrigger asChild>
                <div
                  role="img"
                  aria-label={s.label ? `${s.label}: ${Math.round(pct(s.value))}%` : `${Math.round(pct(s.value))}%`}
                  className={cn("h-3", i === 0 ? "" : "border-l border-black/10")}
                  style={{
                    width: `${pct(s.value)}%`,
                    background:
                      s.color || segmentPalette[i % segmentPalette.length],
                  }}
                />
              </TooltipTrigger>
              {s.label && (
                <TooltipContent>
                  <div className="text-xs">
                    <strong>{s.label}</strong>: {Math.round(pct(s.value))}% ({s.value})
                  </div>
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
      {showLabels && effectiveSegments.some((s) => s.label) && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--hive-text-secondary)]">
          {effectiveSegments.map((s, i) => (
            s.label ? (
              <div key={`${s.id ?? i}-label`} className="inline-flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-sm"
                  style={{ background: s.color || segmentPalette[i % segmentPalette.length] }}
                />
                <span>
                  {s.label} · {Math.round(pct(s.value))}%
                </span>
              </div>
            ) : null
          ))}
        </div>
      )}
    </div>
  );
}

const segmentPalette = [
  "var(--hive-brand-primary)",
  "var(--hive-status-success)",
  "var(--hive-status-warning)",
  "var(--hive-status-error)",
  "var(--hive-text-secondary)",
];

/** Alias for voting scenarios */
export function VoteBar(props: PercentBarProps) {
  return <PercentBar ariaLabel={props.ariaLabel ?? "Vote distribution"} {...props} />;
}
