import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiveButton, HiveCard } from '../../components';
const meta = {
    title: '01-Foundation/Motion System',
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
**HIVE's Liquid Metal Motion System**

The signature motion language that gives HIVE its premium campus infrastructure feel. Based on liquid metal physics with magnetic interactions and orchestrated timing.

## Motion Philosophy
- **Liquid Metal Physics**: Smooth, fluid motion that feels substantial and premium
- **Magnetic Interactions**: Elements attract, snap, and flow with physical realism
- **Orchestrated Timing**: Coordinated animations that feel like a unified system
- **Campus Infrastructure Feel**: Motion reinforces HIVE's positioning as serious academic platform

## Core Motion Tokens
- **Duration Scale**: 6 levels from instant (100ms) to deliberate (1000ms+)
- **Easing Signature**: \`cubic-bezier(0.23, 1, 0.32, 1)\` - liquid metal curve
- **Spring Physics**: Mass 0.8, stiffness 400, damping 25
- **Cascade Timing**: 50ms stagger for orchestrated reveals

## Motion Categories
1. **Micro-interactions**: Button hovers, focus states, small feedback
2. **Component Transitions**: Modal opens, dropdown reveals, state changes
3. **Page Transitions**: Route changes, surface switching, layout shifts
4. **Magnetic Assembly**: Element snapping, tool composition, drag interactions
5. **Ripple Effects**: Touch feedback, expansion animations, cascade reveals

## Performance
- **GPU Acceleration**: Transform and opacity only for 60fps performance
- **Reduced Motion**: Respects user preferences with fallback to snappy transitions
- **Memory Efficient**: Cleanup and optimization for complex animation sequences

## Accessibility
- WCAG 2.1 AA compliant with reduced motion support
- Clear visual feedback for interactive states
- Meaningful motion that enhances rather than distracts
        `
            }
        }
    },
    tags: ['autodocs'],
};
export default meta;
// HIVE Motion Tokens
const motionTokens = {
    duration: {
        instant: 100,
        quick: 200,
        smooth: 300,
        flowing: 500,
        graceful: 700,
        deliberate: 1000
    },
    easing: {
        liquidMetal: 'cubic-bezier(0.23, 1, 0.32, 1)',
        magneticSnap: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        gentleEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        sharpEase: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'
    },
    spring: {
        gentle: { type: 'spring', mass: 0.8, stiffness: 300, damping: 25 },
        snappy: { type: 'spring', mass: 0.6, stiffness: 400, damping: 20 },
        bouncy: { type: 'spring', mass: 1.2, stiffness: 500, damping: 15 }
    }
};
export const DurationScale = {
    render: () => {
        const [activeDemo, setActiveDemo] = useState(null);
        return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: Object.entries(motionTokens.duration).map(([name, duration]) => (_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "text-sm font-semibold capitalize", children: name }), _jsxs("p", { className: "text-xs text-muted-foreground", children: [duration, "ms"] }), _jsx(motion.div, { className: "w-full h-12 bg-hive-accent rounded-lg cursor-pointer", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, transition: { duration: duration / 1000, ease: motionTokens.easing.liquidMetal }, onClick: () => setActiveDemo(name) })] }, name))) }), _jsxs("div", { className: "text-sm text-muted-foreground", children: ["Click any box to see the ", activeDemo || 'instant', " duration in action"] })] }));
    }
};
export const EasingCurves = {
    render: () => {
        const [activeEasing, setActiveEasing] = useState('liquidMetal');
        return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "flex flex-wrap gap-2", children: Object.keys(motionTokens.easing).map((easing) => (_jsx(HiveButton, { size: "sm", variant: activeEasing === easing ? 'default' : 'outline', onClick: () => setActiveEasing(easing), children: easing }, easing))) }), _jsx("div", { className: "grid grid-cols-5 gap-2", children: [...Array(5)].map((_, i) => (_jsx(motion.div, { className: "h-20 bg-hive-accent rounded-lg", initial: { y: 100, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: {
                            duration: 0.6,
                            ease: motionTokens.easing[activeEasing],
                            delay: i * 0.1
                        } }, `${activeEasing}-${i}`))) }), _jsxs("div", { className: "text-sm text-muted-foreground", children: ["Current easing: ", _jsx("code", { children: motionTokens.easing[activeEasing] })] })] }));
    }
};
export const SpringPhysics = {
    render: () => {
        const [activeSpring, setActiveSpring] = useState('gentle');
        const [trigger, setTrigger] = useState(0);
        return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "flex gap-2", children: Object.keys(motionTokens.spring).map((spring) => (_jsx(HiveButton, { size: "sm", variant: activeSpring === spring ? 'default' : 'outline', onClick: () => setActiveSpring(spring), children: spring }, spring))) }), _jsx(motion.div, { className: "w-24 h-24 bg-hive-accent rounded-xl mx-auto cursor-pointer", whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, animate: { x: trigger * 200 }, transition: motionTokens.spring[activeSpring], onClick: () => setTrigger(trigger === 0 ? 1 : 0) }), _jsxs("div", { className: "text-center text-sm text-muted-foreground", children: ["Click the box to see ", activeSpring, " spring physics \u2022 Current: ", JSON.stringify(motionTokens.spring[activeSpring])] })] }));
    }
};
export const MagneticInteractions = {
    render: () => {
        const [draggedElement, setDraggedElement] = useState(null);
        const [droppedElements, setDroppedElements] = useState([]);
        return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Magnetic Tool Assembly" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Drag elements to the canvas to see magnetic snapping" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-8", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-4", children: "Element Library" }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: ['Timer', 'Chart', 'Form', 'Media'].map((element, i) => (_jsxs(motion.div, { className: "p-4 bg-hive-background-card border border-hive-border rounded-lg cursor-grab active:cursor-grabbing text-center", drag: true, dragSnapToOrigin: true, whileDrag: {
                                            scale: 1.1,
                                            rotate: 5,
                                            zIndex: 10,
                                            boxShadow: '0 6 50px -3 rgba(255, 215, 0, 0.25)'
                                        }, dragTransition: {
                                            bounceStiffness: 600,
                                            bounceDamping: 20
                                        }, onDragStart: () => setDraggedElement(element), onDragEnd: () => setDraggedElement(null), children: [_jsx("div", { className: "text-2xl mb-2", children: ['⏰', '📊', '📋', '🎬'][i] }), _jsx("div", { className: "text-sm font-medium", children: element })] }, element))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-4", children: "Tool Canvas" }), _jsx(motion.div, { className: "h-64 border-2 border-dashed border-hive-border rounded-lg bg-hive-background-muted/30 flex items-center justify-center", animate: {
                                        borderColor: draggedElement ? 'var(--hive-brand-secondary)' : 'var(--hive-border)',
                                        backgroundColor: draggedElement ? 'color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent)' : 'rgba(var(--hive-background-muted), 0.3)'
                                    }, transition: { duration: 0.2, ease: motionTokens.easing.liquidMetal }, children: droppedElements.length === 0 ? (_jsxs("div", { className: "text-center text-muted-foreground", children: [_jsx("div", { className: "text-3xl mb-2", children: "\uD83C\uDFAF" }), _jsx("div", { className: "text-sm", children: "Drop elements here" })] })) : (_jsx("div", { className: "grid grid-cols-2 gap-2 p-4", children: droppedElements.map((element, i) => (_jsx(motion.div, { className: "p-3 bg-hive-background-card rounded-lg text-center", initial: { scale: 0, rotate: -180 }, animate: { scale: 1, rotate: 0 }, transition: motionTokens.spring.snappy, children: element }, i))) })) })] })] })] }));
    }
};
export const RippleEffects = {
    render: () => {
        const [ripples, setRipples] = useState([]);
        const createRipple = (event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            const newRipple = { x, y, size, id: Date.now() };
            setRipples(prev => [...prev, newRipple]);
            setTimeout(() => {
                setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
            }, 600);
        };
        return (_jsx("div", { className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-4", children: "Button Ripple" }), _jsxs(motion.button, { className: "relative w-full h-20 bg-hive-accent text-[var(--hive-text-primary)] rounded-lg overflow-hidden font-semibold", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, onClick: createRipple, children: ["Click for Ripple Effect", ripples.map((ripple) => (_jsx(motion.span, { className: "absolute bg-[var(--hive-text-primary)] rounded-full opacity-30", style: {
                                            left: ripple.x,
                                            top: ripple.y,
                                            width: ripple.size,
                                            height: ripple.size,
                                        }, initial: { scale: 0 }, animate: { scale: 1, opacity: [0.3, 0] }, transition: { duration: 0.6, ease: motionTokens.easing.liquidMetal } }, ripple.id)))] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-4", children: "Card Cascade" }), _jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => (_jsxs(motion.div, { className: "p-4 bg-hive-background-card border border-hive-border rounded-lg", initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: {
                                        duration: 0.5,
                                        delay: i * 0.1,
                                        ease: motionTokens.easing.liquidMetal
                                    }, whileHover: {
                                        x: 10,
                                        transition: { duration: 0.2, ease: motionTokens.easing.magneticSnap }
                                    }, children: ["Card ", i, " with cascade animation"] }, i))) })] })] }) }));
    }
};
export const ComponentTransitions = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        const [currentView, setCurrentView] = useState('list');
        return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-4", children: "Modal Transition" }), _jsx(HiveButton, { onClick: () => setIsOpen(true), children: "Open Modal" }), _jsx(AnimatePresence, { children: isOpen && (_jsxs(_Fragment, { children: [_jsx(motion.div, { className: "fixed inset-0 bg-[var(--hive-background-primary)]/50 z-40", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3, ease: motionTokens.easing.liquidMetal }, onClick: () => setIsOpen(false) }), _jsx(motion.div, { className: "fixed inset-0 flex items-center justify-center z-50 p-4", initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, transition: motionTokens.spring.gentle, children: _jsxs(HiveCard, { className: "p-6 max-w-md w-full", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Liquid Metal Modal" }), _jsx("p", { className: "text-muted-foreground mb-6", children: "This modal uses HIVE's signature liquid metal motion for premium feel." }), _jsxs("div", { className: "flex gap-3", children: [_jsx(HiveButton, { variant: "outline", onClick: () => setIsOpen(false), children: "Cancel" }), _jsx(HiveButton, { onClick: () => setIsOpen(false), children: "Confirm" })] })] }) })] })) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-4", children: "View Transitions" }), _jsx("div", { className: "flex gap-2 mb-4", children: ['list', 'grid', 'timeline'].map((view) => (_jsx(HiveButton, { size: "sm", variant: currentView === view ? 'default' : 'outline', onClick: () => setCurrentView(view), children: view }, view))) }), _jsx(motion.div, { className: "h-32 bg-hive-background-card border border-hive-border rounded-lg flex items-center justify-center", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease: motionTokens.easing.liquidMetal }, children: _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-3xl mb-2", children: [currentView === 'list' && '📝', currentView === 'grid' && '⚏', currentView === 'timeline' && '📅'] }), _jsxs("div", { className: "font-semibold capitalize", children: [currentView, " View"] })] }) }, currentView)] })] }));
    }
};
export const PerformanceOptimized = {
    render: () => {
        const [count, setCount] = useState(0);
        const [enableComplexAnimation, setEnableComplexAnimation] = useState(false);
        return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(HiveButton, { onClick: () => setCount(count + 1), children: ["Add Element (", count, ")"] }), _jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: enableComplexAnimation, onChange: (e) => setEnableComplexAnimation(e.target.checked) }), _jsx("span", { className: "text-sm", children: "Complex animations" })] })] }), _jsx("div", { className: "grid grid-cols-4 md:grid-cols-8 gap-2", children: [...Array(count)].map((_, i) => (_jsx(motion.div, { className: "aspect-square bg-hive-accent rounded-lg", initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, transition: {
                            duration: enableComplexAnimation ? 1 : 0.3,
                            delay: enableComplexAnimation ? i * 0.05 : 0,
                            ease: motionTokens.easing.liquidMetal
                        }, whileHover: {
                            scale: enableComplexAnimation ? 1.2 : 1.05,
                            transition: { duration: 0.2 }
                        } }, i))) }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Performance tip: Complex animations are optimized for transform and opacity only. Try adding many elements to test 60fps performance." })] }));
    }
};
//# sourceMappingURL=motion-system.stories.js.map