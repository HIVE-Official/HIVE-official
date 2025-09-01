"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { Heart, Loader2, Sparkles } from 'lucide-react';
import { hiveVariants } from '../../lib/motion.js';
import { useAdaptiveMotion } from '../../lib/adaptive-motion.js';
export const InterestsSelectionStep = ({ selectedInterests, onInterestToggle, onSubmit, onBack, isLoading, interestCategories, minInterests = 3 }) => {
    useAdaptiveMotion('academic'); // For consistency with motion system
    const [expandedCategories, setExpandedCategories] = useState(new Set(Object.keys(interestCategories)));
    const toggleCategory = (category) => {
        setExpandedCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(category)) {
                newSet.delete(category);
            }
            else {
                newSet.add(category);
            }
            return newSet;
        });
    };
    const isSubmitDisabled = selectedInterests.length < minInterests || isLoading;
    return (_jsxs("div", { className: "min-h-screen bg-background flex items-center justify-center p-4", children: [_jsxs("div", { className: "absolute inset-0", children: [_jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" }), _jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" })] }), _jsxs(motion.div, { className: "w-full max-w-2xl relative z-10", variants: hiveVariants.container, initial: "hidden", animate: "visible", children: [_jsx(motion.div, { className: "flex justify-center mb-8", variants: hiveVariants.item, children: _jsx("div", { className: "flex space-x-2", children: [1, 2, 3, 4].map((stepNum, index) => (_jsx("div", { className: `w-2 h-2 rounded-full transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${index < 3 ? 'bg-white' : index === 3 ? 'bg-accent' : 'bg-muted'}` }, stepNum))) }) }), _jsxs(motion.div, { className: "module-border module-surface module-padding space-y-8", variants: hiveVariants.item, children: [_jsxs(motion.div, { className: "text-center space-y-4", variants: hiveVariants.item, children: [_jsx("div", { className: "w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto", children: _jsx(Heart, { className: "w-8 h-8 text-accent" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-display font-semibold text-foreground", children: "What interests you?" }), _jsxs("p", { className: "text-muted font-body mt-2", children: ["Select at least ", minInterests, " interests to help us connect you with relevant communities"] })] }), _jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full", children: [_jsx(Sparkles, { className: "w-4 h-4 text-accent" }), _jsxs("span", { className: "text-sm font-medium text-accent font-body", children: [selectedInterests.length, " interests selected", selectedInterests.length < minInterests &&
                                                        ` • select ${minInterests - selectedInterests.length} more`] })] })] }), _jsx(motion.div, { className: "space-y-6 max-h-96 overflow-y-auto", variants: hiveVariants.container, children: Object.entries(interestCategories).map(([category, interests]) => (_jsxs(motion.div, { className: "space-y-4", variants: hiveVariants.item, children: [_jsxs("button", { onClick: () => toggleCategory(category), className: "flex items-center justify-between w-full text-left", children: [_jsx("h3", { className: "text-sm font-medium text-foreground font-body", children: category }), _jsx(motion.div, { animate: { rotate: expandedCategories.has(category) ? 180 : 0 }, transition: { duration: 0.2 }, className: "text-muted", children: "\u2193" })] }), _jsx(motion.div, { initial: false, animate: {
                                                height: expandedCategories.has(category) ? 'auto' : 0,
                                                opacity: expandedCategories.has(category) ? 1 : 0
                                            }, transition: { duration: 0.2 }, className: "overflow-hidden", children: _jsx("div", { className: "flex flex-wrap gap-2", children: interests.map((interest) => {
                                                    const isSelected = selectedInterests.includes(interest);
                                                    return (_jsxs(motion.button, { onClick: () => onInterestToggle(interest), className: `px-3 py-2 rounded-lg text-sm font-body transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${isSelected
                                                            ? 'border-2 border-accent bg-accent/10 text-accent hover:bg-accent/20'
                                                            : 'border-2 border-border bg-surface-01 text-muted hover:bg-surface-02 hover:border-accent/30 hover:text-accent'}`, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [interest, isSelected && (_jsx(motion.span, { initial: { scale: 0 }, animate: { scale: 1 }, className: "ml-1", children: "\u2713" }))] }, interest));
                                                }) }) })] }, category))) }), _jsxs(motion.div, { className: "flex gap-3 pt-4", variants: hiveVariants.item, children: [_jsx(Button, { variant: "secondary", onClick: onBack, className: "flex-1 font-body", disabled: isLoading, children: "Back" }), _jsx(Button, { variant: "primary", onClick: onSubmit, disabled: isSubmitDisabled, className: "flex-1 font-body", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-4 w-4 animate-spin mr-2" }), "Completing..."] })) : ('Complete Setup') })] })] }), _jsx(motion.div, { className: "text-center mt-6", variants: hiveVariants.item, children: _jsx("p", { className: "text-sm text-muted font-body", children: "Step 4 of 4" }) })] })] }));
};
//# sourceMappingURL=interests-selection-step.js.map