// HIVE Atomic Design Foundations
// Design principles, patterns, and guidelines for PRD-aligned implementation

// Explicitly export to avoid naming conflicts
export { 
  designPrinciples, 
  qualityGates
} from './design-principles';
export type { QualityGate as DesignQualityGate } from './design-principles';

export * from './prd-alignment';

export { 
  designSystemGovernance
} from './governance';
export type { QualityGate as GovernanceQualityGate } from './governance';

// Foundation documentation and standards
export const foundations = {
  principles: "Core design philosophy and implementation standards",
  patterns: "Reusable interaction and layout patterns", 
  componentStandards: "Quality gates and consistency requirements",
  responsiveGuidelines: "Mobile-first responsive design approach",
  accessibilityStandards: "WCAG 2.1 AA compliance requirements",
  prdAlignment: "Design PRD compliance tracking and migration guides",
  governance: "Quality gates, team responsibilities, and maintenance standards"
} as const;