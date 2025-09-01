"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { hiveVariants } from '../../lib/motion.js';
import { useAdaptiveMotion } from '../../lib/adaptive-motion.js';
export const OnboardingCompleteStep = ({ onGoToFeed, userName = "there", majorName, graduationYear, schoolName = "University at Buffalo" }) => {
    useAdaptiveMotion('academic'); // For consistency with motion system
    const [showCelebration, setShowCelebration] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const completionSteps = [
        "Profile created",
        "Interests selected",
        "Community ready",
        "Welcome complete"
    ];
    useEffect(() => {
        // Start celebration sequence
        setTimeout(() => setShowCelebration(true), 500);
        // Animate completion steps
        completionSteps.forEach((_, index) => {
            setTimeout(() => setCurrentStep(index + 1), 1000 + index * 300);
        });
    }, []);
    return (_jsxs("div", { className: "min-h-screen bg-background flex items-center justify-center p-4", children: [_jsxs("div", { className: "absolute inset-0", children: [_jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" }), _jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" })] }), _jsx(AnimatePresence, { children: showCelebration && (_jsx("div", { className: "absolute inset-0 pointer-events-none", children: Array.from({ length: 6 }, (_, i) => `particle-${i}`).map((particleId, i) => (_jsx(motion.div, { className: "absolute w-2 h-2 bg-accent rounded-full", initial: {
                            x: "50vw",
                            y: "50vh",
                            scale: 0,
                            opacity: 0
                        }, animate: {
                            x: `${30 + i * 10}vw`,
                            y: `${20 + i * 15}vh`,
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0]
                        }, transition: {
                            duration: 2,
                            delay: i * 0.2,
                            ease: "easeOut"
                        } }, particleId))) })) }), _jsxs(motion.div, { className: "w-full max-w-2xl relative z-10", variants: hiveVariants.container, initial: "hidden", animate: "visible", children: [_jsx(motion.div, { className: "flex justify-center mb-8", variants: hiveVariants.item, children: _jsx("div", { className: "flex space-x-2", children: [1, 2, 3, 4].map((stepNum) => (_jsx(motion.div, { className: "w-2 h-2 rounded-full bg-accent", initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: stepNum * 0.1 } }, stepNum))) }) }), _jsxs(motion.div, { className: "module-border module-surface module-padding space-y-8 text-center", variants: hiveVariants.item, children: [_jsx(motion.div, { className: "w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto", initial: { scale: 0, rotate: -180 }, animate: { scale: 1, rotate: 0 }, transition: {
                                    delay: 0.3,
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 15
                                }, children: _jsx(Sparkles, { className: "w-12 h-12 text-accent" }) }), _jsxs(motion.div, { className: "space-y-4", variants: hiveVariants.item, children: [_jsxs("h1", { className: "text-3xl font-display font-semibold text-foreground", children: ["You're all set, ", userName, "!"] }), _jsx("p", { className: "text-muted font-body text-lg max-w-md mx-auto", children: "Your HIVE profile is complete and your community is waiting." })] }), _jsx(motion.div, { className: "space-y-3 max-w-xs mx-auto", variants: hiveVariants.container, children: completionSteps.map((step, index) => (_jsxs(motion.div, { className: `flex items-center gap-3 text-sm font-body transition-all duration-[180ms] ${index < currentStep ? 'text-accent' : 'text-muted'}`, variants: hiveVariants.item, initial: { opacity: 0, x: -20 }, animate: {
                                        opacity: index < currentStep ? 1 : 0.5,
                                        x: 0
                                    }, transition: { delay: 1 + index * 0.3 }, children: [_jsx(motion.div, { className: `w-4 h-4 rounded-full border-2 flex items-center justify-center ${index < currentStep
                                                ? 'border-accent bg-accent'
                                                : 'border-border'}`, animate: {
                                                scale: index < currentStep ? [1, 1.2, 1] : 1
                                            }, transition: {
                                                delay: 1 + index * 0.3,
                                                duration: 0.3
                                            }, children: index < currentStep && (_jsx(Check, { className: "w-2.5 h-2.5 text-background" })) }), step] }, step))) }), (majorName || graduationYear) && (_jsxs(motion.div, { className: "p-4 bg-accent/5 border border-accent/20 rounded-lg max-w-md mx-auto", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 2 }, children: [_jsx("h3", { className: "text-sm font-medium text-foreground font-body mb-3", children: "\uD83C\uDF89 You've joined 3 communities:" }), _jsxs("div", { className: "space-y-2 text-sm text-muted font-body", children: [majorName && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-accent", children: "\uD83C\uDF93" }), _jsx("span", { children: majorName })] })), graduationYear && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-accent", children: "\uD83D\uDCC5" }), _jsxs("span", { children: ["Class of ", graduationYear] })] })), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-accent", children: "\uD83C\uDFE0" }), _jsxs("span", { children: [schoolName, " Community"] })] })] })] })), _jsxs(motion.div, { className: "space-y-6", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 2.5 }, children: [_jsxs("div", { className: "p-6 bg-accent/5 border border-accent/20 rounded-lg", children: [_jsx("p", { className: "text-accent font-body text-lg", children: "\u2728 See you very soon! \u2728" }), _jsx("p", { className: "text-muted font-body text-sm mt-2", children: "Your HIVE adventure is about to begin" })] }), _jsxs(Button, { onClick: onGoToFeed, variant: "primary", size: "lg", className: "w-full font-body", children: ["Enter Your HIVE", _jsx(ArrowRight, { className: "w-4 h-4 ml-2" })] })] })] })] })] }));
};
//# sourceMappingURL=onboarding-complete-step.js.map