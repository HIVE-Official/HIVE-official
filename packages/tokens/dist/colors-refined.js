// HIVE Refined Color System - Black Matte Sleek
// Eliminates redundancies, focuses on essential tokens only
// === CORE FOUNDATION ===
// Black matte hierarchy - 5 levels maximum
export const foundation = {
    // Pure foundations
    void: '#000000', // Pure black for maximum contrast
    obsidian: '#0A0A0B', // Main backgrounds - rich black matte
    charcoal: '#111113', // Card backgrounds - elevated matte
    graphite: '#1A1A1C', // Interactive surfaces - subtle elevation
    steel: '#2A2A2D', // Borders and dividers
    // Text hierarchy - 4 levels maximum  
    platinum: '#E5E5E7', // Primary text - high contrast
    silver: '#C1C1C4', // Secondary text - readable
    mercury: '#9B9B9F', // Muted text - subtle
    pewter: '#6B6B70', // Disabled text - minimal
    // Single accent system
    gold: '#FFD700', // Primary brand accent - strategic use only
    // Essential status colors
    emerald: '#10B981', // Success states
    ruby: '#EF4444', // Error states  
    sapphire: '#3B82F6', // Info states
    citrine: '#F59E0B', // Warning states
};
// === SEMANTIC MAPPING ===
// Clear, single-purpose semantic tokens
export const semantic = {
    // Background system - 4 levels
    background: {
        primary: foundation.obsidian, // Main app background
        elevated: foundation.charcoal, // Cards, modals, panels
        interactive: foundation.graphite, // Hover states, active elements
        overlay: 'rgba(0, 0, 0, 0.8)', // Modal overlays
    },
    // Text system - 4 levels
    text: {
        primary: foundation.platinum, // Main content text
        secondary: foundation.silver, // Supporting text
        muted: foundation.mercury, // Less important text
        disabled: foundation.pewter, // Disabled state text
    },
    // Border system - 2 levels
    border: {
        default: foundation.steel, // Standard borders
        subtle: 'rgba(42, 42, 45, 0.5)', // Very subtle borders
    },
    // Interactive system
    interactive: {
        primary: foundation.gold, // Primary actions, brand moments
        hover: 'rgba(255, 215, 0, 0.1)', // Gold hover overlay
        focus: 'rgba(255, 215, 0, 0.3)', // Gold focus ring
        disabled: foundation.pewter, // Disabled state
    },
    // Status system
    status: {
        success: foundation.emerald,
        warning: foundation.citrine,
        error: foundation.ruby,
        info: foundation.sapphire,
    },
};
// === COMPONENT SYSTEM ===
// Pre-configured component color schemes
export const components = {
    // Card system
    card: {
        background: semantic.background.elevated,
        border: semantic.border.default,
        text: semantic.text.primary,
        hover: {
            border: 'rgba(255, 215, 0, 0.2)',
            shadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
    },
    // Button system
    button: {
        primary: {
            background: semantic.interactive.primary,
            text: foundation.obsidian,
            hover: 'rgba(255, 215, 0, 0.9)',
        },
        secondary: {
            background: 'transparent',
            text: semantic.text.primary,
            border: semantic.border.default,
            hover: {
                background: semantic.background.interactive,
                border: semantic.interactive.primary,
                text: semantic.interactive.primary,
            },
        },
    },
    // Input system
    input: {
        background: semantic.background.interactive,
        border: semantic.border.default,
        text: semantic.text.primary,
        placeholder: semantic.text.muted,
        focus: {
            border: semantic.interactive.primary,
            ring: semantic.interactive.focus,
        },
    },
    // Modal system
    modal: {
        overlay: semantic.background.overlay,
        background: semantic.background.primary,
        border: semantic.border.default,
        header: {
            background: semantic.background.primary,
            border: semantic.border.default,
        },
    },
};
// === CSS CUSTOM PROPERTIES ===
// Single source of truth for CSS variables
export const cssVariables = `
:root {
  /* Foundation */
  --hive-void: ${foundation.void};
  --hive-obsidian: ${foundation.obsidian};
  --hive-charcoal: ${foundation.charcoal};
  --hive-graphite: ${foundation.graphite};
  --hive-steel: ${foundation.steel};
  --hive-platinum: ${foundation.platinum};
  --hive-silver: ${foundation.silver};
  --hive-mercury: ${foundation.mercury};
  --hive-pewter: ${foundation.pewter};
  --hive-gold: ${foundation.gold};
  
  /* Semantic */
  --hive-bg-primary: ${semantic.background.primary};
  --hive-bg-elevated: ${semantic.background.elevated};
  --hive-bg-interactive: ${semantic.background.interactive};
  --hive-bg-overlay: ${semantic.background.overlay};
  
  --hive-text-primary: ${semantic.text.primary};
  --hive-text-secondary: ${semantic.text.secondary};
  --hive-text-muted: ${semantic.text.muted};
  --hive-text-disabled: ${semantic.text.disabled};
  
  --hive-border-default: ${semantic.border.default};
  --hive-border-subtle: ${semantic.border.subtle};
  
  --hive-interactive-primary: ${semantic.interactive.primary};
  --hive-interactive-hover: ${semantic.interactive.hover};
  --hive-interactive-focus: ${semantic.interactive.focus};
  
  /* Status */
  --hive-status-success: ${semantic.status.success};
  --hive-status-warning: ${semantic.status.warning};
  --hive-status-error: ${semantic.status.error};
  --hive-status-info: ${semantic.status.info};
}
`;
// === TAILWIND EXTENSION ===
// Refined Tailwind config - no redundancies
export const tailwindConfig = {
    colors: {
        // Foundation tokens
        void: foundation.void,
        obsidian: foundation.obsidian,
        charcoal: foundation.charcoal,
        graphite: foundation.graphite,
        steel: foundation.steel,
        platinum: foundation.platinum,
        silver: foundation.silver,
        mercury: foundation.mercury,
        pewter: foundation.pewter,
        gold: foundation.gold,
        // Status colors
        emerald: foundation.emerald,
        ruby: foundation.ruby,
        sapphire: foundation.sapphire,
        citrine: foundation.citrine,
        // Remove redundant gray scale - use foundation tokens instead
    },
    // Component-specific utilities
    backgroundColor: {
        'hive-primary': semantic.background.primary,
        'hive-elevated': semantic.background.elevated,
        'hive-interactive': semantic.background.interactive,
    },
    textColor: {
        'hive-primary': semantic.text.primary,
        'hive-secondary': semantic.text.secondary,
        'hive-muted': semantic.text.muted,
        'hive-disabled': semantic.text.disabled,
    },
    borderColor: {
        'hive-default': semantic.border.default,
        'hive-subtle': semantic.border.subtle,
    },
};
// === USAGE GUIDELINES ===
export const guidelines = {
    backgrounds: {
        primary: "Use 'obsidian' for main app backgrounds",
        elevated: "Use 'charcoal' for cards, modals, panels",
        interactive: "Use 'graphite' for hover states and active elements",
        never: "Never use pure white or gray-X classes",
    },
    text: {
        hierarchy: "platinum > silver > mercury > pewter (4 levels max)",
        contrast: "Always test against WCAG 2.1 AA standards",
        never: "Never use hardcoded hex values or gray-X classes",
    },
    accents: {
        primary: "Use 'gold' sparingly for brand moments and primary actions",
        status: "Use semantic status colors for feedback only",
        never: "Never use gold for decorative purposes",
    },
    components: {
        cards: "Always use components.card.* tokens",
        buttons: "Always use components.button.* tokens",
        inputs: "Always use components.input.* tokens",
        modals: "Always use components.modal.* tokens",
    },
};
// Default export for easy importing
export default {
    foundation,
    semantic,
    components,
    cssVariables,
    tailwindConfig,
    guidelines,
};
//# sourceMappingURL=colors-refined.js.map