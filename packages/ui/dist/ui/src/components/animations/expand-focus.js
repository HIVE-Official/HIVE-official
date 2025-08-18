'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from '../framer-motion-proxy';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';
export const ExpandFocus = ({ children, focusContent, isExpanded, onExpand, onCollapse, className = '', expandedClassName = '', expandFrom = 'center', animationDuration = 0.4, backdrop = true, closeOnBackdropClick = true, closeOnEscape = true, preservePosition = false }) => {
    const triggerRef = useRef(null);
    const [triggerRect, setTriggerRect] = useState(null);
    // Capture trigger position when expanding
    useEffect(() => {
        if (isExpanded && triggerRef.current && preservePosition) {
            const rect = triggerRef.current.getBoundingClientRect();
            setTriggerRect(rect);
        }
    }, [isExpanded, preservePosition]);
    // Handle escape key
    useEffect(() => {
        if (!closeOnEscape)
            return;
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isExpanded) {
                onCollapse();
            }
        };
        if (isExpanded) {
            document.addEventListener('keydown', handleEscape);
        }
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isExpanded, closeOnEscape, onCollapse]);
    // Animation variants based on expand direction
    const getExpandVariants = () => {
        const baseTransition = {
            duration: animationDuration,
            ease: [0.23, 1, 0.32, 1] // Custom easing for buttery smooth animation
        };
        switch (expandFrom) {
            case 'top':
                return {
                    collapsed: {
                        scale: 1,
                        y: 0,
                        opacity: 1,
                        borderRadius: '12px'
                    },
                    expanded: {
                        scale: 1.02,
                        y: preservePosition && triggerRect ? -triggerRect.top + 20 : -50,
                        opacity: 1,
                        borderRadius: '16px',
                        transition: baseTransition
                    }
                };
            case 'bottom':
                return {
                    collapsed: {
                        scale: 1,
                        y: 0,
                        opacity: 1,
                        borderRadius: '12px'
                    },
                    expanded: {
                        scale: 1.02,
                        y: preservePosition && triggerRect ? window.innerHeight - triggerRect.bottom - 20 : 50,
                        opacity: 1,
                        borderRadius: '16px',
                        transition: baseTransition
                    }
                };
            case 'left':
                return {
                    collapsed: {
                        scale: 1,
                        x: 0,
                        opacity: 1,
                        borderRadius: '12px'
                    },
                    expanded: {
                        scale: 1.02,
                        x: preservePosition && triggerRect ? -triggerRect.left + 20 : -50,
                        opacity: 1,
                        borderRadius: '16px',
                        transition: baseTransition
                    }
                };
            case 'right':
                return {
                    collapsed: {
                        scale: 1,
                        x: 0,
                        opacity: 1,
                        borderRadius: '12px'
                    },
                    expanded: {
                        scale: 1.02,
                        x: preservePosition && triggerRect ? window.innerWidth - triggerRect.right - 20 : 50,
                        opacity: 1,
                        borderRadius: '16px',
                        transition: baseTransition
                    }
                };
            default: // center
                return {
                    collapsed: {
                        scale: 1,
                        opacity: 1,
                        borderRadius: '12px'
                    },
                    expanded: {
                        scale: 1.05,
                        opacity: 1,
                        borderRadius: '16px',
                        transition: baseTransition
                    }
                };
        }
    };
    const variants = getExpandVariants();
    return (_jsxs(_Fragment, { children: [_jsx(motion.div, { ref: triggerRef, className: cn('cursor-pointer transition-all duration-200', 'hover:scale-[1.02] hover:shadow-lg', className), onClick: onExpand, variants: variants, animate: isExpanded ? 'expanded' : 'collapsed', style: {
                    zIndex: isExpanded ? 1000 : 'auto',
                    position: isExpanded ? 'fixed' : 'relative',
                    ...(preservePosition && isExpanded && triggerRect ? {
                        top: triggerRect.top,
                        left: triggerRect.left,
                        width: triggerRect.width,
                        height: triggerRect.height
                    } : {})
                }, layoutId: "expand-focus-trigger", children: children }), _jsx(AnimatePresence, { children: isExpanded && backdrop && (_jsx(motion.div, { className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-[999]", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: animationDuration }, onClick: closeOnBackdropClick ? onCollapse : undefined })) }), _jsx(AnimatePresence, { children: isExpanded && (_jsxs(motion.div, { className: cn('fixed inset-4 md:inset-8 lg:inset-16', 'bg-hive-background-elevated rounded-2xl border border-hive-border-subtle', 'shadow-2xl z-[1001] overflow-hidden', 'flex flex-col', expandedClassName), initial: {
                        opacity: 0,
                        scale: 0.9,
                        y: 20
                    }, animate: {
                        opacity: 1,
                        scale: 1,
                        y: 0
                    }, exit: {
                        opacity: 0,
                        scale: 0.95,
                        y: 10
                    }, transition: {
                        duration: animationDuration,
                        ease: [0.23, 1, 0.32, 1]
                    }, layoutId: "expand-focus-content", children: [_jsx("button", { onClick: onCollapse, className: "absolute top-4 right-4 z-10 p-2 rounded-lg bg-hive-background-tertiary/80 hover:bg-hive-background-tertiary text-hive-text-secondary hover:text-hive-text-primary transition-colors", children: _jsx(X, { size: 20 }) }), _jsx("div", { className: "flex-1 p-6 overflow-auto", children: focusContent })] })) })] }));
};
// Convenience hook for managing expand-focus state
export const useExpandFocus = (initialExpanded = false) => {
    const [isExpanded, setIsExpanded] = useState(initialExpanded);
    const expand = () => setIsExpanded(true);
    const collapse = () => setIsExpanded(false);
    const toggle = () => setIsExpanded(!isExpanded);
    return {
        isExpanded,
        expand,
        collapse,
        toggle
    };
};
export default ExpandFocus;
//# sourceMappingURL=expand-focus.js.map