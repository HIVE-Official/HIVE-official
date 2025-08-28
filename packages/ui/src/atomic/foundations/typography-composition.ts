/**
 * HIVE Typography Composition System - PRODUCTION READY
 * Systematic text hierarchy for campus social platform
 * 
 * Builds on existing typography atoms with composition rules
 * Campus-optimized for social utility and mobile readability
 * 
 * Status: ✅ PRODUCTION READY
 * Version: v1.0.0
 * Date: August 26, 2025
 */

// === TYPOGRAPHY PHILOSOPHY ===
export const typographyPrinciples = {
  philosophy: "Typography serves campus community building and social utility",
  rules: [
    "Mobile-first: Readable on phones while walking between classes",
    "Hierarchy-driven: Clear information prioritization for social content", 
    "Campus-optimized: Support user mentions, space names, tool descriptions",
    "Accessibility: WCAG AA compliance for inclusive campus experience"
  ]
} as const;

// === FONT SCALE SYSTEM ===
export const fontScale = {
  // Campus-optimized scale using CSS variables
  micro: {
    size: 'var(--hive-font-size-micro)',        // 10px
    lineHeight: 'var(--hive-line-height-micro)', // 16px
    use: 'Timestamps, micro labels, badge text',
    mobile: 'Minimum readable size on campus WiFi loading'
  },
  
  caption: {
    size: 'var(--hive-font-size-caption)',      // 12px
    lineHeight: 'var(--hive-line-height-caption)', // 20px
    use: 'Post metadata, user handles, space member counts',
    mobile: 'Social proof indicators, secondary information'
  },
  
  small: {
    size: 'var(--hive-font-size-small)',        // 14px
    lineHeight: 'var(--hive-line-height-small)', // 20px
    use: 'Comment text, navigation labels, button text',
    mobile: 'Primary interaction text, easily tappable'
  },
  
  base: {
    size: 'var(--hive-font-size-base)',         // 16px
    lineHeight: 'var(--hive-line-height-base)', // 24px
    use: 'Post content, main body text, form inputs',
    mobile: 'Optimal reading size for post content on mobile'
  },
  
  large: {
    size: 'var(--hive-font-size-large)',        // 18px
    lineHeight: 'var(--hive-line-height-large)', // 28px
    use: 'Featured content, tool descriptions, important messages',
    mobile: 'Emphasized content that stands out in feed'
  },
  
  h4: {
    size: 'var(--hive-font-size-h4)',           // 20px
    lineHeight: 'var(--hive-line-height-h4)',   // 32px
    use: 'Card titles, tool names, space names',
    mobile: 'Clear hierarchy without overwhelming mobile screens'
  },
  
  h3: {
    size: 'var(--hive-font-size-h3)',           // 22px
    lineHeight: 'var(--hive-line-height-h3)',   // 32px
    use: 'Section headers, featured space names, major announcements',
    mobile: 'Strong hierarchy for important campus announcements'
  },
  
  h2: {
    size: 'var(--hive-font-size-h2)',           // 26px
    lineHeight: 'var(--hive-line-height-h2)',   // 40px
    use: 'Page titles, profile names, major space headers',
    mobile: 'Primary page identification, user identity'
  },
  
  h1: {
    size: 'var(--hive-font-size-h1)',           // 32px
    lineHeight: 'var(--hive-line-height-h1)',   // 48px
    use: 'Hero headings, onboarding titles, major feature announcements',
    mobile: 'Maximum impact without breaking mobile layout'
  },
  
  display: {
    size: 'var(--hive-font-size-display)',      // 40px
    lineHeight: 'var(--hive-line-height-display)', // 48px
    use: 'Landing page headers, major milestone celebrations',
    mobile: 'Special occasions, celebration screens only'
  }
} as const;

// === WEIGHT SYSTEM ===
export const fontWeight = {
  regular: {
    value: 'var(--hive-font-weight-regular)',   // 400
    use: 'Body text, captions, secondary information',
    css: 'font-weight: 400'
  },
  
  medium: {
    value: 'var(--hive-font-weight-medium)',    // 500
    use: 'User names, space names, emphasized text',
    css: 'font-weight: 500'
  },
  
  semibold: {
    value: 'var(--hive-font-weight-semibold)',  // 600
    use: 'Headings, tool names, call-to-action text',
    css: 'font-weight: 600'
  },
  
  bold: {
    value: 'var(--hive-font-weight-bold)',      // 700
    use: 'Major headings, urgent notifications, primary buttons',
    css: 'font-weight: 700'
  }
} as const;

// === FONT FAMILY SYSTEM ===
export const fontFamily = {
  display: {
    value: 'var(--hive-font-family-display)',   // Space Grotesk for headlines, hero, CTA
    use: 'Headlines, hero text, call-to-action buttons, brand moments',
    fallback: 'system-ui, sans-serif'
  },
  
  primary: {
    value: 'var(--hive-font-family-primary)',   // Geist Sans for interface
    use: 'Body text, interface elements, social content, readable text',
    fallback: '-apple-system, BlinkMacSystemFont, sans-serif'
  },
  
  secondary: {
    value: 'var(--hive-font-family-secondary)', // Also Geist Sans
    use: 'Secondary text, metadata, captions, timestamps',
    fallback: 'system-ui, sans-serif'
  },
  
  mono: {
    value: 'var(--hive-font-family-mono)',      // Geist Mono
    use: 'Code snippets, tool configurations, technical content',
    fallback: 'SF Mono, Monaco, Cascadia Code, monospace'
  }
} as const;

// === CAMPUS SOCIAL TYPOGRAPHY PATTERNS ===
export const campusTypographyPatterns = {
  // Social Content Hierarchy
  socialPost: {
    userDisplayName: {
      fontSize: fontScale.base.size,
      fontWeight: fontWeight.semibold.value,
      color: 'var(--hive-text-primary)',
      use: 'Primary identification in posts and comments'
    },
    
    userHandle: {
      fontSize: fontScale.small.size,
      fontWeight: fontWeight.regular.value,
      color: 'var(--hive-text-secondary)',
      use: '@username for mentions and identification'
    },
    
    postContent: {
      fontSize: fontScale.base.size,
      fontWeight: fontWeight.regular.value,
      color: 'var(--hive-text-primary)',
      lineHeight: fontScale.base.lineHeight,
      use: 'Main post content with optimal mobile readability'
    },
    
    postTimestamp: {
      fontSize: fontScale.caption.size,
      fontWeight: fontWeight.regular.value,
      color: 'var(--hive-text-muted)',
      use: 'Relative timestamps (2h ago, yesterday)'
    },
    
    engagementCounts: {
      fontSize: fontScale.small.size,
      fontWeight: fontWeight.medium.value,
      color: 'var(--hive-text-secondary)',
      use: 'Like counts, comment counts, share counts'
    }
  },

  // Space & Community Patterns
  spaceIdentity: {
    spaceName: {
      fontSize: fontScale.h4.size,
      fontWeight: fontWeight.semibold.value,
      color: 'var(--hive-text-primary)',
      use: 'Primary space identification'
    },
    
    spaceDescription: {
      fontSize: fontScale.small.size,
      fontWeight: fontWeight.regular.value,
      color: 'var(--hive-text-secondary)',
      lineHeight: fontScale.small.lineHeight,
      use: 'Space purpose and community guidelines'
    },
    
    memberCount: {
      fontSize: fontScale.caption.size,
      fontWeight: fontWeight.medium.value,
      color: 'var(--hive-text-muted)',
      use: 'Social proof indicators (1,234 members)'
    },
    
    spaceCategory: {
      fontSize: fontScale.caption.size,
      fontWeight: fontWeight.medium.value,
      color: 'var(--hive-gold-primary)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      use: 'Space categorization (ACADEMIC, SOCIAL, TOOLS)'
    }
  },

  // Tool & Builder Patterns  
  toolIdentity: {
    toolName: {
      fontSize: fontScale.large.size,
      fontWeight: fontWeight.semibold.value,
      color: 'var(--hive-text-primary)',
      use: 'Primary tool identification'
    },
    
    toolDescription: {
      fontSize: fontScale.base.size,
      fontWeight: fontWeight.regular.value,
      color: 'var(--hive-text-secondary)',
      lineHeight: fontScale.base.lineHeight,
      use: 'Tool functionality and use case description'
    },
    
    builderName: {
      fontSize: fontScale.small.size,
      fontWeight: fontWeight.medium.value,
      color: 'var(--hive-text-secondary)',
      use: 'Tool creator attribution'
    },
    
    usageCount: {
      fontSize: fontScale.caption.size,
      fontWeight: fontWeight.regular.value,
      color: 'var(--hive-text-muted)',
      use: 'Tool adoption metrics (Used by 45 students)'
    }
  },

  // Profile & Identity Patterns
  profileIdentity: {
    displayName: {
      fontSize: fontScale.h2.size,
      fontWeight: fontWeight.bold.value,
      color: 'var(--hive-text-primary)',
      use: 'Primary user identification on profile pages'
    },
    
    profileHandle: {
      fontSize: fontScale.large.size,
      fontWeight: fontWeight.regular.value,
      color: 'var(--hive-text-secondary)',
      use: '@username on profile pages'
    },
    
    profileBio: {
      fontSize: fontScale.base.size,
      fontWeight: fontWeight.regular.value,
      color: 'var(--hive-text-primary)',
      lineHeight: fontScale.base.lineHeight,
      use: 'User bio and description'
    },
    
    profileMeta: {
      fontSize: fontScale.small.size,
      fontWeight: fontWeight.regular.value,
      color: 'var(--hive-text-muted)',
      use: 'Join date, location, academic info'
    }
  }
} as const;

// === READABILITY OPTIMIZATION ===
export const readabilityRules = {
  // Mobile-first line lengths
  lineLength: {
    optimal: '45-75 characters per line',
    mobile: '35-55 characters per line', 
    implementation: 'max-width: 65ch for body text'
  },
  
  // Campus-optimized contrast
  contrast: {
    primary: '7:1 ratio - High contrast for primary content',
    secondary: '4.5:1 ratio - Medium contrast for secondary info',
    muted: '3:1 ratio - Minimum contrast for supporting text'
  },
  
  // Walking-friendly spacing
  verticalRhythm: {
    posts: 'var(--hive-space-4) between post elements',
    comments: 'var(--hive-space-3) between comment elements', 
    metadata: 'var(--hive-space-2) for timestamps and counts'
  },
  
  // Touch-friendly sizing
  interactiveText: {
    minimumSize: fontScale.small.size,
    recommendedSize: fontScale.base.size,
    touchTarget: '44px minimum height for tappable text'
  }
} as const;

// === SEMANTIC TEXT COMPOSITIONS ===
export const semanticCompositions = {
  // User Mention Pattern
  userMention: {
    structure: '@username',
    styling: {
      fontSize: 'inherit', // Matches surrounding text
      fontWeight: fontWeight.medium.value,
      color: 'var(--hive-gold-primary)',
      textDecoration: 'none',
      cursor: 'pointer'
    },
    hover: {
      color: 'var(--hive-gold-hover)',
      textDecoration: 'underline'
    },
    use: 'Interactive user mentions in posts and comments'
  },

  // Space Reference Pattern  
  spaceReference: {
    structure: '#spacename',
    styling: {
      fontSize: 'inherit',
      fontWeight: fontWeight.medium.value,
      color: 'var(--hive-info-primary)',
      textDecoration: 'none',
      cursor: 'pointer'
    },
    hover: {
      color: 'var(--hive-info-hover)',
      textDecoration: 'underline'
    },
    use: 'References to spaces in posts and discussions'
  },

  // Status Indicator Pattern
  statusIndicator: {
    online: {
      fontSize: fontScale.caption.size,
      fontWeight: fontWeight.medium.value,
      color: 'var(--hive-success-primary)',
      text: '● Online'
    },
    away: {
      fontSize: fontScale.caption.size,
      fontWeight: fontWeight.medium.value, 
      color: 'var(--hive-warning-primary)',
      text: '○ Away'
    },
    offline: {
      fontSize: fontScale.caption.size,
      fontWeight: fontWeight.regular.value,
      color: 'var(--hive-text-muted)',
      text: '○ Offline'
    }
  },

  // Notification Text Pattern
  notificationText: {
    urgent: {
      fontSize: fontScale.base.size,
      fontWeight: fontWeight.semibold.value,
      color: 'var(--hive-error-primary)'
    },
    important: {
      fontSize: fontScale.base.size,
      fontWeight: fontWeight.medium.value,
      color: 'var(--hive-warning-primary)'
    },
    info: {
      fontSize: fontScale.small.size,
      fontWeight: fontWeight.regular.value,
      color: 'var(--hive-info-primary)'
    },
    success: {
      fontSize: fontScale.small.size,
      fontWeight: fontWeight.medium.value,
      color: 'var(--hive-success-primary)'
    }
  }
} as const;

// === RESPONSIVE TYPOGRAPHY BEHAVIORS ===
export const responsiveTypography = {
  // Breakpoint adjustments
  mobile: {
    maxWidth: '767px',
    adjustments: {
      scaleDown: 'Reduce heading sizes by 0.875x',
      tightenSpacing: 'Reduce line heights by 4px for headings',
      optimizeTouch: 'Ensure minimum 44px touch targets',
      improveReadability: 'Increase body text contrast'
    }
  },
  
  tablet: {
    minWidth: '768px',
    maxWidth: '1023px',
    adjustments: {
      balancedScale: 'Standard scale with optimized line lengths',
      hybridLayouts: 'Mix single and multi-column text layouts'
    }
  },
  
  desktop: {
    minWidth: '1024px',
    adjustments: {
      fullScale: 'All typography scales at full size',
      multiColumn: 'Enable multi-column text layouts where appropriate',
      enhancedHierarchy: 'Full typographic hierarchy available'
    }
  }
} as const;

// === COMPREHENSIVE EXPORT ===
export const typographyComposition = {
  principles: typographyPrinciples,
  scale: fontScale,
  weights: fontWeight,
  families: fontFamily,
  campus: campusTypographyPatterns,
  readability: readabilityRules,
  semantic: semanticCompositions,
  responsive: responsiveTypography
} as const;

export type TypographyComposition = typeof typographyComposition;
export type FontScale = typeof fontScale;
export type FontWeight = typeof fontWeight;
export type CampusTypographyPatterns = typeof campusTypographyPatterns;
export type SemanticCompositions = typeof semanticCompositions;