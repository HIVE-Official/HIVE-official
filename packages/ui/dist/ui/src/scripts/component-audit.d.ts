#!/usr/bin/env tsx
/**
 * HIVE Component Auditing System
 *
 * Comprehensive automated auditing for HIVE Design System components
 * ensuring compliance with:
 * - Semantic token usage (zero hardcoded values)
 * - Accessibility standards (WCAG 2.1 AA)
 * - Design system consistency
 * - Motion system integration
 * - TypeScript type safety
 * - Story coverage completeness
 */
interface ComponentAuditResult {
    componentPath: string;
    componentName: string;
    atomicLevel: 'atom' | 'molecule' | 'organism' | 'template' | 'page';
    issues: ComponentIssue[];
    score: number;
    compliance: {
        semanticTokens: boolean;
        accessibility: boolean;
        designSystem: boolean;
        motionSystem: boolean;
        typeScript: boolean;
        storyCoverage: boolean;
    };
}
interface ComponentIssue {
    type: 'error' | 'warning' | 'info';
    category: 'tokens' | 'accessibility' | 'design' | 'motion' | 'types' | 'stories';
    message: string;
    line?: number;
    suggestion?: string;
}
interface AuditSummary {
    totalComponents: number;
    auditedComponents: number;
    averageScore: number;
    issueBreakdown: Record<ComponentIssue['category'], number>;
    complianceStats: {
        semanticTokens: number;
        accessibility: number;
        designSystem: number;
        motionSystem: number;
        typeScript: number;
        storyCoverage: number;
    };
}
declare class HiveComponentAuditor {
    private rootPath;
    private results;
    private readonly hardcodedValuePatterns;
    private readonly accessibilityPatterns;
    private readonly motionPatterns;
    constructor(rootPath?: string);
    auditAllComponents(): Promise<AuditSummary>;
    private findComponentFiles;
    private auditComponent;
    private auditSemanticTokens;
    private auditAccessibility;
    private auditDesignSystem;
    private auditMotionSystem;
    private auditTypeScript;
    private auditStoryCoverage;
    private determineAtomicLevel;
    private calculateCompliance;
    private calculateScore;
    private generateSummary;
    private logComponentResult;
    private logSummary;
    private writeReport;
    private generateRecommendations;
}
export { HiveComponentAuditor, ComponentAuditResult, AuditSummary };
//# sourceMappingURL=component-audit.d.ts.map