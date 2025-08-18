export declare const effects: {
    readonly backdropBlur: {
        readonly none: "blur(0)";
        readonly sm: "blur(4px)";
        readonly md: "blur(8px)";
        readonly lg: "blur(12px)";
        readonly xl: "blur(16px)";
        readonly '2xl': "blur(24px)";
        readonly '3xl': "blur(40px)";
    };
    readonly backdropSaturate: {
        readonly normal: "saturate(100%)";
        readonly enhanced: "saturate(150%)";
        readonly vivid: "saturate(180%)";
        readonly extreme: "saturate(200%)";
    };
    readonly boxShadow: {
        readonly level1: "0 1px 3px rgba(0, 0, 0, 0.3)";
        readonly level2: "0 4px 6px rgba(0, 0, 0, 0.3)";
        readonly level3: "0 8px 15px rgba(0, 0, 0, 0.3)";
        readonly level4: "0 12px 25px rgba(0, 0, 0, 0.4)";
        readonly level5: "0 20px 40px rgba(0, 0, 0, 0.5)";
        readonly hover: "0 8px 25px rgba(0, 0, 0, 0.3)";
        readonly active: "0 4px 12px rgba(0, 0, 0, 0.4)";
        readonly focus: "0 0 0 2px rgba(255, 215, 0, 0.3)";
        readonly goldGlow: "0 0 20px rgba(255, 215, 0, 0.3)";
        readonly goldGlowStrong: "0 0 30px rgba(255, 215, 0, 0.4)";
        readonly emeraldGlow: "0 0 20px rgba(16, 185, 129, 0.3)";
        readonly rubyGlow: "0 0 20px rgba(239, 68, 68, 0.3)";
        readonly sapphireGlow: "0 0 20px rgba(59, 130, 246, 0.3)";
        readonly insetDeep: "inset 0 2px 4px rgba(0, 0, 0, 0.3)";
        readonly insetSoft: "inset 0 1px 2px rgba(0, 0, 0, 0.2)";
        readonly sm: "0 1px 2px rgba(0, 0, 0, 0.3)";
        readonly md: "0 4px 6px rgba(0, 0, 0, 0.3)";
        readonly lg: "0 10px 15px rgba(0, 0, 0, 0.3)";
        readonly xl: "0 20px 25px rgba(0, 0, 0, 0.4)";
        readonly '2xl': "0 25px 50px rgba(0, 0, 0, 0.5)";
        readonly inner: "inset 0 2px 4px rgba(0, 0, 0, 0.3)";
        readonly none: "none";
    };
    readonly textShadow: {
        readonly sm: "0 1px 2px rgba(0, 0, 0, 0.3)";
        readonly md: "0 2px 4px rgba(0, 0, 0, 0.3)";
        readonly lg: "0 4px 8px rgba(0, 0, 0, 0.4)";
        readonly xl: "0 8px 16px rgba(0, 0, 0, 0.4)";
        readonly glow: "0 0 8px rgba(255, 215, 0, 0.6)";
        readonly none: "none";
    };
    readonly filter: {
        readonly none: "none";
        readonly grayscale: "grayscale(100%)";
        readonly sepia: "sepia(100%)";
        readonly blur: "blur(4px)";
        readonly brightness: "brightness(110%)";
        readonly contrast: "contrast(110%)";
        readonly hueRotate: "hue-rotate(90deg)";
        readonly invert: "invert(100%)";
        readonly saturate: "saturate(150%)";
    };
    readonly opacity: {
        readonly 0: "0";
        readonly 5: "0.05";
        readonly 10: "0.1";
        readonly 15: "0.15";
        readonly 20: "0.2";
        readonly 25: "0.25";
        readonly 30: "0.3";
        readonly 40: "0.4";
        readonly 50: "0.5";
        readonly 60: "0.6";
        readonly 70: "0.7";
        readonly 75: "0.75";
        readonly 80: "0.8";
        readonly 90: "0.9";
        readonly 95: "0.95";
        readonly 100: "1";
    };
    readonly zIndex: {
        readonly hide: "-1";
        readonly auto: "auto";
        readonly base: "0";
        readonly docked: "10";
        readonly dropdown: "1000";
        readonly sticky: "1020";
        readonly banner: "1030";
        readonly overlay: "1040";
        readonly modal: "1050";
        readonly popover: "1060";
        readonly skipLink: "1070";
        readonly toast: "1080";
        readonly tooltip: "1090";
    };
};
export declare const glassPresets: {
    readonly glass: {
        readonly background: "rgba(255, 255, 255, 0.05)";
        readonly backdropFilter: "blur(12px) saturate(180%)";
        readonly border: "1px solid rgba(255, 255, 255, 0.1)";
    };
    readonly glassStrong: {
        readonly background: "rgba(255, 255, 255, 0.12)";
        readonly backdropFilter: "blur(16px) saturate(200%)";
        readonly border: "1px solid rgba(255, 255, 255, 0.2)";
    };
    readonly glassSubtle: {
        readonly background: "rgba(255, 255, 255, 0.02)";
        readonly backdropFilter: "blur(8px) saturate(150%)";
        readonly border: "1px solid rgba(255, 255, 255, 0.05)";
    };
    readonly glassGold: {
        readonly background: "rgba(255, 215, 0, 0.1)";
        readonly backdropFilter: "blur(12px) saturate(180%)";
        readonly border: "1px solid rgba(255, 215, 0, 0.3)";
    };
    readonly glassDark: {
        readonly background: "rgba(0, 0, 0, 0.1)";
        readonly backdropFilter: "blur(12px) saturate(180%)";
        readonly border: "1px solid rgba(0, 0, 0, 0.2)";
    };
};
export declare const glowPresets: {
    readonly gold: {
        readonly boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)";
        readonly transition: "box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1)";
    };
    readonly goldStrong: {
        readonly boxShadow: "0 0 30px rgba(255, 215, 0, 0.4)";
        readonly transition: "box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1)";
    };
    readonly emerald: {
        readonly boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)";
        readonly transition: "box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1)";
    };
    readonly ruby: {
        readonly boxShadow: "0 0 20px rgba(239, 68, 68, 0.3)";
        readonly transition: "box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1)";
    };
    readonly sapphire: {
        readonly boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)";
        readonly transition: "box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1)";
    };
};
export type EffectToken = keyof typeof effects;
export type GlassPreset = keyof typeof glassPresets;
export type GlowPreset = keyof typeof glowPresets;
//# sourceMappingURL=effects.d.ts.map