// CSS Custom Properties Generator for HIVE Design Tokens
import { colors, semantic, overlay, gradients, shadows, border } from './colors';
import { typography } from './typography';
import { spacing, layoutSizes } from './spacing';
import { radius } from './radius';
import { motion } from './motion';
import { effects } from './effects';

// Generate CSS custom properties from design tokens
export function generateCSSCustomProperties(): string {
  const cssVars: string[] = [];
  
  // Colors
  cssVars.push('  /* HIVE Color Tokens */');
  Object.entries(colors).forEach(([key, value]) => {
    if (typeof value === 'string') {
      cssVars.push(`  --hive-color-${key}: ${value};`);
    } else if (typeof value === 'object') {
      Object.entries(value).forEach(([subKey, subValue]) => {
        cssVars.push(`  --hive-color-${key}-${subKey}: ${subValue};`);
      });
    }
  });
  
  cssVars.push('');
  cssVars.push('  /* HIVE Semantic Colors */');
  Object.entries(semantic).forEach(([category, values]) => {
    Object.entries(values).forEach(([key, value]) => {
      cssVars.push(`  --hive-${category}-${key}: ${value};`);
    });
  });
  
  cssVars.push('');
  cssVars.push('  /* HIVE Overlay Colors */');
  Object.entries(overlay).forEach(([key, value]) => {
    cssVars.push(`  --hive-overlay-${key}: ${value};`);
  });
  
  cssVars.push('');
  cssVars.push('  /* HIVE Gradients */');
  Object.entries(gradients).forEach(([key, value]) => {
    cssVars.push(`  --hive-gradient-${key}: ${value};`);
  });
  
  cssVars.push('');
  cssVars.push('  /* HIVE Shadows */');
  Object.entries(shadows).forEach(([key, value]) => {
    cssVars.push(`  --hive-shadow-${key}: ${value};`);
  });
  
  cssVars.push('');
  cssVars.push('  /* HIVE Border Colors */');
  Object.entries(border).forEach(([key, value]) => {
    cssVars.push(`  --hive-border-${key}: ${value};`);
  });
  
  // Add missing border variants that components expect
  cssVars.push(`  --hive-border-gold-strong: rgba(255, 215, 0, 0.4);`);
  cssVars.push(`  --hive-border-glass-strong: rgba(255, 255, 255, 0.12);`);
  
  // Typography
  cssVars.push('');
  cssVars.push('  /* HIVE Typography */');
  Object.entries(typography.fontSize).forEach(([key, value]) => {
    cssVars.push(`  --hive-font-size-${key}: ${value};`);
  });
  
  Object.entries(typography.fontWeight).forEach(([key, value]) => {
    cssVars.push(`  --hive-font-weight-${key}: ${value};`);
  });
  
  Object.entries(typography.lineHeight).forEach(([key, value]) => {
    cssVars.push(`  --hive-line-height-${key}: ${value};`);
  });
  
  Object.entries(typography.letterSpacing).forEach(([key, value]) => {
    cssVars.push(`  --hive-letter-spacing-${key}: ${value};`);
  });
  
  // Spacing
  cssVars.push('');
  cssVars.push('  /* HIVE Spacing */');
  Object.entries(spacing).forEach(([key, value]) => {
    cssVars.push(`  --hive-spacing-${key}: ${value};`);
  });
  
  // Layout sizes for hybrid approach
  cssVars.push('');
  cssVars.push('  /* HIVE Layout Sizes */');
  Object.entries(layoutSizes.height).forEach(([key, value]) => {
    cssVars.push(`  --hive-height-${key}: ${value};`);
  });
  
  Object.entries(layoutSizes.width).forEach(([key, value]) => {
    cssVars.push(`  --hive-width-${key}: ${value};`);
  });
  
  // Radius
  cssVars.push('');
  cssVars.push('  /* HIVE Radius */');
  Object.entries(radius).forEach(([key, value]) => {
    cssVars.push(`  --hive-radius-${key}: ${value};`);
  });
  
  // Motion
  cssVars.push('');
  cssVars.push('  /* HIVE Motion */');
  Object.entries(motion.easing).forEach(([key, value]) => {
    cssVars.push(`  --hive-easing-${key}: ${value};`);
  });
  
  Object.entries(motion.duration).forEach(([key, value]) => {
    cssVars.push(`  --hive-duration-${key}: ${value};`);
  });
  
  Object.entries(motion.cascade).forEach(([key, value]) => {
    cssVars.push(`  --hive-cascade-${key}: ${value};`);
  });
  
  Object.entries(motion.transform).forEach(([key, value]) => {
    cssVars.push(`  --hive-transform-${key}: ${value};`);
  });
  
  // Effects
  cssVars.push('');
  cssVars.push('  /* HIVE Effects */');
  Object.entries(effects.boxShadow).forEach(([key, value]) => {
    cssVars.push(`  --hive-shadow-${key}: ${value};`);
  });
  
  // Add missing shadow variants that components expect
  cssVars.push(`  --hive-shadow-gold-glow: 0 0 20px rgba(255, 215, 0, 0.3);`);
  cssVars.push(`  --hive-shadow-gold-glow-strong: 0 0 30px rgba(255, 215, 0, 0.4);`);
  cssVars.push(`  --hive-shadow-emerald-glow: 0 0 20px rgba(16, 185, 129, 0.3);`);
  
  Object.entries(effects.backdropBlur).forEach(([key, value]) => {
    cssVars.push(`  --hive-backdrop-blur-${key}: ${value};`);
  });
  
  Object.entries(effects.opacity).forEach(([key, value]) => {
    cssVars.push(`  --hive-opacity-${key}: ${value};`);
  });
  
  Object.entries(effects.zIndex).forEach(([key, value]) => {
    cssVars.push(`  --hive-z-${key}: ${value};`);
  });
  
  return `:root {\n${cssVars.join('\n')}\n}`;
}

// Generate Tailwind CSS color config
export function generateTailwindColorConfig(): Record<string, string | Record<string, string>> {
  const tailwindColors: Record<string, string | Record<string, string>> = {};
  
  // Add individual colors
  Object.entries(colors).forEach(([key, value]) => {
    if (typeof value === 'string') {
      tailwindColors[key] = value;
    } else if (typeof value === 'object') {
      tailwindColors[key] = value;
    }
  });
  
  // Add semantic colors
  Object.entries(semantic).forEach(([category, values]) => {
    tailwindColors[category] = values;
  });
  
  // Add overlay colors with CSS variable fallback
  Object.entries(overlay).forEach(([key, value]) => {
    tailwindColors[`overlay-${key}`] = value;
  });
  
  // Add border colors
  Object.entries(border).forEach(([key, value]) => {
    tailwindColors[`border-${key}`] = value;
  });
  
  return tailwindColors;
}

// Generate utility classes for common patterns
export function generateUtilityClasses(): string {
  const utilities: string[] = [];
  
  utilities.push('@layer utilities {');
  utilities.push('  /* HIVE Glass Morphism */');
  utilities.push('  .hive-glass {');
  utilities.push(`    background: ${overlay.glass};`);
  utilities.push('    backdrop-filter: blur(12px) saturate(180%);');
  utilities.push('    border: 1px solid var(--hive-overlay-glass);');
  utilities.push('  }');
  utilities.push('');
  
  utilities.push('  .hive-glass-strong {');
  utilities.push(`    background: ${overlay['glass-strong']};`);
  utilities.push('    backdrop-filter: blur(16px) saturate(200%);');
  utilities.push('    border: 1px solid var(--hive-overlay-glass-strong);');
  utilities.push('  }');
  utilities.push('');
  
  utilities.push('  /* HIVE Gold Glow Effects */');
  utilities.push('  .hive-gold-glow {');
  utilities.push(`    box-shadow: ${shadows['gold-glow']};`);
  utilities.push('  }');
  utilities.push('');
  
  utilities.push('  .hive-gold-glow-strong {');
  utilities.push(`    box-shadow: ${shadows['gold-glow-strong']};`);
  utilities.push('  }');
  utilities.push('');
  
  utilities.push('  /* HIVE Interactive States */');
  utilities.push('  .hive-interactive {');
  utilities.push('    transition: all var(--hive-duration-smooth) var(--hive-easing-liquid);');
  utilities.push('    will-change: transform, box-shadow;');
  utilities.push('    transform-origin: center;');
  utilities.push('    backface-visibility: hidden;');
  utilities.push('    transform: translateZ(0);');
  utilities.push('  }');
  utilities.push('');
  
  utilities.push('  .hive-interactive:hover {');
  utilities.push('    transform: translateY(var(--hive-transform-moveHover)) scale(var(--hive-transform-scaleHover));');
  utilities.push('  }');
  utilities.push('');
  
  utilities.push('  .hive-interactive:active {');
  utilities.push('    transform: translateY(var(--hive-transform-movePress)) scale(var(--hive-transform-scaleTap));');
  utilities.push('  }');
  utilities.push('');
  
  utilities.push('  /* HIVE Motion Variants */');
  utilities.push('  .hive-motion-quick {');
  utilities.push('    transition-duration: var(--hive-duration-quick);');
  utilities.push('  }');
  utilities.push('');
  
  utilities.push('  .hive-motion-flowing {');
  utilities.push('    transition-duration: var(--hive-duration-flowing);');
  utilities.push('  }');
  utilities.push('');
  
  utilities.push('  .hive-motion-dramatic {');
  utilities.push('    transition-duration: var(--hive-duration-dramatic);');
  utilities.push('  }');
  utilities.push('');
  
  utilities.push('  /* HIVE Focus States */');
  utilities.push('  .hive-focus {');
  utilities.push('    outline: none;');
  utilities.push('    box-shadow: var(--hive-shadow-focus);');
  utilities.push('  }');
  utilities.push('');
  
  utilities.push('  /* HIVE Glow Effects */');
  utilities.push('  .hive-glow-gold {');
  utilities.push('    box-shadow: var(--hive-shadow-goldGlow);');
  utilities.push('    transition: box-shadow var(--hive-duration-smooth) var(--hive-easing-liquid);');
  utilities.push('  }');
  utilities.push('');
  
  utilities.push('  .hive-glow-emerald {');
  utilities.push('    box-shadow: var(--hive-shadow-emeraldGlow);');
  utilities.push('    transition: box-shadow var(--hive-duration-smooth) var(--hive-easing-liquid);');
  utilities.push('  }');
  utilities.push('}');
  
  return utilities.join('\n');
}

export type CSSToken = keyof typeof colors;
export type SemanticCSSToken = keyof typeof semantic;