"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
export const ProgressIndicator = ({ currentStep, totalSteps, stepLabels = [], className = "" }) => {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
    return (_jsxs("div", { className: `w-full max-w-md mx-auto ${className}`, children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" }), _jsx(motion.div, { className: "absolute top-1/2 left-0 h-0.5 bg-accent -translate-y-1/2", initial: { width: 0 }, animate: {
                            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`
                        }, transition: { duration: 0.5, ease: "easeOut" } }), _jsx("div", { className: "relative flex justify-between", children: steps.map((step, index) => {
                            const isCompleted = step < currentStep;
                            const isCurrent = step === currentStep;
                            const isUpcoming = step > currentStep;
                            return (_jsxs(motion.div, { className: "flex flex-col items-center", initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { delay: index * 0.1, duration: 0.3 }, children: [_jsxs(motion.div, { className: `
                    relative w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium text-sm
                    ${isCompleted ? 'bg-accent border-accent text-[var(--hive-text-primary)]' : ''}
                    ${isCurrent ? 'bg-accent border-accent text-[var(--hive-text-primary)] shadow-lg shadow-accent/25' : ''}
                    ${isUpcoming ? 'bg-background border-border text-muted-foreground' : ''}
                  `, initial: { scale: 0.8 }, animate: {
                                            scale: isCurrent ? 1.1 : 1,
                                            transition: { duration: 0.2 }
                                        }, children: [isCompleted ? (_jsx(motion.div, { initial: { scale: 0, rotate: -180 }, animate: { scale: 1, rotate: 0 }, transition: { delay: 0.2, duration: 0.3 }, children: _jsx(Check, { className: "w-4 h-4" }) })) : (_jsx("span", { children: step })), isCurrent && (_jsx(motion.div, { className: "absolute inset-0 rounded-full bg-accent/30", animate: { scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } }))] }), stepLabels[index] && (_jsx(motion.span, { className: `
                      mt-2 text-xs text-center leading-tight max-w-16
                      ${isCurrent ? 'text-accent font-medium' : 'text-muted-foreground'}
                    `, initial: { opacity: 0, y: 5 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 + 0.2, duration: 0.3 }, children: stepLabels[index] }))] }, step));
                        }) })] }), _jsxs(motion.div, { className: "mt-4 text-center", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.5, duration: 0.3 }, children: [_jsxs("span", { className: "text-sm text-muted-foreground", children: ["Step ", currentStep, " of ", totalSteps] }), stepLabels[currentStep - 1] && (_jsxs("span", { className: "text-sm text-foreground font-medium ml-2", children: ["\u2022 ", stepLabels[currentStep - 1]] }))] })] }));
};
//# sourceMappingURL=progress-indicator.js.map