/**
 * HIVE Theme System
 * Campus-first theme system with dark mode and accessibility support
 */
export { baseTheme } from './base';
export { darkTheme, darkThemeCSS } from './dark';
export { accessibilityTheme, accessibilityThemeCSS, accessibilityUtils } from './accessibility';
// Import CSS strings for internal use
import { darkThemeCSS as _darkThemeCSS } from './dark';
import { accessibilityThemeCSS as _accessibilityThemeCSS } from './accessibility';
// Theme utilities
export const themes = {
    base: 'hive-base',
    dark: 'hive-dark',
    accessibility: 'hive-accessibility',
};
// CSS for all themes
export const allThemesCSS = `
  /* Base theme is default */
  :root {
    /* Base HIVE theme variables are defined in tokens/colors.ts */
  }
  
  ${_darkThemeCSS}
  ${_accessibilityThemeCSS}
`;
// Theme provider utilities
export const getThemeClass = (theme) => {
    return `hive-theme-${theme}`;
};
// Theme detection utilities
export const getSystemTheme = () => {
    if (typeof window === 'undefined')
        return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};
export const getPreferredTheme = () => {
    if (typeof window === 'undefined')
        return 'base';
    // Check for high contrast preference first
    if (window.matchMedia('(prefers-contrast: high)').matches) {
        return 'accessibility';
    }
    // Check for dark theme preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'base';
};
//# sourceMappingURL=index.js.map