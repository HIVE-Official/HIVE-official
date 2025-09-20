#!/usr/bin/env node

/**
 * HIVE Component Usage Audit Script
 * Analyzes actual component usage across the codebase for atomic design migration
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ComponentUsageAuditor {
  constructor() {
    this.results = {
      usedComponents: new Map(),
      unusedComponents: [],
      duplicateComponents: new Map(),
      backupFiles: [],
      importPatterns: new Map(),
      totalFiles: 0,
      componentStats: {
        ui: 0,
        atomic: 0,
        feature: 0,
        total: 0
      }
    };
  }

  // Find all TypeScript/React files in apps
  findSourceFiles() {
    const appDirs = ['apps/web/src', 'apps/admin/src'];
    const sourceFiles = [];

    appDirs.forEach(dir => {
      if (fs.existsSync(dir)) {
        const files = execSync(`find ${dir} -name "*.tsx" -o -name "*.ts" | grep -v node_modules | grep -v .test. | grep -v .spec.`).toString().trim().split('\n');
        sourceFiles.push(...files.filter(f => f.length > 0));
      }
    });

    this.results.totalFiles = sourceFiles.length;
    return sourceFiles;
  }

  // Find all components in packages/ui
  findUIComponents() {
    const uiDir = 'packages/ui/src';
    const components = new Map();

    if (!fs.existsSync(uiDir)) {
      console.error('UI package not found');
      return components;
    }

    // Scan components/ui directory
    const uiComponents = execSync(`find ${uiDir}/components/ui -name "*.tsx" 2>/dev/null || echo`).toString().trim().split('\n').filter(f => f.length > 0);
    uiComponents.forEach(file => {
      const name = path.basename(file, '.tsx');
      components.set(name, { file, type: 'ui', used: false });
      this.results.componentStats.ui++;
    });

    // Scan atomic directory
    const atomicComponents = execSync(`find ${uiDir}/atomic -name "*.tsx" 2>/dev/null || echo`).toString().trim().split('\n').filter(f => f.length > 0);
    atomicComponents.forEach(file => {
      const name = path.basename(file, '.tsx');
      if (components.has(name)) {
        // Found duplicate
        const existing = components.get(name);
        if (!this.results.duplicateComponents.has(name)) {
          this.results.duplicateComponents.set(name, []);
        }
        this.results.duplicateComponents.get(name).push(existing.file, file);
      }
      components.set(name, { file, type: 'atomic', used: false });
      this.results.componentStats.atomic++;
    });

    // Scan feature components
    const featureComponents = execSync(`find ${uiDir}/components -name "*.tsx" | grep -v "/ui/" 2>/dev/null || echo`).toString().trim().split('\n').filter(f => f.length > 0);
    featureComponents.forEach(file => {
      const name = path.basename(file, '.tsx');
      components.set(name, { file, type: 'feature', used: false });
      this.results.componentStats.feature++;
    });

    this.results.componentStats.total = components.size;
    return components;
  }

  // Find backup files to clean
  findBackupFiles() {
    const uiDir = 'packages/ui/src';
    try {
      const backupFiles = execSync(`find ${uiDir} -name "*.bak*" 2>/dev/null || echo`).toString().trim().split('\n').filter(f => f.length > 0);
      this.results.backupFiles = backupFiles;
    } catch (error) {
      console.warn('Error finding backup files:', error.message);
    }
  }

  // Analyze import patterns in source files
  analyzeUsage(sourceFiles, components) {
    sourceFiles.forEach(file => {
      try {
        const content = fs.readFileSync(file, 'utf8');

        // Extract import statements
        const importLines = content.split('\n').filter(line =>
          line.trim().startsWith('import') &&
          (line.includes('@hive/ui') || line.includes('../') || line.includes('./'))
        );

        importLines.forEach(line => {
          // Parse import statements
          const matches = line.match(/import\s+(?:\{([^}]+)\}|\*\s+as\s+\w+|(\w+))\s+from\s+['"]([^'"]+)['"]/);
          if (matches) {
            const [, namedImports, defaultImport, modulePath] = matches;

            if (namedImports) {
              // Handle named imports like { Button, Card }
              const names = namedImports.split(',').map(name => name.trim().replace(/\s+as\s+\w+/, ''));
              names.forEach(name => {
                this.markComponentAsUsed(name, components, file, modulePath);
              });
            } else if (defaultImport) {
              // Handle default imports
              this.markComponentAsUsed(defaultImport, components, file, modulePath);
            }
          }
        });

        // Also check for direct component usage in JSX
        const jsxMatches = content.match(/<(\w+)(?:\s|>)/g);
        if (jsxMatches) {
          jsxMatches.forEach(match => {
            const componentName = match.replace(/<(\w+).*/, '$1');
            if (componentName && componentName[0] === componentName[0].toUpperCase()) {
              this.markComponentAsUsed(componentName, components, file, 'jsx-usage');
            }
          });
        }
      } catch (error) {
        console.warn(`Error reading ${file}:`, error.message);
      }
    });
  }

  markComponentAsUsed(componentName, components, sourceFile, importPath) {
    if (components.has(componentName)) {
      const component = components.get(componentName);
      component.used = true;

      if (!this.results.usedComponents.has(componentName)) {
        this.results.usedComponents.set(componentName, {
          component: component,
          usages: []
        });
      }

      this.results.usedComponents.get(componentName).usages.push({
        file: sourceFile,
        importPath: importPath
      });
    }

    // Track import patterns
    if (!this.results.importPatterns.has(importPath)) {
      this.results.importPatterns.set(importPath, []);
    }
    this.results.importPatterns.get(importPath).push(componentName);
  }

  // Identify unused components
  identifyUnusedComponents(components) {
    components.forEach((component, name) => {
      if (!component.used) {
        this.results.unusedComponents.push({
          name,
          file: component.file,
          type: component.type
        });
      }
    });
  }

  // Generate comprehensive report
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalSourceFiles: this.results.totalFiles,
        totalComponents: this.results.componentStats.total,
        usedComponents: this.results.usedComponents.size,
        unusedComponents: this.results.unusedComponents.length,
        duplicateComponents: this.results.duplicateComponents.size,
        backupFilesToClean: this.results.backupFiles.length,
        usageRate: `${Math.round((this.results.usedComponents.size / this.results.componentStats.total) * 100)}%`
      },
      componentBreakdown: this.results.componentStats,
      unusedComponents: this.results.unusedComponents,
      duplicateComponents: Object.fromEntries(this.results.duplicateComponents),
      backupFiles: this.results.backupFiles,
      topImportPatterns: this.getTopImportPatterns(),
      recommendations: this.generateRecommendations()
    };

    return report;
  }

  getTopImportPatterns() {
    const patterns = Array.from(this.results.importPatterns.entries())
      .map(([path, components]) => ({
        path,
        componentCount: components.length,
        uniqueComponents: [...new Set(components)].length
      }))
      .sort((a, b) => b.componentCount - a.componentCount)
      .slice(0, 10);

    return patterns;
  }

  generateRecommendations() {
    const recommendations = [];

    if (this.results.unusedComponents.length > 50) {
      recommendations.push('HIGH PRIORITY: Remove 50+ unused components to reduce bundle size');
    }

    if (this.results.duplicateComponents.size > 10) {
      recommendations.push('CRITICAL: Consolidate duplicate components following atomic design');
    }

    if (this.results.backupFiles.length > 0) {
      recommendations.push(`CLEANUP: Remove ${this.results.backupFiles.length} backup files`);
    }

    const usageRate = (this.results.usedComponents.size / this.results.componentStats.total) * 100;
    if (usageRate < 60) {
      recommendations.push('OPTIMIZATION: Less than 60% component usage - significant cleanup opportunity');
    }

    return recommendations;
  }

  // Main execution
  async run() {
    console.log('🔍 Starting HIVE Component Usage Audit...\n');

    console.log('1. Finding source files...');
    const sourceFiles = this.findSourceFiles();
    console.log(`   Found ${sourceFiles.length} source files`);

    console.log('2. Cataloging UI components...');
    const components = this.findUIComponents();
    console.log(`   Found ${components.size} total components`);

    console.log('3. Finding backup files...');
    this.findBackupFiles();
    console.log(`   Found ${this.results.backupFiles.length} backup files`);

    console.log('4. Analyzing component usage...');
    this.analyzeUsage(sourceFiles, components);

    console.log('5. Identifying unused components...');
    this.identifyUnusedComponents(components);

    console.log('6. Generating report...\n');
    const report = this.generateReport();

    // Write detailed report
    fs.writeFileSync('hive-component-audit-report.json', JSON.stringify(report, null, 2));

    // Display summary
    console.log('📊 AUDIT SUMMARY');
    console.log('================');
    console.log(`Total Components: ${report.summary.totalComponents}`);
    console.log(`Used Components: ${report.summary.usedComponents} (${report.summary.usageRate})`);
    console.log(`Unused Components: ${report.summary.unusedComponents}`);
    console.log(`Duplicate Components: ${report.summary.duplicateComponents}`);
    console.log(`Backup Files: ${report.summary.backupFilesToClean}`);

    console.log('\n🎯 TOP RECOMMENDATIONS');
    console.log('======================');
    report.recommendations.forEach((rec, i) => {
      console.log(`${i + 1}. ${rec}`);
    });

    console.log(`\n📄 Detailed report saved to: hive-component-audit-report.json`);

    return report;
  }
}

// Execute if run directly
if (require.main === module) {
  const auditor = new ComponentUsageAuditor();
  auditor.run().catch(console.error);
}

module.exports = ComponentUsageAuditor;