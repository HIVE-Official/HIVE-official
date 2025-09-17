#!/usr/bin/env node

/**
 * Simple console statement remover for HIVE platform
 * Removes console.log/error/warn/info statements from production code
 */

const fs = require('fs');
const path = require('path');

const config = {
  dryRun: process.argv.includes('--dry-run'),
  verbose: process.argv.includes('--verbose'),
  targetDirs: [
    'apps/web/src',
    'apps/admin/src',
    'packages/ui/src',
    'packages/core/src'
  ],
  excludeDirs: ['test', 'tests', '__tests__', '.test.', '.spec.', 'stories'],
  consoleMethods: ['log', 'error', 'warn', 'info', 'debug', 'trace']
};

let stats = {
  filesProcessed: 0,
  filesModified: 0,
  statementsRemoved: 0,
  errors: []
};

// Console removal patterns
const patterns = [
  // Simple single-line console statements
  /^\s*console\.(log|error|warn|info|debug|trace)\([^;]*\);?\s*$/gm,
  // Multi-line console statements (basic)
  /^\s*console\.(log|error|warn|info|debug|trace)\([^)]*\n[^)]*\);?\s*$/gm,
  // Console statements with template literals
  /^\s*console\.(log|error|warn|info|debug|trace)\(`[^`]*`\);?\s*$/gm
];

function shouldProcess(filePath) {
  // Skip test files
  if (config.excludeDirs.some(dir => filePath.includes(dir))) {
    return false;
  }
  // Only process TypeScript/JavaScript files
  return filePath.endsWith('.ts') || filePath.endsWith('.tsx') || 
         filePath.endsWith('.js') || filePath.endsWith('.jsx');
}

function removeConsoleFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let modified = content;
    let removedCount = 0;

    // Apply each pattern
    patterns.forEach(pattern => {
      const matches = modified.match(pattern);
      if (matches) {
        removedCount += matches.length;
        modified = modified.replace(pattern, '');
      }
    });

    // Clean up empty lines left behind
    modified = modified.replace(/^\s*\n\s*\n/gm, '\n');

    if (removedCount > 0) {
      if (!config.dryRun) {
        fs.writeFileSync(filePath, modified, 'utf8');
      }
      stats.filesModified++;
      stats.statementsRemoved += removedCount;
      
      if (config.verbose) {
        console.log(`  ✓ ${path.relative(process.cwd(), filePath)}: Removed ${removedCount} statements`);
      }
    }

    stats.filesProcessed++;
  } catch (error) {
    stats.errors.push({ file: filePath, error: error.message });
  }
}

function processDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`⚠️  Directory not found: ${dir}`);
    return;
  }

  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      processDirectory(fullPath);
    } else if (stat.isFile() && shouldProcess(fullPath)) {
      removeConsoleFromFile(fullPath);
    }
  });
}

console.log('🧹 Console Statement Remover for HIVE Platform');
console.log('═'.repeat(50));

if (config.dryRun) {
  console.log('🔍 DRY RUN MODE - No files will be modified\n');
}

console.log('📁 Processing directories:');
config.targetDirs.forEach(dir => console.log(`  • ${dir}`));
console.log('');

// Process each target directory
config.targetDirs.forEach(dir => {
  console.log(`\n📂 Processing ${dir}...`);
  processDirectory(dir);
});

// Print summary
console.log('\n' + '═'.repeat(50));
console.log('📊 Summary:');
console.log(`  Files processed: ${stats.filesProcessed}`);
console.log(`  Files modified: ${stats.filesModified}`);
console.log(`  Statements removed: ${stats.statementsRemoved}`);

if (stats.errors.length > 0) {
  console.log(`\n⚠️  Errors encountered: ${stats.errors.length}`);
  stats.errors.slice(0, 5).forEach(err => {
    console.log(`  - ${err.file}: ${err.error}`);
  });
}

if (config.dryRun) {
  console.log('\n💡 To apply changes, run without --dry-run flag');
} else {
  console.log('\n✅ Console statements removed successfully!');
  
  // Create restore script
  const restoreScript = `#!/bin/bash
# Restore script - run this if you need to undo console removal
git checkout -- ${config.targetDirs.join(' ')}
echo "✅ Files restored to previous state"
`;
  
  fs.writeFileSync('.refactoring-restore-console.sh', restoreScript);
  console.log('💾 Restore script created: .refactoring-restore-console.sh');
}

// Save removal log
const logData = {
  timestamp: new Date().toISOString(),
  dryRun: config.dryRun,
  stats: stats
};

fs.writeFileSync(
  `console-removal-${config.dryRun ? 'dryrun' : 'applied'}.json`,
  JSON.stringify(logData, null, 2)
);

process.exit(stats.errors.length > 0 ? 1 : 0);