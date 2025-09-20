import type { typography } from "./typography";
import type { colors } from "./colors";
import type { spacing } from "./spacing";
import type { motion } from "./motion";
import type { effects } from "./effects";
export type FontSizeToken = keyof typeof typography.fontSize;
export type FontWeightToken = keyof typeof typography.fontWeight;
export type FontFamilyToken = keyof typeof typography.fontFamily;
export type LineHeightToken = keyof typeof typography.lineHeight;
export type LetterSpacingToken = keyof typeof typography.letterSpacing;
export type ColorToken = keyof typeof colors;
export type AccentVariant = "gold" | "champagne" | "amber" | "bronze";
export type SurfaceVariant = "surface-01" | "surface-02" | "surface-03";
export type SpacingToken = keyof typeof spacing;
export type MotionToken = keyof typeof motion;
export type EffectToken = keyof typeof effects;
//# sourceMappingURL=types.d.ts.map