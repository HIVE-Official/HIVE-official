/**
 * HIVE Accessibility Theme
 * High-contrast theme optimized for accessibility and visual impairments
 */
import { type BaseTheme } from './base';
export declare const accessibilityTheme: BaseTheme;
export declare const accessibilityThemeCSS = "\n  .hive-theme-accessibility {\n    /* High contrast primary colors - WCAG AAA compliant */\n    --hive-a11y-primary-50: #fffbeb;\n    --hive-a11y-primary-100: #fef3c7;\n    --hive-a11y-primary-200: #fde68a;\n    --hive-a11y-primary-300: #fcd34d;\n    --hive-a11y-primary-400: #fbbf24;\n    --hive-a11y-primary-500: #f59e0b;\n    --hive-a11y-primary-600: #d97706;\n    --hive-a11y-primary-700: #b45309;\n    --hive-a11y-primary-800: #92400e;\n    --hive-a11y-primary-900: #78350f;\n    \n    /* High contrast neutrals - Pure black and white for maximum contrast */\n    --hive-a11y-neutral-50: #ffffff;\n    --hive-a11y-neutral-100: #f8f8f8;\n    --hive-a11y-neutral-200: #e0e0e0;\n    --hive-a11y-neutral-300: #c0c0c0;\n    --hive-a11y-neutral-400: #a0a0a0;\n    --hive-a11y-neutral-500: #808080;\n    --hive-a11y-neutral-600: #606060;\n    --hive-a11y-neutral-700: #404040;\n    --hive-a11y-neutral-800: #202020;\n    --hive-a11y-neutral-900: #000000;\n    \n    /* Enhanced semantic colors with higher contrast ratios */\n    --hive-a11y-success: #059669; /* Green 600 - WCAG AAA */\n    --hive-a11y-warning: #d97706; /* Amber 600 - WCAG AAA */\n    --hive-a11y-error: #dc2626;   /* Red 600 - WCAG AAA */\n    --hive-a11y-info: #2563eb;    /* Blue 600 - WCAG AAA */\n  }\n  \n  /* Additional accessibility enhancements */\n  .hive-theme-accessibility * {\n    /* Ensure all text meets WCAG AAA standards */\n    text-shadow: none;\n    \n    /* Enhanced focus indicators */\n    --focus-ring-width: 3px;\n    --focus-ring-color: #2563eb;\n    --focus-ring-offset: 2px;\n  }\n  \n  .hive-theme-accessibility *:focus-visible {\n    outline: var(--focus-ring-width) solid var(--focus-ring-color);\n    outline-offset: var(--focus-ring-offset);\n  }\n";
export declare const accessibilityUtils: {
    checkContrast: (foreground: string, background: string) => number;
    isHighContrastMode: () => boolean;
    isReducedMotion: () => boolean;
};
//# sourceMappingURL=accessibility.d.ts.map