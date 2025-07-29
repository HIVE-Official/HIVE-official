// HIVE Color System Utilities
// Advanced color utilities for the HIVE design system

import { prdColors, prdSemantic } from './colors-prd-aligned';

// === COLOR MANIPULATION UTILITIES ===

/**
 * Convert hex color to RGB values
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

/**
 * Create color with opacity
 */
export const withOpacity = (color: string, opacity: number): string => {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
};

/**
 * Generate color scale from base color
 */
export const generateColorScale = (baseColor: string, steps: number = 9) => {
  const rgb = hexToRgb(baseColor);
  if (!rgb) return {};
  
  const scale: Record<number, string> = {};
  
  for (let i = 0; i < steps; i++) {
    const factor = i / (steps - 1);
    const lightness = 1 - factor;
    
    const r = Math.round(rgb.r + (255 - rgb.r) * lightness);
    const g = Math.round(rgb.g + (255 - rgb.g) * lightness);
    const b = Math.round(rgb.b + (255 - rgb.b) * lightness);
    
    scale[(i + 1) * 100] = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  
  return scale;
};

// === SEMANTIC COLOR FUNCTIONS ===

/**
 * Get color by semantic meaning
 */
export const getSemanticColor = (semantic: keyof typeof prdSemantic, variant?: string) => {
  const colorGroup = prdSemantic[semantic];
  if (typeof colorGroup === 'string') return colorGroup;
  if (variant && colorGroup && typeof colorGroup === 'object') {
    return (colorGroup as Record<string, string>)[variant];
  }
  return colorGroup;
};

/**
 * Get CSS custom property for semantic color
 */
export const getCSSVariable = (token: string): string => {
  return `var(--hive-${token})`;
};

// === ACCESSIBILITY UTILITIES ===

/**
 * Calculate contrast ratio between two colors
 */
export const getContrastRatio = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 1;
  
  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
};

/**
 * Check if color combination meets WCAG AA standards
 */
export const meetsWCAGAA = (foreground: string, background: string): boolean => {
  return getContrastRatio(foreground, background) >= 4.5;
};

/**
 * Check if color combination meets WCAG AAA standards
 */
export const meetsWCAGAAA = (foreground: string, background: string): boolean => {
  return getContrastRatio(foreground, background) >= 7;
};

// === HIVE SPECIFIC COLOR UTILITIES ===

/**
 * Get appropriate text color for background
 */
export const getTextColorForBackground = (backgroundColor: string): string => {
  const whiteContrast = getContrastRatio('#FFFFFF', backgroundColor);
  const blackContrast = getContrastRatio('#000000', backgroundColor);
  
  return whiteContrast > blackContrast ? '#FFFFFF' : '#000000';
};

/**
 * Generate hover state for color
 */
export const getHoverColor = (baseColor: string): string => {
  const rgb = hexToRgb(baseColor);
  if (!rgb) return baseColor;
  
  // Lighten by 10%
  const factor = 0.1;
  const r = Math.min(255, Math.round(rgb.r + (255 - rgb.r) * factor));
  const g = Math.min(255, Math.round(rgb.g + (255 - rgb.g) * factor));
  const b = Math.min(255, Math.round(rgb.b + (255 - rgb.b) * factor));
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

/**
 * Generate focus ring color with opacity
 */
export const getFocusRingColor = (brandColor: string): string => {
  return withOpacity(brandColor, 0.2);
};

// === COLOR VALIDATION ===

/**
 * Validate HIVE color usage
 */
export const validateHiveColor = (color: string): {
  isValid: boolean;
  issues: string[];
  suggestions: string[];
} => {
  const issues: string[] = [];
  const suggestions: string[] = [];
  
  // Check if it's a hardcoded color that should use tokens
  const hardcodedColors = ['#FFFFFF', '#000000', '#171717', '#262626', '#FFD700', '#0070F3'];
  if (hardcodedColors.includes(color.toUpperCase())) {
    issues.push('Using hardcoded color value instead of semantic token');
    suggestions.push('Use semantic tokens like var(--hive-text-primary) instead');
  }
  
  // Check if using deprecated champagne color
  if (color.toUpperCase() === '#F7E98E') {
    issues.push('Using deprecated champagne color');
    suggestions.push('Use var(--hive-brand-secondary) for gold accent instead');
  }
  
  // Check contrast if it's likely a text color
  const commonBackgrounds = [prdSemantic.background.primary, prdSemantic.background.secondary];
  commonBackgrounds.forEach(bg => {
    const contrast = getContrastRatio(color, bg);
    if (contrast < 4.5) {
      issues.push(`Poor contrast ratio (${contrast.toFixed(2)}) with background ${bg}`);
      suggestions.push('Use higher contrast colors for better accessibility');
    }
  });
  
  return {
    isValid: issues.length === 0,
    issues,
    suggestions
  };
};

// === THEME UTILITIES ===

/**
 * Generate CSS custom properties for HIVE semantic colors
 */
export const generateSemanticCSSProperties = (): string => {
  const properties: string[] = [];
  
  // Background colors
  Object.entries(prdSemantic.background).forEach(([key, value]) => {
    properties.push(`  --hive-background-${key}: ${value};`);
  });
  
  // Text colors
  Object.entries(prdSemantic.text).forEach(([key, value]) => {
    properties.push(`  --hive-text-${key}: ${value};`);
  });
  
  // Brand colors
  Object.entries(prdSemantic.brand).forEach(([key, value]) => {
    properties.push(`  --hive-brand-${key}: ${value};`);
  });
  
  // Status colors
  Object.entries(prdSemantic.status).forEach(([key, value]) => {
    properties.push(`  --hive-status-${key}: ${value};`);
  });
  
  // Interactive colors
  Object.entries(prdSemantic.interactive).forEach(([key, value]) => {
    properties.push(`  --hive-interactive-${key}: ${value};`);
  });
  
  // Border colors
  Object.entries(prdSemantic.border).forEach(([key, value]) => {
    properties.push(`  --hive-border-${key}: ${value};`);
  });
  
  return `:root {\n${properties.join('\n')}\n}`;
};

/**
 * Get all HIVE colors for documentation
 */
export const getAllHiveColors = () => {
  return {
    backgrounds: prdSemantic.background,
    text: prdSemantic.text,
    brand: prdSemantic.brand,
    status: prdSemantic.status,
    interactive: prdSemantic.interactive,
    borders: prdSemantic.border,
  };
};

// === GOLD ACCENT UTILITIES ===

/**
 * Utilities specific to HIVE's gold accent system
 */
export const goldAccentUtils = {
  /**
   * Get the primary gold color
   */
  primary: prdColors.gold[500], // #FFD700
  
  /**
   * Check if gold should be used for this context
   */
  shouldUseGold: (context: 'achievement' | 'premium' | 'special' | 'regular'): boolean => {
    return ['achievement', 'premium', 'special'].includes(context);
  },
  
  /**
   * Get appropriate gold opacity for different uses
   */
  getGoldWithOpacity: (opacity: number): string => {
    return withOpacity(prdColors.gold[500], opacity);
  },
  
  /**
   * Validate gold usage against guidelines
   */
  validateGoldUsage: (context: string): { appropriate: boolean; reason: string } => {
    const goodContexts = ['achievement', 'premium', 'tool-creation', 'special-feature', 'branding'];
    const badContexts = ['regular-button', 'text-body', 'background', 'border-decorative'];
    
    if (goodContexts.some(ctx => context.includes(ctx))) {
      return { appropriate: true, reason: 'Gold is appropriate for special emphasis' };
    }
    
    if (badContexts.some(ctx => context.includes(ctx))) {
      return { appropriate: false, reason: 'Gold should be reserved for special features' };
    }
    
    return { appropriate: false, reason: 'Consider if this truly needs gold emphasis' };
  }
};

// Export all color data for external use
export { prdColors, prdSemantic };
export type { PRDColorToken, PRDSemanticToken } from './colors-prd-aligned';