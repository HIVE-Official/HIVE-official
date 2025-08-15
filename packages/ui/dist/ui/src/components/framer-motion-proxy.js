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
    h1: (props) => _jsx("h1", { ...props }),
    h2: (props) => _jsx("h2", { ...props }),
    h3: (props) => _jsx("h3", { ...props }),
    h4: (props) => _jsx("h4", { ...props }),
    p: (props) => _jsx("p", { ...props }),
    header: (props) => _jsx("header", { ...props }),
    // Add more elements as needed
};
// Simple AnimatePresence fallback that just renders children
export const AnimatePresence = ({ children }) => {
    return _jsx(_Fragment, { children: children });
};
// Export individual motion components for convenience
export const MotionDiv = motion.div;
export const MotionButton = motion.button;
// Mock framer-motion hooks for components that need them
export const useAnimation = () => ({
    start: () => Promise.resolve(),
    stop: () => { },
    set: () => { },
    subscribe: () => () => { },
    mount: () => () => { },
});
export const useMotionValue = (initialValue) => ({
    get: () => initialValue,
    set: (value) => { },
    onChange: (callback) => () => { },
});
export const useTransform = (motionValue, input, output) => ({
    get: () => motionValue?.get?.() || 0,
    set: (value) => { },
    onChange: (callback) => () => { },
});
export const MotionSpan = motion.span;
export const MotionSection = motion.section;
//# sourceMappingURL=framer-motion-proxy.js.map