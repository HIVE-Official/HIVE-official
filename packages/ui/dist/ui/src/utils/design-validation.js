/**
 * HIVE Design System Validation Utilities
 * Tools to ensure components comply with HIVE design standards
 */
import { HIVE_MOTION_CURVE_CSS } from './hive-motion';
// HIVE Brand Colors
export const HIVE_COLORS = {
    // Core palette
    primaryBlack: 'var(--hive-background-primary)',
    surface: 'var(--hive-background-secondary)',
    border: 'var(--hive-gray-700)',
    mutedText: '#6B7280',
    goldAccent: 'var(--hive-gold)',
    white: '#FFFFFF',
    // Semantic colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
};
// Touch target minimums (in pixels)
export const TOUCH_TARGETS = {
    minimum: 44,
    comfortable: 48,
    large: 52,
};
// Collection of HIVE design validation rules
export const hiveDesignRules = [
    {
        name: 'Motion Curve Compliance',
        description: 'All transitions should use the HIVE motion curve',
        check: (element) => {
            const computedStyle = window.getComputedStyle(element);
            const transition = computedStyle.transition;
            return transition.includes(HIVE_MOTION_CURVE_CSS) || transition === 'none';
        },
        severity: 'warning',
        fix: `Use: transition: all 180ms ${HIVE_MOTION_CURVE_CSS}`,
    },
    {
        name: 'Touch Target Size',
        description: 'Interactive elements should be at least 44px in both dimensions',
        check: (element) => {
            if (!isInteractiveElement(element))
                return true;
            const rect = element.getBoundingClientRect();
            return rect.width >= TOUCH_TARGETS.minimum && rect.height >= TOUCH_TARGETS.minimum;
        },
        severity: 'error',
        fix: 'Ensure minimum 44px width and height for interactive elements',
    },
    {
        name: 'Gold Accent Usage',
        description: 'Gold should only be used for focus rings, achievements, and special moments',
        check: (element) => {
            const computedStyle = window.getComputedStyle(element);
            const hasGold = [
                computedStyle.backgroundColor,
                computedStyle.borderColor,
                computedStyle.color,
            ].some(color => color.toLowerCase().includes('var(--hive-gold)') || color.toLowerCase().includes('gold'));
            if (!hasGold)
                return true;
            // Allow gold for focus rings
            if (element.matches(':focus') || element.classList.contains('focus'))
                return true;
            // Allow gold for achievement badges
            if (element.classList.contains('badge') || element.classList.contains('achievement'))
                return true;
            // Allow gold for ritual buttons (special case)
            if (element.classList.contains('ritual-button'))
                return true;
            return false;
        },
        severity: 'warning',
        fix: 'Use gold only for focus rings, achievements, or ritual buttons',
    },
    {
        name: 'HIVE Color Palette',
        description: 'Components should use HIVE brand colors',
        check: (element) => {
            const computedStyle = window.getComputedStyle(element);
            const backgroundColor = computedStyle.backgroundColor;
            // Skip transparent and inherit values
            if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent')
                return true;
            // Check if background uses HIVE colors or CSS custom properties
            return backgroundColor.includes('var(--') || Object.values(HIVE_COLORS).some(color => backgroundColor.toLowerCase().includes(color.toLowerCase()));
        },
        severity: 'info',
        fix: 'Use HIVE design tokens: var(--hive-background-primary), etc.',
    },
    {
        name: 'Focus Visibility',
        description: 'Interactive elements should have visible focus states',
        check: (element) => {
            if (!isInteractiveElement(element))
                return true;
            // Temporarily focus the element to check focus styles
            const originalOutline = element.style.outline;
            element.focus();
            const focusedStyle = window.getComputedStyle(element);
            element.blur();
            element.style.outline = originalOutline;
            return focusedStyle.outline !== 'none' ||
                focusedStyle.boxShadow.includes('focus') ||
                element.classList.contains('focus-visible');
        },
        severity: 'error',
        fix: 'Add focus:ring-2 focus:ring-[var(--hive-gold)] focus:ring-offset-2 classes',
    },
];
// Helper function to check if element is interactive
function isInteractiveElement(element) {
    const interactiveTags = ['button', 'a', 'input', 'select', 'textarea'];
    const hasTabIndex = element.hasAttribute('tabindex') && element.getAttribute('tabindex') !== '-1';
    const hasClickHandler = element.onclick !== null || element.addEventListener;
    return interactiveTags.includes(element.tagName.toLowerCase()) ||
        hasTabIndex ||
        element.hasAttribute('role') && ['button', 'link', 'tab'].includes(element.getAttribute('role'));
}
// Validation function for a single element
export function validateElement(element) {
    return hiveDesignRules.map(rule => ({
        rule: rule.name,
        description: rule.description,
        passed: rule.check(element),
        severity: rule.severity,
        fix: rule.fix,
        element: element.tagName.toLowerCase() + (element.className ? `.${element.className.split(' ').join('.')}` : ''),
    }));
}
// Validation function for entire page
export function validatePage() {
    const allElements = Array.from(document.querySelectorAll('*'));
    const results = [];
    allElements.forEach(element => {
        const elementResults = validateElement(element);
        results.push(...elementResults.filter(result => !result.passed));
    });
    // Group results by rule
    const groupedResults = results.reduce((acc, result) => {
        if (!acc[result.rule]) {
            acc[result.rule] = [];
        }
        acc[result.rule].push(result);
        return acc;
    }, {});
    return {
        totalElements: allElements.length,
        totalIssues: results.length,
        errors: results.filter(r => r.severity === 'error').length,
        warnings: results.filter(r => r.severity === 'warning').length,
        infos: results.filter(r => r.severity === 'info').length,
        results: groupedResults,
        compliance: ((allElements.length - results.length) / allElements.length) * 100,
    };
}
// Component-specific validation
export function validateComponent(componentName) {
    const elements = Array.from(document.querySelectorAll(`[data-component="${componentName}"]`));
    const results = [];
    elements.forEach(element => {
        const elementResults = validateElement(element);
        results.push(...elementResults.filter(result => !result.passed));
    });
    return results;
}
// Console reporting utilities
export function reportValidationResults(report) {
    console.group('🎨 HIVE Design System Validation Report');
    console.log(`📊 Compliance Score: ${report.compliance.toFixed(1)}%`);
    console.log(`🔍 Total Elements: ${report.totalElements}`);
    console.log(`⚠️  Total Issues: ${report.totalIssues}`);
    if (report.errors > 0) {
        console.log(`❌ Errors: ${report.errors}`);
    }
    if (report.warnings > 0) {
        console.log(`⚠️  Warnings: ${report.warnings}`);
    }
    if (report.infos > 0) {
        console.log(`ℹ️  Info: ${report.infos}`);
    }
    // Report issues by rule
    Object.entries(report.results).forEach(([rule, results]) => {
        console.group(`${getSeverityIcon(results[0].severity)} ${rule} (${results.length} issues)`);
        results.slice(0, 5).forEach(result => {
            console.log(`  ${result.element}: ${result.description}`);
            if (result.fix) {
                console.log(`  💡 Fix: ${result.fix}`);
            }
        });
        if (results.length > 5) {
            console.log(`  ... and ${results.length - 5} more`);
        }
        console.groupEnd();
    });
    console.groupEnd();
}
function getSeverityIcon(severity) {
    switch (severity) {
        case 'error': return '❌';
        case 'warning': return '⚠️';
        case 'info': return 'ℹ️';
    }
}
// Development helper for continuous validation
export function enableContinuousValidation() {
    if (process.env.NODE_ENV !== 'development')
        return;
    let validationTimeout;
    const runValidation = () => {
        clearTimeout(validationTimeout);
        validationTimeout = setTimeout(() => {
            const report = validatePage();
            if (report.totalIssues > 0) {
                reportValidationResults(report);
            }
        }, 1000);
    };
    // Run validation on DOM changes
    const observer = new MutationObserver(runValidation);
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style'],
    });
    // Initial validation
    runValidation();
    console.log('🎨 HIVE Design System continuous validation enabled');
}
// Export validation utilities
export const designValidation = {
    validateElement,
    validatePage,
    validateComponent,
    reportValidationResults,
    enableContinuousValidation,
    rules: hiveDesignRules,
    colors: HIVE_COLORS,
    touchTargets: TOUCH_TARGETS,
};
//# sourceMappingURL=design-validation.js.map