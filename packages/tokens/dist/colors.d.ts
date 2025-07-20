export declare const colors: {
    readonly void: "#000000";
    readonly obsidian: "#0A0A0B";
    readonly charcoal: "#111113";
    readonly graphite: "#1A1A1C";
    readonly slate: "#222225";
    readonly steel: "#2A2A2D";
    readonly platinum: "#E5E5E7";
    readonly silver: "#C1C1C4";
    readonly mercury: "#9B9B9F";
    readonly pewter: "#6B6B70";
    readonly smoke: "#4A4A4F";
    readonly gold: "#FFD700";
    readonly champagne: "#F7E98E";
    readonly amber: "#FFA500";
    readonly bronze: "#CD7F32";
    readonly emerald: "#10B981";
    readonly ruby: "#EF4444";
    readonly sapphire: "#3B82F6";
    readonly citrine: "#F59E0B";
    readonly black: "#0A0A0B";
    readonly white: "#E5E5E7";
    readonly gray: {
        readonly 50: "#4A4A4F";
        readonly 100: "#6B6B70";
        readonly 200: "#9B9B9F";
        readonly 300: "#C1C1C4";
        readonly 400: "#E5E5E7";
        readonly 500: "#2A2A2D";
        readonly 600: "#222225";
        readonly 700: "#1A1A1C";
        readonly 800: "#111113";
        readonly 900: "#0A0A0B";
        readonly 950: "#000000";
    };
};
export declare const overlay: {
    readonly glass: "rgba(255, 255, 255, 0.05)";
    readonly 'glass-medium': "rgba(255, 255, 255, 0.08)";
    readonly 'glass-strong': "rgba(255, 255, 255, 0.12)";
    readonly 'gold-subtle': "rgba(255, 215, 0, 0.1)";
    readonly 'gold-medium': "rgba(255, 215, 0, 0.15)";
    readonly 'gold-strong': "rgba(255, 215, 0, 0.3)";
    readonly 'gold-glow': "rgba(255, 215, 0, 0.4)";
    readonly 'shadow-soft': "rgba(0, 0, 0, 0.2)";
    readonly 'shadow-medium': "rgba(0, 0, 0, 0.3)";
    readonly 'shadow-deep': "rgba(0, 0, 0, 0.4)";
    readonly 'shadow-void': "rgba(0, 0, 0, 0.6)";
    readonly white: "rgba(255, 255, 255, 0.05)";
    readonly 'white-medium': "rgba(255, 255, 255, 0.08)";
    readonly 'white-strong': "rgba(255, 255, 255, 0.12)";
};
export declare const gradients: {
    readonly midnight: "linear-gradient(135deg, #0A0A0B 0%, #111113 100%)";
    readonly obsidian: "linear-gradient(180deg, #0A0A0B 0%, #1A1A1C 100%)";
    readonly charcoal: "linear-gradient(45deg, #111113 0%, #222225 100%)";
    readonly 'gold-shimmer': "linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent)";
    readonly 'silver-sheen': "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)";
    readonly 'glass-dark': "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))";
    readonly 'glass-gold': "linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))";
    readonly 'surface-elevated': "linear-gradient(180deg, #1A1A1C 0%, #222225 100%)";
    readonly 'surface-pressed': "linear-gradient(180deg, #111113 0%, #0A0A0B 100%)";
};
export declare const border: {
    readonly steel: "#2A2A2D";
    readonly graphite: "#1A1A1C";
    readonly slate: "#222225";
    readonly glass: "rgba(255, 255, 255, 0.05)";
    readonly 'glass-strong': "rgba(255, 255, 255, 0.12)";
    readonly gold: "rgba(255, 215, 0, 0.2)";
    readonly 'gold-strong': "rgba(255, 215, 0, 0.4)";
    readonly 'gold-glow': "rgba(255, 215, 0, 0.6)";
    readonly subtle: "rgba(255, 255, 255, 0.05)";
    readonly medium: "rgba(255, 255, 255, 0.08)";
};
export declare const shadows: {
    readonly level1: "0 1px 3px rgba(0, 0, 0, 0.3)";
    readonly level2: "0 4px 6px rgba(0, 0, 0, 0.3)";
    readonly level3: "0 8px 15px rgba(0, 0, 0, 0.3)";
    readonly level4: "0 12px 25px rgba(0, 0, 0, 0.4)";
    readonly level5: "0 20px 40px rgba(0, 0, 0, 0.5)";
    readonly hover: "0 8px 25px rgba(0, 0, 0, 0.3)";
    readonly active: "0 4px 12px rgba(0, 0, 0, 0.4)";
    readonly focus: "0 0 0 2px rgba(255, 215, 0, 0.3)";
    readonly 'gold-glow': "0 0 20px rgba(255, 215, 0, 0.3)";
    readonly 'gold-glow-strong': "0 0 30px rgba(255, 215, 0, 0.4)";
    readonly 'emerald-glow': "0 0 20px rgba(16, 185, 129, 0.3)";
    readonly 'ruby-glow': "0 0 20px rgba(239, 68, 68, 0.3)";
    readonly 'inset-deep': "inset 0 2px 4px rgba(0, 0, 0, 0.3)";
    readonly 'inset-soft': "inset 0 1px 2px rgba(0, 0, 0, 0.2)";
};
export declare const semantic: {
    readonly background: {
        readonly primary: "#0A0A0B";
        readonly secondary: "#111113";
        readonly tertiary: "#1A1A1C";
        readonly overlay: "rgba(255, 255, 255, 0.05)";
        readonly interactive: "#222225";
    };
    readonly text: {
        readonly primary: "#E5E5E7";
        readonly secondary: "#C1C1C4";
        readonly muted: "#9B9B9F";
        readonly disabled: "#6B6B70";
        readonly inverse: "#0A0A0B";
    };
    readonly brand: {
        readonly primary: "#FFD700";
        readonly secondary: "#F7E98E";
        readonly accent: "#FFA500";
        readonly muted: "#CD7F32";
    };
    readonly interactive: {
        readonly hover: "rgba(255, 255, 255, 0.08)";
        readonly focus: "#FFD700";
        readonly active: "rgba(255, 255, 255, 0.12)";
        readonly disabled: "#4A4A4F";
    };
    readonly status: {
        readonly success: "#10B981";
        readonly warning: "#F59E0B";
        readonly error: "#EF4444";
        readonly info: "#3B82F6";
    };
    readonly border: {
        readonly primary: "#2A2A2D";
        readonly secondary: "#1A1A1C";
        readonly subtle: "rgba(255, 255, 255, 0.05)";
        readonly focus: "rgba(255, 215, 0, 0.2)";
        readonly error: "#EF4444";
    };
};
export type ColorToken = keyof typeof colors;
export type SemanticToken = keyof typeof semantic;
export type GradientToken = keyof typeof gradients;
export type ShadowToken = keyof typeof shadows;
//# sourceMappingURL=colors.d.ts.map