/**
 * HIVE Shadow/Elevation Composition System - PRODUCTION READY
 * Depth hierarchy for UI layers and campus social interface
 *
 * Built for dark mode campus platform with subtle, systematic depth
 * Creates visual hierarchy through elevation and shadow patterns
 *
 * Status: ✅ PRODUCTION READY
 * Version: v1.0.0
 * Date: August 26, 2025
 */
export declare const shadowPrinciples: {
    readonly philosophy: "Elevation creates hierarchy and guides attention in campus social flows";
    readonly rules: readonly ["Dark mode optimized: Subtle shadows that work on dark backgrounds", "Campus hierarchy: Clear distinction between content layers", "Performance first: Lightweight shadows that don't impact scroll", "Mobile optimized: Visible on all devices and lighting conditions"];
};
export declare const elevationScale: {
    readonly surface: {
        readonly level: 0;
        readonly description: "Base surface, no elevation";
        readonly shadow: "none";
        readonly use: "Page backgrounds, base cards";
        readonly zIndex: 0;
    };
    readonly raised: {
        readonly level: 1;
        readonly description: "Slightly elevated, subtle depth";
        readonly shadow: "0 1px 2px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.08)";
        readonly use: "Basic cards, form inputs, subtle containers";
        readonly zIndex: 1;
    };
    readonly floating: {
        readonly level: 2;
        readonly description: "Clearly floating, standard card depth";
        readonly shadow: "0 4px 8px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.12)";
        readonly use: "Standard cards, buttons, interactive elements";
        readonly zIndex: 10;
    };
    readonly elevated: {
        readonly level: 3;
        readonly description: "Prominently elevated, attention-drawing";
        readonly shadow: "0 8px 16px rgba(0, 0, 0, 0.20), 0 4px 8px rgba(0, 0, 0, 0.16)";
        readonly use: "Important cards, modal triggers, featured content";
        readonly zIndex: 20;
    };
    readonly lifted: {
        readonly level: 4;
        readonly description: "High elevation, temporary emphasis";
        readonly shadow: "0 16px 32px rgba(0, 0, 0, 0.24), 0 8px 16px rgba(0, 0, 0, 0.20)";
        readonly use: "Hover states, active elements, temporary overlays";
        readonly zIndex: 30;
    };
    readonly overlay: {
        readonly level: 5;
        readonly description: "Maximum elevation, overlay content";
        readonly shadow: "0 24px 48px rgba(0, 0, 0, 0.32), 0 16px 32px rgba(0, 0, 0, 0.28)";
        readonly use: "Modals, dropdowns, tooltips, popover content";
        readonly zIndex: 50;
    };
};
export declare const shadowVariables: {
    readonly variables: {
        readonly sm: "var(--hive-shadow-sm)";
        readonly base: "var(--hive-shadow-base)";
        readonly md: "var(--hive-shadow-md)";
        readonly lg: "var(--hive-shadow-lg)";
        readonly xl: "var(--hive-shadow-xl)";
    };
    readonly tailwind: {
        readonly none: "shadow-none";
        readonly sm: "shadow-sm";
        readonly base: "shadow";
        readonly md: "shadow-md";
        readonly lg: "shadow-lg";
        readonly xl: "shadow-xl";
    };
};
export declare const campusShadowPatterns: {
    readonly social: {
        readonly post: {
            readonly shadow: "0 4px 8px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.12)";
            readonly class: "shadow-md";
            readonly interaction: "hover:shadow-lg transition-shadow duration-200";
            readonly use: "Social posts, user content cards";
        };
        readonly comment: {
            readonly shadow: "0 1px 2px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.08)";
            readonly class: "shadow-sm";
            readonly interaction: "hover:shadow transition-shadow duration-200";
            readonly use: "Comment cards, nested content";
        };
        readonly reaction: {
            readonly shadow: "none";
            readonly class: "shadow-none";
            readonly interaction: "hover:shadow-sm transition-shadow duration-150";
            readonly use: "Reaction buttons, micro-interactions";
        };
    };
    readonly academic: {
        readonly studyCard: {
            readonly shadow: "0 4px 8px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.12)";
            readonly class: "shadow-md";
            readonly interaction: "hover:shadow-lg active:shadow transition-shadow duration-200";
            readonly use: "Study group cards, academic content";
        };
        readonly scheduleItem: {
            readonly shadow: "0 1px 2px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.08)";
            readonly class: "shadow-sm";
            readonly interaction: "hover:shadow transition-shadow duration-200";
            readonly use: "Calendar items, schedule blocks";
        };
        readonly resourceCard: {
            readonly shadow: "0 8px 16px rgba(0, 0, 0, 0.20), 0 4px 8px rgba(0, 0, 0, 0.16)";
            readonly class: "shadow-lg";
            readonly interaction: "hover:shadow-xl transition-shadow duration-200";
            readonly use: "Important resources, featured content";
        };
    };
    readonly community: {
        readonly spaceCard: {
            readonly shadow: "0 4px 8px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.12)";
            readonly class: "shadow-md";
            readonly interaction: "hover:shadow-lg group-focus:shadow-lg transition-shadow duration-200";
            readonly use: "Space cards, community previews";
        };
        readonly memberCard: {
            readonly shadow: "0 1px 2px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.08)";
            readonly class: "shadow-sm";
            readonly interaction: "hover:shadow transition-shadow duration-200";
            readonly use: "Member lists, user previews";
        };
        readonly leaderCard: {
            readonly shadow: "0 8px 16px rgba(0, 0, 0, 0.20), 0 4px 8px rgba(0, 0, 0, 0.16)";
            readonly class: "shadow-lg";
            readonly interaction: "hover:shadow-xl transition-shadow duration-200";
            readonly use: "Space leaders, featured members";
        };
    };
    readonly tools: {
        readonly toolCard: {
            readonly shadow: "0 4px 8px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.12)";
            readonly class: "shadow-md";
            readonly interaction: "hover:shadow-lg active:shadow-sm transition-shadow duration-200";
            readonly use: "Tool marketplace cards";
        };
        readonly builderPanel: {
            readonly shadow: "0 8px 16px rgba(0, 0, 0, 0.20), 0 4px 8px rgba(0, 0, 0, 0.16)";
            readonly class: "shadow-lg";
            readonly interaction: "focus-within:shadow-xl transition-shadow duration-300";
            readonly use: "Tool builder interface panels";
        };
        readonly previewCard: {
            readonly shadow: "0 16px 32px rgba(0, 0, 0, 0.24), 0 8px 16px rgba(0, 0, 0, 0.20)";
            readonly class: "shadow-xl";
            readonly interaction: "hover:shadow-2xl transition-shadow duration-200";
            readonly use: "Tool previews, showcase items";
        };
    };
};
export declare const interactiveShadows: {
    readonly buttons: {
        readonly primary: {
            readonly default: "shadow-md";
            readonly hover: "shadow-lg hover:shadow-xl";
            readonly active: "active:shadow-sm";
            readonly focus: "focus-visible:shadow-lg focus-visible:shadow-[var(--hive-gold-primary)]/20";
            readonly transition: "transition-shadow duration-200";
        };
        readonly secondary: {
            readonly default: "shadow-sm";
            readonly hover: "shadow-md hover:shadow-lg";
            readonly active: "active:shadow-sm";
            readonly focus: "focus-visible:shadow-md";
            readonly transition: "transition-shadow duration-200";
        };
        readonly ghost: {
            readonly default: "shadow-none";
            readonly hover: "shadow-sm hover:shadow-md";
            readonly active: "active:shadow-none";
            readonly focus: "focus-visible:shadow-sm";
            readonly transition: "transition-shadow duration-150";
        };
    };
    readonly cards: {
        readonly static: {
            readonly shadow: "shadow-sm";
            readonly transition: "none";
        };
        readonly interactive: {
            readonly default: "shadow-md";
            readonly hover: "hover:shadow-lg";
            readonly active: "active:shadow";
            readonly focus: "focus:shadow-lg focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20";
            readonly transition: "transition-all duration-200";
        };
        readonly selectable: {
            readonly default: "shadow-sm";
            readonly hover: "hover:shadow-md";
            readonly selected: "shadow-lg ring-2 ring-[var(--hive-gold-primary)]/30";
            readonly transition: "transition-all duration-200";
        };
        readonly draggable: {
            readonly default: "shadow-md";
            readonly hover: "hover:shadow-lg";
            readonly dragging: "shadow-xl rotate-2 scale-105";
            readonly transition: "transition-all duration-150";
        };
    };
    readonly inputs: {
        readonly default: {
            readonly shadow: "shadow-sm";
            readonly focus: "focus:shadow-md focus:shadow-[var(--hive-gold-primary)]/10";
            readonly error: "shadow-sm shadow-[var(--hive-error-primary)]/20";
            readonly success: "shadow-sm shadow-[var(--hive-success-primary)]/20";
        };
    };
};
export declare const overlayShadows: {
    readonly modal: {
        readonly backdrop: "shadow-none";
        readonly content: "shadow-xl drop-shadow-2xl";
        readonly animation: "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2";
    };
    readonly dropdown: {
        readonly menu: "shadow-lg drop-shadow-lg";
        readonly item: "shadow-none hover:shadow-sm";
        readonly animation: "animate-in fade-in-0 slide-in-from-top-2";
    };
    readonly tooltip: {
        readonly container: "shadow-md drop-shadow-sm";
        readonly animation: "animate-in fade-in-0 zoom-in-95";
    };
    readonly popover: {
        readonly content: "shadow-lg drop-shadow-md";
        readonly trigger: "shadow-none";
        readonly animation: "animate-in fade-in-0 zoom-in-95";
    };
};
export declare const performanceShadows: {
    readonly optimization: {
        readonly transform: "Use transform: translateY() for lift effects instead of heavy shadow changes";
        readonly batching: "Group shadow transitions with other properties";
        readonly scrollOptimization: "Reduce shadow complexity during scroll events";
    };
    readonly mobile: {
        readonly reduced: "Slightly reduce shadow intensity on mobile for performance";
        readonly touch: "Ensure shadows are visible under finger during touch";
        readonly battery: "Consider battery impact of complex shadows";
    };
    readonly darkMode: {
        readonly visibility: "Ensure shadows are visible on dark backgrounds";
        readonly contrast: "Maintain sufficient contrast for accessibility";
        readonly subtlety: "Use subtle shadows that enhance rather than overpower";
    };
};
export declare const zIndexLayers: {
    readonly behind: -1;
    readonly base: 0;
    readonly raised: 1;
    readonly floating: 10;
    readonly elevated: 20;
    readonly lifted: 30;
    readonly overlay: 40;
    readonly modal: 50;
    readonly toast: 60;
    readonly maximum: 9999;
};
export declare const shadowComposition: {
    readonly principles: {
        readonly philosophy: "Elevation creates hierarchy and guides attention in campus social flows";
        readonly rules: readonly ["Dark mode optimized: Subtle shadows that work on dark backgrounds", "Campus hierarchy: Clear distinction between content layers", "Performance first: Lightweight shadows that don't impact scroll", "Mobile optimized: Visible on all devices and lighting conditions"];
    };
    readonly scale: {
        readonly surface: {
            readonly level: 0;
            readonly description: "Base surface, no elevation";
            readonly shadow: "none";
            readonly use: "Page backgrounds, base cards";
            readonly zIndex: 0;
        };
        readonly raised: {
            readonly level: 1;
            readonly description: "Slightly elevated, subtle depth";
            readonly shadow: "0 1px 2px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.08)";
            readonly use: "Basic cards, form inputs, subtle containers";
            readonly zIndex: 1;
        };
        readonly floating: {
            readonly level: 2;
            readonly description: "Clearly floating, standard card depth";
            readonly shadow: "0 4px 8px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.12)";
            readonly use: "Standard cards, buttons, interactive elements";
            readonly zIndex: 10;
        };
        readonly elevated: {
            readonly level: 3;
            readonly description: "Prominently elevated, attention-drawing";
            readonly shadow: "0 8px 16px rgba(0, 0, 0, 0.20), 0 4px 8px rgba(0, 0, 0, 0.16)";
            readonly use: "Important cards, modal triggers, featured content";
            readonly zIndex: 20;
        };
        readonly lifted: {
            readonly level: 4;
            readonly description: "High elevation, temporary emphasis";
            readonly shadow: "0 16px 32px rgba(0, 0, 0, 0.24), 0 8px 16px rgba(0, 0, 0, 0.20)";
            readonly use: "Hover states, active elements, temporary overlays";
            readonly zIndex: 30;
        };
        readonly overlay: {
            readonly level: 5;
            readonly description: "Maximum elevation, overlay content";
            readonly shadow: "0 24px 48px rgba(0, 0, 0, 0.32), 0 16px 32px rgba(0, 0, 0, 0.28)";
            readonly use: "Modals, dropdowns, tooltips, popover content";
            readonly zIndex: 50;
        };
    };
    readonly variables: {
        readonly variables: {
            readonly sm: "var(--hive-shadow-sm)";
            readonly base: "var(--hive-shadow-base)";
            readonly md: "var(--hive-shadow-md)";
            readonly lg: "var(--hive-shadow-lg)";
            readonly xl: "var(--hive-shadow-xl)";
        };
        readonly tailwind: {
            readonly none: "shadow-none";
            readonly sm: "shadow-sm";
            readonly base: "shadow";
            readonly md: "shadow-md";
            readonly lg: "shadow-lg";
            readonly xl: "shadow-xl";
        };
    };
    readonly campus: {
        readonly social: {
            readonly post: {
                readonly shadow: "0 4px 8px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.12)";
                readonly class: "shadow-md";
                readonly interaction: "hover:shadow-lg transition-shadow duration-200";
                readonly use: "Social posts, user content cards";
            };
            readonly comment: {
                readonly shadow: "0 1px 2px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.08)";
                readonly class: "shadow-sm";
                readonly interaction: "hover:shadow transition-shadow duration-200";
                readonly use: "Comment cards, nested content";
            };
            readonly reaction: {
                readonly shadow: "none";
                readonly class: "shadow-none";
                readonly interaction: "hover:shadow-sm transition-shadow duration-150";
                readonly use: "Reaction buttons, micro-interactions";
            };
        };
        readonly academic: {
            readonly studyCard: {
                readonly shadow: "0 4px 8px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.12)";
                readonly class: "shadow-md";
                readonly interaction: "hover:shadow-lg active:shadow transition-shadow duration-200";
                readonly use: "Study group cards, academic content";
            };
            readonly scheduleItem: {
                readonly shadow: "0 1px 2px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.08)";
                readonly class: "shadow-sm";
                readonly interaction: "hover:shadow transition-shadow duration-200";
                readonly use: "Calendar items, schedule blocks";
            };
            readonly resourceCard: {
                readonly shadow: "0 8px 16px rgba(0, 0, 0, 0.20), 0 4px 8px rgba(0, 0, 0, 0.16)";
                readonly class: "shadow-lg";
                readonly interaction: "hover:shadow-xl transition-shadow duration-200";
                readonly use: "Important resources, featured content";
            };
        };
        readonly community: {
            readonly spaceCard: {
                readonly shadow: "0 4px 8px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.12)";
                readonly class: "shadow-md";
                readonly interaction: "hover:shadow-lg group-focus:shadow-lg transition-shadow duration-200";
                readonly use: "Space cards, community previews";
            };
            readonly memberCard: {
                readonly shadow: "0 1px 2px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.08)";
                readonly class: "shadow-sm";
                readonly interaction: "hover:shadow transition-shadow duration-200";
                readonly use: "Member lists, user previews";
            };
            readonly leaderCard: {
                readonly shadow: "0 8px 16px rgba(0, 0, 0, 0.20), 0 4px 8px rgba(0, 0, 0, 0.16)";
                readonly class: "shadow-lg";
                readonly interaction: "hover:shadow-xl transition-shadow duration-200";
                readonly use: "Space leaders, featured members";
            };
        };
        readonly tools: {
            readonly toolCard: {
                readonly shadow: "0 4px 8px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.12)";
                readonly class: "shadow-md";
                readonly interaction: "hover:shadow-lg active:shadow-sm transition-shadow duration-200";
                readonly use: "Tool marketplace cards";
            };
            readonly builderPanel: {
                readonly shadow: "0 8px 16px rgba(0, 0, 0, 0.20), 0 4px 8px rgba(0, 0, 0, 0.16)";
                readonly class: "shadow-lg";
                readonly interaction: "focus-within:shadow-xl transition-shadow duration-300";
                readonly use: "Tool builder interface panels";
            };
            readonly previewCard: {
                readonly shadow: "0 16px 32px rgba(0, 0, 0, 0.24), 0 8px 16px rgba(0, 0, 0, 0.20)";
                readonly class: "shadow-xl";
                readonly interaction: "hover:shadow-2xl transition-shadow duration-200";
                readonly use: "Tool previews, showcase items";
            };
        };
    };
    readonly interactive: {
        readonly buttons: {
            readonly primary: {
                readonly default: "shadow-md";
                readonly hover: "shadow-lg hover:shadow-xl";
                readonly active: "active:shadow-sm";
                readonly focus: "focus-visible:shadow-lg focus-visible:shadow-[var(--hive-gold-primary)]/20";
                readonly transition: "transition-shadow duration-200";
            };
            readonly secondary: {
                readonly default: "shadow-sm";
                readonly hover: "shadow-md hover:shadow-lg";
                readonly active: "active:shadow-sm";
                readonly focus: "focus-visible:shadow-md";
                readonly transition: "transition-shadow duration-200";
            };
            readonly ghost: {
                readonly default: "shadow-none";
                readonly hover: "shadow-sm hover:shadow-md";
                readonly active: "active:shadow-none";
                readonly focus: "focus-visible:shadow-sm";
                readonly transition: "transition-shadow duration-150";
            };
        };
        readonly cards: {
            readonly static: {
                readonly shadow: "shadow-sm";
                readonly transition: "none";
            };
            readonly interactive: {
                readonly default: "shadow-md";
                readonly hover: "hover:shadow-lg";
                readonly active: "active:shadow";
                readonly focus: "focus:shadow-lg focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20";
                readonly transition: "transition-all duration-200";
            };
            readonly selectable: {
                readonly default: "shadow-sm";
                readonly hover: "hover:shadow-md";
                readonly selected: "shadow-lg ring-2 ring-[var(--hive-gold-primary)]/30";
                readonly transition: "transition-all duration-200";
            };
            readonly draggable: {
                readonly default: "shadow-md";
                readonly hover: "hover:shadow-lg";
                readonly dragging: "shadow-xl rotate-2 scale-105";
                readonly transition: "transition-all duration-150";
            };
        };
        readonly inputs: {
            readonly default: {
                readonly shadow: "shadow-sm";
                readonly focus: "focus:shadow-md focus:shadow-[var(--hive-gold-primary)]/10";
                readonly error: "shadow-sm shadow-[var(--hive-error-primary)]/20";
                readonly success: "shadow-sm shadow-[var(--hive-success-primary)]/20";
            };
        };
    };
    readonly overlays: {
        readonly modal: {
            readonly backdrop: "shadow-none";
            readonly content: "shadow-xl drop-shadow-2xl";
            readonly animation: "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2";
        };
        readonly dropdown: {
            readonly menu: "shadow-lg drop-shadow-lg";
            readonly item: "shadow-none hover:shadow-sm";
            readonly animation: "animate-in fade-in-0 slide-in-from-top-2";
        };
        readonly tooltip: {
            readonly container: "shadow-md drop-shadow-sm";
            readonly animation: "animate-in fade-in-0 zoom-in-95";
        };
        readonly popover: {
            readonly content: "shadow-lg drop-shadow-md";
            readonly trigger: "shadow-none";
            readonly animation: "animate-in fade-in-0 zoom-in-95";
        };
    };
    readonly performance: {
        readonly optimization: {
            readonly transform: "Use transform: translateY() for lift effects instead of heavy shadow changes";
            readonly batching: "Group shadow transitions with other properties";
            readonly scrollOptimization: "Reduce shadow complexity during scroll events";
        };
        readonly mobile: {
            readonly reduced: "Slightly reduce shadow intensity on mobile for performance";
            readonly touch: "Ensure shadows are visible under finger during touch";
            readonly battery: "Consider battery impact of complex shadows";
        };
        readonly darkMode: {
            readonly visibility: "Ensure shadows are visible on dark backgrounds";
            readonly contrast: "Maintain sufficient contrast for accessibility";
            readonly subtlety: "Use subtle shadows that enhance rather than overpower";
        };
    };
    readonly zIndex: {
        readonly behind: -1;
        readonly base: 0;
        readonly raised: 1;
        readonly floating: 10;
        readonly elevated: 20;
        readonly lifted: 30;
        readonly overlay: 40;
        readonly modal: 50;
        readonly toast: 60;
        readonly maximum: 9999;
    };
};
export declare const createShadowClass: (elevation: keyof typeof elevationScale) => "shadow" | "shadow-sm" | "shadow-none" | "shadow-md" | "shadow-lg" | "shadow-xl";
export declare const createInteractiveShadowClass: (component: "buttons" | "cards", variant: string) => string;
export declare const createCampusShadowClass: (category: keyof typeof campusShadowPatterns, variant: string) => string;
export type ShadowComposition = typeof shadowComposition;
export type ElevationScale = typeof elevationScale;
export type CampusShadowPatterns = typeof campusShadowPatterns;
export type InteractiveShadows = typeof interactiveShadows;
//# sourceMappingURL=shadow-composition.d.ts.map