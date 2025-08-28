"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { darkLuxury, luxuryShadows } from '../theme/dark-luxury';
export const HiveRipple = ({ children, className, disabled = false }) => {
    const [ripples, setRipples] = useState([]);
    const createRipple = (event) => {
        if (disabled)
            return;
        const container = event.currentTarget;
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const newRipple = { id: Date.now(), x, y };
        setRipples(prev => [...prev, newRipple]);
        // Remove ripple after animation
        setTimeout(() => {
            setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
        }, 600);
    };
    return (_jsxs("div", { className: cn('relative overflow-hidden', className), onClick: createRipple, style: { isolation: 'isolate' }, children: [children, _jsx(AnimatePresence, { children: ripples.map(ripple => (_jsx(motion.div, { className: "absolute pointer-events-none", style: {
                        left: ripple.x - 10,
                        top: ripple.y - 10,
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${darkLuxury.goldGlow} 0%, transparent 70%)`,
                    }, initial: { scale: 0, opacity: 0.8 }, animate: { scale: 8, opacity: 0 }, exit: { opacity: 0 }, transition: {
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94], // magnetic easing
                    } }, ripple.id))) })] }));
};
export const HiveMagneticHover = ({ children, className, intensity = 'medium', disabled = false, initial, animate, exit, transition, layoutId }) => {
    const intensityMap = {
        subtle: { scale: 1.01, y: -1, shadow: luxuryShadows.level2 },
        medium: { scale: 1.02, y: -2, shadow: luxuryShadows.hover },
        strong: { scale: 1.03, y: -4, shadow: luxuryShadows.level4 },
    };
    const config = intensityMap[intensity];
    return (_jsx(motion.div, { className: cn('cursor-pointer', className), initial: initial, animate: animate, exit: exit, transition: transition, layoutId: layoutId, whileHover: disabled ? {} : {
            scale: config.scale,
            y: config.y,
            transition: {
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1], // silk easing
            }
        }, whileTap: disabled ? {} : {
            scale: 0.98,
            transition: {
                duration: 0.1,
                ease: [0.25, 0.1, 0.25, 1], // snap easing
            }
        }, style: {
            willChange: 'transform',
            filter: disabled ? undefined : 'drop-shadow(0 4px 8px color-mix(in_srgb,var(--hive-background-primary)_20%,transparent))',
        }, children: children }));
};
export const HiveCascade = ({ children, className, staggerDelay = 0.1, direction = 'up' }) => {
    const directionMap = {
        up: { y: 20 },
        down: { y: -20 },
        left: { x: 20 },
        right: { x: -20 },
    };
    const offset = directionMap[direction];
    return (_jsx(motion.div, { className: className, initial: "hidden", animate: "visible", variants: {
            hidden: {},
            visible: {
                transition: {
                    staggerChildren: staggerDelay,
                }
            }
        }, children: React.Children.map(children, (child, index) => (_jsx(motion.div, { variants: {
                hidden: {
                    opacity: 0,
                    ...offset,
                },
                visible: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: {
                        duration: 0.35,
                        ease: [0.19, 1, 0.22, 1], // molten easing
                    }
                }
            }, children: child }))) }));
};
export const HiveFloat = ({ children, className, intensity = 'medium', duration = 3 }) => {
    const intensityMap = {
        subtle: 3,
        medium: 6,
        strong: 10,
    };
    const yOffset = intensityMap[intensity];
    return (_jsx(motion.div, { className: className, animate: {
            y: [-yOffset / 2, yOffset / 2, -yOffset / 2],
        }, transition: {
            duration,
            repeat: Infinity,
            ease: [0.23, 1, 0.32, 1], // liquid easing
        }, style: {
            willChange: 'transform',
        }, children: children }));
};
export const HiveShimmer = ({ className, width = '100%', height = '5', radius = '1' }) => {
    return (_jsx("div", { className: cn('relative overflow-hidden', className), style: {
            width,
            height,
            borderRadius: radius,
            background: darkLuxury.graphite,
        }, children: _jsx(motion.div, { className: "absolute inset-0", style: {
                background: `linear-gradient(90deg, transparent, ${darkLuxury.glassShine}, transparent)`,
            }, animate: {
                x: ['-100%', '100%'],
            }, transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: [0.23, 1, 0.32, 1], // liquid easing
            } }) }));
};
export const HiveGlowPulse = ({ children, className, color = darkLuxury.gold, intensity = 'medium' }) => {
    const intensityMap = {
        subtle: 0.1,
        medium: 0.2,
        strong: 0.3,
    };
    const glowIntensity = intensityMap[intensity];
    return (_jsx(motion.div, { className: className, animate: {
            boxShadow: [
                `0 0 10px ${color}${Math.floor(glowIntensity * 255).toString(16)}`,
                `0 0 5 ${color}${Math.floor(glowIntensity * 1.5 * 255).toString(16)}`,
                `0 0 10px ${color}${Math.floor(glowIntensity * 255).toString(16)}`,
            ],
        }, transition: {
            duration: 2,
            repeat: Infinity,
            ease: [0.23, 1, 0.32, 1], // liquid easing
        }, children: children }));
};
export const HivePageTransition = ({ children, className }) => {
    return (_jsx(motion.div, { className: className, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: {
            duration: 0.4,
            ease: [0.19, 1, 0.22, 1], // molten easing
        }, children: children }));
};
export const HiveToolPlant = ({ children, className, planted = false }) => {
    return (_jsx(motion.div, { className: className, initial: { y: -50, scale: 0.8, opacity: 0, rotate: -5 }, animate: planted ? {
            y: 0,
            scale: 1,
            opacity: 1,
            rotate: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 25,
                mass: 0.8,
            }
        } : {}, style: {
            willChange: 'transform, opacity',
        }, children: children }));
};
// Main motion wrapper export for consistency
export const HiveMotionWrapper = HiveMagneticHover;
//# sourceMappingURL=hive-motion-wrapper.js.map