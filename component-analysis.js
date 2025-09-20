#!/usr/bin/env node

/**
 * HIVE Component Usage Analysis Script
 *
 * This script analyzes component usage across the HIVE codebase to:
 * 1. Map all component imports and usage
 * 2. Identify unused/dead components
 * 3. Find duplicate components with similar functionality
 * 4. Analyze component dependencies
 * 5. Generate usage statistics
 */

const fs = require('fs');
const path = require('path');

// Configuration
const HIVE_ROOT = process.cwd();
const APPS_DIR = path.join(HIVE_ROOT, 'apps');
const PACKAGES_UI_DIR = path.join(HIVE_ROOT, 'packages/ui/src');

// Component locations to analyze
const COMPONENT_DIRECTORIES = [
  'packages/ui/src/atomic/atoms',
  'packages/ui/src/atomic/molecules',
  'packages/ui/src/atomic/organisms',
  'packages/ui/src/atomic/ui',
  'packages/ui/src/components/ui',
  'packages/ui/src/components'
];

// App directories to scan for imports
const APP_DIRECTORIES = [
  'apps/web/src',
  'apps/admin/src'
];

class ComponentAnalyzer {
  constructor() {
    this.components = new Map();
    this.imports = new Map();
    this.duplicates = new Map();
    this.usage = new Map();
  }

  // Recursively find all TypeScript/React files
  findFiles(dir, extensions = ['.tsx', '.ts']) {
    const files = [];

    if (!fs.existsSync(dir)) {
      console.warn(`Directory does not exist: ${dir}`);
      return files;
    }

    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !item.includes('node_modules') && !item.includes('.git')) {
        files.push(...this.findFiles(fullPath, extensions));
      } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
        // Skip test and story files for component discovery
        if (!item.includes('.test.') && !item.includes('.stories.')) {
          files.push(fullPath);
        }
      }
    }

    return files;
  }

  // Extract component name from file path
  getComponentName(filePath) {
    const baseName = path.basename(filePath, path.extname(filePath));
    // Convert kebab-case to PascalCase for component names
    return baseName.split('-').map(part =>
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join('');
  }

  // Analyze component file for exports
  analyzeComponentFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const componentName = this.getComponentName(filePath);
      const relativePath = path.relative(HIVE_ROOT, filePath);

      // Extract exports
      const exports = this.extractExports(content);
      const imports = this.extractImports(content);

      const component = {
        name: componentName,
        path: relativePath,
        fullPath: filePath,
        exports,
        imports,
        size: content.length,
        directory: this.getDirectory(relativePath)
      };

      this.components.set(componentName, component);
      return component;
    } catch (error) {
      console.warn(`Error analyzing component file ${filePath}:`, error.message);
      return null;
    }
  }

  // Extract export statements from file content
  extractExports(content) {
    const exports = [];

    // Named exports
    const namedExportRegex = /export\s+(?:const|function|class|interface|type)\s+(\w+)/g;
    let match;
    while ((match = namedExportRegex.exec(content)) !== null) {
      exports.push({ name: match[1], type: 'named' });
    }

    // Default export
    const defaultExportRegex = /export\s+default\s+(?:function\s+)?(\w+)|export\s*\{\s*(\w+)\s+as\s+default\s*\}/g;
    while ((match = defaultExportRegex.exec(content)) !== null) {
      const exportName = match[1] || match[2];
      if (exportName) {
        exports.push({ name: exportName, type: 'default' });
      }
    }

    return exports;
  }

  // Extract import statements from file content
  extractImports(content) {
    const imports = [];

    // Import statements
    const importRegex = /import\s+(?:\{([^}]+)\}|\*\s+as\s+(\w+)|(\w+))\s+from\s+['"]([^'"]+)['"]/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const [, namedImports, namespaceImport, defaultImport, source] = match;

      if (namedImports) {
        // Named imports
        const names = namedImports.split(',').map(name => name.trim());
        names.forEach(name => {
          imports.push({ name, source, type: 'named' });
        });
      } else if (namespaceImport) {
        // Namespace import
        imports.push({ name: namespaceImport, source, type: 'namespace' });
      } else if (defaultImport) {
        // Default import
        imports.push({ name: defaultImport, source, type: 'default' });
      }
    }

    return imports;
  }

  // Get directory category for component
  getDirectory(relativePath) {
    if (relativePath.includes('atomic/atoms')) return 'atomic-atoms';
    if (relativePath.includes('atomic/molecules')) return 'atomic-molecules';
    if (relativePath.includes('atomic/organisms')) return 'atomic-organisms';
    if (relativePath.includes('atomic/ui')) return 'atomic-ui';
    if (relativePath.includes('components/ui')) return 'shadcn-ui';
    if (relativePath.includes('components/')) return 'feature-components';
    return 'other';
  }

  // Analyze all components
  analyzeComponents() {
    console.log('🔍 Discovering components...');

    COMPONENT_DIRECTORIES.forEach(dir => {
      const fullDir = path.join(HIVE_ROOT, dir);
      const files = this.findFiles(fullDir);

      console.log(`📁 Analyzing ${files.length} files in ${dir}`);

      files.forEach(file => {
        this.analyzeComponentFile(file);
      });
    });

    console.log(`✅ Found ${this.components.size} components`);
  }

  // Analyze usage in apps
  analyzeUsage() {
    console.log('🔍 Analyzing component usage in apps...');

    APP_DIRECTORIES.forEach(appDir => {
      const fullDir = path.join(HIVE_ROOT, appDir);
      const files = this.findFiles(fullDir);

      console.log(`📱 Scanning ${files.length} files in ${appDir}`);

      files.forEach(file => {
        this.analyzeUsageInFile(file);
      });
    });
  }

  // Analyze usage in a specific file
  analyzeUsageInFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const imports = this.extractImports(content);
      const relativePath = path.relative(HIVE_ROOT, filePath);

      imports.forEach(imp => {
        // Track usage of our components
        if (this.isHiveComponent(imp.source)) {
          const usageKey = `${imp.name}:${imp.source}`;

          if (!this.usage.has(usageKey)) {
            this.usage.set(usageKey, {
              componentName: imp.name,
              source: imp.source,
              usedIn: [],
              count: 0
            });
          }

          const usage = this.usage.get(usageKey);
          usage.usedIn.push(relativePath);
          usage.count++;
        }
      });
    } catch (error) {
      console.warn(`Error analyzing usage in ${filePath}:`, error.message);
    }
  }

  // Check if import source is a HIVE component
  isHiveComponent(source) {
    return source.includes('@hive/ui') ||
           source.includes('../') ||
           source.includes('./') ||
           source.includes('packages/ui');
  }

  // Find duplicate components with similar names or functionality
  findDuplicates() {
    console.log('🔍 Finding duplicate components...');

    const componentsByName = new Map();

    this.components.forEach((component, key) => {
      const baseName = component.name.toLowerCase();

      if (!componentsByName.has(baseName)) {
        componentsByName.set(baseName, []);
      }

      componentsByName.get(baseName).push(component);
    });

    // Find components with similar names
    componentsByName.forEach((components, name) => {
      if (components.length > 1) {
        this.duplicates.set(name, {
          name,
          components,
          type: 'name-duplicate'
        });
      }
    });

    // Find components with similar exports (potential functional duplicates)
    this.findFunctionalDuplicates();
  }

  // Find components that export similar functionality
  findFunctionalDuplicates() {
    const exportSignatures = new Map();

    this.components.forEach(component => {
      const signature = component.exports.map(exp => exp.name).sort().join(',');

      if (signature && !exportSignatures.has(signature)) {
        exportSignatures.set(signature, []);
      }

      if (signature) {
        exportSignatures.get(signature).push(component);
      }
    });

    exportSignatures.forEach((components, signature) => {
      if (components.length > 1) {
        const key = `functional-${signature}`;
        this.duplicates.set(key, {
          signature,
          components,
          type: 'functional-duplicate'
        });
      }
    });
  }

  // Generate comprehensive report
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalComponents: this.components.size,
        totalUsages: this.usage.size,
        totalDuplicates: this.duplicates.size
      },
      componentsByDirectory: this.getComponentsByDirectory(),
      usageStatistics: this.getUsageStatistics(),
      unusedComponents: this.getUnusedComponents(),
      duplicateComponents: this.getDuplicateComponents(),
      migrationComplexity: this.getMigrationComplexity()
    };

    return report;
  }

  // Get components grouped by directory
  getComponentsByDirectory() {
    const byDirectory = {};

    this.components.forEach(component => {
      const dir = component.directory;
      if (!byDirectory[dir]) {
        byDirectory[dir] = [];
      }
      byDirectory[dir].push({
        name: component.name,
        path: component.path,
        size: component.size,
        exports: component.exports.length
      });
    });

    return byDirectory;
  }

  // Get usage statistics
  getUsageStatistics() {
    const stats = [];

    this.usage.forEach(usage => {
      stats.push({
        component: usage.componentName,
        source: usage.source,
        usageCount: usage.count,
        usedInFiles: usage.usedIn.length,
        files: usage.usedIn
      });
    });

    return stats.sort((a, b) => b.usageCount - a.usageCount);
  }

  // Get unused components
  getUnusedComponents() {
    const unused = [];
    const usedComponents = new Set();

    // Collect all used component names
    this.usage.forEach(usage => {
      usedComponents.add(usage.componentName);
    });

    this.components.forEach(component => {
      const isUsed = component.exports.some(exp => usedComponents.has(exp.name));

      if (!isUsed) {
        unused.push({
          name: component.name,
          path: component.path,
          directory: component.directory,
          size: component.size,
          exports: component.exports
        });
      }
    });

    return unused;
  }

  // Get duplicate components
  getDuplicateComponents() {
    const duplicates = [];

    this.duplicates.forEach(duplicate => {
      duplicates.push({
        type: duplicate.type,
        name: duplicate.name || duplicate.signature,
        components: duplicate.components.map(comp => ({
          name: comp.name,
          path: comp.path,
          directory: comp.directory,
          size: comp.size
        }))
      });
    });

    return duplicates;
  }

  // Calculate migration complexity
  getMigrationComplexity() {
    const complexity = {};

    this.components.forEach(component => {
      const usageCount = this.getComponentUsageCount(component);
      const importComplexity = component.imports.length;
      const exportComplexity = component.exports.length;

      let score = 0;
      if (usageCount > 10) score += 3;
      else if (usageCount > 5) score += 2;
      else if (usageCount > 1) score += 1;

      if (importComplexity > 10) score += 2;
      else if (importComplexity > 5) score += 1;

      if (exportComplexity > 5) score += 1;

      complexity[component.name] = {
        component: component.name,
        path: component.path,
        directory: component.directory,
        usageCount,
        importComplexity,
        exportComplexity,
        complexityScore: score,
        riskLevel: score >= 5 ? 'high' : score >= 3 ? 'medium' : 'low'
      };
    });

    return Object.values(complexity).sort((a, b) => b.complexityScore - a.complexityScore);
  }

  // Get usage count for a component
  getComponentUsageCount(component) {
    let count = 0;

    component.exports.forEach(exp => {
      this.usage.forEach(usage => {
        if (usage.componentName === exp.name) {
          count += usage.count;
        }
      });
    });

    return count;
  }

  // Run full analysis
  async run() {
    console.log('🚀 Starting HIVE Component Analysis...\n');

    try {
      this.analyzeComponents();
      this.analyzeUsage();
      this.findDuplicates();

      const report = this.generateReport();

      // Write report to file
      const reportPath = path.join(HIVE_ROOT, 'component-analysis-report.json');
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

      console.log('\n📊 Analysis Complete!');
      console.log(`📄 Detailed report saved to: ${reportPath}`);

      // Print summary
      this.printSummary(report);

      return report;
    } catch (error) {
      console.error('❌ Analysis failed:', error);
      throw error;
    }
  }

  // Print summary to console
  printSummary(report) {
    console.log('\n📋 SUMMARY');
    console.log('=' * 50);
    console.log(`📦 Total Components: ${report.summary.totalComponents}`);
    console.log(`🔗 Total Usages: ${report.summary.totalUsages}`);
    console.log(`🔄 Duplicate Components: ${report.summary.totalDuplicates}`);

    console.log('\n📁 Components by Directory:');
    Object.entries(report.componentsByDirectory).forEach(([dir, components]) => {
      console.log(`  ${dir}: ${components.length} components`);
    });

    console.log('\n🚨 Top 10 Most Used Components:');
    report.usageStatistics.slice(0, 10).forEach((usage, i) => {
      console.log(`  ${i + 1}. ${usage.component} (${usage.usageCount} uses)`);
    });

    console.log('\n💀 Unused Components:', report.unusedComponents.length);
    console.log('\n🔄 Duplicate Components:', report.duplicateComponents.length);

    console.log('\n⚡ High Complexity Migrations:');
    report.migrationComplexity
      .filter(comp => comp.riskLevel === 'high')
      .slice(0, 5)
      .forEach(comp => {
        console.log(`  🚨 ${comp.component} (Score: ${comp.complexityScore})`);
      });
  }
}

// Run analysis if called directly
if (require.main === module) {
  const analyzer = new ComponentAnalyzer();
  analyzer.run().catch(console.error);
}

module.exports = ComponentAnalyzer;