"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Users } from "lucide-react";
import { cn } from "../../lib/utils";
export const WelcomeMat = ({ isVisible, onDismiss, userName, className, }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const handleDismiss = () => {
        setIsAnimating(true);
        // Small delay to allow exit animation
        setTimeout(() => {
            onDismiss();
            setIsAnimating(false);
        }, 300);
    };
    const handleExploreSpaces = () => {
        window.location.href = "/spaces";
    };
    const handleViewProfile = () => {
        window.location.href = "/profile";
    };
    // Prevent body scroll when overlay is visible
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isVisible]);
    return (_jsx(AnimatePresence, { children: isVisible && !isAnimating && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3, ease: "easeOut" }, className: cn("fixed inset-0 z-50 flex items-center justify-center", "bg-[var(--hive-background-primary)]/80 backdrop-blur-sm", className), onClick: handleDismiss, children: _jsxs(motion.div, { initial: { scale: 0.9, opacity: 0, y: 20 }, animate: { scale: 1, opacity: 1, y: 0 }, exit: { scale: 0.9, opacity: 0, y: 20 }, transition: { duration: 0.4, ease: "easeOut", delay: 0.1 }, className: cn("relative mx-4 w-full max-w-md", "rounded-2xl border border-white/10", "bg-[var(--hive-background-tertiary)]", "p-8 shadow-2xl backdrop-blur-xl", "ring-1 ring-white/5"), onClick: (e) => e.stopPropagation(), children: [_jsx("button", { onClick: handleDismiss, className: cn("absolute right-4 top-4 rounded-full p-2", "text-[var(--hive-text-tertiary)] transition-colors duration-200", "hover:bg-[var(--hive-text-primary)]/10 hover:text-[var(--hive-text-primary)]", "focus:outline-none focus:ring-2 focus:ring-yellow-500/50"), "aria-label": "Dismiss welcome message", children: _jsx(X, { className: "h-4 w-4" }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { duration: 0.5, delay: 0.3, type: "spring" }, className: "mb-4 text-4xl", children: "\uD83D\uDE80" }), _jsx("h1", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "You're in \u2014 welcome to HIVE!" }), userName && (_jsxs("p", { className: "mt-2 text-[var(--hive-text-secondary)]", children: ["Great to have you here, ", userName] }))] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-start gap-3 rounded-lg bg-[var(--hive-text-primary)]/5 p-3", children: [_jsx("div", { className: "mt-0.5 h-2 w-2 rounded-full bg-yellow-500" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Scroll the Feed to see what's buzzing." })] }), _jsxs("div", { className: "flex items-start gap-3 rounded-lg bg-[var(--hive-text-primary)]/5 p-3", children: [_jsx("div", { className: "mt-0.5 h-2 w-2 rounded-full bg-yellow-500" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Spin up a Space to rally your group." })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("button", { onClick: handleExploreSpaces, className: cn("flex w-full items-center justify-center gap-2 rounded-lg", "bg-gradient-to-r from-yellow-500 to-yellow-600", "px-6 py-3 font-semibold text-[var(--hive-background-primary)]", "transition-all duration-200", "hover:from-yellow-400 hover:to-yellow-500", "hover:shadow-lg hover:shadow-yellow-500/25", "focus:outline-none focus:ring-2 focus:ring-yellow-500/50", "active:scale-[0.98]"), children: [_jsx(Users, { className: "h-4 w-4" }), "Explore Spaces"] }), _jsxs("button", { onClick: handleViewProfile, className: cn("flex w-full items-center justify-center gap-2", "text-sm text-[var(--hive-text-tertiary)] transition-colors duration-200", "hover:text-[var(--hive-text-primary)] focus:outline-none focus:text-[var(--hive-text-primary)]"), children: ["View your profile", _jsx(ArrowRight, { className: "h-3 w-3" })] })] })] }), _jsx("div", { className: "absolute -top-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" }), _jsx("div", { className: "absolute -bottom-px left-1/2 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" })] }) })) }));
};
// Hook for managing welcome mat state
export const useWelcomeMat = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasCheckedStorage, setHasCheckedStorage] = useState(false);
    // Check if welcome mat should be shown
    useEffect(() => {
        const checkWelcomeMatStatus = () => {
            try {
                const dismissed = localStorage.getItem("welcomeMatDismissed");
                const shouldShow = !dismissed;
                setIsVisible(shouldShow);
            }
            catch (error) {
                console.warn("Failed to check welcome mat status:", error);
                setIsVisible(false);
            }
            finally {
                setHasCheckedStorage(true);
            }
        };
        checkWelcomeMatStatus();
    }, []);
    const dismissWelcomeMat = () => {
        try {
            localStorage.setItem("welcomeMatDismissed", "true");
            setIsVisible(false);
        }
        catch (error) {
            console.warn("Failed to save welcome mat dismissal:", error);
            setIsVisible(false);
        }
    };
    return {
        isVisible: hasCheckedStorage && isVisible,
        dismissWelcomeMat,
        hasCheckedStorage,
    };
};
//# sourceMappingURL=welcome-mat.js.map