/**
 * HIVE Atomic Component Composition Rules
 * Systematic combinations of atomic design tokens
 *
 * These rules define how atomic tokens combine to create
 * consistent, predictable component patterns.
 */
export declare const buttonComposition: {
    readonly sizes: {
        readonly sm: {
            readonly height: "var(--hive-height-button-sm)";
            readonly padding: "var(--hive-space-2) var(--hive-space-3)";
            readonly fontSize: "var(--hive-font-size-small)";
            readonly iconSize: "var(--hive-icon-small)";
            readonly gap: "var(--hive-space-2)";
        };
        readonly base: {
            readonly height: "var(--hive-height-button-base)";
            readonly padding: "var(--hive-space-3) var(--hive-space-4)";
            readonly fontSize: "var(--hive-font-size-base)";
            readonly iconSize: "var(--hive-icon-base)";
            readonly gap: "var(--hive-space-2)";
        };
        readonly lg: {
            readonly height: "var(--hive-height-button-lg)";
            readonly padding: "var(--hive-space-4) var(--hive-space-5)";
            readonly fontSize: "var(--hive-font-size-large)";
            readonly iconSize: "var(--hive-icon-large)";
            readonly gap: "var(--hive-space-2)";
        };
    };
    readonly variants: {
        readonly primary: {
            readonly backgroundColor: "transparent";
            readonly borderColor: "var(--hive-gold-primary)";
            readonly borderWidth: "1px";
            readonly color: "var(--hive-gold-primary)";
            readonly hoverBackgroundColor: "var(--hive-gold-background)";
            readonly hoverBorderColor: "var(--hive-gold-hover)";
            readonly activeBackgroundColor: "var(--hive-bg-selected)";
            readonly focusRingColor: "var(--hive-gold-border)";
        };
        readonly secondary: {
            readonly backgroundColor: "transparent";
            readonly borderColor: "var(--hive-border-glass)";
            readonly borderWidth: "1px";
            readonly color: "var(--hive-text-primary)";
            readonly hoverBackgroundColor: "var(--hive-bg-subtle)";
            readonly hoverBorderColor: "var(--hive-border-glass-strong)";
            readonly activeBackgroundColor: "var(--hive-bg-active)";
            readonly focusRingColor: "var(--hive-border-glass-strong)";
        };
        readonly ghost: {
            readonly backgroundColor: "transparent";
            readonly borderColor: "transparent";
            readonly borderWidth: "1px";
            readonly color: "var(--hive-text-secondary)";
            readonly hoverBackgroundColor: "var(--hive-bg-subtle)";
            readonly hoverColor: "var(--hive-text-primary)";
            readonly activeBackgroundColor: "var(--hive-bg-active)";
            readonly focusRingColor: "var(--hive-border-glass)";
        };
    };
};
export declare const cardComposition: {
    readonly sizes: {
        readonly compact: {
            readonly padding: "var(--hive-space-4)";
            readonly borderRadius: "var(--hive-radius-base)";
            readonly gap: "var(--hive-space-3)";
            readonly headerGap: "var(--hive-space-2)";
        };
        readonly comfortable: {
            readonly padding: "var(--hive-space-5)";
            readonly borderRadius: "var(--hive-radius-lg)";
            readonly gap: "var(--hive-space-4)";
            readonly headerGap: "var(--hive-space-3)";
        };
        readonly spacious: {
            readonly padding: "var(--hive-space-6)";
            readonly borderRadius: "var(--hive-radius-lg)";
            readonly gap: "var(--hive-space-5)";
            readonly headerGap: "var(--hive-space-4)";
        };
    };
    readonly variants: {
        readonly default: {
            readonly backgroundColor: "var(--hive-bg-secondary)";
            readonly borderColor: "var(--hive-border-subtle)";
            readonly borderWidth: "1px";
            readonly shadow: "var(--hive-shadow-sm)";
        };
        readonly elevated: {
            readonly backgroundColor: "var(--hive-bg-tertiary)";
            readonly borderColor: "var(--hive-border-glass)";
            readonly borderWidth: "1px";
            readonly shadow: "var(--hive-shadow-md)";
        };
        readonly interactive: {
            readonly backgroundColor: "var(--hive-bg-secondary)";
            readonly borderColor: "var(--hive-border-subtle)";
            readonly borderWidth: "1px";
            readonly shadow: "var(--hive-shadow-sm)";
            readonly hoverBackgroundColor: "var(--hive-bg-interactive)";
            readonly hoverBorderColor: "var(--hive-border-glass)";
            readonly hoverShadow: "var(--hive-shadow-md)";
            readonly transition: "all var(--hive-duration-fast) var(--hive-ease-out)";
        };
    };
};
export declare const statCardComposition: {
    readonly layout: {
        readonly padding: "var(--hive-space-5)";
        readonly gap: "var(--hive-space-3)";
        readonly borderRadius: "var(--hive-radius-lg)";
        readonly backgroundColor: "var(--hive-bg-secondary)";
        readonly borderColor: "var(--hive-border-subtle)";
    };
    readonly icon: {
        readonly size: "var(--hive-icon-xl)";
        readonly padding: "var(--hive-space-3)";
        readonly borderRadius: "var(--hive-radius-lg)";
        readonly marginBottom: "var(--hive-space-2)";
    };
    readonly content: {
        readonly valueSize: "var(--hive-font-size-h2)";
        readonly valueWeight: "var(--hive-font-weight-bold)";
        readonly valueLineHeight: "var(--hive-line-height-h2)";
        readonly valueColor: "var(--hive-text-primary)";
        readonly labelSize: "var(--hive-font-size-small)";
        readonly labelWeight: "var(--hive-font-weight-medium)";
        readonly labelColor: "var(--hive-text-muted)";
        readonly labelMarginTop: "var(--hive-space-1)";
    };
    readonly semanticVariants: {
        readonly spaces: {
            readonly iconBackgroundColor: "var(--hive-info-background)";
            readonly iconColor: "var(--hive-info-primary)";
            readonly borderColor: "var(--hive-info-border)";
        };
        readonly tools: {
            readonly iconBackgroundColor: "var(--hive-success-background)";
            readonly iconColor: "var(--hive-success-primary)";
            readonly borderColor: "var(--hive-success-border)";
        };
        readonly activity: {
            readonly iconBackgroundColor: "var(--hive-warning-background)";
            readonly iconColor: "var(--hive-warning-primary)";
            readonly borderColor: "var(--hive-warning-border)";
        };
        readonly reputation: {
            readonly iconBackgroundColor: "var(--hive-gold-background)";
            readonly iconColor: "var(--hive-gold-primary)";
            readonly borderColor: "var(--hive-gold-border)";
        };
    };
};
export declare const typographyComposition: {
    readonly headings: {
        readonly h1: {
            readonly fontSize: "var(--hive-font-size-h1)";
            readonly lineHeight: "var(--hive-line-height-h1)";
            readonly fontWeight: "var(--hive-font-weight-semibold)";
            readonly fontFamily: "var(--hive-font-family-primary)";
            readonly color: "var(--hive-text-primary)";
            readonly marginBottom: "var(--hive-space-4)";
        };
        readonly h2: {
            readonly fontSize: "var(--hive-font-size-h2)";
            readonly lineHeight: "var(--hive-line-height-h2)";
            readonly fontWeight: "var(--hive-font-weight-semibold)";
            readonly fontFamily: "var(--hive-font-family-primary)";
            readonly color: "var(--hive-text-primary)";
            readonly marginBottom: "var(--hive-space-3)";
        };
        readonly h3: {
            readonly fontSize: "var(--hive-font-size-h3)";
            readonly lineHeight: "var(--hive-line-height-h3)";
            readonly fontWeight: "var(--hive-font-weight-semibold)";
            readonly fontFamily: "var(--hive-font-family-primary)";
            readonly color: "var(--hive-text-primary)";
            readonly marginBottom: "var(--hive-space-3)";
        };
        readonly h4: {
            readonly fontSize: "var(--hive-font-size-h4)";
            readonly lineHeight: "var(--hive-line-height-h4)";
            readonly fontWeight: "var(--hive-font-weight-medium)";
            readonly fontFamily: "var(--hive-font-family-primary)";
            readonly color: "var(--hive-text-primary)";
            readonly marginBottom: "var(--hive-space-2)";
        };
    };
    readonly body: {
        readonly large: {
            readonly fontSize: "var(--hive-font-size-large)";
            readonly lineHeight: "var(--hive-line-height-large)";
            readonly fontWeight: "var(--hive-font-weight-regular)";
            readonly fontFamily: "var(--hive-font-family-secondary)";
            readonly color: "var(--hive-text-primary)";
            readonly marginBottom: "var(--hive-space-4)";
        };
        readonly base: {
            readonly fontSize: "var(--hive-font-size-base)";
            readonly lineHeight: "var(--hive-line-height-base)";
            readonly fontWeight: "var(--hive-font-weight-regular)";
            readonly fontFamily: "var(--hive-font-family-secondary)";
            readonly color: "var(--hive-text-primary)";
            readonly marginBottom: "var(--hive-space-3)";
        };
        readonly small: {
            readonly fontSize: "var(--hive-font-size-small)";
            readonly lineHeight: "var(--hive-line-height-small)";
            readonly fontWeight: "var(--hive-font-weight-regular)";
            readonly fontFamily: "var(--hive-font-family-secondary)";
            readonly color: "var(--hive-text-secondary)";
            readonly marginBottom: "var(--hive-space-2)";
        };
        readonly caption: {
            readonly fontSize: "var(--hive-font-size-caption)";
            readonly lineHeight: "var(--hive-line-height-caption)";
            readonly fontWeight: "var(--hive-font-weight-regular)";
            readonly fontFamily: "var(--hive-font-family-secondary)";
            readonly color: "var(--hive-text-muted)";
            readonly marginBottom: "var(--hive-space-1)";
        };
    };
};
export declare const spacingComposition: {
    readonly sections: {
        readonly tight: {
            readonly marginBottom: "var(--hive-space-4)";
            readonly internalGap: "var(--hive-space-2)";
        };
        readonly comfortable: {
            readonly marginBottom: "var(--hive-space-6)";
            readonly internalGap: "var(--hive-space-3)";
        };
        readonly spacious: {
            readonly marginBottom: "var(--hive-space-8)";
            readonly internalGap: "var(--hive-space-4)";
        };
    };
    readonly groups: {
        readonly related: "var(--hive-space-2)";
        readonly loosely: "var(--hive-space-4)";
        readonly distinct: "var(--hive-space-6)";
        readonly separated: "var(--hive-space-8)";
    };
};
export declare const iconComposition: {
    readonly sizes: {
        readonly micro: {
            readonly iconSize: "var(--hive-icon-micro)";
            readonly containerSize: "calc(var(--hive-icon-micro) + var(--hive-space-1))";
            readonly containerPadding: "var(--hive-space-0-5)";
        };
        readonly small: {
            readonly iconSize: "var(--hive-icon-small)";
            readonly containerSize: "calc(var(--hive-icon-small) + var(--hive-space-2))";
            readonly containerPadding: "var(--hive-space-1)";
        };
        readonly base: {
            readonly iconSize: "var(--hive-icon-base)";
            readonly containerSize: "calc(var(--hive-icon-base) + var(--hive-space-3))";
            readonly containerPadding: "var(--hive-space-1-5)";
        };
        readonly large: {
            readonly iconSize: "var(--hive-icon-large)";
            readonly containerSize: "calc(var(--hive-icon-large) + var(--hive-space-4))";
            readonly containerPadding: "var(--hive-space-2)";
        };
        readonly xl: {
            readonly iconSize: "var(--hive-icon-xl)";
            readonly containerSize: "calc(var(--hive-icon-xl) + var(--hive-space-6))";
            readonly containerPadding: "var(--hive-space-3)";
        };
    };
};
export declare const layoutComposition: {
    readonly containers: {
        readonly page: {
            readonly maxWidth: "1280px";
            readonly paddingX: "var(--hive-space-4)";
            readonly paddingY: "var(--hive-space-6)";
            readonly marginX: "auto";
            readonly mobilePaddingX: "var(--hive-space-4)";
            readonly mobilePaddingY: "var(--hive-space-4)";
        };
        readonly section: {
            readonly marginBottom: "var(--hive-space-6)";
            readonly gap: "var(--hive-space-3)";
        };
        readonly card: {
            readonly padding: "var(--hive-space-5)";
            readonly borderRadius: "var(--hive-radius-lg)";
            readonly gap: "var(--hive-space-4)";
        };
    };
    readonly grids: {
        readonly stats: {
            readonly columns: "repeat(auto-fit, minmax(240px, 1fr))";
            readonly gap: "var(--hive-space-4)";
            readonly marginBottom: "var(--hive-space-6)";
        };
        readonly actions: {
            readonly columns: "repeat(auto-fit, minmax(200px, 1fr))";
            readonly gap: "var(--hive-space-3)";
            readonly marginBottom: "var(--hive-space-5)";
        };
        readonly content: {
            readonly columns: "1fr";
            readonly desktopColumns: "2fr 1fr";
            readonly gap: "var(--hive-space-6)";
            readonly marginBottom: "var(--hive-space-8)";
        };
    };
};
export declare const componentComposition: {
    readonly button: {
        readonly sizes: {
            readonly sm: {
                readonly height: "var(--hive-height-button-sm)";
                readonly padding: "var(--hive-space-2) var(--hive-space-3)";
                readonly fontSize: "var(--hive-font-size-small)";
                readonly iconSize: "var(--hive-icon-small)";
                readonly gap: "var(--hive-space-2)";
            };
            readonly base: {
                readonly height: "var(--hive-height-button-base)";
                readonly padding: "var(--hive-space-3) var(--hive-space-4)";
                readonly fontSize: "var(--hive-font-size-base)";
                readonly iconSize: "var(--hive-icon-base)";
                readonly gap: "var(--hive-space-2)";
            };
            readonly lg: {
                readonly height: "var(--hive-height-button-lg)";
                readonly padding: "var(--hive-space-4) var(--hive-space-5)";
                readonly fontSize: "var(--hive-font-size-large)";
                readonly iconSize: "var(--hive-icon-large)";
                readonly gap: "var(--hive-space-2)";
            };
        };
        readonly variants: {
            readonly primary: {
                readonly backgroundColor: "transparent";
                readonly borderColor: "var(--hive-gold-primary)";
                readonly borderWidth: "1px";
                readonly color: "var(--hive-gold-primary)";
                readonly hoverBackgroundColor: "var(--hive-gold-background)";
                readonly hoverBorderColor: "var(--hive-gold-hover)";
                readonly activeBackgroundColor: "var(--hive-bg-selected)";
                readonly focusRingColor: "var(--hive-gold-border)";
            };
            readonly secondary: {
                readonly backgroundColor: "transparent";
                readonly borderColor: "var(--hive-border-glass)";
                readonly borderWidth: "1px";
                readonly color: "var(--hive-text-primary)";
                readonly hoverBackgroundColor: "var(--hive-bg-subtle)";
                readonly hoverBorderColor: "var(--hive-border-glass-strong)";
                readonly activeBackgroundColor: "var(--hive-bg-active)";
                readonly focusRingColor: "var(--hive-border-glass-strong)";
            };
            readonly ghost: {
                readonly backgroundColor: "transparent";
                readonly borderColor: "transparent";
                readonly borderWidth: "1px";
                readonly color: "var(--hive-text-secondary)";
                readonly hoverBackgroundColor: "var(--hive-bg-subtle)";
                readonly hoverColor: "var(--hive-text-primary)";
                readonly activeBackgroundColor: "var(--hive-bg-active)";
                readonly focusRingColor: "var(--hive-border-glass)";
            };
        };
    };
    readonly card: {
        readonly sizes: {
            readonly compact: {
                readonly padding: "var(--hive-space-4)";
                readonly borderRadius: "var(--hive-radius-base)";
                readonly gap: "var(--hive-space-3)";
                readonly headerGap: "var(--hive-space-2)";
            };
            readonly comfortable: {
                readonly padding: "var(--hive-space-5)";
                readonly borderRadius: "var(--hive-radius-lg)";
                readonly gap: "var(--hive-space-4)";
                readonly headerGap: "var(--hive-space-3)";
            };
            readonly spacious: {
                readonly padding: "var(--hive-space-6)";
                readonly borderRadius: "var(--hive-radius-lg)";
                readonly gap: "var(--hive-space-5)";
                readonly headerGap: "var(--hive-space-4)";
            };
        };
        readonly variants: {
            readonly default: {
                readonly backgroundColor: "var(--hive-bg-secondary)";
                readonly borderColor: "var(--hive-border-subtle)";
                readonly borderWidth: "1px";
                readonly shadow: "var(--hive-shadow-sm)";
            };
            readonly elevated: {
                readonly backgroundColor: "var(--hive-bg-tertiary)";
                readonly borderColor: "var(--hive-border-glass)";
                readonly borderWidth: "1px";
                readonly shadow: "var(--hive-shadow-md)";
            };
            readonly interactive: {
                readonly backgroundColor: "var(--hive-bg-secondary)";
                readonly borderColor: "var(--hive-border-subtle)";
                readonly borderWidth: "1px";
                readonly shadow: "var(--hive-shadow-sm)";
                readonly hoverBackgroundColor: "var(--hive-bg-interactive)";
                readonly hoverBorderColor: "var(--hive-border-glass)";
                readonly hoverShadow: "var(--hive-shadow-md)";
                readonly transition: "all var(--hive-duration-fast) var(--hive-ease-out)";
            };
        };
    };
    readonly statCard: {
        readonly layout: {
            readonly padding: "var(--hive-space-5)";
            readonly gap: "var(--hive-space-3)";
            readonly borderRadius: "var(--hive-radius-lg)";
            readonly backgroundColor: "var(--hive-bg-secondary)";
            readonly borderColor: "var(--hive-border-subtle)";
        };
        readonly icon: {
            readonly size: "var(--hive-icon-xl)";
            readonly padding: "var(--hive-space-3)";
            readonly borderRadius: "var(--hive-radius-lg)";
            readonly marginBottom: "var(--hive-space-2)";
        };
        readonly content: {
            readonly valueSize: "var(--hive-font-size-h2)";
            readonly valueWeight: "var(--hive-font-weight-bold)";
            readonly valueLineHeight: "var(--hive-line-height-h2)";
            readonly valueColor: "var(--hive-text-primary)";
            readonly labelSize: "var(--hive-font-size-small)";
            readonly labelWeight: "var(--hive-font-weight-medium)";
            readonly labelColor: "var(--hive-text-muted)";
            readonly labelMarginTop: "var(--hive-space-1)";
        };
        readonly semanticVariants: {
            readonly spaces: {
                readonly iconBackgroundColor: "var(--hive-info-background)";
                readonly iconColor: "var(--hive-info-primary)";
                readonly borderColor: "var(--hive-info-border)";
            };
            readonly tools: {
                readonly iconBackgroundColor: "var(--hive-success-background)";
                readonly iconColor: "var(--hive-success-primary)";
                readonly borderColor: "var(--hive-success-border)";
            };
            readonly activity: {
                readonly iconBackgroundColor: "var(--hive-warning-background)";
                readonly iconColor: "var(--hive-warning-primary)";
                readonly borderColor: "var(--hive-warning-border)";
            };
            readonly reputation: {
                readonly iconBackgroundColor: "var(--hive-gold-background)";
                readonly iconColor: "var(--hive-gold-primary)";
                readonly borderColor: "var(--hive-gold-border)";
            };
        };
    };
    readonly typography: {
        readonly headings: {
            readonly h1: {
                readonly fontSize: "var(--hive-font-size-h1)";
                readonly lineHeight: "var(--hive-line-height-h1)";
                readonly fontWeight: "var(--hive-font-weight-semibold)";
                readonly fontFamily: "var(--hive-font-family-primary)";
                readonly color: "var(--hive-text-primary)";
                readonly marginBottom: "var(--hive-space-4)";
            };
            readonly h2: {
                readonly fontSize: "var(--hive-font-size-h2)";
                readonly lineHeight: "var(--hive-line-height-h2)";
                readonly fontWeight: "var(--hive-font-weight-semibold)";
                readonly fontFamily: "var(--hive-font-family-primary)";
                readonly color: "var(--hive-text-primary)";
                readonly marginBottom: "var(--hive-space-3)";
            };
            readonly h3: {
                readonly fontSize: "var(--hive-font-size-h3)";
                readonly lineHeight: "var(--hive-line-height-h3)";
                readonly fontWeight: "var(--hive-font-weight-semibold)";
                readonly fontFamily: "var(--hive-font-family-primary)";
                readonly color: "var(--hive-text-primary)";
                readonly marginBottom: "var(--hive-space-3)";
            };
            readonly h4: {
                readonly fontSize: "var(--hive-font-size-h4)";
                readonly lineHeight: "var(--hive-line-height-h4)";
                readonly fontWeight: "var(--hive-font-weight-medium)";
                readonly fontFamily: "var(--hive-font-family-primary)";
                readonly color: "var(--hive-text-primary)";
                readonly marginBottom: "var(--hive-space-2)";
            };
        };
        readonly body: {
            readonly large: {
                readonly fontSize: "var(--hive-font-size-large)";
                readonly lineHeight: "var(--hive-line-height-large)";
                readonly fontWeight: "var(--hive-font-weight-regular)";
                readonly fontFamily: "var(--hive-font-family-secondary)";
                readonly color: "var(--hive-text-primary)";
                readonly marginBottom: "var(--hive-space-4)";
            };
            readonly base: {
                readonly fontSize: "var(--hive-font-size-base)";
                readonly lineHeight: "var(--hive-line-height-base)";
                readonly fontWeight: "var(--hive-font-weight-regular)";
                readonly fontFamily: "var(--hive-font-family-secondary)";
                readonly color: "var(--hive-text-primary)";
                readonly marginBottom: "var(--hive-space-3)";
            };
            readonly small: {
                readonly fontSize: "var(--hive-font-size-small)";
                readonly lineHeight: "var(--hive-line-height-small)";
                readonly fontWeight: "var(--hive-font-weight-regular)";
                readonly fontFamily: "var(--hive-font-family-secondary)";
                readonly color: "var(--hive-text-secondary)";
                readonly marginBottom: "var(--hive-space-2)";
            };
            readonly caption: {
                readonly fontSize: "var(--hive-font-size-caption)";
                readonly lineHeight: "var(--hive-line-height-caption)";
                readonly fontWeight: "var(--hive-font-weight-regular)";
                readonly fontFamily: "var(--hive-font-family-secondary)";
                readonly color: "var(--hive-text-muted)";
                readonly marginBottom: "var(--hive-space-1)";
            };
        };
    };
    readonly spacing: {
        readonly sections: {
            readonly tight: {
                readonly marginBottom: "var(--hive-space-4)";
                readonly internalGap: "var(--hive-space-2)";
            };
            readonly comfortable: {
                readonly marginBottom: "var(--hive-space-6)";
                readonly internalGap: "var(--hive-space-3)";
            };
            readonly spacious: {
                readonly marginBottom: "var(--hive-space-8)";
                readonly internalGap: "var(--hive-space-4)";
            };
        };
        readonly groups: {
            readonly related: "var(--hive-space-2)";
            readonly loosely: "var(--hive-space-4)";
            readonly distinct: "var(--hive-space-6)";
            readonly separated: "var(--hive-space-8)";
        };
    };
    readonly icon: {
        readonly sizes: {
            readonly micro: {
                readonly iconSize: "var(--hive-icon-micro)";
                readonly containerSize: "calc(var(--hive-icon-micro) + var(--hive-space-1))";
                readonly containerPadding: "var(--hive-space-0-5)";
            };
            readonly small: {
                readonly iconSize: "var(--hive-icon-small)";
                readonly containerSize: "calc(var(--hive-icon-small) + var(--hive-space-2))";
                readonly containerPadding: "var(--hive-space-1)";
            };
            readonly base: {
                readonly iconSize: "var(--hive-icon-base)";
                readonly containerSize: "calc(var(--hive-icon-base) + var(--hive-space-3))";
                readonly containerPadding: "var(--hive-space-1-5)";
            };
            readonly large: {
                readonly iconSize: "var(--hive-icon-large)";
                readonly containerSize: "calc(var(--hive-icon-large) + var(--hive-space-4))";
                readonly containerPadding: "var(--hive-space-2)";
            };
            readonly xl: {
                readonly iconSize: "var(--hive-icon-xl)";
                readonly containerSize: "calc(var(--hive-icon-xl) + var(--hive-space-6))";
                readonly containerPadding: "var(--hive-space-3)";
            };
        };
    };
    readonly layout: {
        readonly containers: {
            readonly page: {
                readonly maxWidth: "1280px";
                readonly paddingX: "var(--hive-space-4)";
                readonly paddingY: "var(--hive-space-6)";
                readonly marginX: "auto";
                readonly mobilePaddingX: "var(--hive-space-4)";
                readonly mobilePaddingY: "var(--hive-space-4)";
            };
            readonly section: {
                readonly marginBottom: "var(--hive-space-6)";
                readonly gap: "var(--hive-space-3)";
            };
            readonly card: {
                readonly padding: "var(--hive-space-5)";
                readonly borderRadius: "var(--hive-radius-lg)";
                readonly gap: "var(--hive-space-4)";
            };
        };
        readonly grids: {
            readonly stats: {
                readonly columns: "repeat(auto-fit, minmax(240px, 1fr))";
                readonly gap: "var(--hive-space-4)";
                readonly marginBottom: "var(--hive-space-6)";
            };
            readonly actions: {
                readonly columns: "repeat(auto-fit, minmax(200px, 1fr))";
                readonly gap: "var(--hive-space-3)";
                readonly marginBottom: "var(--hive-space-5)";
            };
            readonly content: {
                readonly columns: "1fr";
                readonly desktopColumns: "2fr 1fr";
                readonly gap: "var(--hive-space-6)";
                readonly marginBottom: "var(--hive-space-8)";
            };
        };
    };
};
export type ComponentComposition = typeof componentComposition;
export type ButtonComposition = typeof buttonComposition;
export type CardComposition = typeof cardComposition;
export type StatCardComposition = typeof statCardComposition;
//# sourceMappingURL=component-composition.d.ts.map