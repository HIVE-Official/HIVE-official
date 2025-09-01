/**
 * HIVE Atomic Component Composition Rules
 * Systematic combinations of atomic design tokens
 * 
 * These rules define how atomic tokens combine to create
 * consistent, predictable component patterns.
 */

// === BUTTON COMPOSITION === 
export const buttonComposition = {
  // Size combinations
  sizes: {
    sm: {
      height: 'var(--hive-height-button-sm)',      // 32px
      padding: 'var(--hive-space-2) var(--hive-space-3)', // 8px 12px
      fontSize: 'var(--hive-font-size-small)',     // 14px
      iconSize: 'var(--hive-icon-small)',          // 16px
      gap: 'var(--hive-space-2)'                   // 8px
    },
    base: {
      height: 'var(--hive-height-button-base)',    // 40px
      padding: 'var(--hive-space-3) var(--hive-space-4)', // 12px 16px
      fontSize: 'var(--hive-font-size-base)',      // 16px
      iconSize: 'var(--hive-icon-base)',           // 20px
      gap: 'var(--hive-space-2)'                   // 8px
    },
    lg: {
      height: 'var(--hive-height-button-lg)',      // 48px
      padding: 'var(--hive-space-4) var(--hive-space-5)', // 16px 20px
      fontSize: 'var(--hive-font-size-large)',     // 18px
      iconSize: 'var(--hive-icon-large)',          // 24px
      gap: 'var(--hive-space-2)'                   // 8px
    }
  },

  // Variant combinations
  variants: {
    primary: {
      backgroundColor: 'transparent',
      borderColor: 'var(--hive-gold-primary)',
      borderWidth: '1px',
      color: 'var(--hive-gold-primary)',
      hoverBackgroundColor: 'var(--hive-gold-background)',
      hoverBorderColor: 'var(--hive-gold-hover)',
      activeBackgroundColor: 'var(--hive-bg-selected)',
      focusRingColor: 'var(--hive-gold-border)'
    },
    secondary: {
      backgroundColor: 'transparent',
      borderColor: 'var(--hive-border-glass)',
      borderWidth: '1px',
      color: 'var(--hive-text-primary)',
      hoverBackgroundColor: 'var(--hive-bg-subtle)',
      hoverBorderColor: 'var(--hive-border-glass-strong)',
      activeBackgroundColor: 'var(--hive-bg-active)',
      focusRingColor: 'var(--hive-border-glass-strong)'
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderWidth: '1px',
      color: 'var(--hive-text-secondary)',
      hoverBackgroundColor: 'var(--hive-bg-subtle)',
      hoverColor: 'var(--hive-text-primary)',
      activeBackgroundColor: 'var(--hive-bg-active)',
      focusRingColor: 'var(--hive-border-glass)'
    }
  }
} as const;

// === CARD COMPOSITION ===
export const cardComposition = {
  // Card size patterns
  sizes: {
    compact: {
      padding: 'var(--hive-space-4)',              // 16px all sides
      borderRadius: 'var(--hive-radius-base)',     // 8px
      gap: 'var(--hive-space-3)',                  // 12px between elements
      headerGap: 'var(--hive-space-2)'             // 8px header spacing
    },
    comfortable: {
      padding: 'var(--hive-space-5)',              // 20px all sides
      borderRadius: 'var(--hive-radius-lg)',       // 12px
      gap: 'var(--hive-space-4)',                  // 16px between elements
      headerGap: 'var(--hive-space-3)'             // 12px header spacing
    },
    spacious: {
      padding: 'var(--hive-space-6)',              // 24px all sides
      borderRadius: 'var(--hive-radius-lg)',       // 12px
      gap: 'var(--hive-space-5)',                  // 20px between elements
      headerGap: 'var(--hive-space-4)'             // 16px header spacing
    }
  },

  // Visual variants
  variants: {
    default: {
      backgroundColor: 'var(--hive-bg-secondary)',
      borderColor: 'var(--hive-border-subtle)',
      borderWidth: '1px',
      shadow: 'var(--hive-shadow-sm)'
    },
    elevated: {
      backgroundColor: 'var(--hive-bg-tertiary)',
      borderColor: 'var(--hive-border-glass)',
      borderWidth: '1px',
      shadow: 'var(--hive-shadow-md)'
    },
    interactive: {
      backgroundColor: 'var(--hive-bg-secondary)',
      borderColor: 'var(--hive-border-subtle)',
      borderWidth: '1px',
      shadow: 'var(--hive-shadow-sm)',
      hoverBackgroundColor: 'var(--hive-bg-interactive)',
      hoverBorderColor: 'var(--hive-border-glass)',
      hoverShadow: 'var(--hive-shadow-md)',
      transition: 'all var(--hive-duration-fast) var(--hive-ease-out)'
    }
  }
} as const;

// === STAT CARD SPECIFIC COMPOSITION ===
export const statCardComposition = {
  // Perfect for Profile stats display
  layout: {
    padding: cardComposition.sizes.comfortable.padding,
    gap: 'var(--hive-space-3)',                    // 12px between icon and content
    borderRadius: cardComposition.sizes.comfortable.borderRadius,
    backgroundColor: cardComposition.variants.default.backgroundColor,
    borderColor: cardComposition.variants.default.borderColor
  },

  icon: {
    size: 'var(--hive-icon-xl)',                   // 32px for stat icons
    padding: 'var(--hive-space-3)',               // 12px icon container padding
    borderRadius: 'var(--hive-radius-lg)',        // 12px icon container radius
    marginBottom: 'var(--hive-space-2)'           // 8px below icon
  },

  content: {
    valueSize: 'var(--hive-font-size-h2)',        // 26px for stat numbers
    valueWeight: 'var(--hive-font-weight-bold)',  // Bold weight
    valueLineHeight: 'var(--hive-line-height-h2)', // 40px line height
    valueColor: 'var(--hive-text-primary)',       // High contrast
    
    labelSize: 'var(--hive-font-size-small)',     // 14px for labels
    labelWeight: 'var(--hive-font-weight-medium)', // Medium weight
    labelColor: 'var(--hive-text-muted)',         // Lower contrast
    labelMarginTop: 'var(--hive-space-1)'         // 4px above label
  },

  // Semantic color variations for different stat types
  semanticVariants: {
    spaces: {
      iconBackgroundColor: 'var(--hive-info-background)',
      iconColor: 'var(--hive-info-primary)',
      borderColor: 'var(--hive-info-border)'
    },
    tools: {
      iconBackgroundColor: 'var(--hive-success-background)',
      iconColor: 'var(--hive-success-primary)',
      borderColor: 'var(--hive-success-border)'
    },
    activity: {
      iconBackgroundColor: 'var(--hive-warning-background)',
      iconColor: 'var(--hive-warning-primary)',
      borderColor: 'var(--hive-warning-border)'
    },
    reputation: {
      iconBackgroundColor: 'var(--hive-gold-background)',
      iconColor: 'var(--hive-gold-primary)',
      borderColor: 'var(--hive-gold-border)'
    }
  }
} as const;

// === TYPOGRAPHY COMPOSITION ===
export const typographyComposition = {
  // Heading combinations
  headings: {
    h1: {
      fontSize: 'var(--hive-font-size-h1)',
      lineHeight: 'var(--hive-line-height-h1)',
      fontWeight: 'var(--hive-font-weight-semibold)',
      fontFamily: 'var(--hive-font-family-primary)',
      color: 'var(--hive-text-primary)',
      marginBottom: 'var(--hive-space-4)'           // 16px below
    },
    h2: {
      fontSize: 'var(--hive-font-size-h2)',
      lineHeight: 'var(--hive-line-height-h2)',
      fontWeight: 'var(--hive-font-weight-semibold)',
      fontFamily: 'var(--hive-font-family-primary)',
      color: 'var(--hive-text-primary)',
      marginBottom: 'var(--hive-space-3)'           // 12px below
    },
    h3: {
      fontSize: 'var(--hive-font-size-h3)',
      lineHeight: 'var(--hive-line-height-h3)',
      fontWeight: 'var(--hive-font-weight-semibold)',
      fontFamily: 'var(--hive-font-family-primary)',
      color: 'var(--hive-text-primary)',
      marginBottom: 'var(--hive-space-3)'           // 12px below
    },
    h4: {
      fontSize: 'var(--hive-font-size-h4)',
      lineHeight: 'var(--hive-line-height-h4)',
      fontWeight: 'var(--hive-font-weight-medium)',
      fontFamily: 'var(--hive-font-family-primary)',
      color: 'var(--hive-text-primary)',
      marginBottom: 'var(--hive-space-2)'           // 8px below
    }
  },

  // Body text combinations
  body: {
    large: {
      fontSize: 'var(--hive-font-size-large)',
      lineHeight: 'var(--hive-line-height-large)',
      fontWeight: 'var(--hive-font-weight-regular)',
      fontFamily: 'var(--hive-font-family-secondary)',
      color: 'var(--hive-text-primary)',
      marginBottom: 'var(--hive-space-4)'           // 16px below
    },
    base: {
      fontSize: 'var(--hive-font-size-base)',
      lineHeight: 'var(--hive-line-height-base)',
      fontWeight: 'var(--hive-font-weight-regular)',
      fontFamily: 'var(--hive-font-family-secondary)',
      color: 'var(--hive-text-primary)',
      marginBottom: 'var(--hive-space-3)'           // 12px below
    },
    small: {
      fontSize: 'var(--hive-font-size-small)',
      lineHeight: 'var(--hive-line-height-small)',
      fontWeight: 'var(--hive-font-weight-regular)',
      fontFamily: 'var(--hive-font-family-secondary)',
      color: 'var(--hive-text-secondary)',
      marginBottom: 'var(--hive-space-2)'           // 8px below
    },
    caption: {
      fontSize: 'var(--hive-font-size-caption)',
      lineHeight: 'var(--hive-line-height-caption)',
      fontWeight: 'var(--hive-font-weight-regular)',
      fontFamily: 'var(--hive-font-family-secondary)',
      color: 'var(--hive-text-muted)',
      marginBottom: 'var(--hive-space-1)'           // 4px below
    }
  }
} as const;

// === SPACING COMPOSITION ===
export const spacingComposition = {
  // Section spacing patterns
  sections: {
    tight: {
      marginBottom: 'var(--hive-space-4)',         // 16px between sections
      internalGap: 'var(--hive-space-2)'          // 8px internal spacing
    },
    comfortable: {
      marginBottom: 'var(--hive-space-6)',         // 24px between sections  
      internalGap: 'var(--hive-space-3)'          // 12px internal spacing
    },
    spacious: {
      marginBottom: 'var(--hive-space-8)',         // 32px between sections
      internalGap: 'var(--hive-space-4)'          // 16px internal spacing
    }
  },

  // Component grouping patterns
  groups: {
    related: 'var(--hive-space-2)',               // 8px for related elements
    loosely: 'var(--hive-space-4)',               // 16px for loosely related
    distinct: 'var(--hive-space-6)',              // 24px for distinct groups
    separated: 'var(--hive-space-8)'              // 32px for separated sections
  }
} as const;

// === ICON COMPOSITION ===
export const iconComposition = {
  // Icon size patterns with corresponding containers
  sizes: {
    micro: {
      iconSize: 'var(--hive-icon-micro)',          // 12px
      containerSize: 'calc(var(--hive-icon-micro) + var(--hive-space-1))', // 16px
      containerPadding: 'var(--hive-space-0-5)'   // 2px
    },
    small: {
      iconSize: 'var(--hive-icon-small)',          // 16px
      containerSize: 'calc(var(--hive-icon-small) + var(--hive-space-2))', // 24px
      containerPadding: 'var(--hive-space-1)'     // 4px
    },
    base: {
      iconSize: 'var(--hive-icon-base)',           // 20px
      containerSize: 'calc(var(--hive-icon-base) + var(--hive-space-3))', // 32px
      containerPadding: 'var(--hive-space-1-5)'   // 6px
    },
    large: {
      iconSize: 'var(--hive-icon-large)',          // 24px
      containerSize: 'calc(var(--hive-icon-large) + var(--hive-space-4))', // 40px
      containerPadding: 'var(--hive-space-2)'     // 8px
    },
    xl: {
      iconSize: 'var(--hive-icon-xl)',             // 32px
      containerSize: 'calc(var(--hive-icon-xl) + var(--hive-space-6))', // 56px
      containerPadding: 'var(--hive-space-3)'     // 12px
    }
  }
} as const;

// === LAYOUT COMPOSITION ===
export const layoutComposition = {
  // Container patterns
  containers: {
    page: {
      maxWidth: '1280px',                          // Max content width
      paddingX: 'var(--hive-space-4)',           // 16px horizontal padding
      paddingY: 'var(--hive-space-6)',           // 24px vertical padding
      marginX: 'auto',                            // Center horizontally
      mobilePaddingX: 'var(--hive-space-4)',     // 16px on mobile
      mobilePaddingY: 'var(--hive-space-4)'      // 16px on mobile
    },
    section: {
      marginBottom: spacingComposition.sections.comfortable.marginBottom,
      gap: spacingComposition.sections.comfortable.internalGap
    },
    card: {
      padding: cardComposition.sizes.comfortable.padding,
      borderRadius: cardComposition.sizes.comfortable.borderRadius,
      gap: cardComposition.sizes.comfortable.gap
    }
  },

  // Grid patterns for systematic layouts
  grids: {
    stats: {
      columns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: 'var(--hive-space-4)',                // 16px between stat cards
      marginBottom: 'var(--hive-space-6)'       // 24px below stats
    },
    actions: {
      columns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 'var(--hive-space-3)',                // 12px between actions
      marginBottom: 'var(--hive-space-5)'       // 20px below actions
    },
    content: {
      columns: '1fr',                             // Stack on mobile
      desktopColumns: '2fr 1fr',                 // 2:1 ratio on desktop
      gap: 'var(--hive-space-6)',                // 24px between columns
      marginBottom: 'var(--hive-space-8)'       // 32px below content
    }
  }
} as const;

// === EXPORT ALL COMPOSITIONS ===
export const componentComposition = {
  button: buttonComposition,
  card: cardComposition,
  statCard: statCardComposition,
  typography: typographyComposition,
  spacing: spacingComposition,
  icon: iconComposition,
  layout: layoutComposition
} as const;

export type ComponentComposition = typeof componentComposition;
export type ButtonComposition = typeof buttonComposition;
export type CardComposition = typeof cardComposition;
export type StatCardComposition = typeof statCardComposition;