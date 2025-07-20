"use strict";
// HIVE Liquid Metal Motion System - Complete Integration
// Unified system that orchestrates all motion with premium feel
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.liquidMetalPerformance = exports.liquidMetalUtils = exports.liquidMetalOrchestrator = exports.LiquidMetalOrchestrator = exports.milestoneSequences = exports.rippleCascade = exports.spaceActivation = exports.liquidFlow = exports.magneticInteractions = exports.liquidTiming = exports.liquidEasing = exports.liquidMetalPhysics = void 0;
// 🏗️ Core Liquid Metal Physics
exports.liquidMetalPhysics = {
    // Mass settings for different component types
    mass: {
        light: 0.5, // Buttons, toggles, micro-interactions
        standard: 0.8, // Cards, forms, most UI elements
        heavy: 1.2, // Modals, space cards, important elements
        massive: 1.8, // Page transitions, space activation
    },
    // Stiffness for responsiveness feel
    stiffness: {
        snap: 800, // Immediate magnetic snap
        firm: 600, // Quick decisive response
        balanced: 400, // Standard HIVE response
        gentle: 200, // Flowing, organic movement
    },
    // Damping for settle behavior
    damping: {
        tight: 35, // Quick settle, no overshoot
        balanced: 25, // Perfect HIVE settle
        loose: 15, // Some natural overshoot
        flowing: 10, // Liquid-like settle
    }
};
// 🌊 Liquid Metal Signature Easing System
exports.liquidEasing = {
    // The signature HIVE curve - liquid mercury feel
    signature: [0.23, 1, 0.32, 1],
    // Magnetic attraction - starts slow, accelerates smoothly
    magnetic: [0.25, 0.46, 0.45, 0.94],
    // Silk touch - premium butter smooth
    silk: [0.16, 1, 0.3, 1],
    // Steel spring - controlled bounce for interactions
    steel: [0.34, 1.56, 0.64, 1],
    // Molten flow - for cascading sequences
    molten: [0.19, 1, 0.22, 1],
    // Premium snap - instant but sophisticated
    snap: [0.25, 0.1, 0.25, 1],
};
// ⏱️ Orchestrated Timing System
exports.liquidTiming = {
    // Core durations aligned with 60fps
    duration: {
        micro: 0.1, // 6 frames - instant feedback
        snap: 0.15, // 9 frames - button press
        quick: 0.2, // 12 frames - toggle, hover
        smooth: 0.4, // 24 frames - HIVE signature
        flowing: 0.6, // 36 frames - card movement
        dramatic: 0.8, // 48 frames - space activation
        orchestrated: 1.2, // 72 frames - full sequences
        cinematic: 1.8, // 108 frames - major milestones
    },
    // Cascade timing for ripple effects
    cascade: {
        wave: 0.03, // Ultra-fast wave propagation
        ripple: 0.05, // Standard ripple spread
        stagger: 0.08, // Deliberate sequential reveal
        sequence: 0.12, // Orchestrated multi-element
    },
    // Magnetic zones for tool assembly
    magnetic: {
        detection: 24, // px - starts magnetic pull
        attraction: 16, // px - strong pull begins
        snap: 8, // px - snaps into place
        release: 32, // px - releases magnetic hold
    }
};
// 🧲 Enhanced Magnetic Interaction System
exports.magneticInteractions = {
    // Standard button/card hover with magnetic lift
    hover: {
        rest: {
            scale: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            transition: {
                type: "spring",
                mass: exports.liquidMetalPhysics.mass.standard,
                stiffness: exports.liquidMetalPhysics.stiffness.balanced,
                damping: exports.liquidMetalPhysics.damping.balanced,
                duration: exports.liquidTiming.duration.smooth,
            }
        },
        magnetic: {
            scale: 1.02,
            y: -3,
            rotateX: 1,
            rotateY: 0.5,
            transition: {
                type: "spring",
                mass: exports.liquidMetalPhysics.mass.light,
                stiffness: exports.liquidMetalPhysics.stiffness.firm,
                damping: exports.liquidMetalPhysics.damping.tight,
                duration: exports.liquidTiming.duration.quick,
            }
        },
        pressed: {
            scale: 0.98,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            transition: {
                type: "spring",
                mass: exports.liquidMetalPhysics.mass.light,
                stiffness: exports.liquidMetalPhysics.stiffness.snap,
                damping: exports.liquidMetalPhysics.damping.tight,
                duration: exports.liquidTiming.duration.micro,
            }
        }
    },
    // Tool assembly magnetic snap
    toolSnap: {
        floating: {
            y: 0,
            rotate: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                mass: exports.liquidMetalPhysics.mass.standard,
                stiffness: exports.liquidMetalPhysics.stiffness.gentle,
                damping: exports.liquidMetalPhysics.damping.flowing,
            }
        },
        approaching: {
            scale: 1.05,
            filter: "blur(0.5px)",
            transition: {
                type: "spring",
                mass: exports.liquidMetalPhysics.mass.light,
                stiffness: exports.liquidMetalPhysics.stiffness.balanced,
                damping: exports.liquidMetalPhysics.damping.balanced,
                duration: exports.liquidTiming.duration.quick,
            }
        },
        snapped: {
            scale: 1,
            y: 0,
            rotate: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                mass: exports.liquidMetalPhysics.mass.heavy,
                stiffness: exports.liquidMetalPhysics.stiffness.snap,
                damping: exports.liquidMetalPhysics.damping.tight,
                duration: exports.liquidTiming.duration.snap,
            }
        }
    }
};
// 🌊 Liquid Flow Variants for Content
exports.liquidFlow = {
    // Hidden state - compressed like liquid metal
    hidden: {
        opacity: 0,
        scale: 0.85,
        y: 20,
        rotateX: -10,
        filter: "blur(4px)",
        transition: { duration: 0 }
    },
    // Visible state - expands with liquid smoothness
    visible: function (index) {
        if (index === void 0) { index = 0; }
        return ({
            opacity: 1,
            scale: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            transition: {
                delay: index * exports.liquidTiming.cascade.stagger,
                type: "spring",
                mass: exports.liquidMetalPhysics.mass.standard,
                stiffness: exports.liquidMetalPhysics.stiffness.balanced,
                damping: exports.liquidMetalPhysics.damping.balanced,
                duration: exports.liquidTiming.duration.flowing,
            }
        });
    },
    // Exit state - flows out like mercury
    exit: {
        opacity: 0,
        scale: 0.9,
        y: -15,
        rotateX: 5,
        filter: "blur(2px)",
        transition: {
            type: "spring",
            mass: exports.liquidMetalPhysics.mass.light,
            stiffness: exports.liquidMetalPhysics.stiffness.firm,
            damping: exports.liquidMetalPhysics.damping.tight,
            duration: exports.liquidTiming.duration.quick,
        }
    }
};
// 🎭 Space Activation Sequence - Orchestrated awakening
exports.spaceActivation = {
    dormant: {
        scale: 1,
        opacity: 0.7,
        filter: "grayscale(0.3) blur(0.5px)",
        transition: {
            duration: 3,
            ease: exports.liquidEasing.signature,
            repeat: Infinity,
            repeatType: "reverse",
        }
    },
    awakening: {
        scale: 1.02,
        opacity: 1,
        filter: "grayscale(0) blur(0px)",
        transition: {
            type: "spring",
            mass: exports.liquidMetalPhysics.mass.heavy,
            stiffness: exports.liquidMetalPhysics.stiffness.gentle,
            damping: exports.liquidMetalPhysics.damping.balanced,
            duration: exports.liquidTiming.duration.dramatic,
        }
    },
    activated: {
        scale: 1,
        opacity: 1,
        filter: "grayscale(0) blur(0px)",
        transition: {
            type: "spring",
            mass: exports.liquidMetalPhysics.mass.standard,
            stiffness: exports.liquidMetalPhysics.stiffness.balanced,
            damping: exports.liquidMetalPhysics.damping.balanced,
            duration: exports.liquidTiming.duration.smooth,
        }
    }
};
// 🌀 Ripple Cascade System - For space activation moments
exports.rippleCascade = {
    // Primary ripple from activation point
    origin: {
        scale: [0, 2.5, 3],
        opacity: [0.8, 0.4, 0],
        filter: ["blur(0px)", "blur(1px)", "blur(2px)"],
        transition: {
            duration: exports.liquidTiming.duration.dramatic,
            ease: exports.liquidEasing.molten,
        }
    },
    // Connected elements that follow the ripple
    connected: function (distance) { return ({
        scale: [1, 1.03, 1],
        opacity: [1, 0.9, 1],
        y: [0, -2, 0],
        transition: {
            delay: distance * exports.liquidTiming.cascade.ripple,
            type: "spring",
            mass: exports.liquidMetalPhysics.mass.standard,
            stiffness: exports.liquidMetalPhysics.stiffness.balanced,
            damping: exports.liquidMetalPhysics.damping.balanced,
            duration: exports.liquidTiming.duration.flowing,
        }
    }); },
    // Secondary wave for larger activations
    wave: function (distance) { return ({
        scale: [1, 1.01, 1],
        filter: ["blur(0px)", "blur(0.5px)", "blur(0px)"],
        transition: {
            delay: distance * exports.liquidTiming.cascade.wave + 0.3,
            duration: exports.liquidTiming.duration.smooth,
            ease: exports.liquidEasing.silk,
        }
    }); }
};
// 🏆 Milestone Celebrations - Orchestrated sequences
exports.milestoneSequences = {
    // Tool creation success
    toolCreated: {
        initial: {
            scale: 0.8,
            opacity: 0,
            rotate: -10,
            y: 30,
            filter: "blur(3px)"
        },
        animate: {
            scale: [0.8, 1.1, 1],
            opacity: 1,
            rotate: 0,
            y: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                mass: exports.liquidMetalPhysics.mass.heavy,
                stiffness: exports.liquidMetalPhysics.stiffness.balanced,
                damping: exports.liquidMetalPhysics.damping.loose,
                duration: exports.liquidTiming.duration.orchestrated,
                times: [0, 0.6, 1],
            }
        }
    },
    // Space activation celebration
    spaceActivated: {
        initial: {
            scale: 0.9,
            opacity: 0,
            rotate: -15,
            filter: "grayscale(1) blur(4px)"
        },
        animate: {
            scale: 1,
            opacity: 1,
            rotate: 0,
            filter: "grayscale(0) blur(0px)",
            transition: {
                type: "spring",
                mass: exports.liquidMetalPhysics.mass.massive,
                stiffness: exports.liquidMetalPhysics.stiffness.gentle,
                damping: exports.liquidMetalPhysics.damping.balanced,
                duration: exports.liquidTiming.duration.cinematic,
            }
        }
    },
    // Achievement unlock
    achievement: {
        initial: {
            scale: 0,
            rotate: -180,
            opacity: 0,
            filter: "brightness(0.5) blur(4px)"
        },
        animate: {
            scale: [0, 1.2, 1],
            rotate: 0,
            opacity: 1,
            filter: "brightness(1) blur(0px)",
            transition: {
                type: "spring",
                mass: exports.liquidMetalPhysics.mass.heavy,
                stiffness: exports.liquidMetalPhysics.stiffness.balanced,
                damping: exports.liquidMetalPhysics.damping.loose,
                duration: exports.liquidTiming.duration.orchestrated,
                times: [0, 0.7, 1],
            }
        }
    }
};
// 🎮 Enhanced Motion Orchestrator
var LiquidMetalOrchestrator = /** @class */ (function () {
    function LiquidMetalOrchestrator() {
        this.sequences = new Map();
        this.cascadeQueue = [];
        this.isProcessingCascade = false;
    }
    // Register animation controls for orchestration
    LiquidMetalOrchestrator.prototype.register = function (id, controls) {
        this.sequences.set(id, controls);
    };
    // Remove controls when component unmounts
    LiquidMetalOrchestrator.prototype.unregister = function (id) {
        this.sequences.delete(id);
    };
    // Trigger space activation ripple effect
    LiquidMetalOrchestrator.prototype.triggerSpaceActivation = function (originId, connectedElements) {
        return __awaiter(this, void 0, void 0, function () {
            var origin, sorted;
            var _this = this;
            return __generator(this, function (_a) {
                origin = this.sequences.get(originId);
                if (origin) {
                    origin.start(exports.rippleCascade.origin);
                }
                sorted = connectedElements.sort(function (a, b) { return a.distance - b.distance; });
                // Trigger connected elements
                sorted.forEach(function (_a) {
                    var id = _a.id, distance = _a.distance;
                    var controls = _this.sequences.get(id);
                    if (controls) {
                        controls.start(exports.rippleCascade.connected(distance));
                        // Add secondary wave for distant elements
                        if (distance > 100) {
                            setTimeout(function () {
                                controls.start(exports.rippleCascade.wave(distance));
                            }, 300);
                        }
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    // Trigger milestone celebration sequence
    LiquidMetalOrchestrator.prototype.triggerMilestone = function (type, elementIds) {
        return __awaiter(this, void 0, void 0, function () {
            var sequence, _loop_1, this_1, i;
            return __generator(this, function (_a) {
                sequence = exports.milestoneSequences[type];
                _loop_1 = function (i) {
                    var controls = this_1.sequences.get(elementIds[i]);
                    if (controls) {
                        setTimeout(function () {
                            controls.start(sequence.animate);
                        }, i * exports.liquidTiming.cascade.sequence * 1000);
                    }
                };
                this_1 = this;
                for (i = 0; i < elementIds.length; i++) {
                    _loop_1(i);
                }
                return [2 /*return*/];
            });
        });
    };
    // Process queued cascade animations
    LiquidMetalOrchestrator.prototype.processCascadeQueue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var animation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isProcessingCascade || this.cascadeQueue.length === 0)
                            return [2 /*return*/];
                        this.isProcessingCascade = true;
                        _a.label = 1;
                    case 1:
                        if (!(this.cascadeQueue.length > 0)) return [3 /*break*/, 5];
                        animation = this.cascadeQueue.shift();
                        if (!animation) return [3 /*break*/, 4];
                        return [4 /*yield*/, animation()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, new Promise(function (resolve) {
                                return setTimeout(resolve, exports.liquidTiming.cascade.stagger * 1000);
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 1];
                    case 5:
                        this.isProcessingCascade = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    // Queue cascade animation
    LiquidMetalOrchestrator.prototype.queueCascade = function (animation) {
        this.cascadeQueue.push(animation);
        this.processCascadeQueue();
    };
    // Emergency stop all animations
    LiquidMetalOrchestrator.prototype.stopAll = function () {
        this.sequences.forEach(function (controls) {
            controls.stop();
        });
        this.cascadeQueue.length = 0;
        this.isProcessingCascade = false;
    };
    return LiquidMetalOrchestrator;
}());
exports.LiquidMetalOrchestrator = LiquidMetalOrchestrator;
// Export singleton orchestrator
exports.liquidMetalOrchestrator = new LiquidMetalOrchestrator();
// 🔧 Utility Functions
exports.liquidMetalUtils = {
    // Calculate magnetic field strength based on distance
    calculateMagneticStrength: function (distance) {
        var maxDistance = exports.liquidTiming.magnetic.detection;
        return Math.max(0, 1 - (distance / maxDistance));
    },
    // Check if element is in magnetic zone
    isInMagneticZone: function (distance, zone) {
        return distance <= exports.liquidTiming.magnetic[zone];
    },
    // Generate cascade delay for index
    getCascadeDelay: function (index, type) {
        if (type === void 0) { type = 'stagger'; }
        return index * exports.liquidTiming.cascade[type];
    },
    // Create optimized spring transition
    createSpringTransition: function (mass, stiffness, damping) {
        if (mass === void 0) { mass = 'standard'; }
        if (stiffness === void 0) { stiffness = 'balanced'; }
        if (damping === void 0) { damping = 'balanced'; }
        return {
            type: "spring",
            mass: exports.liquidMetalPhysics.mass[mass],
            stiffness: exports.liquidMetalPhysics.stiffness[stiffness],
            damping: exports.liquidMetalPhysics.damping[damping],
        };
    },
    // Create eased transition
    createEasedTransition: function (duration, easing) {
        if (duration === void 0) { duration = 'smooth'; }
        if (easing === void 0) { easing = 'signature'; }
        return {
            duration: exports.liquidTiming.duration[duration],
            ease: exports.liquidEasing[easing],
        };
    }
};
// 🎨 Performance Optimizations
exports.liquidMetalPerformance = {
    // GPU acceleration settings
    gpuLayer: {
        willChange: 'transform, opacity, filter',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        perspective: 1000,
    },
    // Reduced motion compliance
    respectsReducedMotion: function (motionStyles) { return (__assign(__assign({}, motionStyles), { '@media (prefers-reduced-motion: reduce)': {
            animation: 'none',
            transition: 'none',
            transform: 'none',
        } })); },
    // Intersection observer for performance
    createIntersectionObserver: function (callback) {
        return new IntersectionObserver(callback, {
            threshold: 0.1,
            rootMargin: '50px',
        });
    }
};
