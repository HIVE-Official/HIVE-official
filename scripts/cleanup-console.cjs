#!/usr/bin/env node

/**
 * Console Statement Cleanup Script
 * Removes console.log, console.debug, console.info statements
 * Keeps console.error and console.warn for now (will be replaced with proper logging)
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Statistics tracking
let stats = {
  filesProcessed: 0,
  consoleLogsRemoved: 0,
  consoleErrorsFound: 0,
  filesModified: 0
};

// Patterns to remove (console.log, debug, info)
const REMOVE_PATTERNS = [
  /^\s*console\.(log|debug|info)\([^)]*\);?\s*$/gm,  // Single line console statements
  /^\s*console\.(log|debug|info)\([^)]*\n[^)]*\);?\s*$/gm,  // Multi-line console statements
];

// Pattern to count (but not remove yet) console.error
const ERROR_PATTERN = /console\.error/g;

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let modified = content;
  let changesMade = false;
  
  // Count console.errors (for reporting)
  const errorMatches = content.match(ERROR_PATTERN);
  if (errorMatches) {
    stats.consoleErrorsFound += errorMatches.length;
  }
  
  // Remove console.log, debug, info
  REMOVE_PATTERNS.forEach(pattern => {
    const matches = modified.match(pattern);
    if (matches) {
      stats.consoleLogsRemoved += matches.length;
      modified = modified.replace(pattern, '');
      changesMade = true;
    }
  });
  
  // Clean up extra blank lines (more than 2 consecutive)
  modified = modified.replace(/\n{3,}/g, '\n\n');
  
  if (changesMade) {
    fs.writeFileSync(filePath, modified, 'utf8');
    stats.filesModified++;
    console.log(`✓ Cleaned ${filePath}`);
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
      '**/*.test.{ts,tsx,js,jsx}',
      '**/*.spec.{ts,tsx,js,jsx}',
      '**/test/**',
      '**/scripts/**'  // Don't clean scripts themselves
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
  console.log('     Console Statement Cleanup Tool');
  console.log('════════════════════════════════════════════');
  
  // Clean main source directories
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
  console.log(`✓ Console statements removed: ${stats.consoleLogsRemoved}`);
  console.log(`⚠ Console.error statements found (not removed): ${stats.consoleErrorsFound}`);
  console.log('════════════════════════════════════════════\n');
  
  if (stats.consoleLogsRemoved > 0) {
    console.log('✅ Successfully removed console.log statements!');
    console.log('📝 Note: console.error statements were kept for now.');
    console.log('   They should be replaced with proper error handling.\n');
  }
}

// Run the cleanup
main();