"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
import { useWelcomeMat } from "../../hooks/use-welcome-mat.js";
import { Button } from "../atoms/button.js";
import { Badge } from "../atoms/badge.js";
import { Progress } from "../atoms/progress.js";
export const WelcomeMat = React.forwardRef(({ className, onDismiss, userName, ...props }, ref) => {
    const { isOpen, currentStep, totalSteps, currentFlow, completedSteps, skippedSteps, closeFlow, nextStep, previousStep, skipStep, completeStep, } = useWelcomeMat();
    const currentStepData = currentFlow?.steps[currentStep];
    const isFirstStep = currentStep === 0;
    const isLastStep = totalSteps > 0 && currentStep === totalSteps - 1;
    const progressPercentage = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;
    const dismiss = React.useCallback(() => {
        onDismiss?.();
        closeFlow();
    }, [closeFlow, onDismiss]);
    const handleNext = React.useCallback(async () => {
        if (!currentStepData)
            return;
        if (currentStepData.validation) {
            try {
                const isValid = await currentStepData.validation();
                if (!isValid)
                    return;
            }
            catch (error) {
                console.error("WelcomeMat: validation failure", error);
                return;
            }
        }
        if (currentStepData.action) {
            try {
                await currentStepData.action.handler();
            }
            catch (error) {
                console.error("WelcomeMat: action failure", error);
                return;
            }
        }
        completeStep();
    }, [completeStep, currentStepData]);
    const handleSkip = React.useCallback(() => {
        if (!currentStepData?.canSkip || currentStepData.required)
            return;
        skipStep();
    }, [currentStepData, skipStep]);
    React.useEffect(() => {
        if (!currentStepData?.target)
            return;
        const targetElement = document.querySelector(currentStepData.target);
        if (!targetElement)
            return;
        targetElement.classList.add("welcome-mat-highlight");
        return () => targetElement.classList.remove("welcome-mat-highlight");
    }, [currentStepData?.target]);
    if (!isOpen || !currentFlow || !currentStepData) {
        return null;
    }
    const hasCompleted = completedSteps.has(currentStepData.id);
    const hasSkipped = skippedSteps.has(currentStepData.id);
    return (_jsxs("div", { ref: ref, role: "dialog", "aria-modal": "true", "aria-labelledby": "welcome-mat-title", className: cn("fixed inset-0 z-[60] flex items-center justify-center p-4", className), ...props, children: [_jsx("div", { className: "absolute inset-0 bg-black/50 transition-opacity", "aria-hidden": "true", onClick: dismiss }), _jsxs("div", { className: "relative z-10 flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[var(--hive-border)] bg-[var(--hive-background-elevated)] shadow-hive-level4", children: [_jsxs("header", { className: "border-b border-[var(--hive-border)] px-6 py-5", children: [_jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-[var(--hive-brand-primary-bg)] text-[var(--hive-brand-primary)]", children: _jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: _jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }) }), _jsxs("div", { className: "space-y-1", children: [_jsx("p", { id: "welcome-mat-title", className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: currentStepData.title }), _jsxs("div", { className: "flex items-center gap-2 text-xs text-[var(--hive-text-secondary)]", children: [_jsx(Badge, { variant: "outline", children: currentFlow.name }), _jsxs("span", { children: ["Step ", currentStep + 1, " of ", totalSteps] })] })] })] }), _jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Close welcome tour", onClick: dismiss, children: _jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [_jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), _jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] }) })] }), _jsx("div", { className: "mt-4", children: _jsx(Progress, { value: progressPercentage, "aria-hidden": "true" }) }), userName ? (_jsxs("p", { className: "mt-2 text-sm text-[var(--hive-text-secondary)]", children: ["Welcome back, ", userName, ". Let\u2019s finish getting you set up."] })) : null] }), _jsxs("div", { className: "space-y-4 px-6 py-5 text-sm text-[var(--hive-text-secondary)]", children: [_jsx("p", { children: currentStepData.description }), currentStepData.content ? (_jsx("div", { className: "rounded-xl border border-dashed border-[var(--hive-border)] bg-[var(--hive-background-secondary)] p-4 text-[var(--hive-text-secondary)]", children: currentStepData.content })) : null, (hasCompleted || hasSkipped) && (_jsx("p", { className: "text-xs text-[var(--hive-text-tertiary)]", children: hasCompleted
                                    ? "You marked this step as complete."
                                    : hasSkipped
                                        ? "You skipped this step. You can return later if needed."
                                        : null }))] }), _jsxs("footer", { className: "flex flex-col gap-3 border-t border-[var(--hive-border)] px-6 py-4 md:flex-row md:items-center md:justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [!isFirstStep && (_jsx(Button, { variant: "outline", size: "sm", onClick: previousStep, children: "Previous" })), currentStepData.canSkip && !currentStepData.required && (_jsx(Button, { variant: "ghost", size: "sm", onClick: handleSkip, children: "Skip" }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "secondary", size: "sm", onClick: dismiss, children: "Dismiss" }), _jsx(Button, { variant: "default", size: "sm", onClick: handleNext, children: isLastStep
                                            ? currentStepData.action?.label || "Complete"
                                            : currentStepData.action?.label || "Next" })] })] })] })] }));
});
WelcomeMat.displayName = "WelcomeMat";
export default WelcomeMat;
//# sourceMappingURL=welcome-mat.js.map