export declare const designSystemGovernance: {
    readonly componentStandards: {
        readonly required: {
            readonly tokenUsage: "MUST use design tokens exclusively - zero hardcoded values";
            readonly responsiveDesign: "MUST support mobile-first responsive design";
            readonly accessibility: "MUST pass WCAG 2.1 AA compliance";
            readonly typescript: "MUST include comprehensive TypeScript types";
            readonly testing: "MUST include unit tests and Storybook documentation";
            readonly motion: "MUST respect prefers-reduced-motion setting";
        };
        readonly recommended: {
            readonly composition: "SHOULD extend atomic components vs creating new ones";
            readonly variants: "SHOULD use CVA for consistent variant patterns";
            readonly performance: "SHOULD optimize for 60fps animations";
            readonly documentation: "SHOULD include JSDoc comments for complex logic";
        };
        readonly forbidden: {
            readonly hardcodedValues: "NEVER use hardcoded colors, spacing, or typography";
            readonly inlineStyles: "NEVER use inline styles - use className with tokens";
            readonly directTailwind: "AVOID arbitrary Tailwind values - use semantic tokens";
            readonly redundantComponents: "AVOID creating duplicates of existing atomic components";
        };
    };
    readonly tokenGovernance: {
        readonly creation: {
            readonly approval: "New tokens require design system team approval";
            readonly semantic: "Always create semantic tokens, not direct color references";
            readonly backwards: "Maintain backwards compatibility during token updates";
            readonly documentation: "Document token purpose and usage examples";
        };
        readonly usage: {
            readonly priority: "Use semantic.* tokens > direct color tokens > never hardcode";
            readonly naming: "Follow hive-* naming convention for CSS custom properties";
            readonly fallbacks: "Provide fallbacks for older browser support";
        };
        readonly deprecation: {
            readonly process: "6-week deprecation notice before token removal";
            readonly migration: "Provide automated codemods where possible";
            readonly communication: "Announce changes in design system changelog";
        };
    };
    readonly qualityGates: {
        readonly automated: {
            readonly linting: "ESLint + Prettier + TypeScript strict mode";
            readonly testing: "Unit tests + visual regression + accessibility audit";
            readonly performance: "Bundle size analysis + animation frame rate testing";
            readonly tokenUsage: "Automated detection of hardcoded values";
        };
        readonly manual: {
            readonly designReview: "Design system team review for new components";
            readonly codeReview: "Engineering team review for implementation quality";
            readonly accessibilityTest: "Manual screen reader and keyboard navigation testing";
            readonly crossBrowser: "Testing across Chrome, Firefox, Safari, Edge";
        };
        readonly thresholds: {
            readonly codeCoverage: "80% minimum test coverage";
            readonly bundleSize: "50kb gzipped maximum per component";
            readonly accessibilityScore: "100% WCAG 2.1 AA compliance";
            readonly performanceScore: "60fps animation frame rate minimum";
        };
    };
    readonly reviewProcess: {
        readonly newComponent: {
            readonly step1: "RFC (Request for Comments) with use case justification";
            readonly step2: "Design review against atomic design hierarchy";
            readonly step3: "Implementation review focusing on token usage and accessibility";
            readonly step4: "QA testing including visual regression and performance";
            readonly step5: "Documentation review and Storybook story creation";
            readonly step6: "Release with changelog and migration guide if needed";
        };
        readonly componentUpdate: {
            readonly minor: "Bug fixes and non-breaking improvements - peer review only";
            readonly major: "Breaking changes or new variants - full review process";
            readonly token: "Token updates - design system team approval required";
        };
    };
    readonly maintenance: {
        readonly regular: {
            readonly frequency: "Monthly design system health audit";
            readonly metrics: "Track token usage, component adoption, performance scores";
            readonly updates: "Keep dependencies current and address security vulnerabilities";
            readonly documentation: "Update documentation for accuracy and completeness";
        };
        readonly deprecation: {
            readonly timeline: "6-week notice for breaking changes";
            readonly support: "Provide migration guides and codemods";
            readonly communication: "Multi-channel notification (Slack, email, docs)";
            readonly monitoring: "Track adoption of deprecated vs new patterns";
        };
    };
    readonly teamRoles: {
        readonly designSystemTeam: {
            readonly responsibilities: readonly ["Define and maintain design tokens", "Review and approve new components", "Ensure PRD alignment and brand consistency", "Provide migration support and documentation", "Monitor design system health metrics"];
            readonly authority: "Final approval on design system architecture decisions";
        };
        readonly productTeams: {
            readonly responsibilities: readonly ["Use design system components exclusively", "Request new components through RFC process", "Provide feedback on component usability", "Contribute bug fixes and improvements", "Follow governance standards in implementation"];
            readonly escalation: "Report design system gaps and issues to design system team";
        };
        readonly engineeringTeads: {
            readonly responsibilities: readonly ["Implement components following governance standards", "Ensure performance and accessibility requirements", "Provide technical review of new components", "Maintain build systems and automation", "Support teams with implementation guidance"];
        };
    };
};
export declare const complianceMonitoring: {
    readonly automated: {
        readonly tokenUsage: {
            readonly tool: "ESLint plugin for hardcoded value detection";
            readonly frequency: "Every commit";
            readonly action: "Block commits with hardcoded values";
        };
        readonly accessibility: {
            readonly tool: "Automated accessibility testing in CI/CD";
            readonly frequency: "Every pull request";
            readonly action: "Fail build on accessibility violations";
        };
        readonly performance: {
            readonly tool: "Bundle analyzer and performance monitoring";
            readonly frequency: "Every deployment";
            readonly action: "Alert on performance regressions";
        };
        readonly visualRegression: {
            readonly tool: "Chromatic visual testing";
            readonly frequency: "Every Storybook update";
            readonly action: "Review visual changes before approval";
        };
    };
    readonly manual: {
        readonly designConsistency: {
            readonly frequency: "Monthly";
            readonly scope: "Full component library review";
            readonly focus: "Brand alignment and visual consistency";
        };
        readonly userExperience: {
            readonly frequency: "Quarterly";
            readonly scope: "End-to-end user journey testing";
            readonly focus: "Component usability and interaction patterns";
        };
        readonly tokenUsage: {
            readonly frequency: "Monthly";
            readonly scope: "Codebase-wide token usage analysis";
            readonly focus: "Identify hardcoded values and token optimization opportunities";
        };
    };
    readonly metrics: {
        readonly adoption: "Percentage of product using design system components";
        readonly consistency: "Token usage percentage vs hardcoded values";
        readonly performance: "Average component load time and animation frame rate";
        readonly accessibility: "WCAG compliance score across component library";
        readonly satisfaction: "Developer and designer satisfaction surveys";
    };
};
export declare const emergencyProcedures: {
    readonly criticalBug: {
        readonly definition: "Bug that breaks functionality or accessibility";
        readonly response: "Immediate hotfix with expedited review process";
        readonly communication: "Immediate notification to all consuming teams";
        readonly followUp: "Post-incident review and process improvement";
    };
    readonly securityVulnerability: {
        readonly definition: "Security issue in dependencies or component code";
        readonly response: "Immediate patch and security advisory";
        readonly communication: "Security-focused communication channels";
        readonly followUp: "Security audit and preventive measures";
    };
    readonly performanceRegression: {
        readonly definition: "Significant performance degradation (>20% slower)";
        readonly response: "Investigation and rollback if necessary";
        readonly communication: "Performance impact assessment to product teams";
        readonly followUp: "Performance monitoring improvements";
    };
};
export type ComponentStandard = keyof typeof designSystemGovernance.componentStandards;
export type QualityGate = keyof typeof designSystemGovernance.qualityGates;
export type TeamRole = keyof typeof designSystemGovernance.teamRoles;
//# sourceMappingURL=governance.d.ts.map