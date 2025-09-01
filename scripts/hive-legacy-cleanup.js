#!/usr/bin/env node

/**
 * HIVE Legacy Cleanup Master Tool
 * Orchestrates complete legacy system cleanup and migration
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Import our specialized tools
const LegacyMigrator = require('./migrate-legacy-components.js');
const DesignTokenAuditor = require('./audit-design-tokens.js');
const ComponentDependencyAnalyzer = require('./analyze-component-dependencies.js');

class HiveLegacyCleanup {
  constructor() {
    this.migrator = new LegacyMigrator();
    this.auditor = new DesignTokenAuditor();
    this.analyzer = new ComponentDependencyAnalyzer();
    
    this.stats = {
      startTime: Date.now(),
      phase: '',
      filesBackedUp: 0,
      componentsRemoved: 0,
      importsUpdated: 0,
      tokensFixed: 0
    };
  }

  async runCompleteCleanup(options = {}) {
    const {
      directory = '.',
      backup = true,
      dryRun = false,
      skipTests = false
    } = options;

    console.log('🚀 HIVE Legacy Cleanup - Complete System Migration');
    console.log('====================================================\\n');

    try {
      // Phase 1: Analysis & Backup
      await this.phase1_AnalysisAndBackup(directory, backup);
      
      // Phase 2: Component Migration  
      await this.phase2_ComponentMigration(directory, dryRun);
      
      // Phase 3: Design Token Cleanup
      await this.phase3_DesignTokenCleanup(directory, dryRun);
      
      // Phase 4: File Cleanup
      await this.phase4_FileCleanup(directory, dryRun);
      
      // Phase 5: Validation
      if (!skipTests) {
        await this.phase5_Validation(directory);
      }
      
      // Final Report
      this.generateFinalReport();

    } catch (error) {
      console.error('❌ Cleanup failed:', error);
      this.restoreBackup();
    }
  }

  async phase1_AnalysisAndBackup(directory, backup) {
    this.stats.phase = 'Analysis & Backup';
    console.log('📊 Phase 1: Analysis & Backup\\n');

    // Create backup if requested
    if (backup) {
      await this.createBackup(directory);
    }

    // Analyze current state
    console.log('🔍 Analyzing component dependencies...');
    await this.analyzer.analyzeDirectory(directory);
    
    console.log('\\n🎨 Auditing design tokens...');  
    await this.auditor.auditDirectory(directory);

    // Generate migration plan
    const plan = this.analyzer.generateMigrationPlan();
    console.log(`\\n✅ Phase 1 Complete - Found ${plan.summary.migrationCandidates} components to migrate\\n`);
  }

  async phase2_ComponentMigration(directory, dryRun) {
    this.stats.phase = 'Component Migration';
    console.log('🔄 Phase 2: Component Migration\\n');

    if (dryRun) {
      console.log('🧪 DRY RUN - No changes will be made');
      const report = await this.migrator.generateReport(directory);
      console.log('Migration Preview:', JSON.stringify(report, null, 2));
    } else {
      console.log('⚡ Migrating legacy components to enhanced versions...');
      await this.migrator.migrateDirectory(directory);
      this.stats.importsUpdated = this.migrator.stats.importsMigrated;
    }

    console.log('\\n✅ Phase 2 Complete\\n');
  }

  async phase3_DesignTokenCleanup(directory, dryRun) {
    this.stats.phase = 'Design Token Cleanup';
    console.log('🎨 Phase 3: Design Token Cleanup\\n');

    if (dryRun) {
      console.log('🧪 DRY RUN - Showing token issues only');
      await this.auditor.auditDirectory(directory);
    } else {
      console.log('🔧 Auto-fixing design token issues...');
      await this.auditor.autoFix(directory);
      this.stats.tokensFixed = this.auditor.stats.issuesFound;
    }

    console.log('\\n✅ Phase 3 Complete\\n');
  }

  async phase4_FileCleanup(directory, dryRun) {
    this.stats.phase = 'File Cleanup';
    console.log('🧹 Phase 4: File Cleanup\\n');

    const filesToRemove = await this.identifyObsoleteFiles(directory);
    
    if (dryRun) {
      console.log('🧪 DRY RUN - Files that would be removed:');
      filesToRemove.forEach(file => console.log(`  - ${file}`));
    } else {
      console.log('🗑️  Removing obsolete legacy files...');
      await this.removeObsoleteFiles(filesToRemove);
      this.stats.componentsRemoved = filesToRemove.length;
    }

    // Update index.ts exports
    if (!dryRun) {
      await this.updateExports(directory);
    }

    console.log('\\n✅ Phase 4 Complete\\n');
  }

  async phase5_Validation(directory) {
    this.stats.phase = 'Validation';
    console.log('✅ Phase 5: Validation\\n');

    const validationResults = {
      typescript: false,
      linting: false,
      build: false,
      tests: false
    };

    // TypeScript check
    console.log('📝 Running TypeScript check...');
    try {
      execSync('npx tsc --noEmit', { 
        cwd: directory, 
        stdio: 'pipe' 
      });
      validationResults.typescript = true;
      console.log('✅ TypeScript check passed');
    } catch (error) {
      console.log('❌ TypeScript check failed');
      console.log(error.stdout?.toString());
    }

    // ESLint check
    console.log('\\n🔍 Running ESLint check...');
    try {
      execSync('npx eslint . --ext .ts,.tsx --max-warnings 0', { 
        cwd: directory,
        stdio: 'pipe' 
      });
      validationResults.linting = true;
      console.log('✅ ESLint check passed');
    } catch (error) {
      console.log('❌ ESLint check failed');
      // Show first few errors
      const output = error.stdout?.toString() || '';
      console.log(output.split('\\n').slice(0, 10).join('\\n'));
    }

    // Build check (if package.json has build script)
    if (fs.existsSync(path.join(directory, 'package.json'))) {
      const pkg = JSON.parse(fs.readFileSync(path.join(directory, 'package.json')));
      if (pkg.scripts?.build) {
        console.log('\\n🔨 Running build check...');
        try {
          execSync('npm run build', { 
            cwd: directory,
            stdio: 'pipe',
            timeout: 120000 // 2 minute timeout
          });
          validationResults.build = true;
          console.log('✅ Build check passed');
        } catch (error) {
          console.log('❌ Build check failed');
        }
      }
    }

    console.log('\\n✅ Phase 5 Complete\\n');
    return validationResults;
  }

  async createBackup(directory) {
    const backupDir = `./hive-legacy-backup-${Date.now()}`;
    console.log(`💾 Creating backup at: ${backupDir}`);
    
    try {
      // Create backup directory
      fs.mkdirSync(backupDir, { recursive: true });
      
      // Copy key directories
      const dirsToBackup = [
        'packages/ui/src/atomic',
        'packages/ui/src/components',
        'apps/web/src'
      ];
      
      for (const dir of dirsToBackup) {
        const fullPath = path.join(directory, dir);
        if (fs.existsSync(fullPath)) {
          execSync(`cp -r "${fullPath}" "${backupDir}/${dir.replace(/\//g, '_')}"`, {
            stdio: 'pipe'
          });
          this.stats.filesBackedUp++;
        }
      }
      
      this.backupLocation = backupDir;
      console.log(`✅ Backup created with ${this.stats.filesBackedUp} directories`);
    } catch (error) {
      console.error('❌ Backup failed:', error);
      throw error;
    }
  }

  async identifyObsoleteFiles(directory) {
    const obsoleteFiles = [];
    
    // Legacy component files to remove
    const legacyPatterns = [
      '**/button.tsx',
      '**/input.tsx', 
      '**/select.tsx',
      '**/hive-button.tsx',
      '**/hive-input.tsx',
      '**/hive-select.tsx',
      '**/hive-card.tsx',
      '**/hive-modal.tsx'
    ];
    
    const glob = require('glob');
    
    for (const pattern of legacyPatterns) {
      const files = glob.sync(`${directory}/${pattern}`, {
        ignore: ['**/node_modules/**', '**/dist/**', '**/*.stories.*']
      });
      
      // Only mark as obsolete if enhanced version exists
      for (const file of files) {
        const baseName = path.basename(file, '.tsx');
        const dir = path.dirname(file);
        const enhancedFile = path.join(dir, `${baseName}-enhanced.tsx`);
        
        if (fs.existsSync(enhancedFile) || baseName.startsWith('hive-')) {
          obsoleteFiles.push(file);
        }
      }
    }
    
    return obsoleteFiles;
  }

  async removeObsoleteFiles(files) {
    for (const file of files) {
      try {
        fs.unlinkSync(file);
        console.log(`  🗑️  Removed: ${path.relative(process.cwd(), file)}`);
      } catch (error) {
        console.log(`  ❌ Failed to remove: ${file}`);
      }
    }
  }

  async updateExports(directory) {
    console.log('📝 Updating index.ts exports...');
    
    const indexPaths = [
      'packages/ui/src/atomic/atoms/index.ts',
      'packages/ui/src/atomic/molecules/index.ts', 
      'packages/ui/src/atomic/organisms/index.ts',
      'packages/ui/src/index.ts'
    ];
    
    for (const indexPath of indexPaths) {
      const fullPath = path.join(directory, indexPath);
      if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // Remove exports for deleted files
        content = content.replace(/export \* from '\.\/button';?\n/g, '');
        content = content.replace(/export \* from '\.\/input';?\n/g, '');
        content = content.replace(/export \* from '\.\/select';?\n/g, '');
        content = content.replace(/export \* from '\.\/hive-[^']+';?\n/g, '');
        
        // Update enhanced exports to standard names
        content = content.replace(/ButtonEnhanced/g, 'Button');
        content = content.replace(/InputEnhanced/g, 'Input');
        content = content.replace(/SelectEnhanced/g, 'Select');
        
        fs.writeFileSync(fullPath, content);
        console.log(`  ✅ Updated: ${indexPath}`);
      }
    }
  }

  restoreBackup() {
    if (this.backupLocation && fs.existsSync(this.backupLocation)) {
      console.log('\\n🔄 Restoring from backup...');
      try {
        execSync(`cp -r "${this.backupLocation}"/* .`, { stdio: 'pipe' });
        console.log('✅ Backup restored successfully');
      } catch (error) {
        console.error('❌ Backup restoration failed:', error);
      }
    }
  }

  generateFinalReport() {
    const duration = Math.round((Date.now() - this.stats.startTime) / 1000);
    
    console.log('🎉 HIVE Legacy Cleanup Complete!');
    console.log('=====================================\\n');
    
    console.log('📊 Final Statistics:');
    console.log(`⏱️  Total time: ${duration}s`);
    console.log(`📁 Files backed up: ${this.stats.filesBackedUp}`);
    console.log(`🔄 Imports updated: ${this.stats.importsUpdated}`);
    console.log(`🎨 Tokens fixed: ${this.stats.tokensFixed}`);
    console.log(`🗑️  Components removed: ${this.stats.componentsRemoved}`);
    
    console.log('\\n✨ Your HIVE design system is now clean and consistent!');
    console.log('\\n🚀 Next Steps:');
    console.log('  1. Run your test suite');
    console.log('  2. Test the application thoroughly');
    console.log('  3. Update Storybook documentation');
    console.log('  4. Deploy and monitor for issues');
    
    if (this.backupLocation) {
      console.log(`\\n💾 Backup available at: ${this.backupLocation}`);
      console.log('   (Remove when satisfied with migration)');
    }
  }
}

// CLI Usage
if (require.main === module) {
  const cleanup = new HiveLegacyCleanup();
  const command = process.argv[2];
  
  const options = {
    directory: process.argv[3] || '.',
    backup: !process.argv.includes('--no-backup'),
    dryRun: process.argv.includes('--dry-run'),
    skipTests: process.argv.includes('--skip-tests')
  };

  switch (command) {
    case 'cleanup':
      cleanup.runCompleteCleanup(options);
      break;
    
    case 'backup':
      cleanup.createBackup(options.directory);
      break;
    
    default:
      console.log(`
🚀 HIVE Legacy Cleanup Tool

Usage: 
  node hive-legacy-cleanup.js cleanup [directory] [options]
  node hive-legacy-cleanup.js backup [directory]

Options:
  --dry-run      Show what would be changed without making changes
  --no-backup    Skip creating backup (not recommended)
  --skip-tests   Skip validation tests (faster but less safe)

Examples:
  node hive-legacy-cleanup.js cleanup                    # Clean current directory with backup
  node hive-legacy-cleanup.js cleanup --dry-run          # Preview changes only
  node hive-legacy-cleanup.js cleanup apps/web/src       # Clean specific directory
  node hive-legacy-cleanup.js backup                     # Create backup only
      `);
  }
}

module.exports = HiveLegacyCleanup;