import { typography } from "./typography";
import { colors } from "./colors";
import { spacing } from "./spacing";
import { motion } from "./motion";
import { effects } from "./effects";

// Typography Types
export type FontSizeToken = keyof typeof typography.fontSize;
export type FontWeightToken = keyof typeof typography.fontWeight;
export type FontFamilyToken = keyof typeof typography.fontFamily;
export type LineHeightToken = keyof typeof typography.lineHeight;
export type LetterSpacingToken = keyof typeof typography.letterSpacing;

// Color Types
export type ColorToken = keyof typeof colors;
export type AccentVariant = keyof typeof colors.accent;
export type SurfaceVariant = "surface-01" | "surface-02" | "surface-03";

// Spacing Types
export type SpacingToken = keyof typeof spacing;

// Motion Types
export type MotionToken = keyof typeof motion;

// Effects Types
export type EffectToken = keyof typeof effects;
