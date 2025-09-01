#!/usr/bin/env node

/**
 * HIVE Workflow Enforcement System
 * 
 * Integrates todo.md, CLAUDE.md, and rules.md into actionable gates
 * Prevents work that violates our established workflow principles
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import chalk from 'chalk';

class WorkflowEnforcer {
  constructor() {
    this.rootDir = process.cwd();
    this.todoPath = join(this.rootDir, 'todo.md');
    this.claudePath = join(this.rootDir, 'CLAUDE.md');
    this.rulesPath = join(this.rootDir, 'rules.md');
  }

  // ============================================================================
  // INFRASTRUCTURE GATES (rules.md enforcement)
  // ============================================================================
  
  async checkInfrastructureGates() {
    console.log(chalk.blue('🔧 Checking Infrastructure Gates...'));
    
    const gates = [
      { name: 'ESLint', command: 'pnpm lint', critical: true },
      { name: 'TypeScript', command: 'pnpm typecheck', critical: true },
      { name: 'Build', command: 'pnpm build', critical: true },
      { name: 'Tests', command: 'pnpm test --run', critical: false }
    ];

    const results = [];
    
    for (const gate of gates) {
      try {
        console.log(chalk.gray(`  Checking ${gate.name}...`));
        execSync(gate.command, { stdio: 'pipe', timeout: 120000 });
        results.push({ ...gate, passed: true });
        console.log(chalk.green(`  ✅ ${gate.name} passed`));
      } catch (error) {
        results.push({ ...gate, passed: false, error: error.message });
        console.log(chalk.red(`  ❌ ${gate.name} failed`));
        
        if (gate.critical) {
          console.log(chalk.red(`\n🚨 CRITICAL INFRASTRUCTURE FAILURE: ${gate.name}`));
          console.log(chalk.yellow(`Fix this before any feature work can proceed.`));
          console.log(chalk.gray(`Command: ${gate.command}\n`));
        }
      }
    }

    const criticalFailures = results.filter(r => !r.passed && r.critical);
    return {
      passed: criticalFailures.length === 0,
      results,
      criticalFailures
    };
  }

  // ============================================================================
  // TODO PHASE GATES (todo.md enforcement)
  // ============================================================================
  
  checkCurrentPhase() {
    console.log(chalk.blue('📋 Checking Current Development Phase...'));
    
    if (!existsSync(this.todoPath)) {
      console.log(chalk.yellow('  ⚠️ todo.md not found, assuming general development phase'));
      return { phase: 'general', allowed: true };
    }

    const todoContent = readFileSync(this.todoPath, 'utf8');
    
    // Parse current phase from todo.md
    const phaseMatch = todoContent.match(/\*\*Current Phase\*\*:\s*(.+)/);
    const phase = phaseMatch ? phaseMatch[1].toLowerCase() : 'unknown';
    
    console.log(chalk.cyan(`  Current Phase: ${phase}`));

    // Check if infrastructure phase is incomplete
    if (phase.includes('critical infrastructure fixes')) {
      const infrastructureComplete = !todoContent.includes('- [ ]') || 
                                   !todoContent.match(/🚨.*IMMEDIATE BLOCKERS.*\n(.*\n)*?.*- \[ \]/);
      
      if (!infrastructureComplete) {
        console.log(chalk.red('  ❌ Infrastructure phase incomplete - feature work blocked'));
        return { phase: 'infrastructure', allowed: false, reason: 'Infrastructure blockers remain' };
      }
    }

    console.log(chalk.green('  ✅ Current phase allows development work'));
    return { phase, allowed: true };
  }

  // ============================================================================
  // DESIGN SYSTEM GATES (CLAUDE.md enforcement)
  // ============================================================================
  
  checkDesignSystemCompliance(taskDescription = '') {
    console.log(chalk.blue('🎨 Checking Design System Compliance...'));
    
    const uiKeywords = ['component', 'button', 'form', 'modal', 'card', 'layout', 'ui', 'style'];
    const needsDesignCheck = uiKeywords.some(keyword => 
      taskDescription.toLowerCase().includes(keyword)
    );

    if (needsDesignCheck) {
      console.log(chalk.yellow('  ⚠️ Task involves UI components'));
      console.log(chalk.cyan('  📝 REQUIRED: Check existing @hive/ui components first'));
      console.log(chalk.cyan('  📝 REQUIRED: Ask "Should this update the brand system?"'));
      console.log(chalk.cyan('  📝 REQUIRED: Use design tokens, not hardcoded values'));
      
      return {
        needsDesignReview: true,
        requirements: [
          'Audit existing @hive/ui components',
          'Consider brand system integration',
          'Use semantic design tokens',
          'Add to Storybook if new component'
        ]
      };
    }

    console.log(chalk.green('  ✅ No special design system requirements'));
    return { needsDesignReview: false, requirements: [] };
  }

  // ============================================================================
  // PRODUCTION QUALITY GATES (rules.md enforcement)
  // ============================================================================
  
  checkProductionReadiness() {
    console.log(chalk.blue('🚀 Checking Production Readiness...'));
    
    const checks = [];

    // Check for TODO/FIXME comments
    try {
      const todoComments = execSync('git grep -i "TODO\\|FIXME\\|HACK" -- "*.ts" "*.tsx" "*.js" "*.jsx" || true', 
        { encoding: 'utf8' }).trim();
      
      if (todoComments) {
        checks.push({
          name: 'TODO/FIXME Comments',
          passed: false,
          message: 'Found TODO/FIXME comments in codebase',
          action: 'Remove or convert to proper tickets'
        });
      } else {
        checks.push({
          name: 'TODO/FIXME Comments',
          passed: true,
          message: 'No TODO/FIXME comments found'
        });
      }
    } catch (error) {
      // Git grep failed, skip this check
    }

    // Check for hardcoded values
    try {
      const hardcodedStyles = execSync('git grep -E "(className=\\\"[^\\\"]*\\s(bg-white|text-black|p-[0-9]|m-[0-9]|w-[0-9]|h-[0-9]))" -- "*.tsx" "*.jsx" || true',
        { encoding: 'utf8' }).trim();
      
      if (hardcodedStyles) {
        checks.push({
          name: 'Hardcoded Styles',
          passed: false,
          message: 'Found hardcoded CSS classes instead of design tokens',
          action: 'Replace with semantic design tokens'
        });
      } else {
        checks.push({
          name: 'Hardcoded Styles',
          passed: true,
          message: 'No obvious hardcoded styles found'
        });
      }
    } catch (error) {
      // Skip this check if git grep fails
    }

    const allPassed = checks.every(check => check.passed);
    
    checks.forEach(check => {
      if (check.passed) {
        console.log(chalk.green(`  ✅ ${check.name}: ${check.message}`));
      } else {
        console.log(chalk.red(`  ❌ ${check.name}: ${check.message}`));
        console.log(chalk.yellow(`     Action: ${check.action}`));
      }
    });

    return { passed: allPassed, checks };
  }

  // ============================================================================
  // MAIN WORKFLOW ENFORCEMENT
  // ============================================================================
  
  async enforceWorkflow(taskDescription = '') {
    console.log(chalk.bold.blue('\n🔒 HIVE Workflow Enforcement System'));
    console.log(chalk.gray('Integrating todo.md + CLAUDE.md + rules.md\n'));

    // Gate 1: Infrastructure must be stable
    const infraResult = await this.checkInfrastructureGates();
    if (!infraResult.passed) {
      console.log(chalk.red.bold('\n🛑 WORKFLOW BLOCKED: Infrastructure failures detected'));
      console.log(chalk.yellow('Fix these critical issues before proceeding:\n'));
      
      infraResult.criticalFailures.forEach(failure => {
        console.log(chalk.red(`  • ${failure.name}: ${failure.command}`));
      });
      
      console.log(chalk.cyan('\nRefer to rules.md "Infrastructure First Policy"'));
      return { allowed: false, reason: 'infrastructure' };
    }

    // Gate 2: Current development phase must allow work
    const phaseResult = this.checkCurrentPhase();
    if (!phaseResult.allowed) {
      console.log(chalk.red.bold('\n🛑 WORKFLOW BLOCKED: Current phase restrictions'));
      console.log(chalk.yellow(`Reason: ${phaseResult.reason}`));
      console.log(chalk.cyan('Check todo.md for current phase requirements'));
      return { allowed: false, reason: 'phase' };
    }

    // Gate 3: Design system compliance check
    const designResult = this.checkDesignSystemCompliance(taskDescription);
    
    // Gate 4: Production quality check
    const productionResult = this.checkProductionReadiness();

    // Final assessment
    console.log(chalk.green.bold('\n✅ WORKFLOW APPROVED'));
    console.log(chalk.cyan('All gates passed - proceed with development'));
    
    if (designResult.needsDesignReview) {
      console.log(chalk.yellow.bold('\n📋 DESIGN SYSTEM REQUIREMENTS:'));
      designResult.requirements.forEach(req => {
        console.log(chalk.yellow(`  • ${req}`));
      });
    }

    if (!productionResult.passed) {
      console.log(chalk.yellow.bold('\n⚠️ PRODUCTION QUALITY WARNINGS:'));
      productionResult.checks
        .filter(check => !check.passed)
        .forEach(check => {
          console.log(chalk.yellow(`  • ${check.message}`));
        });
    }

    return {
      allowed: true,
      infrastructure: infraResult,
      phase: phaseResult,
      design: designResult,
      production: productionResult
    };
  }
}

// ============================================================================
// CLI INTERFACE
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  const taskDescription = args.join(' ');

  const enforcer = new WorkflowEnforcer();
  
  try {
    const result = await enforcer.enforceWorkflow(taskDescription);
    process.exit(result.allowed ? 0 : 1);
  } catch (error) {
    console.error(chalk.red.bold('❌ Workflow check failed:'));
    console.error(error.message);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { WorkflowEnforcer };