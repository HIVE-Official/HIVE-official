/**
 * HIVE Color Composition System - PRODUCTION READY
 * Organizes existing comprehensive color system into campus social patterns
 *
 * Built on existing robust color tokens - like HIVE's version of Vercel's system
 * Accessibility-first with WCAG AA+ compliance and dark mode optimization
 *
 * Status: ✅ PRODUCTION READY
 * Version: v1.0.0
 * Date: August 26, 2025
 */
// === COLOR PHILOSOPHY ===
export const colorPrinciples = {
    philosophy: "Systematic organization of HIVE's comprehensive color system for campus social utility",
    rules: [
        "Build on existing: Organize robust color tokens already built in design-tokens.css",
        "Campus social utility: Colors communicate community function and status instantly",
        "Dark mode optimized: Extended study session eye comfort built-in",
        "Accessibility-first: WCAG AA+ compliance already achieved"
    ]
};
// === EXISTING COLOR SYSTEM ORGANIZATION ===
export const hiveColors = {
    // Brand Expression (Already built)
    brand: {
        gold: {
            primary: 'var(--hive-gold-primary)',
            hover: 'var(--hive-gold-hover)',
            background: 'var(--hive-gold-background)',
            border: 'var(--hive-gold-border)',
            use: '@mentions, premium features, primary CTA'
        }
    },
    // Platform Foundation (Already built)
    surface: {
        primary: 'var(--hive-bg-primary)', // #0A0A0B
        secondary: 'var(--hive-bg-secondary)', // #111113  
        tertiary: 'var(--hive-bg-tertiary)', // #1A1A1C
        interactive: 'var(--hive-bg-interactive)', // #222225
        use: 'Card elevation, surface hierarchy'
    },
    // Text Hierarchy (Already built - WCAG AA+)
    text: {
        primary: 'var(--hive-text-primary)', // #E5E5E7 - 7:1 contrast
        secondary: 'var(--hive-text-secondary)', // #C1C1C4 - 4.5:1 contrast
        muted: 'var(--hive-text-muted)', // #9B9B9F - 3:1 contrast
        placeholder: 'var(--hive-text-placeholder)', // #6B6B70
        use: 'Content hierarchy, accessibility compliant'
    },
    // Semantic System (Already built)
    semantic: {
        success: 'var(--hive-success-primary)', // #10B981
        warning: 'var(--hive-warning-primary)', // #F59E0B  
        error: 'var(--hive-error-primary)', // #EF4444
        info: 'var(--hive-info-primary)', // #3B82F6
        use: 'Status communication, space categories'
    },
    // Border System (Already built)
    border: {
        primary: 'var(--hive-border-primary)', // #2A2A2D
        subtle: 'var(--hive-border-subtle)', // rgba(255,255,255,0.05)
        glass: 'var(--hive-border-glass)', // rgba(255,255,255,0.08)  
        use: 'Card borders, glassmorphism effects'
    }
};
// === CAMPUS USAGE PATTERNS ===
export const campusPatterns = {
    // User Identity
    user: {
        mention: hiveColors.brand.gold.primary, // @username highlighting
        online: hiveColors.semantic.success, // ● Online status
        away: hiveColors.semantic.warning, // ○ Away status  
        offline: hiveColors.text.muted, // ○ Offline status
        use: 'User presence, mentions, identity'
    },
    // Space Categories (Already built in semantic system)
    space: {
        academic: hiveColors.semantic.info, // #spacename, academic spaces
        social: hiveColors.brand.gold.primary, // Social/community spaces
        tools: hiveColors.semantic.success, // Builder/maker spaces
        joined: hiveColors.semantic.success, // User is member
        pending: hiveColors.semantic.warning, // Pending membership
        use: 'Space categorization, membership status'
    },
    // Tool Status
    tool: {
        active: hiveColors.semantic.success, // Tool running
        shared: hiveColors.brand.gold.primary, // Shared with community  
        personal: hiveColors.semantic.info, // Private tool
        broken: hiveColors.semantic.error, // Tool has issues
        use: 'Tool state communication'
    },
    // Content Engagement  
    engagement: {
        liked: hiveColors.semantic.success, // User liked content
        default: hiveColors.text.secondary, // Default engagement state
        urgent: hiveColors.semantic.error, // Urgent notifications
        info: hiveColors.semantic.info, // General information
        use: 'Social engagement, notifications'
    }
};
// === COMPREHENSIVE SYSTEM EXPORT ===
export const colorComposition = {
    // Core system organization  
    system: hiveColors,
    // Campus application patterns
    campus: campusPatterns,
    // Usage philosophy
    principles: colorPrinciples
};
//# sourceMappingURL=color-composition.js.map