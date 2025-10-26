// Bounded Context Owner: Design System Guild
"use client";

import * as React from "react";
import { StepperHeader, type StepDescriptor } from "@/organisms/stepper-header";
import { Card } from "@/atoms/card";
import { Button } from "@/atoms/button";
import { cn } from "@/utils/cn";
import { motionClass } from "@/utils/motion";

export interface OnboardingFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: readonly StepDescriptor[];
  activeStepId: string;
  completedStepIds?: readonly string[];
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  backLabel?: string;
  /** Optional accent palette for the stepper (primary | gold) */
  accent?: "primary" | "gold";
  /** Presentation style */
  variant?: "standard" | "chat";
  /** Optional quick-reply options for chat variant */
  options?: ReadonlyArray<{ value: string; label: string; description?: string }>;
  /** Called when an option is picked (chat variant) */
  onOptionSelect?: (value: string) => void;
  /** Options style */
  optionVariant?: "chips" | "buttons";
}

export function OnboardingFrame({
  steps,
  activeStepId,
  completedStepIds,
  onBack,
  onNext,
  nextLabel = "Continue",
  backLabel = "Back",
  children,
  className,
  accent = "primary",
  variant = "standard",
  options,
  onOptionSelect,
  optionVariant = "chips",
  ...rest
}: OnboardingFrameProps) {
  const prompt = steps.find((s) => s.id === activeStepId);

  return (
    <div className={className} {...rest}>
      <StepperHeader
        steps={steps}
        activeStepId={activeStepId}
        completedStepIds={completedStepIds}
        accent={accent}
      />

      {variant === "chat" ? (
        <div className="mt-4 space-y-4 rounded-2xl border border-input bg-card/60 p-4">
          {/* System prompt bubble derived from the active step */}
          <div key={prompt?.id} className={cn("max-w-prose", motionClass("ambient"), "animate-in fade-in-0 slide-in-from-left-2")}> 
            <div className="inline-block rounded-2xl rounded-bl-md border border-input bg-muted/40 px-3 py-2 text-sm text-foreground shadow-sm">
              <div className="font-medium">{prompt?.title}</div>
              {prompt?.description ? (
                <div className="mt-0.5 text-muted-foreground">
                  {prompt.description}
                </div>
              ) : null}
            </div>
          </div>

          {/* Consumer-provided chat messages / inputs */}
          <div key={`${prompt?.id}-content`} className={cn("space-y-3", motionClass("ambient"), "animate-in fade-in-0 slide-in-from-bottom-2")}> 
            {children}
          </div>

          {/* Quick reply options */}
          {options && options.length > 0 ? (
            <div className={cn("flex flex-wrap gap-2 pt-1", motionClass("ambient"), "animate-in fade-in-0 slide-in-from-bottom-2 delay-100")}> 
              {options.map((opt) => (
                <Button
                  key={opt.value}
                  variant="outline"
                  size="sm"
                  className={cn(optionVariant === "chips" ? "rounded-full" : "rounded-md")}
                  onClick={() => onOptionSelect?.(opt.value)}
                >
                  <span>{opt.label}</span>
                  {opt.description ? (
                    <span className="ml-2 text-caption text-muted-foreground">{opt.description}</span>
                  ) : null}
                </Button>
              ))}
            </div>
          ) : null}

          <div className="flex items-center justify-end gap-2 pt-1">
            <Button variant="outline" onClick={onBack} disabled={!onBack}>
              {backLabel}
            </Button>
            <Button onClick={onNext} disabled={!onNext}>
              {nextLabel}
            </Button>
          </div>
        </div>
      ) : (
        <Card className="mt-4">
          <div className="space-y-4 p-6">
            {children}
            <div className="flex items-center justify-between pt-2">
              <Button variant="outline" onClick={onBack} disabled={!onBack}>
                {backLabel}
              </Button>
              <Button onClick={onNext} disabled={!onNext}>
                {nextLabel}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
