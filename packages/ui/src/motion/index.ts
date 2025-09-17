// HIVE Motion System - Unified Exports
// Single source of truth for all motion patterns and utilities

// Core motion personality and utilities
export { 
  hiveMotionCore,
  liquidMetalMotion,
  hiveMotionVariants,
  गति, // Legacy support
  separateMotionProps,
  getMotionProps,
  getLogoMotionProps,
  getHiveMotionProps,
  getCascadeProps,
  getStaggerProps,
  magneticSystem
} from '../lib/motion-utils';

// Advanced motion system (from hive-motion-system.ts)
export {
  liquidMetal,
  motionDurations,
  cascadeTiming,
  magneticSnap,
  liquidFlow,
  butteryInteractions
} from './hive-motion-system';

// Liquid metal specific system (from hive-liquid-metal.ts)
export {
  magneticInteractions,
  liquidMetalPerformance,
  liquidMetalUtils
} from './hive-liquid-metal';

// Motion wrapper component
// export { HiveMotionWrapper } from '../components/hive-motion-wrapper';

// Re-export framer motion for convenience - specific named exports only for NextJS client boundary compatibility
export { motion, AnimatePresence, useAnimation, useInView, useTransform, useSpring, useMotionValue } from 'framer-motion';
export type { Variants, Transition, MotionProps, MotionValue } from 'framer-motion';