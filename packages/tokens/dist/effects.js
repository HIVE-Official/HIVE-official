// Effects design tokens - Glass morphism, shadows, and visual effects
export const effects = {
    // Backdrop Blur - Glass morphism foundation
    backdropBlur: {
        none: 'blur(0)',
        sm: 'blur(4px)',
        md: 'blur(8px)',
        lg: 'blur(12px)',
        xl: 'blur(16px)',
        '2xl': 'blur(24px)',
        '3xl': 'blur(40px)',
    },
    // Backdrop Saturate - Color enhancement
    backdropSaturate: {
        normal: 'saturate(100%)',
        enhanced: 'saturate(150%)',
        vivid: 'saturate(180%)',
        extreme: 'saturate(200%)',
    },
    // Box Shadows - Layered depth system
    boxShadow: {
        // Elevation shadows
        level1: '0 1px 3px rgba(0, 0, 0, 0.3)',
        level2: '0 4px 6px rgba(0, 0, 0, 0.3)',
        level3: '0 8px 15px rgba(0, 0, 0, 0.3)',
        level4: '0 12px 25px rgba(0, 0, 0, 0.4)',
        level5: '0 20px 40px rgba(0, 0, 0, 0.5)',
        // Interactive shadows
        hover: '0 8px 25px rgba(0, 0, 0, 0.3)',
        active: '0 4px 12px rgba(0, 0, 0, 0.4)',
        focus: '0 0 0 2px rgba(255, 215, 0, 0.3)',
        // Glow effects
        goldGlow: '0 0 20px rgba(255, 215, 0, 0.3)',
        goldGlowStrong: '0 0 30px rgba(255, 215, 0, 0.4)',
        emeraldGlow: '0 0 20px rgba(16, 185, 129, 0.3)',
        rubyGlow: '0 0 20px rgba(239, 68, 68, 0.3)',
        sapphireGlow: '0 0 20px rgba(59, 130, 246, 0.3)',
        // Inner shadows
        insetDeep: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
        insetSoft: 'inset 0 1px 2px rgba(0, 0, 0, 0.2)',
        // Legacy support
        sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
        md: '0 4px 6px rgba(0, 0, 0, 0.3)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.3)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.4)',
        '2xl': '0 25px 50px rgba(0, 0, 0, 0.5)',
        inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
        none: 'none',
    },
    // Text Shadows - Typography depth
    textShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
        md: '0 2px 4px rgba(0, 0, 0, 0.3)',
        lg: '0 4px 8px rgba(0, 0, 0, 0.4)',
        xl: '0 8px 16px rgba(0, 0, 0, 0.4)',
        glow: '0 0 8px rgba(255, 215, 0, 0.6)',
        none: 'none',
    },
    // Filters - Visual enhancement
    filter: {
        none: 'none',
        grayscale: 'grayscale(100%)',
        sepia: 'sepia(100%)',
        blur: 'blur(4px)',
        brightness: 'brightness(110%)',
        contrast: 'contrast(110%)',
        hueRotate: 'hue-rotate(90deg)',
        invert: 'invert(100%)',
        saturate: 'saturate(150%)',
    },
    // Opacity levels - Transparency system
    opacity: {
        0: '0',
        5: '0.05',
        10: '0.1',
        15: '0.15',
        20: '0.2',
        25: '0.25',
        30: '0.3',
        40: '0.4',
        50: '0.5',
        60: '0.6',
        70: '0.7',
        75: '0.75',
        80: '0.8',
        90: '0.9',
        95: '0.95',
        100: '1',
    },
    // Z-Index Scale - Spatial hierarchy
    zIndex: {
        hide: '-1',
        auto: 'auto',
        base: '0',
        docked: '10',
        dropdown: '1000',
        sticky: '1020',
        banner: '1030',
        overlay: '1040',
        modal: '1050',
        popover: '1060',
        skipLink: '1070',
        toast: '1080',
        tooltip: '1090',
    },
};
// Glass morphism presets - Ready-to-use combinations
export const glassPresets = {
    // Standard glass
    glass: {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(12px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    // Strong glass
    glassStrong: {
        background: 'rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(16px) saturate(200%)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    // Subtle glass
    glassSubtle: {
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(8px) saturate(150%)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
    },
    // Gold glass - Premium variant
    glassGold: {
        background: 'rgba(255, 215, 0, 0.1)',
        backdropFilter: 'blur(12px) saturate(180%)',
        border: '1px solid rgba(255, 215, 0, 0.3)',
    },
    // Dark glass - For light backgrounds
    glassDark: {
        background: 'rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(12px) saturate(180%)',
        border: '1px solid rgba(0, 0, 0, 0.2)',
    },
};
// Glow effect presets - Interactive enhancements
export const glowPresets = {
    gold: {
        boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
        transition: 'box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
    },
    goldStrong: {
        boxShadow: '0 0 30px rgba(255, 215, 0, 0.4)',
        transition: 'box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
    },
    emerald: {
        boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
        transition: 'box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
    },
    ruby: {
        boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)',
        transition: 'box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
    },
    sapphire: {
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
        transition: 'box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
    },
};
//# sourceMappingURL=effects.js.map