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
export declare const componentHierarchy: {
    readonly levels: {
        readonly organism: {
            readonly description: "Complete UI sections with full functionality";
            readonly examples: "ProfileHeader, SpaceCard, FeedPost, ToolBuilder";
            readonly characteristics: readonly ["Combines multiple molecules and atoms", "Has clear business purpose", "Can function independently", "Handles own state and interactions"];
        };
        readonly molecule: {
            readonly description: "Component groups that form functional units";
            readonly examples: "UserIdentity, StatCard, ActionButtons, NavigationMenu";
            readonly characteristics: readonly ["Combines 2-5 atoms", "Has specific functional purpose", "Reusable across organisms", "Handles specific interactions"];
        };
        readonly atom: {
            readonly description: "Fundamental building blocks";
            readonly examples: "Button, Input, Avatar, Badge, Typography";
            readonly characteristics: readonly ["Cannot be broken down further", "Highly reusable", "Single responsibility", "Foundation-based styling"];
        };
    };
};
export declare const iaPatterns: {
    readonly profileIA: {
        readonly hierarchy: readonly ["identity", "context", "content", "metrics", "actions"];
        readonly rules: {
            readonly identity: {
                readonly priority: 1;
                readonly position: "top-left on desktop, center on mobile";
                readonly requirements: "Always visible, never truncated";
                readonly components: readonly ["Avatar", "DisplayName", "Handle", "StatusIndicator"];
            };
            readonly context: {
                readonly priority: 2;
                readonly position: "below identity, wrappable";
                readonly requirements: "Campus-relevant, role-appropriate";
                readonly components: readonly ["Major", "GraduationYear", "Dorm", "RoleBadges"];
            };
            readonly content: {
                readonly priority: 3;
                readonly position: "main content area, expandable";
                readonly requirements: "Readable, scannable, action-oriented";
                readonly components: readonly ["Bio", "CompletionPrompt", "Announcements"];
            };
            readonly metrics: {
                readonly priority: 4;
                readonly position: "bottom section, grid layout";
                readonly requirements: "Social proof, quick scanning";
                readonly components: readonly ["SpaceCount", "ToolCount", "Connections", "Reputation"];
            };
            readonly actions: {
                readonly priority: 5;
                readonly position: "right side on desktop, bottom on mobile";
                readonly requirements: "Clear hierarchy, accessible";
                readonly components: readonly ["PrimaryAction", "SecondaryActions", "SettingsAction"];
            };
        };
    };
    readonly spaceIA: {
        readonly hierarchy: readonly ["identity", "status", "preview", "social", "actions"];
        readonly rules: {
            readonly identity: {
                readonly priority: 1;
                readonly requirements: "Space purpose immediately clear";
                readonly components: readonly ["SpaceName", "Category", "MemberCount", "SpaceAvatar"];
            };
            readonly status: {
                readonly priority: 2;
                readonly requirements: "Current state and user relationship";
                readonly components: readonly ["ActiveStatus", "MembershipStatus", "Notifications"];
            };
            readonly preview: {
                readonly priority: 3;
                readonly requirements: "Enticing content preview";
                readonly components: readonly ["Description", "RecentActivity", "SpaceTools"];
            };
        };
    };
    readonly toolIA: {
        readonly hierarchy: readonly ["identity", "function", "social", "access", "actions"];
    };
    readonly feedIA: {
        readonly hierarchy: readonly ["attribution", "content", "engagement", "actions"];
    };
};
export declare const layoutComposition: {
    readonly cardLayouts: {
        readonly compact: {
            readonly padding: "var(--hive-space-4)";
            readonly gap: "var(--hive-space-3)";
            readonly borderRadius: "var(--hive-radius-base)";
            readonly maxWidth: "320px";
            readonly minHeight: "120px";
            readonly use: "List items, preview cards, mobile-first";
        };
        readonly comfortable: {
            readonly padding: "var(--hive-space-5)";
            readonly gap: "var(--hive-space-4)";
            readonly borderRadius: "var(--hive-radius-lg)";
            readonly maxWidth: "480px";
            readonly minHeight: "200px";
            readonly use: "Primary content cards, detail views";
        };
        readonly spacious: {
            readonly padding: "var(--hive-space-6)";
            readonly gap: "var(--hive-space-5)";
            readonly borderRadius: "var(--hive-radius-lg)";
            readonly maxWidth: "640px";
            readonly minHeight: "280px";
            readonly use: "Hero cards, dashboard sections";
        };
    };
    readonly gridLayouts: {
        readonly profileStats: {
            readonly columns: "grid-cols-2 sm:grid-cols-4";
            readonly gap: "gap-3 sm:gap-4 md:gap-6";
            readonly aspectRatio: "aspect-square";
            readonly use: "Metrics, statistics, quick stats";
        };
        readonly spaceGrid: {
            readonly columns: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
            readonly gap: "gap-4 md:gap-6";
            readonly minHeight: "min-h-[200px]";
            readonly use: "Space discovery, content grids";
        };
        readonly toolGrid: {
            readonly columns: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
            readonly gap: "gap-4 lg:gap-6";
            readonly aspectRatio: "aspect-[4/3]";
            readonly use: "Tool browser, app gallery";
        };
    };
    readonly flexLayouts: {
        readonly horizontal: {
            readonly base: "flex items-start gap-4";
            readonly responsive: "flex flex-col sm:flex-row items-start gap-4";
            readonly wrap: "flex items-start gap-4 flex-wrap";
            readonly use: "User identity, action rows, navigation";
        };
        readonly vertical: {
            readonly base: "flex flex-col gap-3";
            readonly centered: "flex flex-col items-center gap-3";
            readonly stretched: "flex flex-col gap-3 h-full";
            readonly use: "Content stacks, form layouts, mobile-first";
        };
    };
};
export declare const responsivePatterns: {
    readonly breakpoints: {
        readonly mobile: "0px - 639px";
        readonly tablet: "640px - 1023px";
        readonly desktop: "1024px+";
    };
    readonly componentAdaptations: {
        readonly profileHeader: {
            readonly mobile: "Stack vertically, full-width actions, smaller text";
            readonly tablet: "Horizontal layout, sidebar actions, medium text";
            readonly desktop: "Full horizontal, side actions, large text";
        };
        readonly spaceCard: {
            readonly mobile: "Single column, minimal details, tap-friendly";
            readonly tablet: "Two columns, moderate details, hover states";
            readonly desktop: "Three columns, full details, rich interactions";
        };
        readonly feedPost: {
            readonly mobile: "Full width, minimal metadata, large touch targets";
            readonly tablet: "Comfortable width, sidebar actions, medium targets";
            readonly desktop: "Constrained width, hover actions, precise targets";
        };
    };
    readonly contentDensity: {
        readonly mobile: {
            readonly spacing: "Generous spacing for touch interaction";
            readonly text: "Larger text, shorter lines, clear hierarchy";
            readonly actions: "Full-width buttons, thumb-reachable areas";
        };
        readonly desktop: {
            readonly spacing: "Efficient spacing for information density";
            readonly text: "Compact text, longer lines, subtle hierarchy";
            readonly actions: "Inline actions, hover states, precise targeting";
        };
    };
};
export declare const contentOrganization: {
    readonly priorityLevels: {
        readonly primary: {
            readonly characteristics: "Essential information, always visible";
            readonly examples: "User name, space name, tool function";
            readonly styling: "Largest text, high contrast, prominent position";
        };
        readonly secondary: {
            readonly characteristics: "Important context, conditionally visible";
            readonly examples: "User handle, member count, creation date";
            readonly styling: "Medium text, medium contrast, supporting position";
        };
        readonly tertiary: {
            readonly characteristics: "Supporting details, space permitting";
            readonly examples: "Metadata, timestamps, auxiliary information";
            readonly styling: "Small text, low contrast, minimal space";
        };
    };
    readonly campusContentTypes: {
        readonly identity: {
            readonly userIdentity: readonly ["name", "handle", "avatar", "status", "role"];
            readonly spaceIdentity: readonly ["name", "category", "memberCount", "status"];
            readonly toolIdentity: readonly ["name", "creator", "type", "usageCount"];
        };
        readonly context: {
            readonly campusContext: readonly ["major", "graduationYear", "dorm", "campus"];
            readonly timeContext: readonly ["timestamp", "duration", "schedule", "deadline"];
            readonly socialContext: readonly ["connections", "popularity", "engagement"];
        };
        readonly actions: {
            readonly primary: readonly ["join", "use", "connect", "create"];
            readonly secondary: readonly ["share", "save", "follow", "customize"];
            readonly tertiary: readonly ["report", "hide", "archive", "delete"];
        };
    };
};
export declare const accessibilityPatterns: {
    readonly semanticStructure: {
        readonly headingHierarchy: "Logical h1-h6 progression within components";
        readonly landmarkRoles: "Clear navigation, main, complementary regions";
        readonly listStructure: "Proper ul/ol for grouped content";
        readonly buttonVsLink: "Actions vs navigation distinction";
    };
    readonly interactionPatterns: {
        readonly keyboardNavigation: "Tab order follows visual hierarchy";
        readonly focusManagement: "Clear focus indicators, logical flow";
        readonly touchTargets: "Minimum 44px for mobile interactions";
        readonly screenReaderSupport: "Descriptive labels, status announcements";
    };
    readonly campusAccessibility: {
        readonly inclusiveLanguage: "Student-first, role-neutral terminology";
        readonly cognitiveLoad: "Clear information hierarchy, scannable content";
        readonly visualClarity: "High contrast, readable fonts, clear spacing";
        readonly motorAccessibility: "Large touch targets, forgiving interactions";
    };
};
export declare const performancePatterns: {
    readonly loadingPriorities: {
        readonly critical: "Above-fold content, user identity, primary actions";
        readonly important: "Secondary content, social proof, contextual info";
        readonly deferred: "Tertiary details, auxiliary features, analytics";
    };
    readonly renderOptimization: {
        readonly lazyLoading: "Non-critical sections load on interaction";
        readonly virtualScrolling: "Large lists render only visible items";
        readonly imageOptimization: "Progressive loading, appropriate sizing";
        readonly bundleSplitting: "Component-level code splitting";
    };
    readonly campusOptimization: {
        readonly offlineFirst: "Core functionality works without connection";
        readonly lowBandwidth: "Efficient data usage, progressive enhancement";
        readonly batteryAware: "Minimal animations, efficient rendering";
        readonly cacheStrategy: "Aggressive caching for repeated campus usage";
    };
};
export declare const componentIASystem: {
    readonly hierarchy: {
        readonly levels: {
            readonly organism: {
                readonly description: "Complete UI sections with full functionality";
                readonly examples: "ProfileHeader, SpaceCard, FeedPost, ToolBuilder";
                readonly characteristics: readonly ["Combines multiple molecules and atoms", "Has clear business purpose", "Can function independently", "Handles own state and interactions"];
            };
            readonly molecule: {
                readonly description: "Component groups that form functional units";
                readonly examples: "UserIdentity, StatCard, ActionButtons, NavigationMenu";
                readonly characteristics: readonly ["Combines 2-5 atoms", "Has specific functional purpose", "Reusable across organisms", "Handles specific interactions"];
            };
            readonly atom: {
                readonly description: "Fundamental building blocks";
                readonly examples: "Button, Input, Avatar, Badge, Typography";
                readonly characteristics: readonly ["Cannot be broken down further", "Highly reusable", "Single responsibility", "Foundation-based styling"];
            };
        };
    };
    readonly ia: {
        readonly profileIA: {
            readonly hierarchy: readonly ["identity", "context", "content", "metrics", "actions"];
            readonly rules: {
                readonly identity: {
                    readonly priority: 1;
                    readonly position: "top-left on desktop, center on mobile";
                    readonly requirements: "Always visible, never truncated";
                    readonly components: readonly ["Avatar", "DisplayName", "Handle", "StatusIndicator"];
                };
                readonly context: {
                    readonly priority: 2;
                    readonly position: "below identity, wrappable";
                    readonly requirements: "Campus-relevant, role-appropriate";
                    readonly components: readonly ["Major", "GraduationYear", "Dorm", "RoleBadges"];
                };
                readonly content: {
                    readonly priority: 3;
                    readonly position: "main content area, expandable";
                    readonly requirements: "Readable, scannable, action-oriented";
                    readonly components: readonly ["Bio", "CompletionPrompt", "Announcements"];
                };
                readonly metrics: {
                    readonly priority: 4;
                    readonly position: "bottom section, grid layout";
                    readonly requirements: "Social proof, quick scanning";
                    readonly components: readonly ["SpaceCount", "ToolCount", "Connections", "Reputation"];
                };
                readonly actions: {
                    readonly priority: 5;
                    readonly position: "right side on desktop, bottom on mobile";
                    readonly requirements: "Clear hierarchy, accessible";
                    readonly components: readonly ["PrimaryAction", "SecondaryActions", "SettingsAction"];
                };
            };
        };
        readonly spaceIA: {
            readonly hierarchy: readonly ["identity", "status", "preview", "social", "actions"];
            readonly rules: {
                readonly identity: {
                    readonly priority: 1;
                    readonly requirements: "Space purpose immediately clear";
                    readonly components: readonly ["SpaceName", "Category", "MemberCount", "SpaceAvatar"];
                };
                readonly status: {
                    readonly priority: 2;
                    readonly requirements: "Current state and user relationship";
                    readonly components: readonly ["ActiveStatus", "MembershipStatus", "Notifications"];
                };
                readonly preview: {
                    readonly priority: 3;
                    readonly requirements: "Enticing content preview";
                    readonly components: readonly ["Description", "RecentActivity", "SpaceTools"];
                };
            };
        };
        readonly toolIA: {
            readonly hierarchy: readonly ["identity", "function", "social", "access", "actions"];
        };
        readonly feedIA: {
            readonly hierarchy: readonly ["attribution", "content", "engagement", "actions"];
        };
    };
    readonly layout: {
        readonly cardLayouts: {
            readonly compact: {
                readonly padding: "var(--hive-space-4)";
                readonly gap: "var(--hive-space-3)";
                readonly borderRadius: "var(--hive-radius-base)";
                readonly maxWidth: "320px";
                readonly minHeight: "120px";
                readonly use: "List items, preview cards, mobile-first";
            };
            readonly comfortable: {
                readonly padding: "var(--hive-space-5)";
                readonly gap: "var(--hive-space-4)";
                readonly borderRadius: "var(--hive-radius-lg)";
                readonly maxWidth: "480px";
                readonly minHeight: "200px";
                readonly use: "Primary content cards, detail views";
            };
            readonly spacious: {
                readonly padding: "var(--hive-space-6)";
                readonly gap: "var(--hive-space-5)";
                readonly borderRadius: "var(--hive-radius-lg)";
                readonly maxWidth: "640px";
                readonly minHeight: "280px";
                readonly use: "Hero cards, dashboard sections";
            };
        };
        readonly gridLayouts: {
            readonly profileStats: {
                readonly columns: "grid-cols-2 sm:grid-cols-4";
                readonly gap: "gap-3 sm:gap-4 md:gap-6";
                readonly aspectRatio: "aspect-square";
                readonly use: "Metrics, statistics, quick stats";
            };
            readonly spaceGrid: {
                readonly columns: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
                readonly gap: "gap-4 md:gap-6";
                readonly minHeight: "min-h-[200px]";
                readonly use: "Space discovery, content grids";
            };
            readonly toolGrid: {
                readonly columns: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
                readonly gap: "gap-4 lg:gap-6";
                readonly aspectRatio: "aspect-[4/3]";
                readonly use: "Tool browser, app gallery";
            };
        };
        readonly flexLayouts: {
            readonly horizontal: {
                readonly base: "flex items-start gap-4";
                readonly responsive: "flex flex-col sm:flex-row items-start gap-4";
                readonly wrap: "flex items-start gap-4 flex-wrap";
                readonly use: "User identity, action rows, navigation";
            };
            readonly vertical: {
                readonly base: "flex flex-col gap-3";
                readonly centered: "flex flex-col items-center gap-3";
                readonly stretched: "flex flex-col gap-3 h-full";
                readonly use: "Content stacks, form layouts, mobile-first";
            };
        };
    };
    readonly responsive: {
        readonly breakpoints: {
            readonly mobile: "0px - 639px";
            readonly tablet: "640px - 1023px";
            readonly desktop: "1024px+";
        };
        readonly componentAdaptations: {
            readonly profileHeader: {
                readonly mobile: "Stack vertically, full-width actions, smaller text";
                readonly tablet: "Horizontal layout, sidebar actions, medium text";
                readonly desktop: "Full horizontal, side actions, large text";
            };
            readonly spaceCard: {
                readonly mobile: "Single column, minimal details, tap-friendly";
                readonly tablet: "Two columns, moderate details, hover states";
                readonly desktop: "Three columns, full details, rich interactions";
            };
            readonly feedPost: {
                readonly mobile: "Full width, minimal metadata, large touch targets";
                readonly tablet: "Comfortable width, sidebar actions, medium targets";
                readonly desktop: "Constrained width, hover actions, precise targets";
            };
        };
        readonly contentDensity: {
            readonly mobile: {
                readonly spacing: "Generous spacing for touch interaction";
                readonly text: "Larger text, shorter lines, clear hierarchy";
                readonly actions: "Full-width buttons, thumb-reachable areas";
            };
            readonly desktop: {
                readonly spacing: "Efficient spacing for information density";
                readonly text: "Compact text, longer lines, subtle hierarchy";
                readonly actions: "Inline actions, hover states, precise targeting";
            };
        };
    };
    readonly content: {
        readonly priorityLevels: {
            readonly primary: {
                readonly characteristics: "Essential information, always visible";
                readonly examples: "User name, space name, tool function";
                readonly styling: "Largest text, high contrast, prominent position";
            };
            readonly secondary: {
                readonly characteristics: "Important context, conditionally visible";
                readonly examples: "User handle, member count, creation date";
                readonly styling: "Medium text, medium contrast, supporting position";
            };
            readonly tertiary: {
                readonly characteristics: "Supporting details, space permitting";
                readonly examples: "Metadata, timestamps, auxiliary information";
                readonly styling: "Small text, low contrast, minimal space";
            };
        };
        readonly campusContentTypes: {
            readonly identity: {
                readonly userIdentity: readonly ["name", "handle", "avatar", "status", "role"];
                readonly spaceIdentity: readonly ["name", "category", "memberCount", "status"];
                readonly toolIdentity: readonly ["name", "creator", "type", "usageCount"];
            };
            readonly context: {
                readonly campusContext: readonly ["major", "graduationYear", "dorm", "campus"];
                readonly timeContext: readonly ["timestamp", "duration", "schedule", "deadline"];
                readonly socialContext: readonly ["connections", "popularity", "engagement"];
            };
            readonly actions: {
                readonly primary: readonly ["join", "use", "connect", "create"];
                readonly secondary: readonly ["share", "save", "follow", "customize"];
                readonly tertiary: readonly ["report", "hide", "archive", "delete"];
            };
        };
    };
    readonly accessibility: {
        readonly semanticStructure: {
            readonly headingHierarchy: "Logical h1-h6 progression within components";
            readonly landmarkRoles: "Clear navigation, main, complementary regions";
            readonly listStructure: "Proper ul/ol for grouped content";
            readonly buttonVsLink: "Actions vs navigation distinction";
        };
        readonly interactionPatterns: {
            readonly keyboardNavigation: "Tab order follows visual hierarchy";
            readonly focusManagement: "Clear focus indicators, logical flow";
            readonly touchTargets: "Minimum 44px for mobile interactions";
            readonly screenReaderSupport: "Descriptive labels, status announcements";
        };
        readonly campusAccessibility: {
            readonly inclusiveLanguage: "Student-first, role-neutral terminology";
            readonly cognitiveLoad: "Clear information hierarchy, scannable content";
            readonly visualClarity: "High contrast, readable fonts, clear spacing";
            readonly motorAccessibility: "Large touch targets, forgiving interactions";
        };
    };
    readonly performance: {
        readonly loadingPriorities: {
            readonly critical: "Above-fold content, user identity, primary actions";
            readonly important: "Secondary content, social proof, contextual info";
            readonly deferred: "Tertiary details, auxiliary features, analytics";
        };
        readonly renderOptimization: {
            readonly lazyLoading: "Non-critical sections load on interaction";
            readonly virtualScrolling: "Large lists render only visible items";
            readonly imageOptimization: "Progressive loading, appropriate sizing";
            readonly bundleSplitting: "Component-level code splitting";
        };
        readonly campusOptimization: {
            readonly offlineFirst: "Core functionality works without connection";
            readonly lowBandwidth: "Efficient data usage, progressive enhancement";
            readonly batteryAware: "Minimal animations, efficient rendering";
            readonly cacheStrategy: "Aggressive caching for repeated campus usage";
        };
    };
};
export type ComponentIASystem = typeof componentIASystem;
export type IAPatterns = typeof iaPatterns;
export type LayoutComposition = typeof layoutComposition;
export type ResponsivePatterns = typeof responsivePatterns;
//# sourceMappingURL=component-ia-system.d.ts.map