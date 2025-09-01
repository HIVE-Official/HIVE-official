#!/usr/bin/env node

/**
 * HIVE Component Dependency Analyzer
 * Maps component usage and dependencies to plan migration order
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

class ComponentDependencyAnalyzer {
  constructor() {
    this.dependencies = new Map();
    this.usage = new Map();
    this.components = new Set();
    this.migrationOrder = [];
    
    // Known HIVE components to track
    this.hiveComponents = new Set([
      'Button', 'ButtonEnhanced', 'HiveButton',
      'Input', 'InputEnhanced', 'HiveInput',
      'Select', 'SelectEnhanced', 'HiveSelect',
      'Textarea', 'TextareaEnhanced', 'HiveTextarea',
      'Checkbox', 'CheckboxEnhanced', 'HiveCheckbox',
      'Radio', 'RadioEnhanced', 'HiveRadio',
      'Switch', 'SwitchEnhanced', 'HiveSwitch',
      'Card', 'HiveCard',
      'Modal', 'HiveModal',
      'Table', 'HiveTable',
      'Badge', 'HiveBadge',
      'Progress', 'HiveProgress',
      'Avatar', 'ProfileAvatar',
      'Navigation', 'HiveNavigation',
      'Tooltip', 'HiveTooltip'
    ]);
  }

  async analyzeDirectory(directory) {
    console.log(`🔍 Analyzing component dependencies in: ${directory}`);
    
    const files = glob.sync(`${directory}/**/*.{tsx,ts}`, {
      ignore: ['**/node_modules/**', '**/dist/**', '**/*.test.*', '**/*.stories.*']
    });

    // First pass: collect all components and their imports
    for (const file of files) {
      await this.analyzeFile(file);
    }

    // Second pass: build dependency tree
    this.buildDependencyTree();
    
    // Generate migration order
    this.calculateMigrationOrder();
    
    this.generateReport();
  }

  async analyzeFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(process.cwd(), filePath);
      
      // Extract component name from file path
      const fileName = path.basename(filePath, path.extname(filePath));
      const isComponentFile = /^[A-Z]/.test(fileName) && filePath.includes('/src/');
      
      if (isComponentFile) {
        this.components.add(fileName);
      }

      // Find imports from @hive/ui
      const hiveImportRegex = /import\s+\{([^}]+)\}\s+from\s+['"]@hive\/ui['"]/g;
      let match;
      
      while ((match = hiveImportRegex.exec(content)) !== null) {
        const imports = match[1].split(',').map(imp => imp.trim());
        
        imports.forEach(importName => {
          // Clean up import name (remove 'as' aliases, etc.)
          const cleanName = importName.split(' as ')[0].trim();
          
          if (this.hiveComponents.has(cleanName)) {
            // Record usage
            if (!this.usage.has(cleanName)) {
              this.usage.set(cleanName, new Set());
            }
            this.usage.get(cleanName).add(relativePath);
            
            // Record dependency if this is a component file
            if (isComponentFile) {
              if (!this.dependencies.has(fileName)) {
                this.dependencies.set(fileName, new Set());
              }
              this.dependencies.get(fileName).add(cleanName);
            }
          }
        });
      }

      // Find JSX component usage
      this.hiveComponents.forEach(componentName => {
        const jsxRegex = new RegExp(`<${componentName}[\\s>]`, 'g');
        if (jsxRegex.test(content)) {
          if (!this.usage.has(componentName)) {
            this.usage.set(componentName, new Set());
          }
          this.usage.get(componentName).add(relativePath);
        }
      });

    } catch (error) {
      console.error(`❌ Error analyzing ${filePath}:`, error.message);
    }
  }

  buildDependencyTree() {
    // Build reverse dependency map
    this.reverseDependencies = new Map();
    
    this.dependencies.forEach((deps, component) => {
      deps.forEach(dep => {
        if (!this.reverseDependencies.has(dep)) {
          this.reverseDependencies.set(dep, new Set());
        }
        this.reverseDependencies.get(dep).add(component);
      });
    });
  }

  calculateMigrationOrder() {
    // Calculate migration order using topological sort
    // Components with fewer dependencies should be migrated first
    
    const componentScores = new Map();
    
    // Score components based on:
    // 1. Number of files using them (higher = migrate first)
    // 2. Number of components depending on them (higher = migrate first)  
    // 3. Whether they have enhanced versions available (lower = migrate first)
    
    this.hiveComponents.forEach(component => {
      let score = 0;
      
      // Usage score (more usage = higher priority)
      const usageCount = this.usage.get(component)?.size || 0;
      score += usageCount * 10;
      
      // Dependency score (more components depend on it = higher priority)
      const dependentCount = this.reverseDependencies.get(component)?.size || 0;
      score += dependentCount * 5;
      
      // Legacy penalty (legacy components should be migrated sooner)
      if (component.startsWith('Hive') || !component.includes('Enhanced')) {
        score += 100; // Higher score = higher priority
      }
      
      // Enhanced bonus (enhanced components are targets, lower priority to migrate)
      if (component.includes('Enhanced')) {
        score -= 50;
      }
      
      componentScores.set(component, score);
    });
    
    // Sort by score (descending)
    this.migrationOrder = Array.from(componentScores.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([component]) => component);
  }

  generateReport() {
    console.log('\\n📊 Component Dependency Analysis\\n');
    
    // Most used components
    const mostUsed = Array.from(this.usage.entries())
      .sort((a, b) => b[1].size - a[1].size)
      .slice(0, 10);
    
    console.log('🔥 Most Used Components:');
    mostUsed.forEach(([component, files], index) => {
      const isLegacy = component.startsWith('Hive') || (!component.includes('Enhanced') && 
        this.hiveComponents.has(component + 'Enhanced'));
      const status = isLegacy ? '⚠️  LEGACY' : '✅ CURRENT';
      console.log(`  ${index + 1}. ${component}: ${files.size} files ${status}`);
    });
    
    // Components with most dependencies
    if (this.reverseDependencies.size > 0) {
      const mostDependedOn = Array.from(this.reverseDependencies.entries())
        .sort((a, b) => b[1].size - a[1].size)
        .slice(0, 5);
      
      console.log('\\n🔗 Components With Most Dependencies:');
      mostDependedOn.forEach(([component, dependents]) => {
        console.log(`  ${component}: ${dependents.size} components depend on it`);
        dependents.forEach(dep => console.log(`    └─ ${dep}`));
      });
    }
    
    // Migration order recommendations
    console.log('\\n🎯 Recommended Migration Order:');
    const legacyComponents = this.migrationOrder.filter(comp => 
      comp.startsWith('Hive') || (!comp.includes('Enhanced') && 
      this.hiveComponents.has(comp + 'Enhanced'))
    );
    
    legacyComponents.slice(0, 10).forEach((component, index) => {
      const usageCount = this.usage.get(component)?.size || 0;
      const target = this.getTargetComponent(component);
      console.log(`  ${index + 1}. ${component} → ${target} (${usageCount} files affected)`);
    });
  }

  getTargetComponent(legacyComponent) {
    // Map legacy components to their target enhanced versions
    const mappings = {
      'Button': 'ButtonEnhanced',
      'Input': 'InputEnhanced',
      'Select': 'SelectEnhanced',
      'Textarea': 'TextareaEnhanced',
      'Checkbox': 'CheckboxEnhanced',
      'Radio': 'RadioEnhanced',
      'Switch': 'SwitchEnhanced',
      'HiveButton': 'Button',
      'HiveInput': 'Input',
      'HiveSelect': 'Select',
      'HiveCard': 'Card',
      'HiveModal': 'Modal',
      'HiveTable': 'Table',
      'HiveBadge': 'Badge',
      'HiveProgress': 'Progress',
      'HiveNavigation': 'Navigation',
      'HiveTooltip': 'Tooltip'
    };
    
    return mappings[legacyComponent] || legacyComponent;
  }

  generateMigrationPlan() {
    const plan = {
      summary: {
        totalComponents: this.components.size,
        totalHiveComponents: this.hiveComponents.size,
        componentsWithUsage: this.usage.size,
        migrationCandidates: this.migrationOrder.length
      },
      migrationPhases: this.createMigrationPhases(),
      impactAnalysis: this.analyzeImpact(),
      dependencies: Object.fromEntries(this.dependencies),
      usage: Object.fromEntries(
        Array.from(this.usage.entries()).map(([k, v]) => [k, Array.from(v)])
      )
    };
    
    const planPath = './component-migration-plan.json';
    fs.writeFileSync(planPath, JSON.stringify(plan, null, 2));
    console.log(`\\n📋 Migration plan saved to: ${planPath}`);
    
    return plan;
  }

  createMigrationPhases() {
    const phases = [];
    const legacyComponents = this.migrationOrder.filter(comp => 
      comp.startsWith('Hive') || (!comp.includes('Enhanced') && 
      this.hiveComponents.has(comp + 'Enhanced'))
    );
    
    // Phase 1: High-usage, low-dependency components (atoms)
    const phase1 = legacyComponents
      .filter(comp => {
        const dependentCount = this.reverseDependencies.get(comp)?.size || 0;
        const usageCount = this.usage.get(comp)?.size || 0;
        return usageCount > 5 && dependentCount < 3;
      })
      .slice(0, 5);
    
    phases.push({
      phase: 1,
      name: 'Foundation Components (Atoms)',
      description: 'Migrate widely-used components with few dependencies',
      components: phase1,
      estimatedDays: 3
    });
    
    // Phase 2: Medium complexity (molecules)
    const phase2 = legacyComponents
      .filter(comp => !phase1.includes(comp))
      .filter(comp => {
        const dependentCount = this.reverseDependencies.get(comp)?.size || 0;
        return dependentCount >= 3 && dependentCount < 8;
      })
      .slice(0, 5);
    
    phases.push({
      phase: 2, 
      name: 'Composite Components (Molecules)',
      description: 'Migrate components that combine atoms',
      components: phase2,
      estimatedDays: 5
    });
    
    // Phase 3: Complex components (organisms)
    const phase3 = legacyComponents
      .filter(comp => !phase1.includes(comp) && !phase2.includes(comp))
      .slice(0, 5);
    
    phases.push({
      phase: 3,
      name: 'Complex Components (Organisms)', 
      description: 'Migrate complex components with many dependencies',
      components: phase3,
      estimatedDays: 7
    });
    
    return phases;
  }

  analyzeImpact() {
    const impact = {
      high: [],
      medium: [],
      low: []
    };
    
    this.usage.forEach((files, component) => {
      const fileCount = files.size;
      const isLegacy = component.startsWith('Hive') || 
        (!component.includes('Enhanced') && this.hiveComponents.has(component + 'Enhanced'));
      
      if (isLegacy) {
        if (fileCount > 10) {
          impact.high.push({ component, files: fileCount });
        } else if (fileCount > 3) {
          impact.medium.push({ component, files: fileCount });
        } else {
          impact.low.push({ component, files: fileCount });
        }
      }
    });
    
    return impact;
  }
}

// CLI Usage
if (require.main === module) {
  const analyzer = new ComponentDependencyAnalyzer();
  const command = process.argv[2];
  const directory = process.argv[3] || '.';

  switch (command) {
    case 'analyze':
      analyzer.analyzeDirectory(directory);
      break;
    
    case 'plan':
      analyzer.analyzeDirectory(directory).then(() => {
        analyzer.generateMigrationPlan();
      });
      break;
    
    default:
      console.log(`
Usage: 
  node analyze-component-dependencies.js analyze [directory]  - Analyze component usage
  node analyze-component-dependencies.js plan [directory]     - Generate migration plan

Examples:
  node analyze-component-dependencies.js analyze apps/web/src
  node analyze-component-dependencies.js plan .
      `);
  }
}

module.exports = ComponentDependencyAnalyzer;