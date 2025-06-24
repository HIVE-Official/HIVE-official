// HIVE Design System - Main Tokens Export
// Centralized access to all design tokens

// Import the detailed token objects
import { colors, shadcnColors } from "./colors";
import { typography, tailwindFontSizes } from "./typography";
import { spacing } from "./spacing";
import { motion } from "./motion";
import { effects } from "./effects";

// ============================================================================
// CONSOLIDATED DESIGN SYSTEM OBJECT (SINGLE SOURCE OF TRUTH)
// ============================================================================

export const designTokens = {
  colors,
  shadcnColors,
  typography,
  tailwindFontSizes,
  spacing,
  motion,
  effects,
} as const;

// ============================================================================
// TYPE EXPORTS FOR TYPESCRIPT SUPPORT
// ============================================================================

export * from "./colors";
export * from "./spacing";
export * from "./typography";
export * from "./motion";
export * from "./effects";

// Default export for convenience
export default designTokens;
