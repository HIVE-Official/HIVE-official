/**
 * HIVE Accessibility Foundation System
 * Centralized accessibility utilities for WCAG 2.1 AA compliance
 * University platform accessibility requirements
 */
import { cva } from 'class-variance-authority';
// ARIA Patterns for University Social Platform
export const ariaPatterns = {
    // Navigation patterns
    navigation: {
        main: 'main',
        nav: 'navigation',
        banner: 'banner',
        contentinfo: 'contentinfo',
        search: 'search',
    },
    // Interactive patterns  
    interactive: {
        button: 'button',
        link: 'link',
        tab: 'tab',
        tabpanel: 'tabpanel',
        tablist: 'tablist',
        menuitem: 'menuitem',
        menu: 'menu',
        menubar: 'menubar',
    },
    // Content patterns
    content: {
        article: 'article',
        section: 'region',
        heading: 'heading',
        list: 'list',
        listitem: 'listitem',
        grid: 'grid',
        gridcell: 'gridcell',
    },
    // Form patterns
    form: {
        form: 'form',
        textbox: 'textbox',
        combobox: 'combobox',
        checkbox: 'checkbox',
        radio: 'radio',
        radiogroup: 'radiogroup',
        slider: 'slider',
    },
    // Modal/Dialog patterns
    modal: {
        dialog: 'dialog',
        alertdialog: 'alertdialog',
        tooltip: 'tooltip',
        alert: 'alert',
        status: 'status',
    },
};
// Focus Management System
export const focusStyles = cva('', {
    variants: {
        type: {
            // Standard focus ring
            default: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-primary)]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-primary)]',
            // High contrast focus
            strong: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-primary)]',
            // Subtle focus for cards/containers
            subtle: 'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--hive-border-primary)] focus-visible:ring-offset-1',
            // Skip links and screen reader focus
            skipLink: 'focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--hive-background-primary)] focus:text-[var(--hive-text-primary)] focus:border focus:border-[var(--hive-brand-primary)] focus:rounded-md',
        },
    },
    defaultVariants: {
        type: 'default',
    },
});
// Screen Reader Utilities
export const screenReader = {
    // Hide visually but keep for screen readers
    only: 'sr-only',
    // Show only when focused (skip links)
    focusable: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--hive-background-primary)] focus:text-[var(--hive-text-primary)]',
    // Live regions for dynamic content
    liveRegion: 'sr-only',
    livePoliteness: {
        polite: 'sr-only [&[aria-live="polite"]]:not-sr-only',
        assertive: 'sr-only [&[aria-live="assertive"]]:not-sr-only',
    },
};
// High Contrast Support
export const highContrast = {
    // Enhanced borders for high contrast mode
    border: 'contrast-more:border-2 contrast-more:border-current',
    // Enhanced text contrast
    text: 'contrast-more:font-semibold',
    // Enhanced backgrounds
    background: 'contrast-more:bg-[var(--hive-background-primary)] contrast-more:text-[var(--hive-text-primary)]',
};
// Reduced Motion Support
export const reducedMotion = {
    // Safe animations that respect motion preferences
    safe: 'motion-safe:transition-all motion-safe:duration-300',
    // Transform animations
    transform: 'motion-safe:transform motion-safe:transition-transform',
    // Disable problematic animations
    disable: 'motion-reduce:transition-none motion-reduce:transform-none',
};
// Color Contrast Utilities
export const colorContrast = {
    // Text contrast ratios (WCAG AA minimum 4.5:1)
    textOnLight: 'text-gray-900', // ~15:1 ratio
    textOnDark: 'text-white', // ~21:1 ratio
    // Interactive contrast (WCAG AA minimum 3:1)
    interactive: 'text-[var(--hive-brand-primary)]', // Verified contrast
    // Status colors with sufficient contrast
    success: 'text-green-700 dark:text-green-300',
    warning: 'text-amber-700 dark:text-amber-300',
    error: 'text-red-700 dark:text-red-300',
    info: 'text-blue-700 dark:text-blue-300',
};
// University-Specific Accessibility Patterns
export const universityA11y = {
    // Academic content structure
    academicContent: {
        courseTitle: 'role="heading" aria-level="2"',
        assignment: 'role="article" aria-labelledby',
        grade: 'role="status" aria-live="polite"',
        deadline: 'role="timer" aria-label',
    },
    // Campus navigation
    campusNav: {
        building: 'role="button" aria-expanded aria-controls',
        floor: 'role="option" aria-selected',
        room: 'role="link" aria-describedby',
    },
    // Social features
    social: {
        post: 'role="article" aria-labelledby',
        comment: 'role="comment" aria-label',
        reaction: 'role="button" aria-pressed aria-label',
        share: 'role="button" aria-haspopup="menu"',
    },
};
/**
 * Get standard accessibility props for interactive elements
 */
export function getInteractiveA11yProps(type, label) {
    const baseProps = {
        role: ariaPatterns.interactive[type],
        className: focusStyles({ type: 'default' }),
    };
    if (label) {
        return {
            ...baseProps,
            'aria-label': label,
        };
    }
    return baseProps;
}
/**
 * Get form accessibility props
 */
export function getFormA11yProps(id, label, description, error, required) {
    const props = {
        id,
        'aria-label': label,
        className: focusStyles({ type: 'default' }),
    };
    if (description) {
        props['aria-describedby'] = `${id}-description`;
    }
    if (error) {
        props['aria-invalid'] = 'true';
        props['aria-describedby'] = `${id}-error`;
    }
    if (required) {
        props['aria-required'] = 'true';
    }
    return props;
}
/**
 * Get live region props for dynamic content
 */
export function getLiveRegionProps(politeness = 'polite') {
    return {
        'aria-live': politeness,
        'aria-atomic': 'true',
        className: screenReader.liveRegion,
    };
}
/**
 * Get modal accessibility props
 */
export function getModalA11yProps(titleId, descriptionId) {
    const props = {
        role: 'dialog',
        'aria-modal': 'true',
        'aria-labelledby': titleId,
        className: focusStyles({ type: 'default' }),
    };
    if (descriptionId) {
        return {
            ...props,
            'aria-describedby': descriptionId,
        };
    }
    return props;
}
/**
 * Generate skip link for keyboard navigation
 */
export function createSkipLink(target, label) {
    return {
        href: `#${target}`,
        className: focusStyles({ type: 'skipLink' }),
        children: label,
    };
}
//# sourceMappingURL=accessibility-foundation.js.map