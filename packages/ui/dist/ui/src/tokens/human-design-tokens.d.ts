/**
 * HIVE Human Design Tokens
 *
 * Replaces AI-generated patterns with intentional, purpose-driven design decisions.
 * Every token has a specific functional meaning for campus social utility.
 */
export declare const cornerRadius: {
    readonly none: "0px";
    readonly subtle: "2px";
    readonly standard: "6px";
    readonly friendly: "8px";
    readonly full: "50%";
};
export declare const shadows: {
    readonly none: "none";
    readonly subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.3)";
    readonly floating: "0 4px 12px 0 rgba(0, 0, 0, 0.4)";
    readonly modal: "0 8px 32px 0 rgba(0, 0, 0, 0.5)";
};
export declare const transitions: {
    readonly none: "none";
    readonly quick: "all 0.1s ease";
    readonly state: "all 0.15s ease";
    readonly entrance: "opacity 0.2s ease, transform 0.2s ease";
};
export declare const spacing: {
    readonly related: "0.25rem";
    readonly comfortable: "1rem";
    readonly section: "2rem";
    readonly page: "3rem";
};
export declare const borders: {
    readonly subtle: "#404040";
    readonly boundary: "#525252";
    readonly interactive: "#FBBF24";
    readonly success: "#22C55E";
    readonly warning: "#F59E0B";
    readonly error: "#EF4444";
};
export declare const colors: {
    readonly background: {
        readonly primary: "#0a0a0a";
        readonly surface: "#171717";
        readonly elevated: "#1f1f23";
    };
    readonly text: {
        readonly primary: "#ffffff";
        readonly secondary: "#a1a1aa";
        readonly tertiary: "#71717a";
    };
    readonly interactive: {
        readonly primary: "#FBBF24";
        readonly hover: "#F59E0B";
        readonly disabled: "#78716c";
    };
    readonly status: {
        readonly online: "#22C55E";
        readonly away: "#F59E0B";
        readonly offline: "#71717a";
    };
};
export declare const typography: {
    readonly primary: {
        readonly fontSize: "1.125rem";
        readonly fontWeight: "600";
        readonly lineHeight: "1.4";
    };
    readonly secondary: {
        readonly fontSize: "0.875rem";
        readonly fontWeight: "400";
        readonly lineHeight: "1.5";
    };
    readonly interactive: {
        readonly fontSize: "0.875rem";
        readonly fontWeight: "500";
        readonly lineHeight: "1.4";
    };
    readonly metadata: {
        readonly fontSize: "0.75rem";
        readonly fontWeight: "500";
        readonly lineHeight: "1.3";
        readonly textTransform: "uppercase";
        readonly letterSpacing: "0.05em";
    };
};
export declare const mobile: {
    readonly walkingFriendly: {
        readonly minTouchTarget: "44px";
        readonly thumbReach: "bottom-4 right-4";
        readonly quickScan: "1.125rem";
    };
    readonly campusActions: {
        readonly urgentButton: {
            readonly padding: "0.75rem 1rem";
            readonly fontSize: "1rem";
            readonly fontWeight: "600";
        };
        readonly quickAction: {
            readonly size: "3.5rem";
            readonly position: "fixed bottom-20 right-4";
        };
    };
};
export declare const componentTokens: {
    readonly button: {
        readonly primary: {
            readonly borderRadius: "6px";
            readonly boxShadow: "none";
            readonly transition: "all 0.1s ease";
        };
        readonly secondary: {
            readonly borderRadius: "6px";
            readonly boxShadow: "none";
            readonly transition: "none";
        };
    };
    readonly card: {
        readonly content: {
            readonly borderRadius: "8px";
            readonly boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.3)";
            readonly transition: "none";
        };
        readonly interactive: {
            readonly borderRadius: "6px";
            readonly boxShadow: "none";
            readonly transition: "all 0.15s ease";
        };
    };
    readonly modal: {
        readonly standard: {
            readonly borderRadius: "8px";
            readonly boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5)";
            readonly transition: "opacity 0.2s ease, transform 0.2s ease";
        };
    };
};
/**
 * CORNER RADIUS USAGE:
 * - none: System alerts, error states, code blocks
 * - subtle: Data tables, technical information
 * - standard: Buttons, inputs, interactive elements
 * - friendly: Content cards, user-generated content
 * - full: Only avatars and status indicators
 *
 * SHADOW USAGE:
 * - none: Buttons, inline text, flat interfaces
 * - subtle: Content cards, list separations
 * - floating: Dropdowns, tooltips, temporary overlays
 * - modal: Modals, slide-outs, major overlays
 *
 * TRANSITION USAGE:
 * - none: Most interactions (immediate feedback is better)
 * - quick: Button hover states, form validation
 * - state: Component state changes (open/closed, active/inactive)
 * - entrance: Modals, tooltips, temporary elements
 *
 * AVOID:
 * - rounded-2xl, rounded-3xl (use friendly at most)
 * - shadow-xl, shadow-2xl (use modal at most)
 * - transition-all duration-300 (use selective transitions)
 * - Decorative gradients (use functional color only)
 */ 
//# sourceMappingURL=human-design-tokens.d.ts.map