"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
import { useWelcomeMat } from "../../hooks/use-welcome-mat.js";
// Modal components will be refactored to use universal modal system
import { Button } from "../atoms/button.js";
import { Badge } from "../atoms/badge.js";
import { Progress } from "../atoms/progress.js";
const WelcomeMat = React.forwardRef(({ className, ...props }, ref) => {
    const { isOpen, currentStep, totalSteps, currentFlow, completedSteps, skippedSteps, closeFlow, nextStep, previousStep, skipStep, completeStep, } = useWelcomeMat();
    const currentStepData = currentFlow?.steps[currentStep];
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === totalSteps - 1;
    const progressPercentage = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;
    const handleNext = React.useCallback(async () => {
        if (!currentStepData)
            return;
        // Run validation if present
        if (currentStepData.validation) {
            try {
                const isValid = await currentStepData.validation();
                if (!isValid) {
                    return;
                }
            }
            catch (error) {
                console.error("WelcomeMat: Step validation failed:", error);
                return;
            }
        }
        // Run action if present
        if (currentStepData.action) {
            try {
                await currentStepData.action.handler();
            }
            catch (error) {
                console.error("WelcomeMat: Step action failed:", error);
                return;
            }
        }
        // Complete the step and move to next
        completeStep();
    }, [currentStepData, completeStep]);
    const handleSkip = React.useCallback(() => {
        if (!currentStepData || !currentStepData.canSkip)
            return;
        skipStep();
    }, [currentStepData, skipStep]);
    const handleClose = React.useCallback(() => {
        closeFlow();
    }, [closeFlow]);
    // Highlight target element if specified
    React.useEffect(() => {
        if (!currentStepData?.target)
            return;
        const targetElement = document.querySelector(currentStepData.target);
        if (!targetElement)
            return;
        // Add highlight class
        targetElement.classList.add('welcome-mat-highlight');
        // Cleanup
        return () => {
            targetElement.classList.remove('welcome-mat-highlight');
        };
    }, [currentStepData?.target]);
    if (!isOpen || !currentFlow || !currentStepData) {
        return null;
    }
    return (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", style: { display: isOpen ? 'flex' : 'none' }, children: [_jsx("div", { className: "absolute inset-0 bg-black/50", onClick: handleClose }), _jsxs("div", { className: cn("relative bg-[var(--hive-background-secondary)] border border-[var(--hive-border)] rounded-lg shadow-xl max-w-lg", className), ...props, children: [_jsxs("div", { className: "p-6 border-b border-[var(--hive-border)]", children: [_jsxs("div", { className: "flex items-center justify-between w-full", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "p-2 rounded-full bg-[var(--hive-brand-primary-bg)] text-[var(--hive-brand-primary)]", children: _jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold", children: currentStepData.title }), _jsxs("div", { className: "flex items-center space-x-2 mt-1", children: [_jsx(Badge, { variant: "outline", className: "text-xs", children: currentFlow.name }), _jsxs("span", { className: "text-xs text-[var(--hive-text-secondary)]", children: ["Step ", currentStep + 1, " of ", totalSteps] })] })] })] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: handleClose, className: "shrink-0", children: _jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), _jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] }) })] }), _jsx("div", { className: "mt-4", children: _jsx(Progress, { value: progressPercentage, className: "h-2" }) })] }), _jsxs("div", { className: "px-6 py-4", children: [_jsx("div", { className: "text-base text-[var(--hive-text-secondary)]", children: currentStepData.description }), currentStepData.content && (_jsx("div", { className: "mt-4", children: currentStepData.content }))] }), _jsx("div", { className: "flex items-center justify-end space-x-2 p-6 border-t border-[var(--hive-border)]", children: _jsxs("div", { className: "flex items-center justify-between w-full", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [!isFirstStep && (_jsx(Button, { variant: "outline", size: "sm", onClick: previousStep, children: "Previous" })), currentStepData.canSkip && !currentStepData.required && (_jsx(Button, { variant: "ghost", size: "sm", onClick: handleSkip, children: "Skip" }))] }), _jsx("div", { className: "flex items-center space-x-2", children: isLastStep ? (_jsx(Button, { variant: "default", onClick: handleNext, children: currentStepData.action?.label || "Complete" })) : (_jsx(Button, { variant: "default", onClick: handleNext, children: currentStepData.action?.label || "Next" })) })] }) })] })] }));
});
WelcomeMat.displayName = "WelcomeMat";
export { WelcomeMat };
//# sourceMappingURL=welcome-mat.js.map