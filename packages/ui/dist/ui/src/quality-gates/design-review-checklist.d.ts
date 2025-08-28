/**
 * HIVE Design Quality Gates
 *
 * Every component must pass these checks before merge.
 * Ensures human-centered design over AI-generated patterns.
 */
export interface DesignQualityGate {
    category: string;
    checks: QualityCheck[];
}
export interface QualityCheck {
    rule: string;
    description: string;
    examples: {
        good: string;
        bad: string;
    };
}
export declare const designQualityGates: DesignQualityGate[];
export declare const componentQualityGates: {
    readonly Button: readonly ["Must not use transition-all or hover scaling", "Corner radius should be rounded-md (6px) maximum", "No shadows on buttons - use border/background changes only", "Touch targets minimum 44px (h-11 or larger)", "Instant hover feedback, no animation delays"];
    readonly Card: readonly ["Maximum rounded-lg (8px) corner radius", "Shadow only for functional hierarchy (subtle/floating/modal)", "No hover shadow effects or scaling", "Content-driven padding, not uniform spacing", "Background colors functional, not decorative"];
    readonly Modal: readonly ["Maximum rounded-lg corner radius, never rounded-3xl", "Shadow-modal only for overlays, not decoration", "Entrance animation only (fade-in), no hover effects", "Mobile-first sizing, works on small screens", "Clear close action, keyboard accessible"];
    readonly Input: readonly ["Focus states with functional colors (amber-400)", "No transition-all, instant focus feedback only", "Corner radius rounded-md maximum", "Clear error/success states with colors", "Proper label association and ARIA"];
    readonly SpaceCard: readonly ["Content-driven layout, not template-based", "Information hierarchy matches student priorities", "Campus context (location, activity, member count)", "One-tap actions (join, view), thumb-friendly", "Real UB content examples, not generic placeholders"];
};
export declare function checkAIPatterns(componentCode: string): string[];
export declare function checkMobileOptimization(componentCode: string): string[];
export declare const exampleUsage = "\nimport { checkAIPatterns, checkMobileOptimization, componentQualityGates } from './design-review-checklist';\n\n// Before merging any component\nconst componentCode = readFileSync('./Button.tsx', 'utf8');\nconst aiViolations = checkAIPatterns(componentCode);\nconst mobileViolations = checkMobileOptimization(componentCode);\nconst qualityGates = componentQualityGates.Button;\n\nif (aiViolations.length > 0) {\n  console.error('AI Pattern violations:', aiViolations);\n}\n\nif (mobileViolations.length > 0) {\n  console.error('Mobile optimization violations:', mobileViolations);  \n}\n\nconsole.log('Quality gates to check:', qualityGates);\n";
//# sourceMappingURL=design-review-checklist.d.ts.map