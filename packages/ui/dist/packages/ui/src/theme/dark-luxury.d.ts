export declare const darkLuxury: {
    readonly void: "var(--hive-background-primary)";
    readonly obsidian: "var(--hive-background-primary)";
    readonly charcoal: "var(--hive-background-secondary)";
    readonly graphite: "var(--hive-background-tertiary)";
    readonly slate: "var(--hive-background-interactive)";
    readonly steel: "var(--hive-border-default)";
    readonly platinum: "var(--hive-text-primary)";
    readonly silver: "var(--hive-text-secondary)";
    readonly mercury: "var(--hive-text-tertiary)";
    readonly pewter: "var(--hive-text-disabled)";
    readonly smoke: "var(--hive-text-disabled)";
    readonly gold: "var(--hive-brand-secondary)";
    readonly champagne: "var(--hive-brand-secondary)";
    readonly amber: "var(--hive-status-warning)";
    readonly bronze: "var(--hive-brand-secondary)";
    readonly emerald: "var(--hive-status-success)";
    readonly ruby: "var(--hive-status-error)";
    readonly sapphire: "var(--hive-status-info)";
    readonly citrine: "var(--hive-status-warning)";
    readonly goldGlow: "color-mix(in_srgb,var(--hive-brand-secondary)_15%,transparent)";
    readonly shadowDeep: "color-mix(in_srgb,var(--hive-background-primary)_40%,transparent)";
    readonly shadowSoft: "color-mix(in_srgb,var(--hive-background-primary)_20%,transparent)";
    readonly glassMatte: "var(--hive-interactive-hover)";
    readonly glassShine: "var(--hive-interactive-active)";
};
export declare const luxuryGradients: {
    readonly midnight: "linear-gradient(135deg, var(--hive-background-primary) 0%, var(--hive-background-secondary) 100%)";
    readonly obsidian: "linear-gradient(180deg, var(--hive-background-primary) 0%, var(--hive-background-tertiary) 100%)";
    readonly charcoal: "linear-gradient(45deg, var(--hive-background-secondary) 0%, var(--hive-background-interactive) 100%)";
    readonly goldShimmer: "linear-gradient(90deg, transparent, color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent), transparent)";
    readonly silverSheen: "linear-gradient(90deg, transparent, var(--hive-interactive-hover), transparent)";
    readonly glassDark: "linear-gradient(135deg, var(--hive-interactive-active), var(--hive-interactive-hover))";
    readonly glassGold: "linear-gradient(135deg, color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent), color-mix(in_srgb,var(--hive-brand-secondary)_5%,transparent))";
    readonly surfaceElevated: "linear-gradient(180deg, var(--hive-background-tertiary) 0%, var(--hive-background-interactive) 100%)";
    readonly surfacePressed: "linear-gradient(180deg, var(--hive-background-secondary) 0%, var(--hive-background-primary) 100%)";
};
export declare const luxuryShadows: {
    readonly level1: "0 1px 3px color-mix(in_srgb,var(--hive-background-primary)_30%,transparent)";
    readonly level2: "0 1 1.5 color-mix(in_srgb,var(--hive-background-primary)_30%,transparent)";
    readonly level3: "0 2 15px color-mix(in_srgb,var(--hive-background-primary)_30%,transparent)";
    readonly level4: "0 3 6 color-mix(in_srgb,var(--hive-background-primary)_40%,transparent)";
    readonly level5: "0 5 10 color-mix(in_srgb,var(--hive-background-primary)_50%,transparent)";
    readonly hover: "0 2 6 color-mix(in_srgb,var(--hive-background-primary)_30%,transparent)";
    readonly active: "0 1 3 color-mix(in_srgb,var(--hive-background-primary)_40%,transparent)";
    readonly focus: "0 0 0 0.5 color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)";
    readonly goldGlow: "0 0 5 color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)";
    readonly goldGlowStrong: "0 0 30px color-mix(in_srgb,var(--hive-brand-secondary)_40%,transparent)";
    readonly emeraldGlow: "0 0 5 color-mix(in_srgb,var(--hive-status-success)_30%,transparent)";
    readonly rubyGlow: "0 0 5 color-mix(in_srgb,var(--hive-status-error)_30%,transparent)";
    readonly insetDeep: "inset 0 0.5 1 color-mix(in_srgb,var(--hive-background-primary)_30%,transparent)";
    readonly insetSoft: "inset 0 1px 0.5 color-mix(in_srgb,var(--hive-background-primary)_20%,transparent)";
};
export declare const luxuryDepth: {
    readonly background: -1;
    readonly surface: 0;
    readonly card: 10;
    readonly cardHover: 20;
    readonly dropdown: 100;
    readonly modal: 200;
    readonly tooltip: 300;
    readonly notification: 400;
    readonly overlay: 500;
};
export declare const luxuryRadius: {
    readonly none: "0";
    readonly subtle: "0.5";
    readonly soft: "1";
    readonly medium: "2";
    readonly large: "3";
    readonly xl: "4";
    readonly pill: "full";
    readonly circle: "50%";
};
export declare const luxurySpacing: {
    readonly xs: "1";
    readonly sm: "2";
    readonly md: "3";
    readonly lg: "4";
    readonly xl: "5";
    readonly '2xl': "6";
    readonly '3xl': "8";
    readonly '4xl': "10";
    readonly '5xl': "12";
    readonly '6xl': "16";
};
export declare const luxuryTypography: {
    readonly weights: {
        readonly light: 300;
        readonly regular: 400;
        readonly medium: 500;
        readonly semibold: 600;
        readonly bold: 700;
    };
    readonly sizes: {
        readonly xs: "text-xs";
        readonly sm: "text-sm";
        readonly base: "text-base";
        readonly lg: "text-lg";
        readonly xl: "text-xl";
        readonly '2xl': "text-2xl";
        readonly '3xl': "text-3xl";
        readonly '4xl': "text-4xl";
        readonly '5xl': "text-5xl";
        readonly '6xl': "text-6xl";
    };
    readonly leading: {
        readonly tight: 1.2;
        readonly normal: 1.5;
        readonly relaxed: 1.75;
    };
    readonly tracking: {
        readonly tight: "-0.025em";
        readonly normal: "0em";
        readonly wide: "0.025em";
        readonly wider: "0.05em";
        readonly widest: "0.1em";
    };
};
export declare const glassEffects: {
    readonly backdrop: {
        readonly backdropFilter: "blur(3) saturate(180%)";
        readonly backgroundColor: "var(--hive-interactive-hover)";
        readonly border: "1px solid var(--hive-interactive-active)";
    };
    readonly frosted: {
        readonly backdropFilter: "blur(2)";
        readonly backgroundColor: "color-mix(in_srgb,var(--hive-interactive-hover)_60%,transparent)";
        readonly border: "1px solid color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)";
    };
    readonly goldGlass: {
        readonly backdropFilter: "blur(3) saturate(180%)";
        readonly backgroundColor: "color-mix(in_srgb,var(--hive-brand-secondary)_15%,transparent)";
        readonly border: "1px solid color-mix(in_srgb,var(--hive-brand-secondary)_20%,transparent)";
    };
};
export declare const luxuryComponents: {
    readonly card: {
        readonly background: "var(--hive-background-secondary)";
        readonly border: "1px solid var(--hive-border-default)";
        readonly shadow: "0 1 1.5 color-mix(in_srgb,var(--hive-background-primary)_30%,transparent)";
        readonly radius: "3";
    };
    readonly cardElevated: {
        readonly background: "linear-gradient(180deg, var(--hive-background-tertiary) 0%, var(--hive-background-interactive) 100%)";
        readonly border: "1px solid var(--hive-border-default)";
        readonly shadow: "0 2 15px color-mix(in_srgb,var(--hive-background-primary)_30%,transparent)";
        readonly radius: "3";
    };
    readonly primaryButton: {
        readonly background: "linear-gradient(90deg, transparent, color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent), transparent)";
        readonly color: "var(--hive-background-primary)";
        readonly shadow: "0 0 5 color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)";
        readonly radius: "2";
    };
    readonly ghostButton: {
        readonly background: "transparent";
        readonly color: "var(--hive-text-primary)";
        readonly border: "1px solid var(--hive-border-default)";
        readonly radius: "2";
    };
    readonly input: {
        readonly background: "var(--hive-background-tertiary)";
        readonly border: "1px solid var(--hive-border-default)";
        readonly color: "var(--hive-text-primary)";
        readonly radius: "2";
    };
    readonly inputFocused: {
        readonly background: "var(--hive-background-secondary)";
        readonly border: "1px solid var(--hive-brand-secondary)";
        readonly shadow: "0 0 0 0.5 color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)";
    };
};
export declare const withLuxuryGlow: (color: string, intensity?: number) => string;
export declare const createLuxuryGradient: (from: string, to: string, direction?: number) => string;
export declare const luxuryBorder: (color?: string, width?: number) => string;
export declare const hiveDarkLuxury: {
    readonly colors: {
        readonly void: "var(--hive-background-primary)";
        readonly obsidian: "var(--hive-background-primary)";
        readonly charcoal: "var(--hive-background-secondary)";
        readonly graphite: "var(--hive-background-tertiary)";
        readonly slate: "var(--hive-background-interactive)";
        readonly steel: "var(--hive-border-default)";
        readonly platinum: "var(--hive-text-primary)";
        readonly silver: "var(--hive-text-secondary)";
        readonly mercury: "var(--hive-text-tertiary)";
        readonly pewter: "var(--hive-text-disabled)";
        readonly smoke: "var(--hive-text-disabled)";
        readonly gold: "var(--hive-brand-secondary)";
        readonly champagne: "var(--hive-brand-secondary)";
        readonly amber: "var(--hive-status-warning)";
        readonly bronze: "var(--hive-brand-secondary)";
        readonly emerald: "var(--hive-status-success)";
        readonly ruby: "var(--hive-status-error)";
        readonly sapphire: "var(--hive-status-info)";
        readonly citrine: "var(--hive-status-warning)";
        readonly goldGlow: "color-mix(in_srgb,var(--hive-brand-secondary)_15%,transparent)";
        readonly shadowDeep: "color-mix(in_srgb,var(--hive-background-primary)_40%,transparent)";
        readonly shadowSoft: "color-mix(in_srgb,var(--hive-background-primary)_20%,transparent)";
        readonly glassMatte: "var(--hive-interactive-hover)";
        readonly glassShine: "var(--hive-interactive-active)";
    };
    readonly gradients: {
        readonly midnight: "linear-gradient(135deg, var(--hive-background-primary) 0%, var(--hive-background-secondary) 100%)";
        readonly obsidian: "linear-gradient(180deg, var(--hive-background-primary) 0%, var(--hive-background-tertiary) 100%)";
        readonly charcoal: "linear-gradient(45deg, var(--hive-background-secondary) 0%, var(--hive-background-interactive) 100%)";
        readonly goldShimmer: "linear-gradient(90deg, transparent, color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent), transparent)";
        readonly silverSheen: "linear-gradient(90deg, transparent, var(--hive-interactive-hover), transparent)";
        readonly glassDark: "linear-gradient(135deg, var(--hive-interactive-active), var(--hive-interactive-hover))";
        readonly glassGold: "linear-gradient(135deg, color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent), color-mix(in_srgb,var(--hive-brand-secondary)_5%,transparent))";
        readonly surfaceElevated: "linear-gradient(180deg, var(--hive-background-tertiary) 0%, var(--hive-background-interactive) 100%)";
        readonly surfacePressed: "linear-gradient(180deg, var(--hive-background-secondary) 0%, var(--hive-background-primary) 100%)";
    };
    readonly shadows: {
        readonly level1: "0 1px 3px color-mix(in_srgb,var(--hive-background-primary)_30%,transparent)";
        readonly level2: "0 1 1.5 color-mix(in_srgb,var(--hive-background-primary)_30%,transparent)";
        readonly level3: "0 2 15px color-mix(in_srgb,var(--hive-background-primary)_30%,transparent)";
        readonly level4: "0 3 6 color-mix(in_srgb,var(--hive-background-primary)_40%,transparent)";
        readonly level5: "0 5 10 color-mix(in_srgb,var(--hive-background-primary)_50%,transparent)";
        readonly hover: "0 2 6 color-mix(in_srgb,var(--hive-background-primary)_30%,transparent)";
        readonly active: "0 1 3 color-mix(in_srgb,var(--hive-background-primary)_40%,transparent)";
        readonly focus: "0 0 0 0.5 color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)";
        readonly goldGlow: "0 0 5 color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)";
        readonly goldGlowStrong: "0 0 30px color-mix(in_srgb,var(--hive-brand-secondary)_40%,transparent)";
        readonly emeraldGlow: "0 0 5 color-mix(in_srgb,var(--hive-status-success)_30%,transparent)";
        readonly rubyGlow: "0 0 5 color-mix(in_srgb,var(--hive-status-error)_30%,transparent)";
        readonly insetDeep: "inset 0 0.5 1 color-mix(in_srgb,var(--hive-background-primary)_30%,transparent)";
        readonly insetSoft: "inset 0 1px 0.5 color-mix(in_srgb,var(--hive-background-primary)_20%,transparent)";
    };
    readonly depth: {
        readonly background: -1;
        readonly surface: 0;
        readonly card: 10;
        readonly cardHover: 20;
        readonly dropdown: 100;
        readonly modal: 200;
        readonly tooltip: 300;
        readonly notification: 400;
        readonly overlay: 500;
    };
    readonly radius: {
        readonly none: "0";
        readonly subtle: "0.5";
        readonly soft: "1";
        readonly medium: "2";
        readonly large: "3";
        readonly xl: "4";
        readonly pill: "full";
        readonly circle: "50%";
    };
    readonly spacing: {
        readonly xs: "1";
        readonly sm: "2";
        readonly md: "3";
        readonly lg: "4";
        readonly xl: "5";
        readonly '2xl': "6";
        readonly '3xl': "8";
        readonly '4xl': "10";
        readonly '5xl': "12";
        readonly '6xl': "16";
    };
    readonly typography: {
        readonly weights: {
            readonly light: 300;
            readonly regular: 400;
            readonly medium: 500;
            readonly semibold: 600;
            readonly bold: 700;
        };
        readonly sizes: {
            readonly xs: "text-xs";
            readonly sm: "text-sm";
            readonly base: "text-base";
            readonly lg: "text-lg";
            readonly xl: "text-xl";
            readonly '2xl': "text-2xl";
            readonly '3xl': "text-3xl";
            readonly '4xl': "text-4xl";
            readonly '5xl': "text-5xl";
            readonly '6xl': "text-6xl";
        };
        readonly leading: {
            readonly tight: 1.2;
            readonly normal: 1.5;
            readonly relaxed: 1.75;
        };
        readonly tracking: {
            readonly tight: "-0.025em";
            readonly normal: "0em";
            readonly wide: "0.025em";
            readonly wider: "0.05em";
            readonly widest: "0.1em";
        };
    };
    readonly glass: {
        readonly backdrop: {
            readonly backdropFilter: "blur(3) saturate(180%)";
            readonly backgroundColor: "var(--hive-interactive-hover)";
            readonly border: "1px solid var(--hive-interactive-active)";
        };
        readonly frosted: {
            readonly backdropFilter: "blur(2)";
            readonly backgroundColor: "color-mix(in_srgb,var(--hive-interactive-hover)_60%,transparent)";
            readonly border: "1px solid color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)";
        };
        readonly goldGlass: {
            readonly backdropFilter: "blur(3) saturate(180%)";
            readonly backgroundColor: "color-mix(in_srgb,var(--hive-brand-secondary)_15%,transparent)";
            readonly border: "1px solid color-mix(in_srgb,var(--hive-brand-secondary)_20%,transparent)";
        };
    };
    readonly components: {
        readonly card: {
            readonly background: "var(--hive-background-secondary)";
            readonly border: "1px solid var(--hive-border-default)";
            readonly shadow: "0 1 1.5 color-mix(in_srgb,var(--hive-background-primary)_30%,transparent)";
            readonly radius: "3";
        };
        readonly cardElevated: {
            readonly background: "linear-gradient(180deg, var(--hive-background-tertiary) 0%, var(--hive-background-interactive) 100%)";
            readonly border: "1px solid var(--hive-border-default)";
            readonly shadow: "0 2 15px color-mix(in_srgb,var(--hive-background-primary)_30%,transparent)";
            readonly radius: "3";
        };
        readonly primaryButton: {
            readonly background: "linear-gradient(90deg, transparent, color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent), transparent)";
            readonly color: "var(--hive-background-primary)";
            readonly shadow: "0 0 5 color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)";
            readonly radius: "2";
        };
        readonly ghostButton: {
            readonly background: "transparent";
            readonly color: "var(--hive-text-primary)";
            readonly border: "1px solid var(--hive-border-default)";
            readonly radius: "2";
        };
        readonly input: {
            readonly background: "var(--hive-background-tertiary)";
            readonly border: "1px solid var(--hive-border-default)";
            readonly color: "var(--hive-text-primary)";
            readonly radius: "2";
        };
        readonly inputFocused: {
            readonly background: "var(--hive-background-secondary)";
            readonly border: "1px solid var(--hive-brand-secondary)";
            readonly shadow: "0 0 0 0.5 color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)";
        };
    };
};
export type DarkLuxuryTheme = typeof hiveDarkLuxury;
//# sourceMappingURL=dark-luxury.d.ts.map