export declare const foundation: {
    readonly void: "#000000";
    readonly obsidian: "#0A0A0B";
    readonly charcoal: "#111113";
    readonly graphite: "#1A1A1C";
    readonly steel: "#2A2A2D";
    readonly platinum: "#E5E5E7";
    readonly silver: "#C1C1C4";
    readonly mercury: "#9B9B9F";
    readonly pewter: "#6B6B70";
    readonly gold: "#FFD700";
    readonly emerald: "#10B981";
    readonly ruby: "#EF4444";
    readonly sapphire: "#3B82F6";
    readonly citrine: "#F59E0B";
};
export declare const semantic: {
    readonly background: {
        readonly primary: "#0A0A0B";
        readonly elevated: "#111113";
        readonly interactive: "#1A1A1C";
        readonly overlay: "rgba(0, 0, 0, 0.8)";
    };
    readonly text: {
        readonly primary: "#E5E5E7";
        readonly secondary: "#C1C1C4";
        readonly muted: "#9B9B9F";
        readonly disabled: "#6B6B70";
    };
    readonly border: {
        readonly default: "#2A2A2D";
        readonly subtle: "rgba(42, 42, 45, 0.5)";
    };
    readonly interactive: {
        readonly primary: "#FFD700";
        readonly hover: "rgba(255, 215, 0, 0.1)";
        readonly focus: "rgba(255, 215, 0, 0.3)";
        readonly disabled: "#6B6B70";
    };
    readonly status: {
        readonly success: "#10B981";
        readonly warning: "#F59E0B";
        readonly error: "#EF4444";
        readonly info: "#3B82F6";
    };
};
export declare const components: {
    readonly card: {
        readonly background: "#111113";
        readonly border: "#2A2A2D";
        readonly text: "#E5E5E7";
        readonly hover: {
            readonly border: "rgba(255, 215, 0, 0.2)";
            readonly shadow: "0 8px 32px rgba(0, 0, 0, 0.3)";
        };
    };
    readonly button: {
        readonly primary: {
            readonly background: "#FFD700";
            readonly text: "#0A0A0B";
            readonly hover: "rgba(255, 215, 0, 0.9)";
        };
        readonly secondary: {
            readonly background: "transparent";
            readonly text: "#E5E5E7";
            readonly border: "#2A2A2D";
            readonly hover: {
                readonly background: "#1A1A1C";
                readonly border: "#FFD700";
                readonly text: "#FFD700";
            };
        };
    };
    readonly input: {
        readonly background: "#1A1A1C";
        readonly border: "#2A2A2D";
        readonly text: "#E5E5E7";
        readonly placeholder: "#9B9B9F";
        readonly focus: {
            readonly border: "#FFD700";
            readonly ring: "rgba(255, 215, 0, 0.3)";
        };
    };
    readonly modal: {
        readonly overlay: "rgba(0, 0, 0, 0.8)";
        readonly background: "#0A0A0B";
        readonly border: "#2A2A2D";
        readonly header: {
            readonly background: "#0A0A0B";
            readonly border: "#2A2A2D";
        };
    };
};
export declare const cssVariables: string;
export declare const tailwindConfig: {
    readonly colors: {
        readonly void: "#000000";
        readonly obsidian: "#0A0A0B";
        readonly charcoal: "#111113";
        readonly graphite: "#1A1A1C";
        readonly steel: "#2A2A2D";
        readonly platinum: "#E5E5E7";
        readonly silver: "#C1C1C4";
        readonly mercury: "#9B9B9F";
        readonly pewter: "#6B6B70";
        readonly gold: "#FFD700";
        readonly emerald: "#10B981";
        readonly ruby: "#EF4444";
        readonly sapphire: "#3B82F6";
        readonly citrine: "#F59E0B";
    };
    readonly backgroundColor: {
        readonly 'hive-primary': "#0A0A0B";
        readonly 'hive-elevated': "#111113";
        readonly 'hive-interactive': "#1A1A1C";
    };
    readonly textColor: {
        readonly 'hive-primary': "#E5E5E7";
        readonly 'hive-secondary': "#C1C1C4";
        readonly 'hive-muted': "#9B9B9F";
        readonly 'hive-disabled': "#6B6B70";
    };
    readonly borderColor: {
        readonly 'hive-default': "#2A2A2D";
        readonly 'hive-subtle': "rgba(42, 42, 45, 0.5)";
    };
};
export declare const guidelines: {
    readonly backgrounds: {
        readonly primary: "Use 'obsidian' for main app backgrounds";
        readonly elevated: "Use 'charcoal' for cards, modals, panels";
        readonly interactive: "Use 'graphite' for hover states and active elements";
        readonly never: "Never use pure white or gray-X classes";
    };
    readonly text: {
        readonly hierarchy: "platinum > silver > mercury > pewter (4 levels max)";
        readonly contrast: "Always test against WCAG 2.1 AA standards";
        readonly never: "Never use hardcoded hex values or gray-X classes";
    };
    readonly accents: {
        readonly primary: "Use 'gold' sparingly for brand moments and primary actions";
        readonly status: "Use semantic status colors for feedback only";
        readonly never: "Never use gold for decorative purposes";
    };
    readonly components: {
        readonly cards: "Always use components.card.* tokens";
        readonly buttons: "Always use components.button.* tokens";
        readonly inputs: "Always use components.input.* tokens";
        readonly modals: "Always use components.modal.* tokens";
    };
};
export type FoundationToken = keyof typeof foundation;
export type SemanticToken = keyof typeof semantic;
export type ComponentToken = keyof typeof components;
declare const _default: {
    readonly foundation: {
        readonly void: "#000000";
        readonly obsidian: "#0A0A0B";
        readonly charcoal: "#111113";
        readonly graphite: "#1A1A1C";
        readonly steel: "#2A2A2D";
        readonly platinum: "#E5E5E7";
        readonly silver: "#C1C1C4";
        readonly mercury: "#9B9B9F";
        readonly pewter: "#6B6B70";
        readonly gold: "#FFD700";
        readonly emerald: "#10B981";
        readonly ruby: "#EF4444";
        readonly sapphire: "#3B82F6";
        readonly citrine: "#F59E0B";
    };
    readonly semantic: {
        readonly background: {
            readonly primary: "#0A0A0B";
            readonly elevated: "#111113";
            readonly interactive: "#1A1A1C";
            readonly overlay: "rgba(0, 0, 0, 0.8)";
        };
        readonly text: {
            readonly primary: "#E5E5E7";
            readonly secondary: "#C1C1C4";
            readonly muted: "#9B9B9F";
            readonly disabled: "#6B6B70";
        };
        readonly border: {
            readonly default: "#2A2A2D";
            readonly subtle: "rgba(42, 42, 45, 0.5)";
        };
        readonly interactive: {
            readonly primary: "#FFD700";
            readonly hover: "rgba(255, 215, 0, 0.1)";
            readonly focus: "rgba(255, 215, 0, 0.3)";
            readonly disabled: "#6B6B70";
        };
        readonly status: {
            readonly success: "#10B981";
            readonly warning: "#F59E0B";
            readonly error: "#EF4444";
            readonly info: "#3B82F6";
        };
    };
    readonly components: {
        readonly card: {
            readonly background: "#111113";
            readonly border: "#2A2A2D";
            readonly text: "#E5E5E7";
            readonly hover: {
                readonly border: "rgba(255, 215, 0, 0.2)";
                readonly shadow: "0 8px 32px rgba(0, 0, 0, 0.3)";
            };
        };
        readonly button: {
            readonly primary: {
                readonly background: "#FFD700";
                readonly text: "#0A0A0B";
                readonly hover: "rgba(255, 215, 0, 0.9)";
            };
            readonly secondary: {
                readonly background: "transparent";
                readonly text: "#E5E5E7";
                readonly border: "#2A2A2D";
                readonly hover: {
                    readonly background: "#1A1A1C";
                    readonly border: "#FFD700";
                    readonly text: "#FFD700";
                };
            };
        };
        readonly input: {
            readonly background: "#1A1A1C";
            readonly border: "#2A2A2D";
            readonly text: "#E5E5E7";
            readonly placeholder: "#9B9B9F";
            readonly focus: {
                readonly border: "#FFD700";
                readonly ring: "rgba(255, 215, 0, 0.3)";
            };
        };
        readonly modal: {
            readonly overlay: "rgba(0, 0, 0, 0.8)";
            readonly background: "#0A0A0B";
            readonly border: "#2A2A2D";
            readonly header: {
                readonly background: "#0A0A0B";
                readonly border: "#2A2A2D";
            };
        };
    };
    readonly cssVariables: string;
    readonly tailwindConfig: {
        readonly colors: {
            readonly void: "#000000";
            readonly obsidian: "#0A0A0B";
            readonly charcoal: "#111113";
            readonly graphite: "#1A1A1C";
            readonly steel: "#2A2A2D";
            readonly platinum: "#E5E5E7";
            readonly silver: "#C1C1C4";
            readonly mercury: "#9B9B9F";
            readonly pewter: "#6B6B70";
            readonly gold: "#FFD700";
            readonly emerald: "#10B981";
            readonly ruby: "#EF4444";
            readonly sapphire: "#3B82F6";
            readonly citrine: "#F59E0B";
        };
        readonly backgroundColor: {
            readonly 'hive-primary': "#0A0A0B";
            readonly 'hive-elevated': "#111113";
            readonly 'hive-interactive': "#1A1A1C";
        };
        readonly textColor: {
            readonly 'hive-primary': "#E5E5E7";
            readonly 'hive-secondary': "#C1C1C4";
            readonly 'hive-muted': "#9B9B9F";
            readonly 'hive-disabled': "#6B6B70";
        };
        readonly borderColor: {
            readonly 'hive-default': "#2A2A2D";
            readonly 'hive-subtle': "rgba(42, 42, 45, 0.5)";
        };
    };
    readonly guidelines: {
        readonly backgrounds: {
            readonly primary: "Use 'obsidian' for main app backgrounds";
            readonly elevated: "Use 'charcoal' for cards, modals, panels";
            readonly interactive: "Use 'graphite' for hover states and active elements";
            readonly never: "Never use pure white or gray-X classes";
        };
        readonly text: {
            readonly hierarchy: "platinum > silver > mercury > pewter (4 levels max)";
            readonly contrast: "Always test against WCAG 2.1 AA standards";
            readonly never: "Never use hardcoded hex values or gray-X classes";
        };
        readonly accents: {
            readonly primary: "Use 'gold' sparingly for brand moments and primary actions";
            readonly status: "Use semantic status colors for feedback only";
            readonly never: "Never use gold for decorative purposes";
        };
        readonly components: {
            readonly cards: "Always use components.card.* tokens";
            readonly buttons: "Always use components.button.* tokens";
            readonly inputs: "Always use components.input.* tokens";
            readonly modals: "Always use components.modal.* tokens";
        };
    };
};
export default _default;
//# sourceMappingURL=colors-refined.d.ts.map