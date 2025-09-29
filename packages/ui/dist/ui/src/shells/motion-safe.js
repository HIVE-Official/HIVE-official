'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
// Safe motion components that handle SSR properly
export const MotionDiv = React.forwardRef((props, ref) => {
    if (typeof window === 'undefined') {
        // Server-side: return a plain div
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { initial, animate, exit, transition, whileHover, whileTap, ...rest } = props;
        return _jsx("div", { ref: ref, ...rest });
    }
    // Client-side: return motion div
    return _jsx(motion.div, { ref: ref, ...props });
});
MotionDiv.displayName = 'MotionDiv';
export const MotionSpan = React.forwardRef((props, ref) => {
    if (typeof window === 'undefined') {
        // Server-side: return a plain span
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { initial, animate, exit, transition, whileHover, whileTap, ...rest } = props;
        return _jsx("span", { ref: ref, ...rest });
    }
    // Client-side: return motion span
    return _jsx(motion.span, { ref: ref, ...props });
});
MotionSpan.displayName = 'MotionSpan';
export const MotionButton = React.forwardRef((props, ref) => {
    if (typeof window === 'undefined') {
        // Server-side: return a plain button
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { initial, animate, exit, transition, whileHover, whileTap, ...rest } = props;
        return _jsx("button", { ref: ref, ...rest });
    }
    // Client-side: return motion button
    return _jsx(motion.button, { ref: ref, ...props });
});
MotionButton.displayName = 'MotionButton';
// Motion link component
export const MotionLink = React.forwardRef((props, ref) => {
    if (typeof window === 'undefined') {
        // Server-side: return a plain anchor
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { initial, animate, exit, transition, whileHover, whileTap, ...rest } = props;
        return _jsx("a", { ref: ref, ...rest });
    }
    // Client-side: return motion anchor
    return _jsx(motion.a, { ref: ref, ...props });
});
MotionLink.displayName = 'MotionLink';
// Motion nav component
export const MotionNav = React.forwardRef((props, ref) => {
    if (typeof window === 'undefined') {
        // Server-side: return a plain nav
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { initial, animate, exit, transition, whileHover, whileTap, ...rest } = props;
        return _jsx("nav", { ref: ref, ...rest });
    }
    // Client-side: return motion nav
    return _jsx(motion.nav, { ref: ref, ...props });
});
MotionNav.displayName = 'MotionNav';
// Motion aside component
export const MotionAside = React.forwardRef((props, ref) => {
    if (typeof window === 'undefined') {
        // Server-side: return a plain aside
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { initial, animate, exit, transition, whileHover, whileTap, ...rest } = props;
        return _jsx("aside", { ref: ref, ...rest });
    }
    // Client-side: return motion aside
    return _jsx(motion.aside, { ref: ref, ...props });
});
MotionAside.displayName = 'MotionAside';
// Re-export AnimatePresence as-is since it handles SSR internally
export { AnimatePresence } from 'framer-motion';
//# sourceMappingURL=motion-safe.js.map