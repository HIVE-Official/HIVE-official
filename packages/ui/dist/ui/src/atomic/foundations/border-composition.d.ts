/**
 * HIVE Border/Radius Composition System - PRODUCTION READY
 * Edge treatment patterns for campus social platform consistency
 *
 * Built for dark mode with subtle borders and systematic radius patterns
 * Creates visual hierarchy and component definition through edge treatment
 *
 * Status: ✅ PRODUCTION READY
 * Version: v1.0.0
 * Date: August 26, 2025
 */
export declare const borderPrinciples: {
    readonly philosophy: "Edges define boundaries and create visual hierarchy without visual noise";
    readonly rules: readonly ["Dark mode optimized: Subtle borders that work on dark backgrounds", "Campus clarity: Clear component boundaries for social interface", "Systematic radii: Mathematical progression for consistent feel", "Touch friendly: Radii that work well for mobile touch interfaces"];
};
export declare const borderWidths: {
    readonly none: {
        readonly width: 0;
        readonly className: "border-0";
        readonly use: "No border, clean edges";
        readonly examples: "Ghost buttons, seamless cards";
    };
    readonly hairline: {
        readonly width: 0.5;
        readonly className: "border-[0.5px]";
        readonly use: "Ultra-subtle divisions, delicate separations";
        readonly examples: "List dividers, subtle card edges";
    };
    readonly thin: {
        readonly width: 1;
        readonly className: "border";
        readonly use: "Standard component borders, form inputs";
        readonly examples: "Cards, buttons, input fields";
    };
    readonly medium: {
        readonly width: 2;
        readonly className: "border-2";
        readonly use: "Emphasized borders, focus states";
        readonly examples: "Focus rings, important selections";
    };
    readonly thick: {
        readonly width: 3;
        readonly className: "border-3";
        readonly use: "Strong emphasis, error states";
        readonly examples: "Error indicators, strong selections";
    };
    readonly heavy: {
        readonly width: 4;
        readonly className: "border-4";
        readonly use: "Maximum emphasis, very important states";
        readonly examples: "Critical alerts, primary selections";
    };
};
export declare const borderRadius: {
    readonly none: {
        readonly radius: 0;
        readonly className: "rounded-none";
        readonly use: "Sharp edges, technical interfaces";
        readonly examples: "Code blocks, data tables";
    };
    readonly sm: {
        readonly radius: 6;
        readonly className: "rounded-sm";
        readonly use: "Small elements, badges, pills";
        readonly examples: "Status badges, small buttons, tags";
    };
    readonly base: {
        readonly radius: 8;
        readonly className: "rounded";
        readonly use: "Standard interface elements";
        readonly examples: "Buttons, cards, input fields";
    };
    readonly md: {
        readonly radius: 10;
        readonly className: "rounded-md";
        readonly use: "Medium components, enhanced feel";
        readonly examples: "Medium cards, enhanced buttons";
    };
    readonly lg: {
        readonly radius: 12;
        readonly className: "rounded-lg";
        readonly use: "Large components, modals";
        readonly examples: "Modal dialogs, large cards, panels";
    };
    readonly xl: {
        readonly radius: 16;
        readonly className: "rounded-xl";
        readonly use: "Hero components, special surfaces";
        readonly examples: "Hero sections, feature cards, overlays";
    };
    readonly full: {
        readonly radius: 9999;
        readonly className: "rounded-full";
        readonly use: "Circular elements, avatars";
        readonly examples: "Avatars, icon buttons, floating action buttons";
    };
};
export declare const borderColors: {
    readonly semantic: {
        readonly primary: "border-[var(--hive-border-primary)]";
        readonly secondary: "border-[var(--hive-border-secondary)]";
        readonly subtle: "border-[var(--hive-border-subtle)]";
        readonly glass: "border-[var(--hive-border-glass)]";
        readonly strong: "border-[var(--hive-border-glass-strong)]";
    };
    readonly brand: {
        readonly gold: "border-[var(--hive-gold-border)]";
        readonly goldStrong: "border-[var(--hive-gold-border-strong)]";
    };
    readonly status: {
        readonly success: "border-[var(--hive-success-border)]";
        readonly warning: "border-[var(--hive-warning-border)]";
        readonly error: "border-[var(--hive-error-border)]";
        readonly info: "border-[var(--hive-info-border)]";
    };
    readonly interactive: {
        readonly default: "border-[var(--hive-border-primary)]";
        readonly hover: "hover:border-[var(--hive-border-glass)]";
        readonly focus: "focus:border-[var(--hive-gold-border)]";
        readonly active: "border-[var(--hive-gold-border-strong)]";
        readonly disabled: "border-[var(--hive-border-subtle)] opacity-50";
    };
};
export declare const campusBorderPatterns: {
    readonly social: {
        readonly post: {
            readonly border: "border border-[var(--hive-border-primary)]";
            readonly radius: "rounded";
            readonly interactive: "hover:border-[var(--hive-border-glass)]";
            readonly use: "Social posts, user content";
        };
        readonly comment: {
            readonly border: "border-[0.5px] border-[var(--hive-border-subtle)]";
            readonly radius: "rounded-sm";
            readonly interactive: "hover:border-[var(--hive-border-glass)]";
            readonly use: "Comments, replies, nested content";
        };
        readonly profile: {
            readonly border: "border-2 border-[var(--hive-gold-border)]";
            readonly radius: "rounded-full";
            readonly interactive: "hover:border-[var(--hive-gold-primary)]";
            readonly use: "Profile avatars, user indicators";
        };
    };
    readonly academic: {
        readonly studyCard: {
            readonly border: "border border-[var(--hive-border-primary)]";
            readonly radius: "rounded-lg";
            readonly interactive: "hover:border-[var(--hive-border-glass)] transition-colors duration-200";
            readonly use: "Study groups, academic content";
        };
        readonly schedule: {
            readonly border: "border border-[var(--hive-border-glass)]";
            readonly radius: "rounded";
            readonly interactive: "focus:border-[var(--hive-gold-border)]";
            readonly use: "Calendar items, schedule blocks";
        };
        readonly resource: {
            readonly border: "border-2 border-[var(--hive-info-border)]";
            readonly radius: "rounded-md";
            readonly interactive: "hover:border-[var(--hive-info-primary)]";
            readonly use: "Academic resources, important content";
        };
    };
    readonly community: {
        readonly spaceCard: {
            readonly border: "border border-[var(--hive-border-primary)]";
            readonly radius: "rounded-lg";
            readonly interactive: "hover:border-[var(--hive-border-glass)] transition-colors duration-200";
            readonly use: "Space cards, community previews";
        };
        readonly member: {
            readonly border: "border-[0.5px] border-[var(--hive-border-subtle)]";
            readonly radius: "rounded";
            readonly interactive: "hover:border-[var(--hive-border-glass)]";
            readonly use: "Member cards, user lists";
        };
        readonly featured: {
            readonly border: "border-2 border-[var(--hive-gold-border)]";
            readonly radius: "rounded-xl";
            readonly interactive: "hover:border-[var(--hive-gold-primary)]";
            readonly use: "Featured spaces, highlighted communities";
        };
    };
    readonly tools: {
        readonly toolCard: {
            readonly border: "border border-[var(--hive-border-primary)]";
            readonly radius: "rounded-md";
            readonly interactive: "hover:border-[var(--hive-border-glass)] transition-colors duration-200";
            readonly use: "Tool cards, marketplace items";
        };
        readonly builder: {
            readonly border: "border-2 border-[var(--hive-success-border)]";
            readonly radius: "rounded-lg";
            readonly interactive: "hover:border-[var(--hive-success-primary)]";
            readonly use: "Tool builder panels, creation interfaces";
        };
        readonly preview: {
            readonly border: "border-3 border-[var(--hive-gold-border-strong)]";
            readonly radius: "rounded-xl";
            readonly interactive: "hover:border-[var(--hive-gold-primary)]";
            readonly use: "Tool previews, showcase items";
        };
    };
};
export declare const componentBorderPatterns: {
    readonly buttons: {
        readonly primary: {
            readonly default: "border border-[var(--hive-gold-border)]";
            readonly radius: "rounded";
            readonly hover: "hover:border-[var(--hive-gold-primary)]";
            readonly focus: "focus:border-[var(--hive-gold-primary)] focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20";
            readonly active: "active:border-[var(--hive-gold-border-strong)]";
        };
        readonly secondary: {
            readonly default: "border border-[var(--hive-border-glass)]";
            readonly radius: "rounded";
            readonly hover: "hover:border-[var(--hive-border-glass-strong)]";
            readonly focus: "focus:border-[var(--hive-gold-border)] focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20";
            readonly active: "active:border-[var(--hive-border-primary)]";
        };
        readonly ghost: {
            readonly default: "border-0";
            readonly radius: "rounded";
            readonly hover: "hover:border hover:border-[var(--hive-border-subtle)]";
            readonly focus: "focus:border focus:border-[var(--hive-gold-border)]";
            readonly active: "border border-[var(--hive-border-glass)]";
        };
    };
    readonly inputs: {
        readonly text: {
            readonly default: "border border-[var(--hive-border-glass)]";
            readonly radius: "rounded";
            readonly focus: "focus:border-[var(--hive-gold-border)] focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20";
            readonly error: "border-2 border-[var(--hive-error-border)]";
            readonly success: "border-2 border-[var(--hive-success-border)]";
        };
        readonly select: {
            readonly default: "border border-[var(--hive-border-glass)]";
            readonly radius: "rounded";
            readonly open: "border-[var(--hive-gold-border)] ring-2 ring-[var(--hive-gold-primary)]/20";
            readonly disabled: "border-[var(--hive-border-subtle)] opacity-50";
        };
        readonly checkbox: {
            readonly default: "border-2 border-[var(--hive-border-glass)]";
            readonly radius: "rounded-sm";
            readonly checked: "border-2 border-[var(--hive-gold-border)]";
            readonly focus: "focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20";
        };
    };
    readonly cards: {
        readonly standard: {
            readonly border: "border border-[var(--hive-border-primary)]";
            readonly radius: "rounded";
            readonly interactive: "hover:border-[var(--hive-border-glass)] transition-colors duration-200";
        };
        readonly elevated: {
            readonly border: "border border-[var(--hive-border-glass)]";
            readonly radius: "rounded-lg";
            readonly interactive: "hover:border-[var(--hive-border-glass-strong)] transition-colors duration-200";
        };
        readonly featured: {
            readonly border: "border-2 border-[var(--hive-gold-border)]";
            readonly radius: "rounded-xl";
            readonly interactive: "hover:border-[var(--hive-gold-primary)] transition-colors duration-200";
        };
    };
    readonly navigation: {
        readonly tab: {
            readonly default: "border-b-2 border-transparent";
            readonly radius: "rounded-t-md";
            readonly active: "border-b-[var(--hive-gold-primary)]";
            readonly hover: "hover:border-b-[var(--hive-border-glass)]";
        };
        readonly link: {
            readonly default: "border-0";
            readonly radius: "rounded-sm";
            readonly focus: "border border-[var(--hive-gold-border)] focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20";
        };
    };
};
export declare const overlayBorderPatterns: {
    readonly modal: {
        readonly backdrop: "border-0";
        readonly content: "border border-[var(--hive-border-glass)]";
        readonly radius: "rounded-xl";
    };
    readonly dropdown: {
        readonly menu: "border border-[var(--hive-border-glass)]";
        readonly radius: "rounded-md";
        readonly item: "border-0";
        readonly itemRadius: "rounded-sm";
    };
    readonly tooltip: {
        readonly content: "border border-[var(--hive-border-glass)]";
        readonly radius: "rounded";
    };
    readonly popover: {
        readonly content: "border border-[var(--hive-border-glass)]";
        readonly radius: "rounded-lg";
    };
};
export declare const createBorderClass: (width: keyof typeof borderWidths, color: string, radius: keyof typeof borderRadius) => string;
export declare const createCampusBorderClass: (category: keyof typeof campusBorderPatterns, variant: string) => string;
export declare const createComponentBorderClass: (component: keyof typeof componentBorderPatterns, variant: string, state?: string) => string;
export declare const performanceBorderPatterns: {
    readonly optimization: {
        readonly focusOutline: "Use outline instead of border for focus states";
        readonly transitions: "Group border changes with color/shadow transitions";
        readonly scrollOptimization: "Simplify borders during scroll events";
    };
    readonly mobile: {
        readonly touchTargets: "Ensure borders don't reduce touch target size";
        readonly performance: "Use simpler borders on mobile for performance";
        readonly visibility: "Ensure borders are visible on various screen qualities";
    };
};
export declare const borderComposition: {
    readonly principles: {
        readonly philosophy: "Edges define boundaries and create visual hierarchy without visual noise";
        readonly rules: readonly ["Dark mode optimized: Subtle borders that work on dark backgrounds", "Campus clarity: Clear component boundaries for social interface", "Systematic radii: Mathematical progression for consistent feel", "Touch friendly: Radii that work well for mobile touch interfaces"];
    };
    readonly widths: {
        readonly none: {
            readonly width: 0;
            readonly className: "border-0";
            readonly use: "No border, clean edges";
            readonly examples: "Ghost buttons, seamless cards";
        };
        readonly hairline: {
            readonly width: 0.5;
            readonly className: "border-[0.5px]";
            readonly use: "Ultra-subtle divisions, delicate separations";
            readonly examples: "List dividers, subtle card edges";
        };
        readonly thin: {
            readonly width: 1;
            readonly className: "border";
            readonly use: "Standard component borders, form inputs";
            readonly examples: "Cards, buttons, input fields";
        };
        readonly medium: {
            readonly width: 2;
            readonly className: "border-2";
            readonly use: "Emphasized borders, focus states";
            readonly examples: "Focus rings, important selections";
        };
        readonly thick: {
            readonly width: 3;
            readonly className: "border-3";
            readonly use: "Strong emphasis, error states";
            readonly examples: "Error indicators, strong selections";
        };
        readonly heavy: {
            readonly width: 4;
            readonly className: "border-4";
            readonly use: "Maximum emphasis, very important states";
            readonly examples: "Critical alerts, primary selections";
        };
    };
    readonly radius: {
        readonly none: {
            readonly radius: 0;
            readonly className: "rounded-none";
            readonly use: "Sharp edges, technical interfaces";
            readonly examples: "Code blocks, data tables";
        };
        readonly sm: {
            readonly radius: 6;
            readonly className: "rounded-sm";
            readonly use: "Small elements, badges, pills";
            readonly examples: "Status badges, small buttons, tags";
        };
        readonly base: {
            readonly radius: 8;
            readonly className: "rounded";
            readonly use: "Standard interface elements";
            readonly examples: "Buttons, cards, input fields";
        };
        readonly md: {
            readonly radius: 10;
            readonly className: "rounded-md";
            readonly use: "Medium components, enhanced feel";
            readonly examples: "Medium cards, enhanced buttons";
        };
        readonly lg: {
            readonly radius: 12;
            readonly className: "rounded-lg";
            readonly use: "Large components, modals";
            readonly examples: "Modal dialogs, large cards, panels";
        };
        readonly xl: {
            readonly radius: 16;
            readonly className: "rounded-xl";
            readonly use: "Hero components, special surfaces";
            readonly examples: "Hero sections, feature cards, overlays";
        };
        readonly full: {
            readonly radius: 9999;
            readonly className: "rounded-full";
            readonly use: "Circular elements, avatars";
            readonly examples: "Avatars, icon buttons, floating action buttons";
        };
    };
    readonly colors: {
        readonly semantic: {
            readonly primary: "border-[var(--hive-border-primary)]";
            readonly secondary: "border-[var(--hive-border-secondary)]";
            readonly subtle: "border-[var(--hive-border-subtle)]";
            readonly glass: "border-[var(--hive-border-glass)]";
            readonly strong: "border-[var(--hive-border-glass-strong)]";
        };
        readonly brand: {
            readonly gold: "border-[var(--hive-gold-border)]";
            readonly goldStrong: "border-[var(--hive-gold-border-strong)]";
        };
        readonly status: {
            readonly success: "border-[var(--hive-success-border)]";
            readonly warning: "border-[var(--hive-warning-border)]";
            readonly error: "border-[var(--hive-error-border)]";
            readonly info: "border-[var(--hive-info-border)]";
        };
        readonly interactive: {
            readonly default: "border-[var(--hive-border-primary)]";
            readonly hover: "hover:border-[var(--hive-border-glass)]";
            readonly focus: "focus:border-[var(--hive-gold-border)]";
            readonly active: "border-[var(--hive-gold-border-strong)]";
            readonly disabled: "border-[var(--hive-border-subtle)] opacity-50";
        };
    };
    readonly campus: {
        readonly social: {
            readonly post: {
                readonly border: "border border-[var(--hive-border-primary)]";
                readonly radius: "rounded";
                readonly interactive: "hover:border-[var(--hive-border-glass)]";
                readonly use: "Social posts, user content";
            };
            readonly comment: {
                readonly border: "border-[0.5px] border-[var(--hive-border-subtle)]";
                readonly radius: "rounded-sm";
                readonly interactive: "hover:border-[var(--hive-border-glass)]";
                readonly use: "Comments, replies, nested content";
            };
            readonly profile: {
                readonly border: "border-2 border-[var(--hive-gold-border)]";
                readonly radius: "rounded-full";
                readonly interactive: "hover:border-[var(--hive-gold-primary)]";
                readonly use: "Profile avatars, user indicators";
            };
        };
        readonly academic: {
            readonly studyCard: {
                readonly border: "border border-[var(--hive-border-primary)]";
                readonly radius: "rounded-lg";
                readonly interactive: "hover:border-[var(--hive-border-glass)] transition-colors duration-200";
                readonly use: "Study groups, academic content";
            };
            readonly schedule: {
                readonly border: "border border-[var(--hive-border-glass)]";
                readonly radius: "rounded";
                readonly interactive: "focus:border-[var(--hive-gold-border)]";
                readonly use: "Calendar items, schedule blocks";
            };
            readonly resource: {
                readonly border: "border-2 border-[var(--hive-info-border)]";
                readonly radius: "rounded-md";
                readonly interactive: "hover:border-[var(--hive-info-primary)]";
                readonly use: "Academic resources, important content";
            };
        };
        readonly community: {
            readonly spaceCard: {
                readonly border: "border border-[var(--hive-border-primary)]";
                readonly radius: "rounded-lg";
                readonly interactive: "hover:border-[var(--hive-border-glass)] transition-colors duration-200";
                readonly use: "Space cards, community previews";
            };
            readonly member: {
                readonly border: "border-[0.5px] border-[var(--hive-border-subtle)]";
                readonly radius: "rounded";
                readonly interactive: "hover:border-[var(--hive-border-glass)]";
                readonly use: "Member cards, user lists";
            };
            readonly featured: {
                readonly border: "border-2 border-[var(--hive-gold-border)]";
                readonly radius: "rounded-xl";
                readonly interactive: "hover:border-[var(--hive-gold-primary)]";
                readonly use: "Featured spaces, highlighted communities";
            };
        };
        readonly tools: {
            readonly toolCard: {
                readonly border: "border border-[var(--hive-border-primary)]";
                readonly radius: "rounded-md";
                readonly interactive: "hover:border-[var(--hive-border-glass)] transition-colors duration-200";
                readonly use: "Tool cards, marketplace items";
            };
            readonly builder: {
                readonly border: "border-2 border-[var(--hive-success-border)]";
                readonly radius: "rounded-lg";
                readonly interactive: "hover:border-[var(--hive-success-primary)]";
                readonly use: "Tool builder panels, creation interfaces";
            };
            readonly preview: {
                readonly border: "border-3 border-[var(--hive-gold-border-strong)]";
                readonly radius: "rounded-xl";
                readonly interactive: "hover:border-[var(--hive-gold-primary)]";
                readonly use: "Tool previews, showcase items";
            };
        };
    };
    readonly components: {
        readonly buttons: {
            readonly primary: {
                readonly default: "border border-[var(--hive-gold-border)]";
                readonly radius: "rounded";
                readonly hover: "hover:border-[var(--hive-gold-primary)]";
                readonly focus: "focus:border-[var(--hive-gold-primary)] focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20";
                readonly active: "active:border-[var(--hive-gold-border-strong)]";
            };
            readonly secondary: {
                readonly default: "border border-[var(--hive-border-glass)]";
                readonly radius: "rounded";
                readonly hover: "hover:border-[var(--hive-border-glass-strong)]";
                readonly focus: "focus:border-[var(--hive-gold-border)] focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20";
                readonly active: "active:border-[var(--hive-border-primary)]";
            };
            readonly ghost: {
                readonly default: "border-0";
                readonly radius: "rounded";
                readonly hover: "hover:border hover:border-[var(--hive-border-subtle)]";
                readonly focus: "focus:border focus:border-[var(--hive-gold-border)]";
                readonly active: "border border-[var(--hive-border-glass)]";
            };
        };
        readonly inputs: {
            readonly text: {
                readonly default: "border border-[var(--hive-border-glass)]";
                readonly radius: "rounded";
                readonly focus: "focus:border-[var(--hive-gold-border)] focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20";
                readonly error: "border-2 border-[var(--hive-error-border)]";
                readonly success: "border-2 border-[var(--hive-success-border)]";
            };
            readonly select: {
                readonly default: "border border-[var(--hive-border-glass)]";
                readonly radius: "rounded";
                readonly open: "border-[var(--hive-gold-border)] ring-2 ring-[var(--hive-gold-primary)]/20";
                readonly disabled: "border-[var(--hive-border-subtle)] opacity-50";
            };
            readonly checkbox: {
                readonly default: "border-2 border-[var(--hive-border-glass)]";
                readonly radius: "rounded-sm";
                readonly checked: "border-2 border-[var(--hive-gold-border)]";
                readonly focus: "focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20";
            };
        };
        readonly cards: {
            readonly standard: {
                readonly border: "border border-[var(--hive-border-primary)]";
                readonly radius: "rounded";
                readonly interactive: "hover:border-[var(--hive-border-glass)] transition-colors duration-200";
            };
            readonly elevated: {
                readonly border: "border border-[var(--hive-border-glass)]";
                readonly radius: "rounded-lg";
                readonly interactive: "hover:border-[var(--hive-border-glass-strong)] transition-colors duration-200";
            };
            readonly featured: {
                readonly border: "border-2 border-[var(--hive-gold-border)]";
                readonly radius: "rounded-xl";
                readonly interactive: "hover:border-[var(--hive-gold-primary)] transition-colors duration-200";
            };
        };
        readonly navigation: {
            readonly tab: {
                readonly default: "border-b-2 border-transparent";
                readonly radius: "rounded-t-md";
                readonly active: "border-b-[var(--hive-gold-primary)]";
                readonly hover: "hover:border-b-[var(--hive-border-glass)]";
            };
            readonly link: {
                readonly default: "border-0";
                readonly radius: "rounded-sm";
                readonly focus: "border border-[var(--hive-gold-border)] focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20";
            };
        };
    };
    readonly overlays: {
        readonly modal: {
            readonly backdrop: "border-0";
            readonly content: "border border-[var(--hive-border-glass)]";
            readonly radius: "rounded-xl";
        };
        readonly dropdown: {
            readonly menu: "border border-[var(--hive-border-glass)]";
            readonly radius: "rounded-md";
            readonly item: "border-0";
            readonly itemRadius: "rounded-sm";
        };
        readonly tooltip: {
            readonly content: "border border-[var(--hive-border-glass)]";
            readonly radius: "rounded";
        };
        readonly popover: {
            readonly content: "border border-[var(--hive-border-glass)]";
            readonly radius: "rounded-lg";
        };
    };
    readonly performance: {
        readonly optimization: {
            readonly focusOutline: "Use outline instead of border for focus states";
            readonly transitions: "Group border changes with color/shadow transitions";
            readonly scrollOptimization: "Simplify borders during scroll events";
        };
        readonly mobile: {
            readonly touchTargets: "Ensure borders don't reduce touch target size";
            readonly performance: "Use simpler borders on mobile for performance";
            readonly visibility: "Ensure borders are visible on various screen qualities";
        };
    };
};
export type BorderComposition = typeof borderComposition;
export type BorderWidths = typeof borderWidths;
export type BorderRadius = typeof borderRadius;
export type BorderColors = typeof borderColors;
export type CampusBorderPatterns = typeof campusBorderPatterns;
//# sourceMappingURL=border-composition.d.ts.map