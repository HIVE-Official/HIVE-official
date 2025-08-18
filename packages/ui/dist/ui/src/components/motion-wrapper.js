"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, createContext, useContext, useMemo, forwardRef } from "react";
import { motion } from "framer-motion";
// Global motion context to share motion state across components
const MotionContext = createContext({
    isLoaded: false
});
// Provider component to wrap the app
export function MotionProvider({ children }) {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        // Only load on client side
        if (typeof window !== 'undefined') {
            setIsLoaded(true);
        }
    }, []);
    const contextValue = useMemo(() => ({ isLoaded }), [isLoaded]);
    return (_jsx(MotionContext.Provider, { value: contextValue, children: children }));
}
// Hook to use motion context
function useMotion() {
    const context = useContext(MotionContext);
    if (!context) {
        // Fallback if provider is not used
        return { isLoaded: false };
    }
    return context;
}
// Extract only safe props for fallback
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractSafeProps(props) {
    const { animate: _animate, initial: _initial, transition: _transition, variants: _variants, whileHover: _whileHover, whileTap: _whileTap, whileInView: _whileInView, whileFocus: _whileFocus, whileDrag: _whileDrag, exit: _exit, layout: _layout, layoutId: _layoutId, layoutDependency: _layoutDependency, onUpdate: _onUpdate, onAnimationStart: _onAnimationStart, onAnimationComplete: _onAnimationComplete, onHoverStart: _onHoverStart, onHoverEnd: _onHoverEnd, onTapStart: _onTapStart, onTap: _onTap, onTapCancel: _onTapCancel, onPan: _onPan, onPanStart: _onPanStart, onPanEnd: _onPanEnd, onDrag: _onDrag, onDragStart: _onDragStart, onDragEnd: _onDragEnd, ...safeProps } = props;
    return safeProps;
}
export const MotionDiv = forwardRef(({ children, ...props }, ref) => {
    const { isLoaded } = useMotion();
    // During SSR or before motion loads, render a regular div
    if (!isLoaded) {
        const safeProps = extractSafeProps(props);
        return _jsx("div", { ref: ref, ...safeProps, children: children });
    }
    // On client with motion loaded, render motion.div
    return _jsx(motion.div, { ref: ref, ...props, children: children });
});
MotionDiv.displayName = "MotionDiv";
export const MotionSpan = forwardRef(({ children, ...props }, ref) => {
    const { isLoaded } = useMotion();
    if (!isLoaded) {
        const safeProps = extractSafeProps(props);
        return _jsx("span", { ref: ref, ...safeProps, children: children });
    }
    return _jsx(motion.span, { ref: ref, ...props, children: children });
});
MotionSpan.displayName = "MotionSpan";
export const MotionButton = forwardRef(({ children, ...props }, ref) => {
    const { isLoaded } = useMotion();
    if (!isLoaded) {
        const safeProps = extractSafeProps(props);
        return _jsx("button", { ref: ref, ...safeProps, children: children });
    }
    return _jsx(motion.button, { ref: ref, ...props, children: children });
});
MotionButton.displayName = "MotionButton";
//# sourceMappingURL=motion-wrapper.js.map