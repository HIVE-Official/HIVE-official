"use strict";
// Unified HIVE Motion System Utilities
// Consolidates all motion patterns into a single, comprehensive system
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.गति = exports.magneticSystem = exports.hiveMotionVariants = exports.liquidMetalMotion = exports.hiveMotionCore = void 0;
exports.separateMotionProps = separateMotionProps;
exports.getMotionProps = getMotionProps;
exports.getLogoMotionProps = getLogoMotionProps;
exports.getHiveMotionProps = getHiveMotionProps;
exports.getCascadeProps = getCascadeProps;
exports.getStaggerProps = getStaggerProps;
// Utility to separate conflicting props for Framer Motion components
function separateMotionProps(props) {
    var layout = props.layout, onDrag = props.onDrag, onDragStart = props.onDragStart, onDragEnd = props.onDragEnd, onAnimationStart = props.onAnimationStart, onAnimationEnd = props.onAnimationEnd, onCopy = props.onCopy, onCut = props.onCut, onPaste = props.onPaste, size = props.size, breakpoint = props.breakpoint, theme = props.theme, logoLayout = props.logoLayout, animated = props.animated, 
    // Remove any other conflicting props
    cleanProps = __rest(props, ["layout", "onDrag", "onDragStart", "onDragEnd", "onAnimationStart", "onAnimationEnd", "onCopy", "onCut", "onPaste", "size", "breakpoint", "theme", "logoLayout", "animated"]);
    return cleanProps;
}
// Type-safe prop separation for motion components
function getMotionProps(props) {
    return separateMotionProps(props);
}
// Specific utility for logo components
function getLogoMotionProps(props) {
    var layout = props.layout, onDrag = props.onDrag, onDragStart = props.onDragStart, onDragEnd = props.onDragEnd, onAnimationStart = props.onAnimationStart, onAnimationEnd = props.onAnimationEnd, size = props.size, breakpoint = props.breakpoint, theme = props.theme, showWordmark = props.showWordmark, adaptToContext = props.adaptToContext, userPreferences = props.userPreferences, cleanProps = __rest(props, ["layout", "onDrag", "onDragStart", "onDragEnd", "onAnimationStart", "onAnimationEnd", "size", "breakpoint", "theme", "showWordmark", "adaptToContext", "userPreferences"]);
    return cleanProps;
}
// Core HIVE Motion Personality Constants
exports.hiveMotionCore = {
    // Signature liquid metal easing
    easing: [0.23, 1, 0.32, 1],
    // Duration scale for orchestrated timing
    durations: {
        instant: 0.1,
        quick: 0.2,
        smooth: 0.4,
        flowing: 0.6,
        dramatic: 0.8,
        orchestrated: 1.2,
    },
    // Physics constants
    physics: {
        mass: 0.8,
        stiffness: 400,
        damping: 25,
    },
    // Performance optimization
    performance: {
        willChange: 'transform',
        transformOrigin: 'center',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
    }
};
// HIVE Liquid Metal Motion System
exports.liquidMetalMotion = {
    // Standard magnetic hover for buttons and cards
    magneticHover: {
        y: "var(--hive-transform-moveHover)",
        scale: "var(--hive-transform-scaleHover)",
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25,
            mass: 0.8,
        }
    },
    // Tap/press interaction
    magneticTap: {
        scale: "var(--hive-transform-scaleTap)",
        y: "var(--hive-transform-movePress)",
        transition: {
            type: "spring",
            stiffness: 600,
            damping: 30,
        }
    },
    // Entrance animations
    entrance: {
        initial: { opacity: 0, y: 20, scale: 0.9 },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: exports.hiveMotionCore.durations.smooth,
                ease: exports.hiveMotionCore.easing,
            }
        }
    },
    // Exit animations
    exit: {
        opacity: 0,
        scale: 0.95,
        y: -10,
        transition: {
            duration: exports.hiveMotionCore.durations.quick,
            ease: exports.hiveMotionCore.easing,
        }
    }
};
// Standard Motion Variants (consolidating basic motion.ts)
exports.hiveMotionVariants = {
    // Fade transitions
    fadeIn: {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                duration: exports.hiveMotionCore.durations.smooth,
                ease: exports.hiveMotionCore.easing,
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: exports.hiveMotionCore.durations.quick,
                ease: exports.hiveMotionCore.easing,
            }
        },
    },
    // Slide transitions with liquid feel
    slideIn: {
        initial: { y: 20, opacity: 0 },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: exports.hiveMotionCore.durations.smooth,
                ease: exports.hiveMotionCore.easing,
            }
        },
        exit: {
            y: -20,
            opacity: 0,
            transition: {
                duration: exports.hiveMotionCore.durations.quick,
                ease: exports.hiveMotionCore.easing,
            }
        },
    },
    // Scale transitions with liquid metal feel
    scaleIn: {
        initial: { scale: 0.9, opacity: 0 },
        animate: {
            scale: 1,
            opacity: 1,
            transition: __assign({ duration: exports.hiveMotionCore.durations.smooth, ease: exports.hiveMotionCore.easing, type: "spring" }, exports.hiveMotionCore.physics)
        },
        exit: {
            scale: 0.9,
            opacity: 0,
            transition: {
                duration: exports.hiveMotionCore.durations.quick,
                ease: exports.hiveMotionCore.easing,
            }
        },
    },
    // Liquid flow for complex sequences
    liquidFlow: {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 20,
            transition: {
                duration: exports.hiveMotionCore.durations.quick,
                ease: exports.hiveMotionCore.easing,
            }
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: __assign({ duration: exports.hiveMotionCore.durations.flowing, ease: exports.hiveMotionCore.easing, type: "spring" }, exports.hiveMotionCore.physics)
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            y: -10,
            transition: {
                duration: exports.hiveMotionCore.durations.quick,
                ease: exports.hiveMotionCore.easing,
            }
        }
    }
};
// Get motion props based on component type
function getHiveMotionProps(type, enableMagnetic) {
    if (type === void 0) { type = 'button'; }
    if (enableMagnetic === void 0) { enableMagnetic = true; }
    var base = {
        style: {
            willChange: 'transform',
            transformOrigin: 'center',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
        }
    };
    if (!enableMagnetic)
        return base;
    switch (type) {
        case 'button':
            return __assign(__assign({}, base), { whileHover: exports.liquidMetalMotion.magneticHover, whileTap: exports.liquidMetalMotion.magneticTap });
        case 'card':
            return __assign(__assign({}, base), { whileHover: {
                    y: -2,
                    scale: 1.01,
                    transition: exports.liquidMetalMotion.magneticHover.transition,
                }, whileTap: {
                    scale: 0.99,
                    transition: exports.liquidMetalMotion.magneticTap.transition,
                } });
        case 'modal':
            return __assign(__assign(__assign({}, base), exports.liquidMetalMotion.entrance), { exit: exports.liquidMetalMotion.exit });
        case 'surface':
            return __assign(__assign({}, base), { whileHover: {
                    scale: 1.005,
                    transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                    }
                } });
        default:
            return base;
    }
}
// Cascade animation for multiple elements
function getCascadeProps(index, delay) {
    if (delay === void 0) { delay = 0.05; }
    return {
        initial: { opacity: 0, y: 10 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                delay: index * delay,
                duration: exports.hiveMotionCore.durations.smooth,
                ease: exports.hiveMotionCore.easing,
            }
        }
    };
}
// Advanced cascade with stagger patterns
function getStaggerProps(count, pattern) {
    if (pattern === void 0) { pattern = 'wave'; }
    var delays = {
        wave: 0.03,
        ripple: 0.08,
        sequence: 0.12,
    };
    return {
        animate: {
            transition: {
                staggerChildren: delays[pattern],
                delayChildren: 0.1,
            }
        }
    };
}
// Magnetic attraction system for tool building
exports.magneticSystem = {
    zones: {
        near: 20,
        snap: 8,
        release: 40,
    },
    snapAnimation: {
        type: "spring",
        stiffness: 800,
        damping: 30,
        mass: 0.5,
    },
    pullAnimation: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.8,
    }
};
// Export legacy motion variants for backwards compatibility
exports.गति = exports.hiveMotionVariants; // Support for existing imports
