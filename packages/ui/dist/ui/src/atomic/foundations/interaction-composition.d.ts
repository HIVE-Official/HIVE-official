/**
 * HIVE Interaction State Composition System
 * Comprehensive interaction patterns for campus-optimized UX
 *
 * This system defines how every interactive element behaves
 * across different states and contexts.
 */
export declare const interactionPrinciples: {
    readonly philosophy: "Every interaction provides immediate, meaningful feedback";
    readonly priorities: readonly ["Mobile-first: Optimize for thumb interactions", "Campus context: Work while walking/distracted", "Accessibility: Keyboard and screen reader support", "Performance: 60fps interaction response"];
};
export declare const coreStates: {
    readonly idle: {
        readonly description: "Default resting state";
        readonly properties: {
            readonly cursor: "default";
            readonly opacity: "1";
            readonly transform: "none";
            readonly transition: "all var(--hive-duration-fast) var(--hive-ease-out)";
        };
    };
    readonly hover: {
        readonly description: "Mouse hover or touch proximity";
        readonly properties: {
            readonly cursor: "pointer";
            readonly transform: "translateY(-1px)";
            readonly boxShadow: "var(--hive-shadow-md)";
            readonly transition: "all var(--hive-duration-fast) var(--hive-ease-out)";
        };
        readonly mobileOverride: {
            readonly disabled: true;
            readonly fallbackToActive: true;
        };
    };
    readonly focus: {
        readonly description: "Keyboard focus or accessibility focus";
        readonly properties: {
            readonly outline: "2px solid var(--hive-gold-primary)";
            readonly outlineOffset: "2px";
            readonly zIndex: "10";
        };
        readonly accessibility: {
            readonly required: true;
            readonly wcagCompliance: "AA";
            readonly keyboardNavigation: "Tab, Enter, Space";
        };
    };
    readonly active: {
        readonly description: "Press/touch state during interaction";
        readonly properties: {
            readonly transform: "translateY(1px) scale(0.98)";
            readonly opacity: "0.9";
            readonly transition: "all var(--hive-duration-micro) var(--hive-ease-utility)";
        };
    };
    readonly disabled: {
        readonly description: "Non-interactive disabled state";
        readonly properties: {
            readonly opacity: "0.5";
            readonly cursor: "not-allowed";
            readonly pointerEvents: "none";
            readonly filter: "grayscale(0.5)";
        };
    };
    readonly loading: {
        readonly description: "Processing state during async operations";
        readonly properties: {
            readonly cursor: "wait";
            readonly opacity: "0.8";
            readonly pointerEvents: "none";
        };
        readonly animation: {
            readonly type: "pulse";
            readonly duration: "var(--hive-duration-slower)";
            readonly iteration: "infinite";
        };
    };
};
export declare const componentInteractions: {
    readonly button: {
        readonly primary: {
            readonly idle: {
                readonly backgroundColor: "transparent";
                readonly borderColor: "var(--hive-gold-primary)";
                readonly color: "var(--hive-gold-primary)";
            };
            readonly hover: {
                readonly backgroundColor: "var(--hive-gold-background)";
                readonly borderColor: "var(--hive-gold-hover)";
                readonly transform: "translateY(-1px)";
            };
            readonly active: {
                readonly backgroundColor: "var(--hive-bg-selected)";
                readonly transform: "translateY(0) scale(0.98)";
            };
            readonly focus: {
                readonly ringColor: "var(--hive-gold-border)";
                readonly ringWidth: "2px";
                readonly ringOffset: "2px";
            };
        };
        readonly secondary: {
            readonly idle: {
                readonly backgroundColor: "transparent";
                readonly borderColor: "var(--hive-border-glass)";
                readonly color: "var(--hive-text-primary)";
            };
            readonly hover: {
                readonly backgroundColor: "var(--hive-bg-subtle)";
                readonly borderColor: "var(--hive-border-glass-strong)";
            };
            readonly active: {
                readonly backgroundColor: "var(--hive-bg-active)";
            };
            readonly focus: {
                readonly ringColor: "var(--hive-border-glass-strong)";
                readonly ringWidth: "2px";
            };
        };
        readonly ghost: {
            readonly idle: {
                readonly backgroundColor: "transparent";
                readonly color: "var(--hive-text-secondary)";
            };
            readonly hover: {
                readonly backgroundColor: "var(--hive-bg-subtle)";
                readonly color: "var(--hive-text-primary)";
            };
            readonly active: {
                readonly backgroundColor: "var(--hive-bg-active)";
            };
            readonly focus: {
                readonly ringColor: "var(--hive-border-glass)";
                readonly ringWidth: "2px";
            };
        };
    };
    readonly card: {
        readonly static: {
            readonly idle: {
                readonly backgroundColor: "var(--hive-bg-secondary)";
                readonly borderColor: "var(--hive-border-subtle)";
                readonly boxShadow: "var(--hive-shadow-sm)";
            };
        };
        readonly interactive: {
            readonly idle: {
                readonly backgroundColor: "var(--hive-bg-secondary)";
                readonly borderColor: "var(--hive-border-subtle)";
                readonly boxShadow: "var(--hive-shadow-sm)";
                readonly cursor: "pointer";
            };
            readonly hover: {
                readonly backgroundColor: "var(--hive-bg-interactive)";
                readonly borderColor: "var(--hive-border-glass)";
                readonly boxShadow: "var(--hive-shadow-md)";
                readonly transform: "translateY(-2px)";
            };
            readonly active: {
                readonly transform: "translateY(1px)";
                readonly boxShadow: "var(--hive-shadow-sm)";
            };
            readonly focus: {
                readonly ringColor: "var(--hive-border-glass-strong)";
                readonly ringWidth: "2px";
                readonly ringOffset: "4px";
            };
        };
        readonly selected: {
            readonly idle: {
                readonly backgroundColor: "var(--hive-bg-tertiary)";
                readonly borderColor: "var(--hive-gold-border)";
                readonly boxShadow: "var(--hive-shadow-md)";
            };
            readonly hover: {
                readonly borderColor: "var(--hive-gold-primary)";
                readonly boxShadow: "var(--hive-shadow-lg)";
            };
        };
    };
    readonly input: {
        readonly text: {
            readonly idle: {
                readonly backgroundColor: "var(--hive-bg-secondary)";
                readonly borderColor: "var(--hive-border-glass)";
                readonly color: "var(--hive-text-primary)";
            };
            readonly focus: {
                readonly backgroundColor: "var(--hive-bg-tertiary)";
                readonly borderColor: "var(--hive-gold-border)";
                readonly ringColor: "var(--hive-gold-background)";
                readonly ringWidth: "3px";
            };
            readonly filled: {
                readonly backgroundColor: "var(--hive-bg-tertiary)";
                readonly borderColor: "var(--hive-border-glass-strong)";
            };
            readonly error: {
                readonly borderColor: "var(--hive-error-primary)";
                readonly ringColor: "var(--hive-error-background)";
                readonly color: "var(--hive-error-primary)";
            };
            readonly success: {
                readonly borderColor: "var(--hive-success-primary)";
                readonly ringColor: "var(--hive-success-background)";
            };
        };
        readonly select: {
            readonly idle: {
                readonly backgroundColor: "var(--hive-bg-secondary)";
                readonly borderColor: "var(--hive-border-glass)";
            };
            readonly open: {
                readonly backgroundColor: "var(--hive-bg-tertiary)";
                readonly borderColor: "var(--hive-gold-border)";
                readonly ringColor: "var(--hive-gold-background)";
            };
        };
    };
    readonly navigation: {
        readonly link: {
            readonly idle: {
                readonly color: "var(--hive-text-secondary)";
                readonly textDecoration: "none";
            };
            readonly hover: {
                readonly color: "var(--hive-text-primary)";
                readonly textDecoration: "underline";
                readonly textUnderlineOffset: "4px";
            };
            readonly active: {
                readonly color: "var(--hive-gold-primary)";
                readonly textDecoration: "underline";
            };
            readonly focus: {
                readonly outline: "2px solid var(--hive-gold-primary)";
                readonly outlineOffset: "2px";
            };
        };
        readonly tab: {
            readonly idle: {
                readonly color: "var(--hive-text-muted)";
                readonly borderBottom: "2px solid transparent";
            };
            readonly hover: {
                readonly color: "var(--hive-text-secondary)";
                readonly backgroundColor: "var(--hive-bg-subtle)";
            };
            readonly active: {
                readonly color: "var(--hive-gold-primary)";
                readonly borderBottomColor: "var(--hive-gold-primary)";
            };
            readonly selected: {
                readonly color: "var(--hive-text-primary)";
                readonly borderBottomColor: "var(--hive-gold-primary)";
                readonly backgroundColor: "var(--hive-bg-subtle)";
            };
        };
    };
};
export declare const touchInteractions: {
    readonly touchTarget: {
        readonly minimumSize: "44px";
        readonly recommendedSize: "48px";
        readonly spacing: "8px";
    };
    readonly gestures: {
        readonly tap: {
            readonly feedback: "immediate visual + haptic";
            readonly duration: "var(--hive-duration-micro)";
            readonly visualResponse: "scale(0.95) + opacity(0.8)";
        };
        readonly longPress: {
            readonly threshold: "500ms";
            readonly feedback: "progressive visual indication";
            readonly cancelDistance: "10px";
        };
        readonly swipe: {
            readonly threshold: "30px";
            readonly velocity: "0.5px/ms";
            readonly directions: readonly ["left", "right", "up", "down"];
        };
    };
    readonly adaptiveTouch: {
        readonly walkingMode: {
            readonly targetSizeIncrease: "20%";
            readonly reducedPrecisionTolerance: true;
            readonly simplifiedGestures: true;
        };
        readonly precisionMode: {
            readonly standardTargetSize: true;
            readonly fullGestureSupport: true;
        };
    };
};
export declare const campusInteractionContexts: {
    readonly classroom: {
        readonly description: "Quiet, focused environment";
        readonly adaptations: {
            readonly hapticFeedback: "reduced";
            readonly visualFeedback: "subtle";
            readonly soundFeedback: "disabled";
            readonly motionFeedback: "minimal";
        };
    };
    readonly walking: {
        readonly description: "Mobile usage while moving";
        readonly adaptations: {
            readonly touchTargets: "enlarged";
            readonly hoverStates: "disabled";
            readonly complexGestures: "simplified";
            readonly motionTolerance: "increased";
        };
    };
    readonly social: {
        readonly description: "Social spaces and interactions";
        readonly adaptations: {
            readonly hapticFeedback: "enhanced";
            readonly visualFeedback: "playful";
            readonly celebratory: "enabled";
            readonly socialCues: "prominent";
        };
    };
    readonly study: {
        readonly description: "Focus and concentration mode";
        readonly adaptations: {
            readonly distractions: "minimized";
            readonly notifications: "gentle";
            readonly transitions: "smooth";
            readonly colorIntensity: "reduced";
        };
    };
};
export declare const accessibilityInteractions: {
    readonly keyboard: {
        readonly navigation: {
            readonly tab: "Sequential focus order";
            readonly shiftTab: "Reverse sequential focus";
            readonly arrow: "Spatial navigation (grids, menus)";
            readonly enter: "Activate primary action";
            readonly space: "Activate secondary action";
            readonly escape: "Cancel or close";
        };
        readonly focusManagement: {
            readonly focusRing: {
                readonly style: "2px solid var(--hive-gold-primary)";
                readonly offset: "2px";
                readonly borderRadius: "match element";
            };
            readonly skipLinks: "To main content, navigation";
            readonly focusTrap: "In modals and dialogs";
            readonly focusReturn: "After modal close";
        };
    };
    readonly screenReader: {
        readonly states: {
            readonly expanded: "aria-expanded for collapsible content";
            readonly selected: "aria-selected for selectable items";
            readonly pressed: "aria-pressed for toggle buttons";
            readonly checked: "aria-checked for checkboxes";
        };
        readonly feedback: {
            readonly loading: "aria-busy and live regions";
            readonly errors: "aria-describedby error messages";
            readonly success: "Polite announcements";
            readonly changes: "Live region updates";
        };
    };
    readonly reducedMotion: {
        readonly respect: "prefers-reduced-motion: reduce";
        readonly alternatives: {
            readonly animations: "Instant state changes";
            readonly transitions: "Crossfade only";
            readonly parallax: "Static positioning";
        };
    };
};
export declare const performanceInteractions: {
    readonly optimization: {
        readonly debouncing: {
            readonly hover: "16ms";
            readonly input: "300ms";
            readonly scroll: "16ms";
            readonly resize: "100ms";
        };
        readonly throttling: {
            readonly mousemove: "16ms";
            readonly scroll: "16ms";
            readonly touchmove: "16ms";
        };
    };
    readonly budgets: {
        readonly interactionResponse: "100ms maximum";
        readonly stateChange: "16ms per frame";
        readonly complexAnimations: "3 concurrent maximum";
    };
};
export declare const interactionComposition: {
    readonly principles: {
        readonly philosophy: "Every interaction provides immediate, meaningful feedback";
        readonly priorities: readonly ["Mobile-first: Optimize for thumb interactions", "Campus context: Work while walking/distracted", "Accessibility: Keyboard and screen reader support", "Performance: 60fps interaction response"];
    };
    readonly coreStates: {
        readonly idle: {
            readonly description: "Default resting state";
            readonly properties: {
                readonly cursor: "default";
                readonly opacity: "1";
                readonly transform: "none";
                readonly transition: "all var(--hive-duration-fast) var(--hive-ease-out)";
            };
        };
        readonly hover: {
            readonly description: "Mouse hover or touch proximity";
            readonly properties: {
                readonly cursor: "pointer";
                readonly transform: "translateY(-1px)";
                readonly boxShadow: "var(--hive-shadow-md)";
                readonly transition: "all var(--hive-duration-fast) var(--hive-ease-out)";
            };
            readonly mobileOverride: {
                readonly disabled: true;
                readonly fallbackToActive: true;
            };
        };
        readonly focus: {
            readonly description: "Keyboard focus or accessibility focus";
            readonly properties: {
                readonly outline: "2px solid var(--hive-gold-primary)";
                readonly outlineOffset: "2px";
                readonly zIndex: "10";
            };
            readonly accessibility: {
                readonly required: true;
                readonly wcagCompliance: "AA";
                readonly keyboardNavigation: "Tab, Enter, Space";
            };
        };
        readonly active: {
            readonly description: "Press/touch state during interaction";
            readonly properties: {
                readonly transform: "translateY(1px) scale(0.98)";
                readonly opacity: "0.9";
                readonly transition: "all var(--hive-duration-micro) var(--hive-ease-utility)";
            };
        };
        readonly disabled: {
            readonly description: "Non-interactive disabled state";
            readonly properties: {
                readonly opacity: "0.5";
                readonly cursor: "not-allowed";
                readonly pointerEvents: "none";
                readonly filter: "grayscale(0.5)";
            };
        };
        readonly loading: {
            readonly description: "Processing state during async operations";
            readonly properties: {
                readonly cursor: "wait";
                readonly opacity: "0.8";
                readonly pointerEvents: "none";
            };
            readonly animation: {
                readonly type: "pulse";
                readonly duration: "var(--hive-duration-slower)";
                readonly iteration: "infinite";
            };
        };
    };
    readonly components: {
        readonly button: {
            readonly primary: {
                readonly idle: {
                    readonly backgroundColor: "transparent";
                    readonly borderColor: "var(--hive-gold-primary)";
                    readonly color: "var(--hive-gold-primary)";
                };
                readonly hover: {
                    readonly backgroundColor: "var(--hive-gold-background)";
                    readonly borderColor: "var(--hive-gold-hover)";
                    readonly transform: "translateY(-1px)";
                };
                readonly active: {
                    readonly backgroundColor: "var(--hive-bg-selected)";
                    readonly transform: "translateY(0) scale(0.98)";
                };
                readonly focus: {
                    readonly ringColor: "var(--hive-gold-border)";
                    readonly ringWidth: "2px";
                    readonly ringOffset: "2px";
                };
            };
            readonly secondary: {
                readonly idle: {
                    readonly backgroundColor: "transparent";
                    readonly borderColor: "var(--hive-border-glass)";
                    readonly color: "var(--hive-text-primary)";
                };
                readonly hover: {
                    readonly backgroundColor: "var(--hive-bg-subtle)";
                    readonly borderColor: "var(--hive-border-glass-strong)";
                };
                readonly active: {
                    readonly backgroundColor: "var(--hive-bg-active)";
                };
                readonly focus: {
                    readonly ringColor: "var(--hive-border-glass-strong)";
                    readonly ringWidth: "2px";
                };
            };
            readonly ghost: {
                readonly idle: {
                    readonly backgroundColor: "transparent";
                    readonly color: "var(--hive-text-secondary)";
                };
                readonly hover: {
                    readonly backgroundColor: "var(--hive-bg-subtle)";
                    readonly color: "var(--hive-text-primary)";
                };
                readonly active: {
                    readonly backgroundColor: "var(--hive-bg-active)";
                };
                readonly focus: {
                    readonly ringColor: "var(--hive-border-glass)";
                    readonly ringWidth: "2px";
                };
            };
        };
        readonly card: {
            readonly static: {
                readonly idle: {
                    readonly backgroundColor: "var(--hive-bg-secondary)";
                    readonly borderColor: "var(--hive-border-subtle)";
                    readonly boxShadow: "var(--hive-shadow-sm)";
                };
            };
            readonly interactive: {
                readonly idle: {
                    readonly backgroundColor: "var(--hive-bg-secondary)";
                    readonly borderColor: "var(--hive-border-subtle)";
                    readonly boxShadow: "var(--hive-shadow-sm)";
                    readonly cursor: "pointer";
                };
                readonly hover: {
                    readonly backgroundColor: "var(--hive-bg-interactive)";
                    readonly borderColor: "var(--hive-border-glass)";
                    readonly boxShadow: "var(--hive-shadow-md)";
                    readonly transform: "translateY(-2px)";
                };
                readonly active: {
                    readonly transform: "translateY(1px)";
                    readonly boxShadow: "var(--hive-shadow-sm)";
                };
                readonly focus: {
                    readonly ringColor: "var(--hive-border-glass-strong)";
                    readonly ringWidth: "2px";
                    readonly ringOffset: "4px";
                };
            };
            readonly selected: {
                readonly idle: {
                    readonly backgroundColor: "var(--hive-bg-tertiary)";
                    readonly borderColor: "var(--hive-gold-border)";
                    readonly boxShadow: "var(--hive-shadow-md)";
                };
                readonly hover: {
                    readonly borderColor: "var(--hive-gold-primary)";
                    readonly boxShadow: "var(--hive-shadow-lg)";
                };
            };
        };
        readonly input: {
            readonly text: {
                readonly idle: {
                    readonly backgroundColor: "var(--hive-bg-secondary)";
                    readonly borderColor: "var(--hive-border-glass)";
                    readonly color: "var(--hive-text-primary)";
                };
                readonly focus: {
                    readonly backgroundColor: "var(--hive-bg-tertiary)";
                    readonly borderColor: "var(--hive-gold-border)";
                    readonly ringColor: "var(--hive-gold-background)";
                    readonly ringWidth: "3px";
                };
                readonly filled: {
                    readonly backgroundColor: "var(--hive-bg-tertiary)";
                    readonly borderColor: "var(--hive-border-glass-strong)";
                };
                readonly error: {
                    readonly borderColor: "var(--hive-error-primary)";
                    readonly ringColor: "var(--hive-error-background)";
                    readonly color: "var(--hive-error-primary)";
                };
                readonly success: {
                    readonly borderColor: "var(--hive-success-primary)";
                    readonly ringColor: "var(--hive-success-background)";
                };
            };
            readonly select: {
                readonly idle: {
                    readonly backgroundColor: "var(--hive-bg-secondary)";
                    readonly borderColor: "var(--hive-border-glass)";
                };
                readonly open: {
                    readonly backgroundColor: "var(--hive-bg-tertiary)";
                    readonly borderColor: "var(--hive-gold-border)";
                    readonly ringColor: "var(--hive-gold-background)";
                };
            };
        };
        readonly navigation: {
            readonly link: {
                readonly idle: {
                    readonly color: "var(--hive-text-secondary)";
                    readonly textDecoration: "none";
                };
                readonly hover: {
                    readonly color: "var(--hive-text-primary)";
                    readonly textDecoration: "underline";
                    readonly textUnderlineOffset: "4px";
                };
                readonly active: {
                    readonly color: "var(--hive-gold-primary)";
                    readonly textDecoration: "underline";
                };
                readonly focus: {
                    readonly outline: "2px solid var(--hive-gold-primary)";
                    readonly outlineOffset: "2px";
                };
            };
            readonly tab: {
                readonly idle: {
                    readonly color: "var(--hive-text-muted)";
                    readonly borderBottom: "2px solid transparent";
                };
                readonly hover: {
                    readonly color: "var(--hive-text-secondary)";
                    readonly backgroundColor: "var(--hive-bg-subtle)";
                };
                readonly active: {
                    readonly color: "var(--hive-gold-primary)";
                    readonly borderBottomColor: "var(--hive-gold-primary)";
                };
                readonly selected: {
                    readonly color: "var(--hive-text-primary)";
                    readonly borderBottomColor: "var(--hive-gold-primary)";
                    readonly backgroundColor: "var(--hive-bg-subtle)";
                };
            };
        };
    };
    readonly touch: {
        readonly touchTarget: {
            readonly minimumSize: "44px";
            readonly recommendedSize: "48px";
            readonly spacing: "8px";
        };
        readonly gestures: {
            readonly tap: {
                readonly feedback: "immediate visual + haptic";
                readonly duration: "var(--hive-duration-micro)";
                readonly visualResponse: "scale(0.95) + opacity(0.8)";
            };
            readonly longPress: {
                readonly threshold: "500ms";
                readonly feedback: "progressive visual indication";
                readonly cancelDistance: "10px";
            };
            readonly swipe: {
                readonly threshold: "30px";
                readonly velocity: "0.5px/ms";
                readonly directions: readonly ["left", "right", "up", "down"];
            };
        };
        readonly adaptiveTouch: {
            readonly walkingMode: {
                readonly targetSizeIncrease: "20%";
                readonly reducedPrecisionTolerance: true;
                readonly simplifiedGestures: true;
            };
            readonly precisionMode: {
                readonly standardTargetSize: true;
                readonly fullGestureSupport: true;
            };
        };
    };
    readonly campus: {
        readonly classroom: {
            readonly description: "Quiet, focused environment";
            readonly adaptations: {
                readonly hapticFeedback: "reduced";
                readonly visualFeedback: "subtle";
                readonly soundFeedback: "disabled";
                readonly motionFeedback: "minimal";
            };
        };
        readonly walking: {
            readonly description: "Mobile usage while moving";
            readonly adaptations: {
                readonly touchTargets: "enlarged";
                readonly hoverStates: "disabled";
                readonly complexGestures: "simplified";
                readonly motionTolerance: "increased";
            };
        };
        readonly social: {
            readonly description: "Social spaces and interactions";
            readonly adaptations: {
                readonly hapticFeedback: "enhanced";
                readonly visualFeedback: "playful";
                readonly celebratory: "enabled";
                readonly socialCues: "prominent";
            };
        };
        readonly study: {
            readonly description: "Focus and concentration mode";
            readonly adaptations: {
                readonly distractions: "minimized";
                readonly notifications: "gentle";
                readonly transitions: "smooth";
                readonly colorIntensity: "reduced";
            };
        };
    };
    readonly accessibility: {
        readonly keyboard: {
            readonly navigation: {
                readonly tab: "Sequential focus order";
                readonly shiftTab: "Reverse sequential focus";
                readonly arrow: "Spatial navigation (grids, menus)";
                readonly enter: "Activate primary action";
                readonly space: "Activate secondary action";
                readonly escape: "Cancel or close";
            };
            readonly focusManagement: {
                readonly focusRing: {
                    readonly style: "2px solid var(--hive-gold-primary)";
                    readonly offset: "2px";
                    readonly borderRadius: "match element";
                };
                readonly skipLinks: "To main content, navigation";
                readonly focusTrap: "In modals and dialogs";
                readonly focusReturn: "After modal close";
            };
        };
        readonly screenReader: {
            readonly states: {
                readonly expanded: "aria-expanded for collapsible content";
                readonly selected: "aria-selected for selectable items";
                readonly pressed: "aria-pressed for toggle buttons";
                readonly checked: "aria-checked for checkboxes";
            };
            readonly feedback: {
                readonly loading: "aria-busy and live regions";
                readonly errors: "aria-describedby error messages";
                readonly success: "Polite announcements";
                readonly changes: "Live region updates";
            };
        };
        readonly reducedMotion: {
            readonly respect: "prefers-reduced-motion: reduce";
            readonly alternatives: {
                readonly animations: "Instant state changes";
                readonly transitions: "Crossfade only";
                readonly parallax: "Static positioning";
            };
        };
    };
    readonly performance: {
        readonly optimization: {
            readonly debouncing: {
                readonly hover: "16ms";
                readonly input: "300ms";
                readonly scroll: "16ms";
                readonly resize: "100ms";
            };
            readonly throttling: {
                readonly mousemove: "16ms";
                readonly scroll: "16ms";
                readonly touchmove: "16ms";
            };
        };
        readonly budgets: {
            readonly interactionResponse: "100ms maximum";
            readonly stateChange: "16ms per frame";
            readonly complexAnimations: "3 concurrent maximum";
        };
    };
};
export type InteractionComposition = typeof interactionComposition;
export type ComponentInteractions = typeof componentInteractions;
export type TouchInteractions = typeof touchInteractions;
export type CampusInteractionContexts = typeof campusInteractionContexts;
//# sourceMappingURL=interaction-composition.d.ts.map