#!/usr/bin/env node

/**
 * Final Console Cleanup Script
 * Removes ALL console.log, console.debug, console.info statements
 * Preserves console.warn and console.error (already migrated to logger)
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Statistics tracking
let stats = {
  filesProcessed: 0,
  filesModified: 0,
  statementsRemoved: 0,
  filesSkipped: 0
};

// More aggressive patterns to match console statements
const REMOVE_PATTERNS = [
  // Single-line console.log/debug/info
  /^\s*console\.(log|debug|info)\([^)]*\);?\s*$/gm,
  
  // Multi-line console statements (up to 10 lines)
  /^\s*console\.(log|debug|info)\([^)]*\n([^)]*\n){0,8}[^)]*\);?\s*$/gm,
  
  // Console statements with template literals
  /^\s*console\.(log|debug|info)\(`[^`]*`\);?\s*$/gm,
  
  // Console statements in callbacks/arrows
  /\(\) => console\.(log|debug|info)\([^)]*\)/g,
  /\(([^)]*)\) => console\.(log|debug|info)\([^)]*\)/g,
  
  // Console in object properties
  /(\w+):\s*\(\) => console\.(log|debug|info)\([^)]*\)/g,
  /(\w+):\s*\(([^)]*)\) => console\.(log|debug|info)\([^)]*\)/g,
  
  // Standalone console statements with complex arguments
  /console\.(log|debug|info)\([^;]+\);?/g
];

function removeConsoleStatements(content) {
  let modified = content;
  let changesMade = false;
  let removedCount = 0;
  
  // Apply each pattern
  REMOVE_PATTERNS.forEach(pattern => {
    const before = modified;
    modified = modified.replace(pattern, (match) => {
      // Check if this is in a callback that needs a placeholder
      if (match.includes('=>')) {
        removedCount++;
        return match.replace(/console\.(log|debug|info)\([^)]*\)/, '{}');
      }
      // For standalone statements, remove entirely
      removedCount++;
      return '';
    });
    if (before !== modified) {
      changesMade = true;
    }
  });
  
  // Clean up empty lines left behind
  modified = modified.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return { modified, changesMade, removedCount };
}

function processFile(filePath) {
  // Skip test files, scripts, and storybook files
  if (filePath.includes('.test.') || 
      filePath.includes('.spec.') || 
      filePath.includes('/test/') ||
      filePath.includes('/scripts/') ||
      filePath.includes('.stories.') ||
      filePath.includes('/node_modules/')) {
    stats.filesSkipped++;
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Quick check if file has console.log/debug/info
  if (!content.includes('console.log') && 
      !content.includes('console.debug') && 
      !content.includes('console.info')) {
    stats.filesProcessed++;
    return;
  }
  
  const { modified, changesMade, removedCount } = removeConsoleStatements(content);
  
  if (changesMade) {
    fs.writeFileSync(filePath, modified, 'utf8');
    stats.filesModified++;
    stats.statementsRemoved += removedCount;
    console.log(`✓ Removed ${removedCount} console statements from ${filePath}`);
  }
  
  stats.filesProcessed++;
}

function cleanDirectory(directory) {
  console.log(`\n🧹 Cleaning console statements in ${directory}...\n`);
  
  // Find all TypeScript and JavaScript files
  const files = glob.sync(`${directory}/**/*.{ts,tsx,js,jsx}`, {
    ignore: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/out/**',
      '**/coverage/**',
      '**/scripts/**',
      '**/*.test.*',
      '**/*.spec.*',
      '**/*.stories.*'
    ]
  });
  
  console.log(`Found ${files.length} files to process\n`);
  
  files.forEach(file => {
    processFile(file);
  });
}

// Main execution
function main() {
  console.log('════════════════════════════════════════════');
  console.log('     Final Console Statement Cleanup');
  console.log('════════════════════════════════════════════');
  
  // Process main source directories
  const directories = [
    'apps/web/src',
    'apps/admin/src',
    'packages/ui/src',
    'packages/core/src',
    'packages/hooks/src',
    'packages/api-client/src',
    'packages/auth-logic/src'
  ];
  
  directories.forEach(dir => {
    if (fs.existsSync(dir)) {
      cleanDirectory(dir);
    }
  });
  
  // Print summary
  console.log('\n════════════════════════════════════════════');
  console.log('                 SUMMARY');
  console.log('════════════════════════════════════════════');
  console.log(`✓ Files processed: ${stats.filesProcessed}`);
  console.log(`✓ Files modified: ${stats.filesModified}`);
  console.log(`✓ Files skipped: ${stats.filesSkipped}`);
  console.log(`✓ Console statements removed: ${stats.statementsRemoved}`);
  console.log('════════════════════════════════════════════\n');
  
  if (stats.statementsRemoved > 0) {
    console.log('✅ Successfully removed console statements!');
    console.log('📝 Note: Review the changes to ensure no critical debugging was removed.');
    console.log('   Some statements in callbacks were replaced with empty {} placeholders.\n');
  } else {
    console.log('✨ No console.log/debug/info statements found to remove.\n');
  }
}

// Run the cleanup
main();