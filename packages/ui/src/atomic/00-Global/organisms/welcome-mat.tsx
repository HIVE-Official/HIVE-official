"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { useWelcomeMat } from "../../../hooks/use-welcome-mat";
import { Button } from "../atoms/button";
import { Badge } from "../atoms/badge";
import { Progress } from "../atoms/progress";

export interface WelcomeMatProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional callback fired when the welcome mat is dismissed.
   * If not provided the underlying welcome mat hook will close the flow.
   */
  onDismiss?: () => void;
  /**
   * Optional user name to personalize copy.
   */
  userName?: string;
}

export const WelcomeMat = React.forwardRef<HTMLDivElement, WelcomeMatProps>(
  ({ className, onDismiss, userName, ...props }, ref) => {
    const {
      isOpen,
      currentStep,
      totalSteps,
      currentFlow,
      completedSteps,
      skippedSteps,
      closeFlow,
      nextStep,
      previousStep,
      skipStep,
      completeStep,
    } = useWelcomeMat();

    const currentStepData = currentFlow?.steps[currentStep];
    const isFirstStep = currentStep === 0;
    const isLastStep = totalSteps > 0 && currentStep === totalSteps - 1;
    const progressPercentage =
      totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

    const dismiss = React.useCallback(() => {
      onDismiss?.();
      closeFlow();
    }, [closeFlow, onDismiss]);

    const handleNext = React.useCallback(async () => {
      if (!currentStepData) return;

      if (currentStepData.validation) {
        try {
          const isValid = await currentStepData.validation();
          if (!isValid) return;
        } catch (error) {
          console.error("WelcomeMat: validation failure", error);
          return;
        }
      }

      if (currentStepData.action) {
        try {
          await currentStepData.action.handler();
        } catch (error) {
          console.error("WelcomeMat: action failure", error);
          return;
        }
      }

      completeStep();
    }, [completeStep, currentStepData]);

    const handleSkip = React.useCallback(() => {
      if (!currentStepData?.canSkip || currentStepData.required) return;
      skipStep();
    }, [currentStepData, skipStep]);

    React.useEffect(() => {
      if (!currentStepData?.target) return;

      const targetElement = document.querySelector(currentStepData.target);
      if (!targetElement) return;

      targetElement.classList.add("welcome-mat-highlight");
      return () => targetElement.classList.remove("welcome-mat-highlight");
    }, [currentStepData?.target]);

    if (!isOpen || !currentFlow || !currentStepData) {
      return null;
    }

    const hasCompleted = completedSteps.has(currentStepData.id);
    const hasSkipped = skippedSteps.has(currentStepData.id);

    return (
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-mat-title"
        className={cn(
          "fixed inset-0 z-[60] flex items-center justify-center p-4",
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-0 bg-black/50 transition-opacity"
          aria-hidden="true"
          onClick={dismiss}
        />
        <div className="relative z-10 flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[var(--hive-border)] bg-[var(--hive-background-elevated)] shadow-hive-level4">
          <header className="border-b border-[var(--hive-border)] px-6 py-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--hive-brand-primary-bg)] text-[var(--hive-brand-primary)]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <p
                    id="welcome-mat-title"
                    className="text-lg font-semibold text-[var(--hive-text-primary)]"
                  >
                    {currentStepData.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[var(--hive-text-secondary)]">
                    <Badge variant="outline">{currentFlow.name}</Badge>
                    <span>
                      Step {currentStep + 1} of {totalSteps}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close welcome tour"
                onClick={dismiss}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </Button>
            </div>
            <div className="mt-4">
              <Progress value={progressPercentage} aria-hidden="true" />
            </div>
            {userName ? (
              <p className="mt-2 text-sm text-[var(--hive-text-secondary)]">
                Welcome back, {userName}. Let&rsquo;s finish getting you set up.
              </p>
            ) : null}
          </header>

          <div className="space-y-4 px-6 py-5 text-sm text-[var(--hive-text-secondary)]">
            <p>{currentStepData.description}</p>
            {currentStepData.content ? (
              <div className="rounded-xl border border-dashed border-[var(--hive-border)] bg-[var(--hive-background-secondary)] p-4 text-[var(--hive-text-secondary)]">
                {currentStepData.content}
              </div>
            ) : null}
            {(hasCompleted || hasSkipped) && (
              <p className="text-xs text-[var(--hive-text-tertiary)]">
                {hasCompleted
                  ? "You marked this step as complete."
                  : hasSkipped
                    ? "You skipped this step. You can return later if needed."
                    : null}
              </p>
            )}
          </div>

          <footer className="flex flex-col gap-3 border-t border-[var(--hive-border)] px-6 py-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              {!isFirstStep && (
                <Button variant="outline" size="sm" onClick={previousStep}>
                  Previous
                </Button>
              )}
              {currentStepData.canSkip && !currentStepData.required && (
                <Button variant="ghost" size="sm" onClick={handleSkip}>
                  Skip
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" onClick={dismiss}>
                Dismiss
              </Button>
              <Button variant="default" size="sm" onClick={handleNext}>
                {isLastStep
                  ? currentStepData.action?.label || "Complete"
                  : currentStepData.action?.label || "Next"}
              </Button>
            </div>
          </footer>
        </div>
      </div>
    );
  },
);

WelcomeMat.displayName = "WelcomeMat";

export default WelcomeMat;
