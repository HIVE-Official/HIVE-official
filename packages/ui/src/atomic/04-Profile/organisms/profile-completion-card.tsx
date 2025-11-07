"use client";

import * as React from "react";
import { CheckCircle, Sparkles } from "lucide-react";

import { cn } from "../../lib/utils";
import { Card } from "../atoms/card";
import { Button } from "../atoms/button";

export interface ProfileCompletionStep {
  id: string;
  title: string;
  description?: string;
}

const DEFAULT_STEPS: ProfileCompletionStep[] = [
  { id: "avatar", title: "Add a profile photo" },
  { id: "bio", title: "Share a short bio" },
  { id: "academic", title: "Confirm academic details" },
  { id: "housing", title: "Add housing or residency" },
  { id: "interests", title: "Select your interests" },
  { id: "spaces", title: "Join 3+ spaces" },
];

export interface ProfileCompletionCardProps {
  completionPercentage: number;
  completedSteps?: string[];
  steps?: ProfileCompletionStep[];
  onStepClick?: (stepId: string) => void;
  className?: string;
}

export function ProfileCompletionCard({
  completionPercentage,
  completedSteps = [],
  steps = DEFAULT_STEPS,
  onStepClick,
  className,
}: ProfileCompletionCardProps) {
  const remaining = steps.filter((step) => !completedSteps.includes(step.id));

  return (
    <Card
      className={cn(
        "border-[color-mix(in_srgb,var(--hive-border-default,#2d3145) 58%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-secondary,#10111c) 92%,transparent)] p-6",
        className,
      )}
    >
      <div className="flex items-center gap-3 text-[var(--hive-text-primary,#f7f7ff)]">
        <div className="rounded-xl bg-[color-mix(in_srgb,var(--hive-brand-primary,#facc15) 12%,transparent)] p-2">
          <Sparkles className="h-4 w-4 text-[var(--hive-brand-primary,#facc15)]" aria-hidden />
        </div>
        <div>
          <h3 className="text-lg font-medium">Boost your profile</h3>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--hive-text-muted,#8d90a2)]">
            {Math.round(completionPercentage)}% complete
          </p>
        </div>
      </div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--hive-background-tertiary,#141522) 78%,transparent)]">
        <div
          className="h-full rounded-full bg-[color-mix(in_srgb,var(--hive-brand-primary,#facc15) 92%,transparent)] transition-[width] duration-500"
          style={{ width: `${Math.min(100, Math.max(0, completionPercentage))}%` }}
        />
      </div>

      <ul className="mt-4 space-y-2">
        {remaining.slice(0, 4).map((step) => (
          <li key={step.id}>
            <Button
              variant="ghost"
              className="w-full justify-between rounded-2xl bg-[color-mix(in_srgb,var(--hive-background-tertiary,#141522) 65%,transparent)] px-4 py-3 text-left text-sm text-[var(--hive-text-secondary,#c0c2cc)] hover:bg-[color-mix(in_srgb,var(--hive-background-tertiary,#141522) 80%,transparent)]"
              onClick={() => onStepClick?.(step.id)}
            >
              <span>{step.title}</span>
              <CheckCircle className="h-4 w-4 text-[color-mix(in_srgb,var(--hive-text-muted,#8d90a2) 90%,transparent)]" aria-hidden />
            </Button>
          </li>
        ))}
      </ul>

      {remaining.length === 0 ? (
        <div className="mt-4 rounded-2xl bg-[color-mix(in_srgb,var(--hive-brand-primary,#facc15) 12%,transparent)] p-3 text-center text-sm text-[var(--hive-brand-primary,#facc15)]">
          Profile complete — you’re ready to shine on campus!
        </div>
      ) : null}
    </Card>
  );
}
