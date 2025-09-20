#!/usr/bin/env node

/**
 * EMERGENCY CLEANUP: Remove 1,516 backup files immediately
 * This is critical infrastructure cleanup
 */

const fs = require('fs');
const { execSync } = require('child_process');

class EmergencyCleanup {
  constructor() {
    this.results = {
      backupFilesFound: [],
      deletedFiles: [],
      errors: [],
      totalSizeSaved: 0
    };
  }

  // Find all backup files across the repository
  findBackupFiles() {
    console.log('🔍 Finding all backup files...');

    const patterns = [
      '*.bak',
      '*.bak[0-9]',
      '*.bak5',
      '*.bak6',
      '*.tsx.bak*',
      '*.ts.bak*',
      '*.js.bak*',
      '*.json.bak*'
    ];

    patterns.forEach(pattern => {
      try {
        const files = execSync(`find . -name "${pattern}" -not -path "./node_modules/*" -not -path "./.git/*" 2>/dev/null || echo`).toString().trim().split('\n').filter(f => f.length > 0);
        this.results.backupFilesFound.push(...files);
      } catch (error) {
        console.warn(`Error finding ${pattern}:`, error.message);
      }
    });

    // Remove duplicates
    this.results.backupFilesFound = [...new Set(this.results.backupFilesFound)];
    console.log(`📊 Found ${this.results.backupFilesFound.length} backup files`);

    return this.results.backupFilesFound;
  }

  // Calculate total size of backup files
  calculateBackupSize() {
    let totalSize = 0;

    this.results.backupFilesFound.forEach(file => {
      try {
        const stats = fs.statSync(file);
        totalSize += stats.size;
      } catch (error) {
        console.warn(`Cannot stat ${file}:`, error.message);
      }
    });

    this.results.totalSizeSaved = totalSize;
    console.log(`💾 Total backup files size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);

    return totalSize;
  }

  // Show preview of files to be deleted
  showPreview() {
    console.log('\n📋 BACKUP FILES TO BE DELETED:');
    console.log('================================');

    // Group by directory for better readability
    const byDirectory = new Map();

    this.results.backupFilesFound.forEach(file => {
      const dir = file.split('/').slice(0, -1).join('/') || '.';
      if (!byDirectory.has(dir)) {
        byDirectory.set(dir, []);
      }
      byDirectory.get(dir).push(file.split('/').pop());
    });

    // Show grouped preview
    Array.from(byDirectory.entries()).slice(0, 10).forEach(([dir, files]) => {
      console.log(`\n📁 ${dir}/`);
      files.slice(0, 5).forEach(file => {
        console.log(`   - ${file}`);
      });
      if (files.length > 5) {
        console.log(`   ... and ${files.length - 5} more files`);
      }
    });

    if (byDirectory.size > 10) {
      console.log(`\n... and ${byDirectory.size - 10} more directories`);
    }

    console.log(`\n⚠️  TOTAL: ${this.results.backupFilesFound.length} files will be deleted`);
    console.log(`💾 SPACE SAVED: ${(this.results.totalSizeSaved / 1024 / 1024).toFixed(2)} MB`);
  }

  // Execute the cleanup
  executeCleanup(confirmDeletion = false) {
    if (!confirmDeletion) {
      console.log('\n🛑 DRY RUN MODE - No files will be deleted');
      console.log('To actually delete files, run with: node emergency-cleanup.js --delete');
      return;
    }

    console.log('\n🔥 EXECUTING CLEANUP...');

    let deletedCount = 0;
    let errorCount = 0;

    this.results.backupFilesFound.forEach(file => {
      try {
        fs.unlinkSync(file);
        this.results.deletedFiles.push(file);
        deletedCount++;

        if (deletedCount % 100 === 0) {
          console.log(`   Deleted ${deletedCount} files...`);
        }
      } catch (error) {
        this.results.errors.push({ file, error: error.message });
        errorCount++;
      }
    });

    console.log(`\n✅ CLEANUP COMPLETE`);
    console.log(`   Deleted: ${deletedCount} files`);
    console.log(`   Errors: ${errorCount} files`);
    console.log(`   Freed: ${(this.results.totalSizeSaved / 1024 / 1024).toFixed(2)} MB`);

    if (errorCount > 0) {
      console.log('\n❌ ERRORS:');
      this.results.errors.slice(0, 10).forEach(({ file, error }) => {
        console.log(`   ${file}: ${error}`);
      });
      if (this.results.errors.length > 10) {
        console.log(`   ... and ${this.results.errors.length - 10} more errors`);
      }
    }
  }

  // Generate cleanup report
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      action: 'Emergency Backup File Cleanup',
      summary: {
        totalBackupFiles: this.results.backupFilesFound.length,
        deletedFiles: this.results.deletedFiles.length,
        errors: this.results.errors.length,
        spaceSavedMB: (this.results.totalSizeSaved / 1024 / 1024).toFixed(2)
      },
      deletedFiles: this.results.deletedFiles,
      errors: this.results.errors
    };

    fs.writeFileSync('emergency-cleanup-report.json', JSON.stringify(report, null, 2));
    console.log(`\n📄 Cleanup report saved to: emergency-cleanup-report.json`);

    return report;
  }

  async run() {
    console.log('🚨 EMERGENCY BACKUP FILE CLEANUP STARTING...\n');

    const shouldDelete = process.argv.includes('--delete') || process.argv.includes('--execute');

    this.findBackupFiles();
    this.calculateBackupSize();
    this.showPreview();
    this.executeCleanup(shouldDelete);
    this.generateReport();

    return this.results;
  }
}

// Execute
const cleanup = new EmergencyCleanup();
cleanup.run().catch(console.error);