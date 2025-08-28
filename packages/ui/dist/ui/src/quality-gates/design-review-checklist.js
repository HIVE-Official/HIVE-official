/**
 * HIVE Design Quality Gates
 *
 * Every component must pass these checks before merge.
 * Ensures human-centered design over AI-generated patterns.
 */
export const designQualityGates = [
    {
        category: "Visual Treatment",
        checks: [
            {
                rule: "Purposeful Corner Radius",
                description: "Corners serve functional meaning, not decoration",
                examples: {
                    good: "rounded-lg for content cards, rounded-md for buttons, rounded-full for avatars only",
                    bad: "rounded-3xl everywhere, rounded-2xl by default"
                }
            },
            {
                rule: "Functional Shadows",
                description: "Shadows indicate hierarchy and depth, not decoration",
                examples: {
                    good: "shadow-subtle for cards, shadow-floating for dropdowns, shadow-modal for modals",
                    bad: "shadow-2xl everywhere, shadow-xl by default, hover:shadow-lg"
                }
            },
            {
                rule: "Selective Animation",
                description: "Animate state changes and entrances only, not hover states",
                examples: {
                    good: "hover:bg-gray-800 (instant), animate-in fade-in (entrance)",
                    bad: "transition-all duration-300, hover:scale-[1.02], transition-colors duration-200"
                }
            },
            {
                rule: "Functional Color",
                description: "Color communicates function and state, not decoration",
                examples: {
                    good: "bg-gray-900 (neutral), text-amber-400 (interactive), border-red-500 (error)",
                    bad: "bg-gradient-to-r from-blue-500/10 to-purple-500/10, decorative gradients"
                }
            }
        ]
    },
    {
        category: "Information Architecture",
        checks: [
            {
                rule: "Clear Visual Hierarchy",
                description: "Information priority matches student mental models",
                examples: {
                    good: "Primary content 18px semibold, secondary 14px normal, metadata 12px uppercase",
                    bad: "All text same size, no clear hierarchy, decoration over function"
                }
            },
            {
                rule: "Content-Driven Layout",
                description: "Layout follows content needs, not rigid grids",
                examples: {
                    good: "space-y-8 for sections, space-y-3 for related items, asymmetric layouts",
                    bad: "grid-cols-3 gap-4 everywhere, perfect symmetry, rigid templates"
                }
            },
            {
                rule: "Campus Context Integration",
                description: "Components consider UB student usage patterns",
                examples: {
                    good: "min-h-12 touch targets, thumb-reachable actions, quick-scan typography",
                    bad: "Small touch targets, complex interactions, hard to use while walking"
                }
            }
        ]
    },
    {
        category: "Interaction Patterns",
        checks: [
            {
                rule: "Immediate Feedback",
                description: "Interactive elements respond instantly to user actions",
                examples: {
                    good: "hover:bg-gray-800 (instant color change), active:bg-gray-700",
                    bad: "transition-all duration-300 hover:scale-[1.02] (floaty, delayed)"
                }
            },
            {
                rule: "Natural Flow",
                description: "Interactions follow student expectations and campus patterns",
                examples: {
                    good: "One-tap space join, thumb-friendly navigation, walking-optimized",
                    bad: "Complex multi-step flows, precise gestures required, desktop-first"
                }
            },
            {
                rule: "Error Prevention",
                description: "Hard to use incorrectly, clear states and feedback",
                examples: {
                    good: "Disabled states clear, loading states obvious, success feedback immediate",
                    bad: "Unclear button states, no loading feedback, confusing error messages"
                }
            }
        ]
    },
    {
        category: "Mobile Optimization",
        checks: [
            {
                rule: "Touch-Friendly Targets",
                description: "Minimum 44px tap areas, thumb-reachable placement",
                examples: {
                    good: "min-h-12 px-4, bottom-4 right-4 placement, large touch areas",
                    bad: "Small buttons, precise tap required, hard to reach while walking"
                }
            },
            {
                rule: "Walking-Optimized",
                description: "Usable while students walk between classes",
                examples: {
                    good: "18px font size, high contrast, simple gestures, quick actions",
                    bad: "Small text, low contrast, complex interactions, requires focus"
                }
            },
            {
                rule: "Campus WiFi Performance",
                description: "Works well on slower campus networks",
                examples: {
                    good: "Lazy loading, progressive images, minimal bundles, instant feedback",
                    bad: "Heavy animations, large images, complex transitions, slow loading"
                }
            }
        ]
    },
    {
        category: "Accessibility",
        checks: [
            {
                rule: "Keyboard Navigation",
                description: "Full keyboard accessibility with clear focus states",
                examples: {
                    good: "focus-visible:ring-2 focus-visible:ring-amber-400, tab order logical",
                    bad: "No focus states, skip links missing, poor tab order"
                }
            },
            {
                rule: "Screen Reader Support",
                description: "Proper ARIA labels and semantic HTML",
                examples: {
                    good: "aria-label, role attributes, semantic headings hierarchy",
                    bad: "Missing ARIA, generic div elements, unclear labels"
                }
            },
            {
                rule: "Contrast Requirements",
                description: "4.5:1 minimum contrast for campus outdoor usage",
                examples: {
                    good: "White text on dark bg, amber-400 on dark bg, high contrast",
                    bad: "Low contrast text, gray on gray, hard to read outdoors"
                }
            }
        ]
    }
];
// Component-specific quality gates
export const componentQualityGates = {
    Button: [
        "Must not use transition-all or hover scaling",
        "Corner radius should be rounded-md (6px) maximum",
        "No shadows on buttons - use border/background changes only",
        "Touch targets minimum 44px (h-11 or larger)",
        "Instant hover feedback, no animation delays"
    ],
    Card: [
        "Maximum rounded-lg (8px) corner radius",
        "Shadow only for functional hierarchy (subtle/floating/modal)",
        "No hover shadow effects or scaling",
        "Content-driven padding, not uniform spacing",
        "Background colors functional, not decorative"
    ],
    Modal: [
        "Maximum rounded-lg corner radius, never rounded-3xl",
        "Shadow-modal only for overlays, not decoration",
        "Entrance animation only (fade-in), no hover effects",
        "Mobile-first sizing, works on small screens",
        "Clear close action, keyboard accessible"
    ],
    Input: [
        "Focus states with functional colors (amber-400)",
        "No transition-all, instant focus feedback only",
        "Corner radius rounded-md maximum",
        "Clear error/success states with colors",
        "Proper label association and ARIA"
    ],
    SpaceCard: [
        "Content-driven layout, not template-based",
        "Information hierarchy matches student priorities",
        "Campus context (location, activity, member count)",
        "One-tap actions (join, view), thumb-friendly",
        "Real UB content examples, not generic placeholders"
    ]
};
// Automated checking functions
export function checkAIPatterns(componentCode) {
    const violations = [];
    // Check for AI corner radius patterns
    if (componentCode.includes('rounded-3xl') || componentCode.includes('rounded-2xl')) {
        violations.push("AI Pattern: Excessive corner rounding (rounded-2xl/3xl)");
    }
    // Check for AI shadow patterns  
    if (componentCode.includes('shadow-2xl') || componentCode.includes('shadow-xl')) {
        violations.push("AI Pattern: Dramatic shadows (shadow-xl/2xl)");
    }
    // Check for AI animation patterns
    if (componentCode.includes('transition-all duration-')) {
        violations.push("AI Pattern: Animation noise (transition-all duration-*)");
    }
    // Check for AI scaling effects
    if (componentCode.includes('hover:scale-[1.0') || componentCode.includes('hover:scale-105')) {
        violations.push("AI Pattern: Hover scaling effects");
    }
    // Check for AI grid patterns
    if (componentCode.includes('grid-cols-3 gap-4') && componentCode.includes('items-center justify-center')) {
        violations.push("AI Pattern: Generic grid layout with center alignment");
    }
    // Check for decorative gradients
    if (componentCode.includes('bg-gradient-to-r from-') && componentCode.includes('/10')) {
        violations.push("AI Pattern: Decorative gradients with low opacity");
    }
    return violations;
}
export function checkMobileOptimization(componentCode) {
    const violations = [];
    // Check for minimum touch targets
    if (!componentCode.includes('h-11') && !componentCode.includes('h-12') &&
        !componentCode.includes('min-h-11') && !componentCode.includes('min-h-12') &&
        componentCode.includes('Button')) {
        violations.push("Mobile: Button touch targets may be too small (need min 44px)");
    }
    // Check for thumb-friendly positioning
    if (componentCode.includes('fixed') && !componentCode.includes('bottom-')) {
        violations.push("Mobile: Fixed elements should use bottom positioning for thumb reach");
    }
    return violations;
}
// Usage example for component reviews
export const exampleUsage = `
import { checkAIPatterns, checkMobileOptimization, componentQualityGates } from './design-review-checklist';

// Before merging any component
const componentCode = readFileSync('./Button.tsx', 'utf8');
const aiViolations = checkAIPatterns(componentCode);
const mobileViolations = checkMobileOptimization(componentCode);
const qualityGates = componentQualityGates.Button;

if (aiViolations.length > 0) {
  console.error('AI Pattern violations:', aiViolations);
}

if (mobileViolations.length > 0) {
  console.error('Mobile optimization violations:', mobileViolations);  
}

console.log('Quality gates to check:', qualityGates);
`;
//# sourceMappingURL=design-review-checklist.js.map