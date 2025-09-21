"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { useWelcomeMat, type WelcomeMatStep } from "../../hooks/use-welcome-mat"
import { HiveModal, HiveModalContent, HiveModalHeader, HiveModalTitle, HiveModalDescription, HiveModalFooter } from "../atoms/hive-modal"
import { Button } from "../atoms/button"
import { Badge } from "../atoms/badge"
import { Progress } from "../atoms/progress"

export interface WelcomeMatProps {
  className?: string
}

const WelcomeMat = React.forwardRef<HTMLDivElement, WelcomeMatProps>(
  ({ className, ...props }, ref) => {
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
    } = useWelcomeMat()

    const currentStepData = currentFlow?.steps[currentStep]
    const isFirstStep = currentStep === 0
    const isLastStep = currentStep === totalSteps - 1
    const progressPercentage = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0

    const handleNext = React.useCallback(async () => {
      if (!currentStepData) return

      // Run validation if present
      if (currentStepData.validation) {
        try {
          const isValid = await currentStepData.validation()
          if (!isValid) {
            return
          }
        } catch (error) {
          console.error("WelcomeMat: Step validation failed:", error)
          return
        }
      }

      // Run action if present
      if (currentStepData.action) {
        try {
          await currentStepData.action.handler()
        } catch (error) {
          console.error("WelcomeMat: Step action failed:", error)
          return
        }
      }

      // Complete the step and move to next
      completeStep()
    }, [currentStepData, completeStep])

    const handleSkip = React.useCallback(() => {
      if (!currentStepData || !currentStepData.canSkip) return
      skipStep()
    }, [currentStepData, skipStep])

    const handleClose = React.useCallback(() => {
      closeFlow()
    }, [closeFlow])

    // Highlight target element if specified
    React.useEffect(() => {
      if (!currentStepData?.target) return

      const targetElement = document.querySelector(currentStepData.target)
      if (!targetElement) return

      // Add highlight class
      targetElement.classList.add('welcome-mat-highlight')

      // Cleanup
      return () => {
        targetElement.classList.remove('welcome-mat-highlight')
      }
    }, [currentStepData?.target])

    if (!isOpen || !currentFlow || !currentStepData) {
      return null
    }

    return (
      <HiveModal open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <HiveModalContent
          className={cn("max-w-lg", className)}
          {...props}
        >
          <HiveModalHeader>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-[var(--hive-brand-primary-bg)] text-[var(--hive-brand-primary)]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                </div>
                <div>
                  <HiveModalTitle>{currentStepData.title}</HiveModalTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {currentFlow.name}
                    </Badge>
                    <span className="text-xs text-[var(--hive-text-secondary)]">
                      Step {currentStep + 1} of {totalSteps}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="shrink-0"
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
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </Button>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </HiveModalHeader>

          <div className="px-6 py-4">
            <HiveModalDescription className="text-base">
              {currentStepData.description}
            </HiveModalDescription>

            {currentStepData.content && (
              <div className="mt-4">
                {currentStepData.content}
              </div>
            )}
          </div>

          <HiveModalFooter>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                {!isFirstStep && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={previousStep}
                  >
                    Previous
                  </Button>
                )}
                {currentStepData.canSkip && !currentStepData.required && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSkip}
                  >
                    Skip
                  </Button>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {isLastStep ? (
                  <Button
                    variant="default"
                    onClick={handleNext}
                  >
                    {currentStepData.action?.label || "Complete"}
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    onClick={handleNext}
                  >
                    {currentStepData.action?.label || "Next"}
                  </Button>
                )}
              </div>
            </div>
          </HiveModalFooter>
        </HiveModalContent>
      </HiveModal>
    )
  }
)

WelcomeMat.displayName = "WelcomeMat"

export { WelcomeMat }