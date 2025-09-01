// HIVE Motion System - Unified Exports
// Single source of truth for all motion patterns and utilities
// Core motion personality and utilities
export { hiveMotionCore, liquidMetalMotion, hiveMotionVariants, गति, // Legacy support
separateMotionProps, getMotionProps, getLogoMotionProps, getHiveMotionProps, getCascadeProps, getStaggerProps, magneticSystem } from '../lib/motion-utils.js';
// Advanced motion system (from hive-motion-system.ts)
export { liquidMetal, motionDurations, cascadeTiming, magneticSnap, liquidFlow, butteryInteractions } from './hive-motion-system.js';
// Liquid metal specific system (from hive-liquid-metal.ts)
export { magneticInteractions, liquidMetalPerformance, liquidMetalUtils } from './hive-liquid-metal.js';
// Motion wrapper component
// TODO: HiveMotionWrapper needs to be recreated or path fixed
// export { HiveMotionWrapper } from '../components/hive-motion-wrapper.js';
// Re-export framer motion for convenience - specific named exports only for NextJS client boundary compatibility
export { motion, AnimatePresence, useAnimation, useInView, useTransform, useSpring, useMotionValue } from 'framer-motion';
//# sourceMappingURL=index.js.map