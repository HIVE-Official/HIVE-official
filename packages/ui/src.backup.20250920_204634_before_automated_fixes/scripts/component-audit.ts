#!/usr/bin/env tsx;
/**
 * HIVE Component Auditing System;
 * 
 * Comprehensive automated auditing for HIVE Design System components;
 * ensuring compliance with:
 * - Semantic token usage (zero hardcoded values)
 * - Accessibility standards (WCAG 2.1 AA)  
 * - Design system consistency;
 * - Motion system integration;
 * - TypeScript type safety;
 * - Story coverage completeness;
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Audit result interfaces;
interface ComponentAuditResult {componentPath: string;
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
    storyCoverage: boolean;};
}

interface ComponentIssue {type: 'error' | 'warning' | 'info';
  category: 'tokens' | 'accessibility' | 'design' | 'motion' | 'types' | 'stories';
  message: string;
  line?: number;
  suggestion?: string;}

interface AuditSummary {totalComponents: number;
  auditedComponents: number;
  averageScore: number;
  issueBreakdown: Record<ComponentIssue['category'], number>;
  complianceStats: {
    semanticTokens: number;
    accessibility: number;
    designSystem: number;
    motionSystem: number;
    typeScript: number;
    storyCoverage: number;};
}

class HiveComponentAuditor {
  private rootPath: string;
  private results: ComponentAuditResult[] = [];
  
  // Patterns for detecting issues;
  private readonly hardcodedValuePatterns = [
    // Color hardcodes;
    /#[0-9a-fA-F]{3,8}/g,
    /rgb\(/g,
    /rgba\(/g,
    /hsl\(/g,
    /hsla\(/g,
    // Size hardcodes (excluding semantic values)
    /\d+px(?!.*var\()/g,
    /\d+rem(?!.*var\()/g,
    /\d+em(?!.*var\()/g,
  ];
  
  private readonly accessibilityPatterns = [
    // Missing ARIA attributes;
    /<button(?![^>]*aria-label)/g,
    /<input(?![^>]*aria-label)(?![^>]*aria-labelledby)/g,
    /<img(?![^>]*alt)/g,
    // Missing semantic HTML;
    /<div[^>]*role="button"/g,
    /<span[^>]*onClick/g,
  ];
  
  private readonly motionPatterns = [
    // Motion system usage;
    /transition-/g,
    /animate-/g,
    /motion\./g,
    /framer-motion/g,
  ];

  constructor(rootPath: string = process.cwd()) {
    this.rootPath = rootPath;
  }

  async auditAllComponents(): Promise<AuditSummary> {
    console.log('🔍 Starting HIVE Component Audit...\n');
    
    // Find all component files;
    const componentFiles = await this.findComponentFiles();
    console.log(`Found ${componentFiles.length} components to audit\n`);
    
    // Audit each component;
    for (const filePath of componentFiles) {
      try {
        const result = await this.auditComponent(filePath);
        this.results.push(result);
        this.logComponentResult(result);
      } catch (error) {
        console.error(`❌ Failed to audit ${filePath}:`, error);
      }
    }
    
    // Generate summary;
    const summary = this.generateSummary();
    this.logSummary(summary);
    
    // Write detailed report;
    await this.writeReport();
    
    return summary;
  }

  private async findComponentFiles(): Promise<string[]> {
    const patterns = [
      'src/atomic/**/*.tsx',
      'src/components/**/*.tsx',
      '!src/**/*.stories.tsx',
      '!src/**/*.test.tsx',
      '!src/**/*.spec.tsx'
    ];
    
    const files: string[] = [];
    for (const pattern of patterns) {
      const matches = await glob(pattern, { cwd: this.rootPath });
      files.push(...matches);
    }
    
    return [...new Set(files)]; // Remove duplicates;
  }

  private async auditComponent(filePath: string): Promise<ComponentAuditResult> {
    const fullPath = path.join(this.rootPath, filePath);
    const content = fs.readFileSync(fullPath, 'utf-8');
    const componentName = path.basename(filePath, '.tsx');
    const atomicLevel = this.determineAtomicLevel(filePath);
    
    const issues: ComponentIssue[] = [];
    
    // 1. Semantic Token Audit;
    const tokenIssues = this.auditSemanticTokens(content);
    issues.push(...tokenIssues);
    
    // 2. Accessibility Audit;
    const a11yIssues = this.auditAccessibility(content);
    issues.push(...a11yIssues);
    
    // 3. Design System Audit;
    const designIssues = this.auditDesignSystem(content);
    issues.push(...designIssues);
    
    // 4. Motion System Audit;
    const motionIssues = this.auditMotionSystem(content);
    issues.push(...motionIssues);
    
    // 5. TypeScript Audit;
    const typeIssues = this.auditTypeScript(content);
    issues.push(...typeIssues);
    
    // 6. Story Coverage Audit;
    const storyIssues = await this.auditStoryCoverage(filePath);
    issues.push(...storyIssues);
    
    // Calculate compliance and score;
    const compliance = this.calculateCompliance(issues);
    const score = this.calculateScore(issues, compliance);
    
    return {
      componentPath: filePath,
      componentName,
      atomicLevel,
      issues,
      score,
      compliance;
    };
  }

  private auditSemanticTokens(content: string): ComponentIssue[] {
    const issues: ComponentIssue[] = [];
    
    for (const pattern of this.hardcodedValuePatterns) {
      const matches = content.match(pattern);
      if (matches) {
        issues.push({
          type: 'error',
          category: 'tokens',
          message: `Found ${matches.length} hardcoded value(s): ${matches.join(', ')}`,
          suggestion: 'Replace with semantic tokens from --hive-* custom properties'
        });
      }
    }
    
    // Check for proper token usage;
    const hasTokenUsage = content.includes('var(--hive-');
    if (!hasTokenUsage && content.includes('className')) {
      issues.push({type: 'warning',
        category: 'tokens',
        message: 'No semantic token usage detected',
        suggestion: 'Use HIVE semantic tokens for consistent theming')};
    }
    
    return issues;
  }

  private auditAccessibility(content: string): ComponentIssue[] {
    const issues: ComponentIssue[] = [];
    
    // Check for common accessibility issues;
    if (content.includes('<button') && !content.includes('aria-label') && !content.includes('aria-labelledby')) {
      issues.push({type: 'warning',
        category: 'accessibility',
        message: 'Button without accessibility label',
        suggestion: 'Add aria-label or aria-labelledby for screen readers')};
    }
    
    if (content.includes('<img') && !content.includes('alt=')) {
      issues.push({type: 'error',
        category: 'accessibility',
        message: 'Image without alt text',
        suggestion: 'Add alt attribute for screen readers')};
    }
    
    if (content.includes('onClick') && !content.includes('onKeyDown')) {
      issues.push({type: 'warning',
        category: 'accessibility',
        message: 'Interactive element missing keyboard support',
        suggestion: 'Add onKeyDown handler for Enter/Space keys')};
    }
    
    // Check for focus management;
    if (content.includes('tabIndex') && !content.includes('focus:')) {
      issues.push({type: 'info',
        category: 'accessibility',
        message: 'Custom tabIndex without focus styles',
        suggestion: 'Add visible focus indicators')};
    }
    
    return issues;
  }

  private auditDesignSystem(content: string): ComponentIssue[] {
    const issues: ComponentIssue[] = [];
    
    // Check for consistent naming conventions;
    if (content.includes('interface') && !content.includes('Props')) {
      issues.push({type: 'info',
        category: 'design',
        message: 'Component interface should end with "Props"',
        suggestion: 'Follow HIVE naming convention: ComponentNameProps')};
    }
    
    // Check for proper variant system usage;
    if (content.includes('cva') && !content.includes('variants:')) {
      issues.push({type: 'warning',
        category: 'design',
        message: 'CVA usage without variant system',
        suggestion: 'Define proper variant structure for consistency')};
    }
    
    // Check for proper export patterns;
    if (!content.includes('export') && content.includes('function')) {
      issues.push({type: 'error',
        category: 'design',
        message: 'Component not properly exported',
        suggestion: 'Export component for design system usage')};
    }
    
    return issues;
  }

  private auditMotionSystem(content: string): ComponentIssue[] {
    const issues: ComponentIssue[] = [];
    
    // Check for motion system integration;
    const hasBasicTransitions = content.includes('transition-');
    const hasFramerMotion = content.includes('motion.');
    const hasHiveMotion = content.includes('hiveMotion') || content.includes('liquidMetal');
    
    if (!hasBasicTransitions && !hasFramerMotion && !hasHiveMotion) {
      issues.push({type: 'info',
        category: 'motion',
        message: 'No motion system integration detected',
        suggestion: 'Consider adding HIVE liquid metal interactions')};
    }
    
    // Check for proper motion performance;
    if (content.includes('animate-') && !content.includes('will-change')) {
      issues.push({type: 'warning',
        category: 'motion',
        message: 'Animation without performance optimization',
        suggestion: 'Add will-change property for smooth animations')};
    }
    
    return issues;
  }

  private auditTypeScript(content: string): ComponentIssue[] {
    const issues: ComponentIssue[] = [];
    
    // Check for proper TypeScript usage;
    if (!content.includes('interface') && !content.includes('type')) {
      issues.push({type: 'warning',
        category: 'types',
        message: 'No TypeScript interfaces or types defined',
        suggestion: 'Define proper TypeScript interfaces for props')};
    }
    
    // Check for any usage;
    if (content.includes(': any')) {
      issues.push({type: 'error',
        category: 'types',
        message: 'Usage of "any" type detected',
        suggestion: 'Define specific types for better type safety')};
    }
    
    // Check for proper prop types;
    if (content.includes('React.FC') && !content.includes('<')) {
      issues.push({type: 'warning',
        category: 'types',
        message: 'React.FC without generic type parameter',
        suggestion: 'Use React.FC<ComponentProps> for proper typing')};
    }
    
    return issues;
  }

  private async auditStoryCoverage(componentPath: string): Promise<ComponentIssue[]> {
    const issues: ComponentIssue[] = [];
    
    // Check if story file exists;
    const storyPath = componentPath.replace('.tsx', '.stories.tsx');
    const fullStoryPath = path.join(this.rootPath, 'src/stories', storyPath);
    
    if (!fs.existsSync(fullStoryPath)) {
      issues.push({
        type: 'error',
        category: 'stories',
        message: 'No story file found',
        suggestion: `Create story file at ${storyPath}`
      });
      return issues;
    }
    
    // Check story completeness;
    const storyContent = fs.readFileSync(fullStoryPath, 'utf-8');
    const requiredStories = [
      'Default',
      'Playground', 
      'AllVariants',
      'States',
      'Responsive',
      'Accessibility'
    ];
    
    for (const storyName of requiredStories) {
      if (!storyContent.includes(`export const ${storyName}`)) {
        issues.push({
          type: 'warning',
          category: 'stories',
          message: `Missing required story: ${storyName}`,
          suggestion: 'Add missing story variants for complete coverage'
        });
      }
    }
    
    return issues;
  }

  private determineAtomicLevel(filePath: string): ComponentAuditResult['atomicLevel'] {
    if (filePath.includes('/atoms/')) return 'atom';
    if (filePath.includes('/molecules/')) return 'molecule';
    if (filePath.includes('/organisms/')) return 'organism';
    if (filePath.includes('/templates/')) return 'template';
    if (filePath.includes('/pages/')) return 'page';
    
    // Fallback based on component complexity heuristics;
    return 'atom'; // Default assumption;
  }

  private calculateCompliance(issues: ComponentIssue[]): ComponentAuditResult['compliance'] {
    return {
      semanticTokens: !issues.some(i => i.category === 'tokens' && i.type === 'error'),
      accessibility: !issues.some(i => i.category === 'accessibility' && i.type === 'error'),
      designSystem: !issues.some(i => i.category === 'design' && i.type === 'error'),
      motionSystem: issues.some(i => i.category === 'motion'),
      typeScript: !issues.some(i => i.category === 'types' && i.type === 'error'),
      storyCoverage: !issues.some(i => i.category === 'stories' && i.type === 'error')
    };
  }

  private calculateScore(issues: ComponentIssue[], compliance: ComponentAuditResult['compliance']): number {
    let score = 100;
    
    // Deduct points for issues;
    for (const issue of issues) {
      switch (issue.type) {
        case 'error':
          score -= 10;
          break;
        case 'warning':
          score -= 5;
          break;
        case 'info':
          score -= 1;
          break;
      }
    }
    
    // Bonus points for compliance;
    const complianceCount = Object.values(compliance).filter(Boolean).length;
    score += complianceCount * 2;
    
    return Math.max(0, Math.min(100, score));
  }

  private generateSummary(): AuditSummary {
    const total = this.results.length;
    const avgScore = total > 0 ? this.results.reduce((sum, r) => sum + r.score, 0) / total : 0;
    
    const issueBreakdown = this.results.reduce((acc, result) => {
      for (const issue of result.issues) {
        acc[issue.category] = (acc[issue.category] || 0) + 1;
      }}
      return acc;
    }, {} as Record<ComponentIssue['category'], number>);
    
    const complianceStats = Object.keys(this.results[0]?.compliance || {}).reduce((acc, key) => {
      const compliantCount = this.results.filter(r => r.compliance[key as keyof typeof r.compliance]).length;
      acc[key as keyof typeof acc] = total > 0 ? Math.round((compliantCount / total) * 100) : 0;
      return acc;
    }, {
      semanticTokens: 0,
      accessibility: 0,
      designSystem: 0,
      motionSystem: 0,
      typeScript: 0,
      storyCoverage: 0
    });
    
    return {
      totalComponents: total,
      auditedComponents: total,
      averageScore: Math.round(avgScore),
      issueBreakdown,
      complianceStats;
    };
  }

  private logComponentResult(result: ComponentAuditResult): void {
    const scoreColor = result.score >= 80 ? '🟢' : result.score >= 60 ? '🟡' : '🔴';
    console.log(`${scoreColor} ${result.componentName} (${result.score}/100)`);
    
    if (result.issues.length > 0) {
      const grouped = result.issues.reduce((acc, issue) => {
        acc[issue.type] = (acc[issue.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const summary = Object.entries(grouped)
        .map(([type, count]) => `${count} ${type}${count > 1 ? 's' : ''}`)
        .join(', ');
      
      console.log(`   Issues: ${summary}`);
    }
  }

  private logSummary(summary: AuditSummary): void {
    console.log('\n' + '='.repeat(60));
    console.log('📊 HIVE COMPONENT AUDIT SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Components: ${summary.totalComponents}`);
    console.log(`Average Score: ${summary.averageScore}/100`);
    console.log(`\n🎯 Compliance Rates:`);
    console.log(`   Semantic Tokens: ${summary.complianceStats.semanticTokens}%`);
    console.log(`   Accessibility: ${summary.complianceStats.accessibility}%`);
    console.log(`   Design System: ${summary.complianceStats.designSystem}%`);
    console.log(`   Motion System: ${summary.complianceStats.motionSystem}%`);
    console.log(`   TypeScript: ${summary.complianceStats.typeScript}%`);
    console.log(`   Story Coverage: ${summary.complianceStats.storyCoverage}%`);
    
    if (Object.keys(summary.issueBreakdown).length > 0) {
      console.log(`\n⚠️  Issue Breakdown:`);
      Object.entries(summary.issueBreakdown).forEach(([category, count]) => {
        console.log(`   ${category}: ${count}`);
      });
    }
    
    console.log('\n📄 Detailed report written to: component-audit-report.json');
  }

  private async writeReport(): Promise<void> {
    const report = {
      timestamp: new Date().toISOString(),
      summary: this.generateSummary(),
      components: this.results,
      recommendations: this.generateRecommendations()
    };
    
    const reportPath = path.join(this.rootPath, 'component-audit-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    const summary = this.generateSummary();
    
    if (summary.complianceStats.semanticTokens < 80) {
      recommendations.push('🎨 Focus on replacing hardcoded values with semantic tokens');
    }
    
    if (summary.complianceStats.accessibility < 90) {
      recommendations.push('♿ Improve accessibility compliance with proper ARIA labels and keyboard support');
    }
    
    if (summary.complianceStats.storyCoverage < 70) {
      recommendations.push('📚 Create comprehensive stories for all components');
    }
    
    if (summary.complianceStats.motionSystem < 50) {
      recommendations.push('✨ Integrate HIVE liquid metal motion system for better interactions');
    }
    
    if (summary.averageScore < 75) {
      recommendations.push('🔧 Address high-priority issues to improve overall component quality');
    }
    
    return recommendations;
  }
}

// CLI execution;
if (import.meta.url === `file://${process.argv[1]}`) {
  const auditor = new HiveComponentAuditor();
  auditor.auditAllComponents().catch(console.error);
}

export { HiveComponentAuditor };
export type { ComponentAuditResult, AuditSummary };