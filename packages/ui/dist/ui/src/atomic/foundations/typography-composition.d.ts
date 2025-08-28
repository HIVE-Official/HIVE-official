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
export declare const typographyPrinciples: {
    readonly philosophy: "Typography serves campus community building and social utility";
    readonly rules: readonly ["Mobile-first: Readable on phones while walking between classes", "Hierarchy-driven: Clear information prioritization for social content", "Campus-optimized: Support user mentions, space names, tool descriptions", "Accessibility: WCAG AA compliance for inclusive campus experience"];
};
export declare const fontScale: {
    readonly micro: {
        readonly size: "var(--hive-font-size-micro)";
        readonly lineHeight: "var(--hive-line-height-micro)";
        readonly use: "Timestamps, micro labels, badge text";
        readonly mobile: "Minimum readable size on campus WiFi loading";
    };
    readonly caption: {
        readonly size: "var(--hive-font-size-caption)";
        readonly lineHeight: "var(--hive-line-height-caption)";
        readonly use: "Post metadata, user handles, space member counts";
        readonly mobile: "Social proof indicators, secondary information";
    };
    readonly small: {
        readonly size: "var(--hive-font-size-small)";
        readonly lineHeight: "var(--hive-line-height-small)";
        readonly use: "Comment text, navigation labels, button text";
        readonly mobile: "Primary interaction text, easily tappable";
    };
    readonly base: {
        readonly size: "var(--hive-font-size-base)";
        readonly lineHeight: "var(--hive-line-height-base)";
        readonly use: "Post content, main body text, form inputs";
        readonly mobile: "Optimal reading size for post content on mobile";
    };
    readonly large: {
        readonly size: "var(--hive-font-size-large)";
        readonly lineHeight: "var(--hive-line-height-large)";
        readonly use: "Featured content, tool descriptions, important messages";
        readonly mobile: "Emphasized content that stands out in feed";
    };
    readonly h4: {
        readonly size: "var(--hive-font-size-h4)";
        readonly lineHeight: "var(--hive-line-height-h4)";
        readonly use: "Card titles, tool names, space names";
        readonly mobile: "Clear hierarchy without overwhelming mobile screens";
    };
    readonly h3: {
        readonly size: "var(--hive-font-size-h3)";
        readonly lineHeight: "var(--hive-line-height-h3)";
        readonly use: "Section headers, featured space names, major announcements";
        readonly mobile: "Strong hierarchy for important campus announcements";
    };
    readonly h2: {
        readonly size: "var(--hive-font-size-h2)";
        readonly lineHeight: "var(--hive-line-height-h2)";
        readonly use: "Page titles, profile names, major space headers";
        readonly mobile: "Primary page identification, user identity";
    };
    readonly h1: {
        readonly size: "var(--hive-font-size-h1)";
        readonly lineHeight: "var(--hive-line-height-h1)";
        readonly use: "Hero headings, onboarding titles, major feature announcements";
        readonly mobile: "Maximum impact without breaking mobile layout";
    };
    readonly display: {
        readonly size: "var(--hive-font-size-display)";
        readonly lineHeight: "var(--hive-line-height-display)";
        readonly use: "Landing page headers, major milestone celebrations";
        readonly mobile: "Special occasions, celebration screens only";
    };
};
export declare const fontWeight: {
    readonly regular: {
        readonly value: "var(--hive-font-weight-regular)";
        readonly use: "Body text, captions, secondary information";
        readonly css: "font-weight: 400";
    };
    readonly medium: {
        readonly value: "var(--hive-font-weight-medium)";
        readonly use: "User names, space names, emphasized text";
        readonly css: "font-weight: 500";
    };
    readonly semibold: {
        readonly value: "var(--hive-font-weight-semibold)";
        readonly use: "Headings, tool names, call-to-action text";
        readonly css: "font-weight: 600";
    };
    readonly bold: {
        readonly value: "var(--hive-font-weight-bold)";
        readonly use: "Major headings, urgent notifications, primary buttons";
        readonly css: "font-weight: 700";
    };
};
export declare const fontFamily: {
    readonly display: {
        readonly value: "var(--hive-font-family-display)";
        readonly use: "Headlines, hero text, call-to-action buttons, brand moments";
        readonly fallback: "system-ui, sans-serif";
    };
    readonly primary: {
        readonly value: "var(--hive-font-family-primary)";
        readonly use: "Body text, interface elements, social content, readable text";
        readonly fallback: "-apple-system, BlinkMacSystemFont, sans-serif";
    };
    readonly secondary: {
        readonly value: "var(--hive-font-family-secondary)";
        readonly use: "Secondary text, metadata, captions, timestamps";
        readonly fallback: "system-ui, sans-serif";
    };
    readonly mono: {
        readonly value: "var(--hive-font-family-mono)";
        readonly use: "Code snippets, tool configurations, technical content";
        readonly fallback: "SF Mono, Monaco, Cascadia Code, monospace";
    };
};
export declare const campusTypographyPatterns: {
    readonly socialPost: {
        readonly userDisplayName: {
            readonly fontSize: "var(--hive-font-size-base)";
            readonly fontWeight: "var(--hive-font-weight-semibold)";
            readonly color: "var(--hive-text-primary)";
            readonly use: "Primary identification in posts and comments";
        };
        readonly userHandle: {
            readonly fontSize: "var(--hive-font-size-small)";
            readonly fontWeight: "var(--hive-font-weight-regular)";
            readonly color: "var(--hive-text-secondary)";
            readonly use: "@username for mentions and identification";
        };
        readonly postContent: {
            readonly fontSize: "var(--hive-font-size-base)";
            readonly fontWeight: "var(--hive-font-weight-regular)";
            readonly color: "var(--hive-text-primary)";
            readonly lineHeight: "var(--hive-line-height-base)";
            readonly use: "Main post content with optimal mobile readability";
        };
        readonly postTimestamp: {
            readonly fontSize: "var(--hive-font-size-caption)";
            readonly fontWeight: "var(--hive-font-weight-regular)";
            readonly color: "var(--hive-text-muted)";
            readonly use: "Relative timestamps (2h ago, yesterday)";
        };
        readonly engagementCounts: {
            readonly fontSize: "var(--hive-font-size-small)";
            readonly fontWeight: "var(--hive-font-weight-medium)";
            readonly color: "var(--hive-text-secondary)";
            readonly use: "Like counts, comment counts, share counts";
        };
    };
    readonly spaceIdentity: {
        readonly spaceName: {
            readonly fontSize: "var(--hive-font-size-h4)";
            readonly fontWeight: "var(--hive-font-weight-semibold)";
            readonly color: "var(--hive-text-primary)";
            readonly use: "Primary space identification";
        };
        readonly spaceDescription: {
            readonly fontSize: "var(--hive-font-size-small)";
            readonly fontWeight: "var(--hive-font-weight-regular)";
            readonly color: "var(--hive-text-secondary)";
            readonly lineHeight: "var(--hive-line-height-small)";
            readonly use: "Space purpose and community guidelines";
        };
        readonly memberCount: {
            readonly fontSize: "var(--hive-font-size-caption)";
            readonly fontWeight: "var(--hive-font-weight-medium)";
            readonly color: "var(--hive-text-muted)";
            readonly use: "Social proof indicators (1,234 members)";
        };
        readonly spaceCategory: {
            readonly fontSize: "var(--hive-font-size-caption)";
            readonly fontWeight: "var(--hive-font-weight-medium)";
            readonly color: "var(--hive-gold-primary)";
            readonly textTransform: "uppercase";
            readonly letterSpacing: "0.5px";
            readonly use: "Space categorization (ACADEMIC, SOCIAL, TOOLS)";
        };
    };
    readonly toolIdentity: {
        readonly toolName: {
            readonly fontSize: "var(--hive-font-size-large)";
            readonly fontWeight: "var(--hive-font-weight-semibold)";
            readonly color: "var(--hive-text-primary)";
            readonly use: "Primary tool identification";
        };
        readonly toolDescription: {
            readonly fontSize: "var(--hive-font-size-base)";
            readonly fontWeight: "var(--hive-font-weight-regular)";
            readonly color: "var(--hive-text-secondary)";
            readonly lineHeight: "var(--hive-line-height-base)";
            readonly use: "Tool functionality and use case description";
        };
        readonly builderName: {
            readonly fontSize: "var(--hive-font-size-small)";
            readonly fontWeight: "var(--hive-font-weight-medium)";
            readonly color: "var(--hive-text-secondary)";
            readonly use: "Tool creator attribution";
        };
        readonly usageCount: {
            readonly fontSize: "var(--hive-font-size-caption)";
            readonly fontWeight: "var(--hive-font-weight-regular)";
            readonly color: "var(--hive-text-muted)";
            readonly use: "Tool adoption metrics (Used by 45 students)";
        };
    };
    readonly profileIdentity: {
        readonly displayName: {
            readonly fontSize: "var(--hive-font-size-h2)";
            readonly fontWeight: "var(--hive-font-weight-bold)";
            readonly color: "var(--hive-text-primary)";
            readonly use: "Primary user identification on profile pages";
        };
        readonly profileHandle: {
            readonly fontSize: "var(--hive-font-size-large)";
            readonly fontWeight: "var(--hive-font-weight-regular)";
            readonly color: "var(--hive-text-secondary)";
            readonly use: "@username on profile pages";
        };
        readonly profileBio: {
            readonly fontSize: "var(--hive-font-size-base)";
            readonly fontWeight: "var(--hive-font-weight-regular)";
            readonly color: "var(--hive-text-primary)";
            readonly lineHeight: "var(--hive-line-height-base)";
            readonly use: "User bio and description";
        };
        readonly profileMeta: {
            readonly fontSize: "var(--hive-font-size-small)";
            readonly fontWeight: "var(--hive-font-weight-regular)";
            readonly color: "var(--hive-text-muted)";
            readonly use: "Join date, location, academic info";
        };
    };
};
export declare const readabilityRules: {
    readonly lineLength: {
        readonly optimal: "45-75 characters per line";
        readonly mobile: "35-55 characters per line";
        readonly implementation: "max-width: 65ch for body text";
    };
    readonly contrast: {
        readonly primary: "7:1 ratio - High contrast for primary content";
        readonly secondary: "4.5:1 ratio - Medium contrast for secondary info";
        readonly muted: "3:1 ratio - Minimum contrast for supporting text";
    };
    readonly verticalRhythm: {
        readonly posts: "var(--hive-space-4) between post elements";
        readonly comments: "var(--hive-space-3) between comment elements";
        readonly metadata: "var(--hive-space-2) for timestamps and counts";
    };
    readonly interactiveText: {
        readonly minimumSize: "var(--hive-font-size-small)";
        readonly recommendedSize: "var(--hive-font-size-base)";
        readonly touchTarget: "44px minimum height for tappable text";
    };
};
export declare const semanticCompositions: {
    readonly userMention: {
        readonly structure: "@username";
        readonly styling: {
            readonly fontSize: "inherit";
            readonly fontWeight: "var(--hive-font-weight-medium)";
            readonly color: "var(--hive-gold-primary)";
            readonly textDecoration: "none";
            readonly cursor: "pointer";
        };
        readonly hover: {
            readonly color: "var(--hive-gold-hover)";
            readonly textDecoration: "underline";
        };
        readonly use: "Interactive user mentions in posts and comments";
    };
    readonly spaceReference: {
        readonly structure: "#spacename";
        readonly styling: {
            readonly fontSize: "inherit";
            readonly fontWeight: "var(--hive-font-weight-medium)";
            readonly color: "var(--hive-info-primary)";
            readonly textDecoration: "none";
            readonly cursor: "pointer";
        };
        readonly hover: {
            readonly color: "var(--hive-info-hover)";
            readonly textDecoration: "underline";
        };
        readonly use: "References to spaces in posts and discussions";
    };
    readonly statusIndicator: {
        readonly online: {
            readonly fontSize: "var(--hive-font-size-caption)";
            readonly fontWeight: "var(--hive-font-weight-medium)";
            readonly color: "var(--hive-success-primary)";
            readonly text: "● Online";
        };
        readonly away: {
            readonly fontSize: "var(--hive-font-size-caption)";
            readonly fontWeight: "var(--hive-font-weight-medium)";
            readonly color: "var(--hive-warning-primary)";
            readonly text: "○ Away";
        };
        readonly offline: {
            readonly fontSize: "var(--hive-font-size-caption)";
            readonly fontWeight: "var(--hive-font-weight-regular)";
            readonly color: "var(--hive-text-muted)";
            readonly text: "○ Offline";
        };
    };
    readonly notificationText: {
        readonly urgent: {
            readonly fontSize: "var(--hive-font-size-base)";
            readonly fontWeight: "var(--hive-font-weight-semibold)";
            readonly color: "var(--hive-error-primary)";
        };
        readonly important: {
            readonly fontSize: "var(--hive-font-size-base)";
            readonly fontWeight: "var(--hive-font-weight-medium)";
            readonly color: "var(--hive-warning-primary)";
        };
        readonly info: {
            readonly fontSize: "var(--hive-font-size-small)";
            readonly fontWeight: "var(--hive-font-weight-regular)";
            readonly color: "var(--hive-info-primary)";
        };
        readonly success: {
            readonly fontSize: "var(--hive-font-size-small)";
            readonly fontWeight: "var(--hive-font-weight-medium)";
            readonly color: "var(--hive-success-primary)";
        };
    };
};
export declare const responsiveTypography: {
    readonly mobile: {
        readonly maxWidth: "767px";
        readonly adjustments: {
            readonly scaleDown: "Reduce heading sizes by 0.875x";
            readonly tightenSpacing: "Reduce line heights by 4px for headings";
            readonly optimizeTouch: "Ensure minimum 44px touch targets";
            readonly improveReadability: "Increase body text contrast";
        };
    };
    readonly tablet: {
        readonly minWidth: "768px";
        readonly maxWidth: "1023px";
        readonly adjustments: {
            readonly balancedScale: "Standard scale with optimized line lengths";
            readonly hybridLayouts: "Mix single and multi-column text layouts";
        };
    };
    readonly desktop: {
        readonly minWidth: "1024px";
        readonly adjustments: {
            readonly fullScale: "All typography scales at full size";
            readonly multiColumn: "Enable multi-column text layouts where appropriate";
            readonly enhancedHierarchy: "Full typographic hierarchy available";
        };
    };
};
export declare const typographyComposition: {
    readonly principles: {
        readonly philosophy: "Typography serves campus community building and social utility";
        readonly rules: readonly ["Mobile-first: Readable on phones while walking between classes", "Hierarchy-driven: Clear information prioritization for social content", "Campus-optimized: Support user mentions, space names, tool descriptions", "Accessibility: WCAG AA compliance for inclusive campus experience"];
    };
    readonly scale: {
        readonly micro: {
            readonly size: "var(--hive-font-size-micro)";
            readonly lineHeight: "var(--hive-line-height-micro)";
            readonly use: "Timestamps, micro labels, badge text";
            readonly mobile: "Minimum readable size on campus WiFi loading";
        };
        readonly caption: {
            readonly size: "var(--hive-font-size-caption)";
            readonly lineHeight: "var(--hive-line-height-caption)";
            readonly use: "Post metadata, user handles, space member counts";
            readonly mobile: "Social proof indicators, secondary information";
        };
        readonly small: {
            readonly size: "var(--hive-font-size-small)";
            readonly lineHeight: "var(--hive-line-height-small)";
            readonly use: "Comment text, navigation labels, button text";
            readonly mobile: "Primary interaction text, easily tappable";
        };
        readonly base: {
            readonly size: "var(--hive-font-size-base)";
            readonly lineHeight: "var(--hive-line-height-base)";
            readonly use: "Post content, main body text, form inputs";
            readonly mobile: "Optimal reading size for post content on mobile";
        };
        readonly large: {
            readonly size: "var(--hive-font-size-large)";
            readonly lineHeight: "var(--hive-line-height-large)";
            readonly use: "Featured content, tool descriptions, important messages";
            readonly mobile: "Emphasized content that stands out in feed";
        };
        readonly h4: {
            readonly size: "var(--hive-font-size-h4)";
            readonly lineHeight: "var(--hive-line-height-h4)";
            readonly use: "Card titles, tool names, space names";
            readonly mobile: "Clear hierarchy without overwhelming mobile screens";
        };
        readonly h3: {
            readonly size: "var(--hive-font-size-h3)";
            readonly lineHeight: "var(--hive-line-height-h3)";
            readonly use: "Section headers, featured space names, major announcements";
            readonly mobile: "Strong hierarchy for important campus announcements";
        };
        readonly h2: {
            readonly size: "var(--hive-font-size-h2)";
            readonly lineHeight: "var(--hive-line-height-h2)";
            readonly use: "Page titles, profile names, major space headers";
            readonly mobile: "Primary page identification, user identity";
        };
        readonly h1: {
            readonly size: "var(--hive-font-size-h1)";
            readonly lineHeight: "var(--hive-line-height-h1)";
            readonly use: "Hero headings, onboarding titles, major feature announcements";
            readonly mobile: "Maximum impact without breaking mobile layout";
        };
        readonly display: {
            readonly size: "var(--hive-font-size-display)";
            readonly lineHeight: "var(--hive-line-height-display)";
            readonly use: "Landing page headers, major milestone celebrations";
            readonly mobile: "Special occasions, celebration screens only";
        };
    };
    readonly weights: {
        readonly regular: {
            readonly value: "var(--hive-font-weight-regular)";
            readonly use: "Body text, captions, secondary information";
            readonly css: "font-weight: 400";
        };
        readonly medium: {
            readonly value: "var(--hive-font-weight-medium)";
            readonly use: "User names, space names, emphasized text";
            readonly css: "font-weight: 500";
        };
        readonly semibold: {
            readonly value: "var(--hive-font-weight-semibold)";
            readonly use: "Headings, tool names, call-to-action text";
            readonly css: "font-weight: 600";
        };
        readonly bold: {
            readonly value: "var(--hive-font-weight-bold)";
            readonly use: "Major headings, urgent notifications, primary buttons";
            readonly css: "font-weight: 700";
        };
    };
    readonly families: {
        readonly display: {
            readonly value: "var(--hive-font-family-display)";
            readonly use: "Headlines, hero text, call-to-action buttons, brand moments";
            readonly fallback: "system-ui, sans-serif";
        };
        readonly primary: {
            readonly value: "var(--hive-font-family-primary)";
            readonly use: "Body text, interface elements, social content, readable text";
            readonly fallback: "-apple-system, BlinkMacSystemFont, sans-serif";
        };
        readonly secondary: {
            readonly value: "var(--hive-font-family-secondary)";
            readonly use: "Secondary text, metadata, captions, timestamps";
            readonly fallback: "system-ui, sans-serif";
        };
        readonly mono: {
            readonly value: "var(--hive-font-family-mono)";
            readonly use: "Code snippets, tool configurations, technical content";
            readonly fallback: "SF Mono, Monaco, Cascadia Code, monospace";
        };
    };
    readonly campus: {
        readonly socialPost: {
            readonly userDisplayName: {
                readonly fontSize: "var(--hive-font-size-base)";
                readonly fontWeight: "var(--hive-font-weight-semibold)";
                readonly color: "var(--hive-text-primary)";
                readonly use: "Primary identification in posts and comments";
            };
            readonly userHandle: {
                readonly fontSize: "var(--hive-font-size-small)";
                readonly fontWeight: "var(--hive-font-weight-regular)";
                readonly color: "var(--hive-text-secondary)";
                readonly use: "@username for mentions and identification";
            };
            readonly postContent: {
                readonly fontSize: "var(--hive-font-size-base)";
                readonly fontWeight: "var(--hive-font-weight-regular)";
                readonly color: "var(--hive-text-primary)";
                readonly lineHeight: "var(--hive-line-height-base)";
                readonly use: "Main post content with optimal mobile readability";
            };
            readonly postTimestamp: {
                readonly fontSize: "var(--hive-font-size-caption)";
                readonly fontWeight: "var(--hive-font-weight-regular)";
                readonly color: "var(--hive-text-muted)";
                readonly use: "Relative timestamps (2h ago, yesterday)";
            };
            readonly engagementCounts: {
                readonly fontSize: "var(--hive-font-size-small)";
                readonly fontWeight: "var(--hive-font-weight-medium)";
                readonly color: "var(--hive-text-secondary)";
                readonly use: "Like counts, comment counts, share counts";
            };
        };
        readonly spaceIdentity: {
            readonly spaceName: {
                readonly fontSize: "var(--hive-font-size-h4)";
                readonly fontWeight: "var(--hive-font-weight-semibold)";
                readonly color: "var(--hive-text-primary)";
                readonly use: "Primary space identification";
            };
            readonly spaceDescription: {
                readonly fontSize: "var(--hive-font-size-small)";
                readonly fontWeight: "var(--hive-font-weight-regular)";
                readonly color: "var(--hive-text-secondary)";
                readonly lineHeight: "var(--hive-line-height-small)";
                readonly use: "Space purpose and community guidelines";
            };
            readonly memberCount: {
                readonly fontSize: "var(--hive-font-size-caption)";
                readonly fontWeight: "var(--hive-font-weight-medium)";
                readonly color: "var(--hive-text-muted)";
                readonly use: "Social proof indicators (1,234 members)";
            };
            readonly spaceCategory: {
                readonly fontSize: "var(--hive-font-size-caption)";
                readonly fontWeight: "var(--hive-font-weight-medium)";
                readonly color: "var(--hive-gold-primary)";
                readonly textTransform: "uppercase";
                readonly letterSpacing: "0.5px";
                readonly use: "Space categorization (ACADEMIC, SOCIAL, TOOLS)";
            };
        };
        readonly toolIdentity: {
            readonly toolName: {
                readonly fontSize: "var(--hive-font-size-large)";
                readonly fontWeight: "var(--hive-font-weight-semibold)";
                readonly color: "var(--hive-text-primary)";
                readonly use: "Primary tool identification";
            };
            readonly toolDescription: {
                readonly fontSize: "var(--hive-font-size-base)";
                readonly fontWeight: "var(--hive-font-weight-regular)";
                readonly color: "var(--hive-text-secondary)";
                readonly lineHeight: "var(--hive-line-height-base)";
                readonly use: "Tool functionality and use case description";
            };
            readonly builderName: {
                readonly fontSize: "var(--hive-font-size-small)";
                readonly fontWeight: "var(--hive-font-weight-medium)";
                readonly color: "var(--hive-text-secondary)";
                readonly use: "Tool creator attribution";
            };
            readonly usageCount: {
                readonly fontSize: "var(--hive-font-size-caption)";
                readonly fontWeight: "var(--hive-font-weight-regular)";
                readonly color: "var(--hive-text-muted)";
                readonly use: "Tool adoption metrics (Used by 45 students)";
            };
        };
        readonly profileIdentity: {
            readonly displayName: {
                readonly fontSize: "var(--hive-font-size-h2)";
                readonly fontWeight: "var(--hive-font-weight-bold)";
                readonly color: "var(--hive-text-primary)";
                readonly use: "Primary user identification on profile pages";
            };
            readonly profileHandle: {
                readonly fontSize: "var(--hive-font-size-large)";
                readonly fontWeight: "var(--hive-font-weight-regular)";
                readonly color: "var(--hive-text-secondary)";
                readonly use: "@username on profile pages";
            };
            readonly profileBio: {
                readonly fontSize: "var(--hive-font-size-base)";
                readonly fontWeight: "var(--hive-font-weight-regular)";
                readonly color: "var(--hive-text-primary)";
                readonly lineHeight: "var(--hive-line-height-base)";
                readonly use: "User bio and description";
            };
            readonly profileMeta: {
                readonly fontSize: "var(--hive-font-size-small)";
                readonly fontWeight: "var(--hive-font-weight-regular)";
                readonly color: "var(--hive-text-muted)";
                readonly use: "Join date, location, academic info";
            };
        };
    };
    readonly readability: {
        readonly lineLength: {
            readonly optimal: "45-75 characters per line";
            readonly mobile: "35-55 characters per line";
            readonly implementation: "max-width: 65ch for body text";
        };
        readonly contrast: {
            readonly primary: "7:1 ratio - High contrast for primary content";
            readonly secondary: "4.5:1 ratio - Medium contrast for secondary info";
            readonly muted: "3:1 ratio - Minimum contrast for supporting text";
        };
        readonly verticalRhythm: {
            readonly posts: "var(--hive-space-4) between post elements";
            readonly comments: "var(--hive-space-3) between comment elements";
            readonly metadata: "var(--hive-space-2) for timestamps and counts";
        };
        readonly interactiveText: {
            readonly minimumSize: "var(--hive-font-size-small)";
            readonly recommendedSize: "var(--hive-font-size-base)";
            readonly touchTarget: "44px minimum height for tappable text";
        };
    };
    readonly semantic: {
        readonly userMention: {
            readonly structure: "@username";
            readonly styling: {
                readonly fontSize: "inherit";
                readonly fontWeight: "var(--hive-font-weight-medium)";
                readonly color: "var(--hive-gold-primary)";
                readonly textDecoration: "none";
                readonly cursor: "pointer";
            };
            readonly hover: {
                readonly color: "var(--hive-gold-hover)";
                readonly textDecoration: "underline";
            };
            readonly use: "Interactive user mentions in posts and comments";
        };
        readonly spaceReference: {
            readonly structure: "#spacename";
            readonly styling: {
                readonly fontSize: "inherit";
                readonly fontWeight: "var(--hive-font-weight-medium)";
                readonly color: "var(--hive-info-primary)";
                readonly textDecoration: "none";
                readonly cursor: "pointer";
            };
            readonly hover: {
                readonly color: "var(--hive-info-hover)";
                readonly textDecoration: "underline";
            };
            readonly use: "References to spaces in posts and discussions";
        };
        readonly statusIndicator: {
            readonly online: {
                readonly fontSize: "var(--hive-font-size-caption)";
                readonly fontWeight: "var(--hive-font-weight-medium)";
                readonly color: "var(--hive-success-primary)";
                readonly text: "● Online";
            };
            readonly away: {
                readonly fontSize: "var(--hive-font-size-caption)";
                readonly fontWeight: "var(--hive-font-weight-medium)";
                readonly color: "var(--hive-warning-primary)";
                readonly text: "○ Away";
            };
            readonly offline: {
                readonly fontSize: "var(--hive-font-size-caption)";
                readonly fontWeight: "var(--hive-font-weight-regular)";
                readonly color: "var(--hive-text-muted)";
                readonly text: "○ Offline";
            };
        };
        readonly notificationText: {
            readonly urgent: {
                readonly fontSize: "var(--hive-font-size-base)";
                readonly fontWeight: "var(--hive-font-weight-semibold)";
                readonly color: "var(--hive-error-primary)";
            };
            readonly important: {
                readonly fontSize: "var(--hive-font-size-base)";
                readonly fontWeight: "var(--hive-font-weight-medium)";
                readonly color: "var(--hive-warning-primary)";
            };
            readonly info: {
                readonly fontSize: "var(--hive-font-size-small)";
                readonly fontWeight: "var(--hive-font-weight-regular)";
                readonly color: "var(--hive-info-primary)";
            };
            readonly success: {
                readonly fontSize: "var(--hive-font-size-small)";
                readonly fontWeight: "var(--hive-font-weight-medium)";
                readonly color: "var(--hive-success-primary)";
            };
        };
    };
    readonly responsive: {
        readonly mobile: {
            readonly maxWidth: "767px";
            readonly adjustments: {
                readonly scaleDown: "Reduce heading sizes by 0.875x";
                readonly tightenSpacing: "Reduce line heights by 4px for headings";
                readonly optimizeTouch: "Ensure minimum 44px touch targets";
                readonly improveReadability: "Increase body text contrast";
            };
        };
        readonly tablet: {
            readonly minWidth: "768px";
            readonly maxWidth: "1023px";
            readonly adjustments: {
                readonly balancedScale: "Standard scale with optimized line lengths";
                readonly hybridLayouts: "Mix single and multi-column text layouts";
            };
        };
        readonly desktop: {
            readonly minWidth: "1024px";
            readonly adjustments: {
                readonly fullScale: "All typography scales at full size";
                readonly multiColumn: "Enable multi-column text layouts where appropriate";
                readonly enhancedHierarchy: "Full typographic hierarchy available";
            };
        };
    };
};
export type TypographyComposition = typeof typographyComposition;
export type FontScale = typeof fontScale;
export type FontWeight = typeof fontWeight;
export type CampusTypographyPatterns = typeof campusTypographyPatterns;
export type SemanticCompositions = typeof semanticCompositions;
//# sourceMappingURL=typography-composition.d.ts.map