// Bounded Context Owner: Identity & Access Management Guild
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export interface StepDescriptor {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
}

export interface StepperHeaderProps {
  readonly steps: readonly StepDescriptor[];
  readonly activeStepId: string;
  readonly completedStepIds?: readonly string[];
  readonly className?: string;
  readonly renderAction?: (_step: StepDescriptor) => ReactNode;
  /** Optional accent palette. "gold" uses Hive gold (#FFD700). */
  readonly accent?: "primary" | "gold";
}

export const StepperHeader = ({
  steps,
  activeStepId,
  completedStepIds = [],
  className,
  renderAction,
  accent = "primary"
}: StepperHeaderProps): JSX.Element => {
  const safeSteps = Array.isArray(steps) ? steps : [];
  const isGold = accent === "gold";
  return (
    <ol
      className={cn(
        "flex flex-wrap items-start gap-4 rounded-xl border border-border bg-card/60 p-4 sm:flex-nowrap sm:gap-6",
        className
      )}
    >
      {safeSteps.map((step, index) => {
        const position = index + 1;
        const isActive = step.id === activeStepId;
        const isCompleted = completedStepIds.includes(step.id);
        return (
          <li key={step.id} className="flex min-w-[180px] flex-1 items-start gap-3">
            <span
              className={cn(
                "stepper-circle flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-body-sm font-body-sm text-numeric",
                isCompleted
                  ? (isGold
                      ? "border-gold-role bg-gold-role text-gold-contrast"
                      : "border-primary bg-primary text-primary-foreground")
                  : isActive
                  ? (isGold ? "border-gold-role text-gold-role" : "border-primary text-primary")
                  : "border-border text-muted-foreground"
              )}
              data-complete={isCompleted || undefined}
              data-active={isActive || undefined}
              aria-hidden
            >
              {position}
            </span>
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p
                    className={cn(
                      "text-body font-body",
                      isActive ? (isGold ? "text-gold-role" : "text-foreground") : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </p>
                  {step.description ? (
                    <p className="text-caption font-caption text-muted-foreground">{step.description}</p>
                  ) : null}
                </div>
                {renderAction ? <span className="text-caption font-caption text-muted-foreground">{renderAction(step)}</span> : null}
              </div>
              {index < safeSteps.length - 1 ? (
                <div
                  className={cn(
                    "stepper-progress mt-2 h-1 w-full rounded-full bg-muted",
                    isCompleted && (isGold ? "bg-gold-role" : "bg-primary"),
                    isActive && !isCompleted && (isGold ? "bg-foreground/30" : "bg-primary/70")
                  )}
                  data-complete={isCompleted || undefined}
                />
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
};
