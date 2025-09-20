#!/usr/bin/env node

/**
 * EMERGENCY: Deep Import Analysis for HIVE
 * The initial audit showed 0% usage - this investigates WHY
 */

const fs = require('fs');
const { execSync } = require('child_process');

class EmergencyImportAnalyzer {
  constructor() {
    this.findings = {
      actualImports: [],
      importSources: new Map(),
      missingImports: [],
      brokenPaths: [],
      realUsage: new Map()
    };
  }

  // Search for actual @hive/ui imports across apps
  findActualImports() {
    console.log('🔍 Searching for actual @hive/ui imports...');

    try {
      const webImports = execSync(`grep -r "@hive/ui" apps/web/src --include="*.tsx" --include="*.ts" 2>/dev/null || echo "No imports found"`).toString();
      const adminImports = execSync(`grep -r "@hive/ui" apps/admin/src --include="*.tsx" --include="*.ts" 2>/dev/null || echo "No imports found"`).toString();

      console.log('Web app @hive/ui imports:');
      console.log(webImports);
      console.log('\nAdmin app @hive/ui imports:');
      console.log(adminImports);

      this.findings.actualImports = [webImports, adminImports];
    } catch (error) {
      console.error('Error searching imports:', error.message);
    }
  }

  // Look for relative imports that might be using components directly
  findRelativeImports() {
    console.log('\n🔍 Searching for relative imports to packages/ui...');

    try {
      const relativeImports = execSync(`grep -r "packages/ui" apps/ --include="*.tsx" --include="*.ts" 2>/dev/null || echo "No relative imports found"`).toString();
      console.log('Relative imports to packages/ui:');
      console.log(relativeImports);
    } catch (error) {
      console.error('Error searching relative imports:', error.message);
    }
  }

  // Check if components are being imported from other sources
  findAlternativeImports() {
    console.log('\n🔍 Searching for alternative component imports...');

    const commonComponents = ['Button', 'Card', 'Input', 'Modal', 'Avatar', 'Badge'];

    commonComponents.forEach(component => {
      try {
        const usage = execSync(`grep -r "import.*${component}" apps/ --include="*.tsx" --include="*.ts" 2>/dev/null | head -5 || echo "No ${component} imports"`).toString();
        if (usage && !usage.includes(`No ${component} imports`)) {
          console.log(`\n${component} imports:`);
          console.log(usage);
          this.findings.realUsage.set(component, usage);
        }
      } catch (error) {
        console.warn(`Error searching for ${component}:`, error.message);
      }
    });
  }

  // Check the actual @hive/ui package exports
  checkPackageExports() {
    console.log('\n🔍 Checking @hive/ui package exports...');

    try {
      const indexFile = 'packages/ui/src/index.ts';
      if (fs.existsSync(indexFile)) {
        const exports = fs.readFileSync(indexFile, 'utf8');
        console.log('Package exports from index.ts:');
        console.log(exports.substring(0, 1000) + '...');
      } else {
        console.log('❌ No index.ts found in packages/ui/src/');
      }

      // Check package.json exports
      const packageJson = 'packages/ui/package.json';
      if (fs.existsSync(packageJson)) {
        const pkg = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
        console.log('\nPackage.json exports configuration:');
        console.log(JSON.stringify(pkg.exports, null, 2));
      }
    } catch (error) {
      console.error('Error checking package exports:', error.message);
    }
  }

  // Check if apps are actually using the UI package
  checkUIPackageUsage() {
    console.log('\n🔍 Checking if apps declare @hive/ui as dependency...');

    const webPackage = 'apps/web/package.json';
    const adminPackage = 'apps/admin/package.json';

    [webPackage, adminPackage].forEach(pkgPath => {
      if (fs.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        const hasUIDepencency = pkg.dependencies && pkg.dependencies['@hive/ui'];
        console.log(`${pkgPath}: ${hasUIDepencency ? '✅ Has @hive/ui dependency' : '❌ No @hive/ui dependency'}`);

        if (hasUIDepencency) {
          console.log(`  Version: ${pkg.dependencies['@hive/ui']}`);
        }
      }
    });
  }

  // Generate emergency report
  generateEmergencyReport() {
    const report = {
      timestamp: new Date().toISOString(),
      crisis: 'Zero component usage detected',
      findings: this.findings,
      emergencyActions: [
        'Fix package.json dependencies',
        'Repair import paths',
        'Clean backup files immediately',
        'Consolidate duplicate components',
        'Establish proper atomic design structure'
      ]
    };

    fs.writeFileSync('emergency-import-analysis.json', JSON.stringify(report, null, 2));
    console.log('\n📄 Emergency report saved to: emergency-import-analysis.json');

    return report;
  }

  async run() {
    console.log('🚨 EMERGENCY IMPORT ANALYSIS STARTING...\n');

    this.findActualImports();
    this.findRelativeImports();
    this.findAlternativeImports();
    this.checkPackageExports();
    this.checkUIPackageUsage();

    return this.generateEmergencyReport();
  }
}

// Execute
const analyzer = new EmergencyImportAnalyzer();
analyzer.run().catch(console.error);