export declare const designPrinciples: {
    readonly philosophy: {
        readonly title: "Empowering Individual Agency Within Community";
        readonly description: "Every design decision balances personal empowerment with community participation";
        readonly pillars: readonly ["Student-First Minimalism", "Customization Without Chaos", "Privacy Through Clarity", "Mobile-Native Thinking", "Progressive Disclosure"];
    };
    readonly values: {
        readonly "Clarity Over Decoration": {
            readonly implementation: readonly ["Generous whitespace for visual breathing", "High contrast for instant comprehension", "Minimal color palette for focus", "Typography-driven hierarchy"];
        };
        readonly "Speed Over Beauty": {
            readonly implementation: readonly ["Performance as a design feature", "Instant feedback for all interactions", "Skeleton states over loading spinners", "Optimistic UI updates"];
        };
        readonly "Flexibility Over Prescription": {
            readonly implementation: readonly ["Multiple valid ways to accomplish tasks", "User-defined workflows", "Adaptable information architecture", "Personal optimization paths"];
        };
    };
    readonly componentStandards: {
        readonly tokenUsage: {
            readonly required: "All components MUST use design tokens - never hardcoded values";
            readonly semantic: "Use semantic tokens (semantic.text.primary) over direct colors";
            readonly fallbacks: "Provide fallbacks for legacy browser support";
        };
        readonly responsiveDesign: {
            readonly approach: "Mobile-first with progressive enhancement";
            readonly breakpoints: "Use standardized breakpoint tokens only";
            readonly touchTargets: "Minimum 44px touch targets on mobile";
        };
        readonly accessibility: {
            readonly contrast: "WCAG 2.1 AA minimum (4.5:1 normal text, 3:1 large text)";
            readonly focus: "Visible focus states for all interactive elements";
            readonly motion: "Respect prefers-reduced-motion";
        };
        readonly performance: {
            readonly animations: "GPU-accelerated transforms only";
            readonly images: "Lazy loading and proper sizing";
            readonly bundleSize: "Component chunking for optimal loading";
        };
    };
    readonly prdAlignment: {
        readonly colorSystem: {
            readonly approach: "Vercel-inspired monochrome with single gold accent";
            readonly forbidden: "No hardcoded hex values in components";
            readonly tokens: "Use semantic.* tokens exclusively";
        };
        readonly typography: {
            readonly fonts: readonly ["Geist Sans (primary)", "Space Grotesk (display)", "Geist Mono (code)"];
            readonly scale: "1 base unit spacing system";
            readonly hierarchy: "Clear font-weight and size relationships";
        };
        readonly interactions: {
            readonly style: "Subtle and purposeful motion";
            readonly performance: "60fps animations minimum";
            readonly duration: "150-300ms for micro-interactions";
        };
    };
};
export declare const qualityGates: {
    readonly required: readonly ["Uses design tokens exclusively", "Passes accessibility audit", "Mobile-responsive implementation", "TypeScript strict mode compliance", "Storybook documentation"];
    readonly performance: {
        readonly maxBundleSize: "50kb gzipped per component";
        readonly animationFramerate: "60fps minimum";
        readonly timeToInteractive: "100ms maximum";
    };
    readonly consistency: {
        readonly colorTokenUsage: "100% semantic token usage";
        readonly spacingSystem: "1 base unit compliance";
        readonly borderRadius: "Apple-like generous values";
    };
};
export declare const usageGuidelines: {
    readonly developers: {
        readonly tokenUsage: "Always import tokens from @hive/tokens";
        readonly componentExtension: "Extend atomic components, don't recreate";
        readonly naming: "Follow HIVE component naming conventions";
        readonly testing: "Include accessibility and visual regression tests";
    };
    readonly designers: {
        readonly tokenSystem: "Design using tokens in Figma";
        readonly consistency: "Audit designs against component library";
        readonly responsive: "Design mobile-first, enhance for desktop";
        readonly accessibility: "Consider screen readers and keyboard navigation";
    };
};
export type DesignPrinciple = keyof typeof designPrinciples;
export type QualityGate = keyof typeof qualityGates;
export type UsageGuideline = keyof typeof usageGuidelines;
//# sourceMappingURL=design-principles.d.ts.map