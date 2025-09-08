/**
 * HIVE Design System Theme Configuration
 * Single source of truth for all design tokens
 *
 * Brand Colors: Gold (var(--hive-gold)), Black (var(--hive-black)), White (#FFFFFF)
 */
export declare const hiveTheme: {
    readonly brand: {
        readonly primary: "var(--hive-gold)";
        readonly black: "var(--hive-black)";
        readonly white: "#FFFFFF";
    };
    readonly colors: {
        readonly gold: {
            readonly DEFAULT: "var(--hive-gold)";
            readonly light: "#FFDF33";
            readonly dark: "#E6C200";
            readonly muted: "#CCB000";
            readonly 50: "#FFFEF5";
            readonly 100: "#FFF9E6";
            readonly 200: "#FFED99";
            readonly 300: "#FFDF33";
            readonly 400: "var(--hive-gold)";
            readonly 500: "#E6C200";
            readonly 600: "#CCB000";
            readonly 700: "#B39900";
            readonly 800: "#998300";
            readonly 900: "#806D00";
        };
        readonly gray: {
            readonly 950: "var(--hive-background-primary)";
            readonly 900: "#141414";
            readonly 800: "#1F1F1F";
            readonly 700: "#2E2E2E";
            readonly 600: "#404040";
            readonly 500: "#5C5C5C";
            readonly 400: "#787878";
            readonly 300: "#A3A3A3";
            readonly 200: "#D4D4D4";
            readonly 100: "#E5E5E5";
            readonly 50: "#F5F5F5";
        };
        readonly status: {
            readonly success: "#10B981";
            readonly warning: "var(--hive-gold)";
            readonly error: "#EF4444";
            readonly info: "#3B82F6";
        };
    };
    readonly semantic: {
        readonly background: {
            readonly primary: "var(--hive-black)";
            readonly secondary: "var(--hive-background-primary)";
            readonly tertiary: "#141414";
            readonly elevated: "#1F1F1F";
            readonly overlay: "rgba(0, 0, 0, 0.8)";
            readonly interactive: "#1F1F1F";
            readonly hover: "rgba(var(--hive-gold-rgb), 0.05)";
            readonly active: "rgba(var(--hive-gold-rgb), 0.1)";
            readonly disabled: "#2E2E2E";
            readonly inverse: "#FFFFFF";
        };
        readonly text: {
            readonly primary: "#FFFFFF";
            readonly secondary: "#D4D4D4";
            readonly tertiary: "#A3A3A3";
            readonly muted: "#787878";
            readonly placeholder: "#5C5C5C";
            readonly disabled: "#404040";
            readonly inverse: "var(--hive-black)";
            readonly accent: "var(--hive-gold)";
            readonly 'accent-hover': "#FFDF33";
        };
        readonly border: {
            readonly default: "rgba(255, 255, 255, 0.1)";
            readonly subtle: "rgba(255, 255, 255, 0.05)";
            readonly strong: "rgba(255, 255, 255, 0.2)";
            readonly hover: "rgba(var(--hive-gold-rgb), 0.3)";
            readonly focus: "var(--hive-gold)";
            readonly active: "var(--hive-gold)";
            readonly disabled: "#2E2E2E";
            readonly error: "#EF4444";
            readonly success: "#10B981";
            readonly gold: "rgba(var(--hive-gold-rgb), 0.3)";
            readonly 'gold-strong': "rgba(var(--hive-gold-rgb), 0.5)";
            readonly 'gold-subtle': "rgba(var(--hive-gold-rgb), 0.15)";
        };
        readonly interactive: {
            readonly default: "#2E2E2E";
            readonly hover: "rgba(var(--hive-gold-rgb), 0.1)";
            readonly focus: "var(--hive-gold)";
            readonly active: "rgba(var(--hive-gold-rgb), 0.15)";
            readonly disabled: "#404040";
        };
    };
    readonly shadows: {
        readonly xs: "0 1px 2px rgba(0, 0, 0, 0.5)";
        readonly sm: "0 2px 4px rgba(0, 0, 0, 0.5)";
        readonly md: "0 4px 8px rgba(0, 0, 0, 0.5)";
        readonly lg: "0 8px 16px rgba(0, 0, 0, 0.5)";
        readonly xl: "0 12px 24px rgba(0, 0, 0, 0.6)";
        readonly '2xl': "0 24px 48px rgba(0, 0, 0, 0.7)";
        readonly gold: "0 0 20px rgba(var(--hive-gold-rgb), 0.3)";
        readonly 'gold-strong': "0 0 40px rgba(var(--hive-gold-rgb), 0.4)";
        readonly focus: "0 0 0 2px var(--hive-gold)";
        readonly hover: "0 8px 24px rgba(0, 0, 0, 0.4)";
        readonly active: "0 4px 12px rgba(0, 0, 0, 0.5)";
    };
    readonly spacing: {
        readonly 0: "0";
        readonly 1: "0.25rem";
        readonly 2: "0.5rem";
        readonly 3: "0.75rem";
        readonly 4: "1rem";
        readonly 5: "1.25rem";
        readonly 6: "1.5rem";
        readonly 8: "2rem";
        readonly 10: "2.5rem";
        readonly 12: "3rem";
        readonly 16: "4rem";
        readonly 20: "5rem";
        readonly 24: "6rem";
    };
    readonly typography: {
        readonly fonts: {
            readonly sans: "-apple-system, BlinkMacSystemFont, \"Inter\", \"SF Pro Display\", system-ui, sans-serif";
            readonly mono: "\"SF Mono\", \"Monaco\", \"Inconsolata\", \"Fira Code\", monospace";
        };
        readonly sizes: {
            readonly xs: "0.75rem";
            readonly sm: "0.875rem";
            readonly base: "1rem";
            readonly lg: "1.125rem";
            readonly xl: "1.25rem";
            readonly '2xl': "1.5rem";
            readonly '3xl': "1.875rem";
            readonly '4xl': "2.25rem";
            readonly '5xl': "3rem";
        };
        readonly weights: {
            readonly light: 300;
            readonly normal: 400;
            readonly medium: 500;
            readonly semibold: 600;
            readonly bold: 700;
            readonly black: 900;
        };
        readonly lineHeights: {
            readonly none: 1;
            readonly tight: 1.25;
            readonly snug: 1.375;
            readonly normal: 1.5;
            readonly relaxed: 1.625;
            readonly loose: 2;
        };
    };
    readonly borders: {
        readonly radius: {
            readonly none: "0";
            readonly sm: "0.125rem";
            readonly default: "0.25rem";
            readonly md: "0.375rem";
            readonly lg: "0.5rem";
            readonly xl: "0.75rem";
            readonly '2xl': "1rem";
            readonly '3xl': "1.5rem";
            readonly full: "9999px";
        };
    };
    readonly animations: {
        readonly durations: {
            readonly instant: "0ms";
            readonly fast: "150ms";
            readonly normal: "250ms";
            readonly slow: "350ms";
            readonly slower: "500ms";
        };
        readonly easings: {
            readonly default: "cubic-bezier(0.4, 0, 0.2, 1)";
            readonly in: "cubic-bezier(0.4, 0, 1, 1)";
            readonly out: "cubic-bezier(0, 0, 0.2, 1)";
            readonly inOut: "cubic-bezier(0.4, 0, 0.2, 1)";
        };
    };
    readonly zIndex: {
        readonly base: 0;
        readonly dropdown: 10;
        readonly sticky: 20;
        readonly overlay: 30;
        readonly modal: 40;
        readonly popover: 50;
        readonly tooltip: 60;
        readonly notification: 70;
        readonly max: 9999;
    };
};
export type HiveTheme = typeof hiveTheme;
export type HiveColors = typeof hiveTheme.colors;
export type HiveSemantic = typeof hiveTheme.semantic;
export type HiveSpacing = typeof hiveTheme.spacing;
export type HiveTypography = typeof hiveTheme.typography;
export type HiveShadows = typeof hiveTheme.shadows;
export declare function getCSSVariable(path: string): string;
export declare function applyThemeToRoot(theme?: HiveTheme): void;
export default hiveTheme;
//# sourceMappingURL=hive-theme.d.ts.map