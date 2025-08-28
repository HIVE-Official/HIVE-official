/**
 * HIVE Component Information Architecture & Layout System
 * Systematic patterns for component organization, hierarchy, and layout
 *
 * This system defines:
 * - Component hierarchy patterns
 * - Information Architecture within components
 * - Layout composition rules
 * - Content organization strategies
 *
 * Status: ✅ PRODUCTION READY
 * Version: v1.0.0
 * Date: August 26, 2025
 */
// === COMPONENT HIERARCHY SYSTEM ===
export const componentHierarchy = {
    // Primary hierarchy levels for component organization
    levels: {
        organism: {
            description: "Complete UI sections with full functionality",
            examples: "ProfileHeader, SpaceCard, FeedPost, ToolBuilder",
            characteristics: [
                "Combines multiple molecules and atoms",
                "Has clear business purpose",
                "Can function independently",
                "Handles own state and interactions"
            ]
        },
        molecule: {
            description: "Component groups that form functional units",
            examples: "UserIdentity, StatCard, ActionButtons, NavigationMenu",
            characteristics: [
                "Combines 2-5 atoms",
                "Has specific functional purpose",
                "Reusable across organisms",
                "Handles specific interactions"
            ]
        },
        atom: {
            description: "Fundamental building blocks",
            examples: "Button, Input, Avatar, Badge, Typography",
            characteristics: [
                "Cannot be broken down further",
                "Highly reusable",
                "Single responsibility",
                "Foundation-based styling"
            ]
        }
    }
};
// === INFORMATION ARCHITECTURE PATTERNS ===
export const iaPatterns = {
    // Campus-optimized IA patterns for different component types
    // Profile Component IA
    profileIA: {
        hierarchy: [
            "identity", // Avatar, name, handle, status
            "context", // Campus info, role, verification
            "content", // Bio, completion prompts, announcements  
            "metrics", // Stats, achievements, reputation
            "actions" // Primary actions, settings, social actions
        ],
        rules: {
            identity: {
                priority: 1,
                position: "top-left on desktop, center on mobile",
                requirements: "Always visible, never truncated",
                components: ["Avatar", "DisplayName", "Handle", "StatusIndicator"]
            },
            context: {
                priority: 2,
                position: "below identity, wrappable",
                requirements: "Campus-relevant, role-appropriate",
                components: ["Major", "GraduationYear", "Dorm", "RoleBadges"]
            },
            content: {
                priority: 3,
                position: "main content area, expandable",
                requirements: "Readable, scannable, action-oriented",
                components: ["Bio", "CompletionPrompt", "Announcements"]
            },
            metrics: {
                priority: 4,
                position: "bottom section, grid layout",
                requirements: "Social proof, quick scanning",
                components: ["SpaceCount", "ToolCount", "Connections", "Reputation"]
            },
            actions: {
                priority: 5,
                position: "right side on desktop, bottom on mobile",
                requirements: "Clear hierarchy, accessible",
                components: ["PrimaryAction", "SecondaryActions", "SettingsAction"]
            }
        }
    },
    // Space Component IA  
    spaceIA: {
        hierarchy: [
            "identity", // Space name, category, member count
            "status", // Active/dormant, member status, notifications
            "preview", // Description, recent activity, tools
            "social", // Member avatars, recent posts, activity
            "actions" // Join/leave, settings, share
        ],
        rules: {
            identity: {
                priority: 1,
                requirements: "Space purpose immediately clear",
                components: ["SpaceName", "Category", "MemberCount", "SpaceAvatar"]
            },
            status: {
                priority: 2,
                requirements: "Current state and user relationship",
                components: ["ActiveStatus", "MembershipStatus", "Notifications"]
            },
            preview: {
                priority: 3,
                requirements: "Enticing content preview",
                components: ["Description", "RecentActivity", "SpaceTools"]
            }
        }
    },
    // Tool Component IA
    toolIA: {
        hierarchy: [
            "identity", // Tool name, creator, type
            "function", // What it does, how it helps
            "social", // Usage stats, community adoption
            "access", // How to use, requirements
            "actions" // Use tool, install, share
        ]
    },
    // Feed Item IA
    feedIA: {
        hierarchy: [
            "attribution", // Author, space context, timestamp
            "content", // Post content, media, tools
            "engagement", // Likes, comments, shares
            "actions" // Interact, share, save
        ]
    }
};
// === LAYOUT COMPOSITION PATTERNS ===
export const layoutComposition = {
    // Systematic layout patterns for different component types
    // Card-based layouts
    cardLayouts: {
        compact: {
            padding: "var(--hive-space-4)", // 16px
            gap: "var(--hive-space-3)", // 12px
            borderRadius: "var(--hive-radius-base)", // 8px
            maxWidth: "320px",
            minHeight: "120px",
            use: "List items, preview cards, mobile-first"
        },
        comfortable: {
            padding: "var(--hive-space-5)", // 20px
            gap: "var(--hive-space-4)", // 16px
            borderRadius: "var(--hive-radius-lg)", // 12px
            maxWidth: "480px",
            minHeight: "200px",
            use: "Primary content cards, detail views"
        },
        spacious: {
            padding: "var(--hive-space-6)", // 24px
            gap: "var(--hive-space-5)", // 20px
            borderRadius: "var(--hive-radius-lg)", // 12px
            maxWidth: "640px",
            minHeight: "280px",
            use: "Hero cards, dashboard sections"
        }
    },
    // Grid layouts
    gridLayouts: {
        profileStats: {
            columns: "grid-cols-2 sm:grid-cols-4",
            gap: "gap-3 sm:gap-4 md:gap-6",
            aspectRatio: "aspect-square",
            use: "Metrics, statistics, quick stats"
        },
        spaceGrid: {
            columns: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
            gap: "gap-4 md:gap-6",
            minHeight: "min-h-[200px]",
            use: "Space discovery, content grids"
        },
        toolGrid: {
            columns: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            gap: "gap-4 lg:gap-6",
            aspectRatio: "aspect-[4/3]",
            use: "Tool browser, app gallery"
        }
    },
    // Flex layouts
    flexLayouts: {
        horizontal: {
            base: "flex items-start gap-4",
            responsive: "flex flex-col sm:flex-row items-start gap-4",
            wrap: "flex items-start gap-4 flex-wrap",
            use: "User identity, action rows, navigation"
        },
        vertical: {
            base: "flex flex-col gap-3",
            centered: "flex flex-col items-center gap-3",
            stretched: "flex flex-col gap-3 h-full",
            use: "Content stacks, form layouts, mobile-first"
        }
    }
};
// === RESPONSIVE BEHAVIOR PATTERNS ===
export const responsivePatterns = {
    // Mobile-first responsive patterns
    breakpoints: {
        mobile: "0px - 639px",
        tablet: "640px - 1023px",
        desktop: "1024px+"
    },
    componentAdaptations: {
        // How components adapt across breakpoints
        profileHeader: {
            mobile: "Stack vertically, full-width actions, smaller text",
            tablet: "Horizontal layout, sidebar actions, medium text",
            desktop: "Full horizontal, side actions, large text"
        },
        spaceCard: {
            mobile: "Single column, minimal details, tap-friendly",
            tablet: "Two columns, moderate details, hover states",
            desktop: "Three columns, full details, rich interactions"
        },
        feedPost: {
            mobile: "Full width, minimal metadata, large touch targets",
            tablet: "Comfortable width, sidebar actions, medium targets",
            desktop: "Constrained width, hover actions, precise targets"
        }
    },
    // Content density adaptation
    contentDensity: {
        mobile: {
            spacing: "Generous spacing for touch interaction",
            text: "Larger text, shorter lines, clear hierarchy",
            actions: "Full-width buttons, thumb-reachable areas"
        },
        desktop: {
            spacing: "Efficient spacing for information density",
            text: "Compact text, longer lines, subtle hierarchy",
            actions: "Inline actions, hover states, precise targeting"
        }
    }
};
// === CONTENT ORGANIZATION STRATEGIES ===
export const contentOrganization = {
    // Systematic approaches to organizing content within components
    priorityLevels: {
        primary: {
            characteristics: "Essential information, always visible",
            examples: "User name, space name, tool function",
            styling: "Largest text, high contrast, prominent position"
        },
        secondary: {
            characteristics: "Important context, conditionally visible",
            examples: "User handle, member count, creation date",
            styling: "Medium text, medium contrast, supporting position"
        },
        tertiary: {
            characteristics: "Supporting details, space permitting",
            examples: "Metadata, timestamps, auxiliary information",
            styling: "Small text, low contrast, minimal space"
        }
    },
    // Campus-specific content patterns
    campusContentTypes: {
        identity: {
            userIdentity: ["name", "handle", "avatar", "status", "role"],
            spaceIdentity: ["name", "category", "memberCount", "status"],
            toolIdentity: ["name", "creator", "type", "usageCount"]
        },
        context: {
            campusContext: ["major", "graduationYear", "dorm", "campus"],
            timeContext: ["timestamp", "duration", "schedule", "deadline"],
            socialContext: ["connections", "popularity", "engagement"]
        },
        actions: {
            primary: ["join", "use", "connect", "create"],
            secondary: ["share", "save", "follow", "customize"],
            tertiary: ["report", "hide", "archive", "delete"]
        }
    }
};
// === ACCESSIBILITY PATTERNS ===
export const accessibilityPatterns = {
    // A11y considerations for component IA
    semanticStructure: {
        headingHierarchy: "Logical h1-h6 progression within components",
        landmarkRoles: "Clear navigation, main, complementary regions",
        listStructure: "Proper ul/ol for grouped content",
        buttonVsLink: "Actions vs navigation distinction"
    },
    interactionPatterns: {
        keyboardNavigation: "Tab order follows visual hierarchy",
        focusManagement: "Clear focus indicators, logical flow",
        touchTargets: "Minimum 44px for mobile interactions",
        screenReaderSupport: "Descriptive labels, status announcements"
    },
    campusAccessibility: {
        inclusiveLanguage: "Student-first, role-neutral terminology",
        cognitiveLoad: "Clear information hierarchy, scannable content",
        visualClarity: "High contrast, readable fonts, clear spacing",
        motorAccessibility: "Large touch targets, forgiving interactions"
    }
};
// === PERFORMANCE CONSIDERATIONS ===
export const performancePatterns = {
    // Performance-aware component organization
    loadingPriorities: {
        critical: "Above-fold content, user identity, primary actions",
        important: "Secondary content, social proof, contextual info",
        deferred: "Tertiary details, auxiliary features, analytics"
    },
    renderOptimization: {
        lazyLoading: "Non-critical sections load on interaction",
        virtualScrolling: "Large lists render only visible items",
        imageOptimization: "Progressive loading, appropriate sizing",
        bundleSplitting: "Component-level code splitting"
    },
    campusOptimization: {
        offlineFirst: "Core functionality works without connection",
        lowBandwidth: "Efficient data usage, progressive enhancement",
        batteryAware: "Minimal animations, efficient rendering",
        cacheStrategy: "Aggressive caching for repeated campus usage"
    }
};
// === COMPREHENSIVE EXPORT ===
export const componentIASystem = {
    hierarchy: componentHierarchy,
    ia: iaPatterns,
    layout: layoutComposition,
    responsive: responsivePatterns,
    content: contentOrganization,
    accessibility: accessibilityPatterns,
    performance: performancePatterns
};
//# sourceMappingURL=component-ia-system.js.map