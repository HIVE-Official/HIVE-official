"use client";

import * as React from "react";
import { CheckCircle2, Circle, Dot, XCircle } from "lucide-react";
import { cn } from "../../lib/utils";

export type ProgressListState = "upcoming" | "active" | "done" | "blocked";

export interface ProgressListStep {
  id: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  state?: ProgressListState;
}

export interface ProgressListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  steps: ProgressListStep[];
  compact?: boolean;
}

export const ProgressList = React.forwardRef<HTMLUListElement, ProgressListProps>(
  function ProgressList({ steps, compact = false, className, ...props }, ref) {
    return (
      <ul
        ref={ref}
        className={cn("relative space-y-3", className)}
        {...props}
      >
        {steps.map((step, idx) => (
          <li key={step.id} className="relative pl-7">
            {idx < steps.length - 1 ? (
              <span
                aria-hidden
                className="absolute left-3.5 top-6 block h-[calc(100%-1.5rem)] w-px bg-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39)_60%,transparent)]"
              />
            ) : null}
            <StepIndicator state={step.state} />
            <div className="space-y-1">
              <div
                className={cn(
                  "text-sm font-medium",
                  step.state === "blocked"
                    ? "text-[var(--hive-status-error)]"
                    : step.state === "done"
                      ? "text-[var(--hive-text-primary)]"
                      : step.state === "active"
                        ? "text-[var(--hive-text-primary)]"
                        : "text-[var(--hive-text-secondary)]"
                )}
                aria-current={step.state === "active" ? "step" : undefined}
              >
                {step.label}
              </div>
              {!compact && step.description ? (
                <p className="text-sm text-[var(--hive-text-secondary)]">
                  {step.description}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    );
  }
);

interface StepIndicatorProps {
  state?: ProgressListState;
}

function StepIndicator({ state = "upcoming" }: StepIndicatorProps) {
  const base =
    "absolute left-0 top-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full border bg-[color-mix(in_srgb,var(--hive-background-overlay,#0C0D11)_35%,transparent)]";

  if (state === "done") {
    return (
      <span
        aria-hidden
        className={cn(
          base,
          "border-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15)_45%,var(--hive-border-subtle,#2E2F39))] text-[var(--hive-brand-primary)]"
        )}
      >
        <CheckCircle2 className="h-4 w-4" />
      </span>
    );
  }

  if (state === "active") {
    return (
      <span
        aria-hidden
        className={cn(
          base,
          "border-[color-mix(in_srgb,var(--hive-brand-primary,#FACC15)_45%,var(--hive-border-subtle,#2E2F39))] text-[var(--hive-brand-primary)]"
        )}
      >
        <Dot className="h-5 w-5" />
      </span>
    );
  }

  if (state === "blocked") {
    return (
      <span
        aria-hidden
        className={cn(
          base,
          "border-[color-mix(in_srgb,var(--hive-status-error,#EF4444)_45%,var(--hive-border-subtle,#2E2F39))] text-[var(--hive-status-error)]"
        )}
      >
        <XCircle className="h-4 w-4" />
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className={cn(
        base,
        "border-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39)_65%,transparent)] text-[var(--hive-text-secondary)]"
      )}
    >
      <Circle className="h-4 w-4" />
    </span>
  );
}
