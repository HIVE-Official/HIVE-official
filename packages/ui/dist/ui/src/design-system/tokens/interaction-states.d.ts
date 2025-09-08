/**
 * HIVE Interaction State Specifications
 * Precise State Definitions for Buttons and Inputs
 */
export declare const buttonStates: {
    readonly default: {
        readonly border: "1px solid rgba(var(--hive-gold-rgb), 0.4)";
        readonly background: "transparent";
        readonly text: "var(--hive-gold)";
        readonly transform: "none";
        readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
        readonly use: "Resting state, no user interaction";
    };
    readonly hover: {
        readonly border: "1px solid rgba(var(--hive-gold-rgb), 0.8)";
        readonly background: "rgba(var(--hive-gold-rgb), 0.05)";
        readonly text: "var(--hive-gold)";
        readonly transform: "translateY(-1px) scale(1.01)";
        readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
        readonly use: "Desktop pointer hover, not on touch devices";
        readonly condition: "@media (hover: hover) and (pointer: fine)";
    };
    readonly active: {
        readonly border: "1px solid var(--hive-gold)";
        readonly background: "rgba(var(--hive-gold-rgb), 0.12)";
        readonly text: "var(--hive-gold)";
        readonly transform: "translateY(0px) scale(0.98)";
        readonly transition: "all 100ms cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        readonly use: "Pressed/clicked state, immediate feedback";
    };
    readonly focus: {
        readonly border: "1px solid var(--hive-gold)";
        readonly background: "rgba(var(--hive-gold-rgb), 0.05)";
        readonly text: "var(--hive-gold)";
        readonly boxShadow: "0 0 0 3px rgba(var(--hive-gold-rgb), 0.3)";
        readonly transform: "none";
        readonly outline: "none";
        readonly use: "Keyboard focus, accessibility compliance";
    };
    readonly disabled: {
        readonly border: "1px solid rgba(255, 255, 255, 0.1)";
        readonly background: "transparent";
        readonly text: "rgba(255, 255, 255, 0.3)";
        readonly transform: "none";
        readonly pointerEvents: "none";
        readonly cursor: "not-allowed";
        readonly use: "Non-interactive state";
    };
    readonly loading: {
        readonly border: "1px solid rgba(var(--hive-gold-rgb), 0.4)";
        readonly background: "rgba(var(--hive-gold-rgb), 0.05)";
        readonly text: "transparent";
        readonly pointerEvents: "none";
        readonly cursor: "wait";
        readonly use: "Processing state with spinner overlay";
    };
};
export declare const inputStates: {
    readonly default: {
        readonly border: "1px solid rgba(255, 255, 255, 0.2)";
        readonly background: "rgba(255, 255, 255, 0.02)";
        readonly text: "rgba(255, 255, 255, 0.9)";
        readonly placeholder: "rgba(255, 255, 255, 0.5)";
        readonly outline: "none";
        readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
        readonly use: "Default input appearance";
    };
    readonly focus: {
        readonly border: "1px solid var(--hive-gold)";
        readonly background: "rgba(255, 255, 255, 0.03)";
        readonly text: "rgba(255, 255, 255, 1.0)";
        readonly boxShadow: "0 0 0 3px rgba(var(--hive-gold-rgb), 0.2)";
        readonly outline: "none";
        readonly use: "Active input focus";
    };
    readonly hover: {
        readonly border: "1px solid rgba(255, 255, 255, 0.3)";
        readonly background: "rgba(255, 255, 255, 0.025)";
        readonly condition: "@media (hover: hover) and (pointer: fine)";
        readonly use: "Desktop hover before focus";
    };
    readonly filled: {
        readonly border: "1px solid rgba(255, 255, 255, 0.25)";
        readonly background: "rgba(255, 255, 255, 0.03)";
        readonly text: "rgba(255, 255, 255, 1.0)";
        readonly use: "Input with valid content";
    };
    readonly error: {
        readonly border: "1px solid #F87171";
        readonly background: "rgba(248, 113, 113, 0.03)";
        readonly text: "rgba(255, 255, 255, 1.0)";
        readonly boxShadow: "0 0 0 3px rgba(248, 113, 113, 0.2)";
        readonly use: "Validation error state";
    };
    readonly success: {
        readonly border: "1px solid #34D399";
        readonly background: "rgba(52, 211, 153, 0.03)";
        readonly text: "rgba(255, 255, 255, 1.0)";
        readonly boxShadow: "0 0 0 3px rgba(52, 211, 153, 0.2)";
        readonly use: "Validation success state";
    };
    readonly disabled: {
        readonly border: "1px solid rgba(255, 255, 255, 0.1)";
        readonly background: "rgba(255, 255, 255, 0.01)";
        readonly text: "rgba(255, 255, 255, 0.3)";
        readonly placeholder: "rgba(255, 255, 255, 0.2)";
        readonly pointerEvents: "none";
        readonly cursor: "not-allowed";
        readonly use: "Non-editable input";
    };
    readonly readonly: {
        readonly border: "1px solid rgba(255, 255, 255, 0.15)";
        readonly background: "rgba(255, 255, 255, 0.02)";
        readonly text: "rgba(255, 255, 255, 0.8)";
        readonly cursor: "default";
        readonly use: "Display-only input";
    };
};
export declare const stateTransitions: {
    readonly durations: {
        readonly immediate: "100ms";
        readonly standard: "200ms";
        readonly validation: "300ms";
    };
    readonly easing: {
        readonly enter: "cubic-bezier(0.4, 0.0, 0.2, 1.0)";
        readonly exit: "cubic-bezier(0.4, 0.0, 1, 1)";
        readonly feedback: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        readonly natural: "cubic-bezier(0.4, 0.0, 0.6, 1.0)";
    };
    readonly animatableProperties: readonly ["border-color", "background-color", "color", "box-shadow", "transform", "opacity"];
    readonly avoidAnimating: readonly ["width", "height", "padding", "margin", "top", "left", "right", "bottom"];
};
export declare const touchOptimizations: {
    readonly minimumTouchTarget: "44px";
    readonly touchActive: {
        readonly removeHover: true;
        readonly enhancedFeedback: {
            readonly transform: "scale(0.96)";
            readonly duration: "100ms";
            readonly hapticFeedback: "light";
        };
    };
    readonly patterns: {
        readonly tap: "Single quick press for primary actions";
        readonly longPress: "500ms hold for secondary actions";
        readonly doubleTab: "Double tap within 300ms for special actions";
    };
};
export declare const accessibilityRequirements: {
    readonly focus: {
        readonly visible: "Focus must be clearly visible";
        readonly contrast: "Minimum 3:1 contrast ratio for focus indicators";
        readonly persistent: "Focus state must persist until next interaction";
    };
    readonly keyboard: {
        readonly tabOrder: "Logical tab sequence required";
        readonly enterKey: "Enter key activates buttons";
        readonly spaceKey: "Space key toggles checkboxes/switches";
        readonly escapeKey: "Escape closes modals and dropdowns";
    };
    readonly screenReader: {
        readonly stateAnnouncements: "State changes must be announced";
        readonly errorMessages: "Error descriptions must be associated with inputs";
        readonly loadingStates: "Loading states must indicate progress";
    };
    readonly colorCompliance: {
        readonly colorBlindness: "Information not conveyed by color alone";
        readonly highContrast: "Support for high contrast mode";
        readonly darkMode: "All states work in dark mode";
    };
};
export declare const componentVariations: {
    readonly buttonVariants: {
        readonly primary: {
            readonly default: {
                readonly border: "1px solid rgba(var(--hive-gold-rgb), 0.4)";
                readonly background: "transparent";
                readonly text: "var(--hive-gold)";
                readonly transform: "none";
                readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
                readonly use: "Resting state, no user interaction";
            };
            readonly hover: {
                readonly border: "1px solid rgba(var(--hive-gold-rgb), 0.8)";
                readonly background: "rgba(var(--hive-gold-rgb), 0.05)";
                readonly text: "var(--hive-gold)";
                readonly transform: "translateY(-1px) scale(1.01)";
                readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
                readonly use: "Desktop pointer hover, not on touch devices";
                readonly condition: "@media (hover: hover) and (pointer: fine)";
            };
            readonly active: {
                readonly border: "1px solid var(--hive-gold)";
                readonly background: "rgba(var(--hive-gold-rgb), 0.12)";
                readonly text: "var(--hive-gold)";
                readonly transform: "translateY(0px) scale(0.98)";
                readonly transition: "all 100ms cubic-bezier(0.25, 0.46, 0.45, 0.94)";
                readonly use: "Pressed/clicked state, immediate feedback";
            };
            readonly focus: {
                readonly border: "1px solid var(--hive-gold)";
                readonly background: "rgba(var(--hive-gold-rgb), 0.05)";
                readonly text: "var(--hive-gold)";
                readonly boxShadow: "0 0 0 3px rgba(var(--hive-gold-rgb), 0.3)";
                readonly transform: "none";
                readonly outline: "none";
                readonly use: "Keyboard focus, accessibility compliance";
            };
        };
        readonly secondary: {
            readonly default: {
                readonly border: "1px solid rgba(255, 255, 255, 0.2)";
                readonly text: "rgba(255, 255, 255, 0.8)";
                readonly background: "transparent";
                readonly transform: "none";
                readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
                readonly use: "Resting state, no user interaction";
            };
            readonly hover: {
                readonly border: "1px solid rgba(255, 255, 255, 0.4)";
                readonly background: "rgba(255, 255, 255, 0.05)";
                readonly text: "var(--hive-gold)";
                readonly transform: "translateY(-1px) scale(1.01)";
                readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
                readonly use: "Desktop pointer hover, not on touch devices";
                readonly condition: "@media (hover: hover) and (pointer: fine)";
            };
        };
        readonly ghost: {
            readonly default: {
                readonly border: "none";
                readonly background: "transparent";
                readonly text: "var(--hive-gold)";
                readonly transform: "none";
                readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
                readonly use: "Resting state, no user interaction";
            };
            readonly hover: {
                readonly border: "none";
                readonly background: "rgba(255, 255, 255, 0.05)";
                readonly text: "var(--hive-gold)";
                readonly transform: "translateY(-1px) scale(1.01)";
                readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
                readonly use: "Desktop pointer hover, not on touch devices";
                readonly condition: "@media (hover: hover) and (pointer: fine)";
            };
        };
    };
    readonly inputVariants: {
        readonly text: {
            readonly border: "1px solid rgba(255, 255, 255, 0.2)";
            readonly background: "rgba(255, 255, 255, 0.02)";
            readonly text: "rgba(255, 255, 255, 0.9)";
            readonly placeholder: "rgba(255, 255, 255, 0.5)";
            readonly outline: "none";
            readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
            readonly use: "Default input appearance";
        };
        readonly email: {
            readonly border: "1px solid rgba(255, 255, 255, 0.2)";
            readonly background: "rgba(255, 255, 255, 0.02)";
            readonly text: "rgba(255, 255, 255, 0.9)";
            readonly placeholder: "rgba(255, 255, 255, 0.5)";
            readonly outline: "none";
            readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
            readonly use: "Default input appearance";
        };
        readonly password: {
            readonly passwordToggle: {
                readonly position: "absolute";
                readonly right: "12px";
                readonly top: "50%";
                readonly transform: "translateY(-50%)";
            };
            readonly border: "1px solid rgba(255, 255, 255, 0.2)";
            readonly background: "rgba(255, 255, 255, 0.02)";
            readonly text: "rgba(255, 255, 255, 0.9)";
            readonly placeholder: "rgba(255, 255, 255, 0.5)";
            readonly outline: "none";
            readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
            readonly use: "Default input appearance";
        };
        readonly search: {
            readonly searchIcon: {
                readonly position: "absolute";
                readonly left: "12px";
                readonly top: "50%";
                readonly transform: "translateY(-50%)";
            };
            readonly border: "1px solid rgba(255, 255, 255, 0.2)";
            readonly background: "rgba(255, 255, 255, 0.02)";
            readonly text: "rgba(255, 255, 255, 0.9)";
            readonly placeholder: "rgba(255, 255, 255, 0.5)";
            readonly outline: "none";
            readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
            readonly use: "Default input appearance";
        };
    };
};
export declare const interactionStates: {
    readonly buttonStates: {
        readonly default: {
            readonly border: "1px solid rgba(var(--hive-gold-rgb), 0.4)";
            readonly background: "transparent";
            readonly text: "var(--hive-gold)";
            readonly transform: "none";
            readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
            readonly use: "Resting state, no user interaction";
        };
        readonly hover: {
            readonly border: "1px solid rgba(var(--hive-gold-rgb), 0.8)";
            readonly background: "rgba(var(--hive-gold-rgb), 0.05)";
            readonly text: "var(--hive-gold)";
            readonly transform: "translateY(-1px) scale(1.01)";
            readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
            readonly use: "Desktop pointer hover, not on touch devices";
            readonly condition: "@media (hover: hover) and (pointer: fine)";
        };
        readonly active: {
            readonly border: "1px solid var(--hive-gold)";
            readonly background: "rgba(var(--hive-gold-rgb), 0.12)";
            readonly text: "var(--hive-gold)";
            readonly transform: "translateY(0px) scale(0.98)";
            readonly transition: "all 100ms cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            readonly use: "Pressed/clicked state, immediate feedback";
        };
        readonly focus: {
            readonly border: "1px solid var(--hive-gold)";
            readonly background: "rgba(var(--hive-gold-rgb), 0.05)";
            readonly text: "var(--hive-gold)";
            readonly boxShadow: "0 0 0 3px rgba(var(--hive-gold-rgb), 0.3)";
            readonly transform: "none";
            readonly outline: "none";
            readonly use: "Keyboard focus, accessibility compliance";
        };
        readonly disabled: {
            readonly border: "1px solid rgba(255, 255, 255, 0.1)";
            readonly background: "transparent";
            readonly text: "rgba(255, 255, 255, 0.3)";
            readonly transform: "none";
            readonly pointerEvents: "none";
            readonly cursor: "not-allowed";
            readonly use: "Non-interactive state";
        };
        readonly loading: {
            readonly border: "1px solid rgba(var(--hive-gold-rgb), 0.4)";
            readonly background: "rgba(var(--hive-gold-rgb), 0.05)";
            readonly text: "transparent";
            readonly pointerEvents: "none";
            readonly cursor: "wait";
            readonly use: "Processing state with spinner overlay";
        };
    };
    readonly inputStates: {
        readonly default: {
            readonly border: "1px solid rgba(255, 255, 255, 0.2)";
            readonly background: "rgba(255, 255, 255, 0.02)";
            readonly text: "rgba(255, 255, 255, 0.9)";
            readonly placeholder: "rgba(255, 255, 255, 0.5)";
            readonly outline: "none";
            readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
            readonly use: "Default input appearance";
        };
        readonly focus: {
            readonly border: "1px solid var(--hive-gold)";
            readonly background: "rgba(255, 255, 255, 0.03)";
            readonly text: "rgba(255, 255, 255, 1.0)";
            readonly boxShadow: "0 0 0 3px rgba(var(--hive-gold-rgb), 0.2)";
            readonly outline: "none";
            readonly use: "Active input focus";
        };
        readonly hover: {
            readonly border: "1px solid rgba(255, 255, 255, 0.3)";
            readonly background: "rgba(255, 255, 255, 0.025)";
            readonly condition: "@media (hover: hover) and (pointer: fine)";
            readonly use: "Desktop hover before focus";
        };
        readonly filled: {
            readonly border: "1px solid rgba(255, 255, 255, 0.25)";
            readonly background: "rgba(255, 255, 255, 0.03)";
            readonly text: "rgba(255, 255, 255, 1.0)";
            readonly use: "Input with valid content";
        };
        readonly error: {
            readonly border: "1px solid #F87171";
            readonly background: "rgba(248, 113, 113, 0.03)";
            readonly text: "rgba(255, 255, 255, 1.0)";
            readonly boxShadow: "0 0 0 3px rgba(248, 113, 113, 0.2)";
            readonly use: "Validation error state";
        };
        readonly success: {
            readonly border: "1px solid #34D399";
            readonly background: "rgba(52, 211, 153, 0.03)";
            readonly text: "rgba(255, 255, 255, 1.0)";
            readonly boxShadow: "0 0 0 3px rgba(52, 211, 153, 0.2)";
            readonly use: "Validation success state";
        };
        readonly disabled: {
            readonly border: "1px solid rgba(255, 255, 255, 0.1)";
            readonly background: "rgba(255, 255, 255, 0.01)";
            readonly text: "rgba(255, 255, 255, 0.3)";
            readonly placeholder: "rgba(255, 255, 255, 0.2)";
            readonly pointerEvents: "none";
            readonly cursor: "not-allowed";
            readonly use: "Non-editable input";
        };
        readonly readonly: {
            readonly border: "1px solid rgba(255, 255, 255, 0.15)";
            readonly background: "rgba(255, 255, 255, 0.02)";
            readonly text: "rgba(255, 255, 255, 0.8)";
            readonly cursor: "default";
            readonly use: "Display-only input";
        };
    };
    readonly stateTransitions: {
        readonly durations: {
            readonly immediate: "100ms";
            readonly standard: "200ms";
            readonly validation: "300ms";
        };
        readonly easing: {
            readonly enter: "cubic-bezier(0.4, 0.0, 0.2, 1.0)";
            readonly exit: "cubic-bezier(0.4, 0.0, 1, 1)";
            readonly feedback: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            readonly natural: "cubic-bezier(0.4, 0.0, 0.6, 1.0)";
        };
        readonly animatableProperties: readonly ["border-color", "background-color", "color", "box-shadow", "transform", "opacity"];
        readonly avoidAnimating: readonly ["width", "height", "padding", "margin", "top", "left", "right", "bottom"];
    };
    readonly touchOptimizations: {
        readonly minimumTouchTarget: "44px";
        readonly touchActive: {
            readonly removeHover: true;
            readonly enhancedFeedback: {
                readonly transform: "scale(0.96)";
                readonly duration: "100ms";
                readonly hapticFeedback: "light";
            };
        };
        readonly patterns: {
            readonly tap: "Single quick press for primary actions";
            readonly longPress: "500ms hold for secondary actions";
            readonly doubleTab: "Double tap within 300ms for special actions";
        };
    };
    readonly accessibilityRequirements: {
        readonly focus: {
            readonly visible: "Focus must be clearly visible";
            readonly contrast: "Minimum 3:1 contrast ratio for focus indicators";
            readonly persistent: "Focus state must persist until next interaction";
        };
        readonly keyboard: {
            readonly tabOrder: "Logical tab sequence required";
            readonly enterKey: "Enter key activates buttons";
            readonly spaceKey: "Space key toggles checkboxes/switches";
            readonly escapeKey: "Escape closes modals and dropdowns";
        };
        readonly screenReader: {
            readonly stateAnnouncements: "State changes must be announced";
            readonly errorMessages: "Error descriptions must be associated with inputs";
            readonly loadingStates: "Loading states must indicate progress";
        };
        readonly colorCompliance: {
            readonly colorBlindness: "Information not conveyed by color alone";
            readonly highContrast: "Support for high contrast mode";
            readonly darkMode: "All states work in dark mode";
        };
    };
    readonly componentVariations: {
        readonly buttonVariants: {
            readonly primary: {
                readonly default: {
                    readonly border: "1px solid rgba(var(--hive-gold-rgb), 0.4)";
                    readonly background: "transparent";
                    readonly text: "var(--hive-gold)";
                    readonly transform: "none";
                    readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
                    readonly use: "Resting state, no user interaction";
                };
                readonly hover: {
                    readonly border: "1px solid rgba(var(--hive-gold-rgb), 0.8)";
                    readonly background: "rgba(var(--hive-gold-rgb), 0.05)";
                    readonly text: "var(--hive-gold)";
                    readonly transform: "translateY(-1px) scale(1.01)";
                    readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
                    readonly use: "Desktop pointer hover, not on touch devices";
                    readonly condition: "@media (hover: hover) and (pointer: fine)";
                };
                readonly active: {
                    readonly border: "1px solid var(--hive-gold)";
                    readonly background: "rgba(var(--hive-gold-rgb), 0.12)";
                    readonly text: "var(--hive-gold)";
                    readonly transform: "translateY(0px) scale(0.98)";
                    readonly transition: "all 100ms cubic-bezier(0.25, 0.46, 0.45, 0.94)";
                    readonly use: "Pressed/clicked state, immediate feedback";
                };
                readonly focus: {
                    readonly border: "1px solid var(--hive-gold)";
                    readonly background: "rgba(var(--hive-gold-rgb), 0.05)";
                    readonly text: "var(--hive-gold)";
                    readonly boxShadow: "0 0 0 3px rgba(var(--hive-gold-rgb), 0.3)";
                    readonly transform: "none";
                    readonly outline: "none";
                    readonly use: "Keyboard focus, accessibility compliance";
                };
            };
            readonly secondary: {
                readonly default: {
                    readonly border: "1px solid rgba(255, 255, 255, 0.2)";
                    readonly text: "rgba(255, 255, 255, 0.8)";
                    readonly background: "transparent";
                    readonly transform: "none";
                    readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
                    readonly use: "Resting state, no user interaction";
                };
                readonly hover: {
                    readonly border: "1px solid rgba(255, 255, 255, 0.4)";
                    readonly background: "rgba(255, 255, 255, 0.05)";
                    readonly text: "var(--hive-gold)";
                    readonly transform: "translateY(-1px) scale(1.01)";
                    readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
                    readonly use: "Desktop pointer hover, not on touch devices";
                    readonly condition: "@media (hover: hover) and (pointer: fine)";
                };
            };
            readonly ghost: {
                readonly default: {
                    readonly border: "none";
                    readonly background: "transparent";
                    readonly text: "var(--hive-gold)";
                    readonly transform: "none";
                    readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
                    readonly use: "Resting state, no user interaction";
                };
                readonly hover: {
                    readonly border: "none";
                    readonly background: "rgba(255, 255, 255, 0.05)";
                    readonly text: "var(--hive-gold)";
                    readonly transform: "translateY(-1px) scale(1.01)";
                    readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
                    readonly use: "Desktop pointer hover, not on touch devices";
                    readonly condition: "@media (hover: hover) and (pointer: fine)";
                };
            };
        };
        readonly inputVariants: {
            readonly text: {
                readonly border: "1px solid rgba(255, 255, 255, 0.2)";
                readonly background: "rgba(255, 255, 255, 0.02)";
                readonly text: "rgba(255, 255, 255, 0.9)";
                readonly placeholder: "rgba(255, 255, 255, 0.5)";
                readonly outline: "none";
                readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
                readonly use: "Default input appearance";
            };
            readonly email: {
                readonly border: "1px solid rgba(255, 255, 255, 0.2)";
                readonly background: "rgba(255, 255, 255, 0.02)";
                readonly text: "rgba(255, 255, 255, 0.9)";
                readonly placeholder: "rgba(255, 255, 255, 0.5)";
                readonly outline: "none";
                readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
                readonly use: "Default input appearance";
            };
            readonly password: {
                readonly passwordToggle: {
                    readonly position: "absolute";
                    readonly right: "12px";
                    readonly top: "50%";
                    readonly transform: "translateY(-50%)";
                };
                readonly border: "1px solid rgba(255, 255, 255, 0.2)";
                readonly background: "rgba(255, 255, 255, 0.02)";
                readonly text: "rgba(255, 255, 255, 0.9)";
                readonly placeholder: "rgba(255, 255, 255, 0.5)";
                readonly outline: "none";
                readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
                readonly use: "Default input appearance";
            };
            readonly search: {
                readonly searchIcon: {
                    readonly position: "absolute";
                    readonly left: "12px";
                    readonly top: "50%";
                    readonly transform: "translateY(-50%)";
                };
                readonly border: "1px solid rgba(255, 255, 255, 0.2)";
                readonly background: "rgba(255, 255, 255, 0.02)";
                readonly text: "rgba(255, 255, 255, 0.9)";
                readonly placeholder: "rgba(255, 255, 255, 0.5)";
                readonly outline: "none";
                readonly transition: "all 200ms cubic-bezier(0.4, 0.0, 0.6, 1.0)";
                readonly use: "Default input appearance";
            };
        };
    };
};
//# sourceMappingURL=interaction-states.d.ts.map