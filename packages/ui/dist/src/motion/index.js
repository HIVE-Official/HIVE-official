"use strict";
// HIVE Motion System - Unified Exports
// Single source of truth for all motion patterns and utilities
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInView = exports.useAnimation = exports.AnimatePresence = exports.motion = exports.HiveMotionWrapper = exports.liquidMetalUtils = exports.liquidMetalPerformance = exports.magneticInteractions = exports.liquidFlow = exports.magneticSnap = exports.cascadeTiming = exports.motionDurations = exports.liquidMetal = exports.magneticSystem = exports.getStaggerProps = exports.getCascadeProps = exports.getHiveMotionProps = exports.getLogoMotionProps = exports.getMotionProps = exports.separateMotionProps = exports.गति = exports.hiveMotionVariants = exports.liquidMetalMotion = exports.hiveMotionCore = void 0;
// Core motion personality and utilities
var motion_utils_1 = require("../lib/motion-utils");
Object.defineProperty(exports, "hiveMotionCore", { enumerable: true, get: function () { return motion_utils_1.hiveMotionCore; } });
Object.defineProperty(exports, "liquidMetalMotion", { enumerable: true, get: function () { return motion_utils_1.liquidMetalMotion; } });
Object.defineProperty(exports, "hiveMotionVariants", { enumerable: true, get: function () { return motion_utils_1.hiveMotionVariants; } });
Object.defineProperty(exports, "\u0917\u0924\u093F", { enumerable: true, get: function () { return motion_utils_1.गति; } });
Object.defineProperty(exports, "separateMotionProps", { enumerable: true, get: function () { return motion_utils_1.separateMotionProps; } });
Object.defineProperty(exports, "getMotionProps", { enumerable: true, get: function () { return motion_utils_1.getMotionProps; } });
Object.defineProperty(exports, "getLogoMotionProps", { enumerable: true, get: function () { return motion_utils_1.getLogoMotionProps; } });
Object.defineProperty(exports, "getHiveMotionProps", { enumerable: true, get: function () { return motion_utils_1.getHiveMotionProps; } });
Object.defineProperty(exports, "getCascadeProps", { enumerable: true, get: function () { return motion_utils_1.getCascadeProps; } });
Object.defineProperty(exports, "getStaggerProps", { enumerable: true, get: function () { return motion_utils_1.getStaggerProps; } });
Object.defineProperty(exports, "magneticSystem", { enumerable: true, get: function () { return motion_utils_1.magneticSystem; } });
// Advanced motion system (from hive-motion-system.ts)
var hive_motion_system_1 = require("./hive-motion-system");
Object.defineProperty(exports, "liquidMetal", { enumerable: true, get: function () { return hive_motion_system_1.liquidMetal; } });
Object.defineProperty(exports, "motionDurations", { enumerable: true, get: function () { return hive_motion_system_1.motionDurations; } });
Object.defineProperty(exports, "cascadeTiming", { enumerable: true, get: function () { return hive_motion_system_1.cascadeTiming; } });
Object.defineProperty(exports, "magneticSnap", { enumerable: true, get: function () { return hive_motion_system_1.magneticSnap; } });
Object.defineProperty(exports, "liquidFlow", { enumerable: true, get: function () { return hive_motion_system_1.liquidFlow; } });
// Liquid metal specific system (from hive-liquid-metal.ts)
var hive_liquid_metal_1 = require("./hive-liquid-metal");
Object.defineProperty(exports, "magneticInteractions", { enumerable: true, get: function () { return hive_liquid_metal_1.magneticInteractions; } });
Object.defineProperty(exports, "liquidMetalPerformance", { enumerable: true, get: function () { return hive_liquid_metal_1.liquidMetalPerformance; } });
Object.defineProperty(exports, "liquidMetalUtils", { enumerable: true, get: function () { return hive_liquid_metal_1.liquidMetalUtils; } });
// Motion wrapper component
var hive_motion_wrapper_1 = require("../components/hive-motion-wrapper");
Object.defineProperty(exports, "HiveMotionWrapper", { enumerable: true, get: function () { return hive_motion_wrapper_1.HiveMotionWrapper; } });
// Re-export framer motion for convenience
var framer_motion_1 = require("framer-motion");
Object.defineProperty(exports, "motion", { enumerable: true, get: function () { return framer_motion_1.motion; } });
Object.defineProperty(exports, "AnimatePresence", { enumerable: true, get: function () { return framer_motion_1.AnimatePresence; } });
Object.defineProperty(exports, "useAnimation", { enumerable: true, get: function () { return framer_motion_1.useAnimation; } });
Object.defineProperty(exports, "useInView", { enumerable: true, get: function () { return framer_motion_1.useInView; } });
