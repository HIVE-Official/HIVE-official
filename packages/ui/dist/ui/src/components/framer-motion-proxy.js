"use client";
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
// Simplified motion proxy that returns regular HTML elements
// This avoids the framer-motion compatibility issues with Next.js 15
export const motion = {
    div: (props) => _jsx("div", { ...props }),
    button: (props) => _jsx("button", { ...props }),
    span: (props) => _jsx("span", { ...props }),
    section: (props) => _jsx("section", { ...props }),
    nav: (props) => _jsx("nav", { ...props }),
    a: (props) => _jsx("a", { ...props }),
    // Add more elements as needed
};
// Simple AnimatePresence fallback that just renders children
export const AnimatePresence = ({ children }) => {
    return _jsx(_Fragment, { children: children });
};
// Export individual motion components for convenience
export const MotionDiv = motion.div;
export const MotionButton = motion.button;
export const MotionSpan = motion.span;
export const MotionSection = motion.section;
//# sourceMappingURL=framer-motion-proxy.js.map