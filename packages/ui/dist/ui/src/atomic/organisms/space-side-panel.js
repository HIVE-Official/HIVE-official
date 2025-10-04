"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { X } from "lucide-react";
import { MotionDiv, AnimatePresence } from "../../shells/motion-safe";
import { transitions } from "../../lib/animations";
import { cn } from "../../lib/utils";
import { Button } from "../atoms/button";
export const SpaceSidePanel = React.forwardRef(({ isOpen, panelType, title, children, onClose, width = "60%", className, ...props }, ref) => {
    // Update hash URL when panel opens/closes
    React.useEffect(() => {
        if (isOpen && panelType) {
            // Update URL hash without scrolling
            window.history.pushState(null, "", `#${panelType}`);
        }
        else if (!isOpen) {
            // Clear hash when closing
            if (window.location.hash) {
                window.history.pushState(null, "", window.location.pathname);
            }
        }
    }, [isOpen, panelType]);
    // Handle browser back button
    React.useEffect(() => {
        const handleHashChange = () => {
            if (!window.location.hash && isOpen) {
                onClose();
            }
        };
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, [isOpen, onClose]);
    return (_jsx(AnimatePresence, { mode: "wait", children: isOpen && (_jsxs(_Fragment, { children: [_jsx(MotionDiv, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 }, onClick: onClose, className: "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" }), _jsxs(MotionDiv, { ref: ref, initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" }, transition: transitions.panel, className: cn("fixed right-0 top-0 z-50 h-full bg-[#0c0c0c] border-l border-white/8", "flex flex-col overflow-hidden", "md:top-16", // Account for header on desktop
                    className), style: {
                        width: width
                    }, ...props, children: [_jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-white/8 bg-[#000000]", children: [_jsx("h2", { className: "text-lg font-semibold text-white tracking-tight", children: title }), _jsxs(Button, { variant: "ghost", size: "icon", onClick: onClose, className: "h-8 w-8", children: [_jsx(X, { className: "h-4 w-4" }), _jsx("span", { className: "sr-only", children: "Close panel" })] })] }), _jsx("div", { className: "flex-1 overflow-y-auto", children: children })] })] })) }));
});
SpaceSidePanel.displayName = "SpaceSidePanel";
//# sourceMappingURL=space-side-panel.js.map