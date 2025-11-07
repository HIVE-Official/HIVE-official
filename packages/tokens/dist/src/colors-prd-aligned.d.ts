export declare const prdColors: {
    readonly black: "#000000";
    readonly white: "#FFFFFF";
    readonly gray: {
        readonly 1000: "#0A0A0A";
        readonly 900: "#171717";
        readonly 800: "#262626";
        readonly 700: "#404040";
        readonly 600: "#525252";
        readonly 500: "#737373";
        readonly 400: "#A3A3A3";
        readonly 300: "#D4D4D4";
        readonly 200: "#E5E5E5";
        readonly 100: "#F5F5F5";
        readonly 50: "#FAFAFA";
    };
    readonly blue: {
        readonly 600: "#0070F3";
        readonly 500: "#0761D1";
        readonly 400: "#2D7FF9";
    };
    readonly gold: {
        readonly 500: "#FFD700";
        readonly 400: "#FFD700";
        readonly 300: "#FFD700";
    };
    readonly green: {
        readonly 500: "#00D46A";
        readonly 400: "#22DD77";
    };
    readonly yellow: {
        readonly 500: "#FFB800";
        readonly 400: "#FFC533";
    };
    readonly red: {
        readonly 500: "#FF3737";
        readonly 400: "#FF5555";
    };
};
export declare const prdSemantic: {
    readonly background: {
        readonly primary: "#000000";
        readonly secondary: "#171717";
        readonly tertiary: "#262626";
        readonly interactive: "#404040";
        readonly overlay: "rgba(0, 0, 0, 0.6)";
    };
    readonly text: {
        readonly primary: "#FFFFFF";
        readonly secondary: "#D4D4D4";
        readonly tertiary: "#A3A3A3";
        readonly disabled: "#525252";
        readonly inverse: "#000000";
    };
    readonly brand: {
        readonly primary: "#FFD700";
        readonly secondary: "#FFD700";
        readonly hover: "#FFD700";
        readonly onGold: "#000000";
    };
    readonly interactive: {
        readonly hover: "rgba(255, 255, 255, 0.04)";
        readonly focus: "rgba(255, 255, 255, 0.20)";
        readonly active: "rgba(255, 255, 255, 0.08)";
        readonly disabled: "#404040";
    };
    readonly gold: {
        readonly cta: "#FFD700";
        readonly achievement: "#FFD700";
        readonly online: "#FFD700";
        readonly featured: "#FFD700";
    };
    readonly status: {
        readonly success: "#00D46A";
        readonly warning: "#FFB800";
        readonly error: "#FF3737";
        readonly info: "#FFFFFF";
    };
    readonly border: {
        readonly default: "rgba(255, 255, 255, 0.08)";
        readonly hover: "rgba(255, 255, 255, 0.16)";
        readonly focus: "rgba(255, 255, 255, 0.40)";
        readonly strong: "#404040";
    };
};
export declare const migrationMapping: {
    readonly 'hive-obsidian': "#000000";
    readonly 'hive-charcoal': "#171717";
    readonly 'hive-graphite': "#262626";
    readonly 'hive-slate': "#404040";
    readonly 'hive-steel': "#404040";
    readonly 'hive-platinum': "#FFFFFF";
    readonly 'hive-silver': "#D4D4D4";
    readonly 'hive-mercury': "#A3A3A3";
    readonly 'hive-pewter': "#525252";
    readonly 'hive-smoke': "#737373";
    readonly 'hive-gold': "#FFD700";
    readonly 'hive-champagne': "#FFD700";
    readonly 'hive-amber': "#FFB800";
    readonly 'hive-bronze': "#FFD700";
    readonly 'hive-emerald': "#00D46A";
    readonly 'hive-ruby': "#FF3737";
    readonly 'hive-sapphire': "#FFFFFF";
    readonly 'hive-citrine': "#FFB800";
};
export declare const prdCSSVariables: string;
export declare const prdTailwindColors: {
    'hive-background': {
        primary: "#000000";
        secondary: "#171717";
        tertiary: "#262626";
        interactive: "#404040";
    };
    'hive-text': {
        primary: "#FFFFFF";
        secondary: "#D4D4D4";
        tertiary: "#A3A3A3";
        disabled: "#525252";
    };
    'hive-brand': {
        primary: "#FFD700";
        secondary: "#FFD700";
        hover: "#FFD700";
        'on-gold': "#000000";
    };
    'hive-status': {
        success: "#00D46A";
        warning: "#FFB800";
        error: "#FF3737";
        info: "#FFFFFF";
    };
    'hive-border': {
        default: "rgba(255, 255, 255, 0.08)";
        hover: "rgba(255, 255, 255, 0.16)";
        focus: "rgba(255, 255, 255, 0.40)";
        strong: "#404040";
    };
};
export declare const prdColorGuidelines: {
    readonly default: "Black/white/gray for 95% of the UI - clean, minimal, professional";
    readonly gold: "ONLY for: Primary CTAs, achievements, online presence, featured badges";
    readonly interactive: "Use grayscale for hovers/focus - NOT gold (avoid visual noise)";
    readonly backgrounds: "Layer backgrounds from primary (#000) → secondary (#171717) → tertiary (#262626)";
    readonly text: "White primary, gray secondary - high contrast for readability";
    readonly borders: "Subtle white borders - NO gold borders except special badges";
    readonly focus: "White glow for focus rings - save gold for dopamine hits";
    readonly buttons: "Default buttons are white-on-black, gold ONLY for primary CTAs";
};
export declare const goldUsageRules: {
    readonly allowed: readonly ["Primary CTA buttons (Join Space, Create Tool, Start Ritual)", "Achievement moments (Ritual complete, level unlocked)", "Online presence indicator (147 students online)", "Featured content badges (Featured Tool, Hot Space)"];
    readonly forbidden: readonly ["Focus rings (use white glow instead)", "Hover states (use grayscale instead)", "All borders (use white/gray instead)", "Secondary buttons (use outline variant)", "Decorative elements (keep minimal)"];
};
export type PRDColorToken = keyof typeof prdColors;
export type PRDSemanticToken = keyof typeof prdSemantic;
export type MigrationToken = keyof typeof migrationMapping;
//# sourceMappingURL=colors-prd-aligned.d.ts.map