#!/usr/bin/env node

/**
 * HIVE Design System Integration Checkpoint
 * 
 * Enforces CLAUDE.md design system evolution rules
 * Prevents component creation without proper system integration
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import chalk from 'chalk';

class DesignSystemChecker {
  constructor() {
    this.rootDir = process.cwd();
    this.uiPackagePath = join(this.rootDir, 'packages/ui/src');
    this.webAppPath = join(this.rootDir, 'apps/web/src');
  }

  // ============================================================================
  // EXISTING COMPONENT AUDIT
  // ============================================================================
  
  findExistingComponents(componentType) {
    console.log(chalk.blue(`🔍 Auditing existing ${componentType} components...`));
    
    const atomsPath = join(this.uiPackagePath, 'atomic/atoms');
    const moleculesPath = join(this.uiPackagePath, 'atomic/molecules');
    const organismsPath = join(this.uiPackagePath, 'atomic/organisms');
    
    const existing = {
      atoms: this.scanComponentDirectory(atomsPath),
      molecules: this.scanComponentDirectory(moleculesPath),
      organisms: this.scanComponentDirectory(organismsPath)
    };

    // Look for similar components
    const searchTerm = componentType.toLowerCase();
    const similar = [];
    
    Object.entries(existing).forEach(([level, components]) => {
      components.forEach(comp => {
        if (comp.toLowerCase().includes(searchTerm) || 
            searchTerm.includes(comp.toLowerCase().slice(0, -4))) { // remove .tsx
          similar.push({ level, name: comp, path: join(this.uiPackagePath, 'atomic', level, comp) });
        }
      });
    });

    if (similar.length > 0) {
      console.log(chalk.yellow(`⚠️ Found similar existing components:`));
      similar.forEach(comp => {
        console.log(chalk.cyan(`  • ${comp.level}/${comp.name}`));
      });
      console.log(chalk.yellow('\n🤔 Consider extending/enhancing existing components instead'));
    } else {
      console.log(chalk.green(`✅ No similar ${componentType} components found - new component may be needed`));
    }

    return { existing, similar };
  }

  scanComponentDirectory(dirPath) {
    if (!existsSync(dirPath)) {
      return [];
    }

    try {
      return readdirSync(dirPath)
        .filter(file => file.endsWith('.tsx') && !file.includes('.stories.'))
        .map(file => file.replace('.tsx', ''));
    } catch (error) {
      return [];
    }
  }

  // ============================================================================
  // DUPLICATE DETECTION
  // ============================================================================
  
  checkForDuplicates(componentName) {
    console.log(chalk.blue(`🔍 Checking for duplicate ${componentName} implementations...`));
    
    try {
      // Search for component definitions across the codebase
      const searchResults = execSync(
        `git grep -l "function ${componentName}\\|const ${componentName}\\|export.*${componentName}" -- "*.tsx" "*.ts"`,
        { encoding: 'utf8' }
      ).trim().split('\n').filter(Boolean);

      if (searchResults.length > 1) {
        console.log(chalk.red(`❌ Found ${searchResults.length} implementations of ${componentName}:`));
        searchResults.forEach(file => {
          console.log(chalk.red(`  • ${file}`));
        });
        console.log(chalk.yellow('\n🔧 REQUIRED: Consolidate to single implementation in @hive/ui'));
        return { hasDuplicates: true, files: searchResults };
      }

      if (searchResults.length === 1) {
        const existingFile = searchResults[0];
        console.log(chalk.green(`✅ Single ${componentName} implementation found: ${existingFile}`));
        return { hasDuplicates: false, files: searchResults };
      }

      console.log(chalk.green(`✅ No existing ${componentName} implementations found`));
      return { hasDuplicates: false, files: [] };

    } catch (error) {
      // No matches found
      console.log(chalk.green(`✅ No existing ${componentName} implementations found`));
      return { hasDuplicates: false, files: [] };
    }
  }

  // ============================================================================
  // DESIGN TOKEN VALIDATION
  // ============================================================================
  
  checkDesignTokenUsage(filePath) {
    console.log(chalk.blue('🎨 Checking design token usage...'));
    
    if (!existsSync(filePath)) {
      console.log(chalk.yellow('⚠️ File not found, skipping design token check'));
      return { passed: true, issues: [] };
    }

    const content = readFileSync(filePath, 'utf8');
    const issues = [];

    // Check for hardcoded colors
    const hardcodedColors = content.match(/bg-white|bg-black|text-white|text-black|border-gray-\d+/g);
    if (hardcodedColors) {
      issues.push({
        type: 'hardcoded-colors',
        matches: hardcodedColors,
        message: 'Use semantic color tokens instead of hardcoded colors',
        fix: 'Replace with bg-background-primary, text-foreground-primary, etc.'
      });
    }

    // Check for hardcoded spacing
    const hardcodedSpacing = content.match(/p-\d+|m-\d+|px-\d+|py-\d+|mx-\d+|my-\d+/g);
    if (hardcodedSpacing) {
      issues.push({
        type: 'hardcoded-spacing',
        matches: hardcodedSpacing,
        message: 'Use semantic spacing tokens instead of hardcoded values',
        fix: 'Replace with p-spacing-sm, m-spacing-md, etc.'
      });
    }

    // Check for hardcoded border radius
    const hardcodedRadius = content.match(/rounded-\w+/g);
    if (hardcodedRadius) {
      issues.push({
        type: 'hardcoded-radius',
        matches: hardcodedRadius,
        message: 'Use semantic border radius tokens',
        fix: 'Replace with border-radius-sm, border-radius-md, etc.'
      });
    }

    if (issues.length === 0) {
      console.log(chalk.green('✅ Design token usage looks good'));
      return { passed: true, issues: [] };
    }

    console.log(chalk.red('❌ Design token violations found:'));
    issues.forEach(issue => {
      console.log(chalk.red(`  • ${issue.message}`));
      console.log(chalk.gray(`    Found: ${issue.matches.slice(0, 3).join(', ')}`));
      console.log(chalk.cyan(`    Fix: ${issue.fix}`));
    });

    return { passed: false, issues };
  }

  // ============================================================================
  // STORYBOOK INTEGRATION CHECK
  // ============================================================================
  
  checkStorybookIntegration(componentName) {
    console.log(chalk.blue(`📚 Checking Storybook integration for ${componentName}...`));
    
    const storiesPath = join(this.uiPackagePath, 'stories');
    const possibleStoryFiles = [
      join(storiesPath, `${componentName}.stories.tsx`),
      join(storiesPath, `${componentName.toLowerCase()}.stories.tsx`),
      join(this.uiPackagePath, 'atomic', 'atoms', `${componentName}.stories.tsx`),
      join(this.uiPackagePath, 'atomic', 'molecules', `${componentName}.stories.tsx`),
      join(this.uiPackagePath, 'atomic', 'organisms', `${componentName}.stories.tsx`)
    ];

    const existingStoryFile = possibleStoryFiles.find(path => existsSync(path));
    
    if (existingStoryFile) {
      console.log(chalk.green(`✅ Storybook story found: ${existingStoryFile}`));
      return { hasStory: true, storyPath: existingStoryFile };
    }

    console.log(chalk.yellow(`⚠️ No Storybook story found for ${componentName}`));
    console.log(chalk.cyan('📝 REQUIRED: Add Storybook story for new/modified components'));
    return { hasStory: false, storyPath: null };
  }

  // ============================================================================
  // MAIN DESIGN SYSTEM CHECK
  // ============================================================================
  
  async checkDesignSystemIntegration(componentName, filePath = null) {
    console.log(chalk.bold.blue('\n🎨 HIVE Design System Integration Check'));
    console.log(chalk.gray(`Component: ${componentName}\n`));

    const results = {
      componentName,
      filePath,
      passed: true,
      issues: []
    };

    // 1. Check existing similar components
    const existingCheck = this.findExistingComponents(componentName);
    if (existingCheck.similar.length > 0) {
      results.issues.push({
        type: 'similar-components',
        severity: 'warning',
        message: `Found ${existingCheck.similar.length} similar components`,
        action: 'Consider extending existing components instead of creating new ones'
      });
    }

    // 2. Check for duplicates
    const duplicateCheck = this.checkForDuplicates(componentName);
    if (duplicateCheck.hasDuplicates) {
      results.passed = false;
      results.issues.push({
        type: 'duplicates',
        severity: 'error',
        message: `Multiple implementations of ${componentName} found`,
        action: 'Consolidate to single implementation in @hive/ui',
        files: duplicateCheck.files
      });
    }

    // 3. Check design token usage (if file path provided)
    if (filePath) {
      const tokenCheck = this.checkDesignTokenUsage(filePath);
      if (!tokenCheck.passed) {
        results.passed = false;
        results.issues.push({
          type: 'design-tokens',
          severity: 'error',
          message: 'Hardcoded design values found',
          action: 'Replace with semantic design tokens',
          details: tokenCheck.issues
        });
      }
    }

    // 4. Check Storybook integration
    const storybookCheck = this.checkStorybookIntegration(componentName);
    if (!storybookCheck.hasStory) {
      results.issues.push({
        type: 'storybook',
        severity: 'warning',
        message: 'No Storybook story found',
        action: 'Add Storybook story for component documentation'
      });
    }

    // Print results
    if (results.passed && results.issues.length === 0) {
      console.log(chalk.green.bold('\n✅ DESIGN SYSTEM CHECK PASSED'));
      console.log(chalk.cyan('Component follows HIVE design system standards'));
    } else {
      const errors = results.issues.filter(i => i.severity === 'error');
      const warnings = results.issues.filter(i => i.severity === 'warning');

      if (errors.length > 0) {
        console.log(chalk.red.bold('\n❌ DESIGN SYSTEM CHECK FAILED'));
        errors.forEach(error => {
          console.log(chalk.red(`  • ${error.message}`));
          console.log(chalk.yellow(`    Action: ${error.action}`));
        });
      }

      if (warnings.length > 0) {
        console.log(chalk.yellow.bold('\n⚠️ DESIGN SYSTEM WARNINGS'));
        warnings.forEach(warning => {
          console.log(chalk.yellow(`  • ${warning.message}`));
          console.log(chalk.cyan(`    Suggestion: ${warning.action}`));
        });
      }
    }

    return results;
  }
}

// ============================================================================
// CLI INTERFACE
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  const componentName = args[0];
  const filePath = args[1];

  if (!componentName) {
    console.log(chalk.red('❌ Usage: design-system-check <ComponentName> [filePath]'));
    process.exit(1);
  }

  const checker = new DesignSystemChecker();
  
  try {
    const result = await checker.checkDesignSystemIntegration(componentName, filePath);
    process.exit(result.passed ? 0 : 1);
  } catch (error) {
    console.error(chalk.red.bold('❌ Design system check failed:'));
    console.error(error.message);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { DesignSystemChecker };