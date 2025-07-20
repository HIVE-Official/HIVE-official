"use strict";
// HIVE Motion System Foundation - Liquid Metal with Orchestrated Physics
// Every animation feels like liquid metal with real weight and premium precision
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
exports.motionUtils = exports.motionCSS = exports.motionOrchestrator = exports.HiveMotionOrchestrator = exports.milestoneSequence = exports.ambientBreathing = exports.toolAssembly = exports.rippleCascade = exports.magneticHover = exports.feedFlow = exports.liquidFlow = exports.magneticSnap = exports.cascadeTiming = exports.motionDurations = exports.liquidMetal = void 0;
// 🎬 Core Motion Personality: Liquid Metal
// Premium, weighty, but impossibly smooth
exports.liquidMetal = {
    // The signature HIVE easing - smooth operator
    easing: [0.23, 1, 0.32, 1],
    // Physics constants for weight and momentum
    physics: {
        mass: 0.8, // Feels substantial but not sluggish
        stiffness: 400, // Responsive spring
        damping: 25, // Smooth settle without bounce
        velocity: 0, // Clean start
    },
    // Performance optimization
    performance: {
        willChange: 'transform',
        transformOrigin: 'center',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)', // GPU layer
    }
};
// 🌊 Motion Duration Scale - Orchestrated Timing
exports.motionDurations = {
    instant: 0.1, // Micro-interactions
    quick: 0.2, // Button press, toggle
    smooth: 0.4, // The signature HIVE duration
    flowing: 0.6, // Card transitions, form reveals
    dramatic: 0.8, // Space activation, major state change
    orchestrated: 1.2, // Full sequences, achievement moments
};
// ⚡ Cascade Timing System - For ripple effects
exports.cascadeTiming = {
    stagger: 0.05, // 50ms between elements
    ripple: 0.08, // Faster for ripple effects
    sequence: 0.12, // Slower for deliberate sequences
    wave: 0.03, // Ultra-fast wave effects
};
// 🧲 Magnetic Snap System - Tool Assembly Physics
exports.magneticSnap = {
    // Detection zones for magnetic attraction
    zones: {
        near: 20, // px - starts magnetic pull
        snap: 8, // px - snaps into place
        release: 40, // px - releases magnetic hold
    },
    // Snap animation
    snapAnimation: {
        type: "spring",
        stiffness: 800, // Firm snap
        damping: 30, // Quick settle
        mass: 0.5, // Light feel for precision
    },
    // Magnetic pull animation
    pullAnimation: {
        type: "spring",
        stiffness: 300, // Gradual pull
        damping: 20, // Smooth approach
        mass: 0.8, // Heavier feel for anticipation
    }
};
// 🌀 Liquid Flow Variants - For content that flows like liquid metal
exports.liquidFlow = {
    // Hidden state - compressed and transparent
    hidden: {
        opacity: 0,
        scale: 0.8,
        y: 20,
        transition: {
            duration: 0,
        }
    },
    // Visible state - expands with liquid smoothness
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: __assign({ duration: exports.motionDurations.smooth, ease: exports.liquidMetal.easing, type: "spring" }, exports.liquidMetal.physics)
    },
    // Exit state - flows out smoothly
    exit: {
        opacity: 0,
        scale: 0.9,
        y: -10,
        transition: {
            duration: exports.motionDurations.quick,
            ease: exports.liquidMetal.easing,
        }
    }
};
// 📡 Feed Update Flow - New items flow in like liquid metal
exports.feedFlow = {
    hidden: {
        opacity: 0,
        x: -100,
        scale: 0.9,
        transition: { duration: 0 }
    },
    visible: function (index) { return ({
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            delay: index * exports.cascadeTiming.stagger,
            duration: exports.motionDurations.flowing,
            ease: exports.liquidMetal.easing,
            type: "spring",
            stiffness: 300,
            damping: 25,
        }
    }); },
    // Push existing content with real weight
    pushed: {
        y: -5,
        transition: {
            duration: exports.motionDurations.quick,
            ease: exports.liquidMetal.easing,
        }
    }
};
// 🎯 Magnetic Hover - Premium interaction feel
exports.magneticHover = {
    rest: {
        scale: 1,
        y: 0,
        transition: __assign({ duration: exports.motionDurations.smooth, ease: exports.liquidMetal.easing, type: "spring" }, exports.liquidMetal.physics)
    },
    hover: {
        scale: 1.02,
        y: -2,
        transition: {
            duration: exports.motionDurations.quick,
            ease: exports.liquidMetal.easing,
            type: "spring",
            stiffness: 400,
            damping: 15,
        }
    },
    pressed: {
        scale: 0.98,
        y: 0,
        transition: {
            duration: exports.motionDurations.instant,
            ease: exports.liquidMetal.easing,
        }
    }
};
// 🌊 Ripple Cascade - Space activation ripples
exports.rippleCascade = {
    // Central ripple that spreads outward
    center: {
        scale: [0, 2, 2.5],
        opacity: [0.6, 0.3, 0],
        transition: {
            duration: exports.motionDurations.dramatic,
            ease: exports.liquidMetal.easing,
        }
    },
    // Connected components that follow
    connected: function (distance) { return ({
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1],
        transition: {
            delay: distance * exports.cascadeTiming.ripple,
            duration: exports.motionDurations.flowing,
            ease: exports.liquidMetal.easing,
        }
    }); }
};
// 🏗️ Tool Assembly Animation - Elements snap together
exports.toolAssembly = {
    floating: {
        y: 0,
        rotate: 0,
        scale: 1,
        transition: __assign({ duration: exports.motionDurations.smooth, ease: exports.liquidMetal.easing, type: "spring" }, exports.liquidMetal.physics)
    },
    // Approaching magnetic field
    approaching: {
        scale: 1.05,
        transition: {
            duration: exports.motionDurations.quick,
            ease: exports.liquidMetal.easing,
        }
    },
    // Snapped into place
    assembled: {
        scale: 1,
        y: 0,
        rotate: 0,
        transition: __assign(__assign({}, exports.magneticSnap.snapAnimation), { duration: exports.motionDurations.quick })
    }
};
// 🎭 Ambient Breathing - Dormant spaces waiting for activation
exports.ambientBreathing = {
    dormant: {
        scale: 1,
        opacity: 0.7,
        transition: {
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
        }
    },
    awakening: {
        scale: 1.02,
        opacity: 1,
        transition: __assign({ duration: exports.motionDurations.dramatic, ease: exports.liquidMetal.easing, type: "spring" }, exports.liquidMetal.physics)
    }
};
// 🏆 Milestone Moments - Big orchestrated sequences
exports.milestoneSequence = {
    // Space activation celebration
    spaceActivation: {
        initial: { scale: 0.9, opacity: 0, rotate: -5 },
        animate: {
            scale: 1,
            opacity: 1,
            rotate: 0,
            transition: {
                duration: exports.motionDurations.orchestrated,
                ease: exports.liquidMetal.easing,
                type: "spring",
                stiffness: 200,
                damping: 20,
            }
        }
    },
    // Tool launch sequence
    toolLaunch: {
        initial: { y: 50, opacity: 0, scale: 0.8 },
        animate: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: __assign({ duration: exports.motionDurations.dramatic, ease: exports.liquidMetal.easing, type: "spring" }, exports.liquidMetal.physics)
        }
    },
    // Achievement unlock
    achievement: {
        initial: { scale: 0, rotate: -180, opacity: 0 },
        animate: {
            scale: [0, 1.2, 1],
            rotate: 0,
            opacity: 1,
            transition: {
                duration: exports.motionDurations.orchestrated,
                ease: exports.liquidMetal.easing,
                times: [0, 0.6, 1],
            }
        }
    }
};
// 🎮 Motion Control System - Central orchestration
var HiveMotionOrchestrator = /** @class */ (function () {
    function HiveMotionOrchestrator() {
        this.activeSequences = new Map();
        this.cascadeQueue = [];
    }
    // Register a motion sequence
    HiveMotionOrchestrator.prototype.registerSequence = function (id, controls) {
        this.activeSequences.set(id, controls);
    };
    // Trigger orchestrated sequence
    HiveMotionOrchestrator.prototype.triggerSequence = function (sequenceType, elements) {
        return __awaiter(this, void 0, void 0, function () {
            var sequence, _loop_1, this_1, i;
            return __generator(this, function (_a) {
                sequence = exports.milestoneSequence[sequenceType];
                _loop_1 = function (i) {
                    var controls = this_1.activeSequences.get(elements[i]);
                    if (controls) {
                        setTimeout(function () {
                            controls.start(sequence.animate);
                        }, i * exports.cascadeTiming.sequence * 1000);
                    }
                };
                this_1 = this;
                // Animate elements in cascade
                for (i = 0; i < elements.length; i++) {
                    _loop_1(i);
                }
                return [2 /*return*/];
            });
        });
    };
    // Trigger ripple effect from source element
    HiveMotionOrchestrator.prototype.triggerRipple = function (sourceId, connectedElements) {
        var _this = this;
        // Start center ripple
        var sourceControls = this.activeSequences.get(sourceId);
        if (sourceControls) {
            sourceControls.start(exports.rippleCascade.center);
        }
        // Cascade to connected elements
        connectedElements.forEach(function (_a) {
            var id = _a.id, distance = _a.distance;
            var controls = _this.activeSequences.get(id);
            if (controls) {
                controls.start(exports.rippleCascade.connected(distance));
            }
        });
    };
    // Cleanup completed sequences
    HiveMotionOrchestrator.prototype.cleanup = function (id) {
        this.activeSequences.delete(id);
    };
    return HiveMotionOrchestrator;
}());
exports.HiveMotionOrchestrator = HiveMotionOrchestrator;
// Export singleton orchestrator
exports.motionOrchestrator = new HiveMotionOrchestrator();
// 🎨 CSS Custom Properties for smooth operator easing
exports.motionCSS = "\n  :root {\n    --hive-easing: cubic-bezier(0.23, 1, 0.32, 1);\n    --hive-duration-smooth: 0.4s;\n    --hive-duration-quick: 0.2s;\n    --hive-duration-flowing: 0.6s;\n  }\n  \n  .hive-motion-base {\n    transition: all var(--hive-duration-smooth) var(--hive-easing);\n    transform-origin: center;\n    will-change: transform;\n    backface-visibility: hidden;\n    transform: translateZ(0);\n  }\n  \n  .hive-motion-quick {\n    transition-duration: var(--hive-duration-quick);\n  }\n  \n  .hive-motion-flowing {\n    transition-duration: var(--hive-duration-flowing);\n  }\n";
// 🔧 Utility Functions
exports.motionUtils = {
    // Calculate distance for cascade timing
    calculateDistance: function (element1, element2) {
        var dx = element1.x - element2.x;
        var dy = element1.y - element2.y;
        return Math.sqrt(dx * dx + dy * dy);
    },
    // Check if element is in magnetic zone
    isInMagneticZone: function (element, target, zone) {
        var distance = this.calculateDistance(element, target);
        return distance <= exports.magneticSnap.zones[zone];
    },
    // Generate stagger delay for index
    getStaggerDelay: function (index, type) {
        if (type === void 0) { type = 'stagger'; }
        return index * exports.cascadeTiming[type];
    },
    // Create liquid metal transition
    createLiquidTransition: function (duration) {
        if (duration === void 0) { duration = 'smooth'; }
        return __assign({ duration: exports.motionDurations[duration], ease: exports.liquidMetal.easing, type: "spring" }, exports.liquidMetal.physics);
    }
};
